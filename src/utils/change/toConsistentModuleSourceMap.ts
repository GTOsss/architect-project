import {
  isString,
  isTemplateAsArray,
  isTemplateAsObj,
  SourceMapModule,
  TemplateParamsMMAsObj,
  TemplateSourceMapMMValue,
} from '../../types/sourceMapModule';
import { TemplateParamsConsistent } from '../../types/sourceMapModuleConsistent';

/**
 * @param templateValue
 * @param aliases
 * @param variableNameValue
 * @param outputPath
 *
 * @example
 * 'react-component'              →   {template: 'react-component'}
 * ['react-component', {}]        →   {template: 'react-component'}
 * {template: 'react-component'}  →   {template: 'react-component'}
 */
const transformToConsistentTemplateValue = (
  templateValue: TemplateSourceMapMMValue,
  aliases: Record<string, string>,
  variableNameValue: string,
  outputPath: string,
): TemplateParamsConsistent => {
  let templateName: string = '';
  let templateParams: TemplateParamsMMAsObj = {};

  if (isString(templateValue)) {
    templateName = templateValue;
  } else if (isTemplateAsArray(templateValue)) {
    templateName = templateValue[0];
    templateParams = templateValue[1];
  } else if (isTemplateAsObj(templateValue)) {
    templateName = templateValue.template || '';
    delete templateValue.template;
    templateParams = templateValue;
  }

  templateName = aliases[templateName] || templateName;

  return { ...templateParams, template: templateName, name: variableNameValue, outputPath };
};

type ToConsistentModuleSourceMap = {
  map: SourceMapModule;
  aliases: Record<string, string>;
};

/**
 * @example
 * const sourceMap = {
 *   'some/output/path': {
 *     button1: 'react-component'
 *     button2: ['react-component', {}]
 *     button3: {template: 'react-component'}
 *   }
 * };
 *
 * ↓  ↓  ↓
 *
 * {
 *   'some/output/path': {
 *     button1: {
 *       variableNameValue: 'button1',
 *       template: 'react-component',
 *       outputPath: 'some/output/path',
 *     },
 *     button2: {
 *       variableNameValue: 'button2',
 *       template: 'react-component',
 *       outputPath: 'some/output/path',
 *     },
 *     button3: {
 *       variableNameValue: 'button3',
 *       template: 'react-component',
 *       outputPath: 'some/output/path',
 *     }
 *   }
 * };
 * */
export const toConsistentModuleSourceMap = ({ map = {}, aliases = {} }: ToConsistentModuleSourceMap) => {
  const moduleMap = Object.entries(map).reduce((acc, [outputPath, fileToTemplateMap]) => {
    acc[outputPath] = Object.entries(fileToTemplateMap).reduce((acc, [variableNameValue, templateValue]) => {
      acc[variableNameValue] = transformToConsistentTemplateValue(
        templateValue,
        aliases,
        variableNameValue,
        outputPath,
      );
      return acc;
    }, {});

    return acc;
  }, {});

  return { map: moduleMap, aliases };
};
