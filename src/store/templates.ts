import { restore, createEvent } from 'effector';
import { set } from 'lodash';
import { TemplateObjWithPaths } from '../functions/getters/getObjectWithPaths.types';
import { ParsedTemplateInfo, ParsedTemplateMap } from '../functions/parsers/parseTemplateFiles';

export const setTemplatesInfo = createEvent<TemplateObjWithPaths[]>();
export const $templatesInfo = restore<TemplateObjWithPaths[]>(setTemplatesInfo, []);

export const setParsedTemplateMap = createEvent<ParsedTemplateMap>();
type UpdateTemplateMap = {
  templateName: string;
  parsedTemplateInfo: ParsedTemplateInfo;
};
export const updateTemplateMap = createEvent<UpdateTemplateMap>();
export const $parsedTemplateMap = restore<ParsedTemplateMap>(setParsedTemplateMap, {}).on(
  updateTemplateMap,
  (parsedTemplateMap, { templateName, parsedTemplateInfo }) => set(parsedTemplateMap, templateName, parsedTemplateInfo),
);
