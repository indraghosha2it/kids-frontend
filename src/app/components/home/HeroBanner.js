'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Star, Rocket, Gift, Heart, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Slides data
  const slides = [
    {
      id: 1,
      title: "Summer Toy Sale!",
      subtitle: "Up to 50% OFF",
      description: "Get ready for endless fun with our amazing summer collection",
      buttonText: "Shop Now",
      buttonLink: "/products",
      image: "https://images.unsplash.com/photo-1566576912321-d58c333a7d1b?w=800&h=600&fit=crop",
      bgColor: "from-[#FFD93D] to-[#FF7B54]",
      icon: <Rocket className="w-8 h-8 text-white" />,
      badge: "HOT DEAL"
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Latest Toys Just Landed",
      description: "Discover the trendiest toys of the season",
      buttonText: "Explore Now",
      buttonLink: "/products?sort=new",
      image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&h=600&fit=crop",
      bgColor: "from-[#4F9DFF] to-[#6EE7B7]",
      icon: <Star className="w-8 h-8 text-white" />,
      badge: "NEW"
    },
    {
      id: 3,
      title: "Educational Toys",
      subtitle: "Learn While Playing",
      description: "STEM kits, puzzles, and more for smart kids",
      buttonText: "View Collection",
      buttonLink: "/products?category=educational",
      image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=600&fit=crop",
      bgColor: "from-[#FF7B54] to-[#F472B6]",
      icon: <Gift className="w-8 h-8 text-white" />,
      badge: "POPULAR"
    }
  ];

  // Featured toys
  const featuredToys = [
    {
      id: 1,
      name: "Space Rocket",
      price: "1,299",
      originalPrice: "1,999",
      discount: "35%",
      image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&h=300&fit=crop",
      badge: "Bestseller",
      badgeColor: "#FFD93D"
    },
    {
      id: 2,
      name: "Building Blocks",
      price: "899",
      originalPrice: "1,499",
      discount: "40%",
      image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300&h=300&fit=crop",
      badge: "Trending",
      badgeColor: "#4F9DFF"
    },
    {
      id: 3,
      name: "Puzzle Game",
      price: "599",
      originalPrice: "999",
      discount: "30%",
      image: "https://images.unsplash.com/photo-1566576912321-d58c333a7d1b?w=300&h=300&fit=crop",
      badge: "Hot Sale",
      badgeColor: "#FF7B54"
    },
    {
      id: 4,
      name: "Doll House",
      price: "2,499",
      originalPrice: "3,499",
      discount: "28%",
      image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&h=300&fit=crop",
      badge: "Limited",
      badgeColor: "#F472B6"
    }
  ];

  // Seasonal promotions
  const seasonalPromos = [
    { icon: "🎄", title: "Christmas Special", text: "Up to 60% OFF", color: "from-red-500 to-orange-500" },
    { icon: "🎃", title: "Halloween Sale", text: "Spooky Discounts", color: "from-orange-600 to-purple-600" },
    { icon: "🎁", title: "Birthday Deals", text: "Extra 10% OFF", color: "from-pink-500 to-red-500" },
    { icon: "🌟", title: "Weekly Flash", text: "Limited Time", color: "from-blue-500 to-cyan-500" }
  ];

  // Autoplay slides
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay, slides.length]);

  const nextSlide = () => {
    setAutoplay(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setAutoplay(true), 5000);
  };

  const prevSlide = () => {
    setAutoplay(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setAutoplay(true), 5000);
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Main Hero Banner */}
      <div className="relative h-[500px] md:h-[550px] lg:h-[600px] overflow-hidden">
        {/* Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            {/* Background Image with Gradient Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bgColor} opacity-85`}></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 text-white text-sm font-bold mb-4">
                      {slides[currentSlide].icon}
                      {slides[currentSlide].badge}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3"
                    style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}
                  >
                    {slides[currentSlide].title}
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/90 mb-4"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/80 text-base md:text-lg mb-8 max-w-lg"
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  {/* Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Link
                      href={slides[currentSlide].buttonLink}
                      className="inline-flex items-center gap-2 bg-white text-[#FF7B54] px-6 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
                      style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}
                    >
                      {slides[currentSlide].buttonText}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setAutoplay(false);
                setCurrentSlide(idx);
                setTimeout(() => setAutoplay(true), 5000);
              }}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === idx
                  ? 'w-8 h-2 bg-white'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Seasonal Promotions Banner */}
      <div className="bg-gradient-to-r from-[#4F9DFF] to-[#FF7B54] py-3 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {seasonalPromos.map((promo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 cursor-pointer"
              >
                <span className="text-xl">{promo.icon}</span>
                <div>
                  <p className="text-white font-bold text-xs md:text-sm">{promo.title}</p>
                  <p className="text-white/80 text-xs">{promo.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Toys Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD93D] to-[#FF7B54] rounded-full px-4 py-1.5 mb-3"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-bold">✨ Featured Toys ✨</span>
            <Sparkles className="w-4 h-4 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold text-gray-800"
            style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}
          >
            Best Sellers & Trending
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 mt-2"
          >
            Most loved toys by kids and parents
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredToys.map((toy, idx) => (
            <motion.div
              key={toy.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={toy.image}
                  alt={toy.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Badge */}
                <div
                  className="absolute top-3 left-3 px-2 py-1 rounded-full text-white text-xs font-bold"
                  style={{ backgroundColor: toy.badgeColor }}
                >
                  {toy.badge}
                </div>
                {/* Discount Badge */}
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{toy.discount}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-800 text-lg mb-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                  {toy.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-[#FF7B54]">BDT {toy.price}</span>
                  <span className="text-sm text-gray-400 line-through">BDT {toy.originalPrice}</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFD93D] text-[#FFD93D]" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(128 reviews)</span>
                </div>
                <Link
                  href={`/product/${toy.id}`}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#4F9DFF] to-[#FF7B54] text-white py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-all"
                >
                  <Heart className="w-4 h-4" />
                  Quick View
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-all"
          >
            View All Toys
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;