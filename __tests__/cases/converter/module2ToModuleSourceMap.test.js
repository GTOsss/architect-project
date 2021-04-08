const stringifyObject = require('stringify-object');
const { module2ToModule } = require('../../../src/utils/change/module2ToModule');
const { aliases, map } = require('./source_map/source-map-module2');

const createPrettyObj = (obj) => {
  return stringifyObject(obj, {
    indent: '  ',
    singleQuotes: true,
  });
};

describe('test module2ToModule', () => {
  test('simple', () => {
    const obj = module2ToModule({
      map,
      aliases: {},
    });

    expect(createPrettyObj(obj)).toMatchSnapshot();
  });

  test('simple with aliases', () => {
    const obj = module2ToModule({
      map,
      aliases,
    });

    expect(createPrettyObj(obj)).toMatchSnapshot();
  });
});
