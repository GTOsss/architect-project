import { ParsedFragmentData, ParsedFragmentDataTypeEnum } from './parseTemplateFragments.types';

export const getFunctionName = (str: string): string => {
  const reGetFunction = /.+(?=\()/gm;
  return str.match(reGetFunction)[0];
};

export const getFunctionArgument = (str: string): string => {
  const reGetFunctionArgument = /(?<=\().+(?=\))/gm;
  return str.match(reGetFunctionArgument)?.[0];
};

/**
 * Return true if str look like call function.
 *
 * isCallFunction(a, b) // false // Todo Should be expanded to correct work with multi arguments
 * isCallFunction(1name) // true // Todo Need handle this case
 *
 * @example
 * isCallFunction('fn()') // true
 * isCallFunction('fn(name)') // true
 *
 * isCallFunction('some (some text)') // false
 * isCallFunction('some text (with brackets)') // false
 *
 * */
export const isCallFunctionStr = (str: string): boolean => {
  const reIsFunction = /[a-zA-Z0-9]+\s*\([a-zA-Z0-9]*\)/gm;
  return reIsFunction.test(str);
};

/**
 * Detect type of interpolation fragment and return parsed data of it.
 * */
export const getParsedFragmentData = (str: string): ParsedFragmentData => {
  if (isCallFunctionStr(str)) {
    const functionName = getFunctionName(str);
    const functionArg = getFunctionArgument(str);

    return { type: ParsedFragmentDataTypeEnum.callFunction, functionName, functionArgs: [functionArg] };
  }

  return { type: ParsedFragmentDataTypeEnum.variable, variableName: str };
};
