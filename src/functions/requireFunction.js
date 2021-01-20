const methods = require('../../settings/methods');

const requireFunction = (functionName, variableName, templateScript, template) => {
  try {
    const currentMethod = methods || templateScript;

    return currentMethod[functionName](`${variableName}`);
  } catch (e) {
    const err = `Not found function ${functionName} in template ${template}`;

    console.log(err);
  }
};

module.exports = requireFunction;
