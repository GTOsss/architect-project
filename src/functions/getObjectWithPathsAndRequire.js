const getFilesPath = require('./getFilesPath');
const getScriptPath = require('./getScriptPath');

const getObjectWithPathsAndRequire = (dir) => {
  const allFilesPaths = getFilesPath(dir);

  const allScriptPaths = getScriptPath(dir);
  const arrOfObject = [];

  for (let i in allFilesPaths) {
    const obj = {
      files: [],
      script: {},
    };
    obj.files = allFilesPaths[i];

    const stringPath = allScriptPaths[i].toString();

    if (stringPath.length !== 0) {
      obj.script = require(stringPath);
    }

    arrOfObject.push(obj);
  }
  return arrOfObject;
};

module.exports = getObjectWithPathsAndRequire;
