// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Search, 
//   Filter, 
//   Eye, 
//   Edit, 
//   Trash2, 
//   CheckCircle, 
//   XCircle, 
//   Clock, 
//   Star,
//   ChevronLeft,
//   ChevronRight,
//   Loader2,
//   RefreshCw,
//   MessageSquare,
//   Mail,
//   User,
//   Calendar,
//   ExternalLink,

//   ImageIcon,
//    Video
// } from 'lucide-react';
// import { toast } from 'sonner';
// import Link from 'next/link';
// import { useRef } from 'react';

// export default function ManageReviews() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [ratingFilter, setRatingFilter] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalReviews, setTotalReviews] = useState(0);
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [replyText, setReplyText] = useState('');
//   const [isReplying, setIsReplying] = useState(false);
  
//   // Edit form state - moved to parent component
//  // Update the editForm state to include all fields
// // Update editForm state in the parent component
// const [editForm, setEditForm] = useState({
//   rating: 5,
//   title: '',
//   comment: '',
//   status: 'pending',
//   isAnonymous: false,
//   existingImages: [],
//   newImages: [],
//   imagesToDelete: [],
//   existingVideo: null,
//   newVideo: null,
//   videoToDelete: null
// });
//   const [saving, setSaving] = useState(false);
  
//   const itemsPerPage = 10;

//   // Fetch reviews
//   const fetchReviews = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login to manage reviews');
//         setLoading(false);
//         return;
//       }
      
//       let url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews?page=${currentPage}&limit=${itemsPerPage}`;
      
//       if (statusFilter !== 'all') {
//         url += `&status=${statusFilter}`;
//       }
      
//       if (ratingFilter !== 'all') {
//         url += `&rating=${ratingFilter}`;
//       }
      
//       if (searchTerm) {
//         url += `&search=${encodeURIComponent(searchTerm)}`;
//       }
      
//       const response = await fetch(url, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setReviews(data.data || []);
//         setTotalPages(data.pagination?.pages || 1);
//         setTotalReviews(data.pagination?.total || 0);
//       } else {
//         toast.error(data.error || 'Failed to fetch reviews');
//       }
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//       toast.error('Failed to load reviews');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, [currentPage, statusFilter, ratingFilter]);

