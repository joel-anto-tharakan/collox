import { describe, expect, it } from "vitest";

import {
  apiAvailabilityLabels,
  architectureSlices,
  dashboardModules,
  deliveryApproachLabels,
  deliveryStatusLabels,
  discoveryQuestions,
  getLaunchpadSystemBySlug,
  integrationModeLabels,
  integrationModeGuide,
  launchpadSystems,
  ssoCompatibilityLabels,
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

  it("documents all four launchpad integration classifications", () => {
    expect(integrationModeGuide.map((entry) => entry.mode)).toEqual([
      "official-api",
      "entra-sso-launch",
      "deep-link",
      "unsupported",
    ]);
  });

  it("keeps launchpad register fields populated for every system", () => {
    for (const system of launchpadSystems) {
      expect(system.apiAvailability.length).toBeGreaterThan(0);
      expect(system.authMethod.length).toBeGreaterThan(0);
      expect(system.ssoCompatibility.length).toBeGreaterThan(0);
      expect(system.ownerOrSupportContact.length).toBeGreaterThan(0);
      expect(system.rateLimits.length).toBeGreaterThan(0);
      expect(system.termsConstraints.length).toBeGreaterThan(0);
      expect(system.deliveryApproach.length).toBeGreaterThan(0);
      expect(system.note.length).toBeGreaterThan(0);
    }
  });

  it("exposes labels for each launchpad classification", () => {
    for (const system of launchpadSystems) {
      expect(deliveryStatusLabels[system.deliveryStatus]).toBeTruthy();
      expect(integrationModeLabels[system.integrationMode]).toBeTruthy();
      expect(apiAvailabilityLabels[system.apiAvailability]).toBeTruthy();
      expect(ssoCompatibilityLabels[system.ssoCompatibility]).toBeTruthy();
      expect(deliveryApproachLabels[system.deliveryApproach]).toBeTruthy();
    }
  });

  it("can resolve a launchpad record by slug", () => {
    expect(getLaunchpadSystemBySlug("moodle")?.name).toBe("Moodle");
    expect(getLaunchpadSystemBySlug("unknown-system")).toBeUndefined();
  });
});
