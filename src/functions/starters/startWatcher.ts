import chokidar from 'chokidar';
import configPath from '../../configPath';

// todo Need to combine both methods below to one method

export const startWatcher = () => {
  const watcher = chokidar.watch([configPath.sourceMapModule, configPath.sourceMapAtom], {
    persistent: true,
  });

  const log = console.log.bind(console);

  watcher.on('change', (path) => {
    log(`File ${path} has been changed`);

    delete require.cache[require.resolve(configPath.sourceMapModule)];
    delete require.cache[require.resolve(configPath.sourceMapAtom)];

    // arcStart({ str: 'Rebuilding...', sourcesMap: sourceMapModulePath });
    // arcStart({ str: 'Rebuilding...', sourcesMap: sourceMapAtomPath });

    console.log('Project has been rebuild');
  });
};

export const startWatcherWithEslint = () => {
  const watcher = chokidar.watch([configPath.sourceMapModule, configPath.sourceMapAtom], {
    persistent: true,
  });

  const log = console.log.bind(console);

  watcher.on('change', (path) => {
    log(`File ${path} has been changed`);

    delete require.cache[require.resolve(configPath.sourceMapModule)];
    delete require.cache[require.resolve(configPath.sourceMapAtom)];

    // arcStartWithEslint({ str: 'Rebuilding...', sourcesMap: sourceMapModulePath });
    // arcStartWithEslint({ str: 'Rebuilding...', sourcesMap: sourceMapAtomPath });

    console.log('Project has been rebuild');
  });
};
