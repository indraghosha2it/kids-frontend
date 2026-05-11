// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronLeft, ChevronRight, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';
// import Link from 'next/link';

// const slidesData = [
//   {
//     id: 1,
//     title: "Baobaohao Y8 2-Way Facing Baby Stroller",
//     subtitle: "The most-loved products proven by thousands of happy families",
//     badge: "🌟 Best Seller 2024",
//     ctaText: "Shop Strollers",
//     ctaLink: "/category/strollers",
//     bgImage: "https://i.ibb.co.com/SXB4TfzT/young-mother-sitting-with-baby-carriage-park.jpg",
//     toys: [
//       { src: "https://i.ibb.co.com/wXy7GdY/png-transparent-toy-graphy-illustration-toys-daquan-child-baby-photography-thumbnail-removebg-previe.png", alt: "Car Seat", size: "small" },
//       { src: "https://i.ibb.co.com/99xZp1NT/stroller-c3-removebg-preview.png", alt: "Baby Stroller", size: "large" },
//       { src: "https://i.ibb.co.com/wXy7GdY/png-transparent-toy-graphy-illustration-toys-daquan-child-baby-photography-thumbnail-removebg-previe.png", alt: "Rocking Toy", size: "small" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Educational STEM Learning Kits",
//     subtitle: "Smart toys that make learning fun and exciting",
//     badge: "🧠 Brain Development",
//     ctaText: "Explore STEM",
//     ctaLink: "/category/stem-toys",
//     bgImage: "https://i.ibb.co.com/LD8nCXsq/premium-photo-1726783413564-1283e3efe86b.avif",
//     toys: [
//       { src: "https://i.ibb.co.com/h1CTB7cS/educational-toys-child-melissa-doug-toy-removebg-preview.png", alt: "Building Blocks", size: "small" },
//       { src: "https://i.ibb.co.com/Kc6WM7J1/Caplll-removebg-preview.png", alt: "STEM Kit", size: "large" },
//       { src: "https://i.ibb.co.com/G3fcn3Zq/close-up-photo-hight-colorful-chalks-tower-removebg-preview.png", alt: "Princess Doll", size: "small" },
//     ],
//   },
//   {
//     id: 3,
//     title: " Cars & Soft Toyes",
//     subtitle: "High-speed action toys for little adventurers",
//     badge: "🏎️ Trending Now",
//     ctaText: "Shop RC Toys",
//     ctaLink: "/category/rc-toys",
//     bgImage: "https://i.ibb.co.com/wFX1kvdG/l.png",
//     toys: [
//       { src: "https://i.ibb.co.com/1t6NH2hc/Cahj-removebg-preview.png", alt: "Doll", size: "small" },
//       { src: "https://i.ibb.co.com/1t8NtbRB/0-removebg-preview.png", alt: "RC Car", size: "large" },
//       { src: "https://i.ibb.co.com/ksZXPG1b/146525-car-toy-free-download-image-1.png", alt: "Teddy Bear", size: "small" },
//     ],
//   },
//   {
//     id: 4,
//     title: "Soft Toys & Plushies Collection",
//     subtitle: "Cuddle-worthy companions your kids will adore",
//     badge: "🧸 Limited Edition",
//     ctaText: "View Plushies",
//     ctaLink: "/category/soft-toys",
//     bgImage: "https://images.unsplash.com/photo-1544716278-ea5b3a4a54ae?w=1920&h=500&fit=crop",
//     toys: [
//       { src: "https://images.unsplash.com/photo-1535378917042-10a22c959eeb?w=300&h=300&fit=crop", alt: "Robot", size: "small" },
//       { src: "https://images.unsplash.com/photo-1567137283696-b8f01eb2f6b6?w=400&h=400&fit=crop", alt: "Teddy Bear", size: "large" },
//       { src: "https://images.unsplash.com/photo-1567013127542-490d757e6e1f?w=300&h=300&fit=crop", alt: "Blocks", size: "small" },
//     ],
//   },
// ];

// // Floating decorative elements
// const floatingElements = [
//   { icon: "✨", top: "10%", left: "3%", delay: 0, duration: 6 },
//   { icon: "🎈", top: "15%", right: "5%", delay: 1, duration: 7 },
//   { icon: "⭐", bottom: "20%", left: "5%", delay: 2, duration: 5 },
//   { icon: "🎪", bottom: "15%", right: "4%", delay: 0.5, duration: 8 },
//   { icon: "🧸", top: "40%", left: "2%", delay: 1.5, duration: 6.5 },
//   { icon: "🎨", top: "65%", right: "3%", delay: 2.5, duration: 7.5 },
// ];

// export default function HeroBanner() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const autoPlayRef = useRef(null);
//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);

//   const totalSlides = slidesData.length;

