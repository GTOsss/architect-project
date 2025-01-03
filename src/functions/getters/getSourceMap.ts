import configPath from '../../configPath';
import { atomToModuleSourceMap } from '../../utils/change/atomToModuleSourceMap';
import { toConsistentModuleSourceMap } from '../../utils/change/toConsistentModuleSourceMap';
import { validateSourceMapFiles } from '../../utils/validators';
import { smartRequire } from '../../utils/smartRequire';
import { SourceMapModuleRequiredFile } from '../../types/sourceMapModule';
import { SourceMapAtomRequiredFile } from '../../types/sourceMapAtom';
import chalk from 'chalk';
import { SourceMapModuleConsistentRequiredFile } from '../../types/sourceMapModuleConsistent';
import { setSourceMapAtom, setSourceMapModule } from '../../store/sourceMaps';

type Result = {
  transformedSourceMapModule: SourceMapModuleConsistentRequiredFile;
  transformedSourceMapAtom: SourceMapModuleConsistentRequiredFile;
};

/**
 * Require sourceMaps files, validate and transform its to consistent format. */
export const requireSourceMaps = () => {
  const sourceMapModule = smartRequire<SourceMapModuleRequiredFile, null>(configPath.sourceMapModule, null);
  const sourceMapAtom = smartRequire<SourceMapAtomRequiredFile, null>(configPath.sourceMapAtom, null);

  const result: Result = {
    transformedSourceMapModule: null,
    transformedSourceMapAtom: null,
  };

  validateSourceMapFiles({ sourceMapModule, sourceMapAtom });

  if (sourceMapModule) {
    console.log(chalk.yellow('Detected "source-map-module"'));

    result.transformedSourceMapModule = toConsistentModuleSourceMap(sourceMapModule);
    setSourceMapModule(result.transformedSourceMapModule);
  }

  if (sourceMapAtom) {
    console.log(chalk.yellow('Detected "source-map-atom"'));

    result.transformedSourceMapAtom = atomToModuleSourceMap(sourceMapAtom);
    setSourceMapAtom(result.transformedSourceMapAtom);
  }

  return result;
};
