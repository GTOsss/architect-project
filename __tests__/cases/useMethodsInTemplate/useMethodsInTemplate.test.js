const appRoot = process.cwd();
const { resolve } = require('path');
const {
  returnOutputPathsWithContent,
  promisifyCliCommand,
  SnapshotSerializer,
} = require('../../utils/utilsForArcStart');
const cleanOutPutBeforeTest = require('../../utils/cleanOutPutBeforeTest');

const { pathForCommand, casesOutputPath } = require('../casesConfigPath');

describe('useMethodsInTemplate', () => {
  cleanOutPutBeforeTest(casesOutputPath.assetsFromSourceMap);

  test('test call function from Method if this function does not exist in __script.js__', async () => {
    await promisifyCliCommand(`arc s -c ${pathForCommand.useMethodsInTemplate}`);
    const currentPathToOutput = resolve(appRoot, pathForCommand.useMethodsInTemplate, 'output');

    SnapshotSerializer();

    expect(returnOutputPathsWithContent(currentPathToOutput)).toMatchSnapshot();
  });
});