//   // Handle search with debounce
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchTerm !== undefined) {
//         setCurrentPage(1);
//         fetchReviews();
//       }
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   // Update review status
//   const updateReviewStatus = async (reviewId, status) => {
//     try {
//       const token = localStorage.getItem('token');
//       const endpoint = status === 'approved' 
//         ? `/api/reviews/${reviewId}/approve`
//         : `/api/reviews/${reviewId}/reject`;
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${endpoint}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: status === 'rejected' ? JSON.stringify({ moderationNote: 'Review rejected by admin' }) : undefined
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success(`Review ${status} successfully`);
//         fetchReviews();
//       } else {
//         toast.error(data.error || `Failed to ${status} review`);
//       }
//     } catch (error) {
//       console.error('Error updating review status:', error);
//       toast.error('Failed to update review status');
//     }
//   };

//   // Delete review
//   const deleteReview = async () => {
//     if (!selectedReview) return;
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${selectedReview._id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Review deleted successfully');
//         setIsDeleteModalOpen(false);
//         setSelectedReview(null);
//         fetchReviews();
//       } else {
//         toast.error(data.error || 'Failed to delete review');
//       }
//     } catch (error) {
//       console.error('Error deleting review:', error);
//       toast.error('Failed to delete review');
//     }
//   };

//   // Reply to review
//   const replyToReview = async () => {
//     if (!selectedReview || !replyText.trim()) {
//       toast.error('Please enter a reply');
//       return;
//     }
    
//     setIsReplying(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${selectedReview._id}/reply`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ replyText: replyText.trim() })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Reply added successfully');
//         setReplyText('');
//         setIsViewModalOpen(false);
//         fetchReviews();
//       } else {
//         toast.error(data.error || 'Failed to add reply');
//       }
//     } catch (error) {
//       console.error('Error replying to review:', error);
//       toast.error('Failed to add reply');
//     } finally {
//       setIsReplying(false);
//     }
//   };

// const handleSaveEdit = async () => {
//   if (!editForm.comment.trim() || editForm.comment.trim().length < 10) {
//     toast.error('Comment must be at least 10 characters long');
//     return;
//   }
  
//   setSaving(true);
//   try {
//     const token = localStorage.getItem('token');
    
//     // Prepare update data
//     const updateData = {
//       rating: editForm.rating,
//       title: editForm.title,
//       comment: editForm.comment,
//       status: editForm.status,
//       isAnonymous: editForm.isAnonymous,
//       imagesToDelete: editForm.imagesToDelete.map(img => img.publicId),
//       videoToDelete: editForm.videoToDelete?.publicId || null,
//       newImages: editForm.newImages.filter(img => img.url).map(img => ({
//         url: img.url,
//         publicId: img.publicId
//       })),
//       newVideo: editForm.newVideo?.url ? {
//         url: editForm.newVideo.url,
//         publicId: editForm.newVideo.publicId
//       } : null
//     };
    
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${selectedReview._id}`, {
//       method: 'PUT',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(updateData)
//     });
    
//     const data = await response.json();
    
//     if (data.success) {
//       toast.success('Review updated successfully');
//       setIsEditModalOpen(false);
//       fetchReviews();
//     } else {
//       toast.error(data.error || 'Failed to update review');
//     }
//   } catch (error) {
//     console.error('Error updating review:', error);
//     toast.error('Failed to update review');
//   } finally {
//     setSaving(false);
//   }
// };

//   // Get status badge
//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'approved':
//         return (
//           <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
//             <CheckCircle className="w-3 h-3" />
//             Approved
//           </span>
//         );
//       case 'rejected':
//         return (
//           <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
//             <XCircle className="w-3 h-3" />
//             Rejected
//           </span>
//         );
//       default:
//         return (
//           <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
//             <Clock className="w-3 h-3" />
//             Pending
//           </span>
//         );
//     }
//   };

//   // Render stars
//   const renderStars = (rating) => {
//     return (
//       <div className="flex gap-0.5">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`w-3.5 h-3.5 ${star <= rating ? 'fill-[#FFD93D] text-[#FFD93D]' : 'text-gray-300'}`}
//           />
//         ))}
//       </div>
//     );
//   };

//   // View Review Modal
//   const ViewReviewModal = () => (
//     <AnimatePresence>
//       {isViewModalOpen && selectedReview && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen px-4 py-8">
//             <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsViewModalOpen(false)} />
            
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 20 }}
//               className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
//             >
//               <div className="sticky top-0 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
//                 <div>
//                   <h2 className="text-xl font-bold text-white">Review Details</h2>
//                   <p className="text-white/80 text-sm">Review #{selectedReview._id?.slice(-8)}</p>
//                 </div>
//                 <button
//                   onClick={() => setIsViewModalOpen(false)}
//                   className="p-2 hover:bg-white/20 rounded-full transition-colors"
//                 >
//                   <XCircle className="w-5 h-5 text-white" />
//                 </button>
//               </div>
              
//               <div className="p-6 space-y-4">
//                 {/* Customer Info */}
//                 <div className="bg-gray-50 rounded-xl p-4">
//                   <h3 className="font-semibold text-gray-700 mb-3">Customer Information</h3>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div className="flex items-center gap-2">
//                       <User className="w-4 h-4 text-[#4A8A90]" />
//                       <span className="text-sm text-gray-600">{selectedReview.userName}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Mail className="w-4 h-4 text-[#4A8A90]" />
//                       <span className="text-sm text-gray-600">{selectedReview.email}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Calendar className="w-4 h-4 text-[#4A8A90]" />
//                       <span className="text-sm text-gray-600">
//                         {new Date(selectedReview.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       {getStatusBadge(selectedReview.status)}
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Product Info */}
//                 {selectedReview.product && (
//                   <div className="bg-gray-50 rounded-xl p-4">
//                     <h3 className="font-semibold text-gray-700 mb-3">Product Information</h3>
//                     <Link
//                       href={`/product/${selectedReview.product.slug || selectedReview.product._id}`}
//                       target="_blank"
//                       className="flex items-center gap-3 hover:bg-white p-2 rounded-lg transition-colors"
//                     >
//                       <div className="flex-1">
//                         <p className="font-medium text-gray-800">{selectedReview.productName}</p>
//                         <p className="text-xs text-gray-500">Product ID: {selectedReview.product._id}</p>
//                       </div>
//                       <ExternalLink className="w-4 h-4 text-gray-400" />
//                     </Link>
//                   </div>
//                 )}
                
//                 {/* Review Content */}
//                 <div className="bg-gray-50 rounded-xl p-4">
//                   <h3 className="font-semibold text-gray-700 mb-3">Review Content</h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-500">Rating:</span>
//                       {renderStars(selectedReview.rating)}
//                     </div>
//                     {selectedReview.title && (
//                       <div>
//                         <span className="text-sm text-gray-500">Title:</span>
//                         <p className="font-medium text-gray-800 mt-1">{selectedReview.title}</p>
//                       </div>
//                     )}
//                     <div>
//                       <span className="text-sm text-gray-500">Comment:</span>
//                       <p className="text-gray-700 mt-1 whitespace-pre-wrap">{selectedReview.comment}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Media */}
//                 {(selectedReview.images?.length > 0 || selectedReview.video?.url) && (
//                   <div className="bg-gray-50 rounded-xl p-4">
//                     <h3 className="font-semibold text-gray-700 mb-3">Media Attachments</h3>
//                     {selectedReview.images?.length > 0 && (
//                       <div className="mb-3">
//                         <p className="text-sm text-gray-500 mb-2">Images ({selectedReview.images.length})</p>
//                         <div className="grid grid-cols-4 gap-2">
//                           {selectedReview.images.slice(0, 4).map((img, idx) => (
//                             <img
//                               key={idx}
//                               src={img.url}
//                               alt={`Review image ${idx + 1}`}
//                               className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
//                               onClick={() => window.open(img.url, '_blank')}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                     {selectedReview.video?.url && (
//                       <div>
//                         <p className="text-sm text-gray-500 mb-2">Video</p>
//                         <video
//                           src={selectedReview.video.url}
//                           controls
//                           className="w-full rounded-lg max-h-48"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 )}
                
//                 {/* Admin Reply */}
//                 {selectedReview.reply?.text && (
//                   <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
//                     <h3 className="font-semibold text-blue-700 mb-2">Admin Reply</h3>
//                     <p className="text-blue-800">{selectedReview.reply.text}</p>
//                     <p className="text-xs text-blue-600 mt-2">
//                       Replied on {new Date(selectedReview.reply.repliedAt).toLocaleString()}
//                     </p>
//                   </div>
//                 )}
                
             
                
//                 {/* Actions */}
//                 <div className="flex gap-3 pt-4">
//                   <button
//                     onClick={() => {
//                       setIsViewModalOpen(false);
//                       setIsEditModalOpen(true);
//                     }}
//                     className="flex-1 px-4 py-2 border-2 border-[#4A8A90] text-[#4A8A90] font-semibold rounded-xl hover:bg-[#4A8A90] hover:text-white transition-all"
//                   >
//                     <Edit className="w-4 h-4 inline mr-2" />
//                     Edit Review
//                   </button>
//                   {selectedReview.status === 'pending' && (
//                     <>
//                       <button
//                         onClick={() => updateReviewStatus(selectedReview._id, 'approved')}
//                         className="flex-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all"
//                       >
//                         <CheckCircle className="w-4 h-4 inline mr-2" />
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => updateReviewStatus(selectedReview._id, 'rejected')}
//                         className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
//                       >
//                         <XCircle className="w-4 h-4 inline mr-2" />
//                         Reject
//                       </button>
//                     </>
//                   )}
//                   <button
//                     onClick={() => {
//                       setIsViewModalOpen(false);
//                       setIsDeleteModalOpen(true);
//                     }}
//                     className="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       )}
//     </AnimatePresence>
//   );

// // Edit Review Modal - Updated with media management
// const EditReviewModal = () => {
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const imageInputRef = useRef(null);
//   const videoInputRef = useRef(null);
//   const uploadAbortControllers = useRef({});

//   // Cloudinary configuration
//   const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your_cloud_name';
//   const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'your_upload_preset';

//   // Upload to Cloudinary
//   const uploadToCloudinary = async (file, type, fileId) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
//     const folder = type === 'image' ? 'reviews/images' : 'reviews/videos';
//     formData.append('folder', folder);

//     const abortController = new AbortController();
//     uploadAbortControllers.current[fileId] = abortController;

//     try {
//       const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${type === 'image' ? 'image' : 'video'}/upload`, {
//         method: 'POST',
//         body: formData,
//         signal: abortController.signal
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error?.message || 'Upload failed');
//       }

//       const data = await response.json();
//       return {
//         url: data.secure_url,
//         publicId: data.public_id
//       };
//     } catch (error) {
//       if (error.name === 'AbortError') {
//         return null;
//       }
//       throw error;
//     } finally {
//       delete uploadAbortControllers.current[fileId];
//     }
//   };

//   // Handle image upload
//   const handleImageUpload = async (e) => {
//     const files = Array.from(e.target.files);
    
//     if (editForm.newImages.length + files.length > 4) {
//       toast.error('You can upload up to 4 images total');
//       return;
//     }

//     setUploading(true);
//     setUploadProgress(0);

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
      
//       // Validate image
//       const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
//       if (!validTypes.includes(file.type)) {
//         toast.error('Please upload a valid image file (JPEG, PNG, GIF, WEBP)');
//         setUploading(false);
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Image size must be less than 5MB');
//         setUploading(false);
//         return;
//       }

//       const imageId = Date.now() + i;
      
//       try {
//         const previewUrl = URL.createObjectURL(file);
//         const tempImage = {
//           id: imageId,
//           file,
//           preview: previewUrl,
//           uploading: true,
//           progress: 0,
//           isNew: true
//         };
        
//         setEditForm(prev => ({
//           ...prev,
//           newImages: [...prev.newImages, tempImage]
//         }));

//         const progressInterval = setInterval(() => {
//           setEditForm(prev => ({
//             ...prev,
//             newImages: prev.newImages.map(img =>
//               img.id === imageId
//                 ? { ...img, progress: Math.min((img.progress || 0) + 10, 90) }
//                 : img
//             )
//           }));
//         }, 100);

//         const result = await uploadToCloudinary(file, 'image', imageId);
        
//         clearInterval(progressInterval);
        
//         if (result) {
//           setEditForm(prev => ({
//             ...prev,
//             newImages: prev.newImages.map(img =>
//               img.id === imageId
//                 ? { ...img, url: result.url, publicId: result.publicId, uploading: false, progress: 100 }
//                 : img
//             )
//           }));
//         } else {
//           setEditForm(prev => ({
//             ...prev,
//             newImages: prev.newImages.filter(img => img.id !== imageId)
//           }));
//         }
//       } catch (error) {
//         toast.error(`Failed to upload ${file.name}: ${error.message}`);
//         setEditForm(prev => ({
//           ...prev,
//           newImages: prev.newImages.filter(img => img.id !== imageId)
//         }));
//       }
//     }

//     setUploading(false);
//     setUploadProgress(0);
//     if (imageInputRef.current) imageInputRef.current.value = '';
//   };

//   // Handle video upload
//   const handleVideoUpload = async (e) => {
//     const file = e.target.files[0];
    
//     if (!file) return;
    
//     if (editForm.newVideo) {
//       toast.error('You can upload only 1 video');
//       return;
//     }

//     // Validate video
//     const validTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm'];
//     if (!validTypes.includes(file.type)) {
//       toast.error('Please upload a valid video file (MP4, MOV, WEBM, MPEG)');
//       return;
//     }
//     if (file.size > 50 * 1024 * 1024) {
//       toast.error('Video size must be less than 50MB');
//       return;
//     }

//     setUploading(true);

//     const videoId = Date.now();

//     try {
//       const previewUrl = URL.createObjectURL(file);
//       const tempVideo = {
//         id: videoId,
//         file,
//         preview: previewUrl,
//         uploading: true,
//         progress: 0,
//         isNew: true
//       };
      
//       setEditForm(prev => ({ ...prev, newVideo: tempVideo }));

//       const progressInterval = setInterval(() => {
//         setEditForm(prev => ({
//           ...prev,
//           newVideo: prev.newVideo && prev.newVideo.id === videoId
//             ? { ...prev.newVideo, progress: Math.min((prev.newVideo.progress || 0) + 10, 90) }
//             : prev.newVideo
//         }));
//       }, 100);

//       const result = await uploadToCloudinary(file, 'video', videoId);
      
//       clearInterval(progressInterval);
      
//       if (result) {
//         setEditForm(prev => ({
//           ...prev,
//           newVideo: {
//             ...tempVideo,
//             url: result.url,
//             publicId: result.publicId,
//             uploading: false,
//             progress: 100
//           }
//         }));
//       } else {
//         setEditForm(prev => ({ ...prev, newVideo: null }));
//       }
//     } catch (error) {
//       toast.error(`Failed to upload video: ${error.message}`);
//       setEditForm(prev => ({ ...prev, newVideo: null }));
//     }

//     setUploading(false);
//     if (videoInputRef.current) videoInputRef.current.value = '';
//   };

//   // Remove existing image
//   const removeExistingImage = (index) => {
//     setEditForm(prev => ({
//       ...prev,
//       imagesToDelete: [...prev.imagesToDelete, prev.existingImages[index]],
//       existingImages: prev.existingImages.filter((_, i) => i !== index)
//     }));
//   };

//   // Remove new image
//   const removeNewImage = (id) => {
//     if (uploadAbortControllers.current[id]) {
//       uploadAbortControllers.current[id].abort();
//     }
//     setEditForm(prev => ({
//       ...prev,
//       newImages: prev.newImages.filter(img => img.id !== id)
//     }));
//   };

//   // Remove existing video
//   const removeExistingVideo = () => {
//     setEditForm(prev => ({
//       ...prev,
//       videoToDelete: prev.existingVideo,
//       existingVideo: null
//     }));
//   };

//   // Remove new video
//   const removeNewVideo = () => {
//     if (uploadAbortControllers.current[editForm.newVideo?.id]) {
//       uploadAbortControllers.current[editForm.newVideo.id].abort();
//     }
//     setEditForm(prev => ({ ...prev, newVideo: null }));
//   };

//   return (
//     <AnimatePresence>
//       {isEditModalOpen && selectedReview && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen px-4 py-8">
//             <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)} />
            
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 20 }}
//               className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
//             >
//               <div className="sticky top-0 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] px-6 py-4 rounded-t-2xl">
//                 <h2 className="text-xl font-bold text-white">Edit Review</h2>
//                 <p className="text-white/80 text-sm mt-1">Customer: {selectedReview.userName}</p>
//               </div>
              
