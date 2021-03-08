const configPath = require('../configPath');
const { atomToModuleSourceMap } = require('../utils/atomToModuleSourceMap');

const getSourceMaps = () => {
  let sourceMapAtom = null;
  let sourceMapModule = null;

  try {
    sourceMapAtom = require(configPath.sourcesMapAtomJsPath);
  } catch {
    console.log('Can not find file source-map-atom.js');
  }

  try {
    sourceMapModule = require(configPath.sourcesMapModuleJsPath);
  } catch {
    console.log('Can not find file source-map-module.js');
  }

  return { sourceMapModule, sourceMapAtomAsModule: sourceMapAtom && atomToModuleSourceMap(sourceMapAtom) };
};

module.exports = {
  getSourceMaps,
};
