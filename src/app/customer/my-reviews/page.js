



// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   Search,
//   Eye,
//   Edit,
//   Calendar,
//   Star,
//   CheckCircle,
//   XCircle,
//   Clock,
//   AlertCircle,
//   Loader2,
//   ChevronLeft,
//   ChevronRight,
//   MessageCircle,
//   Package,
//   X,
//   Save,
//   Filter,
//   ChevronDown
// } from 'lucide-react';
// import { toast } from 'sonner';
// import { useRef } from 'react';

// export default function MyReviews() {
//   const router = useRouter();
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editModal, setEditModal] = useState({ show: false, review: null, formData: null });
//   const [viewModal, setViewModal] = useState({ show: false, review: null });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [actionLoading, setActionLoading] = useState(false);
//   const [hoveredRating, setHoveredRating] = useState(0);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0
//   });
//   // First, add this state near your other useState declarations
// const [showStatusDropdown, setShowStatusDropdown] = useState(false);
// const dropdownRef = useRef(null);

  

//   // Edit form errors
//   const [editErrors, setEditErrors] = useState({});

//   // Status options
//   const statusOptions = [
//     { value: 'all', label: 'All Reviews', icon: '📋' },
//     { value: 'pending', label: 'Pending', icon: '⏳' },
//     { value: 'approved', label: 'Approved', icon: '✅' },
//     { value: 'rejected', label: 'Rejected', icon: '❌' }
//   ];

//   // Check if user is logged in and is a customer
//   useEffect(() => {
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         // Allow only customers
//         if (user.role !== 'customer') {
//           toast.error('Access denied. Customer area only.');
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


  
// // Add this useEffect to handle clicking outside
// useEffect(() => {
//   function handleClickOutside(event) {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setShowStatusDropdown(false);
//     }
//   }
//   document.addEventListener("mousedown", handleClickOutside);
//   return () => {
//     document.removeEventListener("mousedown", handleClickOutside);
//   };
// }, []);

//   // Fetch user's reviews
//   const fetchMyReviews = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       // Build query params
//       const params = new URLSearchParams({
//         page: pagination.page.toString(),
//         limit: pagination.limit.toString()
//       });
      
//       // Add status filter if not 'all'
//       if (statusFilter && statusFilter !== 'all') {
//         params.append('status', statusFilter);
//       }
      
//       // Add search term if present
//       if (searchTerm && searchTerm.trim()) {
//         params.append('search', searchTerm.trim());
//       }

//       const response = await fetch(`http://localhost:5000/api/reviews/user/me?${params.toString()}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (data.success) {
//         setReviews(data.data || []);
//         setPagination(prev => ({
//           ...prev,
//           total: data.pagination?.total || 0,
//           pages: data.pagination?.pages || 0
//         }));
//       } else {
//         toast.error(data.error || 'Failed to fetch reviews');
//         setReviews([]);
//       }
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//       toast.error('Network error. Please try again.');
//       setReviews([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch when page, status filter, or search changes
//   useEffect(() => {
//     fetchMyReviews();
//   }, [pagination.page, statusFilter, searchTerm]);

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
//       const response = await fetch(`http://localhost:5000/api/reviews/${editModal.review._id}`, {
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
//         fetchMyReviews();
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
//           <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
//             <CheckCircle className="w-3 h-3" />
//             Approved
//           </span>
//         );
//       case 'rejected':
//         return (
//           <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full whitespace-nowrap">
//             <XCircle className="w-3 h-3" />
//             Rejected
//           </span>
//         );
//       case 'pending':
//         return (
//           <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full whitespace-nowrap">
//             <Clock className="w-3 h-3" />
//             Pending
//           </span>
//         );
//       default:
//         return (
//           <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full whitespace-nowrap">
//             <AlertCircle className="w-3 h-3" />
//             Unknown
//           </span>
//         );
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

//   // Handle filter change
//   const handleStatusFilterChange = (e) => {
//     setStatusFilter(e.target.value);
//     setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
//   };

//   // Handle search with debounce
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
//   };

