

// 'use client';

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import Link from 'next/link';
// import { 
//   Search, 
//   Grid, 
//   List, 
//   SlidersHorizontal, 
//   X, 
//   Filter,
//   Loader2,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   ChevronUp,
//   Tag,
//   Users,
//   DollarSign,
//   Sparkles,
//   Eye, 
//   ShoppingCart,
//   ArrowLeft,
//   Package,
//   TrendingUp,
//   Palette,
//   Ruler,
//   FolderTree,
//   Gift,
//   Heart,
//   Truck,
//   Star,
//   Clock,
//   Zap
// } from 'lucide-react';
// import WhatsAppButton from '../components/layout/WhatsAppButton';
// import { toast } from 'sonner';
// import { useCartStatus } from '../hooks/useCartStatus';

// // Toy Theme Colors
// const TOY_COLORS = {
//   primary: '#4A8A90',
//   secondary: '#FFB6C1',
//   accent: '#FFD93D',
//   neutral: '#FFFFFF',
//   lightBg: '#FFF9F0',
//   border: '#FFE0E6',
//   text: '#2D3A5C',
//   textLight: '#8B9DC3',
//   textMuted: '#B8C5E0'
// };

// // Loading Bar Component
// const LoadingBar = ({ isVisible }) => {
//   return (
//     <div className={`fixed top-0 left-0 w-full h-1 bg-[#FFB6C1] z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
//       <div className="h-full bg-[#4A8A90] animate-loading-bar" style={{ width: '100%' }}></div>
//     </div>
//   );
// };

// // Helper functions
// const getUnitLabel = (orderUnit) => {
//   switch(orderUnit) {
//     case 'kg': return 'kg';
//     case 'ton': return 'MT';
//     default: return 'pcs';
//   }
// };

// const formatBulkRange = (range, unitLabel = 'pcs') => {
//   if (!range) return '';
//   if (range.includes('-')) {
//     const [min, max] = range.split('-');
//     return `${min}+ ${unitLabel}`;
//   }
//   if (range.includes('+')) {
//     return `${range.replace('+', '')}+ ${unitLabel}`;
//   }
//   return range;
// };

// const formatPrice = (price) => {
//   return price?.toFixed(2) || '0.00';
// };

// const truncateText = (text, limit = 25) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
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

// const getAgeGroupBadge = (ageGroup) => {
//   const styles = {
//     '0-2': 'bg-pink-100 text-pink-600',
//     '3-5': 'bg-blue-100 text-blue-600',
//     '6-10': 'bg-green-100 text-green-600',
//     '11-14': 'bg-purple-100 text-purple-600',
//   };
//   return styles[ageGroup] || 'bg-gray-100 text-gray-600';
// };

// // Product Grid Card - Toy Theme
// const ProductGridCard = ({ product }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false);
  
//   const { isInCart, loading: cartStatusLoading } = useCartStatus(product._id);
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

//   const handleWishlist = (e) => {
//     e.stopPropagation();
//     setIsWishlisted(!isWishlisted);
//     toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
//   };
//   // Add this function inside your ProductGridCard component
// // const addToCart = async (e) => {
// //   e.stopPropagation();
  
// //   const toastId = toast.loading('Adding to cart...');
  
// //   try {
// //     const token = localStorage.getItem('token');
// //     const sessionId = localStorage.getItem('cartSessionId');
    
// //     console.log('=== ADD TO CART DEBUG ===');
// //     console.log('Token exists:', !!token);
// //     console.log('User is logged in:', !!token);
    
// //     const headers = {
// //       'Content-Type': 'application/json'
// //     };
    
// //     if (token) {
// //       headers['Authorization'] = `Bearer ${token}`;
// //       console.log('Using Authorization header for logged-in user');
// //     } else if (sessionId) {
// //       headers['x-session-id'] = sessionId;
// //       console.log('Using session-id header for guest');
// //     }
    
// //     const response = await fetch('http://localhost:5000/api/cart', {
// //       method: 'POST',
// //       headers: headers,
// //       body: JSON.stringify({
// //         productId: product._id,
// //         quantity: 1
// //       })
// //     });
    
// //     const data = await response.json();
// //     console.log('Add to cart response:', data);
    
// //     if (data.success) {
// //       if (data.sessionId && !token) {
// //         localStorage.setItem('cartSessionId', data.sessionId);
// //         console.log('Saved sessionId for guest:', data.sessionId);
// //       }
      
// //       toast.success('Added to cart!', { id: toastId });
      
// //       // Dispatch event to update cart count
// //       window.dispatchEvent(new Event('cart-update'));
      
// //       // Also force a manual fetch after a short delay
// //       setTimeout(() => {
// //         window.dispatchEvent(new Event('cart-update'));
// //       }, 500);
      
// //     } else {
// //       toast.error(data.error || 'Failed to add to cart', { id: toastId });
// //     }
// //   } catch (error) {
// //     console.error('Add to cart error:', error);
// //     toast.error('Network error. Please try again.', { id: toastId });
// //   }
// // };

// const addToCart = async (e) => {
//     e.stopPropagation();
    
//     // Don't allow adding if already in cart
//     if (isInCart) {
//       toast.info('Product already in cart!', {
//         description: 'View your cart to proceed with checkout.'
//       });
//       return;
//     }
    
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
        
//         // Dispatch event to update cart count and cart status
//         window.dispatchEvent(new Event('cart-update'));
        
//         // Refetch cart status to update button
//         setTimeout(() => {
//           window.dispatchEvent(new Event('cart-update'));
//         }, 500);
        
//       } else {
//         toast.error(data.error || 'Failed to add to cart', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error('Network error. Please try again.', { id: toastId });
//     }
//   };

//   const viewCart = (e) => {
//     e.stopPropagation();
//     router.push('/cart');
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
//       className="group bg-white rounded-2xl border-2 border-[#FFE0E6] hover:border-[#FFB6C1] transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl overflow-hidden"
//       onClick={() => {
//         if (isMobile) {
//           window.location.href = `/productDetails?id=${product._id}`;
//         } else {
//           window.open(`/productDetails?id=${product._id}`, '_blank');
//         }
//       }}
//     >
//       {/* Image Container */}
//       <div className="relative w-full h-48 sm:h-52 md:h-56 overflow-hidden bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6]">
//         <motion.img
//           src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/300'}
//           alt={product.productName}
//           className="w-full h-full object-contain p-4"
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
//           <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-20 flex items-center gap-1">
//             <Zap className="w-3 h-3" />
//             {discountPercent}% OFF
//           </div>
//         )}
        
//         {/* Tag Badge - Top Right */}
//         {primaryTag && (
//           <motion.div 
//             initial={{ x: 10, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className={`absolute top-2 right-2 ${tagStyle} text-[8px] md:text-[9px] px-2 py-1 font-semibold rounded-full z-20 flex items-center gap-1 shadow-lg`}
//           >
//             <Sparkles className="w-2.5 h-2.5" />
//             <span className="truncate">{primaryTag}</span>
//           </motion.div>
//         )}
        
//         {/* Hover Icons - View, Cart, Wishlist */}
//         <motion.div 
//           className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 z-30"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: isHovered && !isMobile ? 1 : 0 }}
//           transition={{ duration: 0.2 }}
//         >
//           <motion.div
//             initial={{ scale: 0, y: 20 }}
//             animate={{ scale: isHovered && !isMobile ? 1 : 0, y: isHovered && !isMobile ? 0 : 20 }}
//             transition={{ delay: 0.05 }}
//             onClick={(e) => {
//               e.stopPropagation();
//               window.open(`/productDetails?id=${product._id}`, '_blank');
//             }}
//             className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center cursor-pointer shadow-lg transition-all hover:scale-110"
//           >
//             <Eye className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#4A8A90]" />
//           </motion.div>
          
//           <motion.div
//             initial={{ scale: 0, y: 20 }}
//             animate={{ scale: isHovered && !isMobile ? 1 : 0, y: isHovered && !isMobile ? 0 : 20 }}
//             transition={{ delay: 0.1 }}
//             onClick={(e) => {
//               e.stopPropagation();
//               window.open(`/productDetails?id=${product._id}#inquiry-form`, '_blank');
//             }}
//             className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center cursor-pointer shadow-lg transition-all hover:scale-110"
//           >
//             <ShoppingCart className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#FFB6C1]" />
//           </motion.div>
          
//           <motion.div
//             initial={{ scale: 0, y: 20 }}
//             animate={{ scale: isHovered && !isMobile ? 1 : 0, y: isHovered && !isMobile ? 0 : 20 }}
//             transition={{ delay: 0.15 }}
//             onClick={handleWishlist}
//             className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center cursor-pointer shadow-lg transition-all hover:scale-110"
//           >
//             <Heart className={`w-4 h-4 md:w-4.5 md:h-4.5 ${isWishlisted ? 'fill-[#FFB6C1] text-[#FFB6C1]' : 'text-[#4A8A90]'}`} />
//           </motion.div>
//         </motion.div>
//       </div>
      
//       {/* Thumbnail Images */}
//       {hasMultipleImages && (
//         <div className="flex justify-center items-center gap-1.5 py-2 bg-[#FFF9F0]">
//           {productImages.slice(0, 4).map((image, index) => (
//             <button
//               key={index}
//               className={`w-6 h-6 md:w-7 md:h-7 overflow-hidden rounded-md transition-all duration-200 ${
//                 activeIndex === index 
//                   ? 'ring-2 ring-[#4A8A90] ring-offset-1' 
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


//     {/* Content */}
// <div className="p-3 md:p-4">
//    {/* Product Name */}
//   <h3 className="text-sm md:text-base font-bold text-[#2D3A5C] line-clamp-2 hover:text-[#4A8A90] transition-colors mb-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }} title={product.productName}>
//     {truncateText(product.productName, 25)}
//   </h3>
//   {/* Age Group and Rating Row */}
//   <div className="flex items-center justify-between mb-2">
//     {product.ageGroup && (
//       <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${getAgeGroupBadge(product.ageGroup)}`}>
//         <Users className="w-2.5 h-2.5" />
//         Ages {product.ageGroup} years
//       </div>
//     )}
    
//     {/* Rating Stars */}
//     {product.rating > 0 && (
//       <div className="flex items-center gap-1">
//         <div className="flex items-center">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <Star
//               key={star}
//               className={`w-3 h-3 ${
//                 star <= Math.floor(product.rating)
//                   ? 'fill-yellow-400 text-yellow-400'
//                   : star - 0.5 <= product.rating
//                   ? 'fill-yellow-400 text-yellow-400 opacity-50'
//                   : 'text-gray-300'
//               }`}
//             />
//           ))}
//         </div>
//         <span className="text-[10px] text-gray-500">({product.rating})</span>
//       </div>
//     )}
//   </div>
  
 

//   {/* Price Section */}
//   <div className="flex items-baseline gap-2 mb-2">
//     <span className="text-lg md:text-xl font-bold text-[#4A8A90]">
//       ৳{formatPrice(currentPrice)}
//     </span>
//     {discountPercent > 0 && (
//       <>
//         <span className="text-xs text-gray-400 line-through">
//           ৳{formatPrice(originalPrice)}
//         </span>
//         <span className="text-xs font-semibold text-red-500 bg-red-100 px-1.5 py-0.5 rounded-full">
//           Save {discountPercent}%
//         </span>
//       </>
//     )}
//   </div>

//  {/* Category and Stock Status Row */}
// <div className="flex items-center justify-between gap-2 ">
//   {product.category?.name && (
//     <div className="flex items-center gap-1 text-[10px] text-[#8B9DC3]">
//       <Package className="w-3 h-3" />
//       <span className="truncate">{product.category.name}</span>
//     </div>
//   )}
  
//   {/* Stock Status */}
//   <div className="flex-shrink-0">
//     {product.stockQuantity > 0 ? (
//       <span className="flex items-center gap-1 text-[10px] text-green-600">
//         <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
//         <span>In Stock ({product.stockQuantity})</span>
//       </span>
//     ) : (
//       <span className="flex items-center gap-1 text-[10px] text-red-500">
//         <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
//         <span>Out of Stock</span>
//       </span>
//     )}
//   </div>
// </div>
// </div>


// <button
//   onClick={addToCart}  // Change from window.location.href to this
//   className="w-full py-2.5 md:py-3 text-center text-xs md:text-sm font-bold text-white bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] hover:from-[#3A7A80] hover:to-[#5B9399] transition-all flex items-center justify-center gap-2"
// >
//   <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
//   Add to Cart
// </button>
//     </motion.div>
//   );
// };

// // Product List Card - Toy Theme
// const ProductListCard = ({ product }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false);
  
//   const productImages = product.images || [];
//   const hasMultipleImages = productImages.length > 1;
//   const primaryTag = product.tags?.[0];
//   const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
//   const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
//   const originalPrice = product.regularPrice;

