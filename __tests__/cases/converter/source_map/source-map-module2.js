const aliases = {
  c: 'component',
  s: 'store',
  ix: 'index',
  i: 'icons',
};

const map = {
  'src/icons': {
    icons: ['i', { variable: '4' }],
  },
  'src/component': {
    button: ['icons'],
  },
};

module.exports = {
  aliases,
  map,
};
