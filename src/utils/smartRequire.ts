import { AnyObject } from '../types/common';

export const smartRequire = <T extends AnyObject, F extends any>(path: string, fallback: F) => {
  try {
    return require(path) as T;
  } catch {
    return fallback;
  }
};
