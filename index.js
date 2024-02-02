const fs = require("fs");
const Kmf = require("./kmf");
const KaitaiStream = require('kaitai-struct/KaitaiStream');

const fileContent = fs.readFileSync("test.kmf");
const kmf = new Kmf(new KaitaiStream(fileContent));

console.log(kmf.mesh.header.numBaseVertices);
