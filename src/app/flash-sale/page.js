'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
  Package,
  Star,
  Clock,
  Zap,
  Flame,
  Gift,
  Heart,
  AlertCircle
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
  };
  return styles[ageGroup] || 'bg-gray-100 text-gray-600';
};

// Flash Sale Product Card (Similar to ProductGridCard)
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
        <div className="absolute top-1 left-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-lg z-20 flex items-center gap-0.5">
          <Flame className="w-2 h-2" />
          FLASH SALE
        </div>
        
        {/* Discount Badge - Top Right */}
        {discountPercent > 0 && (
          <div className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-lg z-20 flex items-center gap-0.5">
            <Zap className="w-2 h-2" />
            {discountPercent}% OFF
          </div>
        )}
        
        {/* Tag Badge - Bottom Left */}
        {primaryTag && (
          <motion.div 
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`absolute bottom-1 left-1 ${tagStyle} text-[7px] md:text-[8px] px-1.5 py-0.5 font-semibold rounded-md z-20 flex items-center gap-0.5 shadow-lg`}
          >
            <Sparkles className="w-2 h-2" />
            <span className="truncate max-w-[60px]">{primaryTag}</span>
          </motion.div>
        )}
        
        {/* Hover Icons - Appear from Right Side, Fast Animation */}
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
      
      {/* Thumbnail Images - Show 4 images at bottom of main image */}
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
        
        {/* Age Group and Rating Row - Same row */}
        <div className="flex items-center justify-between mb-1.5">
          {/* Age Group Badge */}
          {product.ageGroup ? (
            <div className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-semibold ${getAgeGroupBadge(product.ageGroup)}`}>
              <Users className="w-2 h-2" />
              Ages {product.ageGroup}
            </div>
          ) : (
            <div className="text-[8px] text-gray-400">✨ Flash Deal</div>
          )}
          
          {/* Rating Stars */}
          <div className="flex items-center gap-0.5">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-2.5 h-2.5 ${
                    star <= (product.rating || 5)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[8px] text-gray-500">({product.rating || 5})</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-1.5 mb-1.5">
          <span className="text-sm font-bold text-red-500">
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
          {/* Category */}
          {product.category?.name && (
            <div className="flex items-center gap-0.5 text-[7px] text-[#8B9DC3]">
              <Package className="w-2.5 h-2.5" />
              <span className="truncate max-w-[70px]">{product.category.name}</span>
            </div>
          )}
          
          {!product.category?.name && (
            <div className="text-[7px] text-gray-400">🎁 Toy</div>
          )}
          
          {/* Stock Status */}
          <div className="flex-shrink-0">
            {product.stockQuantity > 0 ? (
              <span className="flex items-center gap-0.5 text-[7px] text-green-600 font-medium">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                <span>In Stock ({product.stockQuantity})</span>
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
          onClick={() => router.push('/cart')}
          className="w-full py-1.5 text-center text-[9px] font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-1"
        >
          <ShoppingCart className="w-2.5 h-2.5" />
          View in Cart
        </button>
      ) : (
        <button
          onClick={addToCart}
          className="w-full py-1.5 text-center text-[9px] font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center gap-1"
        >
          <ShoppingCart className="w-2.5 h-2.5" />
          Add to Cart
        </button>
      )}
    </motion.div>
  );
};

// Main Flash Sale Page Component
export default function FlashSalePage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [productsInCart, setProductsInCart] = useState({});
  const [productsInWishlist, setProductsInWishlist] = useState({});
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  // Timer for flash sale countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

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

  // Refresh cart status on update
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
    
    const handleCartUpdate = () => refreshCartStatus();
    const handleWishlistUpdate = () => {
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
      refreshWishlistStatus();
    };
    
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
      
      {/* Hero Banner Section - Flash Sale Theme */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-pink-500">
        <div className="container mx-auto px-4 max-w-7xl py-6 md:py-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Flame className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-semibold">Limited Time Offer</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
              Flash Sale!
            </h1>
            <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto">
              Grab your favorite toys at unbelievable prices. Offer ends soon!
            </p>
            
            {/* Countdown Timer */}
            <div className="flex justify-center gap-4 mt-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center min-w-[70px]">
                <div className="text-2xl md:text-3xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-[10px] text-white/80">Hours</div>
              </div>
              <div className="text-3xl font-bold text-white">:</div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center min-w-[70px]">
                <div className="text-2xl md:text-3xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-[10px] text-white/80">Minutes</div>
              </div>
              <div className="text-3xl font-bold text-white">:</div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center min-w-[70px]">
                <div className="text-2xl md:text-3xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-[10px] text-white/80">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-[#FFF9F0]">
        <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
          
          {/* View Toggle and Results Count */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-[#8B9DC3]">
              {!loading && (
                <span>Found {products.length} flash sale item{products.length !== 1 ? 's' : ''}</span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
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

          {/* Products Grid/List */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
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
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
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
          ) : (
            <div className="space-y-4">
              {products.map(product => (
                <div key={product._id} className="bg-white rounded-2xl border-2 border-[#FFE0E6] p-4 flex flex-col md:flex-row gap-4 hover:shadow-xl transition-all">
                  {/* List View Card - Similar to ProductListCard but simpler */}
                  <div className="md:w-48 h-48 relative">
                    <img 
                      src={product.images?.[0]?.url || 'https://via.placeholder.com/300'} 
                      alt={product.productName}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      FLASH SALE
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#2D3A5C] mb-2">{product.productName}</h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-xl font-bold text-[#4A8A90]">৳{formatPrice(product.discountPrice || product.regularPrice)}</span>
                      {product.discountPrice && product.discountPrice < product.regularPrice && (
                        <span className="text-sm text-gray-400 line-through">৳{formatPrice(product.regularPrice)}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.shortDescription?.replace(/<[^>]*>/g, '')}</p>
                    <button
                      onClick={() => window.open(`/productDetails?id=${product._id}`, '_blank')}
                      className="px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-full hover:from-red-600 hover:to-orange-600 transition-all shadow-md"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
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