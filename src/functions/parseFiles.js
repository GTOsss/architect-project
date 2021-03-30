const fs = require('file-system');
const configPath = require('../configPath');

const reExec = (str, re) => {
  const results = [];
  let result;
  while ((result = re.exec(str))) {
    results.push({ str: result[0], index: result.index });
  }
  return results;
};

const parseFiles = (templates) => {
  const config = require(configPath.config);
  const reInterpolation = new RegExp(`(?<=${config.itrStart}).+?(?=${config.itrEnd})`, 'gm');

  const parsedTemplateMap = {};

  templates.forEach(({ files, script: templateScript, templateName }) => {
    const parsedFiles = [];

    files.forEach((path) => {
      const content = fs.readFileSync(path, 'utf8');
      const parsed = reExec(content, reInterpolation);
      parsedFiles.push({
        file: path,
        parsed,
        content,
      });
    });

    parsedTemplateMap[templateName] = {
      parsedFiles,
      templateScript,
    };
  });

  return parsedTemplateMap;
};

module.exports = parseFiles;
