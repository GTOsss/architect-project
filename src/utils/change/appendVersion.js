const fs = require('file-system');
const { arcHistoryPath, versionsJsonPath } = require('../../configPath');
const { resolve } = require('path');
const exportPath = resolve(arcHistoryPath, 'versions.json');
const cleanHistory = require('./cleanHistory');

let json;

const createVersionsJson = async () => {
  const defContent = {
    versions: [],
    current: -1,
  };
  const prettyDefContent = JSON.stringify(defContent, null, '  ');

  try {
    fs.writeFile(exportPath, prettyDefContent, null, () => {
      json = require(versionsJsonPath);
    });
  } catch (err) {
    console.log(err);
  }
};

if (!fs.existsSync(versionsJsonPath)) {
  createVersionsJson();
}

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
