
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Contact Us
        </h2>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <Input type="text" placeholder="Your Name" />
            </div>
            <div>
              <Input type="email" placeholder="Your Email" />
            </div>
            <div>
              <Textarea placeholder="Your Message" />
            </div>
            <div className="text-center">
              <Button size="lg">Send Message</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
