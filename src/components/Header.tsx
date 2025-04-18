'use client';

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useState} from "react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Menu} from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleNavigation = () => {
    setOpen(false); // Close the dialog
  };

  return (
    <header className="bg-background py-4 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold" onClick={handleNavigation}>
          Codenies Solutions
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><Link href="/services" className="hover:text-primary" onClick={handleNavigation}>Services</Link></li>
            <li><Link href="/about" className="hover:text-primary" onClick={handleNavigation}>About</Link></li>
            <li><Link href="/contact" className="hover:text-primary" onClick={handleNavigation}>Contact</Link></li>
            <li><Link href="/blog" className="hover:text-primary" onClick={handleNavigation}>Blog</Link></li>
          </ul>
        </nav>

        {/* Mobile Navigation Button */}
        <div className="md:hidden">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <span className="sr-only">Open menu</span>
                <Menu className="h-5 w-5"/>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full bg-background shadow-lg">
              <nav className="flex flex-col space-y-4 p-4">
                <Link href="/" className="text-2xl font-semibold" onClick={handleNavigation}>
                  Codenies Solutions
                </Link>
                <Link href="/services" className="hover:text-primary block" onClick={handleNavigation}>Services</Link>
                <Link href="/about" className="hover:text-primary block" onClick={handleNavigation}>About</Link>
                <Link href="/contact" className="hover:text-primary block" onClick={handleNavigation}>Contact</Link>
                <Link href="/blog" className="hover:text-primary block" onClick={handleNavigation}>Blog</Link>
              </nav>
            </DialogContent>
          </Dialog>
        </div>

        
      </div>
    </header>
  );
};

export default Header;
