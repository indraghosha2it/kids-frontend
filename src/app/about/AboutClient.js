// // app/about/AboutClient.js
// 'use client';

// import Link from 'next/link';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useRef, useState, useEffect } from 'react';
// import { 
//   Heart, 
//   Shield, 
//   Star,
//   Gift,
//   Rocket,
//   Puzzle,
//   Leaf,
//   Users,
//   Smile
// } from 'lucide-react';

// // Counter Component for Stats
// function Counter({ target, suffix = '', duration = 2000 }) {
//   const [count, setCount] = useState(0);
//   const [hasAnimated, setHasAnimated] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !hasAnimated) {
//           setHasAnimated(true);
//           let start = 0;
//           const increment = target / (duration / 16);
//           const timer = setInterval(() => {
//             start += increment;
//             if (start >= target) {
//               setCount(target);
//               clearInterval(timer);
//             } else {
//               setCount(Math.floor(start));
//             }
//           }, 16);
//           return () => clearInterval(timer);
//         }
//       },
//       { threshold: 0.3 }
//     );

//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [target, duration, hasAnimated]);

//   return (
//     <span ref={ref} className="text-3xl md:text-4xl font-bold text-[#2D3A5C]">
//       {count}{suffix}
//     </span>
//   );
// }

// // Fixed floating elements with deterministic positions
// const floatingElements = [
//   { emoji: '🎈', left: '5%', top: '15%', delay: 0, duration: 8 },
//   { emoji: '🧸', left: '85%', top: '20%', delay: 1, duration: 10 },
//   { emoji: '🎪', left: '10%', top: '70%', delay: 2, duration: 9 },
//   { emoji: '🎨', left: '90%', top: '65%', delay: 0.5, duration: 11 },
//   { emoji: '🚀', left: '15%', top: '40%', delay: 1.5, duration: 7 },
//   { emoji: '⭐', left: '80%', top: '35%', delay: 2.5, duration: 12 },
//   { emoji: '🎮', left: '45%', top: '80%', delay: 3, duration: 6 },
//   { emoji: '🎵', left: '70%', top: '85%', delay: 0.8, duration: 9 },
//   { emoji: '📚', left: '30%', top: '25%', delay: 1.8, duration: 8 },
//   { emoji: '🎯', left: '60%', top: '50%', delay: 2.2, duration: 10 },
//   { emoji: '🎁', left: '25%', top: '55%', delay: 1.2, duration: 7.5 },
//   { emoji: '🧩', left: '75%', top: '10%', delay: 2.8, duration: 9.5 },
// ];

// export default function AboutClient() {
//   const targetRef = useRef(null);
//   const [mounted, setMounted] = useState(false);
//   const [scrollYProgress, setScrollYProgress] = useState(0);
  
//   // Use useScroll only after mounted and ensure ref is attached
//   const { scrollYProgress: scrollProgress } = useScroll({
//     target: targetRef,
//     offset: ["start start", "end start"]
//   });
  
//   const opacity = useTransform(scrollProgress, [0, 0.5], [1, 0]);
//   const scale = useTransform(scrollProgress, [0, 0.5], [1, 0.9]);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const stats = [
//     { value: 50000, label: 'Happy Kids', icon: Smile, color: 'from-[#FFD93D] to-[#FFB347]', suffix: '+' },
//     { value: 1000, label: 'Toys Available', icon: Gift, color: 'from-[#4A8A90] to-[#6CB4B8]', suffix: '+' },
//     { value: 98, label: 'Parent Satisfaction', icon: Heart, color: 'from-[#FFB6C1] to-[#FF85A1]', suffix: '%' },
//     { value: 24, label: 'Support Hours', icon: Users, color: 'from-[#9B59B6] to-[#C39BD3]', suffix: '/7' },
//   ];

