'use client';

import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
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
              Transforming businesses through innovative software solutions. We specialize in custom development, 
              web & mobile apps, e-commerce, AI automation, and UI/UX design.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Link href="https://www.instagram.com/codenies_solutions/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://www.facebook.com/share/1LNgesBeTc/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#services" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Web & Mobile Development
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Custom Software
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  E-commerce Solutions
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  AI & Automation
                </Link>
              </li>
            </ul>
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
                <Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            {currentYear !== null ? `© ${currentYear} Codenies Solutions. All rights reserved.` : '© Codenies Solutions. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
