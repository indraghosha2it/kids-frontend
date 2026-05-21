

// // app/productDetails/ProductDetailsClient.js
// 'use client';

// import { useRouter, useSearchParams } from 'next/navigation';
// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { 
//   ChevronLeft, 
//   ShoppingCart, 
//   MessageCircle, 
//   Check, 
//   Loader2,
//   Package,
//   Users,
//   FileText,
//   Truck,
//   Clock,
//   Maximize2,
//   X,
//   Trash2,
//   ChevronRight,
//   Eye,
//   DollarSign,
//   TrendingUp,
//   Sparkles,
//   BookOpen,
//   Plus,
//   ChevronDown,
//   ChevronUp,
//   CheckCircle,
//   FolderTree,
//   Scale,
//   Wrench,
//   Info as InfoIcon,
//   Leaf,
//   Globe,
//   Award,
//   Zap,
//   Sparkle,
//   Heart,
//   Share2,
//   Shield,
//   ThumbsUp,
//   Palette,
//   Ruler,
//   AlertCircle
// } from 'lucide-react';
// import { toast } from 'sonner';
// import Footer from '../components/layout/Footer';
// import Navbar from '../components/layout/Navbar';
// import AuthModal from '../components/AuthModal';
// import { motion, AnimatePresence } from 'framer-motion';
// import ProductReviews from '../components/product/ProductReviews';
// import MetadataUpdater from './MetadataUpdater';
// import FullscreenModal from '../components/FullscreenModal';
// import WhatsAppButton from '../components/layout/WhatsAppButton';
// import CompleteProfileModal from '../components/CompleteProfileModal';

// // Helper function to format currency
// const formatPrice = (price) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
//   }).format(price || 0);
// };

// // Helper function to capitalize first letter
// const capitalizeFirst = (str) => {
//   if (!str) return '';
//   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
// };

// // Helper function to truncate text
// const truncateText = (text, limit = 30) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// // Helper function to format price without currency symbol for display
// const formatPriceNumber = (price) => {
//   return price?.toFixed(2) || '0.00';
// };

// // Helper function to get unit label
// const getUnitLabel = (orderUnit) => {
//   switch(orderUnit) {
//     case 'kg': return 'kg';
//     case 'ton': return 'MT';
//     default: return 'pcs';
//   }
// };
// const formatBulkRange = (range) => {
//   if (!range) return '';
//   if (range.includes('-')) {
//     const [min, max] = range.split('-');
//     return `${min}+ pcs`;
//   }
//   if (range.includes('+')) {
//     return `${range.replace('+', '')}+ pcs`;
//   }
//   return range;
// };

// const getUnitFullLabel = (orderUnit) => {
//   switch(orderUnit) {
//     case 'kg': return 'Kilograms';
//     case 'ton': return 'Metric Tons';
//     default: return 'Pieces';
//   }
// };

// // Rich Text Content Renderer Component
// const RichTextContent = ({ content, className = '' }) => {
//   if (!content) return <p className="text-gray-500 italic">No content available.</p>;

//   return (
//     <div 
//       className={`prose prose-sm max-w-none rich-text-content ${className}`}
//       dangerouslySetInnerHTML={{ __html: content }}
//     />
//   );
// };

// // Image Gallery Component - Simple Professional Zoom
// const ImageGallery = ({ images = [], productName }) => {
//   const [mainImage, setMainImage] = useState(0);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState({});
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

//   const preloadImage = (src) => {
//     const img = new Image();
//     img.src = src;
//   };

//   useEffect(() => {
//     if (images.length > 0) {
//       const nextIndex = (mainImage + 1) % images.length;
//       const prevIndex = (mainImage - 1 + images.length) % images.length;
      
//       if (images[nextIndex]?.url) preloadImage(images[nextIndex].url);
//       if (images[prevIndex]?.url) preloadImage(images[prevIndex].url);
//     }
//   }, [mainImage, images]);

//   const handleImageChange = (idx) => {
//     if (idx === mainImage) return;
    
//     setIsTransitioning(true);
//     setIsZoomed(false);
//     setMainImage(idx);
//     setImageLoaded(prev => ({ ...prev, [idx]: false }));
//   };

//   const handleImageLoad = (idx) => {
//     setImageLoaded(prev => ({ ...prev, [idx]: true }));
//     setTimeout(() => {
//       setIsTransitioning(false);
//     }, 100);
//   };

//   const handleMouseMove = (e) => {
//     if (!isZoomed) return;
    
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;
    
//     setZoomPosition({
//       x: Math.min(Math.max(x, 0), 100),
//       y: Math.min(Math.max(y, 0), 100)
//     });
//   };

//   return (
//     <>
//       <div className="sticky top-24">
//         <div className="flex gap-3">
//           {/* Thumbnails */}
//           <div className="flex flex-col gap-2 overflow-y-auto max-h-[450px] pr-1">
//             {images.map((image, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handleImageChange(idx)}
//                 onMouseEnter={() => {
//                   preloadImage(image.url);
//                   handleImageChange(idx);
//                 }}
//                 className={`relative group w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
//                   mainImage === idx 
//                     ? 'border-[#6B4F3A] shadow-md ring-1 ring-[#6B4F3A]/20' 
//                     : 'border-gray-200 hover:border-gray-300'
//                 }`}
//               >
//                 <img
//                   src={image.url}
//                   alt={`${productName} - ${idx + 1}`}
//                   className="w-full h-full object-cover"
//                   loading="lazy"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
//                   }}
//                 />
//                 {mainImage === idx && (
//                   <div className="absolute inset-0 bg-[#6B4F3A]/15" />
//                 )}
//               </button>
//             ))}
//           </div>

//           {/* Main Image Container */}
//           <div 
//             className="flex-1 relative bg-gray-100 rounded-2xl overflow-hidden cursor-crosshair"
//             style={{ height: '480px' }}
//             onMouseEnter={() => setIsZoomed(true)}
//             onMouseLeave={() => setIsZoomed(false)}
//             onMouseMove={handleMouseMove}
//           >
//             {(isTransitioning || !imageLoaded[mainImage]) && (
//               <div className="absolute inset-0 bg-gray-200 animate-pulse z-10">
//                 <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
//               </div>
//             )}
            
//             <div className="relative w-full h-full overflow-hidden">
//               <img
//                 key={mainImage}
//                 src={images[mainImage]?.url || images[0]?.url || 'https://via.placeholder.com/800x800?text=No+Image'}
//                 alt={`${productName} - Main view`}
//                 className={`w-full h-full object-contain transition-opacity duration-300 ${
//                   imageLoaded[mainImage] ? 'opacity-100' : 'opacity-0'
//                 }`}
//                 style={{
//                   transform: isZoomed ? 'scale(2.2)' : 'scale(1)',
//                   transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                   transition: 'transform 0.15s ease-out'
//                 }}
//                 onLoad={() => handleImageLoad(mainImage)}
//                 loading={mainImage === 0 ? "eager" : "lazy"}
//                 fetchPriority={mainImage === 0 ? "high" : "auto"}
//                 decoding="async"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = 'https://via.placeholder.com/800x800?text=Image+Not+Available';
//                   handleImageLoad(mainImage);
//                 }}
//               />
//             </div>

//             {/* Zoom Indicator Overlay */}
//             {!isZoomed && (
//               <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center pointer-events-none">
//                 <div className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
//                   </svg>
//                   <span>Hover to zoom</span>
//                 </div>
//               </div>
//             )}

//             {/* Controls */}
//             <div className="absolute bottom-3 right-3 flex gap-2 z-20">
//               <button
//                 onClick={() => setIsFullscreen(true)}
//                 className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all hover:scale-105"
//                 aria-label="View fullscreen"
//               >
//                 <Maximize2 className="w-4 h-4 text-gray-700" />
//               </button>
//             </div>

//             <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full z-20">
//               {mainImage + 1} / {images.length}
//             </div>
//           </div>
//         </div>
//       </div>

//       <FullscreenModal
//         isOpen={isFullscreen}
//         onClose={() => setIsFullscreen(false)}
//         images={images}
//         currentIndex={mainImage}
//         onImageChange={handleImageChange}
//         productName={productName}
//       />
//     </>
//   );
// };

// // Color Selector Component
// const ColorSelector = ({ colors, selectedColor, onChange }) => {
//   return (
//     <div className="flex flex-wrap gap-3">
//       {colors.map((color, index) => (
//         <button
//           key={index}
//           onClick={() => onChange(color)}
//           className={`group relative flex flex-col items-center gap-1 transition-all`}
//           title={color.code}
//         >
//           <div
//             className={`w-10 h-10 rounded-full border-2 transition-all ${
//               selectedColor?.code === color.code
//                 ? 'border-[#6B4F3A] ring-2 ring-[#6B4F3A]/30 scale-110'
//                 : 'border-white group-hover:scale-105'
//             }`}
//             style={{ backgroundColor: color.code }}
//           />
          
//         </button>
//       ))}
//     </div>
//   );
// };

// // Bulk Pricing Table Component - Compact & Responsive with Savings Column
// const BulkPricingTable = ({ pricing = [], unitPrice, moq, orderUnit = 'piece' }) => {
//   const [showAllTiers, setShowAllTiers] = useState(false);
//   const unitLabel = getUnitLabel(orderUnit);
//   const unitFullLabel = getUnitFullLabel(orderUnit);
  
//   const pricingData = pricing.length > 0 ? pricing : [{ range: `${moq}+`, price: unitPrice }];
//   const displayedTiers = showAllTiers ? pricingData : pricingData.slice(0, 3);
//   const hasMoreTiers = pricingData.length > 3;

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden w-full">
//       <div className="px-3 py-2 bg-[#6B4F3A]">
//         <h3 className="text-white font-semibold text-xs flex items-center gap-1.5">
//           <Package className="w-3.5 h-3.5" />
//           <span className="truncate">Bulk Pricing - {unitFullLabel}</span>
//         </h3>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="text-left py-1.5 px-2 text-[10px] font-semibold text-gray-700 w-2/5">Qty ({unitLabel})</th>
//               <th className="text-left py-1.5 px-2 text-[10px] font-semibold text-gray-700 w-1/3">Price</th>
//               <th className="text-left py-1.5 px-2 text-[10px] font-semibold text-gray-700 w-1/3">Save</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {displayedTiers.map((tier, index) => {
//               const tierPrice = tier.price || unitPrice;
//               const savings = unitPrice - tierPrice;
//               const savingsPercent = unitPrice > 0 ? ((savings / unitPrice) * 100).toFixed(0) : 0;
//               const isBestValue = index === pricingData.length - 1 && pricingData.length > 1;

