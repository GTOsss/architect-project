const appRoot = process.cwd();
const fs = require('file-system');
const { resolve } = require('path');
const config = require(`${appRoot}/settings/config.js`);

const getScriptPath = (dir) => {
  const allScripts = [];
  const parentPathsFile = fs.readdirSync(dir);
  parentPathsFile.forEach((templateDir) => {
    let script = null;
    try {
      const scriptPath = resolve(config.templatesPath, `${templateDir}/_script_`);
      script = require(scriptPath);
    } catch (e) {}
    allScripts.push(script);
  });
  return allScripts;
};

module.exports = getScriptPath;
