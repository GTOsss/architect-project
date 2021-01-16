// const getChildPaths = (dir, result) => {
//   result = result || [];
//
//   const files = fs.readdirSync(dir);
//
//   for (const i in files) {
//     const path = `${dir}/${files[i]}`;
//
//     if (fs.statSync(path).isDirectory()) {
//       getChildPaths(path, result);
//     } else if (!/\_script_.js$/.test(path)) {
//       result.push(path);
//     }
//   }
//
//   return result;
// };
//
// const getChildScript = (dir, result) => {
//   result = result || [];
//
//   const files = fs.readdirSync(dir);
//
//   for (const i in files) {
//     const path = `${dir}/${files[i]}`;
//
//     if (fs.statSync(path).isDirectory()) {
//       getChildScript(path, result);
//     } else if (/\_script_.js$/.test(path)) {
//       result.push(path);
//     }
//   }
//
//   return result;
// };
//
// const getParentPaths = (dir) => {
//   const allPaths = [];
//
//   const parentPathsfile = fs.readdirSync(dir);
//
//   for (const i in parentPathsfile) {
//     let parentPaths = `${dir}/${parentPathsfile[i]}`;
//     allPaths.push(getChildPaths(parentPaths));
//   }
//   return allPaths;
// };
//
// const getScript = (dir) => {
//   const allScripts = [];
//   const parentPathsfile = fs.readdirSync(dir);
//   for (const i in parentPathsfile) {
//     let parentPaths = `${dir}/${parentPathsfile[i]}`;
//     allScripts.push(getChildScript(parentPaths));
//   }
//   console.log(allScripts);
//   return allScripts;
// };

// const getObjectWithPathsAndRequire = (dir) => {
//   const allFilesPaths = getParentPaths(dir);
//
//   const allScriptPaths = getScript(dir);
//   const arrOfObject = [];
//
//   for (let i in allFilesPaths) {
//     const obj = {
//       files: [],
//       script: {},
//     };
//     obj.files = allFilesPaths[i];
//
//     const stringPath = allScriptPaths[i].toString();
//
//     if (stringPath.length !== 0) {
//       obj.script = require(stringPath);
//     }
//
//     arrOfObject.push(obj);
//   }
//   return arrOfObject;
// };

// const createExecutingFile = (requirePath, functionName, variableName) => {
//   const data = `const {${functionName}} = require("${requirePath}");
//   ${functionName}('${variableName}'); \n \n`;
//
//   const executingFile = fs.appendFileSync('exec.js', data);
//
//   return executingFile;
// };
//
// const requirePath =
//   'C:/Users/mail/Desktop/timoha/arhitect/architect/settings/templates/[componentName]/[componentName].js';
// const functionName = 'logStr';
// const variableName = 'Hello World!';
// createExecutingFile(requirePath, functionName, variableName);

// const reInterpolation = new RegExp(`(?<=${config.itrStart}).+?(?=${config.itrEnd})`, 'gm');
// const reGetVariable = new RegExp('(?<=\\().+(?=\\))', 'g');
// const reGetFunction = new RegExp('.+(?=\\()', 'g');
//
// const parseFile = (allFilesPath) => {
//   const result = [];
//
//   for (let i in allFilesPath) {
//     const pathsInArray = allFilesPath[i].files;
//
//     for (let i in pathsInArray) {
//       const paths = pathsInArray[i];
//
//       const contents = fs.readFileSync(paths, { encoding: 'utf8' });
//
//       const matchedContents = contents.match(reInterpolation);
//
//       result.push(matchedContents);
//     }
//   }
//   return result;
// };
//
// const parsedFileWithInterpolation = parseFile(objectWithPaths);
// // console.log(parsedFileWithInterpolation);
// const generateObjectWithMap = (parsedFile, obj) => {
//   const map = new Map();
//   const methods = fs.readFileSync('C:/Users/mail/Desktop/timoha/arhitect/architect/settings/methods.js', {
//     encoding: 'utf8',
//   });
//   // console.log(obj);
//   for (let i in parsedFile) {
//     const scripts = obj[i];
//     // console.log(parsedFile);
//     let functionInterpolation = null;
//     let variableInterpolation = null;
//
//     if (parsedFile[i] == null) {
//       functionInterpolation = null;
//       variableInterpolation = null;
//     } else {
//       functionInterpolation = parsedFile[i].map((el) => el.match(reGetFunction));
//       variableInterpolation = parsedFile[i].map((el) => el.match(reGetVariable));
//
//       const entryFunction = functionInterpolation.forEach((el) => {
//         const searchInMethods = methods.search(el.toString());
//         // console.log(`Совпадение функции ${el.toString()} в файле методс ${searchInMethods}`);
//         if (searchInMethods === -1) {
//           // const serchInScript = scripts;
//           // console.log(serchInScript);
//         }
//       });
//       //console.log(entryFunction);
//     }
//     map.set(functionInterpolation, variableInterpolation);
//     // console.log(functionInterpolation);
//   }
//   obj.functions = map;
//   return obj;
// };
//
// const objectWithMap = generateObjectWithMap(parsedFileWithInterpolation, objectWithPaths);
// // console.log(objectWithMap);
