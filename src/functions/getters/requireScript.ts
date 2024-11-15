import { resolve } from 'path';
import { AnyMethod } from '../../types/common';

/** Object with methods from _script_.js/ts */
export type RequiredTemplateScript = Record<string, AnyMethod>;

type RequireScriptParams = { dir: string; template: string };

/**
 * Require _script_.ts/js file. Return objects with its methods.
 * */
export const requireScript = ({ dir, template }: RequireScriptParams) => {
  let script: RequiredTemplateScript = null;
  const scriptPath = resolve(dir, template, `_script_`);

  try {
    script = require(scriptPath);
  } catch (e) {
    const skipErr = `Cannot find module '${scriptPath}'`;

    if (e.message.includes(skipErr)) {
      return;
    }
    console.log(`${e.message}\n${e.stack}`);
  }

  return script;
};
