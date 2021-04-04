const { createStore, createEvent } = require('effector');

const $createdFolders = createStore({ set: new Set() });

const pushFolders = createEvent();

$createdFolders.on(pushFolders, ({ set }, { folder }) => {
  set.add(folder);

  return { set };
});

const $createdFoldersList = $createdFolders.map(({ set }) => Array.from(set));

module.exports = { pushFolders, $createdFoldersList };
