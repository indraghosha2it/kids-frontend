// "use client";

// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Package, 
//   ShoppingBag, 
//   CheckCircle, 
//   XCircle,
//   Clock,
//   Truck,
//   Eye,
//   Heart,
//   LogOut,
//   ChevronRight,
//   Star,
//   Calendar,
//   DollarSign,
//   RefreshCw,
//   Copy,
//   Home,
//   MessageSquare,
//   Sparkles,
//   Zap,
//   Users,
//   Tag,
//   Trash2,
//   Loader2,
//   Gift,
//   ShieldCheck
// } from 'lucide-react';
// import { toast } from 'sonner';

// // Helper functions
// const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'BDT',
//     minimumFractionDigits: 0
//   }).format(amount);
// };

// const formatDate = (date) => {
//   return new Date(date).toLocaleDateString('en-US', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric'
//   });
// };

// const getStatusColor = (status) => {
//   const colors = {
//     placed: 'bg-yellow-100 text-yellow-800',
//     confirmed: 'bg-blue-100 text-blue-800',
//     processing: 'bg-purple-100 text-purple-800',
//     shipped: 'bg-indigo-100 text-indigo-800',
//     delivered: 'bg-green-100 text-green-800',
//     cancelled: 'bg-red-100 text-red-800'
//   };
//   return colors[status] || 'bg-gray-100 text-gray-800';
// };

// const getStatusLabel = (status) => {
//   const labels = {
//     placed: 'Placed',
//     confirmed: 'Confirmed',
//     processing: 'Processing',
//     shipped: 'Shipped',
//     delivered: 'Delivered',
//     cancelled: 'Cancelled'
//   };
//   return labels[status] || status;
// };

// const getReviewStatusBadge = (status) => {
//   if (status === 'approved') {
//     return <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Approved</span>;
//   } else if (status === 'pending') {
//     return <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">Pending</span>;
//   } else if (status === 'rejected') {
//     return <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">Rejected</span>;
//   }
//   return null;
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

// const truncateText = (text, limit = 25) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// // Wishlist Card Component
// const WishlistCard = ({ item, onRemove, onViewProduct, isRemoving }) => {
//   const regularPrice = item.regularPrice || 0;
//   const discountPrice = item.discountPrice || 0;
//   const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
//   const discountPercent = regularPrice > 0 && discountPrice > 0 && discountPrice < regularPrice 
//     ? Math.round(((regularPrice - discountPrice) / regularPrice) * 100) 
//     : 0;

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       className="group bg-white rounded-xl border border-gray-100 hover:border-[#FFB6C1] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md overflow-hidden"
//       onClick={() => onViewProduct(item.productId)}
//     >
//       {/* Image Container */}
//       <div className="relative w-full h-40 overflow-hidden bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6]">
//         <img
//           src={item.image || item.images?.[0]?.url || 'https://via.placeholder.com/300?text=Toy'}
//           alt={item.productName}
//           className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'https://via.placeholder.com/300?text=Toy';
//           }}
//         />
        
//         {/* Discount Badge */}
//         {discountPercent > 0 && (
//           <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-lg z-20 flex items-center gap-0.5">
//             <Zap className="w-2.5 h-2.5" />
//             {discountPercent}% OFF
//           </div>
//         )}
        
//         {/* Remove Button */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onRemove(item._id);
//           }}
//           disabled={isRemoving}
//           className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-red-50 transition-all z-30"
//         >
//           {isRemoving ? (
//             <Loader2 className="w-3.5 h-3.5 animate-spin text-red-500" />
//           ) : (
//             <Trash2 className="w-3.5 h-3.5 text-red-500" />
//           )}
//         </button>
//       </div>

//       {/* Content */}
//       <div className="p-3">
//         <h3 className="text-sm font-bold text-gray-800 line-clamp-2 hover:text-[#4A8A90] transition-colors mb-1">
//           {truncateText(item.productName, 20)}
//         </h3>
        
//         {/* Age Group */}
//         {item.ageGroup && (
//           <div className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${getAgeGroupBadge(item.ageGroup)} mb-2`}>
//             <Users className="w-2.5 h-2.5" />
//             Ages {item.ageGroup}
//           </div>
//         )}

//         {/* Price */}
//         <div className="flex items-baseline gap-1 mb-2">
//           <span className="text-sm font-bold text-[#4A8A90]">
//             {formatCurrency(currentPrice)}
//           </span>
//           {discountPercent > 0 && (
//             <>
//               <span className="text-[10px] text-gray-400 line-through">
//                 {formatCurrency(regularPrice)}
//               </span>
//               <span className="text-[9px] font-semibold text-red-500 bg-red-100 px-1 py-0.5 rounded">
//                 -{discountPercent}%
//               </span>
//             </>
//           )}
//         </div>

