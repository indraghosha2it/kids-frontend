// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { toast } from 'sonner';

// import { 
//   FaBox,
//   FaEye,
//   FaClock,
//   FaMoneyBillWave,
//   FaUser,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaPrint,
//   FaChevronLeft,
//   FaChevronRight,
//   FaSpinner,
//   FaShippingFast,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaBan,
//   FaFileInvoice,
//   FaTruck,
//   FaCheckDouble,
//   FaCreditCard,
//   FaMobileAlt,
//   FaSearch,
//   FaFilter,
//   FaTimes
// } from 'react-icons/fa';

// const ORDER_STATUSES = [
//   { value: 'placed', label: 'Placed', color: 'bg-blue-100 text-blue-800', icon: FaClock },
//   { value: 'confirmed', label: 'Confirmed', color: 'bg-cyan-100 text-cyan-800', icon: FaCheckCircle },
//   { value: 'processing', label: 'Processing', color: 'bg-purple-100 text-purple-800', icon: FaSpinner },
//   { value: 'shipped', label: 'Shipped', color: 'bg-indigo-100 text-indigo-800', icon: FaShippingFast },
//   { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800', icon: FaCheckDouble },
//   { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: FaBan }
// ];

// const PAYMENT_STATUSES = [
//   { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
//   { value: 'paid', label: 'Paid', color: 'bg-green-100 text-green-800' },
//   { value: 'failed', label: 'Failed', color: 'bg-red-100 text-red-800' },
//   { value: 'refunded', label: 'Refunded', color: 'bg-orange-100 text-orange-800' }
// ];

// // Order Details Modal for Customer
// const OrderDetailsModal = ({ isOpen, onClose, order }) => {
//   if (!isOpen || !order) return null;

//   const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
//   const paymentInfo = PAYMENT_STATUSES.find(p => p.value === order.paymentStatus);
//   const isCancelled = order.orderStatus === 'cancelled';
//   const isDelivered = order.orderStatus === 'delivered';

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
//       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden">
//         <div className="p-4 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white sticky top-0">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaFileInvoice className="w-5 h-5" />
//               <h2 className="text-lg font-bold">Order Details</h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimesCircle className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
//         </div>

//         <div className="p-5 max-h-[60vh] overflow-y-auto">
//           {/* Order Status Badges */}
//           <div className="flex flex-wrap gap-2 mb-5">
//             <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${statusInfo?.color || 'bg-gray-100 text-gray-800'}`}>
//               {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
//               <span className="font-medium">Order: {statusInfo?.label || order.orderStatus}</span>
//             </div>
//             <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${paymentInfo?.color || 'bg-gray-100 text-gray-800'}`}>
//               <FaMoneyBillWave className="w-3 h-3" />
//               <span className="font-medium">Payment: {paymentInfo?.label || order.paymentStatus}</span>
//             </div>
//             {order.paymentMethod === 'cod' && (
//               <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
//                 <FaMoneyBillWave className="w-3 h-3" />
//                 <span>Cash on Delivery</span>
//               </div>
//             )}
//             {order.paymentMethod === 'online' && (
//               <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
//                 <FaCreditCard className="w-3 h-3" />
//                 <span>Online Payment</span>
//               </div>
//             )}
//             {order.paymentMethod === 'bkash' && (
//               <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-pink-100 text-pink-800">
//                 <FaMobileAlt className="w-3 h-3" />
//                 <span>bKash</span>
//               </div>
//             )}
//             {order.paymentMethod === 'nagad' && (
//               <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
//                 <FaMobileAlt className="w-3 h-3" />
//                 <span>Nagad</span>
//               </div>
//             )}
//           </div>