//   useEffect(() => {
//     if (isAutoPlaying) {
//       autoPlayRef.current = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % totalSlides);
//       }, 5000);
//     }
//     return () => {
//       if (autoPlayRef.current) clearInterval(autoPlayRef.current);
//     };
//   }, [isAutoPlaying, totalSlides]);

//   const goToSlide = (index) => {
//     setIsAutoPlaying(false);
//     setCurrentSlide(index);
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   const nextSlide = () => {
//     goToSlide((currentSlide + 1) % totalSlides);
//   };

//   const prevSlide = () => {
//     goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
//   };

//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = (e) => {
//     touchEndX.current = e.changedTouches[0].clientX;
//     const diff = touchStartX.current - touchEndX.current;
//     if (Math.abs(diff) > 50) {
//       if (diff > 0) nextSlide();
//       else prevSlide();
//     }
//   };

//   const currentData = slidesData[currentSlide];

//   return (
//     <section className="relative w-full overflow-hidden min-h-[420px] md:min-h-[480px]">
//       {/* Background Image with Overlay */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentSlide}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.6 }}
//           className="absolute inset-0"
//         >
//           <div 
//             className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//             style={{ backgroundImage: `url(${currentData.bgImage})` }}
//           />
//           <div className="absolute inset-0 bg-black/40" />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
//         </motion.div>
//       </AnimatePresence>

//       {/* Floating animated elements */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
//         {floatingElements.map((item, idx) => (
//           <motion.div
//             key={idx}
//             className="absolute text-lg md:text-xl lg:text-2xl text-white/15"
//             style={{
//               top: item.top,
//               left: item.left,
//               right: item.right,
//               bottom: item.bottom,
//             }}
//             animate={{
//               y: [0, -15, 0, 15, 0],
//               rotate: [0, 10, -10, 5, 0],
//             }}
//             transition={{
//               duration: item.duration,
//               delay: item.delay,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           >
//             {item.icon}
//           </motion.div>
//         ))}
//       </div>

//       <div
//         className="relative z-20 mx-auto max-w-7xl px-4 py-5 md:py-6 lg:py-7"
//         onMouseEnter={() => setIsAutoPlaying(false)}
//         onMouseLeave={() => setIsAutoPlaying(true)}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//       >
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentSlide}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//             className="flex flex-col items-center text-center"
//           >
//             {/* Badge */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.1 }}
//               className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f97316] to-[#f59e0b] rounded-full px-3 py-0.5 md:px-3 md:py-1 mb-3 shadow-lg"
//             >
//               <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
//               <span className="text-white text-[10px] md:text-xs font-semibold tracking-wide" style={{ fontFamily: "'Comic Neue', 'Quicksand', cursive" }}>
//                 {currentData.badge}
//               </span>
//             </motion.div>

//             {/* Title & Subtitle */}
//             <div className="max-w-4xl space-y-1 mb-3 md:mb-4">
//               <motion.h1
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2, duration: 0.5 }}
//                 className="text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight drop-shadow-lg px-2"
//                 style={{ fontFamily: "'Fredoka One', 'Comic Neue', 'Quicksand', cursive" }}
//               >
//                 {currentData.title}
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3, duration: 0.5 }}
//                 className="text-[11px] md:text-xs text-white/85 max-w-2xl mx-auto drop-shadow px-2"
//                 style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}
//               >
//                 {currentData.subtitle}
//               </motion.p>
//             </div>

//             {/* Product Images - Compact */}
//          <div className="relative w-full flex items-end justify-center gap-2 md:gap-4 lg:gap-6 h-36 md:h-44 lg:h-52">
//               {currentData.toys.map((toy, index) => (
//                 <motion.div
//                   key={`${currentSlide}-${toy.alt}`}
//                   initial={{ opacity: 0, y: 40, scale: 0.85 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   transition={{
//                     delay: 0.4 + index * 0.12,
//                     type: "spring",
//                     stiffness: 150,
//                     damping: 18,
//                   }}
//                   whileHover={{ 
//                     scale: toy.size === "large" ? 1.03 : 1.06, 
//                     y: -6,
//                   }}
//                   className="relative cursor-pointer group"
//                   style={{
//                     zIndex: toy.size === "large" ? 10 : 5,
//                   }}
//                 >
//                   <div
//                     className={`relative transition-all duration-300 ${
//                       toy.size === "large"
//                         ? "w-36 h-36 md:w-52 md:h-52 lg:w-64 lg:h-64"
//                         : "w-32 h-32 md:w-36 md:h-36 lg:w-48 lg:h-48"
//                     }`}
//                     style={{
//                       filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.2))",
//                     }}
//                   >
//                     <Image
//                       src={toy.src}
//                       alt={toy.alt}
//                       fill
//                       className="object-contain transition-all duration-300"
//                       sizes={
//                         toy.size === "large" 
//                           ? "(max-width: 768px) 96px, (max-width: 1024px) 128px, 160px"
//                           : "(max-width: 768px) 80px, (max-width: 1024px) 96px, 128px"
//                       }
//                       priority={currentSlide === 0}
//                     />
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Dual CTA Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.7 }}
//               className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-5"
//             >
//               <Link href={currentData.ctaLink}>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="px-4 md:px-6 py-1.5 md:py-2 bg-gradient-to-r from-[#f97316] to-[#f59e0b] rounded-full font-bold text-white text-xs md:text-sm shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-1.5"
//                   style={{ fontFamily: "'Fredoka One', 'Comic Neue', 'Quicksand', cursive" }}
//                 >
//                   <ShoppingBag className="w-3 h-3 md:w-3.5 md:h-3.5" />
//                   {currentData.ctaText}
//                   <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
//                 </motion.button>
//               </Link>
              