//   // Clear status filter
//   const clearStatusFilter = () => {
//     setStatusFilter('all');
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="px-4 sm:px-6 py-3 sm:py-4">
//           <h1 className="text-lg sm:text-2xl font-bold text-gray-900">My Reviews</h1>
//           <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">View and manage your product reviews</p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-3 sm:p-6">
//         {/* Filters */}
    
// <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//     {/* Search - Full width on both */}
//     <div className="relative">
//       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
//       <input
//         type="text"
//         placeholder="Search reviews..."
//         value={searchTerm}
//         onChange={handleSearchChange}
//         className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
//       />
//     </div>

//     {/* Status Filter */}
//   {/* Status Filter - Custom Dropdown */}
// <div className="relative" ref={dropdownRef}>
//   <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 z-10">
//     <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//   </div>
  
//   {/* Dropdown Button */}
//   <button
//     type="button"
//     onClick={() => setShowStatusDropdown(!showStatusDropdown)}
//     className="w-full pl-9 sm:pl-10 pr-8 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition bg-white text-left flex items-center justify-between"
//   >
//     <span className="truncate">
//       {statusOptions.find(opt => opt.value === statusFilter)?.icon} {statusOptions.find(opt => opt.value === statusFilter)?.label}
//     </span>
//     <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
//   </button>

//   {/* Dropdown Menu */}
//   {showStatusDropdown && (
//     <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//       {statusOptions.map((option) => (
//         <button
//           key={option.value}
//           onClick={() => {
//             setStatusFilter(option.value);
//             setShowStatusDropdown(false);
//             setPagination(prev => ({ ...prev, page: 1 }));
//           }}
//           className={`w-full px-4 py-2.5 text-left hover:bg-orange-50 transition-colors flex items-center gap-2 text-xs sm:text-sm ${
//             statusFilter === option.value ? 'bg-orange-50 text-[#E39A65] font-medium' : 'text-gray-700'
//           }`}
//         >
//           <span>{option.icon}</span>
//           <span className="truncate">{option.label}</span>
//           {statusFilter === option.value && (
//             <CheckCircle className="w-3.5 h-3.5 ml-auto text-[#E39A65] flex-shrink-0" />
//           )}
//         </button>
//       ))}
//     </div>
//   )}
// </div>
//   </div>

//   {/* Active Filters Display - Below the filters */}
//   {(statusFilter !== 'all' || searchTerm) && (
//     <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-gray-100">
//       <span className="text-xs text-gray-500">Active filters:</span>
//       {statusFilter !== 'all' && (
//         <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-lg whitespace-nowrap">
//           <Filter className="w-3 h-3" />
//           {statusOptions.find(opt => opt.value === statusFilter)?.label}
//           <button
//             onClick={clearStatusFilter}
//             className="ml-0.5 hover:text-orange-900"
//           >
//             <X className="w-3 h-3" />
//           </button>
//         </span>
//       )}
//       {searchTerm && (
//         <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg whitespace-nowrap max-w-[200px] sm:max-w-none">
//           <Search className="w-3 h-3 flex-shrink-0" />
//           <span className="truncate">"{searchTerm}"</span>
//           <button
//             onClick={() => setSearchTerm('')}
//             className="ml-0.5 hover:text-blue-900 flex-shrink-0"
//           >
//             <X className="w-3 h-3" />
//           </button>
//         </span>
//       )}
//     </div>
//   )}
// </div>

