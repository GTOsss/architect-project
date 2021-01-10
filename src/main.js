const fs = require('fs');
const { resolve } = require('path');
const _ = require('lodash');

const newName = 'my component';

const toCamelCase = (str) => {
  return _.upperFirst(_.camelCase(str));
};

console.log('camel: ', toCamelCase(newName));
console.log('kebab: ', _.kebabCase(newName));
