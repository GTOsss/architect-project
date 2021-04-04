const { sample } = require('effector');
const { $prettyMap, $prettyMapReplaced } = require('./prettyMap');
const { $createdFilesList, $replacedFilesList } = require('./createdFiles');
const { $createdFoldersList } = require('./createdFolders');
const { toMapFolderWithFiles } = require('../utils/prettyLogCreatedFiles');

sample({
  source: { filesList: $createdFilesList, foldersList: $createdFoldersList },
  fn: toMapFolderWithFiles,
  target: $prettyMap,
});

sample({
  source: { filesList: $replacedFilesList, foldersList: $createdFoldersList },
  fn: toMapFolderWithFiles,
  target: $prettyMapReplaced,
});
