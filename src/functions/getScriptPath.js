const fs = require('file-system');

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
