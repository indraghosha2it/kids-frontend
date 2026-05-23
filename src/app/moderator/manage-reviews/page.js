
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   Search,
//   Filter,
//   Eye,
//   Edit,
//   Trash2,
//   Calendar,
//   User,
//   Star,
//   CheckCircle,
//   XCircle,
//   Clock,
//   Award,
//   AlertCircle,
//   Loader2,
//   ChevronLeft,
//   ChevronRight,
//   MessageCircle,
//   Mail,
//   Package,
//   X,
//   Save
// } from 'lucide-react';
// import { toast } from 'sonner';

// export default function ModeratorManageReviews() {
//   const router = useRouter();
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editModal, setEditModal] = useState({ show: false, review: null, formData: null });
//   const [viewModal, setViewModal] = useState({ show: false, review: null });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [ratingFilter, setRatingFilter] = useState('');
//   const [featuredFilter, setFeaturedFilter] = useState('');
//   const [userRole, setUserRole] = useState('');
//   const [actionLoading, setActionLoading] = useState(false);
//   const [hoveredRating, setHoveredRating] = useState(0);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0
//   });
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     approved: 0,
//     rejected: 0,
//     featured: 0
//   });

//   // Edit form errors
//   const [editErrors, setEditErrors] = useState({});

//   // Status options
//   const statusOptions = [
//     { value: 'all', label: 'All Status', icon: '📊' },
//     { value: 'pending', label: 'Pending', icon: '⏳', color: 'yellow' },
//     { value: 'approved', label: 'Approved', icon: '✅', color: 'green' },
//     { value: 'rejected', label: 'Rejected', icon: '❌', color: 'red' }
//   ];

//   // Rating options
//   const ratingOptions = [
//     { value: '', label: 'All Ratings' },
//     { value: '5', label: '5 Stars', icon: '⭐⭐⭐⭐⭐' },
//     { value: '4', label: '4 Stars', icon: '⭐⭐⭐⭐' },
//     { value: '3', label: '3 Stars', icon: '⭐⭐⭐' },
//     { value: '2', label: '2 Stars', icon: '⭐⭐' },
//     { value: '1', label: '1 Star', icon: '⭐' }
//   ];

//   // Featured options
//   const featuredOptions = [
//     { value: '', label: 'All Reviews' },
//     { value: 'true', label: 'Featured Only', icon: '🏆' }
//   ];

//   // Check user role
//   useEffect(() => {
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserRole(user.role);
//         // Allow only moderator
//         if (user.role !== 'moderator') {
//           toast.error('Access denied. Moderator privileges required.');
//           router.push('/login');
//         }
//       } catch (error) {
//         console.error('Error parsing user:', error);
//         router.push('/login');
//       }
//     } else {
//       router.push('/login');
//     }
//   }, [router]);

//   // Fetch reviews
//   const fetchReviews = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       // Build query params
//       const params = new URLSearchParams({
//         page: pagination.page,
//         limit: pagination.limit
//       });
      
//       if (statusFilter !== 'all') {
//         params.append('status', statusFilter);
//       }
      
//       if (ratingFilter) {
//         params.append('rating', ratingFilter);
//       }
      
//       if (featuredFilter) {
//         params.append('isFeatured', featuredFilter);
//       }
      
//       if (searchTerm) {
//         params.append('search', searchTerm);
//       }

//       const response = await fetch(`https://kids-backend.vercel.app/api/reviews?${params}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (data.success) {
//         setReviews(data.data);
//         setPagination(prev => ({
//           ...prev,
//           total: data.pagination.total,
//           pages: data.pagination.pages
//         }));
//       } else {
//         toast.error(data.error || 'Failed to fetch reviews');
//       }
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch stats
//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
      
//       // Fetch a larger limit to get all reviews
//       const response = await fetch('https://kids-backend.vercel.app/api/reviews?limit=1000', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (data.success && data.data) {
//         const allReviews = data.data;
        
//         // Calculate stats from the actual data
//         const total = allReviews.length;
//         const pending = allReviews.filter(r => r.status === 'pending').length;
//         const approved = allReviews.filter(r => r.status === 'approved').length;
//         const rejected = allReviews.filter(r => r.status === 'rejected').length;
//         const featured = allReviews.filter(r => r.isFeatured).length;

//         setStats({
//           total,
//           pending,
//           approved,
//           rejected,
//           featured
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   // Initial fetch and on filter change
//   useEffect(() => {
//     fetchReviews();
//     fetchStats();
//   }, [pagination.page, statusFilter, ratingFilter, featuredFilter]);

//   // Debounce search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (pagination.page === 1) {
//         fetchReviews();
//       } else {
//         setPagination(prev => ({ ...prev, page: 1 }));
//       }
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   // Handle toggle featured
//   const handleToggleFeatured = async (reviewId, currentFeatured) => {
//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`https://kids-backend.vercel.app/api/reviews/${reviewId}/feature`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success(`Review ${!currentFeatured ? 'featured' : 'unfeatured'} successfully`);
//         fetchReviews();
//         fetchStats();
//       } else {
//         toast.error(data.error || 'Failed to update featured status');
//       }
//     } catch (error) {
//       console.error('Error toggling featured:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Handle moderate
//   const handleModerate = async (reviewId, status) => {
//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`https://kids-backend.vercel.app/api/reviews/${reviewId}/moderate`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ status })
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success(`Review ${status} successfully`);
//         await fetchReviews();
//         await fetchStats();
//       } else {
//         toast.error(data.error || 'Failed to moderate review');
//       }
//     } catch (error) {
//       console.error('Error moderating review:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Handle edit - open modal with review data
//   const handleEditClick = (review) => {
//     setEditModal({
//       show: true,
//       review,
//       formData: {
//         rating: review.rating,
//         title: review.title || '',
//         comment: review.comment
//       }
//     });
//     setEditErrors({});
//     setHoveredRating(0);
//   };

//   // Handle edit form change
//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditModal(prev => ({
//       ...prev,
//       formData: {
//         ...prev.formData,
//         [name]: value
//       }
//     }));
//     // Clear error for this field
//     if (editErrors[name]) {
//       setEditErrors(prev => ({ ...prev, [name]: null }));
//     }
//   };

