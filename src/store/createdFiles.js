const { createStore, createEvent } = require('effector');

const $createdFiles = createStore({ set: new Set() });
const $replacedFiles = createStore({ set: new Set() });

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

const $createdFilesList = $createdFiles.map(({ set }) => Array.from(set));
const $replacedFilesList = $replacedFiles.map(({ set }) => Array.from(set));

module.exports = { pushFiles, pushReplacedFiles, $createdFilesList, $replacedFilesList };
