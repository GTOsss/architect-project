import { ArcConfig } from '../src/types/config';
import { AnyMethod } from '../src/types/common';
import _ from 'lodash';

export const arcMockConfig: ArcConfig = {
  output: 'output-test',
  replace: true,
  clean: false,
  backup: false,
  watch: false,
  itrStart: '{{',
  itrEnd: '}}',
  itrFileNameStart: '[',
  itrFileNameEnd: ']',
  templateExt: '.txt',
  esLint: {
    quiet: false,
  },
  templates: {
    component: {
      replace: false,
    },
  },
};

// mock methods ↓

const toCamelCase = (str) => {
  return _.upperFirst(_.camelCase(str));
};

export const arcMockMethods: Record<string, AnyMethod> = {
  toCamelCase,
};
