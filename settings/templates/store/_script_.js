const { getSources, createFile } = require('../../../src/utils');

const mockSources = [
  {
    name: 'arrow-left.svg',
    content: 'file content',
  },
  {
    name: 'arrow-right.svg',
    content: 'file content',
  },
];

const main = () => {
  const sources = getSources('icons-sprite');
  //createFile('');
  // console.log(`main started`);
};
main();
module.exports = {
  main,
};
