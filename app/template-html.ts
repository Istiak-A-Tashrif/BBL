const linkMap: Record<string, string> = {
  "index.html": "/",
  "about.html": "/about-us",
  "team.html": "/about-us",
  "team-details.html": "/about-us",
  "faq.html": "/about-us",
  "award.html": "/about-us",
  "core-values.html": "/about-us",
  "project-standard.html": "/projects",
  "project-grid.html": "/projects",
  "project-details.html": "/projects/biswas-tower",
  "services-grid.html": "/projects",
  "services-tab.html": "/projects",
  "services-grid-icon.html": "/projects",
  "services-details.html": "/projects/biswas-tower",
  "blog-standard.html": "/projects",
  "blog-grid.html": "/projects",
  "blog-details.html": "/projects/biswas-tower",
  "career.html": "/contact-us",
  "career-details.html": "/contact-us",
  "contact.html": "/contact-us",
  "404.html": "/not-found",
};

const bblMenu = `<nav class="tp-mobile-menu-active">
                                    <ul>
                                        <li><a href="/">Home</a></li>
                                        <li><a href="/about-us">About</a></li>
                                        <li><a href="/projects">Projects</a>
                                            <ul class="sub-menu">
                                                <li><a href="/projects"><span>All Projects</span></a></li>
                                                <li><a href="/projects/biswas-tower"><span>Biswas Tower</span></a></li>
                                            </ul>
                                        </li>
                                        <li><a href="/contact-us">Contact</a></li>
                                    </ul>
                                </nav>`;

