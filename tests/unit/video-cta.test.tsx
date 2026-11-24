import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { home } from "@/content/home";

const reduced = vi.hoisted(() => ({ value: false }));
vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return { ...actual, useReducedMotion: () => reduced.value };
});

const { VideoCta } = await import("@/components/sections/video-cta");

/** Captures the IntersectionObserver callback so a test can report the band as visible. */
let reportVisible: (visible: boolean) => void = () => undefined;

beforeEach(() => {
  reportVisible = () => undefined;
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: (entries: Partial<IntersectionObserverEntry>[]) => void) {
        reportVisible = (visible) => callback([{ isIntersecting: visible }]);
      }
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    },
  );
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => undefined);
});

afterEach(() => {
  reduced.value = false;
  vi.restoreAllMocks();
});

describe("VideoCta", () => {
  it("never relies on the autoplay attribute, so server HTML cannot start playback", () => {
    const { container } = render(<VideoCta />);
    const video = container.querySelector("video")!;
    expect(video).not.toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("poster", home.videoCta.video.poster);
    expect(video.muted).toBe(true);
    expect(video).toHaveAttribute("aria-hidden", "true");
  });

  it("plays only while the band is on screen", () => {
    render(<VideoCta />);
    act(() => reportVisible(true));
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
    act(() => reportVisible(false));
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });

  it("never plays for visitors who prefer reduced motion", () => {
    reduced.value = true;
    const { container } = render(<VideoCta />);
    act(() => reportVisible(true));
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
    expect(container.querySelector("video")).toHaveAttribute("preload", "none");
  });

  it("links its call to action to the contact section", () => {
    render(<VideoCta />);
    expect(screen.getByRole("link", { name: home.videoCta.button.label })).toHaveAttribute("href", "#contact");
  });
});
