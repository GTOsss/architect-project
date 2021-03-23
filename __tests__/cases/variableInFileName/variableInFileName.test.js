const appRoot = process.cwd();
const { resolve } = require('path');
const {
  returnOutputPathsWithContent,
  promisifyCliCommand,
  returnOutputPaths,
  SnapshotSerializer,
} = require('../../utils/utilsForArcStart');
const { pathForCommand } = require('../casesConfigPath');

const currentCommand = pathForCommand.variableInFileName;

describe('variable', () => {
  test('get path from variableInFileName in template', async () => {
    await promisifyCliCommand(`arc s -c ${currentCommand}`);
    const currentPathToOutput = resolve(appRoot, currentCommand, 'output');

    expect(returnOutputPaths(currentPathToOutput)).toMatchSnapshot();
  });
  test('get content variableInFileName in template', async () => {
    await promisifyCliCommand(`arc s -c ${currentCommand}`);
    const currentPathToOutput = resolve(appRoot, currentCommand, 'output');

    SnapshotSerializer();

    expect(returnOutputPathsWithContent(currentPathToOutput)).toMatchSnapshot();
  });
});
