/**
 * Server-safe pieces of the first-visit intro, imported by the root layout.
 *
 * The inline script runs in <head> before first paint. It sets INTRO_SKIP_ATTR
 * on <html> when the intro should not play (already seen this session, or the
 * visitor prefers reduced motion). CSS then hides the preloader with no flash,
 * and the hero animates straight away.
 */
export const INTRO_SKIP_ATTR = "data-intro-skip";
export const INTRO_SEEN_KEY = "keypmc-intro-seen";

export const introHeadScript = `(function(){try{if(sessionStorage.getItem("${INTRO_SEEN_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.setAttribute("${INTRO_SKIP_ATTR}","")}}catch(e){}})()`;
