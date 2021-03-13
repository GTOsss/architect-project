const fs = require('file-system');
const { arcHistoryPath, versionsJsonPath } = require('../../configPath');
const { resolve } = require('path');
const exportPath = resolve(arcHistoryPath, 'versions.json');
const cleanHistory = require('./cleanHistory');

const createVersionsJson = () => {
  const defContent = {
    versions: [],
    current: -1,
  };
  const prettyDefContent = JSON.stringify(defContent, null, '  ');

  try {
    fs.writeFileSync(exportPath, prettyDefContent);
  } catch (err) {
    console.log(err);
  }

  return require(versionsJsonPath);
};

const json = fs.existsSync(versionsJsonPath) ? require(versionsJsonPath) : createVersionsJson();

const appendVersion = (date) => {
  json.versions.unshift(date);
  json.current = -1;

  if (json.versions.length > 5) {
    json.versions.pop();
  }

  const content = JSON.stringify(json, null, '  ');

  try {
    fs.writeFileSync(exportPath, content);
  } catch (err) {
    console.log(err);
  }

  cleanHistory({ jsonArr: json.versions, arcHistoryPath });
};

module.exports = appendVersion;
