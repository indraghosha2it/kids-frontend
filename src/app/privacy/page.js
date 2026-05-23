import { Suspense } from 'react';
import PrivacyClient from './PrivacyClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Privacy page
function PrivacyLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#4A8A90]/20 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-[#4A8A90]/20 rounded mx-auto animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// ToyMart Privacy Policy Page SEO Metadata
export const metadata = {
  title: "Privacy Policy | How We Protect Your Data",
  description: "Read ToyMart's privacy policy to understand how we collect, use, and protect your personal information. Learn about cookies, data security, and your privacy rights.",
  keywords: [
    // Privacy policy specific
    "privacy policy toymart",
    "toy store privacy policy bd",
    "kids toys data protection",
    "toymart privacy practices",
    "online toy store privacy bangladesh",
    
    // Data collection
    "personal information collection",
    "customer data protection",
    "toy purchase privacy",
    "shopping data security",
    
    // Security measures
    "ssl encryption toys",
    "secure payment toys bd",
    "data security kids store",
    "toymart security policy",
    
    // User rights
    "data access rights",
    "delete my data toys",
    "opt out marketing toys",
    "gdpr compliance bd",
    
    // Cookies & tracking
    "cookie policy toys",
    "website tracking bd",
    "analytics privacy toys",
    
    // Children's privacy
    "children data protection",
    "kids online privacy",
    "parental consent toys",
    "under 13 privacy bd",
    
    // Legal compliance
    "data protection bangladesh",
    "privacy compliance toys",
    "ccpa rights bd",
    "gdpr rights customers"
  ],
  openGraph: {
    title: "Privacy Policy - ToyMart | Your Data Protection & Privacy Rights",
    description: "Learn how ToyMart protects your personal information. We're committed to transparent data practices, secure payments, and respecting your privacy rights.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/privacy' || 'https://toymart.com.bd/privacy',
    siteName: "ToyMart",
    images: [
      {
        url: '/privacy-og.jpg',
        width: 1200,
        height: 630,
        alt: 'ToyMart Privacy Policy - Your Data Protection',
      },
    ],
    type: 'website',
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ToyMartBD',
    creator: '@ToyMartBD',
    title: "Privacy Policy | ToyMart",
    description: "How we collect, use, and protect your personal information. Your privacy rights and data security explained.",
    images: ['/privacy-twitter.jpg'],
  },
  alternates: {
    canonical: '/privacy',
    languages: {
      'en': '/privacy',
      'bn': '/bn/privacy',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // Privacy page specific metadata
  other: {
    'application-name': 'ToyMart Privacy',
    'msapplication-TileColor': '#FF6B35',
    'theme-color': '#FF6B35',
    'page-type': 'privacy-policy',
    'privacy-policy-version': '1.0',
    'last-updated': '2024-01-01',
    'data-controller': 'ToyMart Bangladesh',
    'privacy-contact': 'privacy@toymart.com',
    'gdpr-compliant': 'true',
    'ccpa-compliant': 'true',
    'data-retention-period': '2 years',
    'cookie-policy': 'opt-in',
  },
};

// Server component with Suspense
export default function PrivacyPage() {
  return (
    <Suspense fallback={<PrivacyLoading />}>
      <PrivacyClient />
    </Suspense>
  );
}