//               return (
//                 <tr key={index} className={`${isBestValue ? 'bg-[#fcfaf7]' : 'hover:bg-gray-50'} transition-colors`}>
//                   <td className="py-1.5 px-2">
//                     <div className="flex items-center gap-1 flex-wrap">
//                       <span className="text-xs font-medium text-gray-900">
//                         {tier.range || `${moq}+`}
//                       </span>
//                       {isBestValue && (
//                         <span className="px-1 py-0.5 bg-[#6B4F3A] text-white text-[8px] font-medium rounded-full whitespace-nowrap">
//                           Best
//                         </span>
//                       )}
//                     </div>
//                   </td>
//                   <td className="py-1.5 px-2">
//                     <span className="font-semibold text-[#6B4F3A] text-xs">
//                       {formatPrice(tierPrice)}
//                     </span>
//                   </td>
//                   <td className="py-1.5 px-2">
//                     {savings > 0 ? (
//                       <div className="flex items-center gap-0.5">
//                         <span className="text-green-600 text-[10px] font-medium">
//                           {formatPrice(savings)}
//                         </span>
//                         <span className="text-green-500 text-[8px]">
//                           ({savingsPercent}%)
//                         </span>
//                       </div>
//                     ) : (
//                       <span className="text-gray-400 text-[9px]">—</span>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//       {hasMoreTiers && (
//         <div className="p-1 border-t border-gray-100">
//           <button 
//             onClick={() => setShowAllTiers(!showAllTiers)} 
//             className="text-[9px] text-[#6B4F3A] hover:underline w-full text-center py-1 flex items-center justify-center gap-1"
//           >
//             {showAllTiers ? (
//               <>Show Less ↑</>
//             ) : (
//               <>Show {pricingData.length - 3} more ↓</>
//             )}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // Customization Options Component
// const CustomizationOptions = ({ options }) => {
//   if (!options || options.length === 0) return null;
  
//   return (
//     <div className="bg-[#F5E6D3] rounded-xl border border-[#6B4F3A]/20 overflow-hidden">
//       <div className="px-4 py-2.5 bg-[#6B4F3A]/20 border-b border-[#6B4F3A]/20">
//         <h3 className="font-semibold text-[#6B4F3A] flex items-center gap-2 text-sm">
//           <Wrench className="w-4 h-4 text-[#6B4F3A]" />
//           Customization Options
//         </h3>
//       </div>
//       <div className="p-3 space-y-2">
//         {options.map((option, idx) => (
//           <div key={idx} className="flex items-start gap-2 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
//             <div className="w-6 h-6 rounded-lg bg-[#6B4F3A]/10 flex items-center justify-center flex-shrink-0">
//               <Wrench className="w-3 h-3 text-[#6B4F3A]" />
//             </div>
//             <div>
//               <p className="text-xs font-semibold text-gray-900">{option.title}</p>
//               <p className="text-[11px] text-gray-600">{option.value}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const InquiryItem = ({ item, index, product, onUpdate, onRemove, showRemove, onColorQuantityChange }) => {
//   const unitLabel = getUnitLabel(product.orderUnit);
//   const hasSizes = product.sizes?.filter(s => s.trim()).length > 0;
  
//   const [quantity, setQuantity] = useState(item.quantity || 0);
//   const [sizeQuantities, setSizeQuantities] = useState(item.sizeQuantities || {});
//   const [colorUnitPrice, setColorUnitPrice] = useState(item.unitPrice || product.pricePerUnit);

//   useEffect(() => {
//     if (item.sizeQuantities) setSizeQuantities(item.sizeQuantities);
//     if (item.quantity !== undefined) setQuantity(item.quantity);
//     if (item.unitPrice) setColorUnitPrice(item.unitPrice);
//   }, [item.sizeQuantities, item.quantity, item.unitPrice]);

//   const getPriceForQuantity = (qty) => {
//     if (!product.quantityBasedPricing?.length) return product.pricePerUnit;
//     const sortedTiers = [...product.quantityBasedPricing].sort((a, b) => parseInt(a.range.split('-')[0]) - parseInt(b.range.split('-')[0]));
//     for (const tier of sortedTiers) {
//       const range = tier.range;
//       if (range.includes('-')) {
//         const [min, max] = range.split('-').map(Number);
//         if (qty >= min && qty <= max) return tier.price;
//       } else if (range.includes('+') && qty >= parseInt(range.replace('+', ''))) return tier.price;
//     }
//     return product.pricePerUnit;
//   };

//   const handleQuantityChange = (newQuantity) => {
//     const qty = parseInt(newQuantity) || 0;
//     setQuantity(qty);
//     const price = getPriceForQuantity(qty);
//     setColorUnitPrice(price);
//     onUpdate(item.id, 'quantity', qty);
//     onUpdate(item.id, 'unitPrice', price);
//     onColorQuantityChange?.(item.id, qty, price);
//   };

//   const handleSizeQuantityChange = (size, qtyValue) => {
//     const newQuantities = { ...sizeQuantities, [size]: qtyValue };
//     setSizeQuantities(newQuantities);
//     const totalQty = Object.values(newQuantities).reduce((sum, q) => sum + (q || 0), 0);
//     setQuantity(totalQty);
//     const price = getPriceForQuantity(totalQty);
//     setColorUnitPrice(price);
//     onUpdate(item.id, 'sizeQuantities', newQuantities);
//     onUpdate(item.id, 'quantity', totalQty);
//     onUpdate(item.id, 'unitPrice', price);
//     onColorQuantityChange?.(item.id, totalQty, price);
//   };

//   const totalQuantity = hasSizes ? Object.values(sizeQuantities).reduce((sum, q) => sum + (q || 0), 0) : quantity;
//   const meetsMOQ = totalQuantity >= product.moq;

//   // Get all available sizes (no slice limit)
//   const allSizes = product.sizes?.filter(s => s.trim()) || [];

//   return (
//     <div className={`bg-white rounded-lg p-3 border-2 transition-all ${meetsMOQ ? 'border-green-200 bg-green-50/30' : 'border-yellow-200 bg-yellow-50/30'}`}>
//       <div className="flex items-center justify-between mb-2">
//         <div className="flex items-center gap-2">
//           <div 
//             className="w-10 h-10 rounded-xl shadow-md border-2 border-white"
//             style={{ backgroundColor: item.color?.code || '#CCCCCC' }}
//           />
//           <div>
//             <p className="text-xs text-gray-500">Color {index + 1}</p>
//           </div>
//         </div>
//         {showRemove && (
//           <button onClick={() => onRemove(item.id)} className="p-1 hover:bg-red-100 rounded">
//             <Trash2 className="w-3.5 h-3.5 text-red-500" />
//           </button>
//         )}
//       </div>

//       {hasSizes ? (
//         <div className="grid grid-cols-2 gap-2 mb-2">
//           {/* Show ALL available sizes - removed .slice(0, 4) */}
//           {allSizes.map((size) => (
//             <div key={size}>
//               <label className="block text-[10px] text-gray-500 mb-0.5">{size}</label>
//               <input type="number" min="0" value={sizeQuantities[size] || ''} 
//               onChange={(e) => handleSizeQuantityChange(size, parseInt(e.target.value) || 0)}
//             onWheel={(e) => e.target.blur()}
//                className="w-full px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-[#6B4F3A]" placeholder="0" />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="mb-2">
//           <input type="number" min="0" value={quantity || ''}
//            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)} 
//         onWheel={(e) => e.target.blur()}
//            className="w-full px-3 py-2 text-sm border rounded focus:ring-1 focus:ring-[#6B4F3A]" placeholder={`Quantity (${unitLabel})`} />
//         </div>
//       )}

//       <div className="pt-2 border-t border-gray-100 flex justify-between text-xs">
//         <div>
//           <p className="text-gray-500">Total</p>
//           <p className="font-bold text-[#6B4F3A]">{totalQuantity} {unitLabel}</p>
//         </div>
//         <div className="text-right">
//           <p className="text-gray-500">Price</p>
//           <p className="font-semibold">{formatPrice(colorUnitPrice * totalQuantity)}</p>
//         </div>
//       </div>
//       {!meetsMOQ && totalQuantity > 0 && (
//         <p className="text-[10px] text-amber-600 mt-1">Need {product.moq - totalQuantity} more {unitLabel}</p>
//       )}
//     </div>
//   );
// };

// // Helper for tag styling
// const getTagStyles = (tag) => {
//   const styles = {
//     'Top Ranking': 'bg-amber-500',
//     'New Arrival': 'bg-blue-500',
//     'Top Deal': 'bg-green-500',
//     'Best Seller': 'bg-purple-500',
//     'Summer Collection': 'bg-yellow-500',
//     'Winter Collection': 'bg-indigo-500',
//     'Limited Edition': 'bg-red-500',
//     'Trending': 'bg-pink-500',
//   };
//   return styles[tag] || 'bg-gray-500';
// };

// const getTargetedAudienceStyle = (audience) => {
//   const styles = {
//     'ladies': 'bg-pink-500',
//     'gents': 'bg-blue-500',
//     'kids': 'bg-green-500',
//     'unisex': 'bg-purple-500',
//   };
//   return styles[audience] || 'bg-gray-500';
// };

// // RelatedProductCard Component
// // RelatedProductCard Component - Updated to match ProductGridCard design
// const RelatedProductCard = ({ product }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
  
//   const productImages = product.images || [];
//   const hasMultipleImages = productImages.length > 1;
//   const firstTier = product.quantityBasedPricing?.[0];
//   const primaryTag = product.tags?.[0];
//   const tagStyle = primaryTag ? getTagStyles(primaryTag) : '';
//   const audienceStyle = product.targetedCustomer ? getTargetedAudienceStyle(product.targetedCustomer) : '';
//   const unitLabel = getUnitLabel(product.orderUnit);
//   const bulkRangeDisplay = firstTier ? formatBulkRange(firstTier.range) : '';

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

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
//       className="group bg-white border border-[#E5D5C0] hover:border-[#6B4F3A]/30 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
//       onClick={() => {
//         if (isMobile) {
//           window.location.href = `/productDetails?id=${product._id}`;
//         } else {
//           window.open(`/productDetails?id=${product._id}`, '_blank');
//         }
//       }}
//     >
//       {/* Image Container */}
//       <div className="relative w-full h-32 sm:h-36 md:h-40 lg:h-44 overflow-hidden bg-white">
//         <motion.img
//           src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
//           alt={product.productName}
//           className="w-full h-full object-contain p-2"
//           whileHover={{ scale: 1.05 }}
//           transition={{ duration: 0.4 }}
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500';
//           }}
//           loading="lazy"
//         />
        
//         {/* Top Right Action Icons - Always visible on mobile */}
//         <motion.div 
//           className="absolute top-2 right-2 flex flex-col gap-1.5 z-30"
//           initial={{ opacity: 0, x: 10 }}
//           animate={{ 
//             opacity: isMobile ? 1 : (isHovered ? 1 : 0), 
//             x: isMobile ? 0 : (isHovered ? 0 : 10) 
//           }}
//           transition={{ duration: 0.2 }}
//         >
//           <div
//             onClick={(e) => {
//               e.stopPropagation();
//               window.open(`/productDetails?id=${product._id}`, '_blank');
//             }}
//             className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center border border-gray-300 bg-white/80 hover:bg-white transition-all duration-200 cursor-pointer"
//           >
//             <Eye className="w-3 h-3 md:w-3.5 md:h-3.5 text-gray-700" />
//           </div>
          
