module.exports = {
  aliases: {
    rc: 'react-component',
    s: 'store',
    ix: 'index',
    i: 'icons',
  },
  map: {
    'src/components': {
      icons: { template: 'i', assets: 'icons-sprite', test: '123' },
    },
    'src/components/inputs': {
      index: 'ix',
      button: { template: 'rc' },
      textarea: 'rc',
      input: 'rc',
      'input-select': 'rc',
    },
    'src/components/modals': {
      base: 'rc',
      confirm: 'rc',
      'confirm-remove': 'rc',
    },
    'src/components/store': {
      profile: 'store',
      user: 'store',
      users: 'store',
    },
  },
};
