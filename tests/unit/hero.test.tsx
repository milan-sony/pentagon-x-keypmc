import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";

const reduced = vi.hoisted(() => ({ value: false }));
vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return { ...actual, useReducedMotion: () => reduced.value };
});

const { Hero } = await import("@/components/sections/hero");
const { home } = await import("@/content/home");
const { markIntroReady, resetIntroForTests } = await import("@/lib/intro");

const [first, second, third] = home.hero.slides;

beforeEach(() => markIntroReady());

afterEach(() => {
  reduced.value = false;
  resetIntroForTests();
});

function activeSlideButton() {
  return screen.getAllByRole("button", { name: /^Show slide/ }).find((b) => b.getAttribute("aria-current") === "true");
}

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

  it("shows the slide a visitor picks", () => {
    render(<Hero />);
    fireEvent.click(screen.getByRole("button", { name: `Show slide 03: ${third.caption}` }));
    expect(activeSlideButton()).toHaveAccessibleName(`Show slide 03: ${third.caption}`);
    expect(screen.getByRole("group", { name: `3 of 3: ${third.caption}` })).not.toHaveAttribute("aria-hidden");
  });

  it("moves on when the active progress bar finishes", () => {
    const { container } = render(<Hero />);
    fireEvent.animationEnd(container.querySelector("[data-progress-active]")!);
    expect(activeSlideButton()).toHaveAccessibleName(`Show slide 02: ${second.caption}`);
  });

  it("can be paused and resumed", () => {
    const { container } = render(<Hero />);
    fireEvent.click(screen.getByRole("button", { name: "Pause slideshow" }));
    expect(screen.getByRole("button", { name: "Play slideshow" })).toBeInTheDocument();
    expect(container.querySelector("[data-progress-active]")).toHaveAttribute("data-paused", "true");
    fireEvent.click(screen.getByRole("button", { name: "Play slideshow" }));
    expect(container.querySelector("[data-progress-active]")).toHaveAttribute("data-paused", "false");
  });

  it("does not auto-advance for visitors who prefer reduced motion", () => {
    reduced.value = true;
    const { container } = render(<Hero />);
    expect(screen.getByRole("button", { name: "Play slideshow" })).toBeInTheDocument();
    expect(container.querySelector("[data-progress-active]")).toHaveAttribute("data-paused", "true");
  });
});
