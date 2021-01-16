const fs = require('file-system');
const methods = require('../../settings/methods');
const config = require('../../settings/config');

const reInterpolation = new RegExp(`(?<=${config.itrStart}).+?(?=${config.itrEnd})`, 'gm');

const reExec = (str, re) => {
  const results = [];
  let result;
  while ((result = re.exec(str))) {
    results.push({ str: result[0], index: result.index });
  }
  return results;
};

const parseFiles = (templates) => {
  const parsedTemplateMap = {};

  templates.forEach(({ files, script: templateScript, templateName }) => {
    files.forEach((path) => {
      const currentFile = fs.readFileSync(path, 'utf8');
      const results = reExec(currentFile, reInterpolation);
      parsedTemplates.push({
        file: path,
        parseResult: results,
        templateScript,
      });
    });
  });

  console.log(parsedTemplates);
  return parsedTemplates;
};

module.exports = parseFiles;
