const fs = require('file-system');

const createExecutingFile = (requirePath, functionName, variableName) => {
  const data = `const {${functionName}} = require("${requirePath}");
  ${functionName}('${variableName}'); \n \n`;

  const executingFile = fs.appendFileSync('exec.js', data);

  return executingFile;
};

module.exports = createExecutingFile;
