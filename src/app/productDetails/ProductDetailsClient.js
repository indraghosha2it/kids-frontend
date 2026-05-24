
// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Star,
//   Heart,
//   Share2,
//   ShoppingCart,
//   Truck,
//   ShieldCheck,
//   RotateCcw,
//   AlertCircle,
//   CheckCircle,
//   Minus,
//   Plus,
//   ZoomIn,
//   Play,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Gift,
//   Sparkles,
//   Users,
//   Package,
//   Tag,
//   Clock,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Mail,
//   Copy,
//   Check,
//   Loader2,
//   Eye,
//   MessageCircle,
//   FolderTree,
//   Maximize2,
//   Zap
// } from 'lucide-react';

// import { toast } from 'sonner';
// import WhatsAppButton from '../components/layout/WhatsAppButton';
// import Footer from '../components/layout/Footer';
// import Navbar from '../components/layout/Navbar';
// import ReviewModal from '../components/home/ReviewModal';
// import MetadataUpdater from './MetadataUpdater';

// // Toy Theme Colors
// const COLORS = {
//   primary: '#4A8A90',
//   secondary: '#FFB6C1',
//   accent: '#FFD93D',
//   lightBg: '#FFF9F0',
//   border: '#FFE0E6',
//   text: '#2D3A5C',
//   textLight: '#8B9DC3',
// };

// // Helper Functions
// const formatPrice = (price) => {
//   return (price || 0).toFixed(2);
// };

// const calculateDiscount = (regular, discount) => {
//   if (regular && discount && discount < regular) {
//     return Math.round(((regular - discount) / regular) * 100);
//   }
//   return 0;
// };

// const getAgeBadge = (ageGroup) => {
//   const styles = {
//     '0-2': { bg: 'bg-pink-100', text: 'text-pink-600', icon: '👶' },
//     '3-5': { bg: 'bg-blue-100', text: 'text-blue-600', icon: '🧒' },
//     '6-10': { bg: 'bg-green-100', text: 'text-green-600', icon: '👧' },
//     '11-14': { bg: 'bg-purple-100', text: 'text-purple-600', icon: '🧑' },
//     '': { bg: 'bg-teal-100', text: 'text-teal-600', icon: '🎈' }  // Add this for empty ageGroup
//   };
//   return styles[ageGroup] || { bg: 'bg-gray-100', text: 'text-gray-600', icon: '🎈' };
// };

// const getAgeGroupBadge = (ageGroup) => {
//   const styles = {
//     '0-2': 'bg-pink-100 text-pink-600',
//     '3-5': 'bg-blue-100 text-blue-600',
//     '6-10': 'bg-green-100 text-green-600',
//     '11-14': 'bg-purple-100 text-purple-600',
//     '': 'bg-teal-100 text-teal-600'  // Add this for empty ageGroup
//   };
//   return styles[ageGroup] || 'bg-gray-100 text-gray-600';
// };

// const getTagStyles = (tag) => {
//   const styles = {
//     'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30',
//     'New Arrival': 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30',
//     'Limited Edition': 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30',
//     'Eco-Friendly': 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30',
//     'Educational': 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30',
//     'STEM Toy': 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30',
//     'Montessori': 'bg-gradient-to-r from-teal-500 to-green-600 text-white shadow-lg shadow-teal-500/30',
//     'Creative Play': 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30',
//     'Outdoor Fun': 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30',
//     'Non-Toxic': 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30',
//     'Award Winner': 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg shadow-yellow-500/30',
//     'Musical Toy': 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30',
//     'Interactive': 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30',
//     'Light Up': 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-500/30',
//     'Remote Control': 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30',
//     'Building Set': 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30',
//     'Puzzle Game': 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/30',
//     'Art & Craft': 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30',
//     'Pretend Play': 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30',
//     'Trending': 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/30',
//   };
//   return styles[tag] || 'bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white';
// };

// const calculateDiscountPercentage = (regular, discount) => {
//   if (regular && discount && discount < regular) {
//     return Math.round(((regular - discount) / regular) * 100);
//   }
//   return 0;
// };

// const getStockStatus = (quantity) => {
//   if (quantity <= 0) return { label: 'Out of Stock', color: 'red', icon: AlertCircle };
//   if (quantity <= 10) return { label: 'Low Stock', color: 'orange', icon: AlertCircle };
//   return { label: 'In Stock', color: 'green', icon: CheckCircle };
// };

// const truncateText = (text, limit = 20) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// // Loading Skeleton Component
// const ProductSkeleton = () => (
//   <div className="min-h-screen bg-[#FFF9F0]">
//     <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8">
//         <div className="lg:col-span-2 animate-pulse">
//           <div className="bg-gray-200 rounded-2xl h-64 sm:h-80 md:h-96 w-full"></div>
//           <div className="flex gap-2 mt-3 md:mt-4">
//             {[1, 2, 3, 4].map(i => (
//               <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-lg"></div>
//             ))}
//           </div>
//         </div>
//         <div className="lg:col-span-3 space-y-3 md:space-y-4 animate-pulse">
//           <div className="h-6 sm:h-7 md:h-8 bg-gray-200 rounded w-3/4"></div>
//           <div className="h-5 sm:h-5 md:h-6 bg-gray-200 rounded w-1/2"></div>
//           <div className="h-20 sm:h-24 md:h-24 bg-gray-200 rounded"></div>
//           <div className="h-10 bg-gray-200 rounded w-full"></div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // Zoom Modal Component
// const ZoomModal = ({ images, currentIndex, onClose, onImageChange }) => (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
//     onClick={onClose}
//   >
//     <div className="relative w-full h-full flex items-center justify-center">
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
//       >
//         <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//       </button>
      
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onImageChange((currentIndex - 1 + images.length) % images.length);
//         }}
//         className="absolute left-2 sm:left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
//       >
//         <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//       </button>
      
//       <motion.div
//         initial={{ scale: 0.9 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0.9 }}
//         className="relative max-w-5xl w-full mx-2 sm:mx-4"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <img
//           src={images[currentIndex]?.url}
//           alt="Zoomed product"
//           className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain rounded-2xl"
//         />
//       </motion.div>
      
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onImageChange((currentIndex + 1) % images.length);
//         }}
//         className="absolute right-2 sm:right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
//       >
//         <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//       </button>
      
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
//         {currentIndex + 1} / {images.length}
//       </div>
//     </div>
//   </motion.div>
// );

// // Share Modal Component
// const ShareModal = ({ product, onClose }) => {
//   const [copied, setCopied] = useState(false);
//   const url = typeof window !== 'undefined' ? window.location.href : '';

//   const shareOptions = [
//     { name: 'Facebook', icon: Facebook, color: '#1877F2', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
//     { name: 'Twitter', icon: Twitter, color: '#1DA1F2', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(product?.productName || 'Check this out!')}&url=${encodeURIComponent(url)}` },
//     { name: 'LinkedIn', icon: Linkedin, color: '#0077B5', url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(product?.productName || '')}` },
//     { name: 'WhatsApp', icon: MessageCircle, color: '#25D366', url: `https://wa.me/?text=${encodeURIComponent(`${product?.productName || ''} - ${url}`)}` },
//     { name: 'Email', icon: Mail, color: '#6B7280', url: `mailto:?subject=${encodeURIComponent(product?.productName || 'Check this toy!')}&body=${encodeURIComponent(url)}` },
//   ];

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(url);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy:', err);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, y: 20 }}
//         animate={{ scale: 1, y: 0 }}
//         exit={{ scale: 0.9, y: 20 }}
//         className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-3 sm:mx-4 overflow-hidden"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="p-4 sm:p-5 border-b border-gray-100 flex justify-between items-center">
//           <h3 className="text-base sm:text-lg font-bold text-[#2D3A5C] flex items-center gap-2">
//             <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A8A90]" />
//             Share this toy
//           </h3>
//           <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition">
//             <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
//           </button>
//         </div>
//         <div className="p-4 sm:p-5">
//           <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
//             {shareOptions.map(option => (
//               <a
//                 key={option.name}
//                 href={option.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-xl hover:bg-gray-50 transition group"
//                 onClick={(e) => {
//                   if (option.name !== 'Email') e.preventDefault();
//                   window.open(option.url, '_blank', 'noopener,noreferrer');
//                 }}
//               >
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition group-hover:scale-110" style={{ backgroundColor: `${option.color}15` }}>
//                   <option.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: option.color }} />
//                 </div>
//                 <span className="text-[10px] sm:text-xs text-gray-600">{option.name}</span>
//               </a>
//             ))}
//           </div>
//           <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl border border-gray-200">
//             <input
//               type="text"
//               value={url}
//               readOnly
//               className="flex-1 text-xs sm:text-sm text-gray-600 bg-transparent outline-none px-1 sm:px-2"
//             />
//             <button
//               onClick={copyToClipboard}
//               className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#4A8A90] text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-[#3A7A80] transition"
//             >
//               {copied ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : <Copy className="w-3 h-3 sm:w-4 sm:h-4" />}
//               <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// // Review Component
// const ReviewCard = ({ review }) => {
//   const [showFullComment, setShowFullComment] = useState(false);
//   const truncatedComment = review.comment?.length > 200 ? review.comment.substring(0, 200) + '...' : review.comment;

//   return (
//     <div className="border-b border-[#FFE0E6] pb-3 sm:pb-4 last:border-0">
//       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center text-white font-bold text-sm sm:text-base">
//             {review.userName?.charAt(0).toUpperCase() || 'U'}
//           </div>
//           <div>
//             <p className="font-semibold text-[#2D3A5C] text-sm sm:text-base">{review.userName}</p>
//             <div className="flex items-center gap-2 mt-0.5">
//               <div className="flex items-center">
//                 {[1, 2, 3, 4, 5].map(star => (
//                   <Star
//                     key={star}
//                     className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
//                   />
//                 ))}
//               </div>
//               <span className="text-[10px] sm:text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
//             </div>
//           </div>
//         </div>
//         {review.isVerifiedPurchase && (
//           <span className="flex items-center gap-1 text-[9px] sm:text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full self-start sm:self-auto">
//             <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//             Verified
//           </span>
//         )}
//       </div>
//       {review.title && <p className="font-medium text-[#2D3A5C] mt-2 text-sm sm:text-base">{review.title}</p>}
//       <p className="text-xs sm:text-sm text-gray-600 mt-1">
//         {showFullComment ? review.comment : truncatedComment}
//         {review.comment?.length > 200 && (
//           <button onClick={() => setShowFullComment(!showFullComment)} className="text-[#4A8A90] text-xs font-medium ml-1">
//             {showFullComment ? 'Show less' : 'Read more'}
//           </button>
//         )}
//       </p>
//       {review.images && review.images.length > 0 && (
//         <div className="flex gap-2 mt-3">
//           {review.images.slice(0, 3).map((img, idx) => (
//             <img key={idx} src={img.url} alt={`Review ${idx + 1}`} className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover border border-gray-200" />
//           ))}
//         </div>
//       )}
//       <div className="flex items-center gap-4 mt-3">
//         <button className="text-[10px] sm:text-xs text-gray-500 hover:text-[#4A8A90] transition flex items-center gap-1">
//           👍 Helpful ({review.helpful || 0})
//         </button>
//       </div>
//     </div>
//   );
// };

// const RelatedProductCard = ({ product, router, isInCart: propIsInCart, isInWishlist: propIsInWishlist }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [wishlistLoading, setWishlistLoading] = useState(false);
  
