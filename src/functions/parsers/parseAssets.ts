import { basename } from 'path';
import fs from 'file-system';
import configPath from '../../configPath';
import { getObjectWithPaths } from '../getters';

export const parseAssets = () => {
  const assetsPath = configPath.assetsPath;

  const allFilesPaths = getObjectWithPaths(assetsPath);

  return allFilesPaths.reduce((acc, { templateName, files }) => {
    acc[templateName] = files.map((path) => ({
      fileName: basename(path),
      path: path,
      content: fs.readFileSync(path),
    }));
    return acc;
  }, {});
};
