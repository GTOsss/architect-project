export type ESLinkConfig = {
  autofix: boolean;
  /** @example .eslintrc.js  */
  configFile: string;
};

export type TemplateConfig = {
  replace: boolean;
  clean: boolean;
  watch: boolean;
  /** If true will save each *replaced files* to "architect/.arc".
   * *Replaced files* — files each is being replaced in result activate "replace" flag. */
  backup: boolean;
  output: string;
  itrStart: string;
  itrEnd: string;
  itrFileNameStart: string;
  itrFileNameEnd: string;
  templateExt: string;
  esLint: ESLinkConfig;
};

export type ArcConfig = TemplateConfig & {
  templates: Record<string, Partial<TemplateConfig>>;
};
