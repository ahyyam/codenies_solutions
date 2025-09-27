import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Shield, Users, CreditCard, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - codenies',
  description: 'Terms and conditions governing the use of codenies services and website.',
  keywords: ['terms of service', 'legal', 'conditions', 'codenies solutions'],
  openGraph: {
    title: 'Terms of Service - codenies',
    description: 'Terms and conditions governing the use of codenies services and website.',
    type: 'website',
  },
};

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-24 lg:pt-20 px-4 pb-16 bg-white border-b" aria-labelledby="terms-hero-heading">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex justify-center mb-6">
            <FileText className="h-16 w-16 text-primary" />
          </div>
          <h1 id="terms-hero-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Terms of Service
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Please read these terms carefully before using our services
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-4" aria-labelledby="terms-content">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm border p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Acceptance of Terms
                </h2>
                <p className="text-gray-700 mb-4">
                  By accessing and using the services provided by Codenies Solutions ("Company," "we," "us," or "our"), 
                  you accept and agree to be bound by the terms and provision of this agreement.
                </p>
                <p className="text-gray-700">
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Description of Service
                </h2>
                <p className="text-gray-700 mb-4">
                  Codenies Solutions provides software development services including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Custom software development</li>
                  <li>Web application development</li>
                  <li>Mobile application development</li>
                  <li>UI/UX design services</li>
                  <li>AI integration services</li>
                  <li>Consultation and technical advisory</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-primary" />
                  Payment Terms
                </h2>
                <p className="text-gray-700 mb-4">
                  Payment terms will be specified in individual project agreements. Generally:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Projects require a deposit before work begins</li>
                  <li>Payment schedules are project-specific</li>
                  <li>All fees are non-refundable unless otherwise specified</li>
                  <li>Late payments may incur additional charges</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                  Intellectual Property
                </h2>
                <p className="text-gray-700 mb-4">
                  Intellectual property rights are governed by individual project agreements:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Client retains ownership of existing intellectual property</li>
                  <li>New intellectual property ownership is project-specific</li>
                  <li>Company retains rights to reusable components and frameworks</li>
                  <li>Open source licenses apply where applicable</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Confidentiality</h2>
                <p className="text-gray-700 mb-4">
                  Both parties agree to maintain the confidentiality of proprietary information shared during the course of business.
                </p>
                <p className="text-gray-700">
                  This includes but is not limited to business plans, technical specifications, and client data.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  Codenies Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
                </p>
                <p className="text-gray-700">
                  Our total liability shall not exceed the amount paid by the client for the specific service in question.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
                <p className="text-gray-700 mb-4">
                  Either party may terminate this agreement with written notice:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>For material breach of terms</li>
                  <li>With 30 days written notice</li>
                  <li>Immediate termination for illegal activities</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
                <p className="text-gray-700">
                  This agreement shall be governed by and construed in accordance with the laws of the jurisdiction 
                  where Codenies Solutions is incorporated, without regard to conflict of law principles.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
                <p className="text-gray-700">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately 
                  upon posting on our website. Continued use of our services constitutes acceptance of modified terms.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> hello@codenies.com<br />
                    <strong>Address:</strong> Codenies Solutions<br />
                    <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="border-t pt-8">
                <p className="text-sm text-gray-600 text-center">
                  By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;
