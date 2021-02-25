module.exports = {
  replace: true,
  clean: false,
  itrStart: '{{',
  itrEnd: '}}',
  itrFileNameStart: '[',
  itrFileNameEnd: ']',
  templateExt: '.txt',
  templates: {
    icons: {
      watch: ['assets/icons-sprite'],
      replace: false,
      clean: true,
    },
    store: {
      watch: ['assets/icons-standalone'],
      replace: true,
    },
  },
};
