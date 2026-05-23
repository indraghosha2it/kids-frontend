
// 'use client';

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Heart, ShoppingCart, Eye, Star, Loader2, ChevronLeft, ChevronRight, 
//   Zap, Sparkles, Tag, Users, Package, Gift 
// } from 'lucide-react';
// import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';

// // Helper functions
// const formatPrice = (price) => {
//   return price?.toFixed(2) || '0.00';
// };

// const truncateText = (text, limit = 20) => {
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

// // Enhanced Product Grid Card Component
// const ProductGridCard = ({ product, router, onWishlistUpdate, isInWishlist: propIsInWishlist }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [wishlistLoading, setWishlistLoading] = useState(false);
//   const [isInCart, setIsInCart] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(propIsInWishlist || false);

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

//   useEffect(() => {
//     setIsWishlisted(propIsInWishlist || false);
//   }, [propIsInWishlist]);

//   // Check if product is in cart
//   useEffect(() => {
//     const checkCartStatus = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const sessionId = localStorage.getItem('cartSessionId');
        
//         const headers = {};
//         if (token) {
//           headers['Authorization'] = `Bearer ${token}`;
//         } else if (sessionId) {
//           headers['x-session-id'] = sessionId;
//         } else {
//           setIsInCart(false);
//           return;
//         }
        
//         // Fetch the entire cart and check if product exists
//         const response = await fetch('https://kids-backend.vercel.app/api/cart', { headers });
//         const data = await response.json();
        
//         if (data.success && data.data && data.data.items) {
//           const isProductInCart = data.data.items.some(
//             item => item.productId === product._id || item.productId?.toString() === product._id?.toString()
//           );
//           setIsInCart(isProductInCart);
//         } else {
//           setIsInCart(false);
//         }
//       } catch (error) {
//         console.error('Error checking cart status:', error);
//         setIsInCart(false);
//       }
//     };
    
//     checkCartStatus();
//   }, [product._id]);

//   const handleWishlist = async (e) => {
//     e.stopPropagation();
//     setWishlistLoading(true);
    
//     const toastId = toast.loading(isWishlisted ? 'Removing from wishlist...' : 'Adding to wishlist...');
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('wishlistSessionId');
      
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;
      
//       const response = await fetch('https://kids-backend.vercel.app/api/wishlist', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ productId: product._id })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         if (data.sessionId && !token) localStorage.setItem('wishlistSessionId', data.sessionId);
//         setIsWishlisted(!isWishlisted);
//         toast.success(data.message, { id: toastId });
//         if (onWishlistUpdate) onWishlistUpdate();
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
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;
      
//       const response = await fetch('https://kids-backend.vercel.app/api/cart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ productId: product._id, quantity: 1 })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         setIsInCart(true);
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
//           src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/300?text=Toy'}
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
//           <div className="absolute top-1 left-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-lg z-20 flex items-center gap-0.5">
//             <Zap className="w-2 h-2" />
//             {discountPercent}% OFF
//           </div>
//         )}
        
      
        
// {product.promotion && product.promotion !== '' ? (
//   <motion.div 
//     initial={{ x: 10, opacity: 0 }}
//     animate={{ x: 0, opacity: 1 }}
//     transition={{ delay: 0.1 }}
//     className="absolute top-1 right-1 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white text-[7px] md:text-[8px] px-1.5 py-0.5 font-semibold rounded-md z-20 flex items-center gap-0.5 shadow-lg"
//   >
//     <Sparkles className="w-2 h-2" />
//     <span className="truncate max-w-[60px]">
//       {product.promotion === 'flash-sale' ? 'Flash Sale' :
//        product.promotion === 'trending' ? 'Trending' :
//        product.promotion === 'featured' ? 'Featured' :
//        product.promotion === 'clearance' ? 'Clearance' :
//        product.promotion === 'new-arrival' ? 'New Arrival' :
//        product.promotion === 'bundle-deal' ? 'Bundle Deal' :
//        product.promotion === 'limited-stock' ? 'Limited Stock' :
//        product.promotion === 'holiday-special' ? 'Holiday Special' : product.promotion}
//     </span>
//   </motion.div>
// ) : null}
        
//         {/* Hover Icons */}
//         <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
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
//       </div>
      
//       {/* Thumbnail Images */}
//       {hasMultipleImages && (
//         <div className="flex justify-center items-center gap-1 py-1.5 bg-[#FFF9F0] border-b border-[#FFE0E6]">
//           {productImages.slice(0, 4).map((image, index) => (
//             <button
//               key={index}
//               className={`w-5 h-5 overflow-hidden rounded transition-all duration-200 ${
//                 activeIndex === index 
//                   ? 'ring-1.5 ring-[#4A8A90] ring-offset-0.5 scale-110' 
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
//       <div className="p-2">
//         <h3 className="text-xs font-bold text-[#2D3A5C] line-clamp-2 hover:text-[#4A8A90] transition-colors duration-200 mb-1" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }} title={product.productName}>
//           {truncateText(product.productName, 20)}
//         </h3>
        
//         <div className="flex items-center justify-between mb-1.5">
//           {product.ageGroup ? (
//             <div className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-semibold ${getAgeGroupBadge(product.ageGroup)}`}>
//               <Users className="w-2 h-2" />
//               Ages {product.ageGroup}
//             </div>
//           ) : (
//             <div className="text-[8px] text-gray-400">✨ Toy</div>
//           )}
          
