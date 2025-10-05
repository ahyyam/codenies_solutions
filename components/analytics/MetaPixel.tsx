'use client';

import Script from 'next/script';
import { useEffect } from 'react';

interface MetaPixelProps {
  pixelId: string;
}

export function MetaPixel({ pixelId }: MetaPixelProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && pixelId) {
      console.log('🔍 Meta Pixel Debug - Initializing with ID:', pixelId);
      
      // Initialize Meta Pixel
      window.fbq = window.fbq || function() {
        (window.fbq.q = window.fbq.q || []).push(arguments);
      };
      
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
      
      console.log('✅ Meta Pixel Debug - Initialized and PageView tracked');
    } else {
      console.log('❌ Meta Pixel Debug - Missing pixelId:', pixelId);
    }
  }, [pixelId]);

  if (!pixelId) {
    console.log('❌ Meta Pixel Debug - No pixelId provided, component not rendering');
    return null;
  }

  console.log('🔍 Meta Pixel Debug - Rendering component with pixelId:', pixelId);

  return (
    <>
      <Script 
        id="meta-pixel" 
        strategy="afterInteractive"
        onLoad={() => {
          console.log('🔍 Meta Pixel Script - Script loaded successfully');
        }}
        onError={(e) => {
          console.error('❌ Meta Pixel Script - Error loading script:', e);
        }}
      >
        {`
          console.log('🔍 Meta Pixel Script - Starting initialization with ID: ${pixelId}');
          
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          
          console.log('🔍 Meta Pixel Script - Base script loaded, initializing...');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
          
          console.log('✅ Meta Pixel Script - Initialization complete');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// Declare fbq function for TypeScript
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    fbq: {
      (...args: any[]): void;
      q: any[];
    };
  }
}
