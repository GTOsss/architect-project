const stringifyObject = require('stringify-object');
const { toConsistentModuleSourceMap } = require('../../../src/utils/change/toConsistentModuleSourceMap');
const { aliases, map } = require('./source_map/source-map-module2');

const createPrettyObj = (obj) => {
  return stringifyObject(obj, {
    indent: '  ',
    singleQuotes: true,
  });
};

describe('test module2ToModule', () => {
  test('simple', () => {
    const obj = toConsistentModuleSourceMap({
      map,
      aliases: {},
    });

    expect(createPrettyObj(obj)).toMatchSnapshot();
  });

  test('simple with aliases', () => {
    const obj = toConsistentModuleSourceMap({
      map,
      aliases,
    });

    expect(createPrettyObj(obj)).toMatchSnapshot();
  });
});
