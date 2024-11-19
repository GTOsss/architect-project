const appRoot = process.cwd();
const { resolve } = require('path');
const { returnOutputPaths, promisifyCliCommand } = require('../../utils/utilsForArcStart');
const cleanOutPutBeforeTest = require('../../utils/cleanOutPutBeforeTest');
const { pathForCommand, casesOutputPath } = require('../casesConfigPath');

const currentCommand = pathForCommand.relativePathForSourceMapAtom;

describe('relativePathForSourceMapAtom', () => {
  cleanOutPutBeforeTest(casesOutputPath.relativePathForSourceMapAtom);

  test('test relative Path For SourceMapAtom', async () => {
    await promisifyCliCommand(`arc s -c ${currentCommand}`);
    const currentPathToOutput = resolve(appRoot, currentCommand, 'output');

    expect(returnOutputPaths(currentPathToOutput)).toMatchSnapshot();
  });
});