const contentReplacements: Array<[RegExp, string]> = [
  [/\+<span>Since<\/span>\s*<\/span>\s*<h3 class="tp-about-badge-title tp-text-white">1998<\/h3>/g, '<span>Since</span></span><h3 class="tp-about-badge-title tp-text-white">1994</h3>'],
  [/\+<span>Project<\/span>\s*<\/span>\s*<h3 class="tp-about-badge-title tp-text-body">2860<\/h3>/g, '<span>Team</span></span><h3 class="tp-about-badge-title tp-text-body">800+</h3>'],
  [/Leading privately owned real estate investors\s*<br>\s*and property developers/gi, "A trusted Bangladeshi builder since 1994"],
  [/We are a privately owned real estate company dedicated to delivering\s*innovative property solutions across the globe\./gi, "Established in 1994, Biswas Builders Limited works across real estate, construction, civil engineering, land development, and infrastructure with a clear belief in quality over quantity."],
  [/Established in 1994, Biswas Builders Limited works across real estate, construction, civil engineering, land development, and infrastructure with a clear belief in quality over quantity\.\s*Our Team specializes\s*in real estate investment, property management, and development,\s*with a clear focus on quality and sustainability\. By combining market\s*expertise with a client-first approach/gi, "Biswas Builders Limited has grown from apartment construction in Uttara into a prominent Bangladeshi real estate and construction company. The company delivers residential and commercial buildings, civil engineering works, land development, and infrastructure projects with a customer-first service philosophy."],
  [/Established in 1994, Biswas Builders Limited works across real estate, construction, civil engineering, land development, and infrastructure with a clear belief in quality over quantity\.\s*Our Team specializes\s*in real estate investment, property management/gi, "BBL delivers residential and commercial buildings, civil engineering works, land development, and infrastructure projects with a customer-first service philosophy."],
  [/We are a privately owned real estate company dedicated to delivering\s*innovative property solutions across the globe\. Our team specializes\s*in real estate investment, property management, and development,\s*with a clear focus on quality and sustainability\. By combining market\s*expertise with a client-first approach/gi, "Biswas Builders Limited has grown from apartment construction in Uttara into a prominent Bangladeshi real estate and construction company. The company delivers residential and commercial buildings, civil engineering works, land development, and infrastructure projects with a customer-first service philosophy."],
  [/The customer service center is ready to\s*serve 24\/7, support the residents to\s*provide information\./gi, "Our teams support clients before, during, and after handover with clear information, documentation, and responsive service."],
  [/Our service center operates around the clock, helping residents with guidance\s*<br>\s*and support whenever needed\./gi, "Our service approach is built on integrity, professionalism, timeliness, confidentiality, credibility, honesty, and respect."],
  [/Residents can rely on our 24\/7 support desk for information and assistance at\s*<br>\s*any time\./gi, "With about 300 regular employees and more than 500 daily workers, BBL is equipped for complex real estate and construction work."],
  [/Defining the standards of\s*<br>\s*real estate<span>development<\/span>/gi, "We believe in quality <br> not quantity<span>since 1994</span>"],
  [/We create landmark real estate\s*<br>\s*projects that bring enduring\s*<br>\s*value to<span>both investors<\/span>/gi, "We build residential, commercial, <br> and infrastructure projects <br> with<span>quality and accountability</span>"],
  [/We strive to create\s*opportunities that elevate\s*the<b class="tp-text-orange fw-500 ml-10">way<\/b><span class="tp-text-orange fw-500">people live<\/span>/gi, 'We strive to deliver safe,<br> lasting spaces with <b class="tp-text-orange fw-500 ml-10">quality</b><span class="tp-text-orange fw-500">construction</span>'],
  [/Take a brief look at some\s*of the services\s*<span>we offer<\/span>/gi, "Explore BBL's <span>core capabilities</span>"],
  [/Let’s shape something remarkable !/gi, "Build with a trusted name since 1994."],
  [/If you have any question\? Feel free\s*can contact with team\./gi, "Have a question? Contact the BBL team."],
  [/High quality products/gi, "Quality materials"],
  [/Professional service/gi, "Engineering strength"],
  [/Real partnership/gi, "Client-first service"],
  [/Discover More/g, "Explore Projects"],
  [/Learn More/g, "Know More"],
  [/Get a Free Quote/g, "Contact BBL"],
  [/Get in touch/g, "Contact Us"],
  [/Ha ve questions\?/g, "Have questions?"],
  [/Have questions\?/g, "Have questions?"],
  [/Email us\s*<a href="mailto:info@biswasbuilders\.com">on info@biswasbuilders\.com<\/a>\s*<br>\s*or submit\s*<a href="\/contact-us">an contact<\/a>\s*form\./g, 'Email us <a href="mailto:info@biswasbuilders.com">at info@biswasbuilders.com</a> <br> or submit <a href="/contact-us">a contact</a> form.'],
  [/Sign up for our newsletter to get\s*latest insights and updates/gi, "Sign up for updates on BBL projects, construction work, and company news"],
  [/We are a privately owned real estate company dedicated\s*to delivering innovative property solutions across/gi, "Biswas Builders Limited is a Bangladeshi real estate and construction company established in 1994."],
  [/Apartment building/g, "Biswas Tower"],
  [/Modern Apartment/g, "Biswas Credence"],
  [/Luxury Residential/g, "Biswas Moyeen Tower"],
  [/High-Rise Apartment/g, "Biswas Shwapnil"],
  [/Smart Apartment/g, "Biswas Proshanti"],
  [/Urban Residential/g, "Biswas Sarkarbari"],
  [/Summit sage properties/gi, "Biswas JK Tower"],
  [/Urban nest pro/gi, "Saiham Future Complex"],
  [/Hospitality/g, "Residential"],
  [/Marketing/g, "Construction"],
  [/Sales and marketin/g, "Sales and customer care"],
  [/Sales & Marketing/g, "Sales and customer care"],
  [/Architecture and design/g, "Planning and design"],
  [/Construction management/g, "Construction quality"],
  [/Investment & capital/g, "Landowner partnership"],
  [/Investment & Capital/g, "Landowner partnership"],
  [/Project management/g, "Project delivery"],
  [/Real estate development/g, "Real estate and construction"],
  [/Pacific shores, 123 California/g, "New Market, Dhaka"],
  [/31 Winding Creek Road,\s*<br>\s*New York, USA/gi, "New Market City Complex, <br> 44/1 Rahim Square, New Market, Dhaka-1205"],
  [/(<button class="nav-link"[^>]*>)New York(<\/button>)/gi, "$1Corporate Office$2"],
  [/(<button class="nav-link active"[^>]*>)London(<\/button>)/gi, "$1Banani Office$2"],
  [/(<button class="nav-link"[^>]*>)Australia(<\/button>)/gi, "$1Project Inquiry$2"],
  [/Monday - Friday 10 a\.m\. - 6 p\.m\./gi, "Corporate Office: +88 01678 086168"],
  [/OFFICE EMAIL/g, "info@bblbd.com"],
  [/David Hussy/g, "Nazrul Islam"],
  [/Justin Case/g, "BBL Management"],
  [/Cristopher/g, "Leadership Team"],
  [/Silver Oak/g, "Project Team"],
  [/Benjamin/g, "Engineering Team"],
  [/Dominic/g, "Sales Team"],
  [/Frederick/g, "Customer Care"],
  [/Jonathan/g, "Landowner Relations"],
  [/Engineer/g, "Project Team"],
  [/Project Teaming/g, "Engineering"],
  [/Our Team members/g, "Our Management Team"],
  [/Leadership Team Miller/g, "Nazrul Islam"],
  [/Engineering Team Carter/g, "Engineering Team"],
  [/Project Team of head/g, "Department Head"],
  [/April 8, 2025 at 7:38 am/g, "Project Update"],
  [/15 March, 2025/g, "Project Update"],
  [/February 22, 2025/g, "Project Update"],
  [/February 24, 2025/g, "Project Update"],
  [/28 December, 2025/g, "Project Timeline"],
  [/Naming your real estate company just\s*<br>\s*got a whole lot easier\./gi, "Quality construction starts with <br> a trusted developer."],
  [/We design with intention creating spaces\s*<br>\s*that reflect your style/gi, "From Uttara to Dhanmondi, BBL builds <br> residential and commercial landmarks"],
  [/The team at @Biswas Builders real estate is incredibly dedicated/gi, "The Biswas Builders Limited team is committed to quality, safety, and customer service"],
  [/Biswas Builders Limited media/g, "BBL Media"],
  [/About us/g, "About BBL"],
  [/Our team/g, "Our Team"],
  [/Core values/g, "Values"],
  [/Terms & conditions/g, "Terms"],
  [/Support center/g, "Support"],
  [/News & updates/g, "News & Updates"],
  [/Testimonials/g, "Client Feedback"],
  [/FAQs/g, "Questions"],
  [/info@biswasbuilders\.com/g, "info@bblbd.com"],
  [/www\.biswasbuilders\.com/g, "www.bblbd.com"],
  [/16760/g, "+88 01678 086168"],
  [/\+\(1\) 224 676 7430/g, "+88 01678 086168"],
  [/tel:\+\(1\)2246767430/g, "tel:+8801678086168"],
  [/Biswas Builders Limited@/g, "info@bblbd.com"],
  [/Let’s contact with us/g, "Contact Biswas Builders Limited"],
  [/We love to here/g, "We would love to hear"],
  [/By submitting, you agree to with our terms/g, "By submitting, you agree to be contacted by the BBL team."],
  [/Our Teams/g, "Our teams"],
];

