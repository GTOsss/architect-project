const { resolve } = require('path');
const { getObjectWithPaths, parseFiles, createFilesByTemplate } = require('./functions');

const templatesPath = resolve(__dirname, '../settings/templates');
const sourceMap = { 'react-component': 'тимохин компонент', store: 'тимохин стор' };

const templates = getObjectWithPaths(templatesPath);

const templateMap = parseFiles(templates);

createFilesByTemplate(templateMap, sourceMap);
