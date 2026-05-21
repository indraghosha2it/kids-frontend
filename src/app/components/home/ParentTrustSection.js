// 'use client';

// import { motion } from 'framer-motion';
// import { useState, useEffect } from 'react';
// import { 
//   Shield, 
//   Truck, 
//   CreditCard, 
//   Star, 
//   Award, 
//   Heart, 
//   Clock, 
//   Globe, 
//   ThumbsUp, 
//   Lock, 
//   RefreshCw, 
//   Headphones,
//   Smile,
//   Sparkles,
//   Gift,
//   Users
// } from 'lucide-react';

// export default function ParentsTrustSection() {
//   const [animatedStats, setAnimatedStats] = useState({
//     parents: 0,
//     toys: 0,
//     rating: 0
//   });

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setAnimatedStats({
//         parents: 50000,
//         toys: 1000,
//         rating: 4.9
//       });
//     }, 500);
//     return () => clearTimeout(timer);
//   }, []);

//   const trustItems = [
//     {
//       id: 1,
//       icon: Shield,
//       title: '100% Safe Toys',
//       description: 'All products certified non-toxic & child-safe. BPA-free, lead-free materials.',
//       color: '#4A8A90',
//       bgColor: '#D4EDEE',
//       stat: '10,000+',
//       statLabel: 'Happy Kids',
//       badge: 'Certified'
//     },
//     {
//       id: 2,
//       icon: Truck,
//       title: 'Fast Delivery',
//       description: 'Free delivery on orders over ৳2000. Express shipping available nationwide.',
//       color: '#FFB6C1',
//       bgColor: '#FFF0F3',
//       stat: '24-48 hrs',
//       statLabel: 'Express Delivery',
//       badge: 'Pan Bd'
//     },
//     {
//       id: 3,
//       icon: CreditCard,
//       title: 'COD Available',
//       description: 'Pay when you receive the product. Multiple payment options including bKash, Nagad.',
//       color: '#4A8A90',
//       bgColor: '#D4EDEE',
//       stat: '100% Secure',
//       statLabel: 'Transactions',
//       badge: 'Trusted'
//     },
//     {
//       id: 4,
//       icon: RefreshCw,
//       title: 'Easy Returns',
//       description: '7-day hassle-free return policy. No questions asked on defective products.',
//       color: '#FFB6C1',
//       bgColor: '#FFF0F3',
//       stat: '100%',
//       statLabel: 'Satisfaction',
//       badge: 'Guaranteed'
//     }
//   ];

//   const qualityBadges = [
//     { icon: Award, label: 'Award Winning', color: '#FFD700' },
//     { icon: Lock, label: 'Secure Checkout', color: '#4A8A90' },
//     { icon: Headphones, label: '24/7 Support', color: '#FFB6C1' },
//     { icon: Globe, label: 'Nationwide', color: '#4A8A90' },
//     { icon: Heart, label: 'Kid-Approved', color: '#FF6B6B' },
//     { icon: ThumbsUp, label: 'Verified Reviews', color: '#4A8A90' }
//   ];

//   const reviews = [
//     {
//       id: 1,
//       name: 'Sarah Ahmed',
//       role: 'Mother of 2',
//       rating: 5,
//       text: 'The quality of toys is amazing! My kids absolutely love their new STEM kit. Fast delivery and great customer service.',
//       avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
//       verified: true
//     },
//     {
//       id: 2,
//       name: 'Rafiq Hasan',
//       role: 'Father of 3',
//       rating: 5,
//       text: 'Best online toy store in Bangladesh! My children are obsessed with the RC cars. COD option gave me confidence.',
//       avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
//       verified: true
//     },
//     {
//       id: 3,
//       name: 'Tanvir Hossain',
//       role: 'Grandfather',
//       rating: 5,
//       text: 'Excellent quality educational toys. My grandson learned so much from the Montessori set. Highly recommended!',
//       avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
//       verified: true
//     }
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: "easeOut" }
//     }
//   };

//   const statVariants = {
//     hidden: { scale: 0 },
//     visible: {
//       scale: 1,
//       transition: { type: "spring", stiffness: 200, damping: 15 }
//     }
//   };

//   return (
//     <section className="py-12 md:py-16  lg:py-20 bg-[#ECFEFF] overflow-hidden">
//       <div className="container mx-auto pb-4 max-w-7xl">
        
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center  mb-10 md:mb-14"
//         >
//           <div className="inline-flex items-center gap-2 mb-3">
//             <Heart className="w-5 h-5 text-[#FFB6C1] fill-[#FFB6C1]" />
//             <span className="text-xs font-medium text-[#4A8A90] tracking-wide uppercase" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>
//               Parents Trust Us
//             </span>
//             <Heart className="w-5 h-5 text-[#FFB6C1] fill-[#FFB6C1]" />
//           </div>
          
//           <motion.h2 
//             className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D3A5C] mb-3"
//             style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}
//           >
//             Why Parents{' '}
//             <span className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] bg-clip-text text-transparent">
//               Love Us
//             </span>
//           </motion.h2>
          
//           <p className="text-sm md:text-base text-[#6B7280] max-w-2xl mx-auto" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>
//             Join thousands of happy parents who trust us for their children's happiness and safety
//           </p>
//         </motion.div>


//         {/* Trust Items Grid */}
//         <motion.div 
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16"
//         >
//           {trustItems.map((item) => (
//             <motion.div
//               key={item.id}
//               variants={itemVariants}
//               whileHover={{ y: -8, transition: { duration: 0.3 } }}
//               className="group"
//             >
//               <div className="relative h-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#D4EDEE]">
//                 {/* Badge */}
//                 <div className="absolute -top-3 -right-3">
//                   <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-gradient-to-r from-[#FFB6C1] to-[#4A8A90] text-white shadow-md">
//                     {item.badge}
//                   </span>
//                 </div>
                
//                 {/* Icon */}
//                 <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`} style={{ backgroundColor: item.bgColor }}>
//                   <item.icon className="w-7 h-7" style={{ color: item.color }} />
//                 </div>
                
//                 {/* Title */}
//                 <h3 className="text-lg font-bold text-[#2D3A5C] mb-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                   {item.title}
//                 </h3>
                
//                 {/* Description */}
//                 <p className="text-sm text-gray-500 mb-3" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>
//                   {item.description}
//                 </p>
                
//                 {/* Stat */}
//                 <div className="pt-3 border-t border-gray-100">
//                   <p className="text-xs text-gray-400">{item.statLabel}</p>
//                   <p className="text-xl font-bold text-[#4A8A90]" style={{ fontFamily: "'Fredoka One', cursive" }}>{item.stat}</p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>


      

//         {/* Call to Action Banner */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="mt-12 md:mt-16 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] rounded-2xl p-6 md:p-8 text-center relative overflow-hidden"
//         >
//           {/* Decorative floating bubbles */}
//           <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
//             <div className="absolute top-5 left-10 w-10 h-10 bg-white/20 rounded-full animate-bounce-slow"></div>
//             <div className="absolute bottom-5 right-10 w-16 h-16 bg-white/20 rounded-full animate-float"></div>
//             <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
//           </div>
          
//           <div className="relative z-10">
//             <h3 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//               Ready to Make Your Child Smile?
//             </h3>
//             <p className="text-white/90 mb-6 max-w-md mx-auto text-sm md:text-base">
//               Join thousands of happy parents who choose us for quality toys
//             </p>
//             <button className="bg-white text-[#4A8A90] hover:bg-[#FFF9F0] px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
//               Shop Now
//               <Sparkles className="w-4 h-4" />
//             </button>
//           </div>
//         </motion.div>
//       </div>

//       <style jsx>{`
//         @keyframes bounce-slow {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-15px); }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0) translateX(0); }
//           25% { transform: translateY(-10px) translateX(10px); }
//           75% { transform: translateY(10px) translateX(-10px); }
//         }
//         .animate-bounce-slow {
//           animation: bounce-slow 3s ease-in-out infinite;
//         }
//         .animate-float {
//           animation: float 5s ease-in-out infinite;
//         }
//         .animate-pulse {
//           animation: pulse 2s ease-in-out infinite;
//         }
//         @keyframes pulse {
//           0%, 100% { transform: scale(1); opacity: 0.2; }
//           50% { transform: scale(1.2); opacity: 0.4; }
//         }
//       `}</style>
//     </section>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Shield, 
  Truck, 
  CreditCard, 
  Star, 
  Award, 
  Heart, 
  Clock, 
  Globe, 
  ThumbsUp, 
  Lock, 
  RefreshCw, 
  Headphones,
  Smile,
  Sparkles,
  Gift,
  Users
} from 'lucide-react';
import Link from 'next/link';

