const { createStore, createApi } = require('./rootDomain');
const { $createdFilesList, $replacedFilesList } = require('./createdFiles');
const startEsLint = require('../functions/starters/startESLint');
const config = require('../configPath');

const $esLintSwitcher = createStore(false);

const { withEslint } = createApi($esLintSwitcher, {
  withEslint: () => true,
});

$esLintSwitcher.watch((esLintState) => {
  const eslintConfig = require(config.eslintConfigPath);

  $createdFilesList.watch((state) => {
    if (state.length !== 0 && esLintState) {
      //start EsLint

      startEsLint({ eslintConfig, outputPath: state }).catch((error) => {
        process.exitCode = 1;
        console.error(error);
      });
    }
  });

  $replacedFilesList.watch((state) => {
    if (state.length !== 0 && esLintState) {
      //start EsLint

      startEsLint({ eslintConfig, outputPath: state }).catch((error) => {
        process.exitCode = 1;
        console.error(error);
      });
    }
  });
});

module.exports = { withEslint };
