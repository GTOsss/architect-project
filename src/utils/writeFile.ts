import fs from 'file-system';
import { resolve } from 'path';

export const getWriteFile =
  (dirPath) =>
  (content, { rPath }) => {
    fs.writeFileSync(resolve(dirPath, rPath), content);
  };

export const getWriteFileStream =
  (dirPath) =>
  ({ data, rPath = '', fileName = 'test.txt' }) => {
    fs.mkdirSync(resolve(dirPath, rPath));

    data.pipe(fs.createWriteStream(resolve(dirPath, rPath, fileName)));
  };
