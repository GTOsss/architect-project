const fs = require('file-system');
const { arcBackupsPath, backupsVersionsJsonPath } = require('../../configPath');
const { resolve } = require('path');
const exportPath = resolve(arcBackupsPath, 'versions.json');
const _ = require('lodash');
const cleanHistory = require('./cleanHistory');

const createVersionsJson = (template) => {
  const defContent = {
    [template]: {
      versions: [],
      current: -1,
    },
  };
  const prettyDefContent = JSON.stringify(defContent, null, '  ');

  try {
    fs.writeFileSync(exportPath, prettyDefContent);
  } catch (err) {
    console.log(err);
  }

  return require(backupsVersionsJsonPath);
};

const appendVersion = ({ date, template, config }) => {
  const json = fs.existsSync(backupsVersionsJsonPath) ? require(backupsVersionsJsonPath) : createVersionsJson(template);

  if (!_.get(json, [template, 'versions'])) {
    _.set(json, [template, 'versions'], []);
  }

  if (!_.get(json, [template, 'current'])) {
    _.set(json, [template, 'current'], 0);
  }

  const versions = _.get(json, [template, 'versions']);

  let currentVersion = _.get(json, [template, 'current']);

  if (versions.includes(date)) {
    return;
  }

  versions.unshift(date);

  currentVersion = versions.length - 1;
  json[template].current = currentVersion;

  const count = config.backups === true ? 1 : config.backups;

  if (json[template].versions.length > count) {
    json[template].versions.pop();
    json[template].current = count - 1;
  }

  const content = JSON.stringify(json, null, '  ');

  try {
    fs.writeFileSync(exportPath, content);
  } catch (err) {
    console.log(err);
  }

  cleanHistory({ jsonArr: json[template].versions, arcBackupsPath, template });
};

module.exports = appendVersion;
