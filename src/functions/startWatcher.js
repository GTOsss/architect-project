const chokidar = require('chokidar');
const fs = require('file-system');
const configPath = require('../configPath');
const { arcStart, arcStartWithEslint } = require('./arcStart');

const sourceMapModulePath = fs.existsSync(configPath.sourcesMapModuleTxtPath)
  ? configPath.sourcesMapModuleTxtPath
  : configPath.sourcesMapModuleJsPath;

const sourceMapAtomPath = configPath.sourcesMapAtomJsPath;

const ifExistSourceMapPath = fs.existsSync(configPath.sourcesMapModuleTxtPath);

const startWatcher = () => {
  const watcher = chokidar.watch([sourceMapModulePath, sourceMapAtomPath], {
    persistent: true,
  });

  const log = console.log.bind(console);

  watcher.on('change', (path) => {
    log(`File ${path} has been changed`);

    delete require.cache[require.resolve(configPath.sourcesMapModuleJsPath)];
    delete require.cache[require.resolve(configPath.sourcesMapAtomJsPath)];

    const sourceMapModulePath = ifExistSourceMapPath
      ? require('./functions/parseSourceMap')
      : require(configPath.sourcesMapModuleJsPath);

    const sourceMapAtomPath = require(configPath.sourcesMapAtomJsPath);

    arcStart({ str: 'Rebuilding...', sourcesMap: sourceMapModulePath });
    arcStart({ str: 'Rebuilding...', sourcesMap: sourceMapAtomPath });

    console.log('Project has been rebuild');
  });
};

const startWatcherWithEslint = () => {
  const watcher = chokidar.watch([sourceMapModulePath, sourceMapAtomPath], {
    persistent: true,
  });

  const log = console.log.bind(console);

  watcher.on('change', (path) => {
    log(`File ${path} has been changed`);

    delete require.cache[require.resolve(configPath.sourcesMapModuleJsPath)];
    delete require.cache[require.resolve(configPath.sourcesMapAtomJsPath)];

    const sourceMapModulePath = ifExistSourceMapPath
      ? require('./functions/parseSourceMap')
      : require(configPath.sourcesMapModuleJsPath);

    const sourceMapAtomPath = require(configPath.sourcesMapAtomJsPath);

    arcStartWithEslint({ str: 'Rebuilding...', sourcesMap: sourceMapModulePath });
    arcStartWithEslint({ str: 'Rebuilding...', sourcesMap: sourceMapAtomPath });

    console.log('Project has been rebuild');
  });
};

module.exports = { startWatcher, startWatcherWithEslint };
