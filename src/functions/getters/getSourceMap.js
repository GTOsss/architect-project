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
  } catch {
    console.log('Can not find file source-map-atom.js');
  }

  if (sourceMapAtom?.aliases) {
    validateAliases(sourceMapAtom?.aliases);
  }

  if (sourceMapAtom?.map) {
    validateAtomMap(sourceMapAtom?.map);
  }

  try {
    sourceMapModule = require(configPath.sourcesMapModuleJsPath);
  } catch {
    console.log('Can not find file source-map-module.js');
  }

  if (sourceMapModule?.map) {
    validateModuleMap(sourceMapModule?.map);
  }

  if (sourceMapModule?.aliases) {
    validateAliases(sourceMapModule?.aliases);
  }

  return {
    sourceMapModule: sourceMapModule && module2ToModule(sourceMapModule),
    sourceMapAtomAsModule: sourceMapAtom && sourceMapToModule(sourceMapAtom),
  };
};

module.exports = {
  getSourceMaps,
};
