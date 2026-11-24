import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { INTRO_SKIP_ATTR, markIntroReady, resetIntroForTests, useIntroReady } from "@/lib/intro";
import { introHeadScript } from "@/lib/intro-script";
import { Preloader } from "@/components/layout/preloader";

function Probe() {
  return <p>{useIntroReady() ? "ready" : "waiting"}</p>;
}

beforeEach(() => {
  resetIntroForTests();
  document.documentElement.removeAttribute(INTRO_SKIP_ATTR);
  sessionStorage.clear();
});

afterEach(() => {
  document.documentElement.removeAttribute(INTRO_SKIP_ATTR);
  vi.restoreAllMocks();
});

describe("intro store", () => {
  it("waits until the preloader marks the intro ready", () => {
    render(<Probe />);
    expect(screen.getByText("waiting")).toBeInTheDocument();
    act(() => markIntroReady());
    expect(screen.getByText("ready")).toBeInTheDocument();
  });

  it("is ready immediately when the head script chose to skip the intro", () => {
    document.documentElement.setAttribute(INTRO_SKIP_ATTR, "");
    render(<Probe />);
    expect(screen.getByText("ready")).toBeInTheDocument();
  });
});

describe("intro head script", () => {
  it("ignores earlier visits in the session, so the intro plays on every load", () => {
    sessionStorage.setItem("keypmc-intro-seen", "1");
    new Function(introHeadScript)();
    expect(document.documentElement.hasAttribute(INTRO_SKIP_ATTR)).toBe(false);
  });
});

describe("Preloader", () => {
  it("is hidden from assistive technology", () => {
    // Simulate a page that has just loaded, so the intro is not skipped as late.
    vi.spyOn(performance, "now").mockReturnValue(0);
    render(<Preloader />);
    expect(screen.getByTestId("preloader")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders nothing and releases the page when the intro is skipped", () => {
    document.documentElement.setAttribute(INTRO_SKIP_ATTR, "");
    render(
      <>
        <Preloader />
        <Probe />
      </>,
    );
    expect(screen.queryByTestId("preloader")).not.toBeInTheDocument();
    expect(screen.getByText("ready")).toBeInTheDocument();
  });
});