//           <div
//             onClick={(e) => {
//               e.stopPropagation();
//               window.open(`/productDetails?id=${product._id}#inquiry-form`, '_blank');
//             }}
//             className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center border border-gray-300 bg-white/80 hover:bg-white transition-all duration-200 cursor-pointer"
//           >
//             <ShoppingCart className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#6B4F3A]" />
//           </div>
//         </motion.div>

//         {/* Tag Badge - Top Left */}
//         {primaryTag && (
//           <motion.div 
//             initial={{ x: -10, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className={`absolute top-2 left-2 ${tagStyle} text-[7px] md:text-[9px] px-1.5 py-0.5 font-semibold z-20 flex items-center gap-1 shadow-lg`}
//           >
//             <span className="truncate">{primaryTag}</span>
//           </motion.div>
//         )}
//       </div>
      
//       {/* Thumbnail Images */}
//       {hasMultipleImages && (
//         <div className="flex justify-center items-center gap-1 py-1">
//           {productImages.slice(0, 4).map((image, index) => (
//             <button
//               key={index}
//               className={`w-5 h-5 md:w-6 md:h-6 overflow-hidden transition-all duration-200 ${
//                 activeIndex === index 
//                   ? 'border-2 border-[#6B4F3A]' 
//                   : 'border border-gray-200 opacity-60 hover:opacity-100'
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
//       <div className="p-2 md:p-3">
//         {/* Product Name */}
//         <h3 className="text-[11px] md:text-sm font-semibold text-gray-900 truncate hover:text-[#6B4F3A] transition-colors" style={{ fontFamily: 'Playfair Display, serif' }} title={product.productName}>
//           {truncateText(product.productName, 25)}
//         </h3>

//         {/* Starting Price and MOQ Row */}
//         <div className="flex items-center justify-between mb-2">
//           <div>
//             <span className="text-[7px] md:text-[8px] text-[#8B7355]">Starting from</span>
//             <p className="text-sm md:text-base font-bold text-[#6B4F3A] leading-tight">
//               ${formatPrice(product.pricePerUnit)}
//               <span className="text-[8px] md:text-[9px] font-normal text-[#A8947A] ml-0.5">/{unitLabel}</span>
//             </p>
//           </div>
//           <div className="text-right">
//             <span className="text-[7px] md:text-[8px] text-[#8B7355]">MOQ</span>
//             <p className="text-[10px] md:text-xs font-semibold text-gray-700">{product.moq} {unitLabel}</p>
//           </div>
//         </div>

//         {/* Category, Targeted Audience, First Bulk Price */}
//         <div className="flex items-center justify-start flex-wrap gap-1.5 mb-1.5">
//           {product.category?.name && (
//             <div className="flex items-center gap-0.5">
//               <Package className="w-2.5 h-2.5 text-[#A8947A]" />
//               <span className="text-[7px] md:text-[8px] text-gray-500">
//                 {truncateText(product.category.name, 10)}
//               </span>
//             </div>
//           )}

//           {product.targetedCustomer && (
//             <div className={`flex items-center gap-0.5 px-1 py-0.5 ${audienceStyle} text-[6px] md:text-[7px]`}>
//               <Users className="w-2 h-2" />
//               <span className="capitalize">
//                 {product.targetedCustomer === 'ladies' ? 'Ladies' : 
//                  product.targetedCustomer === 'gents' ? 'Gents' :
//                  product.targetedCustomer === 'kids' ? 'Kids' : product.targetedCustomer}
//               </span>
//             </div>
//           )}

//           {firstTier && (
//             <div className="flex items-center gap-0.5 px-1 py-0.5 bg-[#F5E6D3]/50 rounded border border-[#E5D5C0]">
//               <span className="text-[6px] text-[#8B7355]">Bulk:</span>
//               <span className="text-[7px] font-medium text-[#6B4F3A]">
//                 ${formatPrice(firstTier.price)}/{unitLabel === 'pcs' ? 'pc' : unitLabel}
//               </span>
//               <span className="text-[6px] text-[#A8947A]">({bulkRangeDisplay})</span>
//             </div>
//           )}
//         </div>

//         {/* Color Dots */}
//         {product.colors && product.colors.length > 0 && (
//           <div className="flex items-center gap-0.5 mb-1.5">
//             <Palette className="w-2.5 h-2.5 text-[#A8947A]" />
//             <div className="flex items-center gap-0.5">
//               {product.colors.slice(0, 5).map((color, i) => (
//                 <div
//                   key={i}
//                   className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-gray-200 shadow-sm"
//                   style={{ backgroundColor: color.code }}
//                   title={color.name || color.code}
//                 />
//               ))}
//               {product.colors.length > 5 && (
//                 <span className="text-[6px] text-[#A8947A] ml-0.5">+{product.colors.length - 5}</span>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add to Inquiry Button */}
//    {/* Add to Inquiry Button */}
// <button
//   onClick={(e) => {
//     e.stopPropagation();
//     window.location.href = `/productDetails?id=${product._id}#inquiry-form`;
//   }}
//   className="w-full py-1.5 md:py-2 text-center text-[9px] md:text-[10px] font-medium text-white bg-[#6B4F3A] hover:bg-[#8B6B51] transition-colors flex items-center justify-center gap-1.5"
// >
//   <ShoppingCart className="w-3 h-3 md:w-3.5 md:h-3.5" />
//   Add to Inquiry
// </button>
//     </motion.div>
//   );
// };

// // Main Product Content Component
// export default function ProductDetailsClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get('id');

//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [inquiryItems, setInquiryItems] = useState([]);
//   const [totalQuantity, setTotalQuantity] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [specialInstructions, setSpecialInstructions] = useState('');
//   const [activeTab, setActiveTab] = useState('description');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
  
//   // Auth state
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [authModalTab, setAuthModalTab] = useState('login');
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [isProfileComplete, setIsProfileComplete] = useState(false);
//   const [pendingInquiryAction, setPendingInquiryAction] = useState(null);
//   const [isInCart, setIsInCart] = useState(false);

//   const getItemsPerView = () => {
//     if (typeof window !== 'undefined') {
//       if (window.innerWidth < 640) return 2;
//       if (window.innerWidth < 1024) return 3;
//       return 4;
//     }
//     return 4;
//   };

//   useEffect(() => {
//     if (relatedProducts.length <= getItemsPerView()) return;
//     const interval = setInterval(() => {
//       if (!isHovered) setCurrentIndex(prev => prev + getItemsPerView() >= relatedProducts.length ? 0 : prev + getItemsPerView());
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [isHovered, relatedProducts.length]);

//   const handleNext = () => setCurrentIndex(prev => prev + getItemsPerView() >= relatedProducts.length ? 0 : prev + getItemsPerView());
//   const handlePrev = () => setCurrentIndex(prev => prev - getItemsPerView() < 0 ? Math.max(relatedProducts.length - getItemsPerView(), 0) : prev - getItemsPerView());

//   useEffect(() => {
//     if (window.location.hash === '#inquiry-form') {
//       setTimeout(() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 500);
//     }
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
//     if (token && userData) {
//       setIsAuthenticated(true);
//       setUser(JSON.parse(userData));
//     }
//   }, []);

//   const checkProfileCompleteness = async () => {
//     if (!isAuthenticated) return false;
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/profile-status', {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setIsProfileComplete(data.data.isComplete);
//         return data.data.isComplete;
//       }
//       return false;
//     } catch (error) { return false; }
//   };

//   const fetchProduct = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`);
//       const data = await response.json();
//       if (data.success) {
//         setProduct(data.data);
//         if (data.data.colors?.length) setSelectedColor(data.data.colors[0]);
//         setInquiryItems([]);
//         fetchRelatedProducts(data.data.category?._id || data.data.category, data.data.targetedCustomer);
//       } else toast.error('Product not found');
//     } catch (error) { toast.error('Failed to load product'); }
//     finally { setLoading(false); }
//   };

//   // Add this to your ProductDetailsClient.js to track recently viewed products

// // Add this function
// const addToRecentlyViewed = (product) => {
//   if (typeof window === 'undefined') return;
//   try {
//     const recent = localStorage.getItem('recentlyViewed');
//     let recentIds = recent ? JSON.parse(recent) : [];
    
//     // Remove if already exists
//     recentIds = recentIds.filter(id => id !== product._id);
    
//     // Add to beginning
//     recentIds.unshift(product._id);
    
//     // Keep only last 10
//     recentIds = recentIds.slice(0, 10);
    
//     localStorage.setItem('recentlyViewed', JSON.stringify(recentIds));
//   } catch (error) {
//     console.error('Error saving to recently viewed:', error);
//   }
// };

// // Call this function when you fetch the product
// useEffect(() => {
//   if (product && product._id) {
//     addToRecentlyViewed(product);
//   }
// }, [product]);

//   const fetchRelatedProducts = async (categoryId, targetedCustomer) => {
//     try {
//       const params = new URLSearchParams({ limit: 12 });
//       if (categoryId) params.append('category', categoryId);
//       if (targetedCustomer) params.append('targetedCustomer', targetedCustomer);
//       const response = await fetch(`http://localhost:5000/api/products?${params}`);
//       const data = await response.json();
//       if (data.success) setRelatedProducts((data.data || []).filter(p => p._id !== productId).sort(() => 0.5 - Math.random()).slice(0, 12));
//     } catch (error) { console.error(error); }
//   };

//   const checkIfInCart = async () => {
//     if (!isAuthenticated || !product) return;
//     try {
//       const response = await fetch('http://localhost:5000/api/inquiry-cart', {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//       });
//       const data = await response.json();
//       if (data.success && data.data.items) {
//         const existingItem = data.data.items.find(item => item.productId === product._id);
//         setIsInCart(!!existingItem);
//       }
//     } catch (error) { console.error(error); }
//   };

//   useEffect(() => { if (productId) fetchProduct(); }, [productId]);
//   useEffect(() => { if (product && isAuthenticated) checkIfInCart(); }, [product, isAuthenticated]);

//   useEffect(() => {
//     const totalQty = inquiryItems.reduce((sum, i) => sum + (i.quantity || 0), 0);
//     setTotalQuantity(totalQty);
//     const total = inquiryItems.reduce((sum, i) => sum + ((i.unitPrice || product?.pricePerUnit) * (i.quantity || 0)), 0);
//     setTotalPrice(total);
//   }, [inquiryItems, product]);

//   const getPriceForQuantity = (quantity) => {
//     if (!product?.quantityBasedPricing?.length) return product?.pricePerUnit || 0;
//     const tiers = [...product.quantityBasedPricing].sort((a, b) => parseInt(a.range.split('-')[0]) - parseInt(b.range.split('-')[0]));
//     for (const tier of tiers) {
//       if (tier.range.includes('-')) {
//         const [min, max] = tier.range.split('-').map(Number);
//         if (quantity >= min && quantity <= max) return tier.price;
//       } else if (tier.range.includes('+') && quantity >= parseInt(tier.range.replace('+', ''))) return tier.price;
//     }
//     return product.pricePerUnit;
//   };

