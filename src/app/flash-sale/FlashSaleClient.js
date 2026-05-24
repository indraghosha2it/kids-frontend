
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import Link from 'next/link';
// import { 
//   Grid, 
//   Loader2,
//   Flame,
//   Gift,
//   Eye, 
//   ShoppingCart,
//   Package,
//   Star,
//   Zap,
//   Heart,
//   Users,
//   Sparkles
// } from 'lucide-react';
// import WhatsAppButton from '../components/layout/WhatsAppButton';
// import { toast } from 'sonner';

// // Loading Bar Component
// const LoadingBar = ({ isVisible }) => {
//   return (
//     <div className={`fixed top-0 left-0 w-full h-1 bg-[#FFB6C1] z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
//       <div className="h-full bg-[#4A8A90] animate-loading-bar" style={{ width: '100%' }}></div>
//     </div>
//   );
// };

// // Helper functions
// const formatPrice = (price) => {
//   return price?.toFixed(2) || '0.00';
// };

// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
// };

// const truncateText = (text, limit = 25) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// const getTagStyles = (tag) => {
//   const styles = {
//     'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600',
//     'New Arrival': 'bg-gradient-to-r from-emerald-500 to-teal-600',
//     'Limited Edition': 'bg-gradient-to-r from-purple-500 to-pink-600',
//     'Eco-Friendly': 'bg-gradient-to-r from-green-500 to-emerald-600',
//     'Educational': 'bg-gradient-to-r from-blue-500 to-indigo-600',
//     'STEM Toy': 'bg-gradient-to-r from-cyan-500 to-blue-600',
//   };
//   return styles[tag] || 'bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9]';
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

// // Flash Sale Product Card (Grid only - mobile responsive)
// const FlashSaleProductCard = ({ product, router, isInCart: propIsInCart, isInWishlist: propIsInWishlist }) => {
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
      
//       const headers = { 'Content-Type': 'application/json' };
      
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
      
//       const headers = { 'Content-Type': 'application/json' };
      
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
        
//         {/* Flash Sale Badge - Top Left */}
//         <div className="absolute top-0.5 left-0.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[7px] sm:text-[9px] font-bold px-1 py-0.5 rounded-md shadow-lg z-20 flex items-center gap-0.5">
//           <Flame className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
//           FLASH SALE
//         </div>
        
//         {/* Discount Badge - Top Right */}
//         {discountPercent > 0 && (
//           <div className="absolute top-0.5 right-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[7px] sm:text-[9px] font-bold px-1 py-0.5 rounded-md shadow-lg z-20 flex items-center gap-0.5">
//             <Zap className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
//             {discountPercent}% OFF
//           </div>
//         )}
        
//         {/* Tag Badge - Bottom Left */}
//         {primaryTag && (
//           <motion.div 
//             initial={{ x: 10, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.1 }}
//             className={`absolute bottom-1 left-1 ${tagStyle} text-white text-[6px] sm:text-[7px] md:text-[8px] px-1 py-0.5 font-semibold rounded-md z-20 flex items-center gap-0.5 shadow-lg`}
//           >
//             <Sparkles className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
//             <span className="truncate max-w-[40px] sm:max-w-[60px]">{primaryTag}</span>
//           </motion.div>
//         )}
        
//         {/* Desktop Hover Icons */}
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
//           {/* Age Group Badge - Shows actual age group from backend */}
//           {product.ageGroup ? (
//             <div className={`inline-flex items-center gap-0.5 px-1 py-0.5 rounded-full text-[6px] sm:text-[8px] font-semibold ${getAgeGroupBadge(product.ageGroup)}`}>
//               <Users className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
//               Ages {product.ageGroup}
//             </div>
//           ) : (
//             <div className="text-[6px] sm:text-[8px] text-gray-400">✨ Toy</div>
//           )}
          
//           {/* Rating Stars */}
//           <div className="flex items-center gap-0.5">
//             <div className="flex items-center">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                   key={star}
//                   className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 ${
//                     star <= (product.rating || 5)
//                       ? 'fill-yellow-400 text-yellow-400'
//                       : 'text-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>
//             <span className="text-[6px] sm:text-[8px] text-gray-500">({product.rating || 5})</span>
//           </div>
//         </div>

