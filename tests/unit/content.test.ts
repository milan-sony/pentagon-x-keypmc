import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { glyphs } from "@/components/icons/glyphs";
import { home, type Heading } from "@/content/home";

const publicFile = (src: string) => join(process.cwd(), "public", src);

describe("homepage content", () => {
  it("keeps portfolio stats consistent with the project lists", () => {
    const { portfolio, stats, hero } = home;
    const total = stats.items.find((s) => s.id === "portfolio")?.value;
    const inDelivery = stats.items.find((s) => s.id === "delivery")?.value;
    const pipeline = stats.items.find((s) => s.id === "pipeline")?.value;

    expect(inDelivery).toBe(portfolio.inDelivery.length);
    expect(pipeline).toBe(portfolio.pipeline.count);
    expect(total).toBe(portfolio.inDelivery.length + portfolio.pipeline.count);
    expect(hero.card.value).toBe(total);
  });

  it("never exposes confidential client names or project values", () => {
    const serialized = JSON.stringify(home).toLowerCase();
    for (const project of home.portfolio.inDelivery) {
      expect(project).not.toHaveProperty("client");
      expect(project).not.toHaveProperty("value");
    }
    expect(serialized).not.toMatch(/\baed\b|\busd\b|\bdhs?\b/);
  });

  it("gives every division, tool and the specialist service a description and a drawn icon", () => {
    const drawn = Object.keys(glyphs);
    for (const item of [...home.intro.divisions, ...home.approach.tools, home.services.specialist]) {
      expect(item.title.trim()).not.toBe("");
      expect(item.description.trim()).not.toBe("");
      expect(drawn).toContain(item.icon);
    }
  });

  it("gives every service and advantage a title and description, without icons the page never shows", () => {
    for (const item of [...home.services.items, ...home.advantages.items]) {
      expect(item.title.trim()).not.toBe("");
      expect(item.description.trim()).not.toBe("");
      expect(item).not.toHaveProperty("icon");
    }
  });

  it("writes every two-tone heading with both halves", () => {
    const headings: Heading[] = [
      home.intro.title,
      home.band.title,
      home.services.title,
      home.approach.title,
      home.portfolio.title,
      home.advantages.title,
      home.contact.title,
    ];
    for (const heading of headings) {
      expect(heading.start.trim()).not.toBe("");
      expect(heading.accent.trim()).not.toBe("");
    }
  });

  it("describes the six-stage delivery life cycle in order, each with a photo", () => {
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
      expect(home.images[stage.image]).toBeDefined();
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

  it("gives every image descriptive alt text and a file that exists", () => {
    for (const image of Object.values(home.images)) {
      expect(image.alt.length).toBeGreaterThan(15);
      expect(existsSync(publicFile(image.src))).toBe(true);
    }
  });

  it("points the video call to action at a real clip and poster", () => {
    expect(existsSync(publicFile(home.videoCta.video.src))).toBe(true);
    expect(existsSync(publicFile(home.videoCta.video.poster))).toBe(true);
  });
});
