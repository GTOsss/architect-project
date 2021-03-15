const { ESLint } = require('eslint');
const configPath = require('../configPath');
const config = require(configPath.config);

const startEsLint = async ({ eslintConfig, outputPath }) => {
  // 1. Create an instance.
  const eslint = new ESLint({ fix: true, baseConfig: eslintConfig });

  // 2. Lint files.
  const results = await eslint.lintFiles([outputPath]);

  await ESLint.outputFixes(results);

  if (!config.esLint.quiet) {
    // 3. Format the results.
    const formatter = await eslint.loadFormatter('stylish');
    const resultText = formatter.format(results);

    // 4. Output it.
    console.log(resultText);
  }
};

module.exports = startEsLint;
