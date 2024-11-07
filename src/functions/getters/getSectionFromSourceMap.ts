import { ErrorNameEnum } from '../../types/errors';
import { checkValidTemplateValue, isTemplateAsObj, TemplateParamsMMAsObj } from '../../types/sourceMapModule';

type GetSectionFromSourceMapResult = {
  path: string;
  content: TemplateParamsMMAsObj;
};

type GetSectionFromSourceMapParams = {
  sourcePath: string;
  components: Record<string, TemplateParamsMMAsObj>;
  aliases?: Record<string, string>;
};

export const getSectionFromSourceMap = ({
  sourcePath,
  components,
  aliases = {},
}: GetSectionFromSourceMapParams): GetSectionFromSourceMapResult => {
  const objTemplate = Object.entries(components).reduce((acc, [key, val]) => {
    try {
      checkValidTemplateValue(val);
      let valTemplate = isTemplateAsObj(val) ? val.template : val;
      valTemplate = aliases[valTemplate] || valTemplate;

      acc[valTemplate] = [...(acc[valTemplate] || []), key];
      return acc;
    } catch (e) {
      if (e?.name === ErrorNameEnum.sourceMapValueHasNotTemplateName) {
        throw new Error(`SourceMap value has not correct template value. Field key: \n ${key}`);
      }
    }
  }, {});

  return {
    path: sourcePath,
    content: objTemplate,
  };
};