//   const handleAddItem = () => {
//     if (!selectedColor) return toast.error('Select a color');
//     if (inquiryItems.some(i => i.color?.code === selectedColor.code)) return toast.error(`${selectedColor.code} already added`);
    
//     const hasSizes = product.sizes?.filter(s => s.trim()).length > 0;
//     const newItem = { id: Date.now(), color: selectedColor, quantity: 0, unitPrice: product.pricePerUnit };
//     if (hasSizes) {
//       const initial = {};
//       product.sizes.filter(s => s.trim()).forEach(s => initial[s] = 0);
//       newItem.sizeQuantities = initial;
//     }
//     setInquiryItems(prev => [...prev, newItem]);
//     toast.success(`${selectedColor.code} added`);
//   };

//   const handleUpdateItem = (id, field, value) => setInquiryItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
//   const handleRemoveItem = (id) => setInquiryItems(prev => prev.filter(i => i.id !== id));
//   const handleColorQuantityChange = (id, qty, price) => setInquiryItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty, unitPrice: price } : i));

//   const handleSubmitInquiry = async () => {
//     if (!isAuthenticated) { setAuthModalTab('login'); setShowAuthModal(true); toast.info('Please login'); return; }
//     if (!await checkProfileCompleteness()) { setPendingInquiryAction('add-to-cart'); setShowProfileModal(true); return; }
//     if (!inquiryItems.length) return toast.error('Add at least one color');
    
//     const invalid = inquiryItems.filter(i => (i.quantity || 0) > 0 && (i.quantity || 0) < product.moq);
//     if (invalid.length) return toast.error(`Each color must meet MOQ of ${product.moq} ${getUnitLabel(product.orderUnit)}`);
//     if (!inquiryItems.some(i => (i.quantity || 0) > 0)) return toast.error('Enter quantities');

//     try {
//       const colorsData = inquiryItems.map(i => ({
//         color: { code: i.color.code, name: i.color.code },
//         sizeQuantities: i.sizeQuantities || {},
//         totalQuantity: i.quantity || 0,
//         unitPrice: getPriceForQuantity(i.quantity || 0),
//         unit: getUnitLabel(product.orderUnit)
//       })).filter(c => c.totalQuantity > 0);

//       const response = await fetch('http://localhost:5000/api/inquiry-cart/add', {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           productId: product._id, productName: product.productName, orderUnit: product.orderUnit || 'piece',
//           colors: colorsData, totalQuantity: colorsData.reduce((s, c) => s + c.totalQuantity, 0),
//           unitPrice: product.pricePerUnit, moq: product.moq, productImage: product.images?.[0]?.url,
//           specialInstructions
//         })
//       });
//       const data = await response.json();
//       if (data.success) {
//         toast.success('Added to cart!');
//         setInquiryItems([]); setSpecialInstructions(''); setIsInCart(true);
//         window.dispatchEvent(new Event('cart-update'));
//       } else toast.error(data.error);
//     } catch (error) { toast.error('Failed to add to cart'); }
//   };

//   const handleWhatsAppInquiry = async () => {
//     if (!isAuthenticated) { setAuthModalTab('login'); setShowAuthModal(true); toast.info('Please login'); return; }
//     if (!await checkProfileCompleteness()) { setPendingInquiryAction('whatsapp'); setShowProfileModal(true); return; }
//     if (!inquiryItems.length) return toast.error('Add items first');

//     const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
//     const unitLabel = getUnitLabel(product.orderUnit);
//     let message = `*🌾 Jute Craftify - Product Inquiry*\n\n`;
//     message += `*📦 PRODUCT*\n• ${product.productName}\n• MOQ: ${product.moq} ${unitLabel}\n`;
//     message += `*👤 BUYER*\n• ${currentUser.companyName || 'N/A'}\n• ${currentUser.contactPerson || 'N/A'}\n• ${currentUser.email || 'N/A'}\n\n`;
//     message += `*🛒 ITEMS*\n`;
//     inquiryItems.forEach((i, idx) => {
//       const qty = i.quantity || 0;
//       const price = getPriceForQuantity(qty);
//       message += `${idx + 1}. ${i.color.code} - ${qty} ${unitLabel} @ ${formatPrice(price)} = ${formatPrice(price * qty)}\n`;
//     });
//     message += `\n*📊 TOTAL: ${formatPrice(totalPrice)} for ${totalQuantity} ${unitLabel}*\n`;
//     if (specialInstructions) message += `\n*📝 NOTES:* ${specialInstructions}\n`;
//     window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801305785685'}?text=${encodeURIComponent(message)}`, '_blank');
//   };

//   const allColorsMeetMOQ = inquiryItems.every(i => (i.quantity || 0) === 0 || (i.quantity || 0) >= product?.moq);
//   const hasAnyQuantity = inquiryItems.some(i => (i.quantity || 0) > 0);
//   const canSubmit = hasAnyQuantity && allColorsMeetMOQ;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#eae1d6]">
//         <Navbar />
//         <div className="container mx-auto px-4 py-8 mt-16">
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <div className="bg-gray-200 rounded-xl h-[500px]"></div>
//               <div className="space-y-4"><div className="h-8 bg-gray-200 rounded w-3/4"></div><div className="h-20 bg-gray-200 rounded"></div><div className="h-40 bg-gray-200 rounded"></div></div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-[#F5E6D3]">
//         <Navbar />
//         <div className="text-center py-20"><h2 className="text-2xl font-bold text-[#6B4F3A] mb-4">Product Not Found</h2><Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-[#6B4F3A] text-white rounded-lg">Back to Products</Link></div>
//         <Footer />
//       </div>
//     );
//   }

//   const unitLabel = getUnitLabel(product.orderUnit);
//   const hasSizes = product.sizes?.filter(s => s.trim()).length > 0;
//   const hasCustomization = product.customizationOptions && product.customizationOptions.length > 0;

//   return (
//     <>
//       <MetadataUpdater product={product} />
//       <Navbar />
//       <div className="min-h-screen bg-[#F5E6D3]">
//         {/* Breadcrumb */}
//         <div className="bg-[#F5E6D3] border-b border-gray-100 sticky top-16 z-40">
//           <div className="container mx-auto px-4 py-3">
//             <div className="flex items-center gap-2 text-sm text-gray-500">
//               <Link href="/" className="hover:text-[#6B4F3A] transition">Home</Link>
//               <span className="text-gray-300">/</span>
//               <Link href="/products" className="hover:text-[#6B4F3A] transition">Products</Link>
//               <span className="text-gray-300">/</span>
//               <Link href={`/products?category=${product.category?._id}`} className="hover:text-[#6B4F3A] transition">{product.category?.name}</Link>
//               {product.subcategoryName && (
//                 <>
//                   <span className="text-gray-300">/</span>
//                   <span className="text-gray-600">{product.subcategoryName}</span>
//                 </>
//               )}
//               <span className="text-gray-300">/</span>
//               <span className="text-gray-900 font-medium truncate">{product.productName}</span>
//             </div>
//           </div>
//         </div>

//         <div className="container mx-auto px-4 py-6 lg:py-8 mt-12">
//           {/* Main Product Section */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Left Column - Image Gallery */}
//             <div>
//               <ImageGallery images={product.images} productName={product.productName} />
//             </div>

//            <div className="space-y-5">
//   {/* Badges */}
//   <div className="flex flex-wrap gap-2">
//     <span className="px-3 py-1 bg-[#6B4F3A]/10 text-[#6B4F3A] text-xs font-medium rounded-full">
//       {product.category?.name}
//     </span>
//     {product.subcategoryName && (
//       <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
//         {product.subcategoryName}
//       </span>
//     )}
//     {hasCustomization && (
//       <span className="px-3 py-1 bg-[#6B4F3A] text-white text-xs font-medium rounded-full flex items-center gap-1">
//         <Sparkle className="w-3 h-3" /> Customizable
//       </span>
//     )}
//     <span className={`px-3 py-1 text-xs font-medium rounded-full text-white ${getTargetedAudienceStyle(product.targetedCustomer)}`}>
//       {capitalizeFirst(product.targetedCustomer || 'Unisex')}
//     </span>
//     {product.tags?.slice(0, 2).map(tag => (
//       <span key={tag} className={`px-3 py-1 text-xs font-medium rounded-full text-white ${getTagStyles(tag)}`}>
//         {tag}
//       </span>
//     ))}
//   </div>

//   {/* Product Name */}
//   <h1 className="text-2xl lg:text-3xl font-bold text-[#6B4F3A] leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
//     {product.productName}
//   </h1>

//   {/* Metrics Row - Everything in 1 line */}
//   <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#6B4F3A]/20">
//     <div className="flex items-center gap-2">
//       <Package className="w-4 h-4 text-[#6B4F3A]" />
//       <div>
//         <p className="text-xs text-gray-400">Starting from</p>
//         <p className="text-lg font-bold text-[#6B4F3A]">{formatPrice(product.pricePerUnit)}<span className="text-xs font-normal text-gray-400">/{unitLabel === 'pcs' ? 'pc' : unitLabel}</span></p>
//       </div>
//     </div>
    
//     <div className="w-px h-8 bg-[#6B4F3A]/20"></div>
    
//     <div>
//       <p className="text-xs text-gray-400">MOQ</p>
//       <p className="text-lg font-semibold text-gray-800">{product.moq} <span className="text-xs font-normal text-gray-400">{unitLabel}</span></p>
//     </div>
    
//     <div className="w-px h-8 bg-[#6B4F3A]/20"></div>
    
//     {product.fabric && (
//       <>
//         <div>
//           <p className="text-xs text-gray-400">Material</p>
//           <p className="text-sm font-medium text-gray-800">{product.fabric}</p>
//         </div>
//         <div className="w-px h-8 bg-[#6B4F3A]/20"></div>
//       </>
//     )}
    
//     {product.weightPerUnit && (
//       <div>
//         <p className="text-xs text-gray-400">Weight/Unit</p>
//         <p className="text-sm font-medium text-gray-800">{product.weightPerUnit} kg</p>
//       </div>
//     )}
//   </div>

//  {/* Description - 2 lines only */}
// {product.description && (
//   <div className="py-3 border-b border-[#6B4F3A]/20">
//     <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
//       {product.description.replace(/<[^>]*>/g, '').substring(0, 250)}
//       {product.description.replace(/<[^>]*>/g, '').length > 250 ? '...' : ''}
//     </p>
//   </div>
// )}

