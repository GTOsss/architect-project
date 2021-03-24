const chokidar = require('chokidar');
const { resolve } = require('path');
const configPath = require('../configPath');

const { memoRebuild } = require('./generators/createFileBySourceMap');

const watchTemplateSettings = () => {
  const config = require(configPath.config);

  Object.entries(config.templates).forEach(([key, value]) => {
    const watchPaths = value.watch.map((watchPath) => resolve(configPath.architect, watchPath));

    console.log(`watching directory: ${watchPaths}`);

    const watcher = chokidar.watch(watchPaths, {
      persistent: true,
    });

    watcher.on('change', () => {
      memoRebuild(key);
    });
  });
};

module.exports = watchTemplateSettings;
