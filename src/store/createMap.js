const { sample } = require('effector');
const { $prettyMap, $prettyMapReplaced } = require('./prettyMap');
const { $createdFilesList, $replacedFilesList } = require('./createdFiles');
const { $createdFoldersList } = require('./createdFolders');
const { toMapFolderWithFiles } = require('../utils/prettyLogCreatedFiles');

sample({
  source: { $createdFilesList, $createdFoldersList },
  fn: ({ $createdFilesList, $createdFoldersList }) => toMapFolderWithFiles($createdFoldersList, $createdFilesList),
  target: $prettyMap,
});

sample({
  source: { $replacedFilesList, $createdFoldersList },
  fn: ({ $replacedFilesList, $createdFoldersList }) => toMapFolderWithFiles($createdFoldersList, $replacedFilesList),
  target: $prettyMapReplaced,
});
