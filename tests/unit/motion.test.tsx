import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";

const reduced = vi.hoisted(() => ({ value: false }));
vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return { ...actual, useReducedMotion: () => reduced.value };
});

const { Odometer } = await import("@/components/motion/odometer");
const { SplitText } = await import("@/components/motion/split-heading");
const { Cursor } = await import("@/components/motion/cursor");
const { ImageReveal } = await import("@/components/motion/image-reveal");
const { Parallax } = await import("@/components/motion/parallax");
const { RevealGroup, RevealItem } = await import("@/components/motion/reveal");

function mockPointer(fine: boolean) {
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        matches: query.includes("pointer: fine") ? fine : false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) as unknown as MediaQueryList,
  );
}

afterEach(() => {
  reduced.value = false;
  vi.restoreAllMocks();
});

describe("Odometer", () => {
  it("puts the final number in server HTML, for screen readers and for the digits", () => {
    const html = renderToString(<Odometer value={15} />);
    expect(html).toContain(">15<");
    // Digit columns start at their final positions: 1 → -10%, 5 → -50% of a 0–9 column.
    expect(html).toMatch(/translateY\(-5%\)/);
    expect(html).toMatch(/translateY\(-25%\)/);
  });

  it("exposes the value once to assistive technology", () => {
    render(<Odometer value={12} />);
    expect(screen.getByText("12")).toHaveClass("sr-only");
  });

  it("pads to the requested number of digits", () => {
    const { container } = render(<Odometer value={3} pad={2} />);
    expect(container.querySelectorAll("[data-digit]")).toHaveLength(2);
  });
});

describe("SplitText", () => {
  it("keeps the whole phrase as the heading's accessible name", () => {
    render(
      <SplitText
        as="h2"
        parts={[{ text: "One accountable team" }, { text: "for the whole project.", className: "accent" }]}
      />,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "One accountable team for the whole project." }),
    ).toBeInTheDocument();
  });

  it("hides the split word pieces from assistive technology", () => {
    const { container } = render(<SplitText as="h2" parts={[{ text: "Adding value" }]} />);
    const pieces = container.querySelector("[aria-hidden='true']");
    expect(pieces?.textContent?.replace(/\s+/g, " ").trim()).toBe("Adding value");
  });
});

describe("Cursor", () => {
  it("renders on a desktop with a fine pointer", () => {
    mockPointer(true);
    const { container } = render(<Cursor />);
    expect(container.querySelector("[data-cursor-root]")).not.toBeNull();
  });

  it("does not render on touch devices", () => {
    mockPointer(false);
    const { container } = render(<Cursor />);
    expect(container.querySelector("[data-cursor-root]")).toBeNull();
  });

  it("does not render for visitors who prefer reduced motion", () => {
    mockPointer(true);
    reduced.value = true;
    const { container } = render(<Cursor />);
    expect(container.querySelector("[data-cursor-root]")).toBeNull();
  });
});

describe("SplitText chars variant", () => {
  it("keeps the accessible name while splitting into characters", () => {
    const { container } = render(<SplitText as="h1" variant="chars" parts={[{ text: "Abu Dhabi" }]} />);
    expect(screen.getByRole("heading", { level: 1, name: "Abu Dhabi" })).toBeInTheDocument();
    // One animated span per letter, spaces excluded.
    expect(container.querySelectorAll("[data-char]")).toHaveLength(8);
  });
});

describe("ImageReveal", () => {
  it("renders its image with a decorative wipe overlay", () => {
    const { container } = render(
      <ImageReveal>
        <span role="img" aria-label="Site visit" />
      </ImageReveal>,
    );
    expect(screen.getByRole("img", { name: "Site visit" })).toBeInTheDocument();
    expect(container.querySelector("[data-reveal-overlay]")).toHaveAttribute("aria-hidden", "true");
  });

  it("skips the overlay for reduced-motion visitors", () => {
    reduced.value = true;
    const { container } = render(
      <ImageReveal>
        <span role="img" aria-label="Site visit" />
      </ImageReveal>,
    );
    expect(container.querySelector("[data-reveal-overlay]")).toBeNull();
  });
});

describe("Parallax", () => {
  it("renders children without scroll-linked movement under reduced motion", () => {
    reduced.value = true;
    const { container } = render(
      <Parallax offset={80}>
        <span>Layer</span>
      </Parallax>,
    );
    expect(screen.getByText("Layer")).toBeInTheDocument();
    expect(container.querySelector("[data-parallax]")).toHaveAttribute("data-parallax", "static");
  });
});

describe("RevealGroup", () => {
  it("renders the requested list element with its items", () => {
    render(
      <RevealGroup as="ul">
        <RevealItem as="li">One</RevealItem>
        <RevealItem as="li">Two</RevealItem>
      </RevealGroup>,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
