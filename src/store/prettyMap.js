const { createStore, createEvent, sample } = require('effector');
const { prettyLogCreatedFiles } = require('../utils/prettyLogCreatedFiles');

const map = {};

const $prettyMap = createStore(map);
const $prettyMapReplaced = createStore(map);
const $resultPrettyMap = createStore({});
const $resultPrettyMapReplaced = createStore({});

const endGeneration = createEvent();

sample({
  source: $prettyMap,
  clock: endGeneration,
  target: $resultPrettyMap,
});

sample({
  source: $prettyMapReplaced,
  clock: endGeneration,
  target: $resultPrettyMapReplaced,
});

$resultPrettyMap.watch((state) => {
  if (Object.keys(state).length !== 0) {
    prettyLogCreatedFiles(state, 'created');
  }
});

$resultPrettyMapReplaced.watch((state) => {
  if (Object.keys(state).length !== 0) {
    prettyLogCreatedFiles(state, 'replaced');
  }
});

//$prettyMap.watch((state) => console.log('$prettyMap: ', state));
//endGeneration.watch(() => console.log('endGeneration'));

module.exports = { endGeneration, $prettyMap, $prettyMapReplaced };
