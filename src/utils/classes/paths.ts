import { resolve } from 'path';

/**
 * Object with getters for all app paths. For example: outputPath, sourcemap.
 * */
export class Paths {
  _settingsFolder = 'architect';
  /** Current working dir of process. Get via process.cwd()  */
  cwd = process.cwd();

  set settingsFolder(settingsFolder: string) {
    this._settingsFolder = settingsFolder;
  }

  get output() {
    const configFile = require(`${this.cwd}/${this._settingsFolder}/config`);
    // Operator "or" need because config may require via Node module system
    const config = configFile.config || configFile;
    return config.output;
  }
  get eslintConfigPath() {
    return `${this.cwd}/.eslintrc.js`;
  }
  get sourceMapModule() {
    return `${this.cwd}/${this._settingsFolder}/source_map/source-map-module`;
  }
  get sourceMapAtom() {
    return `${this.cwd}/${this._settingsFolder}/source_map/source-map-atom`;
  }
  get templatesPath() {
    return `${this.cwd}/${this._settingsFolder}/templates`;
  }
  get outputPath() {
    return resolve(this.cwd, this.output);
  }
  get esLintOutputPath() {
    return `${this.cwd}/${this.output}/**/*[.tsx, .ts, .js, .jsx,]`;
  }
  get assetsPath() {
    return `${this.cwd}/${this._settingsFolder}/assets`;
  }
  get methodsPath() {
    return `${this.cwd}/${this._settingsFolder}/methods`;
  }
  get config() {
    return `${this.cwd}/${this._settingsFolder}/config`;
  }
  get esLintSourceMapPath() {
    return `${this.cwd}/${this._settingsFolder}/source_map/*[.js,]`;
  }
  get arcHistoryPath() {
    return `${this.cwd}/${this._settingsFolder}/.arc/history/source-map`;
  }
  get sourceMap() {
    return `${this.cwd}/${this._settingsFolder}/source_map`;
  }
  get versionsJsonPath() {
    return `${this.cwd}/${this._settingsFolder}/.arc/history/source-map/versions.json`;
  }
  get arcBackupsPath() {
    return `${this.cwd}/${this._settingsFolder}/.arc/backups`;
  }
  get backupsVersionsJsonPath() {
    return `${this.cwd}/${this._settingsFolder}/.arc/backups/versions.json`;
  }
  get architect() {
    return `${this.cwd}/${this._settingsFolder}`;
  }
}
