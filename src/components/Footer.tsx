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
    <footer className="bg-secondary py-6 text-center text-secondary-foreground">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex space-x-4 mb-4">
          <Link href="https://www.instagram.com/codenies_solutions/" target="_blank" rel="noopener noreferrer">
            <Instagram className="h-6 w-6 hover:text-primary"/>
          </Link>
          <Link href="https://www.facebook.com/share/1LNgesBeTc/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
            <Facebook className="h-6 w-6 hover:text-primary"/>
          </Link>
        </div>
        <p className="text-sm">
          {/*
            On server: currentYear is null. Ternary resolves to the fallback string.
            On client (initial render): currentYear is null. Ternary resolves to the fallback string.
            Server and Client initial renders match.
            On client (after useEffect): currentYear is updated. Component re-renders with the year.
          */}
          {currentYear !== null ? `© ${currentYear} Codenies Solutions. All rights reserved.` : '© Codenies Solutions. All rights reserved.'}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
