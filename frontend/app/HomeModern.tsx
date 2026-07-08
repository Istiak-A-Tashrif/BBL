"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import type { HomeContent } from "./home-cms";

function chunk<T>(items: T[], count: number) {
  return items.slice(0, count);
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const section = "px-[clamp(18px,4vw,64px)] py-[clamp(72px,10vw,132px)]";
const eyebrow = "m-0 text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#b88a3a]";
const title = "m-0 font-serif text-[clamp(38px,6vw,82px)] font-medium leading-[0.98]";
const muted = "max-w-[640px] text-[17px] leading-[1.7] text-[#62615d]";
const pill =
  "inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-extrabold no-underline";
const goldButton = cn(pill, "bg-[#b88a3a] text-[#111]");
const outlineButton = cn(pill, "border border-current text-inherit");
const card = "rounded-lg border border-black/10 bg-white";
const cardTitle = "mb-3 mt-0 text-[22px] font-bold";
const cardText = "m-0 leading-[1.65] text-[#62615d]";
const revealGrid = "grid grid-cols-1 gap-4 lg:grid-cols-3";

export function HomeModern({ content }: { content: HomeContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero]",
        { y: 42, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: "power3.out" },
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal-root]").forEach((sectionEl) => {
        const items = sectionEl.querySelectorAll<HTMLElement>("[data-reveal]");

        if (!items.length) return;

        gsap.fromTo(
          items,
          { y: 54, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.to("[data-parallax]", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: "[data-parallax]", start: "top bottom", end: "bottom top", scrub: true },
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main ref={rootRef} className="min-h-screen bg-[#f5f3ee] font-sans text-[#171717]">
      <nav className="sticky top-0 z-20 flex flex-col gap-5 border-b border-black/10 bg-[#f5f3ee]/90 px-[clamp(18px,4vw,64px)] py-[18px] backdrop-blur-2xl lg:flex-row lg:items-center lg:justify-between">
        <a href="/" aria-label={content.site.name}>
          <img className="h-[42px] w-auto" src={content.site.logoDark} alt={content.site.name} />
        </a>
        <div className="flex flex-wrap items-center gap-x-[clamp(14px,2.5vw,34px)] gap-y-3 text-sm font-extrabold uppercase tracking-[0.04em]">
          <a className="text-inherit no-underline" href="/">{content.site.navHomeLabel}</a>
          <a className="text-inherit no-underline" href="/about-us">{content.site.navAboutLabel}</a>
          <a className="text-inherit no-underline" href="/projects">{content.site.navProjectsLabel}</a>
          <a className="text-inherit no-underline" href="/contact-us">{content.site.navContactLabel}</a>
        </div>
        <a
          className="rounded-full border border-black/20 px-4 py-3 text-sm font-extrabold text-inherit no-underline"
          href={`tel:${content.site.phone.replace(/\s/g, "")}`}
        >
          {content.site.phone}
        </a>
      </nav>

      <section className="relative grid min-h-[calc(100vh-79px)] grid-cols-1 items-end overflow-hidden">
        <img className="absolute inset-0 h-full w-full object-cover" src={content.hero.image} alt="" data-parallax />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-black/10" />
        <div className="relative z-[1] grid max-w-[1120px] gap-7 px-[clamp(18px,4vw,64px)] py-[clamp(72px,12vw,140px)] text-white">
          <p className={eyebrow} data-hero>
            {content.hero.eyebrow}
          </p>
          <h1 className="m-0 max-w-[960px] font-serif text-[clamp(54px,9vw,132px)] font-medium leading-[0.98]" data-hero>
            {content.hero.title}
            <span className="block text-[#d8b46f] italic">{content.hero.highlight}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-6" data-hero>
            <a className={goldButton} href="/projects">
              {content.hero.buttonText}
            </a>
            <a className={outlineButton} href="/contact-us">
              {content.hero.secondaryButtonText}
            </a>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 bg-[#171717] text-white lg:grid-cols-3" data-reveal-root>
        {[
          [content.stats.since, content.stats.sinceLabel],
          [content.stats.team, content.stats.teamLabel],
          [content.stats.projects, content.stats.projectsLabel],
        ].map(([value, label]) => (
          <div className="border-r border-white/10 p-[clamp(22px,4vw,42px)]" data-reveal key={label}>
            <strong className="block text-[clamp(34px,5vw,64px)] font-medium">{value}</strong>
            <span className="text-sm text-white/70">{label}</span>
          </div>
        ))}
      </section>

      <section className={section} data-reveal-root>
        <div className={revealGrid}>
          {content.features.map((feature, index) => (
            <article className={cn(card, "p-7")} data-reveal key={feature.title}>
              <span className="mb-9 block font-extrabold text-[#b88a3a]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={cardTitle}>{feature.title}</h3>
              <p className={cardText}>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={section} data-reveal-root>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:justify-between">
          <div className="flex flex-1 flex-col justify-center gap-6">
            <p className={eyebrow} data-reveal>
              {content.about.eyebrow}
            </p>
            <h2 className={title} data-reveal>
              {content.about.title}
            </h2>
            <p className={muted} data-reveal>
              {content.about.description}
            </p>
            <blockquote className="m-0 border-l-[3px] border-[#b88a3a] pl-5 text-xl leading-[1.5] text-[#272727]" data-reveal>
              {content.about.quote}
            </blockquote>
          </div>
          <div className="min-h-[360px] flex-1 overflow-hidden rounded-lg lg:min-h-[520px]" data-reveal>
            <img className="h-full w-full object-cover" src={content.about.image} alt="BBL building and construction work" />
          </div>
        </div>
      </section>

      <section className={section} data-reveal-root>
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className={eyebrow}>{content.sections.services.eyebrow}</p>
            <h2 className={title}>{content.sections.services.title}</h2>
          </div>
          <p className={muted}>{content.sections.services.description}</p>
        </div>
        <div className={revealGrid}>
          {content.services.map((service) => (
            <article className={cn(card, "overflow-hidden")} data-reveal key={service.title}>
              <img className="aspect-[16/10] w-full object-cover" src={service.image} alt={service.title} />
              <div className="p-6">
                <h3 className={cardTitle}>{service.title}</h3>
                <p className={cardText}>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={cn(section, "bg-[#171717] text-white")} data-reveal-root>
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className={eyebrow}>{content.sections.projects.eyebrow}</p>
            <h2 className={title}>{content.sections.projects.title}</h2>
          </div>
          <a className={outlineButton} href="/projects">
            {content.sections.projects.buttonText}
          </a>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {content.projects.map((project) => (
            <a
              className="relative min-h-[420px] overflow-hidden rounded-lg text-white no-underline after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/5 after:to-black/75"
              href="/projects/biswas-tower"
              data-reveal
              key={project.title}
            >
              <img className="absolute inset-0 h-full w-full object-cover" src={project.image} alt={project.title} />
              <div className="absolute inset-x-0 bottom-0 z-[1] p-6">
                <h3 className="mb-2 mt-0 text-2xl font-bold">{project.title}</h3>
                <div className="flex justify-between gap-4 text-white/75">
                  <span>{project.location}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className={section} data-reveal-root>
        <div className="grid grid-cols-1 items-stretch gap-[18px] lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex min-h-[360px] flex-col justify-end rounded-lg bg-[#21443b] p-9 text-white lg:min-h-[520px]" data-reveal>
            <p className={eyebrow}>{content.sections.mission.eyebrow}</p>
            <h2 className={title}>
              {content.mission.title}{" "}
              <span className="text-[#d8b46f] italic">
                {content.mission.highlightPrefix} {content.mission.highlight}
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
            {chunk(content.mission.images, 4).map((image, index) => (
              <img
                className="min-h-[250px] h-full w-full rounded-lg object-cover"
                src={image}
                alt={`BBL mission ${index + 1}`}
                data-reveal
                key={`${image}-${index}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={section} data-reveal-root>
        <div className="mb-10">
          <p className={eyebrow}>{content.sections.testimonials.eyebrow}</p>
          <h2 className={title}>{content.sections.testimonials.title}</h2>
        </div>
        <div className={revealGrid}>
          {content.testimonials.map((testimonial) => (
            <article className={cn(card, "p-7")} data-reveal key={testimonial.author}>
              <img className="mb-6 h-[72px] w-[72px] rounded-full object-cover" src={testimonial.image} alt={testimonial.author} />
              <h3 className={cardTitle}>{testimonial.author}</h3>
              <p className={cardText}>{testimonial.quote}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cn(section, "bg-[#e8e0d0]")} data-reveal-root>
        <div className="mb-10">
          <p className={eyebrow}>{content.choose.eyebrow}</p>
          <h2 className={title}>
            {content.choose.title}
          </h2>
        </div>
        <div className={revealGrid}>
          {content.choose.items.map((item) => (
            <article className={cn(card, "p-7")} data-reveal key={item.title}>
              <h3 className={cardTitle}>{item.title}</h3>
              <p className={cardText}>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={section} data-reveal-root>
        <div className="mb-10">
          <p className={eyebrow}>{content.sections.team.eyebrow}</p>
          <h2 className={title}>{content.sections.team.title}</h2>
        </div>
        <div className={revealGrid}>
          {content.team.map((member) => (
            <article className={cn(card, "overflow-hidden")} data-reveal key={`${member.name}-${member.role}`}>
              <img className="aspect-[4/5] w-full object-cover" src={member.image} alt={member.name} />
              <div className="p-6">
                <h3 className={cardTitle}>{member.name}</h3>
                <p className={cardText}>{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={section} data-reveal-root>
        <div className="mb-10">
          <p className={eyebrow}>{content.sections.updates.eyebrow}</p>
          <h2 className={title}>{content.sections.updates.title}</h2>
        </div>
        <div className={revealGrid}>
          {content.updates.map((update) => (
            <article className={cn(card, "overflow-hidden")} data-reveal key={update.title}>
              <img className="aspect-video w-full object-cover" src={update.image} alt={update.title} />
              <div className="p-6">
                <p className={eyebrow}>
                  {update.category} / {update.date}
                </p>
                <h3 className={cardTitle}>{update.title}</h3>
                <p className={cardText}>
                  {update.author} · {update.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="relative overflow-hidden text-white">
        <img className="absolute inset-0 h-full w-full object-cover" src={content.footer.background} alt="" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-[1] flex flex-col gap-6 px-[clamp(18px,4vw,64px)] py-[clamp(72px,10vw,132px)] lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className={eyebrow}>{content.footer.eyebrow}</p>
            <h2 className={title}>{content.footer.title}</h2>
            <p className={muted}>{content.footer.description}</p>
          </div>
          <a className={goldButton} href="/contact-us">
            {content.footer.buttonText}
          </a>
        </div>
      </footer>
    </main>
  );
}
