const sourceMapByAtoms = {
  users: [['component', { path: 'src/custompath', a: 'a' }], 'types', 'store'],
  friends: ['component', ['store', { path: 'src/custompath' }]],
};

const defaultParams = {
  component: { path: 'src/components', b: 'b' },
  types: { path: 'src/types' },
  store: { path: 'src/store' },
};

// output
// const map = {
//   'src/components': {
//     users: component,
//   },
//   'src/types': {
//     users: types,
//   },
//   'src/store': {
//     users: store,
//   },
// };

let map = {};

const atomToSourceMap = ({ sourceMapByAtoms, defaultParams: allDefaultParams }) => {
  Object.entries(sourceMapByAtoms).forEach(([componentName, templates]) => {
    templates.forEach((template) => {
      const templateIsString = typeof template === 'string';

      const params = templateIsString ? {} : template[1];

      const templateName = templateIsString ? template : template[0];

      const defaultParams = allDefaultParams[templateName];

      const mergedParams = { ...defaultParams, ...params };

      console.log(mergedParams);

      const countParams = Object.keys(mergedParams).length;
      const paramsIsOnlyTemplateName = countParams > 1;

      const valueInSourceMap = paramsIsOnlyTemplateName ? componentName : { mergedParams };

      map[mergedParams.path] = map[mergedParams.path] ? map[mergedParams.path] : {};
      map[mergedParams.path] = { ...map[mergedParams.path], [templateName]: valueInSourceMap };
    });
  });

  // console.log(map);
};

atomToSourceMap({ sourceMapByAtoms, defaultParams });

//console.log(map);

// const sourceMapByAtoms = {
//   users: ['component', 'types', 'store'],
//   friends: ['component', 'types', 'store'],
// };

// Object.entries(sourceMapByAtoms).forEach(([components, templates]) => {
//   Object.entries(defaultParams).forEach(([defTemplates, defParams]) => {
//     if (templates.includes(defTemplates)) {
//       templates.forEach((template) => {
//         if (defTemplates === template) {
//           map = {
//             ...map,
//             [defParams.path]: {
//               [components]: template,
//             },
//           };
//         }
//       });
//     }
//   });
// });

// const atomToSourceMap = ({ sourceMapByAtoms, defaultParams }) => {
//   Object.entries(sourceMapByAtoms).forEach(([key, templates]) => {
//     templates.forEach((template) => {
//       if (typeof template === 'string') {
//         let params = defaultParams[template];
//         map = {
//           ...map,
//           [params.path]: {
//             [key]: template,
//           },
//         };
//       } else {
//         let params = template[1];
//         const value = {
//           [key]: template[0],
//         };
//         map = {
//           ...map,
//           [params.path]: value,
//         };
//       }
//       //  console.log(`current template: ${template}, params: `, params);
//     });
//   });
