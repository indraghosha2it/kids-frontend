
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, AlertCircle, CheckCircle, Upload, Image as ImageIcon, Video, Trash2, Loader2, ChevronDown, Search, Sparkles, Gift, Rocket, Shield, Crown } from 'lucide-react';

export default function ReviewModal({ isOpen, onClose, onReviewSubmitted }) {
  const [formData, setFormData] = useState({
    reviewerName: '',
    email: '',
    rating: 0,
    productId: '',
    productName: '',
    title: '',
    comment: ''
  });
  
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const productDropdownRef = useRef(null);
  const uploadAbortControllers = useRef({});
  const closeTimeoutRef = useRef(null);

  // Cloudinary configuration
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your_cloud_name';
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'your_upload_preset';

  // Check auth status - this runs every time modal opens
  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const userDataFromStorage = localStorage.getItem('user');
    
    if (token && userDataFromStorage) {
      try {
        const parsedUser = JSON.parse(userDataFromStorage);
        setIsLoggedIn(true);
        setUserData(parsedUser);
        setUserRole(parsedUser.role);
        
        // Only set form data if modal is open and user is logged in (and not admin/moderator)
        if (isOpen && parsedUser.role !== 'admin' && parsedUser.role !== 'moderator') {
          const userName = parsedUser.contactPerson || 
                          parsedUser.companyName || 
                          (parsedUser.email ? parsedUser.email.split('@')[0] : '') || 
                          'User';
          
          const userEmail = parsedUser.email || '';
          
          setFormData(prev => ({
            ...prev,
            reviewerName: userName,
            email: userEmail
          }));
        }
        return true;
      } catch (error) {
        console.error('Error parsing user data:', error);
        clearUserData();
        return false;
      }
    } else {
      clearUserData();
      return false;
    }
  };

  // Clear all user-related data
  const clearUserData = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setUserRole(null);
    setFormData(prev => ({
      ...prev,
      reviewerName: '',
      email: ''
    }));
  };

  // Add this function after the imports
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

