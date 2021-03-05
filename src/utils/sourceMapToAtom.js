// const sourceMapByAtoms = {
//   users: ['component', 'types', 'store'],
// };
const defaultParams = {
  component: { path: 'src/components' },
  types: { path: 'src/types' },
  store: { path: 'src/store' },
};

const sourceMapByAtoms = {
  users: [['component', { path: 'src/custompath' }], 'types'],
};

const sourceMap = {
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
    'src/components/modals': {
      icons: 'rc',
      base: 'rc',
      confirm: 'rc',
      'confirm-remove': 'rc',
    },
  },
};

let map = {};
let valueArr = [];

const sourceMapToAtom = (sourceMap) => {
  Object.entries(sourceMap.map).forEach(([path, value]) => {
    valueArr.push({ path: path });
    Object.entries(value).forEach(([component, props]) => {
      valueArr.push(props);
      map = { ...map, [component]: valueArr };
    });
  });
};

// const sourceMapToAtom = (sourceMap) => {
//   Object.entries(sourceMap.map).forEach(([path, value]) => {
//     Object.values(value).forEach((el) => {
//       if (typeof el === 'string') {
//         const fullEl = sourceMap.aliases[el];
//         map[value] = {
//           [fullEl]: path,
//         };
//       }
//     });
//   });
// };

sourceMapToAtom(sourceMap);
console.log(map);