//         {/* Price Section */}
//         <div className="flex items-baseline gap-1 mb-1">
//           <span className="text-xs sm:text-sm font-bold text-red-500">
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
//           {/* Category - Shows actual category name from backend */}
//           {product.category?.name ? (
//             <div className="flex items-center gap-0.5 text-[5px] sm:text-[7px] text-[#8B9DC3]">
//               <Package className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5" />
//               <span className="truncate max-w-[40px] sm:max-w-[70px]">{product.category.name}</span>
//             </div>
//           ) : (
//             <div className="text-[5px] sm:text-[7px] text-gray-400">🎁 Toy</div>
//           )}
          
//           {/* Stock Status */}
//           <div className="flex-shrink-0">
//             {product.stockQuantity > 0 ? (
//               <span className="flex items-center gap-0.5 text-[5px] sm:text-[7px] text-green-600 font-medium">
//                 <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="hidden sm:inline">In Stock ({product.stockQuantity})</span>
//                 <span className="sm:hidden">Stock</span>
//               </span>
//             ) : (
//               <span className="flex items-center gap-0.5 text-[5px] sm:text-[7px] text-red-500 font-medium">
//                 <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-red-500 rounded-full"></div>
//                 <span className="hidden sm:inline">Out of Stock</span>
//                 <span className="sm:hidden">Out</span>
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
//           className="w-full py-1 sm:py-1.5 text-center text-[8px] sm:text-[9px] font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center gap-1"
//         >
//           <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//           <span className="sm:inline">Add to Cart</span>
//         </button>
//       )}
//     </motion.div>
//   );
// };

// // Main Flash Sale Page Component
// export default function FlashSalePage() {
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [productsInCart, setProductsInCart] = useState({});
//   const [productsInWishlist, setProductsInWishlist] = useState({});

//   // Fetch flash sale products
//   const fetchFlashSaleProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/products/flash-sale?limit=20');
//       const data = await response.json();
      
//       if (data.success) {
//         setProducts(data.data);
//       } else {
//         toast.error('Failed to load flash sale products');
//       }
//     } catch (error) {
//       console.error('Error fetching flash sale products:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Check cart status for all products
//   useEffect(() => {
//     const checkAllProductsCartStatus = async () => {
//       if (products.length === 0) return;
      
//       const productIds = products.map(p => p._id);
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
      
