const atomToModuleSourceMap = ({ map: sourceMapByAtomsArc, defaultParams: allDefaultParams = {}, aliases = {} }) => {
  let map = {};
  const sourceMapByAtoms = { ...sourceMapByAtomsArc };

  Object.entries(sourceMapByAtoms).forEach(([componentName, templates]) => {
    templates.forEach((template) => {
      const templateIsString = typeof template === 'string';

      let params = templateIsString ? {} : template[1];
      params = params || {};

      let templateName = templateIsString ? template : template[0];
      templateName = aliases[templateName] || templateName;

      const defaultParams = allDefaultParams[templateName];

      if (params.rPath && defaultParams.path) {
        params.rPath = `${defaultParams.path}${params.rPath}`;
      }

      const mergedParams = { ...defaultParams, ...params };
      const currentPath = mergedParams.rPath || mergedParams.path;
      delete mergedParams.path;

      const hasAdditionalParams = Object.keys(mergedParams).length;

      const valueInSourceMap = hasAdditionalParams ? { template: templateName, ...mergedParams } : templateName;

      if (params.name) {
        componentName = params.name;
      }

      map[currentPath] = map[currentPath] ? map[currentPath] : {};
      map[currentPath] = { ...map[currentPath], [componentName]: valueInSourceMap };
    });
  });

  return { map, aliases };
};

module.exports = {
  sourceMapToModule: atomToModuleSourceMap,
};