//   // Handle rating click in edit modal
//   const handleEditRatingClick = (rating) => {
//     setEditModal(prev => ({
//       ...prev,
//       formData: {
//         ...prev.formData,
//         rating
//       }
//     }));
//     if (editErrors.rating) {
//       setEditErrors(prev => ({ ...prev, rating: null }));
//     }
//   };

//   // Validate edit form
//   const validateEditForm = () => {
//     const newErrors = {};
    
//     if (!editModal.formData.rating || editModal.formData.rating === 0) {
//       newErrors.rating = 'Rating is required';
//     }
    
//     if (!editModal.formData.comment.trim()) {
//       newErrors.comment = 'Review comment is required';
//     } else if (editModal.formData.comment.length < 10) {
//       newErrors.comment = 'Review must be at least 10 characters';
//     } else if (editModal.formData.comment.length > 500) {
//       newErrors.comment = 'Review must be less than 500 characters';
//     }
    
//     if (editModal.formData.title && editModal.formData.title.length > 100) {
//       newErrors.title = 'Title must be less than 100 characters';
//     }
    
//     setEditErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle save edit
//   const handleSaveEdit = async () => {
//     if (!validateEditForm()) return;

//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`https://kids-backend.vercel.app/api/reviews/${editModal.review._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           rating: editModal.formData.rating,
//           title: editModal.formData.title || undefined,
//           comment: editModal.formData.comment
//         })
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success('Review updated successfully');
//         setEditModal({ show: false, review: null, formData: null });
//         fetchReviews();
//         fetchStats();
//       } else {
//         setEditErrors({ submit: data.error || 'Failed to update review' });
//       }
//     } catch (error) {
//       console.error('Error updating review:', error);
//       setEditErrors({ submit: 'Network error. Please try again.' });
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Get status badge
//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'approved':
//         return (
//           <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
//             <CheckCircle className="w-3 h-3" />
//             Approved
//           </span>
//         );
//       case 'rejected':
//         return (
//           <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full whitespace-nowrap">
//             <XCircle className="w-3 h-3" />
//             Rejected
//           </span>
//         );
//       case 'pending':
//         return (
//           <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full whitespace-nowrap">
//             <Clock className="w-3 h-3" />
//             Pending
//           </span>
//         );
//       default:
//         return null;
//     }
//   };

//   // Star rating display
//   const StarRating = ({ rating, size = "w-3 h-3", interactive = false, onRatingClick, hoveredRating, onHover }) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <button
//           key={i}
//           type="button"
//           onClick={interactive ? () => onRatingClick(i) : undefined}
//           onMouseEnter={interactive ? () => onHover(i) : undefined}
//           onMouseLeave={interactive ? () => onHover(0) : undefined}
//           className={interactive ? 'focus:outline-none' : ''}
//           disabled={!interactive}
//         >
//           <Star
//             className={`${size} ${
//               i <= (hoveredRating || rating)
//                 ? 'fill-yellow-400 text-yellow-400'
//                 : 'text-gray-300'
//             } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
//           />
//         </button>
//       );
//     }
//     return (
//       <div className="flex items-center gap-0.5">
//         {stars}
//         {!interactive && <span className="ml-1 text-xs text-gray-500">({rating})</span>}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header - Responsive */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="px-3 sm:px-6 py-3 sm:py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Review Management</h1>
//                   <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-xs font-medium rounded-full bg-green-100 text-green-600">
//                     Moderator
//                   </span>
//                 </div>
//                 <p className="text-[10px] sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Moderate and manage customer reviews</p>
//               </div>
//             </div>
//           </div>

//           {/* Stats Cards - Responsive */}
//           <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 mt-3 sm:mt-4">
//             <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-200">
//               <p className="text-[9px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Total Reviews</p>
//               <p className="text-sm sm:text-xl font-bold text-gray-900">{stats.total}</p>
//             </div>
//             <div className="bg-yellow-50 rounded-lg p-2 sm:p-3 border border-yellow-200">
//               <p className="text-[9px] sm:text-xs text-yellow-600 mb-0.5 sm:mb-1">Pending</p>
//               <p className="text-sm sm:text-xl font-bold text-yellow-700">{stats.pending}</p>
//             </div>
//             <div className="bg-green-50 rounded-lg p-2 sm:p-3 border border-green-200">
//               <p className="text-[9px] sm:text-xs text-green-600 mb-0.5 sm:mb-1">Approved</p>
//               <p className="text-sm sm:text-xl font-bold text-green-700">{stats.approved}</p>
//             </div>
//             <div className="bg-red-50 rounded-lg p-2 sm:p-3 border border-red-200">
//               <p className="text-[9px] sm:text-xs text-red-600 mb-0.5 sm:mb-1">Rejected</p>
//               <p className="text-sm sm:text-xl font-bold text-red-700">{stats.rejected}</p>
//             </div>
//             <div className="col-span-2 sm:col-span-1 bg-purple-50 rounded-lg p-2 sm:p-3 border border-purple-200">
//               <p className="text-[9px] sm:text-xs text-purple-600 mb-0.5 sm:mb-1">Featured</p>
//               <p className="text-sm sm:text-xl font-bold text-purple-700">{stats.featured}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-3 sm:p-6">
//         {/* Filters */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
//           {/* Search */}
//           <div className="relative mb-3 sm:mb-4">
//             <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search reviews by customer, email, or comment..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
//             />
//           </div>
          
