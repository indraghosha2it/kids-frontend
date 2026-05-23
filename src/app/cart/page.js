import { Suspense } from 'react';
import CartClient from './CartClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Loader2 } from 'lucide-react';

// Loading fallback component for Cart page
function CartLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FFF9F0] pt-20 sm:pt-24">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#4A8A90] animate-spin" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// ToyMart Cart Page SEO Metadata
export const metadata = {
  title: "Shopping Cart | Review Your Toys Before Checkout",
  description: "Review your selected toys in ToyMart shopping cart. Update quantities, remove items, and proceed to secure checkout. ✓COD ✓bKash/Nagad ✓Free Delivery on first orders.",
  keywords: [
    // Cart specific
    "shopping cart bangladesh",
    "toy cart review",
    "checkout toys bd",
    "toymart cart",
    "my toy cart",
    
    // Shopping intent
    "review order before checkout",
    "update cart quantity",
    "remove items from cart",
    "proceed to payment",
    "toy purchase summary",
    
    // Product categories in cart
    "educational toys cart",
    "rc cars in cart",
    "dolls shopping cart",
    "montessori toys cart",
    "stem kits checkout",
    "baby toys cart",
    
    // Payment related
    "cart total price",
    "checkout with cod",
    "bkash payment cart",
    "nagad checkout",
    "free delivery cart",
    
    // User action
    "edit cart items",
    "cart subtotal bd",
    "toy order summary",
    "finalize purchase toys"
  ],
  openGraph: {
    title: "My Shopping Cart - ToyMart | Review Your Kids Toys Order",
    description: "Review your selected toys, update quantities, and proceed to secure checkout. Free delivery available on first orders. Cash on Delivery & bKash/Nagad accepted.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/cart' || 'https://toymart.com.bd/cart',
    siteName: "ToyMart",
    images: [
      {
        url: '/cart-og.jpg',
        width: 1200,
        height: 630,
        alt: 'ToyMart Shopping Cart - Review Your Toys Before Checkout',
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
    title: "Shopping Cart | ToyMart Bangladesh",
    description: "Review your toy selection, update quantities, and proceed to checkout. Safe & secure shopping with COD and bKash/Nagad.",
    images: ['/cart-twitter.jpg'],
  },
  alternates: {
    canonical: '/cart',
    languages: {
      'en': '/cart',
      'bn': '/bn/cart',
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
  // Additional metadata for better SEO
  other: {
    'application-name': 'ToyMart Cart',
    'msapplication-TileColor': '#FF6B35',
    'theme-color': '#FF6B35',
    'page-type': 'shopping-cart',
    'user-action': 'review-checkout',
    'cart-status': 'active',
  },
};

// Server component with Suspense
export default function CartPage() {
  return (
    <Suspense fallback={<CartLoading />}>
      <CartClient />
    </Suspense>
  );
}