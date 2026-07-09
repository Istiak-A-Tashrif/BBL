import { getPageContent, getPageMetadata } from "../cms-pages";
import { ProjectsModern } from "./ProjectsModern";
import { mergeProjectsPageContent, type ProjectsPageContent } from "./projects-page-cms";

export function generateMetadata() {
  return getPageMetadata("projects", "Projects");
}

export default async function ProjectsPage() {
  const projectsContent = await getPageContent<ProjectsPageContent>("projects");

  return <ProjectsModern content={mergeProjectsPageContent(projectsContent)} />;
}
