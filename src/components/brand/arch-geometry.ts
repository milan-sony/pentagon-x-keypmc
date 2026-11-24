/*
 * Geometry of the arch and keystone in the Key International "Portal" mark
 * (public/brand/symbol-reverse.svg), in the mark's own 124 × 156 space.
 * Kept out of the client components so server components can share it.
 */
export const ARCH = {
  viewBox: "-4 -8 132 166",
  outer: "M1.2,156 V62 A60.8,60.8 0 0 1 122.8,62 V156",
  inner: "M10.2,156 V62 A51.8,51.8 0 0 1 113.8,62 V156",
  keystone: "M52.27,-3.08 L71.73,-3.08 L68.92,15.71 L55.08,15.71 Z",
  /** The keystone grown slightly, cut out of the arch so the two never touch. */
  keystoneGap: "M47.61,-6.3 L76.39,-6.3 L71.03,19.14 L52.97,19.14 Z",
} as const;
