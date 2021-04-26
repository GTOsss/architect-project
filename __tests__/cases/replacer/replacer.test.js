const { resolve } = require('path');
const fs = require('file-system');
const { promisifyCliCommand } = require('../../utils/utilsForArcStart');
const { pathForCommand, casesOutputPath } = require('../casesConfigPath');
const { calculateHashSum, calculateHashSumInTemplate } = require('../../utils/calculateHashSum');
const config = require('./config');

const currentCommand = pathForCommand.replacer;

const appendFile = () => {
  const componentIndexFilePath = resolve(__dirname, './templates/component/[name]/index.ts.txt');
  const iconIndexFilePath = resolve(__dirname, './templates/icons/name/index.ts.txt');
  const pathFiles = [componentIndexFilePath, iconIndexFilePath];

  const dataToAppend = "\n const doChanges = 'do changes';";
  pathFiles.forEach((path) => {
    fs.appendFileSync(path, dataToAppend);
  });
};

describe('replacer', () => {
  test('flag replace global', async () => {
    await promisifyCliCommand(`arc s -c ${currentCommand}`);

    const hashSumBefore = calculateHashSum(casesOutputPath.replacer);

    appendFile();

    await promisifyCliCommand(`arc s -c ${currentCommand}`);

    const hashSumAfter = calculateHashSum(casesOutputPath.replacer);

    console.log('>>>hashSumBefore', hashSumBefore);
    console.log('>>>hashSumAfter', hashSumAfter);

    if (config.replace === true) {
      expect(hashSumBefore).not.toBe(hashSumAfter);
    } else if (config.replace === false) {
      expect(hashSumBefore).toBe(hashSumAfter);
    } else {
      console.log('какая-то ошибка...');
    }
  });
  test('flag replace in template', async () => {
    await promisifyCliCommand(`arc s -c ${currentCommand}`);

    const hashSumBefore = calculateHashSumInTemplate({ path: `${casesOutputPath.replacer}/src`, config });

    appendFile();

    await promisifyCliCommand(`arc s -c ${currentCommand}`);

    const hashSumAfter = calculateHashSumInTemplate({ path: `${casesOutputPath.replacer}/src`, config });

    console.log('>>>hashSumBefore', hashSumBefore);
    console.log('>>>hashSumAfter', hashSumAfter);

    Object.entries(config.templates).forEach(([key, value]) => {
      if (value.replace === true) {
        expect(hashSumBefore[key]).not.toBe(hashSumAfter[key]);
      } else if (value.replace === false) {
        expect(hashSumBefore[key]).toBe(hashSumAfter[key]);
      } else {
        console.log('какая-то ошибка...');
      }
    });
  });
});