//           {product.rating > 0 && (
//             <div className="flex items-center gap-0.5">
//               <div className="flex items-center">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Star
//                     key={star}
//                     className={`w-2.5 h-2.5 ${
//                       star <= Math.floor(product.rating)
//                         ? 'fill-yellow-400 text-yellow-400'
//                         : star - 0.5 <= product.rating
//                         ? 'fill-yellow-400 text-yellow-400 opacity-50'
//                         : 'text-gray-300'
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-[8px] text-gray-500">({product.rating})</span>
//             </div>
//           )}
//         </div>

//         <div className="flex items-baseline gap-1.5 mb-1.5">
//           <span className="text-sm font-bold text-[#4A8A90]">
//             ৳{formatPrice(currentPrice)}
//           </span>
//           {discountPercent > 0 && (
//             <>
//               <span className="text-[8px] text-gray-400 line-through">
//                 ৳{formatPrice(originalPrice)}
//               </span>
//               <span className="text-[7px] font-semibold text-red-500 bg-red-100 px-1 py-0.5 rounded">
//                 -{discountPercent}%
//               </span>
//             </>
//           )}
//         </div>

//         <div className="flex items-center justify-between gap-1">
//           {product.category?.name && (
//             <div className="flex items-center gap-0.5 text-[7px] text-[#8B9DC3]">
//               <Package className="w-2.5 h-2.5" />
//               <span className="truncate max-w-[70px]">{product.category.name}</span>
//             </div>
//           )}
          
//           {!product.category?.name && (
//             <div className="text-[7px] text-gray-400">🎁 Toy</div>
//           )}
          
//           <div className="flex-shrink-0">
//             {product.stockQuantity > 0 ? (
//               <span className="flex items-center gap-0.5 text-[7px] text-green-600 font-medium">
//                 <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
//                 <span>In Stock</span>
//               </span>
//             ) : (
//               <span className="flex items-center gap-0.5 text-[7px] text-red-500 font-medium">
//                 <div className="w-1 h-1 bg-red-500 rounded-full"></div>
//                 <span>Out of Stock</span>
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Add to Cart / View Cart Button */}
//       {cartStatusLoading ? (
//         <button
//           disabled
//           className="w-full py-1.5 text-center text-[9px] font-bold bg-gray-300 text-gray-500 flex items-center justify-center gap-1"
//         >
//           <Loader2 className="w-2.5 h-2.5 animate-spin" />
//           Loading...
//         </button>
//       ) : isInCart ? (
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             router.push('/cart');
//           }}
//           className="w-full py-1.5 text-center text-[9px] font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-1"
//         >
//           <ShoppingCart className="w-2.5 h-2.5" />
//           View in Cart
//         </button>
//       ) : (
//         <button
//           onClick={addToCart}
//           className="w-full py-1.5 text-center text-[9px] font-bold bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white hover:from-[#3A7A80] hover:to-[#5B9399] transition-all duration-200 flex items-center justify-center gap-1"
//         >
//           <ShoppingCart className="w-2.5 h-2.5" />
//           Add to Cart
//         </button>
//       )}
//     </motion.div>
//   );
// };

// // Main Component
// export default function TrendingItems() {
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTag, setActiveTag] = useState('all');
//   const [productsInWishlist, setProductsInWishlist] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [promotionTags, setPromotionTags] = useState([
//     { id: 'all', name: 'All Items' }
//   ]);
//   const productsPerPage = 4;

// const getFeaturedContent = (tagId) => {
//   const contentMap = {
//     'all': {
//       title: "Trending ",
//       subtitle: " Items",
//       description: "super offers",
//       discount: "25",
//       image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
//     },
//     'flash-sale': {
//       title: "🔥 Flash",
//       subtitle: "Sale!",
//       description: "up to 50% off",
//       discount: "50",
//       image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
//     },
//     'trending': {
//       title: "🔥 Trending",
//       subtitle: "Now!",
//       description: "most popular toys",
//       discount: "30",
//       image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
//     },
//     'featured': {
//       title: "⭐ Featured",
//       subtitle: "Picks",
//       description: "staff favorites",
//       discount: "20",
//       image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
//     },
//     'clearance': {
//       title: "🏷️ Clearance",
//       subtitle: "Sale!",
//       description: "up to 60% off",
//       discount: "60",
//       image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
//     },
//     'new-arrival': {
//       title: "✨ New",
//       subtitle: "Arrivals",
//       description: "just landed!",
//       discount: "15",
//       image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
//     },
//     'holiday-special': {
//       title: "🎄 Holiday",
//       subtitle: "Special",
//       description: "festive deals",
//       discount: "40",
//       image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
//     },
//     'bundle-deal': {
//       title: "📦 Bundle",
//       subtitle: "Deal!",
//       description: "buy more, save more",
//       discount: "35",
//       image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
//     },
//     'limited-stock': {
//       title: "⚠️ Limited",
//       subtitle: "Stock!",
//       description: "hurry up!",
//       discount: "25",
//       image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
//     }
//   };
  
//   return contentMap[tagId] || contentMap['all'];
// };

// // Extract unique promotion tags from products (ONLY from promotion field)
// const extractPromotionTags = (productsList) => {
//   if (!productsList || productsList.length === 0) return [{ id: 'all', name: 'All Items' }];
  
//   // Get unique promotion values from the promotion field only
//   const uniquePromotions = [...new Set(
//     productsList
//       .map(p => p.promotion)
//       .filter(promo => promo && promo !== '')
//   )];
  
