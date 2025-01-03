import { basename } from 'path';
import fs from 'file-system';
import { getTemplatesInfo } from '../getters';

export const parseAssets = () => {
  const allFilesPaths = getTemplatesInfo();

  return allFilesPaths.reduce((acc, { templateName, files }) => {
    acc[templateName] = files.map((path) => ({
      fileName: basename(path),
      path: path,
      content: fs.readFileSync(path),
    }));
    return acc;
  }, {});
};
