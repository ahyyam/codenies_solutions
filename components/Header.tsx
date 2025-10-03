'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

type LogoProps = {
  linkClassName?: string;
  imageClassName?: string;
  onClick?: () => void;
};

const Logo = ({ linkClassName, imageClassName, onClick }: LogoProps) => (
  <Link 
    href="/" 
    className={linkClassName || "flex items-center"}
    onClick={onClick}
    aria-label="codenies Home"
  >
    <Image
      src="/logo/web.png"
      alt="codenies"
      width={160}
      height={160}
      priority
      className={`h-10 w-auto ${imageClassName || ""}`}
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

  // Prevent body scroll when mobile menu is open and handle ESC key
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = 'unset';
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    // Handle tab navigation within mobile menu
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
          'nav[aria-label="Mobile navigation"] button, nav[aria-label="Mobile navigation"] a, nav[aria-label="Mobile navigation"] input'
        );
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabKey);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabKey);
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
                    className="relative text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-200 font-medium"
                    onClick={handleNavigation}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-200 hover:w-full"></span>
                  </Link>
                </li>
              ))}
              <li>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="min-h-[32px] px-3 py-1.5 text-sm rounded-lg"
                >
                  <Link href="/consultation" onClick={handleNavigation}>
                    Start a project
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-50"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav 
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="Mobile navigation"
      >
        {/* Solid Background */}
        <div 
          className={`absolute inset-0 bg-white dark:bg-gray-900 ${
            open ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        
        {/* Menu Panel */}
        <div 
          id="mobile-menu"
          className={`absolute right-0 top-0 h-full w-full max-w-xs bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <div className="flex flex-col h-full">
            {/* Header with Logo and Close Button */}
            <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-600">
              <Logo 
                onClick={handleNavigation}
                linkClassName="flex items-center"
                imageClassName="h-8 w-8"
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close mobile menu"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-6 pt-8 pb-6 bg-white dark:bg-gray-900">
              <h2 id="mobile-menu-title" className="sr-only">Mobile Navigation</h2>
              <ul className="space-y-2" role="list">
                {navigationItems.map((item, index) => (
                  <li key={item.href} role="listitem">
                    <Link 
                      href={item.href} 
                      className="block px-4 py-3 text-lg font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      onClick={handleNavigation}
                      aria-describedby={index === 0 ? undefined : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Start Project Section */}
              <div className="mt-6 px-4 py-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Start Your Project
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  We'll provide expert guidance, technical roadmap, and realistic estimates for your project within 24 hours.
                </p>
                <Button 
                  asChild 
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Link 
                    href="/consultation" 
                    onClick={handleNavigation}
                  >
                    Start a project
                  </Link>
                </Button>
                <div className="flex items-center justify-center mt-3 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    Expert Guidance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
