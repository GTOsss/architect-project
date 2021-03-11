const atomToModuleSourceMap = ({ map: sourceMapByAtoms, allDefaultParams = {}, aliases }) => {
  let map = {};

  Object.entries(sourceMapByAtoms).forEach(([componentName, templates]) => {
    templates.forEach((template) => {
      const templateIsString = typeof template === 'string';

      const params = templateIsString ? {} : template[1];

      let templateName = templateIsString ? template : template[0];
      templateName = aliases[templateName] || templateName;

      const defaultParams = allDefaultParams[templateName];

      const mergedParams = { ...defaultParams, ...params };
      const currentPath = mergedParams.path;
      delete mergedParams.path;

      const hasAdditionalParams = Object.keys(mergedParams).length;

      const valueInSourceMap = hasAdditionalParams ? { template: templateName, ...mergedParams } : templateName;

      map[currentPath] = map[currentPath] ? map[currentPath] : {};
      map[currentPath] = { ...map[currentPath], [componentName]: valueInSourceMap };
    });
  });

  return { map, aliases };
};

module.exports = {
  sourceMapToModule: atomToModuleSourceMap,
};
