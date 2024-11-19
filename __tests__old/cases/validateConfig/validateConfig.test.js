const fs = require('file-system');
const { resolve } = require('path');
const { validateConfig } = require('../../../src/utils/validateConfig');

const files = fs.readdirSync(resolve(__dirname, './configs'));
const filePaths = files.map((file) => resolve(__dirname, './configs', file));

describe('validate configs', () => {
  test('validate configs', () => {
    filePaths.forEach((path) => {
      const result = validateConfig(require(path));

      expect(result.error).toBeUndefined();
    });
  });
});
