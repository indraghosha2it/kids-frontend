
// // app/layout.js
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { Toaster } from "sonner";
// import LayoutContent from "./components/layout/LayoutContent";

// import ScrollToTop from "./components/layout/ScrollToTop";
// import PromotionalModalWrapper from "./components/PromotionalModalWrapper";
// import NewsletterPopup from "./components/NewsletterPopup";
// import UnifiedPopupManager from "./components/UnifiedPopupManager";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// // Default metadata for ToyMart - Kids Toy E-commerce Website
// export const metadata = {
//   title: {
//     default: "ToyMart | Bangladesh's Best Kids Toy Store - Educational & Fun Toys",
//     template: "%s | ToyMart"
//   },
//   description: "ToyMart - Bangladesh's premier kids toy e-commerce website. Shop educational toys, Montessori toys, STEM kits, RC cars, outdoor toys, and more. Free delivery & COD available.",
//   keywords: [
//     // Educational Toys
//     "educational toys Bangladesh",
//     "Montessori toys",
//     "STEM kits",
//     "puzzle games",
//     "alphabet learning toys",
//     "math learning toys",
//     "science experiment kits",
    
//     // Baby Toys
//     "baby toys Bangladesh",
//     "soft toys",
//     "rattles",
//     "musical toys",
//     "bath toys",
    
//     // Trending Toys
//     "RC cars Bangladesh",
//     "drones for kids",
//     "LED toys",
//     "dancing cactus toy",
//     "fidget toys",
//     "anime toys Bangladesh",
    
//     // Creative Toys
//     "LEGO blocks",
//     "art kits for kids",
//     "drawing boards",
//     "clay sets",
//     "DIY kits",
    
//     // Outdoor Toys
//     "kids bicycle Bangladesh",
//     "scooter for kids",
//     "football kit",
//     "mini basketball set",
    
//     // Gender Specific
//     "doll house",
//     "Barbie dolls",
//     "makeup toys",
//     "kitchen play set",
//     "superhero figures",
//     "car collections",
//     "action toys",
//     "robot toys",
    
//     // General
//     "online toy store Bangladesh",
//     "kids toys",
//     "best toys for children",
//     "toy shop BD"
//   ],
//   authors: [{ name: "ToyMart" }],
//   creator: "ToyMart",
//   publisher: "ToyMart",
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
//   metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
//   alternates: {
//     canonical: '/',
//   },
//   openGraph: {
//     title: "ToyMart - Bangladesh's Largest Kids Toy Store | Educational & Fun Toys",
//     description: "Shop thousands of toys for kids of all ages at ToyMart. Educational toys, RC cars, outdoor toys, dolls, and more. Best prices in Bangladesh with COD and bKash payment.",
//     url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
//     siteName: "ToyMart",
//     images: [
//       {
//         url: '/og-image.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'ToyMart - Best Kids Toy Store in Bangladesh',
//       },
//     ],
//     locale: 'en_US',
//     type: 'website',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: "ToyMart - Kids Toy Store Bangladesh",
//     description: "Best educational toys, RC cars, outdoor toys, and more. Free delivery & COD available across Bangladesh.",
//     images: ['/og-image.jpg'],
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
//   verification: {
//     google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
//   },
//   category: "ecommerce",
//   classification: "Kids Toy E-commerce Platform",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" data-scroll-behavior="smooth" data-theme="light" style={{ colorScheme: 'light' }}>
//       <head>
//         <meta name="color-scheme" content="light only" />
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//         <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
//         <meta name="theme-color" content="#FF6B35" />
//         <meta name="description" content="ToyMart - Bangladesh's best online toy store. Shop educational toys, RC cars, dolls, outdoor toys & more. Free delivery, COD, bKash/Nagad payment." />
//         <style>{`
//           :root {
//             color-scheme: light only;
//             --primary-color: #FF6B35;
//             --secondary-color: #FFB347;
//             --accent-color: #4ECDC4;
//           }
//         `}</style>
//       </head>
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         suppressHydrationWarning
//       >
//         {children}
//         <Toaster 
//           position="top-right"
//           richColors
//           closeButton
//           expand={true}
//           duration={4000}
//           theme="light"
//         />
      
//         <ScrollToTop />
//         {/* <PromotionalModalWrapper />
//           <NewsletterPopup /> 
//           <UnifiedPopupManager />
//           */}
//       </body>
//     </html>
//   );
// }


// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import LayoutContent from "./components/layout/LayoutContent";

import ScrollToTop from "./components/layout/ScrollToTop";
import PromotionalModalWrapper from "./components/PromotionalModalWrapper";
import NewsletterPopup from "./components/NewsletterPopup";
import UnifiedPopupManager from "./components/UnifiedPopupManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ============================================
// TOYMART - Kids Toy E-commerce Website (Bangladesh)
// Complete SEO Optimization for Local Market
// ============================================

