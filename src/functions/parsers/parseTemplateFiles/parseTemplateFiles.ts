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
export const parseAllInterpolationMarks = (
  str: string,
  re: RegExp,
  config: ArcConfig,
  context: ParserContextEnum = ParserContextEnum.fileContent,
) => {
  const results: ParsedTemplateFragment[] = [];
  let result: RegExpExecArray;
  while ((result = re.exec(str))) {
    const currentResult = result[0];
    const data = getParsedFragmentData(currentResult);
    results.push({
      str: currentResult,
      originStr: getInterpolationOriginFragment(currentResult, config, context),
      index: result.index,
      data,
    });
  }
  return results;
};

export const getInterpolationOriginFragment = (str: string, config: ArcConfig, context: ParserContextEnum) => {
  if (context === ParserContextEnum.fileContent) {
    return [config.itrStart, str, config.itrEnd].join('');
  }

  return [config.itrFileNameStart, str, config.itrFileNameEnd].join('');
};

export const createInterpolationRegExp = (config: ArcConfig) =>
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
export const parseTemplateFiles = (templates: TemplateObjWithPaths[], config: ArcConfig) => {
  const reInterpolation = createInterpolationRegExp(config);

  const parsedTemplateMap: ParsedTemplateMap = {};

  templates.forEach(({ files, script: templateScript, templateName }) => {
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
