import { HelpAPI } from './src/functions';

/**
 * Function for generate template. Should be exported from _script_.<js/ts> files.
 *
 * @param params Params from source map.
 * @param helpAPI Help utils and variables from arc.
 *
 * */
export type CustomTemplateFunction = (params: any, helpApi: HelpAPI) => string | void;

export { HelpAPI } from './src/functions';
