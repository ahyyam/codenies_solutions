
import { Button } from "@/components/ui/button";

const Hero = () => {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
                    Crafting Digital Solutions for Tomorrow
                </h1>
                <p className="text-lg text-center text-muted-foreground mb-8">
                    We transform ideas into innovative software solutions.
                </p>
                <div className="text-center">
                    <Button size="lg">
                      Get Started
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
