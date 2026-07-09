"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { SiteContent } from "./site-cms";

const localReactRoutes = new Set(["/", "/about-us", "/projects", "/contact-us"]);
const sectionTitle = "m-0 font-serif text-[clamp(38px,6vw,82px)] font-medium leading-[0.98]";
const eyebrow = "m-0 text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#b88a3a]";
const muted = "max-w-[680px] text-[17px] leading-[1.7] text-[#62615d]";
const goldButton =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-[#b88a3a] px-5 text-sm font-extrabold text-[#111] no-underline";

export function SiteChrome({ children, content }: { children: ReactNode; content: SiteContent }) {
  const pathname = usePathname();
  const showChrome = localReactRoutes.has(pathname);

  if (!showChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <nav className="sticky top-0 z-20 flex flex-col gap-5 border-b border-black/10 bg-[#f5f3ee]/90 px-[clamp(18px,4vw,64px)] py-[18px] backdrop-blur-2xl lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" aria-label={content.site.name}>
          <Image className="h-[42px] w-auto" src={content.site.logoDark} alt={content.site.name} width={180} height={42} />
        </Link>
        <div className="flex flex-wrap items-center gap-x-[clamp(14px,2.5vw,34px)] gap-y-3 text-sm font-extrabold uppercase tracking-[0.04em]">
          <Link className={pathname === "/" ? "text-[#b88a3a] no-underline" : "text-inherit no-underline"} href="/">
            {content.site.navHomeLabel}
          </Link>
          <Link className={pathname === "/about-us" ? "text-[#b88a3a] no-underline" : "text-inherit no-underline"} href="/about-us">
            {content.site.navAboutLabel}
          </Link>
          <Link className={pathname === "/projects" ? "text-[#b88a3a] no-underline" : "text-inherit no-underline"} href="/projects">{content.site.navProjectsLabel}</Link>
          <Link className={pathname === "/contact-us" ? "text-[#b88a3a] no-underline" : "text-inherit no-underline"} href="/contact-us">{content.site.navContactLabel}</Link>
        </div>
        <a className="rounded-full border border-black/20 px-4 py-3 text-sm font-extrabold text-inherit no-underline" href={`tel:${content.site.phone.replace(/\s/g, "")}`}>
          {content.site.phone}
        </a>
      </nav>
      {children}
      <footer className="relative overflow-hidden text-white">
        <Image className="absolute inset-0 h-full w-full object-cover" src={content.footer.background} alt="" width={1920} height={1080} sizes="100vw" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-[1] flex flex-col gap-6 px-[clamp(18px,4vw,64px)] py-[clamp(72px,10vw,132px)] lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className={eyebrow}>{content.footer.eyebrow}</p>
            <h2 className={sectionTitle}>{content.footer.title}</h2>
            <p className={muted}>{content.footer.description}</p>
          </div>
          <Link className={goldButton} href="/contact-us">{content.footer.buttonText}</Link>
        </div>
      </footer>
    </>
  );
}