export const metadata = {
  // Base metadata
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://toymart.com.bd'),
  title: {
    default: "ToyMart | Best Kids Toy Store in Bangladesh - Educational & Fun Toys",
    template: "%s | ToyMart Bangladesh"
  },
  description: "ToyMart - Bangladesh's #1 online toy store for kids. Shop 1000+ educational toys, Montessori materials, STEM kits, RC cars, outdoor toys, dolls & more. ✓COD ✓bKash/Nagad ✓Free Delivery",
  
  // Keywords optimized for Bangladesh toy market
  keywords: [
    // Primary keywords
    "online toy store bangladesh",
    "kids toys bangladesh",
    "toymart",
    "best toy shop in dhaka",
    
    // Educational Toys (from project requirements)
    "educational toys bangladesh",
    "montessori toys bd",
    "stem kits for kids",
    "puzzle games bangladesh",
    "alphabet learning toys",
    "math learning toys",
    "science experiment kits for children",
    
    // Baby Toys
    "baby toys bangladesh",
    "soft toys dhaka",
    "rattles for newborns",
    "musical toys for infants",
    "bath toys bd",
    
    // Trending Toys
    "rc cars bangladesh",
    "drones for kids bd",
    "led toys dhaka",
    "dancing cactus toy price in bangladesh",
    "fidget toys bangladesh",
    "anime toys bd",
    
    // Creative Toys
    "lego blocks bangladesh",
    "art kits for kids dhaka",
    "drawing boards price in bd",
    "clay sets for children",
    "diy kits bangladesh",
    
    // Outdoor Toys
    "kids bicycle bangladesh",
    "scooter for kids price in bd",
    "football kit bangladesh",
    "mini basketball set dhaka",
    
    // Girl Toys
    "doll house bangladesh",
    "barbie dolls price in bd",
    "makeup toys for girls",
    "kitchen play set bangladesh",
    
    // Boy Toys
    "superhero figures bd",
    "car collections for kids",
    "action toys bangladesh",
    "robot toys price in dhaka",
    
    // Shopping intent
    "buy toys online bangladesh",
    "cheap toys dhaka",
    "kids toy prices in bd",
    "original toys bangladesh",
    "toy shop near me",
    
    // Payment & Delivery
    "cod toys bangladesh",
    "bkash payment toys",
    "nagad toy store",
    "free delivery kids toys dhaka"
  ],
  
  authors: [{ name: "ToyMart", url: "https://toymart.com.bd" }],
  creator: "ToyMart",
  publisher: "ToyMart Bangladesh",
  
  // Robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Canonical URL
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'bn-BD': '/bn',
    },
  },
  
  // Open Graph for social sharing (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    title: "ToyMart - Bangladesh's Largest Kids Toy Store | 1000+ Educational & Fun Toys",
    description: "✓COD Available ✓bKash/Nagad ✓Free Delivery ✓Best Prices. Shop Montessori toys, STEM kits, RC cars, dolls, outdoor toys & more for kids of all ages.",
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://toymart.com.bd',
    siteName: "ToyMart",
    images: [
      {
        url: '/og-image-toymart.jpg',
        width: 1200,
        height: 630,
        alt: 'ToyMart - Best Kids Toy Store in Bangladesh | Shop Educational Toys Online',
      },
    ],
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
    type: 'website',
    emails: ['support@toymart.com.bd'],
    phoneNumbers: ['+880123456789'],
    countryName: 'Bangladesh',
  },
  
  // Twitter Card optimization
  twitter: {
    card: 'summary_large_image',
    site: '@ToyMartBD',
    siteId: 'toymart_bangladesh',
    creator: '@ToyMartBD',
    creatorId: 'toymart',
    title: "ToyMart - Kids Toy Store Bangladesh | Educational Toys, RC Cars & More",
    description: "Bangladesh's trusted online toy store. Shop authentic educational toys, Montessori materials, STEM kits, outdoor toys. COD & bKash/Nagad available.",
    images: ['/twitter-card-toymart.jpg'],
  },
  
  // Verification (add your actual verification codes)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION || '',
    me: 'toymart@contact',
  },
  
  // Additional metadata
  category: "Kids Toy E-commerce",
  classification: "Online Toy Store | Educational Toys Bangladesh | Kids Products",
  
  // App links for mobile
  appleWebApp: {
    title: "ToyMart",
    statusBarStyle: "default",
    capable: true,
  },
  
  // Format detection
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  
  // Theme & Viewport
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FF6B35" },
    { media: "(prefers-color-scheme: dark)", color: "#FF6B35" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  
  // Manifest for PWA
  manifest: "/manifest.json",
  
  // Other important SEO tags
  other: {
    'geo.region': 'BD',
    'geo.placename': 'Dhaka',
    'geo.position': '23.8103;90.4125',
    'ICBM': '23.8103, 90.4125',
    'copyright': `ToyMart ${new Date().getFullYear()}`,
    'distribution': 'global',
    'rating': 'General',
    'revisit-after': '1 day',
    'language': 'English, Bengali',
    'audience': 'Parents, Guardians, Kids Toy Buyers in Bangladesh',
    'target_country': 'Bangladesh',
    'price_range': '200-20000 BDT',
    'currency': 'BDT',
    'delivery': 'Cash on Delivery, Free Delivery over 2000 BDT',
    'payment_methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
  },
};

