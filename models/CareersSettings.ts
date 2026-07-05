import mongoose, { Schema, Document } from "mongoose";

export type CultureCard = {
  title: string;
  icon: string;
  description: string;
};

export interface ICareersSettings extends Document {
  /** Single doc key */
  singletonKey: string;
  heroSubtext: string;
  statsQuote: string;
  cultureCards: CultureCard[];
  monolithHeading: string;
  monolithBody: string;
  monolithImageUrl: string;
  monolithCtaLabel: string;
  monolithCtaHref: string;
  applyPhaseLabel: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const CAREERS_DEFAULTS = {
  heroSubtext:
    "We are recruiting the world's most capable minds to architect the infrastructure of the synthetic age. Precision is our standard.",
  statsQuote: '"The future is not found; it is calculated."',
  cultureCards: [
    {
      title: "Neural Synergy",
      icon: "neurology",
      description:
        "Collaborative cognition between human expertise and synthetic intelligence is our baseline operation.",
    },
    {
      title: "Protocol Zero",
      icon: "security",
      description:
        "Security is not an add-on; it is the fundamental fabric of every line of code we ship to the monolith.",
    },
    {
      title: "Atomic Precision",
      icon: "precision_manufacturing",
      description:
        "We value the microscopic detail. In our systems, a single misplaced bit is a failure of vision.",
    },
  ] as CultureCard[],
  monolithHeading: "The Monolith Awaits.",
  monolithBody:
    "Don't see a role that matches your specialized skillset? We are always scouting for exceptional intelligence that defies traditional categorization.",
  monolithImageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCmfAvUx1geg7TxmKxADv3P0-DWGTwuFRgokFWcH3Q48QBq8xeQMaxJ5oqKEGTTemwvhXxWQWWm87qHWxxDpZaRKqfxBbw3YIULSt1xWSd4q75KII_QM9NBhoSD-maLWJO8Phr41t6tE-P2j62XJulDZ-8DhNJwJxBAqA3o7r9kBMDebW25MrjXiMtgUqyfhTZRrD11BcO4ms-JD7gxY55y9c7a5Gjp9ZAeherUJvqHulnuPnWNnkHLKoCVDwUjjH0AeGC7chNfTkU",
  monolithCtaLabel: "Submit a General Inquiry",
  monolithCtaHref: "/contact",
  applyPhaseLabel: "Intelligence Recruitment Phase II",
};

const CultureCardSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    icon: { type: String, required: true, trim: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const CareersSettingsSchema = new Schema(
  {
    singletonKey: { type: String, default: "default", unique: true },
    heroSubtext: { type: String, default: CAREERS_DEFAULTS.heroSubtext },
    statsQuote: { type: String, default: CAREERS_DEFAULTS.statsQuote },
    cultureCards: { type: [CultureCardSchema], default: () => [...CAREERS_DEFAULTS.cultureCards] },
    monolithHeading: { type: String, default: CAREERS_DEFAULTS.monolithHeading },
    monolithBody: { type: String, default: CAREERS_DEFAULTS.monolithBody },
    monolithImageUrl: { type: String, default: CAREERS_DEFAULTS.monolithImageUrl },
    monolithCtaLabel: { type: String, default: CAREERS_DEFAULTS.monolithCtaLabel },
    monolithCtaHref: { type: String, default: CAREERS_DEFAULTS.monolithCtaHref },
    applyPhaseLabel: { type: String, default: CAREERS_DEFAULTS.applyPhaseLabel },
  },
  { timestamps: true }
);

const CareersSettings =
  mongoose.models.CareersSettings ||
  mongoose.model<ICareersSettings>("CareersSettings", CareersSettingsSchema);

export default CareersSettings;
