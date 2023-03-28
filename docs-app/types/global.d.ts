// Types for compiled templates
declare module 'docs-app/templates/*' {
  import { TemplateFactory } from 'ember-cli-htmlbars';

  const tmpl: TemplateFactory;
  export default tmpl;
}

declare module '*.css' {
  const styles: Record<string, string>;

  export default styles;
}
