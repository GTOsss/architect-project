const getFilesPath = require('./getFilesPath');
const getScriptPath = require('./getScriptPath');

const getObjectWithPaths = (dir) => {
  const allFilesPaths = getFilesPath(dir);

  const allScriptPaths = getScriptPath(dir);
  const arrOfObject = [];

  for (let i in allFilesPaths) {
    const { files, templateName } = allFilesPaths[i];
    const script = allScriptPaths[i];

    arrOfObject.push({ templateName, files, script });
  }
  return arrOfObject;
};

module.exports = getObjectWithPaths;
