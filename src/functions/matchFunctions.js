const fs = require('file-system');
const parseFiles = require('./parseFiles');
const createExecutingFile = require('./createExecutingFile');

const methodsRequire = require('../../settings/methods');
methodsRequire['toCamelCase']('getfunctions');

// const methods = fs.readFileSync('C:/Users/mail/Desktop/timoha/arhitect/architect/settings/methods.js', {
//   encoding: 'utf8',
// });

const reGetVariable = new RegExp('(?<=\\().+(?=\\))', 'g');
const reGetFunction = new RegExp('.+(?=\\()', 'g');

const matchFunctions = (objectWithPaths) => {
  for (let i in objectWithPaths) {
    const parsedFiles = parseFiles(objectWithPaths[i].files);
    // console.log(parsedFiles);
    const pathToScript = objectWithPaths[i].script;
    const allFilesPath = objectWithPaths[i].files;

    let functionInterpolation = null;
    let variableInterpolation = null;
    for (let i in parsedFiles) {
      if (parsedFiles[i] == null) {
        functionInterpolation = null;
        variableInterpolation = null;
      } else {
        functionInterpolation = parsedFiles[i].map((el) => el.match(reGetFunction));
        variableInterpolation = parsedFiles[i].map((el) => el.match(reGetVariable));
        // console.log(functionInterpolation);
        const entryFunction = functionInterpolation.forEach((el) => {
          const searchInMethods = methods.search(el.toString());
          // console.log(`Совпадение функции ${el.toString()} в файле методс ${searchInMethods}`);
          if (searchInMethods === -1) {
            if (pathToScript !== '') {
              const script = fs.readFileSync(pathToScript, {
                encoding: 'utf8',
              });
              const searchInScript = script.search(el.toString());
              if (searchInScript === -1) {
                const err = `Not found function ${el.toString()} in path ${allFilesPath[i]}`;
                //throw new Error(err);
                console.log(err);
              } else {
                allFilesPath.forEach((path) =>
                  createExecutingFile(path, functionInterpolation[path], variableInterpolation[path]),
                );
              }
            }
          } else {
            allFilesPath.forEach((path) =>
              createExecutingFile(path, functionInterpolation[path], variableInterpolation[path]),
            );
          }
          // const serchInScript = scripts;
          // console.log(serchInScript);
        });
      }
    }
  }
  return true;
};

module.exports = matchFunctions;