// Add this function after compressImageSmart
const compressVideo = async (file) => {
  return new Promise((resolve, reject) => {
    // Create video element
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    video.preload = 'metadata';
    video.src = URL.createObjectURL(file);
    
    video.onloadedmetadata = () => {
      // Set canvas dimensions (reduce resolution for smaller size)
      let width = video.videoWidth;
      let height = video.videoHeight;
      
      // Reduce resolution to 720p max for reviews
      const MAX_WIDTH = 720;
      const MAX_HEIGHT = 720;
      
      if (width > MAX_WIDTH) {
        height = (height * MAX_WIDTH) / width;
        width = MAX_WIDTH;
      }
      if (height > MAX_HEIGHT) {
        width = (width * MAX_HEIGHT) / height;
        height = MAX_HEIGHT;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      video.currentTime = 0;
    };
    
    video.onseeked = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get the first frame as preview
      canvas.toBlob(
        (blob) => {
          console.log(`🎥 Video frame captured: ${(blob.size / 1024).toFixed(0)}KB`);
          
          // Note: Browser video compression is limited
          // For better compression, we'll rely on Cloudinary's transformations
          console.log(`⚠️ Original video size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
          
          // Return original but add Cloudinary compression parameters
          resolve(file);
        },
        'image/jpeg',
        0.7
      );
    };
    
    video.onerror = () => reject(new Error('Failed to load video'));
  });
};

  // Fetch user data when modal opens
  useEffect(() => {
    if (isOpen) {
      // Reset all form data first
      resetForm();
      setShowSuccessMessage(false);
      setSuccess('');
      // Then check auth and load user data if logged in
      checkAuthStatus();
      fetchProducts();
    }
    
    // Cleanup timeout on close
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  // Fetch products for dropdown
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await fetch('http://localhost:5000/api/products?limit=100');
      const data = await response.json();
      let productsList = [];
      if (data.success) {
        productsList = data.data || [];
      } else if (Array.isArray(data)) {
        productsList = data;
      } else if (data.products) {
        productsList = data.products;
      }
      setProducts(productsList);
      setFilteredProducts(productsList);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Filter products based on search
  useEffect(() => {
    if (productSearchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.productName.toLowerCase().includes(productSearchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [productSearchTerm, products]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productDropdownRef.current && !productDropdownRef.current.contains(event.target)) {
        setIsProductDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const resetMedia = () => {
    imageFiles.forEach(image => {
      if (image.preview) URL.revokeObjectURL(image.preview);
    });
    if (videoFile?.preview) URL.revokeObjectURL(videoFile.preview);
    
    setImageFiles([]);
    setVideoFile(null);
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateImage = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, GIF, WEBP)');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return false;
    }
    return true;
  };

  const validateVideo = (file) => {
    const validTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid video file (MP4, MOV, WEBM, MPEG)');
      return false;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError('Video size must be less than 50MB');
      return false;
    }
    return true;
  };

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
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (imageFiles.length + files.length > 4) {
      setError('You can upload up to 4 images only');
      return;
    }

    setUploading(true);
    setError('');

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!validateImage(file)) {
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
          progress: 0
        };
        
        setImageFiles(prev => [...prev, tempImage]);

        const progressInterval = setInterval(() => {
          setImageFiles(prev =>
            prev.map(img =>
              img.id === imageId
                ? { ...img, progress: Math.min((img.progress || 0) + 10, 90) }
                : img
            )
          );
        }, 100);

        const result = await uploadToCloudinary(file, 'image', imageId);
        
        clearInterval(progressInterval);
        
        if (result) {
          setImageFiles(prev =>
            prev.map(img =>
              img.id === imageId
                ? { ...img, url: result.url, publicId: result.publicId, uploading: false, progress: 100 }
                : img
            )
          );
        } else {
          setImageFiles(prev => prev.filter(img => img.id !== imageId));
        }
      } catch (error) {
        setError(`Failed to upload ${file.name}: ${error.message}`);
        setImageFiles(prev => prev.filter(img => img.id !== imageId));
      }
    }

    setUploading(false);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    if (videoFile) {
      setError('You can upload only 1 video');
      return;
    }

    if (!validateVideo(file)) {
      return;
    }

    setUploading(true);
    setError('');

    const videoId = Date.now();

    try {
      const previewUrl = URL.createObjectURL(file);
      const tempVideo = {
        id: videoId,
        file,
        preview: previewUrl,
        uploading: true,
        progress: 0
      };
      
      setVideoFile(tempVideo);

      const progressInterval = setInterval(() => {
        setVideoFile(prev =>
          prev && prev.id === videoId
            ? { ...prev, progress: Math.min((prev.progress || 0) + 10, 90) }
            : prev
        );
      }, 100);

      const result = await uploadToCloudinary(file, 'video', videoId);
      
      clearInterval(progressInterval);
      
      if (result) {
        setVideoFile({
          ...tempVideo,
          url: result.url,
          publicId: result.publicId,
          uploading: false,
          progress: 100
        });
      } else {
        setVideoFile(null);
      }
    } catch (error) {
      setError(`Failed to upload video: ${error.message}`);
      setVideoFile(null);
    }

    setUploading(false);
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const removeImage = (id) => {
    if (uploadAbortControllers.current[id]) {
      uploadAbortControllers.current[id].abort();
      delete uploadAbortControllers.current[id];
    }
    
    const imageToRemove = imageFiles.find(img => img.id === id);
    if (imageToRemove?.preview) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    
    setImageFiles(prev => prev.filter(img => img.id !== id));
    setError('');
  };

  const removeVideo = () => {
    if (videoFile && uploadAbortControllers.current[videoFile.id]) {
      uploadAbortControllers.current[videoFile.id].abort();
    }
    
    if (videoFile?.preview) {
      URL.revokeObjectURL(videoFile.preview);
    }
    setVideoFile(null);
    setError('');
  };

  const handleProductSelect = (product) => {
    setFormData(prev => ({
      ...prev,
      productId: product._id,
      productName: product.productName
    }));
    setIsProductDropdownOpen(false);
    setProductSearchTerm('');
  };

  const handleImageError = (productId) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.reviewerName.trim()) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('Please enter your email');
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (formData.rating === 0) {
      setError('Please select a rating');
      setLoading(false);
      return;
    }

    if (!formData.comment.trim() || formData.comment.trim().length < 10) {
      setError('Review must be at least 10 characters long');
      setLoading(false);
      return;
    }

    if (imageFiles.some(img => img.uploading) || (videoFile?.uploading)) {
      setError('Please wait for all uploads to complete');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      const requestBody = {
        rating: formData.rating,
        reviewerName: formData.reviewerName,
        email: formData.email,
        title: formData.title.trim() || '',
        comment: formData.comment.trim(),
        isAnonymous: false,
        images: imageFiles.filter(img => img.url).map(img => ({
          url: img.url,
          publicId: img.publicId
        })),
        video: videoFile?.url ? {
          url: videoFile.url,
          publicId: videoFile.publicId
        } : null
      };

      if (formData.productId) {
        requestBody.productId = formData.productId;
        requestBody.productName = formData.productName;
      }

      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (data.success) {
        // Show success message instead of form
        setShowSuccessMessage(true);
        setSuccess('Your review has been submitted successfully!');
        
        // Close modal after 2 seconds
        closeTimeoutRef.current = setTimeout(() => {
          onReviewSubmitted?.();
          onClose();
          resetForm();
          setShowSuccessMessage(false);
          setSuccess('');
        }, 2000);
      } else {
        setError(data.error || data.message || 'Failed to submit review.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      reviewerName: '',
      email: '',
      rating: 0,
      productId: '',
      productName: '',
      title: '',
      comment: ''
    });
    resetMedia();
    setError('');
    setSuccess('');
    setHoveredRating(0);
    setProductSearchTerm('');
    setImageErrors({});
    setShowSuccessMessage(false);
    
    // Clear upload controllers
    Object.keys(uploadAbortControllers.current).forEach(key => {
      if (uploadAbortControllers.current[key]) {
        uploadAbortControllers.current[key].abort();
      }
    });
    uploadAbortControllers.current = {};
  };

  const handleClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    resetForm();
    onClose();
  };

  // Check if user is admin or moderator
  const isAdminOrModerator = userRole === 'admin' || userRole === 'moderator';

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            {/* Simple dark backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Modal - White background with border */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#FFD93D]/40"
            >
              {/* Fun Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl relative">
                <div>
                  <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                    {showSuccessMessage ? 'Thank You! 🎉' : (isAdminOrModerator ? 'Access Restricted' : 'Share Your Experience 🎈')}
                  </h2>
                  <p className="text-white/80 text-sm mt-1" style={{ fontFamily: "'Comic Neue', cursive" }}>
                    {showSuccessMessage 
                      ? 'Your review has been submitted successfully!' 
                      : (isAdminOrModerator 
                        ? 'Admins and Moderators cannot write reviews' 
                        : 'Your feedback helps us make better toys!')}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Form Body */}
              <div className="p-6 bg-white relative z-10">
                {showSuccessMessage ? (
                  // Success Message View
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                      Review Submitted! 🎉
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Thank you for sharing your experience. Your review will be published after moderation.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Closing in a moment...
                    </div>
                  </motion.div>
                ) : isAdminOrModerator ? (
                  // Admin/Moderator Restriction Message
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      {userRole === 'admin' ? (
                        <Crown className="w-10 h-10 text-yellow-600" />
                      ) : (
                        <Shield className="w-10 h-10 text-yellow-600" />
                      )}
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                      {userRole === 'admin' ? 'Admin Access' : 'Moderator Access'}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {userRole === 'admin' 
                        ? 'Admins are not allowed to write product reviews.' 
                        : 'Moderators are not allowed to write product reviews.'}
                    </p>
                    <p className="text-sm text-gray-500">
                      This feature is available for customers only.
                    </p>
                  </motion.div>
                ) : (
                  // Normal Review Form
                  <>
                    {/* Success Message (inline) */}
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <p className="text-sm text-green-700">{success}</p>
                      </motion.div>
                    )}

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-sm text-red-700">{error}</p>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name and Email in one row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Comic Neue', cursive" }}>
                            Your Name *
                          </label>
                          <input
                            type="text"
                            name="reviewerName"
                            value={formData.reviewerName}
                            onChange={handleChange}
                            disabled={isLoggedIn}
                            className={`w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition-all ${
                              isLoggedIn ? 'bg-gray-50 text-gray-500' : ''
                            }`}
                            placeholder="Enter your full name"
                            required
                          />
                          {isLoggedIn && (
                            <p className="text-xs text-gray-400 mt-1">Auto-filled from your account</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Comic Neue', cursive" }}>
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isLoggedIn}
                            className={`w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition-all ${
                              isLoggedIn ? 'bg-gray-50 text-gray-500' : ''
                            }`}
                            placeholder="your@email.com"
                            required
                          />
                          {isLoggedIn && (
                            <p className="text-xs text-gray-400 mt-1">Auto-filled from your account</p>
                          )}
                        </div>
                      </div>

                      {/* Rating Stars */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Comic Neue', cursive" }}>
                          Rating *
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleRatingClick(star)}
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(0)}
                              className="focus:outline-none transition-transform hover:scale-110"
                            >
                              <Star
                                className={`w-8 h-8 ${
                                  star <= (hoveredRating || formData.rating)
                                    ? 'fill-[#FFD93D] text-[#FFD93D]'
                                    : 'text-gray-300'
                                } transition-colors`}
                              />
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {formData.rating === 0 && 'Click to rate'}
                          {formData.rating === 1 && 'Poor'}
                          {formData.rating === 2 && 'Fair'}
                          {formData.rating === 3 && 'Good'}
                          {formData.rating === 4 && 'Very Good'}
                          {formData.rating === 5 && 'Excellent'}
                        </p>
                      </div>

                      {/* Product Dropdown with Image */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Comic Neue', cursive" }}>
                          Select Product 🎁 (Optional)
                        </label>
                        <div className="relative" ref={productDropdownRef}>
                          <div
                            onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-white cursor-pointer flex items-center justify-between hover:border-[#4A8A90] transition-all"
                          >
                            <span className={formData.productName ? 'text-gray-900' : 'text-gray-400'}>
                              {formData.productName || '-- Select a product --'}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isProductDropdownOpen ? 'rotate-180' : ''}`} />
                          </div>

                          {isProductDropdownOpen && (
                            <div className="absolute z-20 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden">
                              <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-[#4A8A90]/5 to-[#FFB6C1]/5">
                                <div className="relative">
                                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <input
                                    type="text"
                                    value={productSearchTerm}
                                    onChange={(e) => setProductSearchTerm(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full pl-9 pr-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
                                    autoFocus
                                  />
                                </div>
                              </div>

                              <div className="max-h-64 overflow-y-auto">
                                {loadingProducts ? (
                                  <div className="p-8 text-center">
                                    <Loader2 className="w-6 h-6 animate-spin text-[#4A8A90] mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">Loading products...</p>
                                  </div>
                                ) : filteredProducts.length > 0 ? (
                                  filteredProducts.map((product) => (
                                    <div
                                      key={product._id}
                                      onClick={() => handleProductSelect(product)}
                                      className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-[#4A8A90]/5 hover:to-[#FFB6C1]/5 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                                    >
                                      {product.images && product.images[0] && !imageErrors[product._id] ? (
                                        <img
                                          src={product.images[0].url || product.images[0]}
                                          alt={product.productName}
                                          className="w-12 h-12 rounded-lg object-cover border-2 border-gray-200"
                                          onError={() => handleImageError(product._id)}
                                        />
                                      ) : (
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center">
                                          <Gift className="w-6 h-6 text-white" />
                                        </div>
                                      )}
                                      <div className="flex-1">
                                        <p className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "'Comic Neue', cursive" }}>
                                          {product.productName}
                                        </p>
                                        {product.regularPrice && (
                                          <div className="flex items-center gap-2 mt-0.5">
                                            {product.discountPrice && product.discountPrice > 0 ? (
                                              <>
                                                <span className="text-xs text-[#FF7B54] font-bold">
                                                  BDT {product.discountPrice.toLocaleString()}
                                                </span>
                                                <span className="text-xs text-gray-400 line-through">
                                                  BDT {product.regularPrice.toLocaleString()}
                                                </span>
                                              </>
                                            ) : (
                                              <span className="text-xs text-[#4A8A90] font-bold">
                                                BDT {product.regularPrice.toLocaleString()}
                                              </span>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                      <Rocket className="w-4 h-4 text-gray-300 group-hover:text-[#4A8A90] transition-colors" />
                                    </div>
                                  ))
                                ) : (
                                  <div className="p-8 text-center">
                                    <p className="text-sm text-gray-500">No products found 🎈</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Review Title */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Comic Neue', cursive" }}>
                          Review Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition-all"
                          placeholder="e.g., Great quality product!"
                          maxLength={100}
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          {formData.title.length}/100 characters
                        </p>
                      </div>

                      {/* Your Review */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Comic Neue', cursive" }}>
                          Your Review *
                        </label>
                        <textarea
                          name="comment"
                          value={formData.comment}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition-all resize-none"
                          placeholder="Share your experience with our products and services..."
                          minLength={10}
                          maxLength={500}
                          required
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Minimum 10 characters • {formData.comment.length}/500 characters
                        </p>
                      </div>

                      {/* Media Upload Section */}
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/30">
                        <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "'Comic Neue', cursive" }}>
                          Add Photos & Videos 📸 (Optional)
                        </label>
                        
                        {/* Images Upload */}
                        <div className="mb-4">
                          <div
                            onClick={() => imageInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-[#4A8A90] hover:bg-gray-50 transition-all"
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
                            <ImageIcon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload photos</p>
                            <p className="text-xs text-gray-400 mt-1">JPEG, PNG, GIF, WEBP up to 5MB each (Max 4)</p>
                          </div>

                          {imageFiles.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                              {imageFiles.map((image) => (
                                <div key={image.id} className="relative group">
                                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                                    <img
                                      src={image.preview}
                                      alt="Review"
                                      className="w-full h-full object-cover"
                                    />
                                    {image.uploading && (
                                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                                        <Loader2 className="w-6 h-6 animate-spin text-white mb-1" />
                                        <span className="text-xs text-white">{image.progress}%</span>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <button
                                    type="button"
                                    onClick={() => removeImage(image.id)}
                                    className={`absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full transition-opacity ${
                                      image.uploading 
                                        ? 'opacity-100'
                                        : 'opacity-0 group-hover:opacity-100'
                                    }`}
                                    title={image.uploading ? "Cancel upload" : "Delete image"}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Video Upload */}
                        <div>
                          {!videoFile ? (
                            <div
                              onClick={() => videoInputRef.current?.click()}
                              className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-[#4A8A90] hover:bg-gray-50 transition-all"
                            >
                              <input
                                ref={videoInputRef}
                                type="file"
                                accept="video/*"
                                onChange={handleVideoUpload}
                                className="hidden"
                                disabled={uploading}
                              />
                              <Video className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">Click to upload video</p>
                              <p className="text-xs text-gray-400 mt-1">MP4, MOV, WEBM up to 50MB (Max 1)</p>
                            </div>
                          ) : (
                            <div className="relative group">
                              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                                <video src={videoFile.preview} className="w-full h-full object-cover" />
                                {videoFile.uploading && (
                                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                                    <Loader2 className="w-6 h-6 animate-spin text-white mb-1" />
                                    <span className="text-xs text-white">{videoFile.progress}%</span>
                                  </div>
                                )}
                                {!videoFile.uploading && (
                                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                    <Video className="w-12 h-12 text-white" />
                                  </div>
                                )}
                              </div>
                              
                              <button
                                type="button"
                                onClick={removeVideo}
                                className={`absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full transition-opacity ${
                                  videoFile.uploading 
                                    ? 'opacity-100'
                                    : 'opacity-0 group-hover:opacity-100'
                                }`}
                                title={videoFile.uploading ? "Cancel upload" : "Delete video"}
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>

                        <p className="text-xs text-gray-400 mt-3">
                          {imageFiles.length}/4 images • {videoFile ? '1/1 video' : '0/1 video'}
                        </p>
                      </div>

                      {/* Fun Note */}
                      <div className="bg-gradient-to-r from-[#4A8A90]/10 to-[#FFB6C1]/10 border-2 border-[#FFD93D]/30 rounded-xl p-4">
                        <p className="text-xs text-[#4A8A90] flex items-center justify-center gap-2" style={{ fontFamily: "'Comic Neue', cursive" }}>
                          <Sparkles className="w-3 h-3 animate-pulse" />
                          Your review helps other parents choose the perfect toys for their little ones!
                          <Sparkles className="w-3 h-3 animate-pulse" />
                        </p>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={handleClose}
                          className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300"
                          style={{ fontFamily: "'Comic Neue', cursive" }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading || uploading}
                          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}
                        >
                          {loading ? (
                            <div className="flex items-center justify-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Submitting...
                            </div>
                          ) : (
                            'Submit Review 🎈'
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}