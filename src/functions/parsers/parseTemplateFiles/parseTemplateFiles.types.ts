import { RequiredTemplateScript } from '../../getters';
import { ParsedFragmentData } from './parseTemplateFragments.types';

export type ParsedTemplateFragment = {
  /** Original interpolation fragment without brackets */
  str: string;
  /** Original interpolation fragment with brackets */
  originStr: string;
  index: number;
  data: ParsedFragmentData;
};

/**
 * @example
 * {
 *     file: 'C:/project/architect/templates/component[name][name].tsx.hbs',
 *     parsed: [
 *       {
 *         str: 'name',
 *         index: 67,
 *         data: ParsedFragmentData,
 *       },
 *       {
 *         str: 'toCamelCase(name)',
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
 * */
export type ParsedTemplateFile = {
  file: string;
  parsed: ParsedTemplateFragment[];
  content: string;
};

export type ParsedTemplateInfo = {
  templateScript: RequiredTemplateScript;
  parsedFiles: ParsedTemplateFile[];
};

export type ParsedTemplateMap = {
  [templateName: string]: ParsedTemplateInfo;
};

export enum ParserContextEnum {
  'filePath' = 'filePath',
  'fileContent' = 'fileContent',
}
