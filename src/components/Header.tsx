
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-background py-6">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-semibold">
                    Codenies Solutions
                </Link>
                <nav>
                    <ul className="flex space-x-6">
                        <li><Link href="/services" className="hover:text-primary">Services</Link></li>
                        <li><Link href="/about" className="hover:text-primary">About</Link></li>
                        <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                    </ul>
                </nav>
                <Button asChild>
                    <Link href="/contact">Get a Quote</Link>
                </Button>
            </div>
        </header>
    );
};

export default Header;
