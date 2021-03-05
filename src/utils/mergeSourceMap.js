const atomSourceMap = {
  map: {
    'src/components': {
      users: 'component',
    },
    'src/types': {
      users: 'types',
    },
    'src/store': {
      users: 'store',
    },
  },
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
      base: 'rc',
      confirm: 'rc',
      'confirm-remove': 'rc',
    },
  },
};

const getByKey = (obj, key, fallbackValue = {}) => {
  return obj[key] || fallbackValue;
};

const mergeSourceMap = ({ atomSourceMap, sourceMap }) => {
  const paths = Object.keys(sourceMap.map);
  const pathsAtom = Object.keys(atomSourceMap.map);
  const allPaths = [...paths, ...pathsAtom];

  const resultMap = {};
  allPaths.forEach((path) => {
    resultMap[path] = { ...getByKey(sourceMap.map, path), ...getByKey(atomSourceMap.map, path) };
  });

  return JSON.stringify(resultMap, null, '  ');

  // allPaths.forEach( el => {
  //   const unionMap = {
  //     el:
  //   }
  // })

  // Object.entries(sourceMap.map).map(([path, value]) => {
  //   Object.entries(atomSourceMap.map).forEach(([atomPath, atomValue]) => {
  //     if (path === atomPath) {
  //       return ([path] = [value, atomValue]);
  //     }
  //   });
  // });
  // console.log(sourceMap.map);
  //  return (sourceMap.map = { ...sourceMap.map, ...atomSourceMap.map });
  // return Object.assign(sourceMap.map, atomSourceMap.map);
};

//console.log(sourceMap);

const result = mergeSourceMap({ atomSourceMap, sourceMap });

console.log(result);