//         {/* Stock Status */}
//         <div className="flex items-center justify-between">
//           {item.stockQuantity > 0 ? (
//             <span className="flex items-center gap-0.5 text-[9px] text-green-600 font-medium">
//               <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
//               In Stock
//             </span>
//           ) : (
//             <span className="flex items-center gap-0.5 text-[9px] text-red-500 font-medium">
//               <div className="w-1 h-1 bg-red-500 rounded-full"></div>
//               Out of Stock
//             </span>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Order Card Component
// const OrderCard = ({ order, onViewDetails, copyOrderId }) => (
//   <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition">
//     <div className="bg-gray-50 px-4 py-3 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//       <div className="flex items-center gap-4 flex-wrap">
//         <div>
//           <p className="text-xs text-gray-500">Order ID</p>
//           <div className="flex items-center gap-2">
//             <p className="text-sm font-medium text-gray-900">{order.orderNumber}</p>
//             <button onClick={() => copyOrderId(order.orderNumber)} className="text-gray-400 hover:text-gray-600">
//               <Copy className="h-3 w-3" />
//             </button>
//           </div>
//         </div>
//         <div>
//           <p className="text-xs text-gray-500">Order Date</p>
//           <p className="text-sm text-gray-900">{formatDate(order.createdAt)}</p>
//         </div>
//         <div>
//           <p className="text-xs text-gray-500">Total Amount</p>
//           <p className="text-sm font-semibold text-green-600">{formatCurrency(order.total)}</p>
//         </div>
//       </div>
//       <div className="flex items-center gap-2">
//         <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(order.orderStatus)}`}>
//           {getStatusLabel(order.orderStatus)}
//         </span>
      
//       </div>
//     </div>
    
//     <div className="divide-y divide-gray-100">
//       {order.items?.slice(0, 3).map((item, idx) => (
//         <div key={idx} className="px-4 py-3 flex items-center gap-3">
//           {item.image ? (
//             <img src={item.image} alt={item.productName} className="w-12 h-12 rounded-lg object-cover" />
//           ) : (
//             <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
//               <Package className="h-6 w-6 text-gray-400" />
//             </div>
//           )}
//           <div className="flex-1">
//             <p className="font-medium text-gray-800 text-sm">{item.productName}</p>
//             <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//           </div>
//           <div className="text-right">
//             <p className="font-semibold text-gray-800 text-sm">{formatCurrency(item.discountPrice || item.regularPrice)}</p>
//           </div>
//         </div>
//       ))}
//       {order.items?.length > 3 && (
//         <div className="px-4 py-2 text-center text-xs text-gray-500 bg-gray-50">
//           +{order.items.length - 3} more items
//         </div>
//       )}
//     </div>
//   </div>
// );

// // Review Card Component
// const ReviewCard = ({ review, onViewProduct }) => (
//   <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition">
//     <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
//       <div>
//         <h3 className="font-semibold text-gray-800">{review.productName}</h3>
//         <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
//       </div>
//       <div className="flex items-center gap-2">
//         <div className="flex gap-0.5">
//           {[...Array(5)].map((_, i) => (
//             <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
//           ))}
//         </div>
//         {getReviewStatusBadge(review.status)}
//       </div>
//     </div>
//     {review.title && (
//       <p className="font-medium text-gray-700 text-sm mb-1">{review.title}</p>
//     )}
//     <p className="text-gray-600 text-sm line-clamp-2">{review.comment}</p>
    
//   </div>
// );

// export default function CustomerDashboard() {
//   const router = useRouter();
  
//   const [user, setUser] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [removingItems, setRemovingItems] = useState({});
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     placedOrders: 0,
//     deliveredOrders: 0,
//     cancelledOrders: 0,
//     totalSpent: 0,
//     totalReviews: 0,
//     approvedReviews: 0,
//     pendingReviews: 0,
//     rejectedReviews: 0
//   });
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('orders');
//   const [error, setError] = useState(null);
  
//   // Filter states
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [filterType, setFilterType] = useState('month');
//   const [availableYears, setAvailableYears] = useState([]);

//   const months = [
//     { value: 1, name: 'January' }, { value: 2, name: 'February' },
//     { value: 3, name: 'March' }, { value: 4, name: 'April' },
//     { value: 5, name: 'May' }, { value: 6, name: 'June' },
//     { value: 7, name: 'July' }, { value: 8, name: 'August' },
//     { value: 9, name: 'September' }, { value: 10, name: 'October' },
//     { value: 11, name: 'November' }, { value: 12, name: 'December' }
//   ];

//   // Fetch user profile
//   const fetchUserProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }
      
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'https://kids-backend.vercel.app'}/api/auth/me`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (response.data.success) {
//         setUser(response.data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching user:', err);
//       if (err.response?.status === 401) {
//         router.push('/login');
//       }
//     }
//   };

//   // Fetch user orders
//   const fetchUserOrders = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'https://kids-backend.vercel.app'}/api/orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { limit: 100 }
//       });
      
//       if (response.data.success) {
//         const userOrders = Array.isArray(response.data.data) ? response.data.data : [];
//         setOrders(userOrders);
//         filterOrdersByDate(userOrders);
        
//         const placedOrders = userOrders.filter(o => o.orderStatus === 'placed').length;
//         const deliveredOrders = userOrders.filter(o => o.orderStatus === 'delivered').length;
//         const cancelledOrders = userOrders.filter(o => o.orderStatus === 'cancelled').length;
//         const totalSpent = userOrders
//           .filter(o => o.paymentStatus === 'paid' && o.orderStatus === 'delivered')
//           .reduce((sum, o) => sum + (o.total || 0), 0);
        
//         setStats(prev => ({
//           ...prev,
//           totalOrders: userOrders.length,
//           placedOrders,
//           deliveredOrders,
//           cancelledOrders,
//           totalSpent
//         }));
        
//         const years = [...new Set(userOrders.map(order => new Date(order.createdAt).getFullYear()))];
//         years.sort((a, b) => b - a);
//         setAvailableYears(years.length ? years : [new Date().getFullYear()]);
//       }
//     } catch (err) {
//       console.error('Error fetching orders:', err);
//       setOrders([]);
//     }
//   };

//   // Fetch user reviews
//   const fetchUserReviews = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'https://kids-backend.vercel.app'}/api/reviews/my-reviews`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { limit: 100 }
//       });
      
