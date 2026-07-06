import { templateScripts } from "./template-assets";
import { normalizeTemplateHtml } from "./template-html";
import { TemplateScripts } from "./template-scripts";

type TemplatePageProps = {
  html: string;
  pageTitle?: string;
};

export function TemplatePage({ html, pageTitle }: TemplatePageProps) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: normalizeTemplateHtml(html, pageTitle) }} />
      <TemplateScripts scripts={templateScripts} />
    </>
  );
}
