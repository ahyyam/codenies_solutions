import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import { Mail, Phone, Clock, MapPin, CheckCircle, Star, Users, Award, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Codenies Solutions - Get Free Consultation',
  description: 'Contact Codenies Solutions for custom software development services. Get a free consultation for web & mobile development, e-commerce, AI automation, and UI/UX design. We\'re here to help transform your business.',
  keywords: [
    'contact codenies solutions',
    'software development consultation',
    'free consultation',
    'custom software quote',
    'web development contact',
    'mobile app development contact',
    'e-commerce development contact',
    'AI automation contact'
  ],
  openGraph: {
    title: 'Contact Codenies Solutions - Get Free Consultation',
    description: 'Contact Codenies Solutions for custom software development services. Get a free consultation for web & mobile development, e-commerce, AI automation, and UI/UX design.',
    url: 'https://codenies-solutions.com/contact',
    siteName: 'Codenies Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Codenies Solutions - Get Free Consultation',
    description: 'Contact Codenies Solutions for custom software development services. Get a free consultation for web & mobile development, e-commerce, AI automation, and UI/UX design.',
  },
  alternates: {
    canonical: 'https://codenies-solutions.com/contact',
  },
};

const ContactPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Codenies Solutions",
            "description": "Contact Codenies Solutions for custom software development services and free consultation",
            "url": "https://codenies-solutions.com/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Codenies Solutions",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://codenies-solutions.com/contact",
                "availableLanguage": "English"
              }
            }
          })
        }}
      />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-primary leading-tight">
              Let's Build Something
              <span className="text-gradient block leading-tight">Amazing Together</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto">
              Ready to transform your business with custom software solutions? 
              Get in touch with us for a free consultation and let's discuss how 
              we can help you achieve your goals.
            </p>
            
            {/* Quick Contact Info */}
            <div className="flex flex-wrap justify-center gap-8 lg:gap-12 mt-16">
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">Free Consultation</div>
                  <div className="text-sm">Available 24/7</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">24-Hour Response</div>
                  <div className="text-sm">Quick turnaround</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">No Commitment</div>
                  <div className="text-sm">Risk-free start</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          
          {/* Contact Form and Why Choose Us - Side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Why Choose Us - Left side */}
            <div className="lg:col-span-1">
              <div className="card p-8 lg:p-10 sticky top-24">
                <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-primary flex items-center gap-3">
                  <Star className="w-6 h-6 lg:w-7 lg:h-7 text-accent" />
                  Why Choose Us?
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground text-lg lg:text-xl">Free Consultation</span>
                      <p className="text-muted-foreground mt-1">Comprehensive project assessment at no cost</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground text-lg lg:text-xl">Transparent Pricing</span>
                      <p className="text-muted-foreground mt-1">Clear quotes with no hidden fees</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground text-lg lg:text-xl">Dedicated Support</span>
                      <p className="text-muted-foreground mt-1">Ongoing maintenance and 24/7 support</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground text-lg lg:text-xl">Project Manager</span>
                      <p className="text-muted-foreground mt-1">Personal project manager for smooth delivery</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form - Right side */}
            <div className="lg:col-span-2">
              <div className="card p-8 lg:p-12 xl:p-16 shadow-medium">
                <div className="mb-12">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-primary">Send Us a Message</h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Tell us about your project and we'll get back to you within 24 hours with a personalized solution.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
