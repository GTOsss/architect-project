const { casesOutputPath } = require('../casesConfigPath');

module.exports = {
  output: casesOutputPath.redefenitionComponentNameForSourceMapAtom,
  replace: false,
  clean: false,
  itrStart: '{{',
  itrEnd: '}}',
  itrFileNameStart: '[',
  itrFileNameEnd: ']',
  templateExt: '.txt',
  esLint: {
    quiet: true,
  },
  templates: {
    endpoints: {
      clean: true,
      replace: true,
      watch: ['swagger.js'],
    },
  },
};