//         {/* Reviews Table - Card layout on mobile, table on larger screens */}
//         <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           {loading ? (
//             <div className="flex items-center justify-center py-16 sm:py-20">
//               <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-[#E39A65]" />
//             </div>
//           ) : reviews.length === 0 ? (
//             <div className="text-center py-12 sm:py-20 px-4">
//               <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full mb-3 sm:mb-4">
//                 <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
//               </div>
//               <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">No reviews found</h3>
//               <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto">
//                 {statusFilter !== 'all' 
//                   ? `You don't have any ${statusOptions.find(opt => opt.value === statusFilter)?.label.toLowerCase()} reviews.` 
//                   : searchTerm
//                   ? `No reviews matching "${searchTerm}"`
//                   : "You haven't written any reviews yet."}
//               </p>
//               <Link
//                 href="/products"
//                 className="inline-flex items-center px-3 sm:px-4 py-2 sm:py-2.5 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors text-xs sm:text-sm font-medium"
//               >
//                 Browse Products to Review
//               </Link>
//             </div>
//           ) : (
//             <>
//               {/* Mobile View - Card Layout (hidden on sm and above) */}
//               <div className="block sm:hidden divide-y divide-gray-200">
//                 {reviews.map((review) => (
//                   <div key={review._id} className="p-4 hover:bg-gray-50 transition-colors">
//                     <div className="flex items-start justify-between mb-2">
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2 mb-1">
//                           <StarRating rating={review.rating} size="w-3 h-3" />
//                           <span className="text-xs text-gray-500">({review.rating}/5)</span>
//                         </div>
//                         {review.title && (
//                           <p className="text-sm font-medium text-gray-900 truncate">{review.title}</p>
//                         )}
//                         <p className="text-xs text-gray-500 line-clamp-2 mt-1">{review.comment}</p>
//                       </div>
//                       <div className="flex items-center gap-1 ml-2">
//                         <button
//                           onClick={() => setViewModal({ show: true, review })}
//                           className="p-1.5 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors"
//                           title="View Details"
//                         >
//                           <Eye className="w-3.5 h-3.5" />
//                         </button>
//                         <button
//                           onClick={() => review.status === 'pending' ? handleEditClick(review) : toast.info('Only pending reviews can be edited')}
//                           className={`p-1.5 rounded-lg transition-colors ${
//                             review.status === 'pending'
//                               ? 'text-gray-400 hover:text-blue-600 hover:bg-blue-50' 
//                               : 'text-gray-300 cursor-not-allowed'
//                           }`}
//                           disabled={review.status !== 'pending'}
//                         >
//                           <Edit className="w-3.5 h-3.5" />
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center justify-between text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
//                       <div className="flex items-center gap-2 min-w-0">
//                         {review.product && (
//                           <div className="flex items-center gap-1 truncate max-w-[120px]">
//                             <Package className="w-3 h-3 text-gray-400 flex-shrink-0" />
//                             <span className="truncate">{review.product.productName}</span>
//                           </div>
//                         )}
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center gap-1 whitespace-nowrap">
//                           <Calendar className="w-3 h-3 text-gray-400" />
//                           <span>{formatDate(review.createdAt)}</span>
//                         </div>
//                         {getStatusBadge(review.status)}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Desktop View - Table (hidden on mobile, visible on sm and above) */}
//               <div className="hidden sm:block overflow-x-auto">
//                 <table className="w-full table-fixed">
//                   <colgroup>
//                     <col className="w-[40%]" />
//                     <col className="w-[20%]" />
//                     <col className="w-[15%]" />
//                     <col className="w-[15%]" />
//                     <col className="w-[10%]" />
//                   </colgroup>
//                   <thead className="bg-gray-50 border-b border-gray-200">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                       <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {reviews.map((review) => (
//                       <tr key={review._id} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-4 py-3">
//                           <div className="space-y-1 max-w-[300px]">
//                             <StarRating rating={review.rating} />
//                             {review.title && (
//                               <p className="text-sm font-medium text-gray-900 truncate" title={review.title}>
//                                 {review.title}
//                               </p>
//                             )}
//                             <p className="text-xs text-gray-500 truncate" title={review.comment}>
//                               {review.comment}
//                             </p>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           {review.product ? (
//                             <div className="flex items-center gap-2 max-w-[150px]">
//                               <Package className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                               <span className="text-sm text-gray-600 truncate" title={review.product.productName}>
//                                 {review.product.productName}
//                               </span>
//                             </div>
//                           ) : (
//                             <span className="text-sm text-gray-400">-</span>
//                           )}
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-2 whitespace-nowrap">
//                             <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                             <span className="text-sm text-gray-600">{formatDate(review.createdAt)}</span>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="whitespace-nowrap">
//                             {getStatusBadge(review.status)}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center justify-end gap-2">
//                             <button
//                               onClick={() => setViewModal({ show: true, review })}
//                               className="p-1.5 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors"
//                               title="View Details"
//                             >
//                               <Eye className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => review.status === 'pending' ? handleEditClick(review) : toast.info('Only pending reviews can be edited')}
//                               className={`p-1.5 rounded-lg transition-colors ${
//                                 review.status === 'pending'
//                                   ? 'text-gray-400 hover:text-blue-600 hover:bg-blue-50' 
//                                   : 'text-gray-300 cursor-not-allowed'
//                               }`}
//                               title={review.status === 'pending' ? 'Edit Review' : 'Cannot edit approved/rejected reviews'}
//                               disabled={review.status !== 'pending'}
//                             >
//                               <Edit className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination */}
//               {pagination.pages > 1 && (
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200">
//                   <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
//                     Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} reviews
//                   </p>
//                   <div className="flex items-center justify-center gap-2">
//                     <button
//                       onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
//                       disabled={pagination.page === 1}
//                       className="p-1.5 sm:p-2 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </button>
//                     <span className="text-xs sm:text-sm text-gray-600">
//                       Page {pagination.page} of {pagination.pages}
//                     </span>
//                     <button
//                       onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
//                       disabled={pagination.page === pagination.pages}
//                       className="p-1.5 sm:p-2 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Edit Review Modal - Already responsive */}
//       {editModal.show && editModal.review && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
//               <h3 className="text-base sm:text-lg font-bold text-gray-900">Edit Your Review</h3>
//               <button
//                 onClick={() => setEditModal({ show: false, review: null, formData: null })}
//                 className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
//               </button>
//             </div>
            
