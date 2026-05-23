import { Suspense } from 'react';
import RegisterClient from './RegisterClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Register page
function RegisterLoading() {
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

// ToyMart Register Page SEO Metadata
export const metadata = {
  title: "Create Account | Join ToyMart - Bangladesh's Best Kids Toy Store",
  description: "Create your ToyMart account today! Get 10% OFF on first purchase, track orders, save wishlist, and access exclusive toy deals. Join 5,000+ happy families in Bangladesh.",
  keywords: [
    // Registration specific
    "create account toymart",
    "sign up toy store bd",
    "register kids toys bangladesh",
    "toymart account creation",
    "new customer registration",
    
    // Benefits
    "first purchase discount toys",
    "toy membership benefits",
    "kids toy club bd",
    "toy loyalty program",
    "exclusive toy deals members",
    
    // Account features
    "track toy orders online",
    "save favorite toys",
    "toy wishlist account",
    "fast checkout toys",
    "toy purchase history",
    
    // User intent
    "join toy community bd",
    "become toy member",
    "sign up for toy deals",
    "create kids account bd",
    "register for toy shopping",
    
    // Trust signals
    "safe toy shopping account",
    "secure registration toys",
    "verified toy store bd",
    "trusted kids store"
  ],
  openGraph: {
    title: "Join ToyMart - Create Your Kids Toy Account | Bangladesh",
    description: "Sign up for ToyMart and get 10% OFF on your first toy purchase! Shop educational toys, RC cars, dolls & more. Free delivery & COD available.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/register' || 'https://toymart.com.bd/register',
    siteName: "ToyMart",
    images: [
      {
        url: '/register-og.jpg',
        width: 1200,
        height: 630,
        alt: 'ToyMart Register - Join 5,000+ Happy Families',
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
    title: "Join ToyMart - Create Your Account | Kids Toy Store Bangladesh",
    description: "Get 10% OFF on first purchase! Track orders, save favorites, and get exclusive toy deals. Join 5,000+ happy families today!",
    images: ['/register-twitter.jpg'],
  },
  alternates: {
    canonical: '/register',
    languages: {
      'en': '/register',
      'bn': '/bn/register',
    },
  },
  robots: {
    index: false,  // Registration pages should not be indexed
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
    'application-name': 'ToyMart Registration',
    'msapplication-TileColor': '#FF6B35',
    'theme-color': '#FF6B35',
    'page-type': 'registration',
    'user-action': 'signup',
    'offer': '10% off first purchase',
  },
};

// Server component with Suspense
export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterLoading />}>
      <RegisterClient />
    </Suspense>
  );
}