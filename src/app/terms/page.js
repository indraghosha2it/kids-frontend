import { Suspense } from 'react';
import TermsClient from './TermsClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Terms page
function TermsLoading() {
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

// ToyMart Terms & Conditions Page SEO Metadata
export const metadata = {
  title: "Terms & Conditions ",
  description: "Read ToyMart's terms and conditions for online toy purchases in Bangladesh. Learn about pricing, shipping, returns, warranty, and legal policies for kids toys.",
  keywords: [
    // Legal terms specific
    "terms and conditions toymart",
    "toy store legal terms bd",
    "kids toys purchase terms",
    "toymart policies",
    "online toy store terms bangladesh",
    
    // Purchase terms
    "toy purchase agreement",
    "kids products terms bd",
    "toymart return policy",
    "toy warranty terms",
    "refund policy toys",
    
    // Shipping terms
    "toy delivery terms",
    "shipping policy toys bd",
    "cod terms toys",
    "toymart shipping policy",
    
    // Payment terms
    "toy payment terms",
    "bkash payment policy",
    "nagad payment terms",
    "toy pricing policy",
    
    // Legal compliance
    "toy safety compliance",
    "consumer rights toys bd",
    "product liability toys",
    "toymart legal information",
    
    // Account terms
    "user account terms",
    "customer agreement toys",
    "toymart account policy"
  ],
  openGraph: {
    title: "Terms & Conditions - ToyMart | Legal Information for Toy Purchases",
    description: "Review ToyMart's complete terms and conditions. Understand our policies on pricing, shipping, returns, warranty, and customer responsibilities.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/terms' || 'https://toymart.com.bd/terms',
    siteName: "ToyMart",
    images: [
      {
        url: '/terms-og.jpg',
        width: 1200,
        height: 630,
        alt: 'ToyMart Terms & Conditions - Legal Information',
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
    title: "Terms & Conditions | ToyMart",
    description: "Read ToyMart's terms for online toy purchases in Bangladesh. Pricing, shipping, returns, warranty information.",
    images: ['/terms-twitter.jpg'],
  },
  alternates: {
    canonical: '/terms',
    languages: {
      'en': '/terms',
      'bn': '/bn/terms',
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
  // Terms page specific metadata
  other: {
    'application-name': 'ToyMart Terms',
    'msapplication-TileColor': '#FF6B35',
    'theme-color': '#FF6B35',
    'page-type': 'legal-terms',
    'last-updated': '2024-01-01',
    'jurisdiction': 'Bangladesh',
    'legal-entity': 'ToyMart BD',
  },
};

// Server component with Suspense
export default function TermsPage() {
  return (
    <Suspense fallback={<TermsLoading />}>
      <TermsClient />
    </Suspense>
  );
}