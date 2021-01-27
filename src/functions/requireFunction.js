const _ = require('lodash');
const writeFile = require('./writeFile');
const methods = require('../../settings/methods');

const requireFunction = ({ functionName, variableName, templateScript, template, sectionFromSourceMap }) => {
  try {
    const currentMethod = _.get(templateScript, functionName) || _.get(methods, functionName);

    return currentMethod(variableName, { sectionFromSourceMap, writeFile });
  } catch (e) {
    const err = `Not found function ${functionName} in template ${template}`;

    console.log(err);
  }
};

module.exports = requireFunction;