//               <div className="p-6 space-y-5">
//                 {/* Rating */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Rating <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex gap-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button
//                         key={star}
//                         type="button"
//                         onClick={() => setEditForm({ ...editForm, rating: star })}
//                         className="focus:outline-none transition-transform hover:scale-110"
//                       >
//                         <Star
//                           className={`w-8 h-8 ${
//                             star <= editForm.rating
//                               ? 'fill-[#FFD93D] text-[#FFD93D]'
//                               : 'text-gray-300'
//                           } transition-colors`}
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 </div>
                
//                 {/* Title */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Review Title</label>
//                   <input
//                     type="text"
//                     value={editForm.title}
//                     onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
//                     className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
//                     placeholder="Review title"
//                     maxLength={100}
//                   />
//                 </div>
                
//                 {/* Comment */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Comment <span className="text-red-500">*</span></label>
//                   <textarea
//                     value={editForm.comment}
//                     onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
//                     rows={4}
//                     className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none resize-none"
//                     placeholder="Review comment"
//                   />
//                 </div>
                
//                 {/* Status */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
//                   <div className="flex gap-3">
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="status"
//                         value="pending"
//                         checked={editForm.status === 'pending'}
//                         onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
//                         className="w-4 h-4 text-yellow-500"
//                       />
//                       <span className="text-sm">Pending</span>
//                     </label>
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="status"
//                         value="approved"
//                         checked={editForm.status === 'approved'}
//                         onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
//                         className="w-4 h-4 text-green-500"
//                       />
//                       <span className="text-sm">Approved</span>
//                     </label>
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="status"
//                         value="rejected"
//                         checked={editForm.status === 'rejected'}
//                         onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
//                         className="w-4 h-4 text-red-500"
//                       />
//                       <span className="text-sm">Rejected</span>
//                     </label>
//                   </div>
//                 </div>
                
