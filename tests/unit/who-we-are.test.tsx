import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Intro } from "@/components/sections/intro";
import { home } from "@/content/home";

describe("Who we are cards", () => {
  it("links each division to the services it covers", () => {
    render(<Intro />);
    const list = screen.getByRole("list", { name: "Our divisions" });
    const links = within(list).getAllByRole("link");
    expect(links).toHaveLength(home.intro.divisions.length);
    home.intro.divisions.forEach((division, i) => {
      expect(links[i]).toHaveAttribute("href", "#services");
      expect(links[i]).toHaveAccessibleName(expect.stringContaining(division.title));
    });
  });

  it("keeps the arch badge, number and photo out of the accessibility tree", () => {
    const { container } = render(<Intro />);
    for (const badge of container.querySelectorAll("[data-arch-badge]")) {
      expect(badge).toHaveAttribute("aria-hidden", "true");
    }
    expect(container.querySelectorAll("[data-arch-badge]")).toHaveLength(home.intro.divisions.length);
    expect(screen.queryAllByRole("img")).toHaveLength(0);
  });

  it("pairs every division with a photo", () => {
    for (const division of home.intro.divisions) {
      expect(home.images[division.image]).toBeDefined();
    }
  });
});
