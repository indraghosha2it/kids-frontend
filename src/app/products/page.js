



// import { Suspense } from 'react';
// import ProductsClient from './ProductsClient';

// // Loading fallback component
// function ProductsLoading() {
//   return (
//     <div className="min-h-screen bg-[#FAF7F2]">
//       <div className="mt-16 container mx-auto px-4 max-w-7xl py-6 md:py-8">
//         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//           {[...Array(12)].map((_, index) => (
//             <div key={index} className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-[#F5E6D3] animate-pulse">
//               <div className="h-36 sm:h-52 bg-gray-200"></div>
//               <div className="p-2 sm:p-5">
//                 <div className="h-3 sm:h-6 bg-gray-200 rounded mb-1 sm:mb-2"></div>
//                 <div className="h-4 sm:h-8 bg-gray-200 rounded mb-1 sm:mb-3 w-1/2"></div>
//                 <div className="h-2 sm:h-4 bg-gray-200 rounded mb-2 sm:mb-4"></div>
//                 <div className="h-6 sm:h-10 bg-gray-200 rounded"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export const metadata = {
//   title: "Premium Jute Products - Eco-Friendly",
//   description: "Browse our extensive collection of premium jute products. Raw jute fiber, jute bags, home decor, industrial products. Bulk orders available for global buyers. Wholesale pricing.",
//   keywords: [
//     "jute products", 
//     "jute bags wholesale", 
//     "raw jute fiber", 
//     "jute home decor", 
//     "eco-friendly products", 
//     "sustainable jute", 
//     "bulk jute order", 
//     "jute supplier Bangladesh",
//     "jute yarn",
//     "jute twine",
//     "jute rugs",
//     "jute mats",
//     "industrial jute",
//     "woven jute products"
//   ],
//   openGraph: {
//     title: "Premium Jute Products Collection - Jute Craftify",
//     description: "Explore our sustainable jute product collection. Raw materials, finished goods, and custom manufacturing for bulk buyers.",
//     images: ['/products-og.jpg'],
//     type: 'website',
//     locale: 'en_US',
//     siteName: 'Jute Craftify',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: "Jute Craftify Products - Eco-Friendly Jute Collection",
//     description: "Browse our premium jute products. Available for bulk orders worldwide.",
//     images: ['/products-og.jpg'],
//   },
//   alternates: {
//     canonical: '/products',
//   },
// };

// // Server component with Suspense
// export default function ProductsPage() {
//   return (
//     <Suspense fallback={<ProductsLoading />}>
//       <ProductsClient />
//     </Suspense>
//   );
// }


import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

// Loading fallback component for ToyMart products page
function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
        {/* Loading Skeleton - ToyMart themed */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {[...Array(12)].map((_, index) => (
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

// ToyMart - Kids Toy E-commerce SEO Metadata
export const metadata = {
  title: "Shop All Kids Toys | Educational Toys, RC Cars & More ",
  description: "Browse 1000+ toys for kids of all ages at ToyMart Bangladesh. ✓ Educational toys ✓ Montessori materials ✓ STEM kits ✓ RC cars ✓ Outdoor toys ✓ Dolls. Best prices with COD & bKash/Nagad payment.",
  keywords: [
    // Primary keywords
    "buy toys online bangladesh",
    "kids toys shop dhaka",
    "toymart products",
    "best toys for children bd",
    
    // Educational Toys
    "educational toys bangladesh",
    "montessori toys price in bd",
    "stem kits for kids",
    "puzzle games for children",
    "alphabet learning toys",
    "math toys for kids",
    "science experiment kits bangladesh",
    
    // Baby Toys
    "baby toys online bd",
    "soft toys bangladesh",
    "rattles for babies",
    "musical toys for infants",
    "bath toys set",
    
    // Trending Toys
    "rc cars price in bangladesh",
    "drones for kids bd",
    "led light up toys",
    "dancing cactus toy bangladesh",
    "fidget toys dhaka",
    "anime action figures bd",
    
    // Creative Toys
    "lego blocks bangladesh",
    "art and craft kits for kids",
    "drawing board price bd",
    "clay modeling set",
    "diy craft kits",
    
    // Outdoor Toys
    "kids cycle bangladesh",
    "scooter for children",
    "football kit for kids",
    "mini basketball hoop",
    
    // Gender Specific
    "doll house bangladesh",
    "barbie doll price bd",
    "pretend play makeup",
    "kitchen play set",
    "superhero toys bd",
    "car toy collection",
    "action figures for boys",
    "robot toys bangladesh",
    
    // Shopping intent
    "online toy store bd",
    "cheap toys online dhaka",
    "kids toy prices",
    "original branded toys bangladesh",
    "toy gift for kids"
  ],
  openGraph: {
    title: "ToyMart Products - Bangladesh's Largest Collection of Kids Toys",
    description: "Shop educational toys, Montessori materials, STEM kits, RC cars, outdoor toys, dolls, and more. Free delivery across Bangladesh. COD and bKash/Nagad accepted.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/products' || 'https://toymart.com.bd/products',
    siteName: "ToyMart",
    images: [
      {
        url: '/products-og-toymart.jpg',
        width: 1200,
        height: 630,
        alt: 'ToyMart Kids Toy Collection - Educational Toys, RC Cars, Dolls & More',
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
    title: "ToyMart Products - Best Kids Toys in Bangladesh",
    description: "Shop 1000+ toys: educational, Montessori, STEM, RC cars, outdoor, dolls. COD & bKash/Nagad available. Free delivery on orders over ৳2000.",
    images: ['/products-twitter-toymart.jpg'],
  },
  alternates: {
    canonical: '/products',
    languages: {
      'en': '/products',
      'bn': '/bn/products',
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
    'application-name': 'ToyMart Products',
    'msapplication-TileColor': '#FF6B35',
    'theme-color': '#FF6B35',
    'price-range': '200-20000 BDT',
    'target-audience': 'Parents, Children, Gift Buyers',
    'product-category': 'Kids Toys, Educational Toys, Baby Products',
  },
};

// Server component with Suspense for ToyMart products page
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsClient />
    </Suspense>
  );
}