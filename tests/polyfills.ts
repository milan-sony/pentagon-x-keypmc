// Loaded before React. jsdom has no AnimationEvent, which makes React listen for
// the prefixed `webkitAnimationEnd` instead of `animationend`, so `onAnimationEnd`
// never fires in tests. Real browsers all have it.
if (typeof window !== "undefined" && !("AnimationEvent" in window)) {
  class AnimationEventPolyfill extends Event {
    animationName = "";
    elapsedTime = 0;
    pseudoElement = "";
  }
  Object.defineProperty(window, "AnimationEvent", { value: AnimationEventPolyfill, writable: true });
}