//           {/* Delivery Message */}
//           {isDelivered && order.deliveredAt && (
//             <div className="mb-5 bg-green-50 border-l-4 border-green-500 rounded-lg p-3">
//               <div className="flex items-start gap-2">
//                 <FaCheckDouble className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-green-700">Order Delivered</h4>
//                   <p className="text-xs text-green-600 mt-1">
//                     <span className="font-medium">Delivered on:</span> {new Date(order.deliveredAt).toLocaleDateString('en-BD', {
//                       day: '2-digit',
//                       month: 'long',
//                       year: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit'
//                     })}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Cancellation Message */}
//           {isCancelled && order.cancellationReason && (
//             <div className="mb-5 bg-red-50 border-l-4 border-red-500 rounded-lg p-3">
//               <div className="flex items-start gap-2">
//                 <FaBan className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-red-700">Order Cancelled</h4>
//                   <p className="text-xs text-red-600 mt-1">
//                     <span className="font-medium">Reason:</span> {order.cancellationReason}
//                   </p>
//                   {order.cancelledAt && (
//                     <p className="text-xs text-red-500 mt-1">
//                       <span className="font-medium">Cancelled on:</span> {new Date(order.cancelledAt).toLocaleDateString('en-BD', {
//                         day: '2-digit',
//                         month: 'short',
//                         year: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Order Info Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//             <div className="bg-gray-50 rounded-lg p-3">
//               <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
//                 <FaUser className="w-3.5 h-3.5 text-[#4A8A90]" />
//                 Customer Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-gray-500">Name:</span> {order.customerInfo?.fullName}</p>
//                 <p><span className="text-gray-500">Email:</span> {order.customerInfo?.email}</p>
//                 <p><span className="text-gray-500">Phone:</span> {order.customerInfo?.phone}</p>
//                 {order.customerInfo?.whatsapp && (
//                   <p><span className="text-gray-500">WhatsApp:</span> {order.customerInfo.whatsapp}</p>
//                 )}
//               </div>
//             </div>

//             <div className="bg-gray-50 rounded-lg p-3">
//               <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
//                 <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#4A8A90]" />
//                 Delivery Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-gray-500">Address:</span> {order.customerInfo?.address}</p>
//                 <p><span className="text-gray-500">City:</span> {order.customerInfo?.city}</p>
//                 <p><span className="text-gray-500">Upazila/Thana:</span> {order.customerInfo?.zone}</p>
//                 {order.customerInfo?.area && <p><span className="text-gray-500">Area:</span> {order.customerInfo.area}</p>}
//                 {order.trackingNumber && (
//                   <p><span className="text-gray-500">Tracking:</span> <span className="font-mono">{order.trackingNumber}</span></p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Order Items Table */}
//           <div className="mb-5">
//             <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
//               <FaBox className="w-3.5 h-3.5 text-[#4A8A90]" />
//               Order Items
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-xs">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-2 py-1.5 text-left">Product</th>
//                     <th className="px-2 py-1.5 text-center">Qty</th>
//                     <th className="px-2 py-1.5 text-right">Price</th>
//                     <th className="px-2 py-1.5 text-right">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {order.items?.map((item, idx) => (
//                     <tr key={idx} className="border-t border-gray-100">
//                       <td className="px-2 py-2">
//                         <div className="flex items-center gap-2">
//                           <img 
//                             src={item.image || 'https://via.placeholder.com/30'} 
//                             alt={item.productName}
//                             className="w-7 h-7 rounded object-cover"
//                             onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Toy'; }}
//                           />
//                           <div>
//                             <p className="font-medium text-xs">{item.productName}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-2 py-2 text-center">{item.quantity}</td>
//                       <td className="px-2 py-2 text-right">৳{(item.discountPrice || item.regularPrice).toFixed(2)}</td>
//                       <td className="px-2 py-2 text-right font-medium">৳{((item.discountPrice || item.regularPrice) * item.quantity).toFixed(2)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//                 <tfoot className="border-t border-gray-200">
//                   <tr>
//                     <td colSpan="3" className="px-2 py-1 text-right font-medium">Subtotal:</td>
//                     <td className="px-2 py-1 text-right">৳{order.subtotal?.toFixed(2)}</td>
//                   </tr>
//                   <tr>
//                     <td colSpan="3" className="px-2 py-1 text-right font-medium">Shipping:</td>
//                     <td className="px-2 py-1 text-right">৳{order.shippingCost?.toFixed(2)}</td>
//                   </tr>
//                   {order.discount > 0 && (
//                     <tr>
//                       <td colSpan="3" className="px-2 py-1 text-right font-medium text-green-600">Discount:</td>
//                       <td className="px-2 py-1 text-right text-green-600">- ৳{order.discount.toFixed(2)}</td>
//                     </tr>
//                   )}
//                   <tr className="text-sm font-bold">
//                     <td colSpan="3" className="px-2 py-1 text-right">Total:</td>
//                     <td className="px-2 py-1 text-right text-[#4A8A90]">৳{order.total?.toFixed(2)}</td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>