//   const handleWishlist = (e) => {
//     e.stopPropagation();
//     setIsWishlisted(!isWishlisted);
//     toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
//   };

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="group bg-white rounded-2xl border-2 border-[#FFE0E6] hover:border-[#FFB6C1] transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl overflow-hidden"
//       onClick={() => window.open(`/productDetails?id=${product._id}`, '_blank')}
//     >
//       <div className="flex flex-col md:flex-row">
//         {/* Image Section */}
//         <div className="md:w-64 lg:w-72 relative">
//           <div className="relative h-52 md:h-56 overflow-hidden bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6]">
//             <motion.img
//               src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/300'}
//               alt={product.productName}
//               className="w-full h-full object-contain p-4"
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.4 }}
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://via.placeholder.com/300?text=Toy';
//               }}
//               loading="lazy"
//             />
            
//             {/* Discount Badge */}
//             {discountPercent > 0 && (
//               <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-20 flex items-center gap-1">
//                 <Zap className="w-3 h-3" />
//                 {discountPercent}% OFF
//               </div>
//             )}
            
//             {/* Tag Badge */}
//             {primaryTag && (
//               <span className={`absolute top-2 right-2 ${getTagStyles(primaryTag)} text-white text-[9px] px-2 py-1 font-semibold rounded-full z-20 flex items-center gap-1 shadow-lg`}>
//                 <Sparkles className="w-2.5 h-2.5" />
//                 {primaryTag}
//               </span>
//             )}
            
//             {/* Hover Icons */}
//             <motion.div 
//               className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 z-30"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: isHovered ? 1 : 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <motion.div
//                 initial={{ scale: 0, y: 20 }}
//                 animate={{ scale: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
//                 transition={{ delay: 0.05 }}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   window.open(`/productDetails?id=${product._id}`, '_blank');
//                 }}
//                 className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center cursor-pointer shadow-lg"
//               >
//                 <Eye className="w-4.5 h-4.5 text-[#4A8A90]" />
//               </motion.div>
//               <motion.div
//                 initial={{ scale: 0, y: 20 }}
//                 animate={{ scale: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
//                 transition={{ delay: 0.1 }}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   window.open(`/productDetails?id=${product._id}#inquiry-form`, '_blank');
//                 }}
//                 className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center cursor-pointer shadow-lg"
//               >
//                 <ShoppingCart className="w-4.5 h-4.5 text-[#FFB6C1]" />
//               </motion.div>
//               <motion.div
//                 initial={{ scale: 0, y: 20 }}
//                 animate={{ scale: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
//                 transition={{ delay: 0.15 }}
//                 onClick={handleWishlist}
//                 className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center cursor-pointer shadow-lg"
//               >
//                 <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-[#FFB6C1] text-[#FFB6C1]' : 'text-[#4A8A90]'}`} />
//               </motion.div>
//             </motion.div>
//           </div>

//           {/* Thumbnails */}
//           {hasMultipleImages && (
//             <div className="flex justify-center gap-1.5 py-2 bg-[#FFF9F0]">
//               {productImages.slice(0, 4).map((image, idx) => (
//                 <div
//                   key={idx}
//                   className={`w-7 h-7 overflow-hidden rounded-md cursor-pointer transition-all ${
//                     activeIndex === idx 
//                       ? 'ring-2 ring-[#4A8A90] ring-offset-1' 
//                       : 'opacity-60 hover:opacity-100'
//                   }`}
//                   onMouseEnter={() => setActiveIndex(idx)}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setActiveIndex(idx);
//                   }}
//                 >
//                   <img src={image.url} alt="" className="w-full h-full object-cover" />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Content Section */}
//         {/* Content Section */}
// <div className="flex-1 p-4 md:p-5">
//   {/* Age Group and Rating Row */}
//   <div className="flex items-center justify-between mb-2">
//     {product.ageGroup && (
//       <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${getAgeGroupBadge(product.ageGroup)}`}>
//         <Users className="w-2.5 h-2.5" />
//         Ages {product.ageGroup} years
//       </div>
//     )}
    
//     {/* Rating Stars */}
//     {product.rating > 0 && (
//       <div className="flex items-center gap-1">
//         <div className="flex items-center">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <Star
//               key={star}
//               className={`w-3.5 h-3.5 ${
//                 star <= Math.floor(product.rating)
//                   ? 'fill-yellow-400 text-yellow-400'
//                   : star - 0.5 <= product.rating
//                   ? 'fill-yellow-400 text-yellow-400 opacity-50'
//                   : 'text-gray-300'
//               }`}
//             />
//           ))}
//         </div>
//         <span className="text-[10px] text-gray-500">({product.rating})</span>
//       </div>
//     )}
//   </div>
  
//   <h3 className="text-base md:text-lg font-bold text-[#2D3A5C] mb-2 hover:text-[#4A8A90] transition-colors" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//     {product.productName}
//   </h3>
  
//   {/* Price */}
//   <div className="flex items-baseline gap-2 mb-3">
//     <span className="text-xl md:text-2xl font-bold text-[#4A8A90]">
//       ৳{formatPrice(currentPrice)}
//     </span>
//     {discountPercent > 0 && (
//       <>
//         <span className="text-sm text-gray-400 line-through">
//           ৳{formatPrice(originalPrice)}
//         </span>
//         <span className="text-xs font-semibold text-red-500 bg-red-100 px-2 py-0.5 rounded-full">
//           Save {discountPercent}%
//         </span>
//       </>
//     )}
//   </div>
  
//   {/* Description */}
//   <p className="text-xs text-gray-600 mb-3 line-clamp-2">
//     {product.fullDescription?.replace(/<[^>]*>/g, '') || product.shortDescription?.replace(/<[^>]*>/g, '') || 'No description available'}
//   </p>

//   {/* Additional Info */}
//   <div className="flex flex-wrap items-center gap-3 mb-4">
//     {product.category?.name && (
//       <div className="flex items-center gap-1 text-[10px] bg-[#FFF9F0] px-2 py-1 rounded-full text-[#8B9DC3]">
//         <Package className="w-3 h-3" />
//         {product.category.name}
//       </div>
//     )}
//     {product.brand && (
//       <div className="flex items-center gap-1 text-[10px] bg-[#FFF9F0] px-2 py-1 rounded-full text-[#8B9DC3]">
//         <Tag className="w-3 h-3" />
//         {product.brand}
//       </div>
//     )}
//     {/* Show rating in list view too if no age group */}
//     {!product.ageGroup && product.rating > 0 && (
//       <div className="flex items-center gap-1 text-[10px] bg-[#FFF9F0] px-2 py-1 rounded-full">
//         <div className="flex items-center">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <Star
//               key={star}
//               className={`w-2.5 h-2.5 ${
//                 star <= Math.floor(product.rating)
//                   ? 'fill-yellow-400 text-yellow-400'
//                   : 'text-gray-300'
//               }`}
//             />
//           ))}
//         </div>
//         <span className="text-gray-600">({product.rating})</span>
//       </div>
//     )}
//     <div className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-full ${product.stockQuantity > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
//       {product.stockQuantity > 0 ? (
//         <>
//           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
//           In Stock
//         </>
//       ) : (
//         <>
//           <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
//           Out of Stock
//         </>
//       )}
//     </div>
//   </div>

//   {/* Add to Cart Button */}
//   <button
//     onClick={(e) => {
//       e.stopPropagation();
//       window.location.href = `/productDetails?id=${product._id}#inquiry-form`;
//     }}
//     className="px-5 py-2.5 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white text-sm font-bold rounded-full hover:from-[#3A7A80] hover:to-[#5B9399] transition-all flex items-center justify-center gap-2 w-full md:w-auto shadow-md"
//   >
//     <ShoppingCart className="w-4 h-4" />
//     Add to Cart
//   </button>
// </div>
//       </div>
//     </motion.div>
//   );
// };

// // Filter Sidebar Component (same as before but with toy colors)
// const FilterSidebar = ({ 
//   expandedSections, 
//   toggleSection, 
//   categories, 
//   subcategories,
//   childSubcategories,
//   filters, 
//   handleCategoryChange, 
//   handleRemoveCategory,
//   handleSubcategoryChange,
//   handleRemoveSubcategory,
//   handleChildSubcategoryChange,
//   handleRemoveChildSubcategory,
//   handleTargetedCustomerChange,
//   minPriceInput,
//   maxPriceInput,
//   setMinPriceInput,
//   setMaxPriceInput,
//   applyPriceRange,
//   clearPriceRange,
//   getActiveFilterCount,
//   clearFilters,
//   selectedCategory,
//   selectedSubcategory,
//   showChildSubcategory
// }) => (
//   <div className="bg-white rounded-2xl border-2 border-[#FFE0E6] p-5 sticky top-24 shadow-md">
//     <div className="flex items-center justify-between mb-5">
//       <h3 className="text-lg font-bold text-[#2D3A5C] flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//         <Filter className="w-5 h-5 text-[#4A8A90]" />
//         Filters
//       </h3>
//       {getActiveFilterCount() > 0 && (
//         <button
//           onClick={clearFilters}
//           className="text-xs text-[#4A8A90] hover:text-[#FFB6C1] font-medium"
//         >
//           Clear All ({getActiveFilterCount()})
//         </button>
//       )}
//     </div>

//     {/* Price Range */}
//     <div className="mb-5 border-b border-[#FFE0E6] pb-5">
//       <button
//         onClick={() => toggleSection('price')}
//         className="flex items-center justify-between w-full text-left mb-3"
//       >
//         <h4 className="font-bold text-[#2D3A5C] flex items-center gap-2">
//           <DollarSign className="w-4 h-4 text-[#4A8A90]" />
//           Price Range
//         </h4>
//         {expandedSections.price ? (
//           <ChevronUp className="w-4 h-4 text-gray-500" />
//         ) : (
//           <ChevronDown className="w-4 h-4 text-gray-500" />
//         )}
//       </button>
      