//                 {/* Media Attachments Section */}
//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/30">
//                   <label className="block text-sm font-semibold text-gray-700 mb-3">
//                     Media Attachments
//                   </label>
                  
//                   {/* Existing Images */}
//                   {editForm.existingImages.length > 0 && (
//                     <div className="mb-4">
//                       <p className="text-xs text-gray-500 mb-2">Current Images ({editForm.existingImages.length})</p>
//                       <div className="grid grid-cols-4 gap-3">
//                         {editForm.existingImages.map((img, idx) => (
//                           <div key={idx} className="relative group">
//                             <img
//                               src={img.url}
//                               alt={`Review image ${idx + 1}`}
//                               className="w-full h-20 object-cover rounded-lg"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeExistingImage(idx)}
//                               className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                             >
//                               <Trash2 className="w-3 h-3" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* New Images */}
//                   {editForm.newImages.length > 0 && (
//                     <div className="mb-4">
//                       <p className="text-xs text-gray-500 mb-2">New Images ({editForm.newImages.length})</p>
//                       <div className="grid grid-cols-4 gap-3">
//                         {editForm.newImages.map((img) => (
//                           <div key={img.id} className="relative group">
//                             <div className="relative">
//                               <img
//                                 src={img.preview}
//                                 alt="New review image"
//                                 className="w-full h-20 object-cover rounded-lg"
//                               />
//                               {img.uploading && (
//                                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
//                                   <Loader2 className="w-4 h-4 animate-spin text-white" />
//                                 </div>
//                               )}
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => removeNewImage(img.id)}
//                               className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                             >
//                               <Trash2 className="w-3 h-3" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* Add Image Button */}
//                   <div
//                     onClick={() => imageInputRef.current?.click()}
//                     className="border-2 border-dashed border-gray-300 rounded-xl p-3 text-center cursor-pointer hover:border-[#4A8A90] hover:bg-gray-50 transition-all mb-4"
//                   >
//                     <input
//                       ref={imageInputRef}
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       onChange={handleImageUpload}
//                       className="hidden"
//                       disabled={uploading}
//                     />
//                     <ImageIcon className="w-5 h-5 text-gray-400 mx-auto mb-1" />
//                     <p className="text-xs text-gray-600">Add more images (Max 4 total)</p>
//                   </div>
                  