//           {/* Additional Info */}
//           {(order.couponCode || order.deliveryNote) && (
//             <div className="bg-gray-50 rounded-lg p-3">
//               <h3 className="font-semibold text-gray-900 text-sm mb-1.5">Additional Information</h3>
//               {order.couponCode && <p className="text-xs"><span className="text-gray-500">Coupon Applied:</span> {order.couponCode}</p>}
//               {order.deliveryNote && <p className="text-xs"><span className="text-gray-500">Delivery Note:</span> {order.deliveryNote}</p>}
//             </div>
//           )}
//         </div>

//         <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-2">
//           <button onClick={() => window.print()} className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5 text-sm">
//             <FaPrint className="w-3 h-3" /> Print
//           </button>
//           <button onClick={onClose} className="px-3 py-1.5 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition-colors text-sm">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Customer Orders Page
// export default function CustomerOrdersPage() {
//   const router = useRouter();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
//   const [paymentMethodFilter, setPaymentMethodFilter] = useState('');
// const fetchOrders = useCallback(async () => {
//   setLoading(true);
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login');
//       return;
//     }

//     const queryParams = new URLSearchParams({
//       page: currentPage,
//       limit: 10
//     });
//     if (searchTerm) queryParams.append('search', searchTerm);
//     if (statusFilter) queryParams.append('orderStatus', statusFilter);
//     if (paymentStatusFilter) queryParams.append('paymentStatus', paymentStatusFilter);
//     if (paymentMethodFilter) queryParams.append('paymentMethod', paymentMethodFilter);

//     console.log('Fetching with search:', searchTerm); // Debug log

//     const response = await fetch(`https://kids-backend.vercel.app/api/orders?${queryParams}`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });

//     const data = await response.json();
//     if (data.success) {
//       setOrders(data.data);
//       setTotalPages(data.pagination.pages);
//       setTotalOrders(data.pagination.total);
//       console.log('Orders found:', data.data.length); // Debug log
//     } else {
//       toast.error(data.error || 'Failed to fetch orders');
//     }
//   } catch (error) {
//     console.error('Fetch orders error:', error);
//     toast.error('Network error');
//   } finally {
//     setLoading(false);
//   }
// }, [currentPage, searchTerm, statusFilter, paymentStatusFilter, paymentMethodFilter, router]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   const clearFilters = () => {
//     setSearchTerm('');
//     setStatusFilter('');
//     setPaymentStatusFilter('');
//     setPaymentMethodFilter('');
//     setCurrentPage(1);
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-BD', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getStatusBadge = (status) => {
//     const statusInfo = ORDER_STATUSES.find(s => s.value === status);
//     if (!statusInfo) return <span className="px-1.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>;
//     return (
//       <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs ${statusInfo.color}`}>
//         <statusInfo.icon className="w-2.5 h-2.5" />
//         {statusInfo.label}
//       </span>
//     );
//   };

//   const getPaymentStatusBadge = (status) => {
//     const paymentInfo = PAYMENT_STATUSES.find(p => p.value === status);
//     return (
//       <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs ${paymentInfo?.color || 'bg-gray-100 text-gray-800'}`}>
//         <FaMoneyBillWave className="w-2.5 h-2.5" />
//         {paymentInfo?.label || status}
//       </span>
//     );
//   };

//   const getPaymentMethodBadge = (method) => {
//     const methods = {
//       'cod': { label: 'COD', color: 'bg-orange-100 text-orange-800' },
//       'online': { label: 'Online', color: 'bg-blue-100 text-blue-800' },
//       'bkash': { label: 'bKash', color: 'bg-pink-100 text-pink-800' },
//       'nagad': { label: 'Nagad', color: 'bg-purple-100 text-purple-800' }
//     };
    
//     const info = methods[method] || { label: method || 'Unknown', color: 'bg-gray-100 text-gray-800' };
    