const footerLinkMap: Record<string, string> = {
  "About BBL": "/about-us",
  "Our Team": "/about-us",
  Solutions: "/projects",
  "Why choose us": "/about-us",
  Partners: "/contact-us",
  Values: "/about-us",
  "Our projects": "/projects",
  Terms: "/about-us",
  Support: "/contact-us",
  "News & Updates": "/projects",
  Contact: "/contact-us",
  "Residential development": "/projects",
  "Sales and customer care": "/contact-us",
  "Design coordination": "/projects",
  "Construction quality": "/projects",
  "Landowner partnership": "/contact-us",
  "Project delivery": "/projects",
  "Client Feedback": "/about-us",
  Questions: "/about-us",
  Blog: "/projects",
  Careers: "/contact-us",
  "Contact us": "/contact-us",
};

function replaceContactPane(
  html: string,
  paneId: string,
  nextPaneId: string | null,
  address: string,
  detail: string,
) {
  const start = html.indexOf(`id="${paneId}"`);

  if (start === -1) {
    return html;
  }

  const end = nextPaneId ? html.indexOf(`id="${nextPaneId}"`, start) : html.indexOf("</section>", start);
  const safeEnd = end === -1 ? html.length : end;
  const before = html.slice(0, start);
  const pane = html.slice(start, safeEnd).replace(
    /<h3 class="tp-contect-slider-title tp-text-white">[\s\S]*?<\/h3>\s*<p>[\s\S]*?<\/p>/g,
    `<h3 class="tp-contect-slider-title tp-text-white">${address}</h3>\n                                                            <p>${detail}</p>`,
  );
  const after = html.slice(safeEnd);

  return `${before}${pane}${after}`;
}

