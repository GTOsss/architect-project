import { normalize } from 'path';
import { AnyObject } from '../types/common';

export const smartRequire = <T extends AnyObject, F>(path: string, fallback: F) => {
  const currentPath = normalize(path);
  try {
    return require(currentPath) as T;
  } catch (error: any) {
    // Only return fallback if module not found, otherwise rethrow the actual error
    if (error?.code === 'MODULE_NOT_FOUND' && error?.message?.includes(currentPath)) {
      return fallback as F;
    }
    throw error;
  }
};
