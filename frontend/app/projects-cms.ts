export type ProjectCard = {
  title: string;
  location: string;
  year: string;
  image: string;
  slug?: string;
  tags?: string[];
};

export type ProjectsContent = {
  pageTitle?: string;
  projects?: ProjectCard[];
};

const fallbackProjects: ProjectCard[] = [
  {
    title: "Biswas Tower",
    location: "New Market, Dhaka",
    year: "2024",
    image: "/bbl/project-1.jpg",
    slug: "projects/biswas-tower",
  },
  {
    title: "Biswas Credence",
    location: "Dhaka",
    year: "2023",
    image: "/bbl/project-2.jpg",
    slug: "projects/biswas-tower",
  },
  {
    title: "Biswas Moyeen Tower",
    location: "Dhaka",
    year: "2022",
    image: "/bbl/project-3.jpg",
    slug: "projects/biswas-tower",
  },
  {
    title: "Biswas Shwapnil",
    location: "Dhaka",
    year: "2021",
    image: "/bbl/project-banner.jpg",
    slug: "projects/biswas-tower",
  },
];

function escapeHtml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderProject(project: ProjectCard, index: number) {
  const href = `/${project.slug || "projects/biswas-tower"}`;
  const tags = project.tags?.length ? project.tags : ["Residential", "Real estate", "Construction"];
  const delay = index % 2 === 0 ? ".3" : ".4";

  return `
                    <div class="col-lg-6 tp_fade_anim" data-duration=".9" data-delay="${delay}">
                        <div class="tpproject mb-60">
                            <div class="tpproject__content tp-flex-center tp-justify-between mb-10">
                                <div>
                                    <h2 class="tpproject__title tp-fs-24 margin-0"><a href="${href}">${escapeHtml(project.title)}</a></h2>
                                    <span class="tpportfolio__date tp-in-block lh-1">${escapeHtml(project.location)}</span>
                                </div>
                                <span class="fw-500 d-inline-block">/${escapeHtml(project.year)}</span>
                            </div>
                            <div class="tpproject__thumb anim-zoomin-wrap br-20 p-relative fix">
                                <img fetchpriority="low" loading="lazy" decoding="async" class="anim-zoomin" src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}">
                                <div class="tp-project-meta tpproject__meta">
                                    ${tags.map((tag) => `<a href="${href}">${escapeHtml(tag)}</a>`).join("\n                                    ")}
                                </div>
                            </div>
                        </div>
                    </div>`;
}

export function applyProjectsContent(html: string, content?: ProjectsContent) {
  const projects = content?.projects?.length ? content.projects : fallbackProjects;
  const cards = projects.map(renderProject).join("");

  return html.replace(
    /<!-- project-area,start  -->[\s\S]*?<!-- project-area,end  -->/,
    `
        <!-- project-area,start  -->
        <section class="tp-project-area default-margin tp-project-spacing fix">
            <div class="container">
                <div class="row">${cards}
                </div>
            </div>
        </section>
        <!-- project-area,end  -->`,
  );
}
