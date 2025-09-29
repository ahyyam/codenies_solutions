import { getBusinessMessaging, getServiceMessaging } from '../data/business-messaging';
import { ContentMessage, ServiceMessage } from '../types/content';

/**
 * Utility functions for consistent business-focused messaging
 */

/**
 * Get formatted value proposition text
 */
export function formatValueProposition(valueProps: string[]): string {
  return valueProps.join(' • ');
}

/**
 * Get business-focused CTA text based on context
 */
export function getBusinessCTA(context: 'consultation' | 'portfolio' | 'service' | 'contact'): string {
  const ctas = {
    consultation: 'Get Free Strategy Session',
    portfolio: 'View Success Stories',
    service: 'Discover ROI Potential',
    contact: 'Start Your Growth Journey'
  };
  
  return ctas[context];
}

/**
 * Generate business-focused meta description
 */
export function generateBusinessMetaDescription(
  service: string,
  benefits: string[],
  maxLength: number = 160
): string {
  const baseMeta = `${service} services that drive business growth. `;
  const benefitsText = benefits.join(', ');
  const fullMeta = baseMeta + benefitsText;
  
  if (fullMeta.length <= maxLength) {
    return fullMeta;
  }
  
  // Truncate and add ellipsis
  return fullMeta.substring(0, maxLength - 3) + '...';
}

/**
 * Get ROI-focused testimonial structure
 */
export function formatROITestimonial(
  quote: string,
  metric: string,
  author: string,
  company: string
): {
  quote: string;
  metric: string;
  attribution: string;
} {
  return {
    quote,
    metric,
    attribution: `${author}, ${company}`
  };
}

/**
 * Generate business outcome messaging
 */
export function generateBusinessOutcome(
  action: string,
  metric: string,
  timeframe?: string
): string {
  const base = `${action} ${metric}`;
  return timeframe ? `${base} ${timeframe}` : base;
}

/**
 * Business-focused service descriptions
 */
export const businessServiceDescriptions = {
  'saas-development': 'Generate recurring revenue with subscription-based platforms that scale automatically and reduce operational costs.',
  'ecommerce-solutions': 'Increase online sales by up to 200% with conversion-optimized stores that turn visitors into customers.',
  'website-development': 'Generate more leads and improve search rankings with websites designed for business growth and conversion.',
  'mobile-applications': 'Reach customers directly and increase engagement with mobile apps that drive loyalty and new revenue streams.',
  'ui-ux-design': 'Increase conversion rates and reduce support costs with user-centered design that drives business results.',
  'ai-integration': 'Reduce operational costs by up to 60% with AI automation that eliminates manual work and improves efficiency.'
};

/**
 * Get business-focused service description
 */
export function getBusinessServiceDescription(serviceKey: string): string {
  return businessServiceDescriptions[serviceKey as keyof typeof businessServiceDescriptions] || 
         'Custom technology solutions that drive measurable business results and competitive advantage.';
}

/**
 * Business value propositions by category
 */
export const businessValueProps = {
  revenue: [
    'Increase sales conversion rates',
    'Generate new revenue streams',
    'Improve customer lifetime value',
    'Expand market reach'
  ],
  cost: [
    'Reduce operational expenses',
    'Automate manual processes',
    'Minimize maintenance costs',
    'Optimize resource utilization'
  ],
  efficiency: [
    'Streamline business processes',
    'Improve team productivity',
    'Accelerate time-to-market',
    'Enhance decision-making speed'
  ],
  competitive: [
    'Gain market advantage',
    'Differentiate from competitors',
    'Lead with innovation',
    'Capture market share'
  ]
};

/**
 * Get value propositions by business focus
 */
export function getValuePropositions(focus: keyof typeof businessValueProps): string[] {
  return businessValueProps[focus];
}