const stringifyObject = require('stringify-object');
const { sourceMapToAtom } = require('../../../src/utils/change/moduleToAtomSourceMap');
const { aliases, map } = require('./source_map/source-map-module');

const createPrettyObj = (obj) => {
  return stringifyObject(obj, {
    indent: '  ',
    singleQuotes: true,
  });
};

describe('test moduleToAtom', () => {
  test('simple', () => {
    const obj = sourceMapToAtom({
      map,
      aliases: {},
    });

    expect(createPrettyObj(obj)).toMatchSnapshot();
  });

  test('simple with aliases', () => {
    const obj = sourceMapToAtom({
      map,
      aliases,
    });

    expect(createPrettyObj(obj)).toMatchSnapshot();
  });
});
