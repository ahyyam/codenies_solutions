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
          className="lg:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-md" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="mobile-menu-title"
        >
          <div className="flex flex-col h-full bg-background/95 backdrop-blur-md">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50 bg-background/95 backdrop-blur-md">
              <h2 id="mobile-menu-title" className="sr-only">Mobile Navigation Menu</h2>
              <Link 
                href="/" 
                className="flex items-center space-x-3"
                onClick={handleNavigation}
                aria-label="Codenies Solutions - Home"
              >
                <Image
                  src="/codenies_logo.png"
                  alt="Codenies Solutions"
                  width={48}
                  height={48}
                  className="h-12 w-auto"
                />
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setOpen(false)}
                className="w-12 h-12 hover:bg-primary/10 touch-manipulation rounded-full transition-all duration-200"
                aria-label="Close mobile menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 flex flex-col justify-start pt-8 px-6 bg-background/95 backdrop-blur-md">
              <ul className="space-y-2">
                {navigationItems.map((item, index) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className="block text-xl font-semibold text-foreground hover:text-primary transition-all duration-200 py-4 px-4 rounded-xl hover:bg-primary/5 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 touch-manipulation border border-transparent hover:border-primary/20"
                      onClick={handleNavigation}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </Link>
                  </li>
                ))}
                <li className="pt-6">
                  <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Link href="/consultation" onClick={handleNavigation}>
                      <Zap className="w-5 h-5 mr-2" />
                      Get Started
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </li>
              </ul>
            </nav>

            {/* Mobile Footer */}
            <div className="p-6 border-t border-border/50 bg-background/95 backdrop-blur-md">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <p className="text-foreground font-medium mb-2">Ready to transform your business?</p>
                <p className="text-muted-foreground text-sm">Let's build something amazing together.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
