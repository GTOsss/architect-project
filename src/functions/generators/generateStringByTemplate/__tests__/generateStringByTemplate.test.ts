import { generateStringByTemplate } from '../generateStringByTemplate';

describe('generateStringByTemplate', () => {
  it('simple', () => {
    const simpleTemplate = `const {{methodName}} = ({{arg1}}, {{arg2}}) => {{arg1}} + {{arg2}}`;
    const templateParams = { methodName: 'testMethod', arg1: 'firstArg', arg2: 'secondArg' };

    const result = generateStringByTemplate(simpleTemplate, templateParams);
    expect(result).toMatchSnapshot();
  });
});