//           {/* Filter Row */}
//           <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
//             <div className="w-full sm:w-40 relative">
//               <Filter className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
//               <select
//                 value={statusFilter}
//                 onChange={(e) => {
//                   setStatusFilter(e.target.value);
//                   setPagination(prev => ({ ...prev, page: 1 }));
//                 }}
//                 className="w-full pl-8 sm:pl-10 pr-2 sm:pr-4 py-1.5 sm:py-2 text-[10px] sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition appearance-none bg-white"
//               >
//                 {statusOptions.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.icon} {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="w-full sm:w-40 relative">
//               <select
//                 value={ratingFilter}
//                 onChange={(e) => {
//                   setRatingFilter(e.target.value);
//                   setPagination(prev => ({ ...prev, page: 1 }));
//                 }}
//                 className="w-full px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition bg-white"
//               >
//                 {ratingOptions.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="w-full sm:w-40 relative">
//               <select
//                 value={featuredFilter}
//                 onChange={(e) => {
//                   setFeaturedFilter(e.target.value);
//                   setPagination(prev => ({ ...prev, page: 1 }));
//                 }}
//                 className="w-full px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition bg-white"
//               >
//                 {featuredOptions.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.icon} {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Reviews Table - Responsive */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           {loading ? (
//             <div className="flex items-center justify-center py-10 sm:py-20">
//               <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-[#E39A65]" />
//             </div>
//           ) : reviews.length === 0 ? (
//             <div className="text-center py-10 sm:py-20">
//               <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full mb-3 sm:mb-4">
//                 <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
//               </div>
//               <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">No reviews found</h3>
//               <p className="text-xs sm:text-sm text-gray-500">There are no reviews matching your criteria</p>
//             </div>
//           ) : (
//             <>
//               {/* Scroll only on mobile, no scroll on large */}
//               <div className="overflow-x-auto lg:overflow-x-visible">
//                 <table className="w-full min-w-[650px] lg:min-w-0">
//                   <colgroup>
//                     {[
//                       'w-[22%]', // Review
//                       'w-[18%]', // Customer
//                       'w-[15%]', // Product
//                       'w-[12%]', // Date
//                       'w-[10%]', // Status
//                       'w-[8%]',  // Featured
//                       'w-[15%]'  // Actions
//                     ].map((width, index) => (
//                       <col key={index} className={width} />
//                     ))}
//                   </colgroup>
//                   <thead className="bg-gray-50 border-b border-gray-200">
//                     <tr>
//                       <th className="px-2 lg:px-3 py-2 lg:py-2.5 text-left text-[10px] lg:text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
//                       <th className="px-2 lg:px-3 py-2 lg:py-2.5 text-left text-[10px] lg:text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//                       <th className="px-2 lg:px-3 py-2 lg:py-2.5 text-left text-[10px] lg:text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//                       <th className="px-2 lg:px-3 py-2 lg:py-2.5 text-left text-[10px] lg:text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                       <th className="px-2 lg:px-3 py-2 lg:py-2.5 text-left text-[10px] lg:text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                       <th className="px-1 lg:px-2 py-2 lg:py-2.5 text-left text-[10px] lg:text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
//                       <th className="px-2 lg:px-3 py-2 lg:py-2.5 text-right text-[10px] lg:text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {reviews.map((review) => (
//                       <tr key={review._id} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-2 lg:px-3 py-2 lg:py-2.5">
//                           <div className="space-y-0.5 lg:space-y-1 max-w-[120px] lg:max-w-[160px]">
//                             <StarRating rating={review.rating} />
//                             {review.title && (
//                               <p className="text-[10px] lg:text-sm font-medium text-gray-900 truncate" title={review.title}>
//                                 {review.title}
//                               </p>
//                             )}
//                             <p className="text-[9px] lg:text-xs text-gray-500 truncate" title={review.comment}>
//                               {review.comment}
//                             </p>
//                           </div>
//                         </td>
//                         <td className="px-2 lg:px-3 py-2 lg:py-2.5">
//                           <div className="space-y-0.5 lg:space-y-1 max-w-[90px] lg:max-w-[120px]">
//                             <div className="flex items-center gap-1 lg:gap-1">
//                               <User className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-gray-400 flex-shrink-0" />
//                               <span className="text-[9px] lg:text-xs text-gray-600 truncate" title={review.userName}>
//                                 {review.userName}
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-1 lg:gap-1">
//                               <Mail className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-gray-400 flex-shrink-0" />
//                               <span className="text-[8px] lg:text-[10px] text-gray-500 truncate" title={review.userEmail}>
//                                 {review.userEmail}
//                               </span>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-2 lg:px-3 py-2 lg:py-2.5">
//                           {review.product ? (
//                             <div className="flex items-center gap-1 lg:gap-1 max-w-[70px] lg:max-w-[100px]">
//                               <Package className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-gray-400 flex-shrink-0" />
//                               <span className="text-[9px] lg:text-xs text-gray-600 truncate" title={review.product.productName}>
//                                 {review.product.productName}
//                               </span>
//                             </div>
//                           ) : (
//                             <span className="text-[9px] lg:text-xs text-gray-400">-</span>
//                           )}
//                         </td>
//                         <td className="px-2 lg:px-3 py-2 lg:py-2.5">
//                           <div className="flex items-center gap-1 lg:gap-1 whitespace-nowrap">
//                             <Calendar className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-gray-400 flex-shrink-0" />
//                             <span className="text-[9px] lg:text-xs text-gray-600">{formatDate(review.createdAt)}</span>
//                           </div>
//                         </td>
//                         <td className="px-2 lg:px-3 py-2 lg:py-2.5">
//                           <div className="whitespace-nowrap">
//                             {getStatusBadge(review.status)}
//                           </div>
//                         </td>
//                         <td className="px-1 lg:px-2 py-2 lg:py-2.5">
//                           <button
//                             onClick={() => handleToggleFeatured(review._id, review.isFeatured)}
//                             disabled={actionLoading}
//                             className={`p-0.5 lg:p-1 rounded-lg transition-colors ${
//                               review.isFeatured 
//                                 ? 'bg-purple-100 text-purple-600 hover:bg-purple-200' 
//                                 : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
//                             }`}
//                             title={review.isFeatured ? 'Remove from featured' : 'Mark as featured'}
//                           >
//                             <Award className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
//                           </button>
//                         </td>
//                         <td className="px-2 lg:px-3 py-2 lg:py-2.5">
//                           <div className="flex items-center justify-end gap-0.5 lg:gap-1">
//                             <button
//                               onClick={() => setViewModal({ show: true, review })}
//                               className="p-1 lg:p-1 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors"
//                               title="View Details"
//                             >
//                               <Eye className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
//                             </button>
//                             <button
//                               onClick={() => handleEditClick(review)}
//                               className="p-1 lg:p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                               title="Edit Review"
//                             >
//                               <Edit className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
//                             </button>
//                             {review.status === 'pending' && (
//                               <>
//                                 <button
//                                   onClick={() => handleModerate(review._id, 'approved')}
//                                   disabled={actionLoading}
//                                   className="p-1 lg:p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                                   title="Approve"
//                                 >
//                                   <CheckCircle className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
//                                 </button>
//                                 <button
//                                   onClick={() => handleModerate(review._id, 'rejected')}
//                                   disabled={actionLoading}
//                                   className="p-1 lg:p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                                   title="Reject"
//                                 >
//                                   <XCircle className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
//                                 </button>
//                               </>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination - Responsive */}
//               {pagination.pages > 1 && (
//                 <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-3 lg:px-6 py-3 lg:py-3.5 border-t border-gray-200">
//                   <p className="text-[9px] lg:text-xs text-gray-500 text-center sm:text-left">
//                     Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
//                   </p>
//                   <div className="flex items-center gap-1 lg:gap-1.5">
//                     <button
//                       onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
//                       disabled={pagination.page === 1}
//                       className="p-1 lg:p-1.5 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <ChevronLeft className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
//                     </button>
//                     <span className="text-[9px] lg:text-xs text-gray-600">
//                       Page {pagination.page} of {pagination.pages}
//                     </span>
//                     <button
//                       onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
//                       disabled={pagination.page === pagination.pages}
//                       className="p-1 lg:p-1.5 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <ChevronRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Edit Review Modal - Responsive */}
//       {editModal.show && editModal.review && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto mx-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
//               <h3 className="text-base sm:text-lg font-bold text-gray-900">Edit Review</h3>
//               <button
//                 onClick={() => setEditModal({ show: false, review: null, formData: null })}
//                 className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
//               </button>
//             </div>
            
