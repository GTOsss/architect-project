module.exports = {
  output: 'output-test',
  replace: false,
  clean: false,
  itrStart: '{{',
  itrEnd: '}}',
  itrFileNameStart: '[',
  itrFileNameEnd: ']',
  templateExt: '.txt',
  templates: {
    endpoints: {
      watch: [],
      clean: true,
      replace: true,
    },
  },
};