//             <div className="p-4 sm:p-6">
//               {/* Product Info */}
//               {editModal.review.product && (
//                 <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-100">
//                   <p className="text-xs text-orange-600 mb-1">Product</p>
//                   <p className="text-sm sm:text-base font-medium text-gray-900">{editModal.review.product.productName}</p>
//                 </div>
//               )}

//               {/* Status Info */}
//               <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
//                 <p className="text-xs text-blue-600 mb-1">Review Status</p>
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//                   {getStatusBadge(editModal.review.status)}
//                   <span className="text-xs text-blue-600">
//                     {editModal.review.status === 'pending' 
//                       ? 'You can edit this review while it\'s pending approval.'
//                       : 'This review cannot be edited.'}
//                   </span>
//                 </div>
//               </div>

//               <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
//                 {/* Rating Selection */}
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
//                     Rating <span className="text-red-500">*</span>
//                   </label>
//                   <StarRating 
//                     rating={editModal.formData.rating} 
//                     size="w-6 h-6 sm:w-8 sm:h-8"
//                     interactive={true}
//                     onRatingClick={handleEditRatingClick}
//                     hoveredRating={hoveredRating}
//                     onHover={setHoveredRating}
//                   />
//                   {editErrors.rating && (
//                     <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                       <AlertCircle className="w-3 h-3" />
//                       {editErrors.rating}
//                     </p>
//                   )}
//                 </div>

//                 {/* Review Title */}
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
//                     Review Title <span className="text-gray-400 text-xs">(Optional)</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={editModal.formData.title}
//                     onChange={handleEditChange}
//                     placeholder="Summarize your experience"
//                     maxLength="100"
//                     className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-white transition-all"
//                   />
//                   {editErrors.title && (
//                     <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                       <AlertCircle className="w-3 h-3" />
//                       {editErrors.title}
//                     </p>
//                   )}
//                   <p className="text-xs text-gray-400 mt-1 text-right">
//                     {editModal.formData.title.length}/100
//                   </p>
//                 </div>