//             <div className="p-4 sm:p-6">
//               {/* Customer Info (Read-only) */}
//               <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
//                 <p className="text-[10px] sm:text-xs text-gray-500 mb-1 sm:mb-2">Review by</p>
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#E39A65] flex items-center justify-center text-white font-bold text-xs sm:text-sm">
//                     {editModal.review.userName?.charAt(0)}
//                   </div>
//                   <div>
//                     <p className="text-xs sm:text-sm font-medium text-gray-900">{editModal.review.userName}</p>
//                     <p className="text-[10px] sm:text-xs text-gray-500">{editModal.review.userEmail}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Product Info (Read-only) */}
//               {editModal.review.product && (
//                 <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-100">
//                   <p className="text-[10px] sm:text-xs text-orange-600 mb-0.5 sm:mb-1">Product</p>
//                   <p className="text-xs sm:text-sm font-medium text-gray-900">{editModal.review.product.productName}</p>
//                 </div>
//               )}

//               <form onSubmit={(e) => e.preventDefault()} className="space-y-3 sm:space-y-4">
//                 {/* Rating Selection */}
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                     Rating <span className="text-red-500">*</span>
//                   </label>
//                   <StarRating 
//                     rating={editModal.formData.rating} 
//                     size="w-5 h-5 sm:w-8 sm:h-8"
//                     interactive={true}
//                     onRatingClick={handleEditRatingClick}
//                     hoveredRating={hoveredRating}
//                     onHover={setHoveredRating}
//                   />
//                   {editErrors.rating && (
//                     <p className="text-red-500 text-[10px] sm:text-xs mt-1 flex items-center gap-1">
//                       <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                       {editErrors.rating}
//                     </p>
//                   )}
//                 </div>

//                 {/* Review Title */}
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                     Review Title <span className="text-gray-400 text-[9px] sm:text-xs">(Optional)</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={editModal.formData.title}
//                     onChange={handleEditChange}
//                     placeholder="Review title"
//                     maxLength="100"
//                     className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-white transition-all"
//                   />
//                   {editErrors.title && (
//                     <p className="text-red-500 text-[10px] sm:text-xs mt-1 flex items-center gap-1">
//                       <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                       {editErrors.title}
//                     </p>
//                   )}
//                   <p className="text-[8px] sm:text-xs text-gray-400 mt-1 text-right">
//                     {editModal.formData.title.length}/100
//                   </p>
//                 </div>

//                 {/* Review Comment */}
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                     Review Comment <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     name="comment"
//                     value={editModal.formData.comment}
//                     onChange={handleEditChange}
//                     rows="4"
//                     maxLength="500"
//                     className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-white transition-all resize-none"
//                     placeholder="Review comment..."
//                   />
//                   {editErrors.comment && (
//                     <p className="text-red-500 text-[10px] sm:text-xs mt-1 flex items-center gap-1">
//                       <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                       {editErrors.comment}
//                     </p>
//                   )}
//                   <p className="text-[8px] sm:text-xs text-gray-400 mt-1 text-right">
//                     {editModal.formData.comment.length}/500
//                   </p>
//                 </div>

//                 {/* Submit Error */}
//                 {editErrors.submit && (
//                   <div className="bg-red-50 border border-red-200 rounded-lg p-2 sm:p-3">
//                     <p className="text-red-600 text-[11px] sm:text-sm flex items-center gap-1 sm:gap-2">
//                       <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
//                       {editErrors.submit}
//                     </p>
//                   </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setEditModal({ show: false, review: null, formData: null })}
//                     className="flex-1 py-2 sm:py-3 px-3 sm:px-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all text-xs sm:text-sm"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleSaveEdit}
//                     disabled={actionLoading}
//                     className="flex-1 py-2 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-[#E39A65] to-[#d48b54] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#E39A65]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
//                   >
//                     {actionLoading ? (
//                       <>
//                         <Loader2 className="w-3.5 h-3.5 sm:w-5 sm:h-5 animate-spin" />
//                         Saving...
//                       </>
//                     ) : (
//                       <>
//                         <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         Save Changes
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* View Details Modal - Responsive */}
//       {viewModal.show && viewModal.review && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
//               <h3 className="text-base sm:text-lg font-bold text-gray-900">Review Details</h3>
//               <button
//                 onClick={() => setViewModal({ show: false, review: null })}
//                 className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
//               </button>
//             </div>
            
//             <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
//               {/* Rating and Title */}
//               <div>
//                 <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
//                   <StarRating rating={viewModal.review.rating} />
//                   <span className="text-[10px] sm:text-xs text-gray-500">({viewModal.review.rating}/5)</span>
//                 </div>
//                 {viewModal.review.title && (
//                   <h4 className="text-sm sm:text-lg font-semibold text-gray-900">{viewModal.review.title}</h4>
//                 )}
//               </div>

