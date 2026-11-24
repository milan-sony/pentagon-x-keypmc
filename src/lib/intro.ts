import { useSyncExternalStore } from "react";
import { INTRO_SKIP_ATTR } from "@/lib/intro-script";

export { INTRO_SEEN_KEY, INTRO_SKIP_ATTR } from "@/lib/intro-script";

/**
 * Client-side store that lets the hero wait for the first-visit preloader.
 * See src/lib/intro-script.ts for how the intro is skipped before first paint.
 */
let ready = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function introSkipped() {
  return typeof document !== "undefined" && document.documentElement.hasAttribute(INTRO_SKIP_ATTR);
}

function getSnapshot() {
  return ready || introSkipped();
}

/** Called by the preloader as it starts to lift, so the hero animates in beneath it. */
export function markIntroReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((listener) => listener());
}

/** True once the page may play its entrance animation. Always false on the server. */
export function useIntroReady() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function resetIntroForTests() {
  ready = false;
}
