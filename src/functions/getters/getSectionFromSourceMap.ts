import { ErrorNameEnum } from '../../types/errors';
import { isTemplateAsObj, TemplateParamsMM } from '../../types/sourceMapModule';

type GetSectionFromSourceMapResult = {
  path: string;
  content: TemplateParamsMM;
};

type GetSectionFromSourceMapParams = {
  sourcePath: string;
  components: Record<string, TemplateParamsMM>;
  aliases?: Record<string, string>;
};

export const getSectionFromSourceMap = ({
  sourcePath,
  components,
  aliases = {},
}: GetSectionFromSourceMapParams): GetSectionFromSourceMapResult => {
  const objTemplate = Object.entries(components).reduce((acc, [key, val]) => {
    try {
      let valTemplate = isTemplateAsObj(val) ? val.template : val;
      valTemplate = aliases[valTemplate] || valTemplate;

      acc[valTemplate] = [...(acc[valTemplate] || []), key];
      return acc;
    } catch (e) {
      if (e?.name === ErrorNameEnum.sourceMapValueHasNotTemplateName) {
        throw new Error(`SourceMap value has not template name. Field key: \n ${key}`);
      }
    }
  }, {});

  return {
    path: sourcePath,
    content: objTemplate,
  };
};
