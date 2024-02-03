import util from 'util';
import Kmf from './Kmf.js';

import KaitaiStream from 'kaitai-struct/KaitaiStream.js';

export function kmf2obj(inputFileName, fileContent, output) {

const inputFileBaseName = inputFileName.slice(inputFileName.lastIndexOf('/') + 1, -4);

const kmf = new Kmf(new KaitaiStream(fileContent));

// convert KMF to OBJ
if (kmf.header.format > 2) {
	return;
}

let numTotalVertexPositions = kmf.mesh.header.numBaseVertices;

function computeAnimVertex(frameIdx, itabIdx) {
	const geomBase = kmf.mesh.itab.frameChunks[Math.floor(frameIdx / 128)].geomBase[itabIdx];
	const geomOffset = kmf.mesh.vgeo.offsets[itabIdx].frameOffsets[frameIdx];
	const geomIndex = geomBase + geomOffset;

	const curVertex = kmf.mesh.geom.verticesAnim[geomIndex];
	const frameBase = curVertex.frameBase;

	output.write(`# geomIndex ${geomIndex} base ${curVertex.frameBase} frame ${frameIdx}\n`);

	if ((frameIdx & 0x7F) > frameBase) {
		// interpolate between the current and next "keyframe" vertex
		const nextVertex = kmf.mesh.geom.verticesAnim[geomIndex + 1];
		const nextFrameBase = nextVertex.frameBase;
		const geomFactor = (frameIdx & 0x7F - frameBase) / (nextFrameBase - frameBase);

		output.write(`# nextBase ${nextFrameBase} geomFactor ${geomFactor}\n`);

		let x = (curVertex.coords.x - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.x;
		let y = (curVertex.coords.y - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.y;
		let z = (curVertex.coords.z - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.z;

		x = x * (1 - geomFactor) + geomFactor * ((nextVertex.coords.x - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.x);
		y = y * (1 - geomFactor) + geomFactor * ((nextVertex.coords.y - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.y);
		z = z * (1 - geomFactor) + geomFactor * ((nextVertex.coords.z - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.z);

		output.write(util.format("v %d %d %d\n", x, -z, y));
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

output.write(`# mesh numGroups: ${kmf.mesh.header.numGroups} numVerts: ${kmf.mesh.header.numBaseVertices} numTriangles: ${NumTriangles}\n`);

for (let i = 0; i < kmf.materials.numMaterials; ++i) {
	const mat = kmf.materials.materials[i];
	output.write(`newmtl ${mat.name}\n`);
	output.write(`map_kd ${mat.textures[0]}.png\n`);
	output.write(`map_bump ${mat.textures[0]}_n.png\n`);
}

output.write("\n\n")

output.write(`mtllib ${inputFileBaseName}.mtl\n`);
output.write(`# ${kmf.mesh.header.numBaseVertices} vertices\n`);

// write the base vertex data
for (let i = 0; i < kmf.mesh.header.numBaseVertices; ++i) {
	if (isAnim) {
		const vertex = kmf.mesh.geom.verticesAnim[i];
		output.write(util.format("v %d %d %d\n",
			  (vertex.coords.x - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.x,
			-((vertex.coords.z - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.z),
			  (vertex.coords.y - 512) / 511.0 * kmf.mesh.header.scale - kmf.mesh.header.translation.y));
	} else {
		const vertex = kmf.mesh.geom.vertices[i];
		output.write(util.format("v %d %d %d\n",
			  vertex.x - kmf.mesh.header.translation.x,
			-(vertex.z - kmf.mesh.header.translation.z),
			  vertex.y - kmf.mesh.header.translation.y));
	}
}

// write the normals and UVs
for (let i = 0; i < kmf.mesh.header.numGroups; ++i) {
	const meshGroup = kmf.mesh.model.groups[i];
	const meshGroupData = kmf.mesh.model.groupData[i];
	output.write(`# ${kmf.materials.materials[meshGroupData.materialIdx].name} ${meshGroup.numVertices} uniq verts\n`);

	for (let j = 0; j < meshGroup.numVertices; ++j) {
		const vertex = meshGroupData.vertices.vertexData[j];
		output.write(util.format("vt %d %d\n", vertex.u / 32768.0, 1.0 - vertex.v / 32768.0));
		// output.write(util.format("vn %d %d %d\n", vertex.nX, -vertex.nZ, vertex.nY));
	}
}

if (isAnim) {
	output.write(`# ${kmf.mesh.header.numFrames} frames\n`);
}

let v1idx, v2idx, v3idx;
let frameIdx = 0;
const lodLevel = 0;

for (frameIdx = 0; frameIdx < (isAnim ? kmf.mesh.header.numFrames : 1); ++frameIdx) {
	output.write(`o ${inputFileBaseName}_${frameIdx}\n\n`);

	let verticesCounter = 0;

	// loop through all groups
	for (let i = 0; i < kmf.mesh.header.numGroups; i++) {
		const meshGroup = kmf.mesh.model.groups[i];
		const meshGroupData = kmf.mesh.model.groupData[i];

		output.write(`g ${kmf.materials.materials[meshGroupData.materialIdx].name}_${frameIdx}\n`);
		output.write(`usemtl ${kmf.materials.materials[meshGroupData.materialIdx].name}\n`);

		// loop through all triangles in the selected LOD
		output.write(`# ${meshGroup.numTrisPerLevel[lodLevel]} triangles\n`);

		for (let j = 0; j < meshGroup.numTrisPerLevel[lodLevel]; ++j) {
			const triangle = meshGroupData.polygons.lodLevels[lodLevel].triangles[j];

			const v1 = meshGroupData.vertices.vertexData[triangle.x];
			const v2 = meshGroupData.vertices.vertexData[triangle.y];
			const v3 = meshGroupData.vertices.vertexData[triangle.z];

			if (isAnim) {
				output.write(`# grp ${i} tri ${j}\n`);
				v1idx = computeAnimVertex(frameIdx, v1.itabIdx);
				v2idx = computeAnimVertex(frameIdx, v2.itabIdx);
				v3idx = computeAnimVertex(frameIdx, v3.itabIdx);
			} else {
				v1idx = v1.index + 1;
				v2idx = v2.index + 1;
				v3idx = v3.index + 1;
			}

			output.write(`f ${v1idx}/${verticesCounter + triangle.x + 1} ${v3idx}/${verticesCounter + triangle.z + 1} ${v2idx}/${verticesCounter + triangle.y + 1}\n`);
		}

		verticesCounter += meshGroup.numVertices;
	}
}

}

/*
if (typeof module !== 'undefined' && module.exports) {
	console.log('module.exports');
	module.exports = kmf2obj;
}

if (typeof require !== 'undefined' && require.main === module || import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
	console.log('require check');
	if (process.argv.length < 3) {
		console.error('Need filename argument!');
		process.exit(1);
	}

	const inputFileName = process.argv[2];
	const fileContent = fs.readFileSync(inputFileName);
	kmf2obj(inputFileName, fileContent, process.stdout);
	// let outputFileStream = fs.createWriteStream('log.txt', {'flags': 'a'});
}
*/