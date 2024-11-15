import configPath from '../../configPath';
import { atomToModuleSourceMap } from '../../utils/change/atomToModuleSourceMap';
import { toConsistentModuleSourceMap } from '../../utils/change/toConsistentModuleSourceMap';
import { validateSourceMapFiles } from '../../utils/validators';
import { smartRequire } from '../../utils/smartRequire';
import { SourceMapModuleRequiredFile } from '../../types/sourceMapModule';
import { SourceMapAtomRequiredFile } from '../../types/sourceMapAtom';
import chalk from 'chalk';

/**
 * Require sourceMaps files, validate and transform its to consistent format. */
export const requireSourceMaps = () => {
  const sourceMapModule = smartRequire<SourceMapModuleRequiredFile, null>(configPath.sourceMapModuleJsPath, null);
  const sourceMapAtom = smartRequire<SourceMapAtomRequiredFile, null>(configPath.sourceMapAtomJsPath, null);

  validateSourceMapFiles({ sourceMapModule, sourceMapAtom });

  if (sourceMapModule) {
    console.log(chalk.yellow('Detected "source-map-module"'));
  }
  if (sourceMapAtom) {
    console.log(chalk.yellow('Detected "source-map-atom"'));
  }

  return {
    transformedSourceMapModule: sourceMapModule && toConsistentModuleSourceMap(sourceMapModule),
    transformedSourceMapAtom: sourceMapAtom && atomToModuleSourceMap(sourceMapAtom),
  };
};
