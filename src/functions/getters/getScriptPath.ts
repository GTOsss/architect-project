import { resolve } from 'path';

export const getScriptPath = ({ dir, template }) => {
  let script = null;
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
