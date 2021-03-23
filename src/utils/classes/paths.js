const appRoot = process.cwd();
const { resolve } = require('path');

module.exports = class Paths {
  _settingsFolder = 'architect';

  set settingsFolder(settingsFolder) {
    this._settingsFolder = settingsFolder;
  }

  get output() {
    const config = require(`${appRoot}/${this._settingsFolder}/config.js`);
    return config.output;
  }

  get eslintConfigPath() {
    return `${appRoot}/.eslintrc.js`;
  }
  get sourcesMapModuleTxtPath() {
    return `${appRoot}/${this._settingsFolder}/source_map/source-map-module.txt`;
  }
  get sourcesMapModuleJsPath() {
    return `${appRoot}/${this._settingsFolder}/source_map/source-map-module.js`;
  }
  get sourcesMapAtomJsPath() {
    return `${appRoot}/${this._settingsFolder}/source_map/source-map-atom.js`;
  }

  get templatesPath() {
    return `${appRoot}/${this._settingsFolder}/templates`;
  }

  get outputPath() {
    return resolve(appRoot, this.output);
  }
  get esLintOutputPath() {
    return `${appRoot}/${this.output}/**/*[.tsx, .ts, .js, .jsx,]`;
  }
  get assetsPath() {
    return `${appRoot}/${this._settingsFolder}/assets`;
  }
  get methodsPath() {
    return `${appRoot}/${this._settingsFolder}/methods`;
  }
  get config() {
    return `${appRoot}/${this._settingsFolder}/config.js`;
  }
  get esLintSourceMapPath() {
    return `${appRoot}/${this._settingsFolder}/source_map/*[.js,]`;
  }
  get arcHistoryPath() {
    return `${appRoot}/${this._settingsFolder}/.arc/history/source-map`;
  }
  get sourceMap() {
    return `${appRoot}/${this._settingsFolder}/source_map`;
  }
  get versionsJsonPath() {
    return `${appRoot}/${this._settingsFolder}/.arc/history/source-map/versions.json`;
  }
  get arcBackupsPath() {
    return `${appRoot}/${this._settingsFolder}/.arc/backups`;
  }
  get backupsVersionsJsonPath() {
    return `${appRoot}/${this._settingsFolder}/.arc/backups/versions.json`;
  }
  get architect() {
    return `${appRoot}/${this._settingsFolder}`;
  }
};
