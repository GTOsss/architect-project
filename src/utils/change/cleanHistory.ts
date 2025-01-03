import fs from 'file-system';
import { resolve } from 'path';

export const cleanHistory = ({ jsonArr, arcHistoryPath }) => {
  const pathsToDelete = [];

  jsonArr.push('versions.json');

  try {
    const paths = fs.readdirSync(arcHistoryPath);

    paths.forEach((el) => {
      if (jsonArr.indexOf(el) === -1) {
        pathsToDelete.push(el);
      }
    });
  } catch (err) {
    console.log(err);
  }

  pathsToDelete.forEach((el) => {
    const fullPath = resolve(arcHistoryPath, el);

    try {
      fs.rmdirSync(fullPath);
    } catch (err) {
      console.log(err);
    }
  });
};
