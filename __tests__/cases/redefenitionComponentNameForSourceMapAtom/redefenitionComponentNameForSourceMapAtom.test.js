const appRoot = process.cwd();
const { resolve } = require('path');
const {
  returnOutputPathsWithContent,
  promisifyCliCommand,
  SnapshotSerializer,
} = require('../../utils/utilsForArcStart');
const cleanOutPutBeforeTest = require('../../utils/cleanOutPutBeforeTest');
const { pathForCommand, casesOutputPath } = require('../casesConfigPath');

const currentCommand = pathForCommand.redefenitionComponentNameForSourceMapAtom;

describe('redefenition Component Name For SourceMapAtom', () => {
  cleanOutPutBeforeTest(casesOutputPath.redefenitionComponentNameForSourceMapAtom);

  test('redefenition Component Name For SourceMapAtom', async () => {
    await promisifyCliCommand(`arc s -c ${currentCommand}`);
    const currentPathToOutput = resolve(appRoot, currentCommand, 'output');

    SnapshotSerializer();

    expect(returnOutputPathsWithContent(currentPathToOutput)).toMatchSnapshot();
  });
});
