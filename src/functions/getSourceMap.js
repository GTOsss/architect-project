const fs = require('file-system');
const configPath = require('../configPath');
const { atomToModuleSourceMap } = require('../utils/atomToModuleSourceMap');

const getSourceMaps = () => {
  const isExistSourceMapModulePath = fs.existsSync(configPath.sourcesMapModuleTxtPath);
  const sourceMapModule = isExistSourceMapModulePath
    ? require('../functions/parseSourceMap')
    : require(configPath.sourcesMapModuleJsPath);
  const sourceMapAtom = require(configPath.sourcesMapAtomJsPath);

  return { sourceMapModule, sourceMapAtomAsModule: atomToModuleSourceMap(sourceMapAtom) };
};

module.exports = {
  getSourceMaps,
};
