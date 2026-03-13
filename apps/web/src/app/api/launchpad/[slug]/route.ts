import {
  apiAvailabilityLabels,
  deliveryApproachLabels,
  deliveryStatusLabels,
  getLaunchpadSystemBySlug,
  integrationModeLabels,
  ssoCompatibilityLabels,
} from "@collox/types";

type LaunchpadRecordRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: Request, { params }: LaunchpadRecordRouteProps) {
  const { slug } = await params;
  const system = getLaunchpadSystemBySlug(slug);

  if (!system) {
    return Response.json({ error: "Launchpad record not found." }, { status: 404 });
  }

  return Response.json({
    htmlPath: `/launchpad/${system.slug}`,
    apiPath: `/api/launchpad/${system.slug}`,
    system,
    labels: {
      deliveryStatus: deliveryStatusLabels[system.deliveryStatus],
      integrationMode: integrationModeLabels[system.integrationMode],
      apiAvailability: apiAvailabilityLabels[system.apiAvailability],
      ssoCompatibility: ssoCompatibilityLabels[system.ssoCompatibility],
      deliveryApproach: deliveryApproachLabels[system.deliveryApproach],
    },
  });
}
