import { normalize } from 'path';
import { AnyObject } from '../types/common';

export const smartRequire = <T extends AnyObject, F>(path: string, fallback: F) => {
  const currentPath = normalize(path);
  try {
    return require(currentPath) as T;
  } catch {
    return fallback as F;
  }
};
