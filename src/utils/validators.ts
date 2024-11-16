import Joi from 'joi';
import { SourceMapAtomRequiredFile } from '../types/sourceMapAtom';
import { SourceMapModuleRequiredFile } from '../types/sourceMapModule';
import { AnyObject } from '../types/common';

const templatesSchema = Joi.object().custom((value) => {
  Object.values(value).forEach((templateValue) => {
    const schema = Joi.object({
      replace: Joi.boolean(),
      clean: Joi.boolean(),
      watch: Joi.array().items(Joi.string()),
      output: Joi.string(),
      itrStart: Joi.string(),
      itrEnd: Joi.string(),
      itrFileNameStart: Joi.string(),
      itrFileNameEnd: Joi.string(),
      templateExt: Joi.string(),
      esLint: Joi.object({
        quiet: Joi.boolean(),
      }),
    });

    const result = schema.validate(templateValue);

    if (result.error) {
      throw new Error(result.error.message);
    }
  });
  return true;
});

const configSchema = Joi.object({
  output: Joi.string().required(),
  replace: Joi.boolean().required(),
  clean: Joi.boolean().required(),
  watch: Joi.boolean().required(),
  itrStart: Joi.string().required(),
  itrEnd: Joi.string().required(),
  itrFileNameStart: Joi.string().required(),
  itrFileNameEnd: Joi.string().required(),
  templateExt: Joi.string().required(),
  esLint: Joi.object({
    quiet: Joi.boolean().required(),
  }),
  templates: templatesSchema,
});

const aliasesSchema = Joi.object().custom((value) => {
  Object.values(value).forEach((aliasesValue) => {
    const schema = Joi.string();
    const result = schema.validate(aliasesValue);

    if (result.error) {
      throw new Error(result.error.message);
    }
  });
  return true;
});

const templateParamsSchema = Joi.alternatives(Joi.string().required(), Joi.object().required());

const moduleMapSchema = Joi.object().custom((value: AnyObject) => {
  Object.values(value).forEach((component: AnyObject) => {
    const componentSchema = Joi.object();

    const componentValidationResult = componentSchema.validate(component);

    if (componentValidationResult.error) {
      throw new Error(componentValidationResult.error.message);
    }

    Object.values(component).forEach((params) => {
      const paramsValidationResult = templateParamsSchema.validate(params);
      if (paramsValidationResult.error) {
        throw new Error(paramsValidationResult.error.message);
      }
    });
  });

  return true;
});

const atomMapSchema = Joi.object().custom((value) => {
  Object.values(value).forEach((component) => {
    const componentSchema = Joi.array().items(Joi.string(), Joi.array());

    const componentValidationResult = componentSchema.validate(component);

    if (componentValidationResult.error) {
      throw new Error(componentValidationResult.error.message);
    }
  });

  return true;
});

export const validateConfig = (config) => {
  const validateConfigResult = configSchema.validate(config);

  if (validateConfigResult.error) {
    throw new Error(validateConfigResult.error.message);
  }
};

export const validateModuleMap = (map) => {
  const validateModuleMapResult = moduleMapSchema.validate(map);

  if (validateModuleMapResult.error) {
    throw new Error(validateModuleMapResult.error.message);
  }
};

export const validateAtomMap = (map) => {
  const validateAtomMapResult = atomMapSchema.validate(map);

  if (validateAtomMapResult.error) {
    throw new Error(validateAtomMapResult.error.message);
  }
};

export const validateAliases = (aliases: Record<string, string>) => {
  if (!aliases) return;

  const validateAliasesResult = aliasesSchema.validate(aliases);

  if (validateAliasesResult.error) {
    throw new Error(validateAliasesResult.error.message);
  }
};

type ValidateSourceMapsParams = {
  sourceMapModule?: SourceMapModuleRequiredFile | null;
  sourceMapAtom?: SourceMapAtomRequiredFile | null;
};
export const validateSourceMapFiles = ({ sourceMapAtom, sourceMapModule }: ValidateSourceMapsParams) => {
  if (!sourceMapAtom && !sourceMapModule) {
    throw new Error('No detect source map files.');
  }

  if (sourceMapModule) {
    validateAliases(sourceMapModule.aliases);
    validateModuleMap(sourceMapModule);
  }

  if (sourceMapAtom) {
    validateAliases(sourceMapAtom.aliases);
    validateAtomMap(sourceMapAtom);
  }
};
