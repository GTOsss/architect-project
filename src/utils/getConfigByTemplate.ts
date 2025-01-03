import { omit } from 'lodash';
import { ArcConfig } from '../types/config';

/**
 * Get config for current template. Method doing next things:
 * • Receive templateName and config, then merge "base config params" with "template config params".
 * • Template config override base config params.
 * • Return actual config for current template.
 *
 * @param config
 * @param templateName
 */
export const getConfigByTemplate = (config: ArcConfig, templateName: string) => {
  const baseConfig = omit(config, 'templates');
  const templateConfig = config.templates[templateName];
  const baseEslint = config.esLint;
  const templateEslint = config.templates[templateName]?.esLint || {};

  return { ...baseConfig, ...templateConfig, eslint: { ...baseEslint, ...templateEslint } };
};
