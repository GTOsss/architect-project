const appRoot = process.cwd();
const { resolve } = require('path');
const {
  returnOutputPathsWithContent,
  promisifyCliCommand,
  returnOutputPaths,
  SnapshotSerializer,
} = require('../../utils/utilsForArcStart');
const cleanOutPutBeforeTest = require('../../utils/cleanOutPutBeforeTest');

const { pathForCommand, casesOutputPath } = require('../casesConfigPath');

const currentCommand = pathForCommand.variableInTemplate;

describe('variable', () => {
  cleanOutPutBeforeTest(casesOutputPath.variableInTemplate);

  test('get path from variableInTemplate in template', async () => {
    await promisifyCliCommand(`arc s -c ${currentCommand}`);
    const currentPathToOutput = resolve(appRoot, currentCommand, 'output');

    expect(returnOutputPaths(currentPathToOutput)).toMatchSnapshot();
  });
  test('get content variableInTemplate in template', async () => {
    await promisifyCliCommand(`arc s -c ${currentCommand}`);
    const currentPathToOutput = resolve(appRoot, currentCommand, 'output');

    SnapshotSerializer();

    expect(returnOutputPathsWithContent(currentPathToOutput)).toMatchSnapshot();
  });
});
