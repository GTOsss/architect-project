import { $arcConfig } from '../../config';
import { createEvent, createStore, sample } from 'effector';
import { createFSWatcherForTemplates } from './watcher.utils';
import { FSWatcherMap, AddFSWatcherByTemplateParams, FSWatchHandlerParams, EventName } from './watcher.types';
import { addWatcherForTemplate } from './watcher.reducers';
import { $parsedTemplateMap, updateTemplateMap } from '../../templates';
import { generateFilesByTemplate, getTemplateInfo, parseTemplateFile } from '../../../functions';
import { $sourceMapAtom, $sourceMapModule } from '../../sourceMaps';
import { SourceMapModuleConsistent } from '../../../types/sourceMapModuleConsistent';
import { ParsedTemplateMap } from '../../../functions/parsers/parseTemplateFiles';
import chalk from 'chalk';

/** Add chokidar fs watcher to particular template */
export const addFSWatcherByTemplate = createEvent<AddFSWatcherByTemplateParams>();
export const $FSWatchersMapByTemplate = createStore<FSWatcherMap>({}).on(addFSWatcherByTemplate, addWatcherForTemplate);

sample({
  source: $arcConfig,
  fn: createFSWatcherForTemplates,
  target: $FSWatchersMapByTemplate,
});

export const changeTemplate = createEvent<FSWatchHandlerParams>();

$FSWatchersMapByTemplate.watch((watchersMapByTemplate) =>
  Object.entries(watchersMapByTemplate).forEach(([templateName, fsWatcher]) => {
    fsWatcher.on('all', (eventName: EventName, filepath: string) =>
      changeTemplate({ templateName, filepath, eventName }),
    );
  }),
);

const changedTemplateHandler = sample({
  source: {
    parsedTemplateMap: $parsedTemplateMap,
    sourceMapAtom: $sourceMapAtom,
    sourceMapModule: $sourceMapModule,
  },
  clock: changeTemplate,
  fn: (combineInfo, { templateName, filepath, eventName }) => {
    return { templateName, filepath, eventName, ...combineInfo };
  },
});

type GenerateFilesOfParticularTemplate = {
  parsedTemplateMap: ParsedTemplateMap;
  sourceMap: SourceMapModuleConsistent;
};

/**
 * Generate files of particular template.
 * @param map sourceMap
 */
const generateFilesOfParticularTemplate = ({ sourceMap, ...rest }: GenerateFilesOfParticularTemplate) => {
  Object.entries(sourceMap).forEach(([targetPath, componentsMap]) => {
    Object.values(componentsMap).forEach((templateParams) => {
      generateFilesByTemplate({ ...rest, templateParams, targetPath, sourceMap, assets: [] });
    });
  });
};

changedTemplateHandler.watch(({ sourceMapAtom, sourceMapModule, parsedTemplateMap, templateName }) => {
  console.log(chalk.yellow('Updated template:'), templateName);

  // Update parseTemplateInfo of current changed template.
  const templateInfo = getTemplateInfo(templateName);
  const parsedTemplateInfo = parseTemplateFile(templateInfo);
  updateTemplateMap({ parsedTemplateInfo, templateName });

  // Regenerate all files of current changed template.
  if (sourceMapModule) {
    generateFilesOfParticularTemplate({ parsedTemplateMap, sourceMap: sourceMapModule.map });
  }
  if (sourceMapAtom) {
    generateFilesOfParticularTemplate({ parsedTemplateMap, sourceMap: sourceMapAtom.map });
  }
});
