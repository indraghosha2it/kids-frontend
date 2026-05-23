import { Suspense } from 'react';
import CheckoutClient from './CheckoutClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Checkout page
function CheckoutLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FFF9F0] pt-20 sm:pt-24">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// ToyMart Checkout Page SEO Metadata
export const metadata = {
  title: "Secure Checkout | Complete Your Toy Order ",
  description: "Secure checkout for your kids toys at ToyMart Bangladesh. ✓ Cash on Delivery ✓ bKash/Nagad ✓ Credit Card ✓ Free delivery on first orders. Complete your purchase safely.",
  keywords: [
    // Checkout specific
    "secure checkout bangladesh",
    "toy checkout page",
    "complete order toys bd",
    "toymart checkout",
    "payment checkout toys",
    
    // Payment methods
    "cash on delivery checkout",
    "bkash payment online",
    "nagad payment gateway",
    "credit card payment toys",
    "online payment bd",
    
    // Customer info
    "shipping address bd",
    "delivery information toys",
    "billing details kids toys",
    "order confirmation bd",
    
    // Order summary
    "review order before payment",
    "toy cart checkout",
    "finalize purchase toys",
    "place order kids toys",
    
    // Security
    "secure payment bd",
    "safe online shopping toys",
    "encrypted checkout",
    "ssl commerce payment",
    
    // Delivery
    "free delivery on toys",
    "home delivery bd",
    "toy shipping charges",
    "delivery inside dhaka",
    "delivery outside dhaka",
    
    // Coupon & discount
    "toy coupon code",
    "discount on toys bd",
    "promo code kids toys",
    "offer on toy purchase",
    
    // Trust signals
    "7 day return policy",
    "secure toy shopping",
    "verified checkout"
  ],
  openGraph: {
    title: "Secure Checkout - ToyMart | Complete Your Kids Toy Order",
    description: "Safe and secure checkout for your toy purchase. Pay with Cash on Delivery, bKash, Nagad, or Credit Card. Free delivery available on first orders.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/checkout' || 'https://toymart.com.bd/checkout',
    siteName: "ToyMart",
    images: [
      {
        url: '/checkout-og.jpg',
        width: 1200,
        height: 630,
        alt: 'ToyMart Secure Checkout - Complete Your Toy Order',
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
    title: "Secure Checkout | ToyMart Bangladesh",
    description: "Complete your toy purchase securely. COD, bKash, Nagad, and Credit Card accepted. Free delivery on first orders.",
    images: ['/checkout-twitter.jpg'],
  },
  alternates: {
    canonical: '/checkout',
    languages: {
      'en': '/checkout',
      'bn': '/bn/checkout',
    },
  },
  robots: {
    index: false,  // Checkout pages should not be indexed by search engines
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // Additional metadata for better SEO
  other: {
    'application-name': 'ToyMart Checkout',
    'msapplication-TileColor': '#FF6B35',
    'theme-color': '#FF6B35',
    'page-type': 'checkout',
    'user-action': 'complete-purchase',
    'payment-methods': 'cod,bkash,nagad,credit-card',
    'secure-checkout': 'true',
  },
};

// Server component with Suspense
export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutClient />
    </Suspense>
  );
}