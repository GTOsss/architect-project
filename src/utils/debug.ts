import { writeFileSync, appendFileSync } from 'file-system';
import { resolve } from 'path';
import { AnyObject } from '../types/common';

const jsonStringifyReplacer = (_: string, value: any) => (value === undefined ? 'UNDEFINED' : value);

const cwd = process.cwd();

export const logToFile = (content: string, name = 'logToFile', append = true) => {
  const path = resolve(cwd, `${name}.txt`);
  if (append) {
    appendFileSync(path, `\n\n${content}`);
  } else {
    writeFileSync(path, content);
  }
};

export const logToFileJson = (obj: AnyObject, name = 'logToFileJson', append = true) => {
  const path = resolve(cwd, `${name}.json`);

  const content = JSON.stringify(obj, jsonStringifyReplacer, '  ');
  if (append) {
    appendFileSync(path, content);
  } else {
    writeFileSync(path, content);
  }
};
