import { createResultsTable } from './testUtils';
import { getFunctionArgument, getFunctionName } from '../parseTemplateFragments.utils';
import { parseAllInterpolationMarks } from '../parseTemplateFiles';
import { interpolationRegExp, functionTemplate, miniTemplate } from './mock';
import { arcMockConfig } from '../../../../../__tests__/mock';

describe('parseTemplateFiles', () => {
  it('getFunctionName', () => {
    const result = getFunctionName('toCamelCase(name)');
    expect(result).toEqual('toCamelCase');
  });

  it('getFunctionArgument', () => {
    const result = getFunctionArgument('toCamelCase(name)');
    expect(result).toEqual('name');
  });

  it('isCallFunctionStr', () => {
    const result = createResultsTable();
    expect(result).toMatchSnapshot();
  });

  it('parseAllInterpolationMarks', () => {
    const result = parseAllInterpolationMarks(functionTemplate, interpolationRegExp, arcMockConfig);
    expect(result).toMatchSnapshot();
  });

  it('parseAllInterpolationMarks mini template', () => {
    const result = parseAllInterpolationMarks(miniTemplate, interpolationRegExp, arcMockConfig);
    expect({ input: miniTemplate, result }).toMatchSnapshot();
  });
});
