import { createEvent, restore } from 'effector';
import { ArcConfig } from '../types/config';
import { getConfigByTemplate as getConfigByTemplateUtil } from '../utils/getConfigByTemplate';

export const setConfig = createEvent<ArcConfig>();

const initArcConfig: ArcConfig = {
  output: 'src',
  replace: false,
  clean: false,
  watch: false,
  backup: false,
  itrStart: '{{',
  itrEnd: '}}',
  itrFileNameStart: '[',
  itrFileNameEnd: ']',
  templateExt: '.txt',
  esLint: {
    autofix: false,
    configFile: '',
  },
  templates: {},
};

export const $arcConfig = restore(setConfig, initArcConfig);

export const getConfigByTemplate = (templateName: string) =>
  getConfigByTemplateUtil($arcConfig.getState(), templateName);
