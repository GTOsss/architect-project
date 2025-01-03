import { createInterpolationRegExp, parseAllInterpolationMarks } from '../../parsers';
import { ParserContextEnum } from '../../parsers/parseTemplateFiles';
import { generateContentByParsedTemplate } from '../generateContentByParsedTemplate/generateContentByParsedTemplate';

const defaultInterpolationConfig = { itrStart: '{{', itrEnd: '}}' };

type IntrFileConfig<IS extends string, IE extends string> = {
  itrStart: IS;
  itrEnd: IE;
};

type ExtractTemplateKeys<
  S extends string,
  IS extends string,
  IE extends string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = S extends `${infer _Start}${IS}${infer Key}${IE}${infer Rest}` ? Key | ExtractTemplateKeys<Rest, IS, IE> : never;

type GenerateStringByTemplateParams<T extends string, IS extends string, IE extends string> = Record<
  ExtractTemplateKeys<T, IS, IE>,
  string
>;

/**
 * Utility function for generating text content by templates.
 *
 * @example
 * const simpleTemplate = `const {{methodName}} = ({{arg1}}, {{arg2}}) => {{arg1}} + {{arg2}}`;
 * const templateParams = { methodName: 'testMethod', arg1: 'firstArg', arg2: 'secondArg' };
 *
 * const result = generateStringByTemplate(simpleTemplate, templateParams);
 * // const testMethod = (firstArg, secondArg) => firstArg + secondArg
 * */
export function generateStringByTemplate<T extends string, IS extends string = '{{', IE extends string = '}}'>(
  template: T,
  params: GenerateStringByTemplateParams<T, IS, IE>,
  interpolationConfig?: IntrFileConfig<IS, IE>,
) {
  const intrConfig = interpolationConfig || defaultInterpolationConfig;
  const intrRegExp = createInterpolationRegExp(intrConfig);

  const parsed = parseAllInterpolationMarks(template, intrRegExp, intrConfig, ParserContextEnum.fileContent);
  return generateContentByParsedTemplate({ parsed, content: template }, params as unknown as Record<string, any>, true);
}

/**
 * Fabric method for create generator with custom config.
 *
 * @example
 * export const genCode = createGeneratorStrByTemplate({ itrStart: '~', itrEnd: '~' });
 * const fnTemplate = `export const ~name~ = (~params~) => ~body~`;
 *
 * genCode(fnTemplate, { name: 'myMethod', params: '{ a, b }', body: 'a + b' });
 * // ↓ genCode result ↓
 * "export const myMethod = ({ a, b }) => a + b"
 * */
export const createGeneratorStrByTemplate = <IS extends string, IE extends string>(config: IntrFileConfig<IS, IE>) => {
  return <T extends string>(template: T, params: GenerateStringByTemplateParams<T, IS, IE>) => {
    return generateStringByTemplate(template, params, config);
  };
};
