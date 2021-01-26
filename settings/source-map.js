module.exports = {
  map: {
    'src/components/inputs': {
      index: 'index',
      button: { template: 'react-component' },
      textarea: 'react-component',
      input: 'react-component',
      'input-select': 'react-component',
      'svg-icons': { template: 'icons', assets: 'icons-sprite' },
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
