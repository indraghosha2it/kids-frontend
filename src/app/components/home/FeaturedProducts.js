



// 'use client';

// import { Heart } from 'lucide-react';

// export default function TrendingItems() {
//   const products = [
//     {
//       id: 1,
//       name: 'Brown Lother Carriage',
//       price: '$55.90',
//       originalPrice: '$89.00',
//       image: '🚎',
//       rating: 4,
//       discount: '35%',
//     },
//     {
//       id: 2,
//       name: 'The Playtime Excitement!',
//       price: '$10.00',
//       originalPrice: '$19.99',
//       image: '🦜',
//       rating: 4,
//       discount: '50%',
//     },
//     {
//       id: 3,
//       name: 'Ultricies At Torquent Dui',
//       price: '$12.00',
//       originalPrice: '$19.99',
//       image: '🚙',
//       rating: 5,
//       discount: '40%',
//     },
//     {
//       id: 4,
//       name: 'White One-Piece Dress',
//       price: '$19.00',
//       originalPrice: '$26.99',
//       image: '👕',
//       rating: 4,
//       discount: '30%',
//     },
//     {
//       id: 5,
//       name: 'Ultricies At Torquent Dui',
//       price: '$12.00',
//       originalPrice: '$19.99',
//       image: '🦆',
//       rating: 4,
//       discount: '40%',
//     },
//     {
//       id: 6,
//       name: 'Tinci Dunt Pharetra Soda',
//       price: '$30.00',
//       originalPrice: '',
//       image: '🧩',
//       rating: 5,
//       discount: '25%',
//     },
//   ];

//   const StarRating = ({ rating }) => (
//     <div className="flex gap-0.5">
//       {[...Array(5)].map((_, i) => (
//         <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
//           ★
//         </span>
//       ))}
//     </div>
//   );

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
//       <div className="bg-cyan-50 min-h-screen px-8 py-16">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900">Trending Items</h1>
//           <nav className="flex gap-8 text-sm font-medium">
//             <button className="text-teal-600 border-b-2 border-teal-600 pb-1">
//               All Items
//             </button>
//             <button className="text-gray-600 hover:text-gray-900">Kid Toys</button>
//             <button className="text-gray-600 hover:text-gray-900">Outdoor Toy</button>
//             <button className="text-gray-600 hover:text-gray-900">Kid Books</button>
//             <button className="text-gray-600 hover:text-gray-900">Kid Clothing</button>
//           </nav>
//         </div>

//         {/* Content Container */}
//         <div className="flex gap-8 mb-16">
//           {/* Featured Product */}
//           <div className="w-96 flex-shrink-0">
//             <div className="bg-teal-500 rounded-3xl p-8 text-white h-full flex flex-col justify-center items-center relative overflow-hidden">
//               <div className="absolute inset-0 opacity-20">
//                 <div className="absolute top-4 left-4 text-6xl">🎲</div>
//                 <div className="absolute bottom-8 right-8 text-4xl">🌈</div>
//               </div>
//               <div className="relative z-10 text-center">
//                 <h2 className="text-3xl font-bold mb-2">Semana da</h2>
//                 <h3 className="text-5xl font-black mb-8 drop-shadow-lg">Crianças</h3>
//                 <p className="text-lg mb-8">com super ofertas</p>
//                 <div className="flex justify-center">
//                   <img
//                     src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6b5jIeIutxnrT4QI2YwjGil2tjPJQu.png"
//                     alt="Child with shopping bags"
//                     className="w-48 h-48 object-contain mix-blend-lighten"
//                   />
//                 </div>
//                 <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 inline-block">
//                   <span className="text-2xl font-bold">25%</span>
//                   <span className="text-lg ml-2">Off</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Product Grid */}
//           <div className="flex-1 grid grid-cols-3 gap-6">
//             {products.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow"
//               >
//                 {/* Discount Badge */}
//                 <div className="flex justify-between items-start mb-3">
//                   <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                     -{product.discount}
//                   </span>
//                   <button className="text-gray-300 hover:text-red-500 transition-colors">
//                     <Heart size={20} strokeWidth={1.5} />
//                   </button>
//                 </div>

