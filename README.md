# Codenies Solutions - Software Development Agency Website

A modern, SEO-optimized website for Codenies Solutions, a software development agency specializing in custom software solutions, web & mobile development, e-commerce platforms, AI automation, and UI/UX design.

## 🚀 Features

### SEO Optimized
- **Comprehensive Meta Tags**: Title, description, keywords, Open Graph, and Twitter Card meta tags
- **Structured Data**: JSON-LD schema markup for better search engine understanding
- **Semantic HTML**: Proper heading hierarchy and semantic elements
- **Sitemap**: XML sitemap for search engine crawling
- **Robots.txt**: Proper crawling instructions
- **Canonical URLs**: Prevents duplicate content issues
- **Performance Optimized**: Fast loading times with Next.js optimizations

### Core Functionality
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Contact Form**: Lead capture with spam protection
- **Portfolio Showcase**: Project case studies and client testimonials
- **Service Pages**: Detailed service descriptions with anchor navigation
- **Blog Ready**: Structured for content marketing and SEO
- **Accessibility**: WCAG compliant with proper ARIA labels

### Technical Stack
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **TypeScript**: Full type safety
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React icons
- **Deployment**: Optimized for Vercel deployment

## 📁 Project Structure

```
codenies_solutions/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── robots.txt             # Search engine crawling rules
│   ├── sitemap.xml            # XML sitemap
│   └── pics/                  # Optimized images
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout with SEO metadata
│   │   ├── page.tsx           # Homepage with structured data
│   │   ├── about/             # About page
│   │   ├── services/          # Services page with anchor links
│   │   ├── contact/           # Contact page with form
│   │   └── blog/              # Blog page
│   ├── components/            # Reusable components
│   │   ├── Hero.tsx           # Hero section with CTA
│   │   ├── Services.tsx       # Services showcase
│   │   ├── Portfolio.tsx      # Project portfolio
│   │   ├── Contact.tsx        # Contact form component
│   │   └── ui/                # shadcn/ui components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   └── services/              # API services
└── docs/
    └── blueprint.md           # Project requirements
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/codenies-solutions.git
   cd codenies-solutions
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your configuration:
   ```env
   # Email configuration (for contact form)
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-app-password
   EMAIL_FROM=noreply@codenies-solutions.com
   
   # Website configuration
   NEXT_PUBLIC_SITE_URL=https://codenies-solutions.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
The site is optimized for any static hosting platform:
- Netlify
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps

## 📊 SEO Configuration

### Meta Tags
Each page includes comprehensive meta tags:
- Title tags with brand name
- Meta descriptions (150-160 characters)
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URLs

### Structured Data
JSON-LD schema markup for:
- Organization information
- Service offerings
- Contact information
- Blog structure
- WebSite schema

### Performance
- Image optimization with Next.js Image component
- Font optimization with `display: swap`
- Code splitting and lazy loading
- Minified CSS and JavaScript

## 🎨 Customization

### Colors and Branding
Update the Tailwind configuration in `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      // Add your brand colors
    }
  }
}
```

### Content Updates
- **Services**: Update `src/components/Services.tsx`
- **Portfolio**: Modify `src/components/Portfolio.tsx`
- **Contact Info**: Update contact details in layout
- **SEO**: Modify metadata in each page file

### Images
- Replace images in `public/pics/`
- Optimize images for web (WebP format recommended)
- Update alt text for accessibility

## 📈 Analytics and Tracking

### Google Analytics
Add your GA4 tracking ID to the layout:
```typescript
// In src/app/layout.tsx
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
/>
```

### Search Console
1. Add your domain to Google Search Console
2. Verify ownership using the meta tag in layout.tsx
3. Submit your sitemap.xml

## 🔧 Maintenance

### Regular Tasks
- Update dependencies monthly
- Review and update content quarterly
- Monitor Core Web Vitals
- Check for broken links
- Update sitemap.xml when adding new pages

### SEO Monitoring
- Google Search Console for performance
- Google Analytics for user behavior
- PageSpeed Insights for performance
- Lighthouse for technical SEO

## 📞 Support

For questions or support:
- Email: contact@codenies-solutions.com
- Website: https://codenies-solutions.com

## 📄 License

This project is proprietary software developed for Codenies Solutions.

---

**Built with ❤️ by Codenies Solutions**
