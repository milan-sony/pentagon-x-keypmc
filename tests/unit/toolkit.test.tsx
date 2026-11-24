import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Approach } from "@/components/sections/approach";
import { home } from "@/content/home";

describe("Tools we work with", () => {
  it("shows every tool with its name, description and a brand icon that redraws on hover", () => {
    render(<Approach />);
    const list = screen.getByRole("list", { name: home.approach.toolsTitle });
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(home.approach.tools.length);
    home.approach.tools.forEach((tool, i) => {
      expect(within(items[i]).getByText(tool.title)).toBeInTheDocument();
      expect(within(items[i]).getByText(tool.description)).toBeInTheDocument();
      expect(items[i].querySelectorAll("svg.brand-icon[data-animate='true']")).toHaveLength(1);
    });
  });
});
