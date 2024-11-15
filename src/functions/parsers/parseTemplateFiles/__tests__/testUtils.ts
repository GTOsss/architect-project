import { invalidFnStrings, validFnStrings } from './mock';
import { isCallFunctionStr } from '../parseTemplateFragments.utils';

/**
 * Create snapshot with list input/output values of "isCallFunctionStr".
 *
 * @example
 * createResultsTable() //
 * // inputStr → result
 * // "fn()"  → true
 * // "fn(n)" → true
 * // ...
 * */
export const createResultsTable = (): string => {
  const validValues = validFnStrings.map((str) => `${str.padEnd(20)} → ${isCallFunctionStr(str)}`);
  const invalidValues = invalidFnStrings.map((str) => `${str.padEnd(12)} → ${isCallFunctionStr(str)}`);

  return [validValues.join('\n'), invalidValues.join('\n')].join('\n\n');
};
