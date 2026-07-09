"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import type { AboutContent } from "./about-cms";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const section = "px-[clamp(18px,4vw,64px)] py-[clamp(72px,10vw,132px)]";
const eyebrow = "m-0 text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#b88a3a]";
const title = "m-0 font-serif text-[clamp(38px,6vw,82px)] font-medium leading-[0.98]";
const muted = "max-w-[680px] text-[17px] leading-[1.7] text-[#62615d]";
const card = "rounded-lg border border-black/10 bg-white";
const cardTitle = "mb-3 mt-0 text-[22px] font-bold";
const cardText = "m-0 leading-[1.65] text-[#62615d]";

export function AboutModern({ content }: { content: AboutContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero]",
        { y: 42, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out" },
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

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="min-h-screen bg-[#f5f3ee] font-sans text-[#171717]">
      <section className="grid min-h-[calc(100vh-79px)] grid-cols-1 bg-[#171717] text-white lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-end gap-7 px-[clamp(18px,4vw,64px)] py-[clamp(72px,12vw,140px)]">
          <p className={eyebrow} data-hero>{content.hero.eyebrow}</p>
          <h1 className="m-0 max-w-[880px] font-serif text-[clamp(54px,8vw,116px)] font-medium leading-[0.98]" data-hero>
            {content.hero.title}
          </h1>
          <p className="m-0 max-w-[700px] text-[clamp(18px,2vw,24px)] leading-[1.55] text-white/72" data-hero>
            {content.hero.description}
          </p>
        </div>
        <div className="relative min-h-[440px] overflow-hidden lg:min-h-full">
          <img className="absolute inset-0 h-[112%] w-full object-cover" src={content.hero.image} alt="" data-parallax />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        </div>
      </section>

      <section className="grid grid-cols-1 border-b border-black/10 bg-[#f5f3ee] lg:grid-cols-3" data-reveal-root>
        {content.stats.map((stat) => (
          <div className="border-r border-black/10 p-[clamp(22px,4vw,42px)]" data-reveal key={stat.label}>
            <strong className="block text-[clamp(34px,5vw,64px)] font-medium">{stat.value}</strong>
            <span className="text-sm text-[#62615d]">{stat.label}</span>
          </div>
        ))}
      </section>

      <section className={section} data-reveal-root>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[320px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start" data-reveal>
            <p className={eyebrow}>{content.intro.eyebrow}</p>
            <div className="mt-8 h-px w-full bg-black/15" />
            <p className="mt-6 max-w-[260px] text-sm font-bold uppercase tracking-[0.16em] text-[#62615d]">
              Real estate, construction, land development, and customer support.
            </p>
          </aside>
          <div className="grid gap-8" data-reveal>
            <h2 className={title}>{content.intro.title}</h2>
            <p className="m-0 max-w-[900px] text-[clamp(20px,2.6vw,34px)] leading-[1.35] text-[#272727]">
              {content.intro.description}
            </p>
            <blockquote className="m-0 max-w-[760px] border-l-[3px] border-[#b88a3a] pl-5 text-xl leading-[1.5] text-[#272727]">
              {content.intro.quote}
            </blockquote>
          </div>
        </div>
      </section>

      <section className={cn(section, "bg-[#e8e0d0]")} data-reveal-root>
        <div className="mb-10">
          <p className={eyebrow}>What BBL Does</p>
          <h2 className={title}>Company capabilities</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {content.features.map((feature, index) => (
            <article className={cn(card, "p-7")} data-reveal key={feature.title}>
              <span className="mb-9 block font-extrabold text-[#b88a3a]">{String(index + 1).padStart(2, "0")}</span>
              <h3 className={cardTitle}>{feature.title}</h3>
              <p className={cardText}>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={section} data-reveal-root>
        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className={eyebrow}>{content.journey.eyebrow}</p>
            <h2 className={title}>{content.journey.title}</h2>
          </div>
          <p className={muted}>
            {content.journey.description}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-0 border-t border-black/10">
          {content.journey.items.map((item) => (
            <article className="grid grid-cols-1 gap-5 border-b border-black/10 py-8 lg:grid-cols-[220px_1fr]" data-reveal key={item.year}>
              <strong className="mb-8 block text-[clamp(34px,5vw,62px)] font-medium text-[#d8b46f]">{item.year}</strong>
              <div>
                <h3 className="mb-3 mt-0 text-[26px] font-bold">{item.title}</h3>
                <p className={cardText}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={cn(section, "bg-[#171717] text-white")} data-reveal-root>
        <div className="grid grid-cols-1 items-stretch gap-[18px] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
            {content.values.images.slice(0, 4).map((image, index) => (
              <img className="min-h-[240px] h-full w-full rounded-lg object-cover" src={image} alt={`BBL work ${index + 1}`} data-reveal key={image} />
            ))}
          </div>
          <div className="flex min-h-[360px] flex-col justify-end rounded-lg bg-[#21443b] p-9 text-white lg:min-h-[520px]" data-reveal>
            <p className={eyebrow}>{content.values.eyebrow}</p>
            <h2 className={title}>{content.values.title}</h2>
            <p className="mt-6 max-w-[620px] text-[17px] leading-[1.7] text-white/70">
              {content.values.description}
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
