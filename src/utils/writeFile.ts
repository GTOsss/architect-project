import fs from 'file-system';
import { resolve } from 'path';
import { endGeneration, pushFiles } from '../store';

export const getWriteFile = (dirPath: string) => (content: string, fileName: string) => {
  let filePath = dirPath;
  try {
    filePath = resolve(dirPath, fileName);
    fs.writeFileSync(resolve(dirPath, fileName), content);
    pushFiles({ filePath });
  } catch (e) {
    console.error(`Problem with "writeFile" method for path "${filePath}"`);
  }
};

export const getWriteFileStream =
  (dirPath: string) =>
  ({ data, rPath = '', fileName }) => {
    fs.mkdirSync(resolve(dirPath, rPath));
    data.pipe(fs.createWriteStream(resolve(dirPath, rPath, fileName)));
  };
