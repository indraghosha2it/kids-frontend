// // 1 without pay
// 'use client';

// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FaChevronDown, 
//   FaTag, 
//   FaCheckCircle, 
//   FaTimesCircle, 
//   FaTimes, 
//   FaTicketAlt, 
//   FaGift,
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaFileAlt,
//   FaMoneyBillWave,
//   FaCreditCard,
//   FaMobileAlt,
//   FaSearch,
//   FaEdit,
//   FaPercent,
//   FaTruck,
//   FaShoppingBag,
//   FaClock,
//   FaUsers,
//   FaCalendarAlt,
//   FaCopy
// } from 'react-icons/fa';
// import { toast } from 'sonner';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import WhatsAppButton from '../components/layout/WhatsAppButton';

// const TOY_COLORS = {
//   primary: '#4A8A90',
//   secondary: '#FFB6C1',
//   accent: '#FFD93D',
//   lightBg: '#FFF9F0',
//   border: '#FFE0E6'
// };

// // Shipping Cost Constants
// const SHIPPING_COST_DHAKA = 70;
// const SHIPPING_COST_OUTSIDE = 150;

// // Searchable Select Component
// const SearchableSelect = ({ name, value, onChange, options, placeholder, required, disabled, error }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const dropdownRef = useRef(null);

//   const filteredOptions = options.filter(option =>
//     option.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSelect = (selectedValue) => {
//     onChange({ target: { name, value: selectedValue } });
//     setIsOpen(false);
//     setSearchTerm('');
//   };

//   const handleClear = () => {
//     onChange({ target: { name, value: '' } });
//     setSearchTerm('');
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const selectedOption = value && options.includes(value) ? value : '';

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className={`w-full px-4 py-3 border rounded-lg focus-within:ring-2 focus-within:ring-[#4A8A90] focus-within:border-transparent cursor-pointer flex items-center justify-between ${
//           disabled ? 'bg-gray-100' : 'bg-white'
//         } ${error ? 'border-red-500' : 'border-gray-300'}`}
//         onClick={() => !disabled && setIsOpen(!isOpen)}
//       >
//         <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
//           {selectedOption || placeholder}
//         </span>
//         <div className="flex items-center gap-2">
//           {selectedOption && (
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleClear();
//               }}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <FaTimes className="w-3 h-3" />
//             </button>
//           )}
//           <FaChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//         </div>
//       </div>

//       {isOpen && !disabled && (
//         <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
//           <div className="p-2 border-b border-gray-200">
//             <div className="relative">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//                 className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A8A90] text-sm"
//                 onClick={(e) => e.stopPropagation()}
//               />
//             </div>
//           </div>
//           <div className="overflow-y-auto max-h-48">
//             {filteredOptions.length > 0 ? (
//               filteredOptions.map((option, idx) => (
//                 <button
//                   key={idx}
//                   type="button"
//                   onClick={() => handleSelect(option)}
//                   className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors text-sm"
//                 >
//                   {option}
//                 </button>
//               ))
//             ) : (
//               <div className="px-4 py-2 text-sm text-gray-500 text-center">
//                 No results found
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//       {required && !disabled && (
//         <input type="hidden" name={name} value={value} required={required} />
//       )}
//     </div>
//   );
// };

// // Coupon Modal Component
// // Coupon Modal Component - Real Life Coupon Design
// const CouponModal = ({ isOpen, onClose, coupons, onApplyCoupon, subtotal, isLoading }) => {
//   const [selectedCoupon, setSelectedCoupon] = useState(null);
//   const [applying, setApplying] = useState(false);

//   const handleApply = async () => {
//     if (!selectedCoupon) {
//       toast.error('Please select a coupon');
//       return;
//     }
    
//     setApplying(true);
//     try {
//       await onApplyCoupon(selectedCoupon.couponCode);
//       onClose();
//     } finally {
//       setApplying(false);
//     }
//   };

//   const getDiscountText = (coupon) => {
//     if (coupon.discountType === 'percentage') {
//       return `${coupon.discountValue}% OFF`;
//     } else if (coupon.discountType === 'fixed') {
//       return `৳${coupon.discountValue} OFF`;
//     } else if (coupon.discountType === 'free_shipping') {
//       return 'FREE SHIPPING';
//     }
//     return '';
//   };

//   const meetsMinimumOrder = (coupon) => {
//     return subtotal >= (coupon.minimumOrderAmount || 0);
//   };

//   // Get coupon theme colors
//   const getCouponColors = (coupon) => {
//     if (coupon.colorTheme) {
//       return {
//         primary: coupon.colorTheme.primary || '#4A8A90',
//         secondary: coupon.colorTheme.secondary || '#D4EDEE',
//         accent: coupon.colorTheme.accent || '#FFB6C1',
//         text: coupon.colorTheme.text || '#2D3A5C',
//         bg: coupon.colorTheme.bg || '#FFF9F0'
//       };
//     }
//     return {
//       primary: '#4A8A90',
//       secondary: '#D4EDEE',
//       accent: '#FFB6C1',
//       text: '#2D3A5C',
//       bg: '#FFF9F0'
//     };
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-hidden"
//           >
//             {/* Header */}
//             <div className="p-5 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <FaGift className="w-6 h-6" />
//                   <h2 className="text-xl font-bold">Available Coupons</h2>
//                 </div>
//                 <button
//                   onClick={onClose}
//                   className="p-1 hover:bg-white/20 rounded-lg transition-colors"
//                 >
//                   <FaTimes className="w-5 h-5" />
//                 </button>
//               </div>
//               <p className="text-sm text-white/80 mt-1">Select a coupon to apply to your order</p>
//             </div>

//             {/* Body */}
//             <div className="p-5 overflow-y-auto max-h-[65vh]">
//               {isLoading ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="w-8 h-8 border-4 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
//                 </div>
//               ) : coupons.length === 0 ? (
//                 <div className="text-center py-12">
//                   <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                     <FaTicketAlt className="w-10 h-10 text-gray-400" />
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-1">No coupons available</h3>
//                   <p className="text-sm text-gray-500">
//                     You don't have any eligible coupons at the moment.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 gap-5">
//                   {coupons.map((coupon) => {
//                     const colors = getCouponColors(coupon);
//                     const isEligible = meetsMinimumOrder(coupon);
//                     const isSelected = selectedCoupon?.couponCode === coupon.couponCode;
//                     const discountText = getDiscountText(coupon);
                    
//                     return (
//                       <div
//                         key={coupon._id}
//                         className={`relative transition-all duration-300 ${
//                           !isEligible ? 'opacity-60' : ''
//                         } ${isSelected ? 'scale-[1.02]' : 'scale-100'}`}
//                         onClick={() => isEligible && setSelectedCoupon(coupon)}
//                       >
//                         {/* Real Coupon Design */}
//                         <div className="relative group cursor-pointer">
//                           {/* Dashed border coupon card */}
//                           <div 
//                             className="relative rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
//                             style={{ 
//                               background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.bg} 100%)`,
//                               border: `2px dashed ${colors.primary}`,
//                             }}
//                           >
//                             {/* Scissors cut-out effect - top */}
//                             <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-white rounded-b-full"></div>
                            
//                             {/* Corner decorations */}
//                             <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 rounded-tl-2xl" style={{ borderColor: colors.primary }}></div>
//                             <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 rounded-tr-2xl" style={{ borderColor: colors.primary }}></div>
//                             <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 rounded-bl-2xl" style={{ borderColor: colors.primary }}></div>
//                             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 rounded-br-2xl" style={{ borderColor: colors.primary }}></div>
                            
//                             {/* Selection indicator */}
//                             {isSelected && (
//                               <div className="absolute top-2 right-2 z-10">
//                                 <div className="w-6 h-6 bg-[#4A8A90] rounded-full flex items-center justify-center shadow-md">
//                                   <FaCheckCircle className="w-4 h-4 text-white" />
//                                 </div>
//                               </div>
//                             )}
                            
//                             <div className="p-5">
//                               {/* Ribbon/Badge */}
//                               {coupon.subtitle && (
//                                 <div className="absolute -top-2 right-8">
//                                   <div className="relative">
//                                     <div className="px-3 py-1 text-xs font-bold text-white rounded-full shadow-md" style={{ backgroundColor: colors.accent }}>
//                                       {coupon.subtitle}
//                                     </div>
//                                     <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent" style={{ borderTopColor: colors.accent }}></div>
//                                   </div>
//                                 </div>
//                               )}
                              
//                               <div className="flex items-start gap-4">
//                                 {/* Left side - Discount Badge */}
//                                 <div className="flex-shrink-0">
//                                   <div 
//                                     className="w-24 h-24 rounded-xl flex flex-col items-center justify-center shadow-md"
//                                     style={{ 
//                                       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
//                                     }}
//                                   >
//                                     {coupon.discountType === 'percentage' && (
//                                       <>
//                                         <span className="text-2xl font-black text-white">{coupon.discountValue}</span>
//                                         <span className="text-xs font-bold text-white">% OFF</span>
//                                       </>
//                                     )}
//                                     {coupon.discountType === 'fixed' && (
//                                       <>
//                                         <span className="text-xl font-black text-white">৳{coupon.discountValue}</span>
//                                         <span className="text-xs font-bold text-white">OFF</span>
//                                       </>
//                                     )}
//                                     {coupon.discountType === 'free_shipping' && (
//                                       <>
//                                         <FaTruck className="w-8 h-8 text-white mb-1" />
//                                         <span className="text-xs font-bold text-white">FREE SHIP</span>
//                                       </>
//                                     )}
//                                   </div>
//                                 </div>
                                
//                                 {/* Right side - Coupon Details */}
//                                 <div className="flex-1">
//                                   <h3 className="text-lg font-bold mb-1" style={{ color: colors.text }}>
//                                     {coupon.title}
//                                   </h3>
                                  
//                                   <p className="text-xs text-gray-500 mb-2 line-clamp-2">
//                                     {coupon.description || 'Special offer for you!'}
//                                   </p>
                                  
//                                   <div className="flex flex-wrap gap-2 mb-3">
//                                     {coupon.minimumOrderAmount > 0 && (
//                                       <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
//                                         <FaShoppingBag className="w-3 h-3" />
//                                         Min. ৳{coupon.minimumOrderAmount}
//                                       </span>
//                                     )}
//                                     {coupon.maxUsesPerUser > 1 && (
//                                       <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
//                                         <FaUsers className="w-3 h-3" />
//                                         Max {coupon.maxUsesPerUser} uses
//                                       </span>
//                                     )}
//                                     {coupon.expiresAt && (
//                                       <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
//                                         <FaCalendarAlt className="w-3 h-3" />
//                                         Expires: {new Date(coupon.expiresAt).toLocaleDateString()}
//                                       </span>
//                                     )}
//                                   </div>
                                  
//                                   {/* Coupon Code Box */}
//                                   <div className="mt-2">
//                                     <div className="relative flex justify-center">
//                                       <div className="absolute inset-0 flex items-center">
//                                         <div className="w-full border-t border-dashed" style={{ borderColor: colors.primary }}></div>
//                                       </div>
//                                       <div className="relative flex justify-center text-xs">
//                                         <span className="px-3 bg-white text-gray-400" style={{ backgroundColor: colors.bg }}>COUPON CODE</span>
//                                       </div>
//                                     </div>
//                                     <div className="mt-2">
//                                       <div 
//                                         className="flex items-center justify-between p-2 rounded-lg border-2"
//                                         style={{ 
//                                           backgroundColor: colors.secondary,
//                                           borderColor: colors.primary
//                                         }}
//                                       >
//                                         <code className="text-sm font-mono font-bold tracking-wider" style={{ color: colors.primary }}>
//                                           {coupon.couponCode}
//                                         </code>
//                                         <button
//                                           type="button"
//                                           onClick={(e) => {
//                                             e.stopPropagation();
//                                             navigator.clipboard.writeText(coupon.couponCode);
//                                             toast.success('Code copied!');
//                                           }}
//                                           className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg transition-all hover:scale-105"
//                                           style={{ 
//                                             backgroundColor: colors.primary,
//                                             color: 'white'
//                                           }}
//                                         >
//                                           <FaCopy className="w-3 h-3" />
//                                           Copy
//                                         </button>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
                              
//                               {/* Highlight Text Bar */}
//                               {coupon.highlightText && (
//                                 <div className="mt-3 pt-3 border-t text-center" style={{ borderColor: colors.secondary }}>
//                                   <p className="text-xs font-semibold" style={{ color: colors.primary }}>
//                                     🎉 {coupon.highlightText} 🎉
//                                   </p>
//                                 </div>
//                               )}
//                             </div>
                            
//                             {/* Scissors cut-out effect - bottom */}
//                             <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-white rounded-t-full"></div>
//                           </div>
                          
//                           {/* Not eligible overlay */}
//                           {!isEligible && (
//                             <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center">
//                               <div className="text-center p-3">
//                                 <FaClock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
//                                 <p className="text-xs text-orange-700 font-medium">
//                                   Add ৳{(coupon.minimumOrderAmount - subtotal).toFixed(2)} more to qualify
//                                 </p>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="p-5 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
//               <button
//                 onClick={onClose}
//                 className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleApply}
//                 disabled={!selectedCoupon || applying}
//                 className="px-6 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 {applying ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Applying...
//                   </>
//                 ) : (
//                   <>
//                     <FaCheckCircle className="w-4 h-4" />
//                     Apply Coupon
//                   </>
//                 )}
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// // Payment Selector Component
// const PaymentSelector = ({ value, onChange, isLoading, onSubmit }) => {
//   const paymentMethods = [
//     { 
//       id: 'cod', 
//       name: 'Cash on Delivery', 
//       icon: FaMoneyBillWave,
//       description: 'Pay when you receive your toys'
//     },
//     { 
//       id: 'online', 
//       name: 'Online Payment', 
//       icon: FaCreditCard,
//       description: 'Pay via bKash, Nagad, or Card'
//     },
//     { 
//       id: 'bkash', 
//       name: 'bKash', 
//       icon: FaMobileAlt,
//       description: 'Pay with bKash mobile banking'
//     },
//     { 
//       id: 'nagad', 
//       name: 'Nagad', 
//       icon: FaMobileAlt,
//       description: 'Pay with Nagad mobile banking'
//     }
//   ];

