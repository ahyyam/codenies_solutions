import { BusinessMessaging, BUSINESS_FOCUS_THEMES } from '../types/content';

/**
 * Business-focused messaging configuration
 * Emphasizes ROI, business growth, and client success
 */
export const businessMessaging: BusinessMessaging = {
  homepage: {
    hero: {
      headline: "Transform Your Business With Technology",
      subheadline: "We build custom software solutions that drive real business results. From AI-powered automation to scalable SaaS platforms.",
      valueProposition: [
        "Increase operational efficiency by up to 40%",
        "Reduce manual processes and human error",
        "Scale your business with future-ready technology",
        "Gain competitive advantage through innovation"
      ],
      callToAction: {
        primary: "Get Free Strategy Session",
        secondary: "Explore Solutions"
      }
    },
    sections: {
      services: {
        headline: "Our Expertise",
        subheadline: "From concept to deployment, we deliver comprehensive digital solutions tailored to your business needs.",
        valueProposition: [
          "Custom solutions that fit your unique business model",
          "Proven methodologies that deliver measurable results",
          "Ongoing support to ensure long-term success"
        ],
        callToAction: {
          primary: "Learn More"
        }
      },
      about: {
        headline: "Why Choose codenies?",
        subheadline: "We're not just developers – we're your strategic technology partners. Our team combines technical expertise with business acumen to deliver solutions that drive real results.",
        valueProposition: [
          "Expert team with proven track records in delivering successful projects",
          "Modern technologies for optimal performance, security, and scalability",
          "End-to-end service from concept to deployment and ongoing support"
        ],
        callToAction: {
          primary: "Schedule Free Consultation"
        }
      },
      testimonials: {
        headline: "What Our Clients Say",
        subheadline: "Don't just take our word for it. Here's what our clients have to say about working with us.",
        valueProposition: [
          "Transformed businesses across industries",
          "Delivered measurable ROI and business growth",
          "Built lasting partnerships based on trust and results"
        ],
        callToAction: {
          primary: "View Case Studies"
        }
      },
      technologies: {
        headline: "Technologies We Master",
        subheadline: "We use cutting-edge technologies to build robust, scalable, and future-proof solutions.",
        valueProposition: [
          "Latest frameworks and tools for competitive advantage",
          "Scalable architecture that grows with your business",
          "Security-first approach to protect your valuable data"
        ],
        callToAction: {
          primary: "Discuss Your Tech Stack"
        }
      },
      cta: {
        headline: "Ready to Transform Your Business?",
        subheadline: "Let's discuss your project and explore how we can help you achieve your digital goals. Get a free consultation today.",
        valueProposition: [
          "Free strategic consultation to identify opportunities",
          "Custom roadmap tailored to your business objectives",
          "No obligation - just valuable insights for your business"
        ],
        callToAction: {
          primary: "Schedule Free Consultation"
        }
      }
    }
  },
  services: {
    'saas-development': {
      headline: "SaaS Development",
      subheadline: "Build scalable, secure, and high-performance software-as-a-service platforms that drive business growth and user engagement.",
      valueProposition: [
        "Recurring revenue model with subscription-based income",
        "Lower customer acquisition costs through viral growth",
        "Scalable infrastructure that reduces operational overhead",
        "Data-driven insights to optimize business decisions"
      ],
      businessBenefits: [
        {
          title: "Recurring Revenue",
          description: "Subscription-based model ensures predictable income streams",
          benefit: "Improved cash flow and business stability"
        },
        {
          title: "Global Reach",
          description: "Cloud-based delivery enables worldwide market access",
          benefit: "Expanded customer base without geographical limitations"
        },
        {
          title: "Automatic Updates",
          description: "Seamless feature rollouts without user intervention",
          benefit: "Reduced support costs and improved user satisfaction"
        },
        {
          title: "Scalable Growth",
          description: "Infrastructure that grows with your user base",
          benefit: "Cost-effective scaling without major reinvestment"
        }
      ],
      roiHighlights: [
        "Lower upfront costs compared to traditional software",
        "Reduced maintenance and support overhead",
        "Faster time-to-market for new features",
        "Higher customer lifetime value through subscriptions"
      ],
      successMetrics: [
        "Monthly Recurring Revenue (MRR) growth",
        "Customer acquisition cost reduction",
        "User engagement and retention rates",
        "Feature adoption and usage analytics"
      ],
      callToAction: {
        primary: "Start Your SaaS Project",
        secondary: "Get Free Consultation"
      }
    },
    'ecommerce-solutions': {
      headline: "E-commerce Solutions",
      subheadline: "Custom online stores and marketplaces that drive sales and enhance customer experience with modern design and powerful features.",
      valueProposition: [
        "Increase online sales by up to 200% with optimized conversion funnels",
        "Reduce cart abandonment through streamlined checkout processes",
        "Expand market reach with mobile-optimized shopping experiences",
        "Automate inventory management to reduce operational costs"
      ],
      businessBenefits: [
        {
          title: "Revenue Growth",
          description: "Optimized conversion funnels and user experience",
          benefit: "Higher sales conversion rates and average order values"
        },
        {
          title: "Market Expansion",
          description: "Mobile-first design reaches customers anywhere",
          benefit: "Access to broader customer base and new markets"
        },
        {
          title: "Operational Efficiency",
          description: "Automated inventory and order management",
          benefit: "Reduced manual work and operational costs"
        },
        {
          title: "Customer Insights",
          description: "Advanced analytics and customer behavior tracking",
          benefit: "Data-driven decisions to optimize business performance"
        }
      ],
      roiHighlights: [
        "Secure payment gateways reduce transaction failures",
        "Inventory management prevents stockouts and overstock",
        "Customer analytics enable targeted marketing campaigns",
        "Mobile optimization captures growing mobile commerce market"
      ],
      successMetrics: [
        "Conversion rate optimization",
        "Average order value increase",
        "Customer acquisition cost reduction",
        "Mobile traffic and sales growth"
      ],
      callToAction: {
        primary: "Launch Your Online Store",
        secondary: "Get Free Consultation"
      }
    },
    'website-development': {
      headline: "Website Development",
      subheadline: "High-performance websites that convert visitors into customers with optimal user experience, modern design, and powerful functionality.",
      valueProposition: [
        "Convert more visitors into leads with optimized landing pages",
        "Improve search rankings with SEO-optimized architecture",
        "Reduce bounce rates through fast loading and mobile responsiveness",
        "Build trust and credibility with professional design"
      ],
      businessBenefits: [
        {
          title: "Lead Generation",
          description: "Conversion-optimized design and user experience",
          benefit: "Higher lead quality and increased sales opportunities"
        },
        {
          title: "Brand Authority",
          description: "Professional design that builds trust and credibility",
          benefit: "Enhanced brand perception and customer confidence"
        },
        {
          title: "Search Visibility",
          description: "SEO-optimized structure and performance",
          benefit: "Increased organic traffic and reduced marketing costs"
        },
        {
          title: "User Engagement",
          description: "Fast loading and mobile-responsive design",
          benefit: "Lower bounce rates and higher user satisfaction"
        }
      ],
      roiHighlights: [
        "Responsive design ensures optimal experience across all devices",
        "SEO optimization improves search engine rankings",
        "Fast loading speeds reduce bounce rates",
        "Conversion-focused design increases lead generation"
      ],
      successMetrics: [
        "Website conversion rate improvement",
        "Search engine ranking positions",
        "Page load speed optimization",
        "Mobile usability scores"
      ],
      callToAction: {
        primary: "Build Your Website",
        secondary: "Get Free Consultation"
      }
    },
    'mobile-applications': {
      headline: "Mobile Applications",
      subheadline: "Native and cross-platform mobile apps that engage users across iOS and Android devices with modern design, smooth performance, and intuitive user experience.",
      valueProposition: [
        "Reach customers directly through push notifications and mobile engagement",
        "Increase customer loyalty with personalized mobile experiences",
        "Generate new revenue streams through in-app purchases and subscriptions",
        "Gain competitive advantage with innovative mobile features"
      ],
      businessBenefits: [
        {
          title: "Customer Engagement",
          description: "Direct communication through push notifications",
          benefit: "Higher customer retention and repeat business"
        },
        {
          title: "Revenue Opportunities",
          description: "In-app purchases and subscription models",
          benefit: "New income streams and increased customer lifetime value"
        },
        {
          title: "Market Presence",
          description: "Visibility in app stores and mobile ecosystems",
          benefit: "Enhanced brand awareness and customer acquisition"
        },
        {
          title: "User Data",
          description: "Rich analytics on user behavior and preferences",
          benefit: "Better understanding of customers for targeted marketing"
        }
      ],
      roiHighlights: [
        "Native performance ensures smooth user experience",
        "Cross-platform support maximizes market reach",
        "Offline functionality maintains user engagement",
        "Push notifications drive user re-engagement"
      ],
      successMetrics: [
        "App store rankings and downloads",
        "User engagement and retention rates",
        "In-app conversion and revenue",
        "Customer satisfaction scores"
      ],
      callToAction: {
        primary: "Build Your Mobile App",
        secondary: "Get Free Consultation"
      }
    },
    'ui-ux-design': {
      headline: "UI/UX Design",
      subheadline: "Intuitive and beautiful interfaces that prioritize user experience and business goals with modern design principles and user-centered methodologies.",
      valueProposition: [
        "Increase user satisfaction and reduce support costs with intuitive design",
        "Improve conversion rates through user-centered design optimization",
        "Reduce development costs with proper planning and prototyping",
        "Enhance brand perception with professional and modern interfaces"
      ],
      businessBenefits: [
        {
          title: "Conversion Optimization",
          description: "User-centered design that guides users to desired actions",
          benefit: "Higher conversion rates and improved business outcomes"
        },
        {
          title: "Cost Reduction",
          description: "Proper planning reduces development iterations",
          benefit: "Lower development costs and faster time-to-market"
        },
        {
          title: "User Satisfaction",
          description: "Intuitive interfaces reduce learning curve",
          benefit: "Lower support costs and higher user retention"
        },
        {
          title: "Brand Enhancement",
          description: "Professional design improves brand perception",
          benefit: "Increased customer trust and market credibility"
        }
      ],
      roiHighlights: [
        "User research ensures design meets actual user needs",
        "Wireframing and prototyping reduce development risks",
        "Usability testing validates design decisions",
        "Responsive design ensures consistent experience across devices"
      ],
      successMetrics: [
        "User satisfaction and usability scores",
        "Task completion rates and efficiency",
        "Conversion rate improvements",
        "Support ticket reduction"
      ],
      callToAction: {
        primary: "Design Your Interface",
        secondary: "Get Free Consultation"
      }
    },
    'ai-integration': {
      headline: "AI Integration",
      subheadline: "Cutting-edge artificial intelligence solutions to automate processes and enhance functionality with modern AI technologies and machine learning capabilities.",
      valueProposition: [
        "Automate repetitive tasks to reduce operational costs by up to 60%",
        "Gain predictive insights to make data-driven business decisions",
        "Improve customer experience with intelligent automation and personalization",
        "Stay ahead of competition with cutting-edge AI capabilities"
      ],
      businessBenefits: [
        {
          title: "Cost Reduction",
          description: "Automation of repetitive and manual processes",
          benefit: "Significant reduction in operational costs and human error"
        },
        {
          title: "Competitive Advantage",
          description: "Advanced AI capabilities that differentiate your business",
          benefit: "Market leadership through innovative technology adoption"
        },
        {
          title: "Decision Making",
          description: "Predictive analytics and intelligent insights",
          benefit: "Better business decisions based on data-driven intelligence"
        },
        {
          title: "Customer Experience",
          description: "Personalized and intelligent user interactions",
          benefit: "Higher customer satisfaction and engagement"
        }
      ],
      roiHighlights: [
        "Machine learning algorithms improve over time",
        "Natural language processing enhances customer interactions",
        "Predictive analytics optimize business operations",
        "Process automation reduces manual workload"
      ],
      successMetrics: [
        "Process automation efficiency gains",
        "Cost reduction from automated workflows",
        "Accuracy improvements in predictions",
        "Customer satisfaction with AI features"
      ],
      callToAction: {
        primary: "Integrate AI Solutions",
        secondary: "Get Free Consultation"
      }
    }
  },
  about: {
    hero: {
      headline: "Building the Future, One Line at a Time",
      subheadline: "We are a passionate team of software developers, designers, and strategists dedicated to transforming businesses through innovative technology solutions.",
      valueProposition: [
        "Strategic technology partnerships that drive business growth",
        "Proven methodologies that deliver measurable results",
        "End-to-end solutions from concept to ongoing success"
      ],
      callToAction: {
        primary: "Get Free Strategy Session",
        secondary: "View Our Portfolio"
      }
    },
    sections: {
      mission: {
        headline: "Our Mission & Vision",
        subheadline: "Transforming ideas into reality through technology, providing exceptional software solutions that drive business growth and exceed client expectations.",
        valueProposition: [
          "Technology solutions that directly impact your bottom line",
          "Innovation that gives you competitive advantage",
          "Partnerships that grow with your business success"
        ],
        callToAction: {
          primary: "Learn About Our Process"
        }
      },
      values: {
        headline: "Our Core Values",
        subheadline: "Innovation, quality, and partnership drive everything we do.",
        valueProposition: [
          "Cutting-edge solutions that keep you ahead of the competition",
          "Quality standards that ensure long-term business value",
          "Partnership approach that aligns with your business goals"
        ],
        callToAction: {
          primary: "Start Your Project"
        }
      },
      team: {
        headline: "Meet Our Team",
        subheadline: "Experienced professionals dedicated to your success.",
        valueProposition: [
          "Seasoned experts with proven track records",
          "Collaborative approach that extends your team",
          "Continuous learning to stay at the forefront of technology"
        ],
        callToAction: {
          primary: "Work With Us"
        }
      }
    }
  }
};

/**
 * Get business-focused messaging for a specific page or section
 */
export function getBusinessMessaging(page: keyof BusinessMessaging, section?: string) {
  const pageContent = businessMessaging[page];
  
  if (section && 'sections' in pageContent && pageContent.sections) {
    return (pageContent.sections as Record<string, any>)[section];
  }
  
  return pageContent;
}

/**
 * Get service-specific messaging with business benefits
 */
export function getServiceMessaging(serviceName: string) {
  return businessMessaging.services[serviceName];
}