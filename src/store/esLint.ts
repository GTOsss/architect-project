import { createApi, createStore } from 'effector';
import config from '../configPath';
import { $createdFilesList, $replacedFilesList } from './createdFiles';
import { startEsLint } from '../functions';
import { smartRequire } from '../utils/smartRequire';

const $esLintSwitcher = createStore(false);

export const { withEslint } = createApi($esLintSwitcher, {
  withEslint: () => true,
});

$esLintSwitcher.watch((esLintState) => {
  const eslintConfig = smartRequire(config.eslintConfigPath, null);

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
