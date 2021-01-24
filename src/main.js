const { resolve } = require('path');
const { getObjectWithPaths, parseFiles, createFilesByTemplate, createFilesBySourceMap } = require('./functions');
const sourcesMap = require('../settings/source-map');

const templatesPath = resolve(__dirname, '../settings/templates');

const sourceMapMock = { 'react-component': 'тимохин компонент', store: 'тимохин стор' };

const templates = getObjectWithPaths(templatesPath);
const templateMap = parseFiles(templates);

// createFilesByTemplate(templateMap, sourceMapMock);
createFilesBySourceMap(templateMap, sourcesMap.map);
