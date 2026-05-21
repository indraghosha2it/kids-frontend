

'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slidesData = [
  {
    id: 1,
    label: "TOP TOYS PRODUCTS",
    title: "All Your Baby Needs In Place",
    subtitle: "Find Latest Collection",
    childImage: "https://i.ibb.co.com/21N6KYVn/water-smartphone-adult-doing-girl-machine.jpg",
    toys: [
      { src: "https://i.ibb.co.com/G4Jvj6DR/DAZZALING-WINNER-Horse-Rocking-Ride-On-T-Non-Brand-626b8-434507.png", alt: "Car Seat" },
      { src: "https://i.ibb.co.com/99xZp1NT/stroller-c3-removebg-preview.png", alt: "Baby Stroller" },
      { src: "https://i.ibb.co.com/jXmPFyS/to-removebg-preview.png", alt: "Rocking Toy" },
    ],
  },
  {
    id: 2,
    label: "BEST SELLERS",
    title: "Educational STEM Learning Kits",
    subtitle: "Smart toys that make learning fun and exciting",
    childImage: "https://i.ibb.co.com/23rGnpQb/1000-F-517681519-B8tr-Tn1r-Ge-Og3-Gz-Jdmo-NHLil-Qf2uw-MWU.jpg",
    toys: [
      { src: "https://i.ibb.co.com/h1CTB7cS/educational-toys-child-melissa-doug-toy-removebg-preview.png", alt: "Building Blocks" },
      { src: "https://i.ibb.co.com/Kc6WM7J1/Caplll-removebg-preview.png", alt: "STEM Kit" },
      { src: "https://i.ibb.co.com/G3fcn3Zq/close-up-photo-hight-colorful-chalks-tower-removebg-preview.png", alt: "Colorful Chalks" },
    ],
  },
  {
    id: 3,
    label: "NEW ARRIVALS",
    title: "Cars & Soft Toys",
    subtitle: "High-speed action toys for little adventurers",
    childImage: "https://i.ibb.co.com/VXmdxQr/premium-photo-1702498664908-a5d303207ab7.avif",
    toys: [
      { src: "https://i.ibb.co.com/1t6NH2hc/Cahj-removebg-preview.png", alt: "Soft Toy" },
      { src: "https://i.ibb.co.com/1t8NtbRB/0-removebg-preview.png", alt: "RC Car" },
      { src: "https://i.ibb.co.com/ksZXPG1b/146525-car-toy-free-download-image-1.png", alt: "Toy Car" },
    ],
  },
 {
  id: 4,
  label: "OUTDOOR FUN",
  title: "Outdoor Adventure Toys",
  subtitle: "Keep kids active with exciting outdoor playtime",
  childImage: "https://i.ibb.co.com/wZfrh2ZV/kids-tent-outdoors.jpg",
  toys: [
    { src: "https://i.ibb.co.com/k2g1G0PX/0998-removebg-preview.png", alt: "Kids Bicycle" },
    { src: "https://i.ibb.co.com/S79SkPpy/99-removebg-preview.png", alt: "Football" },
    { src: "https://i.ibb.co.com/6c1hhKCJ/lp-removebg-preview.png", alt: "Outdoor Tent" },
  ],
},
];

