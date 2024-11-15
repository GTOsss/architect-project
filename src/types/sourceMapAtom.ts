/** Template params in "source-map-atom" */
export type TemplateParamsMA = {
  /** Component name (not template) */
  name?: string;
  /** Relative project path */
  path?: string;
  /** Relative default path (from default params) */
  rPath?: string;
};

export type DefaultParamsMA = Record<string, TemplateParamsMA>;

export type TemplateSourceMapMAValue = string | [string, TemplateParamsMA];

export type SourceMapAtom = Record<string, Array<string | [string, TemplateParamsMA]>>;

export type SourceMapAtomRequiredFile = {
  aliases: Record<string, string>;
  defaultParams: DefaultParamsMA;
  map: SourceMapAtom;
};
