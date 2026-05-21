

import { Suspense } from 'react';
import BlogDetailsClient from './BlogDetailsClient';

// Loading fallback component
function BlogDetailsLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-32 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-[#E39A65] rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-500">Loading amazing content...</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Import Navbar and Footer for loading state
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';

export const metadata = {
  title: "Blog Details - Asian Clothify",
  description: "Read our latest blog posts about fashion, wholesale tips, and industry insights.",
  keywords: ["fashion blog", "wholesale tips", "clothing trends"],
  openGraph: {
    title: "Blog Details - Asian Clothify",
    description: "Read our latest blog posts about fashion, wholesale tips, and industry insights.",
    images: ['/blog-og.jpg'],
  },
};

// Server component with Suspense
export default function BlogDetailsPage() {
  return (
    <Suspense fallback={<BlogDetailsLoading />}>
      <BlogDetailsClient />
    </Suspense>
  );
}