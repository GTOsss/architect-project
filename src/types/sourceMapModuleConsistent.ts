export type TemplateParamsConsistent = {
  /** Template name */
  template: string;
  /** Value of variable name for template.
   * @example
   * // In this example name = "button":
   * { [button]: { template: 'react-component' } } */
  name: string;
  /** Output path describe in source map as object key in first lvl source map.
   * @example
   * // In this example outputPath = 'some/output/path'
   * const map = {
   *    'some/output/path': { [button]: template: 'react-component' }
   * }
   * */
  outputPath: string;
  /** Some custom template params from source-map */
  [key: string]: any;
};

/** Second lvl (file-name to template lvl) source-map-module in **consistent format**.
 * @Example
 *
 * const sourceMap = {
 *   <...>,
 *
 *   'src/components/inputs': {
 *     Button: {
 *       template: 'react-component',
 *     }
 *     index: {
 *       template: 'index-file',
 *       params: { <params for "index-file" template> },
 *     },
 *   },
 *
 *   <...>,
 * }
 * */
export type FileLevelConsistentTemplateMap = {
  [name: string]: TemplateParamsConsistent;
};

/**
 * Top level (dir-path lvl) source-map-module in **consistent format**.
 * Pair { "path": { <FileLevelConsistentTemplateMap> } }
 *
 * @Example
 * const sourceMap = {
 *   'src/components': { <FileLevelConsistentTemplateMap> },
 *   'src/user/components': { <FileLevelConsistentTemplateMap> },
 *   'src/pages': { <FileLevelConsistentTemplateMap> },
 *   ...
 * };
 *
 * */
export type SourceMapModuleConsistent = {
  /**
   * "key" = path-to-dir
   *
   * "value" = { <FileLevelTemplateMap> } */
  [path: string]: FileLevelConsistentTemplateMap;
};

export type SourceMapModuleConsistentRequiredFile = {
  aliases: Record<string, string>;
  map: SourceMapModuleConsistent;
};
