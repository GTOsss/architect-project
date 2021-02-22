const chokidar = require('chokidar');
const fs = require('file-system');
const configPath = require('../configPath');
const { arcStart, arcStartWithEslint } = require('./arcStart');

const sourceMapPath = fs.existsSync(configPath.sourcesMapTxtPath)
  ? configPath.sourcesMapTxtPath
  : configPath.sourcesMapJsPath;

const ifExistSourceMapPath = fs.existsSync(configPath.sourcesMapTxtPath);

const startWatcher = () => {
  const watcher = chokidar.watch(sourceMapPath, {
    persistent: true,
  });

  const log = console.log.bind(console);

  watcher.on('change', (path) => {
    log(`File ${path} has been changed`);

    delete require.cache[require.resolve(configPath.sourcesMapJsPath)];

    const sourcesMap = ifExistSourceMapPath
      ? require('./functions/parseSourceMap')
      : require(configPath.sourcesMapJsPath);

    arcStart({ str: 'Rebuilding...', sourcesMap });
    console.log('Project has been rebuild');
  });
};

const startWatcherWithEslint = () => {
  const watcher = chokidar.watch(sourceMapPath, {
    persistent: true,
  });

  const log = console.log.bind(console);

  watcher.on('change', (path) => {
    log(`File ${path} has been changed`);

    delete require.cache[require.resolve(configPath.sourcesMapJsPath)];

    const sourcesMap = ifExistSourceMapPath
      ? require('./functions/parseSourceMap')
      : require(configPath.sourcesMapJsPath);

    arcStartWithEslint({ str: 'Rebuilding...', sourcesMap });

    console.log('Project has been rebuild');
  });
};

module.exports = { startWatcher, startWatcherWithEslint };