export default function ParentsTrustSection() {
  const [animatedStats, setAnimatedStats] = useState({
    parents: 0,
    toys: 0,
    rating: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        parents: 50000,
        toys: 1000,
        rating: 4.9
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const trustItems = [
    {
      id: 1,
      icon: Shield,
      title: '100% Safe Toys',
      description: 'All products certified non-toxic & child-safe. BPA-free, lead-free materials.',
      color: '#4A8A90',
      bgColor: '#D4EDEE',
      stat: '10,000+',
      statLabel: 'Happy Kids',
      badge: 'Certified'
    },
    {
      id: 2,
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Free delivery on orders over ৳2000. Express shipping available nationwide.',
      color: '#FFB6C1',
      bgColor: '#FFF0F3',
      stat: '24-48 hrs',
      statLabel: 'Express Delivery',
      badge: 'Pan Bd'
    },
    {
      id: 3,
      icon: CreditCard,
      title: 'COD Available',
      description: 'Pay when you receive the product. Multiple payment options including bKash, Nagad.',
      color: '#4A8A90',
      bgColor: '#D4EDEE',
      stat: '100% Secure',
      statLabel: 'Transactions',
      badge: 'Trusted'
    },
    {
      id: 4,
      icon: RefreshCw,
      title: 'Easy Returns',
      description: '7-day hassle-free return policy. No questions asked on defective products.',
      color: '#FFB6C1',
      bgColor: '#FFF0F3',
      stat: '100%',
      statLabel: 'Satisfaction',
      badge: 'Guaranteed'
    }
  ];

  const qualityBadges = [
    { icon: Award, label: 'Award Winning', color: '#FFD700' },
    { icon: Lock, label: 'Secure Checkout', color: '#4A8A90' },
    { icon: Headphones, label: '24/7 Support', color: '#FFB6C1' },
    { icon: Globe, label: 'Nationwide', color: '#4A8A90' },
    { icon: Heart, label: 'Kid-Approved', color: '#FF6B6B' },
    { icon: ThumbsUp, label: 'Verified Reviews', color: '#4A8A90' }
  ];

  const reviews = [
    {
      id: 1,
      name: 'Sarah Ahmed',
      role: 'Mother of 2',
      rating: 5,
      text: 'The quality of toys is amazing! My kids absolutely love their new STEM kit. Fast delivery and great customer service.',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      verified: true
    },
    {
      id: 2,
      name: 'Rafiq Hasan',
      role: 'Father of 3',
      rating: 5,
      text: 'Best online toy store in Bangladesh! My children are obsessed with the RC cars. COD option gave me confidence.',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      verified: true
    },
    {
      id: 3,
      name: 'Tanvir Hossain',
      role: 'Grandfather',
      rating: 5,
      text: 'Excellent quality educational toys. My grandson learned so much from the Montessori set. Highly recommended!',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      verified: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-[#ECFEFF] overflow-hidden -mt-10 lg:-mt-24">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-14"
        >
          <div className="inline-flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#FFB6C1] fill-[#FFB6C1]" />
            <span className="text-[9px] sm:text-xs font-medium text-[#4A8A90] tracking-wide uppercase" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>
              Parents Trust Us
            </span>
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#FFB6C1] fill-[#FFB6C1]" />
          </div>
          
          <motion.h2 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#2D3A5C] mb-2 sm:mb-3 px-2"
            style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}
          >
            Why Parents{' '}
            <span className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] bg-clip-text text-transparent">
              Love Us
            </span>
          </motion.h2>
          
          <p className="text-[10px] sm:text-xs md:text-sm text-[#6B7280] max-w-2xl mx-auto px-4" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>
            Join thousands of happy parents who trust us for their children's happiness and safety
          </p>
        </motion.div>

        {/* Trust Items Grid - 2 columns on mobile, 4 on desktop */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          {trustItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#D4EDEE]">
                {/* Badge */}
                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3">
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-[#FFB6C1] to-[#4A8A90] text-white shadow-md">
                    {item.badge}
                  </span>
                </div>
                
                {/* Icon */}
                <div className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4 transition-transform group-hover:scale-110`} style={{ backgroundColor: item.bgColor }}>
                  <item.icon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" style={{ color: item.color }} />
                </div>
                
                {/* Title */}
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-[#2D3A5C] mb-1 sm:mb-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3 line-clamp-2" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>
                  {item.description}
                </p>
                
                {/* Stat */}
                <div className="pt-2 sm:pt-3 border-t border-gray-100">
                  <p className="text-[8px] sm:text-[9px] md:text-xs text-gray-400">{item.statLabel}</p>
                  <p className="text-xs sm:text-sm md:text-base lg:text-xl font-bold text-[#4A8A90]" style={{ fontFamily: "'Fredoka One', cursive" }}>{item.stat}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quality Badges - Scrollable on mobile */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-4 sm:mb-6"
          >
            <span className="text-[10px] sm:text-xs font-medium text-[#4A8A90] bg-white/60 px-3 py-1 rounded-full">
              ⭐ Quality Assured
            </span>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            {qualityBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white rounded-full shadow-sm border border-gray-100"
              >
                <badge.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" style={{ color: badge.color }} />
                <span className="text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-700 whitespace-nowrap">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>



        {/* Call to Action Banner - Responsive */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 text-center relative overflow-hidden"
        >
          {/* Decorative floating bubbles - Hidden on mobile */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden sm:block">
            <div className="absolute top-5 left-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full animate-bounce-slow"></div>
            <div className="absolute bottom-5 right-10 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full animate-float"></div>
            <div className="absolute top-1/2 left-1/4 w-4 h-4 sm:w-6 sm:h-6 bg-white/20 rounded-full animate-pulse"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-2 sm:mb-3 px-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
              Ready to Make Your Child Smile?
            </h3>
            <p className="text-white/90 mb-4 sm:mb-5 md:mb-6 max-w-md mx-auto text-[10px] sm:text-xs md:text-sm">
              Join thousands of happy parents who choose us for quality toys
            </p>
            <Link href="/products">
              <button className="bg-white text-[#4A8A90] hover:bg-[#FFF9F0] px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base">
                Shop Now
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(10px); }
          75% { transform: translateY(10px) translateX(-10px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.4; }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}