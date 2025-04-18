
import { Button } from "@/components/ui/button";

const Header = () => {
    return (
        <header className="bg-background py-6">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <a href="/" className="text-2xl font-semibold">
                    Codenies Solutions
                </a>
                <nav>
                    <ul className="flex space-x-6">
                        <li><a href="/" className="hover:text-primary">Services</a></li>
                        <li><a href="/" className="hover:text-primary">About</a></li>
                        <li><a href="/" className="hover:text-primary">Contact</a></li>
                    </ul>
                </nav>
                <Button>Get a Quote</Button>
            </div>
        </header>
    );
};

export default Header;
