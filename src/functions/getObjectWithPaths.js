const getFilesPath = require('./getFilesPath');
const getScriptPath = require('./getScriptPath');

const getObjectWithPaths = (dir) => {
  const allFilesPaths = getFilesPath(dir);

  const allScriptPaths = getScriptPath(dir);
  const arrOfObject = [];

  for (let i in allFilesPaths) {
    const obj = {
      files: [],
      script: '',
    };

    obj.files = allFilesPaths[i];
    obj.script = allScriptPaths[i].toString();

    arrOfObject.push(obj);
  }
  return arrOfObject;
};

module.exports = getObjectWithPaths;