//   const isInCart = propIsInCart || false;
//   const isWishlisted = propIsInWishlist || false;
//   const productImages = product.images || [];
//   const hasMultipleImages = productImages.length > 1;
//   const primaryTag = product.tags?.[0];
//   const tagStyle = primaryTag ? getTagStyles(primaryTag) : '';
//   const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
//   const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
//   const originalPrice = product.regularPrice;
  
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const handleWishlist = async (e) => {
//     e.stopPropagation();
//     setWishlistLoading(true);
    
//     const toastId = toast.loading(isWishlisted ? 'Removing from wishlist...' : 'Adding to wishlist...');
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('wishlistSessionId');
      
//       const headers = {
//         'Content-Type': 'application/json'
//       };
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch('http://localhost:5000/api/wishlist', {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify({ productId: product._id })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('wishlistSessionId', data.sessionId);
//         }
        
//         toast.success(data.message, { id: toastId });
//         window.dispatchEvent(new Event('wishlist-update'));
//       } else {
//         toast.error(data.error || 'Failed to update wishlist', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Wishlist error:', error);
//       toast.error('Network error. Please try again.', { id: toastId });
//     } finally {
//       setWishlistLoading(false);
//     }
//   };

//   const addToCart = async (e) => {
//     e.stopPropagation();
    
//     if (isInCart) {
//       router.push('/cart');
//       return;
//     }
    
//     setCartStatusLoading(true);
//     const toastId = toast.loading('Adding to cart...');
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
      
//       const headers = {
//         'Content-Type': 'application/json'
//       };
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify({
//           productId: product._id,
//           quantity: 1
//         })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
        
//         toast.success('Added to cart!', { id: toastId });
//         window.dispatchEvent(new Event('cart-update'));
        
//         setTimeout(() => {
//           window.dispatchEvent(new Event('cart-update'));
//         }, 500);
//       } else {
//         toast.error(data.error || 'Failed to add to cart', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error('Network error. Please try again.', { id: toastId });
//     } finally {
//       setCartStatusLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       transition={{
//         layout: { type: "spring", stiffness: 100, damping: 15 },
//         opacity: { duration: 0.3 }
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="group bg-white rounded-xl border border-[#FFE0E6] hover:border-[#FFB6C1] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md overflow-hidden"
//       onClick={() => {
//         if (isMobile) {
//           window.location.href = `/productDetails?id=${product._id}`;
//         } else {
//           window.open(`/productDetails?id=${product._id}`, '_blank');
//         }
//       }}
//     >
//       {/* Image Container */}
//       <div className="relative w-full h-32 sm:h-36 md:h-40 overflow-hidden bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6]">
//         <motion.img
//           src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/300'}
//           alt={product.productName}
//           className="w-full h-full object-contain p-2"
//           whileHover={{ scale: 1.08 }}
//           transition={{ duration: 0.4 }}
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'https://via.placeholder.com/300?text=Toy';
//           }}
//           loading="lazy"
//         />
        
//         {/* Discount Badge */}
//         {discountPercent > 0 && (
//           <div className="absolute top-0.5 left-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[7px] sm:text-[9px] font-bold px-1 py-0.5 rounded-md shadow-lg z-20 flex items-center gap-0.5">
//             <Zap className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
//             {discountPercent}% OFF
//           </div>
//         )}
        
//         {/* Tag Badge - Top Right */}
//         {primaryTag && (
//           <motion.div 
//             initial={{ x: 10, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.1 }}
//             className={`absolute top-0.5 right-0.5 ${tagStyle} text-[6px] sm:text-[7px] md:text-[8px] px-1 py-0.5 font-semibold rounded-md z-20 flex items-center gap-0.5 shadow-lg`}
//           >
//             <Sparkles className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
//             <span className="truncate max-w-[40px] sm:max-w-[60px]">{primaryTag}</span>
//           </motion.div>
//         )}
        
//         {/* Desktop Hover Icons - Appear from Right Side */}
//         <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30 hidden sm:flex">
//           <motion.div
//             initial={{ x: 40, opacity: 0 }}
//             animate={{ 
//               x: isHovered && !isMobile ? 0 : 40, 
//               opacity: isHovered && !isMobile ? 1 : 0 
//             }}
//             transition={{ duration: 0.15, ease: "easeOut" }}
//             onClick={(e) => {
//               e.stopPropagation();
//               window.open(`/productDetails?id=${product._id}`, '_blank');
//             }}
//             className="w-7 h-7 rounded-full bg-white shadow-md hover:bg-[#4A8A90] flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
//           >
//             <Eye className="w-3.5 h-3.5 text-[#4A8A90] hover:text-white transition-colors duration-200" />
//           </motion.div>
          
//           <motion.div
//             initial={{ x: 40, opacity: 0 }}
//             animate={{ 
//               x: isHovered && !isMobile ? 0 : 40, 
//               opacity: isHovered && !isMobile ? 1 : 0 
//             }}
//             transition={{ duration: 0.15, ease: "easeOut", delay: 0.03 }}
//             onClick={addToCart}
//             className="w-7 h-7 rounded-full bg-white shadow-md hover:bg-[#4A8A90] flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
//           >
//             {cartStatusLoading ? (
//               <Loader2 className="w-3.5 h-3.5 animate-spin text-[#4A8A90] hover:text-white" />
//             ) : isInCart ? (
//               <ShoppingCart className="w-3.5 h-3.5 text-green-500" />
//             ) : (
//               <ShoppingCart className="w-3.5 h-3.5 text-[#FFB6C1] hover:text-white transition-colors duration-200" />
//             )}
//           </motion.div>
          
//           <motion.div
//             initial={{ x: 40, opacity: 0 }}
//             animate={{ 
//               x: isHovered && !isMobile ? 0 : 40, 
//               opacity: isHovered && !isMobile ? 1 : 0 
//             }}
//             transition={{ duration: 0.15, ease: "easeOut", delay: 0.06 }}
//             onClick={handleWishlist}
//             className="w-7 h-7 rounded-full bg-white shadow-md hover:bg-red-500 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
//           >
//             {wishlistLoading ? (
//               <Loader2 className="w-3.5 h-3.5 animate-spin text-red-500 hover:text-white" />
//             ) : (
//               <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-[#4A8A90] hover:text-white'} transition-colors duration-200`} />
//             )}
//           </motion.div>
//         </div>
        
//         {/* Mobile Action Icons - Bottom Center */}
//         <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-30 px-2 sm:hidden">
//           {/* View Details Button */}
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             onClick={(e) => {
//               e.stopPropagation();
//               window.open(`/productDetails?id=${product._id}`, '_blank');
//             }}
//             className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md flex items-center justify-center"
//           >
//             <Eye className="w-3 h-3 text-[#4A8A90]" />
//           </motion.button>
          
//           {/* Add to Cart Button */}
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             onClick={addToCart}
//             className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md flex items-center justify-center"
//           >
//             {cartStatusLoading ? (
//               <Loader2 className="w-3 h-3 animate-spin text-[#4A8A90]" />
//             ) : isInCart ? (
//               <ShoppingCart className="w-3 h-3 text-green-500" />
//             ) : (
//               <ShoppingCart className="w-3 h-3 text-[#FFB6C1]" />
//             )}
//           </motion.button>
          
//           {/* Wishlist Button */}
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             onClick={handleWishlist}
//             className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md flex items-center justify-center"
//           >
//             {wishlistLoading ? (
//               <Loader2 className="w-3 h-3 animate-spin text-red-500" />
//             ) : (
//               <Heart className={`w-3 h-3 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-[#4A8A90]'}`} />
//             )}
//           </motion.button>
//         </div>
//       </div>
      
//       {/* Thumbnail Images */}
//       {hasMultipleImages && (
//         <div className="flex justify-center items-center gap-1 py-1 bg-[#FFF9F0] border-b border-[#FFE0E6]">
//           {productImages.slice(0, 4).map((image, index) => (
//             <button
//               key={index}
//               className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 overflow-hidden rounded transition-all duration-200 ${
//                 activeIndex === index 
//                   ? 'ring-1 ring-[#4A8A90] ring-offset-0.5 scale-110' 
//                   : 'opacity-60 hover:opacity-100'
//               }`}
//               onMouseEnter={() => setActiveIndex(index)}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setActiveIndex(index);
//               }}
//             >
//               <img src={image.url} alt="" className="w-full h-full object-cover" />
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Content */}
//       <div className="p-1.5 sm:p-2">
//         {/* Product Name */}
//         <h3 className="text-[10px] sm:text-xs font-bold text-[#2D3A5C] line-clamp-2 hover:text-[#4A8A90] transition-colors duration-200 mb-1" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }} title={product.productName}>
//           {truncateText(product.productName, isMobile ? 12 : 20)}
//         </h3>
        
//         {/* Age Group and Rating Row */}
//         <div className="flex items-center justify-between mb-1">
//           {product.ageGroup ? (
//             <div className={`inline-flex items-center gap-0.5 px-1 py-0.5 rounded-full text-[6px] sm:text-[8px] font-semibold ${getAgeGroupBadge(product.ageGroup)}`}>
//               <Users className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
//               Ages {product.ageGroup}
//             </div>
//           ) : (
//             <div className="text-[6px] sm:text-[8px] text-gray-400">✨ Toy</div>
//           )}
          
//           {product.rating > 0 && (
//             <div className="flex items-center gap-0.5">
//               <div className="flex items-center">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Star
//                     key={star}
//                     className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 ${
//                       star <= Math.floor(product.rating)
//                         ? 'fill-yellow-400 text-yellow-400'
//                         : star - 0.5 <= product.rating
//                         ? 'fill-yellow-400 text-yellow-400 opacity-50'
//                         : 'text-gray-300'
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-[6px] sm:text-[8px] text-gray-500">({product.rating})</span>
//             </div>
//           )}
//         </div>

//         {/* Price Section */}
//         <div className="flex items-baseline gap-1 mb-1">
//           <span className="text-xs sm:text-sm font-bold text-[#4A8A90]">
//             ৳{formatPrice(currentPrice)}
//           </span>
//           {discountPercent > 0 && (
//             <>
//               <span className="text-[6px] sm:text-[8px] text-gray-400 line-through">
//                 ৳{formatPrice(originalPrice)}
//               </span>
//               <span className="text-[5px] sm:text-[7px] font-semibold text-red-500 bg-red-100 px-0.5 py-0.5 rounded">
//                 -{discountPercent}%
//               </span>
//             </>
//           )}
//         </div>

//         {/* Category and Stock Status Row */}
//         <div className="flex items-center justify-between gap-1">
//           {/* Category */}
//           {product.category?.name && (
//             <div className="flex items-center gap-0.5 text-[7px] text-[#8B9DC3]">
//               <Package className="w-2.5 h-2.5" />
//               <span className="truncate max-w-[70px]">{product.category.name}</span>
//             </div>
//           )}
          
//           {!product.category?.name && product.categoryName && (
//             <div className="flex items-center gap-0.5 text-[7px] text-[#8B9DC3]">
//               <Package className="w-2.5 h-2.5" />
//               <span className="truncate max-w-[70px]">{product.categoryName}</span>
//             </div>
//           )}
          
//           {!product.category?.name && !product.categoryName && (
//             <div className="text-[7px] text-gray-400">🎁 Toy</div>
//           )}
          
//           {/* Stock Status */}
//           <div className="flex-shrink-0">
//             {product.stockQuantity > 0 ? (
//               <span className="flex items-center gap-0.5 text-[7px] text-green-600 font-medium">
//                 <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="hidden xs:inline">In Stock ({product.stockQuantity})</span>
//                 <span className="xs:hidden">✓ {product.stockQuantity}</span>
//               </span>
//             ) : (
//               <span className="flex items-center gap-0.5 text-[7px] text-red-500 font-medium">
//                 <div className="w-1 h-1 bg-red-500 rounded-full"></div>
//                 <span className="hidden xs:inline">Out of Stock</span>
//                 <span className="xs:hidden">✗</span>
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Add to Cart / View Cart Button */}
//       {cartStatusLoading ? (
//         <button
//           disabled
//           className="w-full py-1 sm:py-1.5 text-center text-[8px] sm:text-[9px] font-bold bg-gray-300 text-gray-500 flex items-center justify-center gap-1"
//         >
//           <Loader2 className="w-2 h-2 sm:w-2.5 sm:h-2.5 animate-spin" />
//           Loading...
//         </button>
//       ) : isInCart ? (
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             router.push('/cart');
//           }}
//           className="w-full py-1 sm:py-1.5 text-center text-[8px] sm:text-[9px] font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-1"
//         >
//           <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//           <span className="sm:inline">View in Cart</span>
//         </button>
//       ) : (
//         <button
//           onClick={addToCart}
//           className="w-full py-1 sm:py-1.5 text-center text-[8px] sm:text-[9px] font-bold bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white hover:from-[#3A7A80] hover:to-[#5B9399] transition-all duration-200 flex items-center justify-center gap-1"
//         >
//           <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//           <span className="sm:inline">Add to Cart</span>
//         </button>
//       )}
//     </motion.div>
//   );
// };

// // Magnifying Glass Component
// const MagnifyingGlass = ({ image, isActive }) => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovering, setIsHovering] = useState(false);
//   const containerRef = useRef(null);
//   const lensSize = 150;
//   const zoomLevel = 2.5;

//   const handleMouseMove = (e) => {
//     if (!containerRef.current) return;
    
//     const rect = containerRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
    
//     const lensX = x - lensSize / 2;
//     const lensY = y - lensSize / 2;
    
//     const constrainedX = Math.max(0, Math.min(lensX, rect.width - lensSize));
//     const constrainedY = Math.max(0, Math.min(lensY, rect.height - lensSize));
    
//     setMousePosition({ 
//       x: constrainedX, 
//       y: constrainedY,
//       percentX: (constrainedX / (rect.width - lensSize)) * 100,
//       percentY: (constrainedY / (rect.height - lensSize)) * 100
//     });
//   };

//   if (!isActive || !image) return null;

//   return (
//     <div 
//       ref={containerRef}
//       className="absolute inset-0 cursor-none"
//       onMouseMove={handleMouseMove}
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//       onClick={() => {}}
//     >
//       {isHovering && (
//         <>
//           <div
//             ref={lensRef}
//             className="absolute rounded-full border-2 border-white shadow-2xl overflow-hidden pointer-events-none"
//             style={{
//               width: `${lensSize}px`,
//               height: `${lensSize}px`,
//               left: `${mousePosition.x}px`,
//               top: `${mousePosition.y}px`,
//               background: `url(${image})`,
//               backgroundRepeat: 'no-repeat',
//               backgroundPosition: `${-mousePosition.x * zoomLevel + lensSize/2}px ${-mousePosition.y * zoomLevel + lensSize/2}px`,
//               backgroundSize: `${containerRef.current?.offsetWidth * zoomLevel}px ${containerRef.current?.offsetHeight * zoomLevel}px`,
//               boxShadow: '0 0 0 3px rgba(74, 138, 144, 0.3), 0 8px 20px rgba(0,0,0,0.2)',
//             }}
//           />
//           <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full pointer-events-none">
//             🔍 Zoomed
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// // Main Product Details Component
// export default function ProductDetailsClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get('id');

//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [isInWishlist, setIsInWishlist] = useState(false);
//   const [isInCart, setIsInCart] = useState(false);
//   const [addingToCart, setAddingToCart] = useState(false);
//   const [showZoom, setShowZoom] = useState(false);
//   const [showShare, setShowShare] = useState(false);
//   const [reviewsToShow, setReviewsToShow] = useState(5);
//   const [activeTab, setActiveTab] = useState('description');
//   const [isMobile, setIsMobile] = useState(false);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
//   const [imageLoaded, setImageLoaded] = useState({});
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [hoveredMediaIndex, setHoveredMediaIndex] = useState(null);
//   const [enableMagnifier, setEnableMagnifier] = useState(false);
//   const [videoThumbnail, setVideoThumbnail] = useState(null);
//   const [generatingThumbnail, setGeneratingThumbnail] = useState(false);
//   const [checkingCart, setCheckingCart] = useState(true);
//   const [carouselIndex, setCarouselIndex] = useState(0);
//   const [carouselItemsPerView, setCarouselItemsPerView] = useState(5);
//   const [isAutoScrolling, setIsAutoScrolling] = useState(true);
//   const autoScrollIntervalRef = useRef(null);
//   const [productReviews, setProductReviews] = useState([]);
//   const [reviewStats, setReviewStats] = useState(null);
//   const [loadingReviews, setLoadingReviews] = useState(false);
//   const [productsInCart, setProductsInCart] = useState({});
//   const [productsInWishlist, setProductsInWishlist] = useState({});
//   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
//   const mainImageRef = useRef(null);
//   const galleryRef = useRef(null);
//   const lensRef = useRef(null);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     if (productId) fetchProductDetails();
//     fetchProductReviews();
//   }, [productId]);

//   useEffect(() => {
//     if (product && product._id) {
//       console.log('Checking wishlist status for product:', product._id);
//       checkWishlistStatus();
//     }
//   }, [product]);

//   useEffect(() => {
//     if (productId) {
//       fetchProductDetails();
//     }
//   }, [productId]);

//   useEffect(() => {
//     if (product?.videoUrl && product?.videoType !== 'youtube' && !videoThumbnail && !generatingThumbnail) {
//       setGeneratingThumbnail(true);
//       generateVideoThumbnail(product.videoUrl, (thumbnail) => {
//         if (thumbnail) {
//           setVideoThumbnail(thumbnail);
//         }
//         setGeneratingThumbnail(false);
//       });
//     }
//   }, [product?.videoUrl, product?.videoType]);

//   useEffect(() => {
//     if (product) {
//       checkCartStatus();
//     }
//   }, [product]);

//   useEffect(() => {
//     const handleWishlistUpdate = () => {
//       console.log('Wishlist update event received, refreshing status');
//       if (product && product._id) {
//         checkWishlistStatus();
//       }
//     };
    
//     window.addEventListener('wishlist-update', handleWishlistUpdate);
    
//     return () => {
//       window.removeEventListener('wishlist-update', handleWishlistUpdate);
//     };
//   }, [product]);

 

// // Make sure this dependency is correct
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) {
//         setCarouselItemsPerView(2);
//       } else if (window.innerWidth < 768) {
//         setCarouselItemsPerView(2);
//       } else if (window.innerWidth < 1024) {
//         setCarouselItemsPerView(3);
//       } else {
//         setCarouselItemsPerView(5);
//       }
//     };
    
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (isAutoScrolling && relatedProducts.length > carouselItemsPerView) {
//       autoScrollIntervalRef.current = setInterval(() => {
//         setCarouselIndex((prev) => {
//           const maxIndex = Math.max(0, relatedProducts.length - carouselItemsPerView);
//           if (prev >= maxIndex) {
//             return 0;
//           }
//           return prev + 1;
//         });
//       }, 5000);
//     }
    
//     return () => {
//       if (autoScrollIntervalRef.current) {
//         clearInterval(autoScrollIntervalRef.current);
//       }
//     };
//   }, [isAutoScrolling, relatedProducts.length, carouselItemsPerView]);



// // KEEP ONLY this useEffect (around line 474-540):
// useEffect(() => {
//   const refreshRelatedProductsStatus = async () => {
//     if (relatedProducts.length === 0) return;
    
//     const productIds = relatedProducts.map(p => p._id);
//     const token = localStorage.getItem('token');
//     const cartSessionId = localStorage.getItem('cartSessionId');
//     const wishlistSessionId = localStorage.getItem('wishlistSessionId');
    
//     const cartHeaders = {};
//     if (token) {
//       cartHeaders['Authorization'] = `Bearer ${token}`;
//     } else if (cartSessionId) {
//       cartHeaders['x-session-id'] = cartSessionId;
//     }
    
//     try {
//       const cartResponse = await fetch('http://localhost:5000/api/cart/check-status', {
//         method: 'POST',
//         headers: { ...cartHeaders, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ productIds })
//       });
//       const cartData = await cartResponse.json();
//       if (cartData.success) {
//         setProductsInCart(cartData.data);
//       }
//     } catch (error) {
//       console.error('Error refreshing cart status:', error);
//     }
    
//     const wishlistHeaders = {};
//     if (token) {
//       wishlistHeaders['Authorization'] = `Bearer ${token}`;
//     } else if (wishlistSessionId) {
//       wishlistHeaders['x-session-id'] = wishlistSessionId;
//     }
    
//     try {
//       const wishlistResponse = await fetch('http://localhost:5000/api/wishlist/check-status', {
//         method: 'POST',
//         headers: { ...wishlistHeaders, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ productIds })
//       });
//       const wishlistData = await wishlistResponse.json();
//       if (wishlistData.success) {
//         setProductsInWishlist(wishlistData.data);
//       }
//     } catch (error) {
//       console.error('Error refreshing wishlist status:', error);
//     }
//   };
  
//   // Initial fetch when component mounts or relatedProducts changes
//   refreshRelatedProductsStatus();
  
//   // Listen for both cart and wishlist updates
//   const handleCartUpdate = () => {
//     console.log('Cart update detected, refreshing related products status...');
//     refreshRelatedProductsStatus();
//   };
  
//   const handleWishlistUpdate = () => {
//     console.log('Wishlist update detected, refreshing related products status...');
//     refreshRelatedProductsStatus();
//   };
  
//   window.addEventListener('cart-update', handleCartUpdate);
//   window.addEventListener('wishlist-update', handleWishlistUpdate);
  
//   return () => {
//     window.removeEventListener('cart-update', handleCartUpdate);
//     window.removeEventListener('wishlist-update', handleWishlistUpdate);
//   };
// }, [relatedProducts]);

//   const handleCarouselInteraction = () => {
//     setIsAutoScrolling(false);
//     setTimeout(() => {
//       setIsAutoScrolling(true);
//     }, 5000);
//   };

//   const handlePrevSlide = () => {
//     handleCarouselInteraction();
//     setCarouselIndex((prev) => Math.max(0, prev - 1));
//   };

//   const handleNextSlide = () => {
//     handleCarouselInteraction();
//     const maxIndex = Math.max(0, relatedProducts.length - carouselItemsPerView);
//     setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
//   };

//   const fetchProductDetails = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`);
//       const data = await response.json();
//       if (data.success) {
//         setProduct(data.data.product);
//         setRelatedProducts(data.data.relatedProducts || []);
//       } else {
//         toast.error('Product not found');
//         router.push('/products');
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       toast.error('Failed to load product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProductReviews = async () => {
//     if (!productId) return;
    
//     setLoadingReviews(true);
//     try {
//       const token = localStorage.getItem('token');
//       const headers = {};
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       }
      
//       const response = await fetch(`http://localhost:5000/api/reviews?productId=${productId}&limit=50`, {
//         headers
//       });
      
//       const data = await response.json();
//       console.log('Full API response:', data);
//       console.log('Reviews data:', data.data);
      
//       if (data.success) {
//         data.data.forEach(review => {
//           console.log(`Review ${review._id}: user =`, review.user, 'status =', review.status);
//         });
        
//         setProductReviews(data.data || []);
//         setReviewStats(data.stats);
//       } else {
//         setProductReviews([]);
//       }
//     } catch (error) {
//       console.error('Error fetching product reviews:', error);
//       setProductReviews([]);
//     } finally {
//       setLoadingReviews(false);
//     }
//   };

//   const checkWishlistStatus = async () => {
//     const id = product?._id || productId;
//     if (!id) {
//       console.log('No product ID available for wishlist check');
//       return;
//     }
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('wishlistSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//         console.log('Checking wishlist with token');
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//         console.log('Checking wishlist with sessionId:', sessionId);
//       } else {
//         console.log('No auth for wishlist check');
//         return;
//       }

//       console.log('Calling wishlist check API for product:', id);
//       const response = await fetch(`http://localhost:5000/api/wishlist/check/${id}`, { headers });
//       const data = await response.json();
//       console.log('Wishlist check response:', data);
      
//       if (data.success) {
//         setIsInWishlist(data.data.inWishlist);
//         console.log('Product in wishlist:', data.data.inWishlist);
//       }
//     } catch (error) {
//       console.error('Error checking wishlist:', error);
//     }
//   };

//   const handleWishlist = async () => {
//     const toastId = toast.loading(isInWishlist ? 'Removing from wishlist...' : 'Adding to wishlist...');
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('wishlistSessionId');
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;
//       else {
//         toast.error('Please login to add to wishlist', { id: toastId });
//         router.push('/login');
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/wishlist', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ productId: product._id })
//       });
//       const data = await response.json();
//       if (data.success) {
//         setIsInWishlist(!isInWishlist);
//         toast.success(data.message, { id: toastId });
//         window.dispatchEvent(new Event('wishlist-update'));
//       } else {
//         toast.error(data.error || 'Failed to update wishlist', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Wishlist error:', error);
//       toast.error('Network error', { id: toastId });
//     }
//   };

//   const handleAddToCart = async () => {
//     if (product.stockQuantity <= 0) {
//       toast.error('Out of stock');
//       return;
//     }
//     setAddingToCart(true);
//     const toastId = toast.loading('Adding to cart...');
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;

//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ productId: product._id, quantity: quantity })
//       });
//       const data = await response.json();
//       if (data.success) {
//         if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
//         setIsInCart(true);
//         toast.success(`${quantity} item(s) added to cart!`, { id: toastId });
//         window.dispatchEvent(new Event('cart-update'));
//         setTimeout(() => window.dispatchEvent(new Event('cart-update')), 500);
//       } else {
//         toast.error(data.error || 'Failed to add to cart', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error('Network error', { id: toastId });
//     } finally {
//       setAddingToCart(false);
//     }
//   };

//   const handleBuyNow = async () => {
//     if (product.stockQuantity <= 0) {
//       toast.error('Out of stock');
//       return;
//     }
    
//     setAddingToCart(true);
//     const toastId = toast.loading('Processing...');
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;

//       const checkResponse = await fetch(`http://localhost:5000/api/cart/check/${product._id}`, { headers });
//       const checkData = await checkResponse.json();
      
//       let alreadyInCart = false;
//       if (checkData.success) {
//         alreadyInCart = checkData.data.inCart;
//       }
      
//       if (!alreadyInCart) {
//         const response = await fetch('http://localhost:5000/api/cart', {
//           method: 'POST',
//           headers,
//           body: JSON.stringify({ productId: product._id, quantity: quantity })
//         });
//         const data = await response.json();
        
//         if (data.success) {
//           if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
//           window.dispatchEvent(new Event('cart-update'));
//         } else {
//           toast.error(data.error || 'Failed to process', { id: toastId });
//           setAddingToCart(false);
//           return;
//         }
//       }
      
//       setTimeout(() => {
//         toast.success('Redirecting to checkout...', { id: toastId });
//         router.push('/checkout');
//       }, 500);
      
//     } catch (error) {
//       console.error('Buy now error:', error);
//       toast.error('Network error', { id: toastId });
//     } finally {
//       setAddingToCart(false);
//     }
//   };

//   // const handleQuantityChange = (delta) => {
//   //   const newQuantity = quantity + delta;
//   //   if (newQuantity >= 1 && newQuantity <= (product?.stockQuantity || 10)) {
//   //     setQuantity(newQuantity);
//   //   }
//   // };
  
//   const handleQuantityChange = (delta) => {
//   const newQuantity = quantity + delta;
//   if (newQuantity >= 1 && newQuantity <= (product?.stockQuantity || 10)) {
//     setQuantity(newQuantity);
//   }
// };
  
  
//   const handleQuantityInput = (e) => {
//   let value = parseInt(e.target.value);
  
//   // Check if input is empty or not a number
//   if (isNaN(value) || e.target.value === '') {
//     setQuantity(1);
//     return;
//   }
  
//   // Ensure value is within bounds (1 to stockQuantity)
//   if (value < 1) {
//     value = 1;
//   } else if (value > product.stockQuantity) {
//     value = product.stockQuantity;
//     toast.error(`Maximum quantity available is ${product.stockQuantity}`);
//   }
  
//   setQuantity(value);
// };

//   const checkCartStatus = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       } else {
//         setCheckingCart(false);
//         return;
//       }
      
//       const response = await fetch(`http://localhost:5000/api/cart/check/${product._id}`, { headers });
//       const data = await response.json();
//       if (data.success) {
//         setIsInCart(data.data.inCart);
//       }
//     } catch (error) {
//       console.error('Error checking cart status:', error);
//     } finally {
//       setCheckingCart(false);
//     }
//   };

//   const preloadImage = (src) => {
//     const img = new Image();
//     img.src = src;
//   };

//   const getYouTubeThumbnail = (url) => {
//     if (!url) return null;
    
//     const patterns = [
//       /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\s?#]+)/,
//       /youtube\.com\/v\/([^&\s?#]+)/,
//       /youtube\.com\/live\/([^&\s?#]+)/
//     ];
    
//     for (const pattern of patterns) {
//       const match = url.match(pattern);
//       if (match && match[1]) {
//         return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
//       }
//     }
//     return null;
//   };

//   const generateVideoThumbnail = (videoUrl, callback) => {
//     const video = document.createElement('video');
//     video.crossOrigin = 'Anonymous';
//     video.src = videoUrl;
//     video.currentTime = 1.5;
    
//     video.addEventListener('loadeddata', () => {
//       setTimeout(() => {
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
        
//         canvas.width = 160;
//         canvas.height = 160;
        
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
//         const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
//         callback(thumbnailUrl);
//       }, 100);
//     });
    
//     video.addEventListener('error', () => {
//       console.error('Error loading video for thumbnail generation');
//       callback(null);
//     });
    
//     video.load();
//   };

//   if (loading) return <ProductSkeleton />;
//   if (!product) return null;

//   const discountPercent = calculateDiscount(product.regularPrice, product.discountPrice);
//   const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
//   const stockStatus = getStockStatus(product.stockQuantity);
//   const StockIcon = stockStatus.icon;
//   const ageBadge = getAgeBadge(product.ageGroup);
//   const productImages = product.images || [];
//   const hasVideo = product.videoUrl && product.videoUrl.trim() !== '';
//   const mediaItems = [...productImages];
//   if (hasVideo) {
//     mediaItems.push({ type: 'video', url: product.videoUrl, videoType: product.videoType });
//   }
//   const mainMedia = mediaItems[activeImageIndex];
//   const isMainVideo = mainMedia?.type === 'video';
//   const mainImage = !isMainVideo ? mainMedia?.url : null;
//   const mainVideoUrl = isMainVideo ? mainMedia?.url : null;
//   const mainVideoType = isMainVideo ? mainMedia?.videoType : null;
  
//   const reviews = product.reviews || [];
//   const averageRating = product.rating || 0;
//   const totalReviews = reviews.length;

//   const categoryHierarchy = [];
//   if (product.categoryName) categoryHierarchy.push(product.categoryName);
//   if (product.subcategoryName) categoryHierarchy.push(product.subcategoryName);
//   if (product.childSubcategoryName) categoryHierarchy.push(product.childSubcategoryName);

//   return (
//     <>
//      {product && <MetadataUpdater product={product} />}
//       <Navbar />
//       <div className="min-h-screen bg-[#FFF9F0]">
//         <div className="container mx-auto px-3 sm:px-4 py-4 md:py-6 lg:py-8 max-w-7xl">
//           {/* Breadcrumb - Mobile Responsive */}
//           <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm mb-4 md:mb-6 overflow-x-auto pb-2 scrollbar-thin">
//             <Link href="/" className="text-gray-500 hover:text-[#4A8A90] transition whitespace-nowrap">Home</Link>
//             <span className="text-gray-400">/</span>
//             <Link href="/products" className="text-gray-500 hover:text-[#4A8A90] transition whitespace-nowrap">Toys</Link>
//             {categoryHierarchy.map((cat, idx) => (
//               <React.Fragment key={idx}>
//                 <span className="text-gray-400">/</span>
//                 <span className="text-gray-500 truncate max-w-[100px] sm:max-w-none">{cat}</span>
//               </React.Fragment>
//             ))}
//             <span className="text-gray-400">/</span>
//             <span className="text-[#4A8A90] font-medium truncate max-w-[150px] sm:max-w-none">{product.productName}</span>
//           </nav>

//           <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
//             {/* Left Column - Product Gallery */}
//             <div className="lg:col-span-3" ref={galleryRef}>
//               <div className="sticky top-20 lg:top-24">
//                 {/* Main Image/Video Area */}
//                 <div className="relative bg-white rounded-xl sm:rounded-2xl border-2 border-[#FFE0E6] overflow-hidden shadow-md">
//                   <div 
//                     className="relative bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden cursor-crosshair"
//                     style={{ height: 'auto', minHeight: '280px' }}
//                     onMouseEnter={() => !isMainVideo && !isMobile && setIsZoomed(true)}
//                     onMouseLeave={() => setIsZoomed(false)}
//                     onMouseMove={(e) => {
//                       if (!isZoomed || isMainVideo || isMobile) return;
//                       const rect = e.currentTarget.getBoundingClientRect();
//                       const x = ((e.clientX - rect.left) / rect.width) * 100;
//                       const y = ((e.clientY - rect.top) / rect.height) * 100;
//                       setZoomPosition({
//                         x: Math.min(Math.max(x, 0), 100),
//                         y: Math.min(Math.max(y, 0), 100)
//                       });
//                     }}
//                   >
//                     <div className="relative w-full pt-[100%] sm:pt-[100%]">
//                       {(isTransitioning || !imageLoaded[activeImageIndex]) && !isMainVideo && (
//                         <div className="absolute inset-0 bg-gray-200 animate-pulse z-10">
//                           <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
//                         </div>
//                       )}
                      
//                       <div className="absolute inset-0 w-full h-full overflow-hidden">
//                         {!isMainVideo && mainImage ? (
//                           <img
//                             key={activeImageIndex}
//                             src={mainImage}
//                             alt={product.productName}
//                             className={`w-full h-full object-contain p-3 sm:p-4 bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6] transition-opacity duration-300 ${
//                               imageLoaded[activeImageIndex] ? 'opacity-100' : 'opacity-0'
//                             }`}
//                             style={{
//                               transform: isZoomed && !isMobile ? 'scale(2.2)' : 'scale(1)',
//                               transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                               transition: 'transform 0.15s ease-out'
//                             }}
//                             onLoad={() => {
//                               setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
//                               setTimeout(() => setIsTransitioning(false), 100);
//                             }}
//                             loading={activeImageIndex === 0 ? "eager" : "lazy"}
//                             fetchPriority={activeImageIndex === 0 ? "high" : "auto"}
//                             decoding="async"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = 'https://via.placeholder.com/800x800?text=Image+Not+Available';
//                               setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
//                             }}
//                           />
//                         ) : isMainVideo && mainVideoUrl && (
//                           mainVideoType === 'youtube' ? (
//                             <iframe 
//                               src={mainVideoUrl} 
//                               className="w-full h-full aspect-square" 
//                               allowFullScreen 
//                               title="Product Video"
//                             />
//                           ) : (
//                             <video 
//                               src={mainVideoUrl} 
//                               controls 
//                               className="w-full h-full object-contain bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6]"
//                             />
//                           )
//                         )}
//                       </div>
//                     </div>

//                     {/* Zoom Indicator Overlay */}
//                     {!isMainVideo && !isMobile && !isZoomed && (
//                       <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center pointer-events-none">
//                         <div className="bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                           <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
//                           </svg>
//                           <span className="hidden xs:inline">Hover to zoom</span>
//                         </div>
//                       </div>
//                     )}

//                     {/* Controls */}
//                     <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex gap-1 sm:gap-2 z-20">
//                       {!isMainVideo && (
//                         <button
//                           onClick={() => setShowZoom(true)}
//                           className="p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all hover:scale-105"
//                           aria-label="View fullscreen"
//                         >
//                           <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
//                         </button>
//                       )}
//                     </div>

//                     <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full z-20">
//                       {activeImageIndex + 1} / {productImages.length}
//                     </div>
//                   </div>
                  
//                   {discountPercent > 0 && (
//                     <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] sm:text-xs md:text-sm font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1">
//                       <Tag className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                       {discountPercent}% OFF
//                     </div>
//                   )}
//                   {product.tags?.[0] && (
//                     <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-[#FFD93D] to-[#FFB6C1] text-[#2D3A5C] text-[8px] sm:text-[10px] md:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-lg">
//                       {product.tags[0]}
//                     </div>
//                   )}
//                 </div>

//                 {/* Thumbnail Gallery */}
//                 <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3 overflow-x-auto pb-2 scrollbar-thin justify-start sm:justify-center">
//                   {productImages.map((img, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => {
//                         if (activeImageIndex !== idx) {
//                           setActiveImageIndex(idx);
//                           setImageLoaded(prev => ({ ...prev, [idx]: false }));
//                           setIsZoomed(false);
//                         }
//                       }}
//                       onMouseEnter={() => {
//                         preloadImage(img.url);
//                         if (activeImageIndex !== idx) {
//                           setActiveImageIndex(idx);
//                           setImageLoaded(prev => ({ ...prev, [idx]: false }));
//                           setIsZoomed(false);
//                         }
//                       }}
//                       className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] rounded-lg overflow-hidden border-2 transition-all duration-200 ${
//                         activeImageIndex === idx ? 'border-[#4A8A90] shadow-md ring-2 ring-[#4A8A90]/20' : 'border-gray-200 hover:border-[#FFB6C1]'
//                       }`}
//                     >
//                       <img src={img.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
//                     </button>
//                   ))}
                  
//                   {hasVideo && (
//                     <button
//                       onClick={() => {
//                         if (activeImageIndex !== productImages.length) {
//                           setActiveImageIndex(productImages.length);
//                           setIsZoomed(false);
//                         }
//                       }}
//                       onMouseEnter={() => {
//                         if (activeImageIndex !== productImages.length) {
//                           setActiveImageIndex(productImages.length);
//                           setIsZoomed(false);
//                         }
//                       }}
//                       className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
//                         activeImageIndex === productImages.length ? 'border-[#4A8A90] shadow-md ring-2 ring-[#4A8A90]/20' : 'border-gray-200 hover:border-[#FFB6C1]'
//                       }`}
//                     >
//                       {product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl) ? (
//                         <img 
//                           src={getYouTubeThumbnail(product.videoUrl)} 
//                           alt="Video thumbnail" 
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.style.display = 'none';
//                             e.target.parentElement.querySelector('.fallback-icon').style.display = 'flex';
//                           }}
//                         />
//                       ) : 
//                       product.videoType !== 'youtube' && videoThumbnail ? (
//                         <img 
//                           src={videoThumbnail} 
//                           alt="Video thumbnail" 
//                           className="w-full h-full object-cover"
//                         />
//                       ) : null}
                      
//                       <div 
//                         className="fallback-icon w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex flex-col items-center justify-center"
//                         style={{ 
//                           display: (product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl)) || 
//                                    (product.videoType !== 'youtube' && videoThumbnail) ? 'none' : 'flex' 
//                         }}
//                       >
//                         {generatingThumbnail ? (
//                           <>
//                             <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-500 animate-spin" />
//                             <span className="text-[6px] sm:text-[8px] text-purple-500 mt-0.5">Loading</span>
//                           </>
//                         ) : (
//                           <>
//                             <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-500" />
//                             <span className="text-[6px] sm:text-[8px] text-purple-500 mt-0.5">Video</span>
//                           </>
//                         )}
//                       </div>
                      
//                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                         <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
//                       </div>
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Product Info */}
//             <div className="lg:col-span-4 bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg shadow-sm">
//               {/* Category Hierarchy */}
//               <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
//                 {categoryHierarchy.map((cat, idx) => (
//                   <span 
//                     key={idx} 
//                     className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-gradient-to-r from-[#4A8A90]/10 to-[#4A8A90]/5 text-[#4A8A90] border border-[#4A8A90]/20"
//                   >
//                     <FolderTree className="w-2 h-2 sm:w-3 sm:h-3" />
//                     {cat}
//                   </span>
//                 ))}
                
//                 {product.brand && (
//                   <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-gradient-to-r from-[#FFB6C1]/20 to-[#FFB6C1]/10 text-[#FF6B8A] border border-[#FFB6C1]/30">
//                     <Tag className="w-2 h-2 sm:w-3 sm:h-3" />
//                     {product.brand}
//                   </span>
//                 )}
//               </div>

//               {/* Title */}
//               <div className="mb-3 sm:mb-4">
//                 <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                   {product.productName}
//                 </h1>
//               </div>

//               {/* Rating & Age */}
//               <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
//                 <div className="flex items-center gap-1 sm:gap-2">
//                   <div className="flex items-center">
//                     {[1, 2, 3, 4, 5].map(star => (
//                       <Star key={star} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${star <= Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : star - 0.5 <= averageRating ? 'fill-yellow-400 text-yellow-400 opacity-50' : 'text-gray-300'}`} />
//                     ))}
//                   </div>
//                   <span className="text-xs sm:text-sm text-gray-600">{averageRating.toFixed(1)}</span>
//                 </div>
//               <div className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium ${ageBadge.bg} ${ageBadge.text}`}>
//   <span className="text-sm sm:text-base">{ageBadge.icon}</span>
//   <span>{product.ageGroup ? `Ages ${product.ageGroup} years` : 'All Kids'}</span>
// </div>
//               </div>

//               {/* Price Card */}
//               <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-gradient-to-r from-[#D4EDEE]/20 to-[#FFF9F0] rounded-xl border border-[#FFE0E6]">
//                 <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
//                   <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4A8A90]">৳{formatPrice(currentPrice)}</span>
//                   {discountPercent > 0 && (
//                     <>
//                       <span className="text-sm sm:text-base text-gray-400 line-through">৳{formatPrice(product.regularPrice)}</span>
//                       <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-red-500 bg-red-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
//                         <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
//                         Save {discountPercent}%
//                       </span>
//                     </>
//                   )}
//                 </div>
//                 {product.codAvailable && (
//                   <div className="flex items-center gap-1.5 mt-2 sm:mt-3 text-green-600 text-xs sm:text-sm bg-green-50 inline-flex px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
//                     <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                     <span>Cash on Delivery available</span>
//                   </div>
//                 )}
//               </div>

//               {/* Short Description */}
//               <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-white rounded-xl border border-[#FFE0E6]">
//                 <div className="text-xs sm:text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
//               </div>

//               {/* Stock Status */}
//               <div className="flex items-center gap-2 mb-4">
//                 <div className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium text-${stockStatus.color}-600 bg-${stockStatus.color}-50 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full`}>
//                   <StockIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-${stockStatus.color}-500`} />
//                   <span>{stockStatus.label}</span>
//                   {stockStatus.label === 'In Stock' && <span className="text-[10px] sm:text-xs text-gray-500">({product.stockQuantity} available)</span>}
//                 </div>
//               </div>

//               {/* Quantity + Add to Cart + Buy Now + Wishlist + Share */}
//               <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
//                 {/* Quantity Selector */}
//                 {/* <div className="flex items-center rounded-lg border-2 border-[#FFE0E6] overflow-hidden bg-white">
//                   <button 
//                     onClick={() => handleQuantityChange(-1)} 
//                     disabled={quantity <= 1 || isInCart} 
//                     className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
//                   >
//                     <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
//                   </button>
//                   <span className="w-8 sm:w-10 md:w-12 text-center font-medium text-[#2D3A5C] text-sm sm:text-base">{quantity}</span>
//                   <button 
//                     onClick={() => handleQuantityChange(1)} 
//                     disabled={quantity >= product.stockQuantity || isInCart} 
//                     className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
//                   >
//                     <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
//                   </button>
//                 </div> */}

//                 {/* Quantity Selector */}
// <div className="flex items-center rounded-lg border-2 border-[#FFE0E6] overflow-hidden bg-white">
//   <button 
//     onClick={() => handleQuantityChange(-1)} 
//     disabled={quantity <= 1 || isInCart} 
//     className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
//   >
//     <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
//   </button>
//   <input
//     type="number"
//     value={quantity}
//     onChange={(e) => handleQuantityInput(e)}
//     disabled={isInCart}
//     min="1"
//     max={product.stockQuantity}
//     className="w-12 sm:w-14 md:w-16 text-center font-medium text-[#2D3A5C] text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#4A8A90]/20 border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//   />
//   <button 
//     onClick={() => handleQuantityChange(1)} 
//     disabled={quantity >= product.stockQuantity || isInCart} 
//     className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
//   >
//     <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
//   </button>
// </div>

//                 {/* Add to Cart OR View in Cart Button */}
//                 {isInCart ? (
//                   <button
//                     onClick={() => router.push('/cart')}
//                     className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
//                   >
//                     <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                     <span className="hidden xs:inline">View in Cart</span>
//                     <span className="xs:hidden">Cart</span>
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={addingToCart || product.stockQuantity <= 0}
//                     className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white font-bold rounded-lg hover:from-[#3A7A80] hover:to-[#5B9399] transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 text-xs sm:text-sm"
//                   >
//                     {addingToCart ? <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" /> : <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
//                     {addingToCart ? 'Adding...' : 'Add to Cart'}
//                   </button>
//                 )}

//                 {/* Buy Now Button */}
//                 <button
//                   onClick={handleBuyNow}
//                   disabled={addingToCart || product.stockQuantity <= 0}
//                   className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-gradient-to-r from-[#FFD93D] to-[#FFB6C1] text-[#2D3A5C] font-bold rounded-lg hover:from-[#FFE44D] hover:to-[#FF9CB0] transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 text-xs sm:text-sm"
//                 >
//                   <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   <span className="hidden xs:inline">Buy Now</span>
//                   <span className="xs:hidden">Buy</span>
//                 </button>

//                 {/* Wishlist Button */}
//                 <button
//                   onClick={handleWishlist}
//                   className="p-2 sm:p-2.5 bg-white border-2 border-[#FFE0E6] rounded-full hover:border-[#FFB6C1] hover:bg-pink-50 transition-all"
//                 >
//                   <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-[#4A8A90]'}`} />
//                 </button>

//                 {/* Share Button */}
//                 <button
//                   onClick={() => setShowShare(true)}
//                   className="p-2 sm:p-2.5 bg-white border-2 border-[#FFE0E6] rounded-full hover:border-[#4A8A90] transition-all"
//                 >
//                   <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A8A90]" />
//                 </button>
//               </div>

//               {/* Delivery Info */}
//               <div className="bg-gradient-to-r from-[#D4EDEE]/30 to-[#FFE0E6]/30 rounded-xl p-3 sm:p-4 border border-[#FFE0E6]">
//                 <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
//                   <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A8A90]" />
//                   <span className="font-semibold text-[#2D3A5C] text-sm sm:text-base">Delivery Information</span>
//                 </div>
//                 <div className="text-xs sm:text-sm text-gray-600 space-y-1" dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} />
//                 <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#FFE0E6]">
//                   <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
//                     <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                     <span>7 Days Return Policy</span>
//                   </div>
//                   <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
//                     <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                     <span>Safe & Secure</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Tabs for Description, Specifications, Reviews */}
//           <div className="mt-8 sm:mt-12">
//             <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-[#FFE0E6]">
//               {['description', 'specifications', 'reviews'].map(tab => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all ${
//                     activeTab === tab ? 'bg-white text-[#4A8A90] border-t-2 border-l-2 border-r-2 border-[#FFE0E6] border-b-white' : 'text-gray-500 hover:text-[#4A8A90]'
//                   }`}
//                 >
//                   {tab === 'description' && 'Product Description'}
//                   {tab === 'specifications' && 'Specifications'}
//                   {tab === 'reviews' && `Reviews`}
//                 </button>
//               ))}
//             </div>

//             <div className="bg-white rounded-b-xl rounded-tr-xl border border-t-0 border-[#FFE0E6] p-4 sm:p-5 md:p-6">
//               {activeTab === 'description' && (
//                 <div className="prose prose-sm max-w-none">
//                   <div dangerouslySetInnerHTML={{ __html: product.fullDescription }} />
//                 </div>
//               )}

//               {activeTab === 'specifications' && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
//                   {[
//                     { label: 'Brand', value: product.brand, icon: Tag },
//                { label: 'Age Group', value: product.ageGroup ? `Ages ${product.ageGroup} years` : 'All Kids', icon: Users },
//                     { label: 'SKU', value: product.skuCode, icon: Package },
//                     { label: 'Stock', value: `${product.stockQuantity} units available`, icon: Package },
//                     { label: 'Category', value: product.categoryName, icon: Tag },
//                     { label: 'Subcategory', value: product.subcategoryName, icon: FolderTree },
//                     { label: 'Child Subcategory', value: product.childSubcategoryName, icon: FolderTree },
//                     { label: 'COD Available', value: product.codAvailable ? 'Yes' : 'No', icon: Truck },
//                   ].filter(item => item.value).map((item, idx) => (
//                     <div key={idx} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-[#FFF9F0] rounded-xl border border-[#FFE0E6]">
//                       <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A8A90]" />
//                       <div>
//                         <p className="text-[10px] sm:text-xs text-gray-500">{item.label}</p>
//                         <p className="font-medium text-[#2D3A5C] text-xs sm:text-sm">{item.value || 'N/A'}</p>
//                       </div>
//                     </div>
//                   ))}
                  
//                   {product.additionalInfo && product.additionalInfo.map((info, idx) => (
//                     <div key={`additional-${idx}`} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-[#FFF9F0] rounded-xl border border-[#FFE0E6]">
//                       <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD93D]" />
//                       <div>
//                         <p className="text-[10px] sm:text-xs text-gray-500">{info.fieldName}</p>
//                         <p className="font-medium text-[#2D3A5C] text-xs sm:text-sm">{info.fieldValue}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {activeTab === 'reviews' && (
//                 <div>
//                   {loadingReviews ? (
//                     <div className="flex justify-center py-8">
//                       <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-[#4A8A90]" />
//                     </div>
//                   ) : (
//                     <>
//                       {reviewStats && reviewStats.totalReviews > 0 && (
//                         <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
//                           <button
//                             onClick={() => setIsReviewModalOpen(true)}
//                             className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#4A8A90] text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-[#3A7A80] transition"
//                           >
//                             Write a Review
//                           </button>
//                         </div>
//                       )}

//                       {productReviews.length === 0 && (
//                         <div className="text-center py-6 sm:py-8">
//                           <Star className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
//                           <p className="text-sm sm:text-base text-gray-500">No reviews yet. Be the first to review this toy!</p>
//                           <button
//                             onClick={() => setIsReviewModalOpen(true)}
//                             className="inline-block mt-2 sm:mt-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#4A8A90] text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-[#3A7A80] transition"
//                           >
//                             Write a Review
//                           </button>
//                         </div>
//                       )}

//                       <div className="space-y-3 sm:space-y-4 max-h-[500px] overflow-y-auto pr-1 sm:pr-2">
//                         {productReviews.length > 0 ? (
//                           productReviews.slice(0, reviewsToShow).map((review, idx) => {
//                             const isPending = review.status === 'pending';
//                             const isRejected = review.status === 'rejected';
//                             const isApproved = review.status === 'approved';
                            
//                             let currentUserId = null;
//                             const userData = localStorage.getItem('user');
//                             if (userData) {
//                               try {
//                                 const parsedUser = JSON.parse(userData);
//                                 currentUserId = parsedUser._id || parsedUser.id;
//                               } catch (e) {
//                                 console.error('Error parsing user data:', e);
//                               }
//                             }
                            
//                             let isUserReview = false;
//                             if (currentUserId) {
//                               const reviewUserId = review.user?._id || review.user;
//                               isUserReview = reviewUserId === currentUserId;
//                             }
                            
//                             if ((isPending || isRejected) && !isUserReview) return null;
                            
//                             return (
//                               <div key={idx} className="border-b border-[#FFE0E6] pb-3 sm:pb-4 last:border-0">
//                                 <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
//                                   <div className="flex items-center gap-2 sm:gap-3">
//                                     <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center text-white font-bold text-sm sm:text-base">
//                                       {review.userName?.charAt(0).toUpperCase() || 'U'}
//                                     </div>
//                                     <div>
//                                       <p className="font-semibold text-[#2D3A5C] text-sm sm:text-base">{review.userName}</p>
//                                       <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-0.5">
//                                         <div className="flex items-center">
//                                           {[1, 2, 3, 4, 5].map(star => (
//                                             <Star
//                                               key={star}
//                                               className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
//                                             />
//                                           ))}
//                                         </div>
//                                         <span className="text-[10px] sm:text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                                        
//                                         {isPending && isUserReview && (
//                                           <span className="text-[10px] sm:text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full">
//                                             Pending Approval
//                                           </span>
//                                         )}
//                                         {isRejected && isUserReview && (
//                                           <span className="text-[10px] sm:text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">
//                                             Rejected
//                                           </span>
//                                         )}
//                                         {isApproved && review.isVerifiedPurchase && (
//                                           <span className="flex items-center gap-1 text-[9px] sm:text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full">
//                                             <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                                             Verified
//                                           </span>
//                                         )}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 {review.title && <p className="font-medium text-[#2D3A5C] mt-2 text-sm sm:text-base">{review.title}</p>}
//                                 <p className="text-xs sm:text-sm text-gray-600 mt-1">{review.comment}</p>
//                                 {review.images && review.images.length > 0 && (
//                                   <div className="flex gap-2 mt-3">
//                                     {review.images.slice(0, 3).map((img, imgIdx) => (
//                                       <img key={imgIdx} src={img.url} alt={`Review ${idx + 1}`} className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover border border-gray-200" />
//                                     ))}
//                                   </div>
//                                 )}
//                                 {isPending && isUserReview && (
//                                   <div className="mt-2 p-2 bg-yellow-50 rounded-lg text-xs text-yellow-700">
//                                     Your review is pending moderation. It will appear here once approved.
//                                   </div>
//                                 )}
//                                 {isRejected && isUserReview && review.moderationNote && (
//                                   <div className="mt-2 p-2 bg-red-50 rounded-lg text-xs text-red-700">
//                                     <span className="font-semibold">Reason for rejection:</span> {review.moderationNote}
//                                   </div>
//                                 )}
//                                 {isRejected && isUserReview && !review.moderationNote && (
//                                   <div className="mt-2 p-2 bg-red-50 rounded-lg text-xs text-red-700">
//                                     Your review was not approved. Please contact support for more information.
//                                   </div>
//                                 )}
//                               </div>
//                             );
//                           })
//                         ) : null}
//                       </div>

//                       {productReviews.length > reviewsToShow && (
//                         <button onClick={() => setReviewsToShow(reviewsToShow + 5)} className="mt-3 sm:mt-4 text-[#4A8A90] font-medium text-xs sm:text-sm hover:underline">
//                           Load More Reviews ({productReviews.length - reviewsToShow} left)
//                         </button>
//                       )}
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Related Products Section */}
//           {relatedProducts.length > 0 && (
//             <div className="mt-8 sm:mt-12">
//               <div className="flex items-center justify-between mb-3 sm:mb-5">
//                 <div className="flex items-center gap-1 sm:gap-2">
//                   <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD93D]" />
//                   <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                     You May Also Like
//                   </h2>
//                 </div>
                
//                 {relatedProducts.length > carouselItemsPerView && (
//                   <div className="flex items-center gap-1 sm:gap-2">
//                     <button
//                       onClick={handlePrevSlide}
//                       disabled={carouselIndex === 0}
//                       className={`p-1.5 sm:p-2 rounded-full transition-all ${
//                         carouselIndex === 0 
//                           ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
//                           : 'bg-white border border-[#FFE0E6] text-[#4A8A90] hover:bg-[#D4EDEE] hover:scale-110'
//                       }`}
//                     >
//                       <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </button>
//                     <button
//                       onClick={handleNextSlide}
//                       disabled={carouselIndex >= relatedProducts.length - carouselItemsPerView}
//                       className={`p-1.5 sm:p-2 rounded-full transition-all ${
//                         carouselIndex >= relatedProducts.length - carouselItemsPerView 
//                           ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
//                           : 'bg-white border border-[#FFE0E6] text-[#4A8A90] hover:bg-[#D4EDEE] hover:scale-110'
//                       }`}
//                     >
//                       <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </button>
//                   </div>
//                 )}
//               </div>
              
//               <div className="relative overflow-hidden">
//                 <motion.div
//                   className="flex gap-2 sm:gap-3 md:gap-4"
//                   animate={{ x: `-${carouselIndex * (100 / carouselItemsPerView)}%` }}
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   style={{ width: `${(relatedProducts.length / carouselItemsPerView) * 100}%` }}
//                 >
//                   {relatedProducts.map((relProduct) => (
//                     <div 
//                       key={relProduct._id} 
//                       className="flex-shrink-0"
//                       style={{ width: `${100 / relatedProducts.length}%` }}
//                     >
//                       <RelatedProductCard 
//                         product={relProduct} 
//                         router={router}
//                         isInCart={productsInCart[relProduct._id] || false}
//                         isInWishlist={productsInWishlist[relProduct._id] || false}
//                       />
//                     </div>
//                   ))}
//                 </motion.div>
//               </div>
              
//               {relatedProducts.length > carouselItemsPerView && (
//                 <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
//                   {Array.from({ length: Math.ceil(relatedProducts.length / carouselItemsPerView) }).map((_, idx) => {
//                     const pageIndex = idx * carouselItemsPerView;
//                     const isActive = carouselIndex >= pageIndex && carouselIndex < pageIndex + carouselItemsPerView;
//                     return (
//                       <button
//                         key={idx}
//                         onClick={() => {
//                           handleCarouselInteraction();
//                           setCarouselIndex(pageIndex);
//                         }}
//                         className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
//                           isActive ? 'w-4 sm:w-6 bg-[#4A8A90]' : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
//                         }`}
//                       />
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
//       <AnimatePresence>
//         {showZoom && (
//           <ZoomModal 
//             images={productImages} 
//             currentIndex={activeImageIndex}
//             onClose={() => setShowZoom(false)} 
//             onImageChange={(index) => {
//               setActiveImageIndex(index);
//               setShowZoom(true);
//             }}
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>{showShare && <ShareModal product={product} onClose={() => setShowShare(false)} />}</AnimatePresence>

//       <ReviewModal
//         isOpen={isReviewModalOpen}
//         onClose={() => {
//           setIsReviewModalOpen(false);
//           fetchProductReviews();
//         }}
//         onReviewSubmitted={() => {
//           fetchProductReviews();
//         }}
//         productId={productId}
//         productName={product?.productName}
//       />

//       <Footer />
//       <WhatsAppButton />
      
//     </>
//   );
// }

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  Minus,
  Plus,
  ZoomIn,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Gift,
  Sparkles,
  Users,
  Package,
  Tag,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Copy,
  Check,
  Loader2,
  Eye,
  MessageCircle,
  FolderTree,
  Maximize2,
  Zap
} from 'lucide-react';

import { toast } from 'sonner';
import WhatsAppButton from '../components/layout/WhatsAppButton';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import ReviewModal from '../components/home/ReviewModal';
import MetadataUpdater from './MetadataUpdater';

// Toy Theme Colors
const COLORS = {
  primary: '#4A8A90',
  secondary: '#FFB6C1',
  accent: '#FFD93D',
  lightBg: '#FFF9F0',
  border: '#FFE0E6',
  text: '#2D3A5C',
  textLight: '#8B9DC3',
};

// Helper Functions
const formatPrice = (price) => {
  return (price || 0).toFixed(2);
};

const calculateDiscount = (regular, discount) => {
  if (regular && discount && discount < regular) {
    return Math.round(((regular - discount) / regular) * 100);
  }
  return 0;
};

const getAgeBadge = (ageGroup) => {
  const styles = {
    '0-2': { bg: 'bg-pink-100', text: 'text-pink-600', icon: '👶' },
    '3-5': { bg: 'bg-blue-100', text: 'text-blue-600', icon: '🧒' },
    '6-10': { bg: 'bg-green-100', text: 'text-green-600', icon: '👧' },
    '11-14': { bg: 'bg-purple-100', text: 'text-purple-600', icon: '🧑' },
    '': { bg: 'bg-teal-100', text: 'text-teal-600', icon: '🎈' }  // Add this for empty ageGroup
  };
  return styles[ageGroup] || { bg: 'bg-gray-100', text: 'text-gray-600', icon: '🎈' };
};

const getAgeGroupBadge = (ageGroup) => {
  const styles = {
    '0-2': 'bg-pink-100 text-pink-600',
    '3-5': 'bg-blue-100 text-blue-600',
    '6-10': 'bg-green-100 text-green-600',
    '11-14': 'bg-purple-100 text-purple-600',
    '': 'bg-teal-100 text-teal-600'  // Add this for empty ageGroup
  };
  return styles[ageGroup] || 'bg-gray-100 text-gray-600';
};

const getTagStyles = (tag) => {
  const styles = {
    'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30',
    'New Arrival': 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30',
    'Limited Edition': 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30',
    'Eco-Friendly': 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30',
    'Educational': 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30',
    'STEM Toy': 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30',
    'Montessori': 'bg-gradient-to-r from-teal-500 to-green-600 text-white shadow-lg shadow-teal-500/30',
    'Creative Play': 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30',
    'Outdoor Fun': 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30',
    'Non-Toxic': 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30',
    'Award Winner': 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg shadow-yellow-500/30',
    'Musical Toy': 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30',
    'Interactive': 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30',
    'Light Up': 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-500/30',
    'Remote Control': 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30',
    'Building Set': 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30',
    'Puzzle Game': 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/30',
    'Art & Craft': 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30',
    'Pretend Play': 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30',
    'Trending': 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/30',
  };
  return styles[tag] || 'bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white';
};

const calculateDiscountPercentage = (regular, discount) => {
  if (regular && discount && discount < regular) {
    return Math.round(((regular - discount) / regular) * 100);
  }
  return 0;
};

const getStockStatus = (quantity) => {
  if (quantity <= 0) return { label: 'Out of Stock', color: 'red', icon: AlertCircle };
  if (quantity <= 10) return { label: 'Low Stock', color: 'orange', icon: AlertCircle };
  return { label: 'In Stock', color: 'green', icon: CheckCircle };
};

const truncateText = (text, limit = 20) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

// Loading Skeleton Component
const ProductSkeleton = () => (
  <div className="min-h-screen bg-[#FFF9F0]">
    <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8">
        <div className="lg:col-span-2 animate-pulse">
          <div className="bg-gray-200 rounded-2xl h-64 sm:h-80 md:h-96 w-full"></div>
          <div className="flex gap-2 mt-3 md:mt-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 space-y-3 md:space-y-4 animate-pulse">
          <div className="h-6 sm:h-7 md:h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-5 sm:h-5 md:h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-20 sm:h-24 md:h-24 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  </div>
);

// Zoom Modal Component
const ZoomModal = ({ images, currentIndex, onClose, onImageChange }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    onClick={onClose}
  >
    <div className="relative w-full h-full flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onImageChange((currentIndex - 1 + images.length) % images.length);
        }}
        className="absolute left-2 sm:left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
      
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-5xl w-full mx-2 sm:mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]?.url}
          alt="Zoomed product"
          className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain rounded-2xl"
        />
      </motion.div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onImageChange((currentIndex + 1) % images.length);
        }}
        className="absolute right-2 sm:right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  </motion.div>
);

