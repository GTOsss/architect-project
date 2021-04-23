module.exports = {
  output: 'output-test',
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
      replace: false,
    },
  },
};