//       {expandedSections.price && (
//         <div className="space-y-4">
//           <div className="space-y-3">
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-[#8B9DC3]">Min (৳)</span>
//               <input
//                 type="text"
//                 inputMode="decimal"
//                 value={minPriceInput}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (value === '' || /^\d*\.?\d*$/.test(value)) {
//                     setMinPriceInput(value);
//                   }
//                 }}
//                 placeholder="0"
//                 className="w-28 px-2 py-1.5 text-right text-sm border-2 border-[#FFE0E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A8A90]"
//               />
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-[#8B9DC3]">Max (৳)</span>
//               <input
//                 type="text"
//                 inputMode="decimal"
//                 value={maxPriceInput}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (value === '' || /^\d*\.?\d*$/.test(value)) {
//                     setMaxPriceInput(value);
//                   }
//                 }}
//                 placeholder="Any"
//                 className="w-28 px-2 py-1.5 text-right text-sm border-2 border-[#FFE0E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A8A90]"
//               />
//             </div>
//           </div>
          
//           <button
//             onClick={applyPriceRange}
//             disabled={!minPriceInput && !maxPriceInput}
//             className="w-full py-2 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white text-sm font-bold rounded-lg hover:from-[#3A7A80] hover:to-[#5B9399] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
//           >
//             Apply Price Range
//           </button>

//           {(filters.priceRange.min || filters.priceRange.max) && (
//             <div className="flex items-center justify-between bg-[#FFF9F0] rounded-lg p-2 border border-[#FFE0E6]">
//               <span className="text-sm font-medium text-[#4A8A90]">
//                 ৳{filters.priceRange.min || '0'} - ৳{filters.priceRange.max || '∞'}
//               </span>
//               <button onClick={clearPriceRange} className="text-gray-400 hover:text-gray-600">
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>

//     {/* Categories */}
//     <div className="mb-5 border-b border-[#FFE0E6] pb-5">
//       <button
//         onClick={() => toggleSection('categories')}
//         className="flex items-center justify-between w-full text-left mb-3"
//       >
//         <h4 className="font-bold text-[#2D3A5C] flex items-center gap-2">
//           <Tag className="w-4 h-4 text-[#4A8A90]" />
//           Categories
//         </h4>
//         {expandedSections.categories ? (
//           <ChevronUp className="w-4 h-4 text-gray-500" />
//         ) : (
//           <ChevronDown className="w-4 h-4 text-gray-500" />
//         )}
//       </button>
      
//       {expandedSections.categories && (
//         <div className="space-y-2">
//           {filters.categories.length > 0 && (
//             <div className="mb-3 p-2 bg-[#FFF9F0] rounded-lg border border-[#FFE0E6]">
//               <p className="text-xs text-[#8B9DC3] mb-2">Selected Categories:</p>
//               {filters.categories.map(catId => {
//                 const category = categories.find(c => c._id === catId);
//                 return category ? (
//                   <div key={catId} className="flex items-center justify-between py-1">
//                     <span className="text-sm font-medium text-[#2D3A5C]">{category.name}</span>
//                     <button
//                       onClick={() => handleRemoveCategory(catId)}
//                       className="text-gray-400 hover:text-gray-600"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ) : null;
//               })}
//             </div>
//           )}
          
//           <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
//             {categories.map(category => (
//               <label key={category._id} className="flex items-center gap-2 cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   checked={filters.categories.includes(category._id)}
//                   onChange={() => handleCategoryChange(category._id)}
//                   className="w-4 h-4 rounded border-gray-300 text-[#4A8A90] focus:ring-[#4A8A90]"
//                 />
//                 <span className="text-sm text-gray-700 group-hover:text-[#4A8A90] transition-colors flex-1">
//                   {category.name}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>

//     {/* Subcategories Section */}
//     {selectedCategory && subcategories.length > 0 && (
//       <div className="mb-5 border-b border-[#FFE0E6] pb-5">
//         <button
//           onClick={() => toggleSection('subcategories')}
//           className="flex items-center justify-between w-full text-left mb-3"
//         >
//           <h4 className="font-bold text-[#2D3A5C] flex items-center gap-2">
//             <FolderTree className="w-4 h-4 text-[#4A8A90]" />
//             Subcategories
//           </h4>
//           {expandedSections.subcategories ? (
//             <ChevronUp className="w-4 h-4 text-gray-500" />
//           ) : (
//             <ChevronDown className="w-4 h-4 text-gray-500" />
//           )}
//         </button>
        
//         {expandedSections.subcategories && (
//           <div className="space-y-2">
//             {filters.subcategories.length > 0 && (
//               <div className="mb-3 p-2 bg-[#FFF9F0] rounded-lg border border-[#FFE0E6]">
//                 <p className="text-xs text-[#8B9DC3] mb-2">Selected Subcategories:</p>
//                 {filters.subcategories.map(subId => {
//                   const subcategory = subcategories.find(s => s._id === subId);
//                   return subcategory ? (
//                     <div key={subId} className="flex items-center justify-between py-1">
//                       <span className="text-sm font-medium text-[#2D3A5C]">{subcategory.name}</span>
//                       <button
//                         onClick={() => handleRemoveSubcategory(subId)}
//                         className="text-gray-400 hover:text-gray-600"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ) : null;
//                 })}
//               </div>
//             )}
            
//             <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
//               {subcategories.map(subcategory => (
//                 <label key={subcategory._id} className="flex items-center gap-2 cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     checked={filters.subcategories.includes(subcategory._id)}
//                     onChange={() => handleSubcategoryChange(subcategory._id)}
//                     className="w-4 h-4 rounded border-gray-300 text-[#4A8A90] focus:ring-[#4A8A90]"
//                   />
//                   <span className="text-sm text-gray-700 group-hover:text-[#4A8A90] transition-colors flex-1">
//                     {subcategory.name}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     )}

//     {/* Child Subcategories Section */}
//     {showChildSubcategory && selectedSubcategory && childSubcategories.length > 0 && (
//       <div className="mb-5 border-b border-[#FFE0E6] pb-5">
//         <button
//           onClick={() => toggleSection('childSubcategories')}
//           className="flex items-center justify-between w-full text-left mb-3"
//         >
//           <h4 className="font-bold text-[#2D3A5C] flex items-center gap-2">
//             <FolderTree className="w-4 h-4 text-[#4A8A90]" />
//             Child Subcategories
//           </h4>
//           {expandedSections.childSubcategories ? (
//             <ChevronUp className="w-4 h-4 text-gray-500" />
//           ) : (
//             <ChevronDown className="w-4 h-4 text-gray-500" />
//           )}
//         </button>
        
//         {expandedSections.childSubcategories && (
//           <div className="space-y-2">
//             {filters.childSubcategories.length > 0 && (
//               <div className="mb-3 p-2 bg-[#FFF9F0] rounded-lg border border-[#FFE0E6]">
//                 <p className="text-xs text-[#8B9DC3] mb-2">Selected Child Subcategories:</p>
//                 {filters.childSubcategories.map(childId => {
//                   const child = childSubcategories.find(c => c._id === childId);
//                   return child ? (
//                     <div key={childId} className="flex items-center justify-between py-1">
//                       <span className="text-sm font-medium text-[#2D3A5C]">{child.name}</span>
//                       <button
//                         onClick={() => handleRemoveChildSubcategory(childId)}
//                         className="text-gray-400 hover:text-gray-600"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ) : null;
//                 })}
//               </div>
//             )}
            
//             <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
//               {childSubcategories.map(child => (
//                 <label key={child._id} className="flex items-center gap-2 cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     checked={filters.childSubcategories.includes(child._id)}
//                     onChange={() => handleChildSubcategoryChange(child._id)}
//                     className="w-4 h-4 rounded border-gray-300 text-[#4A8A90] focus:ring-[#4A8A90]"
//                   />
//                   <span className="text-sm text-gray-700 group-hover:text-[#4A8A90] transition-colors flex-1">
//                     {child.name}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     )}

//     {/* Age Groups (replacing Target Audience) */}
//     <div className="mb-2">
//       <button
//         onClick={() => toggleSection('ageGroup')}
//         className="flex items-center justify-between w-full text-left mb-3"
//       >
//         <h4 className="font-bold text-[#2D3A5C] flex items-center gap-2">
//           <Users className="w-4 h-4 text-[#4A8A90]" />
//           Age Group
//         </h4>
//         {expandedSections.ageGroup ? (
//           <ChevronUp className="w-4 h-4 text-gray-500" />
//         ) : (
//           <ChevronDown className="w-4 h-4 text-gray-500" />
//         )}
//       </button>
      
//       {expandedSections.ageGroup && (
//         <div className="space-y-2">
//           {[
//             { value: '0-2', label: '0-2 years', icon: '👶' },
//             { value: '3-5', label: '3-5 years', icon: '🧒' },
//             { value: '6-10', label: '6-10 years', icon: '👧' },
//             { value: '11-14', label: '11-14 years', icon: '🧑' }
//           ].map(age => (
//             <label key={age.value} className="flex items-center gap-2 cursor-pointer group">
//               <input
//                 type="checkbox"
//                 checked={filters.ageGroups?.includes(age.value)}
//                 onChange={() => handleTargetedCustomerChange(age.value)}
//                 className="w-4 h-4 rounded border-gray-300 text-[#4A8A90] focus:ring-[#4A8A90]"
//               />
//               <span className="text-sm text-gray-700 group-hover:text-[#4A8A90] transition-colors flex-1">
//                 {age.icon} {age.label}
//               </span>
//             </label>
//           ))}
//         </div>
//       )}
//     </div>
//   </div>
// );

// // ========== MAIN PRODUCTS CONTENT COMPONENT ==========
// export default function ProductsClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('grid');
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [subcategories, setSubcategories] = useState([]);
//   const [childSubcategories, setChildSubcategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [showChildSubcategory, setShowChildSubcategory] = useState(false);
  
//   const [expandedSections, setExpandedSections] = useState({
//     price: true,
//     categories: true,
//     subcategories: true,
//     childSubcategories: true,
//     ageGroup: true
//   });

//   const productsContainerRef = useRef(null);
//   const scrollPositionRef = useRef(0);
//   const searchTimerRef = useRef(null);

//   const [filters, setFilters] = useState({
//     search: '',
//     categories: [],
//     subcategories: [],
//     childSubcategories: [],
//     ageGroups: [],
//     priceRange: { min: '', max: '' },
//     sortBy: 'newest'
//   });

//   const [searchInput, setSearchInput] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [minPriceInput, setMinPriceInput] = useState('');
//   const [maxPriceInput, setMaxPriceInput] = useState('');
//   const [initialCategorySet, setInitialCategorySet] = useState(false);

//   const saveScrollPosition = () => {
//     scrollPositionRef.current = window.scrollY;
//   };

//   const restoreScrollPosition = () => {
//     if (scrollPositionRef.current > 0) {
//       window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
//     }
//   };

//   const debouncedSearch = useCallback((searchValue) => {
//     if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
//     searchTimerRef.current = setTimeout(() => {
//       saveScrollPosition();
//       setFilters(prev => ({ ...prev, search: searchValue }));
//       setCurrentPage(1);
//     }, 500);
//   }, []);

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchInput(value);
//     debouncedSearch(value);
//   };

//   const handleClearSearch = () => {
//     setSearchInput('');
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, search: '' }));
//     setCurrentPage(1);
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (categories.length > 0 && !initialCategorySet) {
//       const categoryParam = searchParams.get('category');
//       const subcategoryParam = searchParams.get('subcategory');
//       const childSubcategoryParam = searchParams.get('childSubcategory');
      
//       if (categoryParam) {
//         const categoryExists = categories.some(cat => cat._id === categoryParam);
//         if (categoryExists) {
//           setFilters(prev => ({ ...prev, categories: [categoryParam] }));
          
//           if (subcategoryParam) {
//             const loadSubcategoriesAndSetFilter = async () => {
//               const subcats = await fetchSubcategories(categoryParam);
//               if (subcats && Array.isArray(subcats)) {
//                 const subcategoryExists = subcats.some(sub => sub._id === subcategoryParam);
//                 if (subcategoryExists) {
//                   setFilters(prev => ({ ...prev, subcategories: [subcategoryParam] }));
                  
//                   if (childSubcategoryParam) {
//                     const children = await fetchChildSubcategories(categoryParam, subcategoryParam);
//                     if (children && Array.isArray(children)) {
//                       const childExists = children.some(child => child._id === childSubcategoryParam);
//                       if (childExists) {
//                         setFilters(prev => ({ ...prev, childSubcategories: [childSubcategoryParam] }));
//                       }
//                     }
//                   }
//                 }
//               }
//             };
//             loadSubcategoriesAndSetFilter();
//           }
//         }
//       }
//       setInitialCategorySet(true);
//     }
//   }, [categories, searchParams, initialCategorySet]);

//   useEffect(() => {
//     if (filters.categories.length === 1) {
//       const categoryId = filters.categories[0];
//       setSelectedCategory(categoryId);
//       fetchSubcategories(categoryId);
//     } else {
//       setSubcategories([]);
//       setSelectedCategory(null);
//       setChildSubcategories([]);
//       setSelectedSubcategory(null);
//       setShowChildSubcategory(false);
//       if (filters.subcategories.length > 0) {
//         setFilters(prev => ({ ...prev, subcategories: [] }));
//       }
//       if (filters.childSubcategories.length > 0) {
//         setFilters(prev => ({ ...prev, childSubcategories: [] }));
//       }
//     }
//   }, [filters.categories]);

//   useEffect(() => {
//     if (filters.subcategories.length === 1 && selectedCategory) {
//       const subcategoryId = filters.subcategories[0];
//       setSelectedSubcategory(subcategoryId);
//       fetchChildSubcategories(selectedCategory, subcategoryId);
//     } else {
//       setChildSubcategories([]);
//       setSelectedSubcategory(null);
//       setShowChildSubcategory(false);
//       if (filters.childSubcategories.length > 0) {
//         setFilters(prev => ({ ...prev, childSubcategories: [] }));
//       }
//     }
//   }, [filters.subcategories, selectedCategory]);

//   useEffect(() => {
//     if (initialCategorySet) {
//       fetchProducts();
//     }
//   }, [filters, currentPage, initialCategorySet]);

//   useEffect(() => {
//     if (!loading) restoreScrollPosition();
//   }, [loading]);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/categories');
//       const data = await response.json();
//       if (data.success) {
//         setCategories(data.data);
//       }
//       setCategoriesLoaded(true);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setCategoriesLoaded(true);
//     }
//   };

//   const fetchSubcategories = async (categoryId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`);
//       const data = await response.json();
//       if (data.success && Array.isArray(data.data.subcategories)) {
//         setSubcategories(data.data.subcategories);
//         return data.data.subcategories;
//       } else {
//         setSubcategories([]);
//         return [];
//       }
//     } catch (error) {
//       console.error('Error fetching subcategories:', error);
//       setSubcategories([]);
//       return [];
//     }
//   };

//   const fetchChildSubcategories = async (categoryId, subcategoryId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`);
//       const data = await response.json();
//       if (data.success && Array.isArray(data.data.children)) {
//         setChildSubcategories(data.data.children);
//         setShowChildSubcategory(data.data.children.length > 0);
//         return data.data.children;
//       } else {
//         setChildSubcategories([]);
//         setShowChildSubcategory(false);
//         return [];
//       }
//     } catch (error) {
//       console.error('Error fetching child subcategories:', error);
//       setChildSubcategories([]);
//       setShowChildSubcategory(false);
//       return [];
//     }
//   };

//   const handleCategoryChange = (categoryId) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newCategories = prev.categories.includes(categoryId)
//         ? prev.categories.filter(id => id !== categoryId)
//         : [...prev.categories, categoryId];
//       return { ...prev, categories: newCategories, subcategories: [], childSubcategories: [] };
//     });
//     setCurrentPage(1);
    
//     if (typeof window !== 'undefined') {
//       const isSelected = !filters.categories.includes(categoryId);
//       const newCategory = isSelected ? categoryId : null;
      
//       if (newCategory) {
//         const params = new URLSearchParams(window.location.search);
//         params.set('category', newCategory);
//         const newUrl = `${window.location.pathname}?${params.toString()}`;
//         window.history.pushState({}, '', newUrl);
//       } else {
//         const params = new URLSearchParams(window.location.search);
//         params.delete('category');
//         const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
//         window.history.pushState({}, '', newUrl);
//       }
      
//       window.dispatchEvent(new CustomEvent('categoryFilterChanged', { 
//         detail: { categoryId: newCategory }
//       }));
//     }
//   };

//   const handleRemoveCategory = (categoryId) => {
//     saveScrollPosition();
//     setFilters(prev => ({
//       ...prev,
//       categories: prev.categories.filter(id => id !== categoryId),
//       subcategories: [],
//       childSubcategories: []
//     }));
//     setCurrentPage(1);
    
//     if (typeof window !== 'undefined') {
//       const params = new URLSearchParams(window.location.search);
//       params.delete('category');
//       const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
//       window.history.pushState({}, '', newUrl);
      
//       window.dispatchEvent(new CustomEvent('categoryFilterChanged', { 
//         detail: { categoryId: null }
//       }));
//     }
//   };

//   const handleSubcategoryChange = (subcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newSubcategories = prev.subcategories.includes(subcategoryId)
//         ? prev.subcategories.filter(id => id !== subcategoryId)
//         : [...prev.subcategories, subcategoryId];
//       return { ...prev, subcategories: newSubcategories, childSubcategories: [] };
//     });
//     setCurrentPage(1);
//   };

//   const handleRemoveSubcategory = (subcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => ({
//       ...prev,
//       subcategories: prev.subcategories.filter(id => id !== subcategoryId),
//       childSubcategories: []
//     }));
//     setCurrentPage(1);
//   };

//   const handleChildSubcategoryChange = (childSubcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newChildSubcategories = prev.childSubcategories.includes(childSubcategoryId)
//         ? prev.childSubcategories.filter(id => id !== childSubcategoryId)
//         : [...prev.childSubcategories, childSubcategoryId];
//       return { ...prev, childSubcategories: newChildSubcategories };
//     });
//     setCurrentPage(1);
//   };

//   const handleRemoveChildSubcategory = (childSubcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => ({
//       ...prev,
//       childSubcategories: prev.childSubcategories.filter(id => id !== childSubcategoryId)
//     }));
//     setCurrentPage(1);
//   };

//   const handleAgeGroupChange = (ageGroup) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newAgeGroups = prev.ageGroups.includes(ageGroup)
//         ? prev.ageGroups.filter(a => a !== ageGroup)
//         : [...prev.ageGroups, ageGroup];
//       return { ...prev, ageGroups: newAgeGroups };
//     });
//     setCurrentPage(1);
//   };

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const queryParams = new URLSearchParams();
//       queryParams.append('page', currentPage);
//       queryParams.append('limit', 12);
      
//       if (filters.search) queryParams.append('search', filters.search);
      
//       if (filters.categories.length > 0) {
//         filters.categories.forEach(cat => queryParams.append('category', cat));
//       }

//       if (filters.subcategories.length > 0) {
//         filters.subcategories.forEach(sub => queryParams.append('subcategory', sub));
//       }

//       if (filters.childSubcategories.length > 0) {
//         filters.childSubcategories.forEach(child => queryParams.append('childSubcategory', child));
//       }
      
//       if (filters.ageGroups.length > 0) {
//         filters.ageGroups.forEach(age => queryParams.append('ageGroup', age));
//       }
      
//       if (filters.priceRange.min) queryParams.append('minPrice', filters.priceRange.min);
//       if (filters.priceRange.max) queryParams.append('maxPrice', filters.priceRange.max);
      
//       let sortParam = '-createdAt';
//       switch (filters.sortBy) {
//         case 'price_low': sortParam = 'price_asc'; break;
//         case 'price_high': sortParam = 'price_desc'; break;
//         case 'name_asc': sortParam = 'name_asc'; break;
//         default: sortParam = 'newest';
//       }
//       queryParams.append('sort', sortParam);

//     const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setProducts(data.data || []);
//         setTotalPages(data.pagination?.pages || 1);
//         setTotalProducts(data.pagination?.total || 0);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (filterType, value) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, [filterType]: value }));
//     setCurrentPage(1);
//   };

//   const applyPriceRange = () => {
//     saveScrollPosition();
//     setFilters(prev => ({
//       ...prev,
//       priceRange: { min: minPriceInput || '', max: maxPriceInput || '' }
//     }));
//     setCurrentPage(1);
//   };

//   const clearPriceRange = () => {
//     saveScrollPosition();
//     setMinPriceInput('');
//     setMaxPriceInput('');
//     setFilters(prev => ({ ...prev, priceRange: { min: '', max: '' } }));
//   };

//   const clearFilters = () => {
//     saveScrollPosition();
//     setSearchInput('');
//     setFilters({
//       search: '',
//       categories: [],
//       subcategories: [],
//       childSubcategories: [],
//       ageGroups: [],
//       priceRange: { min: '', max: '' },
//       sortBy: 'newest'
//     });
//     setMinPriceInput('');
//     setMaxPriceInput('');
//     setCurrentPage(1);
    
//     if (typeof window !== 'undefined') {
//       window.history.pushState({}, '', window.location.pathname);
//       window.dispatchEvent(new CustomEvent('categoryFilterChanged', { 
//         detail: { categoryId: null }
//       }));
//     }
//   };

//   const handlePageChange = (newPage) => {
//     saveScrollPosition();
//     setCurrentPage(newPage);
//   };

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
//   };

//   const getActiveFilterCount = () => {
//     let count = 0;
//     if (filters.search) count += 1;
//     if (filters.categories.length > 0) count += filters.categories.length;
//     if (filters.subcategories.length > 0) count += filters.subcategories.length;
//     if (filters.childSubcategories.length > 0) count += filters.childSubcategories.length;
//     if (filters.ageGroups.length > 0) count += filters.ageGroups.length;
//     if (filters.priceRange.min || filters.priceRange.max) count += 1;
//     return count;
//   };

//   useEffect(() => {
//     return () => {
//       if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
//     };
//   }, []);

//   return (
//     <>
//       <LoadingBar isVisible={loading} />
//       <Navbar />
      
//       {/* Hero Banner Section */}
//       <div className="bg-[#FFF9F0]">
//         <div className="container mx-auto px-4 max-w-7xl py-4 md:py-8">
//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4A8A90] text-center mb-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//             Our Toy Collection
//           </h1>
//           <p className="text-[#4A8A90]/90 text-center text-sm md:text-base">
//             Discover magical toys that spark imagination and joy
//           </p>
//         </div>
//       </div>

//       <div className="min-h-screen bg-[#FFF9F0]">
//         <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
//           {/* Filter and Sort Bar */}
//           <div className="mb-6">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setShowMobileFilters(true)}
//                   className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#FFE0E6] rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium text-[#2D3A5C]"
//                 >
//                   <SlidersHorizontal className="w-4 h-4" />
//                   <span>Filters</span>
//                   {getActiveFilterCount() > 0 && (
//                     <span className="ml-1 px-1.5 py-0.5 bg-[#4A8A90] text-white text-xs rounded-full">
//                       {getActiveFilterCount()}
//                     </span>
//                   )}
//                 </button>

//                 <select
//                   value={filters.sortBy}
//                   onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//                   className="px-4 py-2 text-sm border-2 border-[#FFE0E6] bg-white rounded-xl focus:ring-2 focus:ring-[#4A8A90]/20 focus:border-[#4A8A90] outline-none transition shadow-sm"
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="price_low">Price: Low to High</option>
//                   <option value="price_high">Price: High to Low</option>
//                   <option value="name_asc">Name: A to Z</option>
//                 </select>

//                 <div className="hidden md:flex items-center gap-1 bg-white border-2 border-[#FFE0E6] rounded-xl p-1 shadow-sm">
//                   <button 
//                     onClick={() => setViewMode('grid')} 
//                     className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white shadow-md' : 'text-[#8B9DC3] hover:bg-gray-100'}`} 
//                     title="Grid View"
//                   >
//                     <Grid className="w-4 h-4" />
//                   </button>
//                   <button 
//                     onClick={() => setViewMode('list')} 
//                     className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white shadow-md' : 'text-[#8B9DC3] hover:bg-gray-100'}`} 
//                     title="List View"
//                   >
//                     <List className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
              
//               {/* Search Bar */}
//               <div className="relative w-full md:w-80">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B9DC3]" />
//                 <input
//                   type="text"
//                   placeholder="Search toys..."
//                   value={searchInput}
//                   onChange={handleSearchChange}
//                   className="w-full pl-10 pr-4 py-2 text-sm border-2 border-[#FFE0E6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent bg-white"
//                 />
//                 {searchInput && (
//                   <button onClick={handleClearSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
//                     <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Active Filters Display */}
//             {getActiveFilterCount() > 0 && (
//               <div className="mt-4 flex items-center gap-2 flex-wrap">
//                 {filters.search && (
//                   <div className="flex items-center gap-1 px-3 py-1.5 bg-[#FFF9F0] text-[#4A8A90] text-xs font-medium rounded-full border border-[#FFE0E6]">
//                     <span>🔍 "{filters.search}"</span>
//                     <button onClick={handleClearSearch} className="ml-1 hover:text-[#FFB6C1]"><X className="w-3 h-3" /></button>
//                   </div>
//                 )}
//                 {filters.categories.map(catId => {
//                   const category = categories.find(c => c._id === catId);
//                   return category ? (
//                     <div key={catId} className="flex items-center gap-1 px-3 py-1.5 bg-[#FFF9F0] text-[#4A8A90] text-xs font-medium rounded-full border border-[#FFE0E6]">
//                       <Tag className="w-3 h-3" />
//                       <span>{category.name}</span>
//                       <button onClick={() => handleRemoveCategory(catId)} className="ml-1 hover:text-[#FFB6C1]"><X className="w-3 h-3" /></button>
//                     </div>
//                   ) : null;
//                 })}
//                 {filters.subcategories.map(subId => {
//                   const subcategory = subcategories.find(s => s._id === subId);
//                   return subcategory ? (
//                     <div key={subId} className="flex items-center gap-1 px-3 py-1.5 bg-[#FFF9F0] text-[#4A8A90] text-xs font-medium rounded-full border border-[#FFE0E6]">
//                       <FolderTree className="w-3 h-3" />
//                       <span>{subcategory.name}</span>
//                       <button onClick={() => handleRemoveSubcategory(subId)} className="ml-1 hover:text-[#FFB6C1]"><X className="w-3 h-3" /></button>
//                     </div>
//                   ) : null;
//                 })}
//                 {filters.childSubcategories.map(childId => {
//                   const child = childSubcategories.find(c => c._id === childId);
//                   return child ? (
//                     <div key={childId} className="flex items-center gap-1 px-3 py-1.5 bg-[#FFF9F0] text-[#4A8A90] text-xs font-medium rounded-full border border-[#FFE0E6]">
//                       <FolderTree className="w-3 h-3" />
//                       <span>{child.name}</span>
//                       <button onClick={() => handleRemoveChildSubcategory(childId)} className="ml-1 hover:text-[#FFB6C1]"><X className="w-3 h-3" /></button>
//                     </div>
//                   ) : null;
//                 })}
//                 {filters.ageGroups.map(age => (
//                   <div key={age} className="flex items-center gap-1 px-3 py-1.5 bg-[#FFF9F0] text-[#4A8A90] text-xs font-medium rounded-full border border-[#FFE0E6]">
//                     <Users className="w-3 h-3" />
//                     <span>Ages {age}</span>
//                     <button onClick={() => handleAgeGroupChange(age)} className="ml-1 hover:text-[#FFB6C1]"><X className="w-3 h-3" /></button>
//                   </div>
//                 ))}
//                 {(filters.priceRange.min || filters.priceRange.max) && (
//                   <div className="flex items-center gap-1 px-3 py-1.5 bg-[#FFF9F0] text-[#4A8A90] text-xs font-medium rounded-full border border-[#FFE0E6]">
//                     <DollarSign className="w-3 h-3" />
//                     <span>৳{filters.priceRange.min || '0'} - ৳{filters.priceRange.max || '∞'}</span>
//                     <button onClick={clearPriceRange} className="ml-1 hover:text-[#FFB6C1]"><X className="w-3 h-3" /></button>
//                   </div>
//                 )}
//                 {getActiveFilterCount() > 0 && (
//                   <button onClick={clearFilters} className="px-3 py-1.5 text-xs text-[#8B9DC3] hover:text-[#4A8A90] font-medium">
//                     Clear All
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Main Content */}
//           <div className="flex flex-col md:flex-row gap-6">
//             {/* Desktop Filters */}
//             <div className="hidden md:block md:w-80 flex-shrink-0">
//               <FilterSidebar 
//                 expandedSections={expandedSections}
//                 toggleSection={toggleSection}
//                 categories={categories}
//                 subcategories={subcategories}
//                 childSubcategories={childSubcategories}
//                 filters={filters}
//                 handleCategoryChange={handleCategoryChange}
//                 handleRemoveCategory={handleRemoveCategory}
//                 handleSubcategoryChange={handleSubcategoryChange}
//                 handleRemoveSubcategory={handleRemoveSubcategory}
//                 handleChildSubcategoryChange={handleChildSubcategoryChange}
//                 handleRemoveChildSubcategory={handleRemoveChildSubcategory}
//                 handleTargetedCustomerChange={handleAgeGroupChange}
//                 minPriceInput={minPriceInput}
//                 maxPriceInput={maxPriceInput}
//                 setMinPriceInput={setMinPriceInput}
//                 setMaxPriceInput={setMaxPriceInput}
//                 applyPriceRange={applyPriceRange}
//                 clearPriceRange={clearPriceRange}
//                 getActiveFilterCount={getActiveFilterCount}
//                 clearFilters={clearFilters}
//                 selectedCategory={selectedCategory}
//                 selectedSubcategory={selectedSubcategory}
//                 showChildSubcategory={showChildSubcategory}
//               />
//             </div>

