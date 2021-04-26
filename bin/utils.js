const {
  startWatcherWithEslint,
  startWatcher,
  arcStart,
  arcStartWithEslint,
  watchTemplateSettings,
} = require('../src/functions');

const callFunctionWithCurrentSourceMap = ({ sourceMapModule, sourceMapAtomAsModule, callback, options }) => {
  if (sourceMapModule) {
    callback({ sourceMap: sourceMapModule, options });
    console.log('Reading source-map-module...');
  }
  if (sourceMapAtomAsModule) {
    callback({ sourceMap: sourceMapAtomAsModule, options });
    console.log('Reading source-map-atom...');
  }
};

// start

const actionStart = ({ sourceMap, options }) => {
  if (options.watch) {
    console.log('Watcher running...');
    arcStart({ sourcesMap: sourceMap });
    startWatcher();
    watchTemplateSettings();
  } else {
    arcStart({ sourcesMap: sourceMap });
  }
};

// esLint

const actionEsLint = ({ sourceMap, options }) => {
  if (options.watch) {
    console.log('Watcher running...');
    arcStartWithEslint({ sourcesMap: sourceMap });
    startWatcherWithEslint();
    watchTemplateSettings();
  } else {
    arcStartWithEslint({ sourcesMap: sourceMap });
  }
};

module.exports = {
  callFunctionWithCurrentSourceMap,
  actionStart,
  actionEsLint,
};