//               {/* Review Comment */}
//               <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
//                 <p className="text-xs sm:text-sm text-gray-700">{viewModal.review.comment}</p>
//               </div>

//               {/* Customer Info */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                 <div>
//                   <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Customer Name</p>
//                   <p className="text-xs sm:text-sm font-medium text-gray-900 flex items-center gap-1 sm:gap-2">
//                     <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
//                     {viewModal.review.userName}
//                   </p>
//                 </div>
//                 {viewModal.review.userCompany && (
//                   <div>
//                     <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Company</p>
//                     <p className="text-xs sm:text-sm text-gray-700">{viewModal.review.userCompany}</p>
//                   </div>
//                 )}
//                 <div>
//                   <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Email</p>
//                   <p className="text-xs sm:text-sm text-gray-700 flex items-center gap-1 sm:gap-2">
//                     <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
//                     {viewModal.review.userEmail}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Date</p>
//                   <p className="text-xs sm:text-sm text-gray-700 flex items-center gap-1 sm:gap-2">
//                     <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
//                     {formatDate(viewModal.review.createdAt)}
//                   </p>
//                 </div>
//               </div>

//               {/* Product Info */}
//               {viewModal.review.product && (
//                 <div>
//                   <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Product</p>
//                   <div className="flex items-center gap-1 sm:gap-2 p-2 sm:p-3 bg-orange-50 rounded-lg border border-orange-100">
//                     <Package className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#E39A65]" />
//                     <div>
//                       <p className="text-xs sm:text-sm font-medium text-gray-900">{viewModal.review.product.productName}</p>
//                       {viewModal.review.product.productId && (
//                         <p className="text-[9px] sm:text-xs text-gray-500">ID: {viewModal.review.product.productId}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Status and Featured */}
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-2 border-t border-gray-200">
//                 <div>
//                   <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Status</p>
//                   {getStatusBadge(viewModal.review.status)}
//                 </div>
//                 <div>
//                   <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Featured</p>
//                   <span className={`inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium ${
//                     viewModal.review.isFeatured 
//                       ? 'bg-purple-100 text-purple-700' 
//                       : 'bg-gray-100 text-gray-600'
//                   }`}>
//                     <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                     {viewModal.review.isFeatured ? 'Featured' : 'Not Featured'}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Helpful</p>
//                   <span className="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm text-gray-700">
//                     <CheckCircle className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-green-500" />
//                     {viewModal.review.helpfulCount || 0} found this helpful
//                   </span>
//                 </div>
//               </div>

//               {/* Moderation Note */}
//               {viewModal.review.moderationNote && (
//                 <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
//                   <p className="text-[10px] sm:text-xs font-medium text-gray-700 mb-0.5 sm:mb-1">Moderation Note:</p>
//                   <p className="text-xs sm:text-sm text-gray-600">{viewModal.review.moderationNote}</p>
//                 </div>
//               )}
//             </div>

//             <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex justify-end">
//               <button
//                 onClick={() => setViewModal({ show: false, review: null })}
//                 className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Eye, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
  MessageSquare,
  Mail,
  User,
  Calendar,
  ExternalLink,
  ImageIcon,
  Video,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

