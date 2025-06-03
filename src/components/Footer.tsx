
'use client';

import Link from 'next/link';
import {Instagram, Facebook} from 'lucide-react';

const Footer = () => {
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
          © {new Date().getFullYear()} Codenies Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
