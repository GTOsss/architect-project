const { createStore, createEvent, sample } = require('./rootDomain');
const { endGeneration } = require('./endGeneration');

const $createdFiles = createStore({ set: new Set() });
const $replacedFiles = createStore({ set: new Set() });
const $createdFilesList = createStore([]);
const $replacedFilesList = createStore([]);

const pushFiles = createEvent();
const pushReplacedFiles = createEvent();

$createdFiles.on(pushFiles, ({ set }, { filePath }) => {
  const normFilePath = filePath.replace(/\\/g, '/');
  set.add(normFilePath);

  return { set };
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

module.exports = { pushFiles, pushReplacedFiles, $createdFilesList, $replacedFilesList };
