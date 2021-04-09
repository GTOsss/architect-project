const aliases = {
  c: 'component',
  s: 'store',
  ix: 'index',
  i: 'icons',
};

const map = {
  'src/icons': {
    icons: ['icons', { variable: '4' }],
  },
  'src/component': {
    button: ['component'],
  },
};

module.exports = {
  aliases,
  map,
};
