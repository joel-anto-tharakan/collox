import {
  apiAvailabilityLabels,
  deliveryApproachLabels,
  deliveryStatusLabels,
  integrationModeLabels,
  launchpadSystems,
  ssoCompatibilityLabels,
} from "@collox/types";

function serializeLaunchpadSystem(system: (typeof launchpadSystems)[number]) {
  return {
    ...system,
    htmlPath: `/launchpad/${system.slug}`,
    apiPath: `/api/launchpad/${system.slug}`,
    labels: {
      deliveryStatus: deliveryStatusLabels[system.deliveryStatus],
      integrationMode: integrationModeLabels[system.integrationMode],
      apiAvailability: apiAvailabilityLabels[system.apiAvailability],
      ssoCompatibility: ssoCompatibilityLabels[system.ssoCompatibility],
      deliveryApproach: deliveryApproachLabels[system.deliveryApproach],
    },
  };
}

export function GET() {
  return Response.json({
    count: launchpadSystems.length,
    htmlPath: "/launchpad",
    systems: launchpadSystems.map(serializeLaunchpadSystem),
  });
}
