'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";

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
    { href: "/portfolio", label: "Portfolio" },
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
          >
            <span className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-200">
              Codenies Solutions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="relative text-foreground/80 hover:text-primary transition-colors duration-200 font-medium group"
                    onClick={handleNavigation}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
              <li>
                <Button asChild size="sm" className="btn-primary">
                  <Link href="/#contact" onClick={handleNavigation}>
                    Get Started
                    <ChevronRight className="w-4 h-4 ml-1" />
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
              className="relative w-10 h-10 hover:bg-primary/10 transition-colors duration-200 touch-manipulation"
              aria-label="Toggle mobile menu"
              aria-expanded={open}
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
        <div className="lg:hidden fixed inset-0 z-50 bg-background border-t border-border/50">
          <div className="flex flex-col h-full bg-background">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background">
              <Link 
                href="/" 
                className="flex items-center space-x-2"
                onClick={handleNavigation}
              >
                <span className="text-xl font-bold text-primary">
                  Codenies Solutions
                </span>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setOpen(false)}
                className="w-10 h-10 hover:bg-primary/10 touch-manipulation"
                aria-label="Close mobile menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 flex flex-col justify-center p-6 bg-background">
              <ul className="space-y-6">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className="block text-2xl font-semibold text-foreground hover:text-primary transition-colors duration-200 py-3 px-2 rounded-lg hover:bg-primary/5 touch-manipulation"
                      onClick={handleNavigation}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-4">
                  <Button asChild size="lg" className="w-full btn-primary text-lg py-6 touch-manipulation">
                    <Link href="/#contact" onClick={handleNavigation}>
                      Get Started
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </li>
              </ul>
            </nav>

            {/* Mobile Footer */}
            <div className="p-6 border-t border-border/50 bg-background">
              <div className="text-center text-sm text-muted-foreground">
                <p>Ready to transform your business?</p>
                <p className="font-medium text-primary mt-1">Let's build something amazing together.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
