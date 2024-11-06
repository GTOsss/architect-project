import { ErrorNameEnum } from './errors';

/** Template params in "source-map-module" */
export type TemplateParamsMM = {
  /** Template name */
  template?: string;
  [key: string]: any;
};

type TemplateAsObj = {
  [key: string]: string[];
};

export const isTemplateAsObj = (value: TemplateParamsMM): value is TemplateAsObj => {
  if (typeof value === 'string') {
    return false;
  }

  if (typeof value.template === 'string') {
    return true;
  }

  const err = new Error();
  err.name = ErrorNameEnum.sourceMapValueHasNotTemplateName;
  throw err;
};
