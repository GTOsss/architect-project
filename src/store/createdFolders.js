const { createStore, createEvent, sample } = require('./rootDomain');
const { endGeneration } = require('./endGeneration');

const $createdFolders = createStore({ set: new Set() });
const $createdFoldersList = createStore([]);

const pushFolders = createEvent();

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

module.exports = { pushFolders, $createdFoldersList };
