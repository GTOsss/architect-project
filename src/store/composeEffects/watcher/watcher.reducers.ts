import { FSWatcher } from 'chokidar';
import { FSWatcherMap } from './watcher.types';

type AddWatcherForTemplatePayload = {
  template: string;
  fsWatcher: FSWatcher;
};
export const addWatcherForTemplate = (state: FSWatcherMap, { template, fsWatcher }: AddWatcherForTemplatePayload) => {
  const hasNotWatcher = !state[template];
  if (hasNotWatcher) {
    hasNotWatcher[template] = fsWatcher;
  }

  return { ...state };
};