//             {/* Products Grid/List */}
//             <div className="flex-1" ref={productsContainerRef}>
//               {loading ? (
//                 <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {[...Array(12)].map((_, index) => (
//                     <div key={index} className="bg-white rounded-2xl border-2 border-[#FFE0E6] overflow-hidden animate-pulse shadow-md">
//                       <div className="h-48 bg-gray-200"></div>
//                       <div className="p-4">
//                         <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
//                         <div className="h-6 bg-gray-200 rounded mb-2 w-1/2"></div>
//                         <div className="h-3 bg-gray-200 rounded mb-2"></div>
//                         <div className="h-3 bg-gray-200 rounded w-1/3"></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <>
//                   {products.length === 0 ? (
//                     <div className="text-center py-16 bg-white rounded-2xl border-2 border-[#FFE0E6] shadow-md">
//                       <Gift className="w-16 h-16 text-[#FFB6C1] mx-auto mb-4" />
//                       <p className="text-gray-500 mb-4">No toys found matching your criteria</p>
//                       <button onClick={clearFilters} className="px-6 py-2.5 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white font-bold rounded-full hover:from-[#3A7A80] hover:to-[#5B9399] transition-all shadow-md">
//                         Clear All Filters
//                       </button>
//                     </div>
//                   ) : (
//                     <>
//                       {/* Results count */}
//                       <div className="mb-4 text-sm text-[#8B9DC3]">
//                         Found {totalProducts} toy{totalProducts !== 1 ? 's' : ''}
//                       </div>
                      
