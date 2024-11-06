import fs from 'file-system';

export const promisifyWriteFile = (filePath, parsedContent, { method }) => {
  try {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(filePath, parsedContent, (err) => {
        if (err) reject(err);
        else {
          method({ filePath });

          resolve();
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};
