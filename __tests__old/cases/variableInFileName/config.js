const { casesOutputPath } = require('../casesConfigPath');

module.exports = {
  output: casesOutputPath.variableInFileName,
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