//       if (response.data.success) {
//         const userReviews = Array.isArray(response.data.data) ? response.data.data : [];
//         setReviews(userReviews);
        
//         const totalReviews = userReviews.length;
//         const approvedReviews = userReviews.filter(r => r.status === 'approved' && r.isApproved === true).length;
//         const pendingReviews = userReviews.filter(r => r.status === 'pending').length;
//         const rejectedReviews = userReviews.filter(r => r.status === 'rejected').length;
        
//         setStats(prev => ({
//           ...prev,
//           totalReviews,
//           approvedReviews,
//           pendingReviews,
//           rejectedReviews
//         }));
//       } else {
//         setReviews([]);
//       }
//     } catch (err) {
//       console.error('Error fetching reviews:', err);
//       setReviews([]);
//     }
//   };

//   // Filter orders by date
//   const filterOrdersByDate = (ordersList = orders) => {
//     let filtered = [...ordersList];
    
//     if (filterType === 'month') {
//       filtered = filtered.filter(order => {
//         const orderDate = new Date(order.createdAt);
//         return orderDate.getFullYear() === selectedYear && 
//                orderDate.getMonth() + 1 === selectedMonth;
//       });
//     } else {
//       filtered = filtered.filter(order => {
//         const orderDate = new Date(order.createdAt);
//         return orderDate.getFullYear() === selectedYear;
//       });
//     }
    
//     setFilteredOrders(filtered);
    
//     const placed = filtered.filter(o => o.orderStatus === 'placed').length;
//     const delivered = filtered.filter(o => o.orderStatus === 'delivered').length;
//     const cancelled = filtered.filter(o => o.orderStatus === 'cancelled').length;
//     const totalSpent = filtered
//       .filter(o => o.paymentStatus === 'paid' && o.orderStatus === 'delivered')
//       .reduce((sum, o) => sum + (o.total || 0), 0);
    
//     setStats(prev => ({
//       ...prev,
//       filteredTotalOrders: filtered.length,
//       filteredPlacedOrders: placed,
//       filteredDeliveredOrders: delivered,
//       filteredCancelledOrders: cancelled,
//       filteredTotalSpent: totalSpent
//     }));
//   };

//   // Fetch wishlist
//   const fetchWishlist = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'https://kids-backend.vercel.app'}/api/wishlist`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (response.data.success) {
//         const wishlistData = response.data.data;
//         let items = [];
//         if (wishlistData && Array.isArray(wishlistData.items)) {
//           items = wishlistData.items;
//         } else if (Array.isArray(wishlistData)) {
//           items = wishlistData;
//         } else if (wishlistData && wishlistData._id && Array.isArray(wishlistData.items)) {
//           items = wishlistData.items;
//         }
//         setWishlistItems(items);
//       } else {
//         setWishlistItems([]);
//       }
//     } catch (err) {
//       console.error('Error fetching wishlist:', err);
//       setWishlistItems([]);
//     }
//   };