//   const values = [
//     {
//       title: 'Safety First',
//       description: 'All our toys undergo rigorous safety testing to meet international standards.',
//       icon: Shield,
//     },
//     {
//       title: 'Learning Through Play',
//       description: 'Play is the best way to learn. Our toys spark curiosity and creativity.',
//       icon: Puzzle,
//     },
//     {
//       title: 'Eco-Friendly',
//       description: 'We care about our planet with sustainable materials and eco-friendly packaging.',
//       icon: Leaf,
//     },
//     {
//       title: 'Joy for All',
//       description: 'Inclusive toys that celebrate diversity and bring joy to all children.',
//       icon: Heart,
//     },
//   ];

//   const teamMembers = [
//     {
//       name: 'Sarah Johnson',
//       role: 'Chief Toy Officer',
//       image: 'https://randomuser.me/api/portraits/women/68.jpg',
//     },
//     {
//       name: 'Michael Chen',
//       role: 'Head of Product Safety',
//       image: 'https://randomuser.me/api/portraits/men/32.jpg',
//     },
//     {
//       name: 'Emma Rodriguez',
//       role: 'Creative Director',
//       image: 'https://randomuser.me/api/portraits/women/44.jpg',
//     },
//     {
//       name: 'David Kim',
//       role: 'Customer Happiness Lead',
//       image: 'https://randomuser.me/api/portraits/men/75.jpg',
//     },
//   ];

//   const milestones = [
//     { year: '2020', title: 'Our Journey Begins', description: 'ToyMart was founded to bring joy to every child.', icon: Rocket },
//     { year: '2021', title: 'First 10,000 Orders', description: 'Serving 10,000+ happy families across Bangladesh.', icon: Star },
//     { year: '2022', title: 'Expanded Categories', description: 'Added 500+ new educational and STEM toys.', icon: Gift },
//     { year: '2024', title: 'Eco-Friendly Initiative', description: 'Launched sustainable packaging and eco-friendly toys.', icon: Leaf },
//   ];

//   // Loading state
//   if (!mounted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-[#4A8A90] via-[#6CB4B8] to-[#FFB6C1]">
//         <div className="container mx-auto px-4 py-20 text-center">
//           <div className="w-20 h-20 mx-auto bg-white/20 rounded-full animate-pulse"></div>
//           <div className="h-10 w-48 bg-white/20 rounded mx-auto mt-4 animate-pulse"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen overflow-x-hidden" ref={targetRef}>
//       {/* Hero Section */}
//       <section className="relative min-h-[40vh] md:min-h-[45vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#4A8A90] via-[#6CB4B8] to-[#FFB6C1]">
//         {/* Floating Elements - Fixed positions */}
//         <div className="absolute inset-0 pointer-events-none">
//           {floatingElements.map((item, i) => (
//             <motion.div
//               key={i}
//               className="absolute text-xl md:text-3xl"
//               style={{ left: item.left, top: item.top }}
//               animate={{ 
//                 y: [0, -25, 0],
//                 x: [0, 10, 0],
//                 rotate: [0, 10, -10, 0],
//               }}
//               transition={{ 
//                 duration: item.duration,
//                 delay: item.delay,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//             >
//               {item.emoji}
//             </motion.div>
//           ))}
//         </div>

//         <motion.div 
//           style={{ opacity, scale }}
//           className="relative z-10 text-center px-4 max-w-4xl mx-auto"
//         >
//           <motion.div
//             initial={{ scale: 0, rotate: -180 }}
//             animate={{ scale: 1, rotate: 0 }}
//             transition={{ type: "spring", duration: 0.6 }}
//             className="inline-block mb-4"
//           >
//             <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
//               <span className="text-4xl md:text-5xl">🧸</span>
//             </div>
//           </motion.div>
          
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3"
//             style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}
//           >
//             Where Dreams Come
//             <span className="block bg-gradient-to-r from-[#FFD93D] to-[#FFB347] bg-clip-text text-transparent">
//               to Life! 🎈
//             </span>
//           </motion.h1>
          
//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="text-white/90 text-base md:text-lg max-w-2xl mx-auto"
//           >
//             We're on a mission to bring joy, spark imagination, and create magical moments 
//             for children across Bangladesh!
//           </motion.p>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="mt-5"
//           >
//             <Link href="/products">
//               <button className="bg-white text-[#4A8A90] px-6 py-2.5 rounded-full font-bold text-base shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-2 mx-auto">
//                 Explore Our Toys <Rocket className="w-4 h-4" />
//               </button>
//             </Link>
//           </motion.div>
//         </motion.div>
        
