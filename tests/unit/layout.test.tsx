import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { home } from "@/content/home";


describe("Header", () => {
  it("shows every section link and the enquiry call to action", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    for (const link of home.nav) {
      expect(within(nav).getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
    }
    expect(screen.getAllByRole("link", { name: home.cta.label })[0]).toHaveAttribute("href", home.cta.href);
  });

  it("opens the mobile menu and closes it when a link is chosen", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getAllByRole("link")).toHaveLength(home.nav.length + 1);

    await user.click(within(dialog).getByRole("link", { name: "Services" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("shows the registered legal name, licence and copyright year", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveTextContent(home.company.legalName);
    expect(footer).toHaveTextContent(home.company.licence);
    expect(footer).toHaveTextContent(String(home.company.copyrightYear));
  });
});