//                       {viewMode === 'grid' ? (
//                         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
//                           {products.map(product => <ProductGridCard key={product._id} product={product} />)}
//                         </div>
//                       ) : (
//                         <div className="space-y-4">
//                           {products.map(product => <ProductListCard key={product._id} product={product} />)}
//                         </div>
//                       )}

//                       {/* Pagination */}
//                       {totalPages > 1 && (
//                         <div className="flex justify-center items-center gap-2 mt-8">
//                           <button 
//                             onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} 
//                             disabled={currentPage === 1} 
//                             className="p-2 border-2 border-[#FFE0E6] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white rounded-xl shadow-sm"
//                           >
//                             <ChevronLeft className="w-4 h-4" />
//                           </button>
//                           {[...Array(totalPages)].map((_, i) => {
//                             const pageNum = i + 1;
//                             if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
//                               return (
//                                 <button 
//                                   key={i} 
//                                   onClick={() => handlePageChange(pageNum)} 
//                                   className={`w-9 h-9 rounded-xl text-sm font-bold transition-all shadow-sm ${currentPage === pageNum ? 'bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white shadow-md' : 'bg-white border-2 border-[#FFE0E6] text-[#2D3A5C] hover:bg-gray-50'}`}
//                                 >
//                                   {pageNum}
//                                 </button>
//                               );
//                             } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
//                               return <span key={i} className="text-sm text-[#8B9DC3]">...</span>;
//                             }
//                             return null;
//                           })}
//                           <button 
//                             onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} 
//                             disabled={currentPage === totalPages} 
//                             className="p-2 border-2 border-[#FFE0E6] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white rounded-xl shadow-sm"
//                           >
//                             <ChevronRight className="w-4 h-4" />
//                           </button>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Filters Modal */}
//       {showMobileFilters && (
//         <div className="fixed inset-0 z-50 md:hidden">
//           <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
//           <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto rounded-l-2xl shadow-2xl">
//             <div className="sticky top-0 bg-white p-4 border-b-2 border-[#FFE0E6] flex items-center justify-between">
//               <h3 className="text-lg font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>Filters</h3>
//               <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-gray-100 rounded-full">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="p-4">
//               <FilterSidebar 
//                 expandedSections={expandedSections}
//                 toggleSection={toggleSection}
//                 categories={categories}
//                 subcategories={subcategories}
//                 childSubcategories={childSubcategories}
//                 filters={filters}
//                 handleCategoryChange={handleCategoryChange}
//                 handleRemoveCategory={handleRemoveCategory}
//                 handleSubcategoryChange={handleSubcategoryChange}
//                 handleRemoveSubcategory={handleRemoveSubcategory}
//                 handleChildSubcategoryChange={handleChildSubcategoryChange}
//                 handleRemoveChildSubcategory={handleRemoveChildSubcategory}
//                 handleTargetedCustomerChange={handleAgeGroupChange}
//                 minPriceInput={minPriceInput}
//                 maxPriceInput={maxPriceInput}
//                 setMinPriceInput={setMinPriceInput}
//                 setMaxPriceInput={setMaxPriceInput}
//                 applyPriceRange={applyPriceRange}
//                 clearPriceRange={clearPriceRange}
//                 getActiveFilterCount={getActiveFilterCount}
//                 clearFilters={clearFilters}
//                 selectedCategory={selectedCategory}
//                 selectedSubcategory={selectedSubcategory}
//                 showChildSubcategory={showChildSubcategory}
//               />
//             </div>
//             <div className="sticky bottom-0 bg-white p-4 border-t-2 border-[#FFE0E6]">
//               <button onClick={() => setShowMobileFilters(false)} className="w-full py-3 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white font-bold rounded-xl hover:from-[#3A7A80] hover:to-[#5B9399] transition-all shadow-md">
//                 Apply Filters
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//       <WhatsAppButton />

//       <style jsx>{`
//         @keyframes loading-bar {
//           0% { transform: translateX(-100%); }
//           50% { transform: translateX(0); }
//           100% { transform: translateX(100%); }
//         }
//         .animate-loading-bar {
//           animation: loading-bar 1.5s ease-in-out infinite;
//         }
//       `}</style>
//     </>
//   );
// }



'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Link from 'next/link';
import { 
  Search, 
  Grid, 
  List, 
  SlidersHorizontal, 
  X, 
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Tag,
  Users,
  DollarSign,
  Sparkles,
  Eye, 
  ShoppingCart,
  ArrowLeft,
  Package,
  TrendingUp,
  Palette,
  Ruler,
  FolderTree,
  Gift,
  Heart,
  Truck,
  Star,
  Clock,
  Zap
} from 'lucide-react';
import WhatsAppButton from '../components/layout/WhatsAppButton';
import { toast } from 'sonner';

// Toy Theme Colors
const TOY_COLORS = {
  primary: '#4A8A90',
  secondary: '#FFB6C1',
  accent: '#FFD93D',
  neutral: '#FFFFFF',
  lightBg: '#FFF9F0',
  border: '#FFE0E6',
  text: '#2D3A5C',
  textLight: '#8B9DC3',
  textMuted: '#B8C5E0'
};

// Loading Bar Component
const LoadingBar = ({ isVisible }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-1 bg-[#FFB6C1] z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="h-full bg-[#4A8A90] animate-loading-bar" style={{ width: '100%' }}></div>
    </div>
  );
};

// Helper functions
const getUnitLabel = (orderUnit) => {
  switch(orderUnit) {
    case 'kg': return 'kg';
    case 'ton': return 'MT';
    default: return 'pcs';
  }
};

const formatBulkRange = (range, unitLabel = 'pcs') => {
  if (!range) return '';
  if (range.includes('-')) {
    const [min, max] = range.split('-');
    return `${min}+ ${unitLabel}`;
  }
  if (range.includes('+')) {
    return `${range.replace('+', '')}+ ${unitLabel}`;
  }
  return range;
};

const formatPrice = (price) => {
  return price?.toFixed(2) || '0.00';
};

const truncateText = (text, limit = 25) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
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

const getAgeGroupBadge = (ageGroup) => {
  const styles = {
    '0-2': 'bg-pink-100 text-pink-600',
    '3-5': 'bg-blue-100 text-blue-600',
    '6-10': 'bg-green-100 text-green-600',
    '11-14': 'bg-purple-100 text-purple-600',
  };
  return styles[ageGroup] || 'bg-gray-100 text-gray-600';
};

