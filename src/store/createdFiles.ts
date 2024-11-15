import { createEvent, createStore, sample } from 'effector';
import { endGeneration } from './endGeneration';

export const $createdFiles = createStore({ set: new Set<string>() });
export const $replacedFiles = createStore({ set: new Set<string>() });
export const $createdFilesList = createStore([]);
export const $replacedFilesList = createStore([]);

type PushFilesParams = { filePath: string };
export const pushFiles = createEvent<PushFilesParams>();

type PushReplacedFilesParams = { filePath: string };
export const pushReplacedFiles = createEvent<PushReplacedFilesParams>();

$createdFiles.on(pushFiles, ({ set }, { filePath }) => {
  const normFilePath = filePath.replace(/\\/g, '/');
  const newSet = new Set(set);
  newSet.add(normFilePath);

  return { set: newSet };
});

$replacedFiles.on(pushReplacedFiles, ({ set }, { filePath }) => {
  const normFilePath = filePath.replace(/\\/g, '/');
  set.add(normFilePath);

  return { set };
});

sample({
  source: $createdFiles,
  clock: endGeneration,
  fn: ({ set }) => Array.from(set),
  target: $createdFilesList,
});

sample({
  source: $replacedFiles,
  clock: endGeneration,
  fn: ({ set }) => Array.from(set),
  target: $replacedFilesList,
});
