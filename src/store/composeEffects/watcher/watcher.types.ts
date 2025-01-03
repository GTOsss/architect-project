import { FSWatcher } from 'chokidar';

export type EventName = 'add' | 'change';

export type FSWatchHandlerParams = {
  eventName: EventName;
  templateName: string;
  filepath: string;
};

export type FSWatcherMap = Record<string, FSWatcher>;

export type AddFSWatcherByTemplateParams = {
  template: string;
  fsWatcher: FSWatcher;
};
