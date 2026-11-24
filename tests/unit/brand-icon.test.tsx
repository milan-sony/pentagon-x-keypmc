import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { BrandIcon } from "@/components/icons/brand-icon";
import { glyphs, type GlyphKey } from "@/components/icons/glyphs";

const keys = Object.keys(glyphs) as GlyphKey[];

describe("BrandIcon", () => {
  it("draws all ten icons", () => {
    expect(keys).toHaveLength(10);
  });

  it.each(keys)("%s is decorative with exactly one gold accent", (name) => {
    const { container } = render(<BrandIcon name={name} />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("viewBox", "0 0 48 48");
    expect(svg.querySelectorAll("[data-accent]")).toHaveLength(1);
    expect(svg.querySelectorAll("[data-stroke]").length).toBeGreaterThan(1);
  });

  it("marks the small size so detail strokes can be hidden", () => {
    const { container } = render(<BrandIcon name="layers" size="sm" />);
    expect(container.querySelector("svg")).toHaveAttribute("data-size", "sm");
  });
});