//                   {/* Existing Video */}
//                   {editForm.existingVideo && (
//                     <div className="mb-4">
//                       <p className="text-xs text-gray-500 mb-2">Current Video</p>
//                       <div className="relative group">
//                         <video
//                           src={editForm.existingVideo.url}
//                           controls
//                           className="w-full rounded-lg max-h-32"
//                         />
//                         <button
//                           type="button"
//                           onClick={removeExistingVideo}
//                           className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           <Trash2 className="w-3 h-3" />
//                         </button>
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* New Video */}
//                   {editForm.newVideo && (
//                     <div className="mb-4">
//                       <p className="text-xs text-gray-500 mb-2">New Video</p>
//                       <div className="relative group">
//                         <video
//                           src={editForm.newVideo.preview}
//                           controls
//                           className="w-full rounded-lg max-h-32"
//                         />
//                         {editForm.newVideo.uploading && (
//                           <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
//                             <Loader2 className="w-6 h-6 animate-spin text-white" />
//                           </div>
//                         )}
//                         <button
//                           type="button"
//                           onClick={removeNewVideo}
//                           className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           <Trash2 className="w-3 h-3" />
//                         </button>
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* Add Video Button */}
//                   {!editForm.existingVideo && !editForm.newVideo && (
//                     <div
//                       onClick={() => videoInputRef.current?.click()}
//                       className="border-2 border-dashed border-gray-300 rounded-xl p-3 text-center cursor-pointer hover:border-[#4A8A90] hover:bg-gray-50 transition-all"
//                     >
//                       <input
//                         ref={videoInputRef}
//                         type="file"
//                         accept="video/*"
//                         onChange={handleVideoUpload}
//                         className="hidden"
//                         disabled={uploading}
//                       />
//                       <Video className="w-5 h-5 text-gray-400 mx-auto mb-1" />
//                       <p className="text-xs text-gray-600">Add video (Max 1)</p>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Anonymous Flag */}
//                 {!selectedReview.isGuest && (
//                   <div>
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={editForm.isAnonymous}
//                         onChange={(e) => setEditForm({ ...editForm, isAnonymous: e.target.checked })}
//                         className="w-4 h-4 text-[#4A8A90] rounded"
//                       />
//                       <span className="text-sm text-gray-700">Post as anonymous</span>
//                     </label>
//                   </div>
//                 )}
                