// Share Modal Component
const ShareModal = ({ product, onClose }) => {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const shareOptions = [
    { name: 'Facebook', icon: Facebook, color: '#1877F2', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: 'Twitter', icon: Twitter, color: '#1DA1F2', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(product?.productName || 'Check this out!')}&url=${encodeURIComponent(url)}` },
    { name: 'LinkedIn', icon: Linkedin, color: '#0077B5', url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(product?.productName || '')}` },
    { name: 'WhatsApp', icon: MessageCircle, color: '#25D366', url: `https://wa.me/?text=${encodeURIComponent(`${product?.productName || ''} - ${url}`)}` },
    { name: 'Email', icon: Mail, color: '#6B7280', url: `mailto:?subject=${encodeURIComponent(product?.productName || 'Check this toy!')}&body=${encodeURIComponent(url)}` },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-3 sm:mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-base sm:text-lg font-bold text-[#2D3A5C] flex items-center gap-2">
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A8A90]" />
            Share this toy
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition">
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
            {shareOptions.map(option => (
              <a
                key={option.name}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-xl hover:bg-gray-50 transition group"
                onClick={(e) => {
                  if (option.name !== 'Email') e.preventDefault();
                  window.open(option.url, '_blank', 'noopener,noreferrer');
                }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition group-hover:scale-110" style={{ backgroundColor: `${option.color}15` }}>
                  <option.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: option.color }} />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-600">{option.name}</span>
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl border border-gray-200">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 text-xs sm:text-sm text-gray-600 bg-transparent outline-none px-1 sm:px-2"
            />
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#4A8A90] text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-[#3A7A80] transition"
            >
              {copied ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : <Copy className="w-3 h-3 sm:w-4 sm:h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Review Component
const ReviewCard = ({ review }) => {
  const [showFullComment, setShowFullComment] = useState(false);
  const truncatedComment = review.comment?.length > 200 ? review.comment.substring(0, 200) + '...' : review.comment;

  return (
    <div className="border-b border-[#FFE0E6] pb-3 sm:pb-4 last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center text-white font-bold text-sm sm:text-base">
            {review.userName?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-semibold text-[#2D3A5C] text-sm sm:text-base">{review.userName}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-[10px] sm:text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        {review.isVerifiedPurchase && (
          <span className="flex items-center gap-1 text-[9px] sm:text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full self-start sm:self-auto">
            <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            Verified
          </span>
        )}
      </div>
      {review.title && <p className="font-medium text-[#2D3A5C] mt-2 text-sm sm:text-base">{review.title}</p>}
      <p className="text-xs sm:text-sm text-gray-600 mt-1">
        {showFullComment ? review.comment : truncatedComment}
        {review.comment?.length > 200 && (
          <button onClick={() => setShowFullComment(!showFullComment)} className="text-[#4A8A90] text-xs font-medium ml-1">
            {showFullComment ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mt-3">
          {review.images.slice(0, 3).map((img, idx) => (
            <img key={idx} src={img.url} alt={`Review ${idx + 1}`} className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover border border-gray-200" />
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <button className="text-[10px] sm:text-xs text-gray-500 hover:text-[#4A8A90] transition flex items-center gap-1">
          👍 Helpful ({review.helpful || 0})
        </button>
      </div>
    </div>
  );
};

const RelatedProductCard = ({ product, router, isInCart: propIsInCart, isInWishlist: propIsInWishlist }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  
  const isInCart = propIsInCart || false;
  const isWishlisted = propIsInWishlist || false;
  const productImages = product.images || [];
  const hasMultipleImages = productImages.length > 1;
  const primaryTag = product.tags?.[0];
  const tagStyle = primaryTag ? getTagStyles(primaryTag) : '';
  const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
  const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
  const originalPrice = product.regularPrice;
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleWishlist = async (e) => {
    e.stopPropagation();
    setWishlistLoading(true);
    
    const toastId = toast.loading(isWishlisted ? 'Removing from wishlist...' : 'Adding to wishlist...');
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('wishlistSessionId');
      
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch('http://localhost:5000/api/wishlist', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ productId: product._id })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.sessionId && !token) {
          localStorage.setItem('wishlistSessionId', data.sessionId);
        }
        
        toast.success(data.message, { id: toastId });
        window.dispatchEvent(new Event('wishlist-update'));
      } else {
        toast.error(data.error || 'Failed to update wishlist', { id: toastId });
      }
    } catch (error) {
      console.error('Wishlist error:', error);
      toast.error('Network error. Please try again.', { id: toastId });
    } finally {
      setWishlistLoading(false);
    }
  };

  const addToCart = async (e) => {
    e.stopPropagation();
    
    if (isInCart) {
      router.push('/cart');
      return;
    }
    
    setCartStatusLoading(true);
    const toastId = toast.loading('Adding to cart...');
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          productId: product._id,
          quantity: 1
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.sessionId && !token) {
          localStorage.setItem('cartSessionId', data.sessionId);
        }
        
        toast.success('Added to cart!', { id: toastId });
        window.dispatchEvent(new Event('cart-update'));
        
        setTimeout(() => {
          window.dispatchEvent(new Event('cart-update'));
        }, 500);
      } else {
        toast.error(data.error || 'Failed to add to cart', { id: toastId });
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Network error. Please try again.', { id: toastId });
    } finally {
      setCartStatusLoading(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        layout: { type: "spring", stiffness: 100, damping: 15 },
        opacity: { duration: 0.3 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-xl border border-[#FFE0E6] hover:border-[#FFB6C1] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md overflow-hidden"
      onClick={() => {
        if (isMobile) {
          window.location.href = `/productDetails?id=${product._id}`;
        } else {
          window.open(`/productDetails?id=${product._id}`, '_blank');
        }
      }}
    >
      {/* Image Container */}
      <div className="relative w-full h-32 sm:h-36 md:h-40 overflow-hidden bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6]">
        <motion.img
          src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/300'}
          alt={product.productName}
          className="w-full h-full object-contain p-2"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300?text=Toy';
          }}
          loading="lazy"
        />
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-0.5 left-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[7px] sm:text-[9px] font-bold px-1 py-0.5 rounded-md shadow-lg z-20 flex items-center gap-0.5">
            <Zap className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
            {discountPercent}% OFF
          </div>
        )}
        
        {/* Tag Badge - Top Right */}
        {primaryTag && (
          <motion.div 
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`absolute top-0.5 right-0.5 ${tagStyle} text-[6px] sm:text-[7px] md:text-[8px] px-1 py-0.5 font-semibold rounded-md z-20 flex items-center gap-0.5 shadow-lg`}
          >
            <Sparkles className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
            <span className="truncate max-w-[40px] sm:max-w-[60px]">{primaryTag}</span>
          </motion.div>
        )}
        
        {/* Desktop Hover Icons - Appear from Right Side */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30 hidden sm:flex">
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ 
              x: isHovered && !isMobile ? 0 : 40, 
              opacity: isHovered && !isMobile ? 1 : 0 
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(`/productDetails?id=${product._id}`, '_blank');
            }}
            className="w-7 h-7 rounded-full bg-white shadow-md hover:bg-[#4A8A90] flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
          >
            <Eye className="w-3.5 h-3.5 text-[#4A8A90] hover:text-white transition-colors duration-200" />
          </motion.div>
          
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ 
              x: isHovered && !isMobile ? 0 : 40, 
              opacity: isHovered && !isMobile ? 1 : 0 
            }}
            transition={{ duration: 0.15, ease: "easeOut", delay: 0.03 }}
            onClick={addToCart}
            className="w-7 h-7 rounded-full bg-white shadow-md hover:bg-[#4A8A90] flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
          >
            {cartStatusLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#4A8A90] hover:text-white" />
            ) : isInCart ? (
              <ShoppingCart className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <ShoppingCart className="w-3.5 h-3.5 text-[#FFB6C1] hover:text-white transition-colors duration-200" />
            )}
          </motion.div>
          
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ 
              x: isHovered && !isMobile ? 0 : 40, 
              opacity: isHovered && !isMobile ? 1 : 0 
            }}
            transition={{ duration: 0.15, ease: "easeOut", delay: 0.06 }}
            onClick={handleWishlist}
            className="w-7 h-7 rounded-full bg-white shadow-md hover:bg-red-500 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
          >
            {wishlistLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-red-500 hover:text-white" />
            ) : (
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-[#4A8A90] hover:text-white'} transition-colors duration-200`} />
            )}
          </motion.div>
        </div>
        
        {/* Mobile Action Icons - Bottom Center */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-30 px-2 sm:hidden">
          {/* View Details Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(`/productDetails?id=${product._id}`, '_blank');
            }}
            className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md flex items-center justify-center"
          >
            <Eye className="w-3 h-3 text-[#4A8A90]" />
          </motion.button>
          
          {/* Add to Cart Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={addToCart}
            className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md flex items-center justify-center"
          >
            {cartStatusLoading ? (
              <Loader2 className="w-3 h-3 animate-spin text-[#4A8A90]" />
            ) : isInCart ? (
              <ShoppingCart className="w-3 h-3 text-green-500" />
            ) : (
              <ShoppingCart className="w-3 h-3 text-[#FFB6C1]" />
            )}
          </motion.button>
          
          {/* Wishlist Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleWishlist}
            className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md flex items-center justify-center"
          >
            {wishlistLoading ? (
              <Loader2 className="w-3 h-3 animate-spin text-red-500" />
            ) : (
              <Heart className={`w-3 h-3 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-[#4A8A90]'}`} />
            )}
          </motion.button>
        </div>
      </div>
      
      {/* Thumbnail Images */}
      {hasMultipleImages && (
        <div className="flex justify-center items-center gap-1 py-1 bg-[#FFF9F0] border-b border-[#FFE0E6]">
          {productImages.slice(0, 4).map((image, index) => (
            <button
              key={index}
              className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 overflow-hidden rounded transition-all duration-200 ${
                activeIndex === index 
                  ? 'ring-1 ring-[#4A8A90] ring-offset-0.5 scale-110' 
                  : 'opacity-60 hover:opacity-100'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(index);
              }}
            >
              <img src={image.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-1.5 sm:p-2">
        {/* Product Name */}
        <h3 className="text-[10px] sm:text-xs font-bold text-[#2D3A5C] line-clamp-2 hover:text-[#4A8A90] transition-colors duration-200 mb-1" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }} title={product.productName}>
          {truncateText(product.productName, isMobile ? 12 : 20)}
        </h3>
        
        {/* Age Group and Rating Row */}
        <div className="flex items-center justify-between mb-1">
          {product.ageGroup ? (
            <div className={`inline-flex items-center gap-0.5 px-1 py-0.5 rounded-full text-[6px] sm:text-[8px] font-semibold ${getAgeGroupBadge(product.ageGroup)}`}>
              <Users className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
              Ages {product.ageGroup}
            </div>
          ) : (
            <div className="text-[6px] sm:text-[8px] text-gray-400">✨ Toy</div>
          )}
          
          {product.rating > 0 && (
            <div className="flex items-center gap-0.5">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 ${
                      star <= Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : star - 0.5 <= product.rating
                        ? 'fill-yellow-400 text-yellow-400 opacity-50'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[6px] sm:text-[8px] text-gray-500">({product.rating})</span>
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-xs sm:text-sm font-bold text-[#4A8A90]">
            ৳{formatPrice(currentPrice)}
          </span>
          {discountPercent > 0 && (
            <>
              <span className="text-[6px] sm:text-[8px] text-gray-400 line-through">
                ৳{formatPrice(originalPrice)}
              </span>
              <span className="text-[5px] sm:text-[7px] font-semibold text-red-500 bg-red-100 px-0.5 py-0.5 rounded">
                -{discountPercent}%
              </span>
            </>
          )}
        </div>

        {/* Category and Stock Status Row */}
        <div className="flex items-center justify-between gap-1">
          {/* Category */}
          {product.category?.name && (
            <div className="flex items-center gap-0.5 text-[7px] text-[#8B9DC3]">
              <Package className="w-2.5 h-2.5" />
              <span className="truncate max-w-[70px]">{product.category.name}</span>
            </div>
          )}
          
          {!product.category?.name && product.categoryName && (
            <div className="flex items-center gap-0.5 text-[7px] text-[#8B9DC3]">
              <Package className="w-2.5 h-2.5" />
              <span className="truncate max-w-[70px]">{product.categoryName}</span>
            </div>
          )}
          
          {!product.category?.name && !product.categoryName && (
            <div className="text-[7px] text-gray-400">🎁 Toy</div>
          )}
          
          {/* Stock Status */}
          <div className="flex-shrink-0">
            {product.stockQuantity > 0 ? (
              <span className="flex items-center gap-0.5 text-[7px] text-green-600 font-medium">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                <span className="hidden xs:inline">In Stock ({product.stockQuantity})</span>
                <span className="xs:hidden">✓ {product.stockQuantity}</span>
              </span>
            ) : (
              <span className="flex items-center gap-0.5 text-[7px] text-red-500 font-medium">
                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                <span className="hidden xs:inline">Out of Stock</span>
                <span className="xs:hidden">✗</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Add to Cart / View Cart Button */}
      {cartStatusLoading ? (
        <button
          disabled
          className="w-full py-1 sm:py-1.5 text-center text-[8px] sm:text-[9px] font-bold bg-gray-300 text-gray-500 flex items-center justify-center gap-1"
        >
          <Loader2 className="w-2 h-2 sm:w-2.5 sm:h-2.5 animate-spin" />
          Loading...
        </button>
      ) : isInCart ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push('/cart');
          }}
          className="w-full py-1 sm:py-1.5 text-center text-[8px] sm:text-[9px] font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-1"
        >
          <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
          <span className="sm:inline">View in Cart</span>
        </button>
      ) : (
        <button
          onClick={addToCart}
          className="w-full py-1 sm:py-1.5 text-center text-[8px] sm:text-[9px] font-bold bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white hover:from-[#3A7A80] hover:to-[#5B9399] transition-all duration-200 flex items-center justify-center gap-1"
        >
          <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
          <span className="sm:inline">Add to Cart</span>
        </button>
      )}
    </motion.div>
  );
};

// Magnifying Glass Component
const MagnifyingGlass = ({ image, isActive }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const lensSize = 150;
  const zoomLevel = 2.5;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const lensX = x - lensSize / 2;
    const lensY = y - lensSize / 2;
    
    const constrainedX = Math.max(0, Math.min(lensX, rect.width - lensSize));
    const constrainedY = Math.max(0, Math.min(lensY, rect.height - lensSize));
    
    setMousePosition({ 
      x: constrainedX, 
      y: constrainedY,
      percentX: (constrainedX / (rect.width - lensSize)) * 100,
      percentY: (constrainedY / (rect.height - lensSize)) * 100
    });
  };

  if (!isActive || !image) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => {}}
    >
      {isHovering && (
        <>
          <div
            ref={lensRef}
            className="absolute rounded-full border-2 border-white shadow-2xl overflow-hidden pointer-events-none"
            style={{
              width: `${lensSize}px`,
              height: `${lensSize}px`,
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              background: `url(${image})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: `${-mousePosition.x * zoomLevel + lensSize/2}px ${-mousePosition.y * zoomLevel + lensSize/2}px`,
              backgroundSize: `${containerRef.current?.offsetWidth * zoomLevel}px ${containerRef.current?.offsetHeight * zoomLevel}px`,
              boxShadow: '0 0 0 3px rgba(74, 138, 144, 0.3), 0 8px 20px rgba(0,0,0,0.2)',
            }}
          />
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full pointer-events-none">
            🔍 Zoomed
          </div>
        </>
      )}
    </div>
  );
};

// Main Product Details Component
export default function ProductDetailsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [reviewsToShow, setReviewsToShow] = useState(5);
  const [activeTab, setActiveTab] = useState('description');
  const [isMobile, setIsMobile] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [imageLoaded, setImageLoaded] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredMediaIndex, setHoveredMediaIndex] = useState(null);
  const [enableMagnifier, setEnableMagnifier] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [generatingThumbnail, setGeneratingThumbnail] = useState(false);
  const [checkingCart, setCheckingCart] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselItemsPerView, setCarouselItemsPerView] = useState(5);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollIntervalRef = useRef(null);
  const [productReviews, setProductReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState(null);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [productsInCart, setProductsInCart] = useState({});
  const [productsInWishlist, setProductsInWishlist] = useState({});
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
  const mainImageRef = useRef(null);
  const galleryRef = useRef(null);
  const lensRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (productId) fetchProductDetails();
    fetchProductReviews();
  }, [productId]);

  useEffect(() => {
    if (product && product._id) {
      console.log('Checking wishlist status for product:', product._id);
      checkWishlistStatus();
    }
  }, [product]);

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  useEffect(() => {
    if (product?.videoUrl && product?.videoType !== 'youtube' && !videoThumbnail && !generatingThumbnail) {
      setGeneratingThumbnail(true);
      generateVideoThumbnail(product.videoUrl, (thumbnail) => {
        if (thumbnail) {
          setVideoThumbnail(thumbnail);
        }
        setGeneratingThumbnail(false);
      });
    }
  }, [product?.videoUrl, product?.videoType]);

  useEffect(() => {
    if (product) {
      checkCartStatus();
    }
  }, [product]);

  useEffect(() => {
    const handleWishlistUpdate = () => {
      console.log('Wishlist update event received, refreshing status');
      if (product && product._id) {
        checkWishlistStatus();
      }
    };
    
    window.addEventListener('wishlist-update', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('wishlist-update', handleWishlistUpdate);
    };
  }, [product]);

 

// Make sure this dependency is correct
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCarouselItemsPerView(2);
      } else if (window.innerWidth < 768) {
        setCarouselItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setCarouselItemsPerView(3);
      } else {
        setCarouselItemsPerView(5);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isAutoScrolling && relatedProducts.length > carouselItemsPerView) {
      autoScrollIntervalRef.current = setInterval(() => {
        setCarouselIndex((prev) => {
          const maxIndex = Math.max(0, relatedProducts.length - carouselItemsPerView);
          if (prev >= maxIndex) {
            return 0;
          }
          return prev + 1;
        });
      }, 5000);
    }
    
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling, relatedProducts.length, carouselItemsPerView]);



// KEEP ONLY this useEffect (around line 474-540):
useEffect(() => {
  const refreshRelatedProductsStatus = async () => {
    if (relatedProducts.length === 0) return;
    
    const productIds = relatedProducts.map(p => p._id);
    const token = localStorage.getItem('token');
    const cartSessionId = localStorage.getItem('cartSessionId');
    const wishlistSessionId = localStorage.getItem('wishlistSessionId');
    
    const cartHeaders = {};
    if (token) {
      cartHeaders['Authorization'] = `Bearer ${token}`;
    } else if (cartSessionId) {
      cartHeaders['x-session-id'] = cartSessionId;
    }
    
    try {
      const cartResponse = await fetch('http://localhost:5000/api/cart/check-status', {
        method: 'POST',
        headers: { ...cartHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds })
      });
      const cartData = await cartResponse.json();
      if (cartData.success) {
        setProductsInCart(cartData.data);
      }
    } catch (error) {
      console.error('Error refreshing cart status:', error);
    }
    
    const wishlistHeaders = {};
    if (token) {
      wishlistHeaders['Authorization'] = `Bearer ${token}`;
    } else if (wishlistSessionId) {
      wishlistHeaders['x-session-id'] = wishlistSessionId;
    }
    
    try {
      const wishlistResponse = await fetch('http://localhost:5000/api/wishlist/check-status', {
        method: 'POST',
        headers: { ...wishlistHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds })
      });
      const wishlistData = await wishlistResponse.json();
      if (wishlistData.success) {
        setProductsInWishlist(wishlistData.data);
      }
    } catch (error) {
      console.error('Error refreshing wishlist status:', error);
    }
  };
  
  // Initial fetch when component mounts or relatedProducts changes
  refreshRelatedProductsStatus();
  
  // Listen for both cart and wishlist updates
  const handleCartUpdate = () => {
    console.log('Cart update detected, refreshing related products status...');
    refreshRelatedProductsStatus();
  };
  
  const handleWishlistUpdate = () => {
    console.log('Wishlist update detected, refreshing related products status...');
    refreshRelatedProductsStatus();
  };
  
  window.addEventListener('cart-update', handleCartUpdate);
  window.addEventListener('wishlist-update', handleWishlistUpdate);
  
  return () => {
    window.removeEventListener('cart-update', handleCartUpdate);
    window.removeEventListener('wishlist-update', handleWishlistUpdate);
  };
}, [relatedProducts]);



  const handleCarouselInteraction = () => {
    setIsAutoScrolling(false);
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 5000);
  };

  const handlePrevSlide = () => {
    handleCarouselInteraction();
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextSlide = () => {
    handleCarouselInteraction();
    const maxIndex = Math.max(0, relatedProducts.length - carouselItemsPerView);
    setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`);
      const data = await response.json();
      if (data.success) {
        setProduct(data.data.product);
        setRelatedProducts(data.data.relatedProducts || []);
      } else {
        toast.error('Product not found');
        router.push('/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductReviews = async () => {
    if (!productId) return;
    
    setLoadingReviews(true);
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`http://localhost:5000/api/reviews?productId=${productId}&limit=50`, {
        headers
      });
      
      const data = await response.json();
      console.log('Full API response:', data);
      console.log('Reviews data:', data.data);
      
      if (data.success) {
        data.data.forEach(review => {
          console.log(`Review ${review._id}: user =`, review.user, 'status =', review.status);
        });
        
        setProductReviews(data.data || []);
        setReviewStats(data.stats);
      } else {
        setProductReviews([]);
      }
    } catch (error) {
      console.error('Error fetching product reviews:', error);
      setProductReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  };

  const checkWishlistStatus = async () => {
    const id = product?._id || productId;
    if (!id) {
      console.log('No product ID available for wishlist check');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('wishlistSessionId');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('Checking wishlist with token');
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
        console.log('Checking wishlist with sessionId:', sessionId);
      } else {
        console.log('No auth for wishlist check');
        return;
      }

      console.log('Calling wishlist check API for product:', id);
      const response = await fetch(`http://localhost:5000/api/wishlist/check/${id}`, { headers });
      const data = await response.json();
      console.log('Wishlist check response:', data);
      
      if (data.success) {
        setIsInWishlist(data.data.inWishlist);
        console.log('Product in wishlist:', data.data.inWishlist);
      }
    } catch (error) {
      console.error('Error checking wishlist:', error);
    }
  };

  const handleWishlist = async () => {
    const toastId = toast.loading(isInWishlist ? 'Removing from wishlist...' : 'Adding to wishlist...');
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('wishlistSessionId');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;
      else {
        toast.error('Please login to add to wishlist', { id: toastId });
        router.push('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/wishlist', {
        method: 'POST',
        headers,
        body: JSON.stringify({ productId: product._id })
      });
      const data = await response.json();
      if (data.success) {
        setIsInWishlist(!isInWishlist);
        toast.success(data.message, { id: toastId });
        window.dispatchEvent(new Event('wishlist-update'));
      } else {
        toast.error(data.error || 'Failed to update wishlist', { id: toastId });
      }
    } catch (error) {
      console.error('Wishlist error:', error);
      toast.error('Network error', { id: toastId });
    }
  };

  const handleAddToCart = async () => {
    if (product.stockQuantity <= 0) {
      toast.error('Out of stock');
      return;
    }
     let finalQuantity = quantity === '' || quantity === null ? 1 : quantity;
    setAddingToCart(true);
    const toastId = toast.loading('Adding to cart...');
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;

      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({ productId: product._id, quantity: quantity })
      });
      const data = await response.json();
      if (data.success) {
        if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
        setIsInCart(true);
        toast.success(`${quantity} item(s) added to cart!`, { id: toastId });
        window.dispatchEvent(new Event('cart-update'));
        setTimeout(() => window.dispatchEvent(new Event('cart-update')), 500);
      } else {
        toast.error(data.error || 'Failed to add to cart', { id: toastId });
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Network error', { id: toastId });
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (product.stockQuantity <= 0) {
      toast.error('Out of stock');
      return;
    }
    
    setAddingToCart(true);
    const toastId = toast.loading('Processing...');
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;

      const checkResponse = await fetch(`http://localhost:5000/api/cart/check/${product._id}`, { headers });
      const checkData = await checkResponse.json();
      
      let alreadyInCart = false;
      if (checkData.success) {
        alreadyInCart = checkData.data.inCart;
      }
      
      if (!alreadyInCart) {
        const response = await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers,
          body: JSON.stringify({ productId: product._id, quantity: quantity })
        });
        const data = await response.json();
        
        if (data.success) {
          if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
          window.dispatchEvent(new Event('cart-update'));
        } else {
          toast.error(data.error || 'Failed to process', { id: toastId });
          setAddingToCart(false);
          return;
        }
      }
      
      setTimeout(() => {
        toast.success('Redirecting to checkout...', { id: toastId });
        router.push('/checkout');
      }, 500);
      
    } catch (error) {
      console.error('Buy now error:', error);
      toast.error('Network error', { id: toastId });
    } finally {
      setAddingToCart(false);
    }
  };

  // const handleQuantityChange = (delta) => {
  //   const newQuantity = quantity + delta;
  //   if (newQuantity >= 1 && newQuantity <= (product?.stockQuantity || 10)) {
  //     setQuantity(newQuantity);
  //   }
  // };
  
  const handleQuantityChange = (delta) => {
  const newQuantity = quantity + delta;
  if (newQuantity >= 1 && newQuantity <= (product?.stockQuantity || 10)) {
    setQuantity(newQuantity);
  }
};
  
  
//   const handleQuantityInput = (e) => {
//   let value = parseInt(e.target.value);
  
//   // Check if input is empty or not a number
//   if (isNaN(value) || e.target.value === '') {
//     setQuantity(1);
//     return;
//   }
  
//   // Ensure value is within bounds (1 to stockQuantity)
//   if (value < 1) {
//     value = 1;
//   } else if (value > product.stockQuantity) {
//     value = product.stockQuantity;
//     toast.error(`Maximum quantity available is ${product.stockQuantity}`);
//   }
  
//   setQuantity(value);
// };

const handleQuantityInput = (e) => {
  const rawValue = e.target.value;
  
  // Allow empty string (user is typing/backspacing)
  if (rawValue === '') {
    setQuantity('');
    return;
  }
  
  let value = parseInt(rawValue);
  
  // Check if input is not a number
  if (isNaN(value)) {
    setQuantity(1);
    return;
  }
  
  // Ensure value is within bounds (1 to stockQuantity)
  if (value < 1) {
    value = 1;
  } else if (value > product.stockQuantity) {
    value = product.stockQuantity;
    toast.error(`Maximum quantity available is ${product.stockQuantity}`);
  }
  
  setQuantity(value);
};


  const checkCartStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      } else {
        setCheckingCart(false);
        return;
      }
      
      const response = await fetch(`http://localhost:5000/api/cart/check/${product._id}`, { headers });
      const data = await response.json();
      if (data.success) {
        setIsInCart(data.data.inCart);
      }
    } catch (error) {
      console.error('Error checking cart status:', error);
    } finally {
      setCheckingCart(false);
    }
  };

  const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
  };

  const getYouTubeThumbnail = (url) => {
    if (!url) return null;
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\s?#]+)/,
      /youtube\.com\/v\/([^&\s?#]+)/,
      /youtube\.com\/live\/([^&\s?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
      }
    }
    return null;
  };

  const generateVideoThumbnail = (videoUrl, callback) => {
    const video = document.createElement('video');
    video.crossOrigin = 'Anonymous';
    video.src = videoUrl;
    video.currentTime = 1.5;
    
    video.addEventListener('loadeddata', () => {
      setTimeout(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = 160;
        canvas.height = 160;
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
        callback(thumbnailUrl);
      }, 100);
    });
    
    video.addEventListener('error', () => {
      console.error('Error loading video for thumbnail generation');
      callback(null);
    });
    
    video.load();
  };

  if (loading) return <ProductSkeleton />;
  if (!product) return null;

  const discountPercent = calculateDiscount(product.regularPrice, product.discountPrice);
  const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
  const stockStatus = getStockStatus(product.stockQuantity);
  const StockIcon = stockStatus.icon;
  const ageBadge = getAgeBadge(product.ageGroup);
  const productImages = product.images || [];
  const hasVideo = product.videoUrl && product.videoUrl.trim() !== '';
  const mediaItems = [...productImages];
  if (hasVideo) {
    mediaItems.push({ type: 'video', url: product.videoUrl, videoType: product.videoType });
  }
  const mainMedia = mediaItems[activeImageIndex];
  const isMainVideo = mainMedia?.type === 'video';
  const mainImage = !isMainVideo ? mainMedia?.url : null;
  const mainVideoUrl = isMainVideo ? mainMedia?.url : null;
  const mainVideoType = isMainVideo ? mainMedia?.videoType : null;
  
  const reviews = product.reviews || [];
  const averageRating = product.rating || 0;
  const totalReviews = reviews.length;

  const categoryHierarchy = [];
  if (product.categoryName) categoryHierarchy.push(product.categoryName);
  if (product.subcategoryName) categoryHierarchy.push(product.subcategoryName);
  if (product.childSubcategoryName) categoryHierarchy.push(product.childSubcategoryName);

  return (
    <>
     {product && <MetadataUpdater product={product} />}
      <Navbar />
      <div className="min-h-screen bg-[#FFF9F0]">
        <div className="container mx-auto px-3 sm:px-4 py-4 md:py-6 lg:py-8 max-w-7xl">
          {/* Breadcrumb - Mobile Responsive */}
          <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm mb-4 md:mb-6 overflow-x-auto pb-2 scrollbar-thin">
            <Link href="/" className="text-gray-500 hover:text-[#4A8A90] transition whitespace-nowrap">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-[#4A8A90] transition whitespace-nowrap">Toys</Link>
            {categoryHierarchy.map((cat, idx) => (
              <React.Fragment key={idx}>
                <span className="text-gray-400">/</span>
                <span className="text-gray-500 truncate max-w-[100px] sm:max-w-none">{cat}</span>
              </React.Fragment>
            ))}
            <span className="text-gray-400">/</span>
            <span className="text-[#4A8A90] font-medium truncate max-w-[150px] sm:max-w-none">{product.productName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
            {/* Left Column - Product Gallery */}
            <div className="lg:col-span-3" ref={galleryRef}>
              <div className="sticky top-20 lg:top-24">
                {/* Main Image/Video Area */}
                <div className="relative bg-white rounded-xl sm:rounded-2xl border-2 border-[#FFE0E6] overflow-hidden shadow-md">
                  <div 
                    className="relative bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden cursor-crosshair"
                    style={{ height: 'auto', minHeight: '280px' }}
                    onMouseEnter={() => !isMainVideo && !isMobile && setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                    onMouseMove={(e) => {
                      if (!isZoomed || isMainVideo || isMobile) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      const y = ((e.clientY - rect.top) / rect.height) * 100;
                      setZoomPosition({
                        x: Math.min(Math.max(x, 0), 100),
                        y: Math.min(Math.max(y, 0), 100)
                      });
                    }}
                  >
                    <div className="relative w-full pt-[100%] sm:pt-[100%]">
                      {(isTransitioning || !imageLoaded[activeImageIndex]) && !isMainVideo && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse z-10">
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
                        </div>
                      )}
                      
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        {!isMainVideo && mainImage ? (
                          <img
                            key={activeImageIndex}
                            src={mainImage}
                            alt={product.productName}
                            className={`w-full h-full object-contain p-3 sm:p-4 bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6] transition-opacity duration-300 ${
                              imageLoaded[activeImageIndex] ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{
                              transform: isZoomed && !isMobile ? 'scale(2.2)' : 'scale(1)',
                              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                              transition: 'transform 0.15s ease-out'
                            }}
                            onLoad={() => {
                              setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
                              setTimeout(() => setIsTransitioning(false), 100);
                            }}
                            loading={activeImageIndex === 0 ? "eager" : "lazy"}
                            fetchPriority={activeImageIndex === 0 ? "high" : "auto"}
                            decoding="async"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/800x800?text=Image+Not+Available';
                              setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
                            }}
                          />
                        ) : isMainVideo && mainVideoUrl && (
                          mainVideoType === 'youtube' ? (
                            <iframe 
                              src={mainVideoUrl} 
                              className="w-full h-full aspect-square" 
                              allowFullScreen 
                              title="Product Video"
                            />
                          ) : (
                            <video 
                              src={mainVideoUrl} 
                              controls 
                              className="w-full h-full object-contain bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6]"
                            />
                          )
                        )}
                      </div>
                    </div>

                    {/* Zoom Indicator Overlay */}
                    {!isMainVideo && !isMobile && !isZoomed && (
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                          <span className="hidden xs:inline">Hover to zoom</span>
                        </div>
                      </div>
                    )}

                    {/* Controls */}
                    <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex gap-1 sm:gap-2 z-20">
                      {!isMainVideo && (
                        <button
                          onClick={() => setShowZoom(true)}
                          className="p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all hover:scale-105"
                          aria-label="View fullscreen"
                        >
                          <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                        </button>
                      )}
                    </div>

                    <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full z-20">
                      {activeImageIndex + 1} / {productImages.length}
                    </div>
                  </div>
                  
                  {discountPercent > 0 && (
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] sm:text-xs md:text-sm font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1">
                      <Tag className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      {discountPercent}% OFF
                    </div>
                  )}
                  {product.tags?.[0] && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-[#FFD93D] to-[#FFB6C1] text-[#2D3A5C] text-[8px] sm:text-[10px] md:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-lg">
                      {product.tags[0]}
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3 overflow-x-auto pb-2 scrollbar-thin justify-start sm:justify-center">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (activeImageIndex !== idx) {
                          setActiveImageIndex(idx);
                          setImageLoaded(prev => ({ ...prev, [idx]: false }));
                          setIsZoomed(false);
                        }
                      }}
                      onMouseEnter={() => {
                        preloadImage(img.url);
                        if (activeImageIndex !== idx) {
                          setActiveImageIndex(idx);
                          setImageLoaded(prev => ({ ...prev, [idx]: false }));
                          setIsZoomed(false);
                        }
                      }}
                      className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        activeImageIndex === idx ? 'border-[#4A8A90] shadow-md ring-2 ring-[#4A8A90]/20' : 'border-gray-200 hover:border-[#FFB6C1]'
                      }`}
                    >
                      <img src={img.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                  
                  {hasVideo && (
                    <button
                      onClick={() => {
                        if (activeImageIndex !== productImages.length) {
                          setActiveImageIndex(productImages.length);
                          setIsZoomed(false);
                        }
                      }}
                      onMouseEnter={() => {
                        if (activeImageIndex !== productImages.length) {
                          setActiveImageIndex(productImages.length);
                          setIsZoomed(false);
                        }
                      }}
                      className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
                        activeImageIndex === productImages.length ? 'border-[#4A8A90] shadow-md ring-2 ring-[#4A8A90]/20' : 'border-gray-200 hover:border-[#FFB6C1]'
                      }`}
                    >
                      {product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl) ? (
                        <img 
                          src={getYouTubeThumbnail(product.videoUrl)} 
                          alt="Video thumbnail" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.querySelector('.fallback-icon').style.display = 'flex';
                          }}
                        />
                      ) : 
                      product.videoType !== 'youtube' && videoThumbnail ? (
                        <img 
                          src={videoThumbnail} 
                          alt="Video thumbnail" 
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                      
                      <div 
                        className="fallback-icon w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex flex-col items-center justify-center"
                        style={{ 
                          display: (product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl)) || 
                                   (product.videoType !== 'youtube' && videoThumbnail) ? 'none' : 'flex' 
                        }}
                      >
                        {generatingThumbnail ? (
                          <>
                            <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-500 animate-spin" />
                            <span className="text-[6px] sm:text-[8px] text-purple-500 mt-0.5">Loading</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-500" />
                            <span className="text-[6px] sm:text-[8px] text-purple-500 mt-0.5">Video</span>
                          </>
                        )}
                      </div>
                      
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="lg:col-span-4 bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg shadow-sm">
              {/* Category Hierarchy */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {categoryHierarchy.map((cat, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-gradient-to-r from-[#4A8A90]/10 to-[#4A8A90]/5 text-[#4A8A90] border border-[#4A8A90]/20"
                  >
                    <FolderTree className="w-2 h-2 sm:w-3 sm:h-3" />
                    {cat}
                  </span>
                ))}
                
                {product.brand && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-gradient-to-r from-[#FFB6C1]/20 to-[#FFB6C1]/10 text-[#FF6B8A] border border-[#FFB6C1]/30">
                    <Tag className="w-2 h-2 sm:w-3 sm:h-3" />
                    {product.brand}
                  </span>
                )}
              </div>

              {/* Title */}
              <div className="mb-3 sm:mb-4">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                  {product.productName}
                </h1>
              </div>

              {/* Rating & Age */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${star <= Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : star - 0.5 <= averageRating ? 'fill-yellow-400 text-yellow-400 opacity-50' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">{averageRating.toFixed(1)}</span>
                </div>
              <div className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium ${ageBadge.bg} ${ageBadge.text}`}>
  <span className="text-sm sm:text-base">{ageBadge.icon}</span>
  <span>{product.ageGroup ? `Ages ${product.ageGroup} years` : 'All Kids'}</span>
</div>
              </div>

              {/* Price Card */}
              <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-gradient-to-r from-[#D4EDEE]/20 to-[#FFF9F0] rounded-xl border border-[#FFE0E6]">
                <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4A8A90]">৳{formatPrice(currentPrice)}</span>
                  {discountPercent > 0 && (
                    <>
                      <span className="text-sm sm:text-base text-gray-400 line-through">৳{formatPrice(product.regularPrice)}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-red-500 bg-red-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                        <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
                        Save {discountPercent}%
                      </span>
                    </>
                  )}
                </div>
                {product.codAvailable && (
                  <div className="flex items-center gap-1.5 mt-2 sm:mt-3 text-green-600 text-xs sm:text-sm bg-green-50 inline-flex px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                    <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Cash on Delivery available</span>
                  </div>
                )}
              </div>

              {/* Short Description */}
              <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-white rounded-xl border border-[#FFE0E6]">
                <div className="text-xs sm:text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium text-${stockStatus.color}-600 bg-${stockStatus.color}-50 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full`}>
                  <StockIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-${stockStatus.color}-500`} />
                  <span>{stockStatus.label}</span>
                  {stockStatus.label === 'In Stock' && <span className="text-[10px] sm:text-xs text-gray-500">({product.stockQuantity} available)</span>}
                </div>
              </div>

              {/* Quantity + Add to Cart + Buy Now + Wishlist + Share */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                {/* Quantity Selector */}
                {/* <div className="flex items-center rounded-lg border-2 border-[#FFE0E6] overflow-hidden bg-white">
                  <button 
                    onClick={() => handleQuantityChange(-1)} 
                    disabled={quantity <= 1 || isInCart} 
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
                  >
                    <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                  </button>
                  <span className="w-8 sm:w-10 md:w-12 text-center font-medium text-[#2D3A5C] text-sm sm:text-base">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)} 
                    disabled={quantity >= product.stockQuantity || isInCart} 
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
                  >
                    <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                  </button>
                </div> */}

                {/* Quantity Selector */}
<div className="flex items-center rounded-lg border-2 border-[#FFE0E6] overflow-hidden bg-white">
  <button 
    onClick={() => handleQuantityChange(-1)} 
    disabled={quantity <= 1 || isInCart} 
    className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
  >
    <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
  </button>
  {/* <input
    type="number"
    value={quantity}
    onChange={(e) => handleQuantityInput(e)}
    disabled={isInCart}
    min="1"
    max={product.stockQuantity}
    className="w-12 sm:w-14 md:w-16 text-center font-medium text-[#2D3A5C] text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#4A8A90]/20 border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
  /> */}
  <input
  type="number"
  value={quantity === '' ? '' : quantity}
  onChange={(e) => handleQuantityInput(e)}
  onBlur={() => {
    // When focus leaves, if empty, set to 1
    if (quantity === '' || quantity === null) {
      setQuantity(1);
    }
  }}
  disabled={isInCart}
  min="1"
  max={product.stockQuantity}
  className="w-12 sm:w-14 md:w-16 text-center font-medium text-[#2D3A5C] text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#4A8A90]/20 border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
/>
  <button 
    onClick={() => handleQuantityChange(1)} 
    disabled={quantity >= product.stockQuantity || isInCart} 
    className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
  >
    <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
  </button>
</div>

                {/* Add to Cart OR View in Cart Button */}
                {isInCart ? (
                  <button
                    onClick={() => router.push('/cart')}
                    className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">View in Cart</span>
                    <span className="xs:hidden">Cart</span>
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart || product.stockQuantity <= 0}
                    className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white font-bold rounded-lg hover:from-[#3A7A80] hover:to-[#5B9399] transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 text-xs sm:text-sm"
                  >
                    {addingToCart ? <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" /> : <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    {addingToCart ? 'Adding...' : 'Add to Cart'}
                  </button>
                )}

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  disabled={addingToCart || product.stockQuantity <= 0}
                  className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-gradient-to-r from-[#FFD93D] to-[#FFB6C1] text-[#2D3A5C] font-bold rounded-lg hover:from-[#FFE44D] hover:to-[#FF9CB0] transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 text-xs sm:text-sm"
                >
                  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Buy Now</span>
                  <span className="xs:hidden">Buy</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={handleWishlist}
                  className="p-2 sm:p-2.5 bg-white border-2 border-[#FFE0E6] rounded-full hover:border-[#FFB6C1] hover:bg-pink-50 transition-all"
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-[#4A8A90]'}`} />
                </button>

                {/* Share Button */}
                <button
                  onClick={() => setShowShare(true)}
                  className="p-2 sm:p-2.5 bg-white border-2 border-[#FFE0E6] rounded-full hover:border-[#4A8A90] transition-all"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A8A90]" />
                </button>
              </div>

              {/* Delivery Info */}
              <div className="bg-gradient-to-r from-[#D4EDEE]/30 to-[#FFE0E6]/30 rounded-xl p-3 sm:p-4 border border-[#FFE0E6]">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A8A90]" />
                  <span className="font-semibold text-[#2D3A5C] text-sm sm:text-base">Delivery Information</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 space-y-1" dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} />
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#FFE0E6]">
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                    <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>7 Days Return Policy</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                    <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Safe & Secure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs for Description, Specifications, Reviews */}
          <div className="mt-8 sm:mt-12">
            <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-[#FFE0E6]">
              {['description', 'specifications', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all ${
                    activeTab === tab ? 'bg-white text-[#4A8A90] border-t-2 border-l-2 border-r-2 border-[#FFE0E6] border-b-white' : 'text-gray-500 hover:text-[#4A8A90]'
                  }`}
                >
                  {tab === 'description' && 'Product Description'}
                  {tab === 'specifications' && 'Specifications'}
                  {tab === 'reviews' && `Reviews`}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-b-xl rounded-tr-xl border border-t-0 border-[#FFE0E6] p-4 sm:p-5 md:p-6">
              {activeTab === 'description' && (
                <div className="prose prose-sm max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: product.fullDescription }} />
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { label: 'Brand', value: product.brand, icon: Tag },
               { label: 'Age Group', value: product.ageGroup ? `Ages ${product.ageGroup} years` : 'All Kids', icon: Users },
                    { label: 'SKU', value: product.skuCode, icon: Package },
                    { label: 'Stock', value: `${product.stockQuantity} units available`, icon: Package },
                    { label: 'Category', value: product.categoryName, icon: Tag },
                    { label: 'Subcategory', value: product.subcategoryName, icon: FolderTree },
                    { label: 'Child Subcategory', value: product.childSubcategoryName, icon: FolderTree },
                    { label: 'COD Available', value: product.codAvailable ? 'Yes' : 'No', icon: Truck },
                  ].filter(item => item.value).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-[#FFF9F0] rounded-xl border border-[#FFE0E6]">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A8A90]" />
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">{item.label}</p>
                        <p className="font-medium text-[#2D3A5C] text-xs sm:text-sm">{item.value || 'N/A'}</p>
                      </div>
                    </div>
                  ))}
                  
                  {product.additionalInfo && product.additionalInfo.map((info, idx) => (
                    <div key={`additional-${idx}`} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-[#FFF9F0] rounded-xl border border-[#FFE0E6]">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD93D]" />
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">{info.fieldName}</p>
                        <p className="font-medium text-[#2D3A5C] text-xs sm:text-sm">{info.fieldValue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  {loadingReviews ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-[#4A8A90]" />
                    </div>
                  ) : (
                    <>
                      {reviewStats && reviewStats.totalReviews > 0 && (
                        <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
                          <button
                            onClick={() => setIsReviewModalOpen(true)}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#4A8A90] text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-[#3A7A80] transition"
                          >
                            Write a Review
                          </button>
                        </div>
                      )}

                      {productReviews.length === 0 && (
                        <div className="text-center py-6 sm:py-8">
                          <Star className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
                          <p className="text-sm sm:text-base text-gray-500">No reviews yet. Be the first to review this toy!</p>
                          <button
                            onClick={() => setIsReviewModalOpen(true)}
                            className="inline-block mt-2 sm:mt-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#4A8A90] text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-[#3A7A80] transition"
                          >
                            Write a Review
                          </button>
                        </div>
                      )}

                      <div className="space-y-3 sm:space-y-4 max-h-[500px] overflow-y-auto pr-1 sm:pr-2">
                        {productReviews.length > 0 ? (
                          productReviews.slice(0, reviewsToShow).map((review, idx) => {
                            const isPending = review.status === 'pending';
                            const isRejected = review.status === 'rejected';
                            const isApproved = review.status === 'approved';
                            
                            let currentUserId = null;
                            const userData = localStorage.getItem('user');
                            if (userData) {
                              try {
                                const parsedUser = JSON.parse(userData);
                                currentUserId = parsedUser._id || parsedUser.id;
                              } catch (e) {
                                console.error('Error parsing user data:', e);
                              }
                            }
                            
                            let isUserReview = false;
                            if (currentUserId) {
                              const reviewUserId = review.user?._id || review.user;
                              isUserReview = reviewUserId === currentUserId;
                            }
                            
                            if ((isPending || isRejected) && !isUserReview) return null;
                            
                            return (
                              <div key={idx} className="border-b border-[#FFE0E6] pb-3 sm:pb-4 last:border-0">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
                                  <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center text-white font-bold text-sm sm:text-base">
                                      {review.userName?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                      <p className="font-semibold text-[#2D3A5C] text-sm sm:text-base">{review.userName}</p>
                                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-0.5">
                                        <div className="flex items-center">
                                          {[1, 2, 3, 4, 5].map(star => (
                                            <Star
                                              key={star}
                                              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                          ))}
                                        </div>
                                        <span className="text-[10px] sm:text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                                        
                                        {isPending && isUserReview && (
                                          <span className="text-[10px] sm:text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full">
                                            Pending Approval
                                          </span>
                                        )}
                                        {isRejected && isUserReview && (
                                          <span className="text-[10px] sm:text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">
                                            Rejected
                                          </span>
                                        )}
                                        {isApproved && review.isVerifiedPurchase && (
                                          <span className="flex items-center gap-1 text-[9px] sm:text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full">
                                            <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                            Verified
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {review.title && <p className="font-medium text-[#2D3A5C] mt-2 text-sm sm:text-base">{review.title}</p>}
                                <p className="text-xs sm:text-sm text-gray-600 mt-1">{review.comment}</p>
                                {review.images && review.images.length > 0 && (
                                  <div className="flex gap-2 mt-3">
                                    {review.images.slice(0, 3).map((img, imgIdx) => (
                                      <img key={imgIdx} src={img.url} alt={`Review ${idx + 1}`} className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover border border-gray-200" />
                                    ))}
                                  </div>
                                )}
                                {isPending && isUserReview && (
                                  <div className="mt-2 p-2 bg-yellow-50 rounded-lg text-xs text-yellow-700">
                                    Your review is pending moderation. It will appear here once approved.
                                  </div>
                                )}
                                {isRejected && isUserReview && review.moderationNote && (
                                  <div className="mt-2 p-2 bg-red-50 rounded-lg text-xs text-red-700">
                                    <span className="font-semibold">Reason for rejection:</span> {review.moderationNote}
                                  </div>
                                )}
                                {isRejected && isUserReview && !review.moderationNote && (
                                  <div className="mt-2 p-2 bg-red-50 rounded-lg text-xs text-red-700">
                                    Your review was not approved. Please contact support for more information.
                                  </div>
                                )}
                              </div>
                            );
                          })
                        ) : null}
                      </div>

                      {productReviews.length > reviewsToShow && (
                        <button onClick={() => setReviewsToShow(reviewsToShow + 5)} className="mt-3 sm:mt-4 text-[#4A8A90] font-medium text-xs sm:text-sm hover:underline">
                          Load More Reviews ({productReviews.length - reviewsToShow} left)
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-8 sm:mt-12">
              <div className="flex items-center justify-between mb-3 sm:mb-5">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD93D]" />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                    You May Also Like
                  </h2>
                </div>
                
                {relatedProducts.length > carouselItemsPerView && (
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={handlePrevSlide}
                      disabled={carouselIndex === 0}
                      className={`p-1.5 sm:p-2 rounded-full transition-all ${
                        carouselIndex === 0 
                          ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                          : 'bg-white border border-[#FFE0E6] text-[#4A8A90] hover:bg-[#D4EDEE] hover:scale-110'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      disabled={carouselIndex >= relatedProducts.length - carouselItemsPerView}
                      className={`p-1.5 sm:p-2 rounded-full transition-all ${
                        carouselIndex >= relatedProducts.length - carouselItemsPerView 
                          ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                          : 'bg-white border border-[#FFE0E6] text-[#4A8A90] hover:bg-[#D4EDEE] hover:scale-110'
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="relative overflow-hidden">
                <motion.div
                  className="flex gap-2 sm:gap-3 md:gap-4"
                  animate={{ x: `-${carouselIndex * (100 / carouselItemsPerView)}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ width: `${(relatedProducts.length / carouselItemsPerView) * 100}%` }}
                >
                  {relatedProducts.map((relProduct) => (
                    <div 
                      key={relProduct._id} 
                      className="flex-shrink-0"
                      style={{ width: `${100 / relatedProducts.length}%` }}
                    >
                      <RelatedProductCard 
                        product={relProduct} 
                        router={router}
                        isInCart={productsInCart[relProduct._id] || false}
                        isInWishlist={productsInWishlist[relProduct._id] || false}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {relatedProducts.length > carouselItemsPerView && (
                <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                  {Array.from({ length: Math.ceil(relatedProducts.length / carouselItemsPerView) }).map((_, idx) => {
                    const pageIndex = idx * carouselItemsPerView;
                    const isActive = carouselIndex >= pageIndex && carouselIndex < pageIndex + carouselItemsPerView;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          handleCarouselInteraction();
                          setCarouselIndex(pageIndex);
                        }}
                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                          isActive ? 'w-4 sm:w-6 bg-[#4A8A90]' : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showZoom && (
          <ZoomModal 
            images={productImages} 
            currentIndex={activeImageIndex}
            onClose={() => setShowZoom(false)} 
            onImageChange={(index) => {
              setActiveImageIndex(index);
              setShowZoom(true);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>{showShare && <ShareModal product={product} onClose={() => setShowShare(false)} />}</AnimatePresence>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          fetchProductReviews();
        }}
        onReviewSubmitted={() => {
          fetchProductReviews();
        }}
        productId={productId}
        productName={product?.productName}
      />

      <Footer />
      <WhatsAppButton />
      
    </>
  );
}