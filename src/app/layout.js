



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

// // Default metadata for the entire site
// export const metadata = {
//   title: {
//     default: "ToyMart || Premium Eco-Friendly Jute Products from Bangladesh",
//     template: "%s || Jute Craftify"
//   },
//   description: "Premium jute products supplier from Bangladesh. Eco-friendly bags, home decor, raw jute fiber, and custom manufacturing. Bulk orders for global buyers. Sustainable & handcrafted.",
//   keywords: [
//     "jute products", 
//     "jute bags", 
//     "eco-friendly products", 
//     "jute supplier Bangladesh", 
//     "bulk jute order", 
//     "custom jute manufacturing", 
//     "OEM jute products",
//     "sustainable packaging",
//     "jute home decor",
//     "jute fiber",
//     "B2B jute supplier",
//     "wholesale jute",
//     "natural fiber products",
//     "biodegradable products",
//     "jute craft Bangladesh"
//   ],
//   authors: [{ name: "Jute Craftify" }],
//   creator: "Jute Craftify",
//   publisher: "Jute Craftify",
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
//     title: "Jute Craftify - Premium Eco-Friendly Jute Products from Bangladesh",
//     description: "Your end-to-end sustainable jute supply partner. Raw jute fiber, jute bags, home decor, and custom manufacturing. Bulk orders | Global export | OEM/ODM services",
//     url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
//     siteName: "Jute Craftify",
//     images: [
//       {
//         url: '/og-image.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Jute Craftify - Premium Jute Products from Bangladesh',
//       },
//     ],
//     locale: 'en_US',
//     type: 'website',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: "Jute Craftify - Sustainable Jute Products",
//     description: "Premium jute products supplier from Bangladesh. Eco-friendly, handcrafted, and globally exported. Request a quote for bulk orders.",
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
//   category: "business",
//   classification: "B2B Jute Products Manufacturing & Export",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" data-scroll-behavior="smooth" data-theme="light" style={{ colorScheme: 'light' }}>
//       <head>
//         <meta name="color-scheme" content="light only" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//         <style>{`
//           :root {
//             color-scheme: light only;
//           }
//         `}</style>
//       </head>
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       suppressHydrationWarning
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
//           <NewsletterPopup /> */}
//           <UnifiedPopupManager />
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

// Default metadata for ToyMart - Kids Toy E-commerce Website
export const metadata = {
  title: {
    default: "ToyMart | Bangladesh's Best Kids Toy Store - Educational & Fun Toys",
    template: "%s | ToyMart"
  },
  description: "ToyMart - Bangladesh's premier kids toy e-commerce website. Shop educational toys, Montessori toys, STEM kits, RC cars, outdoor toys, and more. Free delivery & COD available.",
  keywords: [
    // Educational Toys
    "educational toys Bangladesh",
    "Montessori toys",
    "STEM kits",
    "puzzle games",
    "alphabet learning toys",
    "math learning toys",
    "science experiment kits",
    
    // Baby Toys
    "baby toys Bangladesh",
    "soft toys",
    "rattles",
    "musical toys",
    "bath toys",
    
    // Trending Toys
    "RC cars Bangladesh",
    "drones for kids",
    "LED toys",
    "dancing cactus toy",
    "fidget toys",
    "anime toys Bangladesh",
    
    // Creative Toys
    "LEGO blocks",
    "art kits for kids",
    "drawing boards",
    "clay sets",
    "DIY kits",
    
    // Outdoor Toys
    "kids bicycle Bangladesh",
    "scooter for kids",
    "football kit",
    "mini basketball set",
    
    // Gender Specific
    "doll house",
    "Barbie dolls",
    "makeup toys",
    "kitchen play set",
    "superhero figures",
    "car collections",
    "action toys",
    "robot toys",
    
    // General
    "online toy store Bangladesh",
    "kids toys",
    "best toys for children",
    "toy shop BD"
  ],
  authors: [{ name: "ToyMart" }],
  creator: "ToyMart",
  publisher: "ToyMart",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ToyMart - Bangladesh's Largest Kids Toy Store | Educational & Fun Toys",
    description: "Shop thousands of toys for kids of all ages at ToyMart. Educational toys, RC cars, outdoor toys, dolls, and more. Best prices in Bangladesh with COD and bKash payment.",
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    siteName: "ToyMart",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ToyMart - Best Kids Toy Store in Bangladesh',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ToyMart - Kids Toy Store Bangladesh",
    description: "Best educational toys, RC cars, outdoor toys, and more. Free delivery & COD available across Bangladesh.",
    images: ['/og-image.jpg'],
  },
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
  category: "ecommerce",
  classification: "Kids Toy E-commerce Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" data-theme="light" style={{ colorScheme: 'light' }}>
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#FF6B35" />
        <meta name="description" content="ToyMart - Bangladesh's best online toy store. Shop educational toys, RC cars, dolls, outdoor toys & more. Free delivery, COD, bKash/Nagad payment." />
        <style>{`
          :root {
            color-scheme: light only;
            --primary-color: #FF6B35;
            --secondary-color: #FFB347;
            --accent-color: #4ECDC4;
          }
        `}</style>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          expand={true}
          duration={4000}
          theme="light"
        />
      
        <ScrollToTop />
        {/* <PromotionalModalWrapper />
          <NewsletterPopup /> 
          <UnifiedPopupManager />
          */}
      </body>
    </html>
  );
}


