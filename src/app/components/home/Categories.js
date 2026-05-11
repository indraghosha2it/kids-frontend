'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Gift, Star, Rocket } from 'lucide-react';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef(null);

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      
      if (data.success) {
        const formattedCategories = data.data.map((cat, index) => ({
          _id: cat._id,
          name: cat.name,
          image: cat.image?.url || getDefaultImage(index),
          slug: cat.slug,
        }));
        setCategories(formattedCategories);
        setShowRightArrow(formattedCategories.length > 6);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      const fallbackCategories = [
        { _id: '1', name: 'Educational Toys', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=150&h=150&fit=crop' },
        { _id: '2', name: 'Baby Toys', image: 'https://images.unsplash.com/photo-1595433707802-2b1382c9b9a9?w=150&h=150&fit=crop' },
        { _id: '3', name: 'RC Cars', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=150&h=150&fit=crop' },
        { _id: '4', name: 'Soft Toys', image: 'https://images.unsplash.com/photo-1567137283696-b8f01eb2f6b6?w=150&h=150&fit=crop' },
        { _id: '5', name: 'STEM Kits', image: 'https://images.unsplash.com/photo-1535378917042-10a22c959eeb?w=150&h=150&fit=crop' },
        { _id: '6', name: 'Puzzles', image: 'https://images.unsplash.com/photo-1567013127542-490d757e6e1f?w=150&h=150&fit=crop' },
        { _id: '7', name: 'Art Supplies', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=150&h=150&fit=crop' },
        { _id: '8', name: 'Outdoor Toys', image: 'https://images.unsplash.com/photo-1571066811602-716837513681?w=150&h=150&fit=crop' },
      ];
      setCategories(fallbackCategories);
      setShowRightArrow(fallbackCategories.length > 6);
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultImage = (index) => {
    const images = [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1595433707802-2b1382c9b9a9?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1567137283696-b8f01eb2f6b6?w=150&h=150&fit=crop',
    ];
    return images[index % images.length];
  };

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [categories]);

  const hasMoreThanSix = categories.length > 6;

  if (isLoading) {
    return (
      <section className="py-12 bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-[#D4EDEE] rounded-full animate-pulse"></div>
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
            <div className="w-16 h-0.5 bg-gray-200 mx-auto animate-pulse"></div>
          </div>
          <div className="flex gap-6 justify-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse flex-shrink-0">
                <div className="w-28 h-28 rounded-full bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE]">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Gift className="w-4 h-4 text-[#FFB6C1]" />
            <span className="text-xs font-medium text-[#4A8A90] tracking-wide" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>
              TOY CATEGORIES
            </span>
            <Gift className="w-4 h-4 text-[#FFB6C1]" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D3A5C]"
            style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}
          >
            Shop by <span className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] bg-clip-text text-transparent">Category</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#6B7280] max-w-2xl mx-auto mt-2 text-sm"
            style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}
          >
            Discover amazing toys for every age and interest
          </motion.p>
          
          {hasMoreThanSix && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-3"
            >
              <span className="text-xs text-[#4A8A90] bg-white/60 px-3 py-1 rounded-full backdrop-blur-sm">
                🎈 Scroll to see more categories →
              </span>
            </motion.div>
          )}
        </div>

        {/* Categories Row with Scroll Arrows */}
        <div className="relative group">
          {/* Left Arrow */}
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 border-2 border-[#D4EDEE] hover:bg-[#D4EDEE] -ml-3 md:-ml-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 text-[#4A8A90]" />
            </motion.button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 border-2 border-[#D4EDEE] hover:bg-[#D4EDEE] -mr-3 md:-mr-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 text-[#4A8A90]" />
            </motion.button>
          )}

          {/* Scrollable Container - Round shape categories */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-6 scroll-smooth justify-center"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category, index) => (
              <CategoryCard 
                key={category._id || index} 
                category={category} 
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute left-5 top-1/3 text-2xl opacity-20 pointer-events-none">⭐</div>
      <div className="absolute right-5 bottom-1/4 text-3xl opacity-20 pointer-events-none">🎈</div>
      <div className="absolute left-10 bottom-1/5 text-2xl opacity-15 pointer-events-none">🧸</div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

// Individual Category Card - Round shape with white border and shadow
function CategoryCard({ category, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex-shrink-0"
    >
      <Link href={`/products?category=${category._id}`}>
        <div className="cursor-pointer text-center">
          {/* Round Circle with White Border and Bottom Shadow */}
          <motion.div 
            className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-lg mx-auto"
            style={{
              boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
              border: '3px solid white'
            }}
            animate={{
              boxShadow: isHovered 
                ? '0 15px 30px rgba(74,138,144,0.25)' 
                : '0 8px 20px rgba(0,0,0,0.12)',
              scale: isHovered ? 1.02 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Category Image - Always visible, covering entire circle */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=150&h=150&fit=crop';
              }}
            />
            
            {/* Subtle gradient overlay on hover only */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.4 : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Cute star icon on hover */}
            <motion.div 
              className="absolute bottom-2 right-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white rounded-full p-1.5 shadow-md">
                <Star className="w-3 h-3 text-[#FFB6C1] fill-[#FFB6C1]" />
              </div>
            </motion.div>
          </motion.div>
          
          {/* Category Name Below Circle */}
          <motion.h3 
            className="text-center mt-3 text-xs sm:text-sm md:text-base font-bold text-[#2D3A5C] px-1"
            style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}
            animate={{ 
              color: isHovered ? '#4A8A90' : '#2D3A5C',
            }}
            transition={{ duration: 0.2 }}
          >
            {category.name}
          </motion.h3>
        </div>
      </Link>
    </motion.div>
  );
}