//   return (
//     <div>
//       <div className="space-y-3 mb-6">
//         {paymentMethods.map((method) => (
//           <label
//             key={method.id}
//             className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
//               value === method.id
//                 ? 'border-[#4A8A90] bg-[#D4EDEE]'
//                 : 'border-gray-200 hover:border-gray-300'
//             }`}
//           >
//             <input
//               type="radio"
//               name="paymentMethod"
//               value={method.id}
//               checked={value === method.id}
//               onChange={() => onChange(method.id)}
//               className="mt-1 w-4 h-4 text-[#4A8A90] focus:ring-[#4A8A90]"
//             />
//             <method.icon className={`w-5 h-5 ${
//               value === method.id ? 'text-[#4A8A90]' : 'text-gray-500'
//             }`} />
//             <div className="flex-1">
//               <span className={`font-medium ${
//                 value === method.id ? 'text-[#4A8A90]' : 'text-gray-700'
//               }`}>
//                 {method.name}
//               </span>
//               <p className="text-xs text-gray-500">{method.description}</p>
//             </div>
//           </label>
//         ))}
//       </div>
      
//       <button
//         type="button"
//         onClick={onSubmit}
//         disabled={isLoading}
//         className="w-full bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white py-3 rounded-lg font-semibold hover:from-[#3A7A80] hover:to-[#5B9399] transition disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center gap-2">
//             <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//             </svg>
//             Processing...
//           </div>
//         ) : (
//           'Place Order'
//         )}
//       </button>
//     </div>
//   );
// };


// // Order Success Modal for Guest Users
// const OrderSuccessModal = ({ isOpen, onClose, orderId }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden"
//           >
//             {/* Header */}
//             <div className="p-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center">
//               <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
//                 <FaCheckCircle className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-xl font-bold">Order Placed Successfully! 🎉</h2>
//             </div>
            
//             {/* Body */}
//             <div className="p-5 text-center">
//               <p className="text-gray-700 mb-2">
//                 Thank you for your order!
//               </p>
//               <p className="text-sm text-gray-500 mb-4">
//                 Your order has been received and is being processed.
//               </p>
//               {orderId && (
//                 <p className="text-xs text-gray-400 mb-4">
//                   Order ID: {orderId.slice(-8).toUpperCase()}
//                 </p>
//               )}
//               <div className="bg-blue-50 rounded-lg p-3 mb-4">
//                 <p className="text-sm text-blue-700">
//                   📧 A confirmation email has been sent to your email address.
//                 </p>
//               </div>
             
//             </div>
            