//     return (
//       <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs ${info.color}`}>
//         {info.label}
//       </span>
//     );
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-[#FFF9F0] pb-12 pt-6">
//         <div className="container mx-auto px-4 max-w-7xl">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//             <div className="flex items-center gap-3">
//               <FaBox className="w-7 h-7 text-[#4A8A90]" />
//               <h1 className="text-2xl md:text-3xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                 My Orders
//               </h1>
//             </div>
//             <Link 
//               href="/products" 
//               className="flex items-center gap-2 px-4 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition-colors"
//             >
//               Continue Shopping
//             </Link>
//           </div>

//           {/* Search and Filters */}
//           <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-4 mb-6 shadow-md">
//             <div className="flex flex-col gap-4">
//               {/* Search Bar */}
//               <div className="relative">
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search by Order ID...."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={() => {
//                       setSearchTerm('');
//                       setCurrentPage(1);
//                     }}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     <FaTimes className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>

//               {/* Filter Row */}
//               <div className="flex flex-wrap gap-3 items-center">
//                 <div className="flex items-center gap-2">
//                   <FaFilter className="w-4 h-4 text-gray-400" />
//                   <span className="text-sm text-gray-600">Filters:</span>
//                 </div>
                
//                 {/* Order Status Filter */}
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => {
//                     setStatusFilter(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
//                 >
//                   <option value="">All Order Status</option>
//                   {ORDER_STATUSES.map(status => (
//                     <option key={status.value} value={status.value}>{status.label}</option>
//                   ))}
//                 </select>

//                 {/* Payment Status Filter */}
//                 <select
//                   value={paymentStatusFilter}
//                   onChange={(e) => {
//                     setPaymentStatusFilter(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
//                 >
//                   <option value="">All Payment Status</option>
//                   {PAYMENT_STATUSES.map(status => (
//                     <option key={status.value} value={status.value}>{status.label}</option>
//                   ))}
//                 </select>

//                 {/* Payment Method Filter */}
//                 {/* <select
//                   value={paymentMethodFilter}
//                   onChange={(e) => {
//                     setPaymentMethodFilter(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
//                 >
//                   <option value="">All Payment Methods</option>
//                   <option value="cod">Cash on Delivery</option>
//                   <option value="online">Online Payment</option>
//                   <option value="bkash">bKash</option>
//                   <option value="nagad">Nagad</option>
//                 </select> */}

//                 {/* Clear Filters Button */}
//                 {(searchTerm || statusFilter || paymentStatusFilter || paymentMethodFilter) && (
//                   <button
//                     onClick={clearFilters}
//                     className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
//                   >
//                     <FaTimes className="w-3 h-3" />
//                     Clear Filters
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Orders Table */}
//           <div className="bg-white rounded-xl border-2 border-[#FFE0E6] shadow-md overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[900px] lg:min-w-full">
//                 <thead className="bg-gray-50 border-b-2 border-[#FFE0E6]">
//                   <tr>
//                     <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Order ID</th>
//                     <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Date</th>
//                     <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700">Total</th>
//                     <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">Order Status</th>
//                     <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">Payment Status</th>
//                     <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">Payment Method</th>
//                     <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td colSpan="7" className="px-4 py-8 text-center">
//                         <div className="flex justify-center">
//                           <div className="w-6 h-6 border-3 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : orders.length === 0 ? (
//                     <tr>
//                       <td colSpan="7" className="px-4 py-12 text-center">
//                         <div className="flex flex-col items-center gap-3">
//                           <FaBox className="w-12 h-12 text-gray-300" />
//                           <p className="text-gray-500 text-sm">No orders found</p>
//                           <Link href="/products" className="text-[#4A8A90] hover:underline text-sm">
//                             Start Shopping
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     orders.map((order) => (
//                       <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//                         <td className="px-3 py-2 text-xs font-mono">
//                           {order.orderNumber || order._id.slice(-8).toUpperCase()}
//                         </td>
//                         <td className="px-3 py-2 text-xs text-gray-500 whitespace-nowrap">
//                           {order.orderStatus === 'delivered' && order.deliveredAt ? (
//                             <div className="flex flex-col gap-0.5">
//                               <div><span className="text-gray-400 text-[10px]">Ordered:</span> {formatDate(order.createdAt)}</div>
//                               <div className="text-green-600"><span className="text-green-500 text-[10px]">Delivered:</span> {new Date(order.deliveredAt).toLocaleDateString('en-BD', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
//                             </div>
//                           ) : order.orderStatus === 'cancelled' && order.cancelledAt ? (
//                             <div className="flex flex-col gap-0.5">
//                               <div><span className="text-gray-400 text-[10px]">Ordered:</span> {formatDate(order.createdAt)}</div>
//                               <div className="text-red-600"><span className="text-red-500 text-[10px]">Cancelled:</span> {new Date(order.cancelledAt).toLocaleDateString('en-BD', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
//                             </div>
//                           ) : (
//                             <div>{formatDate(order.createdAt)}</div>
//                           )}
//                         </td>
//                         <td className="px-3 py-2 text-xs text-right font-bold text-[#4A8A90]">
//                           ৳{order.total?.toFixed(2)}
//                         </td>
//                         <td className="px-3 py-2 text-center">
//                           {getStatusBadge(order.orderStatus)}
//                         </td>
//                         <td className="px-3 py-2 text-center">
//                           {getPaymentStatusBadge(order.paymentStatus)}
//                         </td>
//                         <td className="px-3 py-2 text-center">
//                           {getPaymentMethodBadge(order.paymentMethod)}
//                         </td>
//                         <td className="px-3 py-2 text-center">
//                           <button
//                             onClick={() => {
//                               setSelectedOrder(order);
//                               setShowDetailsModal(true);
//                             }}
//                             className="inline-flex items-center gap-1 px-2 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors text-sm"
//                             title="View Details"
//                           >
//                             <FaEye className="w-3.5 h-3.5" />
//                             View
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="px-3 py-2 border-t border-gray-200 flex items-center justify-between">
//                 <p className="text-xs text-gray-500">Showing {orders.length} of {totalOrders} orders</p>
//                 <div className="flex gap-1">
//                   <button
//                     onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                     disabled={currentPage === 1}
//                     className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
//                   >
//                     <FaChevronLeft className="w-3 h-3" />
//                   </button>
//                   <span className="px-2 py-1 text-xs">Page {currentPage} of {totalPages}</span>
//                   <button
//                     onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                     disabled={currentPage === totalPages}
//                     className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
//                   >
//                     <FaChevronRight className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Order Details Modal */}
//       <OrderDetailsModal
//         isOpen={showDetailsModal}
//         onClose={() => setShowDetailsModal(false)}
//         order={selectedOrder}
//       />
//     </>
//   );
// }

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

import { 
  FaBox,
  FaEye,
  FaClock,
  FaMoneyBillWave,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPrint,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
  FaBan,
  FaFileInvoice,
  FaTruck,
  FaCheckDouble,
  FaCreditCard,
  FaMobileAlt,
  FaSearch,
  FaFilter,
  FaTimes
} from 'react-icons/fa';

const ORDER_STATUSES = [
  { value: 'placed', label: 'Placed', color: 'bg-blue-100 text-blue-800', icon: FaClock },
  { value: 'confirmed', label: 'Confirmed', color: 'bg-cyan-100 text-cyan-800', icon: FaCheckCircle },
  { value: 'processing', label: 'Processing', color: 'bg-purple-100 text-purple-800', icon: FaSpinner },
  { value: 'shipped', label: 'Shipped', color: 'bg-indigo-100 text-indigo-800', icon: FaShippingFast },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800', icon: FaCheckDouble },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: FaBan }
];

const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'paid', label: 'Paid', color: 'bg-green-100 text-green-800' },
  { value: 'failed', label: 'Failed', color: 'bg-red-100 text-red-800' },
  { value: 'refunded', label: 'Refunded', color: 'bg-orange-100 text-orange-800' }
];

// Cancel Order Modal
const CancelOrderModal = ({ isOpen, onClose, order, onCancel }) => {
  const [cancellationReason, setCancellationReason] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!cancellationReason.trim()) {
      toast.error('Please provide a cancellation reason');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://kids-backend.vercel.app/api/orders/${order._id}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ cancellationReason })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Order cancelled successfully');
        onCancel();
        onClose();
      } else {
        toast.error(data.error || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Cancel order error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="flex items-center gap-2">
            <FaBan className="w-5 h-5" />
            <h2 className="text-lg font-bold">Cancel Order</h2>
          </div>
        </div>

        <div className="p-5">
          <p className="text-gray-700 text-sm mb-3">
            Are you sure you want to cancel this order?
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}
          </p>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Cancellation Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              rows="3"
              placeholder="Please tell us why you're cancelling this order..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
          <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
            Close
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaBan className="w-3 h-3" />}
            Confirm Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Order Details Modal for Customer
const OrderDetailsModal = ({ isOpen, onClose, order, onCancelOrder }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isOpen || !order) return null;

  const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
  const paymentInfo = PAYMENT_STATUSES.find(p => p.value === order.paymentStatus);
  const isCancelled = order.orderStatus === 'cancelled';
  const isDelivered = order.orderStatus === 'delivered';
  const canCancel = order.orderStatus === 'placed' && order.paymentMethod === 'cod';

  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDateLong = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-BD', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white sticky top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaFileInvoice className="w-5 h-5" />
              <h2 className="text-lg font-bold">Order Details</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimesCircle className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {/* Order Status Badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${statusInfo?.color || 'bg-gray-100 text-gray-800'}`}>
              {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
              <span className="font-medium">Order: {statusInfo?.label || order.orderStatus}</span>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${paymentInfo?.color || 'bg-gray-100 text-gray-800'}`}>
              <FaMoneyBillWave className="w-3 h-3" />
              <span className="font-medium">Payment: {paymentInfo?.label || order.paymentStatus}</span>
            </div>
            {order.paymentMethod === 'cod' && (
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                <FaMoneyBillWave className="w-3 h-3" />
                <span>Cash on Delivery</span>
              </div>
            )}
            {order.paymentMethod === 'online' && (
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                <FaCreditCard className="w-3 h-3" />
                <span>Online Payment</span>
              </div>
            )}
          </div>

          {/* Cancel Button - Show only if order can be cancelled */}
          {canCancel && (
            <div className="mb-5">
              <button
                onClick={() => {
                  onClose();
                  onCancelOrder();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                <FaBan className="w-4 h-4" />
                Cancel Order
              </button>
            </div>
          )}

          {/* Delivery Message */}
          {isDelivered && order.deliveredAt && isClient && (
            <div className="mb-5 bg-green-50 border-l-4 border-green-500 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <FaCheckDouble className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-green-700">Order Delivered</h4>
                  <p className="text-xs text-green-600 mt-1">
                    <span className="font-medium">Delivered on:</span> {formatDateLong(order.deliveredAt)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Cancellation Message */}
          {isCancelled && order.cancellationReason && (
            <div className="mb-5 bg-red-50 border-l-4 border-red-500 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <FaBan className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-red-700">Order Cancelled</h4>
                  <p className="text-xs text-red-600 mt-1">
                    <span className="font-medium">Reason:</span> {order.cancellationReason}
                  </p>
                  {order.cancelledAt && (
                    <p className="text-xs text-red-500 mt-1">
                      <span className="font-medium">Cancelled on:</span> {formatDate(order.cancelledAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Order Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
                <FaUser className="w-3.5 h-3.5 text-[#4A8A90]" />
                Customer Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-gray-500">Name:</span> {order.customerInfo?.fullName}</p>
                <p><span className="text-gray-500">Email:</span> {order.customerInfo?.email}</p>
                <p><span className="text-gray-500">Phone:</span> {order.customerInfo?.phone}</p>
                {order.customerInfo?.whatsapp && (
                  <p><span className="text-gray-500">WhatsApp:</span> {order.customerInfo.whatsapp}</p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#4A8A90]" />
                Delivery Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-gray-500">Address:</span> {order.customerInfo?.address}</p>
                <p><span className="text-gray-500">City:</span> {order.customerInfo?.city}</p>
                <p><span className="text-gray-500">Upazila/Thana:</span> {order.customerInfo?.zone}</p>
                {order.customerInfo?.area && <p><span className="text-gray-500">Area:</span> {order.customerInfo.area}</p>}
                {order.trackingNumber && (
                  <p><span className="text-gray-500">Tracking:</span> <span className="font-mono">{order.trackingNumber}</span></p>
                )}
              </div>
            </div>
          </div>

          {/* Order Items Table */}
          <div className="mb-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
              <FaBox className="w-3.5 h-3.5 text-[#4A8A90]" />
              Order Items
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-1.5 text-left">Product</th>
                    <th className="px-2 py-1.5 text-center">Qty</th>
                    <th className="px-2 py-1.5 text-right">Price</th>
                    <th className="px-2 py-1.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item, idx) => (
                    <tr key={idx} className="border-t border-gray-100">
                      <td className="px-2 py-2">
                        <div className="flex items-center gap-2">
                          <img 
                            src={item.image || 'https://via.placeholder.com/30'} 
                            alt={item.productName}
                            className="w-7 h-7 rounded object-cover"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Toy'; }}
                          />
                          <div>
                            <p className="font-medium text-xs">{item.productName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-2 text-center">{item.quantity}</td>
                      <td className="px-2 py-2 text-right">৳{(item.discountPrice || item.regularPrice).toFixed(2)}</td>
                      <td className="px-2 py-2 text-right font-medium">৳{((item.discountPrice || item.regularPrice) * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t border-gray-200">
                  <tr>
                    <td colSpan="3" className="px-2 py-1 text-right font-medium">Subtotal:</td>
                    <td className="px-2 py-1 text-right">৳{order.subtotal?.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="px-2 py-1 text-right font-medium">Shipping:</td>
                    <td className="px-2 py-1 text-right">৳{order.shippingCost?.toFixed(2)}</td>
                  </tr>
                  {order.discount > 0 && (
                    <tr>
                      <td colSpan="3" className="px-2 py-1 text-right font-medium text-green-600">Discount:</td>
                      <td className="px-2 py-1 text-right text-green-600">- ৳{order.discount.toFixed(2)}</td>
                    </tr>
                  )}
                  <tr className="text-sm font-bold">
                    <td colSpan="3" className="px-2 py-1 text-right">Total:</td>
                    <td className="px-2 py-1 text-right text-[#4A8A90]">৳{order.total?.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Additional Info */}
          {(order.couponCode || order.deliveryNote) && (
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-1.5">Additional Information</h3>
              {order.couponCode && <p className="text-xs"><span className="text-gray-500">Coupon Applied:</span> {order.couponCode}</p>}
              {order.deliveryNote && <p className="text-xs"><span className="text-gray-500">Delivery Note:</span> {order.deliveryNote}</p>}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-2">
          <button onClick={() => window.print()} className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5 text-sm">
            <FaPrint className="w-3 h-3" /> Print
          </button>
          <button onClick={onClose} className="px-3 py-1.5 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition-colors text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Customer Orders Page
export default function CustomerOrdersPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 10
      });
      if (searchTerm) queryParams.append('search', searchTerm);
      if (statusFilter) queryParams.append('orderStatus', statusFilter);
      if (paymentStatusFilter) queryParams.append('paymentStatus', paymentStatusFilter);
      if (paymentMethodFilter) queryParams.append('paymentMethod', paymentMethodFilter);

      const response = await fetch(`https://kids-backend.vercel.app/api/orders?${queryParams}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
        setTotalPages(data.pagination.pages);
        setTotalOrders(data.pagination.total);
      } else {
        toast.error(data.error || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, paymentStatusFilter, paymentMethodFilter, router]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCancelOrder = () => {
    fetchOrders();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setPaymentStatusFilter('');
    setPaymentMethodFilter('');
    setCurrentPage(1);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatShortDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
  };

  const getStatusBadge = (status) => {
    const statusInfo = ORDER_STATUSES.find(s => s.value === status);
    if (!statusInfo) return <span className="px-1.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>;
    return (
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs ${statusInfo.color}`}>
        <statusInfo.icon className="w-2.5 h-2.5" />
        {statusInfo.label}
      </span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const paymentInfo = PAYMENT_STATUSES.find(p => p.value === status);
    return (
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs ${paymentInfo?.color || 'bg-gray-100 text-gray-800'}`}>
        <FaMoneyBillWave className="w-2.5 h-2.5" />
        {paymentInfo?.label || status}
      </span>
    );
  };

  const getPaymentMethodBadge = (method) => {
    const methods = {
      'cod': { label: 'COD', color: 'bg-orange-100 text-orange-800' },
      'online': { label: 'Online', color: 'bg-blue-100 text-blue-800' },
      'bkash': { label: 'bKash', color: 'bg-pink-100 text-pink-800' },
      'nagad': { label: 'Nagad', color: 'bg-purple-100 text-purple-800' }
    };
    
    const info = methods[method] || { label: method || 'Unknown', color: 'bg-gray-100 text-gray-800' };
    
    return (
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs ${info.color}`}>
        {info.label}
      </span>
    );
  };

  const canCancelOrder = (order) => {
    return order.orderStatus === 'placed' && order.paymentMethod === 'cod';
  };

  return (
    <>
      <div className="min-h-screen bg-[#FFF9F0] pb-12 pt-6">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <FaBox className="w-7 h-7 text-[#4A8A90]" />
              <h1 className="text-2xl md:text-3xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                My Orders
              </h1>
            </div>
            <Link 
              href="/products" 
              className="flex items-center gap-2 px-4 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-4 mb-6 shadow-md">
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by Order ID...."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setCurrentPage(1);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter Row */}
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2">
                  <FaFilter className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Filters:</span>
                </div>
                
                {/* Order Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
                >
                  <option value="">All Order Status</option>
                  {ORDER_STATUSES.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>

                {/* Payment Status Filter */}
                <select
                  value={paymentStatusFilter}
                  onChange={(e) => {
                    setPaymentStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
                >
                  <option value="">All Payment Status</option>
                  {PAYMENT_STATUSES.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>

                {/* Clear Filters Button */}
                {(searchTerm || statusFilter || paymentStatusFilter || paymentMethodFilter) && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <FaTimes className="w-3 h-3" />
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl border-2 border-[#FFE0E6] shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] lg:min-w-full">
                <thead className="bg-gray-50 border-b-2 border-[#FFE0E6]">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Order ID</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Date</th>
                    <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700">Total</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">Order Status</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">Payment Status</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">Payment Method</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center">
                        <div className="flex justify-center">
                          <div className="w-6 h-6 border-3 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-4 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <FaBox className="w-12 h-12 text-gray-300" />
                          <p className="text-gray-500 text-sm">No orders found</p>
                          <Link href="/products" className="text-[#4A8A90] hover:underline text-sm">
                            Start Shopping
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-3 py-2 text-xs font-mono">
                          {order.orderNumber || order._id.slice(-8).toUpperCase()}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-500 whitespace-nowrap">
                          {isClient ? (
                            order.orderStatus === 'delivered' && order.deliveredAt ? (
                              <div className="flex flex-col gap-0.5">
                                <div><span className="text-gray-400 text-[10px]">Ordered:</span> {formatDate(order.createdAt)}</div>
                                <div className="text-green-600"><span className="text-green-500 text-[10px]">Delivered:</span> {formatShortDate(order.deliveredAt)}</div>
                              </div>
                            ) : order.orderStatus === 'cancelled' && order.cancelledAt ? (
                              <div className="flex flex-col gap-0.5">
                                <div><span className="text-gray-400 text-[10px]">Ordered:</span> {formatDate(order.createdAt)}</div>
                                <div className="text-red-600"><span className="text-red-500 text-[10px]">Cancelled:</span> {formatShortDate(order.cancelledAt)}</div>
                              </div>
                            ) : (
                              <div>{formatDate(order.createdAt)}</div>
                            )
                          ) : (
                            <div>Loading...</div>
                          )}
                        </td>
                        <td className="px-3 py-2 text-xs text-right font-bold text-[#4A8A90]">
                          ৳{order.total?.toFixed(2)}
                        </td>
                        <td className="px-3 py-2 text-center">
                          {getStatusBadge(order.orderStatus)}
                        </td>
                        <td className="px-3 py-2 text-center">
                          {getPaymentStatusBadge(order.paymentStatus)}
                        </td>
                        <td className="px-3 py-2 text-center">
                          {getPaymentMethodBadge(order.paymentMethod)}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowDetailsModal(true);
                              }}
                              className="inline-flex items-center gap-1 px-2 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors text-sm"
                              title="View Details"
                            >
                              <FaEye className="w-3.5 h-3.5" />
                              View
                            </button>
                            {canCancelOrder(order) && (
                              <button
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowCancelModal(true);
                                }}
                                className="inline-flex items-center gap-1 px-2 py-1 text-red-600 hover:bg-red-50 rounded transition-colors text-sm"
                                title="Cancel Order"
                              >
                                <FaBan className="w-3.5 h-3.5" />
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-3 py-2 border-t border-gray-200 flex items-center justify-between">
                <p className="text-xs text-gray-500">Showing {orders.length} of {totalOrders} orders</p>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    <FaChevronLeft className="w-3 h-3" />
                  </button>
                  <span className="px-2 py-1 text-xs">Page {currentPage} of {totalPages}</span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    <FaChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        order={selectedOrder}
        onCancelOrder={() => {
          setShowDetailsModal(false);
          setShowCancelModal(true);
        }}
      />

      {/* Cancel Order Modal */}
      <CancelOrderModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        order={selectedOrder}
        onCancel={handleCancelOrder}
      />
    </>
  );
}