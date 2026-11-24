/**
 * Server-safe pieces of the intro, imported by the root layout.
 *
 * The inline script runs in <head> before first paint. The intro plays on every
 * load; the script sets INTRO_SKIP_ATTR on <html> only when the visitor prefers
 * reduced motion. CSS then hides the preloader with no flash, and the hero
 * animates straight away.
 */
export const INTRO_SKIP_ATTR = "data-intro-skip";

export const introHeadScript = `(function(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.setAttribute("${INTRO_SKIP_ATTR}","")}}catch(e){}})()`;
