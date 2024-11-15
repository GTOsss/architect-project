import { createInterpolationRegExp, parseAllInterpolationMarks } from '../../parsers';
import { ParserContextEnum } from '../../parsers/parseTemplateFiles';
import { generateContentByParsedTemplate } from '../generateContentByParsedTemplate/generateContentByParsedTemplate';

const intrConfig = { itrStart: '{{', itrEnd: '}}' };

type ExtractTemplateKeys<S extends string> = S extends `${infer _Start}{{${infer Key}}}${infer Rest}`
  ? Key | ExtractTemplateKeys<Rest>
  : never;

type GenerateStringByTemplateParams<T extends string> = Record<ExtractTemplateKeys<T>, string>;

/**
 * Utility function for generate text content by templates.
 *
 * @example
 * const simpleTemplate = `const {{methodName}} = ({{arg1}}, {{arg2}}) => {{arg1}} + {{arg2}}`;
 * const templateParams = { methodName: 'testMethod', arg1: 'firstArg', arg2: 'secondArg' };
 *
 * const result = generateStringByTemplate(simpleTemplate, templateParams);
 * // const testMethod = (firstArg, secondArg) => firstArg + secondArg
 * */
export const generateStringByTemplate = <T extends string>(template: T, params: GenerateStringByTemplateParams<T>) => {
  const intrRegExp = createInterpolationRegExp(intrConfig);

  const parsed = parseAllInterpolationMarks(template, intrRegExp, intrConfig, ParserContextEnum.fileContent);
  return generateContentByParsedTemplate({ parsed, content: template }, params as unknown as Record<string, any>, true);
};