function simplifyProjectMediaTabs(html: string) {
  const tabStart = html.indexOf('<div class="tp-project-gallery-tab-main">');

  if (tabStart === -1) {
    return html;
  }

  const tabEnd = html.indexOf("</div>", html.indexOf("</ul>", tabStart));

  if (tabEnd === -1) {
    return html;
  }

  let simplified = `${html.slice(0, tabStart)}${html.slice(tabEnd + "</div>".length)}`;
  simplified = simplified.replace(
    /<div class="tab-pane fade" id="profile-tab-pane"[\s\S]*?<div class="tab-pane fade" id="contact-tab-pane"/,
    '<div class="tab-pane fade" id="contact-tab-pane"',
  );
  simplified = simplified.replace(
    /<div class="tab-pane fade" id="contact-tab-pane"[\s\S]*?<div class="tab-pane fade" id="Street-tab-pane"/,
    '<div class="tab-pane fade" id="Street-tab-pane"',
  );
  simplified = simplified.replace(
    /<div class="tab-pane fade" id="Street-tab-pane"[\s\S]*?(?=\s*<\/div>\s*<\/section>\s*<!-- project-gallery-area,end)/,
    "",
  );

  return simplified;
}

function addImageLoadingHints(html: string) {
  let eagerLogoCount = 0;

  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    const isLogo = /\/bbl\/logo-(blue|white)\.svg/i.test(tag);
    const shouldLoadEagerly = isLogo && eagerLogoCount < 2;
    let hinted = tag;

    if (!/\bdecoding=/i.test(hinted)) {
      hinted = hinted.replace("<img", '<img decoding="async"');
    }

    if (!/\bloading=/i.test(hinted)) {
      hinted = hinted.replace("<img", shouldLoadEagerly ? '<img loading="eager"' : '<img loading="lazy"');
    }

    if (!/\bfetchpriority=/i.test(hinted)) {
      hinted = hinted.replace("<img", shouldLoadEagerly ? '<img fetchpriority="high"' : '<img fetchpriority="low"');
    }

    if (isLogo) {
      eagerLogoCount += 1;
    }

    return hinted;
  });
}