//   {/* Two Column Layout for Customization & Bulk Pricing */}
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 border-b border-[#6B4F3A]/20">
//     {/* Customization Options */}
//     {hasCustomization && (
//       <CustomizationOptions options={product.customizationOptions} />
//     )}
    
//     {/* Bulk Pricing Table */}
//     <BulkPricingTable 
//       pricing={product.quantityBasedPricing} 
//       unitPrice={product.pricePerUnit}
//       moq={product.moq}
//       orderUnit={product.orderUnit}
//     />
//   </div>

//   {/* Colors & Sizes Section */}
//   <div className="space-y-4">
//     {product.colors?.length > 0 && (
//       <div>
//         <h3 className="font-semibold text-gray-900 mb-3 text-sm">Available Colors</h3>
//         <ColorSelector colors={product.colors} selectedColor={selectedColor} onChange={setSelectedColor} />
//       </div>
//     )}
//     {hasSizes && (
//       <div>
//         <h3 className="font-semibold text-gray-900 mb-3 text-sm">Available Sizes</h3>
//         <div className="flex flex-wrap gap-2">
//           {product.sizes.filter(s => s.trim()).map(size => (
//             <span key={size} className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-[#F5E6D3] transition">
//               {size}
//             </span>
//           ))}
//         </div>
//       </div>
//     )}
//   </div>

//   {/* Add to Cart Button */}
// <button
//   onClick={handleAddItem}
//   disabled={!selectedColor || isInCart}
//   className="w-full py-3 bg-[#6B4F3A] text-white font-semibold rounded-xl hover:bg-[#8B6B51] transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
// >
//   <ShoppingCart className="w-5 h-5" />
//   {selectedColor ? (
//     <span className="flex items-center gap-2">
//       Add Selected Color
//       <div 
//         className="w-5 h-5 rounded-full border border-white shadow-sm"
//         style={{ backgroundColor: selectedColor.code }}
//       />
//       to Cart
//     </span>
//   ) : (
//     'Select a Color First'
//   )}
// </button>

//   {/* Inquiry Form Section */}
//   <div id="inquiry-form" className="pt-4 border-t border-[#6B4F3A]/20">
//     <h3 className="font-semibold text-gray-900 mb-3">Your Cart</h3>
//     <p className="text-xs text-gray-500 mb-3">Each color must meet MOQ of {product.moq} {unitLabel}</p>

//     {isInCart ? (
//       <div className="text-center py-6 bg-gray-50 rounded-xl">
//         <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
//         <p className="font-medium text-gray-900 mb-2">Product in Cart</p>
//         <Link href="/inquiry-cart" className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
//           View Cart <ChevronRight className="w-4 h-4" />
//         </Link>
//       </div>
//     ) : (
//       <>
//         {inquiryItems.length > 0 && (
//           <>
//             <div className="space-y-3 max-h-[350px] overflow-y-auto mb-4">
//               <AnimatePresence>
//                 {inquiryItems.map((item, idx) => (
//                   <InquiryItem key={item.id} item={item} index={idx} product={product} onUpdate={handleUpdateItem} onRemove={handleRemoveItem} showRemove onColorQuantityChange={handleColorQuantityChange} />
//                 ))}
//               </AnimatePresence>
//             </div>

//             <div className="grid grid-cols-2 gap-3 mb-4">
//               <div className="p-3 bg-gray-50 rounded-xl text-center">
//                 <p className="text-xs text-gray-500">Total Quantity</p>
//                 <p className="text-xl font-bold text-gray-900">{totalQuantity} {unitLabel}</p>
//               </div>
//               <div className="p-3 bg-[#F5E6D3] rounded-xl text-center">
//                 <p className="text-xs text-gray-500">Estimated Total</p>
//                 <p className="text-xl font-bold text-[#6B4F3A]">{formatPrice(totalPrice)}</p>
//               </div>
//             </div>

//             {!allColorsMeetMOQ && hasAnyQuantity && (
//               <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 flex items-start gap-2">
//                 <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                 <span>Each color must meet MOQ of {product.moq} {unitLabel}</span>
//               </div>
//             )}

//             <textarea
//               value={specialInstructions}
//               onChange={(e) => setSpecialInstructions(e.target.value)}
              
//               rows="2"
//               className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent mb-4"
//               placeholder="Special instructions..."
//             />

//             <div className="flex gap-3">
//               <button
//                 onClick={handleSubmitInquiry}
//                 disabled={!canSubmit}
//                 className="flex-1 py-3 bg-[#6B4F3A] text-white font-medium rounded-xl hover:bg-[#8B6B51] transition disabled:opacity-50"
//               >
//                 Add to Cart
//               </button>
//               <button
//                 onClick={handleWhatsAppInquiry}
//                 disabled={inquiryItems.length === 0}
//                 className="py-3 px-5 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2"
//               >
//                 <MessageCircle className="w-4 h-4" /> WhatsApp
//               </button>
//             </div>
//           </>
//         )}

//         {inquiryItems.length === 0 && (
//           <div className="text-center py-8 bg-gray-50 rounded-xl">
//             <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
//             <p className="text-gray-500 text-sm">Select a color above to start</p>
//           </div>
//         )}
//       </>
//     )}
//   </div>
// </div>
//           </div>

//           {/* Product Details Tabs */}
//           <div className="mt-10">
//             <div className="border-b border-gray-200 bg-white rounded-t-xl">
//               <nav className="flex gap-6 overflow-x-auto px-6">
//                 {['description', 'specifications', 'customization', 'pricing', 'instructions', 'shipping', 'reviews'].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
//                       activeTab === tab 
//                         ? 'border-[#6B4F3A] text-[#6B4F3A]' 
//                         : 'border-transparent text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     {tab === 'description' && 'Description'}
//                     {tab === 'specifications' && 'Specifications'}
//                     {tab === 'customization' && 'Customization'}
//                     {tab === 'pricing' && 'Pricing'}
//                     {tab === 'instructions' && 'Packaging/Care Instructions'}
//                     {tab === 'shipping' && 'Shipping'}
//                     {tab === 'reviews' && 'Reviews'}
//                   </button>
//                 ))}
//               </nav>
//             </div>
//             <div className="bg-white rounded-b-xl p-6">
//               {activeTab === 'description' && <Description product={product} />}
//               {activeTab === 'specifications' && <KeyAttributes product={product} />}
//               {activeTab === 'customization' && (
//                 product.customizationOptions && product.customizationOptions.length > 0 ? (
//                   <CustomizationOptions options={product.customizationOptions} />
//                 ) : (
//                   <div className="text-center py-8">
//                     <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                     <p className="text-gray-500">No customization options available</p>
//                   </div>
//                 )
//               )}
//               {activeTab === 'pricing' && (
//                 <BulkPricingTable 
//                   pricing={product.quantityBasedPricing} 
//                   unitPrice={product.pricePerUnit}
//                   moq={product.moq}
//                   orderUnit={product.orderUnit}
//                 />
//               )}
//               {activeTab === 'instructions' && <Instructions product={product} />}
//               {activeTab === 'shipping' && <ShippingInfo />}
//               {activeTab === 'reviews' && <ProductReviews productId={product._id} />}
//             </div>
//           </div>

//           {/* Related Products */}
//           {relatedProducts.length > 0 && (
//             <div className="mt-12">
//               <div className="flex justify-between items-center mb-6">
//                 <div>
//                   <div className="inline-flex items-center gap-2 bg-[#6B4F3A]/10 px-3 py-1 rounded-full mb-2">
//                     <Sparkles className="w-4 h-4 text-[#6B4F3A]" />
//                     <span className="text-xs font-medium text-[#6B4F3A]">You may also like</span>
//                   </div>
//                   <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
//                 </div>
//                 <Link href="/products" className="text-sm text-[#6B4F3A] hover:underline flex items-center gap-1">
//                   View All <ChevronRight className="w-4 h-4" />
//                 </Link>
//               </div>
              
//               <div className="relative">
//                 {relatedProducts.length > getItemsPerView() && (
//                   <>
//                     <button onClick={handlePrev} className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg hover:bg-[#6B4F3A] hover:text-white transition flex items-center justify-center">
//                       <ChevronLeft className="w-5 h-5" />
//                     </button>
//                     <button onClick={handleNext} className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg hover:bg-[#6B4F3A] hover:text-white transition flex items-center justify-center">
//                       <ChevronRight className="w-5 h-5" />
//                     </button>
//                   </>
//                 )}
                
//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
//                   {relatedProducts.slice(currentIndex, currentIndex + getItemsPerView()).map(p => (
//                     <RelatedProductCard key={p._id} product={p} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* WhatsApp Floating Button */}
//         <button
//           onClick={handleWhatsAppInquiry}
//           disabled={inquiryItems.length === 0}
//           className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-600 text-white rounded-full shadow-xl hover:bg-green-700 transition-all hover:scale-110 disabled:opacity-50 flex items-center justify-center"
//         >
//           <MessageCircle className="w-6 h-6" />
//         </button>

//         {/* Modals */}
//         <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialTab={authModalTab} onAuthSuccess={(userData, token) => { localStorage.setItem('token', token); localStorage.setItem('user', JSON.stringify(userData)); setIsAuthenticated(true); setUser(userData); setShowAuthModal(false); toast.success('Logged in!'); }} />
//         <CompleteProfileModal isOpen={showProfileModal} onClose={() => { setShowProfileModal(false); setPendingInquiryAction(null); }} user={user} onComplete={async () => { setIsProfileComplete(true); toast.success('Profile completed!'); if (pendingInquiryAction === 'add-to-cart') handleSubmitInquiry(); else if (pendingInquiryAction === 'whatsapp') handleWhatsAppInquiry(); setPendingInquiryAction(null); }} />
//       </div>
//       <Footer />
//       <WhatsAppButton />

//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&display=swap');
        
//         * {
//           font-family: 'Inter', sans-serif;
//         }
        
//         h1, h2, h3, h4, .serif {
//           font-family: 'Playfair Display', serif;
//         }
        
//         .rich-text-content { color: #374151; line-height: 1.6; }
//         .rich-text-content p { margin: 0.75em 0; }
//         .rich-text-content ul, .rich-text-content ol { padding-left: 1.5em; margin: 0.5em 0; }
//         .rich-text-content a { color: #6B4F3A; text-decoration: none; }
//         .rich-text-content a:hover { text-decoration: underline; }
//       `}</style>
//     </>
//   );
// }

// // Component definitions
// const Description = ({ product }) => (
//   <div>
//     <RichTextContent content={product.description} />
//   </div>
// );

// const Instructions = ({ product }) => (
//   <div>
//     {product.instruction ? <RichTextContent content={product.instruction} /> : <p className="text-gray-500 italic">No care instructions available.</p>}
//   </div>
// );

// const ShippingInfo = () => (
//   <div className="space-y-4">
//     <div className="flex gap-4 p-4 bg-gray-50 rounded-lg"><Truck className="w-6 h-6 text-[#6B4F3A]" /><div><h4 className="font-medium">Global Shipping Available</h4><p className="text-sm text-gray-600">We ship worldwide with reliable carriers.</p></div></div>
//     <div className="flex gap-4 p-4 bg-gray-50 rounded-lg"><Clock className="w-6 h-6 text-[#6B4F3A]" /><div><h4 className="font-medium">Estimated Delivery</h4><p className="text-sm text-gray-600">Domestic: 3-5 days | International: 7-15 days</p></div></div>
//     <div className="flex gap-4 p-4 bg-gray-50 rounded-lg"><Package className="w-6 h-6 text-[#6B4F3A]" /><div><h4 className="font-medium">Bulk Orders</h4><p className="text-sm text-gray-600">Special rates for bulk orders. Contact us for a quote.</p></div></div>
//   </div>
// );

// const KeyAttributes = ({ product }) => {
//   const unitLabel = getUnitLabel(product.orderUnit);
  
//   const additionalInfoAttributes = (product.additionalInfo || []).map(info => ({
//     label: info.fieldName,
//     value: info.fieldValue
//   }));

//   const subcategoryAttribute = product.subcategoryName ? [{ label: 'Subcategory', value: product.subcategoryName }] : [];
//   const childSubcategoryAttribute = product.childSubcategoryName ? [{ label: 'Child Subcategory', value: product.childSubcategoryName }] : [];
  
//   const attributes = [
//     { label: `MOQ (Per Color)`, value: `${product.moq} ${unitLabel}` },
//     { label: 'Fabric', value: product.fabric || 'Standard' },
//     { label: 'Target Audience', value: capitalizeFirst(product.targetedCustomer || 'Unisex') },
//     { label: 'Selling Unit', value: getUnitFullLabel(product.orderUnit) },
//     ...(product.weightPerUnit ? [{ label: 'Weight Per Unit', value: `${product.weightPerUnit} kg` }] : []),
//     ...(product.sizes?.filter(s => s.trim()).length > 0 ? [{ label: 'Available Sizes', value: product.sizes.filter(s => s.trim()).join(', ') }] : []),
//     { label: 'Category', value: product.category?.name || 'Uncategorized' },
//     ...subcategoryAttribute,
//     ...childSubcategoryAttribute,
//     ...additionalInfoAttributes,
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//       {attributes.map((attr, index) => (
//         <div key={index} className="border-b border-gray-100 pb-3">
//           <p className="text-xs text-gray-500 mb-1">{attr.label}</p>
//           <p className="text-sm font-medium text-gray-900">{attr.value}</p>
//         </div>
//       ))}
//     </div>
//   );
// };


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
// const formatPrice = (price) => {
//   return new Intl.NumberFormat('bn-BD', {
//     style: 'currency',
//     currency: 'BDT',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(price || 0);
// };

const formatPrice = (price) => {
  // Just return the number with 2 decimal places, no currency symbol
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
  };
  return styles[ageGroup] || { bg: 'bg-gray-100', text: 'text-gray-600', icon: '🎈' };
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
// Add this with your other helper functions (around line 100-150)
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

// ADD THIS FUNCTION
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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 animate-pulse">
          <div className="bg-gray-200 rounded-2xl h-80 w-full"></div>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-14 h-14 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 space-y-4 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  </div>
);