//         {/* Wave Bottom */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg viewBox="0 0 1440 60" fill="white" preserveAspectRatio="none" className="w-full">
//             <path d="M0,32L80,37.3C160,43,320,53,480,48C640,43,800,21,960,16C1120,11,1280,21,1360,26.7L1440,32L1440,60L1360,60C1280,60,1120,60,960,60C800,60,640,60,480,60C320,60,160,60,80,60L0,60Z"/>
//           </svg>
//         </div>
//       </section>

//       {/* Story Section */}
//       <section className="py-12 md:py-16 bg-white">
//         <div className="container mx-auto px-4 max-w-6xl">
//           <div className="grid md:grid-cols-2 gap-10 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="relative"
//             >
//               <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#FFB6C1] rounded-full opacity-20"></div>
//               <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#D4EDEE] rounded-full opacity-30"></div>
//               <img 
//                 src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=400&fit=crop"
//                 alt="Kids playing with toys"
//                 className="rounded-2xl shadow-xl relative z-10 w-full object-cover h-72"
//               />
//             </motion.div>
            
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="space-y-4"
//             >
//               <div className="inline-flex items-center gap-2 mb-2">
//                 <span className="text-[#FFB6C1]">✨</span>
//                 <span className="text-xs font-medium text-[#4A8A90] tracking-wide uppercase">Our Story</span>
//               </div>
//               <h2 className="text-2xl md:text-3xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                 How ToyMart 🎁 Was Born
//               </h2>
//               <p className="text-gray-600 leading-relaxed text-sm md:text-base">
//                 ToyMart started with a simple idea: every child deserves access to safe, 
//                 educational, and fun toys that spark their imagination. What began as a 
//                 small online shop in Dhaka has grown into Bangladesh's most trusted 
//                 destination for kids' toys.
//               </p>
//               <p className="text-gray-600 leading-relaxed text-sm md:text-base">
//                 We're parents, teachers, and toy enthusiasts who understand the importance 
//                 of play in child development. That's why we personally test every product 
//                 to ensure it meets our high standards for safety, durability, and educational value.
//               </p>
//               <div className="flex items-center gap-2 text-[#4A8A90] font-semibold text-sm">
//                 <Heart className="w-4 h-4 fill-[#FFB6C1] text-[#FFB6C1]" />
//                 <span>Made with love for little ones everywhere!</span>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section with Counter */}
//       <section className="py-10 bg-gradient-to-r from-[#D4EDEE] to-[#FFF0F3]">
//         <div className="container mx-auto px-4 max-w-6xl">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="text-center bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all"
//               >
//                 <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center`}>
//                   <stat.icon className="w-6 h-6 text-white" />
//                 </div>
//                 <Counter target={stat.value} suffix={stat.suffix} />
//                 <div className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Our Values Section */}
//       <section className="py-12 md:py-16 bg-white">
//         <div className="container mx-auto px-4 max-w-6xl">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center gap-2 mb-2">
//               <Star className="w-4 h-4 text-[#FFD93D] fill-[#FFD93D]" />
//               <span className="text-xs font-medium text-[#4A8A90] tracking-wide uppercase">What We Believe</span>
//             </div>
//             <h2 className="text-2xl md:text-3xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//               Our Core Values 🌟
//             </h2>
//           </div>
          
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
//             {values.map((value, index) => (
//               <motion.div
//                 key={value.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 className="text-center p-5 rounded-xl bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE] hover:shadow-md transition-all"
//               >
//                 <div className="w-14 h-14 bg-[#4A8A90] rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
//                   <value.icon className="w-7 h-7 text-white" />
//                 </div>
//                 <h3 className="font-bold text-[#2D3A5C] mb-2 text-base">{value.title}</h3>
//                 <p className="text-xs text-gray-500 leading-relaxed">{value.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Milestone Timeline */}
//       <section className="py-12 bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE]">
//         <div className="container mx-auto px-4 max-w-5xl">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center gap-2 mb-2">
//               <Rocket className="w-4 h-4 text-[#4A8A90]" />
//               <span className="text-xs font-medium text-[#4A8A90] tracking-wide uppercase">Our Journey</span>
//             </div>
//             <h2 className="text-2xl md:text-3xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//               Milestones 🎯
//             </h2>
//           </div>
          
