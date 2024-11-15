import { parseAllInterpolationMarks } from '../../../parsers';
import { interpolationRegExp } from '../../../parsers/parseTemplateFiles/__tests__/mock';
import { arcMockConfig, arcMockMethods } from '../../../../../__tests__/mock';
import { simpleFunctionTemplate_callFunction, simpleFunctionTemplate_variable } from './mock';
import { generateContentByParsedTemplate } from '../generateContentByParsedTemplate';

const secondArgMock = {
  templateScript: arcMockMethods,
  sourceMap: {},
  assets: [],
};

// todo Refactor for large repeatable block of codes for all file test (need add mock data)

describe('generateContentByParsedTemplate', () => {
  it('simple template with variable', () => {
    const parsedFragments = parseAllInterpolationMarks(
      simpleFunctionTemplate_variable,
      interpolationRegExp,
      arcMockConfig,
    );
    const result = generateContentByParsedTemplate(
      {
        content: simpleFunctionTemplate_variable,
        parsed: parsedFragments,
      },
      {
        templateParams: { name: 'TEST_VALUE_NAME', template: '', outputPath: '' },
        ...secondArgMock,
      },
    );
    expect(result).toMatchSnapshot();
  });

  it('simple template with call function', () => {
    const parsedFragments = parseAllInterpolationMarks(
      simpleFunctionTemplate_callFunction,
      interpolationRegExp,
      arcMockConfig,
    );
    const result = generateContentByParsedTemplate(
      {
        content: simpleFunctionTemplate_callFunction,
        parsed: parsedFragments,
      },
      {
        templateParams: { name: 'TEST_VALUE_NAME', template: '', outputPath: '' },
        ...secondArgMock,
      },
    );
    expect(result).toMatchSnapshot();
  });
});
