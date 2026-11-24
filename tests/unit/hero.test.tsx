import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";

const reduced = vi.hoisted(() => ({ value: false }));
vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return { ...actual, useReducedMotion: () => reduced.value };
});

const { Hero } = await import("@/components/sections/hero");
const { home } = await import("@/content/home");
const { markIntroReady, resetIntroForTests } = await import("@/lib/intro");

const [first, second, third] = home.hero.slides;
const slide = (n: number, caption: string) => screen.getByRole("group", { name: `${n} of 3: ${caption}` });
const wait = (ms: number) => act(() => vi.advanceTimersByTime(ms));

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  markIntroReady();
});

afterEach(() => {
  vi.useRealTimers();
  reduced.value = false;
  resetIntroForTests();
});

describe("Hero slideshow", () => {
  it("keeps the headline as the page's main heading", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1, name: home.hero.title })).toBeInTheDocument();
  });

  it("presents the slides as a labelled carousel, one visible at a time", () => {
    render(<Hero />);
    const carousel = screen.getByRole("group", { name: "Featured sectors" });
    expect(carousel).toHaveAttribute("aria-roledescription", "carousel");
    expect(within(carousel).getByRole("group", { name: `1 of 3: ${first.caption}` })).not.toHaveAttribute(
      "aria-hidden",
    );
    // Hidden slides have no computed name, so look them up by their label.
    expect(carousel.querySelector(`[aria-label="2 of 3: ${second.caption}"]`)).toHaveAttribute("aria-hidden", "true");
  });

  it("has no slide numbers or pause button", () => {
    render(<Hero />);
    expect(screen.queryByRole("button", { name: /Pause slideshow|Play slideshow|Show slide/ })).toBeNull();
  });

  it("moves to the next slide after seven seconds", () => {
    render(<Hero />);
    wait(6900);
    expect(slide(1, first.caption)).not.toHaveAttribute("aria-hidden");
    wait(200);
    expect(slide(2, second.caption)).not.toHaveAttribute("aria-hidden");
  });

  it("stays on the first slide for visitors who prefer reduced motion", () => {
    reduced.value = true;
    render(<Hero />);
    wait(20000);
    expect(slide(1, first.caption)).not.toHaveAttribute("aria-hidden");
  });

  it("moves on from the Next preview and restarts the wait", () => {
    render(<Hero />);
    wait(5000);
    fireEvent.click(screen.getByRole("button", { name: /^Next/ }));
    expect(slide(2, second.caption)).not.toHaveAttribute("aria-hidden");
    wait(5000);
    expect(slide(2, second.caption)).not.toHaveAttribute("aria-hidden");
    wait(2100);
    expect(slide(3, third.caption)).not.toHaveAttribute("aria-hidden");
  });
});
