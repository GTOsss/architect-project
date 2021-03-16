const appRoot = process.cwd();

module.exports = class Paths {
  settingsFolder = '/architect';

  set settingsFolder(settingsFolder) {
    this.settingsFolder = settingsFolder;
    console.log('set', settingsFolder);
  }
  get eslintConfigPath() {
    return `${appRoot}/.eslintrc.js`;
  }
  get sourcesMapModuleTxtPath() {
    return `${appRoot}${this.settingsFolder}/source_map/source-map-module.txt`;
  }
  get sourcesMapModuleJsPath() {
    return `${appRoot}${this.settingsFolder}/source_map/source-map-module.js`;
  }
  get sourcesMapAtomJsPath() {
    return `${appRoot}${this.settingsFolder}/source_map/source-map-atom.js`;
  }
  get esLintOutputPath() {
    return `${appRoot}/${output}/**/*[.tsx, .ts, .js, .jsx,]`;
  }
  get templatesPath() {
    return `${appRoot}${this.settingsFolder}/templates`;
  }
  get parseSourceMapPath() {
    return `${appRoot}/src/functions/parseSourceMap`;
  }
  get outputPath() {
    const { output } = require(`${appRoot}/${this.settingsFolder}/config.js`);
    return `${appRoot}/${output}`;
  }
  get assetsPath() {
    return `${appRoot}${this.settingsFolder}/assets`;
  }
  get methodsPath() {
    return `${appRoot}${this.settingsFolder}/methods`;
  }
  get config() {
    return `${appRoot}${this.settingsFolder}/config.js`;
  }
  get esLintSourceMapPath() {
    return `${appRoot}${this.settingsFolder}/source_map/*[.js,]`;
  }
  get arcHistoryPath() {
    return `${appRoot}${this.settingsFolder}/.arc/history/source-map`;
  }
  get sourceMap() {
    return `${appRoot}/${this.settingsFolder}/source_map`;
  }
  get versionsJsonPath() {
    return `${appRoot}${this.settingsFolder}/.arc/history/source-map/versions.json`;
  }
  get arcBackupsPath() {
    return `${appRoot}${this.settingsFolder}/.arc/backups`;
  }
  get backupsVersionsJsonPath() {
    return `${appRoot}${this.settingsFolder}/.arc/backups/versions.json`;
  }
  get architect() {
    return `${appRoot}/${this.settingsFolder}`;
  }
};