//               <Link href="/products">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="px-4 md:px-6 py-1.5 md:py-2 bg-white/20 backdrop-blur-md rounded-full font-bold text-white text-xs md:text-sm shadow-xl hover:shadow-2xl hover:bg-white/30 transition-all duration-300 flex items-center gap-1.5 border border-white/30"
//                   style={{ fontFamily: "'Fredoka One', 'Comic Neue', 'Quicksand', cursive" }}
//                 >
//                   Browse All Toys
//                 </motion.button>
//               </Link>
//             </motion.div>

//             {/* Trust Indicators */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.9 }}
//               className="flex flex-wrap justify-center gap-2 md:gap-4 mt-3 pt-2 border-t border-white/15"
//             >
//               {[
//                 { text: "✅ Safe" },
//                 { text: "🚚 Free Delivery" },
//                 { text: "💳 COD" },
//                 { text: "⭐ 50k+ Happy" },
//               ].map((item, idx) => (
//                 <div key={idx} className="flex items-center gap-1">
//                   <span className="text-[9px] md:text-[10px] text-white/75" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>{item.text}</span>
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>
//         </AnimatePresence>

//         {/* Navigation Arrows */}
//         <button
//           onClick={prevSlide}
//           className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 border border-white/30 shadow-lg flex items-center justify-center transition-all z-30 group"
//           aria-label="Previous slide"
//         >
//           <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4 text-white group-hover:scale-110 transition-transform" />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 border border-white/30 shadow-lg flex items-center justify-center transition-all z-30 group"
//           aria-label="Next slide"
//         >
//           <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-white group-hover:scale-110 transition-transform" />
//         </button>

//         {/* Dots Indicator */}
//         <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
//           {slidesData.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`transition-all duration-300 rounded-full ${
//                 index === currentSlide
//                   ? "w-4 h-1 bg-white"
//                   : "w-1.5 h-1 bg-white/40 hover:bg-white/60"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slidesData = [
  {
    id: 1,
    label: "TOP TOYS PRODUCTS",
    title: "All Your Baby Needs In Place",
    subtitle: "Find Latest Collection",
    childImage: "https://images.unsplash.com/photo-1595433707802-2b1382c9b9a9?w=400&h=400&fit=crop",
    toys: [
      { src: "https://i.ibb.co.com/G4Jvj6DR/DAZZALING-WINNER-Horse-Rocking-Ride-On-T-Non-Brand-626b8-434507.png", alt: "Car Seat" },
      { src: "https://i.ibb.co.com/99xZp1NT/stroller-c3-removebg-preview.png", alt: "Baby Stroller" },
      { src: "https://i.ibb.co.com/wXy7GdY/png-transparent-toy-graphy-illustration-toys-daquan-child-baby-photography-thumbnail-removebg-previe.png", alt: "Rocking Toy" },
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
    label: "SPECIAL OFFERS",
    title: "Soft Toys & Plushies Collection",
    subtitle: "Cuddle-worthy companions your kids will adore",
    childImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    toys: [
      { src: "https://images.unsplash.com/photo-1535378917042-10a22c959eeb?w=300&h=300&fit=crop", alt: "Robot" },
      { src: "https://images.unsplash.com/photo-1567137283696-b8f01eb2f6b6?w=400&h=400&fit=crop", alt: "Teddy Bear" },
      { src: "https://images.unsplash.com/photo-1567013127542-490d757e6e1f?w=300&h=300&fit=crop", alt: "Blocks" },
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
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-1 px-4 py-1.5 bg-[#5b9aa0] hover:bg-[#4a8a90] text-white text-xs md:text-sm font-medium rounded-full transition-all shadow-md"
                  style={{ fontFamily: "'Fredoka One', 'Comic Neue', 'Quicksand', cursive" }}
                >
                  Shop Now →
                </motion.button>
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
      ? "w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52"
      : "w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
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