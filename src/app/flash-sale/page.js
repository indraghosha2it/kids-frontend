import { Suspense } from 'react';
import FlashSaleClient from './FlashSaleClient';

// Loading fallback component for Flash Sale page
function FlashSaleLoading() {
  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
        {/* Loading Skeleton - Flash Sale themed */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-5">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl border-2 border-[#FFE0E6] overflow-hidden animate-pulse shadow-md">
              <div className="h-32 sm:h-40 bg-gradient-to-br from-gray-100 to-gray-200"></div>
              <div className="p-2 sm:p-3">
                <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-5 sm:h-6 bg-gray-200 rounded mb-2 w-1/2"></div>
                <div className="h-2 sm:h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 sm:h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ToyMart Flash Sale SEO Metadata
export const metadata = {
  title: "Flash Sale | Up to 70% OFF on Kids Toys | ToyMart Bangladesh",
  description: "Limited time flash sale on kids toys at ToyMart Bangladesh. Get up to 70% OFF on educational toys, RC cars, dolls, outdoor toys & more. Hurry, stocks are limited! ✓COD ✓bKash/Nagad",
  keywords: [
    // Flash Sale specific
    "toy flash sale bangladesh",
    "kids toys discount bd",
    "toymart sale",
    "limited time offer toys",
    "toy clearance sale dhaka",
    
    // Discount keywords
    "cheap toys online bd",
    "toy price drop",
    "kids toys under 500 taka",
    "best toy deals bangladesh",
    "toy discount offer",
    
    // Product categories on sale
    "educational toys on sale",
    "rc cars discount bd",
    "dolls price drop",
    "outdoor toys sale",
    "montessori toys offer",
    "stem kits discounted",
    "baby toys clearance",
    
    // Urgency keywords
    "today only offer",
    "limited stock toys",
    "flash sale toys bd",
    "midnight sale toys",
    "weekend toy sale",
    
    // Shopping intent
    "buy discounted toys online",
    "cheapest toy store bd",
    "toy sale near me",
    "online toy offer bangladesh"
  ],
  openGraph: {
    title: "⚡ Flash Sale - Up to 70% OFF on Kids Toys | ToyMart Bangladesh",
    description: "Limited time flash sale! Get amazing discounts on educational toys, RC cars, dolls, outdoor toys & more. Free delivery on orders over ৳2000. COD & bKash/Nagad accepted.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/flash-sale' || 'https://toymart.com.bd/flash-sale',
    siteName: "ToyMart",
    images: [
      {
        url: '/flash-sale-og.jpg',
        width: 1200,
        height: 630,
        alt: 'ToyMart Flash Sale - Up to 70% OFF on Kids Toys',
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
    title: "⚡ Flash Sale - Up to 70% OFF | ToyMart Bangladesh",
    description: "Limited time offers on educational toys, RC cars, dolls & more. Shop now before stocks run out! COD & bKash/Nagad available.",
    images: ['/flash-sale-twitter.jpg'],
  },
  alternates: {
    canonical: '/flash-sale',
    languages: {
      'en': '/flash-sale',
      'bn': '/bn/flash-sale',
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
    'application-name': 'ToyMart Flash Sale',
    'msapplication-TileColor': '#FF6B35',
    'theme-color': '#FF6B35',
    'price-range': '200-20000 BDT',
    'sale-end-date': 'Limited Time Offer',
    'offer-category': 'Flash Sale, Clearance, Limited Time',
  },
};

// Server component with Suspense
export default function FlashSalePage() {
  return (
    <Suspense fallback={<FlashSaleLoading />}>
      <FlashSaleClient />
    </Suspense>
  );
}