const Joi = require('joi');

const templatesSchema = Joi.object().custom((value) => {
  Object.values(value).forEach((templateValue) => {
    const schema = Joi.object({
      replace: Joi.boolean(),
      clean: Joi.boolean(),
      watch: Joi.array().items(Joi.string()),
    });

    const result = schema.validate(templateValue);

    if (result.error) {
      throw new Error(result.error);
    }
  });
  return true;
});

const configSchema = Joi.object({
  output: Joi.string().required(),
  replace: Joi.boolean(),
  clean: Joi.boolean(),
  itrStart: Joi.string().required(),
  itrEnd: Joi.string().required(),
  itrFileNameStart: Joi.string().required(),
  itrFileNameEnd: Joi.string().required(),
  templateExt: Joi.string().required(),
  esLint: Joi.object({
    quiet: Joi.boolean(),
  }),
  templates: templatesSchema,
});

const aliasesSchema = Joi.object().custom((value) => {
  Object.values(value).forEach((aliasesValue) => {
    const schema = Joi.string();
    const result = schema.validate(aliasesValue);

    if (result.error) {
      throw new Error(result.error);
    }
  });
  return true;
});

const templateParamsSchema = Joi.array().items(
  Joi.string().required(),
  Joi.object({
    variable: Joi.string(),
    assets: Joi.string(),
  }),
);

const moduleMapSchema = Joi.object().custom((value) => {
  Object.values(value).forEach((component) => {
    const componentSchema = Joi.object();

    const componentValidationResult = componentSchema.validate(component);

    if (componentValidationResult.error) {
      throw new Error(componentValidationResult.error);
    }

    Object.values(component).forEach((params) => {
      const paramsValidationResult = templateParamsSchema.validate(params);
      if (paramsValidationResult.error) {
        throw new Error(paramsValidationResult.error);
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
      throw new Error(componentValidationResult.error);
    }
  });

  return true;
});

const validateConfig = (config) => {
  return configSchema.validate(config);
};

const validateModuleMap = (map) => {
  return moduleMapSchema.validate(map);
};

const validateAtomMap = (map) => {
  return atomMapSchema.validate(map);
};

const validateAliases = (aliases) => {
  return aliasesSchema.validate(aliases);
};

module.exports = { validateConfig, validateModuleMap, validateAtomMap, validateAliases };
