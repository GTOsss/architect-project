const defaultParams = {
  component: { path: 'src/page' },
  store: { path: 'src/store' },
};

const map = {
  stadiums: ['component', ['component', { rPath: '/slesh' }]],
  clubs: ['component', ['component', { rPath: 'withoutSlesh' }]],
  comands: ['component', ['component', { rPath: 'test/test2' }]],
};

module.exports = {
  defaultParams,
  map,
};
