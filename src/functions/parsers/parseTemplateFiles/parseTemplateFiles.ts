import fs from 'file-system';
import { TemplateObjWithPaths } from '../../getters/getObjectWithPaths.types';
import {
  ParsedTemplateFile,
  ParsedTemplateFragment,
  ParsedTemplateMap,
  ParserContextEnum,
} from './parseTemplateFiles.types';
import { getParsedFragmentData } from './parseTemplateFragments.utils';
import { ArcConfig } from '../../../types/config';
import { getConfigByTemplate } from '../../../store/config';

/** Interpolation settings from config for content of file */
export type IntrFileConfig = Pick<ArcConfig, 'itrStart' | 'itrEnd'>;
/** Interpolation settings from config for filepath */
export type IntrFilePathConfig = Pick<ArcConfig, 'itrFileNameStart' | 'itrFileNameEnd'>;

export type IntrConfig<ParseCxt extends ParserContextEnum> = ParseCxt extends ParserContextEnum.fileContent
  ? IntrFileConfig
  : IntrFilePathConfig;

/**
 * Executes a regular expression on a given string and returns an array of matches.
 *
 * • Iterates over all matches of regexp.
 * • For each match found, it stores an object containing the matched substring and the zero-based index at which it was found.
 *
 * @param str - The string on which to execute the regular expression.
 * @param re - The regular expression to execute. Should have the global flag set
 *              (`/g`) for multiple matches, since `exec` advances the lastIndex property.
 * @param config - Arc config
 * @param context - Indicator of file content or path. Need for correct make "originStr"
 * @returns An array of objects, each representing a match. Each object contains:
 *          - `str`: the matched substring.
 *          - `index`: the starting position of the match within `str`.
 *
 * @example
 *
 * const str = "This is a {test} string with {multiple} braces.";
 * const re = /(?<=\{).+?(?=})/g; // lookbehind `(?<=\{)` and lookahead `(?=})` to find content enclosed in curly braces.
 * const matches = reExec(str, re); // result:
 *  [
 *    { data: ParsedFragmentData, str: 'test', originStr: '{{test}}',  index: 10 },
 *    { data: ParsedFragmentData, str: 'multiple', originStr: '{{multiple}}', index: 28 }
 *  ]
 *
 */
export const parseAllInterpolationMarks = <ParserCxt extends ParserContextEnum>(
  str: string,
  re: RegExp,
  config: IntrConfig<ParserCxt>,
  context?: ParserCxt,
) => {
  const results: ParsedTemplateFragment[] = [];
  let result: RegExpExecArray;
  while ((result = re.exec(str))) {
    const currentResult = result[0];
    const data = getParsedFragmentData(currentResult);
    results.push({
      str: currentResult,
      originStr: getInterpolationOriginFragment(currentResult, config, context ?? ParserContextEnum.fileContent),
      index: result.index,
      data,
    });
  }
  return results;
};

export const getInterpolationOriginFragment = <ParserCxt extends ParserContextEnum>(
  str: string,
  config: ParserCxt extends ParserContextEnum.fileContent ? IntrFileConfig : IntrFilePathConfig,
  context: ParserCxt,
) => {
  if (context === ParserContextEnum.fileContent) {
    const currentConfig = config as IntrFileConfig;
    return [currentConfig.itrStart, str, currentConfig.itrEnd].join('');
  }

  const currentConfig = config as IntrFilePathConfig;
  return [currentConfig.itrFileNameStart, str, currentConfig.itrFileNameEnd].join('');
};

export const createInterpolationRegExp = (config: IntrFileConfig) =>
  new RegExp(`(?<=${config.itrStart}).+?(?=${config.itrEnd})`, 'gm');

/**
 * Iterates by template files, read and parse it to object with interpolation info.
 *
 * @example
 * // example of return data:
 * const result = [
 *   {
 *     file: 'C:/project/architect/templates/component[name][name].tsx.hbs',
 *     parsed: [
 *       {
 *         str: 'name',
 *         originStr: '{{name}}',
 *         index: 67,
 *         data: ParsedFragmentData,
 *       },
 *       {
 *         str: 'toCamelCase(name)',
 *         originStr: '{{toCamelCase(name)}}',
 *         index: 97,
 *         data: ParsedFragmentData,
 *       },
 *     ],
 *     content: `
 *        import React, { memo } from 'react';
 *        import styles from './{{name}}.module.css';
 *
 *        type {{toCamelCase(name)}}Props = {} ...`,
 *   },
 *   ...,
 * ];
 * */
export const parseTemplateFiles = (templates: TemplateObjWithPaths[]) => {
  const parsedTemplateMap: ParsedTemplateMap = {};

  templates.forEach(({ files, script: templateScript, templateName }) => {
    const config = getConfigByTemplate(templateName);
    const reInterpolation = createInterpolationRegExp(config);
    const parsedFiles: ParsedTemplateFile[] = [];

    files.forEach((path) => {
      const content = fs.readFileSync(path, 'utf8');
      const parsed = parseAllInterpolationMarks(content, reInterpolation, config);
      parsedFiles.push({
        file: path,
        parsed,
        content,
      });
    });

    parsedTemplateMap[templateName] = {
      parsedFiles,
      templateScript,
    };
  });

  return parsedTemplateMap;
};
