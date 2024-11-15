import { resolve } from 'path';
import { requireScript } from './requireScript';
import fs from 'file-system';
import { TemplateObjWithPaths } from './getObjectWithPaths.types';

/**
 * Get recursively file path from dir without "_script_.js/ts" files. */
const getChildPaths = (dir: string, result?: string[]) => {
  result = result || [];

  const files: string[] = fs.readdirSync(dir);

  files.forEach((fileName) => {
    const path = resolve(dir, fileName);

    if (fs.statSync(path).isDirectory()) {
      getChildPaths(path, result);
    } else if (!/_script_\.js|ts$/.test(path)) {
      result.push(path);
    }
  });

  return result;
};

/**
 * Return array of objects with template name, its file paths and script from _script_.js/ts.
 *
 * @example
 *  // return value example:
 *  [
 *    ...,
 *    {
 *      templateName: 'react-component',
 *      script: RequiredTemplateScript,
 *      files: [
 *        'C:/someProject/architect/templates/react-component/[name]/index.ts.hbs',
 *        'C:/someProject/architect/templates/react-component/[name]/[name].tsx.hbs',
 *        'C:/someProject/architect/templates/react-component/[name]/[name].css',
 *      ]
 *    },
 *    ...,
 *  ]
 *
 * */
export const getTemplatesInfo = (dir: string) => {
  const allPaths: TemplateObjWithPaths[] = [];

  const parentPathsFile: string[] = fs.readdirSync(dir);

  parentPathsFile.forEach((el) => {
    const scriptPath = requireScript({ dir, template: el });

    allPaths.push({
      templateName: el,
      files: getChildPaths(resolve(dir, el)),
      script: scriptPath,
    });
  });

  return allPaths;
};
