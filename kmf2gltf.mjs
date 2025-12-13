import { NullEngine } from '@babylonjs/core/Engines/nullEngine.js';
import { Engine } from '@babylonjs/core/Engines/engine.js';
import { Constants } from '@babylonjs/core/Engines/constants.js';
import { Scene } from '@babylonjs/core/scene.js';
import { Color3 } from '@babylonjs/core/Maths/math.color.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera.js';
//import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera.js';
import { AxesViewer } from '@babylonjs/core/Debug/axesViewer.js';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight.js';
import { PointLight } from '@babylonjs/core/Lights/pointLight.js';
import { MultiMaterial } from '@babylonjs/core/Materials/multiMaterial.js';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js';
import { Texture } from '@babylonjs/core/Materials/Textures/texture.js';
//import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder.js';
import { Mesh } from '@babylonjs/core/Meshes/mesh.js';
import { SubMesh } from '@babylonjs/core/Meshes/subMesh.js';
import { VertexData } from '@babylonjs/core/Meshes/mesh.vertexData.js';
import { MorphTargetManager } from '@babylonjs/core/Morph/morphTargetManager.js';
import { MorphTarget } from '@babylonjs/core/Morph/morphTarget.js';
import { AnimationGroup } from '@babylonjs/core/Animations/animationGroup.js';
import { Animation } from '@babylonjs/core/Animations/animation.js';
import { GLTF2Export } from '@babylonjs/serializers/glTF/index.js';
import { Inspector } from '@babylonjs/inspector';
import KaitaiStream from 'kaitai-struct/KaitaiStream.js';
import { Kmf } from './Kmf.js';
import fs from 'fs';

// simple hue -> rgb mapper to generate distinct colors for materials
function hueToRgb(h) {
	const s = 0.7;
	const v = 0.9;
	const c = v * s;
	const hh = (h / 60.0);
	const x = c * (1 - Math.abs((hh % 2) - 1));
	let r = 0, g = 0, b = 0;
	if (hh >= 0 && hh < 1) { r = c; g = x; b = 0; }
	else if (hh < 2) { r = x; g = c; b = 0; }
	else if (hh < 3) { r = 0; g = c; b = x; }
	else if (hh < 4) { r = 0; g = x; b = c; }
	else if (hh < 5) { r = x; g = 0; b = c; }
	else { r = c; g = 0; b = x; }
	const m = v - c;
	return [r + m, g + m, b + m];
}

export function kmf2gltf(inputFileName, fileContent, assets = {}) {

// try to create a real engine when running in the browser so we can render
// to the on-page canvas. Fall back to NullEngine for node/headless usage.
let engine;
let canvas = null;
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
if (isBrowser) {
	canvas = document.getElementById('renderCanvas') || (() => {
		const c = document.createElement('canvas');
		c.id = 'renderCanvas';
		document.body.appendChild(c);
		return c;
	})();
	engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
} else {
	engine = new NullEngine();
}

const createScene = function () {
	// Create a basic BJS Scene object
	const scene = new Scene(engine);
	// create a camera and a light when running in a browser so the scene can render
	if (!isBrowser)
		return scene;

	// Instruct Babylon to not eagerly load textures: keep them as URI references
	// so exporters can emit external image references instead of trying to read files.
	//scene.useDelayedTextureLoading = true;
	// Prefer serialized URL when available so exporter can write the filename
	// instead of trying to read GPU/internal texture data.
	//try { Texture.UseSerializedUrlIfAny = true; } catch (e) { }

	// ArcRotateCamera provides intuitive mouse/touch orbit controls
	const camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 3, 1, Vector3.Zero(), scene);
	camera.attachControl(canvas, true);
	//const camera = new FreeCamera('camera', new Vector3(-0.5, 0.5, 0.5), scene);
	// Target the camera to scene origin
	//camera.setTarget(Vector3.Zero());
	// Attach the camera to the canvas
	//camera.attachControl(canvas, false);
	// enable WASD controls
	/*
	camera.keysUp = [87];
	camera.keysDown = [83];
	camera.keysLeft = [65];
	camera.keysRight = [68];
	*/
	// movement speed
	camera.speed = 0.1;
	camera.wheelDeltaPercentage = 0.05;
	camera.minZ = 0.1;
	const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
	const light2 = new PointLight('pointLight', new Vector3(0.1, -0.2, 0.3), scene);
	// Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
	//const sphere = MeshBuilder.CreateSphere('sphere1', { segments: 16, diameter: 2, updatable: false, sideOrientation: Mesh.FRONTSIDE }, scene);
	// Move the sphere upward 1/2 of its height
	//sphere.position.y = 1;
	// show world axes
	//new AxesViewer(scene, 0.1, undefined, undefined, undefined, undefined, 0.1);
	Inspector.Show(scene, {embedMode: false});
	return scene;
}
const scene = createScene();

const inputFileBaseName = inputFileName.slice(inputFileName.lastIndexOf('/') + 1, -4);

