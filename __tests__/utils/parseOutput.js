const fs = require('file-system');
const appRoot = process.cwd();
const { resolve } = require('path');

const parseFiles = (templates) => {
  const parsedPathWithTemplate = {};

  templates.forEach(({ files, folder }) => {
    const parsedFiles = [];

    files.forEach((path) => {
      const content = fs.readFileSync(path, 'utf8');

      parsedFiles.push({
        path: path.replace(resolve(appRoot, '__tests__/cases/'), '*').replace(/\\/g, '/'),
        content,
      });
    });

    parsedPathWithTemplate[folder] = parsedFiles;
  });

  return parsedPathWithTemplate;
};

module.exports = parseFiles;
