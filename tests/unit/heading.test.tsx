import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionLabel } from "@/components/ui/heading";

describe("SectionLabel", () => {
  it("shows the label beside a decorative keystone, not inside a pill", () => {
    const { container } = render(<SectionLabel>Who we are</SectionLabel>);
    const label = screen.getByText("Who we are").closest("[data-section-label]");
    expect(label).not.toBeNull();
    expect(label!.tagName).toBe("P");
    expect(label).not.toHaveClass("rounded-full");
    const keystone = container.querySelector("[data-keystone]");
    expect(keystone).toHaveAttribute("aria-hidden", "true");
  });

  it("draws a line on both sides when centred", () => {
    const { container } = render(<SectionLabel align="center">Contact</SectionLabel>);
    expect(container.querySelectorAll("[data-label-line]")).toHaveLength(2);
  });
});
