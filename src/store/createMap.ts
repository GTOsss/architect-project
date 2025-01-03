import { createStore, sample } from 'effector';
import { $createdFilesList, $replacedFilesList } from './createdFiles';
import { $createdFoldersList } from './createdFolders';
import { prettyLogCreatedFiles, toMapFolderWithFiles } from '../utils/prettyLogCreatedFiles';
import { endGeneration } from './endGeneration';

export const $prettyMap = createStore({});
export const $prettyMapReplaced = createStore({});

sample({
  source: { filesList: $createdFilesList, foldersList: $createdFoldersList },
  clock: endGeneration,
  fn: toMapFolderWithFiles,
  target: $prettyMap,
});

sample({
  source: { filesList: $replacedFilesList, foldersList: $createdFoldersList },
  clock: endGeneration,
  fn: toMapFolderWithFiles,
  target: $prettyMapReplaced,
});

$prettyMap.watch((state) => {
  if (Object.keys(state).length !== 0) {
    prettyLogCreatedFiles(state, 'created');
  }
});

$prettyMapReplaced.watch((state) => {
  if (Object.keys(state).length !== 0) {
    prettyLogCreatedFiles(state, 'replaced');
  }
});
