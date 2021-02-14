const { resolve } = require('path');
const { getObjectWithPaths, parseFiles, createFilesBySourceMap } = require('./functions');
const sourcesMap = require('./functions/parseSourceMap');

const templatesPath = resolve(__dirname, '../settings/templates');

const templates = getObjectWithPaths(templatesPath);
const templateMap = parseFiles(templates);

createFilesBySourceMap(templateMap, sourcesMap);

// const path = require('path');
// const appDir = path.dirname(require.main.filename);
// console.log(appDir);
