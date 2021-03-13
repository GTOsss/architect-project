module.exports = {
  esLint: {
    quiet: false,
  },
  output: 'output',
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
      replace: true,
      clean: true,
      backups: 3,
    },
    store: {
      watch: ['assets/icons-standalone'],
      replace: true,
      backups: 3,
    },
  },
};
