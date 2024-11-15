export enum ParsedFragmentDataTypeEnum {
  'variable' = 'variable',
  'callFunction' = 'callFunction',
}

export type ParsedFragmentVariable = {
  type: ParsedFragmentDataTypeEnum.variable;
  variableName: string;
};

export const isVariableData = (data: ParsedFragmentData): data is ParsedFragmentVariable =>
  data.type === ParsedFragmentDataTypeEnum.variable;

export type ParsedFragmentCallFunction = {
  type: ParsedFragmentDataTypeEnum.callFunction;
  functionName: string;
  functionArgs: string[];
};

export const isCallFunctionData = (data: ParsedFragmentData): data is ParsedFragmentCallFunction =>
  data.type === ParsedFragmentDataTypeEnum.callFunction;

export type ParsedFragmentData = ParsedFragmentVariable | ParsedFragmentCallFunction;
