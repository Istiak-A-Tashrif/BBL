"use client";

import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import type { ProjectsPageContent } from "./projects-page-cms";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const section = "px-[clamp(18px,4vw,64px)] py-[clamp(72px,10vw,132px)]";
const eyebrow = "m-0 text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#b88a3a]";
const title = "m-0 font-serif text-[clamp(38px,6vw,82px)] font-medium leading-[0.98]";
const muted = "max-w-[680px] text-[17px] leading-[1.7] text-[#62615d]";
const cardText = "m-0 leading-[1.65] text-[#62615d]";

export function ProjectsModern({ content }: { content: ProjectsPageContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-hero]", { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>("[data-reveal-root]").forEach((sectionEl) => {
        const items = sectionEl.querySelectorAll<HTMLElement>("[data-reveal]");
        if (!items.length) return;
        gsap.fromTo(items, { y: 54, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: sectionEl, start: "top 78%", toggleActions: "play none none reverse" } });
      });
      gsap.to("[data-parallax]", { yPercent: -10, ease: "none", scrollTrigger: { trigger: "[data-parallax]", start: "top bottom", end: "bottom top", scrub: true } });
      ScrollTrigger.refresh();
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="min-h-screen bg-[#f5f3ee] font-sans text-[#171717]">
      <section className="relative grid min-h-[72vh] items-end overflow-hidden bg-[#171717] text-white">
        <Image className="absolute inset-0 h-[112%] w-full object-cover opacity-70" src={content.hero.image} alt="" width={1920} height={1080} sizes="100vw" priority data-parallax />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/20" />
        <div className="relative z-[1] grid max-w-[1080px] gap-7 px-[clamp(18px,4vw,64px)] py-[clamp(72px,12vw,132px)]">
          <p className={eyebrow} data-hero>{content.hero.eyebrow}</p>
          <h1 className="m-0 max-w-[980px] font-serif text-[clamp(54px,8vw,116px)] font-medium leading-[0.98]" data-hero>{content.hero.title}</h1>
          <p className="m-0 max-w-[760px] text-[clamp(18px,2vw,24px)] leading-[1.55] text-white/76" data-hero>{content.hero.description}</p>
        </div>
      </section>

      <section className={section} data-reveal-root>
        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div data-reveal>
            <p className={eyebrow}>{content.intro.eyebrow}</p>
            <h2 className={cn(title, "mt-4")}>{content.intro.title}</h2>
          </div>
          <p className={muted} data-reveal>{content.intro.description}</p>
        </div>
        <div className="mb-8 flex flex-wrap gap-3" data-reveal>
          {content.filters.map((filter) => (
            <span className="rounded-full border border-black/15 px-4 py-2 text-sm font-bold text-[#272727]" key={filter}>{filter}</span>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {content.projects.map((project) => (
            <article className="group relative min-h-[520px] overflow-hidden rounded-lg text-white" data-reveal key={project.title}>
              <Image className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" src={project.image} alt={project.title} width={1200} height={900} sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/80" />
              <div className="absolute inset-x-0 bottom-0 z-[1] p-7">
                <div className="mb-5 flex flex-wrap gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-white/70">
                  <span>{project.type}</span>
                  <span>/</span>
                  <span>{project.status}</span>
                </div>
                <h3 className="mb-3 mt-0 font-serif text-[clamp(34px,4vw,58px)] font-medium leading-none">{project.title}</h3>
                <div className="flex justify-between gap-4 text-white/75">
                  <span>{project.location}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={cn(section, "bg-[#171717] text-white")} data-reveal-root>
        <div className="mb-10">
          <p className={eyebrow}>{content.process.eyebrow}</p>
          <h2 className={title}>{content.process.title}</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {content.process.items.map((item, index) => (
            <article className="rounded-lg border border-white/10 bg-white/[0.06] p-7" data-reveal key={item.title}>
              <span className="mb-9 block font-extrabold text-[#d8b46f]">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mb-3 mt-0 text-[22px] font-bold">{item.title}</h3>
              <p className="m-0 leading-[1.65] text-white/68">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