//           <div className="grid md:grid-cols-4 gap-4">
//             {milestones.map((milestone, index) => (
//               <motion.div
//                 key={milestone.year}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="relative text-center"
//               >
//                 <div className="relative z-10 mb-3">
//                   <div className="w-12 h-12 mx-auto bg-white rounded-full shadow-md flex items-center justify-center border-3 border-[#FFB6C1]">
//                     <milestone.icon className="w-5 h-5 text-[#4A8A90]" />
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-lg p-3 shadow-sm">
//                   <span className="inline-block px-2 py-0.5 bg-[#FFB6C1] text-white rounded-full text-xs font-bold mb-1">
//                     {milestone.year}
//                   </span>
//                   <h3 className="font-bold text-[#2D3A5C] text-sm mb-1">{milestone.title}</h3>
//                   <p className="text-gray-500 text-xs">{milestone.description}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="py-12 md:py-16 bg-white">
//         <div className="container mx-auto px-4 max-w-6xl">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center gap-2 mb-2">
//               <Users className="w-4 h-4 text-[#4A8A90]" />
//               <span className="text-xs font-medium text-[#4A8A90] tracking-wide uppercase">Meet The Team</span>
//             </div>
//             <h2 className="text-2xl md:text-3xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//               The Faces Behind the Magic 🎪
//             </h2>
//           </div>
          
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
//             {teamMembers.map((member, index) => (
//               <motion.div
//                 key={member.name}
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 className="bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE] rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all"
//               >
//                 <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-3 border-white shadow-md">
//                   <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
//                 </div>
//                 <h3 className="font-bold text-[#2D3A5C] text-base">{member.name}</h3>
//                 <p className="text-xs text-[#4A8A90] font-semibold">{member.role}</p>
//                 <div className="flex justify-center gap-0.5 mt-2">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-3 h-3 fill-[#FFD93D] text-[#FFD93D]" />
//                   ))}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-10 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1]">
//         <div className="container mx-auto px-4 max-w-4xl text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-white"
//           >
//             <Gift className="w-12 h-12 mx-auto mb-3 text-white/80" />
//             <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//               Ready to Make Magical Memories? 🎈
//             </h2>
//             <p className="text-white/90 text-sm md:text-base mb-5 max-w-xl mx-auto">
//               Join thousands of happy families who trust ToyMart for quality toys that inspire joy and learning.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 justify-center">
//               <Link href="/products">
//                 <button className="bg-white text-[#4A8A90] px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2 mx-auto sm:mx-0 text-sm">
//                   Shop Now <Gift className="w-4 h-4" />
//                 </button>
//               </Link>
//               <Link href="/contact">
//                 <button className="border-2 border-white text-white px-6 py-2 rounded-full font-bold hover:bg-white hover:text-[#4A8A90] transition-all flex items-center gap-2 mx-auto sm:mx-0 text-sm">
//                   Contact Us <Heart className="w-4 h-4" />
//                 </button>
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }


// app/about/AboutClient.js
'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Heart, 
  Shield, 
  Star,
  Gift,
  Rocket,
  Puzzle,
  Leaf,
  Users,
  Smile
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Counter Component for Stats
function Counter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-[#2D3A5C]">
      {count}{suffix}
    </span>
  );
}

