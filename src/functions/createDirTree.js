const { resolve } = require('path');
const fs = require('file-system');
const { functionCall } = require('./createFilesByTemplate');

const templatesPath = resolve(__dirname, '../../settings/templates');

const createOutputFile = (filePath, data) => {
  fs.writeFileSync(filePath, data);
};

const replacePaths = (inputPath, outputPath, parsedFiles) => {
  parsedFiles.forEach((el) => {
    const filePath = el.file.replace(inputPath, outputPath);

    const data = 'Hello World';

    createOutputFile(filePath, data);
  });
};

const createDirTree = (templateMap) => {
  Object.entries(templateMap).forEach(([key, value]) => {
    const catalogPath = resolve(__dirname, `../../output/`);

    replacePaths(templatesPath, catalogPath, value.parsedFiles);

    functionCall(key, value.parsedFiles);
  });
};

module.exports = createDirTree;