// Product Grid Card - Toy Theme
const ProductGridCard = ({ product, router, isInCart: propIsInCart }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  
  const isInCart = propIsInCart || false;
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

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const addToCart = async (e) => {
    e.stopPropagation();
    
    if (isInCart) {
      toast.info('Product already in cart!', {
        description: 'View your cart to proceed with checkout.'
      });
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

  const viewCart = (e) => {
    e.stopPropagation();
    router.push('/cart');
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
      className="group bg-white rounded-2xl border-2 border-[#FFE0E6] hover:border-[#FFB6C1] transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl overflow-hidden"
      onClick={() => {
        if (isMobile) {
          window.location.href = `/productDetails?id=${product._id}`;
        } else {
          window.open(`/productDetails?id=${product._id}`, '_blank');
        }
      }}
    >
      {/* Image Container */}
      <div className="relative w-full h-48 sm:h-52 md:h-56 overflow-hidden bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6]">
        <motion.img
          src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/300'}
          alt={product.productName}
          className="w-full h-full object-contain p-4"
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
          <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-20 flex items-center gap-1">
            <Zap className="w-3 h-3" />
            {discountPercent}% OFF
          </div>
        )}
        
        {/* Tag Badge - Top Right */}
        {primaryTag && (
          <motion.div 
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`absolute top-2 right-2 ${tagStyle} text-[8px] md:text-[9px] px-2 py-1 font-semibold rounded-full z-20 flex items-center gap-1 shadow-lg`}
          >
            <Sparkles className="w-2.5 h-2.5" />
            <span className="truncate">{primaryTag}</span>
          </motion.div>
        )}
        
        {/* Hover Icons - View, Cart, Wishlist */}
        <motion.div 
          className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered && !isMobile ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: isHovered && !isMobile ? 1 : 0, y: isHovered && !isMobile ? 0 : 20 }}
            transition={{ delay: 0.05 }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(`/productDetails?id=${product._id}`, '_blank');
            }}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center cursor-pointer shadow-lg transition-all hover:scale-110"
          >
            <Eye className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#4A8A90]" />
          </motion.div>
          
          <motion.div
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: isHovered && !isMobile ? 1 : 0, y: isHovered && !isMobile ? 0 : 20 }}
            transition={{ delay: 0.1 }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(`/productDetails?id=${product._id}#inquiry-form`, '_blank');
            }}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center cursor-pointer shadow-lg transition-all hover:scale-110"
          >
            <ShoppingCart className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#FFB6C1]" />
          </motion.div>
          
          <motion.div
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: isHovered && !isMobile ? 1 : 0, y: isHovered && !isMobile ? 0 : 20 }}
            transition={{ delay: 0.15 }}
            onClick={handleWishlist}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center cursor-pointer shadow-lg transition-all hover:scale-110"
          >
            <Heart className={`w-4 h-4 md:w-4.5 md:h-4.5 ${isWishlisted ? 'fill-[#FFB6C1] text-[#FFB6C1]' : 'text-[#4A8A90]'}`} />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Thumbnail Images */}
      {hasMultipleImages && (
        <div className="flex justify-center items-center gap-1.5 py-2 bg-[#FFF9F0]">
          {productImages.slice(0, 4).map((image, index) => (
            <button
              key={index}
              className={`w-6 h-6 md:w-7 md:h-7 overflow-hidden rounded-md transition-all duration-200 ${
                activeIndex === index 
                  ? 'ring-2 ring-[#4A8A90] ring-offset-1' 
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
      <div className="p-3 md:p-4">
        {/* Product Name */}
        <h3 className="text-sm md:text-base font-bold text-[#2D3A5C] line-clamp-2 hover:text-[#4A8A90] transition-colors mb-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }} title={product.productName}>
          {truncateText(product.productName, 25)}
        </h3>
        
        {/* Age Group and Rating Row */}
        <div className="flex items-center justify-between mb-2">
          {product.ageGroup && (
            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${getAgeGroupBadge(product.ageGroup)}`}>
              <Users className="w-2.5 h-2.5" />
              Ages {product.ageGroup} years
            </div>
          )}
          
          {/* Rating Stars */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${
                      star <= Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : star - 0.5 <= product.rating
                        ? 'fill-yellow-400 text-yellow-400 opacity-50'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-gray-500">({product.rating})</span>
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg md:text-xl font-bold text-[#4A8A90]">
            ৳{formatPrice(currentPrice)}
          </span>
          {discountPercent > 0 && (
            <>
              <span className="text-xs text-gray-400 line-through">
                ৳{formatPrice(originalPrice)}
              </span>
              <span className="text-xs font-semibold text-red-500 bg-red-100 px-1.5 py-0.5 rounded-full">
                Save {discountPercent}%
              </span>
            </>
          )}
        </div>

        {/* Category and Stock Status Row */}
        <div className="flex items-center justify-between gap-2">
          {product.category?.name && (
            <div className="flex items-center gap-1 text-[10px] text-[#8B9DC3]">
              <Package className="w-3 h-3" />
              <span className="truncate">{product.category.name}</span>
            </div>
          )}
          
          {/* Stock Status */}
          <div className="flex-shrink-0">
            {product.stockQuantity > 0 ? (
              <span className="flex items-center gap-1 text-[10px] text-green-600">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span>In Stock ({product.stockQuantity})</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-red-500">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                <span>Out of Stock</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Add to Cart / View Cart Button */}
      {cartStatusLoading ? (
        <button
          disabled
          className="w-full py-2.5 md:py-3 text-center text-xs md:text-sm font-bold bg-gray-300 text-gray-500 rounded-xl flex items-center justify-center gap-2"
        >
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Loading...
        </button>
      ) : isInCart ? (
        <button
          onClick={viewCart}
          className="w-full py-2.5 md:py-3 text-center text-xs md:text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 rounded-xl shadow-md"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          View in Cart
        </button>
      ) : (
        <button
          onClick={addToCart}
          className="w-full py-2.5 md:py-3 text-center text-xs md:text-sm font-bold bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white hover:from-[#3A7A80] hover:to-[#5B9399] transition-all flex items-center justify-center gap-2 rounded-xl shadow-md"
        >
          <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
          Add to Cart
        </button>
      )}
    </motion.div>
  );
};

// Product List Card - Toy Theme
const ProductListCard = ({ product, router, isInCart: propIsInCart }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  
  const isInCart = propIsInCart || false;
  const productImages = product.images || [];
  const hasMultipleImages = productImages.length > 1;
  const primaryTag = product.tags?.[0];
  const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
  const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
  const originalPrice = product.regularPrice;

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const addToCart = async (e) => {
    e.stopPropagation();
    
    if (isInCart) {
      toast.info('Product already in cart!', {
        description: 'View your cart to proceed with checkout.'
      });
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

  const viewCart = (e) => {
    e.stopPropagation();
    router.push('/cart');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-2xl border-2 border-[#FFE0E6] hover:border-[#FFB6C1] transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl overflow-hidden"
      onClick={() => window.open(`/productDetails?id=${product._id}`, '_blank')}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-64 lg:w-72 relative">
          <div className="relative h-52 md:h-56 overflow-hidden bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6]">
            <motion.img
              src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/300'}
              alt={product.productName}
              className="w-full h-full object-contain p-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300?text=Toy';
              }}
              loading="lazy"
            />
            
            {/* Discount Badge */}
            {discountPercent > 0 && (
              <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-20 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                {discountPercent}% OFF
              </div>
            )}
            
            {/* Tag Badge */}
            {primaryTag && (
              <span className={`absolute top-2 right-2 ${getTagStyles(primaryTag)} text-white text-[9px] px-2 py-1 font-semibold rounded-full z-20 flex items-center gap-1 shadow-lg`}>
                <Sparkles className="w-2.5 h-2.5" />
                {primaryTag}
              </span>
            )}
            
            {/* Hover Icons */}
            <motion.div 
              className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                transition={{ delay: 0.05 }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`/productDetails?id=${product._id}`, '_blank');
                }}
                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center cursor-pointer shadow-lg"
              >
                <Eye className="w-4.5 h-4.5 text-[#4A8A90]" />
              </motion.div>
              <motion.div
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                transition={{ delay: 0.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`/productDetails?id=${product._id}#inquiry-form`, '_blank');
                }}
                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center cursor-pointer shadow-lg"
              >
                <ShoppingCart className="w-4.5 h-4.5 text-[#FFB6C1]" />
              </motion.div>
              <motion.div
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                transition={{ delay: 0.15 }}
                onClick={handleWishlist}
                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center cursor-pointer shadow-lg"
              >
                <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-[#FFB6C1] text-[#FFB6C1]' : 'text-[#4A8A90]'}`} />
              </motion.div>
            </motion.div>
          </div>

          {/* Thumbnails */}
          {hasMultipleImages && (
            <div className="flex justify-center gap-1.5 py-2 bg-[#FFF9F0]">
              {productImages.slice(0, 4).map((image, idx) => (
                <div
                  key={idx}
                  className={`w-7 h-7 overflow-hidden rounded-md cursor-pointer transition-all ${
                    activeIndex === idx 
                      ? 'ring-2 ring-[#4A8A90] ring-offset-1' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(idx);
                  }}
                >
                  <img src={image.url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 md:p-5">
          {/* Age Group and Rating Row */}
          <div className="flex items-center justify-between mb-2">
            {product.ageGroup && (
              <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${getAgeGroupBadge(product.ageGroup)}`}>
                <Users className="w-2.5 h-2.5" />
                Ages {product.ageGroup} years
              </div>
            )}
            
            {/* Rating Stars */}
            {product.rating > 0 && (
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : star - 0.5 <= product.rating
                          ? 'fill-yellow-400 text-yellow-400 opacity-50'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-gray-500">({product.rating})</span>
              </div>
            )}
          </div>
          
          <h3 className="text-base md:text-lg font-bold text-[#2D3A5C] mb-2 hover:text-[#4A8A90] transition-colors" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
            {product.productName}
          </h3>
          
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl md:text-2xl font-bold text-[#4A8A90]">
              ৳{formatPrice(currentPrice)}
            </span>
            {discountPercent > 0 && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ৳{formatPrice(originalPrice)}
                </span>
                <span className="text-xs font-semibold text-red-500 bg-red-100 px-2 py-0.5 rounded-full">
                  Save {discountPercent}%
                </span>
              </>
            )}
          </div>
          
          {/* Description */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {product.fullDescription?.replace(/<[^>]*>/g, '') || product.shortDescription?.replace(/<[^>]*>/g, '') || 'No description available'}
          </p>

          {/* Additional Info */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {product.category?.name && (
              <div className="flex items-center gap-1 text-[10px] bg-[#FFF9F0] px-2 py-1 rounded-full text-[#8B9DC3]">
                <Package className="w-3 h-3" />
                {product.category.name}
              </div>
            )}
            {product.brand && (
              <div className="flex items-center gap-1 text-[10px] bg-[#FFF9F0] px-2 py-1 rounded-full text-[#8B9DC3]">
                <Tag className="w-3 h-3" />
                {product.brand}
              </div>
            )}
            {!product.ageGroup && product.rating > 0 && (
              <div className="flex items-center gap-1 text-[10px] bg-[#FFF9F0] px-2 py-1 rounded-full">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-2.5 h-2.5 ${
                        star <= Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.rating})</span>
              </div>
            )}
            <div className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-full ${product.stockQuantity > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
              {product.stockQuantity > 0 ? (
                <>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  In Stock
                </>
              ) : (
                <>
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Out of Stock
                </>
              )}
            </div>
          </div>

          {/* Add to Cart / View Cart Button */}
          <div className="mt-3">
            {cartStatusLoading ? (
              <button
                disabled
                className="px-5 py-2.5 bg-gray-300 text-gray-500 text-sm font-bold rounded-full flex items-center justify-center gap-2 w-full md:w-auto"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </button>
            ) : isInCart ? (
              <button
                onClick={viewCart}
                className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold rounded-full hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 w-full md:w-auto shadow-md"
              >
                <ShoppingCart className="w-4 h-4" />
                View in Cart
              </button>
            ) : (
              <button
                onClick={addToCart}
                className="px-5 py-2.5 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white text-sm font-bold rounded-full hover:from-[#3A7A80] hover:to-[#5B9399] transition-all flex items-center justify-center gap-2 w-full md:w-auto shadow-md"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Filter Sidebar Component
const FilterSidebar = ({ 
  expandedSections, 
  toggleSection, 
  categories, 
  subcategories,
  childSubcategories,
  filters, 
  handleCategoryChange, 
  handleRemoveCategory,
  handleSubcategoryChange,
  handleRemoveSubcategory,
  handleChildSubcategoryChange,
  handleRemoveChildSubcategory,
  handleTargetedCustomerChange,
  minPriceInput,
  maxPriceInput,
  setMinPriceInput,
  setMaxPriceInput,
  applyPriceRange,
  clearPriceRange,
  getActiveFilterCount,
  clearFilters,
  selectedCategory,
  selectedSubcategory,
  showChildSubcategory
}) => (
  <div className="bg-white rounded-2xl border-2 border-[#FFE0E6] p-5 sticky top-24 shadow-md">
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-lg font-bold text-[#2D3A5C] flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
        <Filter className="w-5 h-5 text-[#4A8A90]" />
        Filters
      </h3>
      {getActiveFilterCount() > 0 && (
        <button
          onClick={clearFilters}
          className="text-xs text-[#4A8A90] hover:text-[#FFB6C1] font-medium"
        >
          Clear All ({getActiveFilterCount()})
        </button>
      )}
    </div>

    {/* Price Range */}
    <div className="mb-5 border-b border-[#FFE0E6] pb-5">
      <button
        onClick={() => toggleSection('price')}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <h4 className="font-bold text-[#2D3A5C] flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#4A8A90]" />
          Price Range
        </h4>
        {expandedSections.price ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      {expandedSections.price && (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#8B9DC3]">Min (৳)</span>
              <input
                type="text"
                inputMode="decimal"
                value={minPriceInput}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*\.?\d*$/.test(value)) {
                    setMinPriceInput(value);
                  }
                }}
                placeholder="0"
                className="w-28 px-2 py-1.5 text-right text-sm border-2 border-[#FFE0E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A8A90]"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#8B9DC3]">Max (৳)</span>
              <input
                type="text"
                inputMode="decimal"
                value={maxPriceInput}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*\.?\d*$/.test(value)) {
                    setMaxPriceInput(value);
                  }
                }}
                placeholder="Any"
                className="w-28 px-2 py-1.5 text-right text-sm border-2 border-[#FFE0E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A8A90]"
              />
            </div>
          </div>
          
          <button
            onClick={applyPriceRange}
            disabled={!minPriceInput && !maxPriceInput}
            className="w-full py-2 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white text-sm font-bold rounded-lg hover:from-[#3A7A80] hover:to-[#5B9399] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            Apply Price Range
          </button>

          {(filters.priceRange.min || filters.priceRange.max) && (
            <div className="flex items-center justify-between bg-[#FFF9F0] rounded-lg p-2 border border-[#FFE0E6]">
              <span className="text-sm font-medium text-[#4A8A90]">
                ৳{filters.priceRange.min || '0'} - ৳{filters.priceRange.max || '∞'}
              </span>
              <button onClick={clearPriceRange} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>

    {/* Categories */}
    <div className="mb-5 border-b border-[#FFE0E6] pb-5">
      <button
        onClick={() => toggleSection('categories')}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <h4 className="font-bold text-[#2D3A5C] flex items-center gap-2">
          <Tag className="w-4 h-4 text-[#4A8A90]" />
          Categories
        </h4>
        {expandedSections.categories ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      {expandedSections.categories && (
        <div className="space-y-2">
          {filters.categories.length > 0 && (
            <div className="mb-3 p-2 bg-[#FFF9F0] rounded-lg border border-[#FFE0E6]">
              <p className="text-xs text-[#8B9DC3] mb-2">Selected Categories:</p>
              {filters.categories.map(catId => {
                const category = categories.find(c => c._id === catId);
                return category ? (
                  <div key={catId} className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium text-[#2D3A5C]">{category.name}</span>
                    <button
                      onClick={() => handleRemoveCategory(catId)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          )}
          
          <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
            {categories.map(category => (
              <label key={category._id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category._id)}
                  onChange={() => handleCategoryChange(category._id)}
                  className="w-4 h-4 rounded border-gray-300 text-[#4A8A90] focus:ring-[#4A8A90]"
                />
                <span className="text-sm text-gray-700 group-hover:text-[#4A8A90] transition-colors flex-1">
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Subcategories Section */}
    {selectedCategory && subcategories.length > 0 && (
      <div className="mb-5 border-b border-[#FFE0E6] pb-5">
        <button
          onClick={() => toggleSection('subcategories')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h4 className="font-bold text-[#2D3A5C] flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-[#4A8A90]" />
            Subcategories
          </h4>
          {expandedSections.subcategories ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.subcategories && (
          <div className="space-y-2">
            {filters.subcategories.length > 0 && (
              <div className="mb-3 p-2 bg-[#FFF9F0] rounded-lg border border-[#FFE0E6]">
                <p className="text-xs text-[#8B9DC3] mb-2">Selected Subcategories:</p>
                {filters.subcategories.map(subId => {
                  const subcategory = subcategories.find(s => s._id === subId);
                  return subcategory ? (
                    <div key={subId} className="flex items-center justify-between py-1">
                      <span className="text-sm font-medium text-[#2D3A5C]">{subcategory.name}</span>
                      <button
                        onClick={() => handleRemoveSubcategory(subId)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            )}
            
            <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
              {subcategories.map(subcategory => (
                <label key={subcategory._id} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.subcategories.includes(subcategory._id)}
                    onChange={() => handleSubcategoryChange(subcategory._id)}
                    className="w-4 h-4 rounded border-gray-300 text-[#4A8A90] focus:ring-[#4A8A90]"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-[#4A8A90] transition-colors flex-1">
                    {subcategory.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    )}

    {/* Child Subcategories Section */}
    {showChildSubcategory && selectedSubcategory && childSubcategories.length > 0 && (
      <div className="mb-5 border-b border-[#FFE0E6] pb-5">
        <button
          onClick={() => toggleSection('childSubcategories')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h4 className="font-bold text-[#2D3A5C] flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-[#4A8A90]" />
            Child Subcategories
          </h4>
          {expandedSections.childSubcategories ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.childSubcategories && (
          <div className="space-y-2">
            {filters.childSubcategories.length > 0 && (
              <div className="mb-3 p-2 bg-[#FFF9F0] rounded-lg border border-[#FFE0E6]">
                <p className="text-xs text-[#8B9DC3] mb-2">Selected Child Subcategories:</p>
                {filters.childSubcategories.map(childId => {
                  const child = childSubcategories.find(c => c._id === childId);
                  return child ? (
                    <div key={childId} className="flex items-center justify-between py-1">
                      <span className="text-sm font-medium text-[#2D3A5C]">{child.name}</span>
                      <button
                        onClick={() => handleRemoveChildSubcategory(childId)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            )}
            
            <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
              {childSubcategories.map(child => (
                <label key={child._id} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.childSubcategories.includes(child._id)}
                    onChange={() => handleChildSubcategoryChange(child._id)}
                    className="w-4 h-4 rounded border-gray-300 text-[#4A8A90] focus:ring-[#4A8A90]"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-[#4A8A90] transition-colors flex-1">
                    {child.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    )}

    {/* Age Groups */}
    <div className="mb-2">
      <button
        onClick={() => toggleSection('ageGroup')}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <h4 className="font-bold text-[#2D3A5C] flex items-center gap-2">
          <Users className="w-4 h-4 text-[#4A8A90]" />
          Age Group
        </h4>
        {expandedSections.ageGroup ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      {expandedSections.ageGroup && (
        <div className="space-y-2">
          {[
            { value: '0-2', label: '0-2 years', icon: '👶' },
            { value: '3-5', label: '3-5 years', icon: '🧒' },
            { value: '6-10', label: '6-10 years', icon: '👧' },
            { value: '11-14', label: '11-14 years', icon: '🧑' }
          ].map(age => (
            <label key={age.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.ageGroups?.includes(age.value)}
                onChange={() => handleTargetedCustomerChange(age.value)}
                className="w-4 h-4 rounded border-gray-300 text-[#4A8A90] focus:ring-[#4A8A90]"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#4A8A90] transition-colors flex-1">
                {age.icon} {age.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  </div>
);

// ========== MAIN PRODUCTS CONTENT COMPONENT ==========
export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [childSubcategories, setChildSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [showChildSubcategory, setShowChildSubcategory] = useState(false);
  const [productsInCart, setProductsInCart] = useState({});
  
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    categories: true,
    subcategories: true,
    childSubcategories: true,
    ageGroup: true
  });

  const productsContainerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const searchTimerRef = useRef(null);

  const [filters, setFilters] = useState({
    search: '',
    categories: [],
    subcategories: [],
    childSubcategories: [],
    ageGroups: [],
    priceRange: { min: '', max: '' },
    sortBy: 'newest'
  });

  const [searchInput, setSearchInput] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');
  const [initialCategorySet, setInitialCategorySet] = useState(false);

  const saveScrollPosition = () => {
    scrollPositionRef.current = window.scrollY;
  };

  const restoreScrollPosition = () => {
    if (scrollPositionRef.current > 0) {
      window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
    }
  };

  const debouncedSearch = useCallback((searchValue) => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      saveScrollPosition();
      setFilters(prev => ({ ...prev, search: searchValue }));
      setCurrentPage(1);
    }, 500);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    saveScrollPosition();
    setFilters(prev => ({ ...prev, search: '' }));
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && !initialCategorySet) {
      const categoryParam = searchParams.get('category');
      const subcategoryParam = searchParams.get('subcategory');
      const childSubcategoryParam = searchParams.get('childSubcategory');
      
      if (categoryParam) {
        const categoryExists = categories.some(cat => cat._id === categoryParam);
        if (categoryExists) {
          setFilters(prev => ({ ...prev, categories: [categoryParam] }));
          
          if (subcategoryParam) {
            const loadSubcategoriesAndSetFilter = async () => {
              const subcats = await fetchSubcategories(categoryParam);
              if (subcats && Array.isArray(subcats)) {
                const subcategoryExists = subcats.some(sub => sub._id === subcategoryParam);
                if (subcategoryExists) {
                  setFilters(prev => ({ ...prev, subcategories: [subcategoryParam] }));
                  
                  if (childSubcategoryParam) {
                    const children = await fetchChildSubcategories(categoryParam, subcategoryParam);
                    if (children && Array.isArray(children)) {
                      const childExists = children.some(child => child._id === childSubcategoryParam);
                      if (childExists) {
                        setFilters(prev => ({ ...prev, childSubcategories: [childSubcategoryParam] }));
                      }
                    }
                  }
                }
              }
            };
            loadSubcategoriesAndSetFilter();
          }
        }
      }
      setInitialCategorySet(true);
    }
  }, [categories, searchParams, initialCategorySet]);

  useEffect(() => {
    if (filters.categories.length === 1) {
      const categoryId = filters.categories[0];
      setSelectedCategory(categoryId);
      fetchSubcategories(categoryId);
    } else {
      setSubcategories([]);
      setSelectedCategory(null);
      setChildSubcategories([]);
      setSelectedSubcategory(null);
      setShowChildSubcategory(false);
      if (filters.subcategories.length > 0) {
        setFilters(prev => ({ ...prev, subcategories: [] }));
      }
      if (filters.childSubcategories.length > 0) {
        setFilters(prev => ({ ...prev, childSubcategories: [] }));
      }
    }
  }, [filters.categories]);

  useEffect(() => {
    if (filters.subcategories.length === 1 && selectedCategory) {
      const subcategoryId = filters.subcategories[0];
      setSelectedSubcategory(subcategoryId);
      fetchChildSubcategories(selectedCategory, subcategoryId);
    } else {
      setChildSubcategories([]);
      setSelectedSubcategory(null);
      setShowChildSubcategory(false);
      if (filters.childSubcategories.length > 0) {
        setFilters(prev => ({ ...prev, childSubcategories: [] }));
      }
    }
  }, [filters.subcategories, selectedCategory]);

  useEffect(() => {
    if (initialCategorySet) {
      fetchProducts();
    }
  }, [filters, currentPage, initialCategorySet]);

  useEffect(() => {
    if (!loading) restoreScrollPosition();
  }, [loading]);

  // ========== ADD THIS useEffect - Check cart status for all products ==========
  useEffect(() => {
    const checkAllProductsCartStatus = async () => {
      if (products.length === 0) return;
      
      const productIds = products.map(p => p._id);
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      try {
        const response = await fetch('http://localhost:5000/api/cart/check-status', {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds })
        });
        
        const data = await response.json();
        if (data.success) {
          setProductsInCart(data.data);
        }
      } catch (error) {
        console.error('Error checking cart status:', error);
      }
    };
    
    checkAllProductsCartStatus();
  }, [products]);

  // ========== ADD THIS useEffect - Refresh cart status when cart updates ==========
  useEffect(() => {
    const refreshCartStatus = async () => {
      if (products.length === 0) return;
      
      const productIds = products.map(p => p._id);
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      try {
        const response = await fetch('http://localhost:5000/api/cart/check-status', {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds })
        });
        
        const data = await response.json();
        if (data.success) {
          setProductsInCart(data.data);
        }
      } catch (error) {
        console.error('Error refreshing cart status:', error);
      }
    };
    
    const handleCartUpdate = () => {
      refreshCartStatus();
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, [products]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
      setCategoriesLoaded(true);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategoriesLoaded(true);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data.subcategories)) {
        setSubcategories(data.data.subcategories);
        return data.data.subcategories;
      } else {
        setSubcategories([]);
        return [];
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setSubcategories([]);
      return [];
    }
  };

  const fetchChildSubcategories = async (categoryId, subcategoryId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data.children)) {
        setChildSubcategories(data.data.children);
        setShowChildSubcategory(data.data.children.length > 0);
        return data.data.children;
      } else {
        setChildSubcategories([]);
        setShowChildSubcategory(false);
        return [];
      }
    } catch (error) {
      console.error('Error fetching child subcategories:', error);
      setChildSubcategories([]);
      setShowChildSubcategory(false);
      return [];
    }
  };

  const handleCategoryChange = (categoryId) => {
    saveScrollPosition();
    setFilters(prev => {
      const newCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId];
      return { ...prev, categories: newCategories, subcategories: [], childSubcategories: [] };
    });
    setCurrentPage(1);
    
    if (typeof window !== 'undefined') {
      const isSelected = !filters.categories.includes(categoryId);
      const newCategory = isSelected ? categoryId : null;
      
      if (newCategory) {
        const params = new URLSearchParams(window.location.search);
        params.set('category', newCategory);
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, '', newUrl);
      } else {
        const params = new URLSearchParams(window.location.search);
        params.delete('category');
        const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
        window.history.pushState({}, '', newUrl);
      }
      
      window.dispatchEvent(new CustomEvent('categoryFilterChanged', { 
        detail: { categoryId: newCategory }
      }));
    }
  };

  const handleRemoveCategory = (categoryId) => {
    saveScrollPosition();
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.filter(id => id !== categoryId),
      subcategories: [],
      childSubcategories: []
    }));
    setCurrentPage(1);
    
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.delete('category');
      const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
      window.history.pushState({}, '', newUrl);
      
      window.dispatchEvent(new CustomEvent('categoryFilterChanged', { 
        detail: { categoryId: null }
      }));
    }
  };

  const handleSubcategoryChange = (subcategoryId) => {
    saveScrollPosition();
    setFilters(prev => {
      const newSubcategories = prev.subcategories.includes(subcategoryId)
        ? prev.subcategories.filter(id => id !== subcategoryId)
        : [...prev.subcategories, subcategoryId];
      return { ...prev, subcategories: newSubcategories, childSubcategories: [] };
    });
    setCurrentPage(1);
  };

  const handleRemoveSubcategory = (subcategoryId) => {
    saveScrollPosition();
    setFilters(prev => ({
      ...prev,
      subcategories: prev.subcategories.filter(id => id !== subcategoryId),
      childSubcategories: []
    }));
    setCurrentPage(1);
  };

  const handleChildSubcategoryChange = (childSubcategoryId) => {
    saveScrollPosition();
    setFilters(prev => {
      const newChildSubcategories = prev.childSubcategories.includes(childSubcategoryId)
        ? prev.childSubcategories.filter(id => id !== childSubcategoryId)
        : [...prev.childSubcategories, childSubcategoryId];
      return { ...prev, childSubcategories: newChildSubcategories };
    });
    setCurrentPage(1);
  };

  const handleRemoveChildSubcategory = (childSubcategoryId) => {
    saveScrollPosition();
    setFilters(prev => ({
      ...prev,
      childSubcategories: prev.childSubcategories.filter(id => id !== childSubcategoryId)
    }));
    setCurrentPage(1);
  };

  const handleAgeGroupChange = (ageGroup) => {
    saveScrollPosition();
    setFilters(prev => {
      const newAgeGroups = prev.ageGroups.includes(ageGroup)
        ? prev.ageGroups.filter(a => a !== ageGroup)
        : [...prev.ageGroups, ageGroup];
      return { ...prev, ageGroups: newAgeGroups };
    });
    setCurrentPage(1);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage);
      queryParams.append('limit', 12);
      
      if (filters.search) queryParams.append('search', filters.search);
      
      if (filters.categories.length > 0) {
        filters.categories.forEach(cat => queryParams.append('category', cat));
      }

      if (filters.subcategories.length > 0) {
        filters.subcategories.forEach(sub => queryParams.append('subcategory', sub));
      }

      if (filters.childSubcategories.length > 0) {
        filters.childSubcategories.forEach(child => queryParams.append('childSubcategory', child));
      }
      
      if (filters.ageGroups.length > 0) {
        filters.ageGroups.forEach(age => queryParams.append('ageGroup', age));
      }
      
      if (filters.priceRange.min) queryParams.append('minPrice', filters.priceRange.min);
      if (filters.priceRange.max) queryParams.append('maxPrice', filters.priceRange.max);
      
      let sortParam = '-createdAt';
      switch (filters.sortBy) {
        case 'price_low': sortParam = 'price_asc'; break;
        case 'price_high': sortParam = 'price_desc'; break;
        case 'name_asc': sortParam = 'name_asc'; break;
        default: sortParam = 'newest';
      }
      queryParams.append('sort', sortParam);

      const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalProducts(data.pagination?.total || 0);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const applyPriceRange = () => {
    saveScrollPosition();
    setFilters(prev => ({
      ...prev,
      priceRange: { min: minPriceInput || '', max: maxPriceInput || '' }
    }));
    setCurrentPage(1);
  };

  const clearPriceRange = () => {
    saveScrollPosition();
    setMinPriceInput('');
    setMaxPriceInput('');
    setFilters(prev => ({ ...prev, priceRange: { min: '', max: '' } }));
  };

  const clearFilters = () => {
    saveScrollPosition();
    setSearchInput('');
    setFilters({
      search: '',
      categories: [],
      subcategories: [],
      childSubcategories: [],
      ageGroups: [],
      priceRange: { min: '', max: '' },
      sortBy: 'newest'
    });
    setMinPriceInput('');
    setMaxPriceInput('');
    setCurrentPage(1);
    
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', window.location.pathname);
      window.dispatchEvent(new CustomEvent('categoryFilterChanged', { 
        detail: { categoryId: null }
      }));
    }
  };

  const handlePageChange = (newPage) => {
    saveScrollPosition();
    setCurrentPage(newPage);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count += 1;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.subcategories.length > 0) count += filters.subcategories.length;
    if (filters.childSubcategories.length > 0) count += filters.childSubcategories.length;
    if (filters.ageGroups.length > 0) count += filters.ageGroups.length;
    if (filters.priceRange.min || filters.priceRange.max) count += 1;
    return count;
  };

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, []);

  return (
    <>
      <LoadingBar isVisible={loading} />
      <Navbar />
      
      {/* Hero Banner Section */}
      <div className="bg-[#FFF9F0]">
        <div className="container mx-auto px-4 max-w-7xl py-4 md:py-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4A8A90] text-center mb-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
            Our Toy Collection
          </h1>
          <p className="text-[#4A8A90]/90 text-center text-sm md:text-base">
            Discover magical toys that spark imagination and joy
          </p>
        </div>
      </div>

      <div className="min-h-screen bg-[#FFF9F0]">
        <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
          {/* Filter and Sort Bar */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#FFE0E6] rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium text-[#2D3A5C]"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 bg-[#4A8A90] text-white text-xs rounded-full">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </button>

                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-4 py-2 text-sm border-2 border-[#FFE0E6] bg-white rounded-xl focus:ring-2 focus:ring-[#4A8A90]/20 focus:border-[#4A8A90] outline-none transition shadow-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                </select>

                <div className="hidden md:flex items-center gap-1 bg-white border-2 border-[#FFE0E6] rounded-xl p-1 shadow-sm">
                  <button 
                    onClick={() => setViewMode('grid')} 
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white shadow-md' : 'text-[#8B9DC3] hover:bg-gray-100'}`} 
                    title="Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')} 
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white shadow-md' : 'text-[#8B9DC3] hover:bg-gray-100'}`} 
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B9DC3]" />
                <input
                  type="text"
                  placeholder="Search toys..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 text-sm border-2 border-[#FFE0E6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent bg-white"
                />
                {searchInput && (
                  <button onClick={handleClearSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {getActiveFilterCount() > 0 && (
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                {filters.search && (
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-[#FFF9F0] text-[#4A8A90] text-xs font-medium rounded-full border border-[#FFE0E6]">
                    <span>🔍 "{filters.search}"</span>
                    <button onClick={handleClearSearch} className="ml-1 hover:text-[#FFB6C1]"><X className="w-3 h-3" /></button>
                  </div>
                )}
                {filters.categories.map(catId => {
                  const category = categories.find(c => c._id === catId);
                  return category ? (
                    <div key={catId} className="flex items-center gap-1 px-3 py-1.5 bg-[#FFF9F0] text-[#4A8A90] text-xs font-medium rounded-full border border-[#FFE0E6]">
                      <Tag className="w-3 h-3" />
                      <span>{category.name}</span>
                      <button onClick={() => handleRemoveCategory(catId)} className="ml-1 hover:text-[#FFB6C1]"><X className="w-3 h-3" /></button>
                    </div>
                  ) : null;
                })}
                {filters.subcategories.map(subId => {
                  const subcategory = subcategories.find(s => s._id === subId);
                  return subcategory ? (
                    <div key={subId} className="flex items-center gap-1 px-3 py-1.5 bg-[#FFF9F0] text-[#4A8A90] text-xs font-medium rounded-full border border-[#FFE0E6]">
                      <FolderTree className="w-3 h-3" />
                      <span>{subcategory.name}</span>
                      <button onClick={() => handleRemoveSubcategory(subId)} className="ml-1 hover:text-[#FFB6C1]"><X className="w-3 h-3" /></button>
                    </div>
                  ) : null;
                })}
                {filters.childSubcategories.map(childId => {
                  const child = childSubcategories.find(c => c._id === childId);
                  return child ? (
                    <div key={childId} className="flex items-center gap-1 px-3 py-1.5 bg-[#FFF9F0] text-[#4A8A90] text-xs font-medium rounded-full border border-[#FFE0E6]">
                      <FolderTree className="w-3 h-3" />
                      <span>{child.name}</span>
                      <button onClick={() => handleRemoveChildSubcategory(childId)} className="ml-1 hover:text-[#FFB6C1]"><X className="w-3 h-3" /></button>
                    </div>
                  ) : null;
                })}
                {filters.ageGroups.map(age => (
                  <div key={age} className="flex items-center gap-1 px-3 py-1.5 bg-[#FFF9F0] text-[#4A8A90] text-xs font-medium rounded-full border border-[#FFE0E6]">
                    <Users className="w-3 h-3" />
                    <span>Ages {age}</span>
                    <button onClick={() => handleAgeGroupChange(age)} className="ml-1 hover:text-[#FFB6C1]"><X className="w-3 h-3" /></button>
                  </div>
                ))}
                {(filters.priceRange.min || filters.priceRange.max) && (
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-[#FFF9F0] text-[#4A8A90] text-xs font-medium rounded-full border border-[#FFE0E6]">
                    <DollarSign className="w-3 h-3" />
                    <span>৳{filters.priceRange.min || '0'} - ৳{filters.priceRange.max || '∞'}</span>
                    <button onClick={clearPriceRange} className="ml-1 hover:text-[#FFB6C1]"><X className="w-3 h-3" /></button>
                  </div>
                )}
                {getActiveFilterCount() > 0 && (
                  <button onClick={clearFilters} className="px-3 py-1.5 text-xs text-[#8B9DC3] hover:text-[#4A8A90] font-medium">
                    Clear All
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Desktop Filters */}
            <div className="hidden md:block md:w-80 flex-shrink-0">
              <FilterSidebar 
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                categories={categories}
                subcategories={subcategories}
                childSubcategories={childSubcategories}
                filters={filters}
                handleCategoryChange={handleCategoryChange}
                handleRemoveCategory={handleRemoveCategory}
                handleSubcategoryChange={handleSubcategoryChange}
                handleRemoveSubcategory={handleRemoveSubcategory}
                handleChildSubcategoryChange={handleChildSubcategoryChange}
                handleRemoveChildSubcategory={handleRemoveChildSubcategory}
                handleTargetedCustomerChange={handleAgeGroupChange}
                minPriceInput={minPriceInput}
                maxPriceInput={maxPriceInput}
                setMinPriceInput={setMinPriceInput}
                setMaxPriceInput={setMaxPriceInput}
                applyPriceRange={applyPriceRange}
                clearPriceRange={clearPriceRange}
                getActiveFilterCount={getActiveFilterCount}
                clearFilters={clearFilters}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                showChildSubcategory={showChildSubcategory}
              />
            </div>

            {/* Products Grid/List */}
            <div className="flex-1" ref={productsContainerRef}>
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(12)].map((_, index) => (
                    <div key={index} className="bg-white rounded-2xl border-2 border-[#FFE0E6] overflow-hidden animate-pulse shadow-md">
                      <div className="h-48 bg-gray-200"></div>
                      <div className="p-4">
                        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                        <div className="h-6 bg-gray-200 rounded mb-2 w-1/2"></div>
                        <div className="h-3 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {products.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border-2 border-[#FFE0E6] shadow-md">
                      <Gift className="w-16 h-16 text-[#FFB6C1] mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">No toys found matching your criteria</p>
                      <button onClick={clearFilters} className="px-6 py-2.5 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white font-bold rounded-full hover:from-[#3A7A80] hover:to-[#5B9399] transition-all shadow-md">
                        Clear All Filters
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Results count */}
                      <div className="mb-4 text-sm text-[#8B9DC3]">
                        Found {totalProducts} toy{totalProducts !== 1 ? 's' : ''}
                      </div>
                      
                      {viewMode === 'grid' ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                          {products.map(product => (
                            <ProductGridCard 
                              key={product._id} 
                              product={product} 
                              router={router}
                              isInCart={productsInCart[product._id] || false}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {products.map(product => (
                            <ProductListCard 
                              key={product._id} 
                              product={product} 
                              router={router}
                              isInCart={productsInCart[product._id] || false}
                            />
                          ))}
                        </div>
                      )}

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                          <button 
                            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} 
                            disabled={currentPage === 1} 
                            className="p-2 border-2 border-[#FFE0E6] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white rounded-xl shadow-sm"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          {[...Array(totalPages)].map((_, i) => {
                            const pageNum = i + 1;
                            if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                              return (
                                <button 
                                  key={i} 
                                  onClick={() => handlePageChange(pageNum)} 
                                  className={`w-9 h-9 rounded-xl text-sm font-bold transition-all shadow-sm ${currentPage === pageNum ? 'bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white shadow-md' : 'bg-white border-2 border-[#FFE0E6] text-[#2D3A5C] hover:bg-gray-50'}`}
                                >
                                  {pageNum}
                                </button>
                              );
                            } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                              return <span key={i} className="text-sm text-[#8B9DC3]">...</span>;
                            }
                            return null;
                          })}
                          <button 
                            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} 
                            disabled={currentPage === totalPages} 
                            className="p-2 border-2 border-[#FFE0E6] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white rounded-xl shadow-sm"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto rounded-l-2xl shadow-2xl">
            <div className="sticky top-0 bg-white p-4 border-b-2 border-[#FFE0E6] flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>Filters</h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar 
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                categories={categories}
                subcategories={subcategories}
                childSubcategories={childSubcategories}
                filters={filters}
                handleCategoryChange={handleCategoryChange}
                handleRemoveCategory={handleRemoveCategory}
                handleSubcategoryChange={handleSubcategoryChange}
                handleRemoveSubcategory={handleRemoveSubcategory}
                handleChildSubcategoryChange={handleChildSubcategoryChange}
                handleRemoveChildSubcategory={handleRemoveChildSubcategory}
                handleTargetedCustomerChange={handleAgeGroupChange}
                minPriceInput={minPriceInput}
                maxPriceInput={maxPriceInput}
                setMinPriceInput={setMinPriceInput}
                setMaxPriceInput={setMaxPriceInput}
                applyPriceRange={applyPriceRange}
                clearPriceRange={clearPriceRange}
                getActiveFilterCount={getActiveFilterCount}
                clearFilters={clearFilters}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                showChildSubcategory={showChildSubcategory}
              />
            </div>
            <div className="sticky bottom-0 bg-white p-4 border-t-2 border-[#FFE0E6]">
              <button onClick={() => setShowMobileFilters(false)} className="w-full py-3 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white font-bold rounded-xl hover:from-[#3A7A80] hover:to-[#5B9399] transition-all shadow-md">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}