// Fixed floating elements with deterministic positions
const floatingElements = [
  { emoji: '🎈', left: '5%', top: '15%', delay: 0, duration: 8 },
  { emoji: '🧸', left: '85%', top: '20%', delay: 1, duration: 10 },
  { emoji: '🎪', left: '10%', top: '70%', delay: 2, duration: 9 },
  { emoji: '🎨', left: '90%', top: '65%', delay: 0.5, duration: 11 },
  { emoji: '🚀', left: '15%', top: '40%', delay: 1.5, duration: 7 },
  { emoji: '⭐', left: '80%', top: '35%', delay: 2.5, duration: 12 },
  { emoji: '🎮', left: '45%', top: '80%', delay: 3, duration: 6 },
  { emoji: '🎵', left: '70%', top: '85%', delay: 0.8, duration: 9 },
  { emoji: '📚', left: '30%', top: '25%', delay: 1.8, duration: 8 },
  { emoji: '🎯', left: '60%', top: '50%', delay: 2.2, duration: 10 },
  { emoji: '🎁', left: '25%', top: '55%', delay: 1.2, duration: 7.5 },
  { emoji: '🧩', left: '75%', top: '10%', delay: 2.8, duration: 9.5 },
];

export default function AboutClient() {
  const targetRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);
  
  // Only initialize useScroll after mount and when ref is ready
  const { scrollYProgress } = useScroll({
    target: canAnimate ? targetRef : undefined,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    setMounted(true);
    // Small delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      if (targetRef.current) {
        setCanAnimate(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { value: 50000, label: 'Happy Kids', icon: Smile, color: 'from-[#FFD93D] to-[#FFB347]', suffix: '+' },
    { value: 1000, label: 'Toys Available', icon: Gift, color: 'from-[#4A8A90] to-[#6CB4B8]', suffix: '+' },
    { value: 98, label: 'Parent Satisfaction', icon: Heart, color: 'from-[#FFB6C1] to-[#FF85A1]', suffix: '%' },
    { value: 24, label: 'Support Hours', icon: Users, color: 'from-[#9B59B6] to-[#C39BD3]', suffix: '/7' },
  ];

  const values = [
    {
      title: 'Safety First',
      description: 'All our toys undergo rigorous safety testing to meet international standards.',
      icon: Shield,
    },
    {
      title: 'Learning Through Play',
      description: 'Play is the best way to learn. Our toys spark curiosity and creativity.',
      icon: Puzzle,
    },
    {
      title: 'Eco-Friendly',
      description: 'We care about our planet with sustainable materials and eco-friendly packaging.',
      icon: Leaf,
    },
    {
      title: 'Joy for All',
      description: 'Inclusive toys that celebrate diversity and bring joy to all children.',
      icon: Heart,
    },
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Chief Toy Officer',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Product Safety',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Creative Director',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'David Kim',
      role: 'Customer Happiness Lead',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
  ];

  const milestones = [
    { year: '2020', title: 'Our Journey Begins', description: 'ToyMart was founded to bring joy to every child.', icon: Rocket },
    { year: '2021', title: 'First 10,000 Orders', description: 'Serving 10,000+ happy families across Bangladesh.', icon: Star },
    { year: '2022', title: 'Expanded Categories', description: 'Added 500+ new educational and STEM toys.', icon: Gift },
    { year: '2024', title: 'Eco-Friendly Initiative', description: 'Launched sustainable packaging and eco-friendly toys.', icon: Leaf },
  ];

  // Loading state
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4A8A90] via-[#6CB4B8] to-[#FFB6C1]">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 mx-auto bg-white/20 rounded-full animate-pulse"></div>
          <div className="h-10 w-48 bg-white/20 rounded mx-auto mt-4 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen overflow-x-hidden" ref={targetRef}>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[45vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#4A8A90] via-[#6CB4B8] to-[#FFB6C1]">
        {/* Floating Elements - Fixed positions */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingElements.map((item, i) => (
            <motion.div
              key={i}
              className="absolute text-xl md:text-3xl"
              style={{ left: item.left, top: item.top }}
              animate={{ 
                y: [0, -25, 0],
                x: [0, 10, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ 
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </div>

        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
         
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3"
            style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}
          >
            Where Dreams Come
            <span className="block bg-gradient-to-r from-[#FFD93D] to-[#FFB347] bg-clip-text text-transparent">
              to Life!
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/90 text-base md:text-lg max-w-2xl mx-auto"
          >
            We're on a mission to bring joy, spark imagination, and create magical moments 
            for children across Bangladesh!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-5"
          >
            <Link href="/products">
              <button className="bg-white text-[#4A8A90] px-6 py-2.5 rounded-full font-bold text-base shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-2 mx-auto">
                Explore Our Toys <Rocket className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="white" preserveAspectRatio="none" className="w-full">
            <path d="M0,32L80,37.3C160,43,320,53,480,48C640,43,800,21,960,16C1120,11,1280,21,1360,26.7L1440,32L1440,60L1360,60C1280,60,1120,60,960,60C800,60,640,60,480,60C320,60,160,60,80,60L0,60Z"/>
          </svg>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#FFB6C1] rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#D4EDEE] rounded-full opacity-30"></div>
              <img 
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=400&fit=crop"
                alt="Kids playing with toys"
                className="rounded-2xl shadow-xl relative z-10 w-full object-cover h-72"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="text-[#FFB6C1]">✨</span>
                <span className="text-xs font-medium text-[#4A8A90] tracking-wide uppercase">Our Story</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                How ToyMart 🎁 Was Born
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                ToyMart started with a simple idea: every child deserves access to safe, 
                educational, and fun toys that spark their imagination. What began as a 
                small online shop in Dhaka has grown into Bangladesh's most trusted 
                destination for kids' toys.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                We're parents, teachers, and toy enthusiasts who understand the importance 
                of play in child development. That's why we personally test every product 
                to ensure it meets our high standards for safety, durability, and educational value.
              </p>
              <div className="flex items-center gap-2 text-[#4A8A90] font-semibold text-sm">
                <Heart className="w-4 h-4 fill-[#FFB6C1] text-[#FFB6C1]" />
                <span>Made with love for little ones everywhere!</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section with Counter */}
      <section className="py-10 bg-gradient-to-r from-[#D4EDEE] to-[#FFF0F3]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <Counter target={stat.value} suffix={stat.suffix} />
                <div className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-[#FFD93D] fill-[#FFD93D]" />
              <span className="text-xs font-medium text-[#4A8A90] tracking-wide uppercase">What We Believe</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
              Our Core Values 🌟
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-5 rounded-xl bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE] hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-[#4A8A90] rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-[#2D3A5C] mb-2 text-base">{value.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestone Timeline */}
      <section className="py-12 bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-2">
              <Rocket className="w-4 h-4 text-[#4A8A90]" />
              <span className="text-xs font-medium text-[#4A8A90] tracking-wide uppercase">Our Journey</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
              Milestones 🎯
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="relative z-10 mb-3">
                  <div className="w-12 h-12 mx-auto bg-white rounded-full shadow-md flex items-center justify-center border-3 border-[#FFB6C1]">
                    <milestone.icon className="w-5 h-5 text-[#4A8A90]" />
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <span className="inline-block px-2 py-0.5 bg-[#FFB6C1] text-white rounded-full text-xs font-bold mb-1">
                    {milestone.year}
                  </span>
                  <h3 className="font-bold text-[#2D3A5C] text-sm mb-1">{milestone.title}</h3>
                  <p className="text-gray-500 text-xs">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

   

      {/* CTA Section */}
      <section className="py-10 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <Gift className="w-12 h-12 mx-auto mb-3 text-white/80" />
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
              Ready to Make Magical Memories? 🎈
            </h2>
            <p className="text-white/90 text-sm md:text-base mb-5 max-w-xl mx-auto">
              Join thousands of happy families who trust ToyMart for quality toys that inspire joy and learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products">
                <button className="bg-white text-[#4A8A90] px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2 mx-auto sm:mx-0 text-sm">
                  Shop Now <Gift className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="border-2 border-white text-white px-6 py-2 rounded-full font-bold hover:bg-white hover:text-[#4A8A90] transition-all flex items-center gap-2 mx-auto sm:mx-0 text-sm">
                  Contact Us <Heart className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
}