const fs = require('file-system');
const { resolve } = require('path');
const configPath = require('../configPath');

const getScriptPath = (dir) => {
  const allScripts = [];
  const parentPathsFile = fs.readdirSync(dir);
  parentPathsFile.forEach((templateDir) => {
    let script = null;
    try {
      const scriptPath = resolve(configPath.templatesPath, `${templateDir}/_script_`);

      script = require(scriptPath);
    } catch (e) {
      console.log(`${e.message}\n${e.stack}`);
    }
    allScripts.push(script);
  });
  return allScripts;
};

module.exports = getScriptPath;
