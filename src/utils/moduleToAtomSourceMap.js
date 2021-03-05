const moduleToAtomSourceMap = (sourceMap, defaultParams = {}) => {
  let map = {};

  Object.entries(sourceMap.map).forEach(([path, files]) => {
    Object.entries(files).forEach(([fileName, params]) => {
      const paramsIsObject = typeof params === 'object';
      let template = paramsIsObject ? params.template : params;
      template = sourceMap.aliases[template] || template;
      const isDefaultPath = defaultParams[template] && defaultParams[template].path === path;

      map[fileName] = map[fileName] ? map[fileName] : [];
      let currentParams = paramsIsObject ? [template, { ...params }] : template;

      if (!isDefaultPath) {
        if (Array.isArray(currentParams)) {
          currentParams[1].path = path;
        } else {
          currentParams = [template, { path }];
        }
      }

      if (paramsIsObject) {
        delete currentParams[1].template;
      }

      map[fileName].push(currentParams);
    });
  });

  return map;
};

module.exports = {
  sourceMapToAtom: moduleToAtomSourceMap,
};