//  const promotionMap = {
//   'flash-sale': 'Flash Sale',
//   'trending': 'Trending',
//   'featured': 'Featured',
//   'clearance': 'Clearance',
//   'holiday-special': 'Holiday Special',
//   'bundle-deal': 'Bundle Deal',
//   'limited-stock': 'Limited Stock',
//   'new-arrival': 'New Arrival'
// };
  
//   const tags = [{ id: 'all', name: 'All Items' }];
  
//   // Add promotion tags only
//   uniquePromotions.forEach(promo => {
//     tags.push({
//       id: promo,
//       name: promotionMap[promo] || promo.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
//     });
//   });
  
//   return tags;
// };

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('https://kids-backend.vercel.app/api/products?limit=50');
//       const data = await response.json();
      
//       if (data.success) {
//         setProducts(data.data);
//         setFilteredProducts(data.data);
        
//         // Extract promotion tags from fetched products
//         const tags = extractPromotionTags(data.data);
//         setPromotionTags(tags);
        
//         await checkWishlistStatus(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkWishlistStatus = async (productsList) => {
//     if (!productsList || productsList.length === 0) return;
    
//     const productIds = productsList.map(p => p._id);
//     const token = localStorage.getItem('token');
//     const sessionId = localStorage.getItem('wishlistSessionId');
    
//     const headers = {};
//     if (token) headers['Authorization'] = `Bearer ${token}`;
//     else if (sessionId) headers['x-session-id'] = sessionId;
//     else return;
    
//     try {
//       const response = await fetch('https://kids-backend.vercel.app/api/wishlist/check-status', {
//         method: 'POST',
//         headers: { ...headers, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ productIds })
//       });
      
//       const data = await response.json();
//       if (data.success) setProductsInWishlist(data.data);
//     } catch (error) {
//       console.error('Error checking wishlist status:', error);
//     }
//   };

//   // Filter products based on active tag
// // Filter products based on active tag (filter by promotion field)
// useEffect(() => {
//   if (activeTag === 'all') {
//     setFilteredProducts(products);
//   } else {
//     // Filter by promotion field for all tags
//     setFilteredProducts(products.filter(p => p.promotion === activeTag));
//   }
//   setCurrentPage(1);
// }, [activeTag, products]);

//   const refreshWishlistStatus = async () => {
//     await checkWishlistStatus(filteredProducts);
//   };

//   useEffect(() => {
//     fetchProducts();
    
//     const handleWishlistUpdate = () => refreshWishlistStatus();
//     window.addEventListener('wishlist-update', handleWishlistUpdate);
//     return () => window.removeEventListener('wishlist-update', handleWishlistUpdate);
//   }, []);

//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//   const currentProducts = filteredProducts.slice(
//     (currentPage - 1) * productsPerPage,
//     currentPage * productsPerPage
//   );

//   const goToPage = (page) => {
//     setCurrentPage(page);
    
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-cyan-50">
//         <div className="container mx-auto px-8 py-16 flex justify-center items-center">
//           <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Top Wavy Border */}
//       <svg
//         viewBox="0 0 1200 100"
//         preserveAspectRatio="none"
//         className="w-full h-24 bg-cyan-100"
//         style={{ display: 'block' }}
//       >
//         <defs>
//           <pattern id="wave" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
//             <path
//               d="M0,60 Q30,30 60,60 T120,60"
//               fill="none"
//               stroke="white"
//               strokeWidth="40"
//             />
//             <path
//               d="M0,60 Q30,30 60,60 T120,60"
//               fill="white"
//               opacity="0.3"
//             />
//           </pattern>
//         </defs>
//         <rect width="1200" height="100" fill="#A8E6E1" />
//         <path
//           d="M0,40 Q60,20 120,40 T240,40 T360,40 T480,40 T600,40 T720,40 T840,40 T960,40 T1080,40 T1200,40 L1200,100 L0,100 Z"
//           fill="white"
//         />
//         <path
//           d="M0,50 Q60,25 120,50 T240,50 T360,50 T480,50 T600,50 T720,50 T840,50 T960,50 T1080,50 T1200,50 L1200,90 L0,90 Z"
//           fill="white"
//           opacity="0.5"
//         />
//       </svg>

//       {/* Main Content */}
//       <div className="bg-white min-h-screen px-4 sm:px-8 py-2 sm:py-8">
//         <div className="container mx-auto max-w-7xl">
          
//           {/* Header with Dynamic Promotion Tags */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Trending Items</h1>
//             <nav className="flex gap-2 text-sm font-medium flex-wrap">
//               {promotionTags.map((tag) => (
//                 <button
//                   key={tag.id}
//                   onClick={() => setActiveTag(tag.id)}
//                   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-xs sm:text-sm ${
//                     activeTag === tag.id
//                       ? 'bg-teal-500 text-white shadow-md'
//                       : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
//                   }`}
//                 >
//                   {tag.name}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           {/* Content Container - Left Side (37.5%) / Right Side (62.5%) */}
//           <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-16 items-stretch">
            
