import { Suspense } from 'react';
import LoginClient from './LoginClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Login page
function LoginLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#4F9DFF]/10 via-[#FF7B54]/5 to-[#FFD93D]/10 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
      </div>
      <Footer />
    </>
  );
}

// ToyMart Login Page SEO Metadata
export const metadata = {
  title: "Login to ToyMart | Sign In for Best Kids Toys in Bangladesh",
  description: "Login to your ToyMart account to shop educational toys, RC cars, dolls, and more. Track orders, save wishlist, and get exclusive deals. New users get 10% OFF on first purchase!",
  keywords: [
    // Login specific
    "login toymart",
    "sign in toy store bd",
    "customer login bangladesh",
    "toymart account access",
    "member login toys",
    
    // Account related
    "my toy account",
    "toy shopping login",
    "kids toy account bd",
    "educational toys login",
    "toymart member sign in",
    
    // Benefits
    "track toy orders",
    "save wishlist login",
    "exclusive toy deals",
    "toy discount for members",
    "first purchase discount",
    
    // Authentication
    "secure login toys",
    "toy store authentication",
    "online toy shop login bd",
    "toymart customer portal",
    
    // User intent
    "access my toy account",
    "login to buy toys online",
    "toy shopping account bd",
    "kids store sign in"
  ],
  openGraph: {
    title: "Login to ToyMart - Your Kids Toy Account | Bangladesh",
    description: "Sign in to your ToyMart account to shop educational toys, RC cars, dolls, outdoor toys & more. New users get 10% OFF on first purchase! ✓COD ✓bKash/Nagad",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/login' || 'https://toymart.com.bd/login',
    siteName: "ToyMart",
    images: [
      {
        url: '/login-og.jpg',
        width: 1200,
        height: 630,
        alt: 'ToyMart Login - Sign in to Your Kids Toy Account',
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
    title: "Login to ToyMart | Kids Toy Store Bangladesh",
    description: "Sign in to access your toy account, track orders, save favorites, and get exclusive member deals!",
    images: ['/login-twitter.jpg'],
  },
  alternates: {
    canonical: '/login',
    languages: {
      'en': '/login',
      'bn': '/bn/login',
    },
  },
  robots: {
    index: false,  // Login pages should not be indexed
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // Additional metadata
  other: {
    'application-name': 'ToyMart Login',
    'msapplication-TileColor': '#FF6B35',
    'theme-color': '#FF6B35',
    'page-type': 'login',
    'user-action': 'authentication',
  },
};

// Server component with Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginClient />
    </Suspense>
  );
}