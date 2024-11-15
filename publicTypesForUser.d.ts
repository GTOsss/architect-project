import { HelpAPI } from './src/functions';
import { TemplateParamsConsistent } from './src/types/sourceMapModuleConsistent';

/**
 * Function for generate template. Should be exported from _script_.<js/ts> files.
 *
 * @param params Params from source map.
 * @param helpAPI Help utils and variables from arc.
 *
 * */
export type CustomTemplateFunction = (
  params: TemplateParamsConsistent['variableNameValue'],
  helpApi: HelpAPI,
) => string | void;

export { HelpAPI } from './src/functions';
export * from './src/types/sourceMapModuleConsistent';

export * from './publicMethods';