//             {/* Left Side - Featured Product Banner */}
//             {/* Left Side - Featured Product Banner */}
// {/* Left Side - Featured Product Banner */}
// <div className="w-[27.5%] lg:w-[27.5%] flex-shrink-0 h-[420px]">
//   <motion.div 
//     initial={{ opacity: 0, x: -50 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ duration: 0.5, ease: "easeOut" }}
//     className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white h-full flex flex-col justify-between items-center relative overflow-hidden shadow-xl"
//   >
//     <div className="absolute inset-0 opacity-20">
//       <motion.div 
//         initial={{ scale: 0, rotate: -180 }}
//         animate={{ scale: 1, rotate: 0 }}
//         transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
//         className="absolute top-4 left-4 text-4xl sm:text-6xl"
//       >
//         {activeTag === 'flash-sale' ? '⚡' : 
//          activeTag === 'trending' ? '🔥' : 
//          activeTag === 'new-arrival' ? '✨' : 
//          activeTag === 'bundle-deal' ? '📦' :
//          activeTag === 'limited-stock' ? '⚠️' : 
//          activeTag === 'clearance' ? '🏷️' : 
//          activeTag === 'holiday-special' ? '🎄' : '🎲'}
//       </motion.div>
      
//       <motion.div 
//         initial={{ scale: 0, rotate: 180 }}
//         animate={{ scale: 1, rotate: 0 }}
//         transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
//         className="absolute bottom-8 right-8 text-3xl sm:text-4xl"
//       >
//         {activeTag === 'flash-sale' ? '🏃' : 
//          activeTag === 'bundle-deal' ? '🎁' :
//          activeTag === 'limited-stock' ? '⏰' : 
//          activeTag === 'clearance' ? '🏷️' : 
//          activeTag === 'holiday-special' ? '🎅' : '🌈'}
//       </motion.div>
//     </div>
    
//     <motion.div 
//       initial={{ y: 20, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5, delay: 0.1 }}
//       className="relative z-10 text-center flex-1 flex flex-col justify-center items-center"
//     >
//       <motion.h2 
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 150 }}
//         className="text-2xl sm:text-3xl lg:text-3xl font-black mb-2 tracking-wide" 
//         style={{ fontFamily: "'Fredoka One', 'Comic Neue', 'Comic Sans MS', cursive" }}
//       >
//         {getFeaturedContent(activeTag).title}
//       </motion.h2>
      
//       <motion.h3 
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 150 }}
//         className="text-4xl sm:text-5xl lg:text-5xl font-black mb-4 drop-shadow-lg" 
//         style={{ fontFamily: "'Fredoka One', 'Comic Neue', 'Comic Sans MS', cursive" }}
//       >
//         {getFeaturedContent(activeTag).subtitle}
//       </motion.h3>
      
//       <motion.p 
//         initial={{ y: 10, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.4, delay: 0.4 }}
//         className="text-sm sm:text-base lg:text-lg mb-2 font-semibold opacity-95" 
//         style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
//       >
//         {getFeaturedContent(activeTag).description}
//       </motion.p>
      
//       <motion.div 
//         initial={{ scale: 0.5, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
//         className="flex justify-center mb-2"
//       >
//         <motion.img
//           whileHover={{ scale: 1.1, rotate: 5 }}
//           transition={{ duration: 0.3 }}
//           src={getFeaturedContent(activeTag).image}
//           alt="Promotion banner"
//           className="w-28 sm:w-36 lg:w-40 h-28 sm:h-36 lg:h-40 object-contain mix-blend-lighten drop-shadow-lg cursor-pointer"
//         />
//       </motion.div>
      
//       <motion.div 
//         initial={{ scale: 0, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 180 }}
//         whileHover={{ scale: 1.05 }}
//         className="bg-white/25 backdrop-blur-md rounded-full px-5 sm:px-7 py-2 sm:py-3 inline-block shadow-lg border border-white/30"
//       >
//         <motion.span 
//           animate={{ scale: [1, 1.2, 1] }}
//           transition={{ duration: 1, delay: 1, repeat: Infinity, repeatDelay: 3 }}
//           className="text-xl sm:text-xl lg:text-2xl font-black" 
//           style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}
//         >
//           {getFeaturedContent(activeTag).discount}%
//         </motion.span>
//         <span className="text-base sm:text-lg ml-2 font-bold">Off</span>
//       </motion.div>
//     </motion.div>
//   </motion.div>
// </div>

//             {/* Right Side - Product Grid */}
//             <div className="flex-1">
//               {filteredProducts.length === 0 ? (
//                 <div className="text-center py-16 bg-white rounded-2xl">
//                   <Tag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                   <p className="text-gray-500">No products found in this category</p>
//                 </div>
//               ) : (
//                 <>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
//                     <AnimatePresence mode="wait">
//                       {currentProducts.map((product) => (
//                         <ProductGridCard
//                           key={product._id}
//                           product={product}
//                           router={router}
//                           onWishlistUpdate={refreshWishlistStatus}
//                           isInWishlist={productsInWishlist[product._id] || false}
//                         />
//                       ))}
//                     </AnimatePresence>
//                   </div>

//                   {/* Pagination */}
//                   {totalPages > 1 && (
//                     <div className="flex justify-center items-center gap-2 mt-8">
//                       <button
//                         onClick={() => goToPage(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//                       >
//                         <ChevronLeft className="w-4 h-4" />
//                       </button>
//                       <div className="flex gap-1">
//                         {[...Array(totalPages)].map((_, i) => {
//                           const pageNum = i + 1;
//                           if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
//                             return (
//                               <button
//                                 key={i}
//                                 onClick={() => goToPage(pageNum)}
//                                 className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
//                                   currentPage === pageNum
//                                     ? 'bg-teal-500 text-white'
//                                     : 'bg-white border border-gray-200 hover:bg-gray-50'
//                                 }`}
//                               >
//                                 {pageNum}
//                               </button>
//                             );
//                           } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
//                             return <span key={i} className="text-gray-400">...</span>;
//                           }
//                           return null;
//                         })}
//                       </div>
//                       <button
//                         onClick={() => goToPage(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                         className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//                       >
//                         <ChevronRight className="w-4 h-4" />
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
          
