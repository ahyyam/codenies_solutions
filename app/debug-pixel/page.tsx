'use client';

import { useEffect } from 'react';

export default function MetaPixelTest() {
  useEffect(() => {
    // Debug environment variables
    console.log('🔍 Environment Variables Debug:');
    console.log('NEXT_PUBLIC_META_PIXEL_ID:', process.env.NEXT_PUBLIC_META_PIXEL_ID);
    console.log('NEXT_PUBLIC_GA_MEASUREMENT_ID:', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
    
    // Check if fbq is available
    if (typeof window !== 'undefined') {
      console.log('🔍 Window.fbq available:', typeof window.fbq);
      if (window.fbq) {
        console.log('🔍 Window.fbq function:', window.fbq);
        console.log('🔍 Window.fbq.q queue:', window.fbq.q);
      }
    }
  }, []);

  const testPixel = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      console.log('🧪 Testing Meta Pixel manually...');
      window.fbq('track', 'Lead', {
        content_name: 'Test Lead',
        content_category: 'Test'
      });
      console.log('✅ Meta Pixel test event sent');
    } else {
      console.log('❌ Meta Pixel not available for testing');
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Meta Pixel Debug Page</h1>
        
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Meta Pixel ID:</strong> {process.env.NEXT_PUBLIC_META_PIXEL_ID || 'Not set'}</p>
              <p><strong>GA Measurement ID:</strong> {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'Not set'}</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Meta Pixel Status</h2>
            <div className="space-y-2">
              <p className="text-sm">Check the browser console for debug messages</p>
              <button 
                onClick={testPixel}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Test Meta Pixel Event
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Troubleshooting Steps</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Check browser console for debug messages</li>
              <li>Verify .env file has NEXT_PUBLIC_META_PIXEL_ID=1944820842752519</li>
              <li>Restart the development server after changing .env</li>
              <li>Check Facebook Pixel Helper browser extension</li>
              <li>Verify the pixel ID in Facebook Business Manager</li>
            </ol>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Fixes</h2>
            <div className="space-y-2 text-sm">
              <p><strong>1. Create .env file:</strong></p>
              <code className="block bg-gray-100 p-2 rounded text-xs">
                cp env.example .env
              </code>
              
              <p><strong>2. Restart server:</strong></p>
              <code className="block bg-gray-100 p-2 rounded text-xs">
                npm run dev
              </code>
              
              <p><strong>3. Check console:</strong></p>
              <p>Open browser DevTools → Console tab</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
