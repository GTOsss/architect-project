const appRoot = process.cwd();
const { resolve } = require('path');
const {
  returnOutputPathsWithContent,
  promisifyCliCommand,
  SnapshotSerializer,
} = require('../../utils/utilsForArcStart');
const cleanOutPutBeforeTest = require('../../utils/cleanOutPutBeforeTest');
const { pathForCommand, casesOutputPath } = require('../casesConfigPath');

const currentCommand = pathForCommand.assetsFromSourceMap;

describe('assetsFromSourceMap', () => {
  cleanOutPutBeforeTest(casesOutputPath.assetsFromSourceMap);

  test('test call function from script', async () => {
    await promisifyCliCommand(`arc s -c ${currentCommand}`);
    const currentPathToOutput = resolve(appRoot, currentCommand, 'output');

    SnapshotSerializer();

    expect(returnOutputPathsWithContent(currentPathToOutput)).toMatchSnapshot();
  });
});
