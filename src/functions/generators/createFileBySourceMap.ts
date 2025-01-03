import { parseAssets } from '../parsers';
import { generateFilesByTemplate } from './generateFilesByTemplate';
import { generateTemplateFilesWithoutCash } from './generateTemplateFilesWithoutCash';
import { endGeneration } from '../../store';
import { pushFolders } from '../../store';
import { SourceMapModuleConsistentRequiredFile } from '../../types/sourceMapModuleConsistent';
import { ParsedTemplateMap } from '../parsers/parseTemplateFiles';
import { AnyMethod } from '../../types/common';

const memoData = {};

export const memoRebuild = (template) => {
  memoData[template].forEach((templateParams) => {
    generateTemplateFilesWithoutCash({ ...templateParams, template });
  });
};

const awaitEndGeneration = async (endGenerationPromises: PromiseLike<any>[], event: AnyMethod) => {
  await Promise.all(endGenerationPromises);
  event();
};

export const createFilesBySourceMap = (
  parsedTemplateMap: ParsedTemplateMap,
  { map }: SourceMapModuleConsistentRequiredFile,
) => {
  const endGenerationPromises = [];

  Object.entries(map).forEach(([targetPath, componentsMap]) => {
    pushFolders({ folder: targetPath });

    Object.values(componentsMap).forEach((templateParams) => {
      const template = templateParams.template || '';

      const assetsKey = templateParams && templateParams.assets;
      const assets = assetsKey ? parseAssets()[assetsKey] : null;

      const params = { targetPath, assets, sourceMap: map };

      if (memoData[template]) {
        memoData[template].push(params);
      } else {
        memoData[template] = [params];
      }
      endGenerationPromises.push(generateFilesByTemplate({ ...params, templateParams }));
    });
  });

  awaitEndGeneration(endGenerationPromises, endGeneration);
};
