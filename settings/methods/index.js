const _ = require('lodash');

const toCamelCase = (str) => {
  return _.upperFirst(_.camelCase(str));
};

const toKebabCase = (str) => {
  return _.kebabCase(str);
};

module.exports = {
  toCamelCase,
  toKebabCase,
};
