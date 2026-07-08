import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const homeContent = {
  site: {
    name: 'Biswas Builders Limited',
    logoDark: '/bbl/logo-blue.svg',
    phone: '+88 01678 086168',
    navHomeLabel: 'Home',
    navAboutLabel: 'About',
    navProjectsLabel: 'Projects',
    navContactLabel: 'Contact',
  },
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
  footer: {
    eyebrow: 'Contact',
    title: "Let's work together",
    description:
      'Biswas Builders Limited is a Bangladeshi real estate and construction company established in 1994.',
    buttonText: 'Contact BBL',
    background: '/bbl/sister-banner.jpg',
  },
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

async function main() {
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

  const pages = [
    {
      slug: 'about-us',
      title: 'About Us',
      description: 'About Biswas Builders Limited',
    },
    {
      slug: 'projects',
      title: 'Projects',
      description: 'Biswas Builders Limited projects',
    },
    {
      slug: 'projects/biswas-tower',
      title: 'Biswas Tower',
      description: 'Biswas Tower project details',
    },
    {
      slug: 'contact-us',
      title: 'Contact Us',
      description: 'Contact Biswas Builders Limited',
    },
  ];

  for (const page of pages) {
    await prisma.cmsPage.upsert({
      where: { slug: page.slug },
      update: {
        title: page.title,
        status: 'published',
        published_at: new Date(),
        content: {
          pageTitle: page.title,
        },
        metadata: {
          description: page.description,
        },
      },
      create: {
        slug: page.slug,
        title: page.title,
        status: 'published',
        published_at: new Date(),
        content: {
          pageTitle: page.title,
        },
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
