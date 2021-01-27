module.exports = {
  aliases: {
    rc: 'react-component',
  },
  map: {
    'src/components': {
      icons: { template: 'icons', assets: 'icons-sprite' },
    },
    'src/components/inputs': {
      index: 'index',
      button: { template: 'react-component' },
      textarea: 'react-component',
      input: 'react-component',
      'input-select': 'react-component',
    },
    'src/components/modals': {
      base: 'react-component',
      confirm: 'react-component',
      'confirm-remove': 'react-component',
    },
    'src/components/store': {
      profile: 'store',
      user: 'store',
      users: 'store',
    },
  },
};
