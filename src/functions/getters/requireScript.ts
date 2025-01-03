import { resolve } from 'path';
import { AnyMethod } from '../../types/common';
import { clearRequireCash } from '../../utils/clearRequireCash';

/** Object with methods from _script_.js/ts */
export type RequiredTemplateScript = Record<string, AnyMethod>;

type RequireScriptParams = { pathToTemplateDir: string; templateName: string };

/**
 * Require _script_.ts/js file. Return objects with its methods.
 *
 * @param pathToTemplateDir Path to dir with templates (architect/templates)
 * @param template Template name.
 *
 * */
export const requireScript = ({ pathToTemplateDir, templateName }: RequireScriptParams) => {
  let script: RequiredTemplateScript = null;
  const scriptPath = resolve(pathToTemplateDir, templateName, `_script_`);

  try {
    clearRequireCash(scriptPath);
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
