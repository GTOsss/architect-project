import { getObjectWithPaths } from '../getters';
import { parseFiles } from '../parsers';
import { createFilesBySourceMap } from '../generators';
import { withEslint } from '../../store/esLint';
import config from '../../configPath';
import chalk from 'chalk';

const getTemplateMap = () => {
  const templates = getObjectWithPaths(config.templatesPath);
  return parseFiles(templates);
};

type StartParams = {
  sourcesMap: Record<string, any>;
  str?: string;
};

export const arcStart = ({ sourcesMap, str }: StartParams) => {
  if (str) chalk.yellow(str);

  createFilesBySourceMap(getTemplateMap(), sourcesMap);
};

export const arcStartWithEslint = ({ sourcesMap, str }: StartParams) => {
  if (str) chalk.yellow(str);

  createFilesBySourceMap(getTemplateMap(), sourcesMap);
  withEslint();
};