const kmf = new Kmf(new KaitaiStream(fileContent));

// normalize asset keys for case-insensitive lookup (filename -> url/blob)
const assetsNormalized = {};
for (const k of Object.keys(assets || {})) {
	assetsNormalized[k.toLowerCase()] = assets[k];
}

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

	let x = (curVertex.coords.x - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.x;
	let y = (curVertex.coords.y - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.y;
	let z = (curVertex.coords.z - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.z;

	if ((frameIdx & 0x7F) > frameBase) {
		// interpolate between the current and next "keyframe" vertex
		const nextVertex = kmf.mesh.geom.verticesAnim[geomIndex + 1];
		const nextFrameBase = nextVertex.frameBase;

		// the last frame will have an extra duplicate entry
		// so prevent division by zero
		const geomFactor = nextFrameBase <= frameBase ? 0 :
			((frameIdx & 0x7F) - frameBase) / (nextFrameBase - frameBase);

		x = x * (1 - geomFactor) + geomFactor * ((nextVertex.coords.x - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.x);
		y = y * (1 - geomFactor) + geomFactor * ((nextVertex.coords.y - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.y);
		z = z * (1 - geomFactor) + geomFactor * ((nextVertex.coords.z - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.z);
	}

	return {x: x, y: y, z: z};
}

const isAnim = kmf.header.format === 2;

	const showUserMsg = (isBrowser && typeof globalThis.showUserMsg === 'function')
	? globalThis.showUserMsg
	: (() => {});

const materials = [];
const textures = {};
const multimat = new MultiMaterial("multi", scene);
for (let i = 0; i < kmf.materials.numMaterials; ++i) {
	const kmfmat = kmf.materials.materials[i];
	const textureName = `${kmfmat.textures[0]}.png`; // TODO: alternative textures
	const mat = new StandardMaterial(kmfmat.name, scene);
	// prefer uploaded asset URL (case-insensitive), fallback to the filename
	const textureUrl = assetsNormalized[textureName.toLowerCase()] || textureName;
	let tex = textures[textureName];
	if (!tex) {
		tex = new Texture(textureUrl, scene, {
			onLoad: () => console.log('loaded', textureUrl),
			onError: (message, exception) => {
				mat.diffuseColor = new Color3(...hueToRgb((i * 137.5) % 360));
				mat.diffuseTexture = null;
				showUserMsg(`Texture ${textureName} is missing`, 3000);
				console.error(message, exception);
			}, creationFlags: Constants.TEXTURE_CREATIONFLAG_STORAGE
		});
		tex.name = textureName;
		textures[textureName] = tex;
	}
	mat.diffuseTexture = tex;

	if (kmfmat.flags & Kmf.Matl.Mat2.MaterialFlags.DOUBLE_SIDED) {
		//mat.backFaceCulling = false;
		//mat.twoSidedLighting = true;
	}
	if (kmfmat.flags & Kmf.Matl.Mat2.MaterialFlags.IS_SHININESS_SET) {
		//mat.specularColor = new Color3(1, 1, 1);
		//mat.specularPower = 64; // default
	} else {
		// less shiny default for other materials
		mat.specularColor = new Color3(0.3, 0.3, 0.3);
		mat.specularPower = 16;
	}
	materials.push(mat);
	multimat.subMaterials.push(mat);
}

const mesh = new Mesh(kmf.mesh.header.meshname, scene);
mesh.material = multimat;
const morphManager = new MorphTargetManager();
mesh.morphTargetManager = morphManager;

const lodLevel = 0;

const indices = [];
const uvs = [];
const normals = [];
let positions = [];

// esp. at the seams between different textures there will be multiple vertices cause of different UVs
// so smooth the normals
function postProcessNormals(positions, normals) {
	const vertCount = positions.length / 3;
	const map = new Map();
	const quantization = 1e3;
	for (let i = 0; i < vertCount; ++i) {
		const x = positions[3 * i];
		const y = positions[3 * i + 1];
		const z = positions[3 * i + 2];
		const key = `${Math.round(x * quantization)}_${Math.round(y * quantization)}_${Math.round(z * quantization)}`;
		let arr = map.get(key);
		if (!arr) { arr = []; map.set(key, arr); }
		arr.push(i);
	}

	for (const indices of map.values()) {
		if (indices.length <= 1) continue;
		let sx = 0, sy = 0, sz = 0;
		for (const vi of indices) {
			sx += normals[3 * vi];
			sy += normals[3 * vi + 1];
			sz += normals[3 * vi + 2];
		}
		const avg = [sx/indices.length, sy/indices.length, sz/indices.length];
		const len = Math.hypot(avg[0], avg[1], avg[2]);
		if (len < 1e-3) {
			// e.g. opposite normals on a flat surface
			continue;
		}
		avg[0] /= len; avg[1] /= len; avg[2] /= len;
		for (const vi of indices) {
			normals[3 * vi] = avg[0];
			normals[3 * vi + 1] = avg[1];
			normals[3 * vi + 2] = avg[2];
		}
	}
}

let numMeshTriangles = 0;
for (const meshGroup of kmf.mesh.model.groups)
	numMeshTriangles += meshGroup.numTrisPerLevel[lodLevel];

const animGroup = new AnimationGroup(kmf.mesh.header.meshname);
for (let frameIdx = 0; frameIdx < (isAnim ? kmf.mesh.header.numFrames : 1); ++frameIdx) {

	let subMeshBaseVertex = 0;
	let subMeshBaseIndex = 0;

	//positions.length = 0;
	positions = []; // need to allocate a new array since Babylon.js does not copy it

	// loop through all groups
	for (let i = 0; i < kmf.mesh.header.numGroups; ++i) {
		const meshGroup = kmf.mesh.model.groups[i];
		const meshGroupData = kmf.mesh.model.groupData[i];

		let numSubmeshTriangles = meshGroup.numTrisPerLevel[lodLevel];
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
				indices.push(subMeshBaseVertex + triangle.x, subMeshBaseVertex + triangle.y, subMeshBaseVertex + triangle.z);
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
					positions.splice((subMeshBaseVertex + vertexIdx) * 3, 3, pos.x, -pos.z, pos.y);
				}
			}
			processVertex(triangle.x);
			processVertex(triangle.y);
			processVertex(triangle.z);
		}
		// actual SubMesh objects need to be created after the mesh is finished
		subMeshBaseIndex += 3 * numSubmeshTriangles;
		subMeshBaseVertex += numSubmeshVertices;
	}

	if (frameIdx === 0) {
		if (0) { // original normals are already smooth
			VertexData.ComputeNormals(positions, indices, normals);
			postProcessNormals(positions, normals);
		}

		const vertexData = new VertexData();
		vertexData.positions = positions;
		vertexData.indices = indices;
		vertexData.normals = normals;
		vertexData.uvs = uvs;
		vertexData.applyToMesh(mesh, false);
	} else {
		const normals = [];
		VertexData.ComputeNormals(positions, indices, normals);
		postProcessNormals(positions, normals);
		const target = new MorphTarget("morph target " + frameIdx, 0);
		target.setPositions(positions);
		target.setNormals(normals);
		morphManager.addTarget(target);
	//}
	//if (frameIdx === 0 && isAnim) {
		const morphAnim = new Animation("frame " + frameIdx, "influence", 20, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
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
}
// start animation by calling beginAnimation on the cube's influence
//scene.beginAnimation(animationGroup, 0, kmf.mesh.header.numFrames-1, true);
animGroup.play(true);

mesh.subMeshes = [];
let subMeshBaseVertex = 0;
let subMeshBaseIndex = 0;
for (let i = 0; i < kmf.mesh.header.numGroups; ++i) {
	const meshGroup = kmf.mesh.model.groups[i];
	const meshGroupData = kmf.mesh.model.groupData[i];

	let numSubmeshTriangles = meshGroup.numTrisPerLevel[lodLevel];
	// determine max used vertex, the rest up to meshGroup.numVertices is for lower LODs
	let numSubmeshVertices = 0;
	for (const triangle of meshGroupData.polygons.lodLevels[lodLevel].triangles)
		numSubmeshVertices = Math.max(numSubmeshVertices, triangle.x, triangle.y, triangle.z);
	++numSubmeshVertices;

	// TODO: (subMeshBaseVertex, numSubmeshVertices) as vertices range creates invalid gltf
	new SubMesh(meshGroupData.materialIdx, 0, mesh.getTotalVertices(), subMeshBaseIndex, 3 * numSubmeshTriangles, mesh, undefined, true);
	subMeshBaseIndex += 3 * numSubmeshTriangles;
	subMeshBaseVertex += numSubmeshVertices;
}

// Export options (no skybox in this context)
const options = {
	shouldExportNode: function (node) {
		return node !== skybox;
	},
};
if (0)
scene.executeWhenReady(() => {
	GLTF2Export.GLBAsync(scene, inputFileBaseName, { animationSampleRate: 20 }).then((gltf) => {
	gltf.downloadFiles(); // for the browser
	// those are just for nodejs
	/*
	//output.write(gltf.files["Piranha_Swim.gltf"]);
	fs.writeFileSync(inputFileBaseName + ".gltf", gltf.files[inputFileBaseName + ".gltf"]);
	gltf.files[inputFileBaseName + ".bin"].arrayBuffer().then((buffer) => {
		//output.write(new Uint8Array(buffer));
		fs.writeFileSync(inputFileBaseName + ".bin", Buffer.from(buffer));
	});
	*/
});
});

// run the render loop
if (isBrowser) {
	engine.runRenderLoop(function () {
		scene.render();
	});
	// the canvas/window resize event handler
	window.addEventListener('resize', function () {
		engine.resize();
	});
}

// return engine/scene so callers can dispose them when loading a new file
return { engine, scene };

}

/*
// CLI
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
*/