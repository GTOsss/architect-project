const fs = require('file-system');
const config = require('../settings/config');

const getPaths = (dir, result) => {
  result = result || [];

  const files = fs.readdirSync(dir);

  for (const i in files) {
    const path = `${dir}/${files[i]}`;

    if (fs.statSync(path).isDirectory()) {
      getPaths(path, result);
    } else if (!/\_script_.js$/.test(path)) {
      result.push(path);
    }
  }

  return result;
};

const templatesPath = 'C:/Users/mail/Desktop/timoha/arhitect/architect/settings/templates';

const allPath = getPaths(templatesPath);
console.log(allPath);
// const regExp = `/(?<=${config.itrStart}).+(?=${config.itrEnd})/gm`;
//
// const filePath = 'C:/Users/mail/Desktop/timoha/arhitect/architect/settings/templates/index/index.ts.txt';
//
// const file = async (filePath) => {
//   fs.readFile(filePath, 'utf8', (err, contents) => {
//     if (err) throw err;
//
//     console.log(contents);
//   });
// };
// file(filePath);
