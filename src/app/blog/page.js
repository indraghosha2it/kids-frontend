


// app/blog/page.js

import BlogClient from './BlogClient';

// Metadata for Blog page - Jute Craftify
export const metadata = {
  title: "Jute Craftify Insights - Sustainable Products Blog & News",
  description: "Expert insights on jute products, sustainable manufacturing, eco-friendly alternatives, and B2B industry trends. Stay updated with Jute Craftify, a premium jute products supplier from Bangladesh offering sustainable, handcrafted solutions for global markets.",
  keywords: [
    "jute industry blog",
    "sustainable products news",
    "eco-friendly insights",
    "jute manufacturing trends",
    "B2B jute market",
    "sustainability blog",
    "jute products guide",
    "eco-friendly packaging trends",
    "Bangladesh jute industry",
    "natural fiber products",
    "sustainable business practices",
    "jute craft insights",
    "green manufacturing",
    "biodegradable products news"
  ],
  openGraph: {
    title: "Jute Industry Insights - Sustainable Products Blog",
    description: "Expert insights on jute products, sustainable manufacturing, and industry trends. Stay updated with Jute Craftify, your premium jute products partner from Bangladesh.",
    url: "https://jutecraftify.com/blog",
    siteName: "Jute Craftify",
    images: [
      {
        url: "/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "Jute Craftify Blog - Sustainable Jute Industry Insights"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jute Industry Insights - Sustainable Products Blog",
    description: "Expert insights on jute products, sustainable manufacturing, and B2B industry trends.",
    images: ["/blog-og.jpg"],
    site: "@JuteCraftify",
  },
  alternates: {
    canonical: "/blog"
  },
  robots: {
    index: true,
    follow: true,
  }
};

// Simple server component that renders the client component
export default function BlogPage() {
  return <BlogClient />;
}