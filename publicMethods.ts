export {
  generateStringByTemplate,
  createGeneratorStrByTemplate,
} from './src/functions/generators/generateStringByTemplate';

export type { HelpAPI } from './src/functions/requireFunction';

export type {
  TemplateParamsConsistent,
  FileLevelConsistentTemplateMap,
  SourceMapModuleConsistent,
  SourceMapModuleConsistentRequiredFile,
} from './src/types/sourceMapModuleConsistent';

export type { ESLinkConfig, TemplateConfig, ArcConfig } from './src/types/config';

/**
 * Function for generate template. Should be exported from _script_.<js/ts> files.
 *
 * @param params Params from source map.
 * @param helpAPI Help utils and variables from arc.
 * */
export type CustomTemplateFunction = (
  params: import('./src/types/sourceMapModuleConsistent').TemplateParamsConsistent['variableNameValue'],
  helpApi: import('./src/functions/requireFunction').HelpAPI,
) => string | void;
