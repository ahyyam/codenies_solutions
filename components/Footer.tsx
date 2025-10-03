'use client';

import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm">

      <div className="container mx-auto px-4 py-14 text-foreground">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-3">
              <img 
                src="/logo/web.png" 
                alt="codenies logo" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-muted-foreground mb-5 leading-relaxed">
              We design, build, and scale revenue‑generating software products — SaaS, AI, mobile, and web.
            </p>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Link href="https://www.instagram.com/codeniess/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors hover:scale-105 transform duration-200">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="https://www.facebook.com/share/1LNgesBeTc/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary transition-colors hover:scale-105 transform duration-200">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="https://www.linkedin.com/company/codenies-solutions/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors hover:scale-105 transform duration-200">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Services</h4>
            <ul className="space-y-2.5">
              <li><Link href="/services/saas-development" className="text-muted-foreground hover:text-primary transition-colors text-sm">SaaS Development</Link></li>
              <li><Link href="/services/ai-integration" className="text-muted-foreground hover:text-primary transition-colors text-sm">AI Integration</Link></li>
              <li><Link href="/services/ecommerce-solutions" className="text-muted-foreground hover:text-primary transition-colors text-sm">E-commerce</Link></li>
              <li><Link href="/services/website-development" className="text-muted-foreground hover:text-primary transition-colors text-sm">Web Development</Link></li>
              <li><Link href="/services/mobile-applications" className="text-muted-foreground hover:text-primary transition-colors text-sm">Mobile Apps</Link></li>
              <li><Link href="/services/ui-ux-design" className="text-muted-foreground hover:text-primary transition-colors text-sm">UI/UX Design</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Company</h4>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About</Link></li>
              <li><Link href="/work" className="text-muted-foreground hover:text-primary transition-colors text-sm">Work</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm">Blog</Link></li>
              <li><Link href="/consultation" className="text-muted-foreground hover:text-primary transition-colors text-sm">Start a project</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Contact</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:hello@codenies.com" className="hover:text-primary transition-colors">hello@codenies.com</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+201287800800" className="hover:text-primary transition-colors">+201287800800</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[13px] text-muted-foreground">
            <p>&copy; {currentYear} codenies. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-5 text-[13px] text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
