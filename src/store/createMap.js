const { sample, createStore } = require('./rootDomain');
const { $createdFilesList, $replacedFilesList } = require('./createdFiles');
const { $createdFoldersList } = require('./createdFolders');
const { toMapFolderWithFiles, prettyLogCreatedFiles } = require('../utils/prettyLogCreatedFiles');
const { endGeneration } = require('./endGeneration');

const $prettyMap = createStore({});
const $prettyMapReplaced = createStore({});

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

module.exports = { $prettyMap };
