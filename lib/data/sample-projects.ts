// Sample project data for testing and demonstration
import { Project } from '../types/project';

export const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform Redesign',
    slug: 'ecommerce-platform-redesign',
    category: {
      id: 'ecommerce',
      name: 'E-commerce',
      slug: 'ecommerce'
    },
    description: 'Complete redesign and development of a modern e-commerce platform with advanced features and improved user experience.',
    longDescription: 'This project involved a complete overhaul of an existing e-commerce platform, focusing on modern design principles, improved performance, and enhanced user experience. We implemented advanced features like AI-powered recommendations, real-time inventory management, and seamless payment processing.',
    images: [
      {
        id: 'img1',
        url: '/modern-ecommerce-website.png',
        alt: 'E-commerce Platform Screenshot'
      }
    ],
    technologies: [
      { id: 'nextjs', name: 'Next.js', category: 'frontend' },
      { id: 'typescript', name: 'TypeScript', category: 'language' },
      { id: 'tailwind', name: 'Tailwind CSS', category: 'styling' },
      { id: 'stripe', name: 'Stripe', category: 'payment' }
    ],
    features: [
      'AI-powered product recommendations',
      'Real-time inventory management',
      'Advanced search and filtering',
      'Multi-payment gateway integration',
      'Mobile-responsive design'
    ],
    challenges: [
      {
        id: 'ch1',
        title: 'Performance Optimization',
        description: 'The original platform had slow loading times affecting user experience.',
        solution: 'Implemented code splitting, lazy loading, and optimized images to achieve 90+ Lighthouse scores.',
        impact: 'Reduced page load times by 60% and improved conversion rates by 25%.'
      }
    ],
    results: [
      {
        id: 'r1',
        metric: 'Conversion Rate',
        value: '+35%',
        description: 'Increase in conversion rate after redesign',
        type: 'business'
      },
      {
        id: 'r2',
        metric: 'Page Load Time',
        value: '-60%',
        description: 'Reduction in average page load time',
        type: 'performance'
      },
      {
        id: 'r3',
        metric: 'Mobile Traffic',
        value: '+80%',
        description: 'Increase in mobile user engagement',
        type: 'user_experience'
      }
    ],
    client: {
      id: 'client1',
      name: 'RetailCorp',
      industry: 'Retail'
    },
    timeline: {
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-04-30'),
      duration: '3.5 months',
      phases: []
    },
    team: [
      { id: 'tm1', name: 'Sarah Johnson', role: 'Lead Developer' },
      { id: 'tm2', name: 'Mike Chen', role: 'UI/UX Designer' },
      { id: 'tm3', name: 'Alex Rodriguez', role: 'Backend Developer' }
    ],
    status: 'completed',
    featured: true,
    links: {
      live: 'https://example-ecommerce.com',
      github: 'https://github.com/example/ecommerce',
      caseStudy: '/case-studies/ecommerce-redesign'
    },
    seo: {
      title: 'E-commerce Platform Redesign Case Study',
      description: 'How we redesigned an e-commerce platform to increase conversions by 35%',
      keywords: ['ecommerce', 'redesign', 'nextjs', 'conversion optimization'],
      canonicalUrl: '/work/ecommerce-platform-redesign'
    },
    settings: {
      showClient: true,
      showTeam: true,
      showTimeline: true,
      showResults: true,
      allowInquiries: true
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-05-01')
  },
  {
    id: '2',
    title: 'SaaS Dashboard Development',
    slug: 'saas-dashboard-development',
    category: {
      id: 'saas',
      name: 'SaaS Development',
      slug: 'saas'
    },
    description: 'Built a comprehensive analytics dashboard for a SaaS platform with real-time data visualization and advanced reporting features.',
    images: [
      {
        id: 'img2',
        url: '/modern-saas-dashboard.png',
        alt: 'SaaS Dashboard Screenshot'
      }
    ],
    technologies: [
      { id: 'react', name: 'React', category: 'frontend' },
      { id: 'nodejs', name: 'Node.js', category: 'backend' },
      { id: 'postgresql', name: 'PostgreSQL', category: 'database' },
      { id: 'redis', name: 'Redis', category: 'cache' }
    ],
    features: [
      'Real-time analytics dashboard',
      'Custom report generation',
      'Data export functionality',
      'Role-based access control',
      'API integration'
    ],
    challenges: [],
    results: [
      {
        id: 'r4',
        metric: 'Data Processing Speed',
        value: '10x faster',
        description: 'Improved data processing and visualization speed',
        type: 'performance'
      },
      {
        id: 'r5',
        metric: 'User Satisfaction',
        value: '95%',
        description: 'User satisfaction score after launch',
        type: 'user_experience'
      }
    ],
    client: {
      id: 'client2',
      name: 'DataTech Solutions',
      industry: 'Technology'
    },
    timeline: {
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-05-15'),
      duration: '3.5 months',
      phases: []
    },
    team: [
      { id: 'tm4', name: 'Emma Wilson', role: 'Full Stack Developer' },
      { id: 'tm5', name: 'David Kim', role: 'Data Engineer' }
    ],
    status: 'completed',
    featured: false,
    links: {
      live: 'https://dashboard.datatech.com',
      caseStudy: '/case-studies/saas-dashboard'
    },
    seo: {
      title: 'SaaS Dashboard Development Case Study',
      description: 'Building a high-performance analytics dashboard for SaaS platforms',
      keywords: ['saas', 'dashboard', 'analytics', 'react', 'nodejs'],
      canonicalUrl: '/work/saas-dashboard-development'
    },
    settings: {
      showClient: true,
      showTeam: true,
      showTimeline: true,
      showResults: true,
      allowInquiries: true
    },
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-05-20')
  },
  {
    id: '3',
    title: 'Mobile Banking App',
    slug: 'mobile-banking-app',
    category: {
      id: 'mobile',
      name: 'Mobile Development',
      slug: 'mobile'
    },
    description: 'Developed a secure mobile banking application with biometric authentication and real-time transaction processing.',
    images: [
      {
        id: 'img3',
        url: '/ai-mobile-app.png',
        alt: 'Mobile Banking App Screenshot'
      }
    ],
    technologies: [
      { id: 'reactnative', name: 'React Native', category: 'mobile' },
      { id: 'typescript', name: 'TypeScript', category: 'language' },
      { id: 'firebase', name: 'Firebase', category: 'backend' },
      { id: 'biometric', name: 'Biometric Auth', category: 'security' }
    ],
    features: [
      'Biometric authentication',
      'Real-time transactions',
      'Account management',
      'Bill payment system',
      'Investment tracking'
    ],
    challenges: [],
    results: [
      {
        id: 'r6',
        metric: 'Security Score',
        value: '99.9%',
        description: 'Security compliance rating achieved',
        type: 'technical'
      },
      {
        id: 'r7',
        metric: 'App Store Rating',
        value: '4.8/5',
        description: 'Average user rating on app stores',
        type: 'user_experience'
      }
    ],
    client: {
      id: 'client3',
      name: 'SecureBank',
      industry: 'Financial Services'
    },
    timeline: {
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-08-30'),
      duration: '6 months',
      phases: []
    },
    team: [
      { id: 'tm6', name: 'Lisa Park', role: 'Mobile Developer' },
      { id: 'tm7', name: 'James Wilson', role: 'Security Engineer' },
      { id: 'tm8', name: 'Maria Garcia', role: 'QA Engineer' }
    ],
    status: 'active',
    featured: true,
    links: {
      caseStudy: '/case-studies/mobile-banking-app'
    },
    seo: {
      title: 'Mobile Banking App Development Case Study',
      description: 'Secure mobile banking application with biometric authentication',
      keywords: ['mobile banking', 'react native', 'biometric', 'security'],
      canonicalUrl: '/work/mobile-banking-app'
    },
    settings: {
      showClient: true,
      showTeam: true,
      showTimeline: true,
      showResults: true,
      allowInquiries: true
    },
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-08-15')
  },
  {
    id: '4',
    title: 'Restaurant POS System',
    slug: 'restaurant-pos-system',
    category: {
      id: 'restaurant',
      name: 'Restaurant Tech',
      slug: 'restaurant'
    },
    description: 'Custom point-of-sale system for restaurants with inventory management, order tracking, and analytics.',
    images: [
      {
        id: 'img4',
        url: '/modern-restaurant-pos.png',
        alt: 'Restaurant POS System Screenshot'
      }
    ],
    technologies: [
      { id: 'vue', name: 'Vue.js', category: 'frontend' },
      { id: 'python', name: 'Python', category: 'backend' },
      { id: 'mysql', name: 'MySQL', category: 'database' },
      { id: 'stripe', name: 'Stripe', category: 'payment' }
    ],
    features: [
      'Order management system',
      'Inventory tracking',
      'Payment processing',
      'Staff management',
      'Sales analytics'
    ],
    challenges: [],
    results: [
      {
        id: 'r8',
        metric: 'Order Processing Time',
        value: '-40%',
        description: 'Reduction in average order processing time',
        type: 'performance'
      },
      {
        id: 'r9',
        metric: 'Inventory Accuracy',
        value: '98%',
        description: 'Inventory tracking accuracy achieved',
        type: 'business'
      }
    ],
    client: {
      id: 'client4',
      name: 'Bistro Chain',
      industry: 'Food & Beverage'
    },
    timeline: {
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-07-15'),
      duration: '3.5 months',
      phases: []
    },
    team: [
      { id: 'tm9', name: 'Carlos Rodriguez', role: 'Frontend Developer' },
      { id: 'tm10', name: 'Anna Chen', role: 'Backend Developer' }
    ],
    status: 'completed',
    featured: false,
    links: {
      live: 'https://pos.bistrochain.com',
      caseStudy: '/case-studies/restaurant-pos'
    },
    seo: {
      title: 'Restaurant POS System Development',
      description: 'Custom point-of-sale system for restaurant chains',
      keywords: ['restaurant', 'pos system', 'vue.js', 'inventory management'],
      canonicalUrl: '/work/restaurant-pos-system'
    },
    settings: {
      showClient: true,
      showTeam: true,
      showTimeline: true,
      showResults: true,
      allowInquiries: true
    },
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-07-20')
  },
  {
    id: '5',
    title: 'AI Content Management Platform',
    slug: 'ai-content-management-platform',
    category: {
      id: 'ai',
      name: 'AI Integration',
      slug: 'ai'
    },
    description: 'AI-powered content management platform with automated content generation, SEO optimization, and performance analytics.',
    images: [
      {
        id: 'img5',
        url: '/ai-content-dashboard.png',
        alt: 'AI Content Platform Screenshot'
      }
    ],
    technologies: [
      { id: 'nextjs', name: 'Next.js', category: 'frontend' },
      { id: 'openai', name: 'OpenAI API', category: 'ai' },
      { id: 'mongodb', name: 'MongoDB', category: 'database' },
      { id: 'aws', name: 'AWS', category: 'cloud' }
    ],
    features: [
      'AI content generation',
      'SEO optimization tools',
      'Performance analytics',
      'Content scheduling',
      'Multi-language support'
    ],
    challenges: [],
    results: [
      {
        id: 'r10',
        metric: 'Content Production',
        value: '+300%',
        description: 'Increase in content production efficiency',
        type: 'business'
      },
      {
        id: 'r11',
        metric: 'SEO Rankings',
        value: '+150%',
        description: 'Improvement in average SEO rankings',
        type: 'business'
      }
    ],
    client: {
      id: 'client5',
      name: 'ContentPro Agency',
      industry: 'Marketing'
    },
    timeline: {
      startDate: new Date('2024-05-01'),
      duration: '4 months',
      phases: []
    },
    team: [
      { id: 'tm11', name: 'Ryan Thompson', role: 'AI Engineer' },
      { id: 'tm12', name: 'Sophie Martinez', role: 'Full Stack Developer' },
      { id: 'tm13', name: 'Kevin Lee', role: 'DevOps Engineer' }
    ],
    status: 'active',
    featured: true,
    links: {
      live: 'https://contentpro-ai.com',
      github: 'https://github.com/example/ai-content-platform'
    },
    seo: {
      title: 'AI Content Management Platform Development',
      description: 'AI-powered platform for automated content generation and SEO optimization',
      keywords: ['ai', 'content management', 'seo', 'automation', 'nextjs'],
      canonicalUrl: '/work/ai-content-management-platform'
    },
    settings: {
      showClient: true,
      showTeam: true,
      showTimeline: true,
      showResults: true,
      allowInquiries: true
    },
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-08-15')
  }
];

// Helper function to initialize sample data
export function initializeSampleProjects() {
  if (typeof window !== 'undefined') {
    const existingProjects = localStorage.getItem('projects');
    if (!existingProjects || JSON.parse(existingProjects).length === 0) {
      localStorage.setItem('projects', JSON.stringify(sampleProjects));
    }
  }
}