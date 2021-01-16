const fs = require('file-system');

const getChildScript = (dir, result) => {
  result = result || [];

  const files = fs.readdirSync(dir);

  for (const i in files) {
    const path = `${dir}/${files[i]}`;

    if (fs.statSync(path).isDirectory()) {
      getChildScript(path, result);
    } else if (/\_script_.js$/.test(path)) {
      result.push(path);
    }
  }

  return result;
};

const getScriptPath = (dir) => {
  const allScripts = [];
  const parentPathsfile = fs.readdirSync(dir);
  for (const i in parentPathsfile) {
    let parentPaths = `${dir}/${parentPathsfile[i]}`;
    allScripts.push(getChildScript(parentPaths));
  }

  return allScripts;
};

module.exports = getScriptPath;
