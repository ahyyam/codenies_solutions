import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';

import { Poppins, Merriweather } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-merriweather',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Codenies Solutions',
  description: 'Software Agency',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'icon', url: '/favicon.png' },
    { rel: 'apple-touch-icon', url: '/favicon.png' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${merriweather.variable} antialiased`}>
        <Header/>
        {children}
        <Footer />
      </body>
    </html>
  );
}

