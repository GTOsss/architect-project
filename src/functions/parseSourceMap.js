const { resolve } = require('path');
const fs = require('file-system');

const sourceMapTxtPath = resolve(__dirname, '../../settings/source-map.txt');

const content = fs.readFileSync(sourceMapTxtPath, 'utf8');

console.log(content);
const parentObjects = new RegExp()