// Structured Data for better SEO (JSON-LD)
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://toymart.com.bd/#organization',
        name: 'ToyMart Bangladesh',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://toymart.com.bd',
        logo: 'https://toymart.com.bd/logo.png',
        sameAs: [
          'https://facebook.com/toymartbd',
          'https://instagram.com/toymart.bd',
          'https://twitter.com/ToyMartBD',
        ],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'BD',
          addressLocality: 'Dhaka',
          addressRegion: 'Dhaka',
          postalCode: '1212',
          streetAddress: 'Gulshan Avenue',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+880123456789',
          contactType: 'customer service',
          availableLanguage: ['English', 'Bengali'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://toymart.com.bd/#website',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://toymart.com.bd',
        name: 'ToyMart - Kids Toy E-commerce Bangladesh',
        description: 'Best online toy store in Bangladesh. Shop educational toys, Montessori toys, STEM kits, RC cars, outdoor toys, dolls and more.',
        publisher: { '@id': 'https://toymart.com.bd/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://toymart.com.bd/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: ['en', 'bn'],
      },
      {
        '@type': 'Store',
        '@id': 'https://toymart.com.bd/#store',
        name: 'ToyMart Online Toy Store',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://toymart.com.bd',
        image: 'https://toymart.com.bd/store-image.jpg',
        priceRange: '৳200 - ৳20000',
        currenciesAccepted: 'BDT',
        paymentAccepted: 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
        openingHours: 'Mo-Su 10:00-22:00',
        telephone: '+880123456789',
        email: 'support@toymart.com.bd',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'BD',
          addressLocality: 'Dhaka',
        },
      },
    ],
  };
};

export default function RootLayout({ children }) {
  // Generate JSON-LD structured data
  const jsonLd = generateJsonLd();
  
  return (
    <html 
      lang="en" 
      data-scroll-behavior="smooth" 
      data-theme="light" 
      style={{ colorScheme: 'light' }}
      dir="ltr"
    >
      <head>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="color-scheme" content="light only" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="ToyMart - Bangladesh's #1 online toy store for kids. Shop educational toys, Montessori materials, STEM kits, RC cars, outdoor toys & more. ✓COD ✓bKash/Nagad ✓Free Delivery" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Geo Tags for Bangladesh */}
        <meta name="geo.region" content="BD" />
        <meta name="geo.placename" content="Dhaka" />
        <meta name="geo.position" content="23.8103;90.4125" />
        <meta name="ICBM" content="23.8103, 90.4125" />
        
        {/* Business Meta Tags */}
        <meta name="business:contact_data:country_name" content="Bangladesh" />
        <meta name="business:contact_data:website" content="https://toymart.com.bd" />
        <meta name="business:contact_data:email" content="support@toymart.com.bd" />
        
        {/* E-commerce Meta Tags */}
        <meta name="og:availability" content="in stock" />
        <meta name="product:retailer_item_id" content="global" />
        <meta name="shopping:price_currency" content="BDT" />
        
        {/* Favicon & App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#FF6B35" />
        <meta name="msapplication-TileColor" content="#FF6B35" />
        
        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://toymart.com.bd'} />
        
        {/* Alternate Language Versions */}
        <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://toymart.com.bd'}/en`} />
        <link rel="alternate" hrefLang="bn" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://toymart.com.bd'}/bn`} />
        <link rel="alternate" hrefLang="x-default" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://toymart.com.bd'} />
        
        {/* CSS Variables for Theme */}
        <style>{`
          :root {
            color-scheme: light only;
            --primary-color: #FF6B35;
            --secondary-color: #FFB347;
            --accent-color: #4ECDC4;
            --toymart-orange: #FF6B35;
            --toymart-yellow: #FFB347;
            --toymart-teal: #4ECDC4;
            --toymart-purple: #9B59B6;
          }
        `}</style>
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        
        {/* Toast Notifications */}
        {/* <Toaster 
          position="top-right"
          richColors
          closeButton
          expand={true}
          duration={4000}
          theme="light"
          toastOptions={{
            style: {
          
              background: '#FFFFFF',
              color: '#333333',
              border: '1px solid #FF6B35',
              borderRadius: '12px',
            },
          }}
        /> */}

        {/* Toast Notifications */}
<Toaster 
  position="top-right"
  richColors
  closeButton
  expand={true}
  duration={4000}
  theme="light"
  toastOptions={{
    style: {
      background: '#FFFFFF',
      color: '#333333',
      border: '1px solid #FF6B35',
      borderRadius: '12px',
      marginTop: '40px',  // This pushes the toast down from the top
    },
  }}
/>
        
        {/* UI Components */}
        <ScrollToTop />
        {/* Optional Popup Components - Uncomment when ready */}
        {/* <PromotionalModalWrapper /> */}
        {/* <NewsletterPopup /> */}
        {/* <UnifiedPopupManager /> */}
      </body>
    </html>
  );
}