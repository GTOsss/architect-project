import configPath from '../../configPath';
import { atomToModuleSourceMap } from '../../utils/change/atomToModuleSourceMap';
import { toConsistentModuleSourceMap } from '../../utils/change/toConsistentModuleSourceMap';
import { validateAliases, validateAtomMap, validateConfig, validateModuleMap } from '../../utils/validators';

validateConfig(require(configPath.config));

export const getSourceMaps = () => {
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
    sourceMapModule: sourceMapModule && toConsistentModuleSourceMap(sourceMapModule),
    sourceMapAtomAsModule: sourceMapAtom && atomToModuleSourceMap(sourceMapAtom),
  };
};
