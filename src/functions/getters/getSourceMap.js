const configPath = require('../../configPath');
const { sourceMapToModule } = require('../../utils/change/atomToModuleSourceMap');

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
    console.log('Can not find file source-map-module.js.ts');
  }

  return { sourceMapModule, sourceMapAtomAsModule: sourceMapAtom && sourceMapToModule(sourceMapAtom) };
};

module.exports = {
  getSourceMaps,
};
