import { Suspense } from 'react';
import AboutClient from './AboutClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for About page
function AboutLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#4A8A90] via-[#6CB4B8] to-[#FFB6C1] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-white/20 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-white/20 rounded mx-auto animate-pulse"></div>
          <div className="h-4 w-64 bg-white/20 rounded mx-auto mt-3 animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// ToyMart About Us Page SEO Metadata
export const metadata = {
  title: "About ToyMart | Bangladesh's Most Trusted Kids Toy Store",
  description: "Learn about ToyMart - Bangladesh's premier online toy store. We provide safe, educational, and fun toys for kids of all ages. Our mission is to bring joy and learning to every child.",
  keywords: [
    // About us specific
    "about toymart",
    "toy store bangladesh history",
    "kids toy company bd",
    "toymart story",
    "bangladesh toy shop about",
    
    // Mission & values
    "toy company mission",
    "educational toy values",
    "safe toys bangladesh",
    "child development toys",
    "learning through play bd",
    
    // Trust signals
    "why choose toymart",
    "trusted toy store bd",
    "parent approved toys",
    "certified safe toys",
    "quality toys bangladesh",
    
    // Team & milestones
    "toymart team",
    "toy company milestones",
    "toy shop journey bd",
    "bangladesh toy industry",
    
    // Company info
    "online toy store about",
    "kids product company bd",
    "toy retailer bangladesh",
    "children's toy store dhaka",
    
    // Social proof
    "happy kids bangladesh",
    "parent satisfaction toys",
    "toymart reviews",
    "customer trust toys bd"
  ],
  openGraph: {
    title: "About ToyMart - Our Story | Trusted Kids Toy Store Bangladesh",
    description: "Discover the ToyMart story. We're on a mission to bring joy, spark imagination, and create magical moments for children across Bangladesh with safe, educational toys.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/about' || 'https://toymart.com.bd/about',
    siteName: "ToyMart",
    images: [
      {
        url: '/about-og.jpg',
        width: 1200,
        height: 630,
        alt: 'About ToyMart - Bangladesh\'s Most Trusted Kids Toy Store',
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
    title: "About ToyMart | Kids Toy Store Bangladesh",
    description: "Learn about our mission to bring joy and learning to every child through safe, educational toys. Join 50,000+ happy families!",
    images: ['/about-twitter.jpg'],
  },
  alternates: {
    canonical: '/about',
    languages: {
      'en': '/about',
      'bn': '/bn/about',
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
  // Additional metadata
  other: {
    'application-name': 'ToyMart About',
    'msapplication-TileColor': '#FF6B35',
    'theme-color': '#FF6B35',
    'page-type': 'about-us',
    'business-type': 'ecommerce-toy-store',
    'founded-year': '2020',
    'headquarters': 'Dhaka, Bangladesh',
    'service-area': 'Nationwide Delivery',
  },
};

// Server component with Suspense
export default function AboutPage() {
  return (
    <Suspense fallback={<AboutLoading />}>
      <AboutClient />
    </Suspense>
  );
}