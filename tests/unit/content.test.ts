import { describe, expect, it } from "vitest";
import { home, iconKeys } from "@/content/home";

describe("homepage content", () => {
  it("keeps portfolio stats consistent with the project lists", () => {
    const { portfolio, stats } = home;
    const total = stats.items.find((s) => s.id === "portfolio")?.value;
    const inDelivery = stats.items.find((s) => s.id === "delivery")?.value;
    const pipeline = stats.items.find((s) => s.id === "pipeline")?.value;

    expect(inDelivery).toBe(portfolio.inDelivery.length);
    expect(pipeline).toBe(portfolio.pipeline.count);
    expect(total).toBe(portfolio.inDelivery.length + portfolio.pipeline.count);
  });

  it("never exposes confidential client names or project values", () => {
    const serialized = JSON.stringify(home).toLowerCase();
    for (const project of home.portfolio.inDelivery) {
      expect(project).not.toHaveProperty("client");
      expect(project).not.toHaveProperty("value");
    }
    expect(serialized).not.toMatch(/\baed\b|\busd\b|\bdhs?\b/);
  });

  it("gives every service, advantage and tool a description and a known icon", () => {
    const groups = [home.services.items, home.advantages.items, home.approach.tools];
    for (const group of groups) {
      for (const item of group) {
        expect(item.title.trim()).not.toBe("");
        expect(item.description.trim()).not.toBe("");
        expect(iconKeys).toContain(item.icon);
      }
    }
  });

  it("describes the six-stage delivery life cycle in order", () => {
    expect(home.approach.stages.map((s) => s.title)).toEqual([
      "Initiation",
      "Concept & Design",
      "Procurement",
      "Execution",
      "Monitoring",
      "Close-Out",
    ]);
    for (const stage of home.approach.stages) {
      expect(stage.activities).toHaveLength(3);
    }
  });

  it("links every navigation item to a section that exists on the page", () => {
    const sectionIds = new Set<string>(home.sectionIds);
    for (const link of home.nav) {
      expect(link.href.startsWith("#")).toBe(true);
      expect(sectionIds.has(link.href.slice(1))).toBe(true);
    }
  });

  it("uses the exact registered legal name and licence number", () => {
    expect(home.company.legalName).toBe(
      "Key International Engineering Projects Management Consultancy - L.L.C - S.P.C",
    );
    expect(home.company.licence).toBe("CN-5872131");
  });

  it("gives every image descriptive alt text", () => {
    for (const image of Object.values(home.images)) {
      expect(image.alt.length).toBeGreaterThan(15);
      expect(image.src.startsWith("/images/")).toBe(true);
    }
  });
});
