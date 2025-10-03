
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import nodemailer from "nodemailer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Users, Zap } from "lucide-react"
import { GradientText, GradientButton } from "@/components/common"

export const metadata: Metadata = {
  title: "Free Consultation - codenies",
  description: "Schedule a free strategic consultation with codenies. Discuss goals, timelines, budget, and the right tech approach for your project.",
  keywords: [
    "free consultation",
    "project discovery",
    "software consultation",
    "codenies",
  ],
  openGraph: {
    title: "Free Consultation - codenies",
    description: "Schedule a free strategic consultation with codenies.",
    type: "website",
    url: "/consultation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Consultation - codenies",
    description: "Schedule a free strategic consultation with codenies.",
  },
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
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Boolean(process.env.SMTP_SECURE === 'true'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const toAddress = process.env.CONSULTATION_TO || 'hello@codenies.com'

    const html = `
      <h1>New Consultation Request</h1>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Project Type:</strong> ${projectType}</p>
      <p><strong>Budget:</strong> ${budget}</p>
      <p><strong>Timeline:</strong> ${timeline}</p>
      <p><strong>Newsletter:</strong> ${newsletter}</p>
      <p><strong>Description:</strong><br/>${description.replace(/\n/g, '<br/>')}</p>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'codenies <no-reply@codenies.com>',
      to: toAddress,
      subject: `New Consultation Request: ${projectType} - ${firstName} ${lastName}`,
      replyTo: email,
      html,
    })

    redirect('/consultation?sent=1')
  } catch (error) {
    console.error('consultation submit error', error)
    redirect('/consultation?sent=0')
  }
}

export default function ConsultationPage({ searchParams }: { searchParams?: { sent?: string } }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[var(--primary)] text-primary-foreground px-4 py-2 rounded-md z-50">
        Skip to main content
      </a>
      <div className="container-mobile section-padding pt-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <GradientText 
              variant="innovation" 
              hero 
              animated 
              as="h1" 
              className="text-4xl md:text-5xl font-elegant font-bold mb-4"
            >
              Start a project
            </GradientText>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-cursive">
              Tell us about your goals, timeline, and constraints. We’ll propose the fastest, safest path to ship.
            </p>
          </div>

          {searchParams?.sent === '1' && (
            <div className="mb-8 rounded-md border border-green-200 bg-green-50 text-green-800 p-4 text-sm text-center">
              Thank you! Your consultation request has been sent.
            </div>
          )}
          {searchParams?.sent === '0' && (
            <div className="mb-8 rounded-md border border-red-200 bg-red-50 text-red-800 p-4 text-sm text-center">
              Sorry, we couldn't send your request. Please try again.
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Benefits */}
            <div className="space-y-6">
              <Card className="border-border hover:shadow-lg transition-all duration-300 bg-card">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">What you'll get</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <CheckCircle className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Project assessment</h3>
                      <p className="text-sm text-muted-foreground">Clear scope, priorities, and success metrics</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Clock className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Timeline & budget</h3>
                      <p className="text-sm text-muted-foreground">Phased plan and transparent cost ranges</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Zap className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Technology recommendations</h3>
                      <p className="text-sm text-muted-foreground">Practical stack aligned to your team and roadmap</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Users className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Team introduction</h3>
                      <p className="text-sm text-muted-foreground">Direct access to the senior team who will ship it</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-secondary rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">100% Free</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    No strings attached. Get expert advice, quick sizing, and risk flags at no cost.
                  </p>
                  <div className="text-3xl font-bold text-foreground mb-1">$0</div>
                  <div className="text-sm text-muted-foreground mb-4">Usually $200 value</div>
                  <div className="text-xs text-muted-foreground font-medium bg-secondary px-2 py-1 rounded-full">
                    Limited Time Offer
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Tell Us About Your Project</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Fill out the form and we’ll reply within 24 hours with next steps.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" noValidate action={submitConsultation}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-foreground font-medium">
                          First Name *
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--ring)] bg-background text-foreground"
                          name="firstName"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="block text-foreground font-medium">
                          Last Name *
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--ring)] bg-background text-foreground"
                          name="lastName"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-foreground font-medium">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--ring)] bg-background text-foreground"
                        name="email"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="block text-foreground font-medium">
                        Company Name
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Your Company"
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--ring)] bg-background text-foreground"
                        name="company"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-foreground font-medium">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--ring)] bg-background text-foreground"
                        name="phone"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="projectType" className="block text-foreground font-medium">
                        Project Type *
                      </label>
                      <select
                        id="projectType"
                        required
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--ring)] bg-background text-foreground"
                        name="projectType"
                      >
                        <option value="">Select project type</option>
                        <option value="saas">SaaS Development</option>
                        <option value="ecommerce">E-commerce Solution</option>
                        <option value="website">Website Development</option>
                        <option value="mobile">Mobile Application</option>
                        <option value="uiux">UI/UX Design</option>
                        <option value="ai">AI Integration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="budget" className="block text-foreground font-medium">
                        Project Budget
                      </label>
                      <select
                        id="budget"
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--ring)] bg-background text-foreground"
                        name="budget"
                      >
                        <option value="">Select budget range</option>
                        <option value="1k-10k">$1,000 - $10,000</option>
                        <option value="10k-50k">$10,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="open">Open budget</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="timeline" className="block text-foreground font-medium">
                        Desired Timeline
                      </label>
                      <select
                        id="timeline"
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--ring)] bg-background text-foreground"
                        name="timeline"
                      >
                        <option value="">When do you need this completed?</option>
                        <option value="asap">ASAP</option>
                        <option value="1-3months">1-3 months</option>
                        <option value="3-6months">3-6 months</option>
                        <option value="6-12months">6-12 months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="description" className="block text-foreground font-medium">
                        Project Description *
                      </label>
                      <textarea
                        id="description"
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--ring)] min-h-[120px] bg-background text-foreground"
                        name="description"
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        id="newsletter"
                        type="checkbox"
                        className="h-4 w-4 text-foreground focus:ring-[var(--ring)] border-border rounded"
                        name="newsletter"
                      />
                      <label htmlFor="newsletter" className="text-sm text-muted-foreground">
                        I'd like to receive updates about new services and industry insights
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        id="terms"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-foreground focus:ring-[var(--ring)] border-border rounded"
                        name="terms"
                      />
                      <label htmlFor="terms" className="text-sm text-muted-foreground">
                        I agree to the terms of service and privacy policy *
                      </label>
                    </div>

                    <GradientButton 
                      variant="innovation" 
                      type="submit" 
                      className="w-full text-lg py-4 focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2"
                    >
                      Schedule My Free Consultation
                    </GradientButton>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Questions? Email us at{" "}
                              <a href="mailto:hello@codenies.com" className="text-foreground font-medium hover:underline">
                  hello@codenies.com
              </a>{" "}
              or call{" "}
              <a href="tel:+201287800800" className="text-foreground font-medium hover:underline">
                +201287800800
              </a>
            </p>
            <p className="text-sm text-muted-foreground">
              We typically respond within 2-4 hours during business hours (9 AM - 6 PM EST)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
