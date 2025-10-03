import type { Metadata } from "next"
import { redirect } from "next/navigation"
import nodemailer from "nodemailer"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Zap } from "lucide-react"
import { GradientText } from "@/components/common"

export const metadata: Metadata = {
  title: "Start Your Project - codenies",
  description: "Get expert guidance for your software project. Free consultation within 24 hours.",
}

async function submitConsultation(formData: FormData) {
  'use server'
  try {
    const get = (key: string) => String(formData.get(key) || '')
    const firstName = get('firstName')
    const lastName = get('lastName')
    const email = get('email')
    const company = get('company')
    const phone = get('phone')
    const projectType = get('projectType')
    const budget = get('budget')
    const timeline = get('timeline')
    const description = get('description')
    const newsletter = formData.get('newsletter') ? 'Yes' : 'No'

    if (!firstName || !lastName || !email || !projectType || !description) {
      redirect('/consultation?sent=0')
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const info = await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${email}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `New consultation request from ${company || 'Individual'}`,
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>TType:</strong> ${projectType}</p>
        <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
        <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
        <p><strong>Newsletter:</strong> ${newsletter}</p>
        <h3>Project Description:</h3>
        <p>${description.replace(/\n/g, '<br>')}</p>
      `,
    })

    redirect('/consultation?sent=1')
  } catch (error) {
    redirect('/consultation?sent=0')
  }
}

export default async function ConsultationPage({ searchParams }: { searchParams?: Promise<{ sent?: string }> }) {
  const params = await searchParams;
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-20 pb-12">
        <div className="container-responsive text-center max-w-3xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Free Consultation
            </span>
          </div>
          
          <GradientText 
            variant="innovation" 
            hero 
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Start Your Project
          </GradientText>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            We'll provide expert guidance, technical roadmap, and realistic estimates 
            <br className="hidden md:block" />
            for your project within 24 hours.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>24h Response</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Expert Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Success/Error Messages */}
      {params?.sent === '1' && (
        <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center max-w-2xl mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-green-800 mb-1">Request Sent Successfully!</h3>
          <p className="text-green-700">We'll get back to you within 24 hours.</p>
        </div>
      )}
      
      {params?.sent === '0' && (
        <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-2xl mx-auto">
          <h3 className="font-semibold text-red-800 mb-1">Failed to Send Request</h3>
          <p className="text-red-700">Please try again or contact us directly.</p>
        </div>
      )}

      {/* Form */}
      <section className="pb-20">
        <div className="container-responsive max-w-2xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Details</h2>
              <p className="text-gray-600">Tell us about your project and goals</p>
            </div>

            <form className="space-y-6" action={submitConsultation}>
              {/* Name */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="John"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your Company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              {/* Project */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type *
                </label>
                <select
                  name="projectType"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select project type</option>
                  <option value="saas">SaaS Development</option>
                  <option value="ecommerce">E-commerce Website</option>
                  <option value="website">Corporate Website</option>
                  <option value="mobile">Mobile App</option>
                  <option value="ui-ux">UI/UX Design</option>
                  <option value="ai">AI Integration</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget
                  </label>
                  <select
                    name="budget"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select budget</option>
                    <option value="under-1k">Under $1,000</option>
                    <option value="1k-10k">$1,000 - $10,000</option>
                    <option value="10k-50k">$10,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="open">Open budget</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="3-months">Within 3 months</option>
                    <option value="6-months">Within 6 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Describe your project goals, features, and requirements..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-vertical"
                />
              </div>

              {/* Newsletter */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  name="newsletter"
                  id="newsletter"
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-600">
                  Subscribe to our newsletter for tech insights and updates
                </label>
              </div>

              {/* Submit */}
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-semibold"
              >
                Get Free Consultation
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our privacy policy.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}