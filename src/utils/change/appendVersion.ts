import fs from 'file-system';
import paths from '../../configPath';
import { resolve } from 'path';
import { cleanHistory } from './cleanHistory';

const { arcHistoryPath, versionsJsonPath } = paths;

const createVersionsJson = async () => {
  const defContent = {
    versions: [],
    current: -1,
  };
  const prettyDefContent = JSON.stringify(defContent, null, '  ');

  try {
    const exportPath = resolve(arcHistoryPath, 'versions.json');
    fs.writeFileSync(exportPath, prettyDefContent);
  } catch (err) {
    console.log(err);
  }

  return require(versionsJsonPath);
};

export const appendVersion = (date) => {
  const json = fs.existsSync(versionsJsonPath) ? require(versionsJsonPath) : createVersionsJson();

  json.versions.unshift(date);
  json.current = -1;

  if (json.versions.length > 5) {
    json.versions.pop();
  }

  const content = JSON.stringify(json, null, '  ');

  try {
    const exportPath = resolve(arcHistoryPath, 'versions.json');
    fs.writeFileSync(exportPath, content);
  } catch (err) {
    console.log(err);
  }

  cleanHistory({ jsonArr: json.versions, arcHistoryPath });
};