//             {/* Footer */}
//             <div className="p-5 border-t border-gray-200 bg-gray-50 flex gap-3">
//               <button
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition-colors"
//               >
//                 Continue Shopping
//               </button>
//               <Link href="/" className="flex-1">
//                 <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//                   Back to Home
//                 </button>
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default function CheckoutPage() {
//   const router = useRouter();
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [user, setUser] = useState(null);
//   const [discount, setDiscount] = useState(0);
//   const [discountDetails, setDiscountDetails] = useState(null);
//   const [couponCode, setCouponCode] = useState('');
//   const [applyingCoupon, setApplyingCoupon] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('cod');
//   const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
// const [lastOrderId, setLastOrderId] = useState(null);
//   const [shippingCost, setShippingCost] = useState(SHIPPING_COST_OUTSIDE);
  
//   // Coupon Modal State
//   const [showCouponModal, setShowCouponModal] = useState(false);
//   const [availableCoupons, setAvailableCoupons] = useState([]);
//   const [loadingCoupons, setLoadingCoupons] = useState(false);

//   // Location data from API
//   const [locationData, setLocationData] = useState({});
//   const [cities, setCities] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [locationLoading, setLocationLoading] = useState(true);

//   // Custom input states for "Other" option
//   const [customCity, setCustomCity] = useState('');
//   const [customZone, setCustomZone] = useState('');
//   const [customArea, setCustomArea] = useState('');

//   // Form fields
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     address: '',
//     city: '',
//     zone: '',
//     area: '',
//     zipCode: '',
//     country: '',
//     note: ''
//   });

//   const [errors, setErrors] = useState({});

//   // Fetch location data
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await fetch('/api/locations');
//         const data = await response.json();
//         setLocationData(data.locationData || {});
//         const cityList = data.locationData ? Object.keys(data.locationData) : [];
//         setCities(cityList);
//         setLocationLoading(false);
//       } catch (error) {
//         console.error('Failed to load location data:', error);
//         setLocationLoading(false);
//       }
//     };
//     fetchLocations();
//   }, []);

//   // Update zones when city changes
//   useEffect(() => {
//     const selectedCity = formData.city === 'other' ? customCity : formData.city;
//     if (selectedCity && locationData[selectedCity]) {
//       const availableZones = Object.keys(locationData[selectedCity].zones || {});
//       setZones(availableZones);
//       setFormData(prev => ({ ...prev, zone: '', area: '' }));
//       setAreas([]);
      
//       // Update shipping cost based on city
//       const isDhaka = selectedCity.toLowerCase() === 'dhaka';
//       setShippingCost(isDhaka ? SHIPPING_COST_DHAKA : SHIPPING_COST_OUTSIDE);
//     }
//   }, [formData.city, customCity, locationData]);

//   // Update areas when zone changes
//   useEffect(() => {
//     const selectedCity = formData.city === 'other' ? customCity : formData.city;
//     const selectedZone = formData.zone === 'other' ? customZone : formData.zone;
    
//     if (selectedCity && selectedZone && locationData[selectedCity]) {
//       const availableAreas = locationData[selectedCity].zones[selectedZone] || [];
//       setAreas(availableAreas);
//       setFormData(prev => ({ ...prev, area: '' }));
//     }
//   }, [formData.zone, customZone, formData.city, customCity, locationData]);

//   // Fetch cart and user data
//   useEffect(() => {
//     fetchCart();
//     fetchUser();
//   }, []);

//   // Auto-fill form if user is logged in
//   useEffect(() => {
//     if (user) {
//       const addressParts = [];
//       if (user.address) addressParts.push(user.address);
//       if (user.city) addressParts.push(user.city);
//       if (user.zipCode) addressParts.push(user.zipCode);
//       if (user.country) addressParts.push(user.country);
      
//       const combinedAddress = addressParts.join(', ');
      
//       setFormData(prev => ({
//         ...prev,
//         fullName: user.contactPerson || user.companyName || '',
//         email: user.email || '',
//         phone: user.phone || '',
//         whatsapp: user.whatsapp || '',
//         address: combinedAddress || '',
//         city: user.city || '',
//         zipCode: user.zipCode || '',
//         country: user.country || 'Bangladesh',
//       }));
      
//       if (user.city) {
//         const cityExists = cities.includes(user.city);
//         if (cityExists) {
//           setFormData(prev => ({ ...prev, city: user.city }));
//         } else if (user.city) {
//           setFormData(prev => ({ ...prev, city: 'other' }));
//           setCustomCity(user.city);
//         }
//       }
      
//       if (user.zone) {
//         setFormData(prev => ({ ...prev, zone: user.zone }));
//       }
//       if (user.area) {
//         setFormData(prev => ({ ...prev, area: user.area }));
//       }
//     }
//   }, [user, cities]);

//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         const response = await fetch('http://localhost:5000/api/auth/me', {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
//         const data = await response.json();
//         if (data.success) {
//           setUser(data.user);
//         }
//       }
//     } catch (error) {
//       console.error('Fetch user error:', error);
//     }
//   };

//   const fetchCart = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch('http://localhost:5000/api/cart', { headers });
//       const data = await response.json();
      
//       if (data.success && data.data.items?.length > 0) {
//         setCart(data.data);
//       } else {
//         toast.error('Your cart is empty');
//         router.push('/products');
//       }
//     } catch (error) {
//       console.error('Fetch cart error:', error);
//       toast.error('Failed to load cart');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch available coupons for the user
//   const fetchAvailableCoupons = async () => {
//     setLoadingCoupons(true);
//     try {
//       const token = localStorage.getItem('token');
//       const userId = user?._id;
//       const subtotal = calculateSubtotal();
      
//       // Get cart product IDs and category IDs for validation
//       const productIds = cart?.items.map(item => item.productId) || [];
//       const categoryIds = []; // You can fetch category IDs from products if needed
      
//       const response = await fetch('http://localhost:5000/api/coupons/available', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           ...(token && { 'Authorization': `Bearer ${token}` })
//         },
//         body: JSON.stringify({
//           userId,
//           subtotal,
//           productIds,
//           categoryIds
//         })
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         setAvailableCoupons(data.data);
//       } else {
//         setAvailableCoupons([]);
//       }
//     } catch (error) {
//       console.error('Error fetching coupons:', error);
//       setAvailableCoupons([]);
//     } finally {
//       setLoadingCoupons(false);
//     }
//   };

//   // Open coupon modal and fetch coupons
//   const handleBrowseCoupons = () => {
//     if (!user) {
//       toast.info('Please login to view available coupons');
//       return;
//     }
//     fetchAvailableCoupons();
//     setShowCouponModal(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//      console.log(`Setting ${name} to ${value}`); 
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//  const applyCoupon = async (code = couponCode) => {
//   if (!code.trim()) {
//     toast.error('Please enter a coupon code');
//     return;
//   }
  
//   setApplyingCoupon(true);
//   try {
//     const token = localStorage.getItem('token');
//     const subtotal = calculateSubtotal();
    
//     const response = await fetch('http://localhost:5000/api/coupons/validate', {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json',
//         ...(token && { 'Authorization': `Bearer ${token}` })
//       },
//       body: JSON.stringify({ 
//         couponCode: code, 
//         cartSubtotal: subtotal,
//         userId: user?._id
//       })
//     });
    
//     const data = await response.json();
//     if (data.success) {
//       let discountAmount = data.data.discountAmount || 0;
      
//       // If free shipping coupon, set shipping cost to 0
//       if (data.data.freeShipping) {
//         setShippingCost(0);
//         toast.success(`Free shipping applied!`);
//       }
      
//       setDiscount(discountAmount);
//       setDiscountDetails(data.data);
//       toast.success(`Coupon "${code}" applied! You saved ${discountAmount > 0 ? `৳${discountAmount}` : 'free shipping'}`);
      
//       // Only clear the coupon code input if it was manually entered (not from modal)
//       // But keep it visible so user can see which coupon is applied
//       // Actually, let's NOT clear it - show the applied coupon code
//       // setCouponCode(''); // <-- REMOVE THIS LINE to keep the code visible
      
//     } else {
//       toast.error(data.error || 'Invalid coupon code');
//       setDiscount(0);
//       setDiscountDetails(null);
//     }
//   } catch (error) {
//     console.error('Apply coupon error:', error);
//     toast.error('Failed to apply coupon');
//   } finally {
//     setApplyingCoupon(false);
//   }
// };

// const handleApplyCouponFromModal = async (code) => {
//   setApplyingCoupon(true);
//   try {
//     const token = localStorage.getItem('token');
//     const subtotal = calculateSubtotal();
    
//     const response = await fetch('http://localhost:5000/api/coupons/validate', {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json',
//         ...(token && { 'Authorization': `Bearer ${token}` })
//       },
//       body: JSON.stringify({ 
//         couponCode: code, 
//         cartSubtotal: subtotal,
//         userId: user?._id
//       })
//     });
    
//     const data = await response.json();
//     if (data.success) {
//       let discountAmount = data.data.discountAmount || 0;
      
//       if (data.data.freeShipping) {
//         setShippingCost(0);
//         toast.success(`Free shipping applied!`);
//       }
      
//       setDiscount(discountAmount);
//       setDiscountDetails(data.data);
//       // Set the coupon code in the input field so user can see which coupon is applied
//       setCouponCode(code);  // <-- ADD THIS LINE to show the applied coupon code
//       toast.success(`Coupon "${code}" applied!`);
//     } else {
//       toast.error(data.error || 'Invalid coupon code');
//     }
//   } catch (error) {
//     console.error('Apply coupon error:', error);
//     toast.error('Failed to apply coupon');
//   } finally {
//     setApplyingCoupon(false);
//   }
// };

//   const removeCoupon = () => {
//     setDiscount(0);
//     setDiscountDetails(null);
//     toast.success('Coupon removed');
//   };

// const validateForm = () => {
//   console.log('=== VALIDATING FORM ===');
//   console.log('formData:', formData);
//   console.log('customCity:', customCity);
//   console.log('customZone:', customZone);
  
//   const newErrors = {};
  
//   const finalCity = formData.city === 'other' ? customCity : formData.city;
//   const finalZone = formData.zone === 'other' ? customZone : formData.zone;
  
//   if (!formData.fullName?.trim()) newErrors.fullName = 'Full name is required';
//   if (!formData.email?.trim()) newErrors.email = 'Email is required';
//   else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
//   if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';
//   else if (!/^01[3-9]\d{8}$/.test(formData.phone)) newErrors.phone = 'Invalid Bangladesh phone number';
//   if (!formData.address?.trim()) newErrors.address = 'Address is required';
//   if (!finalCity) newErrors.city = 'Please select a district';
//   if (!finalZone) newErrors.zone = 'Please select a upazila/thana';
//   // REMOVE this line - don't validate zipCode
//   // if (!formData.zipCode?.trim()) newErrors.zipCode = 'Zip code is required';
  
//   console.log('Validation errors:', newErrors);
//   console.log('Validation result:', Object.keys(newErrors).length === 0);
  
//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
// };

//   const calculateSubtotal = () => {
//     return cart?.subtotal || 0;
//   };

//   const calculateTotal = () => {
//     const subtotal = calculateSubtotal();
//     const totalWithShipping = subtotal + shippingCost;
//     return totalWithShipping - discount;
//   };


//   const isLoggedIn = !!user;


// const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   if (!validateForm()) {
//     toast.error('Please fill all required fields');
//     return;
//   }
  
//   if (!cart?.items?.length) {
//     toast.error('Your cart is empty');
//     return;
//   }
  
//   setSubmitting(true);
  
//   try {
//     const token = localStorage.getItem('token');
//     const sessionId = localStorage.getItem('cartSessionId');
    
//     const finalCity = formData.city === 'other' ? customCity : formData.city;
//     const finalZone = formData.zone === 'other' ? customZone : formData.zone;
//     const finalArea = formData.area === 'other' ? customArea : formData.area;
    
//     const orderData = {
//       items: cart.items,
//       subtotal: calculateSubtotal(),
//       shippingCost,
//       discount,
//       total: calculateTotal(),
//       paymentMethod,
//       customerInfo: {
//         ...formData,
//         city: finalCity,
//         zone: finalZone,
//         area: finalArea
//       },
//       couponCode: discountDetails?.couponCode || null,
//       couponDiscount: discount,
//       freeShipping: discountDetails?.freeShipping || false
//     };
    
//     const headers = { 'Content-Type': 'application/json' };
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     } else if (sessionId) {
//       headers['x-session-id'] = sessionId;
//     }
    
//     const response = await fetch('http://localhost:5000/api/orders', {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(orderData)
//     });
    
//     const data = await response.json();
    
//     if (data.success) {
//       // Clear cart
//       await fetch('http://localhost:5000/api/cart', { method: 'DELETE', headers });
//       window.dispatchEvent(new Event('cart-update'));
      
//       const orderId = data.orderId || data.data?._id || data.data?.id;
      
//       if (isLoggedIn) {
//         // Logged in user - redirect to orders page
//         toast.success('Order placed successfully!');
//         router.push('/customer/orders');
//       } else {
//         // Guest user - show modal
//         setShowOrderSuccessModal(true);
//         setLastOrderId(orderId);
//         // Clear form for guest
//         setFormData({
//           fullName: '',
//           email: '',
//           phone: '',
//           whatsapp: '',
//           address: '',
//           city: '',
//           zone: '',
//           area: '',
//           zipCode: '',
//           country: '',
//           note: ''
//         });
//         // setSelectedCity('');
//         // setSelectedZone('');
//         // setSelectedArea('');
//         setCouponCode('');
//         setDiscount(0);
//         setDiscountDetails(null);
//       }
//     } else {
//       toast.error(data.error || 'Failed to place order');
//     }
//   } catch (error) {
//     console.error('Order submission error:', error);
//     toast.error('Network error. Please try again.');
//   } finally {
//     setSubmitting(false);
//   }
// };

//   if (loading || locationLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-[#FFF9F0] pt-24">
//           <div className="container mx-auto px-4 max-w-6xl">
//             <div className="flex items-center justify-center py-20">
//               <div className="w-8 h-8 border-4 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (!cart?.items?.length) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-[#FFF9F0] pt-24">
//           <div className="container mx-auto px-4 max-w-6xl">
//             <div className="text-center py-20">
//               <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#D4EDEE] to-[#FFE0E6] rounded-full flex items-center justify-center">
//                 <FaMoneyBillWave className="w-12 h-12 text-[#4A8A90]" />
//               </div>
//               <h2 className="text-2xl font-bold text-[#2D3A5C] mb-2">Your cart is empty</h2>
//               <Link href="/products" className="text-[#4A8A90] hover:underline">
//                 Continue Shopping
//               </Link>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const subtotal = calculateSubtotal();
//   const total = calculateTotal();


//   return (
//     <>
//       <Navbar />
      
//       <div className="min-h-screen bg-[#FFF9F0] pt-10 pb-12">
//         <div className="container mx-auto px-4 max-w-6xl">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-3">
//               <FaMoneyBillWave className="w-7 h-7 text-[#4A8A90]" />
//               <h1 className="text-2xl md:text-3xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                 Checkout
//               </h1>
//             </div>
//             <Link href="/cart" className="flex items-center gap-2 text-[#4A8A90] hover:text-[#FFB6C1] transition-colors">
//               <span>← Back to Cart</span>
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Billing Form - Left Column */}
//             <div className="lg:col-span-2">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Personal Information */}
//                 <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-6 shadow-md">
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-lg font-bold text-[#2D3A5C] flex items-center gap-2">
//                       <FaUser className="w-5 h-5 text-[#4A8A90]" />
//                       Personal Information
//                     </h2>
//                     {isLoggedIn && (
//                       <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
//                         <FaCheckCircle className="w-3 h-3" />
//                         Verified Account
//                       </span>
//                     )}
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="md:col-span-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Full Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleInputChange}
//                         disabled={isLoggedIn}
//                         className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
//                           isLoggedIn ? 'bg-gray-100 text-gray-600' : 'bg-white'
//                         } ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
//                         placeholder="Enter your full name"
//                       />
//                       {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Email <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         disabled={isLoggedIn}
//                         className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
//                           isLoggedIn ? 'bg-gray-100 text-gray-600' : 'bg-white'
//                         } ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//                         placeholder="your@email.com"
//                       />
//                       {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Phone Number <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
//                           errors.phone ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="01XXXXXXXXX"
//                       />
//                       {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         WhatsApp (Optional)
//                       </label>
//                       <input
//                         type="tel"
//                         name="whatsapp"
//                         value={formData.whatsapp}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition"
//                         placeholder="01XXXXXXXXX"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Delivery Address */}
//                 <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-6 shadow-md">
//                   <h2 className="text-lg font-bold text-[#2D3A5C] mb-4 flex items-center gap-2">
//                     <FaMapMarkerAlt className="w-5 h-5 text-[#4A8A90]" />
//                     Delivery Address
//                   </h2>
                  
//                   <div className="grid grid-cols-1 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Full Address <span className="text-red-500">*</span>
//                       </label>
//                       <textarea
//                         name="address"
//                         value={formData.address}
//                         onChange={handleInputChange}
//                         rows="3"
//                         className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition bg-white ${
//                           errors.address ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="House #, Road #, Area, City, Zip Code, Country"
//                       />
//                       {isLoggedIn && !!user?.address && (
//                         <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
//                           <FaCheckCircle className="w-3 h-3" />
//                           Your saved address has been pre-filled. You can edit it if needed.
//                         </p>
//                       )}
//                       {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           District/City <span className="text-red-500">*</span>
//                         </label>
//                         <SearchableSelect
//                           name="city"
//                           value={formData.city}
//                           onChange={handleInputChange}
//                           options={cities}
//                           placeholder="Select District"
//                           required
//                           disabled={false}
//                           error={errors.city}
//                         />
//                         {formData.city === 'other' && (
//                           <input
//                             type="text"
//                             value={customCity}
//                             onChange={(e) => setCustomCity(e.target.value)}
//                             placeholder="Enter your city"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none mt-2"
//                             required
//                           />
//                         )}
//                         {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Upazila/Thana <span className="text-red-500">*</span>
//                         </label>
//                         <SearchableSelect
//                           name="zone"
//                           value={formData.zone}
//                           onChange={handleInputChange}
//                           options={zones}
//                           placeholder="Select Upazila/Thana"
//                           required
//                           disabled={!formData.city}
//                           error={errors.zone}
//                         />
//                         {(formData.zone === 'other' || formData.city === 'other') && (
//                           <input
//                             type="text"
//                             value={customZone}
//                             onChange={(e) => setCustomZone(e.target.value)}
//                             placeholder="Enter your upazila/thana"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none mt-2"
//                             required
//                           />
//                         )}
//                         {errors.zone && <p className="text-xs text-red-500 mt-1">{errors.zone}</p>}
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Union/Area
//                         </label>
//                         <SearchableSelect
//                           name="area"
//                           value={formData.area}
//                           onChange={handleInputChange}
//                           options={areas}
//                           placeholder="Select Union/Area"
//                           disabled={!formData.zone}
//                           error={errors.area}
//                         />
//                         {(formData.area === 'other' || formData.zone === 'other' || formData.city === 'other') && (
//                           <input
//                             type="text"
//                             value={customArea}
//                             onChange={(e) => setCustomArea(e.target.value)}
//                             placeholder="Enter your union/area"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none mt-2"
//                           />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Order Notes */}
//                 <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-6 shadow-md">
//                   <h2 className="text-lg font-bold text-[#2D3A5C] mb-4 flex items-center gap-2">
//                     <FaFileAlt className="w-5 h-5 text-[#4A8A90]" />
//                     Order Notes (Optional)
//                   </h2>
//                   <textarea
//                     name="note"
//                     value={formData.note}
//                     onChange={handleInputChange}
//                     rows="3"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition"
//                     placeholder="Special instructions for delivery, gift message, etc."
//                   />
//                 </div>
//               </form>
//             </div>

//             {/* Order Summary - Right Column */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-6 sticky top-24 shadow-md">
//                 <h2 className="text-lg font-bold text-[#2D3A5C] mb-4">Order Summary</h2>
                
//                 {/* Cart Items */}
//                 <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
//                   {cart.items.map((item) => {
//                     const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
//                     const totalPrice = price * item.quantity;
//                     return (
//                       <div key={item._id} className="flex gap-3 pb-3 border-b border-gray-100">
//                         <img 
//                           src={item.image || 'https://via.placeholder.com/50'} 
//                           alt={item.productName} 
//                           className="w-12 h-12 rounded-lg object-cover"
//                           onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=Toy'; }}
//                         />
//                         <div className="flex-1">
//                           <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.productName}</p>
//                           <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//                         </div>
//                         <p className="text-sm font-bold text-[#4A8A90]">৳{totalPrice.toFixed(2)}</p>
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 {/* Price Breakdown */}
//                 <div className="space-y-2 border-t border-[#FFE0E6] pt-4">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Subtotal</span>
//                     <span>৳{subtotal.toFixed(2)}</span>
//                   </div>
                  
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Shipping</span>
//                     <span className={discountDetails?.freeShipping ? "text-green-600 line-through" : "text-green-600"}>
//                       ৳{shippingCost.toFixed(2)}
//                     </span>
//                   </div>
                  
//                   {discountDetails?.freeShipping && (
//                     <div className="flex justify-between text-sm text-green-600">
//                       <span>Free Shipping Discount</span>
//                       <span>- ৳{shippingCost.toFixed(2)}</span>
//                     </div>
//                   )}
                  
//                   {discount > 0 && (
//                     <div className="flex justify-between text-sm text-green-600">
//                       <span>Discount ({discountDetails?.couponCode})</span>
//                       <span>- ৳{discount.toFixed(2)}</span>
//                     </div>
//                   )}
                  
//                   {/* Coupon Code Input with Browse Button */}
//                   <div className="flex gap-2 mt-2">
//                     <input
//                       type="text"
//                       value={couponCode}
//                       onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
//                       placeholder="Coupon code"
//                       className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none uppercase"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => applyCoupon()}
//                       disabled={applyingCoupon}
//                       className="px-4 py-2 bg-[#FFD93D] text-[#4A8A90] font-medium rounded-lg hover:bg-[#FFE44D] transition-all disabled:opacity-50"
//                     >
//                       {applyingCoupon ? (
//                         <div className="w-4 h-4 border-2 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
//                       ) : (
//                         'Apply'
//                       )}
//                     </button>
//                     <button
//                       type="button"
//                       onClick={handleBrowseCoupons}
//                       className="px-3 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all flex items-center gap-1"
//                     >
//                       <FaSearch className="w-3 h-3" />
//                       Browse
//                     </button>
//                   </div>
                  
//                   {discount > 0 && (
//                     <button
//                       type="button"
//                       onClick={removeCoupon}
//                       className="text-xs text-red-500 hover:text-red-600 mt-1 flex items-center gap-1"
//                     >
//                       <FaTimes className="w-3 h-3" />
//                       Remove coupon
//                     </button>
//                   )}
                  
//                   <div className="flex justify-between text-lg font-bold pt-3 border-t border-[#FFE0E6]">
//                     <span>Total</span>
//                     <span className="text-[#4A8A90]">৳{total.toFixed(2)}</span>
//                   </div>
//                 </div>
                
//                 {/* Delivery Info */}
//                 <div className="mt-4 space-y-2 text-sm">
//                   <div className="flex items-center gap-2 text-green-600">
//                     <span>🚚</span>
//                     <span>Free delivery on first order</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-gray-500">
//                     <span>🛡️</span>
//                     <span>Safe & Secure Shopping</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-gray-500">
//                     <span>🔄</span>
//                     <span>7-Day Return Policy</span>
//                   </div>
//                 </div>
                
//                 {/* Payment Method */}
//                 <div className="mt-6">
//                   <PaymentSelector
//                     value={paymentMethod}
//                     onChange={setPaymentMethod}
//                     isLoading={submitting}
//                     onSubmit={handleSubmit}
//                   />
//                 </div>
                
//                 {/* Security Badge */}
//                 <div className="mt-4 text-center">
//                   <p className="text-xs text-gray-400">🔒 Your information is secure with us</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Coupon Modal */}
//       <CouponModal
//         isOpen={showCouponModal}
//         onClose={() => setShowCouponModal(false)}
//         coupons={availableCoupons}
//         onApplyCoupon={handleApplyCouponFromModal}
//         subtotal={subtotal}
//         isLoading={loadingCoupons}
//       />
//       {/* Order Success Modal for Guest Users */}
// <OrderSuccessModal
//   isOpen={showOrderSuccessModal}
//   onClose={() => {
//     setShowOrderSuccessModal(false);
//     router.push('/products');
//   }}
//   orderId={lastOrderId}
// />
      
//       <Footer />
//       <WhatsAppButton />
//     </>
//   );
// }





// 2 with pay but online pay without fix 

// 'use client';

// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';

// import { 
//   FaChevronDown, 
//   FaTag, 
//   FaCheckCircle, 
//   FaTimesCircle, 
//   FaTimes, 
//   FaTicketAlt, 
//   FaGift,
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaFileAlt,
//   FaMoneyBillWave,
//   FaCreditCard,
//   FaMobileAlt,
//   FaSearch,
//   FaEdit,
//   FaPercent,
//   FaTruck,
//   FaShoppingBag,
//   FaClock,
//   FaUsers,
//   FaCalendarAlt,
//   FaCopy
// } from 'react-icons/fa';
// import { toast } from 'sonner';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import WhatsAppButton from '../components/layout/WhatsAppButton';
// import { paymentService } from '../services/paymentService';

// const TOY_COLORS = {
//   primary: '#4A8A90',
//   secondary: '#FFB6C1',
//   accent: '#FFD93D',
//   lightBg: '#FFF9F0',
//   border: '#FFE0E6'
// };

// // Shipping Cost Constants
// const SHIPPING_COST_DHAKA = 70;
// const SHIPPING_COST_OUTSIDE = 150;

// // Searchable Select Component
// const SearchableSelect = ({ name, value, onChange, options, placeholder, required, disabled, error }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const dropdownRef = useRef(null);

//   const filteredOptions = options.filter(option =>
//     option.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSelect = (selectedValue) => {
//     onChange({ target: { name, value: selectedValue } });
//     setIsOpen(false);
//     setSearchTerm('');
//   };

//   const handleClear = () => {
//     onChange({ target: { name, value: '' } });
//     setSearchTerm('');
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const selectedOption = value && options.includes(value) ? value : '';

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className={`w-full px-4 py-3 border rounded-lg focus-within:ring-2 focus-within:ring-[#4A8A90] focus-within:border-transparent cursor-pointer flex items-center justify-between ${
//           disabled ? 'bg-gray-100' : 'bg-white'
//         } ${error ? 'border-red-500' : 'border-gray-300'}`}
//         onClick={() => !disabled && setIsOpen(!isOpen)}
//       >
//         <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
//           {selectedOption || placeholder}
//         </span>
//         <div className="flex items-center gap-2">
//           {selectedOption && (
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleClear();
//               }}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <FaTimes className="w-3 h-3" />
//             </button>
//           )}
//           <FaChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//         </div>
//       </div>

//       {isOpen && !disabled && (
//         <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
//           <div className="p-2 border-b border-gray-200">
//             <div className="relative">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//                 className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A8A90] text-sm"
//                 onClick={(e) => e.stopPropagation()}
//               />
//             </div>
//           </div>
//           <div className="overflow-y-auto max-h-48">
//             {filteredOptions.length > 0 ? (
//               filteredOptions.map((option, idx) => (
//                 <button
//                   key={idx}
//                   type="button"
//                   onClick={() => handleSelect(option)}
//                   className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors text-sm"
//                 >
//                   {option}
//                 </button>
//               ))
//             ) : (
//               <div className="px-4 py-2 text-sm text-gray-500 text-center">
//                 No results found
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//       {required && !disabled && (
//         <input type="hidden" name={name} value={value} required={required} />
//       )}
//     </div>
//   );
// };

// // Coupon Modal Component
// // Coupon Modal Component - Real Life Coupon Design
// const CouponModal = ({ isOpen, onClose, coupons, onApplyCoupon, subtotal, isLoading }) => {
//   const [selectedCoupon, setSelectedCoupon] = useState(null);
//   const [applying, setApplying] = useState(false);

//   const handleApply = async () => {
//     if (!selectedCoupon) {
//       toast.error('Please select a coupon');
//       return;
//     }
    
//     setApplying(true);
//     try {
//       await onApplyCoupon(selectedCoupon.couponCode);
//       onClose();
//     } finally {
//       setApplying(false);
//     }
//   };

//   const getDiscountText = (coupon) => {
//     if (coupon.discountType === 'percentage') {
//       return `${coupon.discountValue}% OFF`;
//     } else if (coupon.discountType === 'fixed') {
//       return `৳${coupon.discountValue} OFF`;
//     } else if (coupon.discountType === 'free_shipping') {
//       return 'FREE SHIPPING';
//     }
//     return '';
//   };

//   const meetsMinimumOrder = (coupon) => {
//     return subtotal >= (coupon.minimumOrderAmount || 0);
//   };

//   // Get coupon theme colors
//   const getCouponColors = (coupon) => {
//     if (coupon.colorTheme) {
//       return {
//         primary: coupon.colorTheme.primary || '#4A8A90',
//         secondary: coupon.colorTheme.secondary || '#D4EDEE',
//         accent: coupon.colorTheme.accent || '#FFB6C1',
//         text: coupon.colorTheme.text || '#2D3A5C',
//         bg: coupon.colorTheme.bg || '#FFF9F0'
//       };
//     }
//     return {
//       primary: '#4A8A90',
//       secondary: '#D4EDEE',
//       accent: '#FFB6C1',
//       text: '#2D3A5C',
//       bg: '#FFF9F0'
//     };
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-hidden"
//           >
//             {/* Header */}
//             <div className="p-5 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <FaGift className="w-6 h-6" />
//                   <h2 className="text-xl font-bold">Available Coupons</h2>
//                 </div>
//                 <button
//                   onClick={onClose}
//                   className="p-1 hover:bg-white/20 rounded-lg transition-colors"
//                 >
//                   <FaTimes className="w-5 h-5" />
//                 </button>
//               </div>
//               <p className="text-sm text-white/80 mt-1">Select a coupon to apply to your order</p>
//             </div>

//             {/* Body */}
//             <div className="p-5 overflow-y-auto max-h-[65vh]">
//               {isLoading ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="w-8 h-8 border-4 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
//                 </div>
//               ) : coupons.length === 0 ? (
//                 <div className="text-center py-12">
//                   <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                     <FaTicketAlt className="w-10 h-10 text-gray-400" />
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-1">No coupons available</h3>
//                   <p className="text-sm text-gray-500">
//                     You don't have any eligible coupons at the moment.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 gap-5">
//                   {coupons.map((coupon) => {
//                     const colors = getCouponColors(coupon);
//                     const isEligible = meetsMinimumOrder(coupon);
//                     const isSelected = selectedCoupon?.couponCode === coupon.couponCode;
//                     const discountText = getDiscountText(coupon);
                    
//                     return (
//                       <div
//                         key={coupon._id}
//                         className={`relative transition-all duration-300 ${
//                           !isEligible ? 'opacity-60' : ''
//                         } ${isSelected ? 'scale-[1.02]' : 'scale-100'}`}
//                         onClick={() => isEligible && setSelectedCoupon(coupon)}
//                       >
//                         {/* Real Coupon Design */}
//                         <div className="relative group cursor-pointer">
//                           {/* Dashed border coupon card */}
//                           <div 
//                             className="relative rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
//                             style={{ 
//                               background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.bg} 100%)`,
//                               border: `2px dashed ${colors.primary}`,
//                             }}
//                           >
//                             {/* Scissors cut-out effect - top */}
//                             <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-white rounded-b-full"></div>
                            
//                             {/* Corner decorations */}
//                             <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 rounded-tl-2xl" style={{ borderColor: colors.primary }}></div>
//                             <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 rounded-tr-2xl" style={{ borderColor: colors.primary }}></div>
//                             <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 rounded-bl-2xl" style={{ borderColor: colors.primary }}></div>
//                             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 rounded-br-2xl" style={{ borderColor: colors.primary }}></div>
                            
//                             {/* Selection indicator */}
//                             {isSelected && (
//                               <div className="absolute top-2 right-2 z-10">
//                                 <div className="w-6 h-6 bg-[#4A8A90] rounded-full flex items-center justify-center shadow-md">
//                                   <FaCheckCircle className="w-4 h-4 text-white" />
//                                 </div>
//                               </div>
//                             )}
                            
//                             <div className="p-5">
//                               {/* Ribbon/Badge */}
//                               {coupon.subtitle && (
//                                 <div className="absolute -top-2 right-8">
//                                   <div className="relative">
//                                     <div className="px-3 py-1 text-xs font-bold text-white rounded-full shadow-md" style={{ backgroundColor: colors.accent }}>
//                                       {coupon.subtitle}
//                                     </div>
//                                     <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent" style={{ borderTopColor: colors.accent }}></div>
//                                   </div>
//                                 </div>
//                               )}
                              
//                               <div className="flex items-start gap-4">
//                                 {/* Left side - Discount Badge */}
//                                 <div className="flex-shrink-0">
//                                   <div 
//                                     className="w-24 h-24 rounded-xl flex flex-col items-center justify-center shadow-md"
//                                     style={{ 
//                                       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
//                                     }}
//                                   >
//                                     {coupon.discountType === 'percentage' && (
//                                       <>
//                                         <span className="text-2xl font-black text-white">{coupon.discountValue}</span>
//                                         <span className="text-xs font-bold text-white">% OFF</span>
//                                       </>
//                                     )}
//                                     {coupon.discountType === 'fixed' && (
//                                       <>
//                                         <span className="text-xl font-black text-white">৳{coupon.discountValue}</span>
//                                         <span className="text-xs font-bold text-white">OFF</span>
//                                       </>
//                                     )}
//                                     {coupon.discountType === 'free_shipping' && (
//                                       <>
//                                         <FaTruck className="w-8 h-8 text-white mb-1" />
//                                         <span className="text-xs font-bold text-white">FREE SHIP</span>
//                                       </>
//                                     )}
//                                   </div>
//                                 </div>
                                
//                                 {/* Right side - Coupon Details */}
//                                 <div className="flex-1">
//                                   <h3 className="text-lg font-bold mb-1" style={{ color: colors.text }}>
//                                     {coupon.title}
//                                   </h3>
                                  
//                                   <p className="text-xs text-gray-500 mb-2 line-clamp-2">
//                                     {coupon.description || 'Special offer for you!'}
//                                   </p>
                                  
//                                   <div className="flex flex-wrap gap-2 mb-3">
//                                     {coupon.minimumOrderAmount > 0 && (
//                                       <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
//                                         <FaShoppingBag className="w-3 h-3" />
//                                         Min. ৳{coupon.minimumOrderAmount}
//                                       </span>
//                                     )}
//                                     {coupon.maxUsesPerUser > 1 && (
//                                       <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
//                                         <FaUsers className="w-3 h-3" />
//                                         Max {coupon.maxUsesPerUser} uses
//                                       </span>
//                                     )}
//                                     {coupon.expiresAt && (
//                                       <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
//                                         <FaCalendarAlt className="w-3 h-3" />
//                                         Expires: {new Date(coupon.expiresAt).toLocaleDateString()}
//                                       </span>
//                                     )}
//                                   </div>
                                  
//                                   {/* Coupon Code Box */}
//                                   <div className="mt-2">
//                                     <div className="relative flex justify-center">
//                                       <div className="absolute inset-0 flex items-center">
//                                         <div className="w-full border-t border-dashed" style={{ borderColor: colors.primary }}></div>
//                                       </div>
//                                       <div className="relative flex justify-center text-xs">
//                                         <span className="px-3 bg-white text-gray-400" style={{ backgroundColor: colors.bg }}>COUPON CODE</span>
//                                       </div>
//                                     </div>
//                                     <div className="mt-2">
//                                       <div 
//                                         className="flex items-center justify-between p-2 rounded-lg border-2"
//                                         style={{ 
//                                           backgroundColor: colors.secondary,
//                                           borderColor: colors.primary
//                                         }}
//                                       >
//                                         <code className="text-sm font-mono font-bold tracking-wider" style={{ color: colors.primary }}>
//                                           {coupon.couponCode}
//                                         </code>
//                                         <button
//                                           type="button"
//                                           onClick={(e) => {
//                                             e.stopPropagation();
//                                             navigator.clipboard.writeText(coupon.couponCode);
//                                             toast.success('Code copied!');
//                                           }}
//                                           className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg transition-all hover:scale-105"
//                                           style={{ 
//                                             backgroundColor: colors.primary,
//                                             color: 'white'
//                                           }}
//                                         >
//                                           <FaCopy className="w-3 h-3" />
//                                           Copy
//                                         </button>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
                              
//                               {/* Highlight Text Bar */}
//                               {coupon.highlightText && (
//                                 <div className="mt-3 pt-3 border-t text-center" style={{ borderColor: colors.secondary }}>
//                                   <p className="text-xs font-semibold" style={{ color: colors.primary }}>
//                                     🎉 {coupon.highlightText} 🎉
//                                   </p>
//                                 </div>
//                               )}
//                             </div>
                            
//                             {/* Scissors cut-out effect - bottom */}
//                             <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-white rounded-t-full"></div>
//                           </div>
                          
//                           {/* Not eligible overlay */}
//                           {!isEligible && (
//                             <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center">
//                               <div className="text-center p-3">
//                                 <FaClock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
//                                 <p className="text-xs text-orange-700 font-medium">
//                                   Add ৳{(coupon.minimumOrderAmount - subtotal).toFixed(2)} more to qualify
//                                 </p>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="p-5 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
//               <button
//                 onClick={onClose}
//                 className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleApply}
//                 disabled={!selectedCoupon || applying}
//                 className="px-6 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 {applying ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Applying...
//                   </>
//                 ) : (
//                   <>
//                     <FaCheckCircle className="w-4 h-4" />
//                     Apply Coupon
//                   </>
//                 )}
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// // Payment Selector Component
// const PaymentSelector = ({ value, onChange, isLoading, onSubmit }) => {
//   const paymentMethods = [
//     { 
//       id: 'cod', 
//       name: 'Cash on Delivery', 
//       icon: FaMoneyBillWave,
//       description: 'Pay when you receive your toys'
//     },
//     { 
//       id: 'online', 
//       name: 'Online Payment', 
//       icon: FaCreditCard,
//       description: 'Pay via bKash, Nagad, or Card'
//     },
//     { 
//       id: 'bkash', 
//       name: 'bKash', 
//       icon: FaMobileAlt,
//       description: 'Pay with bKash mobile banking'
//     },
//     { 
//       id: 'nagad', 
//       name: 'Nagad', 
//       icon: FaMobileAlt,
//       description: 'Pay with Nagad mobile banking'
//     }
//   ];

//   return (
//     <div>
//       <div className="space-y-3 mb-6">
//         {paymentMethods.map((method) => (
//           <label
//             key={method.id}
//             className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
//               value === method.id
//                 ? 'border-[#4A8A90] bg-[#D4EDEE]'
//                 : 'border-gray-200 hover:border-gray-300'
//             }`}
//           >
//             <input
//               type="radio"
//               name="paymentMethod"
//               value={method.id}
//               checked={value === method.id}
//               onChange={() => onChange(method.id)}
//               className="mt-1 w-4 h-4 text-[#4A8A90] focus:ring-[#4A8A90]"
//             />
//             <method.icon className={`w-5 h-5 ${
//               value === method.id ? 'text-[#4A8A90]' : 'text-gray-500'
//             }`} />
//             <div className="flex-1">
//               <span className={`font-medium ${
//                 value === method.id ? 'text-[#4A8A90]' : 'text-gray-700'
//               }`}>
//                 {method.name}
//               </span>
//               <p className="text-xs text-gray-500">{method.description}</p>
//             </div>
//           </label>
//         ))}
//       </div>
      
//       <button
//         type="button"
//         onClick={onSubmit}
//         disabled={isLoading}
//         className="w-full bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white py-3 rounded-lg font-semibold hover:from-[#3A7A80] hover:to-[#5B9399] transition disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center gap-2">
//             <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//             </svg>
//             Processing...
//           </div>
//         ) : (
//           'Place Order'
//         )}
//       </button>
//     </div>
//   );
// };


// // Order Success Modal for Guest Users
// const OrderSuccessModal = ({ isOpen, onClose, orderId }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden"
//           >
//             {/* Header */}
//             <div className="p-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center">
//               <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
//                 <FaCheckCircle className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-xl font-bold">Order Placed Successfully! 🎉</h2>
//             </div>
            
//             {/* Body */}
//             <div className="p-5 text-center">
//               <p className="text-gray-700 mb-2">
//                 Thank you for your order!
//               </p>
//               <p className="text-sm text-gray-500 mb-4">
//                 Your order has been received and is being processed.
//               </p>
//               {orderId && (
//                 <p className="text-xs text-gray-400 mb-4">
//                   Order ID: {orderId.slice(-8).toUpperCase()}
//                 </p>
//               )}
//               <div className="bg-blue-50 rounded-lg p-3 mb-4">
//                 <p className="text-sm text-blue-700">
//                   📧 A confirmation email has been sent to your email address.
//                 </p>
//               </div>
             
//             </div>
            
//             {/* Footer */}
//             <div className="p-5 border-t border-gray-200 bg-gray-50 flex gap-3">
//               <button
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition-colors"
//               >
//                 Continue Shopping
//               </button>
//               <Link href="/" className="flex-1">
//                 <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//                   Back to Home
//                 </button>
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default function CheckoutPage() {
//   const router = useRouter();
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [user, setUser] = useState(null);
//   const [discount, setDiscount] = useState(0);
//   const [discountDetails, setDiscountDetails] = useState(null);
//   const [couponCode, setCouponCode] = useState('');
//   const [applyingCoupon, setApplyingCoupon] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('cod');
//   const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
// const [lastOrderId, setLastOrderId] = useState(null);
//   const [shippingCost, setShippingCost] = useState(SHIPPING_COST_OUTSIDE);
//   const [processingPayment, setProcessingPayment] = useState(false);
  
//   // Coupon Modal State
//   const [showCouponModal, setShowCouponModal] = useState(false);
//   const [availableCoupons, setAvailableCoupons] = useState([]);
//   const [loadingCoupons, setLoadingCoupons] = useState(false);

//   // Location data from API
//   const [locationData, setLocationData] = useState({});
//   const [cities, setCities] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [locationLoading, setLocationLoading] = useState(true);

//   // Custom input states for "Other" option
//   const [customCity, setCustomCity] = useState('');
//   const [customZone, setCustomZone] = useState('');
//   const [customArea, setCustomArea] = useState('');

//   // Form fields
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     address: '',
//     city: '',
//     zone: '',
//     area: '',
//     zipCode: '',
//     country: '',
//     note: ''
//   });

//   const [errors, setErrors] = useState({});

//   // Fetch location data
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await fetch('/api/locations');
//         const data = await response.json();
//         setLocationData(data.locationData || {});
//         const cityList = data.locationData ? Object.keys(data.locationData) : [];
//         setCities(cityList);
//         setLocationLoading(false);
//       } catch (error) {
//         console.error('Failed to load location data:', error);
//         setLocationLoading(false);
//       }
//     };
//     fetchLocations();
//   }, []);

//   // Update zones when city changes
//   useEffect(() => {
//     const selectedCity = formData.city === 'other' ? customCity : formData.city;
//     if (selectedCity && locationData[selectedCity]) {
//       const availableZones = Object.keys(locationData[selectedCity].zones || {});
//       setZones(availableZones);
//       setFormData(prev => ({ ...prev, zone: '', area: '' }));
//       setAreas([]);
      
//       // Update shipping cost based on city
//       const isDhaka = selectedCity.toLowerCase() === 'dhaka';
//       setShippingCost(isDhaka ? SHIPPING_COST_DHAKA : SHIPPING_COST_OUTSIDE);
//     }
//   }, [formData.city, customCity, locationData]);

//   // Update areas when zone changes
//   useEffect(() => {
//     const selectedCity = formData.city === 'other' ? customCity : formData.city;
//     const selectedZone = formData.zone === 'other' ? customZone : formData.zone;
    
//     if (selectedCity && selectedZone && locationData[selectedCity]) {
//       const availableAreas = locationData[selectedCity].zones[selectedZone] || [];
//       setAreas(availableAreas);
//       setFormData(prev => ({ ...prev, area: '' }));
//     }
//   }, [formData.zone, customZone, formData.city, customCity, locationData]);

//   // Fetch cart and user data
//   useEffect(() => {
//     fetchCart();
//     fetchUser();
//   }, []);

//   // Auto-fill form if user is logged in
//   useEffect(() => {
//     if (user) {
//       const addressParts = [];
//       if (user.address) addressParts.push(user.address);
//       if (user.city) addressParts.push(user.city);
//       if (user.zipCode) addressParts.push(user.zipCode);
//       if (user.country) addressParts.push(user.country);
      
//       const combinedAddress = addressParts.join(', ');
      
//       setFormData(prev => ({
//         ...prev,
//         fullName: user.contactPerson || user.companyName || '',
//         email: user.email || '',
//         phone: user.phone || '',
//         whatsapp: user.whatsapp || '',
//         address: combinedAddress || '',
//         city: user.city || '',
//         zipCode: user.zipCode || '',
//         country: user.country || 'Bangladesh',
//       }));
      
//       if (user.city) {
//         const cityExists = cities.includes(user.city);
//         if (cityExists) {
//           setFormData(prev => ({ ...prev, city: user.city }));
//         } else if (user.city) {
//           setFormData(prev => ({ ...prev, city: 'other' }));
//           setCustomCity(user.city);
//         }
//       }
      
//       if (user.zone) {
//         setFormData(prev => ({ ...prev, zone: user.zone }));
//       }
//       if (user.area) {
//         setFormData(prev => ({ ...prev, area: user.area }));
//       }
//     }
//   }, [user, cities]);

//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         const response = await fetch('http://localhost:5000/api/auth/me', {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
//         const data = await response.json();
//         if (data.success) {
//           setUser(data.user);
//         }
//       }
//     } catch (error) {
//       console.error('Fetch user error:', error);
//     }
//   };

//   const fetchCart = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch('http://localhost:5000/api/cart', { headers });
//       const data = await response.json();
      
//       if (data.success && data.data.items?.length > 0) {
//         setCart(data.data);
//       } else {
//         toast.error('Your cart is empty');
//         router.push('/products');
//       }
//     } catch (error) {
//       console.error('Fetch cart error:', error);
//       toast.error('Failed to load cart');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch available coupons for the user
//   const fetchAvailableCoupons = async () => {
//     setLoadingCoupons(true);
//     try {
//       const token = localStorage.getItem('token');
//       const userId = user?._id;
//       const subtotal = calculateSubtotal();
      
//       // Get cart product IDs and category IDs for validation
//       const productIds = cart?.items.map(item => item.productId) || [];
//       const categoryIds = []; // You can fetch category IDs from products if needed
      
//       const response = await fetch('http://localhost:5000/api/coupons/available', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           ...(token && { 'Authorization': `Bearer ${token}` })
//         },
//         body: JSON.stringify({
//           userId,
//           subtotal,
//           productIds,
//           categoryIds
//         })
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         setAvailableCoupons(data.data);
//       } else {
//         setAvailableCoupons([]);
//       }
//     } catch (error) {
//       console.error('Error fetching coupons:', error);
//       setAvailableCoupons([]);
//     } finally {
//       setLoadingCoupons(false);
//     }
//   };

//   // Open coupon modal and fetch coupons
//   const handleBrowseCoupons = () => {
//     if (!user) {
//       toast.info('Please login to view available coupons');
//       return;
//     }
//     fetchAvailableCoupons();
//     setShowCouponModal(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//      console.log(`Setting ${name} to ${value}`); 
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//  const applyCoupon = async (code = couponCode) => {
//   if (!code.trim()) {
//     toast.error('Please enter a coupon code');
//     return;
//   }
  
//   setApplyingCoupon(true);
//   try {
//     const token = localStorage.getItem('token');
//     const subtotal = calculateSubtotal();
    
//     const response = await fetch('http://localhost:5000/api/coupons/validate', {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json',
//         ...(token && { 'Authorization': `Bearer ${token}` })
//       },
//       body: JSON.stringify({ 
//         couponCode: code, 
//         cartSubtotal: subtotal,
//         userId: user?._id
//       })
//     });
    
//     const data = await response.json();
//     if (data.success) {
//       let discountAmount = data.data.discountAmount || 0;
      
//       // If free shipping coupon, set shipping cost to 0
//       if (data.data.freeShipping) {
//         setShippingCost(0);
//         toast.success(`Free shipping applied!`);
//       }
      
//       setDiscount(discountAmount);
//       setDiscountDetails(data.data);
//       toast.success(`Coupon "${code}" applied! You saved ${discountAmount > 0 ? `৳${discountAmount}` : 'free shipping'}`);
      
//       // Only clear the coupon code input if it was manually entered (not from modal)
//       // But keep it visible so user can see which coupon is applied
//       // Actually, let's NOT clear it - show the applied coupon code
//       // setCouponCode(''); // <-- REMOVE THIS LINE to keep the code visible
      
//     } else {
//       toast.error(data.error || 'Invalid coupon code');
//       setDiscount(0);
//       setDiscountDetails(null);
//     }
//   } catch (error) {
//     console.error('Apply coupon error:', error);
//     toast.error('Failed to apply coupon');
//   } finally {
//     setApplyingCoupon(false);
//   }
// };

// const handleApplyCouponFromModal = async (code) => {
//   setApplyingCoupon(true);
//   try {
//     const token = localStorage.getItem('token');
//     const subtotal = calculateSubtotal();
    
//     const response = await fetch('http://localhost:5000/api/coupons/validate', {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json',
//         ...(token && { 'Authorization': `Bearer ${token}` })
//       },
//       body: JSON.stringify({ 
//         couponCode: code, 
//         cartSubtotal: subtotal,
//         userId: user?._id
//       })
//     });
    
//     const data = await response.json();
//     if (data.success) {
//       let discountAmount = data.data.discountAmount || 0;
      
//       if (data.data.freeShipping) {
//         setShippingCost(0);
//         toast.success(`Free shipping applied!`);
//       }
      
//       setDiscount(discountAmount);
//       setDiscountDetails(data.data);
//       // Set the coupon code in the input field so user can see which coupon is applied
//       setCouponCode(code);  // <-- ADD THIS LINE to show the applied coupon code
//       toast.success(`Coupon "${code}" applied!`);
//     } else {
//       toast.error(data.error || 'Invalid coupon code');
//     }
//   } catch (error) {
//     console.error('Apply coupon error:', error);
//     toast.error('Failed to apply coupon');
//   } finally {
//     setApplyingCoupon(false);
//   }
// };

//   const removeCoupon = () => {
//     setDiscount(0);
//     setDiscountDetails(null);
//     toast.success('Coupon removed');
//   };

// const validateForm = () => {
//   console.log('=== VALIDATING FORM ===');
//   console.log('formData:', formData);
//   console.log('customCity:', customCity);
//   console.log('customZone:', customZone);
  
//   const newErrors = {};
  
//   const finalCity = formData.city === 'other' ? customCity : formData.city;
//   const finalZone = formData.zone === 'other' ? customZone : formData.zone;
  
//   if (!formData.fullName?.trim()) newErrors.fullName = 'Full name is required';
//   if (!formData.email?.trim()) newErrors.email = 'Email is required';
//   else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
//   if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';
//   else if (!/^01[3-9]\d{8}$/.test(formData.phone)) newErrors.phone = 'Invalid Bangladesh phone number';
//   if (!formData.address?.trim()) newErrors.address = 'Address is required';
//   if (!finalCity) newErrors.city = 'Please select a district';
//   if (!finalZone) newErrors.zone = 'Please select a upazila/thana';
//   // REMOVE this line - don't validate zipCode
//   // if (!formData.zipCode?.trim()) newErrors.zipCode = 'Zip code is required';
  
//   console.log('Validation errors:', newErrors);
//   console.log('Validation result:', Object.keys(newErrors).length === 0);
  
//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
// };

//   const calculateSubtotal = () => {
//     return cart?.subtotal || 0;
//   };

//   const calculateTotal = () => {
//     const subtotal = calculateSubtotal();
//     const totalWithShipping = subtotal + shippingCost;
//     return totalWithShipping - discount;
//   };


//   const isLoggedIn = !!user;


// // const handleSubmit = async (e) => {
// //   e.preventDefault();
  
// //   if (!validateForm()) {
// //     toast.error('Please fill all required fields');
// //     return;
// //   }
  
// //   if (!cart?.items?.length) {
// //     toast.error('Your cart is empty');
// //     return;
// //   }
  
// //   setSubmitting(true);
  
// //   try {
// //     const token = localStorage.getItem('token');
// //     const sessionId = localStorage.getItem('cartSessionId');
    
// //     const finalCity = formData.city === 'other' ? customCity : formData.city;
// //     const finalZone = formData.zone === 'other' ? customZone : formData.zone;
// //     const finalArea = formData.area === 'other' ? customArea : formData.area;
    
// //     const orderData = {
// //       items: cart.items,
// //       subtotal: calculateSubtotal(),
// //       shippingCost,
// //       discount,
// //       total: calculateTotal(),
// //       paymentMethod,
// //       customerInfo: {
// //         ...formData,
// //         city: finalCity,
// //         zone: finalZone,
// //         area: finalArea
// //       },
// //       couponCode: discountDetails?.couponCode || null,
// //       couponDiscount: discount,
// //       freeShipping: discountDetails?.freeShipping || false
// //     };
    
// //     const headers = { 'Content-Type': 'application/json' };
// //     if (token) {
// //       headers['Authorization'] = `Bearer ${token}`;
// //     } else if (sessionId) {
// //       headers['x-session-id'] = sessionId;
// //     }
    
// //     const response = await fetch('http://localhost:5000/api/orders', {
// //       method: 'POST',
// //       headers,
// //       body: JSON.stringify(orderData)
// //     });
    
// //     const data = await response.json();
    
// //     if (data.success) {
// //       // Clear cart
// //       await fetch('http://localhost:5000/api/cart', { method: 'DELETE', headers });
// //       window.dispatchEvent(new Event('cart-update'));
      
// //       const orderId = data.orderId || data.data?._id || data.data?.id;
      
// //       if (isLoggedIn) {
// //         // Logged in user - redirect to orders page
// //         toast.success('Order placed successfully!');
// //         router.push('/customer/orders');
// //       } else {
// //         // Guest user - show modal
// //         setShowOrderSuccessModal(true);
// //         setLastOrderId(orderId);
// //         // Clear form for guest
// //         setFormData({
// //           fullName: '',
// //           email: '',
// //           phone: '',
// //           whatsapp: '',
// //           address: '',
// //           city: '',
// //           zone: '',
// //           area: '',
// //           zipCode: '',
// //           country: '',
// //           note: ''
// //         });
// //         // setSelectedCity('');
// //         // setSelectedZone('');
// //         // setSelectedArea('');
// //         setCouponCode('');
// //         setDiscount(0);
// //         setDiscountDetails(null);
// //       }
// //     } else {
// //       toast.error(data.error || 'Failed to place order');
// //     }
// //   } catch (error) {
// //     console.error('Order submission error:', error);
// //     toast.error('Network error. Please try again.');
// //   } finally {
// //     setSubmitting(false);
// //   }
// // };



// // Replace your existing handleSubmit function
// const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   if (!validateForm()) {
//     toast.error('Please fill all required fields');
//     return;
//   }
  
//   if (!cart?.items?.length) {
//     toast.error('Your cart is empty');
//     return;
//   }
  
//   setSubmitting(true);
  
//   try {
//     const token = localStorage.getItem('token');
//     const sessionId = localStorage.getItem('cartSessionId');
    
//     const finalCity = formData.city === 'other' ? customCity : formData.city;
//     const finalZone = formData.zone === 'other' ? customZone : formData.zone;
//     const finalArea = formData.area === 'other' ? customArea : formData.area;
    
//     const orderData = {
//       items: cart.items,
//       subtotal: calculateSubtotal(),
//       shippingCost,
//       discount,
//       total: calculateTotal(),
//       paymentMethod,
//       customerInfo: {
//         ...formData,
//         city: finalCity,
//         zone: finalZone,
//         area: finalArea
//       },
//       couponCode: discountDetails?.couponCode || null,
//       couponDiscount: discount,
//       freeShipping: discountDetails?.freeShipping || false
//     };
    
//     const headers = { 'Content-Type': 'application/json' };
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     } else if (sessionId) {
//       headers['x-session-id'] = sessionId;
//     }
    
//     // First create the order
//     const response = await fetch('http://localhost:5000/api/orders', {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(orderData)
//     });
    
//     const data = await response.json();
    
//     if (data.success) {
//       const orderId = data.orderId || data.data?._id || data.data?.id;
      
//       // Handle online payment methods
//       if (paymentMethod === 'online' || paymentMethod === 'bkash' || paymentMethod === 'nagad') {
//         setProcessingPayment(true);
        
//         // Define return URLs
//         const returnUrl = `${window.location.origin}/payment/success`;
//         const cancelUrl = `${window.location.origin}/payment/cancel`;
        
//         // Initiate payment with SSL Commerz
//         const paymentResult = await paymentService.initiatePayment(orderId, returnUrl, cancelUrl);
        
//         if (paymentResult.success && paymentResult.gatewayUrl) {
//           // Redirect to SSL Commerz payment page
//           window.location.href = paymentResult.gatewayUrl;
//         } else {
//           toast.error(paymentResult.error || 'Failed to initiate payment');
//           setProcessingPayment(false);
//         }
//       } else {
//         // COD flow
//         await fetch('http://localhost:5000/api/cart', { method: 'DELETE', headers });
//         window.dispatchEvent(new Event('cart-update'));
        
//         if (isLoggedIn) {
//           toast.success('Order placed successfully!');
//           router.push('/customer/orders');
//         } else {
//           setShowOrderSuccessModal(true);
//           setLastOrderId(orderId);
//           resetForm();
//         }
//       }
//     } else {
//       toast.error(data.error || 'Failed to place order');
//     }
//   } catch (error) {
//     console.error('Order submission error:', error);
//     toast.error('Network error. Please try again.');
//   } finally {
//     setSubmitting(false);
//     setProcessingPayment(false);
//   }
// };

// // Add resetForm function
// const resetForm = () => {
//   setFormData({
//     fullName: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     address: '',
//     city: '',
//     zone: '',
//     area: '',
//     zipCode: '',
//     country: '',
//     note: ''
//   });
//   setCouponCode('');
//   setDiscount(0);
//   setDiscountDetails(null);
// };

//   if (loading || locationLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-[#FFF9F0] pt-24">
//           <div className="container mx-auto px-4 max-w-6xl">
//             <div className="flex items-center justify-center py-20">
//               <div className="w-8 h-8 border-4 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (!cart?.items?.length) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-[#FFF9F0] pt-24">
//           <div className="container mx-auto px-4 max-w-6xl">
//             <div className="text-center py-20">
//               <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#D4EDEE] to-[#FFE0E6] rounded-full flex items-center justify-center">
//                 <FaMoneyBillWave className="w-12 h-12 text-[#4A8A90]" />
//               </div>
//               <h2 className="text-2xl font-bold text-[#2D3A5C] mb-2">Your cart is empty</h2>
//               <Link href="/products" className="text-[#4A8A90] hover:underline">
//                 Continue Shopping
//               </Link>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const subtotal = calculateSubtotal();
//   const total = calculateTotal();


//   return (
//     <>
//       <Navbar />
      
//       <div className="min-h-screen bg-[#FFF9F0] pt-10 pb-12">
//         <div className="container mx-auto px-4 max-w-6xl">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-3">
//               <FaMoneyBillWave className="w-7 h-7 text-[#4A8A90]" />
//               <h1 className="text-2xl md:text-3xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                 Checkout
//               </h1>
//             </div>
//             <Link href="/cart" className="flex items-center gap-2 text-[#4A8A90] hover:text-[#FFB6C1] transition-colors">
//               <span>← Back to Cart</span>
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Billing Form - Left Column */}
//             <div className="lg:col-span-2">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Personal Information */}
//                 <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-6 shadow-md">
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-lg font-bold text-[#2D3A5C] flex items-center gap-2">
//                       <FaUser className="w-5 h-5 text-[#4A8A90]" />
//                       Personal Information
//                     </h2>
//                     {isLoggedIn && (
//                       <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
//                         <FaCheckCircle className="w-3 h-3" />
//                         Verified Account
//                       </span>
//                     )}
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="md:col-span-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Full Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleInputChange}
//                         disabled={isLoggedIn}
//                         className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
//                           isLoggedIn ? 'bg-gray-100 text-gray-600' : 'bg-white'
//                         } ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
//                         placeholder="Enter your full name"
//                       />
//                       {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Email <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         disabled={isLoggedIn}
//                         className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
//                           isLoggedIn ? 'bg-gray-100 text-gray-600' : 'bg-white'
//                         } ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//                         placeholder="your@email.com"
//                       />
//                       {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Phone Number <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
//                           errors.phone ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="01XXXXXXXXX"
//                       />
//                       {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         WhatsApp (Optional)
//                       </label>
//                       <input
//                         type="tel"
//                         name="whatsapp"
//                         value={formData.whatsapp}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition"
//                         placeholder="01XXXXXXXXX"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Delivery Address */}
//                 <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-6 shadow-md">
//                   <h2 className="text-lg font-bold text-[#2D3A5C] mb-4 flex items-center gap-2">
//                     <FaMapMarkerAlt className="w-5 h-5 text-[#4A8A90]" />
//                     Delivery Address
//                   </h2>
                  
//                   <div className="grid grid-cols-1 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Full Address <span className="text-red-500">*</span>
//                       </label>
//                       <textarea
//                         name="address"
//                         value={formData.address}
//                         onChange={handleInputChange}
//                         rows="3"
//                         className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition bg-white ${
//                           errors.address ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="House #, Road #, Area, City, Zip Code, Country"
//                       />
//                       {isLoggedIn && !!user?.address && (
//                         <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
//                           <FaCheckCircle className="w-3 h-3" />
//                           Your saved address has been pre-filled. You can edit it if needed.
//                         </p>
//                       )}
//                       {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           District/City <span className="text-red-500">*</span>
//                         </label>
//                         <SearchableSelect
//                           name="city"
//                           value={formData.city}
//                           onChange={handleInputChange}
//                           options={cities}
//                           placeholder="Select District"
//                           required
//                           disabled={false}
//                           error={errors.city}
//                         />
//                         {formData.city === 'other' && (
//                           <input
//                             type="text"
//                             value={customCity}
//                             onChange={(e) => setCustomCity(e.target.value)}
//                             placeholder="Enter your city"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none mt-2"
//                             required
//                           />
//                         )}
//                         {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Upazila/Thana <span className="text-red-500">*</span>
//                         </label>
//                         <SearchableSelect
//                           name="zone"
//                           value={formData.zone}
//                           onChange={handleInputChange}
//                           options={zones}
//                           placeholder="Select Upazila/Thana"
//                           required
//                           disabled={!formData.city}
//                           error={errors.zone}
//                         />
//                         {(formData.zone === 'other' || formData.city === 'other') && (
//                           <input
//                             type="text"
//                             value={customZone}
//                             onChange={(e) => setCustomZone(e.target.value)}
//                             placeholder="Enter your upazila/thana"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none mt-2"
//                             required
//                           />
//                         )}
//                         {errors.zone && <p className="text-xs text-red-500 mt-1">{errors.zone}</p>}
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Union/Area
//                         </label>
//                         <SearchableSelect
//                           name="area"
//                           value={formData.area}
//                           onChange={handleInputChange}
//                           options={areas}
//                           placeholder="Select Union/Area"
//                           disabled={!formData.zone}
//                           error={errors.area}
//                         />
//                         {(formData.area === 'other' || formData.zone === 'other' || formData.city === 'other') && (
//                           <input
//                             type="text"
//                             value={customArea}
//                             onChange={(e) => setCustomArea(e.target.value)}
//                             placeholder="Enter your union/area"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none mt-2"
//                           />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Order Notes */}
//                 <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-6 shadow-md">
//                   <h2 className="text-lg font-bold text-[#2D3A5C] mb-4 flex items-center gap-2">
//                     <FaFileAlt className="w-5 h-5 text-[#4A8A90]" />
//                     Order Notes (Optional)
//                   </h2>
//                   <textarea
//                     name="note"
//                     value={formData.note}
//                     onChange={handleInputChange}
//                     rows="3"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition"
//                     placeholder="Special instructions for delivery, gift message, etc."
//                   />
//                 </div>
//               </form>
//             </div>

//             {/* Order Summary - Right Column */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-6 sticky top-24 shadow-md">
//                 <h2 className="text-lg font-bold text-[#2D3A5C] mb-4">Order Summary</h2>
                
//                 {/* Cart Items */}
//                 <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
//                   {cart.items.map((item) => {
//                     const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
//                     const totalPrice = price * item.quantity;
//                     return (
//                       <div key={item._id} className="flex gap-3 pb-3 border-b border-gray-100">
//                         <img 
//                           src={item.image || 'https://via.placeholder.com/50'} 
//                           alt={item.productName} 
//                           className="w-12 h-12 rounded-lg object-cover"
//                           onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=Toy'; }}
//                         />
//                         <div className="flex-1">
//                           <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.productName}</p>
//                           <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//                         </div>
//                         <p className="text-sm font-bold text-[#4A8A90]">৳{totalPrice.toFixed(2)}</p>
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 {/* Price Breakdown */}
//                 <div className="space-y-2 border-t border-[#FFE0E6] pt-4">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Subtotal</span>
//                     <span>৳{subtotal.toFixed(2)}</span>
//                   </div>
                  
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Shipping</span>
//                     <span className={discountDetails?.freeShipping ? "text-green-600 line-through" : "text-green-600"}>
//                       ৳{shippingCost.toFixed(2)}
//                     </span>
//                   </div>
                  
//                   {discountDetails?.freeShipping && (
//                     <div className="flex justify-between text-sm text-green-600">
//                       <span>Free Shipping Discount</span>
//                       <span>- ৳{shippingCost.toFixed(2)}</span>
//                     </div>
//                   )}
                  
//                   {discount > 0 && (
//                     <div className="flex justify-between text-sm text-green-600">
//                       <span>Discount ({discountDetails?.couponCode})</span>
//                       <span>- ৳{discount.toFixed(2)}</span>
//                     </div>
//                   )}
                  
//                   {/* Coupon Code Input with Browse Button */}
//                   <div className="flex gap-2 mt-2">
//                     <input
//                       type="text"
//                       value={couponCode}
//                       onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
//                       placeholder="Coupon code"
//                       className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none uppercase"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => applyCoupon()}
//                       disabled={applyingCoupon}
//                       className="px-4 py-2 bg-[#FFD93D] text-[#4A8A90] font-medium rounded-lg hover:bg-[#FFE44D] transition-all disabled:opacity-50"
//                     >
//                       {applyingCoupon ? (
//                         <div className="w-4 h-4 border-2 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
//                       ) : (
//                         'Apply'
//                       )}
//                     </button>
//                     <button
//                       type="button"
//                       onClick={handleBrowseCoupons}
//                       className="px-3 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all flex items-center gap-1"
//                     >
//                       <FaSearch className="w-3 h-3" />
//                       Browse
//                     </button>
//                   </div>
                  
//                   {discount > 0 && (
//                     <button
//                       type="button"
//                       onClick={removeCoupon}
//                       className="text-xs text-red-500 hover:text-red-600 mt-1 flex items-center gap-1"
//                     >
//                       <FaTimes className="w-3 h-3" />
//                       Remove coupon
//                     </button>
//                   )}
                  
//                   <div className="flex justify-between text-lg font-bold pt-3 border-t border-[#FFE0E6]">
//                     <span>Total</span>
//                     <span className="text-[#4A8A90]">৳{total.toFixed(2)}</span>
//                   </div>
//                 </div>
                
//                 {/* Delivery Info */}
//                 <div className="mt-4 space-y-2 text-sm">
//                   <div className="flex items-center gap-2 text-green-600">
//                     <span>🚚</span>
//                     <span>Free delivery on first order</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-gray-500">
//                     <span>🛡️</span>
//                     <span>Safe & Secure Shopping</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-gray-500">
//                     <span>🔄</span>
//                     <span>7-Day Return Policy</span>
//                   </div>
//                 </div>
                
//                 {/* Payment Method */}
//                 <div className="mt-6">
//                   <PaymentSelector
//                     value={paymentMethod}
//                     onChange={setPaymentMethod}
//                     isLoading={submitting}
//                     onSubmit={handleSubmit}
//                   />
//                 </div>
                
//                 {/* Security Badge */}
//                 <div className="mt-4 text-center">
//                   <p className="text-xs text-gray-400">🔒 Your information is secure with us</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Coupon Modal */}
//       <CouponModal
//         isOpen={showCouponModal}
//         onClose={() => setShowCouponModal(false)}
//         coupons={availableCoupons}
//         onApplyCoupon={handleApplyCouponFromModal}
//         subtotal={subtotal}
//         isLoading={loadingCoupons}
//       />
//       {/* Order Success Modal for Guest Users */}
// <OrderSuccessModal
//   isOpen={showOrderSuccessModal}
//   onClose={() => {
//     setShowOrderSuccessModal(false);
//     router.push('/products');
//   }}
//   orderId={lastOrderId}
// />
      
//       <Footer />
//       <WhatsAppButton />
//     </>
//   );
// }




'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  FaChevronDown, 
  FaTag, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaTimes, 
  FaTicketAlt, 
  FaGift,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFileAlt,
  FaMoneyBillWave,
  FaCreditCard,
  FaMobileAlt,
  FaSearch,
  FaEdit,
  FaPercent,
  FaTruck,
  FaShoppingBag,
  FaClock,
  FaUsers,
  FaCalendarAlt,
  FaCopy
} from 'react-icons/fa';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/layout/WhatsAppButton';
import { paymentService } from '../services/paymentService';

const TOY_COLORS = {
  primary: '#4A8A90',
  secondary: '#FFB6C1',
  accent: '#FFD93D',
  lightBg: '#FFF9F0',
  border: '#FFE0E6'
};

// Shipping Cost Constants
const SHIPPING_COST_DHAKA = 70;
const SHIPPING_COST_OUTSIDE = 150;

// Searchable Select Component
const SearchableSelect = ({ name, value, onChange, options, placeholder, required, disabled, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (selectedValue) => {
    onChange({ target: { name, value: selectedValue } });
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    onChange({ target: { name, value: '' } });
    setSearchTerm('');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = value && options.includes(value) ? value : '';

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`w-full px-4 py-3 border rounded-lg focus-within:ring-2 focus-within:ring-[#4A8A90] focus-within:border-transparent cursor-pointer flex items-center justify-between ${
          disabled ? 'bg-gray-100' : 'bg-white'
        } ${error ? 'border-red-500' : 'border-gray-300'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
          {selectedOption || placeholder}
        </span>
        <div className="flex items-center gap-2">
          {selectedOption && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          )}
          <FaChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A8A90] text-sm"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-48">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors text-sm"
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500 text-center">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
      {required && !disabled && (
        <input type="hidden" name={name} value={value} required={required} />
      )}
    </div>
  );
};

// Coupon Modal Component
const CouponModal = ({ isOpen, onClose, coupons, onApplyCoupon, subtotal, isLoading }) => {
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [applying, setApplying] = useState(false);

  const handleApply = async () => {
    if (!selectedCoupon) {
      toast.error('Please select a coupon');
      return;
    }
    
    setApplying(true);
    try {
      await onApplyCoupon(selectedCoupon.couponCode);
      onClose();
    } finally {
      setApplying(false);
    }
  };

  const getDiscountText = (coupon) => {
    if (coupon.discountType === 'percentage') {
      return `${coupon.discountValue}% OFF`;
    } else if (coupon.discountType === 'fixed') {
      return `৳${coupon.discountValue} OFF`;
    } else if (coupon.discountType === 'free_shipping') {
      return 'FREE SHIPPING';
    }
    return '';
  };

  const meetsMinimumOrder = (coupon) => {
    return subtotal >= (coupon.minimumOrderAmount || 0);
  };

  const getCouponColors = (coupon) => {
    if (coupon.colorTheme) {
      return {
        primary: coupon.colorTheme.primary || '#4A8A90',
        secondary: coupon.colorTheme.secondary || '#D4EDEE',
        accent: coupon.colorTheme.accent || '#FFB6C1',
        text: coupon.colorTheme.text || '#2D3A5C',
        bg: coupon.colorTheme.bg || '#FFF9F0'
      };
    }
    return {
      primary: '#4A8A90',
      secondary: '#D4EDEE',
      accent: '#FFB6C1',
      text: '#2D3A5C',
      bg: '#FFF9F0'
    };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-hidden"
          >
            <div className="p-5 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaGift className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Available Coupons</h2>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-white/80 mt-1">Select a coupon to apply to your order</p>
            </div>

            <div className="p-5 overflow-y-auto max-h-[65vh]">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : coupons.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <FaTicketAlt className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No coupons available</h3>
                  <p className="text-sm text-gray-500">You don't have any eligible coupons at the moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5">
                  {coupons.map((coupon) => {
                    const colors = getCouponColors(coupon);
                    const isEligible = meetsMinimumOrder(coupon);
                    const isSelected = selectedCoupon?.couponCode === coupon.couponCode;
                    
                    return (
                      <div
                        key={coupon._id}
                        className={`relative transition-all duration-300 ${!isEligible ? 'opacity-60' : ''} ${isSelected ? 'scale-[1.02]' : 'scale-100'}`}
                        onClick={() => isEligible && setSelectedCoupon(coupon)}
                      >
                        <div className="relative group cursor-pointer">
                          <div 
                            className="relative rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
                            style={{ 
                              background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.bg} 100%)`,
                              border: `2px dashed ${colors.primary}`,
                            }}
                          >
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-white rounded-b-full"></div>
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 rounded-tl-2xl" style={{ borderColor: colors.primary }}></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 rounded-tr-2xl" style={{ borderColor: colors.primary }}></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 rounded-bl-2xl" style={{ borderColor: colors.primary }}></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 rounded-br-2xl" style={{ borderColor: colors.primary }}></div>
                            
                            {isSelected && (
                              <div className="absolute top-2 right-2 z-10">
                                <div className="w-6 h-6 bg-[#4A8A90] rounded-full flex items-center justify-center shadow-md">
                                  <FaCheckCircle className="w-4 h-4 text-white" />
                                </div>
                              </div>
                            )}
                            
                            <div className="p-5">
                              {coupon.subtitle && (
                                <div className="absolute -top-2 right-8">
                                  <div className="relative">
                                    <div className="px-3 py-1 text-xs font-bold text-white rounded-full shadow-md" style={{ backgroundColor: colors.accent }}>
                                      {coupon.subtitle}
                                    </div>
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent" style={{ borderTopColor: colors.accent }}></div>
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                  <div 
                                    className="w-24 h-24 rounded-xl flex flex-col items-center justify-center shadow-md"
                                    style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}
                                  >
                                    {coupon.discountType === 'percentage' && (
                                      <>
                                        <span className="text-2xl font-black text-white">{coupon.discountValue}</span>
                                        <span className="text-xs font-bold text-white">% OFF</span>
                                      </>
                                    )}
                                    {coupon.discountType === 'fixed' && (
                                      <>
                                        <span className="text-xl font-black text-white">৳{coupon.discountValue}</span>
                                        <span className="text-xs font-bold text-white">OFF</span>
                                      </>
                                    )}
                                    {coupon.discountType === 'free_shipping' && (
                                      <>
                                        <FaTruck className="w-8 h-8 text-white mb-1" />
                                        <span className="text-xs font-bold text-white">FREE SHIP</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex-1">
                                  <h3 className="text-lg font-bold mb-1" style={{ color: colors.text }}>{coupon.title}</h3>
                                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{coupon.description || 'Special offer for you!'}</p>
                                  
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {coupon.minimumOrderAmount > 0 && (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                                        <FaShoppingBag className="w-3 h-3" />
                                        Min. ৳{coupon.minimumOrderAmount}
                                      </span>
                                    )}
                                    {coupon.maxUsesPerUser > 1 && (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                                        <FaUsers className="w-3 h-3" />
                                        Max {coupon.maxUsesPerUser} uses
                                      </span>
                                    )}
                                    {coupon.expiresAt && (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                                        <FaCalendarAlt className="w-3 h-3" />
                                        Expires: {new Date(coupon.expiresAt).toLocaleDateString()}
                                      </span>
                                    )}
                                  </div>
                                  
                                  <div className="mt-2">
                                    <div className="relative flex justify-center">
                                      <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-dashed" style={{ borderColor: colors.primary }}></div>
                                      </div>
                                      <div className="relative flex justify-center text-xs">
                                        <span className="px-3 bg-white text-gray-400" style={{ backgroundColor: colors.bg }}>COUPON CODE</span>
                                      </div>
                                    </div>
                                    <div className="mt-2">
                                      <div 
                                        className="flex items-center justify-between p-2 rounded-lg border-2"
                                        style={{ backgroundColor: colors.secondary, borderColor: colors.primary }}
                                      >
                                        <code className="text-sm font-mono font-bold tracking-wider" style={{ color: colors.primary }}>
                                          {coupon.couponCode}
                                        </code>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            navigator.clipboard.writeText(coupon.couponCode);
                                            toast.success('Code copied!');
                                          }}
                                          className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg transition-all hover:scale-105"
                                          style={{ backgroundColor: colors.primary, color: 'white' }}
                                        >
                                          <FaCopy className="w-3 h-3" />
                                          Copy
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {coupon.highlightText && (
                                <div className="mt-3 pt-3 border-t text-center" style={{ borderColor: colors.secondary }}>
                                  <p className="text-xs font-semibold" style={{ color: colors.primary }}>🎉 {coupon.highlightText} 🎉</p>
                                </div>
                              )}
                            </div>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-white rounded-t-full"></div>
                          </div>
                          
                          {!isEligible && (
                            <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center">
                              <div className="text-center p-3">
                                <FaClock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                                <p className="text-xs text-orange-700 font-medium">
                                  Add ৳{(coupon.minimumOrderAmount - subtotal).toFixed(2)} more to qualify
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-5 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={!selectedCoupon || applying}
                className="px-6 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {applying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Applying...
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="w-4 h-4" />
                    Apply Coupon
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Payment Selector Component - Only COD and Online Payment
const PaymentSelector = ({ value, onChange, isLoading, onSubmit, isSubmitting }) => {
  const paymentMethods = [
    { 
      id: 'cod', 
      name: 'Cash on Delivery', 
      icon: FaMoneyBillWave,
      description: 'Pay when you receive your toys'
    },
    { 
      id: 'online', 
      name: 'Online Payment', 
      icon: FaCreditCard,
      description: 'Pay via Credit Card, bKash, Nagad'
    }
  ];

  return (
    <div>
      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
              value === method.id
                ? 'border-[#4A8A90] bg-[#D4EDEE]'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={value === method.id}
              onChange={() => onChange(method.id)}
              className="mt-1 w-4 h-4 text-[#4A8A90] focus:ring-[#4A8A90]"
            />
            <method.icon className={`w-5 h-5 ${value === method.id ? 'text-[#4A8A90]' : 'text-gray-500'}`} />
            <div className="flex-1">
              <span className={`font-medium ${value === method.id ? 'text-[#4A8A90]' : 'text-gray-700'}`}>
                {method.name}
              </span>
              <p className="text-xs text-gray-500">{method.description}</p>
            </div>
          </label>
        ))}
      </div>
      
      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white py-3 rounded-lg font-semibold hover:from-[#3A7A80] hover:to-[#5B9399] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            {value === 'cod' ? 'Placing Order...' : 'Processing...'}
          </div>
        ) : (
          value === 'cod' ? 'Place Order' : 'Proceed to Payment'
        )}
      </button>
    </div>
  );
};

// Order Success Modal for Guest Users
const OrderSuccessModal = ({ isOpen, onClose, orderId }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden"
          >
            <div className="p-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                <FaCheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold">Order Placed Successfully! 🎉</h2>
            </div>
            
            <div className="p-5 text-center">
              <p className="text-gray-700 mb-2">Thank you for your order!</p>
              <p className="text-sm text-gray-500 mb-4">Your order has been received and is being processed.</p>
              {orderId && (
                <p className="text-xs text-gray-400 mb-4">Order ID: {orderId.slice(-8).toUpperCase()}</p>
              )}
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-700">📧 A confirmation email has been sent to your email address.</p>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-200 bg-gray-50 flex gap-3">
              <button onClick={onClose} className="flex-1 px-4 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition-colors">
                Continue Shopping
              </button>
              <Link href="/" className="flex-1">
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Back to Home
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [discountDetails, setDiscountDetails] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [lastOrderId, setLastOrderId] = useState(null);
  const [shippingCost, setShippingCost] = useState(SHIPPING_COST_OUTSIDE);
  const [processingPayment, setProcessingPayment] = useState(false);
  
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [loadingCoupons, setLoadingCoupons] = useState(false);

  const [locationData, setLocationData] = useState({});
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);
  const [areas, setAreas] = useState([]);
  const [locationLoading, setLocationLoading] = useState(true);

  const [customCity, setCustomCity] = useState('');
  const [customZone, setCustomZone] = useState('');
  const [customArea, setCustomArea] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    address: '',
    city: '',
    zone: '',
    area: '',
    zipCode: '',
    country: '',
    note: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        const data = await response.json();
        setLocationData(data.locationData || {});
        const cityList = data.locationData ? Object.keys(data.locationData) : [];
        setCities(cityList);
        setLocationLoading(false);
      } catch (error) {
        console.error('Failed to load location data:', error);
        setLocationLoading(false);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const selectedCity = formData.city === 'other' ? customCity : formData.city;
    if (selectedCity && locationData[selectedCity]) {
      const availableZones = Object.keys(locationData[selectedCity].zones || {});
      setZones(availableZones);
      setFormData(prev => ({ ...prev, zone: '', area: '' }));
      setAreas([]);
      const isDhaka = selectedCity.toLowerCase() === 'dhaka';
      setShippingCost(isDhaka ? SHIPPING_COST_DHAKA : SHIPPING_COST_OUTSIDE);
    }
  }, [formData.city, customCity, locationData]);

  useEffect(() => {
    const selectedCity = formData.city === 'other' ? customCity : formData.city;
    const selectedZone = formData.zone === 'other' ? customZone : formData.zone;
    if (selectedCity && selectedZone && locationData[selectedCity]) {
      const availableAreas = locationData[selectedCity].zones[selectedZone] || [];
      setAreas(availableAreas);
      setFormData(prev => ({ ...prev, area: '' }));
    }
  }, [formData.zone, customZone, formData.city, customCity, locationData]);

  useEffect(() => {
    fetchCart();
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      const addressParts = [];
      if (user.address) addressParts.push(user.address);
      if (user.city) addressParts.push(user.city);
      if (user.zipCode) addressParts.push(user.zipCode);
      if (user.country) addressParts.push(user.country);
      const combinedAddress = addressParts.join(', ');
      
      setFormData(prev => ({
        ...prev,
        fullName: user.contactPerson || user.companyName || '',
        email: user.email || '',
        phone: user.phone || '',
        whatsapp: user.whatsapp || '',
        address: combinedAddress || '',
        city: user.city || '',
        zipCode: user.zipCode || '',
        country: user.country || 'Bangladesh',
      }));
      
      if (user.city) {
        const cityExists = cities.includes(user.city);
        if (cityExists) {
          setFormData(prev => ({ ...prev, city: user.city }));
        } else if (user.city) {
          setFormData(prev => ({ ...prev, city: 'other' }));
          setCustomCity(user.city);
        }
      }
      
      if (user.zone) setFormData(prev => ({ ...prev, zone: user.zone }));
      if (user.area) setFormData(prev => ({ ...prev, area: user.area }));
    }
  }, [user, cities]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) setUser(data.user);
      }
    } catch (error) {
      console.error('Fetch user error:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;
      
      const response = await fetch('http://localhost:5000/api/cart', { headers });
      const data = await response.json();
      
      if (data.success && data.data.items?.length > 0) {
        setCart(data.data);
      } else {
        toast.error('Your cart is empty');
        router.push('/products');
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableCoupons = async () => {
    setLoadingCoupons(true);
    try {
      const token = localStorage.getItem('token');
      const userId = user?._id;
      const subtotal = calculateSubtotal();
      const productIds = cart?.items.map(item => item.productId) || [];
      
      const response = await fetch('http://localhost:5000/api/coupons/available', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ userId, subtotal, productIds, categoryIds: [] })
      });
      
      const data = await response.json();
      if (data.success) setAvailableCoupons(data.data);
      else setAvailableCoupons([]);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      setAvailableCoupons([]);
    } finally {
      setLoadingCoupons(false);
    }
  };

  const handleBrowseCoupons = () => {
    if (!user) {
      toast.info('Please login to view available coupons');
      return;
    }
    fetchAvailableCoupons();
    setShowCouponModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const applyCoupon = async (code = couponCode) => {
    if (!code.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }
    setApplyingCoupon(true);
    try {
      const token = localStorage.getItem('token');
      const subtotal = calculateSubtotal();
      const response = await fetch('http://localhost:5000/api/coupons/validate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ couponCode: code, cartSubtotal: subtotal, userId: user?._id })
      });
      const data = await response.json();
      if (data.success) {
        let discountAmount = data.data.discountAmount || 0;
        if (data.data.freeShipping) {
          setShippingCost(0);
          toast.success(`Free shipping applied!`);
        }
        setDiscount(discountAmount);
        setDiscountDetails(data.data);
        toast.success(`Coupon "${code}" applied! You saved ${discountAmount > 0 ? `৳${discountAmount}` : 'free shipping'}`);
      } else {
        toast.error(data.error || 'Invalid coupon code');
        setDiscount(0);
        setDiscountDetails(null);
      }
    } catch (error) {
      console.error('Apply coupon error:', error);
      toast.error('Failed to apply coupon');
    } finally {
      setApplyingCoupon(false);
    }
  };

  const handleApplyCouponFromModal = async (code) => {
    setApplyingCoupon(true);
    try {
      const token = localStorage.getItem('token');
      const subtotal = calculateSubtotal();
      const response = await fetch('http://localhost:5000/api/coupons/validate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ couponCode: code, cartSubtotal: subtotal, userId: user?._id })
      });
      const data = await response.json();
      if (data.success) {
        let discountAmount = data.data.discountAmount || 0;
        if (data.data.freeShipping) {
          setShippingCost(0);
          toast.success(`Free shipping applied!`);
        }
        setDiscount(discountAmount);
        setDiscountDetails(data.data);
        setCouponCode(code);
        toast.success(`Coupon "${code}" applied!`);
      } else {
        toast.error(data.error || 'Invalid coupon code');
      }
    } catch (error) {
      console.error('Apply coupon error:', error);
      toast.error('Failed to apply coupon');
    } finally {
      setApplyingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setDiscountDetails(null);
    toast.success('Coupon removed');
  };

  const validateForm = () => {
    const newErrors = {};
    const finalCity = formData.city === 'other' ? customCity : formData.city;
    const finalZone = formData.zone === 'other' ? customZone : formData.zone;
    
    if (!formData.fullName?.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^01[3-9]\d{8}$/.test(formData.phone)) newErrors.phone = 'Invalid Bangladesh phone number';
    if (!formData.address?.trim()) newErrors.address = 'Address is required';
    if (!finalCity) newErrors.city = 'Please select a district';
    if (!finalZone) newErrors.zone = 'Please select a upazila/thana';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateSubtotal = () => cart?.subtotal || 0;
  const calculateTotal = () => calculateSubtotal() + shippingCost - discount;
  const isLoggedIn = !!user;

  // Handle COD Order - Create order immediately
  const handleCODOrder = async () => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;
      
      const finalCity = formData.city === 'other' ? customCity : formData.city;
      const finalZone = formData.zone === 'other' ? customZone : formData.zone;
      const finalArea = formData.area === 'other' ? customArea : formData.area;
      
      const orderData = {
        items: cart.items,
        subtotal: calculateSubtotal(),
        shippingCost,
        discount,
        total: calculateTotal(),
        paymentMethod: 'cod',
        customerInfo: {
          ...formData,
          city: finalCity,
          zone: finalZone,
          area: finalArea
        },
        couponCode: discountDetails?.couponCode || null,
        couponDiscount: discount,
        freeShipping: discountDetails?.freeShipping || false
      };
      
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify(orderData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        await fetch('http://localhost:5000/api/cart', { method: 'DELETE', headers });
        window.dispatchEvent(new Event('cart-update'));
        const orderId = data.orderId || data.data?._id || data.data?.id;
        
        if (isLoggedIn) {
          toast.success('Order placed successfully!');
          router.push('/customer/orders');
        } else {
          setShowOrderSuccessModal(true);
          setLastOrderId(orderId);
          resetForm();
        }
      } else {
        toast.error(data.error || 'Failed to place order');
      }
    } catch (error) {
      console.error('COD order error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

 // Handle Online Payment - Prepare order and initiate payment without saving
const handleOnlinePayment = async () => {
  setProcessingPayment(true);
  try {
    const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('cartSessionId');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    else if (sessionId) headers['x-session-id'] = sessionId;
    
    const finalCity = formData.city === 'other' ? customCity : formData.city;
    const finalZone = formData.zone === 'other' ? customZone : formData.zone;
    const finalArea = formData.area === 'other' ? customArea : formData.area;
    
    // Prepare order data WITHOUT saving to database
    const orderData = {
      userId: user?._id || null,
      sessionId: sessionId || null,
      items: cart.items,
      subtotal: calculateSubtotal(),
      shippingCost,
      discount,
      total: calculateTotal(),
      paymentMethod: 'online',
      customerInfo: {
        ...formData,
        city: finalCity,
        zone: finalZone,
        area: finalArea
      },
      couponCode: discountDetails?.couponCode || null,
      couponDiscount: discount,
      freeShipping: discountDetails?.freeShipping || false
    };
    
    console.log('Preparing order for online payment:', orderData);
    
    // First, prepare the order data (this doesn't save to DB)
    const prepareResponse = await fetch('http://localhost:5000/api/orders/prepare', {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData)
    });
    
    const prepareResult = await prepareResponse.json();
    
    if (!prepareResult.success) {
      toast.error(prepareResult.error || 'Failed to prepare order');
      setProcessingPayment(false);
      return;
    }
    
    // Now initiate payment with the prepared order data
    const returnUrl = `${window.location.origin}/payment/success`;
    const cancelUrl = `${window.location.origin}/payment/cancel`;
    
    const paymentResult = await paymentService.initiatePayment(orderData, returnUrl, cancelUrl);
    
    if (paymentResult.success && paymentResult.gatewayUrl) {
      // Store order data in sessionStorage temporarily
      sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));
      // Redirect to SSL Commerz payment page
      window.location.href = paymentResult.gatewayUrl;
    } else {
      toast.error(paymentResult.error || 'Failed to initiate payment');
      setProcessingPayment(false);
    }
  } catch (error) {
    console.error('Online payment error:', error);
    toast.error('Network error. Please try again.');
    setProcessingPayment(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill all required fields');
      return;
    }
    
    if (!cart?.items?.length) {
      toast.error('Your cart is empty');
      return;
    }
    
    if (paymentMethod === 'cod') {
      await handleCODOrder();
    } else {
      await handleOnlinePayment();
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      whatsapp: '',
      address: '',
      city: '',
      zone: '',
      area: '',
      zipCode: '',
      country: '',
      note: ''
    });
    setCouponCode('');
    setDiscount(0);
    setDiscountDetails(null);
  };

  if (loading || locationLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#FFF9F0] pt-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!cart?.items?.length) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#FFF9F0] pt-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#D4EDEE] to-[#FFE0E6] rounded-full flex items-center justify-center">
                <FaMoneyBillWave className="w-12 h-12 text-[#4A8A90]" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D3A5C] mb-2">Your cart is empty</h2>
              <Link href="/products" className="text-[#4A8A90] hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const subtotal = calculateSubtotal();
  const total = calculateTotal();

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-[#FFF9F0] pt-10 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FaMoneyBillWave className="w-7 h-7 text-[#4A8A90]" />
              <h1 className="text-2xl md:text-3xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                Checkout
              </h1>
            </div>
            <Link href="/cart" className="flex items-center gap-2 text-[#4A8A90] hover:text-[#FFB6C1] transition-colors">
              <span>← Back to Cart</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-6 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-[#2D3A5C] flex items-center gap-2">
                      <FaUser className="w-5 h-5 text-[#4A8A90]" />
                      Personal Information
                    </h2>
                    {isLoggedIn && (
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                        <FaCheckCircle className="w-3 h-3" />
                        Verified Account
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        disabled={isLoggedIn}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
                          isLoggedIn ? 'bg-gray-100 text-gray-600' : 'bg-white'
                        } ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isLoggedIn}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
                          isLoggedIn ? 'bg-gray-100 text-gray-600' : 'bg-white'
                        } ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="01XXXXXXXXX"
                      />
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition"
                        placeholder="01XXXXXXXXX"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-6 shadow-md">
                  <h2 className="text-lg font-bold text-[#2D3A5C] mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="w-5 h-5 text-[#4A8A90]" />
                    Delivery Address
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition bg-white ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="House #, Road #, Area, City, Zip Code, Country"
                      />
                      {isLoggedIn && !!user?.address && (
                        <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                          <FaCheckCircle className="w-3 h-3" />
                          Your saved address has been pre-filled. You can edit it if needed.
                        </p>
                      )}
                      {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          District/City <span className="text-red-500">*</span>
                        </label>
                        <SearchableSelect
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          options={cities}
                          placeholder="Select District"
                          required
                          disabled={false}
                          error={errors.city}
                        />
                        {formData.city === 'other' && (
                          <input
                            type="text"
                            value={customCity}
                            onChange={(e) => setCustomCity(e.target.value)}
                            placeholder="Enter your city"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none mt-2"
                            required
                          />
                        )}
                        {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Upazila/Thana <span className="text-red-500">*</span>
                        </label>
                        <SearchableSelect
                          name="zone"
                          value={formData.zone}
                          onChange={handleInputChange}
                          options={zones}
                          placeholder="Select Upazila/Thana"
                          required
                          disabled={!formData.city}
                          error={errors.zone}
                        />
                        {(formData.zone === 'other' || formData.city === 'other') && (
                          <input
                            type="text"
                            value={customZone}
                            onChange={(e) => setCustomZone(e.target.value)}
                            placeholder="Enter your upazila/thana"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none mt-2"
                            required
                          />
                        )}
                        {errors.zone && <p className="text-xs text-red-500 mt-1">{errors.zone}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Union/Area
                        </label>
                        <SearchableSelect
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          options={areas}
                          placeholder="Select Union/Area"
                          disabled={!formData.zone}
                          error={errors.area}
                        />
                        {(formData.area === 'other' || formData.zone === 'other' || formData.city === 'other') && (
                          <input
                            type="text"
                            value={customArea}
                            onChange={(e) => setCustomArea(e.target.value)}
                            placeholder="Enter your union/area"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none mt-2"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-6 shadow-md">
                  <h2 className="text-lg font-bold text-[#2D3A5C] mb-4 flex items-center gap-2">
                    <FaFileAlt className="w-5 h-5 text-[#4A8A90]" />
                    Order Notes (Optional)
                  </h2>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition"
                    placeholder="Special instructions for delivery, gift message, etc."
                  />
                </div>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-6 sticky top-24 shadow-md">
                <h2 className="text-lg font-bold text-[#2D3A5C] mb-4">Order Summary</h2>
                
                <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                  {cart.items.map((item) => {
                    const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
                    const totalPrice = price * item.quantity;
                    return (
                      <div key={item._id} className="flex gap-3 pb-3 border-b border-gray-100">
                        <img 
                          src={item.image || 'https://via.placeholder.com/50'} 
                          alt={item.productName} 
                          className="w-12 h-12 rounded-lg object-cover"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=Toy'; }}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.productName}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-[#4A8A90]">৳{totalPrice.toFixed(2)}</p>
                      </div>
                    );
                  })}
                </div>
                
                <div className="space-y-2 border-t border-[#FFE0E6] pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>৳{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className={discountDetails?.freeShipping ? "text-green-600 line-through" : "text-green-600"}>
                      ৳{shippingCost.toFixed(2)}
                    </span>
                  </div>
                  
                  {discountDetails?.freeShipping && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Free Shipping Discount</span>
                      <span>- ৳{shippingCost.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({discountDetails?.couponCode})</span>
                      <span>- ৳{discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Coupon code"
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none uppercase"
                    />
                    <button
                      type="button"
                      onClick={() => applyCoupon()}
                      disabled={applyingCoupon}
                      className="px-4 py-2 bg-[#FFD93D] text-[#4A8A90] font-medium rounded-lg hover:bg-[#FFE44D] transition-all disabled:opacity-50"
                    >
                      {applyingCoupon ? (
                        <div className="w-4 h-4 border-2 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        'Apply'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleBrowseCoupons}
                      className="px-3 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all flex items-center gap-1"
                    >
                      <FaSearch className="w-3 h-3" />
                      Browse
                    </button>
                  </div>
                  
                  {discount > 0 && (
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-red-500 hover:text-red-600 mt-1 flex items-center gap-1"
                    >
                      <FaTimes className="w-3 h-3" />
                      Remove coupon
                    </button>
                  )}
                  
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-[#FFE0E6]">
                    <span>Total</span>
                    <span className="text-[#4A8A90]">৳{total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-green-600">
                    <span>🚚</span>
                    <span>Free delivery on first order</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <span>🛡️</span>
                    <span>Safe & Secure Shopping</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <span>🔄</span>
                    <span>7-Day Return Policy</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <PaymentSelector
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                    isLoading={submitting || processingPayment}
                    onSubmit={handleSubmit}
                    isSubmitting={submitting || processingPayment}
                  />
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-400">🔒 Your information is secure with us</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CouponModal
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        coupons={availableCoupons}
        onApplyCoupon={handleApplyCouponFromModal}
        subtotal={subtotal}
        isLoading={loadingCoupons}
      />
      
      <OrderSuccessModal
        isOpen={showOrderSuccessModal}
        onClose={() => {
          setShowOrderSuccessModal(false);
          router.push('/products');
        }}
        orderId={lastOrderId}
      />
      
      <Footer />
      <WhatsAppButton />
    </>
  );
}