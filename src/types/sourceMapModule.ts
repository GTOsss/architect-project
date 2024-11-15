import { ErrorNameEnum } from './errors';

/** Template params in "source-map-module" as arr */
export type TemplateParamsMMAsArray = [string, { [key: string]: any }];

/** Template params in "source-map-module" as obj (base **consistent format**) */
export type TemplateParamsMMAsObj = {
  /** Template name */
  template?: string;
  [key: string]: any;
};

export type TemplateSourceMapMMValue = string | TemplateParamsMMAsObj | TemplateParamsMMAsArray;

/**
 * Second level (file-name to template lvl) source-map-module.
 * Pair { ["fileName"]: <templateName/templateParamsObj> }

 * @Example
 * const sourceMap = {
 *   <...>,
 *
 *   'src/components/inputs': {
 *     Button: 'react-component',
 *     Input: 'react-component',
 *     index: {
 *       template: 'index-file',
 *       params: { <params for "index-file" template> },
 *     },
 *   },
 *
 *   <...>,
 * }
 *
 * */
export type FileLevelTemplateMap = {
  [name: string]: TemplateSourceMapMMValue;
};

/**
 * Top level (dir-path lvl) source-map-module.
 * Pair { "path": { FileLevelTemplateMap> } }
 *
 * @Example
 * const sourceMap = {
 *   'src/components': { <FileLevelTemplateMap> },
 *   'src/user/components': { <FileLevelTemplateMap> },
 *   'src/pages': { <FileLevelTemplateMap> },
 *   ...
 * };
 *
 * */
export type SourceMapModule = {
  /**
   * "key" = path-to-dir
   *
   * "value" = { <FileLevelTemplateMap> } */
  [path: string]: FileLevelTemplateMap;
};

export const isString = (value: any): value is string => typeof value === 'string';

export const isTemplateAsArray = (value: TemplateSourceMapMMValue): value is TemplateParamsMMAsArray => {
  if (isString(value)) {
    return false;
  }

  return Array.isArray(value) && typeof value[0] === 'string';
};

export const isTemplateAsObj = (value: TemplateSourceMapMMValue): value is TemplateParamsMMAsObj => {
  if (isString(value)) {
    return false;
  }

  return !Array.isArray(value) && typeof value.template === 'string';
};

/**
 * Will throw error if sourceMap has incorrect value.
 * */
export const checkValidTemplateValue = (value: TemplateSourceMapMMValue) => {
  if (isString(value) || isTemplateAsObj(value) || isTemplateAsArray(value)) {
    return;
  }

  const err = new Error();
  err.name = ErrorNameEnum.sourceMapValueHasNotTemplateName;
  throw err;
};

export type SourceMapModuleRequiredFile = {
  aliases: Record<string, string>;
  map: SourceMapModule;
};