//   // Remove from wishlist
//   const removeFromWishlist = async (itemId) => {
//     setRemovingItems(prev => ({ ...prev, [itemId]: true }));
    
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || 'https://kids-backend.vercel.app'}/api/wishlist/${itemId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       setWishlistItems(prev => prev.filter(item => item._id !== itemId));
//       toast.success('Removed from wishlist');
//     } catch (err) {
//       console.error('Remove from wishlist error:', err);
//       toast.error('Failed to remove item');
//     } finally {
//       setRemovingItems(prev => ({ ...prev, [itemId]: false }));
//     }
//   };

//   // Load all data
//   const loadDashboardData = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       await fetchUserProfile();
//       await Promise.all([
//         fetchUserOrders(),
//         fetchUserReviews(),
//         fetchWishlist()
//       ]);
//     } catch (err) {
//       console.error('Error loading dashboard:', err);
//       setError('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (orders.length > 0) {
//       filterOrdersByDate();
//     }
//   }, [selectedYear, selectedMonth, filterType]);

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   const copyOrderId = (orderId) => {
//     navigator.clipboard.writeText(orderId);
//     toast.success('Order ID copied!');
//   };

//   const getFilterLabel = () => {
//     if (filterType === 'month') {
//       const month = months.find(m => m.value === selectedMonth);
//       return `${month?.name} ${selectedYear}`;
//     }
//     return `Year ${selectedYear}`;
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     router.push('/');
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header - Similar to Admin Dashboard */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="px-4 sm:px-6 py-4">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <h1 className="text-xl sm:text-2xl font-bold text-gray-800">My Dashboard</h1>
//               <p className="text-gray-500 text-sm mt-1">
//                 Welcome back, {user?.name || 'Customer'}! Here's your activity summary.
//               </p>
//             </div>
//             <div className="flex gap-3 w-full sm:w-auto">
//               <button
//                 onClick={() => router.push('/')}
//                 className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex-1 sm:flex-none"
//               >
//                 <Home className="h-4 w-4" />
//                 <span className="hidden sm:inline">Shop Now</span>
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex-1 sm:flex-none"
//               >
//                 <LogOut className="h-4 w-4" />
//                 <span className="hidden sm:inline">Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-4 sm:p-6">
//         {/* Filter Section */}
//         <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
//               <div className="flex gap-2 bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
//                 <button
//                   onClick={() => setFilterType('month')}
//                   className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition ${
//                     filterType === 'month' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
//                   }`}
//                 >
//                   Monthly
//                 </button>
//                 <button
//                   onClick={() => setFilterType('year')}
//                   className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition ${
//                     filterType === 'year' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
//                   }`}
//                 >
//                   Yearly
//                 </button>
//               </div>

//               {filterType === 'month' && (
//                 <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//                   <select
//                     value={selectedMonth}
//                     onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//                     className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
//                   >
//                     {months.map(month => (
//                       <option key={month.value} value={month.value}>{month.name}</option>
//                     ))}
//                   </select>
//                   <select
//                     value={selectedYear}
//                     onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//                     className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
//                   >
//                     {availableYears.map(year => (
//                       <option key={year} value={year}>{year}</option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//               {filterType === 'year' && (
//                 <select
//                   value={selectedYear}
//                   onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
//                 >
//                   {availableYears.map(year => (
//                     <option key={year} value={year}>{year}</option>
//                   ))}
//                 </select>
//               )}
//             </div>

//             <div className="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
//               <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0" />
//               <span className="text-sm text-gray-600">
//                 Showing: <strong className="text-gray-800">{getFilterLabel()}</strong>
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards - Orders Summary */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//           <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-4 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-blue-100 text-xs">Total Orders</p>
//                 <p className="text-2xl font-bold">{stats.filteredTotalOrders || stats.totalOrders}</p>
//               </div>
//               <ShoppingBag className="h-8 w-8 opacity-80" />
//             </div>
//           </div>
          
//           <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-4 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-yellow-100 text-xs">Placed</p>
//                 <p className="text-2xl font-bold">{stats.filteredPlacedOrders || stats.placedOrders}</p>
//               </div>
//               <Clock className="h-8 w-8 opacity-80" />
//             </div>
//           </div>
          
//           <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-4 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-green-100 text-xs">Delivered</p>
//                 <p className="text-2xl font-bold">{stats.filteredDeliveredOrders || stats.deliveredOrders}</p>
//               </div>
//               <CheckCircle className="h-8 w-8 opacity-80" />
//             </div>
//           </div>
          
//           <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg p-4 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-red-100 text-xs">Cancelled</p>
//                 <p className="text-2xl font-bold">{stats.filteredCancelledOrders || stats.cancelledOrders}</p>
//               </div>
//               <XCircle className="h-8 w-8 opacity-80" />
//             </div>
//           </div>
          
//           <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-4 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-purple-100 text-xs">Total Spent</p>
//                 <p className="text-xl font-bold">{formatCurrency(stats.filteredTotalSpent || stats.totalSpent)}</p>
//               </div>
//               <DollarSign className="h-8 w-8 opacity-80" />
//             </div>
//           </div>
//         </div>

//         {/* Reviews Summary Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//           <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl shadow-lg p-4 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-cyan-100 text-xs">Total Reviews</p>
//                 <p className="text-2xl font-bold">{stats.totalReviews}</p>
//               </div>
//               <MessageSquare className="h-8 w-8 opacity-80" />
//             </div>
//           </div>
          
//           <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-4 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-emerald-100 text-xs">Approved</p>
//                 <p className="text-2xl font-bold">{stats.approvedReviews}</p>
//               </div>
//               <CheckCircle className="h-8 w-8 opacity-80" />
//             </div>
//           </div>
          
//           <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-lg p-4 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-amber-100 text-xs">Pending</p>
//                 <p className="text-2xl font-bold">{stats.pendingReviews}</p>
//               </div>
//               <Clock className="h-8 w-8 opacity-80" />
//             </div>
//           </div>
//         </div>

//         {/* Tabs with View All buttons */}
//         <div className="bg-white rounded-xl shadow-sm mb-6">
//           <div className="border-b border-gray-200">
//             <nav className="flex flex-wrap gap-2 px-4">
//               <button
//                 onClick={() => setActiveTab('orders')}
//                 className={`px-4 py-3 text-sm font-medium transition border-b-2 ${
//                   activeTab === 'orders'
//                     ? 'text-blue-600 border-blue-600'
//                     : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <ShoppingBag className="h-4 w-4" />
//                   My Orders ({filteredOrders.length})
//                 </div>
//               </button>
//               <button
//                 onClick={() => setActiveTab('reviews')}
//                 className={`px-4 py-3 text-sm font-medium transition border-b-2 ${
//                   activeTab === 'reviews'
//                     ? 'text-blue-600 border-blue-600'
//                     : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <Star className="h-4 w-4" />
//                   My Reviews ({reviews.length})
//                 </div>
//               </button>
//               <button
//                 onClick={() => setActiveTab('wishlist')}
//                 className={`px-4 py-3 text-sm font-medium transition border-b-2 ${
//                   activeTab === 'wishlist'
//                     ? 'text-blue-600 border-blue-600'
//                     : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <Heart className="h-4 w-4" />
//                   Wishlist ({wishlistItems.length})
//                 </div>
//               </button>
//             </nav>
//           </div>
//         </div>

//         {/* Orders Tab */}
//         {activeTab === 'orders' && (
//           <div>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
//              {filteredOrders.length > 0 && (
//   <button 
//     onClick={() => router.push('/customer/orders')}
//     className="text-blue-600 hover:text-blue-700 text-sm font-medium"
//   >
//     View All Orders →
//   </button>
// )}
//             </div>
//             <div className="space-y-4">
//               {filteredOrders.length === 0 ? (
//                 <div className="bg-white rounded-xl shadow-sm p-12 text-center">
//                   <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
//                   <p className="text-gray-500 mb-4">You haven't placed any orders in {getFilterLabel()}.</p>
//                   <button onClick={() => router.push('/')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//                     Start Shopping
//                   </button>
//                 </div>
//               ) : (
//                 filteredOrders.slice(0, 5).map((order) => (
//                   <OrderCard key={order._id} order={order} onViewDetails={(id) => router.push(`/orders/${id}`)} copyOrderId={copyOrderId} />
//                 ))
//               )}
//             </div>
//           </div>
//         )}

//         {/* Reviews Tab */}
//         {activeTab === 'reviews' && (
//           <div>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">Recent Reviews</h2>
//             {reviews.length > 0 && (
//   <button 
//     onClick={() => router.push('/customer/my-reviews')}
//     className="text-blue-600 hover:text-blue-700 text-sm font-medium"
//   >
//     View All Reviews →
//   </button>
// )}
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {reviews.length === 0 ? (
//                 <div className="bg-white rounded-xl shadow-sm p-12 text-center col-span-2">
//                   <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
//                   <p className="text-gray-500 mb-4">You haven't written any reviews yet.</p>
//                   <button onClick={() => router.push('/')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//                     Shop & Review
//                   </button>
//                 </div>
//               ) : (
//                 reviews.slice(0, 6).map((review) => (
//                   <ReviewCard key={review._id} review={review} onViewProduct={(slug) => router.push(`/product/${slug}`)} />
//                 ))
//               )}
//             </div>
//           </div>
//         )}

//         {/* Wishlist Tab */}
//         {activeTab === 'wishlist' && (
//           <div>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">My Wishlist</h2>
//              {wishlistItems.length > 0 && (
//   <button 
//     onClick={() => router.push('/wishlist')}
//     className="text-blue-600 hover:text-blue-700 text-sm font-medium"
//   >
//     View All Wishlist →
//   </button>
// )}
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//               {wishlistItems.length === 0 ? (
//                 <div className="bg-white rounded-xl shadow-sm p-12 text-center col-span-full">
//                   <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
//                   <p className="text-gray-500 mb-4">Save your favorite items here!</p>
//                   <button onClick={() => router.push('/')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//                     Explore Products
//                   </button>
//                 </div>
//               ) : (
//                 wishlistItems.slice(0, 10).map((item) => (
//                   <WishlistCard
//                     key={item._id}
//                     item={item}
//                     onRemove={removeFromWishlist}
//                     onViewProduct={(id) => router.push(`/productDetails?id=${id}`)}
//                     isRemoving={removingItems[item._id]}
//                   />
//                 ))
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  ShoppingBag, 
  CheckCircle, 
  XCircle,
  Clock,
  Truck,
  Eye,
  Heart,
  LogOut,
  ChevronRight,
  Star,
  Calendar,
  DollarSign,
  RefreshCw,
  Copy,
  Home,
  MessageSquare,
  Sparkles,
  Zap,
  Users,
  Tag,
  Trash2,
  Loader2,
  Gift,
  ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';

// Helper functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0
  }).format(amount);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const getStatusColor = (status) => {
  const colors = {
    placed: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    processing: 'bg-purple-100 text-purple-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const getStatusLabel = (status) => {
  const labels = {
    placed: 'Placed',
    confirmed: 'Confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  };
  return labels[status] || status;
};

const getReviewStatusBadge = (status) => {
  if (status === 'approved') {
    return <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Approved</span>;
  } else if (status === 'pending') {
    return <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">Pending</span>;
  } else if (status === 'rejected') {
    return <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">Rejected</span>;
  }
  return null;
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

const truncateText = (text, limit = 25) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

// Wishlist Card Component
const WishlistCard = ({ item, onRemove, onViewProduct, isRemoving }) => {
  const regularPrice = item.regularPrice || 0;
  const discountPrice = item.discountPrice || 0;
  const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
  const discountPercent = regularPrice > 0 && discountPrice > 0 && discountPrice < regularPrice 
    ? Math.round(((regularPrice - discountPrice) / regularPrice) * 100) 
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group bg-white rounded-xl border border-gray-100 hover:border-[#FFB6C1] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md overflow-hidden"
      onClick={() => onViewProduct(item.productId)}
    >
      {/* Image Container */}
      <div className="relative w-full h-40 overflow-hidden bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6]">
        <img
          src={item.image || item.images?.[0]?.url || 'https://via.placeholder.com/300?text=Toy'}
          alt={item.productName}
          className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300?text=Toy';
          }}
        />
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-lg z-20 flex items-center gap-0.5">
            <Zap className="w-2.5 h-2.5" />
            {discountPercent}% OFF
          </div>
        )}
        
        {/* Remove Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item._id);
          }}
          disabled={isRemoving}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-red-50 transition-all z-30"
        >
          {isRemoving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-red-500" />
          ) : (
            <Trash2 className="w-3.5 h-3.5 text-red-500" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 hover:text-[#4A8A90] transition-colors mb-1">
          {truncateText(item.productName, 20)}
        </h3>
        
        {/* Age Group */}
        {item.ageGroup && (
          <div className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${getAgeGroupBadge(item.ageGroup)} mb-2`}>
            <Users className="w-2.5 h-2.5" />
            Ages {item.ageGroup}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-sm font-bold text-[#4A8A90]">
            {formatCurrency(currentPrice)}
          </span>
          {discountPercent > 0 && (
            <>
              <span className="text-[10px] text-gray-400 line-through">
                {formatCurrency(regularPrice)}
              </span>
              <span className="text-[9px] font-semibold text-red-500 bg-red-100 px-1 py-0.5 rounded">
                -{discountPercent}%
              </span>
            </>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between">
          {item.stockQuantity > 0 ? (
            <span className="flex items-center gap-0.5 text-[9px] text-green-600 font-medium">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
              In Stock
            </span>
          ) : (
            <span className="flex items-center gap-0.5 text-[9px] text-red-500 font-medium">
              <div className="w-1 h-1 bg-red-500 rounded-full"></div>
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Order Card Component
const OrderCard = ({ order, copyOrderId }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition">
    <div className="bg-gray-50 px-4 py-3 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div className="flex items-center gap-4 flex-wrap">
        <div>
          <p className="text-xs text-gray-500">Order ID</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900">{order.orderNumber}</p>
            <button onClick={() => copyOrderId(order.orderNumber)} className="text-gray-400 hover:text-gray-600">
              <Copy className="h-3 w-3" />
            </button>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500">Order Date</p>
          <p className="text-sm text-gray-900">{formatDate(order.createdAt)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Total Amount</p>
          <p className="text-sm font-semibold text-green-600">{formatCurrency(order.total)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(order.orderStatus)}`}>
          {getStatusLabel(order.orderStatus)}
        </span>
      </div>
    </div>
    
    <div className="divide-y divide-gray-100">
      {order.items?.slice(0, 3).map((item, idx) => (
        <div key={idx} className="px-4 py-3 flex items-center gap-3">
          {item.image ? (
            <img src={item.image} alt={item.productName} className="w-12 h-12 rounded-lg object-cover" />
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-gray-400" />
            </div>
          )}
          <div className="flex-1">
            <p className="font-medium text-gray-800 text-sm">{item.productName}</p>
            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-800 text-sm">{formatCurrency(item.discountPrice || item.regularPrice)}</p>
          </div>
        </div>
      ))}
      {order.items?.length > 3 && (
        <div className="px-4 py-2 text-center text-xs text-gray-500 bg-gray-50">
          +{order.items.length - 3} more items
        </div>
      )}
    </div>
  </div>
);

// Review Card Component
const ReviewCard = ({ review }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition">
    <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
      <div>
        <h3 className="font-semibold text-gray-800">{review.productName}</h3>
        <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
        {getReviewStatusBadge(review.status)}
      </div>
    </div>
    {review.title && (
      <p className="font-medium text-gray-700 text-sm mb-1">{review.title}</p>
    )}
    <p className="text-gray-600 text-sm line-clamp-2">{review.comment}</p>
  </div>
);

export default function CustomerDashboard() {
  const router = useRouter();
  
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [removingItems, setRemovingItems] = useState({});
  const [stats, setStats] = useState({
    totalOrders: 0,
    placedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalSpent: 0,
    filteredTotalOrders: 0,
    filteredPlacedOrders: 0,
    filteredDeliveredOrders: 0,
    filteredCancelledOrders: 0,
    filteredTotalSpent: 0,
    totalReviews: 0,
    approvedReviews: 0,
    pendingReviews: 0,
    rejectedReviews: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const [error, setError] = useState(null);
  
  // Filter states
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [filterType, setFilterType] = useState('month');
  const [availableYears, setAvailableYears] = useState([]);

  const months = [
    { value: 1, name: 'January' }, { value: 2, name: 'February' },
    { value: 3, name: 'March' }, { value: 4, name: 'April' },
    { value: 5, name: 'May' }, { value: 6, name: 'June' },
    { value: 7, name: 'July' }, { value: 8, name: 'August' },
    { value: 9, name: 'September' }, { value: 10, name: 'October' },
    { value: 11, name: 'November' }, { value: 12, name: 'December' }
  ];

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'https://kids-backend.vercel.app'}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      if (err.response?.status === 401) {
        router.push('/login');
      }
    }
  };

  // Fetch user orders
  const fetchUserOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'https://kids-backend.vercel.app'}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 100 }
      });
      
      if (response.data.success) {
        const userOrders = Array.isArray(response.data.data) ? response.data.data : [];
        setOrders(userOrders);
        
        // Calculate total stats from all orders (unfiltered)
        const placedOrders = userOrders.filter(o => o.orderStatus === 'placed').length;
        const deliveredOrders = userOrders.filter(o => o.orderStatus === 'delivered').length;
        const cancelledOrders = userOrders.filter(o => o.orderStatus === 'cancelled').length;
        const totalSpent = userOrders
          .filter(o => o.paymentStatus === 'paid' && o.orderStatus === 'delivered')
          .reduce((sum, o) => sum + (o.total || 0), 0);
        
        setStats(prev => ({
          ...prev,
          totalOrders: userOrders.length,
          placedOrders,
          deliveredOrders,
          cancelledOrders,
          totalSpent
        }));
        
        // Extract available years from orders
        const years = [...new Set(userOrders.map(order => new Date(order.createdAt).getFullYear()))];
        years.sort((a, b) => b - a);
        setAvailableYears(years.length ? years : [new Date().getFullYear()]);
        
        // Apply initial filter
        filterOrdersByDate(userOrders);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrders([]);
    }
  };

  // Fetch user reviews
  const fetchUserReviews = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'https://kids-backend.vercel.app'}/api/reviews/my-reviews`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 100 }
      });
      
      if (response.data.success) {
        const userReviews = Array.isArray(response.data.data) ? response.data.data : [];
        setReviews(userReviews);
        
        const totalReviews = userReviews.length;
        const approvedReviews = userReviews.filter(r => r.status === 'approved' && r.isApproved === true).length;
        const pendingReviews = userReviews.filter(r => r.status === 'pending').length;
        const rejectedReviews = userReviews.filter(r => r.status === 'rejected').length;
        
        setStats(prev => ({
          ...prev,
          totalReviews,
          approvedReviews,
          pendingReviews,
          rejectedReviews
        }));
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviews([]);
    }
  };

  // Filter orders by date
  const filterOrdersByDate = (ordersList = orders) => {
    let filtered = [...ordersList];
    
    if (filterType === 'month') {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getFullYear() === selectedYear && 
               orderDate.getMonth() + 1 === selectedMonth;
      });
    } else {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getFullYear() === selectedYear;
      });
    }
    
    setFilteredOrders(filtered);
    
    // Update filtered stats
    const placed = filtered.filter(o => o.orderStatus === 'placed').length;
    const delivered = filtered.filter(o => o.orderStatus === 'delivered').length;
    const cancelled = filtered.filter(o => o.orderStatus === 'cancelled').length;
    const totalSpent = filtered
      .filter(o => o.paymentStatus === 'paid' && o.orderStatus === 'delivered')
      .reduce((sum, o) => sum + (o.total || 0), 0);
    
    setStats(prev => ({
      ...prev,
      filteredTotalOrders: filtered.length,
      filteredPlacedOrders: placed,
      filteredDeliveredOrders: delivered,
      filteredCancelledOrders: cancelled,
      filteredTotalSpent: totalSpent
    }));
  };

  // Fetch wishlist
  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'https://kids-backend.vercel.app'}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        const wishlistData = response.data.data;
        let items = [];
        if (wishlistData && Array.isArray(wishlistData.items)) {
          items = wishlistData.items;
        } else if (Array.isArray(wishlistData)) {
          items = wishlistData;
        } else if (wishlistData && wishlistData._id && Array.isArray(wishlistData.items)) {
          items = wishlistData.items;
        }
        setWishlistItems(items);
      } else {
        setWishlistItems([]);
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      setWishlistItems([]);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (itemId) => {
    setRemovingItems(prev => ({ ...prev, [itemId]: true }));
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || 'https://kids-backend.vercel.app'}/api/wishlist/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setWishlistItems(prev => prev.filter(item => item._id !== itemId));
      toast.success('Removed from wishlist');
    } catch (err) {
      console.error('Remove from wishlist error:', err);
      toast.error('Failed to remove item');
    } finally {
      setRemovingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  // Load all data
  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await fetchUserProfile();
      await Promise.all([
        fetchUserOrders(),
        fetchUserReviews(),
        fetchWishlist()
      ]);
    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Apply filter when date changes
  useEffect(() => {
    if (orders.length > 0) {
      filterOrdersByDate();
    }
  }, [selectedYear, selectedMonth, filterType]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const copyOrderId = (orderId) => {
    navigator.clipboard.writeText(orderId);
    toast.success('Order ID copied!');
  };

  const getFilterLabel = () => {
    if (filterType === 'month') {
      const month = months.find(m => m.value === selectedMonth);
      return `${month?.name} ${selectedYear}`;
    }
    return `Year ${selectedYear}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="text-center bg-red-50 p-6 rounded-xl max-w-md w-full">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
          <button
            onClick={loadDashboardData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">My Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">
                Welcome back, {user?.name || 'Customer'}! Here's your activity summary.
              </p>
            </div>
          
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              <div className="flex gap-2 bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
                <button
                  onClick={() => setFilterType('month')}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition ${
                    filterType === 'month' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setFilterType('year')}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition ${
                    filterType === 'year' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Yearly
                </button>
              </div>

              {filterType === 'month' && (
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                  >
                    {months.map(month => (
                      <option key={month.value} value={month.value}>{month.name}</option>
                    ))}
                  </select>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                  >
                    {availableYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              )}

              {filterType === 'year' && (
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                >
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
              <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Showing orders for: <strong className="text-gray-800">{getFilterLabel()}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards - Orders Summary (Filtered) */}
        <div className="grid  grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs">Total Orders</p>
                <p className="text-2xl font-bold">{stats.filteredTotalOrders}</p>
                <p className="text-blue-100 text-[10px] mt-1">in {getFilterLabel()}</p>
              </div>
              <ShoppingBag className="h-8 w-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-xs">Placed</p>
                <p className="text-2xl font-bold">{stats.filteredPlacedOrders}</p>
                <p className="text-yellow-100 text-[10px] mt-1">in {getFilterLabel()}</p>
              </div>
              <Clock className="h-8 w-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs">Delivered</p>
                <p className="text-2xl font-bold">{stats.filteredDeliveredOrders}</p>
                <p className="text-green-100 text-[10px] mt-1">in {getFilterLabel()}</p>
              </div>
              <CheckCircle className="h-8 w-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-xs">Cancelled</p>
                <p className="text-2xl font-bold">{stats.filteredCancelledOrders}</p>
                <p className="text-red-100 text-[10px] mt-1">in {getFilterLabel()}</p>
              </div>
              <XCircle className="h-8 w-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs">Total Spent</p>
                <p className="text-xl font-bold">{formatCurrency(stats.filteredTotalSpent)}</p>
                <p className="text-purple-100 text-[10px] mt-1">in {getFilterLabel()}</p>
              </div>
              <DollarSign className="h-8 w-8 opacity-80" />
            </div>
          </div>
        </div>

        {/* Reviews Summary Cards (All Time - No Filter) */}
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl shadow-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-xs">Total Reviews</p>
                <p className="text-2xl font-bold">{stats.totalReviews}</p>
                <p className="text-cyan-100 text-[10px] mt-1">All time</p>
              </div>
              <MessageSquare className="h-8 w-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-xs">Approved</p>
                <p className="text-2xl font-bold">{stats.approvedReviews}</p>
                <p className="text-emerald-100 text-[10px] mt-1">Published reviews</p>
              </div>
              <CheckCircle className="h-8 w-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-xs">Pending</p>
                <p className="text-2xl font-bold">{stats.pendingReviews}</p>
                <p className="text-amber-100 text-[10px] mt-1">Awaiting moderation</p>
              </div>
              <Clock className="h-8 w-8 opacity-80" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap gap-2 px-4">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-3 text-sm font-medium transition border-b-2 ${
                  activeTab === 'orders'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  My Orders ({filteredOrders.length})
                </div>
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-3 text-sm font-medium transition border-b-2 ${
                  activeTab === 'reviews'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  My Reviews ({reviews.length})
                </div>
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`px-4 py-3 text-sm font-medium transition border-b-2 ${
                  activeTab === 'wishlist'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Wishlist ({wishlistItems.length})
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Orders Tab - Shows FILTERED orders */}
        {activeTab === 'orders' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Orders ({getFilterLabel()})
              </h2>
              {filteredOrders.length > 0 && (
                <button 
                  onClick={() => router.push('/customer/orders')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All Orders →
                </button>
              )}
            </div>
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                  <p className="text-gray-500 mb-4">You haven't placed any orders in {getFilterLabel()}.</p>
                  <button onClick={() => router.push('/')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Start Shopping
                  </button>
                </div>
              ) : (
                filteredOrders.slice(0, 5).map((order) => (
                  <OrderCard 
                    key={order._id} 
                    order={order} 
                    copyOrderId={copyOrderId} 
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* Reviews Tab - Shows ALL reviews (no date filter) */}
        {activeTab === 'reviews' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">My Reviews</h2>
              {reviews.length > 0 && (
                <button 
                  onClick={() => router.push('/customer/my-reviews')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All Reviews →
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center col-span-2">
                  <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-500 mb-4">You haven't written any reviews yet.</p>
                  <button onClick={() => router.push('/')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Shop & Review
                  </button>
                </div>
              ) : (
                reviews.slice(0, 6).map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))
              )}
            </div>
          </div>
        )}

        {/* Wishlist Tab - Shows ALL wishlist items (no date filter) */}
        {activeTab === 'wishlist' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">My Wishlist</h2>
              {wishlistItems.length > 0 && (
                <button 
                  onClick={() => router.push('/wishlist')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All Wishlist →
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {wishlistItems.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center col-span-full">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-500 mb-4">Save your favorite items here!</p>
                  <button onClick={() => router.push('/')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Explore Products
                  </button>
                </div>
              ) : (
                wishlistItems.slice(0, 10).map((item) => (
                  <WishlistCard
                    key={item._id}
                    item={item}
                    onRemove={removeFromWishlist}
                    onViewProduct={(id) => router.push(`/productDetails?id=${id}`)}
                    isRemoving={removingItems[item._id]}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}