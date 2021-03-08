const fs = require('file-system');
const { resolve } = require('path');
const configPath = require('../configPath');

const getScriptPath = (dir) => {
  const allScripts = [];
  const parentPathsFile = fs.readdirSync(dir);
  parentPathsFile.forEach((templateDir) => {
    let script = null;
    try {
      const scriptPath = resolve(configPath.templatesPath, `${templateDir}/_script_`);
      // todo Тут может возникнуть ошибка по 2 причинам
      // 1 не удалось выполнить require модуля (он отсуствует), это стандартная ошибка, ее можно не отлавливать
      // 2 внутри импортируемого модуля может быть ошибка, если это произошло, нужно отловить ее
      // и уведомить пользователя об ошибке внутри скрипта.
      script = require(scriptPath);
    } catch (e) {}
    allScripts.push(script);
  });
  return allScripts;
};

module.exports = getScriptPath;