// EditReviewModal component (same as admin version)
const EditReviewModal = ({ 
  isOpen, 
  onClose, 
  review, 
  onSave,
  saving 
}) => {
  
  const [uploading, setUploading] = useState(false);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const uploadAbortControllers = useRef({});
  
  // Local form state
  const [editForm, setEditForm] = useState({
    rating: 5,
    title: '',
    comment: '',
    status: 'pending',
    isAnonymous: false,
     isFeatured: false,
    existingImages: [],
    newImages: [],
    imagesToDelete: [],
    existingVideo: null,
    newVideo: null,
    videoToDelete: null
  });

  // Cloudinary configuration
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your_cloud_name';
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'your_upload_preset';

  // Initialize form when review changes
  useEffect(() => {
    if (review && isOpen) {
      setEditForm({
        rating: review.rating || 5,
        title: review.title || '',
        comment: review.comment || '',
        status: review.status || 'pending',
        isAnonymous: review.isAnonymous || false,
           isFeatured: review.isFeatured || false,
        existingImages: review.images || [],
        newImages: [],
        imagesToDelete: [],
        existingVideo: review.video || null,
        newVideo: null,
        videoToDelete: null
      });
    }
  }, [review, isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      editForm.newImages.forEach(img => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });
      if (editForm.newVideo?.preview) URL.revokeObjectURL(editForm.newVideo.preview);
    };
  }, []);

  // Upload to Cloudinary
  const uploadToCloudinary = async (file, type, fileId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
    const folder = type === 'image' ? 'reviews/images' : 'reviews/videos';
    formData.append('folder', folder);

    const abortController = new AbortController();
    uploadAbortControllers.current[fileId] = abortController;

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${type === 'image' ? 'image' : 'video'}/upload`, {
        method: 'POST',
        body: formData,
        signal: abortController.signal
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Upload failed');
      }

      const data = await response.json();
      return {
        url: data.secure_url,
        publicId: data.public_id
      };
    } catch (error) {
      if (error.name === 'AbortError') {
        return null;
      }
      throw error;
    } finally {
      delete uploadAbortControllers.current[fileId];
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (editForm.newImages.length + files.length > 4) {
      toast.error('You can upload up to 4 images total');
      return;
    }

    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image file');
        setUploading(false);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        setUploading(false);
        return;
      }

      const imageId = Date.now() + i;
      
      try {
        const previewUrl = URL.createObjectURL(file);
        const tempImage = {
          id: imageId,
          file,
          preview: previewUrl,
          uploading: true,
          progress: 0,
          isNew: true
        };
        
        setEditForm(prev => ({
          ...prev,
          newImages: [...prev.newImages, tempImage]
        }));

        const progressInterval = setInterval(() => {
          setEditForm(prev => ({
            ...prev,
            newImages: prev.newImages.map(img =>
              img.id === imageId
                ? { ...img, progress: Math.min((img.progress || 0) + 10, 90) }
                : img
            )
          }));
        }, 100);

        const result = await uploadToCloudinary(file, 'image', imageId);
        
        clearInterval(progressInterval);
        
        if (result) {
          setEditForm(prev => ({
            ...prev,
            newImages: prev.newImages.map(img =>
              img.id === imageId
                ? { ...img, url: result.url, publicId: result.publicId, uploading: false, progress: 100 }
                : img
            )
          }));
        } else {
          setEditForm(prev => ({
            ...prev,
            newImages: prev.newImages.filter(img => img.id !== imageId)
          }));
        }
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
        setEditForm(prev => ({
          ...prev,
          newImages: prev.newImages.filter(img => img.id !== imageId)
        }));
      }
    }

    setUploading(false);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  // Handle video upload
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    if (editForm.newVideo) {
      toast.error('You can upload only 1 video');
      return;
    }

    const validTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid video file');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      toast.error('Video size must be less than 50MB');
      return;
    }

    setUploading(true);

    const videoId = Date.now();

    try {
      const previewUrl = URL.createObjectURL(file);
      const tempVideo = {
        id: videoId,
        file,
        preview: previewUrl,
        uploading: true,
        progress: 0,
        isNew: true
      };
      
      setEditForm(prev => ({ ...prev, newVideo: tempVideo }));

      const progressInterval = setInterval(() => {
        setEditForm(prev => ({
          ...prev,
          newVideo: prev.newVideo && prev.newVideo.id === videoId
            ? { ...prev.newVideo, progress: Math.min((prev.newVideo.progress || 0) + 10, 90) }
            : prev.newVideo
        }));
      }, 100);

      const result = await uploadToCloudinary(file, 'video', videoId);
      
      clearInterval(progressInterval);
      
      if (result) {
        setEditForm(prev => ({
          ...prev,
          newVideo: {
            ...tempVideo,
            url: result.url,
            publicId: result.publicId,
            uploading: false,
            progress: 100
          }
        }));
      } else {
        setEditForm(prev => ({ ...prev, newVideo: null }));
      }
    } catch (error) {
      toast.error(`Failed to upload video`);
      setEditForm(prev => ({ ...prev, newVideo: null }));
    }

    setUploading(false);
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  // Remove handlers
  const removeExistingImage = (index) => {
    setEditForm(prev => ({
      ...prev,
      imagesToDelete: [...prev.imagesToDelete, prev.existingImages[index]],
      existingImages: prev.existingImages.filter((_, i) => i !== index)
    }));
  };

  const removeNewImage = (id) => {
    if (uploadAbortControllers.current[id]) {
      uploadAbortControllers.current[id].abort();
    }
    const imgToRemove = editForm.newImages.find(img => img.id === id);
    if (imgToRemove?.preview) URL.revokeObjectURL(imgToRemove.preview);
    setEditForm(prev => ({
      ...prev,
      newImages: prev.newImages.filter(img => img.id !== id)
    }));
  };

  const removeExistingVideo = () => {
    setEditForm(prev => ({
      ...prev,
      videoToDelete: prev.existingVideo,
      existingVideo: null
    }));
  };

  const removeNewVideo = () => {
    if (uploadAbortControllers.current[editForm.newVideo?.id]) {
      uploadAbortControllers.current[editForm.newVideo.id].abort();
    }
    if (editForm.newVideo?.preview) URL.revokeObjectURL(editForm.newVideo.preview);
    setEditForm(prev => ({ ...prev, newVideo: null }));
  };

 const handleSave = () => {
  onSave({
    rating: editForm.rating,
    title: editForm.title,
    comment: editForm.comment,
    status: editForm.status,
    isAnonymous: editForm.isAnonymous,
    isFeatured: editForm.isFeatured,
    imagesToDelete: editForm.imagesToDelete.map(img => img.publicId),
    videoToDelete: editForm.videoToDelete?.publicId || null,
    newImages: editForm.newImages.filter(img => img.url).map(img => ({
      url: img.url,
      publicId: img.publicId
    })),
    newVideo: editForm.newVideo?.url ? {
      url: editForm.newVideo.url,
      publicId: editForm.newVideo.publicId
    } : null
  });
};

  const renderStars = (rating, setRating = false) => {
    const currentRating = rating || 0;
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating && setEditForm({ ...editForm, rating: star })}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                star <= currentRating
                  ? 'fill-[#FFD93D] text-[#FFD93D]'
                  : 'text-gray-300'
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (!isOpen || !review) return null;

  return (
    <AnimatePresence>
      {isOpen && review && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] px-6 py-4 rounded-t-2xl z-10">
                <h2 className="text-xl font-bold text-white">Edit Review</h2>
                <p className="text-white/80 text-sm mt-1">Customer: {review.userName}</p>
              </div>
              
              <div className="p-6 space-y-5">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  {renderStars(editForm.rating, true)}
                </div>
                
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Review Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
                    placeholder="Review title"
                    maxLength={100}
                  />
                </div>
                
                {/* Comment */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Comment <span className="text-red-500">*</span></label>
                  <textarea
                    value={editForm.comment}
                    onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none resize-none"
                    placeholder="Review comment"
                  />
                </div>
                
                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <div className="flex gap-3">
                    {['pending', 'approved', 'rejected'].map((status) => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          checked={editForm.status === status}
                          onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                          className="w-4 h-4"
                        />
                        <span className="text-sm capitalize">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">Featured Review</label>
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      checked={editForm.isFeatured}
      onChange={(e) => setEditForm({ ...editForm, isFeatured: e.target.checked })}
      className="w-4 h-4 text-yellow-500 rounded focus:ring-yellow-500"
    />
    <span className="text-sm text-gray-700">
      {editForm.isFeatured ? '⭐ Featured (appears on homepage)' : 'Mark as featured'}
    </span>
  </label>
  <p className="text-xs text-gray-400 mt-1">Featured reviews will be highlighted on the homepage</p>
</div>
                
                {/* Media Attachments Section */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/30">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Media Attachments
                  </label>
                  
                  {/* Existing Images */}
                  {editForm.existingImages.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Current Images ({editForm.existingImages.length})</p>
                      <div className="grid grid-cols-4 gap-3">
                        {editForm.existingImages.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={img.url}
                              alt={`Review image ${idx + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeExistingImage(idx)}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* New Images */}
                  {editForm.newImages.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">New Images ({editForm.newImages.length})</p>
                      <div className="grid grid-cols-4 gap-3">
                        {editForm.newImages.map((img) => (
                          <div key={img.id} className="relative group">
                            <div className="relative">
                              <img
                                src={img.preview}
                                alt="New review image"
                                className="w-full h-20 object-cover rounded-lg"
                              />
                              {img.uploading && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeNewImage(img.id)}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Add Image Button */}
                  <div
                    onClick={() => imageInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-3 text-center cursor-pointer hover:border-[#4A8A90] hover:bg-gray-50 transition-all mb-4"
                  >
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    <ImageIcon className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Add more images (Max 4 total)</p>
                  </div>
                  
                  {/* Existing Video */}
                  {editForm.existingVideo && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Current Video</p>
                      <div className="relative group">
                        <video
                          src={editForm.existingVideo.url}
                          controls
                          className="w-full rounded-lg max-h-32"
                        />
                        <button
                          type="button"
                          onClick={removeExistingVideo}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* New Video */}
                  {editForm.newVideo && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">New Video</p>
                      <div className="relative group">
                        <video
                          src={editForm.newVideo.preview}
                          controls
                          className="w-full rounded-lg max-h-32"
                        />
                        {editForm.newVideo.uploading && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                            <Loader2 className="w-6 h-6 animate-spin text-white" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={removeNewVideo}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Add Video Button */}
                  {!editForm.existingVideo && !editForm.newVideo && (
                    <div
                      onClick={() => videoInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-xl p-3 text-center cursor-pointer hover:border-[#4A8A90] hover:bg-gray-50 transition-all"
                    >
                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                      <Video className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Add video (Max 1)</p>
                    </div>
                  )}
                </div>
                
                {/* Anonymous Flag */}
                {/* {!review.isGuest && (
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editForm.isAnonymous}
                        onChange={(e) => setEditForm({ ...editForm, isAnonymous: e.target.checked })}
                        className="w-4 h-4 text-[#4A8A90] rounded"
                      />
                      <span className="text-sm text-gray-700">Post as anonymous</span>
                    </label>
                  </div>
                )} */}
                
                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving || uploading}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {saving ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </div>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Main Moderator Manage Reviews Component
export default function ModeratorManageReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const itemsPerPage = 10;

  // Fetch reviews
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login to manage reviews');
        setLoading(false);
        return;
      }
      
      let url = `${process.env.NEXT_PUBLIC_API_URL || 'https://kids-backend.vercel.app'}/api/reviews?page=${currentPage}&limit=${itemsPerPage}`;
      
      if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`;
      }
      
      if (ratingFilter !== 'all') {
        url += `&rating=${ratingFilter}`;
      }
      
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalReviews(data.pagination?.total || 0);
      } else {
        toast.error(data.error || 'Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [currentPage, statusFilter, ratingFilter]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== undefined) {
        setCurrentPage(1);
        fetchReviews();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Update review status (Approve/Reject)
  const updateReviewStatus = async (reviewId, status) => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = status === 'approved' 
        ? `/api/reviews/${reviewId}/approve`
        : `/api/reviews/${reviewId}/reject`;
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://kids-backend.vercel.app'}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: status === 'rejected' ? JSON.stringify({ moderationNote: 'Review rejected by moderator' }) : undefined
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Review ${status} successfully`);
        fetchReviews();
      } else {
        toast.error(data.error || `Failed to ${status} review`);
      }
    } catch (error) {
      console.error('Error updating review status:', error);
      toast.error('Failed to update review status');
    }
  };

  // Add this function in the ModeratorManageReviews component
const toggleFeatured = async (reviewId, currentStatus) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://kids-backend.vercel.app'}/api/reviews/${reviewId}/featured`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      toast.success(data.message);
      fetchReviews();
    } else {
      toast.error(data.error || 'Failed to update featured status');
    }
  } catch (error) {
    console.error('Error toggling featured:', error);
    toast.error('Failed to update featured status');
  }
};

  // Reply to review
  const replyToReview = async () => {
    if (!selectedReview || !replyText.trim()) {
      toast.error('Please enter a reply');
      return;
    }
    
    setIsReplying(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://kids-backend.vercel.app'}/api/reviews/${selectedReview._id}/reply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ replyText: replyText.trim() })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Reply added successfully');
        setReplyText('');
        setIsViewModalOpen(false);
        fetchReviews();
      } else {
        toast.error(data.error || 'Failed to add reply');
      }
    } catch (error) {
      console.error('Error replying to review:', error);
      toast.error('Failed to add reply');
    } finally {
      setIsReplying(false);
    }
  };

 const handleSaveEdit = async (editForm) => {
  if (!selectedReview) {
    toast.error('No review selected');
    return;
  }
  
  if (!editForm.comment.trim() || editForm.comment.trim().length < 10) {
    toast.error('Comment must be at least 10 characters long');
    return;
  }
  
  setSaving(true);
  try {
    const token = localStorage.getItem('token');
    
    const updateData = {
      rating: editForm.rating,
      title: editForm.title,
      comment: editForm.comment,
      status: editForm.status,
      isAnonymous: editForm.isAnonymous,
      isFeatured: editForm.isFeatured, // Add this
      imagesToDelete: editForm.imagesToDelete.map(img => img.publicId),
      videoToDelete: editForm.videoToDelete?.publicId || null,
      newImages: editForm.newImages.filter(img => img.url).map(img => ({
        url: img.url,
        publicId: img.publicId
      })),
      newVideo: editForm.newVideo?.url ? {
        url: editForm.newVideo.url,
        publicId: editForm.newVideo.publicId
      } : null
    };
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://kids-backend.vercel.app'}/api/reviews/${selectedReview._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      toast.success('Review updated successfully');
      setIsEditModalOpen(false);
      fetchReviews();
    } else {
      toast.error(data.error || 'Failed to update review');
    }
  } catch (error) {
    console.error('Error updating review:', error);
    toast.error('Failed to update review');
  } finally {
    setSaving(false);
  }
};

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
    }
  };

  // Render stars
  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${star <= rating ? 'fill-[#FFD93D] text-[#FFD93D]' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  // View Review Modal
  const ViewReviewModal = () => (
    <AnimatePresence>
      {isViewModalOpen && selectedReview && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsViewModalOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
                <div>
                  <h2 className="text-xl font-bold text-white">Review Details</h2>
                  <p className="text-white/80 text-sm">Review #{selectedReview._id?.slice(-8)}</p>
                </div>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <XCircle className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Customer Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-700 mb-3">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#4A8A90]" />
                      <span className="text-sm text-gray-600">{selectedReview.userName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#4A8A90]" />
                      <span className="text-sm text-gray-600">{selectedReview.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#4A8A90]" />
                      <span className="text-sm text-gray-600">
                        {new Date(selectedReview.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(selectedReview.status)}
                    </div>
                  </div>
                </div>
                
                {/* Product Info */}
                {selectedReview.product && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-700 mb-3">Product Information</h3>
                    <Link
                      href={`/product/${selectedReview.product.slug || selectedReview.product._id}`}
                      target="_blank"
                      className="flex items-center gap-3 hover:bg-white p-2 rounded-lg transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{selectedReview.productName}</p>
                        <p className="text-xs text-gray-500">Product ID: {selectedReview.product._id}</p>
                      </div>
                    </Link>
                  </div>
                )}
                
                {/* Review Content */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-700 mb-3">Review Content</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Rating:</span>
                      {renderStars(selectedReview.rating)}
                    </div>
                    {selectedReview.title && (
                      <div>
                        <span className="text-sm text-gray-500">Title:</span>
                        <p className="font-medium text-gray-800 mt-1">{selectedReview.title}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-sm text-gray-500">Comment:</span>
                      <p className="text-gray-700 mt-1 whitespace-pre-wrap">{selectedReview.comment}</p>
                    </div>
                  </div>
                </div>
                
                {/* Media */}
                {(selectedReview.images?.length > 0 || selectedReview.video?.url) && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-700 mb-3">Media Attachments</h3>
                    {selectedReview.images?.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-500 mb-2">Images ({selectedReview.images.length})</p>
                        <div className="grid grid-cols-4 gap-2">
                          {selectedReview.images.slice(0, 4).map((img, idx) => (
                            <img
                              key={idx}
                              src={img.url}
                              alt={`Review image ${idx + 1}`}
                              className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => window.open(img.url, '_blank')}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedReview.video?.url && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Video</p>
                        <video
                          src={selectedReview.video.url}
                          controls
                          className="w-full rounded-lg max-h-48"
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Admin Reply */}
                {selectedReview.reply?.text && (
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <h3 className="font-semibold text-blue-700 mb-2">Admin Reply</h3>
                    <p className="text-blue-800">{selectedReview.reply.text}</p>
                    <p className="text-xs text-blue-600 mt-2">
                      Replied on {new Date(selectedReview.reply.repliedAt).toLocaleString()}
                    </p>
                  </div>
                )}
                
             
                
                {/* Actions - NO DELETE BUTTON FOR MODERATOR */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      setIsEditModalOpen(true);
                    }}
                    className="flex-1 px-4 py-2 border-2 border-[#4A8A90] text-[#4A8A90] font-semibold rounded-xl hover:bg-[#4A8A90] hover:text-white transition-all"
                  >
                    <Edit className="w-4 h-4 inline mr-2" />
                    Edit Review
                  </button>
                  {selectedReview.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateReviewStatus(selectedReview._id, 'approved')}
                        className="flex-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all"
                      >
                        <CheckCircle className="w-4 h-4 inline mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => updateReviewStatus(selectedReview._id, 'rejected')}
                        className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
                      >
                        <XCircle className="w-4 h-4 inline mr-2" />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Reviews</h1>
          <p className="text-gray-600">View, moderate, and manage customer reviews</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-[#4A8A90] opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {reviews.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {reviews.filter(r => r.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {reviews.filter(r => r.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-500 opacity-50" />
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none w-64"
                />
              </div>
              
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              
              {/* Rating Filter */}
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars </option>
                <option value="3">3 Stars </option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            
            {/* Refresh Button */}
            <button
              onClick={fetchReviews}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Reviews Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#4A8A90]" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No reviews found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Rating</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Review</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reviews.map((review) => (
                      <tr key={review._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900 text-sm truncate max-w-[150px]">{review.userName}</span>
                            <span className="text-xs text-gray-500 truncate max-w-[150px]">{review.email}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-700 truncate max-w-[100px] block">
                            {review.productName || 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {renderStars(review.rating)}
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-700 truncate max-w-[150px]">{review.title || review.comment}</p>
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(review.status)}
                        </td>
                       <td className="px-4 py-3 text-right">
  <div className="flex items-center justify-end gap-1">
    {/* View button */}
    <button
      onClick={() => {
        setSelectedReview(review);
        setReplyText(review.reply?.text || '');
        setIsViewModalOpen(true);
      }}
      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
      title="View"
    >
      <Eye className="w-4 h-4" />
    </button>
    
    {/* Featured Toggle Button - Only for approved reviews */}
    {review.status === 'approved' && (
      <button
        onClick={() => toggleFeatured(review._id, review.isFeatured)}
        className={`p-1.5 rounded-lg transition-colors ${
          review.isFeatured 
            ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100' 
            : 'text-gray-400 hover:bg-gray-100'
        }`}
        title={review.isFeatured ? 'Remove from featured' : 'Mark as featured'}
      >
        <Star className={`w-4 h-4 ${review.isFeatured ? 'fill-yellow-500' : ''}`} />
      </button>
    )}
    
    {/* Approve button - only for pending */}
    {review.status === 'pending' && (
      <>
        <button
          onClick={() => updateReviewStatus(review._id, 'approved')}
          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          title="Approve"
        >
          <CheckCircle className="w-4 h-4" />
        </button>
        <button
          onClick={() => updateReviewStatus(review._id, 'rejected')}
          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Reject"
        >
          <XCircle className="w-4 h-4" />
        </button>
      </>
    )}
    
    {/* Edit button */}
    <button
      onClick={() => {
        setSelectedReview(review);
        setTimeout(() => {
          setIsEditModalOpen(true);
        }, 0);
      }}
      className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
      title="Edit"
    >
      <Edit className="w-4 h-4" />
    </button>
    {/* NO DELETE BUTTON FOR MODERATOR */}
  </div>
</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Modals */}
      <ViewReviewModal />
      <EditReviewModal 
        key={selectedReview?._id || 'edit-modal'}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        review={selectedReview}
        onSave={handleSaveEdit}
        saving={saving}
      />
    </div>
  );
}
