import { createGeneratorStrByTemplate, generateStringByTemplate } from '../generateStringByTemplate';

describe('generateStringByTemplate', () => {
  it('simple', () => {
    const simpleTemplate = `const {{methodName}} = ({{arg1}}, {{arg2}}) => {{arg1}} + {{arg2}}`;

    const result = generateStringByTemplate(simpleTemplate, {
      methodName: 'testMethod',
      arg1: 'firstArg',
      arg2: 'secondArg',
    });
    expect(result).toMatchSnapshot();
  });

  it('simple different interpolation syntax', () => {
    const simpleTemplate = 'const @methodName = ({ @varA , @varB }) => [@varA ,@varB ]';

    const result = generateStringByTemplate(
      simpleTemplate,
      { methodName: 'testMethod', varA: 'a', varB: 'b' },
      { itrStart: '@', itrEnd: ' ' },
    );

    expect(result).toMatchSnapshot();
  });
});

describe('createGeneratorStrByTemplate', () => {
  it('simple', () => {
    const genStrByTemplate = createGeneratorStrByTemplate({ itrStart: '#', itrEnd: '#' });
    const result = genStrByTemplate('#var1# #fn#(#arg1#, #arg2#) #var2#', {
      var1: 'first',
      fn: 'fnName',
      arg1: 'argumentA',
      arg2: 'argumentB',
      var2: 'second',
    });

    expect(result).toMatchSnapshot();
  });
});
