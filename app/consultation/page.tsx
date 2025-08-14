'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Code, CheckCircle, Clock, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gray-900 text-white px-4 py-2 rounded-md z-50">
        Skip to main content
      </a>


      <div className="container mx-auto px-4 py-12 pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-elegant font-bold text-gray-900 mb-4">Get Your Free Consultation</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-cursive">
              Let's discuss your project and explore how we can help transform your business with cutting-edge
              technology solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Benefits */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">What You'll Get</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <CheckCircle className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Project Assessment</h3>
                      <p className="text-sm text-gray-600">Detailed analysis of your requirements and goals</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <Clock className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Timeline & Budget</h3>
                      <p className="text-sm text-gray-600">Realistic project timeline and cost estimation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <Zap className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Technology Recommendations</h3>
                      <p className="text-sm text-gray-600">Best tech stack for your specific needs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <Users className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Team Introduction</h3>
                      <p className="text-sm text-gray-600">Meet the experts who'll work on your project</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">100% Free</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    No strings attached. Get expert advice and project insights at no cost.
                  </p>
                  <div className="text-3xl font-bold text-gray-600 mb-1">$0</div>
                  <div className="text-sm text-gray-500 mb-4">Usually $200 value</div>
                  <div className="text-xs text-gray-600 font-medium bg-gray-200 px-2 py-1 rounded-full">
                    Limited Time Offer
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Tell Us About Your Project</CardTitle>
                  <CardDescription className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" noValidate onSubmit={(e) => e.preventDefault()}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-gray-900 font-medium">
                          First Name *
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="block text-gray-900 font-medium">
                          Last Name *
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-gray-900 font-medium">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="block text-gray-900 font-medium">
                        Company Name
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Your Company"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-gray-900 font-medium">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="projectType" className="block text-gray-900 font-medium">
                        Project Type *
                      </label>
                      <select
                        id="projectType"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
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
                      <label htmlFor="budget" className="block text-gray-900 font-medium">
                        Project Budget
                      </label>
                      <select
                        id="budget"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-10k">Under $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="over-100k">Over $100,000</option>
                        <option value="discuss">Let's discuss</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="timeline" className="block text-gray-900 font-medium">
                        Desired Timeline
                      </label>
                      <select
                        id="timeline"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
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
                      <label htmlFor="description" className="block text-gray-900 font-medium">
                        Project Description *
                      </label>
                      <textarea
                        id="description"
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        id="newsletter"
                        type="checkbox"
                        className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                      />
                      <label htmlFor="newsletter" className="text-sm text-gray-600">
                        I'd like to receive updates about new services and industry insights
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        id="terms"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the terms of service and privacy policy *
                      </label>
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-gray-900 hover:bg-gray-800 text-white focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                      Schedule My Free Consultation
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Questions? Email us at{" "}
                              <a href="mailto:hello@codenis.com" className="text-gray-900 font-medium hover:underline">
                  hello@codenis.com
              </a>{" "}
              or call{" "}
              <a href="tel:+15551234567" className="text-gray-900 font-medium hover:underline">
                +1 (555) 123-4567
              </a>
            </p>
            <p className="text-sm text-gray-500">
              We typically respond within 2-4 hours during business hours (9 AM - 6 PM EST)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
