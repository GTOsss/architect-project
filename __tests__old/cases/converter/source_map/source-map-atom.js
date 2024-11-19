const aliases = {
  c: 'component',
  p: 'page',
  s: 'store',
  ix: 'index',
};

const defaultParams = {
  page: { path: 'src/pages' },
  component: { path: 'src/components' },
  store: { path: 'src/store' },
};

const rPath = (component, path) => `${defaultParams[aliases[component] || component].path}/${path}`;

const map = {
  stadiums: ['page', ['component', { path: rPath('c', 'pages') }], 'store'],
};

module.exports = {
  aliases,
  defaultParams,
  map,
};
