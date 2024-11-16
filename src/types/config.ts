export type TemplateConfig = {
  replace: boolean;
  clean: boolean;
  watch: boolean;
  output: string;
  itrStart: string;
  itrEnd: string;
  itrFileNameStart: string;
  itrFileNameEnd: string;
  templateExt: string;
  esLint: {
    quiet: boolean;
  };
};

export type ArcConfig = TemplateConfig & {
  templates: Record<string, Partial<TemplateConfig>>;
};
