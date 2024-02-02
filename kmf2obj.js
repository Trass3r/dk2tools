const fs = require("fs");
const Kmf = require("./kmf");
const KaitaiStream = require('kaitai-struct/KaitaiStream');

if (process.argv.length < 3) {
	console.error('Need filename argument!');
	process.exit(1);
}

const inputFileName = process.argv[2];
const inputFileBaseName = inputFileName.substr(inputFileName.lastIndexOf('/') + 1);
const fileContent = fs.readFileSync(inputFileName);
const kmf = new Kmf(new KaitaiStream(fileContent));

console.log(kmf.mesh.header.meshname);

// convert KMF to OBJ
if (kmf.header.format > 2) {
	return;
}

let numTotalVertexPositions = kmf.mesh.header.numBaseVertices;

function computeAnimVertex(frameIdx, itabIdx) {
	const geomBase = kmf.mesh.itab.frameChunks[Math.floor(frameIdx / 128)].geomBase[itabIdx];
	const geomOffset = kmf.mesh.vgeo.offsets[itabIdx].frameOffsets[frameIdx];
	const geomIndex = geomBase + geomOffset;
	const frameBase = kmf.mesh.geom.verticesAnim[geomIndex].frameBase;

	console.log(`# geomIndex ${geomIndex} base ${kmf.mesh.geom.verticesAnim[geomIndex].frameBase} frame ${frameIdx}`);

	if ((frameIdx & 0x7F) > frameBase) {
		const nextFrameBase = kmf.mesh.geom.verticesAnim[geomIndex + 1].frameBase;
		const geomFactor = (frameIdx & 0x7F - frameBase) / (nextFrameBase - frameBase);

		console.log(`# nextBase ${nextFrameBase} geomFactor ${geomFactor}`);

		let x = (kmf.mesh.geom.verticesAnim[geomIndex].coords.x - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.x;
		let y = (kmf.mesh.geom.verticesAnim[geomIndex].coords.y - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.y;
		let z = (kmf.mesh.geom.verticesAnim[geomIndex].coords.z - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.z;

		x = x * (1 - geomFactor) + geomFactor * ((kmf.mesh.geom.verticesAnim[geomIndex + 1].coords.x - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.x);
		y = y * (1 - geomFactor) + geomFactor * ((kmf.mesh.geom.verticesAnim[geomIndex + 1].coords.y - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.y);
		z = z * (1 - geomFactor) + geomFactor * ((kmf.mesh.geom.verticesAnim[geomIndex + 1].coords.z - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.z);

		console.log("v %f %f %f", x, -z, y);
		numTotalVertexPositions++;
		return numTotalVertexPositions;
	}

	return geomIndex + 1;
}

const isAnim = kmf.header.format === 2;
let NumTriangles = 0;

for (let i = 0; i < kmf.mesh.header.numGroups; i++) {
	NumTriangles += kmf.mesh.model.groups[i].numTrisPerLevel[0];
}

console.log(`# mesh numGroups: ${kmf.mesh.header.numGroups} numVerts: ${kmf.mesh.header.numBaseVertices} numTriangles: ${NumTriangles}`);

for (let i = 0; i < kmf.materials.numMaterials; ++i) {
	console.log(`newmtl ${kmf.materials.materials[i].name}`);
	console.log(`map_kd ${kmf.materials.materials[i].textures[0]}.png`);
	console.log(`map_bump ${kmf.materials.materials[i].textures[0]}_n.png`);
}

console.log("\n\n")

console.log(`mtllib ${inputFileBaseName}.mtl`);
console.log(`# ${kmf.mesh.header.numBaseVertices} vertices`);

// write the vertex data
for (let i = 0; i < kmf.mesh.header.numBaseVertices; i++) {
	if (isAnim) {
		console.log(`v ${(kmf.mesh.geom.verticesAnim[i].coords.x - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.x} ${-((kmf.mesh.geom.verticesAnim[i].coords.z - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.z)} ${(kmf.mesh.geom.verticesAnim[i].coords.y - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.y}`);
	} else {
		console.log(`v ${kmf.mesh.geom.vertices[i].x - kmf.mesh.header.translation.x} ${-(kmf.mesh.geom.vertices[i].z - kmf.mesh.header.translation.z)} ${kmf.mesh.geom.vertices[i].y - kmf.mesh.header.translation.y}`);
	}
}

// write the normals and UVs
for (let i = 0; i < kmf.mesh.header.numGroups; i++) {
	console.log(`# ${kmf.materials.materials[kmf.mesh.model.groupData[i].materialIdx].name} ${kmf.mesh.model.groups[i].numVertices} uniq verts`);

	for (let j = 0; j < kmf.mesh.model.groups[i].numVertices; ++j) {
		const curVertex = kmf.mesh.model.groupData[i].vertices.vertexData[j];
		console.log(`vt ${curVertex.u / 32768.0} ${1.0 - curVertex.v / 32768.0}`);
		// console.log(`vn ${curVertEx.nX} ${-curVertEx.nZ} ${curVertEx.nY}`);
	}
}

if (isAnim) {
	console.log(`# ${kmf.mesh.header.numFrames} frames`);
}

let v1idx, v2idx, v3idx;
let frameIdx = 0;
const lodLevel = 0;

for (frameIdx = 0; frameIdx < (isAnim ? kmf.mesh.header.numFrames : 1); ++frameIdx) {
	console.log(`o ${inputFileBaseName}_${frameIdx}\n`);

	let verticesCounter = 0;

	// loop through all groups
	for (let i = 0; i < kmf.mesh.header.numGroups; i++) {
		console.log(`g ${kmf.materials.materials[kmf.mesh.model.groupData[i].materialIdx].name}_${frameIdx}`);
		console.log(`usemtl ${kmf.materials.materials[kmf.mesh.model.groupData[i].materialIdx].name}`);

		// loop through all triangles in the selected LOD
		console.log(`# ${kmf.mesh.model.groups[i].numTrisPerLevel[lodLevel]} triangles`);

		for (let j = 0; j < kmf.mesh.model.groups[i].numTrisPerLevel[lodLevel]; ++j) {
			const triangle = kmf.mesh.model.groupData[i].polygons.lodLevels[lodLevel].triangles[j];
			const v1 = kmf.mesh.model.groupData[i].vertices.vertexData[triangle.x];
			const v2 = kmf.mesh.model.groupData[i].vertices.vertexData[triangle.y];
			const v3 = kmf.mesh.model.groupData[i].vertices.vertexData[triangle.z];

			if (isAnim) {
				console.log(`# grp ${i} tri ${j}`);
				v1idx = computeAnimVertex(frameIdx, v1.itabIdx);
				v2idx = computeAnimVertex(frameIdx, v2.itabIdx);
				v3idx = computeAnimVertex(frameIdx, v3.itabIdx);
			} else {
				v1idx = v1.index + 1;
				v2idx = v2.index + 1;
				v3idx = v3.index + 1;
			}

			console.log(`f ${v1idx}/${verticesCounter + triangle.x + 1} ${v3idx}/${verticesCounter + triangle.z + 1} ${v2idx}/${verticesCounter + triangle.y + 1}`);
		}

		verticesCounter += kmf.mesh.model.groups[i].numVertices;
	}
}
