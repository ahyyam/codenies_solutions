/**
 * Open Graph Image Generation Utilities
 * Generates dynamic OG images featuring the new brand color palette
 */

interface OGImageConfig {
  title: string;
  subtitle?: string;
  type?: 'default' | 'blog' | 'service' | 'project';
  width?: number;
  height?: number;
}

// Brand colors from the Minimal Tech-Innovation Palette
const BRAND_COLORS = {
  primary: '#5A00D2',      // Deep Purple
  accent: '#E60073',       // Magenta Pink
  secondary: '#007BFF',    // Electric Blue
  text: '#111111',         // Charcoal Black
  background: '#FFFFFF',   // White
  backgroundSubtle: '#F2F2F2' // Light Gray
};

/**
 * Generate SVG-based Open Graph image with brand colors
 */
export function generateOGImageSVG(config: OGImageConfig): string {
  const { title, subtitle, type = 'default', width = 1200, height = 630 } = config;
  
  // Create gradient definitions based on type
  const gradientId = `gradient-${type}`;
  let gradientColors = '';
  
  switch (type) {
    case 'blog':
      gradientColors = `
        <stop offset="0%" style="stop-color:${BRAND_COLORS.primary};stop-opacity:0.1" />
        <stop offset="100%" style="stop-color:${BRAND_COLORS.accent};stop-opacity:0.05" />
      `;
      break;
    case 'service':
      gradientColors = `
        <stop offset="0%" style="stop-color:${BRAND_COLORS.primary};stop-opacity:0.08" />
        <stop offset="100%" style="stop-color:${BRAND_COLORS.secondary};stop-opacity:0.05" />
      `;
      break;
    case 'project':
      gradientColors = `
        <stop offset="0%" style="stop-color:${BRAND_COLORS.accent};stop-opacity:0.08" />
        <stop offset="100%" style="stop-color:${BRAND_COLORS.secondary};stop-opacity:0.05" />
      `;
      break;
    default:
      gradientColors = `
        <stop offset="0%" style="stop-color:${BRAND_COLORS.primary};stop-opacity:0.05" />
        <stop offset="50%" style="stop-color:${BRAND_COLORS.background};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${BRAND_COLORS.secondary};stop-opacity:0.05" />
      `;
  }

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
          ${gradientColors}
        </linearGradient>
        <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:${BRAND_COLORS.primary}" />
          <stop offset="100%" style="stop-color:${BRAND_COLORS.accent}" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#${gradientId})" />
      
      <!-- Brand accent line -->
      <rect x="0" y="0" width="8" height="100%" fill="${BRAND_COLORS.accent}" />
      
      <!-- Logo area (placeholder) -->
      <circle cx="100" cy="100" r="30" fill="${BRAND_COLORS.primary}" opacity="0.1" />
      <text x="100" y="110" text-anchor="middle" font-family="system-ui, sans-serif" font-size="24" font-weight="bold" fill="${BRAND_COLORS.primary}">C</text>
      
      <!-- Main title -->
      <text x="60" y="${height * 0.4}" font-family="system-ui, sans-serif" font-size="64" font-weight="bold" fill="url(#text-gradient)">
        ${title.length > 30 ? title.substring(0, 30) + '...' : title}
      </text>
      
      ${subtitle ? `
        <!-- Subtitle -->
        <text x="60" y="${height * 0.55}" font-family="system-ui, sans-serif" font-size="32" font-weight="400" fill="${BRAND_COLORS.text}" opacity="0.8">
          ${subtitle.length > 50 ? subtitle.substring(0, 50) + '...' : subtitle}
        </text>
      ` : ''}
      
      <!-- Brand name -->
      <text x="60" y="${height * 0.85}" font-family="system-ui, sans-serif" font-size="28" font-weight="600" fill="${BRAND_COLORS.primary}">
        Codenies
      </text>
      
      <!-- Tech innovation tagline -->
      <text x="60" y="${height * 0.92}" font-family="system-ui, sans-serif" font-size="18" font-weight="400" fill="${BRAND_COLORS.text}" opacity="0.6">
        Tech Innovation & Modern Software Development
      </text>
      
      <!-- Decorative elements -->
      <circle cx="${width - 100}" cy="100" r="40" fill="${BRAND_COLORS.secondary}" opacity="0.1" />
      <circle cx="${width - 200}" cy="200" r="20" fill="${BRAND_COLORS.accent}" opacity="0.15" />
      <circle cx="${width - 80}" cy="${height - 80}" r="25" fill="${BRAND_COLORS.primary}" opacity="0.1" />
    </svg>
  `;

  return svg.trim();
}

/**
 * Generate Open Graph image URL for dynamic generation
 */
export function generateOGImageUrl(config: OGImageConfig): string {
  const params = new URLSearchParams({
    title: config.title,
    ...(config.subtitle && { subtitle: config.subtitle }),
    type: config.type || 'default',
    width: (config.width || 1200).toString(),
    height: (config.height || 630).toString()
  });

  return `/api/og-image?${params.toString()}`;
}

/**
 * Generate static Open Graph images for main pages
 */
export const staticOGImages = {
  homepage: {
    title: 'Tech Innovation & Modern Software Development',
    subtitle: 'Transform your business with cutting-edge solutions',
    type: 'default' as const
  },
  services: {
    title: 'Professional Development Services',
    subtitle: 'SaaS, AI, Mobile Apps & Advanced UI/UX Design',
    type: 'service' as const
  },
  blog: {
    title: 'Tech Innovation Insights',
    subtitle: 'Latest trends in software development & design',
    type: 'blog' as const
  },
  work: {
    title: 'Our Innovation Portfolio',
    subtitle: 'Showcasing cutting-edge projects & solutions',
    type: 'project' as const
  },
  about: {
    title: 'Leading Tech Innovation Agency',
    subtitle: 'Expertise in modern software development',
    type: 'default' as const
  },
  consultation: {
    title: 'Free Tech Consultation',
    subtitle: 'Discuss your innovation goals with experts',
    type: 'service' as const
  }
};

/**
 * Generate meta tags for Open Graph images
 */
export function generateOGImageMeta(config: OGImageConfig) {
  const imageUrl = generateOGImageUrl(config);
  
  return {
    'og:image': imageUrl,
    'og:image:width': (config.width || 1200).toString(),
    'og:image:height': (config.height || 630).toString(),
    'og:image:type': 'image/png',
    'og:image:alt': `${config.title} - Codenies Tech Innovation`,
    'twitter:image': imageUrl,
    'twitter:image:alt': `${config.title} - Codenies Tech Innovation`
  };
}

/**
 * Utility to convert SVG to data URL for immediate use
 */
export function svgToDataUrl(svg: string): string {
  const encoded = encodeURIComponent(svg);
  return `data:image/svg+xml,${encoded}`;
}

/**
 * Generate brand-consistent color scheme for different content types
 */
export function getBrandColorScheme(type: string) {
  const schemes = {
    innovation: {
      primary: BRAND_COLORS.primary,
      secondary: BRAND_COLORS.accent,
      gradient: `linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.accent} 100%)`
    },
    tech: {
      primary: BRAND_COLORS.primary,
      secondary: BRAND_COLORS.secondary,
      gradient: `linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.secondary} 100%)`
    },
    design: {
      primary: BRAND_COLORS.accent,
      secondary: BRAND_COLORS.secondary,
      gradient: `linear-gradient(135deg, ${BRAND_COLORS.accent} 0%, ${BRAND_COLORS.secondary} 100%)`
    },
    default: {
      primary: BRAND_COLORS.primary,
      secondary: BRAND_COLORS.text,
      gradient: `linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.backgroundSubtle} 100%)`
    }
  };

  return schemes[type as keyof typeof schemes] || schemes.default;
}