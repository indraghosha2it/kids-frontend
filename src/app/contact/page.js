import { Suspense } from 'react';
import ContactClient from './ContactClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Contact page
function ContactLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#4A8A90]/20 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-[#4A8A90]/20 rounded mx-auto animate-pulse"></div>
          <div className="h-4 w-64 bg-[#4A8A90]/20 rounded mx-auto mt-3 animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// ToyMart Contact Us Page SEO Metadata
export const metadata = {
  title: "Contact Us | Get in Touch with ToyMart - Kids Toy Store Bangladesh",
  description: "Contact ToyMart customer support for questions about toys, orders, delivery, or returns. Call, email, or visit us in Dhaka. We're here to help 24/7!",
  keywords: [
    // Contact specific
    "contact toymart",
    "toy store customer care bd",
    "kids toy support bangladesh",
    "toymart helpline",
    "customer service toys bd",
    
    // Contact methods
    "toy shop phone number",
    "toymart email address",
    "toy store location dhaka",
    "customer care number toys",
    "24/7 toy support bd",
    
    // Support inquiries
    "toy order help",
    "delivery support bangladesh",
    "toy return contact",
    "product inquiry toys",
    "toy warranty support",
    
    // Business inquiries
    "toy business contact",
    "wholesale toys inquiry",
    "toy supplier bangladesh",
    "partnership toys bd",
    
    // Social media
    "toymart facebook",
    "toymart instagram",
    "toy store social media",
    
    // Location
    "toy store dhaka address",
    "kids shop gulshan",
    "toymart office location"
  ],
  openGraph: {
    title: "Contact ToyMart - We're Here to Help | Kids Toy Store Bangladesh",
    description: "Need help with your toy order? Have questions about our products? Contact our friendly customer support team via phone, email, or visit our Dhaka store.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/contact' || 'https://toymart.com.bd/contact',
    siteName: "ToyMart",
    images: [
      {
        url: '/contact-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact ToyMart - Customer Support for Kids Toys',
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
    title: "Contact ToyMart | Customer Support",
    description: "Questions about toys or orders? Contact our friendly team. Call, email, or visit us in Dhaka.",
    images: ['/contact-twitter.jpg'],
  },
  alternates: {
    canonical: '/contact',
    languages: {
      'en': '/contact',
      'bn': '/bn/contact',
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
  // Contact page specific metadata
  other: {
    'application-name': 'ToyMart Contact',
    'msapplication-TileColor': '#FF6B35',
    'theme-color': '#FF6B35',
    'page-type': 'contact-us',
    'contact-email': 'support@toymart.com',
    'contact-phone': '+8801234567890',
    'business-hours': 'Mon-Fri 9AM-8PM, Sat 10AM-6PM',
    'address-locality': 'Dhaka',
    'address-country': 'BD',
  },
};

// Server component with Suspense
export default function ContactPage() {
  return (
    <Suspense fallback={<ContactLoading />}>
      <ContactClient />
    </Suspense>
  );
}