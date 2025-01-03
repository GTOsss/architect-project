import {
  arcStart,
  arcStartWithEslint,
  startWatcher,
  startWatcherWithEslint,
  watchTemplateSettings,
} from '../src/functions';

export const callFunctionWithCurrentSourceMap = ({ sourceMapModule, sourceMapAtomAsModule, callback, options }) => {
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

export const actionStart = ({ sourceMap, options }) => {
  if (options.watch) {
    console.log('Watcher running...');
    // arcStart({ sourceMap });
    startWatcher();
    watchTemplateSettings();
  } else {
    // arcStart({ sourceMap });
  }
};

// esLint

export const actionEsLint = ({ sourceMap, options }) => {
  if (options.watch) {
    console.log('Watcher running...');
    // arcStartWithEslint({ sourceMap });
    startWatcherWithEslint();
    watchTemplateSettings();
  } else {
    // arcStartWithEslint({ sourceMap });
  }
};
