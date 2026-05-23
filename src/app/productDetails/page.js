import { Suspense } from 'react';
import ProductDetailsClient from './ProductDetailsClient';

// Loading fallback component for ToyMart Product Details page
function ProductDetailsLoading() {
  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      <div className="container mx-auto px-4 max-w-7xl py-8 mt-16">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="bg-gray-200 rounded-2xl h-80 sm:h-96"></div>
              <div className="flex gap-2 mt-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded w-full"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ToyMart Product Details Page SEO Metadata
// Note: Since we're using static export with searchParams, 
// the dynamic metadata is handled client-side by MetadataUpdater component

export const metadata = {
  title: "Toy Details | Premium Kids Toys | ToyMart Bangladesh",
  description: "View detailed information about our premium kids toys. Educational toys, RC cars, dolls, outdoor toys and more. Safe, non-toxic, and age-appropriate toys for children.",
  keywords: [
    "toy details",
    "kids toy information",
    "product details toys",
    "toymart product",
    "buy toy online bd"
  ],
  openGraph: {
    title: "Toy Details - ToyMart | Premium Kids Toys Bangladesh",
    description: "View complete details of our premium quality kids toys. Safe, educational, and fun toys for children of all ages.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/productDetails' || 'https://toymart.com.bd/productDetails',
    siteName: "ToyMart",
    images: [
      {
        url: '/product-details-og.jpg',
        width: 1200,
        height: 630,
        alt: 'ToyMart Product Details',
      },
    ],
    type: 'website',
    locale: 'en_BD',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ToyMartBD',
    creator: '@ToyMartBD',
    title: "Toy Details | ToyMart Bangladesh",
    description: "View detailed product information for kids toys at ToyMart.",
    images: ['/product-details-twitter.jpg'],
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
};

// Main page component with Suspense for loading state
export default function ProductDetailsPage() {
  return (
    <Suspense fallback={<ProductDetailsLoading />}>
      <ProductDetailsClient />
    </Suspense>
  );
}