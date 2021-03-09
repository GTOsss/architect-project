const fs = require('file-system');
const { resolve } = require('path');
const configPath = require('../configPath');

const getScriptPath = (dir) => {
  const allScripts = [];
  const parentPathsFile = fs.readdirSync(dir);
  parentPathsFile.forEach((templateDir) => {
    let script = null;
    const scriptPath = resolve(configPath.templatesPath, `${templateDir}/_script_`);

    try {
      script = require(scriptPath);
    } catch (e) {
      const skipErr = `Cannot find module '${scriptPath}'`;

      if (e.message === skipErr) {
        return;
      }
      console.log(`${e.message}\n${e.stack}`);
    }
    allScripts.push(script);
  });
  return allScripts;
};

module.exports = getScriptPath;
