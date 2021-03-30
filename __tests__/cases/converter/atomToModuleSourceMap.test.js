const stringifyObject = require('stringify-object');
const { sourceMapToModule } = require('../../../src/utils/change/atomToModuleSourceMap');
const { aliases, defaultParams, map } = require('./source_map/source-map-atom');

const createPrettyObj = (obj) => {
  return stringifyObject(obj, {
    indent: '  ',
    singleQuotes: true,
  });
};

describe('test atomToModule', () => {
  test('simple with atom defaultParams', () => {
    const obj = sourceMapToModule({
      map,
      defaultParams,
      aliases: {},
    });

    expect(createPrettyObj(obj)).toMatchSnapshot();
  });

  test('simple with aliases', () => {
    const obj = sourceMapToModule({
      map,
      defaultParams: {},
      aliases,
    });

    expect(createPrettyObj(obj)).toMatchSnapshot();
  });
});
