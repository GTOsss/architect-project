const pathToTests = '__tests__/cases';

const pathForCommand = {
  variableInTemplate: `${pathToTests}/variableInTemplate`,
  variableInFileName: `${pathToTests}/variableInFileName`,
  assetsFromSourceMap: `${pathToTests}/assetsFromSourceMap`,
  script: `${pathToTests}/script`,
  scriptCallMain: `${pathToTests}/scriptCallMain`,
  useMethodsInTemplate: `${pathToTests}/useMethodsInTemplate`,
  asyncFunctionInScript: `${pathToTests}/asyncFunctionInScript`,
  redefenitionComponentNameForSourceMapAtom: `${pathToTests}/redefenitionComponentNameForSourceMapAtom`,
  relativePathForSourceMapAtom: `${pathToTests}/relativePathForSourceMapAtom`,
};

const casesOutputPath = Object.entries(pathForCommand).reduce((acc, [key, value]) => {
  acc[key] = `${value}/output`;

  return acc;
}, {});

module.exports = { pathForCommand, casesOutputPath };