// Zoom Modal Component
// Zoom Modal Component - With Left/Right Navigation Arrows
const ZoomModal = ({ images, currentIndex, onClose, onImageChange }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    onClick={onClose}
  >
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
      >
        <X className="w-6 h-6 text-white" />
      </button>
      
      {/* Left Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onImageChange((currentIndex - 1 + images.length) % images.length);
        }}
        className="absolute left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      {/* Main Image */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-5xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]?.url}
          alt="Zoomed product"
          className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
        />
      </motion.div>
      
      {/* Right Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onImageChange((currentIndex + 1) % images.length);
        }}
        className="absolute right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
      
      {/* Image Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
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
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-[#2D3A5C] flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#4A8A90]" />
            Share this toy
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-4 gap-3 mb-6">
            {shareOptions.map(option => (
              <a
                key={option.name}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition group"
                onClick={(e) => {
                  if (option.name !== 'Email') e.preventDefault();
                  window.open(option.url, '_blank', 'noopener,noreferrer');
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition group-hover:scale-110" style={{ backgroundColor: `${option.color}15` }}>
                  <option.icon className="w-5 h-5" style={{ color: option.color }} />
                </div>
                <span className="text-xs text-gray-600">{option.name}</span>
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl border border-gray-200">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 text-sm text-gray-600 bg-transparent outline-none px-2"
            />
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#4A8A90] text-white text-sm font-medium rounded-lg hover:bg-[#3A7A80] transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
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
    <div className="border-b border-[#FFE0E6] pb-4 last:border-0">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center text-white font-bold">
            {review.userName?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-semibold text-[#2D3A5C]">{review.userName}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        {review.isVerifiedPurchase && (
          <span className="flex items-center gap-1 text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Verified
          </span>
        )}
      </div>
      {review.title && <p className="font-medium text-[#2D3A5C] mt-2">{review.title}</p>}
      <p className="text-sm text-gray-600 mt-1">
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
            <img key={idx} src={img.url} alt={`Review ${idx + 1}`} className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <button className="text-xs text-gray-500 hover:text-[#4A8A90] transition flex items-center gap-1">
          👍 Helpful ({review.helpful || 0})
        </button>
      </div>
    </div>
  );
};

// Replace your existing RelatedProductCard with this one - EXACT MATCH to ProductGridCard
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
      {/* Image Container - Compact */}
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
          <div className="absolute top-1 left-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-lg z-20 flex items-center gap-0.5">
            <Zap className="w-2 h-2" />
            {discountPercent}% OFF
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
            <div className="text-[8px] text-gray-400">✨ Toy</div>
          )}
          
          {/* Rating Stars */}
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
      {/* Category and Stock Status Row */}
<div className="flex items-center justify-between gap-1">
  {/* Category - Check both category.name and categoryName */}
  {product.category?.name ? (
    <div className="flex items-center gap-0.5 text-[7px] text-[#8B9DC3]">
      <Package className="w-2.5 h-2.5" />
      <span className="truncate max-w-[70px]">{product.category.name}</span>
    </div>
  ) : product.categoryName ? (
    <div className="flex items-center gap-0.5 text-[7px] text-[#8B9DC3]">
      <Package className="w-2.5 h-2.5" />
      <span className="truncate max-w-[70px]">{product.categoryName}</span>
    </div>
  ) : (
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

// Magnifying Glass Component
const MagnifyingGlass = ({ image, isActive }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const lensRef = useRef(null);
  const lensSize = 150; // Size of the magnifying glass in pixels
  const zoomLevel = 2.5; // Zoom level

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate lens position (center the lens on cursor)
    const lensX = x - lensSize / 2;
    const lensY = y - lensSize / 2;
    
    // Constrain lens within container
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
          {/* Magnifying Glass Lens */}
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
          {/* Zoom indicator text */}
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
// Add these state variables
const [carouselIndex, setCarouselIndex] = useState(0);
const [carouselItemsPerView, setCarouselItemsPerView] = useState(5);
const [isAutoScrolling, setIsAutoScrolling] = useState(true);
const autoScrollIntervalRef = useRef(null);
// Add these state variables with your other useState declarations
const [productReviews, setProductReviews] = useState([]);
const [reviewStats, setReviewStats] = useState(null);
const [loadingReviews, setLoadingReviews] = useState(false);


const [productsInCart, setProductsInCart] = useState({});
const [productsInWishlist, setProductsInWishlist] = useState({});
// Add this with your other useState declarations (around line 200-220)
const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
  const mainImageRef = useRef(null);
  const galleryRef = useRef(null);

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
  // Generate thumbnail for normal video files (non-YouTube)
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

// Add this useEffect near your other event listeners
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

// Fetch cart and wishlist status for related products
useEffect(() => {
  const fetchRelatedProductsStatus = async () => {
    if (relatedProducts.length === 0) return;
    
    const productIds = relatedProducts.map(p => p._id);
    const token = localStorage.getItem('token');
    const cartSessionId = localStorage.getItem('cartSessionId');
    const wishlistSessionId = localStorage.getItem('wishlistSessionId');
    
    // Fetch cart status
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
      console.error('Error fetching related products cart status:', error);
    }
    
    // Fetch wishlist status
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
      console.error('Error fetching related products wishlist status:', error);
    }
  };
  
  fetchRelatedProductsStatus();
}, [relatedProducts]);

// Handle responsive items per view
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 640) {
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

// Auto-scroll functionality
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

// Stop auto-scroll when user interacts
const handleCarouselInteraction = () => {
  setIsAutoScrolling(false);
  // Resume auto-scroll after 10 seconds of no interaction
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

  // Add this function after fetchProductDetails
// const fetchProductReviews = async () => {
//   if (!productId) return;
  
//   setLoadingReviews(true);
//   try {
//     const token = localStorage.getItem('token');
//     const headers = {};
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     }
    
//     // Fetch reviews for this specific product
//     const response = await fetch(`http://localhost:5000/api/reviews?productId=${productId}&status=approved&limit=50`, {
//       headers
//     });
    
//     const data = await response.json();
    
//     if (data.success) {
//       // Get current user ID to check for own pending reviews
//       const currentUserId = token ? (await fetch('http://localhost:5000/api/auth/me', { headers }).then(res => res.json()).catch(() => null))?.user?._id : null;
      
//       let allReviews = data.data || [];
      
//       // If user is logged in, also fetch their pending reviews for this product
//       if (token && currentUserId) {
//         const userReviewsResponse = await fetch(`http://localhost:5000/api/reviews?productId=${productId}&userId=${currentUserId}`, {
//           headers
//         });
//         const userReviewsData = await userReviewsResponse.json();
        
//         if (userReviewsData.success) {
//           // Combine approved reviews with user's pending reviews
//           const userPendingReviews = userReviewsData.data.filter(r => r.status === 'pending');
//           allReviews = [...allReviews, ...userPendingReviews];
//         }
//       }
      
//       setProductReviews(allReviews);
//       setReviewStats(data.stats);
//     } else {
//       setProductReviews([]);
//     }
//   } catch (error) {
//     console.error('Error fetching product reviews:', error);
//     setProductReviews([]);
//   } finally {
//     setLoadingReviews(false);
//   }
// };
// Add this function after fetchProductDetails
const fetchProductReviews = async () => {
  if (!productId) return;
  
  setLoadingReviews(true);
  try {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Fetch reviews for this product
    const response = await fetch(`http://localhost:5000/api/reviews?productId=${productId}&limit=50`, {
      headers
    });
    
    const data = await response.json();
    console.log('Full API response:', data);
    console.log('Reviews data:', data.data);
    
    if (data.success) {
      // Log each review's user ID for debugging
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
  // Make sure we have a product ID
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
      setIsInCart(true); // This will change the button to "View in Cart"
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

// Update the handleBuyNow function
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

    // First, check if product is already in cart
    const checkResponse = await fetch(`http://localhost:5000/api/cart/check/${product._id}`, { headers });
    const checkData = await checkResponse.json();
    
    let alreadyInCart = false;
    if (checkData.success) {
      alreadyInCart = checkData.data.inCart;
    }
    
    if (!alreadyInCart) {
      // Only add to cart if not already in cart
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({ productId: product._id, quantity: quantity })
      });
      const data = await response.json();
      
      if (data.success) {
        if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
        // Dispatch cart update event
        window.dispatchEvent(new Event('cart-update'));
      } else {
        toast.error(data.error || 'Failed to process', { id: toastId });
        setAddingToCart(false);
        return;
      }
    }
    
    // Wait a moment for cart to update (if needed), then redirect to checkout
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

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product?.stockQuantity || 10)) {
      setQuantity(newQuantity);
    }
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

  // Handle hover on thumbnail to change main image
  const handleMediaHover = (index) => {
    setHoveredMediaIndex(index);
    setActiveImageIndex(index);
  };

  const handleMediaLeave = () => {
    setHoveredMediaIndex(null);
  };

  const preloadImage = (src) => {
  const img = new Image();
  img.src = src;
};

