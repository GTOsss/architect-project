import { SourceMapModule } from '../../../types/sourceMapModule';
import { toConsistentModuleSourceMap } from '../toConsistentModuleSourceMap';

const aliases = {
  /** react-component template */
  rc: 'react-component',

  /** index template - will create "barrel file" via _script_ */
  i: 'index',
};

describe('Source map converters', () => {
  it('module2ToModule simple (only string values)', () => {
    const sourceMapSimple: SourceMapModule = {
      'src/components': {
        header: 'rc',
      },
      'src/components/inputs': {
        button: 'rc',
        index: 'i',
      },
    };

    const result = toConsistentModuleSourceMap({ map: sourceMapSimple, aliases });
    expect(result).toMatchSnapshot();
  });

  it('module2ToModule simple (string and object values)', () => {
    const sourceMapSimple: SourceMapModule = {
      'src/components': {
        header: 'rc',
      },
      'src/components/inputs': {
        button: 'rc',
        index: { template: 'i' },
      },
    };

    const result = toConsistentModuleSourceMap({ map: sourceMapSimple, aliases });
    expect(result).toMatchSnapshot();
  });

  it('module2ToModule simple (string and array values)', () => {
    const sourceMapSimple: SourceMapModule = {
      'src/components': {
        header: 'rc',
      },
      'src/components/inputs': {
        button: 'rc',
        index: ['i', {}],
      },
    };

    const result = toConsistentModuleSourceMap({ map: sourceMapSimple, aliases });
    expect(result).toMatchSnapshot();
  });
});
