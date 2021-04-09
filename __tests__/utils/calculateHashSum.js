const getObjectWithPaths = require('./getObjectWithPaths');
const parseOutput = require('./parseOutput');
const hash = require('object-hash');

const calculateHashSum = (path) => {
  const folders = getObjectWithPaths(path);

  const outputFiles = parseOutput(folders);

  return hash.MD5(outputFiles);
};

const calculateHashSumInTemplate = ({ path, config }) => {
  const templates = Object.entries(config.templates)
    .filter(([value, key]) => {
      return value.replace;
    })
    .map(([key]) => key);

  const folders = getObjectWithPaths(path);

  const outputFiles = parseOutput(folders);

  const hashSum = templates.reduce((acc, templateKey) => {
    const outputFilesByTemplates = outputFiles[templateKey];
    acc[templateKey] = hash.MD5(outputFilesByTemplates);
    return acc;
  }, {});

  return hashSum;
};

module.exports = { calculateHashSum, calculateHashSumInTemplate };
