export type TemplateConfig = {
  replace: boolean;
  clean: boolean;
};

export type ArcConfig = TemplateConfig & {
  output: string;
  itrStart: string;
  itrEnd: string;
  itrFileNameStart: string;
  itrFileNameEnd: string;
  templateExt: string;
  esLint: {
    quiet: boolean;
  };
  templates: Record<string, Partial<TemplateConfig>>;
};
