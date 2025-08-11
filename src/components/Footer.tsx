'use client';

import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    // This will only run on the client, after initial hydration
    setCurrentYear(new Date().getFullYear());
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Link href="https://www.instagram.com/codenies_solutions/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="h-5 w-5 hover:text-primary transition-colors"/>
          </Link>
          <span className="w-px h-5 bg-border" aria-hidden="true" />
          <Link href="https://www.facebook.com/share/1LNgesBeTc/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="h-5 w-5 hover:text-primary transition-colors"/>
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          {currentYear !== null ? `© ${currentYear} Codenies Solutions. All rights reserved.` : '© Codenies Solutions. All rights reserved.'}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
