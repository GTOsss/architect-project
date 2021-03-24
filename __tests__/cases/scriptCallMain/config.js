const { casesOutputPath } = require('../casesConfigPath');

module.exports = {
  output: casesOutputPath.scriptCallMain,
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
    endpoints: {
      clean: true,
      replace: true,
      watch: ['swagger.js'],
    },
  },
};
