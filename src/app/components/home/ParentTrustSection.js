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

  const statVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 }
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-[#FFF9F0] overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-[#FFB6C1] fill-[#FFB6C1]" />
            <span className="text-xs font-medium text-[#4A8A90] tracking-wide uppercase" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>
              Parents Trust Us
            </span>
            <Heart className="w-5 h-5 text-[#FFB6C1] fill-[#FFB6C1]" />
          </div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D3A5C] mb-3"
            style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}
          >
            Why Parents{' '}
            <span className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] bg-clip-text text-transparent">
              Love Us
            </span>
          </motion.h2>
          
          <p className="text-sm md:text-base text-[#6B7280] max-w-2xl mx-auto" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>
            Join thousands of happy parents who trust us for their children's happiness and safety
          </p>
        </motion.div>


        {/* Trust Items Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16"
        >
          {trustItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#D4EDEE]">
                {/* Badge */}
                <div className="absolute -top-3 -right-3">
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-gradient-to-r from-[#FFB6C1] to-[#4A8A90] text-white shadow-md">
                    {item.badge}
                  </span>
                </div>
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`} style={{ backgroundColor: item.bgColor }}>
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-[#2D3A5C] mb-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-500 mb-3" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>
                  {item.description}
                </p>
                
                {/* Stat */}
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">{item.statLabel}</p>
                  <p className="text-xl font-bold text-[#4A8A90]" style={{ fontFamily: "'Fredoka One', cursive" }}>{item.stat}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>


      

        {/* Call to Action Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 md:mt-16 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] rounded-2xl p-6 md:p-8 text-center relative overflow-hidden"
        >
          {/* Decorative floating bubbles */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-5 left-10 w-10 h-10 bg-white/20 rounded-full animate-bounce-slow"></div>
            <div className="absolute bottom-5 right-10 w-16 h-16 bg-white/20 rounded-full animate-float"></div>
            <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
              Ready to Make Your Child Smile?
            </h3>
            <p className="text-white/90 mb-6 max-w-md mx-auto text-sm md:text-base">
              Join thousands of happy parents who choose us for quality toys
            </p>
            <button className="bg-white text-[#4A8A90] hover:bg-[#FFF9F0] px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
              Shop Now
              <Sparkles className="w-4 h-4" />
            </button>
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
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}