import { createInterpolationRegExp } from '../../parseTemplateFiles';
import { arcMockConfig } from '../../../../../../__tests__/mock';

export const interpolationRegExp = createInterpolationRegExp(arcMockConfig);

export const validFnStrings = [
  'func(a);',
  'func(a1);',
  'func1(a)',
  'func1(a2)',
  'camelNameFn()',
  'CamelNameFn()',
  'camelNameFn(a)',
  'CamelNameFn(a)',
  'toCamelCase(name)',
  'func (a);',
  'func (a1);',
  'func1 (a)',
  'func1 (a2)',
  'func(3)',
  'a()',
  'a1()',
];

export const invalidFnStrings = ['(a)', '(a1)', 'fn(a b)', 'func(a b c)', 'fn(1a a)', 'test', 'test1'];

export const functionTemplate = `export type {{toCamelCase(name)}}Params = {};

// Method "{{name}}"
export const {{toLowerCamelCase(name)}} = ({}: {{toCamelCase(name)}}Params) => {

}`;

export const miniTemplate = `so{{me}} "{{fn(name)}}"`;