//                 {/* Product Image */}
//                 <div className="bg-cyan-100 rounded-2xl h-32 flex items-center justify-center mb-4">
//                   <span className="text-6xl">{product.image}</span>
//                 </div>

//                 {/* Product Info */}
//                 <h3 className="text-gray-900 font-semibold text-sm mb-2">
//                   {product.name}
//                 </h3>

//                 {/* Price */}
//                 <div className="flex gap-2 mb-2">
//                   <span className="text-teal-600 font-bold text-sm">
//                     {product.price}
//                   </span>
//                   {product.originalPrice && (
//                     <span className="text-gray-400 text-xs line-through">
//                       {product.originalPrice}
//                     </span>
//                   )}
//                 </div>

//                 {/* Rating */}
//                 <div className="mb-4">
//                   <StarRating rating={product.rating} />
//                 </div>

//                 {/* Add to Cart Button */}
//                 <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-lg text-sm transition-colors">
//                   🛒 Add to Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Bottom Wavy Border */}
//       <svg
//         viewBox="0 0 1200 100"
//         preserveAspectRatio="none"
//         className="w-full h-24 bg-white"
//         style={{ display: 'block' }}
//       >
//         <path
//           d="M0,30 Q60,50 120,30 T240,30 T360,30 T480,30 T600,30 T720,30 T840,30 T960,30 T1080,30 T1200,30 L1200,0 L0,0 Z"
//           fill="#A8E6E1"
//         />
//         <path
//           d="M0,25 Q60,45 120,25 T240,25 T360,25 T480,25 T600,25 T720,25 T840,25 T960,25 T1080,25 T1200,25 L1200,0 L0,0 Z"
//           fill="#A8E6E1"
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
  Zap, Sparkles, Tag, Users, Package, Gift, FolderTree 
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Promotion Tags for Filter (shown on top right)
const PROMOTION_TAGS = [
  { id: 'all', name: 'All Items' },
  { id: 'trending', name: 'Trending' },
  { id: 'featured', name: 'Featured' },
  { id: 'flash-sale', name: 'Flash Sale' },
  { id: 'best-seller', name: 'Best Seller' },
  { id: 'new-arrival', name: 'New Arrival' },
];

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

  // Check if product is in cart - FIXED VERSION
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
        // No token and no sessionId, cart is empty
        setIsInCart(false);
        return;
      }
      
      // Fetch the entire cart and check if product exists
      const response = await fetch('http://localhost:5000/api/cart', { headers });
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
      
      const response = await fetch('http://localhost:5000/api/wishlist', {
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
    
    const response = await fetch('http://localhost:5000/api/cart', {
      method: 'POST',
      headers,
      body: JSON.stringify({ productId: product._id, quantity: 1 })
    });
    
    const data = await response.json();
    
    if (data.success) {
      if (data.sessionId && !token) {
        localStorage.setItem('cartSessionId', data.sessionId);
      }
      
      // Update cart status immediately
      setIsInCart(true);
      
      // Also update the cart session ID if needed
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
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-1 left-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-lg z-20 flex items-center gap-0.5">
            <Zap className="w-2 h-2" />
            {discountPercent}% OFF
          </div>
        )}
        
        {/* Promotion Badge */}
        {product.promotion && product.promotion !== '' && !primaryTag && (
          <div className="absolute top-1 left-1 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
            <Sparkles className="w-2 h-2" />
            {product.promotion === 'flash-sale' ? 'Flash Sale' :
             product.promotion === 'trending' ? 'Trending' :
             product.promotion === 'featured' ? 'Featured' :
             product.promotion === 'clearance' ? 'Clearance' : product.promotion}
          </div>
        )}
        
        {/* Tag Badge - Top Right */}
        {primaryTag && (
          <motion.div 
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`absolute top-1 right-1 ${tagStyle} text-[7px] md:text-[8px] px-1.5 py-0.5 font-semibold rounded-md z-20 flex items-center gap-0.5 shadow-lg`}
          >
            <Sparkles className="w-2 h-2" />
            <span className="truncate max-w-[60px]">{primaryTag}</span>
          </motion.div>
        )}
        
        {/* Hover Icons - Appear from Right Side */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
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
      </div>
      
      {/* Thumbnail Images */}
      {hasMultipleImages && (
        <div className="flex justify-center items-center gap-1 py-1.5 bg-[#FFF9F0] border-b border-[#FFE0E6]">
          {productImages.slice(0, 4).map((image, index) => (
            <button
              key={index}
              className={`w-5 h-5 overflow-hidden rounded transition-all duration-200 ${
                activeIndex === index 
                  ? 'ring-1.5 ring-[#4A8A90] ring-offset-0.5 scale-110' 
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
      <div className="p-2">
        {/* Product Name */}
        <h3 className="text-xs font-bold text-[#2D3A5C] line-clamp-2 hover:text-[#4A8A90] transition-colors duration-200 mb-1" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }} title={product.productName}>
          {truncateText(product.productName, 20)}
        </h3>
        
        {/* Age Group and Rating Row */}
        <div className="flex items-center justify-between mb-1.5">
          {product.ageGroup ? (
            <div className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-semibold ${getAgeGroupBadge(product.ageGroup)}`}>
              <Users className="w-2 h-2" />
              Ages {product.ageGroup}
            </div>
          ) : (
            <div className="text-[8px] text-gray-400">✨ Toy</div>
          )}
          
          {product.rating > 0 && (
            <div className="flex items-center gap-0.5">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-2.5 h-2.5 ${
                      star <= Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : star - 0.5 <= product.rating
                        ? 'fill-yellow-400 text-yellow-400 opacity-50'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[8px] text-gray-500">({product.rating})</span>
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-1.5 mb-1.5">
          <span className="text-sm font-bold text-[#4A8A90]">
            ৳{formatPrice(currentPrice)}
          </span>
          {discountPercent > 0 && (
            <>
              <span className="text-[8px] text-gray-400 line-through">
                ৳{formatPrice(originalPrice)}
              </span>
              <span className="text-[7px] font-semibold text-red-500 bg-red-100 px-1 py-0.5 rounded">
                -{discountPercent}%
              </span>
            </>
          )}
        </div>

        {/* Category and Stock Status Row */}
        <div className="flex items-center justify-between gap-1">
          {product.category?.name && (
            <div className="flex items-center gap-0.5 text-[7px] text-[#8B9DC3]">
              <Package className="w-2.5 h-2.5" />
              <span className="truncate max-w-[70px]">{product.category.name}</span>
            </div>
          )}
          
          {!product.category?.name && (
            <div className="text-[7px] text-gray-400">🎁 Toy</div>
          )}
          
          <div className="flex-shrink-0">
            {product.stockQuantity > 0 ? (
              <span className="flex items-center gap-0.5 text-[7px] text-green-600 font-medium">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                <span>In Stock</span>
              </span>
            ) : (
              <span className="flex items-center gap-0.5 text-[7px] text-red-500 font-medium">
                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                <span>Out of Stock</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Add to Cart / View Cart Button */}
          {/* Add to Cart / View Cart Button */}
      {cartStatusLoading ? (
        <button
          disabled
          className="w-full py-1.5 text-center text-[9px] font-bold bg-gray-300 text-gray-500 flex items-center justify-center gap-1"
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
          className="w-full py-1.5 text-center text-[9px] font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-1"
        >
          <ShoppingCart className="w-2.5 h-2.5" />
          View in Cart
        </button>
      ) : (
        <button
          onClick={addToCart}
          className="w-full py-1.5 text-center text-[9px] font-bold bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white hover:from-[#3A7A80] hover:to-[#5B9399] transition-all duration-200 flex items-center justify-center gap-1"
        >
          <ShoppingCart className="w-2.5 h-2.5" />
          Add to Cart
        </button>
      )}
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
  const productsPerPage = 6;

  const featuredContent = {
    title: "Semana da",
    subtitle: "Crianças",
    description: "com super ofertas",
    discount: "25",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6b5jIeIutxnrT4QI2YwjGil2tjPJQu.png"
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/products?limit=50');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
        setFilteredProducts(data.data);
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
      const response = await fetch('http://localhost:5000/api/wishlist/check-status', {
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

  useEffect(() => {
    if (activeTag === 'all') {
      setFilteredProducts(products);
    } else if (activeTag === 'best-seller') {
      setFilteredProducts(products.filter(p => p.tags?.includes('Best Seller')));
    } else if (activeTag === 'new-arrival') {
      setFilteredProducts(products.filter(p => p.tags?.includes('New Arrival')));
    } else {
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyan-50">
        <div className="container mx-auto px-8 py-16 flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Wavy Border */}
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="w-full h-24 bg-cyan-100"
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
      <div className="bg-cyan-50 min-h-screen px-4 sm:px-8 py-8 sm:py-16">
        <div className="container mx-auto max-w-7xl">
          
          {/* Header with Promotion Tags */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Trending Items</h1>
            <nav className="flex gap-2 text-sm font-medium flex-wrap">
              {PROMOTION_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setActiveTag(tag.id)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-xs sm:text-sm ${
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

          {/* Content Container - Left Side (37.5%) / Right Side (62.5%) */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-16">
            
            {/* Left Side - Featured Product Banner */}
              <div className="w-[27.5%] lg:w-[27.5%] flex-shrink-0">
              <div className="bg-teal-500 rounded-3xl p-6 sm:p-8 text-white h-full flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 text-4xl sm:text-6xl">🎲</div>
                  <div className="absolute bottom-8 right-8 text-3xl sm:text-4xl">🌈</div>
                </div>
                <div className="relative z-10 text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">{featuredContent.title}</h2>
                  <h3 className="text-3xl sm:text-5xl font-black mb-6 sm:mb-8 drop-shadow-lg">{featuredContent.subtitle}</h3>
                  <p className="text-base sm:text-lg mb-6 sm:mb-8">{featuredContent.description}</p>
                  <div className="flex justify-center">
                    <img
                      src={featuredContent.image}
                      alt="Child with shopping bags"
                      className="w-32 sm:w-48 h-32 sm:h-48 object-contain mix-blend-lighten"
                    />
                  </div>
                  <div className="mt-6 sm:mt-8 bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 inline-block">
                    <span className="text-xl sm:text-2xl font-bold">{featuredContent.discount}%</span>
                    <span className="text-base sm:text-lg ml-2">Off</span>
                  </div>
                </div>
              </div>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
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
                    <div className="flex justify-center items-center gap-2 mt-8">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <div className="flex gap-1">
                        {[...Array(totalPages)].map((_, i) => {
                          const pageNum = i + 1;
                          if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                            return (
                              <button
                                key={i}
                                onClick={() => goToPage(pageNum)}
                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                                  currentPage === pageNum
                                    ? 'bg-teal-500 text-white'
                                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                            return <span key={i} className="text-gray-400">...</span>;
                          }
                          return null;
                        })}
                      </div>
                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Wavy Border */}
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="w-full h-16 sm:h-24 bg-white"
        style={{ display: 'block' }}
      >
        <path
          d="M0,30 Q60,50 120,30 T240,30 T360,30 T480,30 T600,30 T720,30 T840,30 T960,30 T1080,30 T1200,30 L1200,0 L0,0 Z"
          fill="#A8E6E1"
        />
        <path
          d="M0,25 Q60,45 120,25 T240,25 T360,25 T480,25 T600,25 T720,25 T840,25 T960,25 T1080,25 T1200,25 L1200,0 L0,0 Z"
          fill="#A8E6E1"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}