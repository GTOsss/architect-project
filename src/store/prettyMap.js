// const { createStore, createEvent, sample } = require('./rootDomain');
// const { prettyLogCreatedFiles } = require('../utils/prettyLogCreatedFiles');

// const $prettyMap = createStore({});
// const $prettyMapReplaced = createStore({});
// const $resultPrettyMap = createStore({});
// const $resultPrettyMapReplaced = createStore({});
//
// const endGeneration = createEvent();
// //
// sample({
//   source: $prettyMap,
//   //clock: endGeneration,
//   target: $resultPrettyMap,
// });
//
// sample({
//   source: $prettyMapReplaced,
//  // clock: endGeneration,
//   target: $resultPrettyMapReplaced,
// });

// $resultPrettyMap.watch((state) => {
//   if (Object.keys(state).length !== 0) {
//     prettyLogCreatedFiles(state, 'created');
//   }
// });
//
// $resultPrettyMapReplaced.watch((state) => {
//   if (Object.keys(state).length !== 0) {
//     prettyLogCreatedFiles(state, 'replaced');
//   }
// });

//$prettyMap.watch((state) => console.log('$prettyMap: ', state));
//endGeneration.watch(() => console.log('endGeneration'));

module.exports = { endGeneration, $prettyMap, $prettyMapReplaced, $resultPrettyMap };
