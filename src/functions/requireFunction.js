const methods = require('../../settings/methods');

const requireFunction = (functionName, variableName, templateScript) => {
  const currentMethod = methods || templateScript;

  return currentMethod[functionName](`${variableName}`);
};

module.exports = requireFunction;
