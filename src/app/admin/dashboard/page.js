// "use client";

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { 
//   Package, 
//   ShoppingBag, 
//   CheckCircle, 
//   XCircle,
//   Clock,
//   TrendingUp,
//   AlertCircle,
//   Calendar,
//   DollarSign,
//   Truck,
//   RefreshCw,
//   Download
// } from 'lucide-react';

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     products: {
//       active: 0,
//       outOfStock: 0,
//       lowStock: 0,
//       featured: 0,
//       onSale: 0
//     },
//     orders: {
//       placed: 0,
//       confirmed: 0,
//       processing: 0,
//       shipped: 0,
//       delivered: 0,
//       cancelled: 0,
//       total: 0
//     },
//     revenue: {
//       total: 0,
//       filtered: 0
//     },
//     payments: {
//       cod: 0,
//       online: 0,
//       paid: 0,
//       pending: 0,
//       failed: 0,
//       refunded: 0
//     }
//   });
  
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [topProducts, setTopProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Filter states
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [filterType, setFilterType] = useState('month');
//   const [availableYears, setAvailableYears] = useState([]);
//   const [error, setError] = useState(null);

//   // Months array
//   const months = [
//     { value: 1, name: 'January' },
//     { value: 2, name: 'February' },
//     { value: 3, name: 'March' },
//     { value: 4, name: 'April' },
//     { value: 5, name: 'May' },
//     { value: 6, name: 'June' },
//     { value: 7, name: 'July' },
//     { value: 8, name: 'August' },
//     { value: 9, name: 'September' },
//     { value: 10, name: 'October' },
//     { value: 11, name: 'November' },
//     { value: 12, name: 'December' }
//   ];

//   // Fetch all products with details
//   const fetchProductsStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { limit: 999 }
//       });
      
//       const products = response.data.data;
//       const totalProducts = products.length;
//       const activeProducts = products.filter(p => p.isActive).length;
//       const outOfStock = products.filter(p => p.stockQuantity === 0 && p.isActive).length;
//       const lowStock = products.filter(p => p.stockQuantity > 0 && p.stockQuantity <= 10).length;
//       const featured = products.filter(p => p.isFeatured).length;
//       const onSale = products.filter(p => p.discountPrice > 0 && p.discountPrice < p.regularPrice).length;
      
//       const topSelling = [...products]
//         .sort((a, b) => (b.purchaseCount || 0) - (a.purchaseCount || 0))
//         .slice(0, 5)
//         .map(p => ({
//           id: p._id,
//           name: p.productName,
//           sales: p.purchaseCount || 0,
//           revenue: (p.purchaseCount || 0) * (p.discountPrice || p.regularPrice),
//           image: p.images?.[0]?.url || '',
//           price: p.discountPrice || p.regularPrice
//         }));
      
//       return { 
//         totalProducts, 
//         activeProducts, 
//         outOfStock, 
//         lowStock, 
//         featured, 
//         onSale,
//         topSelling
//       };
//     } catch (err) {
//       console.error('Error fetching products:', err);
//       return { 
//         totalProducts: 0, 
//         activeProducts: 0, 
//         outOfStock: 0, 
//         lowStock: 0, 
//         featured: 0, 
//         onSale: 0,
//         topSelling: []
//       };
//     }
//   };

//   // Fetch detailed order stats
//   const fetchOrderStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/admin/stats`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (response.data.success) {
//         const data = response.data.data;
//         return {
//           placed: data.placedOrders || 0,
//           confirmed: data.confirmedOrders || 0,
//           processing: data.processingOrders || 0,
//           shipped: data.shippedOrders || 0,
//           delivered: data.deliveredOrders || 0,
//           cancelled: data.cancelledOrders || 0,
//           total: data.totalOrders || 0
//         };
//       }
//       return { placed: 0, confirmed: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, total: 0 };
//     } catch (err) {
//       console.error('Error fetching order stats:', err);
//       return { placed: 0, confirmed: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, total: 0 };
//     }
//   };

//   // Fetch filtered revenue and orders
//   const fetchFilteredData = async () => {
//     try {
//       const token = localStorage.getItem('token');
      
//       let startDate, endDate;
      
//       if (filterType === 'month') {
//         startDate = new Date(selectedYear, selectedMonth - 1, 1);
//         startDate.setHours(0, 0, 0, 0);
//         endDate = new Date(selectedYear, selectedMonth, 0);
//         endDate.setHours(23, 59, 59, 999);
//       } else {
//         startDate = new Date(selectedYear, 0, 1);
//         startDate.setHours(0, 0, 0, 0);
//         endDate = new Date(selectedYear, 11, 31);
//         endDate.setHours(23, 59, 59, 999);
//       }
      
//       const params = {
//         limit: 999,
//         startDate: startDate.toISOString(),
//         endDate: endDate.toISOString()
//       };
      
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/admin/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params
//       });
      
//       if (response.data.success) {
//         const orders = response.data.data;
//         const paidOrders = orders.filter(order => order.paymentStatus === 'paid');
//         const filteredRevenue = paidOrders.reduce((sum, order) => sum + (order.total || 0), 0);
        
//         const codOrders = orders.filter(order => order.paymentMethod === 'cod');
//         const onlineOrders = orders.filter(order => order.paymentMethod === 'online');
//         const paidPayments = orders.filter(order => order.paymentStatus === 'paid');
//         const pendingPayments = orders.filter(order => order.paymentStatus === 'pending');
//         const failedPayments = orders.filter(order => order.paymentStatus === 'failed');
//         const refundedPayments = orders.filter(order => order.paymentStatus === 'refunded');
        
//         const recentFilteredOrders = orders.slice(0, 10);
        
//         return {
//           revenue: filteredRevenue,
//           payments: {
//             cod: codOrders.length,
//             online: onlineOrders.length,
//             paid: paidPayments.length,
//             pending: pendingPayments.length,
//             failed: failedPayments.length,
//             refunded: refundedPayments.length
//           },
//           recentOrders: recentFilteredOrders,
//           totalOrders: orders.length
//         };
//       }
      
//       return {
//         revenue: 0,
//         payments: { cod: 0, online: 0, paid: 0, pending: 0, failed: 0, refunded: 0 },
//         recentOrders: [],
//         totalOrders: 0
//       };
//     } catch (err) {
//       console.error('Error fetching filtered data:', err);
//       return {
//         revenue: 0,
//         payments: { cod: 0, online: 0, paid: 0, pending: 0, failed: 0, refunded: 0 },
//         recentOrders: [],
//         totalOrders: 0
//       };
//     }
//   };

//   // Fetch total revenue
//   const fetchTotalRevenue = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/admin/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { limit: 999 }
//       });
      
//       if (response.data.success) {
//         const orders = response.data.data;
//         const paidOrders = orders.filter(order => order.paymentStatus === 'paid');
//         const totalRevenue = paidOrders.reduce((sum, order) => sum + (order.total || 0), 0);
//         return totalRevenue;
//       }
//       return 0;
//     } catch (err) {
//       console.error('Error fetching total revenue:', err);
//       return 0;
//     }
//   };

//   // Load all data
//   const loadDashboardData = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const [productsStats, orderStats, filteredData, totalRevenue] = await Promise.all([
//         fetchProductsStats(),
//         fetchOrderStats(),
//         fetchFilteredData(),
//         fetchTotalRevenue()
//       ]);
      
//       setStats({
//         totalProducts: productsStats.totalProducts,
//         products: {
//           active: productsStats.activeProducts,
//           outOfStock: productsStats.outOfStock,
//           lowStock: productsStats.lowStock,
//           featured: productsStats.featured,
//           onSale: productsStats.onSale
//         },
//         orders: {
//           ...orderStats,
//           total: filteredData.totalOrders || orderStats.total
//         },
//         revenue: {
//           total: totalRevenue,
//           filtered: filteredData.revenue
//         },
//         payments: filteredData.payments
//       });
      
//       setTopProducts(productsStats.topSelling);
//       setRecentOrders(filteredData.recentOrders);
      
//       const currentYear = new Date().getFullYear();
//       const years = [];
//       for (let i = currentYear; i >= currentYear - 5; i--) {
//         years.push(i);
//       }
//       setAvailableYears(years);
      
//     } catch (err) {
//       console.error('Error loading dashboard:', err);
//       setError('Failed to load dashboard data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadDashboardData();
//   }, [selectedYear, selectedMonth, filterType]);

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'BDT',
//       minimumFractionDigits: 0
//     }).format(amount);
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       placed: 'bg-yellow-100 text-yellow-800',
//       confirmed: 'bg-blue-100 text-blue-800',
//       processing: 'bg-purple-100 text-purple-800',
//       shipped: 'bg-indigo-100 text-indigo-800',
//       delivered: 'bg-green-100 text-green-800',
//       cancelled: 'bg-red-100 text-red-800'
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800';
//   };

//   const getStatusLabel = (status) => {
//     const labels = {
//       placed: 'Placed',
//       confirmed: 'Confirmed',
//       processing: 'Processing',
//       shipped: 'Shipped',
//       delivered: 'Delivered',
//       cancelled: 'Cancelled'
//     };
//     return labels[status] || status;
//   };

//   const getFilterLabel = () => {
//     if (filterType === 'month') {
//       const month = months.find(m => m.value === selectedMonth);
//       return `${month?.name} ${selectedYear}`;
//     } else {
//       return `Year ${selectedYear}`;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
//         <div className="text-center bg-red-50 p-6 rounded-xl max-w-md w-full">
//           <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//           <p className="text-red-600">{error}</p>
//           <button
//             onClick={loadDashboardData}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="px-4 sm:px-6 py-4">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
//               <p className="text-gray-500 text-sm mt-1">
//                 Welcome back! Here's what's happening with your store.
//               </p>
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
//                       <option key={month.value} value={month.value}>
//                         {month.name}
//                       </option>
//                     ))}
//                   </select>
//                   <select
//                     value={selectedYear}
//                     onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//                     className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
//                   >
//                     {availableYears.map(year => (
//                       <option key={year} value={year}>
//                         {year}
//                       </option>
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
//                     <option key={year} value={year}>
//                       {year}
//                     </option>
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

//         {/* Revenue Overview Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
//           <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-blue-100 text-xs sm:text-sm">Filtered Revenue</p>
//                 <p className="text-xl sm:text-3xl font-bold mt-1">{formatCurrency(stats.revenue.filtered)}</p>
//                 <p className="text-blue-100 text-xs mt-2">{getFilterLabel()}</p>
//               </div>
//               <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 rounded-lg flex items-center justify-center">
//                 <DollarSign className="h-5 w-5 sm:h-6 sm:w-6" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-green-100 text-xs sm:text-sm">Total Revenue</p>
//                 <p className="text-xl sm:text-3xl font-bold mt-1">{formatCurrency(stats.revenue.total)}</p>
//                 <p className="text-green-100 text-xs mt-2">All time sales</p>
//               </div>
//               <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 rounded-lg flex items-center justify-center">
//                 <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-purple-100 text-xs sm:text-sm">Total Orders</p>
//                 <p className="text-xl sm:text-3xl font-bold mt-1">{stats.orders.total}</p>
//                 <p className="text-purple-100 text-xs mt-2">All time orders</p>
//               </div>
//               <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 rounded-lg flex items-center justify-center">
//                 <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-orange-100 text-xs sm:text-sm">Total Products</p>
//                 <p className="text-xl sm:text-3xl font-bold mt-1">{stats.totalProducts}</p>
//                 <p className="text-orange-100 text-xs mt-2">In catalog</p>
//               </div>
//               <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 rounded-lg flex items-center justify-center">
//                 <Package className="h-5 w-5 sm:h-6 sm:w-6" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Order Status Overview */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 sm:p-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Status Overview</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
//               <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 border border-yellow-100">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-yellow-600 text-xs sm:text-sm">Placed</p>
//                     <p className="text-xl sm:text-2xl font-bold text-yellow-700">{stats.orders.placed}</p>
//                   </div>
//                   <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
//                 </div>
//               </div>
//               <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-100">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-blue-600 text-xs sm:text-sm">Confirmed</p>
//                     <p className="text-xl sm:text-2xl font-bold text-blue-700">{stats.orders.confirmed}</p>
//                   </div>
//                   <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
//                 </div>
//               </div>
//               <div className="bg-purple-50 rounded-lg p-3 sm:p-4 border border-purple-100">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-purple-600 text-xs sm:text-sm">Processing</p>
//                     <p className="text-xl sm:text-2xl font-bold text-purple-700">{stats.orders.processing}</p>
//                   </div>
//                   <Package className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
//                 </div>
//               </div>
//               <div className="bg-indigo-50 rounded-lg p-3 sm:p-4 border border-indigo-100">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-indigo-600 text-xs sm:text-sm">Shipped</p>
//                     <p className="text-xl sm:text-2xl font-bold text-indigo-700">{stats.orders.shipped}</p>
//                   </div>
//                   <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-500" />
//                 </div>
//               </div>
//               <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-100">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-green-600 text-xs sm:text-sm">Delivered</p>
//                     <p className="text-xl sm:text-2xl font-bold text-green-700">{stats.orders.delivered}</p>
//                   </div>
//                   <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
//                 </div>
//               </div>
//               <div className="bg-red-50 rounded-lg p-3 sm:p-4 border border-red-100">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-red-600 text-xs sm:text-sm">Cancelled</p>
//                     <p className="text-xl sm:text-2xl font-bold text-red-700">{stats.orders.cancelled}</p>
//                   </div>
//                   <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Top Products */}
//           <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h2>
//             <div className="space-y-3 sm:space-y-4">
//               {topProducts.map((product, index) => (
//                 <div key={product.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
//                   <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-sm sm:text-base">
//                     {index + 1}
//                   </div>
//                   {product.image ? (
//                     <img src={product.image} alt={product.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover" />
//                   ) : (
//                     <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-lg flex items-center justify-center">
//                       <Package className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
//                     </div>
//                   )}
//                   <div className="flex-1 min-w-0">
//                     <p className="font-medium text-gray-800 text-xs sm:text-sm truncate">{product.name}</p>
//                     <p className="text-xs text-gray-500">{product.sales} sales</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-semibold text-green-600 text-xs sm:text-sm">{formatCurrency(product.revenue)}</p>
//                   </div>
//                 </div>
//               ))}
//               {topProducts.length === 0 && (
//                 <p className="text-center text-gray-500 py-8">No sales data available</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Payment and Product Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
//             <h3 className="font-semibold text-gray-800 mb-3 text-base sm:text-lg">Payment Methods ({getFilterLabel()})</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 text-sm sm:text-base">Cash on Delivery</span>
//                 <span className="font-semibold text-blue-600">{stats.payments.cod} orders</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 text-sm sm:text-base">Online Payment</span>
//                 <span className="font-semibold text-green-600">{stats.payments.online} orders</span>
//               </div>
//               <div className="mt-4 pt-4 border-t">
//                 <p className="text-sm font-medium text-gray-700 mb-2">Payment Status</p>
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-500">Paid</span>
//                     <span className="font-medium text-green-600">{stats.payments.paid}</span>
//                   </div>
//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-500">Pending</span>
//                     <span className="font-medium text-yellow-600">{stats.payments.pending}</span>
//                   </div>
//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-500">Failed</span>
//                     <span className="font-medium text-red-600">{stats.payments.failed}</span>
//                   </div>
//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-500">Refunded</span>
//                     <span className="font-medium text-orange-600">{stats.payments.refunded}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
//             <h3 className="font-semibold text-gray-800 mb-3 text-base sm:text-lg">Product Statistics</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 text-sm sm:text-base">Active Products</span>
//                 <span className="font-semibold text-green-600">{stats.products.active}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 text-sm sm:text-base">Out of Stock</span>
//                 <span className="font-semibold text-red-600">{stats.products.outOfStock}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 text-sm sm:text-base">Low Stock (≤10)</span>
//                 <span className="font-semibold text-orange-600">{stats.products.lowStock}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 text-sm sm:text-base">Featured Products</span>
//                 <span className="font-semibold text-purple-600">{stats.products.featured}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 text-sm sm:text-base">Products on Sale</span>
//                 <span className="font-semibold text-blue-600">{stats.products.onSale}</span>
//               </div>
//             </div>
            
//             <div className="mt-4 pt-4 border-t">
//               <div className="flex justify-between text-sm mb-1">
//                 <span className="text-gray-600">Order Completion Rate</span>
//                 <span className="font-medium">
//                   {Math.round((stats.orders.delivered / (stats.orders.total || 1)) * 100)}%
//                 </span>
//               </div>
//               <div className="h-2 bg-gray-200 rounded-full">
//                 <div 
//                   className="h-2 bg-green-500 rounded-full"
//                   style={{ width: `${(stats.orders.delivered / (stats.orders.total || 1)) * 100}%` }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Recent Orders Table - Responsive */}
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//               <h2 className="text-lg font-semibold text-gray-800">Recent Orders ({getFilterLabel()})</h2>
//               <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                 View All Orders
//               </button>
//             </div>
//           </div>
          
//           {/* Desktop Table View */}
//           <div className="hidden md:block overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {recentOrders.map((order) => (
//                   <tr key={order._id} className="hover:bg-gray-50 transition">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
//                       {order.orderNumber}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{order.customerInfo?.fullName}</div>
//                       <div className="text-xs text-gray-500">{order.customerInfo?.phone}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
//                       {formatCurrency(order.total)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`text-xs px-2 py-1 rounded-full ${
//                         order.paymentMethod === 'cod' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
//                       }`}>
//                         {order.paymentMethod === 'cod' ? 'COD' : 'Online'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.orderStatus)}`}>
//                         {getStatusLabel(order.orderStatus)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {formatDate(order.createdAt)}
//                     </td>
//                   </tr>
//                 ))}
//                 {recentOrders.length === 0 && (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
//                       No orders found for {getFilterLabel()}
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Card View */}
//           <div className="md:hidden divide-y divide-gray-200">
//             {recentOrders.map((order) => (
//               <div key={order._id} className="p-4 hover:bg-gray-50 transition">
//                 <div className="flex justify-between items-start mb-2">
//                   <span className="text-sm font-medium text-blue-600">{order.orderNumber}</span>
//                   <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.orderStatus)}`}>
//                     {getStatusLabel(order.orderStatus)}
//                   </span>
//                 </div>
//                 <div className="mb-2">
//                   <p className="text-sm text-gray-900 font-medium">{order.customerInfo?.fullName}</p>
//                   <p className="text-xs text-gray-500">{order.customerInfo?.phone}</p>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <span className={`text-xs px-2 py-1 rounded-full ${
//                       order.paymentMethod === 'cod' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
//                     }`}>
//                       {order.paymentMethod === 'cod' ? 'COD' : 'Online'}
//                     </span>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm font-semibold text-gray-900">{formatCurrency(order.total)}</p>
//                     <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             {recentOrders.length === 0 && (
//               <div className="p-8 text-center text-gray-500">
//                 No orders found for {getFilterLabel()}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  ShoppingBag, 
  CheckCircle, 
  XCircle,
  Clock,
  TrendingUp,
  AlertCircle,
  Calendar,
  DollarSign,
  Truck,
  RefreshCw,
  Download
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  
  const [stats, setStats] = useState({
    totalProducts: 0,
    products: {
      active: 0,
      outOfStock: 0,
      lowStock: 0,
      featured: 0,
      onSale: 0
    },
    orders: {
      placed: 0,
      confirmed: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
      total: 0
    },
    revenue: {
      total: 0,
      filtered: 0
    },
    payments: {
      cod: 0,
      online: 0,
      paid: 0,
      pending: 0,
      failed: 0,
      refunded: 0
    }
  });
  
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [filterType, setFilterType] = useState('month');
  const [availableYears, setAvailableYears] = useState([]);
  const [error, setError] = useState(null);

  // Months array
  const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];

  // Fetch all products with details
  const fetchProductsStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 999 }
      });
      
      const products = response.data.data;
      const totalProducts = products.length;
      const activeProducts = products.filter(p => p.isActive).length;
      const outOfStock = products.filter(p => p.stockQuantity === 0 && p.isActive).length;
      const lowStock = products.filter(p => p.stockQuantity > 0 && p.stockQuantity <= 10).length;
      const featured = products.filter(p => p.isFeatured).length;
      const onSale = products.filter(p => p.discountPrice > 0 && p.discountPrice < p.regularPrice).length;
      
      const topSelling = [...products]
        .sort((a, b) => (b.purchaseCount || 0) - (a.purchaseCount || 0))
        .slice(0, 5)
        .map(p => ({
          id: p._id,
          name: p.productName,
          sales: p.purchaseCount || 0,
          revenue: (p.purchaseCount || 0) * (p.discountPrice || p.regularPrice),
          image: p.images?.[0]?.url || '',
          price: p.discountPrice || p.regularPrice
        }));
      
      return { 
        totalProducts, 
        activeProducts, 
        outOfStock, 
        lowStock, 
        featured, 
        onSale,
        topSelling
      };
    } catch (err) {
      console.error('Error fetching products:', err);
      return { 
        totalProducts: 0, 
        activeProducts: 0, 
        outOfStock: 0, 
        lowStock: 0, 
        featured: 0, 
        onSale: 0,
        topSelling: []
      };
    }
  };

  // Fetch filtered revenue, orders, and order status counts
  const fetchFilteredData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      let startDate, endDate;
      
      if (filterType === 'month') {
        startDate = new Date(selectedYear, selectedMonth - 1, 1);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(selectedYear, selectedMonth, 0);
        endDate.setHours(23, 59, 59, 999);
      } else {
        startDate = new Date(selectedYear, 0, 1);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(selectedYear, 11, 31);
        endDate.setHours(23, 59, 59, 999);
      }
      
      const params = {
        limit: 999,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      };
      
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
        params
      });
      
      if (response.data.success) {
        const orders = response.data.data;
        
        // Calculate filtered order status counts
        const placedOrders = orders.filter(o => o.orderStatus === 'placed').length;
        const confirmedOrders = orders.filter(o => o.orderStatus === 'confirmed').length;
        const processingOrders = orders.filter(o => o.orderStatus === 'processing').length;
        const shippedOrders = orders.filter(o => o.orderStatus === 'shipped').length;
        const deliveredOrders = orders.filter(o => o.orderStatus === 'delivered').length;
        const cancelledOrders = orders.filter(o => o.orderStatus === 'cancelled').length;
        
        // Calculate revenue from paid orders only
        const paidOrders = orders.filter(order => order.paymentStatus === 'paid');
        const filteredRevenue = paidOrders.reduce((sum, order) => sum + (order.total || 0), 0);
        
        // Calculate payment method stats
        const codOrders = orders.filter(order => order.paymentMethod === 'cod');
        const onlineOrders = orders.filter(order => order.paymentMethod === 'online');
        const paidPayments = orders.filter(order => order.paymentStatus === 'paid');
        const pendingPayments = orders.filter(order => order.paymentStatus === 'pending');
        const failedPayments = orders.filter(order => order.paymentStatus === 'failed');
        const refundedPayments = orders.filter(order => order.paymentStatus === 'refunded');
        
        const recentFilteredOrders = orders.slice(0, 10);
        
        return {
          orders: {
            placed: placedOrders,
            confirmed: confirmedOrders,
            processing: processingOrders,
            shipped: shippedOrders,
            delivered: deliveredOrders,
            cancelled: cancelledOrders,
            total: orders.length
          },
          revenue: filteredRevenue,
          payments: {
            cod: codOrders.length,
            online: onlineOrders.length,
            paid: paidPayments.length,
            pending: pendingPayments.length,
            failed: failedPayments.length,
            refunded: refundedPayments.length
          },
          recentOrders: recentFilteredOrders,
          totalOrders: orders.length
        };
      }
      
      return {
        orders: { placed: 0, confirmed: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, total: 0 },
        revenue: 0,
        payments: { cod: 0, online: 0, paid: 0, pending: 0, failed: 0, refunded: 0 },
        recentOrders: [],
        totalOrders: 0
      };
    } catch (err) {
      console.error('Error fetching filtered data:', err);
      return {
        orders: { placed: 0, confirmed: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, total: 0 },
        revenue: 0,
        payments: { cod: 0, online: 0, paid: 0, pending: 0, failed: 0, refunded: 0 },
        recentOrders: [],
        totalOrders: 0
      };
    }
  };

  // Fetch total revenue (all time)
  const fetchTotalRevenue = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 999 }
      });
      
      if (response.data.success) {
        const orders = response.data.data;
        const paidOrders = orders.filter(order => order.paymentStatus === 'paid');
        const totalRevenue = paidOrders.reduce((sum, order) => sum + (order.total || 0), 0);
        return totalRevenue;
      }
      return 0;
    } catch (err) {
      console.error('Error fetching total revenue:', err);
      return 0;
    }
  };

  // Load all data
  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [productsStats, filteredData, totalRevenue] = await Promise.all([
        fetchProductsStats(),
        fetchFilteredData(),
        fetchTotalRevenue()
      ]);
      
      setStats({
        totalProducts: productsStats.totalProducts,
        products: {
          active: productsStats.activeProducts,
          outOfStock: productsStats.outOfStock,
          lowStock: productsStats.lowStock,
          featured: productsStats.featured,
          onSale: productsStats.onSale
        },
        orders: filteredData.orders,
        revenue: {
          total: totalRevenue,
          filtered: filteredData.revenue
        },
        payments: filteredData.payments
      });
      
      setTopProducts(productsStats.topSelling);
      setRecentOrders(filteredData.recentOrders);
      
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = currentYear; i >= currentYear - 5; i--) {
        years.push(i);
      }
      setAvailableYears(years);
      
    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reload when filters change
  useEffect(() => {
    loadDashboardData();
  }, [selectedYear, selectedMonth, filterType]);

  // Initial load
  useEffect(() => {
    loadDashboardData();
  }, []);

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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  const getFilterLabel = () => {
    if (filterType === 'month') {
      const month = months.find(m => m.value === selectedMonth);
      return `${month?.name} ${selectedYear}`;
    } else {
      return `Year ${selectedYear}`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="text-center bg-red-50 p-6 rounded-xl max-w-md w-full">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
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
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">
                Welcome back! Here's what's happening with your store.
              </p>
            </div>
            <button
              onClick={loadDashboardData}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
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
                      <option key={month.value} value={month.value}>
                        {month.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                  >
                    {availableYears.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
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
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
              <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Showing data for: <strong className="text-gray-800">{getFilterLabel()}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Revenue Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs sm:text-sm">Revenue ({getFilterLabel()})</p>
                <p className="text-xl sm:text-3xl font-bold mt-1">{formatCurrency(stats.revenue.filtered)}</p>
                <p className="text-blue-100 text-xs mt-2">From paid orders</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs sm:text-sm">Total Revenue (All Time)</p>
                <p className="text-xl sm:text-3xl font-bold mt-1">{formatCurrency(stats.revenue.total)}</p>
                <p className="text-green-100 text-xs mt-2">All time sales</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs sm:text-sm">Total Orders ({getFilterLabel()})</p>
                <p className="text-xl sm:text-3xl font-bold mt-1">{stats.orders.total}</p>
                <p className="text-purple-100 text-xs mt-2">Orders in {getFilterLabel()}</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-xs sm:text-sm">Total Products</p>
                <p className="text-xl sm:text-3xl font-bold mt-1">{stats.totalProducts}</p>
                <p className="text-orange-100 text-xs mt-2">In catalog</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Overview - Now Filtered */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Order Status Overview ({getFilterLabel()})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 border border-yellow-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-600 text-xs sm:text-sm">Placed</p>
                    <p className="text-xl sm:text-2xl font-bold text-yellow-700">{stats.orders.placed}</p>
                  </div>
                  <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-xs sm:text-sm">Confirmed</p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-700">{stats.orders.confirmed}</p>
                  </div>
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 sm:p-4 border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-xs sm:text-sm">Processing</p>
                    <p className="text-xl sm:text-2xl font-bold text-purple-700">{stats.orders.processing}</p>
                  </div>
                  <Package className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-3 sm:p-4 border border-indigo-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-600 text-xs sm:text-sm">Shipped</p>
                    <p className="text-xl sm:text-2xl font-bold text-indigo-700">{stats.orders.shipped}</p>
                  </div>
                  <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-500" />
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-xs sm:text-sm">Delivered</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-700">{stats.orders.delivered}</p>
                  </div>
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                </div>
              </div>
              <div className="bg-red-50 rounded-lg p-3 sm:p-4 border border-red-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-600 text-xs sm:text-sm">Cancelled</p>
                    <p className="text-xl sm:text-2xl font-bold text-red-700">{stats.orders.cancelled}</p>
                  </div>
                  <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Showing order counts for {getFilterLabel()}
            </p>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products (All Time)</h2>
            <div className="space-y-3 sm:space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-sm sm:text-base">
                    {index + 1}
                  </div>
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover" />
                  ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-xs sm:text-sm truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600 text-xs sm:text-sm">{formatCurrency(product.revenue)}</p>
                  </div>
                </div>
              ))}
              {topProducts.length === 0 && (
                <p className="text-center text-gray-500 py-8">No sales data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Payment and Product Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-3 text-base sm:text-lg">
              Payment Methods ({getFilterLabel()})
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm sm:text-base">Cash on Delivery</span>
                <span className="font-semibold text-blue-600">{stats.payments.cod} orders</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm sm:text-base">Online Payment</span>
                <span className="font-semibold text-green-600">{stats.payments.online} orders</span>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium text-gray-700 mb-2">Payment Status</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Paid</span>
                    <span className="font-medium text-green-600">{stats.payments.paid}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Pending</span>
                    <span className="font-medium text-yellow-600">{stats.payments.pending}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Failed</span>
                    <span className="font-medium text-red-600">{stats.payments.failed}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Refunded</span>
                    <span className="font-medium text-orange-600">{stats.payments.refunded}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Showing payment data for {getFilterLabel()}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-3 text-base sm:text-lg">Product Statistics (All Time)</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm sm:text-base">Active Products</span>
                <span className="font-semibold text-green-600">{stats.products.active}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm sm:text-base">Out of Stock</span>
                <span className="font-semibold text-red-600">{stats.products.outOfStock}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm sm:text-base">Low Stock (≤10)</span>
                <span className="font-semibold text-orange-600">{stats.products.lowStock}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm sm:text-base">Featured Products</span>
                <span className="font-semibold text-purple-600">{stats.products.featured}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm sm:text-base">Products on Sale</span>
                <span className="font-semibold text-blue-600">{stats.products.onSale}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Order Completion Rate ({getFilterLabel()})</span>
                <span className="font-medium">
                  {Math.round((stats.orders.delivered / (stats.orders.total || 1)) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-green-500 rounded-full"
                  style={{ width: `${(stats.orders.delivered / (stats.orders.total || 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-800">Recent Orders ({getFilterLabel()})</h2>
              <button 
                onClick={() => router.push('/admin/orders')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All Orders
              </button>
            </div>
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customerInfo?.fullName}</div>
                      <div className="text-xs text-gray-500">{order.customerInfo?.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.paymentMethod === 'cod' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {order.paymentMethod === 'cod' ? 'COD' : 'Online'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.orderStatus)}`}>
                        {getStatusLabel(order.orderStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No orders found for {getFilterLabel()}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <div key={order._id} className="p-4 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-blue-600">{order.orderNumber}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.orderStatus)}`}>
                    {getStatusLabel(order.orderStatus)}
                  </span>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-900 font-medium">{order.customerInfo?.fullName}</p>
                  <p className="text-xs text-gray-500">{order.customerInfo?.phone}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.paymentMethod === 'cod' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {order.paymentMethod === 'cod' ? 'COD' : 'Online'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(order.total)}</p>
                    <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))}
            {recentOrders.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No orders found for {getFilterLabel()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}