//         </div>
//       </div>

//       {/* Bottom Wavy Border */}
//       <svg
//         viewBox="0 0 1200 100"
//         preserveAspectRatio="none"
//         className="w-full h-16 sm:h-24 bg-white"
//         style={{ display: 'block' }}
//       >
//         <path
//           d="M0,30 Q60,50 120,30 T240,30 T360,30 T480,30 T600,30 T720,30 T840,30 T960,30 T1080,30 T1200,30 L1200,0 L0,0 Z"
//           fill="#ECFEFF"
//         />
//         <path
//           d="M0,25 Q60,45 120,25 T240,25 T360,25 T480,25 T600,25 T720,25 T840,25 T960,25 T1080,25 T1200,25 L1200,0 L0,0 Z"
//           fill="#ECFEFF"
//           opacity="0.6"
//         />
//       </svg>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, ShoppingCart, Eye, Star, Loader2, ChevronLeft, ChevronRight, 
  Zap, Sparkles, Tag, Users, Package, Gift 
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Helper functions
const formatPrice = (price) => {
  return price?.toFixed(2) || '0.00';
};

const truncateText = (text, limit = 20) => {
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


// Enhanced Product Grid Card Component
const ProductGridCard = ({ product, router, onWishlistUpdate, isInWishlist: propIsInWishlist }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(propIsInWishlist || false);

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

  useEffect(() => {
    setIsWishlisted(propIsInWishlist || false);
  }, [propIsInWishlist]);

  // Check if product is in cart
  useEffect(() => {
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
          setIsInCart(false);
          return;
        }
        
        // Fetch the entire cart and check if product exists
        const response = await fetch('https://kids-backend.vercel.app/api/cart', { headers });
        const data = await response.json();
        
        if (data.success && data.data && data.data.items) {
          const isProductInCart = data.data.items.some(
            item => item.productId === product._id || item.productId?.toString() === product._id?.toString()
          );
          setIsInCart(isProductInCart);
        } else {
          setIsInCart(false);
        }
      } catch (error) {
        console.error('Error checking cart status:', error);
        setIsInCart(false);
      }
    };
    
    checkCartStatus();
  }, [product._id]);

  const handleWishlist = async (e) => {
    e.stopPropagation();
    setWishlistLoading(true);
    
    const toastId = toast.loading(isWishlisted ? 'Removing from wishlist...' : 'Adding to wishlist...');
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('wishlistSessionId');
      
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;
      
      const response = await fetch('https://kids-backend.vercel.app/api/wishlist', {
        method: 'POST',
        headers,
        body: JSON.stringify({ productId: product._id })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.sessionId && !token) localStorage.setItem('wishlistSessionId', data.sessionId);
        setIsWishlisted(!isWishlisted);
        toast.success(data.message, { id: toastId });
        if (onWishlistUpdate) onWishlistUpdate();
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
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;
      
      const response = await fetch('https://kids-backend.vercel.app/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({ productId: product._id, quantity: 1 })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.sessionId && !token) {
          localStorage.setItem('cartSessionId', data.sessionId);
        }
        setIsInCart(true);
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
      <div className="relative w-full h-28 sm:h-36 md:h-40 overflow-hidden bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6]">
        <motion.img
          src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/300?text=Toy'}
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
        
        {/* Discount Badge - Reduced size for mobile */}
        {discountPercent > 0 && (
          <div className="absolute top-0.5 left-0.5 m-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[6px] sm:text-[8px] md:text-[9px] font-bold px-1 py-0.5 rounded-md shadow-lg z-20 flex items-center gap-0.5">
            <Zap className="w-1 h-1 sm:w-1.5 sm:h-1.5" />
            {discountPercent}% OFF
          </div>
        )}
        
        {/* Promotional Tag Badge - Now visible on mobile too with reduced size */}
        {product.promotion && product.promotion !== '' && (
          <motion.div 
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-0.5 right-0.5 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white text-[5px] sm:text-[6px] md:text-[7px] px-1 py-0.5 m-1  font-semibold rounded-md z-20 flex items-center gap-0.5 shadow-lg"
          >
            <Sparkles className="w-1 h-1 sm:w-1.5 sm:h-1.5" />
            <span className="truncate max-w-[35px] sm:max-w-[50px] md:max-w-[60px]">
              {product.promotion === 'flash-sale' ? 'Flash' :
               product.promotion === 'trending' ? 'Trending' :
               product.promotion === 'featured' ? 'Featured' :
               product.promotion === 'clearance' ? 'Clearance' :
               product.promotion === 'new-arrival' ? 'New' :
               product.promotion === 'bundle-deal' ? 'Bundle' :
               product.promotion === 'limited-stock' ? 'Limited' :
               product.promotion === 'holiday-special' ? 'Holiday' : product.promotion}
            </span>
          </motion.div>
        )}
        
      
       {/* Desktop Action Icons - Top Right Middle (visible on hover) */}
        <div className="absolute top-1/2 -translate-y-1/2 right-2 flex flex-col gap-2 z-30">
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ 
              x: !isMobile && isHovered ? 0 : 40, 
              opacity: !isMobile && isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(`/productDetails?id=${product._id}`, '_blank');
            }}
            className="hidden sm:flex w-7 h-7 rounded-full bg-white shadow-md hover:bg-[#4A8A90] items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
          >
            <Eye className="w-3.5 h-3.5 text-[#4A8A90] hover:text-white transition-colors duration-200" />
          </motion.div>
          
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ 
              x: !isMobile && isHovered ? 0 : 40, 
              opacity: !isMobile && isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.15, ease: "easeOut", delay: 0.03 }}
            onClick={addToCart}
            className="hidden sm:flex w-7 h-7 rounded-full bg-white shadow-md hover:bg-[#4A8A90] items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
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
              x: !isMobile && isHovered ? 0 : 40, 
              opacity: !isMobile && isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.15, ease: "easeOut", delay: 0.06 }}
            onClick={handleWishlist}
            className="hidden sm:flex w-7 h-7 rounded-full bg-white shadow-md hover:bg-red-500 items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
          >
            {wishlistLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-red-500 hover:text-white" />
            ) : (
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-[#4A8A90] hover:text-white'} transition-colors duration-200`} />
            )}
          </motion.div>
        </div>
        
        {/* Mobile Action Icons - Bottom Center (always visible) */}
        <div className={`absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-30 px-2 ${
          isMobile ? 'flex' : 'hidden'
        }`}>
          {/* View Details Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(`/productDetails?id=${product._id}`, '_blank');
            }}
            className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md flex items-center justify-center"
          >
            <Eye className="w-2 h-2 text-[#4A8A90]" />
          </motion.button>
          
          {/* Add to Cart Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={addToCart}
            className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md flex items-center justify-center"
          >
            {cartStatusLoading ? (
              <Loader2 className="w-2 h-2 animate-spin text-[#4A8A90]" />
            ) : isInCart ? (
              <ShoppingCart className="w-2 h-2 text-green-500" />
            ) : (
              <ShoppingCart className="w-2 h-2 text-[#FFB6C1]" />
            )}
          </motion.button>
          
          {/* Wishlist Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleWishlist}
            className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md flex items-center justify-center"
          >
            {wishlistLoading ? (
              <Loader2 className="w-2 h-2 animate-spin text-red-500" />
            ) : (
              <Heart className={`w-2 h-2 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-[#4A8A90]'}`} />
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
        <h3 className="text-[10px] sm:text-xs font-bold text-[#2D3A5C] line-clamp-2 hover:text-[#4A8A90] transition-colors duration-200 mb-1" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }} title={product.productName}>
          {truncateText(product.productName, 15)}
        </h3>
        
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

        <div className="flex items-center justify-between gap-1">
          {product.category?.name && (
            <div className="flex items-center gap-0.5 text-[5px] sm:text-[7px] text-[#8B9DC3]">
              <Package className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
              <span className="truncate max-w-[50px] sm:max-w-[70px]">{product.category.name}</span>
            </div>
          )}
          
          {!product.category?.name && (
            <div className="text-[5px] sm:text-[7px] text-gray-400">🎁 Toy</div>
          )}
          
          <div className="flex-shrink-0">
            {product.stockQuantity > 0 ? (
              <span className="flex items-center gap-0.5 text-[5px] sm:text-[7px] text-green-600 font-medium">
                <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-green-500 rounded-full animate-pulse"></div>
                <span className="hidden sm:inline">In Stock</span>
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

      {/* Add to Cart / View Cart Button - Now visible on mobile too */}
      <div className="block sm:hidden px-1.5 pb-1.5">
        {cartStatusLoading ? (
          <button
            disabled
            className="w-full py-1 text-center text-[8px] font-bold bg-gray-300 text-gray-500 rounded-lg flex items-center justify-center gap-1"
          >
            <Loader2 className="w-2.5 h-2.5 animate-spin" />
            Loading...
          </button>
        ) : isInCart ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push('/cart');
            }}
            className="w-full py-1 text-center text-[8px] font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg flex items-center justify-center gap-1"
          >
            <ShoppingCart className="w-2.5 h-2.5" />
            View Cart
          </button>
        ) : (
          <button
            onClick={addToCart}
            className="w-full py-1 text-center text-[8px] font-bold bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white rounded-lg flex items-center justify-center gap-1"
          >
            <ShoppingCart className="w-2.5 h-2.5" />
            Add to Cart
          </button>
        )}
      </div>

      {/* Desktop Add to Cart Button */}
      <div className="hidden sm:block">
        {cartStatusLoading ? (
          <button
            disabled
            className="w-full py-1 text-center text-[7px] sm:text-[9px] font-bold bg-gray-300 text-gray-500 flex items-center justify-center gap-1"
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
            className="w-full py-1 text-center text-[7px] sm:text-[9px] font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-1"
          >
            <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
            <span className="hidden sm:inline">View in Cart</span>
            <span className="sm:hidden">Cart</span>
          </button>
        ) : (
          <button
            onClick={addToCart}
            className="w-full py-1 text-center text-[7px] sm:text-[9px] font-bold bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white hover:from-[#3A7A80] hover:to-[#5B9399] transition-all duration-200 flex items-center justify-center gap-1"
          >
            <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};
// Main Component
export default function TrendingItems() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState('all');
  const [productsInWishlist, setProductsInWishlist] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [promotionTags, setPromotionTags] = useState([
    { id: 'all', name: 'All Items' }
  ]);
  const productsPerPage = 4;

const getFeaturedContent = (tagId) => {
  const contentMap = {
    'all': {
      title: "Trending ",
      subtitle: " Items",
      description: "super offers",
      discount: "25",
      image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
    },
    'flash-sale': {
      title: "🔥 Flash",
      subtitle: "Sale!",
      description: "up to 50% off",
      discount: "50",
      image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
    },
    'trending': {
      title: "🔥 Trending",
      subtitle: "Now!",
      description: "most popular toys",
      discount: "30",
      image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
    },
    'featured': {
      title: "⭐ Featured",
      subtitle: "Picks",
      description: "staff favorites",
      discount: "20",
      image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
    },
    'clearance': {
      title: "🏷️ Clearance",
      subtitle: "Sale!",
      description: "up to 60% off",
      discount: "60",
      image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
    },
    'new-arrival': {
      title: "✨ New",
      subtitle: "Arrivals",
      description: "just landed!",
      discount: "15",
      image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
    },
    'holiday-special': {
      title: "🎄 Holiday",
      subtitle: "Special",
      description: "festive deals",
      discount: "40",
      image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
    },
    'bundle-deal': {
      title: "📦 Bundle",
      subtitle: "Deal!",
      description: "buy more, save more",
      discount: "35",
      image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
    },
    'limited-stock': {
      title: "⚠️ Limited",
      subtitle: "Stock!",
      description: "hurry up!",
      discount: "25",
      image: "https://i.ibb.co.com/ZRmJL44r/Gemini-Generated-Image-h4smt0h4smt0h4sm-removebg-preview.png"
    }
  };
  
  return contentMap[tagId] || contentMap['all'];
};

// Extract unique promotion tags from products (ONLY from promotion field)
const extractPromotionTags = (productsList) => {
  if (!productsList || productsList.length === 0) return [{ id: 'all', name: 'All Items' }];
  
  // Get unique promotion values from the promotion field only
  const uniquePromotions = [...new Set(
    productsList
      .map(p => p.promotion)
      .filter(promo => promo && promo !== '')
  )];
  
 const promotionMap = {
  'flash-sale': 'Flash Sale',
  'trending': 'Trending',
  'featured': 'Featured',
  'clearance': 'Clearance',
  'holiday-special': 'Holiday Special',
  'bundle-deal': 'Bundle Deal',
  'limited-stock': 'Limited Stock',
  'new-arrival': 'New Arrival'
};
  
  const tags = [{ id: 'all', name: 'All Items' }];
  
  // Add promotion tags only
  uniquePromotions.forEach(promo => {
    tags.push({
      id: promo,
      name: promotionMap[promo] || promo.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
    });
  });
  
  return tags;
};

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://kids-backend.vercel.app/api/products?limit=50');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
        setFilteredProducts(data.data);
        
        // Extract promotion tags from fetched products
        const tags = extractPromotionTags(data.data);
        setPromotionTags(tags);
        
        await checkWishlistStatus(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkWishlistStatus = async (productsList) => {
    if (!productsList || productsList.length === 0) return;
    
    const productIds = productsList.map(p => p._id);
    const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('wishlistSessionId');
    
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    else if (sessionId) headers['x-session-id'] = sessionId;
    else return;
    
    try {
      const response = await fetch('https://kids-backend.vercel.app/api/wishlist/check-status', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds })
      });
      
      const data = await response.json();
      if (data.success) setProductsInWishlist(data.data);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  };

  // Filter products based on active tag
