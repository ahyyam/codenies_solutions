'use client';

import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    // This will only run on the client, after initial hydration
    setCurrentYear(new Date().getFullYear());
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-primary mb-4">Codenies Solutions</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Crafting bespoke software solutions that drive your business forward. 
              From custom web applications to AI-powered automation tools, we help 
              businesses achieve digital transformation and competitive advantage.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Link href="https://www.instagram.com/codenies_solutions/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://www.facebook.com/share/1LNgesBeTc/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://www.linkedin.com/company/codenies-solutions/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>



          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Get Consultation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Blog & Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@codenis.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Worldwide Service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <p>&copy; {currentYear} Codenies Solutions. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
