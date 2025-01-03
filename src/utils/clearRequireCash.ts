export const clearRequireCash = (path: string) => {
  delete require.cache[path];
  delete require.cache[`${path}.ts`];
  delete require.cache[`${path}.js`];
  delete require.cache[`${path}.cjs`];
};
