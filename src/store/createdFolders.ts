import { createEvent, createStore, sample } from 'effector';
import { endGeneration } from './endGeneration';

export const $createdFolders = createStore({ set: new Set() });
export const $createdFoldersList = createStore([]);

type PushFoldersParams = { folder: string };
export const pushFolders = createEvent<PushFoldersParams>();

$createdFolders.on(pushFolders, ({ set }, { folder }) => {
  set.add(folder);

  return { set };
});

sample({
  source: $createdFolders,
  clock: endGeneration,
  fn: ({ set }) => Array.from(set),
  target: $createdFoldersList,
});
