const { pathForCommand } = require('../casesConfigPath');

module.exports = {
  output: `${pathForCommand.variableInFileName}/output`,
  replace: true,
  clean: true,
  itrStart: '{{',
  itrEnd: '}}',
  itrFileNameStart: '[',
  itrFileNameEnd: ']',
  templateExt: '.txt',
  esLint: {
    quiet: true,
  },
  templates: {
    icons: {
      clean: true,
      replace: true,
    },
  },
};
