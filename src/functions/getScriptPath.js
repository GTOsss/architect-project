const fs = require('file-system');
const { resolve } = require('path');

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

const getScriptPath = (dir) => {
  const allScripts = [];
  const parentPathsFile = fs.readdirSync(dir);
  parentPathsFile.forEach((templateDir) => {
    let script = null;
    try {
      script = require(`../../settings/templates/${templateDir}/_script_`);
    } catch (e) {}
    allScripts.push(script);
  });
  return allScripts;
};

module.exports = getScriptPath;
