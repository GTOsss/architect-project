export const module2ToModule = ({ map: sourceMapModule2 = {}, aliases = {} }) => {
  const moduleMap = Object.entries(sourceMapModule2).reduce((acc, [path, componentWithParams]) => {
    const componentMap = Object.entries(componentWithParams).reduce((acc, [component, params]) => {
      const templateIsString = typeof params[0] === 'string';

      const existParams = params[1] || {};
      let template = templateIsString ? params[0] : '';
      template = aliases[template] || template;

      if (templateIsString) {
        acc[component] = {
          template,
          ...existParams,
        };
      }

      return acc;
    }, {});

    acc[path] = componentMap;

    return acc;
  }, {});

  return { map: moduleMap, aliases };
};