//                 {/* Actions */}
//                 <div className="flex gap-3 pt-4">
//                   <button
//                     onClick={() => setIsEditModalOpen(false)}
//                     className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSaveEdit}
//                     disabled={saving || uploading}
//                     className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
//                   >
//                     {saving ? (
//                       <div className="flex items-center justify-center gap-2">
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         Saving...
//                       </div>
//                     ) : (
//                       'Save Changes'
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

//   // Delete Confirmation Modal
//   const DeleteConfirmationModal = () => (
//     <AnimatePresence>
//       {isDeleteModalOpen && selectedReview && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen px-4 py-8">
//             <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)} />
            
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 20 }}
//               className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl"
//             >
//               <div className="bg-red-500 px-6 py-4 rounded-t-2xl">
//                 <h2 className="text-xl font-bold text-white">Delete Review</h2>
//               </div>
              
//               <div className="p-6">
//                 <p className="text-gray-700 mb-4">
//                   Are you sure you want to delete this review from <strong>{selectedReview.userName}</strong>?
//                 </p>
//                 <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
                
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setIsDeleteModalOpen(false)}
//                     className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={deleteReview}
//                     className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       )}
//     </AnimatePresence>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Reviews</h1>
//           <p className="text-gray-600">View, moderate, and manage customer reviews</p>
//         </div>
        
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Total Reviews</p>
//                 <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
//               </div>
//               <MessageSquare className="w-8 h-8 text-[#4A8A90] opacity-50" />
//             </div>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Pending</p>
//                 <p className="text-2xl font-bold text-yellow-600">
//                   {reviews.filter(r => r.status === 'pending').length}
//                 </p>
//               </div>
//               <Clock className="w-8 h-8 text-yellow-500 opacity-50" />
//             </div>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Approved</p>
//                 <p className="text-2xl font-bold text-green-600">
//                   {reviews.filter(r => r.status === 'approved').length}
//                 </p>
//               </div>
//               <CheckCircle className="w-8 h-8 text-green-500 opacity-50" />
//             </div>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Rejected</p>
//                 <p className="text-2xl font-bold text-red-600">
//                   {reviews.filter(r => r.status === 'rejected').length}
//                 </p>
//               </div>
//               <XCircle className="w-8 h-8 text-red-500 opacity-50" />
//             </div>
//           </div>
//         </div>
        
