//import "@babylonjs/core/Legacy/legacy.js";
import * as BABYLON from "@babylonjs/core/Engines/index.js";
//import { Scene } from "@babylonjs/core/Scene/index.js";
import { GLTF2Export } from '@babylonjs/serializers/glTF/index.js';
import fs from 'fs';
import KaitaiStream from 'kaitai-struct/KaitaiStream.js';
import Kmf from './Kmf.js';

export function kmf2gltf(inputFileName, fileContent, output) {

//const canvas = document.getElementById('renderCanvas');
//const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
const engine = new BABYLON.NullEngine();

const createScene = function () {
	// Create a basic BJS Scene object
	const scene = new BABYLON.Scene(engine);
	// Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
	//const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
	// Target the camera to scene origin
	//camera.setTarget(BABYLON.Vector3.Zero());
	// Attach the camera to the canvas
	// TODO: camera.attachControl(canvas, false);
	// Create a basic light, aiming 0, 1, 0 - meaning, to the sky
	//const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
	// Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
	//const sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
	// Move the sphere upward 1/2 of its height
	//sphere.position.y = 1;
	// Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
	//const ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
	// Return the created scene
	return scene;
}
// call the createScene function
const scene = createScene();

const inputFileBaseName = inputFileName.slice(inputFileName.lastIndexOf('/') + 1, -4);

const kmf = new Kmf(new KaitaiStream(fileContent));

// convert KMF to OBJ
if (kmf.header.format > 2) {
	return;
}

function computeAnimVertex(frameIdx, itabIdx) {

	const geomBase = kmf.mesh.itab.frameChunks[Math.floor(frameIdx / 128)].geomBase[itabIdx];
	const geomOffset = kmf.mesh.vgeo.offsets[itabIdx].frameOffsets[frameIdx];
	const geomIndex = geomBase + geomOffset;

	const curVertex = kmf.mesh.geom.verticesAnim[geomIndex];
	const frameBase = curVertex.frameBase;

	output.write(`# geomIndex ${geomIndex} base ${curVertex.frameBase} frame ${frameIdx}\n`);

	let x = (curVertex.coords.x - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.x;
	let y = (curVertex.coords.y - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.y;
	let z = (curVertex.coords.z - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.z;

	if ((frameIdx & 0x7F) > frameBase) {
		// interpolate between the current and next "keyframe" vertex
		const nextVertex = kmf.mesh.geom.verticesAnim[geomIndex + 1];
		const nextFrameBase = nextVertex.frameBase;
		const geomFactor = (frameIdx & 0x7F - frameBase) / (nextFrameBase - frameBase);

		output.write(`# nextBase ${nextFrameBase} geomFactor ${geomFactor}\n`);

		x = x * (1 - geomFactor) + geomFactor * ((nextVertex.coords.x - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.x);
		y = y * (1 - geomFactor) + geomFactor * ((nextVertex.coords.y - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.y);
		z = z * (1 - geomFactor) + geomFactor * ((nextVertex.coords.z - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.z);
	}

	return {x: x, y: y, z: z};
}

const isAnim = kmf.header.format === 2;

const materials = [];
const textures = {};
const multimat = new BABYLON.MultiMaterial("multi", scene);
for (let i = 0; i < kmf.materials.numMaterials; ++i) {
	const kmfmat = kmf.materials.materials[i];
	const textureName = `${kmfmat.textures[0]}.png`; // TODO: alternative textures
	const mat = new BABYLON.StandardMaterial(kmfmat.name, scene);
	if (!(textureName in textures))
		textures[textureName] = new BABYLON.Texture(/*"file://../assets/Converted/Textures/" + */ textureName, scene, { onLoad: () => console.log('loaded'), onError: (message, exception) => console.error(message, exception), creationFlags: BABYLON.Constants.TEXTURE_CREATIONFLAG_STORAGE });
	mat.diffuseTexture = textures[textureName];
	//mat.bumpTexture = new BABYLON.Texture(`${mat.textures[0]}_n.png`, scene);
	if (kmfmat.flags & Kmf.Matl.Mat2.MaterialFlags.DOUBLE_SIDED) {
		//mat.backFaceCulling = false;
	}
	materials.push(mat);
	multimat.subMaterials.push(mat);
}

const mesh = new BABYLON.Mesh(kmf.mesh.header.meshname, scene);
mesh.material = multimat;
const morphManager = new BABYLON.MorphTargetManager();
mesh.morphTargetManager = morphManager;

// write the normals and UVs
for (const meshGroupData of kmf.mesh.model.groupData) {
	//mesh.material = materials[meshGroupData.materialIdx];

	for (const vertex of meshGroupData.vertices.vertexData) {
		// uvs.push(vertex.u / 32768.0, 1.0 - vertex.v / 32768.0);
		// output.write(util.format("vn %d %d %d\n", vertex.nX, -vertex.nZ, vertex.nY));
	}
}

const lodLevel = 0;

const indices = [];
const uvs = [];
const normals = [];
let positions = [];

let numMeshTriangles = 0;
for (const meshGroup of kmf.mesh.model.groups)
	numMeshTriangles += meshGroup.numTrisPerLevel[lodLevel];

const animGroup = new BABYLON.AnimationGroup("animGroup");
for (let frameIdx = 0; frameIdx < (isAnim ? kmf.mesh.header.numFrames : 1); ++frameIdx) {

	let subMeshBaseVertex = 0;
	let subMeshBaseIndex = 0;

	//positions.length = 0;
	positions = []; // need to allocate a new array since Babylon.js does not copy it

	// loop through all groups
	for (let i = 0; i < kmf.mesh.header.numGroups; ++i) {
		const meshGroup = kmf.mesh.model.groups[i];
		const meshGroupData = kmf.mesh.model.groupData[i];

		// determine max used vertex, the rest up to meshGroup.numVertices is for lower LODs
		let numSubmeshVertices = 0;
		for (const triangle of meshGroupData.polygons.lodLevels[lodLevel].triangles)
			numSubmeshVertices = Math.max(numSubmeshVertices, triangle.x, triangle.y, triangle.z);
		++numSubmeshVertices;

		positions.length += numSubmeshVertices * 3;
		//if (frameIdx === 0)
		//uvs.length += numSubmeshVertices * 2;

		if (frameIdx === 0)
		for (let j = 0; j < numSubmeshVertices; ++j) {
			const vertex = meshGroupData.vertices.vertexData[j];

			// those vertices are for all LOD levels, so we need to skip the ones that are not for the base LOD
			// also, there are duplicated vertices here to have different normals
			// UVs seem to match usually

			// vertex.itabIdx is then the actual vertex index

			uvs.push(vertex.u / 32768.0, 1.0 - vertex.v / 32768.0);
			normals.push(vertex.normal.x + 0, -vertex.normal.z + 0, vertex.normal.y + 0); // fix -0s
		}

		// loop over all triangles
		for (const triangle of meshGroupData.polygons.lodLevels[lodLevel].triangles) {

			if (frameIdx === 0) {
				indices.push(subMeshBaseVertex + triangle.x, subMeshBaseVertex + triangle.z, subMeshBaseVertex + triangle.y);
			}

			const processVertex = (vertexIdx) => {
				if (positions[(subMeshBaseVertex + vertexIdx) * 3] === undefined) {
					const v = meshGroupData.vertices.vertexData[vertexIdx];
					let pos;
					if (isAnim) {
						pos = computeAnimVertex(frameIdx, v.itabIdx);
					} else {
						pos = kmf.mesh.geom.vertices[v.geomIdx];
					}
					positions.splice((subMeshBaseVertex + vertexIdx) * 3, 3, pos.x, pos.z, pos.y);
				}
			}
			processVertex(triangle.x);
			processVertex(triangle.y);
			processVertex(triangle.z);
		}
		subMeshBaseIndex += 3 * meshGroup.numTrisPerLevel[lodLevel];
		subMeshBaseVertex += numSubmeshVertices;
	}

	if (frameIdx === 0) {
		//const normals = [];
		//BABYLON.VertexData.ComputeNormals(positions, indices, normals);
		//BABYLON.VertexData._ComputeSides(BABYLON.Mesh.FRONTSIDE, positions, indices, normals, uvs);

		const vertexData = new BABYLON.VertexData();
		vertexData.positions = positions;
		vertexData.indices = indices;
		vertexData.normals = normals;
		vertexData.uvs = uvs;
		vertexData.applyToMesh(mesh, false);
	} else {
		const target = new BABYLON.MorphTarget("frame" + frameIdx, 0);
		target.setPositions(positions);
		//target.setNormals(positions);
		morphManager.addTarget(target);
	//}
	//if (frameIdx === 0 && isAnim) {
		const morphAnim = new BABYLON.Animation("animation frame " + frameIdx, "influence", 20, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.ANIMATIONLOOPMODE_CYCLE);
		const keys = [];
		// loop over num frames
		for (let f = 0; f < kmf.mesh.header.numFrames; ++f) {
			if (f === frameIdx)
				keys.push({
					frame: f,
					value: 1.0
				});
			else
				keys.push({
					frame: f,
					value: 0.0
				});
		}

		morphAnim.setKeys(keys);
		animGroup.addTargetedAnimation(morphAnim, target);

		// add animation to the cube mesh
		//mesh.animations.push(morphAnim);
	}
	
	// start animation by calling beginAnimation on the cube's influence
	//scene.beginAnimation(cubeMorph, 0, keys[keys.length - 1].frame, true);
}
if (0) {
mesh.subMeshes = [];
let subMeshBaseVertex = 0;
let subMeshBaseIndex = 0;
for (let i = 0; i < kmf.mesh.header.numGroups; ++i) {
	const meshGroup = kmf.mesh.model.groups[i];
	const meshGroupData = kmf.mesh.model.groupData[i];

	// TODO: maybe somehow get this from mesh
	// determine max used vertex, the rest up to meshGroup.numVertices is for lower LODs
	let numSubmeshVertices = 0;
	for (const triangle of meshGroupData.polygons.lodLevels[lodLevel].triangles)
		numSubmeshVertices = Math.max(numSubmeshVertices, triangle.x, triangle.y, triangle.z);
	++numSubmeshVertices;
	// TODO: can set a name somehow?
	// TODO: bounding box is still the full mesh
	new BABYLON.SubMesh(meshGroupData.materialIdx, subMeshBaseVertex, numSubmeshVertices, subMeshBaseIndex, 3 * meshGroup.numTrisPerLevel[lodLevel], mesh, undefined, true);
	subMeshBaseIndex += 3 * meshGroup.numTrisPerLevel[lodLevel];
	subMeshBaseVertex += numSubmeshVertices;
}
//mesh.material = materials[meshGroupData.materialIdx];
}

const options = {
	shouldExportNode: function (node) {
		return node !== skybox;
	},
};
	scene.executeWhenReady(() => {
		GLTF2Export.GLTFAsync(scene, inputFileBaseName + ".gltf", { animationSampleRate: 20 }).then((gltf) => {
		//gltf.downloadFiles();
		//output.write(gltf.glTFFiles["Piranha_Swim.gltf"]);
		fs.writeFileSync(inputFileBaseName + ".gltf", gltf.glTFFiles[inputFileBaseName + ".gltf"]);
		gltf.glTFFiles[inputFileBaseName + ".bin"].arrayBuffer().then((buffer) => {
			//output.write(new Uint8Array(buffer));
			fs.writeFileSync(inputFileBaseName + ".bin", Buffer.from(buffer));
		});
	});
});
/*
// run the render loop
engine.runRenderLoop(function () {
	scene.render();
});
// the canvas/window resize event handler
window.addEventListener('resize', function () {
	engine.resize();
});
*/
}

if (typeof module !== 'undefined' && module.exports) {
	console.log('module.exports');
	module.exports = kmf2gltf;
}
if (typeof require !== 'undefined' && require.main === module || import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
	console.log('require check');
	if (process.argv.length < 3) {
		console.error('Need filename argument!');
		process.exit(1);
	}

	const inputFileName = process.argv[2];
	const fileContent = fs.readFileSync(inputFileName);
	kmf2gltf(inputFileName, fileContent, process.stdout);
	// let outputFileStream = fs.createWriteStream('log.txt', {'flags': 'a'});
}