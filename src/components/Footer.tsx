
const Footer = () => {
    return (
        <footer className="bg-secondary py-6 text-center text-secondary-foreground">
            <div className="container mx-auto px-4">
                <p className="text-sm">
                    © {new Date().getFullYear()} Codenies Solutions. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