//                 {/* Review Comment */}
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
//                     Review Comment <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     name="comment"
//                     value={editModal.formData.comment}
//                     onChange={handleEditChange}
//                     rows="4"
//                     maxLength="500"
//                     className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-white transition-all resize-none"
//                     placeholder="Share your experience with this product..."
//                   />
//                   {editErrors.comment && (
//                     <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                       <AlertCircle className="w-3 h-3" />
//                       {editErrors.comment}
//                     </p>
//                   )}
//                   <p className="text-xs text-gray-400 mt-1 text-right">
//                     {editModal.formData.comment.length}/500
//                   </p>
//                 </div>

//                 {/* Submit Error */}
//                 {editErrors.submit && (
//                   <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//                     <p className="text-red-600 text-xs sm:text-sm flex items-center gap-2">
//                       <AlertCircle className="w-4 h-4" />
//                       {editErrors.submit}
//                     </p>
//                   </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setEditModal({ show: false, review: null, formData: null })}
//                     className="w-full sm:flex-1 py-2.5 sm:py-3 px-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all text-sm"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleSaveEdit}
//                     disabled={actionLoading}
//                     className="w-full sm:flex-1 py-2.5 sm:py-3 px-4 bg-gradient-to-r from-[#E39A65] to-[#d48b54] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#E39A65]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
//                   >
//                     {actionLoading ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         Saving...
//                       </>
//                     ) : (
//                       <>
//                         <Save className="w-4 h-4" />
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

//       {/* View Details Modal - Already responsive */}
//       {viewModal.show && viewModal.review && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
//                 <div className="flex items-center gap-2 mb-2">
//                   <StarRating rating={viewModal.review.rating} size="w-4 h-4 sm:w-5 sm:h-5" />
//                   <span className="text-xs sm:text-sm text-gray-500">({viewModal.review.rating}/5)</span>
//                 </div>
//                 {viewModal.review.title && (
//                   <h4 className="text-base sm:text-lg font-semibold text-gray-900">{viewModal.review.title}</h4>
//                 )}
//               </div>

//               {/* Review Comment */}
//               <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
//                 <p className="text-xs sm:text-sm text-gray-700">{viewModal.review.comment}</p>
//               </div>

//               {/* Product Info */}
//               {viewModal.review.product && (
//                 <div>
//                   <p className="text-xs text-gray-500 mb-1">Product</p>
//                   <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-100">
//                     <Package className="w-4 h-4 sm:w-5 sm:h-5 text-[#E39A65]" />
//                     <span className="text-sm sm:text-base font-medium text-gray-900">{viewModal.review.product.productName}</span>
//                   </div>
//                 </div>
//               )}

//               {/* Date and Status */}
//               <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2 border-t border-gray-200">
//                 <div>
//                   <p className="text-xs text-gray-500 mb-1">Date</p>
//                   <p className="text-xs sm:text-sm text-gray-700 flex items-center gap-2">
//                     <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
//                     {formatDate(viewModal.review.createdAt)}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500 mb-1">Status</p>
//                   {getStatusBadge(viewModal.review.status)}
//                 </div>
//               </div>

//               {/* Moderation Note */}
//               {viewModal.review.moderationNote && (
//                 <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
//                   <p className="text-xs font-medium text-gray-700 mb-1">Moderation Note:</p>
//                   <p className="text-xs sm:text-sm text-gray-600">{viewModal.review.moderationNote}</p>
//                 </div>
//               )}
//             </div>

//             <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-end gap-2">
//               {viewModal.review.status === 'pending' && (
//                 <button
//                   onClick={() => {
//                     setViewModal({ show: false });
//                     handleEditClick(viewModal.review);
//                   }}
//                   className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#E39A65] rounded-lg hover:bg-[#d48b54] transition-colors flex items-center justify-center gap-2 order-2 sm:order-1"
//                 >
//                   <Edit className="w-4 h-4" />
//                   Edit Review
//                 </button>
//               )}
//               <button
//                 onClick={() => setViewModal({ show: false, review: null })}
//                 className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors order-1 sm:order-2"
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
  Eye, 
  Edit, 
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  X,
  Search,
  ImageIcon,
  Video,
  Trash2,
  Upload,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

