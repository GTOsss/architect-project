const configPath = require('../../configPath');
const { sourceMapToModule } = require('../../utils/change/atomToModuleSourceMap');
const { module2ToModule } = require('../../utils/change/module2ToModule');
const { validateConfig, validateModuleMap, validateAtomMap, validateAliases } = require('../../utils/validators');

validateConfig(require(configPath.config));

const getSourceMaps = () => {
  let sourceMapAtom = null;
  let sourceMapModule = null;

  try {
    sourceMapAtom = require(configPath.sourcesMapAtomJsPath);

    if (sourceMapAtom.map) {
      const validateAtomMapResult = validateAtomMap(sourceMapAtom.map);

      if (validateAtomMapResult.error) {
        console.log(validateAtomMapResult.error);
      }
    }

    if (sourceMapAtom.aliases) {
      const validateAliasesResult = validateAliases(sourceMapAtom.aliases);

      if (validateAliasesResult.error) {
        console.log(validateAliasesResult.error);
      }
    }
  } catch {
    console.log('Can not find file source-map-atom.js');
  }

  try {
    sourceMapModule = require(configPath.sourcesMapModuleJsPath);

    if (sourceMapModule.map) {
      const validateModuleMapResult = validateModuleMap(sourceMapModule.map);

      if (validateModuleMapResult.error) {
        console.log(validateModuleMapResult.error);
      }
    }

    if (sourceMapModule.aliases) {
      const validateAliasesResult = validateAliases(sourceMapModule.aliases);

      if (validateAliasesResult.error) {
        console.log(validateAliasesResult.error);
      }
    }
  } catch {
    console.log('Can not find file source-map-module.js');
  }

  return {
    sourceMapModule: sourceMapModule && module2ToModule(sourceMapModule),
    sourceMapAtomAsModule: sourceMapAtom && sourceMapToModule(sourceMapAtom),
  };
};

module.exports = {
  getSourceMaps,
};
