'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, ArrowRight } from "lucide-react";

type LogoProps = {
  linkClassName?: string;
  imageClassName?: string;
  onClick?: () => void;
};

const Logo = ({ linkClassName, imageClassName, onClick }: LogoProps) => (
  <Link 
    href="/" 
    className={linkClassName ?? "flex items-center space-x-2 group"}
    onClick={onClick}
    aria-label="codenies - Home"
  >
    <Image
      src="/logo/web.png"
      alt="codenies"
      width={160}
      height={160}
      className={`h-12 lg:h-10 w-auto ${imageClassName ?? ""}`}
    />
  </Link>
);

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

  // Prevent body scroll when mobile menu is open, handle keyboard + touch, and manage focus
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = 'unset';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }

    document.body.style.overflow = 'hidden';

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    let startX = 0;
    let startY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!startX || !startY) return;
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;
      if (Math.abs(diffX) > Math.abs(diffY) && diffX < -50 && startX < 50) setOpen(false);
    };

    // Focus the first navigation item when menu opens
    const firstNavItem = document.querySelector('#mobile-menu a');
    if (firstNavItem instanceof HTMLElement) setTimeout(() => firstNavItem.focus(), 100);

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const handleNavigation = () => {
    setOpen(false);
  };

  // (Focus management merged into the open effect above)

  const navigationItems = [
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 lg:h-16">
          {/* Logo */}
          <Logo onClick={handleNavigation} />

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="relative text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-200 font-medium leading-normal group"
                    onClick={handleNavigation}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
              <li>
                <Button asChild size="sm" className="bg-[var(--color-primary)] hover:bg-[var(--gradient-hover)] text-white shadow-sm hover:shadow-md transition-all duration-300 group px-3 py-1.5 text-xs rounded-md whitespace-nowrap">
                  <Link href="/consultation" onClick={handleNavigation} aria-label="Start a project">
                    Start a project
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setOpen(!open);
                }
              }}
              className="relative touch-target hover:bg-[var(--color-accent)]/10 transition-colors duration-300 no-tap-highlight focus-mobile"
              aria-label={open ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-haspopup="true"
            >
              {open ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ease-out ${
          open 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setOpen(false);
          }
        }}
      >
        {/* Backdrop */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        
        {/* Slide-in Menu */}
        <div 
          id="mobile-menu"
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-background shadow-2xl transform transition-all duration-300 ease-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="mobile-menu-title"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full w-full relative">
            {/* Mobile Header - Clean and Simple */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background">
              <Logo 
                onClick={handleNavigation}
                linkClassName="flex items-center touch-target no-tap-highlight"
                imageClassName=""
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setOpen(false)}
                className="touch-target hover:bg-[var(--color-accent)]/10 rounded-lg transition-colors duration-300 no-tap-highlight focus-mobile"
                aria-label="Close mobile menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Mobile Navigation - Clean and Simple */}
            <nav className="flex-1 px-6 py-8 bg-background" role="navigation" aria-label="Mobile navigation">
              <ul className="space-y-2" role="list">
                {navigationItems.map((item, index) => (
                  <li key={item.href} role="listitem">
                    <Link 
                      href={item.href} 
                      className="nav-touch text-lg font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] rounded-lg hover:bg-[var(--color-accent)]/10 transition-all duration-300 bg-background focus-mobile"
                      onClick={handleNavigation}
                      tabIndex={open ? 0 : -1}
                      aria-describedby={`nav-item-${index}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* CTA Button - Simple and Clean */}
              <div className="mt-8">
                <Button 
                  asChild 
                  className="w-full bg-[var(--color-primary)] hover:bg-[var(--gradient-hover)] text-white py-2 rounded-md no-tap-highlight focus-mobile transition-all duration-300 whitespace-nowrap"
                >
                  <Link 
                    href="/consultation" 
                    onClick={handleNavigation}
                    tabIndex={open ? 0 : -1}
                    aria-label="Get started with consultation"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
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
      </div>
    </header>
  );
};

export default Header;