// More floating clouds with pure white color
const floatingClouds = [
  { top: "8%", left: "2%", width: "90px", delay: 0, duration: 22, opacity: 0.8 },
  { top: "15%", right: "5%", width: "110px", delay: 2, duration: 25, opacity: 0.85 },
  { top: "55%", left: "8%", width: "70px", delay: 4, duration: 18, opacity: 0.75 },
  { top: "65%", right: "10%", width: "100px", delay: 1, duration: 23, opacity: 0.8 },
  { top: "35%", left: "15%", width: "85px", delay: 3, duration: 20, opacity: 0.7 },
  { top: "75%", right: "18%", width: "120px", delay: 5, duration: 28, opacity: 0.75 },
  { top: "45%", right: "22%", width: "75px", delay: 2.5, duration: 21, opacity: 0.8 },
  { top: "25%", left: "20%", width: "95px", delay: 1.5, duration: 19, opacity: 0.85 },
  { top: "85%", left: "12%", width: "105px", delay: 3.5, duration: 26, opacity: 0.7 },
  { top: "12%", right: "28%", width: "80px", delay: 4.5, duration: 24, opacity: 0.8 },
  { top: "50%", left: "25%", width: "65px", delay: 2, duration: 17, opacity: 0.75 },
  { top: "30%", right: "15%", width: "88px", delay: 3.8, duration: 22, opacity: 0.8 },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalSlides = slidesData.length;

useEffect(() => {
  if (isAutoPlaying) {
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // 4 seconds auto-scroll
  }
  return () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };
}, [isAutoPlaying, totalSlides]);

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  const currentData = slidesData[currentSlide];

  return (
   <section className="relative w-full min-h-[280px] md:min-h-[380px] lg:min-h-[420px] overflow-hidden bg-[#d4edee]">
      {/* Floating Animated Clouds - Pure White */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {floatingClouds.map((cloud, idx) => (
          <motion.div
            key={idx}
            className="absolute"
            style={{
              top: cloud.top,
              left: cloud.left,
              right: cloud.right,
            }}
            animate={{
              x: [0, 35, 0, -25, 0],
              y: [0, -12, 0, 18, 0],
            }}
            transition={{
              duration: cloud.duration,
              delay: cloud.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg 
              viewBox="0 0 120 80" 
              style={{ width: cloud.width, opacity: cloud.opacity }}
              fill="white"
            >
              <path d="M30,70 Q20,70 18,60 Q10,55 12,45 Q8,35 15,30 Q12,20 22,18 Q25,10 35,12 Q40,5 50,8 Q58,3 65,8 Q72,4 78,10 Q85,6 90,12 Q98,10 100,18 Q108,22 105,32 Q112,38 108,48 Q110,58 102,62 Q100,70 90,70 Z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Right Side Circular Image - Changes with slide */}
      <div className="absolute right-6 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* White ring border */}
            <div className="w-44 h-44 lg:w-72 lg:h-72 rounded-full border-[5px] border-white shadow-xl overflow-hidden bg-white">
              <div className="relative w-full h-full">
                <Image
                  src={currentData.childImage}
                  alt="Happy child playing with toys"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            {/* Decorative arc line */}
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-52 lg:w-68 h-52 lg:h-68 border-2 border-white/40 rounded-full pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Cloud Decoration - Pure White */}
      <div className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none">
        <svg className="w-full h-24 md:h-28" viewBox="0 0 1440 120" fill="white" preserveAspectRatio="none">
          <ellipse cx="200" cy="100" rx="250" ry="60" fill="white" />
          <ellipse cx="500" cy="110" rx="200" ry="50" fill="white" />
          <ellipse cx="800" cy="100" rx="280" ry="70" fill="white" />
          <ellipse cx="1100" cy="110" rx="220" ry="55" fill="white" />
          <ellipse cx="1350" cy="105" rx="200" ry="60" fill="white" />
          <rect x="0" y="100" width="1440" height="20" fill="white" />
        </svg>
      </div>

      {/* Main Content */}
      <div
        className="relative mx-auto max-w-7xl px-4 py-6 md:py-7 lg:py-8 h-full z-20"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
       <div className="flex flex-col md:flex-row h-full min-h-[320px] md:min-h-[350px]">
          {/* Left Content - Text */}
         <div className="flex-1 flex flex-col justify-start md:pr-6 lg:pr-12 md:pl-6 lg:pl-12 pt-6 z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-2 md:space-y-3"
              >
                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-2 text-[#5b9aa0]"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9,22 9,12 15,12 15,22" />
                  </svg>
                  <span className="text-[10px] md:text-xs font-medium tracking-wider">
                    {currentData.label}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2d3a5c] leading-tight"
                  style={{ fontFamily: "'Fredoka One', 'Comic Neue', 'Quicksand', cursive" }}
                >
                  {currentData.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-[10px] md:text-xs text-[#6b7280]"
                  style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}
                >
                  {currentData.subtitle}
                </motion.p>

             {/* Shop Now Button */}
{/* Shop Now Button - Fixed Version */}
<Link href="/products">
  <motion.button
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    className="mt-1 px-4 py-1.5 bg-[#5b9aa0] hover:bg-[#4a8a90] text-white text-xs md:text-sm font-medium rounded-full transition-all shadow-md cursor-pointer"
    style={{ fontFamily: "'Fredoka One', 'Comic Neue', 'Quicksand', cursive" }}
  >
    Shop Now →
  </motion.button>
</Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right side spacer for circular image on desktop */}
          <div className="hidden md:block w-52 lg:w-60" />
        </div>

        {/* Bottom Toy Images - Changes with each slide */}
        <div className="absolute bottom-4 md:bottom-6 left-4 md:left-8 lg:left-12 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex items-end gap-2 md:gap-3"
            >
              {currentData.toys.map((toy, index) => (
                <motion.div
                  key={toy.alt}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + index * 0.1,
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative cursor-pointer group"
                >
         <div
  className={`relative ${
    index === 1
      ? "w-28 h-28 md:w-44 md:h-44 lg:w-52 lg:h-52"
      : "w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32"
  }`}
                    style={{
                      filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.12))",
                    }}
                  >
                    <Image
                      src={toy.src}
                      alt={toy.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 96px, (max-width: 1024px) 112px, 144px"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#4A8A90] hover:bg-[#277a82] shadow-lg flex items-center justify-center transition-colors z-30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#4A8A90] hover:bg-[#277a82] shadow-lg flex items-center justify-center transition-colors z-30"
          aria-label="Next slide"
        >
          <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-4 bg-[#4A8A90]"
                  : "w-1 bg-[#5b9aa0]/40 hover:bg-[#5b9aa0]"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}