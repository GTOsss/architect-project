const atomToModuleSourceMap = ({ map: sourceMapByAtoms = {}, defaultParams: allDefaultParams = {}, aliases = {} }) => {
  let map = {};

  Object.entries(sourceMapByAtoms).forEach(([componentName, templates]) => {
    templates.forEach((template) => {
      const templateIsString = typeof template === 'string';

      let params = templateIsString ? {} : template[1];
      params = params || {};

      let templateName = templateIsString ? template : template[0];
      templateName = aliases[templateName] || templateName;

      const defaultParams = allDefaultParams[templateName] ? allDefaultParams[templateName] : {};

      if (!defaultParams.path) {
        console.log(`Can not find path in template ${template[0]}`);
        defaultParams.path = 'src';
      }

      if (params.rPath && defaultParams.path) {
        if (params.rPath[0] === '/') {
          params.rPath = `${defaultParams.path}${params.rPath}`;
        } else {
          params.rPath = `${defaultParams.path}/${params.rPath}`;
        }
      }

      const mergedParams = { ...defaultParams, ...params };
      const currentPath = mergedParams.rPath || mergedParams.path;
      delete mergedParams.path;

      const hasAdditionalParams = Object.keys(mergedParams).length;

      const valueInSourceMap = hasAdditionalParams ? { template: templateName, ...mergedParams } : templateName;

      map[currentPath] = map[currentPath] ? map[currentPath] : {};

      map[currentPath] = { ...map[currentPath], [params.name || componentName]: valueInSourceMap };
    });
  });

  return { map, aliases };
};

module.exports = {
  sourceMapToModule: atomToModuleSourceMap,
};
