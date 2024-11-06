import { resolve } from 'path';
import { getScriptPath } from './getScriptPath';
import fs from 'file-system';

const getChildPaths = (dir: string, result?: string[]) => {
  result = result || [];

  const files: string[] = fs.readdirSync(dir);

  files.forEach((fileName) => {
    const path = resolve(dir, fileName);

    if (fs.statSync(path).isDirectory()) {
      getChildPaths(path, result);
    } else if (!/_script_.js$/.test(path)) {
      result.push(path);
    }
  });

  return result;
};

export const getObjectWithPaths = (dir: string) => {
  const allPaths = [];

  const parentPathsFile: string[] = fs.readdirSync(dir);

  parentPathsFile.forEach((el) => {
    const scriptPath = getScriptPath({ dir, template: el });

    allPaths.push({
      templateName: el,
      files: getChildPaths(resolve(dir, el)),
      script: scriptPath,
    });
  });

  return allPaths;
};
