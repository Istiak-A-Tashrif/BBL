import { PrismaClient } from '@prisma/client';
import { defaultContactContent } from '../../frontend/app/contact-us/contact-cms';
import { defaultProjectsPageContent } from '../../frontend/app/projects/projects-page-cms';

const prisma = new PrismaClient();

const siteContent = {
  site: {
    name: 'Biswas Builders Limited',
    logoDark: '/bbl/logo-blue.svg',
    phone: '+88 01678 086168',
    navHomeLabel: 'Home',
    navAboutLabel: 'About',
    navProjectsLabel: 'Projects',
    navContactLabel: 'Contact',
  },
  footer: {
    eyebrow: 'Contact',
    title: "Let's work together",
    description:
      'Biswas Builders Limited is a Bangladeshi real estate and construction company established in 1994.',
    buttonText: 'Contact BBL',
    background: '/bbl/sister-banner.jpg',
  },
};

const homeContent = {
  hero: {
    eyebrow: 'Biswas Builders Limited',
    title: 'We believe in quality not quantity',
    highlight: 'since 1994',
    buttonText: 'Explore Projects',
    secondaryButtonText: 'Talk to sales',
    image: '/bbl/hero.jpg',
  },
  stats: {
    since: '1994',
    sinceLabel: 'Established',
    team: '800+',
    teamLabel: 'Team and workers',
    projects: '4+',
    projectsLabel: 'Highlighted projects',
  },
  features: [
    {
      title: 'Quality materials',
      description:
        'Our teams support clients before, during, and after handover with clear information, documentation, and responsive service.',
    },
    {
      title: 'Engineering strength',
      description:
        'Our service approach is built on integrity, professionalism, timeliness, confidentiality, credibility, honesty, and respect.',
    },
    {
      title: 'Client-first service',
      description:
        'With about 300 regular employees and more than 500 daily workers, BBL is equipped for complex real estate and construction work.',
    },
  ],
  about: {
    eyebrow: 'About BBL',
    title:
      'We build residential, commercial, and infrastructure projects with quality and accountability',
    description:
      'Biswas Builders Limited has grown from apartment construction in Uttara into a prominent Bangladeshi real estate and construction company. The company delivers residential and commercial buildings, civil engineering works, land development, and infrastructure projects with a customer-first service philosophy.',
    quote: 'Build with a trusted name since 1994.',
    image: '/bbl/about-home.png',
  },
  mission: {
    title: 'We strive to deliver safe, lasting spaces with',
    highlightPrefix: 'quality',
    highlight: 'construction',
    images: ['/bbl/project-1.jpg', '/bbl/project-2.jpg', '/bbl/project-3.jpg', '/bbl/gallery-1.jpg'],
  },
  services: [
    {
      title: 'Real estate and construction',
      description:
        'We develop residential and commercial spaces with practical planning, quality materials, and dependable execution.',
      image: '/bbl/project-1.jpg',
    },
    {
      title: 'Sales and customer care',
      description:
        'Our customer care process keeps buyers informed from first inquiry through handover and after-sales support.',
      image: '/bbl/project-2.jpg',
    },
    {
      title: 'Construction quality',
      description:
        'BBL coordinates engineering, procurement, supervision, and site teams to maintain consistent construction standards.',
      image: '/bbl/project-3.jpg',
    },
    {
      title: 'Landowner partnership',
      description:
        'We work with landowners through transparent development partnerships focused on long-term value.',
      image: '/bbl/value.jpg',
    },
  ],
  projects: [
    {
      title: 'Biswas Tower',
      location: 'New Market, Dhaka',
      year: '2024',
      image: '/bbl/project-1.jpg',
    },
    {
      title: 'Biswas Credence',
      location: 'Dhaka',
      year: '2023',
      image: '/bbl/project-2.jpg',
    },
    {
      title: 'Biswas Moyeen Tower',
      location: 'Dhaka',
      year: '2022',
      image: '/bbl/project-3.jpg',
    },
    {
      title: 'Saiham Future Complex',
      location: 'Dhaka',
      year: '2021',
      image: '/bbl/project-banner.jpg',
    },
  ],
  testimonials: [
    {
      quote:
        'BBL gave us clear guidance, dependable communication, and confidence through every stage of the project.',
      author: 'A BBL Client',
      image: '/bbl/gallery-1.jpg',
    },
    {
      quote:
        'Their professionalism and construction quality made the entire property journey smooth and reassuring.',
      author: 'Apartment Owner',
      image: '/bbl/gallery-2.jpg',
    },
    {
      quote:
        "We valued the team's honesty, timely updates, and commitment to delivering what was promised.",
      author: 'Landowner Partner',
      image: '/bbl/gallery-3.jpg',
    },
  ],
  choose: {
    eyebrow: 'Why choose BBL',
    title: 'A trusted quality you can rely on',
    items: [
      {
        title: 'Clear communication',
        description:
          'We keep clients informed with practical guidance and responsive communication.',
      },
      {
        title: 'Practical planning',
        description:
          'Each project is planned around location, utility, value, and long-term durability.',
      },
      {
        title: 'Professional delivery',
        description:
          'Our engineering and site teams coordinate closely to keep work accountable.',
      },
      {
        title: 'Design coordination',
        description:
          'We align planning, architecture, construction, and customer needs from the start.',
      },
    ],
  },
  team: [
    { name: 'Nazrul Islam', role: 'Leadership Team', image: '/bbl/certificate.jpg' },
    { name: 'Engineering Team', role: 'Project Delivery', image: '/bbl/project-1.jpg' },
    { name: 'Sales Team', role: 'Customer Care', image: '/bbl/project-2.jpg' },
  ],
  updates: [
    {
      category: 'Real estate',
      date: 'Project Update',
      title: 'Transforming Dhaka spaces with dependable construction',
      author: 'Leadership Team',
      role: 'Project Team',
      image: '/bbl/gallery-1.jpg',
    },
    {
      category: 'Real estate',
      date: 'Project Update',
      title: 'Quality construction starts with a trusted developer.',
      author: 'Nazrul Islam',
      role: 'Project Team',
      image: '/bbl/gallery-2.jpg',
    },
    {
      category: 'Real estate',
      date: 'Project Update',
      title:
        'From Uttara to Dhanmondi, BBL builds residential and commercial landmarks',
      author: 'BBL Management',
      role: 'Project Team',
      image: '/bbl/gallery-3.jpg',
    },
  ],
  sections: {
    services: {
      eyebrow: 'Services',
      title: 'Built around delivery',
      description:
        'Core capabilities for landowners, buyers, and real estate partners.',
    },
    projects: {
      eyebrow: 'Selected Projects',
      title: 'Spaces with lasting value',
      buttonText: 'View all projects',
    },
    mission: {
      eyebrow: 'Mission',
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'Project owners and partners',
    },
    team: {
      eyebrow: 'Team',
      title: 'People behind delivery',
    },
    updates: {
      eyebrow: 'Updates',
      title: 'Latest from BBL',
    },
  },
};