function removeSectionContaining(html: string, sectionClass: string, marker: string) {
  let normalized = html;
  let searchFrom = 0;

  while (true) {
    const sectionStart = normalized.indexOf(`<section class="${sectionClass}`, searchFrom);

    if (sectionStart === -1) {
      return normalized;
    }

    const sectionEndMarker = normalized.indexOf(`<!-- ${sectionClass.split(" ")[0].replace("tp-", "")}-area,end`, sectionStart);
    const fallbackEnd = normalized.indexOf("</section>", sectionStart);
    const sectionEnd = sectionEndMarker === -1 ? fallbackEnd : normalized.indexOf("-->", sectionEndMarker) + 3;

    if (sectionEnd === -1 || sectionEnd < sectionStart) {
      return normalized;
    }

    const section = normalized.slice(sectionStart, sectionEnd);

    if (section.includes(marker)) {
      normalized = `${normalized.slice(0, sectionStart)}${normalized.slice(sectionEnd)}`;
      searchFrom = sectionStart;
      continue;
    }

    searchFrom = sectionEnd;
  }
}

export function normalizeTemplateHtml(html: string, pageTitle?: string) {
  let normalized = html
    .replace(/\s*<!-- script,start -->[\s\S]*?<!-- script,end -->\s*/i, "\n")
    .replace(/(src|href|data-background)="assets\//g, '$1="/assets/')
    .replace(/src="https:\/\/html\.aqlova\.com\/videos\/landor\//g, 'src="/videos/landor/')
    .replace(/action="index\.html"/g, 'action="/"')
    .replace(/data-bs-target="index\.html([^"]+)"/g, 'data-bs-target="#$1"')
    .replace(/data-bs-parent="index\.html([^"]+)"/g, 'data-bs-parent="#$1"')
    .replace(/data-bs-(target|parent)="[a-z0-9-]+\.html#?([^"]+)"/gi, 'data-bs-$1="#$2"')
    .replace(/\s*<div class="tp-about-shape-home[^"]*">\s*<img[^>]*>\s*<\/div>/gi, "")
    .replace(/\s*<img class="tp-about-shape-parson[^"]*"[^>]*>/gi, "");

  const imageMap: Record<string, string> = {
    "/assets/img/logo/logo-black.png": "/bbl/logo-blue.svg",
    "/assets/img/logo/logo-white.png": "/bbl/logo-white.svg",
    "/assets/img/logo/logo-white-larg.png": "/bbl/logo-white.svg",
    "/assets/img/logo/logo-big.png": "/bbl/logo-blue.svg",
    "/assets/img/hero/hero-bg-1.png": "/bbl/hero.jpg",
    "/assets/img/hero/hero-transparent-bg.png": "/bbl/hero.jpg",
    "/assets/img/breadcrumb/breadcrumb-bg.jpg": "/bbl/project-banner.jpg",
    "/assets/img/breadcrumb/breadcrumb-bg-2.jpg": "/bbl/project-banner.jpg",
    "/assets/img/footer/footer-bg.png": "/bbl/sister-banner.jpg",
    "/assets/img/footer/footer-bg-2.jpg": "/bbl/sister-banner.jpg",
    "/assets/img/solid-bg/solid-bg.jpg": "/bbl/sister-banner.jpg",
    "/assets/img/about/about-thumb.jpg": "/bbl/about-home.png",
    "/assets/img/about/about-thumb-2.jpg": "/bbl/block-about.png",
    "/assets/img/about/about-thumb-5.jpg": "/bbl/block-landing.png",
    "/assets/img/about/about-shape-home.png": "/bbl/block-landing.png",
    "/assets/img/project/project-thumb.jpg": "/bbl/project-1.jpg",
    "/assets/img/project/project-thumb-2.jpg": "/bbl/project-2.jpg",
    "/assets/img/project/project-thumb-3.jpg": "/bbl/project-3.jpg",
    "/assets/img/project/project-thumb-4.jpg": "/bbl/project-1.jpg",
    "/assets/img/project/project-thumb-5.jpg": "/bbl/project-2.jpg",
    "/assets/img/project/project-thumb-6.jpg": "/bbl/project-3.jpg",
    "/assets/img/project/project-thumb-7.jpg": "/bbl/project-1.jpg",
    "/assets/img/project/project-thumb-8.jpg": "/bbl/project-2.jpg",
    "/assets/img/project/project-details-bg.jpg": "/bbl/project-1.jpg",
    "/assets/img/project/project-details-img.jpg": "/bbl/project-2.jpg",
    "/assets/img/project/project-gullary-1.jpg": "/bbl/gallery-1.jpg",
    "/assets/img/project/project-gullary-2.jpg": "/bbl/gallery-2.jpg",
    "/assets/img/project/project-gullary-3.jpg": "/bbl/gallery-3.jpg",
    "/assets/img/misson/misson-img-1.jpg": "/bbl/project-1.jpg",
    "/assets/img/misson/misson-img-2.jpg": "/bbl/project-2.jpg",
    "/assets/img/misson/misson-img-3.jpg": "/bbl/project-3.jpg",
    "/assets/img/misson/misson-img-4.jpg": "/bbl/gallery-1.jpg",
    "/assets/img/misson/misson-img-5.jpg": "/bbl/gallery-2.jpg",
    "/assets/img/choose/choose-bg.jpg": "/bbl/project-banner.jpg",
    "/assets/img/choose/choose-bg-2.png": "/bbl/project-banner.jpg",
    "/assets/img/contect/contect-bg.jpg": "/bbl/map.png",
    "/assets/img/contect/contect-bg-2.jpg": "/bbl/buyer-contact.svg",
    "/assets/img/contect/contect-bg-3.jpg": "/bbl/landowner-contact.svg",
    "/assets/img/video/video-shape-1.jpg": "/bbl/video-banner.jpg",
    "/assets/img/video/video-shape-2.jpg": "/bbl/project-1.jpg",
    "/assets/img/video/video-shape-3.jpg": "/bbl/project-2.jpg",
    "/assets/img/video/video-shape-4.jpg": "/bbl/project-3.jpg",
    "/assets/img/video/video-shape-5.jpg": "/bbl/value.jpg",
    "/assets/img/blog/blog-thumb-1.jpg": "/bbl/gallery-1.jpg",
    "/assets/img/blog/blog-thumb-2.jpg": "/bbl/gallery-2.jpg",
    "/assets/img/blog/blog-thumb-3.jpg": "/bbl/gallery-3.jpg",
    "/assets/img/blog/blog-thumb-4.jpg": "/bbl/project-1.jpg",
    "/assets/img/blog/blog-thumb-5.jpg": "/bbl/project-2.jpg",
    "/assets/img/blog/blog-thumb-6.jpg": "/bbl/project-3.jpg",
    "/assets/img/blog/blog-2-thumb-1.jpg": "/bbl/project-1.jpg",
    "/assets/img/blog/blog-2-thumb-2.jpg": "/bbl/project-2.jpg",
    "/assets/img/blog/blog-2-thumb-3.jpg": "/bbl/project-3.jpg",
    "/assets/img/blog/blog-2-thumb-4.jpg": "/bbl/gallery-1.jpg",
    "/assets/img/blog/blog-2-thumb-5.jpg": "/bbl/gallery-2.jpg",
    "/assets/img/blog/blog-2-thumb-6.jpg": "/bbl/gallery-3.jpg",
    "/assets/img/blog/postbox-thumb-1.jpg": "/bbl/project-1.jpg",
    "/assets/img/blog/postbox-thumb-2.jpg": "/bbl/project-2.jpg",
    "/assets/img/blog/postbox-thumb-3.jpg": "/bbl/project-3.jpg",
    "/assets/img/blog/postbox-thumb-4.jpg": "/bbl/gallery-4.jpg",
    "/assets/img/blog/blog-details-img-1.jpg": "/bbl/hero.jpg",
    "/assets/img/blog/blog-details-img-2.jpg": "/bbl/project-1.jpg",
    "/assets/img/blog/blog-details-img-3.jpg": "/bbl/project-2.jpg",
  };

  for (const [from, to] of Object.entries(imageMap)) {
    normalized = normalized.replaceAll(from, to);
  }

  normalized = normalized
    .replace(/Landor/g, "Biswas Builders Limited")
    .replace(/landor/g, "Biswas Builders")
    .replace(/demo\.Biswas Builders@gmail\.com/g, "info@biswasbuilders.com")
    .replace(/\+999 2654 2563/g, "16760");

  normalized = normalized
    .replace(/\/videos\/Biswas Builders\//g, "/videos/landor/")
    .replace(/Biswas Builders@info@\.com/g, "info@biswasbuilders.com")
    .replace(/tel:\+99926542563/g, "tel:16760")
    .replace(/tel:\+\(099\)3266523/g, "tel:16760")
    .replace(/\+\(099\) 326-6523/g, "16760")
    .replace(/\/projects\/edison-verona/g, "/projects/biswas-tower")
    .replace(/\/blog\/edison-real-estate-redefining-happiness/g, "/projects/biswas-tower")
    .replace(/\/blog\/biswas-builders-limited-redefining-happiness/g, "/projects/biswas-tower");

  for (const [from, to] of Object.entries(linkMap)) {
    const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    normalized = normalized.replace(new RegExp(`href="${escaped}"`, "g"), `href="${to}"`);
    normalized = normalized.replace(new RegExp(`action="${escaped}"`, "g"), `action="${to}"`);
  }

  normalized = normalized
    .replace(/(fill|stroke)="[a-z0-9-]+\.html([A-Fa-f0-9]{6})"/g, '$1="#$2"')
    .replace(/mailto:landor@gmail\.com/g, "mailto:info@bblbd.com")
    .replace(/landor@gmail\.com/g, "info@bblbd.com")
    .replace(/Biswas Builders@gmail\.com/g, "info@bblbd.com");

  normalized = normalized.replace(
    /<nav class="tp-mobile-menu-active">[\s\S]*?<\/nav>/g,
    bblMenu,
  );

  if (pageTitle) {
    normalized = normalized.replace(
      /(<h1 class="tp-breadcrumb-title[^"]*">)[\s\S]*?(<\/h1>)/,
      `$1${pageTitle}$2`,
    );
    normalized = normalized.replace(
      /(<div class="tp-breadcrumb-list[^>]*>[\s\S]*?<span>)[\s\S]*?(<\/span>)/,
      `$1${pageTitle}$2`,
    );
  }

  normalized = normalized
    .replace(/data-width="1147" src="\/bbl\/logo-blue\.svg"/g, 'data-width="283" src="/bbl/logo-blue.svg"')
    .replace(/data-width="365" src="\/bbl\/logo-white\.svg"/g, 'data-width="283" src="/bbl/logo-white.svg"');

  for (const [pattern, replacement] of contentReplacements) {
    normalized = normalized.replace(pattern, replacement);
  }

  normalized = normalized
    .replace(/<div class="tp-project-tabs[\s\S]*?<\/div>\s*(?=<div class="row">)/g, "")
    .replace(/<div class="tp-pagination[^"]*"[^>]*>\s*<ul>[\s\S]*?<\/ul>\s*<\/div>/g, "");
  normalized = removeSectionContaining(normalized, "tp-contect-area mb-30", "Fast request");

  normalized = replaceContactPane(
    normalized,
    "home-tab-pane",
    "profile-tab-pane",
    "New Market City Complex, <br> 44/1 Rahim Square, New Market, Dhaka-1205",
    "Corporate Office: +88 01678 086168",
  );
  normalized = replaceContactPane(
    normalized,
    "profile-tab-pane",
    "contact-tab-pane",
    "House 147, Road 13/B, Block E, <br> Banani, Dhaka - 1213, Bangladesh",
    "Banani Office",
  );
  normalized = replaceContactPane(
    normalized,
    "contact-tab-pane",
    null,
    "New Market City Complex, <br> 44/1 Rahim Square, New Market, Dhaka-1205",
    "Project Inquiry: +88 01678 086168",
  );
  normalized = simplifyProjectMediaTabs(normalized);

  for (const [label, href] of Object.entries(footerLinkMap)) {
    const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    normalized = normalized.replace(
      new RegExp(`<a href="[^"]*">(${escapedLabel})</a>`, "g"),
      `<a href="${href}">$1</a>`,
    );
  }

  normalized = normalized
    .replace(/<li><a href="\/about-us">Client Feedback<\/a><\/li>/g, '<li><a href="/about-us">Company Profile</a></li>')
    .replace(/<li><a href="\/about-us">Questions<\/a><\/li>/g, '<li><a href="/contact-us">Contact</a></li>')
    .replace(/<li><a href="\/projects">Blog<\/a><\/li>/g, '<li><a href="/projects">Projects</a></li>')
    .replace(/<li><a href="\/contact-us">Careers<\/a><\/li>/g, '<li><a href="/contact-us">Contact</a></li>')
    .replace(/<h4 class="tp-footer-widgets-title white-rgba mb-25">SERVICES<\/h4>/g, '<h4 class="tp-footer-widgets-title white-rgba mb-25">PROJECTS</h4>')
    .replace(/<li><a href="\/contact-us">Real estate and construction<\/a><\/li>/g, '<li><a href="/projects">Residential projects</a></li>')
    .replace(/<li><a href="\/contact-us\/buyer">Sales and customer care<\/a><\/li>/g, '<li><a href="/projects">Commercial projects</a></li>')
    .replace(/<li><a href="\/contact-us">Planning and design<\/a><\/li>/g, '<li><a href="/projects">Infrastructure work</a></li>')
    .replace(/<li><a href="\/projects">Construction quality<\/a><\/li>/g, '<li><a href="/projects/biswas-tower">Biswas Tower</a></li>')
    .replace(/<li><a href="\/contact-us">Landowner partnership<\/a><\/li>/g, '<li><a href="/contact-us">Partnership inquiry</a></li>')
    .replace(/<li><a href="\/projects">Project delivery<\/a><\/li>/g, '<li><a href="/contact-us">Project inquiry</a></li>')
    .replace(/<h4 class="tp-footer-widgets-title white-rgba mb-25">PAGES<\/h4>\s*<ul>[\s\S]*?<\/ul>/g, '<h4 class="tp-footer-widgets-title white-rgba mb-25">PAGES</h4><ul><li><a href="/about-us">About BBL</a></li><li><a href="/projects">Projects</a></li><li><a href="/contact-us">Contact</a></li></ul>')
    .replace(/<form action="\/contact-us">\s*<div class="tp-contect-box-input mb-10">[\s\S]*?<\/form>/g, "")
    .replace(/<div class="tp-contect-map-main">\s*<div class="row">\s*<div class="col-lg-6">/g, '<div class="tp-contect-map-main"><div class="row"><div class="col-lg-12">')
    .replace(/<div class="tp-contect-map-wrap mr-80">/g, '<div class="tp-contect-map-wrap">')
    .replace(/<div class="col-lg-6">\s*<div class="tp-contect-box tp-contect-box-inner mt-10">\s*<div class="tp-contect-box-content mb-25">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, "")
    .replace(/Email us <a href="mailto:info@bblbd\.com">at info@bblbd\.com<\/a> <br> or submit <a href="\/contact-us">a contact<\/a> form\./g, 'Email us <a href="mailto:info@bblbd.com">at info@bblbd.com</a> <br> or call <a href="tel:+8801678086168">+88 01678 086168</a>.')
    .replace(/href="tel:\+88 01678 086168"/g, 'href="tel:+8801678086168"');

  normalized = addImageLoadingHints(normalized);

  return normalized.trim();
}

export function extractBody(html: string) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1] : html;
}
