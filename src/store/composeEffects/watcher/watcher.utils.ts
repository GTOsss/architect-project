import { watch } from 'chokidar';
import { FSWatcherMap } from './watcher.types';
import { ArcConfig } from '../../../types/config';
import { getConfigByTemplate } from '../../../utils/getConfigByTemplate';
import paths from '../../../configPath';

/**
 * Go thought each template config and create file system watcher if it needs.
 * */
export const createFSWatcherForTemplates = (config: ArcConfig): FSWatcherMap => {
  const fsWatcherMap: FSWatcherMap = {};
  Object.keys(config.templates).forEach((template) => {
    const templateConfig = getConfigByTemplate(config, template);

    const hasNotWatcher = !fsWatcherMap[template];
    if (templateConfig.watch && hasNotWatcher) {
      const templateDir = paths.resolveToTemplate(template);
      fsWatcherMap[template] = watch(templateDir);
    }
  });

  return fsWatcherMap;
};