const aboutContent = {
  hero: {
    eyebrow: 'About BBL',
    title: 'A developer shaped by discipline, delivery, and trust',
    description:
      'Biswas Builders Limited works across real estate, construction, land development, and customer care with a practical focus on lasting value.',
    image: '/bbl/block-about.png',
  },
  stats: [
    { value: '1994', label: 'Established' },
    { value: '800+', label: 'Team and workers' },
    { value: '4+', label: 'Highlighted projects' },
  ],
  intro: {
    eyebrow: 'Company Profile',
    title: 'From apartment construction to multi-sector real estate delivery',
    description:
      'BBL began its journey with apartment construction and gradually expanded into residential buildings, commercial spaces, civil engineering works, and landowner partnerships. The company coordinates planning, construction, sales, documentation, and after-sales support under one accountable delivery process.',
    quote: 'A company profile built on delivery, not decoration.',
  },
  features: [
    {
      title: 'Development management',
      description:
        'BBL manages project planning, approvals, construction coordination, sales communication, and handover documentation.',
    },
    {
      title: 'Landowner partnership',
      description:
        'The company works with landowners through transparent development arrangements focused on utility, value, and long-term trust.',
    },
    {
      title: 'Customer care',
      description:
        'Buyer support continues from first inquiry through booking, documentation, construction updates, handover, and after-sales service.',
    },
  ],
  journey: {
    eyebrow: 'Our Journey',
    title: 'A steady path from apartment construction to landmark delivery',
    description:
      "The company's growth has stayed close to the same core promise: practical planning, reliable construction, and responsive service after handover.",
    items: [
      {
        year: '1994',
        title: 'Started with a clear promise',
        description:
          'BBL began with apartment construction and a practical belief in accountable delivery.',
      },
      {
        year: '2000s',
        title: 'Expanded project capability',
        description:
          'The company grew across residential, commercial, and civil construction work.',
      },
      {
        year: 'Today',
        title: 'Focused on lasting value',
        description:
          'BBL now serves buyers, landowners, and partners through planning, execution, and customer care.',
      },
    ],
  },
  values: {
    eyebrow: 'Operating Principles',
    title: 'The standards behind every BBL project',
    description:
      'The company runs on clear communication, documented decisions, professional coordination, and a long-term view of the spaces it creates.',
    images: ['/bbl/project-1.jpg', '/bbl/gallery-1.jpg', '/bbl/project-3.jpg', '/bbl/value.jpg'],
  },
};

