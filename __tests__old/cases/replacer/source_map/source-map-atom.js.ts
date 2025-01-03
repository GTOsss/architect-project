const defaultParams = {
  component: { path: 'src/component' },
  page: { path: 'src/page' },
  store: { path: 'src/store' },
};

const map = {
  //  stadiums: ['component', ['component', { name: 'custom' }]],
  stadium: ['store', ['store', { rPath: '/test' }], 'component', ['component', { name: '[code]' }]],
  // stadiums3: ['component'],
};

module.exports = {
  defaultParams,
  map,
};