//       const headers = {};
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       try {
//         const response = await fetch('http://localhost:5000/api/cart/check-status', {
//           method: 'POST',
//           headers: { ...headers, 'Content-Type': 'application/json' },
//           body: JSON.stringify({ productIds })
//         });
        
//         const data = await response.json();
//         if (data.success) {
//           setProductsInCart(data.data);
//         }
//       } catch (error) {
//         console.error('Error checking cart status:', error);
//       }
//     };
    
//     checkAllProductsCartStatus();
//   }, [products]);

//   // Check wishlist status
//   useEffect(() => {
//     const checkWishlistStatus = async () => {
//       if (products.length === 0) return;
      
//       const productIds = products.map(p => p._id);
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('wishlistSessionId');
      
//       const headers = {};
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       try {
//         const response = await fetch('http://localhost:5000/api/wishlist/check-status', {
//           method: 'POST',
//           headers: { ...headers, 'Content-Type': 'application/json' },
//           body: JSON.stringify({ productIds })
//         });
        
//         const data = await response.json();
//         if (data.success) {
//           setProductsInWishlist(data.data);
//         }
//       } catch (error) {
//         console.error('Error checking wishlist status:', error);
//       }
//     };
    
//     checkWishlistStatus();
//   }, [products]);

//   // Refresh status on update
//   useEffect(() => {
//     const refreshCartStatus = async () => {
//       if (products.length === 0) return;
      
//       const productIds = products.map(p => p._id);
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
      
//       const headers = {};
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       try {
//         const response = await fetch('http://localhost:5000/api/cart/check-status', {
//           method: 'POST',
//           headers: { ...headers, 'Content-Type': 'application/json' },
//           body: JSON.stringify({ productIds })
//         });
        
//         const data = await response.json();
//         if (data.success) {
//           setProductsInCart(data.data);
//         }
//       } catch (error) {
//         console.error('Error refreshing cart status:', error);
//       }
//     };
    
//     const refreshWishlistStatus = async () => {
//       if (products.length === 0) return;
//       const productIds = products.map(p => p._id);
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('wishlistSessionId');
//       const headers = {};
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;
      
//       try {
//         const response = await fetch('http://localhost:5000/api/wishlist/check-status', {
//           method: 'POST',
//           headers: { ...headers, 'Content-Type': 'application/json' },
//           body: JSON.stringify({ productIds })
//         });
//         const data = await response.json();
//         if (data.success) setProductsInWishlist(data.data);
//       } catch (error) {
//         console.error('Error refreshing wishlist status:', error);
//       }
//     };
    
//     const handleCartUpdate = () => refreshCartStatus();
//     const handleWishlistUpdate = () => refreshWishlistStatus();
    
//     window.addEventListener('cart-update', handleCartUpdate);
//     window.addEventListener('wishlist-update', handleWishlistUpdate);
//     return () => {
//       window.removeEventListener('cart-update', handleCartUpdate);
//       window.removeEventListener('wishlist-update', handleWishlistUpdate);
//     };
//   }, [products]);

//   useEffect(() => {
//     fetchFlashSaleProducts();
//   }, []);

//   return (
//     <>
//       <LoadingBar isVisible={loading} />
//       <Navbar />
      
//       {/* Hero Banner Section */}
//       <div 
//         className="w-full h-48 md:h-64 lg:h-80 relative overflow-hidden"
//         style={{
//           backgroundImage: "url('https://i.ibb.co.com/tPHjgwVg/Gemini-Generated-Image-3ufwj73ufwj73ufw.png')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat"
//         }}
//       />

//       <div className="min-h-screen bg-[#FFF9F0]">
//         <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
          
//           {/* Results Count */}
//           <div className="mb-6">
//             <div className="text-sm text-[#8B9DC3]">
//               {!loading && (
//                 <span>Found {products.length} flash sale item{products.length !== 1 ? 's' : ''}</span>
//               )}
//             </div>
//           </div>

//           {/* Products Grid - Only Grid View, No List View */}
//           {loading ? (
//             <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-5">
//               {[...Array(8)].map((_, index) => (
//                 <div key={index} className="bg-white rounded-2xl border-2 border-[#FFE0E6] overflow-hidden animate-pulse shadow-md">
//                   <div className="h-48 bg-gray-200"></div>
//                   <div className="p-4">
//                     <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
//                     <div className="h-6 bg-gray-200 rounded mb-2 w-1/2"></div>
//                     <div className="h-3 bg-gray-200 rounded mb-2"></div>
//                     <div className="h-3 bg-gray-200 rounded w-1/3"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : products.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-2xl border-2 border-[#FFE0E6] shadow-md">
//               <Gift className="w-16 h-16 text-[#FFB6C1] mx-auto mb-4" />
//               <p className="text-gray-500 mb-4">No flash sale products available right now</p>
//               <Link href="/products" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white font-bold rounded-full hover:from-[#3A7A80] hover:to-[#5B9399] transition-all shadow-md">
//                 Browse All Products
//               </Link>
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-5">
//               {products.map(product => (
//                 <FlashSaleProductCard 
//                   key={product._id} 
//                   product={product} 
//                   router={router}
//                   isInCart={productsInCart[product._id] || false}
//                   isInWishlist={productsInWishlist[product._id] || false}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

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

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Link from 'next/link';
import { 
  Grid, 
  Loader2,
  Flame,
  Gift,
  Eye, 
  ShoppingCart,
  Package,
  Star,
  Zap,
  Heart,
  Users,
  Sparkles
} from 'lucide-react';
import WhatsAppButton from '../components/layout/WhatsAppButton';
import { toast } from 'sonner';

// Loading Bar Component
const LoadingBar = ({ isVisible }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-1 bg-[#FFB6C1] z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="h-full bg-[#4A8A90] animate-loading-bar" style={{ width: '100%' }}></div>
    </div>
  );
};

// Helper functions
const formatPrice = (price) => {
  return price?.toFixed(2) || '0.00';
};

const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

const truncateText = (text, limit = 25) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const getTagStyles = (tag) => {
  const styles = {
    'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600',
    'New Arrival': 'bg-gradient-to-r from-emerald-500 to-teal-600',
    'Limited Edition': 'bg-gradient-to-r from-purple-500 to-pink-600',
    'Eco-Friendly': 'bg-gradient-to-r from-green-500 to-emerald-600',
    'Educational': 'bg-gradient-to-r from-blue-500 to-indigo-600',
    'STEM Toy': 'bg-gradient-to-r from-cyan-500 to-blue-600',
  };
  return styles[tag] || 'bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9]';
};

const getAgeGroupBadge = (ageGroup) => {
  const styles = {
    '0-2': 'bg-pink-100 text-pink-600',
    '3-5': 'bg-blue-100 text-blue-600',
    '6-10': 'bg-green-100 text-green-600',
    '11-14': 'bg-purple-100 text-purple-600',
     '': 'bg-teal-100 text-teal-600'
  };
  return styles[ageGroup] || 'bg-gray-100 text-gray-600';
};

// Flash Sale Product Card (Grid only - mobile responsive)
const FlashSaleProductCard = ({ product, router, isInCart: propIsInCart, isInWishlist: propIsInWishlist }) => {
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
      
      const headers = { 'Content-Type': 'application/json' };
      
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
      
      const headers = { 'Content-Type': 'application/json' };
      
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
        
        {/* Flash Sale Badge - Top Left */}
        <div className="absolute top-0.5 left-0.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[7px] sm:text-[9px] font-bold px-1 py-0.5 rounded-md shadow-lg z-20 flex items-center gap-0.5">
          <Flame className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
          FLASH SALE
        </div>
        
        {/* Discount Badge - Top Right */}
        {discountPercent > 0 && (
          <div className="absolute top-0.5 right-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[7px] sm:text-[9px] font-bold px-1 py-0.5 rounded-md shadow-lg z-20 flex items-center gap-0.5">
            <Zap className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
            {discountPercent}% OFF
          </div>
        )}
        
        {/* Tag Badge - Bottom Left */}
        {primaryTag && (
          <motion.div 
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`absolute bottom-1 left-1 ${tagStyle} text-white text-[6px] sm:text-[7px] md:text-[8px] px-1 py-0.5 font-semibold rounded-md z-20 flex items-center gap-0.5 shadow-lg`}
          >
            <Sparkles className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
            <span className="truncate max-w-[40px] sm:max-w-[60px]">{primaryTag}</span>
          </motion.div>
        )}
        
        {/* Desktop Hover Icons */}
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
       {/* Age Group and Rating Row */}
<div className="flex items-center justify-between mb-1">
  {/* Age Group Badge - Shows actual age group from backend */}
  {product.ageGroup ? (
    <div className={`inline-flex items-center gap-0.5 px-1 py-0.5 rounded-full text-[6px] sm:text-[8px] font-semibold ${getAgeGroupBadge(product.ageGroup)}`}>
      <Users className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
      Ages {product.ageGroup}
    </div>
  ) : (
    <div className={`inline-flex items-center gap-0.5 px-1 py-0.5 rounded-full text-[6px] sm:text-[8px] font-semibold ${getAgeGroupBadge('')}`}>
      <Users className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
      All Kids
    </div>
  )}
          
          {/* Rating Stars */}
          <div className="flex items-center gap-0.5">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 ${
                    star <= (product.rating || 5)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[6px] sm:text-[8px] text-gray-500">({product.rating || 5})</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-xs sm:text-sm font-bold text-red-500">
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
          {/* Category - Shows actual category name from backend */}
          {product.category?.name ? (
            <div className="flex items-center gap-0.5 text-[5px] sm:text-[7px] text-[#8B9DC3]">
              <Package className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5" />
              <span className="truncate max-w-[40px] sm:max-w-[70px]">{product.category.name}</span>
            </div>
          ) : (
            <div className="text-[5px] sm:text-[7px] text-gray-400">🎁 Toy</div>
          )}
          
          {/* Stock Status */}
          <div className="flex-shrink-0">
            {product.stockQuantity > 0 ? (
              <span className="flex items-center gap-0.5 text-[5px] sm:text-[7px] text-green-600 font-medium">
                <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-green-500 rounded-full animate-pulse"></div>
                <span className="hidden sm:inline">In Stock ({product.stockQuantity})</span>
                <span className="sm:hidden">Stock</span>
              </span>
            ) : (
              <span className="flex items-center gap-0.5 text-[5px] sm:text-[7px] text-red-500 font-medium">
                <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-red-500 rounded-full"></div>
                <span className="hidden sm:inline">Out of Stock</span>
                <span className="sm:hidden">Out</span>
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
          className="w-full py-1 sm:py-1.5 text-center text-[8px] sm:text-[9px] font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center gap-1"
        >
          <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
          <span className="sm:inline">Add to Cart</span>
        </button>
      )}
    </motion.div>
  );
};

// Main Flash Sale Page Component
export default function FlashSaleClient() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsInCart, setProductsInCart] = useState({});
  const [productsInWishlist, setProductsInWishlist] = useState({});

  // Fetch flash sale products
  const fetchFlashSaleProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/products/flash-sale?limit=20');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      } else {
        toast.error('Failed to load flash sale products');
      }
    } catch (error) {
      console.error('Error fetching flash sale products:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Check cart status for all products
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

  // Check wishlist status
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (products.length === 0) return;
      
      const productIds = products.map(p => p._id);
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('wishlistSessionId');
      
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      try {
        const response = await fetch('http://localhost:5000/api/wishlist/check-status', {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds })
        });
        
        const data = await response.json();
        if (data.success) {
          setProductsInWishlist(data.data);
        }
      } catch (error) {
        console.error('Error checking wishlist status:', error);
      }
    };
    
    checkWishlistStatus();
  }, [products]);

  // Refresh status on update
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
    
    const refreshWishlistStatus = async () => {
      if (products.length === 0) return;
      const productIds = products.map(p => p._id);
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('wishlistSessionId');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;
      
      try {
        const response = await fetch('http://localhost:5000/api/wishlist/check-status', {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds })
        });
        const data = await response.json();
        if (data.success) setProductsInWishlist(data.data);
      } catch (error) {
        console.error('Error refreshing wishlist status:', error);
      }
    };
    
    const handleCartUpdate = () => refreshCartStatus();
    const handleWishlistUpdate = () => refreshWishlistStatus();
    
    window.addEventListener('cart-update', handleCartUpdate);
    window.addEventListener('wishlist-update', handleWishlistUpdate);
    return () => {
      window.removeEventListener('cart-update', handleCartUpdate);
      window.removeEventListener('wishlist-update', handleWishlistUpdate);
    };
  }, [products]);

  useEffect(() => {
    fetchFlashSaleProducts();
  }, []);

  return (
    <>
      <LoadingBar isVisible={loading} />
      <Navbar />
      
      {/* Hero Banner Section */}
      <div 
        className="w-full h-48 md:h-64 lg:h-80 relative overflow-hidden"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/tPHjgwVg/Gemini-Generated-Image-3ufwj73ufwj73ufw.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />

      <div className="min-h-screen bg-[#FFF9F0]">
        <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
          
          {/* Results Count */}
          <div className="mb-6">
            <div className="text-sm text-[#8B9DC3]">
              {!loading && (
                <span>Found {products.length} flash sale item{products.length !== 1 ? 's' : ''}</span>
              )}
            </div>
          </div>

          {/* Products Grid - Only Grid View, No List View */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-5">
              {[...Array(8)].map((_, index) => (
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
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-[#FFE0E6] shadow-md">
              <Gift className="w-16 h-16 text-[#FFB6C1] mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No flash sale products available right now</p>
              <Link href="/products" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white font-bold rounded-full hover:from-[#3A7A80] hover:to-[#5B9399] transition-all shadow-md">
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-5">
              {products.map(product => (
                <FlashSaleProductCard 
                  key={product._id} 
                  product={product} 
                  router={router}
                  isInCart={productsInCart[product._id] || false}
                  isInWishlist={productsInWishlist[product._id] || false}
                />
              ))}
            </div>
          )}
        </div>
      </div>

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