//         {/* Filters */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
//           <div className="flex flex-wrap gap-4 items-center justify-between">
//             <div className="flex flex-wrap gap-3">
//               {/* Search */}
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search reviews..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none w-64"
//                 />
//               </div>
              
//               {/* Status Filter */}
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
//               >
//                 <option value="all">All Status</option>
//                 <option value="pending">Pending</option>
//                 <option value="approved">Approved</option>
//                 <option value="rejected">Rejected</option>
//               </select>
              
//               {/* Rating Filter */}
//               <select
//                 value={ratingFilter}
//                 onChange={(e) => setRatingFilter(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
//               >
//                 <option value="all">All Ratings</option>
//                 <option value="5">5 Stars</option>
//                 <option value="4">4 Stars & Up</option>
//                 <option value="3">3 Stars & Up</option>
//                 <option value="2">2 Stars & Up</option>
//                 <option value="1">1 Star</option>
//               </select>
//             </div>
            
//             {/* Refresh Button */}
//             <button
//               onClick={fetchReviews}
//               className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//               title="Refresh"
//             >
//               <RefreshCw className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
        
//         {/* Reviews Table - No horizontal scrollbar */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//           {loading ? (
//             <div className="flex items-center justify-center py-20">
//               <Loader2 className="w-8 h-8 animate-spin text-[#4A8A90]" />
//             </div>
//           ) : reviews.length === 0 ? (
//             <div className="text-center py-20">
//               <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-500">No reviews found</p>
//             </div>
//           ) : (
//             <>
//               <div className="overflow-x-auto" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
//                 <table className="w-full min-w-[800px]">
//                   <thead className="bg-gray-50 border-b border-gray-200">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Customer</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Product</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Rating</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Review</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Status</th>
 
//                       <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {reviews.map((review) => (
//                       <tr key={review._id} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-4 py-3">
//                           <div className="flex flex-col">
//                             <span className="font-medium text-gray-900 text-sm truncate max-w-[150px]">{review.userName}</span>
//                             <span className="text-xs text-gray-500 truncate max-w-[150px]">{review.email}</span>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <span className="text-sm text-gray-700 truncate max-w-[200px] block">
//                             {review.productName || 'N/A'}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3">
//                           {renderStars(review.rating)}
//                         </td>
//                         <td className="px-4 py-3">
//                           <p className="text-sm text-gray-700 truncate max-w-[250px]">{review.title}</p>
//                         </td>
//                         <td className="px-4 py-3">
//                           {getStatusBadge(review.status)}
//                         </td>
                      
