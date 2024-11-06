export const smartRequire = <T>(path: string, fallback: T = undefined): T => {
  try {
    return require(path);
  } catch {
    return fallback;
  }
};
