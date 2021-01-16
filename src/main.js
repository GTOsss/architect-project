const { resolve } = require('path');
const { getObjectWithPaths, parseFiles } = require('./functions');

const templatesPath = resolve(__dirname, '../settings/templates');

const templates = getObjectWithPaths(templatesPath);
//console.log(objectWithPaths);

const parseResult = parseFiles(templates);

//console.log(matchedFunctions);
// Второй таск