// Add this function near your other helper functions (around line 100)
// const getYouTubeThumbnail = (url) => {
//   if (!url) return null;
  
//   // Extract video ID from various YouTube URL formats
//   const patterns = [
//     /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\s?#]+)/,
//     /youtube\.com\/v\/([^&\s?#]+)/,
//     /youtube\.com\/live\/([^&\s?#]+)/
//   ];
  
//   for (const pattern of patterns) {
//     const match = url.match(pattern);
//     if (match && match[1]) {
//       // Return high quality thumbnail
//       return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
//     }
//   }
//   return null;
// };

// Helper function to get YouTube thumbnail
const getYouTubeThumbnail = (url) => {
  if (!url) return null;
  
  // Extract video ID from various YouTube URL formats
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

// Function to generate thumbnail from video file
const generateVideoThumbnail = (videoUrl, callback) => {
  const video = document.createElement('video');
  video.crossOrigin = 'Anonymous';
  video.src = videoUrl;
  video.currentTime = 1.5; // Capture at 1.5 seconds for better frame
  
  video.addEventListener('loadeddata', () => {
    // Wait a bit for the video to be ready
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas dimensions (thumbnail size)
      canvas.width = 160;
      canvas.height = 160;
      
      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to data URL
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
  // Add video as a media item if available
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

  // Get category hierarchy
  const categoryHierarchy = [];
  if (product.categoryName) categoryHierarchy.push(product.categoryName);
  if (product.subcategoryName) categoryHierarchy.push(product.subcategoryName);
  if (product.childSubcategoryName) categoryHierarchy.push(product.childSubcategoryName);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FFF9F0] px-8">
        <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6 overflow-x-auto pb-2">
            <Link href="/" className="text-gray-500 hover:text-[#4A8A90] transition">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-[#4A8A90] transition">Toys</Link>
            {categoryHierarchy.map((cat, idx) => (
              <React.Fragment key={idx}>
                <span className="text-gray-400">/</span>
                <span className="text-gray-500">{cat}</span>
              </React.Fragment>
            ))}
            <span className="text-gray-400">/</span>
            <span className="text-[#4A8A90] font-medium line-clamp-1">{product.productName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 lg:gap-8">
            {/* Left Column - Product Gallery */}
           {/* Left Column - Product Gallery */}
<div className="lg:col-span-3" ref={galleryRef}>
  <div className="sticky top-24">
    {/* Main Image/Video Area with Professional Hover Zoom */}
    <div className="relative bg-white rounded-2xl border-2 border-[#FFE0E6] overflow-hidden shadow-md">
      <div 
        className="relative bg-gray-100 rounded-2xl overflow-hidden cursor-crosshair"
        style={{ height: '400px' }}
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
        {(isTransitioning || !imageLoaded[activeImageIndex]) && !isMainVideo && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
          </div>
        )}
        
        <div className="relative w-full h-full overflow-hidden">
          {!isMainVideo && mainImage ? (
            <img
              key={activeImageIndex}
              src={mainImage}
              alt={product.productName}
              className={`w-full h-full object-contain p-4 bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6] transition-opacity duration-300 ${
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

        {/* Zoom Indicator Overlay - Only for images, not videos */}
        {!isMainVideo && !isMobile && !isZoomed && (
          <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center pointer-events-none">
            <div className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              <span>Hover to zoom</span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="absolute bottom-3 right-3 flex gap-2 z-20">
          {!isMainVideo && (
            <button
              onClick={() => setShowZoom(true)}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all hover:scale-105"
              aria-label="View fullscreen"
            >
              <Maximize2 className="w-4 h-4 text-gray-700" />
            </button>
          )}
        </div>

        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full z-20">
          {activeImageIndex + 1} / {productImages.length}
        </div>
      </div>
      
      {discountPercent > 0 && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs md:text-sm font-bold px-2.5 py-1.5 rounded-full shadow-lg flex items-center gap-1">
          <Tag className="w-3.5 h-3.5" />
          {discountPercent}% OFF
        </div>
      )}
      {product.tags?.[0] && (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-[#FFD93D] to-[#FFB6C1] text-[#2D3A5C] text-[10px] md:text-xs font-bold px-2.5 py-1.5 rounded-full shadow-lg">
          {product.tags[0]}
        </div>
      )}
    </div>

   
{/* Thumbnail Gallery */}
<div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-thin justify-center">
  {productImages.map((img, idx) => (
    <button
      key={idx}
      onClick={() => {
        if (activeImageIndex !== idx) {
          // Set the new image index
          setActiveImageIndex(idx);
          // Mark this image as not loaded yet
          setImageLoaded(prev => ({ ...prev, [idx]: false }));
          // Reset zoom state
          setIsZoomed(false);
          // Don't set isTransitioning to true for thumbnails - it causes blank space
          // setIsTransitioning(true); // REMOVE THIS LINE
        }
      }}
      onMouseEnter={() => {
        preloadImage(img.url);
        if (activeImageIndex !== idx) {
          setActiveImageIndex(idx);
          setImageLoaded(prev => ({ ...prev, [idx]: false }));
          setIsZoomed(false);
          // setIsTransitioning(true); // REMOVE THIS LINE
        }
      }}
      className={`flex-shrink-0 w-14 h-14 md:w-[60px] md:h-[60px] rounded-lg overflow-hidden border-2 transition-all duration-200 ${
        activeImageIndex === idx ? 'border-[#4A8A90] shadow-md ring-2 ring-[#4A8A90]/20' : 'border-gray-200 hover:border-[#FFB6C1]'
      }`}
    >
      <img src={img.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
    </button>
  ))}
  
  {/* Video Thumbnail Button */}
  {hasVideo && (
    <button
      onClick={() => {
        if (activeImageIndex !== productImages.length) {
          setActiveImageIndex(productImages.length);
          setIsZoomed(false);
          // setIsTransitioning(true); // REMOVE OR COMMENT THIS LINE
        }
      }}
      onMouseEnter={() => {
        if (activeImageIndex !== productImages.length) {
          setActiveImageIndex(productImages.length);
          setIsZoomed(false);
          // setIsTransitioning(true); // REMOVE OR COMMENT THIS LINE
        }
      }}
      className={`flex-shrink-0 w-14 h-14 md:w-[60px] md:h-[60px] rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
        activeImageIndex === productImages.length ? 'border-[#4A8A90] shadow-md ring-2 ring-[#4A8A90]/20' : 'border-gray-200 hover:border-[#FFB6C1]'
      }`}
    >
      {/* For YouTube videos */}
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
      /* For normal video files - show generated thumbnail or generating state */
      product.videoType !== 'youtube' && videoThumbnail ? (
        <img 
          src={videoThumbnail} 
          alt="Video thumbnail" 
          className="w-full h-full object-cover"
        />
      ) : null}
      
      {/* Fallback icon while generating or when no thumbnail available */}
      <div 
        className="fallback-icon w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex flex-col items-center justify-center"
        style={{ 
          display: (product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl)) || 
                   (product.videoType !== 'youtube' && videoThumbnail) ? 'none' : 'flex' 
        }}
      >
        {generatingThumbnail ? (
          <>
            <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
            <span className="text-[8px] text-purple-500 mt-0.5">Loading</span>
          </>
        ) : (
          <>
            <Play className="w-5 h-5 text-purple-500" />
            <span className="text-[8px] text-purple-500 mt-0.5">Video</span>
          </>
        )}
      </div>
      
      {/* Play icon overlay on hover */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
        <Play className="w-5 h-5 text-white" />
      </div>
    </button>
  )}
</div>
  </div>
</div>

            {/* Right Column - Product Info (4/7 width) */}
            <div className="lg:col-span-4 bg-white p-4 rounded-lg">
              {/* Category Hierarchy */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
    {categoryHierarchy.map((cat, idx) => (
      <span 
        key={idx} 
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-[#4A8A90]/10 to-[#4A8A90]/5 text-[#4A8A90] border border-[#4A8A90]/20"
      >
        <FolderTree className="w-3 h-3" />
        {cat}
      </span>
    ))}
    
    {product.brand && (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-[#FFB6C1]/20 to-[#FFB6C1]/10 text-[#FF6B8A] border border-[#FFB6C1]/30">
        <Tag className="w-3 h-3" />
        {product.brand}
      </span>
    )}

    

    
  </div>

              {/* Title & Brand */}
              <div className="mb-4">
              
                <h1 className="text-2xl md:text-2xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                  {product.productName}
                </h1>
              </div>

            

              {/* Rating & Age */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className={`w-4 h-4 ${star <= Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : star - 0.5 <= averageRating ? 'fill-yellow-400 text-yellow-400 opacity-50' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{averageRating.toFixed(1)}</span>
               
                </div>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${ageBadge.bg} ${ageBadge.text}`}>
                  <span>{ageBadge.icon}</span>
                  <span>Ages {product.ageGroup} years</span>
                </div>
              </div>

             {/* Price Card - Modern Design */}
  <div className="mb-5 p-4 bg-gradient-to-r from-[#D4EDEE]/20 to-[#FFF9F0] rounded-xl border border-[#FFE0E6]">
    <div className="flex items-baseline gap-3 flex-wrap">
      <span className="text-3xl md:text-4xl font-bold text-[#4A8A90]">৳{formatPrice(currentPrice)}</span>
      {discountPercent > 0 && (
        <>
          <span className="text-base text-gray-400 line-through">৳{formatPrice(product.regularPrice)}</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 bg-red-100 px-2 py-1 rounded-full">
            <Zap className="w-3 h-3" />
            Save {discountPercent}%
          </span>
        </>
      )}
    </div>
    {product.codAvailable && (
      <div className="flex items-center gap-1.5 mt-3 text-green-600 text-sm bg-green-50 inline-flex px-3 py-1 rounded-full">
        <Truck className="w-3.5 h-3.5" />
        <span>Cash on Delivery available</span>
      </div>
    )}
  </div>
                   {/* Short Description */}
              <div className="mb-5 p-4 bg-white rounded-xl border border-[#FFE0E6]">
                <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
              </div>
             

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`flex items-center gap-1.5 text-sm font-medium text-${stockStatus.color}-600 bg-${stockStatus.color}-50 px-3 py-1.5 rounded-full`}>
                  <StockIcon className={`w-4 h-4 text-${stockStatus.color}-500`} />
                  <span>{stockStatus.label}</span>
                  {stockStatus.label === 'In Stock' && <span className="text-xs text-gray-500">({product.stockQuantity} available)</span>}
                </div>
                <div>
                  
                </div>

              </div>
              
             

         

              {/* Quantity + Add to Cart + Wishlist - All on same line */}
     {/* Quantity + Add to Cart + Buy Now + Wishlist + Share - All on same line */}
<div className="flex flex-wrap items-center gap-3 mb-6">
  {/* Quantity Selector */}
  <div className="flex items-center rounded-lg border-2 border-[#FFE0E6]  overflow-hidden bg-white">
    <button 
      onClick={() => handleQuantityChange(-1)} 
      disabled={quantity <= 1 || isInCart} 
      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
    >
      <Minus className="w-4 h-4" />
    </button>
    <span className="w-12 text-center font-medium text-[#2D3A5C]">{quantity}</span>
    <button 
      onClick={() => handleQuantityChange(1)} 
      disabled={quantity >= product.stockQuantity || isInCart} 
      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
    >
      <Plus className="w-4 h-4" />
    </button>
  </div>

  {/* Add to Cart OR View in Cart Button */}
  {isInCart ? (
    <button
      onClick={() => router.push('/cart')}
      className="flex-1 py-2.5 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md flex items-center justify-center gap-2"
    >
      <ShoppingCart className="w-4 h-4" />
      View in Cart
    </button>
  ) : (
    <button
      onClick={handleAddToCart}
      disabled={addingToCart || product.stockQuantity <= 0}
      className="flex-1 py-2.5 px-6 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white font-bold rounded-lg hover:from-[#3A7A80] hover:to-[#5B9399] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
    >
      {addingToCart ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
      {addingToCart ? 'Adding...' : 'Add to Cart'}
    </button>
  )}

  {/* Buy Now Button */}
  <button
    onClick={handleBuyNow}
    disabled={addingToCart || product.stockQuantity <= 0}
    className="flex-1 py-2.5 px-6 bg-gradient-to-r from-[#FFD93D] to-[#FFB6C1] text-[#2D3A5C] font-bold rounded-lg hover:from-[#FFE44D] hover:to-[#FF9CB0] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
  >
    <Zap className="w-4 h-4" />
    Buy Now
  </button>

  {/* Wishlist Button - Heart turns red when in wishlist */}
  <button
    onClick={handleWishlist}
    className="p-2.5 bg-white border-2 border-[#FFE0E6] rounded-full hover:border-[#FFB6C1] hover:bg-pink-50 transition-all"
  >
    <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-[#4A8A90]'}`} />
  </button>

  {/* Share Button */}
  <button
    onClick={() => setShowShare(true)}
    className="p-2.5 bg-white border-2 border-[#FFE0E6] rounded-full hover:border-[#4A8A90] transition-all"
  >
    <Share2 className="w-5 h-5 text-[#4A8A90]" />
  </button>
</div>

              {/* Delivery Info */}
              <div className="bg-gradient-to-r from-[#D4EDEE]/30 to-[#FFE0E6]/30 rounded-xl p-4 border border-[#FFE0E6]">
                <div className="flex items-center gap-3 mb-3">
                  <Truck className="w-5 h-5 text-[#4A8A90]" />
                  <span className="font-semibold text-[#2D3A5C]">Delivery Information</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1" dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} />
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#FFE0E6]">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>7 Days Return Policy</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Safe & Secure</span>
                  </div>
                </div>
              </div>
            </div>






            
          </div>

          {/* Tabs for Description, Specifications, Reviews */}
         {/* Tabs for Description, Specifications, Reviews */}
<div className="mt-12">
  <div className="flex flex-wrap gap-2 border-b border-[#FFE0E6]">
    {['description', 'specifications', 'reviews'].map(tab => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-5 py-2.5 font-semibold text-sm rounded-t-lg transition-all ${
          activeTab === tab ? 'bg-white text-[#4A8A90] border-t-2 border-l-2 border-r-2 border-[#FFE0E6] border-b-white' : 'text-gray-500 hover:text-[#4A8A90]'
        }`}
      >
        {tab === 'description' && 'Product Description'}
        {tab === 'specifications' && 'Specifications'}
        {tab === 'reviews' && `Reviews`}
      </button>
    ))}
  </div>

  <div className="bg-white rounded-b-xl rounded-tr-xl border border-t-0 border-[#FFE0E6] p-5 md:p-6">
    {activeTab === 'description' && (
      <div className="prose prose-sm max-w-none">
        <div dangerouslySetInnerHTML={{ __html: product.fullDescription }} />
        {/* REMOVED additionalInfo from here */}
      </div>
    )}

   {activeTab === 'specifications' && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Basic Specifications */}
    {[
      { label: 'Brand', value: product.brand, icon: Tag },
      { label: 'Age Group', value: `Ages ${product.ageGroup} years`, icon: Users },
      { label: 'SKU', value: product.skuCode, icon: Package },
      { label: 'Stock', value: `${product.stockQuantity} units available`, icon: Package },
      { label: 'Category', value: product.categoryName, icon: Tag },
      { label: 'Subcategory', value: product.subcategoryName, icon: FolderTree },
      { label: 'Child Subcategory', value: product.childSubcategoryName, icon: FolderTree },
      { label: 'COD Available', value: product.codAvailable ? 'Yes' : 'No', icon: Truck },
    ].filter(item => item.value).map((item, idx) => (
      <div key={idx} className="flex items-center gap-3 p-3 bg-[#FFF9F0] rounded-xl border border-[#FFE0E6]">
        <item.icon className="w-5 h-5 text-[#4A8A90]" />
        <div>
          <p className="text-xs text-gray-500">{item.label}</p>
          <p className="font-medium text-[#2D3A5C]">{item.value || 'N/A'}</p>
        </div>
      </div>
    ))}
    
    {/* Additional Info - merged directly into specifications */}
    {product.additionalInfo && product.additionalInfo.map((info, idx) => (
      <div key={`additional-${idx}`} className="flex items-center gap-3 p-3 bg-[#FFF9F0] rounded-xl border border-[#FFE0E6]">
        <Sparkles className="w-5 h-5 text-[#FFD93D]" />
        <div>
          <p className="text-xs text-gray-500">{info.fieldName}</p>
          <p className="font-medium text-[#2D3A5C]">{info.fieldValue}</p>
        </div>
      </div>
    ))}
  </div>
)}

   {activeTab === 'reviews' && (
  <div>
    {loadingReviews ? (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-[#4A8A90]" />
      </div>
    ) : (
      <>
       {reviewStats && reviewStats.totalReviews > 0 && (
  <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
    {/* ... rating display code ... */}
    <button
      onClick={() => setIsReviewModalOpen(true)}
      className="px-4 py-2 bg-[#4A8A90] text-white text-sm font-semibold rounded-full hover:bg-[#3A7A80] transition"
    >
      Write a Review
    </button>
  </div>
)}

{/* In the "No reviews yet" section */}
{productReviews.length === 0 && (
  <div className="text-center py-8">
    <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
    <p className="text-gray-500">No reviews yet. Be the first to review this toy!</p>
    <button
      onClick={() => setIsReviewModalOpen(true)}
      className="inline-block mt-3 px-4 py-2 bg-[#4A8A90] text-white text-sm font-semibold rounded-full hover:bg-[#3A7A80] transition"
    >
      Write a Review
    </button>
  </div>
)}

        {/* Reviews List */}
       {/* Reviews List */}
<div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
  {productReviews.length > 0 ? (
    productReviews.slice(0, reviewsToShow).map((review, idx) => {
      // Check review status
      const isPending = review.status === 'pending';
      const isRejected = review.status === 'rejected';
      const isApproved = review.status === 'approved';
      
          // Get current user ID from localStorage - FIXED: handle both string and object
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
      
      // Check if this review belongs to the current user - FIXED: handle review.user as object or string
      let isUserReview = false;
      if (currentUserId) {
        const reviewUserId = review.user?._id || review.user;
        isUserReview = reviewUserId === currentUserId;
      }
      
      console.log('Review check:', {
        reviewId: review._id,
        reviewUserId: review.user?._id || review.user,
        currentUserId,
        isUserReview,
        status: review.status,
        isPending: isPending && isUserReview
      });
      // Only show pending/rejected to the review owner
      if ((isPending || isRejected) && !isUserReview) return null;
      
      return (
        <div key={idx} className="border-b border-[#FFE0E6] pb-4 last:border-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center text-white font-bold">
                {review.userName?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-semibold text-[#2D3A5C]">{review.userName}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                  
                  {/* Status Badges */}
                  {isPending && isUserReview && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                      Pending Approval
                    </span>
                  )}
                  {isRejected && isUserReview && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                      Rejected
                    </span>
                  )}
                  {isApproved && review.isVerifiedPurchase && (
                    <span className="flex items-center gap-1 text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {review.title && <p className="font-medium text-[#2D3A5C] mt-2">{review.title}</p>}
          <p className="text-sm text-gray-600 mt-1">
            {review.comment}
          </p>
          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 mt-3">
              {review.images.slice(0, 3).map((img, imgIdx) => (
                <img key={imgIdx} src={img.url} alt={`Review ${idx + 1}`} className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
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
  ) : (
    <div className="text-center py-8">
      <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
      <p className="text-gray-500">No reviews yet. Be the first to review this toy!</p>
   <button
  onClick={() => setIsReviewModalOpen(true)}
  className="inline-block mt-3 px-4 py-2 bg-[#4A8A90] text-white text-sm font-semibold rounded-full hover:bg-[#3A7A80] transition"
>
  Write a Review
</button>
    </div>
  )}
</div>

        {productReviews.length > reviewsToShow && (
          <button onClick={() => setReviewsToShow(reviewsToShow + 5)} className="mt-4 text-[#4A8A90] font-medium text-sm hover:underline">
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
{/* Related Products Section - Carousel */}
{relatedProducts.length > 0 && (
  <div className="mt-12">
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-[#FFD93D]" />
        <h2 className="text-xl md:text-2xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
          You May Also Like
        </h2>
      </div>
      
      {/* Navigation Arrows */}
      {relatedProducts.length > carouselItemsPerView && (
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevSlide}
            disabled={carouselIndex === 0}
            className={`p-2 rounded-full transition-all ${
              carouselIndex === 0 
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                : 'bg-white border border-[#FFE0E6] text-[#4A8A90] hover:bg-[#D4EDEE] hover:scale-110'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextSlide}
            disabled={carouselIndex >= relatedProducts.length - carouselItemsPerView}
            className={`p-2 rounded-full transition-all ${
              carouselIndex >= relatedProducts.length - carouselItemsPerView 
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                : 'bg-white border border-[#FFE0E6] text-[#4A8A90] hover:bg-[#D4EDEE] hover:scale-110'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
    
    {/* Carousel Container */}
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-4"
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
    
    {/* Dots Indicator */}
    {relatedProducts.length > carouselItemsPerView && (
      <div className="flex justify-center gap-2 mt-6">
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
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive ? 'w-6 bg-[#4A8A90]' : 'w-2 bg-gray-300 hover:bg-gray-400'
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

{/* Review Modal */}
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