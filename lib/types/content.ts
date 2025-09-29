/**
 * Content messaging types for business-focused communication
 */

export interface ContentMessage {
  headline: string;
  subheadline: string;
  valueProposition: string[];
  callToAction: {
    primary: string;
    secondary?: string;
  };
}

export interface BusinessValue {
  title: string;
  description: string;
  benefit: string;
  icon?: string;
}

export interface ServiceMessage extends ContentMessage {
  businessBenefits: BusinessValue[];
  roiHighlights: string[];
  successMetrics: string[];
}

export interface PageContent {
  hero: ContentMessage;
  sections: {
    [key: string]: ContentMessage;
  };
}

export interface BusinessMessaging {
  homepage: PageContent;
  services: {
    [serviceName: string]: ServiceMessage;
  };
  about: PageContent;
}

// Business-focused messaging constants
export const BUSINESS_FOCUS_THEMES = {
  REVENUE_GROWTH: 'revenue-growth',
  COST_REDUCTION: 'cost-reduction',
  EFFICIENCY: 'efficiency',
  COMPETITIVE_ADVANTAGE: 'competitive-advantage',
  CUSTOMER_EXPERIENCE: 'customer-experience',
  SCALABILITY: 'scalability',
} as const;

export type BusinessFocusTheme = typeof BUSINESS_FOCUS_THEMES[keyof typeof BUSINESS_FOCUS_THEMES];

export interface BusinessOutcome {
  theme: BusinessFocusTheme;
  description: string;
  impact: string;
}