// Edit Review Modal for Customer (with full media management)
const EditReviewModal = ({ 
  isOpen, 
  onClose, 
  review, 
  onSave,
  saving 
}) => {
  const [uploading, setUploading] = useState(false);
  const [editForm, setEditForm] = useState({
    rating: 5,
    title: '',
    comment: '',
    existingImages: [],
    newImages: [],
    imagesToDelete: [],
    existingVideo: null,
    newVideo: null,
    videoToDelete: null
  });
  
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const uploadAbortControllers = useRef({});

  // Cloudinary configuration
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your_cloud_name';
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'your_upload_preset';

  // Add this function after the Cloudinary configuration
const compressImageSmart = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // MORE AGGRESSIVE compression - target under 300KB
        let quality = 0.4; // Default 40% quality
        
        if (file.size > 5 * 1024 * 1024) {
          quality = 0.25; // 25% quality for 5MB+ files
        } else if (file.size > 2 * 1024 * 1024) {
          quality = 0.3; // 30% quality for 2-5MB files
        } else if (file.size > 1 * 1024 * 1024) {
          quality = 0.35; // 35% quality for 1-2MB files
        } else if (file.size > 500 * 1024) {
          quality = 0.45; // 45% quality for 500KB-1MB files
        } else {
          quality = 0.55; // 55% quality for smaller files
        }
        
        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            const reduction = ((file.size - blob.size) / file.size * 100).toFixed(1);
            console.log(`📸 Review Image Compressed: ${(file.size / 1024).toFixed(0)}KB → ${(blob.size / 1024).toFixed(0)}KB (${reduction}% reduction)`);
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
};

  // Initialize form when review changes
  useEffect(() => {
    if (review && isOpen) {
      setEditForm({
        rating: review.rating || 5,
        title: review.title || '',
        comment: review.comment || '',
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
  // const uploadToCloudinary = async (file, type, fileId) => {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
  //   const folder = type === 'image' ? 'reviews/images' : 'reviews/videos';
  //   formData.append('folder', folder);

  //   const abortController = new AbortController();
  //   uploadAbortControllers.current[fileId] = abortController;

  //   try {
  //     const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${type === 'image' ? 'image' : 'video'}/upload`, {
  //       method: 'POST',
  //       body: formData,
  //       signal: abortController.signal
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.error?.message || 'Upload failed');
  //     }

  //     const data = await response.json();
  //     return {
  //       url: data.secure_url,
  //       publicId: data.public_id
  //     };
  //   } catch (error) {
  //     if (error.name === 'AbortError') {
  //       return null;
  //     }
  //     throw error;
  //   } finally {
  //     delete uploadAbortControllers.current[fileId];
  //   }
  // };
// Upload to Cloudinary with compression
const uploadToCloudinary = async (file, type, fileId) => {
  let fileToUpload = file;
  
  // Compress images before upload
  if (type === 'image') {
    try {
      fileToUpload = await compressImageSmart(file);
    } catch (error) {
      console.error('Compression error, using original file:', error);
      fileToUpload = file;
    }
  }
  
  const formData = new FormData();
  formData.append('file', fileToUpload);
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
    
    if (type === 'video') {
      console.log(`🎥 Video uploaded successfully`);
    }
    
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
    
    if (editForm.existingImages.length + editForm.newImages.length + files.length > 4) {
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
    
    if (editForm.existingVideo || editForm.newVideo) {
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

  // Remove existing image
  const removeExistingImage = (index) => {
    setEditForm(prev => ({
      ...prev,
      imagesToDelete: [...prev.imagesToDelete, prev.existingImages[index]],
      existingImages: prev.existingImages.filter((_, i) => i !== index)
    }));
  };

  // Remove new image
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

  // Remove existing video
  const removeExistingVideo = () => {
    setEditForm(prev => ({
      ...prev,
      videoToDelete: prev.existingVideo,
      existingVideo: null
    }));
  };

  // Remove new video
  const removeNewVideo = () => {
    if (uploadAbortControllers.current[editForm.newVideo?.id]) {
      uploadAbortControllers.current[editForm.newVideo.id].abort();
    }
    if (editForm.newVideo?.preview) URL.revokeObjectURL(editForm.newVideo.preview);
    setEditForm(prev => ({ ...prev, newVideo: null }));
  };

  const handleSave = () => {
    if (!editForm.comment.trim() || editForm.comment.trim().length < 10) {
      toast.error('Comment must be at least 10 characters long');
      return;
    }
    
    // Prepare data for save
    const saveData = {
      rating: editForm.rating,
      title: editForm.title,
      comment: editForm.comment,
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
    
    onSave(saveData);
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

  const totalImages = editForm.existingImages.length + editForm.newImages.length;
  const hasVideo = editForm.existingVideo || editForm.newVideo;

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
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">Edit Your Review</h2>
                    <p className="text-white/80 text-sm mt-1">Update your feedback</p>
                  </div>
                  <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-1 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-5">
                {/* Product Info */}
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Product</p>
                  <p className="font-medium text-gray-800">{review.productName || 'N/A'}</p>
                </div>
                
             
                
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
                  <p className="text-xs text-gray-400 mt-1">{editForm.title.length}/100 characters</p>
                </div>
                
                {/* Comment */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Comment <span className="text-red-500">*</span></label>
                  <textarea
                    value={editForm.comment}
                    onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none resize-none"
                    placeholder="Share your experience..."
                  />
                  <p className="text-xs text-gray-400 mt-1">{editForm.comment.length}/500 characters (minimum 10)</p>
                </div>
                   {/* Media Attachments Section */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/30">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Media Attachments ({totalImages}/4 images, {hasVideo ? '1/1' : '0/1'} video)
                  </label>
                  
                  {/* Existing Images */}
                  {editForm.existingImages.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Current Images</p>
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
                      <p className="text-xs text-gray-500 mb-2">New Images</p>
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
                  {totalImages < 4 && (
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
                      <Plus className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Add images (Max 4 total)</p>
                    </div>
                  )}
                  
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
                  {!hasVideo && (
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

// View Review Modal for Customer
const ViewReviewModal = ({ isOpen, onClose, review }) => {
  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-[#FFD93D] text-[#FFD93D]' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

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
              <div className="sticky top-0 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] px-6 py-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">Your Review</h2>
                    <p className="text-white/80 text-sm mt-1">Review Details</p>
                  </div>
                  <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-1 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Product Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Product</h3>
                  <Link
                    href={`/product/${review.product?.slug || review.product?._id}`}
                    target="_blank"
                    className="text-[#4A8A90] hover:underline font-medium"
                  >
                    {review.productName || 'N/A'}
                  </Link>
                </div>
                
                {/* Review Content */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-700 mb-3">Review Content</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Rating:</span>
                      {renderStars(review.rating)}
                    </div>
                    {review.title && (
                      <div>
                        <span className="text-sm text-gray-500">Title:</span>
                        <p className="font-medium text-gray-800 mt-1">{review.title}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-sm text-gray-500">Comment:</span>
                      <p className="text-gray-700 mt-1 whitespace-pre-wrap">{review.comment}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-sm text-gray-500">Status:</span>
                      {getStatusBadge(review.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Submitted:</span>
                      <span className="text-sm text-gray-600">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Media */}
                {(review.images?.length > 0 || review.video?.url) && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-700 mb-3">Your Media</h3>
                    {review.images?.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-2">Images ({review.images.length})</p>
                        <div className="grid grid-cols-4 gap-2">
                          {review.images.slice(0, 4).map((img, idx) => (
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
                    {review.video?.url && (
                      <div>
                        <p className="text-xs text-gray-500 mb-2">Video</p>
                        <video
                          src={review.video.url}
                          controls
                          className="w-full rounded-lg max-h-48"
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Admin Reply */}
                {review.reply?.text && (
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <h3 className="font-semibold text-blue-700 mb-2">Admin Response</h3>
                    <p className="text-blue-800">{review.reply.text}</p>
                    <p className="text-xs text-blue-600 mt-2">
                      Replied on {new Date(review.reply.repliedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function CustomerMyReviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const itemsPerPage = 10;

  // Fetch user's reviews
  const fetchMyReviews = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login to view your reviews');
        setLoading(false);
        return;
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/my-reviews`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.data || []);
        setTotalReviews(data.data?.length || 0);
        applyFilters(data.data || [], statusFilter, ratingFilter, searchTerm);
      } else {
        toast.error(data.error || 'Failed to fetch your reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load your reviews');
    } finally {
      setLoading(false);
    }
  };

  // Apply all filters
  const applyFilters = (reviewsList, status, rating, search) => {
    let filtered = [...reviewsList];
    
    if (status !== 'all') {
      filtered = filtered.filter(r => r.status === status);
    }
    
    if (rating !== 'all') {
      const ratingNum = parseInt(rating);
      filtered = filtered.filter(r => r.rating === ratingNum);
    }
    
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(r => 
        r.productName?.toLowerCase().includes(searchLower) ||
        r.title?.toLowerCase().includes(searchLower) ||
        r.comment?.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredReviews(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters(reviews, statusFilter, ratingFilter, searchTerm);
  }, [statusFilter, ratingFilter, searchTerm, reviews]);

  useEffect(() => {
    fetchMyReviews();
  }, []);

  // Update review with media changes
// Update review with media changes
const handleUpdateReview = async (saveData) => {
  if (!selectedReview) return;
  
  setSaving(true);
  try {
    const token = localStorage.getItem('token');
    
    console.log('Sending update data:', saveData); // Debug log
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${selectedReview._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(saveData)
    });
    
    const data = await response.json();
    console.log('Update response:', data); // Debug log
    
    if (data.success) {
      toast.success('Review updated successfully');
      setIsEditModalOpen(false);
      fetchMyReviews(); // Refresh the list
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

  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setStatusFilter('all');
    setRatingFilter('all');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reviews</h1>
          <p className="text-gray-600">View and manage all the reviews you've written</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
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
                <p className="text-sm text-gray-500">Avg Rating</p>
                <p className="text-2xl font-bold text-[#FFD93D]">
                  {reviews.length > 0 
                    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                    : '0'}
                </p>
              </div>
              <Star className="w-8 h-8 text-[#FFD93D] opacity-50 fill-[#FFD93D]" />
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by product or review..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none w-64"
                />
              </div>
              
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
              
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              
              {(statusFilter !== 'all' || ratingFilter !== 'all' || searchTerm) && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
            
         
          </div>
        </div>
        
        {/* Reviews Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#4A8A90]" />
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="text-center py-20">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">
                {reviews.length === 0 
                  ? "You haven't written any reviews yet" 
                  : "No reviews match your filters"}
              </p>
              {reviews.length === 0 ? (
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Browse Products
                </Link>
              ) : (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Rating</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Review</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Date</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedReviews.map((review) => (
                      <tr key={review._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <Link
                            href={`/product/${review.product?.slug || review.product?._id}`}
                            target="_blank"
                            className="text-sm text-[#4A8A90] hover:underline font-medium truncate max-w-[200px] block"
                          >
                            {review.productName || 'N/A'}
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          {renderStars(review.rating)}
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-700 truncate max-w-[250px]">
                            {review.title || review.comment}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(review.status)}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-600 whitespace-nowrap">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedReview(review);
                                setIsViewModalOpen(true);
                              }}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {review.status === 'pending' && (
                              <button
                                onClick={() => {
                                  setSelectedReview(review);
                                  setIsEditModalOpen(true);
                                }}
                                className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredReviews.length)} of {filteredReviews.length} reviews
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
      
      <ViewReviewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        review={selectedReview}
      />
      
      <EditReviewModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        review={selectedReview}
        onSave={handleUpdateReview}
        saving={saving}
      />
    </div>
  );
}