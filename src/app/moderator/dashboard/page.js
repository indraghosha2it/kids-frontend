"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Download,
  Eye,
  Edit,
  PlusCircle,
  Star,
  Filter,
  ChevronDown,
  Search,
  MoreVertical
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ModeratorDashboard() {
   const router = useRouter();
  const [stats, setStats] = useState({
    totalProducts: 0,
    products: {
      active: 0,
      outOfStock: 0,
      lowStock: 0,
      featured: 0,
      onSale: 0,
      pendingReviews: 0
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
      filtered: 0
    }
  });
  
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [filterType, setFilterType] = useState('month');
  const [availableYears, setAvailableYears] = useState([]);
  const [error, setError] = useState(null);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

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

  // Fetch all products (PUBLIC route - no auth needed)
  const fetchProductsData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`, {
        params: { limit: 999 }
      });
      
      const products = response.data.data;
      const totalProducts = products.length;
      const activeProducts = products.filter(p => p.isActive).length;
      const outOfStock = products.filter(p => p.stockQuantity === 0 && p.isActive).length;
      const lowStock = products.filter(p => p.stockQuantity > 0 && p.stockQuantity <= 10).length;
      const featured = products.filter(p => p.isFeatured).length;
      const onSale = products.filter(p => p.discountPrice > 0 && p.discountPrice < p.regularPrice).length;
      
      // Get pending reviews count
      const pendingReviewsCount = products.reduce((total, product) => {
        return total + (product.reviews?.filter(r => !r.isApproved).length || 0);
      }, 0);
      
      // Get recent products (last 5)
      const recentProductsList = [...products]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map(p => ({
          id: p._id,
          name: p.productName,
          price: p.discountPrice || p.regularPrice,
          stock: p.stockQuantity,
          image: p.images?.[0]?.url || '',
          status: p.isActive ? 'Active' : 'Inactive'
        }));
      
      // Get pending reviews list
      const reviewsList = [];
      products.forEach(product => {
        if (product.reviews && product.reviews.length > 0) {
          product.reviews.forEach(review => {
            if (!review.isApproved) {
              reviewsList.push({
                id: review._id,
                productId: product._id,
                productName: product.productName,
                userName: review.userName,
                rating: review.rating,
                comment: review.comment,
                date: review.createdAt
              });
            }
          });
        }
      });
      
      return { 
        totalProducts, 
        activeProducts, 
        outOfStock, 
        lowStock, 
        featured, 
        onSale,
        pendingReviews: pendingReviewsCount,
        recentProducts: recentProductsList,
        pendingReviewsList: reviewsList.slice(0, 5)
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
        pendingReviews: 0,
        recentProducts: [],
        pendingReviewsList: []
      };
    }
  };

  // Fetch orders data (Moderator can access /api/orders/admin/all)
  const fetchOrdersData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No token found');
        return {
          orders: { placed: 0, confirmed: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, total: 0 },
          revenue: 0,
          recentOrders: []
        };
      }
      
      // Build date range based on filter
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
      
      // This endpoint is accessible by moderators (isModeratorOrAdmin)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
        params
      });
      
      if (response.data.success) {
        const orders = response.data.data;
        
        // Calculate order status counts
        const placedOrders = orders.filter(o => o.orderStatus === 'placed').length;
        const confirmedOrders = orders.filter(o => o.orderStatus === 'confirmed').length;
        const processingOrders = orders.filter(o => o.orderStatus === 'processing').length;
        const shippedOrders = orders.filter(o => o.orderStatus === 'shipped').length;
        const deliveredOrders = orders.filter(o => o.orderStatus === 'delivered').length;
        const cancelledOrders = orders.filter(o => o.orderStatus === 'cancelled').length;
        
        // Calculate revenue from paid orders only
        const paidOrders = orders.filter(order => order.paymentStatus === 'paid');
        const filteredRevenue = paidOrders.reduce((sum, order) => sum + (order.total || 0), 0);
        
        // Get recent orders with search filter
        let filteredOrders = orders;
        if (searchTerm) {
          filteredOrders = orders.filter(order => 
            order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerInfo?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerInfo?.phone?.includes(searchTerm)
          );
        }
        if (selectedStatus !== 'all') {
          filteredOrders = filteredOrders.filter(order => order.orderStatus === selectedStatus);
        }
        
        const recentFilteredOrders = filteredOrders.slice(0, 10);
        
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
          recentOrders: recentFilteredOrders
        };
      }
      
      return {
        orders: { placed: 0, confirmed: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, total: 0 },
        revenue: 0,
        recentOrders: []
      };
    } catch (err) {
      console.error('Error fetching orders data:', err);
      if (err.response?.status === 403) {
        console.error('Access denied. Make sure you are logged in as moderator or admin.');
      }
      return {
        orders: { placed: 0, confirmed: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, total: 0 },
        revenue: 0,
        recentOrders: []
      };
    }
  };

  // Load all data
  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [productsData, ordersData] = await Promise.all([
        fetchProductsData(),
        fetchOrdersData()
      ]);
      
      setStats({
        totalProducts: productsData.totalProducts,
        products: {
          active: productsData.activeProducts,
          outOfStock: productsData.outOfStock,
          lowStock: productsData.lowStock,
          featured: productsData.featured,
          onSale: productsData.onSale,
          pendingReviews: productsData.pendingReviews
        },
        orders: ordersData.orders,
        revenue: {
          filtered: ordersData.revenue
        }
      });
      
      setRecentProducts(productsData.recentProducts);
      setRecentOrders(ordersData.recentOrders);
      setPendingReviews(productsData.pendingReviewsList);
      
      // Generate available years (last 5 years)
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

  // Load data when filters change
  useEffect(() => {
    loadDashboardData();
  }, [selectedYear, selectedMonth, filterType, searchTerm, selectedStatus]);

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

  const getStockBadge = (stock) => {
    if (stock <= 0) return <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">Out of Stock</span>;
    if (stock <= 10) return <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700">Low Stock</span>;
    return <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">In Stock</span>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading moderator dashboard...</p>
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
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Moderator Dashboard</h1>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Moderator Access</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Manage products, track orders, and moderate reviews.
              </p>
            </div>
         
          </div>
        </div>
      </div>

  

      <div className="p-4 sm:p-6">
        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
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

            <div className="flex items-center gap-2 w-full lg:w-auto justify-start lg:justify-end">
              <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Showing: <strong className="text-gray-800">{getFilterLabel()}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs sm:text-sm">Total Products</p>
                <p className="text-xl sm:text-3xl font-bold mt-1">{stats.totalProducts}</p>
                <p className="text-blue-100 text-xs mt-2">In catalog</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs sm:text-sm">Total Orders</p>
                <p className="text-xl sm:text-3xl font-bold mt-1">{stats.orders.total}</p>
                <p className="text-green-100 text-xs mt-2">All time orders</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs sm:text-sm">Revenue ({getFilterLabel()})</p>
                <p className="text-xl sm:text-3xl font-bold mt-1">{formatCurrency(stats.revenue.filtered)}</p>
                <p className="text-purple-100 text-xs mt-2">From paid orders</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-xs sm:text-sm">Pending Reviews</p>
                <p className="text-xl sm:text-3xl font-bold mt-1">{stats.products.pendingReviews}</p>
                <p className="text-orange-100 text-xs mt-2">Awaiting moderation</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Status Overview</h2>
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
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Active Products</p>
                  <p className="text-2xl font-bold text-green-600">{stats.products.active}</p>
                </div>
                <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Low Stock Alert</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.products.lowStock}</p>
                </div>
                <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Featured Products</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.products.featured}</p>
                </div>
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Products on Sale</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.products.onSale}</p>
                </div>
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-600">{stats.products.outOfStock}</p>
                </div>
                <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Products and Pending Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Products */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Products</h2>
           <button 
  onClick={() => router.push('/moderator/all-products')}
  className="text-blue-600 hover:text-blue-700 text-sm"
>
  View All
</button>
            </div>
            <div className="space-y-3">
              {recentProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-xs">
                    {index + 1}
                  </div>
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{formatCurrency(product.price)}</p>
                  </div>
                  <div className="text-right">
                    {getStockBadge(product.stock)}
                    <button className="ml-2 text-blue-600 hover:text-blue-800">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              {recentProducts.length === 0 && (
                <p className="text-center text-gray-500 py-8">No products found</p>
              )}
            </div>
          </div>

          {/* Pending Reviews */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Pending Reviews</h2>
        <button 
  onClick={() => router.push('/moderator/manage-reviews')}
  className="text-blue-600 hover:text-blue-700 text-sm"
>
  Moderate All
</button>
            </div>
            <div className="space-y-3">
              {pendingReviews.map((review) => (
                <div key={review.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{review.userName}</p>
                      <p className="text-xs text-gray-500">on {review.productName}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{review.comment}</p>
                
                </div>
              ))}
              {pendingReviews.length === 0 && (
                <p className="text-center text-gray-500 py-8">No pending reviews</p>
              )}
            </div>
          </div>
        </div>

        {/* Search and Filter Bar for Orders */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID, customer name, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="placed">Placed</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Recent Orders Table - Desktop */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-800">Recent Orders ({getFilterLabel()})</h2>
              <button 
  onClick={() => router.push('/moderator/orders')}
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
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
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

        {/* Summary Footer */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.orders.delivered}</p>
              <p className="text-xs text-gray-500">Delivered Orders</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">{stats.orders.placed + stats.orders.confirmed + stats.orders.processing + stats.orders.shipped}</p>
              <p className="text-xs text-gray-500">Order Placed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.products.active}</p>
              <p className="text-xs text-gray-500">Active Products</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{stats.products.featured}</p>
              <p className="text-xs text-gray-500">Featured Items</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}