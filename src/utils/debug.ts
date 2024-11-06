import { writeFileSync } from 'file-system';
import { resolve } from 'path';
import { AnyObject } from '../types/common';

const cwd = process.cwd();

export const logToFile = (content: string, name = 'logToFile.txt') => {
  const path = resolve(cwd, name);
  writeFileSync(path, content);
};

export const logToFileJson = (content: AnyObject, name = 'logToFileJson.json') => {
  const path = resolve(cwd, name);
  writeFileSync(path, JSON.stringify(content, null, '  '));
};
