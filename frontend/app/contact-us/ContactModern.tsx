"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import type { ContactContent } from "./contact-cms";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const section = "px-[clamp(18px,4vw,64px)] py-[clamp(72px,10vw,132px)]";
const eyebrow = "m-0 text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#b88a3a]";
const title = "m-0 font-serif text-[clamp(38px,6vw,82px)] font-medium leading-[0.98]";
const inputClass = "min-h-12 rounded-lg border border-black/15 bg-white px-4 text-base outline-none focus:border-[#b88a3a]";

function getMapEmbedUrl(mapUrl: string, address: string) {
  if (mapUrl.includes("/embed")) return mapUrl;
  if (mapUrl.includes("google.com/maps")) {
    const separator = mapUrl.includes("?") ? "&" : "?";
    return `${mapUrl}${separator}output=embed`;
  }
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

export function ContactModern({ content }: { content: ContactContent }) {
  const rootRef = useRef<HTMLElement>(null);
  const mapEmbedUrl = getMapEmbedUrl(content.visit.mapUrl, content.visit.address);

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
      <section className="grid min-h-[72vh] grid-cols-1 bg-[#171717] text-white lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col justify-end gap-7 px-[clamp(18px,4vw,64px)] py-[clamp(72px,12vw,132px)]">
          <p className={eyebrow} data-hero>{content.hero.eyebrow}</p>
          <h1 className="m-0 max-w-[900px] font-serif text-[clamp(54px,8vw,112px)] font-medium leading-[0.98]" data-hero>{content.hero.title}</h1>
          <p className="m-0 max-w-[720px] text-[clamp(18px,2vw,24px)] leading-[1.55] text-white/72" data-hero>{content.hero.description}</p>
        </div>
        <div className="relative min-h-[420px] overflow-hidden">
          <img className="absolute inset-0 h-[112%] w-full object-cover" src={content.hero.image} alt="" data-parallax />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </section>

      <section className={section} data-reveal-root>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {content.cards.map((card) => (
            <article className="rounded-lg border border-black/10 bg-white p-7" data-reveal key={card.title}>
              <p className={eyebrow}>{card.title}</p>
              <h3 className="mb-3 mt-6 text-[24px] font-bold">{card.value}</h3>
              <p className="m-0 leading-[1.65] text-[#62615d]">{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cn(section, "pt-0")} data-reveal-root>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg bg-[#21443b] p-8 text-white lg:p-10" data-reveal>
            <p className={eyebrow}>{content.form.eyebrow}</p>
            <h2 className={cn(title, "mt-4")}>{content.form.title}</h2>
            <p className="mt-6 max-w-[620px] text-[17px] leading-[1.7] text-white/70">{content.form.description}</p>
          </div>
          <form className="grid gap-4 rounded-lg border border-black/10 bg-white p-6 lg:p-8" data-reveal>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input className={inputClass} placeholder="Name" />
              <input className={inputClass} placeholder="Phone" />
            </div>
            <input className={inputClass} placeholder="Email" />
            <input className={inputClass} placeholder="Inquiry type" />
            <textarea className="min-h-36 rounded-lg border border-black/15 bg-white p-4 text-base outline-none focus:border-[#b88a3a]" placeholder="Message" />
            <button className="min-h-12 rounded-full bg-[#b88a3a] px-6 text-sm font-extrabold text-[#111]" type="button">{content.form.submitText}</button>
          </form>
        </div>
      </section>

      <section className={cn(section, "bg-[#e8e0d0]")} data-reveal-root>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-reveal>
            <p className={eyebrow}>{content.visit.eyebrow}</p>
            <h2 className={cn(title, "mt-4")}>{content.visit.title}</h2>
            <p className="mt-6 max-w-[620px] text-[17px] leading-[1.7] text-[#62615d]">{content.visit.address}</p>
          </div>
          <div className="overflow-hidden rounded-lg bg-[#171717]" data-reveal>
            <iframe
              className="block min-h-[360px] w-full border-0"
              src={mapEmbedUrl}
              title="Biswas Builders Limited location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}