//                         <td className="px-4 py-3 text-right">
//                           <div className="flex items-center justify-end gap-1">
//                             <button
//                               onClick={() => {
//                                 setSelectedReview(review);
//                                 setReplyText(review.reply?.text || '');
//                                 setIsViewModalOpen(true);
//                               }}
//                               className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                               title="View"
//                             >
//                               <Eye className="w-4 h-4" />
//                             </button>
//                             {review.status === 'pending' && (
//                               <>
//                                 <button
//                                   onClick={() => updateReviewStatus(review._id, 'approved')}
//                                   className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                                   title="Approve"
//                                 >
//                                   <CheckCircle className="w-4 h-4" />
//                                 </button>
//                                 <button
//                                   onClick={() => updateReviewStatus(review._id, 'rejected')}
//                                   className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                                   title="Reject"
//                                 >
//                                   <XCircle className="w-4 h-4" />
//                                 </button>
//                               </>
//                             )}
//          <button
//   onClick={() => {
//     setSelectedReview(review);
//     setEditForm({
//       rating: review.rating,
//       title: review.title || '',
//       comment: review.comment,
//       status: review.status || 'pending',
//       isAnonymous: review.isAnonymous || false,
//       existingImages: review.images || [],
//       newImages: [],
//       imagesToDelete: [],
//       existingVideo: review.video || null,
//       newVideo: null,
//       videoToDelete: null
//     });
//     setIsEditModalOpen(true);
//   }}
//   className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
//   title="Edit"
// >
//   <Edit className="w-4 h-4" />
// </button>
//                             <button
//                               onClick={() => {
//                                 setSelectedReview(review);
//                                 setIsDeleteModalOpen(true);
//                               }}
//                               className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                               title="Delete"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
//                   <div className="text-sm text-gray-600">
//                     Page {currentPage} of {totalPages}
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                       disabled={currentPage === 1}
//                       className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                     >
//                       <ChevronLeft className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                       disabled={currentPage === totalPages}
//                       className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                     >
//                       <ChevronRight className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
      
//       {/* Modals */}
//       <ViewReviewModal />
//       <EditReviewModal />
//       <DeleteConfirmationModal />
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
  Trash2, 
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
  
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

// Move EditReviewModal outside as a separate component
const EditReviewModal = ({ 
  isOpen, 
  onClose, 
  review, 
  onSave,
  saving 
}) => {
  
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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
  // Add this function inside EditReviewModal component after the Cloudinary config
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
      // Revoke object URLs
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
  });
};

const renderStars = (rating, setRating = false) => {
  // Add safe check
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
                {!review.isGuest && (
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
                )}
                
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

// Main component continues below...
export default function ManageReviews() {
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
      
      let url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews?page=${currentPage}&limit=${itemsPerPage}`;
      
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

  // Update review status
  const updateReviewStatus = async (reviewId, status) => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = status === 'approved' 
        ? `/api/reviews/${reviewId}/approve`
        : `/api/reviews/${reviewId}/reject`;
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: status === 'rejected' ? JSON.stringify({ moderationNote: 'Review rejected by admin' }) : undefined
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
  const toggleFeatured = async (reviewId, currentStatus) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${reviewId}/featured`, {
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

  // Delete review
  const deleteReview = async () => {
    if (!selectedReview) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${selectedReview._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Review deleted successfully');
        setIsDeleteModalOpen(false);
        setSelectedReview(null);
        fetchReviews();
      } else {
        toast.error(data.error || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${selectedReview._id}/reply`, {
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
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${selectedReview._id}`, {
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
                
             
             
                
                {/* Actions */}
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
                  <button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      setIsDeleteModalOpen(true);
                    }}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  // Delete Confirmation Modal
  const DeleteConfirmationModal = () => (
    <AnimatePresence>
      {isDeleteModalOpen && selectedReview && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl"
            >
              <div className="bg-red-500 px-6 py-4 rounded-t-2xl">
                <h2 className="text-xl font-bold text-white">Delete Review</h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Are you sure you want to delete this review from <strong>{selectedReview.userName}</strong>?
                </p>
                <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteReview}
                    className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
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
            <div className="flex  flex-wrap gap-3">
              {/* Search */}
              <div className="relative ">
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
                <option value="2">2 Stars </option>
                <option value="1">1 Star</option>
              </select>
            </div>
            
           
          
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
                        {/* <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
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
      <button
  onClick={() => {
    // First set the selected review
    setSelectedReview(review);
    // Use setTimeout to ensure state is updated before opening modal
    setTimeout(() => {
      setIsEditModalOpen(true);
    }, 0);
  }}
  className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
  title="Edit"
>
  <Edit className="w-4 h-4" />
</button>
                            <button
                              onClick={() => {
                                setSelectedReview(review);
                                setIsDeleteModalOpen(true);
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td> */}

                        
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
    
    {/* Delete button */}
    <button
      onClick={() => {
        setSelectedReview(review);
        setIsDeleteModalOpen(true);
      }}
      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      title="Delete"
    >
      <Trash2 className="w-4 h-4" />
    </button>
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
      <DeleteConfirmationModal />
    </div>
  );
}