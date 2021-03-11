const fs = require('file-system');
const configPath = require('../configPath');
const { resolve } = require('path');
const exportPath = resolve(configPath.arcHistoryPath, 'versions.json');

const createVersionsJson = () => {
  const defContent = {
    versions: [],
    current: 0,
  };
  const prettyDefContent = JSON.stringify(defContent, null, '  ');

  fs.writeFileSync(exportPath, prettyDefContent);

  return require(configPath.versionsJsonPath);
};

const json = fs.existsSync(configPath.versionsJsonPath) ? require(configPath.versionsJsonPath) : createVersionsJson();

const appendVersion = (date) => {
  json.versions.push(date);
  json.current = json.versions.length;

  const content = JSON.stringify(json, null, '  ');

  fs.writeFileSync(exportPath, content);
};

module.exports = appendVersion;
