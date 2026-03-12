import { describe, expect, it } from "vitest";

import {
  architectureSlices,
  dashboardModules,
  discoveryQuestions,
  launchpadSystems,
} from "./index";

describe("shared content", () => {
  it("keeps launchpad system slugs unique", () => {
    const slugs = launchpadSystems.map((system) => system.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("keeps dashboard module slugs unique", () => {
    const slugs = dashboardModules.map((module) => module.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("retains the five initial discovery questions", () => {
    expect(discoveryQuestions).toHaveLength(5);
  });

  it("documents the initial workspace slices", () => {
    expect(architectureSlices.map((slice) => slice.path)).toEqual([
      "apps/web",
      "packages/types",
      "packages/config",
    ]);
  });
});
