import {
  isString,
  isTemplateAsArray,
  isTemplateAsObj,
  TemplateParamsMMAsObj,
  TemplateSourceMapValue,
} from '../../types/sourceMapModule';

/**
 * @example
 * 'react-component'              →   {template: 'react-component'}
 * ['react-component', {}]        →   {template: 'react-component'}
 * {template: 'react-component'}  →   {template: 'react-component'}
 * */
const transformToConsistentTemplateValue = (templateValue: TemplateSourceMapValue, aliases: Record<string, string>) => {
  let templateName: string;
  let templateParams: TemplateParamsMMAsObj = {};

  if (isString(templateValue)) {
    templateName = templateValue;
  } else if (isTemplateAsArray(templateValue)) {
    templateName = templateValue[0];
    templateParams = templateValue[1];
  } else if (isTemplateAsObj(templateValue)) {
    templateName = templateValue.template;
    delete templateValue.template;
    templateParams = templateValue;
  }

  templateName = aliases[templateName] || templateName;

  return { template: templateName, ...templateParams };
};

/**
 * @example
 * const sourceMap = {
 *   button1: 'react-component'
 *   button2: ['react-component', {}]
 *   button3: {template: 'react-component'}
 * };
 *
 * ↓  ↓  ↓
 *
 * {
 *   button1: {template: 'react-component'},
 *   button2: {template: 'react-component'},
 *   button3: {template: 'react-component'}
 * };
 * */
export const toConsistentModuleSourceMap = ({ map: sourceMapModule2 = {}, aliases = {} }) => {
  const moduleMap = Object.entries(sourceMapModule2).reduce((acc, [path, fileToTemplateMap]) => {
    acc[path] = Object.entries(fileToTemplateMap).reduce((acc, [fileName, templateValue]) => {
      acc[fileName] = transformToConsistentTemplateValue(templateValue, aliases);
      return acc;
    }, {});

    return acc;
  }, {});

  return { map: moduleMap, aliases };
};
