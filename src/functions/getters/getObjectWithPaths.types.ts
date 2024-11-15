import { RequiredTemplateScript } from './requireScript';

/**
 * @example
 * const templateObjWithPaths = {
 *   templateName: 'react-component',
 *   files: [
 *    'C:/project/architect/react-component/[name]/[name].tsx',
 *    ...,
 *   ],
 *   script: <RequiredTemplateScript>,
 * }
 *
 * */
export type TemplateObjWithPaths = {
  templateName: string;
  /** Array of absolute path to files.
   * @example ['C:/project/architect/react-component/[name]/[name].tsx', ...] */
  files: string[];
  /** Script from _script_ */
  script?: RequiredTemplateScript;
};
