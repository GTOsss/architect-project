const fs = require('file-system');
const config = require('../../settings/config');

const reInterpolation = new RegExp(`(?<=${config.itrStart}).+?(?=${config.itrEnd})`, 'gm');

const parseFiles = (pathsInArray) => {
  const result = [];

  for (let i in pathsInArray) {
    const paths = pathsInArray[i];

    const contents = fs.readFileSync(paths, { encoding: 'utf8' });

    const matchedContents = contents.match(reInterpolation);

    result.push(matchedContents);
  }

  return result;
};

module.exports = parseFiles;