async function main() {
  await prisma.cmsPage.upsert({
    where: { slug: 'site-settings' },
    update: {
      title: 'Site Settings',
      status: 'published',
      published_at: new Date(),
      content: siteContent,
      metadata: {
        description: 'Shared website navigation and footer',
      },
    },
    create: {
      slug: 'site-settings',
      title: 'Site Settings',
      status: 'published',
      published_at: new Date(),
      content: siteContent,
      metadata: {
        description: 'Shared website navigation and footer',
      },
    },
  });

  await prisma.cmsPage.upsert({
    where: { slug: 'home' },
    update: {
      title: 'Home',
      status: 'published',
      published_at: new Date(),
      content: homeContent,
      metadata: {
        description: 'BBL homepage',
      },
    },
    create: {
      slug: 'home',
      title: 'Home',
      status: 'published',
      published_at: new Date(),
      content: homeContent,
      metadata: {
        description: 'BBL homepage',
      },
    },
  });

  await prisma.cmsPage.upsert({
    where: { slug: 'about-us' },
    update: {
      title: 'About Us',
      status: 'published',
      published_at: new Date(),
      content: aboutContent,
      metadata: {
        description: 'About Biswas Builders Limited',
      },
    },
    create: {
      slug: 'about-us',
      title: 'About Us',
      status: 'published',
      published_at: new Date(),
      content: aboutContent,
      metadata: {
        description: 'About Biswas Builders Limited',
      },
    },
  });

  const pages = [
    {
      slug: 'projects',
      title: 'Projects',
      description: 'Biswas Builders Limited projects',
      content: defaultProjectsPageContent,
    },
    {
      slug: 'contact-us',
      title: 'Contact Us',
      description: 'Contact Biswas Builders Limited',
      content: defaultContactContent,
    },
  ];

  for (const page of pages) {
    await prisma.cmsPage.upsert({
      where: { slug: page.slug },
      update: {
        title: page.title,
        status: 'published',
        published_at: new Date(),
        content: page.content || { pageTitle: page.title },
        metadata: {
          description: page.description,
        },
      },
      create: {
        slug: page.slug,
        title: page.title,
        status: 'published',
        published_at: new Date(),
        content: page.content || { pageTitle: page.title },
        metadata: {
          description: page.description,
        },
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
