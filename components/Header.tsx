'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, ArrowRight, Zap, Sparkles } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const handleNavigation = () => {
    setOpen(false);
  };

  const navigationItems = [
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg' 
        : 'bg-background/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
            onClick={handleNavigation}
            aria-label="Codenies Solutions - Home"
          >
            <Image
              src="/codenies_logo.png"
              alt="Codenies Solutions"
              width={200}
              height={200}
              className="h-32 w-auto group-hover:opacity-80 transition-opacity duration-200"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="relative text-foreground/80 hover:text-primary transition-colors duration-200 font-elegant font-medium group"
                    onClick={handleNavigation}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
              <li>
                <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <Link href="/consultation" onClick={handleNavigation}>
                    Get Started
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>

          {/* Mobile Navigation Button */}
          <div className="lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setOpen(!open)}
              className="relative w-10 h-10 hover:bg-primary/10 transition-colors duration-200 touch-manipulation focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Toggle mobile menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div 
          id="mobile-menu" 
          className="lg:hidden fixed inset-0 z-50 bg-background w-full h-full" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="mobile-menu-title"
        >
          {/* Simple Clean Background */}
          <div className="absolute inset-0 bg-background w-full h-full"></div>
          
          <div className="flex flex-col min-h-screen w-full relative">
            {/* Mobile Header - Clean and Simple */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background">
              <Link 
                href="/" 
                className="flex items-center"
                onClick={handleNavigation}
                aria-label="Codenies Solutions - Home"
              >
                <Image
                  src="/codenies_logo.png"
                  alt="Codenies Solutions"
                  width={200}
                  height={200}
                  className="h-32 w-auto"
                />
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setOpen(false)}
                className="w-10 h-10 hover:bg-muted rounded-lg transition-colors"
                aria-label="Close mobile menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Navigation - Clean and Simple */}
            <nav className="flex-1 px-6 py-8 bg-background">
              <ul className="space-y-3">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className="block text-lg font-medium text-foreground hover:text-primary py-3 px-4 rounded-lg hover:bg-primary/20 transition-colors bg-background"
                      onClick={handleNavigation}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* CTA Button - Simple and Clean */}
              <div className="mt-8">
                <Button asChild className="w-full bg-primary hover:bg-primary text-primary-foreground py-3 rounded-lg">
                  <Link href="/consultation" onClick={handleNavigation}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </nav>

            {/* Simple Footer */}
            <div className="px-6 py-6 border-t border-border bg-background">
              <div className="text-center text-sm text-muted-foreground">
                <p>Trusted by innovative companies worldwide</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
