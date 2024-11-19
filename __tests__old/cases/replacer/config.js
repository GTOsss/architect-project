const { casesOutputPath } = require('../casesConfigPath');

module.exports = {
  output: casesOutputPath.replacer,
  replace: true,
  clean: false,
  itrStart: '{{',
  itrEnd: '}}',
  itrFileNameStart: '[',
  itrFileNameEnd: ']',
  templateExt: '.txt',
  esLint: {
    quiet: false,
  },
  templates: {
    component: {
      replace: true,
    },
    icons: {
      replace: false,
    },
  },
};
