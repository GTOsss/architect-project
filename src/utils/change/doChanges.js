const fs = require('file-system');
const chalk = require('chalk');
const smartRequire = require('../smartRequire');
const { versionsJsonPath, arcHistoryPath, sourceMap: sourceMapPath } = require('../../configPath');
const json = smartRequire(versionsJsonPath, {});
const { resolve } = require('path');

const doChanges = ({ json, logVariable }) => {
  const current = json.versions[json.current];
  const fileName = current.includes('atm') ? 'source-map-module.js' : 'source-map-atom.js.ts';

  const currentPath = resolve(arcHistoryPath, current, fileName);
  const targetPath = resolve(sourceMapPath, fileName);

  try {
    fs.copyFileSync(currentPath, targetPath);
    console.log(chalk.yellow(`${logVariable} ${current} to ${sourceMapPath}...`));
  } catch (err) {
    console.log(err);
  }

  const content = JSON.stringify(json, null, '  ');

  try {
    fs.writeFileSync(versionsJsonPath, content);
  } catch (err) {
    console.log(err);
  }
};

const redoingChanges = () => {
  if (json.current === 0) {
    // TODO возможен баг, надо где-то хранить версию -1(с которой начались командо undo redo)
    json.current -= 1;
    const content = JSON.stringify(json, null, '  ');

    try {
      fs.writeFileSync(versionsJsonPath, content);
    } catch (err) {
      console.log(err);
    }

    return;
  }

  const logVariable = 'Redo';
  json.current -= 1;

  return doChanges({ json, logVariable });
};

const undoingChanges = () => {
  if (json.current === 4) {
    return;
  }

  const logVariable = 'Undo';
  json.current += 1;

  doChanges({ json, logVariable });
};

module.exports = {
  redoingChanges,
  undoingChanges,
};