// Filter products based on active tag (filter by promotion field)
useEffect(() => {
  if (activeTag === 'all') {
    setFilteredProducts(products);
  } else {
    // Filter by promotion field for all tags
    setFilteredProducts(products.filter(p => p.promotion === activeTag));
  }
  setCurrentPage(1);
}, [activeTag, products]);

  const refreshWishlistStatus = async () => {
    await checkWishlistStatus(filteredProducts);
  };

  useEffect(() => {
    fetchProducts();
    
    const handleWishlistUpdate = () => refreshWishlistStatus();
    window.addEventListener('wishlist-update', handleWishlistUpdate);
    return () => window.removeEventListener('wishlist-update', handleWishlistUpdate);
  }, []);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(page);
    
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyan-50">
        <div className="container mx-auto px-4 sm:px-8 py-16 flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Wavy Border - Hidden on mobile */}
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="hidden sm:block w-full h-24 bg-cyan-100"
        style={{ display: 'block' }}
      >
        <defs>
          <pattern id="wave" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path
              d="M0,60 Q30,30 60,60 T120,60"
              fill="none"
              stroke="white"
              strokeWidth="40"
            />
            <path
              d="M0,60 Q30,30 60,60 T120,60"
              fill="white"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="1200" height="100" fill="#A8E6E1" />
        <path
          d="M0,40 Q60,20 120,40 T240,40 T360,40 T480,40 T600,40 T720,40 T840,40 T960,40 T1080,40 T1200,40 L1200,100 L0,100 Z"
          fill="white"
        />
        <path
          d="M0,50 Q60,25 120,50 T240,50 T360,50 T480,50 T600,50 T720,50 T840,50 T960,50 T1080,50 T1200,50 L1200,90 L0,90 Z"
          fill="white"
          opacity="0.5"
        />
      </svg>

      {/* Main Content */}
      <div className="bg-white min-h-screen px-3 sm:px-8 pt-4 sm:pt-2 pb-0">
        <div className="container mx-auto max-w-7xl">
          
          {/* Header with Dynamic Promotion Tags - Scrollable on mobile */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-12 gap-3 sm:gap-4">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900">Trending Items</h1>
            <nav className="flex gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide">
              {promotionTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setActiveTag(tag.id)}
                  className={`px-2.5 sm:px-4 py-1 sm:py-2 rounded-full transition-all duration-300 text-[11px] sm:text-sm whitespace-nowrap ${
                    activeTag === tag.id
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Container */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mb-16 items-stretch">
 {/* Left Side - Featured Product Banner (Hidden on mobile, visible on tablet and up) */}
<div className="w-[27.5%] lg:w-[27.5%] flex-shrink-0 h-[380px] hidden lg:block">
  <motion.div 
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white h-full flex flex-col justify-between items-center relative overflow-hidden shadow-xl"
  >
    <div className="absolute inset-0 opacity-20">
      <motion.div 
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
        className="absolute top-4 left-4 text-4xl sm:text-6xl"
      >
        {activeTag === 'flash-sale' ? '⚡' : 
         activeTag === 'trending' ? '🔥' : 
         activeTag === 'new-arrival' ? '✨' : 
         activeTag === 'bundle-deal' ? '📦' :
         activeTag === 'limited-stock' ? '⚠️' : 
         activeTag === 'clearance' ? '🏷️' : 
         activeTag === 'holiday-special' ? '🎄' : '🎲'}
      </motion.div>
      
      <motion.div 
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
        className="absolute bottom-8 right-8 text-3xl sm:text-4xl"
      >
        {activeTag === 'flash-sale' ? '🏃' : 
         activeTag === 'bundle-deal' ? '🎁' :
         activeTag === 'limited-stock' ? '⏰' : 
         activeTag === 'clearance' ? '🏷️' : 
         activeTag === 'holiday-special' ? '🎅' : '🌈'}
      </motion.div>
    </div>
    
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative z-10 text-center flex-1 flex flex-col justify-center items-center"
    >
      <motion.h2 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 150 }}
        className="text-2xl sm:text-3xl lg:text-3xl font-black mb-2 tracking-wide" 
        style={{ fontFamily: "'Fredoka One', 'Comic Neue', 'Comic Sans MS', cursive" }}
      >
        {getFeaturedContent(activeTag).title}
      </motion.h2>
      
      <motion.h3 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 150 }}
        className="text-4xl sm:text-5xl lg:text-5xl font-black mb-4 drop-shadow-lg" 
        style={{ fontFamily: "'Fredoka One', 'Comic Neue', 'Comic Sans MS', cursive" }}
      >
        {getFeaturedContent(activeTag).subtitle}
      </motion.h3>
      
      <motion.p 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="text-sm sm:text-base lg:text-lg mb-2 font-semibold opacity-95" 
        style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
      >
        {getFeaturedContent(activeTag).description}
      </motion.p>
      
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
        className="flex justify-center -mb-9"
      >
        <motion.img
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
          src={getFeaturedContent(activeTag).image}
          alt="Promotion banner"
          className="-mt-10 w-28 sm:w-36 lg:w-40 h-28 sm:h-36 lg:h-48 object-contain mix-blend-lighten drop-shadow-lg cursor-pointer"
        />
      </motion.div>
      
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 180 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white/25 backdrop-blur-md rounded-full px-5 sm:px-7 py-2 sm:py-3 inline-block shadow-lg border border-white/30"
      >
        <motion.span 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, delay: 1, repeat: Infinity, repeatDelay: 3 }}
          className="text-xl sm:text-xl lg:text-2xl font-black" 
          style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}
        >
          {getFeaturedContent(activeTag).discount}%
        </motion.span>
        <span className="text-base sm:text-lg ml-2 font-bold">Off</span>
      </motion.div>
    </motion.div>
  </motion.div>
</div>
            
            
           
           

            {/* Right Side - Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl">
                  <Tag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No products found in this category</p>
                </div>
              ) : (
                <>
                  {/* Grid: 2 columns on mobile, 4 columns on desktop */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-2 lg:grid-cols-4">
                    <AnimatePresence mode="wait">
                      {currentProducts.map((product) => (
                        <ProductGridCard
                          key={product._id}
                          product={product}
                          router={router}
                          onWishlistUpdate={refreshWishlistStatus}
                          isInWishlist={productsInWishlist[product._id] || false}
                        />
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-1 sm:gap-2 mt-6 sm:mt-8">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-1.5 sm:p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <div className="flex gap-0.5 sm:gap-1">
                        {[...Array(totalPages)].map((_, i) => {
                          const pageNum = i + 1;
                          if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                            return (
                              <button
                                key={i}
                                onClick={() => goToPage(pageNum)}
                                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                                  currentPage === pageNum
                                    ? 'bg-teal-500 text-white'
                                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                            return <span key={i} className="text-gray-400 text-xs sm:text-sm">...</span>;
                          }
                          return null;
                        })}
                      </div>
                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-1.5 sm:p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Wavy Border - Hidden on mobile */}
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="hidden sm:block w-full h-16 sm:h-24 bg-[#ECFEFF]"
        style={{ display: 'block' }}
      >
        <path
          d="M0,30 Q60,50 120,30 T240,30 T360,30 T480,30 T600,30 T720,30 T840,30 T960,30 T1080,30 T1200,30 L1200,0 L0,0 Z"
          fill="white"
        />
        <path
          d="M0,25 Q60,45 120,25 T240,25 T360,25 T480,25 T600,25 T720,25 T840,25 T960,25 T1080,25 T1200,25 L1200,0 L0,0 Z"
          fill="white"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}