"use client";

import { useEffect } from "react";

type TemplateScriptsProps = {
  scripts: string[];
};

export function TemplateScripts({ scripts }: TemplateScriptsProps) {
  useEffect(() => {
    let cancelled = false;
    const loadedScripts: HTMLScriptElement[] = [];

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
        loadedScripts.push(script);
      });

    scripts
      .reduce(
        (chain, src) =>
          chain.then(() => {
            if (cancelled) return;
            return loadScript(src);
          }),
        Promise.resolve<void>(undefined),
      )
      .then(() => {
        if (!cancelled && document.readyState === "complete") {
          window.dispatchEvent(new Event("load"));
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      cancelled = true;
      loadedScripts.forEach((script) => script.remove());
    };
  }, [scripts]);

  return null;
}
