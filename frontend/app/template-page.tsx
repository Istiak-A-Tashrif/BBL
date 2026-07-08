import { templateScripts, templateStylesheets } from "./template-assets";
import { applyProjectsContent, type ProjectsContent } from "./projects-cms";
import { normalizeTemplateHtml } from "./template-html";
import { TemplateScripts } from "./template-scripts";

type TemplatePageProps = {
  html: string;
  pageTitle?: string;
  routeKey?: string;
  pageContent?: ProjectsContent;
};

export function TemplatePage({ html, pageTitle, routeKey, pageContent }: TemplatePageProps) {
  const normalizedHtml = normalizeTemplateHtml(html, pageTitle);
  const renderedHtml = routeKey === "projects"
      ? applyProjectsContent(normalizedHtml, pageContent)
      : normalizedHtml;

  return (
    <>
      {templateStylesheets.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
      <TemplateScripts scripts={templateScripts} />
    </>
  );
}
