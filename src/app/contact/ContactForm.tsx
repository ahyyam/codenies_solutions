'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isSpam } from "@/services/spam-protection";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { sendContactForm } from './actions';
import { contactFormSchema, ContactFormValues } from './schema';
import { Send, Loader2 } from 'lucide-react';

export { contactFormSchema };

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    // Reset form state when the component mounts
    form.reset();
  }, []);

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const spam = await isSpam(values.message);
      if (spam) {
        toast({
          variant: "destructive",
          title: "Spam detected!",
          description: "Your message looks like spam and was not sent.",
        });
        return;
      }

      // Call the server action to send the email
      const result = await sendContactForm(values);

      if (result?.success) {
        toast({
          title: "Message sent successfully! 🎉",
          description: "We'll get back to you within 24 hours.",
        });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Error sending message!",
          description: result?.message || "Failed to send the message. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-medium">Your Name *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    className="h-12 text-base"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-medium">Your Email *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="john@example.com" 
                    type="email" 
                    className="h-12 text-base"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground font-medium">Your Message *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about your project, goals, and how we can help you succeed..." 
                  rows={6}
                  className="text-base resize-none"
                  {...field} 
                />
              </FormControl>
              <FormDescription className="text-sm text-muted-foreground">
                Be as detailed as possible so we can provide the best solution for your needs.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="pt-4">
          <Button 
            size="lg" 
            type="submit" 
            className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground text-center">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      </form>
    </Form>
  );
};

export default ContactForm; 