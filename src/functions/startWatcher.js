const chokidar = require('chokidar');
const fs = require('file-system');
const configPath = require('../configPath');

const sourceMapPath = fs.existsSync(configPath.sourcesMapTxtPath)
  ? configPath.sourcesMapTxtPath
  : configPath.sourcesMapJsPath;

const startWatcher = (handler) => {
  const watcher = chokidar.watch(sourceMapPath, {
    persistent: true,
  });

  const log = console.log.bind(console);

  watcher.on('change', (path) => {
    log(`File ${path} has been changed`);
    handler();
  });
};

module.exports = startWatcher;
