import { requireSourceMaps, getTemplatesInfo } from '../getters';
import { parseTemplateFiles } from '../parsers';
import { createFilesBySourceMap } from '../generators';
import configPath from '../../configPath';
import { validateConfig } from '../../utils/validators';
import { smartRequire } from '../../utils/smartRequire';
import { ArcConfig } from '../../types/config';
import { setConfig } from '../../store/config';
import { setParsedTemplateMap, setTemplatesInfo } from '../../store/templates';

import '../../store/composeEffects';

type StartParams = {
  /** Path to config directory of architect. Default 'architect' */
  settingsFolder: string;
};

export const arcStart = ({ settingsFolder = 'architect' }: StartParams) => {
  // set settings folder
  configPath.settingsFolder = settingsFolder;

  // require main config
  const configFile = smartRequire<{ config: ArcConfig }, null>(configPath.config, null);

  if (!configFile) {
    throw new Error(`Configuration file not found at ${configPath.config}`);
  }

  const config = configFile.config;
  setConfig(config);

  // validate main config
  validateConfig(config);

  // require, validate and transform sourceMaps to consistent format
  const { transformedSourceMapModule, transformedSourceMapAtom } = requireSourceMaps();

  // get info about templates to store (base info like path to files)
  const templates = getTemplatesInfo();
  setTemplatesInfo(templates);
  // parse each template and save data
  const parsedTemplateInfoMap = parseTemplateFiles(templates);
  setParsedTemplateMap(parsedTemplateInfoMap);

  // create files by parsed templates
  if (transformedSourceMapModule) createFilesBySourceMap(parsedTemplateInfoMap, transformedSourceMapModule);
  if (transformedSourceMapAtom) createFilesBySourceMap(parsedTemplateInfoMap, transformedSourceMapAtom);
};

export const arcStartWithEslint = ({ settingsFolder }: StartParams) => {
  console.error('arcStartWithEslint not supported in current version');

  // if (str) chalk.yellow(str);

  // createFilesBySourceMap(getTemplateMap(), sourcesMap);
  // withEslint();
};
