import connectDB from "@/lib/mongodb";
import CareersSettings, { CAREERS_DEFAULTS, type CultureCard } from "@/models/CareersSettings";

export type PublicCareersSettings = {
  heroSubtext: string;
  statsQuote: string;
  cultureCards: CultureCard[];
  monolithHeading: string;
  monolithBody: string;
  monolithImageUrl: string;
  monolithCtaLabel: string;
  monolithCtaHref: string;
  applyPhaseLabel: string;
};

function toPublic(doc: {
  heroSubtext?: string;
  statsQuote?: string;
  cultureCards?: CultureCard[];
  monolithHeading?: string;
  monolithBody?: string;
  monolithImageUrl?: string;
  monolithCtaLabel?: string;
  monolithCtaHref?: string;
  applyPhaseLabel?: string;
}): PublicCareersSettings {
  return {
    heroSubtext: doc.heroSubtext ?? CAREERS_DEFAULTS.heroSubtext,
    statsQuote: doc.statsQuote ?? CAREERS_DEFAULTS.statsQuote,
    cultureCards:
      doc.cultureCards?.length && doc.cultureCards.length >= 3
        ? doc.cultureCards
        : CAREERS_DEFAULTS.cultureCards,
    monolithHeading: doc.monolithHeading ?? CAREERS_DEFAULTS.monolithHeading,
    monolithBody: doc.monolithBody ?? CAREERS_DEFAULTS.monolithBody,
    monolithImageUrl: doc.monolithImageUrl ?? CAREERS_DEFAULTS.monolithImageUrl,
    monolithCtaLabel: doc.monolithCtaLabel ?? CAREERS_DEFAULTS.monolithCtaLabel,
    monolithCtaHref: doc.monolithCtaHref ?? CAREERS_DEFAULTS.monolithCtaHref,
    applyPhaseLabel: doc.applyPhaseLabel ?? CAREERS_DEFAULTS.applyPhaseLabel,
  };
}

export async function getCareersSettings(): Promise<PublicCareersSettings> {
  await connectDB();
  let doc = await CareersSettings.findOne({ singletonKey: "default" }).lean();
  if (!doc) {
    await CareersSettings.create({
      singletonKey: "default",
      ...CAREERS_DEFAULTS,
    });
    doc = await CareersSettings.findOne({ singletonKey: "default" }).lean();
  }
  return toPublic(doc as Record<string, unknown>);
}
