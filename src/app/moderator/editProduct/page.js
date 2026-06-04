
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import NextLink from 'next/link';
// import { 
//   Plus, 
//   X, 
//   Save, 
//   ArrowLeft,
//   Image as ImageIcon,
//   AlertCircle,
//   Loader2,
//   Trash2,
//   Upload,
//   Package,
//   DollarSign,
//   Tag,
//   Info,
//   Star,
//   Video,
//   Hash,
//   Type,
//   Layers,
//   Gift,
//   Sparkles,
//   ChevronDown,
//   Clock,
//   Edit3,
//   Eye,
//   GripVertical,
//   Youtube,
//   Link as LinkIcon
// } from 'lucide-react';
// import { toast } from 'sonner';
// import { MantineProvider } from '@mantine/core';
// import { RichTextEditor } from '@mantine/tiptap';
// import { useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import TextAlign from '@tiptap/extension-text-align';
// import TiptapLink from '@tiptap/extension-link';

// import '@mantine/tiptap/styles.css';
// import '@mantine/core/styles.css';

// // Age group options
// const AGE_GROUPS = [
//   { value: '0-2', label: '0-2 years', icon: '👶' },
//   { value: '3-5', label: '3-5 years', icon: '🧒' },
//   { value: '6-10', label: '6-10 years', icon: '👧' },
//   { value: '11-14', label: '11-14 years', icon: '🧑' }
// ];

// // Kids toy specific tags
// const AVAILABLE_TAGS = [
//   'Best Seller',
//   'New Arrival',
//   'Limited Edition',
//   'Eco-Friendly',
//   'Educational',
//   'STEM Toy',
//   'Montessori',
//   'Creative Play',
//   'Outdoor Fun',
//   'Battery Included',
//   'Non-Toxic',
//   'Award Winner',
//   'Musical Toy',
//   'Interactive',
//   'Light Up',
//   'Remote Control',
//   'Building Set',
//   'Puzzle Game',
//   'Art & Craft',
//   'Pretend Play'
// ];

// // Promotion options
// const PROMOTION_OPTIONS = [
//   { value: 'flash-sale', label: 'Flash Sale', icon: '⚡', color: '#FF6B6B' },
//   { value: 'new-arrival', label: 'New Arrival', icon: '⭐', color: '#FFD93D' },
//   { value: 'trending', label: 'Trending Now', icon: '🔥', color: '#FF8C42' },
//   { value: 'clearance', label: 'Clearance Sale', icon: '💨', color: '#4ECDC4' },
//   { value: 'holiday-special', label: 'Holiday Special', icon: '🎄', color: '#2ECC71' },
//   { value: 'bundle-deal', label: 'Bundle Deal', icon: '🎁', color: '#9B59B6' },
//   { value: 'limited-stock', label: 'Limited Stock', icon: '⚠️', color: '#E74C3C' }
// ];

// const compressImageSmart = async (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
    
//     reader.onload = (event) => {
//       const img = new Image();
//       img.src = event.target.result;
      
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = img.width;
//         canvas.height = img.height;
        
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
//         // MORE AGGRESSIVE compression - target under 300KB
//         let quality = 0.4; // Default 40% quality
        
//         if (file.size > 5 * 1024 * 1024) {
//           quality = 0.25; // 25% quality for 5MB+ files
//         } else if (file.size > 2 * 1024 * 1024) {
//           quality = 0.3; // 30% quality for 2-5MB files
//         } else if (file.size > 1 * 1024 * 1024) {
//           quality = 0.35; // 35% quality for 1-2MB files
//         } else if (file.size > 500 * 1024) {
//           quality = 0.45; // 45% quality for 500KB-1MB files
//         } else {
//           quality = 0.55; // 55% quality for smaller files
//         }
        
//         canvas.toBlob(
//           (blob) => {
//             const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
//               type: 'image/jpeg',
//               lastModified: Date.now(),
//             });
//             const reduction = ((file.size - blob.size) / file.size * 100).toFixed(1);
//             console.log(`📸 Compressed: ${(file.size / 1024).toFixed(0)}KB → ${(blob.size / 1024).toFixed(0)}KB (${reduction}% reduction)`);
//             resolve(compressedFile);
//           },
//           'image/jpeg',
//           quality
//         );
//       };
      
//       img.onerror = () => reject(new Error('Failed to load image'));
//     };
    
//     reader.onerror = () => reject(new Error('Failed to read file'));
//   });
// };

// // Cloudinary upload function
// // const uploadToCloudinary = async (file) => {
// //   const formData = new FormData();
// //   formData.append('file', file);
// //   formData.append('upload_preset', 'toys-products');
  
// //   try {
// //     const response = await fetch(
// //       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
// //       {
// //         method: 'POST',
// //         body: formData,
// //       }
// //     );
    
// //     const data = await response.json();
// //     if (data.secure_url) {
// //       return {
// //         url: data.secure_url,
// //         publicId: data.public_id,
// //       };
// //     } else {
// //       throw new Error('Upload failed');
// //     }
// //   } catch (error) {
// //     console.error('Cloudinary upload error:', error);
// //     throw error;
// //   }
// // };

// const uploadToCloudinary = async (file) => {
//   // Client-side compression only
//   const compressedFile = await compressImageSmart(file);
  
//   const formData = new FormData();
//   formData.append('file', compressedFile);
//   formData.append('upload_preset', 'toys-products');
  
//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//       {
//         method: 'POST',
//         body: formData,
//       }
//     );
    
//     const data = await response.json();
//     if (data.secure_url) {
//       console.log(`✅ Image uploaded successfully`);
//       return {
//         url: data.secure_url,
//         publicId: data.public_id,
//       };
//     } else {
//       throw new Error('Upload failed');
//     }
//   } catch (error) {
//     console.error('Cloudinary upload error:', error);
//     throw error;
//   }
// };

// // Upload video to Cloudinary
// // const uploadVideoToCloudinary = async (file) => {
// //   const formData = new FormData();
// //   formData.append('file', file);
// //   formData.append('upload_preset', 'toys-products');
// //   formData.append('resource_type', 'video');
  
// //   try {
// //     const response = await fetch(
// //       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
// //       {
// //         method: 'POST',
// //         body: formData,
// //       }
// //     );
    
// //     const data = await response.json();
// //     if (data.secure_url) {
// //       return {
// //         url: data.secure_url,
// //         publicId: data.public_id,
// //       };
// //     } else {
// //       throw new Error('Upload failed');
// //     }
// //   } catch (error) {
// //     console.error('Cloudinary video upload error:', error);
// //     throw error;
// //   }
// // };

// const uploadVideoToCloudinary = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', 'toys-products');
//   // Do NOT include resource_type: 'video'
  
//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
//       {
//         method: 'POST',
//         body: formData,
//       }
//     );
    
//     const data = await response.json();
//     if (data.secure_url) {
//       toast.success('Video uploaded and compressed successfully!');
//       return {
//         url: data.secure_url,
//         publicId: data.public_id,
//       };
//     } else {
//       throw new Error('Upload failed');
//     }
//   } catch (error) {
//     console.error('Cloudinary video upload error:', error);
//     toast.error('Failed to upload video');
//     throw error;
//   }
// };


// // Extract YouTube video ID from URL
// const getYouTubeVideoId = (url) => {
//   const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

// export default function ModeratorEditToyProduct() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get('id');
  
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSavingDraft, setIsSavingDraft] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [childSubcategories, setChildSubcategories] = useState([]);
//   const [isMounted, setIsMounted] = useState(false);
//   const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
//   const [showMeta, setShowMeta] = useState(false);
//   const [lastSaved, setLastSaved] = useState(null);
//   const [originalProduct, setOriginalProduct] = useState(null);
//   const [keywordInput, setKeywordInput] = useState('');
  
//   // Video upload type: 'upload' or 'youtube'
//   const [videoType, setVideoType] = useState('upload');
//   const [youtubeUrl, setYoutubeUrl] = useState('');
  
//   // Drag and drop state
//   const [draggedIndex, setDraggedIndex] = useState(null);
//   const [dragOverIndex, setDragOverIndex] = useState(null);
//   const [imagesToDelete, setImagesToDelete] = useState([]);

//   const fileInputRefs = useRef([]);
//   const videoInputRef = useRef(null);
//   const autoSaveTimerRef = useRef(null);

//   const [formData, setFormData] = useState({
//     productName: '',
//     shortDescription: '',
//     fullDescription: '',
//     category: '',
//     subcategory: '',
//     childSubcategory: '',
//     brand: '',
//     ageGroup: '',
//     stockQuantity: 0,
//     regularPrice: 0,
//     discountPrice: 0,
//     deliveryInfo: '',
//     codAvailable: false,
//     tags: [],
//     promotion: '',
//     isFeatured: false,
//     rating: 0,
//     additionalInfo: [],
//     videoUrl: '',
//     videoPublicId: '',
//     videoType: 'upload',
//     metaSettings: {
//       metaTitle: '',
//       metaDescription: '',
//       metaKeywords: []
//     }
//   });

//   // Product Images State (up to 6 images)
//   const [productImages, setProductImages] = useState([
//     { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null, isPrimary: false },
//     { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null, isPrimary: false },
//     { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null, isPrimary: false },
//     { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null, isPrimary: false },
//     { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null, isPrimary: false },
//     { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null, isPrimary: false }
//   ]);

//   // Video upload state
//   const [videoUpload, setVideoUpload] = useState({
//     file: null,
//     preview: null,
//     uploading: false,
//     error: '',
//     url: null,
//     publicId: null,
//     isNew: false
//   });

//   const [additionalInfoInput, setAdditionalInfoInput] = useState({ fieldName: '', fieldValue: '' });
//   const [ratingHover, setRatingHover] = useState(0);
//   const [errors, setErrors] = useState({});

//   const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
//   const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
//   const maxFileSize = 5 * 1024 * 1024;
//   const maxVideoSize = 100 * 1024 * 1024;

//   // Editor setup
//   const [isEditorReady, setIsEditorReady] = useState(false);
//   const [isInstructionEditorReady, setIsInstructionEditorReady] = useState(false);
//   const [isDeliveryEditorReady, setIsDeliveryEditorReady] = useState(false);

//   const shortDescEditor = useEditor({
//     extensions: [
//       StarterKit,
//       TiptapLink.configure({ openOnClick: false }),
//       TextAlign.configure({ types: ['heading', 'paragraph'] }),
//     ],
//     content: '',
//     onUpdate: ({ editor }) => {
//       setFormData(prev => ({ ...prev, shortDescription: editor.getHTML() }));
//     },
//     onReady: () => {
//       setIsEditorReady(true);
//     },
//     immediatelyRender: false,
//   });

//   const fullDescEditor = useEditor({
//     extensions: [
//       StarterKit,
//       TiptapLink.configure({ openOnClick: false }),
//       TextAlign.configure({ types: ['heading', 'paragraph'] }),
//     ],
//     content: '',
//     onUpdate: ({ editor }) => {
//       setFormData(prev => ({ ...prev, fullDescription: editor.getHTML() }));
//     },
//     onReady: () => {
//       setIsInstructionEditorReady(true);
//     },
//     immediatelyRender: false,
//   });

//   const deliveryInfoEditor = useEditor({
//     extensions: [
//       StarterKit,
//       TiptapLink.configure({ openOnClick: false }),
//       TextAlign.configure({ types: ['heading', 'paragraph'] }),
//     ],
//     content: '',
//     onUpdate: ({ editor }) => {
//       setFormData(prev => ({ ...prev, deliveryInfo: editor.getHTML() }));
//     },
//     onReady: () => {
//       setIsDeliveryEditorReady(true);
//     },
//     immediatelyRender: false,
//   });

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!productId) {
//       toast.error('No product ID provided');
//       router.push('/moderator/all-products');
//     } else {
//       fetchCategories();
//       fetchProduct();
//     }
//   }, [productId]);

//   useEffect(() => {
//     if (formData.category) {
//       fetchSubcategories(formData.category);
//     } else {
//       setSubcategories([]);
//       setChildSubcategories([]);
//     }
//   }, [formData.category]);

//   useEffect(() => {
//     if (formData.category && formData.subcategory) {
//       fetchChildSubcategories(formData.category, formData.subcategory);
//     } else {
//       setChildSubcategories([]);
//     }
//   }, [formData.subcategory]);

//   // Sync editor content
//   useEffect(() => {
//     if (shortDescEditor && originalProduct?.shortDescription) {
//       const currentContent = shortDescEditor.getHTML();
//       if (currentContent !== originalProduct.shortDescription) {
//         shortDescEditor.commands.setContent(originalProduct.shortDescription);
//       }
//     }
//   }, [shortDescEditor, originalProduct?.shortDescription]);

//   useEffect(() => {
//     if (fullDescEditor && originalProduct?.fullDescription) {
//       const currentContent = fullDescEditor.getHTML();
//       if (currentContent !== originalProduct.fullDescription) {
//         fullDescEditor.commands.setContent(originalProduct.fullDescription);
//       }
//     }
//   }, [fullDescEditor, originalProduct?.fullDescription]);

//   useEffect(() => {
//     if (deliveryInfoEditor && originalProduct?.deliveryInfo) {
//       const currentContent = deliveryInfoEditor.getHTML();
//       if (currentContent !== originalProduct.deliveryInfo) {
//         deliveryInfoEditor.commands.setContent(originalProduct.deliveryInfo);
//       }
//     }
//   }, [deliveryInfoEditor, originalProduct?.deliveryInfo]);

//   useEffect(() => {
//     if (isEditorReady && originalProduct?.shortDescription && shortDescEditor) {
//       const currentContent = shortDescEditor.getHTML();
//       if (currentContent !== originalProduct.shortDescription) {
//         shortDescEditor.commands.setContent(originalProduct.shortDescription);
//       }
//     }
//   }, [isEditorReady, originalProduct?.shortDescription, shortDescEditor]);

//   useEffect(() => {
//     if (isInstructionEditorReady && originalProduct?.fullDescription && fullDescEditor) {
//       const currentContent = fullDescEditor.getHTML();
//       if (currentContent !== originalProduct.fullDescription) {
//         fullDescEditor.commands.setContent(originalProduct.fullDescription);
//       }
//     }
//   }, [isInstructionEditorReady, originalProduct?.fullDescription, fullDescEditor]);

//   useEffect(() => {
//     if (isDeliveryEditorReady && originalProduct?.deliveryInfo && deliveryInfoEditor) {
//       const currentContent = deliveryInfoEditor.getHTML();
//       if (currentContent !== originalProduct.deliveryInfo) {
//         deliveryInfoEditor.commands.setContent(originalProduct.deliveryInfo);
//       }
//     }
//   }, [isDeliveryEditorReady, originalProduct?.deliveryInfo, deliveryInfoEditor]);

//   const fetchCategories = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/categories', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setCategories(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       toast.error('Failed to fetch categories');
//     }
//   };

//   const fetchSubcategories = async (categoryId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setSubcategories(data.data.subcategories);
//       } else {
//         setSubcategories([]);
//       }
//     } catch (error) {
//       console.error('Error fetching subcategories:', error);
//       setSubcategories([]);
//     }
//   };

//   const fetchChildSubcategories = async (categoryId, subcategoryId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setChildSubcategories(data.data.children);
//       } else {
//         setChildSubcategories([]);
//       }
//     } catch (error) {
//       console.error('Error fetching child subcategories:', error);
//       setChildSubcategories([]);
//     }
//   };

//   const fetchProduct = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       const data = await response.json();
//       console.log('Product data:', data);
      
//       if (data.success) {
//         const product = data.data.product;
        
//         setOriginalProduct(product);
        
//         setFormData({
//           productName: product.productName || '',
//           shortDescription: product.shortDescription || '',
//           fullDescription: product.fullDescription || '',
//           category: product.category?._id || product.category || '',
//           subcategory: product.subcategory || '',
//           childSubcategory: product.childSubcategory || '',
//           brand: product.brand || '',
//           ageGroup: product.ageGroup || '',
//           stockQuantity: product.stockQuantity || 0,
//           regularPrice: product.regularPrice || 0,
//           discountPrice: product.discountPrice || 0,
//           deliveryInfo: product.deliveryInfo || '',
//           codAvailable: product.codAvailable || false,
//           tags: product.tags || [],
//           promotion: product.promotion || '',
//           isFeatured: product.isFeatured || false,
//           rating: product.rating || 0,
//           additionalInfo: product.additionalInfo || [],
//           videoUrl: product.videoUrl || '',
//           videoPublicId: product.videoPublicId || '',
//           videoType: product.videoType || 'upload',
//           metaSettings: product.metaSettings || {
//             metaTitle: '',
//             metaDescription: '',
//             metaKeywords: []
//           }
//         });

//         // Set video data
//         if (product.videoUrl && product.videoType === 'youtube') {
//           setVideoType('youtube');
//           setYoutubeUrl(product.videoUrl);
//         } else if (product.videoUrl) {
//           setVideoType('upload');
//           setVideoUpload({
//             file: null,
//             preview: product.videoUrl,
//             uploading: false,
//             error: '',
//             url: product.videoUrl,
//             publicId: product.videoPublicId,
//             isNew: false
//           });
//         }

//         // Set product images
//         if (product.images && product.images.length > 0) {
//           const updatedImages = [...productImages];
//           product.images.forEach((image, idx) => {
//             if (idx < 6) {
//               updatedImages[idx] = {
//                 id: `existing_${idx}`,
//                 file: null,
//                 preview: image.url,
//                 error: '',
//                 url: image.url,
//                 publicId: image.publicId,
//                 uploading: false,
//                 isNew: false,
//                 uploadAborted: false,
//                 uploadBatchId: null,
//                 isPrimary: idx === 0
//               };
//             }
//           });
//           setProductImages(updatedImages);
//         }
        
//         // Fetch subcategories for the selected category
//         if (product.category?._id || product.category) {
//           const categoryId = product.category?._id || product.category;
//           await fetchSubcategories(categoryId);
          
//           if (product.subcategory) {
//             setFormData(prev => ({ ...prev, subcategory: product.subcategory }));
//             await fetchChildSubcategories(categoryId, product.subcategory);
            
//             if (product.childSubcategory) {
//               setFormData(prev => ({ ...prev, childSubcategory: product.childSubcategory }));
//             }
//           }
//         }

//       } else {
//         toast.error('Failed to fetch product details');
//         router.push('/moderator/all-products');
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       toast.error('Failed to fetch product details');
//       router.push('/moderator/all-products');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const validateImageFile = (file) => {
//     if (!allowedImageTypes.includes(file.type)) {
//       return { valid: false, message: `Invalid format. Allowed: JPG, PNG, WebP, GIF` };
//     }
//     if (file.size > maxFileSize) {
//       return { valid: false, message: `File too large. Max: 5MB` };
//     }
//     return { valid: true };
//   };

//   // Single image upload
//   const handleImageChange = async (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (productImages[index].preview?.startsWith('blob:')) {
//       URL.revokeObjectURL(productImages[index].preview);
//     }

//     const validation = validateImageFile(file);
//     if (!validation.valid) {
//       const updatedImages = [...productImages];
//       updatedImages[index] = { ...updatedImages[index], error: validation.message };
//       setProductImages(updatedImages);
//       toast.error(`Image ${index + 1}: ${validation.message}`);
//       return;
//     }

//     const previewUrl = URL.createObjectURL(file);
//     const batchId = Date.now();
//     const imageId = `new_${batchId}_${index}`;
    
//     const updatedImages = [...productImages];
//     updatedImages[index] = {
//       id: imageId,
//       file: file,
//       preview: previewUrl,
//       error: '',
//       uploading: true,
//       url: null,
//       publicId: null,
//       isNew: true,
//       uploadAborted: false,
//       uploadBatchId: batchId,
//       isPrimary: false
//     };
//     setProductImages(updatedImages);

//     try {
//       const { url, publicId } = await uploadToCloudinary(file);
      
//       setProductImages(prevImages => {
//         const updated = [...prevImages];
//         if (updated[index] && updated[index].uploadBatchId === batchId && !updated[index].uploadAborted) {
//           updated[index] = {
//             ...updated[index],
//             url: url,
//             publicId: publicId,
//             uploading: false
//           };
//         }
//         return updated;
//       });
//       toast.success(`Image ${index + 1} uploaded successfully`);
//     } catch (error) {
//       setProductImages(prevImages => {
//         const updated = [...prevImages];
//         if (updated[index] && updated[index].uploadBatchId === batchId) {
//           updated[index] = {
//             ...updated[index],
//             error: 'Failed to upload image',
//             uploading: false,
//             preview: null,
//             file: null,
//             isNew: false
//           };
//         }
//         return updated;
//       });
//       toast.error(`Failed to upload image ${index + 1}`);
//     }
//   };

//   // Multiple image upload
//   const handleMultipleImageSelect = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;
    
//     const currentImagesCount = productImages.filter(img => img.url !== null || img.uploading).length;
//     const availableSlots = 6 - currentImagesCount;
    
//     if (files.length > availableSlots) {
//       toast.error(`You can only upload ${availableSlots} more image(s). Maximum 6 images total.`);
//       if (fileInputRefs.current['multiple']) {
//         fileInputRefs.current['multiple'].value = '';
//       }
//       return;
//     }
    
//     const emptySlots = [];
//     for (let i = 0; i < productImages.length; i++) {
//       if (!productImages[i].url && !productImages[i].uploading && !productImages[i].preview) {
//         emptySlots.push(i);
//       }
//     }
    
//     if (files.length > emptySlots.length) {
//       toast.error(`Only ${emptySlots.length} slots available. Please remove some images first.`);
//       if (fileInputRefs.current['multiple']) {
//         fileInputRefs.current['multiple'].value = '';
//       }
//       return;
//     }
    
//     const batchId = Date.now();
    
//     for (let i = 0; i < files.length && i < emptySlots.length; i++) {
//       const file = files[i];
//       const slotIndex = emptySlots[i];
      
//       const validation = validateImageFile(file);
//       if (!validation.valid) {
//         toast.error(`Image ${i + 1}: ${validation.message}`);
//         continue;
//       }
      
//       const previewUrl = URL.createObjectURL(file);
//       const imageId = `new_${batchId}_${slotIndex}`;
      
//       setProductImages(prevImages => {
//         const updated = [...prevImages];
//         updated[slotIndex] = {
//           id: imageId,
//           file: file,
//           preview: previewUrl,
//           error: '',
//           uploading: true,
//           url: null,
//           publicId: null,
//           isNew: true,
//           uploadAborted: false,
//           uploadBatchId: batchId,
//           isPrimary: false
//         };
//         return updated;
//       });
      
//       try {
//         const { url, publicId } = await uploadToCloudinary(file);
//         setProductImages(prevImages => {
//           const updated = [...prevImages];
//           if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId && !updated[slotIndex].uploadAborted) {
//             updated[slotIndex] = {
//               ...updated[slotIndex],
//               url: url,
//               publicId: publicId,
//               uploading: false
//             };
//           }
//           return updated;
//         });
//         toast.success(`Image uploaded to slot ${slotIndex + 1}`);
//       } catch (error) {
//         setProductImages(prevImages => {
//           const updated = [...prevImages];
//           if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId) {
//             updated[slotIndex] = {
//               ...updated[slotIndex],
//               error: 'Failed to upload image',
//               uploading: false,
//               preview: null,
//               file: null,
//               isNew: false
//             };
//           }
//           return updated;
//         });
//         toast.error(`Failed to upload image to slot ${slotIndex + 1}`);
//       }
//     }
    
//     if (fileInputRefs.current['multiple']) {
//       fileInputRefs.current['multiple'].value = '';
//     }
//   };

//   // Drag and drop functions for image reordering
//   const moveImage = (fromIndex, toIndex) => {
//     const updatedImages = [...productImages];
//     const [movedImage] = updatedImages.splice(fromIndex, 1);
//     updatedImages.splice(toIndex, 0, movedImage);
//     setProductImages(updatedImages);
//   };

//   const handleDragStart = (index) => {
//     if (productImages[index].preview && !productImages[index].uploading) {
//       setDraggedIndex(index);
//     }
//   };

//   const handleDragOverWithFeedback = (event, index) => {
//     event.preventDefault();
//     if (productImages[index].preview && !productImages[index].uploading) {
//       setDragOverIndex(index);
//     }
//   };

//   const handleDragLeave = () => {
//     setDragOverIndex(null);
//   };

//   const handleDropWithFeedback = (dropIndex) => {
//     if (draggedIndex === null || draggedIndex === dropIndex) {
//       setDragOverIndex(null);
//       setDraggedIndex(null);
//       return;
//     }
//     if (!productImages[draggedIndex]?.uploading && !productImages[dropIndex]?.uploading) {
//       moveImage(draggedIndex, dropIndex);
//     } else {
//       toast.error('Cannot reorder images while uploading');
//     }
//     setDraggedIndex(null);
//     setDragOverIndex(null);
//   };

//   const handleDragEnd = () => {
//     setDraggedIndex(null);
//     setDragOverIndex(null);
//   };

//   const removeImage = (index) => {
//     const imageToRemove = productImages[index];
    
//     setProductImages(prevImages => {
//       const updated = [...prevImages];
//       if (updated[index]) {
//         updated[index].uploadAborted = true;
//       }
//       return updated;
//     });
    
//     // If it's an existing image (not new), mark for deletion
//     if (!imageToRemove.isNew && imageToRemove.publicId) {
//       setImagesToDelete(prev => [...prev, imageToRemove.publicId]);
//     }
    
//     if (imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) {
//       URL.revokeObjectURL(imageToRemove.preview);
//     }
    
//     const updatedImages = [...productImages];
//     updatedImages[index] = { 
//       id: null,
//       file: null, 
//       preview: null, 
//       error: '', 
//       url: null, 
//       publicId: null, 
//       uploading: false,
//       isNew: false,
//       uploadAborted: false,
//       uploadBatchId: null,
//       isPrimary: false
//     };
//     setProductImages(updatedImages);
    
//     if (fileInputRefs.current[index]) {
//       fileInputRefs.current[index].value = '';
//     }
    
//     toast.success(`Image removed from slot ${index + 1}`);
//   };

//   // Video upload handlers
//   const handleVideoFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (videoUpload.preview?.startsWith('blob:')) {
//       URL.revokeObjectURL(videoUpload.preview);
//     }

//     if (!allowedVideoTypes.includes(file.type)) {
//       setVideoUpload({ ...videoUpload, error: 'Invalid format. Allowed: MP4, WebM, OGG, MOV' });
//       toast.error('Invalid video format');
//       return;
//     }

//     if (file.size > maxVideoSize) {
//       setVideoUpload({ ...videoUpload, error: `File too large. Max: 100MB` });
//       toast.error('Video too large. Max 100MB');
//       return;
//     }

//     const previewUrl = URL.createObjectURL(file);
//     setVideoUpload({
//       file: file,
//       preview: previewUrl,
//       uploading: true,
//       error: '',
//       url: null,
//       publicId: null,
//       isNew: true
//     });

//     try {
//       const { url, publicId } = await uploadVideoToCloudinary(file);
//       setVideoUpload({
//         file: file,
//         preview: previewUrl,
//         uploading: false,
//         error: '',
//         url: url,
//         publicId: publicId,
//         isNew: true
//       });
//       setFormData(prev => ({ ...prev, videoUrl: url, videoPublicId: publicId, videoType: 'upload' }));
//       toast.success('Video uploaded successfully');
//     } catch (error) {
//       setVideoUpload({
//         ...videoUpload,
//         error: 'Failed to upload video',
//         uploading: false,
//         preview: null,
//         file: null,
//         isNew: false
//       });
//       toast.error('Failed to upload video');
//     }
//   };

//   const handleYoutubeUrlChange = (url) => {
//     setYoutubeUrl(url);
//     const videoId = getYouTubeVideoId(url);
//     if (videoId) {
//       const embedUrl = `https://www.youtube.com/embed/${videoId}`;
//       setFormData(prev => ({ ...prev, videoUrl: embedUrl, videoType: 'youtube' }));
//       if (videoUpload.preview?.startsWith('blob:')) {
//         URL.revokeObjectURL(videoUpload.preview);
//       }
//       setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null, isNew: false });
//       toast.success('YouTube link added successfully');
//     } else if (url === '') {
//       setFormData(prev => ({ ...prev, videoUrl: '', videoType: 'upload' }));
//     }
//   };

//   const removeVideo = () => {
//     if (videoUpload.url && !videoUpload.isNew && videoUpload.publicId) {
//       setImagesToDelete(prev => [...prev, videoUpload.publicId]);
//     }
    
//     if (videoUpload.preview?.startsWith('blob:')) {
//       URL.revokeObjectURL(videoUpload.preview);
//     }
//     setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null, isNew: false });
//     setYoutubeUrl('');
//     setFormData(prev => ({ ...prev, videoUrl: '', videoPublicId: '', videoType: 'upload' }));
//     if (videoInputRef.current) videoInputRef.current.value = '';
//     toast.success('Video removed');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };

//   const handleNumberChange = (e) => {
//     const { name, value } = e.target;
//     const numValue = value === '' ? 0 : parseFloat(value);
//     setFormData(prev => ({ ...prev, [name]: numValue }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };

//   const handleTagToggle = (tag) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.includes(tag) 
//         ? prev.tags.filter(t => t !== tag)
//         : [...prev.tags, tag]
//     }));
//   };

//   const handlePromotionSelect = (value) => {
//     setFormData(prev => ({ ...prev, promotion: prev.promotion === value ? '' : value }));
//   };

//   const handleRatingChange = (rating) => {
//     setFormData(prev => ({ ...prev, rating }));
//   };

//   const addAdditionalInfo = () => {
//     if (additionalInfoInput.fieldName.trim() && additionalInfoInput.fieldValue.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         additionalInfo: [
//           ...prev.additionalInfo,
//           { fieldName: additionalInfoInput.fieldName.trim(), fieldValue: additionalInfoInput.fieldValue.trim() }
//         ]
//       }));
//       setAdditionalInfoInput({ fieldName: '', fieldValue: '' });
//       toast.success('Additional info added');
//     } else {
//       toast.error('Please fill both field name and value');
//     }
//   };

//   const removeAdditionalInfo = (index) => {
//     const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
//     setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
//     toast.success('Item removed');
//   };

//   const addKeyword = () => {
//     if (!keywordInput.trim()) return;
    
//     const keywordsToAdd = keywordInput
//       .split(',')
//       .map(k => k.trim())
//       .filter(k => k !== '');
    
//     setFormData(prev => ({
//       ...prev,
//       metaSettings: {
//         ...prev.metaSettings,
//         metaKeywords: [...(prev.metaSettings.metaKeywords || []), ...keywordsToAdd]
//       }
//     }));
//     setKeywordInput('');
//   };

//   const removeKeyword = (indexToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       metaSettings: {
//         ...prev.metaSettings,
//         metaKeywords: prev.metaSettings.metaKeywords.filter((_, index) => index !== indexToRemove)
//       }
//     }));
//   };

//   const handleMetaChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       metaSettings: { ...prev.metaSettings, [field]: value }
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
//     if (!formData.shortDescription || formData.shortDescription === '<p></p>') newErrors.shortDescription = 'Short description is required';
//     if (!formData.fullDescription || formData.fullDescription === '<p></p>') newErrors.fullDescription = 'Full description is required';
//     if (!formData.category) newErrors.category = 'Category is required';
//     if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
//     if (formData.stockQuantity < 0) newErrors.stockQuantity = 'Stock quantity cannot be negative';
//     if (formData.regularPrice <= 0) newErrors.regularPrice = 'Regular price must be greater than 0';
//     if (formData.discountPrice > formData.regularPrice) newErrors.discountPrice = 'Discount price cannot exceed regular price';
//     if (!formData.deliveryInfo || formData.deliveryInfo === '<p></p>') newErrors.deliveryInfo = 'Delivery information is required';
//     if (formData.metaSettings.metaTitle?.length > 70) newErrors.metaTitle = 'Meta title should not exceed 70 characters';
//     if (formData.metaSettings.metaDescription?.length > 160) newErrors.metaDescription = 'Meta description should not exceed 160 characters';

//     const hasImages = productImages.some(img => img.url !== null);
//     if (!hasImages) newErrors.images = 'At least one product image is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const hasChanges = () => {
//     if (!originalProduct) return false;
    
//     if (formData.productName !== originalProduct.productName) return true;
//     if (formData.shortDescription !== originalProduct.shortDescription) return true;
//     if (formData.fullDescription !== originalProduct.fullDescription) return true;
//     if (formData.category !== (originalProduct.category?._id || originalProduct.category)) return true;
//     if (formData.subcategory !== (originalProduct.subcategory || '')) return true;
//     if (formData.childSubcategory !== (originalProduct.childSubcategory || '')) return true;
//     if (formData.brand !== originalProduct.brand) return true;
//     if (formData.ageGroup !== originalProduct.ageGroup) return true;
//     if (Number(formData.stockQuantity) !== Number(originalProduct.stockQuantity)) return true;
//     if (Number(formData.regularPrice) !== Number(originalProduct.regularPrice)) return true;
//     if (Number(formData.discountPrice) !== Number(originalProduct.discountPrice)) return true;
//     if (formData.deliveryInfo !== originalProduct.deliveryInfo) return true;
//     if (formData.codAvailable !== originalProduct.codAvailable) return true;
//     if (JSON.stringify(formData.tags) !== JSON.stringify(originalProduct.tags || [])) return true;
//     if (formData.promotion !== originalProduct.promotion) return true;
//     if (formData.isFeatured !== originalProduct.isFeatured) return true;
//     if (Number(formData.rating) !== Number(originalProduct.rating)) return true;
//     if (JSON.stringify(formData.additionalInfo) !== JSON.stringify(originalProduct.additionalInfo || [])) return true;
//     if (JSON.stringify(formData.metaSettings) !== JSON.stringify(originalProduct.metaSettings || {})) return true;
    
//     const currentImageUrls = productImages
//       .filter(img => img.url !== null && !img.uploading && !img.uploadAborted && !img.isNew)
//       .map(img => img.url);
//     const originalImageUrls = (originalProduct.images || []).map(img => img.url);
//     if (JSON.stringify(currentImageUrls) !== JSON.stringify(originalImageUrls)) return true;
    
//     const hasNewImages = productImages.some(img => img.isNew && img.url !== null);
//     if (hasNewImages) return true;
    
//     if (formData.videoUrl !== (originalProduct.videoUrl || '')) return true;
    
//     if (imagesToDelete.length > 0) return true;
    
//     return false;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const uploading = productImages.some(img => img.uploading) || videoUpload.uploading;
//     if (uploading) {
//       toast.error('Please wait for all uploads to complete');
//       return;
//     }

//     if (!validateForm()) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }

//     if (!hasChanges()) {
//       toast.info('No changes to save');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem('token');
//       const imageUrls = productImages.filter(img => img.url !== null && !img.uploading && !img.uploadAborted).map(img => img.url);
      
//       const finalVideoUrl = videoUpload.url || (youtubeUrl ? `https://www.youtube.com/embed/${getYouTubeVideoId(youtubeUrl)}` : formData.videoUrl);
      
//       const payload = {
//         productName: formData.productName,
//         shortDescription: formData.shortDescription,
//         fullDescription: formData.fullDescription,
//         category: formData.category,
//         subcategory: formData.subcategory,
//         childSubcategory: formData.childSubcategory,
//         brand: formData.brand,
//         ageGroup: formData.ageGroup,
//         stockQuantity: Number(formData.stockQuantity),
//         regularPrice: Number(formData.regularPrice),
//         discountPrice: Number(formData.discountPrice),
//         deliveryInfo: formData.deliveryInfo,
//         codAvailable: formData.codAvailable,
//         tags: formData.tags,
//         promotion: formData.promotion,
//         isFeatured: formData.isFeatured,
//         rating: Number(formData.rating),
//         additionalInfo: formData.additionalInfo,
//         videoUrl: finalVideoUrl,
//         videoPublicId: videoUpload.publicId || formData.videoPublicId,
//         videoType: formData.videoType,
//         metaSettings: {
//           metaTitle: formData.metaSettings.metaTitle,
//           metaDescription: formData.metaSettings.metaDescription,
//           metaKeywords: formData.metaSettings.metaKeywords || []
//         },
//         images: imageUrls,
//         imagesToDelete: imagesToDelete
//       };

//       const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success('Product updated successfully!');
//         router.push('/moderator/all-products');
//       } else {
//         toast.error(data.error || 'Failed to update product');
//       }
//     } catch (error) {
//       console.error('Error updating product:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const discountPercentage = formData.regularPrice && formData.discountPrice 
//     ? Math.round(((formData.regularPrice - formData.discountPrice) / formData.regularPrice) * 100)
//     : 0;

//   const getVideoPreview = () => {
//     if (videoUpload.url) {
//       return (
//         <div className="relative">
//           <video src={videoUpload.url} className="w-full rounded-lg" controls />
//           <button
//             type="button"
//             onClick={removeVideo}
//             className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//       );
//     } else if (youtubeUrl && getYouTubeVideoId(youtubeUrl)) {
//       const videoId = getYouTubeVideoId(youtubeUrl);
//       return (
//         <div className="relative">
//           <iframe
//             src={`https://www.youtube.com/embed/${videoId}`}
//             className="w-full rounded-lg aspect-video"
//             allowFullScreen
//           />
//           <button
//             type="button"
//             onClick={removeVideo}
//             className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//       );
//     } else if (formData.videoUrl && formData.videoType === 'youtube') {
//       const videoId = getYouTubeVideoId(formData.videoUrl);
//       if (videoId) {
//         return (
//           <div className="relative">
//             <iframe
//               src={`https://www.youtube.com/embed/${videoId}`}
//               className="w-full rounded-lg aspect-video"
//               allowFullScreen
//             />
//             <button
//               type="button"
//               onClick={removeVideo}
//               className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         );
//       }
//     }
//     return null;
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-[#4A8A90] mx-auto mb-4" />
//           <p className="text-gray-600">Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <MantineProvider>
//       <div className="min-h-screen" style={{ backgroundColor: '#FFF9F0' }}>
//         {/* Header */}
//         <div className="bg-white border-b shadow-sm sticky top-0 z-10" style={{ borderBottomColor: '#FFB6C1' }}>
//           <div className="px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <NextLink href="/moderator/all-products" className="p-2 hover:bg-pink-50 rounded-lg transition-colors">
//                   <ArrowLeft className="w-5 h-5" style={{ color: '#4A8A90' }} />
//                 </NextLink>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <Gift className="w-6 h-6" style={{ color: '#4A8A90' }} />
//                     <h1 className="text-2xl font-bold" style={{ color: '#2D3A5C', fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                       Edit Toy Product
//                     </h1>
//                     <span className="px-2 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#D4EDEE', color: '#4A8A90' }}>
//                       Moderator
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-1">Update product information for your toy collection</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 {!hasChanges() && originalProduct && (
//                   <span className="text-xs text-green-600 flex items-center gap-1">
//                     <Clock className="w-3 h-3" />
//                     No pending changes
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content - Same JSX as Admin Edit Page */}
//         <div className="p-6">
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Left Column - Main Info */}
//               <div className="lg:col-span-2 space-y-6">
//                 {/* Basic Information Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                       <Package className="w-5 h-5" style={{ color: '#4A8A90' }} />
//                       Basic Information
//                     </h2>
//                   </div>
//                   <div className="p-5 space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Product Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="productName"
//                         value={formData.productName}
//                         onChange={handleChange}
//                         className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
//                           errors.productName ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="e.g., Magical Unicorn Plush Toy, STEM Robot Kit"
//                       />
//                       {errors.productName && <p className="text-xs text-red-600 mt-1">{errors.productName}</p>}
//                     </div>

//                     {/* Short Description */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Short Description <span className="text-red-500">*</span>
//                       </label>
//                       {isMounted && shortDescEditor && (
//                         <div className={`border rounded-lg overflow-hidden ${errors.shortDescription ? 'border-red-500' : 'border-gray-300'}`}>
//                           <RichTextEditor editor={shortDescEditor}>
//                             <RichTextEditor.Toolbar>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.Bold />
//                                 <RichTextEditor.Italic />
//                               </RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.AlignLeft />
//                                 <RichTextEditor.AlignCenter />
//                                 <RichTextEditor.AlignRight />
//                               </RichTextEditor.ControlsGroup>
//                             </RichTextEditor.Toolbar>
//                             <RichTextEditor.Content />
//                           </RichTextEditor>
//                         </div>
//                       )}
//                       <p className="text-xs text-gray-500 mt-1">Brief description shown in product listings</p>
//                     </div>

//                     {/* Full Description */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Full Description <span className="text-red-500">*</span>
//                       </label>
//                       {isMounted && fullDescEditor && (
//                         <div className={`border rounded-lg overflow-hidden ${errors.fullDescription ? 'border-red-500' : 'border-gray-300'}`}>
//                           <RichTextEditor editor={fullDescEditor}>
//                             <RichTextEditor.Toolbar>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.Bold />
//                                 <RichTextEditor.Italic />
//                                 <RichTextEditor.Underline />
//                                 <RichTextEditor.Strikethrough />
//                               </RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.H1 />
//                                 <RichTextEditor.H2 />
//                                 <RichTextEditor.H3 />
//                               </RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.BulletList />
//                                 <RichTextEditor.OrderedList />
//                               </RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.AlignLeft />
//                                 <RichTextEditor.AlignCenter />
//                                 <RichTextEditor.AlignRight />
//                               </RichTextEditor.ControlsGroup>
//                             </RichTextEditor.Toolbar>
//                             <RichTextEditor.Content />
//                           </RichTextEditor>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Categories Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                       <Layers className="w-5 h-5" style={{ color: '#4A8A90' }} />
//                       Categories & Classification
//                     </h2>
//                   </div>
//                   <div className="p-5">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Category <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                           name="category"
//                           value={formData.category}
//                           onChange={handleChange}
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
//                             errors.category ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                         >
//                           <option value="">Select Category</option>
//                           {categories.map(cat => (
//                             <option key={cat._id} value={cat._id}>{cat.name}</option>
//                           ))}
//                         </select>
//                         {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Subcategory <span className="text-gray-400 text-xs">(Optional)</span>
//                         </label>
//                         <select
//                           name="subcategory"
//                           value={formData.subcategory}
//                           onChange={handleChange}
//                           disabled={!formData.category || subcategories.length === 0}
//                           className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed border-gray-300"
//                         >
//                           <option value="">Select Subcategory</option>
//                           {subcategories.map(sub => (
//                             <option key={sub._id} value={sub._id}>{sub.name}</option>
//                           ))}
//                         </select>
//                       </div>

//                       {childSubcategories.length > 0 && (
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Child Subcategory <span className="text-gray-400 text-xs">(Optional)</span>
//                           </label>
//                           <select
//                             name="childSubcategory"
//                             value={formData.childSubcategory}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition border-gray-300"
//                           >
//                             <option value="">Select Child Subcategory</option>
//                             {childSubcategories.map(child => (
//                               <option key={child._id} value={child._id}>{child.name}</option>
//                             ))}
//                           </select>
//                         </div>
//                       )}

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Brand <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           name="brand"
//                           value={formData.brand}
//                           onChange={handleChange}
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
//                             errors.brand ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="e.g., LEGO, Mattel, Hasbro"
//                         />
//                         {errors.brand && <p className="text-xs text-red-600 mt-1">{errors.brand}</p>}
//                       </div>

//                       {/* <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Age Group <span className="text-red-500">*</span>
//                         </label>
//                         <div className="grid grid-cols-4 gap-2">
//                           {AGE_GROUPS.map(age => (
//                             <button
//                               key={age.value}
//                               type="button"
//                               onClick={() => setFormData(prev => ({ ...prev, ageGroup: age.value }))}
//                               className={`p-2 rounded-lg border-2 transition-all text-center ${
//                                 formData.ageGroup === age.value
//                                   ? 'border-[#4A8A90] bg-[#D4EDEE]'
//                                   : 'border-gray-200 hover:border-[#FFB6C1]'
//                               }`}
//                             >
//                               <span className="text-lg">{age.icon}</span>
//                               <p className="text-[10px] font-medium mt-1">{age.label}</p>
//                             </button>
//                           ))}
//                         </div>
//                         {errors.ageGroup && <p className="text-xs text-red-600 mt-1">{errors.ageGroup}</p>}
//                       </div> */}

//                       <div>
//   <label className="block text-sm font-medium text-gray-700 mb-1">
//     Age Group <span className="text-gray-400 text-xs">(Optional)</span>
//   </label>
//   <div className="grid grid-cols-5 gap-2">
//     {/* Add "All Kids" option - Notice grid-cols-5 instead of 4 */}
//     <button
//       type="button"
//       onClick={() => setFormData(prev => ({ ...prev, ageGroup: '' }))}
//       className={`p-2 rounded-lg border-2 transition-all text-center ${
//         !formData.ageGroup
//           ? 'border-[#4A8A90] bg-[#D4EDEE]'
//           : 'border-gray-200 hover:border-[#FFB6C1]'
//       }`}
//     >
//       <span className="text-lg">🎈</span>
//       <p className="text-[10px] font-medium mt-1">All Kids</p>
//     </button>
//     {AGE_GROUPS.map(age => (
//       <button
//         key={age.value}
//         type="button"
//         onClick={() => setFormData(prev => ({ ...prev, ageGroup: age.value }))}
//         className={`p-2 rounded-lg border-2 transition-all text-center ${
//           formData.ageGroup === age.value
//             ? 'border-[#4A8A90] bg-[#D4EDEE]'
//             : 'border-gray-200 hover:border-[#FFB6C1]'
//         }`}
//       >
//         <span className="text-lg">{age.icon}</span>
//         <p className="text-[10px] font-medium mt-1">{age.label}</p>
//       </button>
//     ))}
//   </div>
//   {/* Remove the error display for ageGroup */}
//   {/* {errors.ageGroup && <p className="text-xs text-red-600 mt-1">{errors.ageGroup}</p>} */}
// </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Pricing Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                       <DollarSign className="w-5 h-5" style={{ color: '#4A8A90' }} />
//                       Pricing & Inventory
//                     </h2>
//                   </div>
//                   <div className="p-5">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">SKU Code</label>
//                         <input
//                           type="text"
//                           value={originalProduct?.skuCode || 'Auto-generated'}
//                           disabled
//                           className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg font-mono text-gray-500 cursor-not-allowed"
//                         />
//                         <p className="text-xs text-gray-500 mt-1">SKU is auto-generated and cannot be changed</p>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Stock Quantity <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="number"
//                           name="stockQuantity"
//                           value={formData.stockQuantity}
//                           onChange={handleNumberChange}
//                           onWheel={(e) => e.target.blur()}
//                           min="0"
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
//                             errors.stockQuantity ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Regular Price (৳) <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="number"
//                           name="regularPrice"
//                           value={formData.regularPrice || ''}
//                           onChange={handleNumberChange}
//                           onWheel={(e) => e.target.blur()}
//                           min="0"
//                           step="1"
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
//                             errors.regularPrice ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="0"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price (৳)</label>
//                         <div className="relative">
//                           <input
//                             type="number"
//                             name="discountPrice"
//                             value={formData.discountPrice || ''}
//                             onChange={handleNumberChange}
//                             onWheel={(e) => e.target.blur()}
//                             min="0"
//                             step="1"
//                             className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
//                               errors.discountPrice ? 'border-red-500' : 'border-gray-300'
//                             }`}
//                             placeholder="0"
//                           />
//                           {discountPercentage > 0 && (
//                             <div className="absolute right-3 top-1/2 -translate-y-1/2">
//                               <span className="text-xs font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
//                                 {discountPercentage}% OFF
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Delivery Details - Rich Text Editor */}
//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Delivery Details <span className="text-red-500">*</span>
//                       </label>
//                       {isMounted && deliveryInfoEditor && (
//                         <div className={`border rounded-lg overflow-hidden ${errors.deliveryInfo ? 'border-red-500' : 'border-gray-300'}`}>
//                           <RichTextEditor editor={deliveryInfoEditor}>
//                             <RichTextEditor.Toolbar>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.Bold />
//                                 <RichTextEditor.Italic />
//                                 <RichTextEditor.Underline />
//                               </RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.BulletList />
//                                 <RichTextEditor.OrderedList />
//                               </RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.AlignLeft />
//                                 <RichTextEditor.AlignCenter />
//                                 <RichTextEditor.AlignRight />
//                               </RichTextEditor.ControlsGroup>
//                             </RichTextEditor.Toolbar>
//                             <RichTextEditor.Content />
//                           </RichTextEditor>
//                         </div>
//                       )}
//                       <p className="text-xs text-gray-500 mt-1">
//                         Include shipping information, delivery time, and other delivery-related details
//                       </p>
//                       {errors.deliveryInfo && <p className="text-xs text-red-600 mt-1">{errors.deliveryInfo}</p>}
//                     </div>

//                     {/* Cash on Delivery Checkbox */}
//                     <div className="mt-4">
//                       <label className="flex items-center gap-3 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={formData.codAvailable}
//                           onChange={(e) => setFormData(prev => ({ ...prev, codAvailable: e.target.checked }))}
//                           className="w-5 h-5 rounded border-gray-300 text-[#4A8A90] focus:ring-[#4A8A90]"
//                           style={{ accentColor: '#4A8A90' }}
//                         />
//                         <div>
//                           <span className="text-sm font-medium text-gray-700">Cash on Delivery Available</span>
//                           <p className="text-xs text-gray-500">Enable COD payment option for this product</p>
//                         </div>
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Additional Information */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}>
//                       <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                         <Info className="w-5 h-5" style={{ color: '#4A8A90' }} />
//                         Additional Information
//                       </h2>
//                       <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showAdditionalInfo ? 'rotate-180' : ''}`} />
//                     </div>
//                   </div>
//                   {showAdditionalInfo && (
//                     <div className="p-5">
//                       <div className="space-y-4">
//                         {formData.additionalInfo.map((info, index) => (
//                           <div key={index} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#FFF9F0', border: '1px solid #D4EDEE' }}>
//                             <div className="flex-1 grid grid-cols-2 gap-3">
//                               <span className="text-sm font-medium" style={{ color: '#4A8A90' }}>{info.fieldName}:</span>
//                               <span className="text-sm text-gray-600">{info.fieldValue}</span>
//                             </div>
//                             <button type="button" onClick={() => removeAdditionalInfo(index)} className="text-gray-400 hover:text-red-500">
//                               <X className="w-4 h-4" />
//                             </button>
//                           </div>
//                         ))}
//                         <div className="flex gap-3">
//                           <input
//                             type="text"
//                             placeholder="e.g., Material"
//                             value={additionalInfoInput.fieldName}
//                             onChange={(e) => setAdditionalInfoInput({ ...additionalInfoInput, fieldName: e.target.value })}
//                             className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
//                           />
//                           <input
//                             type="text"
//                             placeholder="e.g., Premium Cotton"
//                             value={additionalInfoInput.fieldValue}
//                             onChange={(e) => setAdditionalInfoInput({ ...additionalInfoInput, fieldValue: e.target.value })}
//                             className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
//                           />
//                           <button
//                             type="button"
//                             onClick={addAdditionalInfo}
//                             className="px-4 py-2 text-white rounded-lg transition-colors"
//                             style={{ backgroundColor: '#4A8A90' }}
//                           >
//                             <Plus className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Meta Settings for SEO */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowMeta(!showMeta)}>
//                       <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                         <Hash className="w-5 h-5" style={{ color: '#4A8A90' }} />
//                         SEO & Meta Settings
//                       </h2>
//                       <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showMeta ? 'rotate-180' : ''}`} />
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">Optimize your product for search engines</p>
//                   </div>
                  
//                   {showMeta && (
//                     <div className="p-5">
//                       <div className="space-y-4">
//                         {/* Meta Title */}
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Meta Title
//                             <span className="text-xs text-gray-400 ml-2">(70 characters max)</span>
//                           </label>
//                           <input
//                             type="text"
//                             value={formData.metaSettings.metaTitle}
//                             onChange={(e) => handleMetaChange('metaTitle', e.target.value)}
//                             maxLength="70"
//                             className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
//                               errors.metaTitle ? 'border-red-500' : 'border-gray-300'
//                             }`}
//                             placeholder="e.g., Buy Educational STEM Toys for Kids | Toy Store Bangladesh"
//                           />
//                           <div className="flex justify-end mt-1">
//                             <span className={`text-xs ${formData.metaSettings.metaTitle?.length > 70 ? 'text-red-500' : 'text-gray-400'}`}>
//                               {formData.metaSettings.metaTitle?.length || 0}/70
//                             </span>
//                           </div>
//                           {errors.metaTitle && <p className="text-xs text-red-600 mt-1">{errors.metaTitle}</p>}
//                         </div>

//                         {/* Meta Description */}
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Meta Description
//                             <span className="text-xs text-gray-400 ml-2">(160 characters max)</span>
//                           </label>
//                           <textarea
//                             value={formData.metaSettings.metaDescription}
//                             onChange={(e) => handleMetaChange('metaDescription', e.target.value)}
//                             maxLength="160"
//                             rows="3"
//                             className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition resize-none ${
//                               errors.metaDescription ? 'border-red-500' : 'border-gray-300'
//                             }`}
//                             placeholder="Write a compelling description that appears in search engine results..."
//                           />
//                           <div className="flex justify-end mt-1">
//                             <span className={`text-xs ${formData.metaSettings.metaDescription?.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
//                               {formData.metaSettings.metaDescription?.length || 0}/160
//                             </span>
//                           </div>
//                           {errors.metaDescription && <p className="text-xs text-red-600 mt-1">{errors.metaDescription}</p>}
//                         </div>

//                         {/* Meta Keywords */}
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Meta Keywords
//                             <span className="text-xs text-gray-400 ml-2">(Comma separated)</span>
//                           </label>
//                           <div className="flex gap-2">
//                             <input
//                               type="text"
//                               value={keywordInput}
//                               onChange={(e) => setKeywordInput(e.target.value)}
//                               onKeyPress={(e) => {
//                                 if (e.key === 'Enter') {
//                                   e.preventDefault();
//                                   addKeyword();
//                                 }
//                               }}
//                               className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition"
//                               placeholder="e.g., educational toys, STEM kit, learning games"
//                             />
//                             <button
//                               type="button"
//                               onClick={addKeyword}
//                               className="px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2"
//                               style={{ backgroundColor: '#4A8A90' }}
//                             >
//                               <Plus className="w-4 h-4" />
//                               Add
//                             </button>
//                           </div>
                          
//                           {/* Display Keywords */}
//                           {formData.metaSettings.metaKeywords && formData.metaSettings.metaKeywords.length > 0 && (
//                             <div className="mt-3 flex flex-wrap gap-2">
//                               {formData.metaSettings.metaKeywords.map((keyword, index) => (
//                                 <div
//                                   key={index}
//                                   className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full"
//                                   style={{ backgroundColor: '#D4EDEE', color: '#4A8A90' }}
//                                 >
//                                   <span>{keyword}</span>
//                                   <button
//                                     type="button"
//                                     onClick={() => removeKeyword(index)}
//                                     className="hover:text-red-500 transition-colors"
//                                   >
//                                     <X className="w-3 h-3" />
//                                   </button>
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                           <p className="text-xs text-gray-500 mt-2">
//                             Keywords help search engines understand your product. Add relevant terms separated by commas.
//                           </p>
//                         </div>

//                         {/* SEO Preview */}
//                         {(formData.metaSettings.metaTitle || formData.metaSettings.metaDescription) && (
//                           <div className="mt-4 p-3 rounded-lg border border-gray-200 bg-gray-50">
//                             <p className="text-xs font-medium text-gray-500 mb-2">Search Engine Preview:</p>
//                             <div className="space-y-1">
//                               {formData.metaSettings.metaTitle && (
//                                 <p className="text-base font-medium text-blue-700 line-clamp-1">
//                                   {formData.metaSettings.metaTitle}
//                                 </p>
//                               )}
//                               {formData.metaSettings.metaTitle && (
//                                 <p className="text-xs text-green-700">
//                                   https://yourstore.com/product/{formData.productName?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'product-slug'}
//                                 </p>
//                               )}
//                               {formData.metaSettings.metaDescription && (
//                                 <p className="text-xs text-gray-600 line-clamp-2">
//                                   {formData.metaSettings.metaDescription}
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div className="space-y-6">
//                 {/* Product Images Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                       <ImageIcon className="w-5 h-5" style={{ color: '#4A8A90' }} />
//                       Product Images <span className="text-red-500">*</span>
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">Upload up to 6 images (JPG, PNG, WebP, max 5MB each) • Drag to reorder</p>
//                   </div>
                  
//                   <div className="p-5">
//                     {errors.images && (
//                       <p className="text-xs text-red-600 mb-4 flex items-center gap-1">
//                         <AlertCircle className="w-3 h-3" />
//                         {errors.images}
//                       </p>
//                     )}
                    
//                     <div className="mb-4">
//                       <input
//                         type="file"
//                         id="multiple-images"
//                         className="hidden"
//                         accept="image/jpeg,image/jpg,image/png,image/webp"
//                         multiple
//                         onChange={handleMultipleImageSelect}
//                         ref={el => {
//                           if (el) fileInputRefs.current['multiple'] = el;
//                         }}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => fileInputRefs.current['multiple']?.click()}
//                         className="w-full flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed transition-colors"
//                         style={{ backgroundColor: '#D4EDEE', color: '#4A8A90', borderColor: '#4A8A90' }}
//                       >
//                         <Upload className="w-5 h-5" />
//                         <span>Select Multiple Images (Up to 6)</span>
//                       </button>
//                       <p className="text-xs text-gray-500 mt-2 text-center">
//                         You can select multiple images at once. Images will be uploaded automatically.
//                       </p>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       {productImages.map((img, index) => (
//                         <div
//                           key={index}
//                           draggable={img.preview !== null && !img.uploading}
//                           onDragStart={() => handleDragStart(index)}
//                           onDragOver={(e) => handleDragOverWithFeedback(e, index)}
//                           onDragLeave={handleDragLeave}
//                           onDrop={() => handleDropWithFeedback(index)}
//                           onDragEnd={handleDragEnd}
//                           className={`transition-all duration-200 ${
//                             draggedIndex === index ? 'opacity-50 scale-95' : ''
//                           } ${
//                             dragOverIndex === index && draggedIndex !== index && draggedIndex !== null 
//                               ? 'ring-2 ring-[#4A8A90] ring-offset-2 rounded-lg' 
//                               : ''
//                           }`}
//                         >
//                           {img.preview ? (
//                             <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 h-40 hover:border-[#4A8A90] transition-colors cursor-grab active:cursor-grabbing bg-gray-100">
//                               <div className="absolute top-1 left-1 bg-black/50 rounded px-1.5 py-0.5 z-10">
//                                 <GripVertical className="w-3 h-3 text-white" />
//                               </div>
                              
//                               <img 
//                                 src={img.preview} 
//                                 alt={`Product ${index + 1}`} 
//                                 className="w-full h-full object-contain bg-gray-100"
//                                 onError={(e) => {
//                                   e.target.src = 'https://via.placeholder.com/150?text=Error';
//                                 }}
//                               />
                              
//                               {img.uploading && (
//                                 <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
//                                   <Loader2 className="w-6 h-6 text-white animate-spin" />
//                                 </div>
//                               )}
                              
//                               <button
//                                 type="button"
//                                 onClick={() => removeImage(index)}
//                                 className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-20"
//                                 title="Remove image"
//                               >
//                                 <X className="w-3 h-3" />
//                               </button>
                              
//                               {index === 0 && img.url && !img.uploading && (
//                                 <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-green-500 text-white text-[10px] rounded z-10">
//                                   Primary
//                                 </span>
//                               )}
//                             </div>
//                           ) : (
//                             <div 
//                               className={`border-2 border-dashed rounded-lg p-4 text-center h-40 flex flex-col items-center justify-center cursor-pointer transition-colors ${
//                                 img.error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-[#4A8A90] hover:bg-[#D4EDEE]'
//                               }`}
//                               onClick={() => fileInputRefs.current[index]?.click()}
//                             >
//                               <input 
//                                 type="file" 
//                                 ref={el => fileInputRefs.current[index] = el}
//                                 className="hidden" 
//                                 accept="image/jpeg,image/jpg,image/png,image/webp" 
//                                 onChange={(e) => handleImageChange(e, index)} 
//                               />
//                               <ImageIcon className={`w-8 h-8 mx-auto mb-2 ${img.error ? 'text-red-400' : 'text-gray-400'}`} />
//                               <p className={`text-xs ${img.error ? 'text-red-600' : 'text-gray-600'}`}>
//                                 Slot {index + 1}
//                               </p>
//                               <p className="text-[10px] text-gray-400 mt-1">Click to upload</p>
//                               {img.error && (
//                                 <p className="text-xs text-red-600 mt-1">{img.error}</p>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
                    
//                     {productImages.some(img => img.uploading) && (
//                       <div className="mt-4 p-2 rounded-lg" style={{ backgroundColor: '#D4EDEE' }}>
//                         <p className="text-xs" style={{ color: '#4A8A90' }}>
//                           Uploading: {productImages.filter(img => img.uploading && !img.uploadAborted).length} image(s) remaining...
//                         </p>
//                       </div>
//                     )}
                    
//                     <div className="mt-4 text-xs text-gray-500 text-center">
//                       {productImages.filter(img => img.url !== null && !img.uploading && !img.uploadAborted).length} of 6 images uploaded
//                     </div>
                    
//                     {imagesToDelete.length > 0 && (
//                       <div className="mt-2 text-xs text-red-500 text-center">
//                         {imagesToDelete.length} image(s) marked for deletion
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Video Upload Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                       <Video className="w-5 h-5" style={{ color: '#4A8A90' }} />
//                       Product Video <span className="text-gray-400 text-xs">(Optional)</span>
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">Upload a video or add a YouTube link to showcase your toy</p>
//                   </div>
//                   <div className="p-5">
//                     <div className="flex gap-2 mb-4">
//                       <button
//                         type="button"
//                         onClick={() => setVideoType('upload')}
//                         className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
//                           videoType === 'upload'
//                             ? 'text-white'
//                             : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                         }`}
//                         style={videoType === 'upload' ? { backgroundColor: '#4A8A90' } : {}}
//                       >
//                         <Upload className="w-4 h-4 inline mr-1" />
//                         Upload Video
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => setVideoType('youtube')}
//                         className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
//                           videoType === 'youtube'
//                             ? 'text-white'
//                             : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                         }`}
//                         style={videoType === 'youtube' ? { backgroundColor: '#4A8A90' } : {}}
//                       >
//                         <Youtube className="w-4 h-4 inline mr-1" />
//                         YouTube Link
//                       </button>
//                     </div>

//                     {getVideoPreview()}

//                     {videoType === 'upload' && !videoUpload.url && !videoUpload.preview && !formData.videoUrl && (
//                       <div
//                         className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-[#4A8A90] transition-colors"
//                         onClick={() => videoInputRef.current?.click()}
//                       >
//                         <input
//                           type="file"
//                           ref={videoInputRef}
//                           className="hidden"
//                           accept="video/*"
//                           onChange={handleVideoFileChange}
//                         />
//                         <Video className="w-12 h-12 mx-auto text-gray-400 mb-3" />
//                         <p className="text-sm text-gray-500">Click or drag to upload video</p>
//                         <p className="text-xs text-gray-400 mt-1">MP4, WebM, MOV (Max 100MB)</p>
//                       </div>
//                     )}

//                     {videoType === 'youtube' && !formData.videoUrl && !youtubeUrl && (
//                       <div className="space-y-3">
//                         <div className="relative">
//                           <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
//                           <input
//                             type="text"
//                             value={youtubeUrl}
//                             onChange={(e) => handleYoutubeUrlChange(e.target.value)}
//                             placeholder="https://www.youtube.com/watch?v=..."
//                             className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
//                           />
//                         </div>
//                         <p className="text-xs text-gray-500">
//                           Paste any YouTube video URL. The video will be embedded on your product page.
//                         </p>
//                       </div>
//                     )}

//                     {videoUpload.error && (
//                       <p className="text-xs text-red-500 mt-2">{videoUpload.error}</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Rating */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                       <Star className="w-5 h-5" style={{ color: '#4A8A90' }} />
//                       Product Rating
//                     </h2>
//                   </div>
//                   <div className="p-5">
//                     <div className="flex items-center gap-2">
//                       {[1, 2, 3, 4, 5].map(star => (
//                         <button
//                           key={star}
//                           type="button"
//                           onClick={() => handleRatingChange(star)}
//                           onMouseEnter={() => setRatingHover(star)}
//                           onMouseLeave={() => setRatingHover(0)}
//                           className="transition-transform hover:scale-110"
//                         >
//                           <Star 
//                             className={`w-8 h-8 ${
//                               (ratingHover || formData.rating) >= star
//                                 ? 'fill-yellow-400 text-yellow-400'
//                                 : 'text-gray-300'
//                             }`}
//                           />
//                         </button>
//                       ))}
//                       <span className="ml-2 text-sm text-gray-500">
//                         {formData.rating > 0 ? `${formData.rating} out of 5 stars` : 'No rating yet'}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-3">Set the initial product rating (1-5 stars)</p>
//                   </div>
//                 </div>

//                 {/* Tags */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                       <Tag className="w-5 h-5" style={{ color: '#4A8A90' }} />
//                       Product Tags
//                     </h2>
//                   </div>
//                   <div className="p-5">
//                     <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
//                       {AVAILABLE_TAGS.map(tag => (
//                         <button
//                           key={tag}
//                           type="button"
//                           onClick={() => handleTagToggle(tag)}
//                           className={`px-3 py-1.5 text-xs rounded-full transition-all ${
//                             formData.tags.includes(tag)
//                               ? 'text-white'
//                               : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                           }`}
//                           style={formData.tags.includes(tag) ? { backgroundColor: '#4A8A90' } : {}}
//                         >
//                           {tag}
//                         </button>
//                       ))}
//                     </div>
//                     {formData.tags.length > 0 && (
//                       <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: '#D4EDEE' }}>
//                         <p className="text-xs font-medium mb-2" style={{ color: '#4A8A90' }}>Selected Tags:</p>
//                         <div className="flex flex-wrap gap-2">
//                           {formData.tags.map(tag => (
//                             <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full" style={{ backgroundColor: '#4A8A90', color: 'white' }}>
//                               {tag}
//                               <button type="button" onClick={() => handleTagToggle(tag)} className="hover:opacity-70">
//                                 <X className="w-2.5 h-2.5" />
//                               </button>
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Promotion */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                       <Sparkles className="w-5 h-5" style={{ color: '#4A8A90' }} />
//                       Promotions
//                     </h2>
//                   </div>
//                   <div className="p-5">
//                     <div className="grid grid-cols-2 gap-2">
//                       {PROMOTION_OPTIONS.map(promo => (
//                         <button
//                           key={promo.value}
//                           type="button"
//                           onClick={() => handlePromotionSelect(promo.value)}
//                           className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-sm ${
//                             formData.promotion === promo.value
//                               ? 'border-[#FFB6C1] bg-pink-50'
//                               : 'border-gray-200 hover:border-[#D4EDEE]'
//                           }`}
//                         >
//                           <span className="text-base">{promo.icon}</span>
//                           <span className="text-xs font-medium">{promo.label}</span>
//                         </button>
//                       ))}
//                     </div>
//                     <label className="flex items-center gap-3 mt-4 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={formData.isFeatured}
//                         onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
//                         className="w-4 h-4"
//                         style={{ accentColor: '#4A8A90' }}
//                       />
//                       <span className="text-sm text-gray-700">Feature this product on homepage</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Submit Buttons */}
//             <div className="mt-8 flex justify-end gap-3">
//               <NextLink href="/moderator/all-products">
//                 <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
//                   Cancel
//                 </button>
//               </NextLink>
             
//               <button
//                 type="submit"
//                 disabled={isSubmitting || !hasChanges()}
//                 className="flex items-center gap-2 px-6 py-2.5 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
//                 style={{ backgroundColor: '#4A8A90' }}
//               >
//                 {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                 {isSubmitting ? 'Updating...' : 'Update Product'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </MantineProvider>
//   );
// }





'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NextLink from 'next/link';
import { 
  Plus, 
  X, 
  Save, 
  ArrowLeft,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
  Trash2,
  Upload,
  Package,
  DollarSign,
  Tag,
  Info,
  Star,
  Video,
  Hash,
  Type,
  Layers,
  Gift,
  Sparkles,
  ChevronDown,
  Clock,
  Edit3,
  Eye,
  GripVertical,
  Youtube,
  Link as LinkIcon,
  Barcode,
  Scan,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { MantineProvider } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import TiptapLink from '@tiptap/extension-link';

import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';

// Age group options
const AGE_GROUPS = [
  { value: '0-2', label: '0-2 years', icon: '👶' },
  { value: '3-5', label: '3-5 years', icon: '🧒' },
  { value: '6-10', label: '6-10 years', icon: '👧' },
  { value: '11-14', label: '11-14 years', icon: '🧑' }
];

// Kids toy specific tags
const AVAILABLE_TAGS = [
  'Best Seller',
  'New Arrival',
  'Limited Edition',
  'Eco-Friendly',
  'Educational',
  'STEM Toy',
  'Montessori',
  'Creative Play',
  'Outdoor Fun',
  'Battery Included',
  'Non-Toxic',
  'Award Winner',
  'Musical Toy',
  'Interactive',
  'Light Up',
  'Remote Control',
  'Building Set',
  'Puzzle Game',
  'Art & Craft',
  'Pretend Play'
];

// Promotion options
const PROMOTION_OPTIONS = [
  { value: 'flash-sale', label: 'Flash Sale', icon: '⚡', color: '#FF6B6B' },
  { value: 'new-arrival', label: 'New Arrival', icon: '⭐', color: '#FFD93D' },
  { value: 'trending', label: 'Trending Now', icon: '🔥', color: '#FF8C42' },
  { value: 'clearance', label: 'Clearance Sale', icon: '💨', color: '#4ECDC4' },
  { value: 'holiday-special', label: 'Holiday Special', icon: '🎄', color: '#2ECC71' },
  { value: 'bundle-deal', label: 'Bundle Deal', icon: '🎁', color: '#9B59B6' },
  { value: 'limited-stock', label: 'Limited Stock', icon: '⚠️', color: '#E74C3C' }
];

// Barcode Input Component with Generate and Scan
const BarcodeInput = ({ value, onChange, onValidate, disabled = false, error = '', onGenerate, isGenerating = false, productId = null, originalBarcode = null }) => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [isScannerMode, setIsScannerMode] = useState(false);
  const [scannedValue, setScannedValue] = useState('');
  const inputRef = useRef(null);
  const scanTimeoutRef = useRef(null);

  const validateBarcode = async (barcodeValue) => {
    if (!barcodeValue || barcodeValue.length < 8) {
      setValidationResult(null);
      return;
    }

    setIsValidating(true);
    try {
      let url = `http://localhost:5000/api/barcodes/validate/${barcodeValue}`;
      if (productId) {
        url += `?productId=${productId}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        const isOwnBarcode = originalBarcode && barcodeValue === originalBarcode;
        
        if (isOwnBarcode) {
          const ownBarcodeResult = {
            ...data.data,
            isValid: true,
            isOwnBarcode: true,
            message: 'Current product barcode'
          };
          setValidationResult(ownBarcodeResult);
          if (onValidate) onValidate(ownBarcodeResult);
        } else {
          setValidationResult(data.data);
          if (onValidate) onValidate(data.data);
        }
      }
    } catch (error) {
      console.error('Validation error:', error);
      setValidationResult({ isValid: false, message: 'Network error' });
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value) {
        validateBarcode(value);
      } else {
        setValidationResult(null);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [value, productId, originalBarcode]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isScannerMode) return;
      
      if (e.key === 'Enter') {
        if (scannedValue) {
          let cleanBarcode = scannedValue.replace(/[^0-9]/g, '');
          if (cleanBarcode.length > 13) {
            cleanBarcode = cleanBarcode.slice(0, 13);
          }
          onChange({ target: { name: 'barcode', value: cleanBarcode } });
          setScannedValue('');
          setIsScannerMode(false);
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }
      } else {
        if (/[0-9]/.test(e.key)) {
          setScannedValue(prev => prev + e.key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isScannerMode, scannedValue, onChange]);

  const startScannerMode = () => {
    setIsScannerMode(true);
    setScannedValue('');
    toast.info('Scan barcode now...');
    
    scanTimeoutRef.current = setTimeout(() => {
      if (isScannerMode) {
        setIsScannerMode(false);
        toast.info('Scanner mode timeout');
      }
    }, 10000);
  };

  const cancelScannerMode = () => {
    setIsScannerMode(false);
    setScannedValue('');
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }
  };

  const getValidationIcon = () => {
    if (isValidating) return <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;
    if (!validationResult) return <Barcode className="w-4 h-4 text-gray-400" />;
    
    const isOwnBarcode = originalBarcode && value === originalBarcode;
    
    if (isOwnBarcode) {
      return <CheckCircle className="w-4 h-4 text-blue-500" />;
    }
    
    if (validationResult.isValid && (validationResult.status === 'available' || validationResult.status === 'new')) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const getValidationMessage = () => {
    if (!validationResult) return null;
    
    const isOwnBarcode = originalBarcode && value === originalBarcode;
    
    if (isOwnBarcode) {
      return <span className="text-blue-600 text-xs">✓ Current product barcode (no change)</span>;
    }
    
    if (validationResult.isValid) {
      if (validationResult.status === 'new') {
        return <span className="text-green-600 text-xs">✓ New barcode - will be auto-generated</span>;
      }
      if (validationResult.status === 'available') {
        return <span className="text-green-600 text-xs">✓ Barcode available for assignment</span>;
      }
    }
    return <span className="text-red-600 text-xs">{validationResult.message}</span>;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Barcode <span className="text-gray-400 text-xs">(Optional - 8-13 digits)</span>
      </label>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {getValidationIcon()}
          </div>
          
          <input
            ref={inputRef}
            type="text"
            name="barcode"
            value={value || ''}
            onChange={onChange}
            disabled={disabled || isScannerMode}
            placeholder="Enter barcode number, scan, or generate"
            className={`w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
              error ? 'border-red-500' : (validationResult && !validationResult.isValid && value !== originalBarcode) ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength="13"
          />
        </div>
        
        <button
          type="button"
          onClick={startScannerMode}
          disabled={isScannerMode}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
        >
          {isScannerMode ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Scan className="w-4 h-4" />
          )}
          Scan
        </button>
        
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Generate
        </button>
      </div>
      
      {isScannerMode && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scan className="w-4 h-4 text-blue-500 animate-pulse" />
              <span className="text-sm text-blue-700">Scanner mode active - Scan barcode now</span>
            </div>
            <button
              type="button"
              onClick={cancelScannerMode}
              className="text-xs text-red-600 hover:text-red-700"
            >
              Cancel
            </button>
          </div>
          <p className="text-xs text-blue-600 mt-1">
            Scanning: {scannedValue || 'waiting for barcode...'}
          </p>
        </div>
      )}
      
      {getValidationMessage()}
      
      {error && (!validationResult || validationResult.isValid !== false) && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
      
      <p className="text-xs text-gray-500">
        You can either:
        <br />• Click <strong>Generate</strong> to create a unique barcode
        <br />• Click <strong>Scan</strong> and scan a barcode using your USB scanner
        <br />• Enter a barcode manually
        <br />• Leave empty - no barcode will be assigned
      </p>
    </div>
  );
};

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
        
        let quality = 0.4;
        
        if (file.size > 5 * 1024 * 1024) {
          quality = 0.25;
        } else if (file.size > 2 * 1024 * 1024) {
          quality = 0.3;
        } else if (file.size > 1 * 1024 * 1024) {
          quality = 0.35;
        } else if (file.size > 500 * 1024) {
          quality = 0.45;
        } else {
          quality = 0.55;
        }
        
        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
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

const uploadToCloudinary = async (file) => {
  const compressedFile = await compressImageSmart(file);
  
  const formData = new FormData();
  formData.append('file', compressedFile);
  formData.append('upload_preset', 'toys-products');
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    const data = await response.json();
    if (data.secure_url) {
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    } else {
      throw new Error(data.error?.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

const uploadVideoToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'toys-products');
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    const data = await response.json();
    if (data.secure_url) {
      toast.success('Video uploaded successfully');
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    } else {
      throw new Error(data.error?.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Cloudinary video upload error:', error);
    toast.error('Failed to upload video');
    throw error;
  }
};

const getYouTubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default function ModeratorEditToyProduct() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [childSubcategories, setChildSubcategories] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null);
  const [keywordInput, setKeywordInput] = useState('');
  const [barcodeValidation, setBarcodeValidation] = useState(null);
  const [originalBarcode, setOriginalBarcode] = useState(null);
  const [isGeneratingBarcode, setIsGeneratingBarcode] = useState(false);
  
  // Video upload type: 'upload' or 'youtube'
  const [videoType, setVideoType] = useState('upload');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  
  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const fileInputRefs = useRef([]);
  const videoInputRef = useRef(null);
  const autoSaveTimerRef = useRef(null);

  const [formData, setFormData] = useState({
    productName: '',
    shortDescription: '',
    fullDescription: '',
    category: '',
    subcategory: '',
    childSubcategory: '',
    brand: '',
    ageGroup: '',
    stockQuantity: 0,
    regularPrice: 0,
    discountPrice: 0,
    deliveryInfo: '',
    codAvailable: false,
    tags: [],
    promotion: '',
    isFeatured: false,
    rating: 0,
    additionalInfo: [],
    videoUrl: '',
    videoPublicId: '',
    videoType: 'upload',
    barcode: '',
    metaSettings: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: []
    }
  });

  // Product Images State (up to 6 images)
  const [productImages, setProductImages] = useState([
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null, isPrimary: false },
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null, isPrimary: false },
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null, isPrimary: false },
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null, isPrimary: false },
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null, isPrimary: false },
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null, isPrimary: false }
  ]);

  // Video upload state
  const [videoUpload, setVideoUpload] = useState({
    file: null,
    preview: null,
    uploading: false,
    error: '',
    url: null,
    publicId: null,
    isNew: false
  });

  const [additionalInfoInput, setAdditionalInfoInput] = useState({ fieldName: '', fieldValue: '' });
  const [ratingHover, setRatingHover] = useState(0);
  const [errors, setErrors] = useState({});

  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
  const maxFileSize = 5 * 1024 * 1024;
  const maxVideoSize = 100 * 1024 * 1024;

  // Editor setup
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isInstructionEditorReady, setIsInstructionEditorReady] = useState(false);
  const [isDeliveryEditorReady, setIsDeliveryEditorReady] = useState(false);

  const shortDescEditor = useEditor({
    extensions: [
      StarterKit,
      TiptapLink.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, shortDescription: editor.getHTML() }));
    },
    onReady: () => {
      setIsEditorReady(true);
    },
    immediatelyRender: false,
  });

  const fullDescEditor = useEditor({
    extensions: [
      StarterKit,
      TiptapLink.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, fullDescription: editor.getHTML() }));
    },
    onReady: () => {
      setIsInstructionEditorReady(true);
    },
    immediatelyRender: false,
  });

  const deliveryInfoEditor = useEditor({
    extensions: [
      StarterKit,
      TiptapLink.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, deliveryInfo: editor.getHTML() }));
    },
    onReady: () => {
      setIsDeliveryEditorReady(true);
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!productId) {
      toast.error('No product ID provided');
      router.push('/moderator/all-products');
    } else {
      fetchCategories();
      fetchProduct();
    }
  }, [productId]);

  useEffect(() => {
    if (formData.category) {
      fetchSubcategories(formData.category);
    } else {
      setSubcategories([]);
      setChildSubcategories([]);
    }
  }, [formData.category]);

  useEffect(() => {
    if (formData.category && formData.subcategory) {
      fetchChildSubcategories(formData.category, formData.subcategory);
    } else {
      setChildSubcategories([]);
    }
  }, [formData.subcategory]);

  useEffect(() => {
    if (shortDescEditor && originalProduct?.shortDescription) {
      const currentContent = shortDescEditor.getHTML();
      if (currentContent !== originalProduct.shortDescription) {
        shortDescEditor.commands.setContent(originalProduct.shortDescription);
      }
    }
  }, [shortDescEditor, originalProduct?.shortDescription]);

  useEffect(() => {
    if (fullDescEditor && originalProduct?.fullDescription) {
      const currentContent = fullDescEditor.getHTML();
      if (currentContent !== originalProduct.fullDescription) {
        fullDescEditor.commands.setContent(originalProduct.fullDescription);
      }
    }
  }, [fullDescEditor, originalProduct?.fullDescription]);

  useEffect(() => {
    if (deliveryInfoEditor && originalProduct?.deliveryInfo) {
      const currentContent = deliveryInfoEditor.getHTML();
      if (currentContent !== originalProduct.deliveryInfo) {
        deliveryInfoEditor.commands.setContent(originalProduct.deliveryInfo);
      }
    }
  }, [deliveryInfoEditor, originalProduct?.deliveryInfo]);

  useEffect(() => {
    if (isEditorReady && originalProduct?.shortDescription && shortDescEditor) {
      const currentContent = shortDescEditor.getHTML();
      if (currentContent !== originalProduct.shortDescription) {
        shortDescEditor.commands.setContent(originalProduct.shortDescription);
      }
    }
  }, [isEditorReady, originalProduct?.shortDescription, shortDescEditor]);

  useEffect(() => {
    if (isInstructionEditorReady && originalProduct?.fullDescription && fullDescEditor) {
      const currentContent = fullDescEditor.getHTML();
      if (currentContent !== originalProduct.fullDescription) {
        fullDescEditor.commands.setContent(originalProduct.fullDescription);
      }
    }
  }, [isInstructionEditorReady, originalProduct?.fullDescription, fullDescEditor]);

  useEffect(() => {
    if (isDeliveryEditorReady && originalProduct?.deliveryInfo && deliveryInfoEditor) {
      const currentContent = deliveryInfoEditor.getHTML();
      if (currentContent !== originalProduct.deliveryInfo) {
        deliveryInfoEditor.commands.setContent(originalProduct.deliveryInfo);
      }
    }
  }, [isDeliveryEditorReady, originalProduct?.deliveryInfo, deliveryInfoEditor]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setSubcategories(data.data.subcategories);
      } else {
        setSubcategories([]);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setSubcategories([]);
    }
  };

  const fetchChildSubcategories = async (categoryId, subcategoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setChildSubcategories(data.data.children);
      } else {
        setChildSubcategories([]);
      }
    } catch (error) {
      console.error('Error fetching child subcategories:', error);
      setChildSubcategories([]);
    }
  };

  const generateUniqueBarcode = async () => {
    setIsGeneratingBarcode(true);
    const toastId = toast.loading('Generating unique barcode...');
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/barcodes/generate-single', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormData(prev => ({ ...prev, barcode: data.data.barcodeNumber }));
        setBarcodeValidation({ isValid: true, status: 'available', message: 'New barcode generated and available' });
        setErrors(prev => ({ ...prev, barcode: null }));
        toast.success(`Barcode ${data.data.barcodeNumber} generated!`, { id: toastId });
      } else {
        toast.error(data.error || 'Failed to generate barcode', { id: toastId });
      }
    } catch (error) {
      console.error('Error generating barcode:', error);
      toast.error('Failed to generate barcode', { id: toastId });
    } finally {
      setIsGeneratingBarcode(false);
    }
  };

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      
      if (data.success) {
        const product = data.data.product;
        setOriginalProduct(product);
        setOriginalBarcode(product.barcode || '');
        
        setFormData({
          productName: product.productName || '',
          shortDescription: product.shortDescription || '',
          fullDescription: product.fullDescription || '',
          category: product.category?._id || product.category || '',
          subcategory: product.subcategory || '',
          childSubcategory: product.childSubcategory || '',
          brand: product.brand || '',
          ageGroup: product.ageGroup || '',
          stockQuantity: product.stockQuantity || 0,
          regularPrice: product.regularPrice || 0,
          discountPrice: product.discountPrice || 0,
          deliveryInfo: product.deliveryInfo || '',
          codAvailable: product.codAvailable || false,
          tags: product.tags || [],
          promotion: product.promotion || '',
          isFeatured: product.isFeatured || false,
          rating: product.rating || 0,
          additionalInfo: product.additionalInfo || [],
          videoUrl: product.videoUrl || '',
          videoPublicId: product.videoPublicId || '',
          videoType: product.videoType || 'upload',
          barcode: product.barcode || '',
          metaSettings: product.metaSettings || {
            metaTitle: '',
            metaDescription: '',
            metaKeywords: []
          }
        });

        if (product.videoUrl && product.videoType === 'youtube') {
          setVideoType('youtube');
          setYoutubeUrl(product.videoUrl);
        } else if (product.videoUrl) {
          setVideoType('upload');
          setVideoUpload({
            file: null,
            preview: product.videoUrl,
            uploading: false,
            error: '',
            url: product.videoUrl,
            publicId: product.videoPublicId,
            isNew: false
          });
        }

        if (product.images && product.images.length > 0) {
          const updatedImages = [...productImages];
          product.images.forEach((image, idx) => {
            if (idx < 6) {
              updatedImages[idx] = {
                id: `existing_${idx}`,
                file: null,
                preview: image.url,
                error: '',
                url: image.url,
                publicId: image.publicId,
                uploading: false,
                isNew: false,
                uploadAborted: false,
                uploadBatchId: null,
                isPrimary: idx === 0
              };
            }
          });
          setProductImages(updatedImages);
        }
        
        if (product.category?._id || product.category) {
          const categoryId = product.category?._id || product.category;
          await fetchSubcategories(categoryId);
          
          if (product.subcategory) {
            setFormData(prev => ({ ...prev, subcategory: product.subcategory }));
            await fetchChildSubcategories(categoryId, product.subcategory);
            
            if (product.childSubcategory) {
              setFormData(prev => ({ ...prev, childSubcategory: product.childSubcategory }));
            }
          }
        }

        setTimeout(() => {
          if (shortDescEditor && product.shortDescription) {
            shortDescEditor.commands.setContent(product.shortDescription);
          }
          if (fullDescEditor && product.fullDescription) {
            fullDescEditor.commands.setContent(product.fullDescription);
          }
          if (deliveryInfoEditor && product.deliveryInfo) {
            deliveryInfoEditor.commands.setContent(product.deliveryInfo);
          }
        }, 300);
        
      } else {
        toast.error('Failed to fetch product details');
        router.push('/moderator/all-products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to fetch product details');
      router.push('/moderator/all-products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBarcodeValidation = (result) => {
    setBarcodeValidation(result);
    if (result && !result.isValid && !result.isOwnBarcode) {
      setErrors(prev => ({ ...prev, barcode: result.message }));
    } else {
      setErrors(prev => ({ ...prev, barcode: null }));
    }
  };

  const validateImageFile = (file) => {
    if (!allowedImageTypes.includes(file.type)) {
      return { valid: false, message: `Invalid format. Allowed: JPG, PNG, WebP, GIF` };
    }
    if (file.size > maxFileSize) {
      return { valid: false, message: `File too large. Max: 5MB` };
    }
    return { valid: true };
  };

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    if (productImages[index].preview?.startsWith('blob:')) {
      URL.revokeObjectURL(productImages[index].preview);
    }

    const validation = validateImageFile(file);
    if (!validation.valid) {
      const updatedImages = [...productImages];
      updatedImages[index] = { ...updatedImages[index], error: validation.message };
      setProductImages(updatedImages);
      toast.error(`Image ${index + 1}: ${validation.message}`);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    const batchId = Date.now();
    const imageId = `new_${batchId}_${index}`;
    
    const updatedImages = [...productImages];
    updatedImages[index] = {
      id: imageId,
      file: file,
      preview: previewUrl,
      error: '',
      uploading: true,
      url: null,
      publicId: null,
      isNew: true,
      uploadAborted: false,
      uploadBatchId: batchId,
      isPrimary: false
    };
    setProductImages(updatedImages);

    try {
      const { url, publicId } = await uploadToCloudinary(file);
      
      setProductImages(prevImages => {
        const updated = [...prevImages];
        if (updated[index] && updated[index].uploadBatchId === batchId && !updated[index].uploadAborted) {
          updated[index] = {
            ...updated[index],
            url: url,
            publicId: publicId,
            uploading: false
          };
        }
        return updated;
      });
      toast.success(`Image ${index + 1} uploaded successfully`);
    } catch (error) {
      setProductImages(prevImages => {
        const updated = [...prevImages];
        if (updated[index] && updated[index].uploadBatchId === batchId) {
          updated[index] = {
            ...updated[index],
            error: 'Failed to upload image',
            uploading: false,
            preview: null,
            file: null,
            isNew: false
          };
        }
        return updated;
      });
      toast.error(`Failed to upload image ${index + 1}`);
    }
  };

  const handleMultipleImageSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    const currentImagesCount = productImages.filter(img => img.url !== null || img.uploading).length;
    const availableSlots = 6 - currentImagesCount;
    
    if (files.length > availableSlots) {
      toast.error(`You can only upload ${availableSlots} more image(s). Maximum 6 images total.`);
      if (fileInputRefs.current['multiple']) {
        fileInputRefs.current['multiple'].value = '';
      }
      return;
    }
    
    const emptySlots = [];
    for (let i = 0; i < productImages.length; i++) {
      if (!productImages[i].url && !productImages[i].uploading && !productImages[i].preview) {
        emptySlots.push(i);
      }
    }
    
    if (files.length > emptySlots.length) {
      toast.error(`Only ${emptySlots.length} slots available. Please remove some images first.`);
      if (fileInputRefs.current['multiple']) {
        fileInputRefs.current['multiple'].value = '';
      }
      return;
    }
    
    const batchId = Date.now();
    
    for (let i = 0; i < files.length && i < emptySlots.length; i++) {
      const file = files[i];
      const slotIndex = emptySlots[i];
      
      const validation = validateImageFile(file);
      if (!validation.valid) {
        toast.error(`Image ${i + 1}: ${validation.message}`);
        continue;
      }
      
      const previewUrl = URL.createObjectURL(file);
      const imageId = `new_${batchId}_${slotIndex}`;
      
      setProductImages(prevImages => {
        const updated = [...prevImages];
        updated[slotIndex] = {
          id: imageId,
          file: file,
          preview: previewUrl,
          error: '',
          uploading: true,
          url: null,
          publicId: null,
          isNew: true,
          uploadAborted: false,
          uploadBatchId: batchId,
          isPrimary: false
        };
        return updated;
      });
      
      try {
        const { url, publicId } = await uploadToCloudinary(file);
        setProductImages(prevImages => {
          const updated = [...prevImages];
          if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId && !updated[slotIndex].uploadAborted) {
            updated[slotIndex] = {
              ...updated[slotIndex],
              url: url,
              publicId: publicId,
              uploading: false
            };
          }
          return updated;
        });
        toast.success(`Image uploaded to slot ${slotIndex + 1}`);
      } catch (error) {
        setProductImages(prevImages => {
          const updated = [...prevImages];
          if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId) {
            updated[slotIndex] = {
              ...updated[slotIndex],
              error: 'Failed to upload image',
              uploading: false,
              preview: null,
              file: null,
              isNew: false
            };
          }
          return updated;
        });
        toast.error(`Failed to upload image to slot ${slotIndex + 1}`);
      }
    }
    
    if (fileInputRefs.current['multiple']) {
      fileInputRefs.current['multiple'].value = '';
    }
  };

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...productImages];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setProductImages(updatedImages);
  };

  const handleDragStart = (index) => {
    if (productImages[index].preview && !productImages[index].uploading) {
      setDraggedIndex(index);
    }
  };

  const handleDragOverWithFeedback = (event, index) => {
    event.preventDefault();
    if (productImages[index].preview && !productImages[index].uploading) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDropWithFeedback = (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDragOverIndex(null);
      setDraggedIndex(null);
      return;
    }
    if (!productImages[draggedIndex]?.uploading && !productImages[dropIndex]?.uploading) {
      moveImage(draggedIndex, dropIndex);
    } else {
      toast.error('Cannot reorder images while uploading');
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const removeImage = (index) => {
    const imageToRemove = productImages[index];
    
    setProductImages(prevImages => {
      const updated = [...prevImages];
      if (updated[index]) {
        updated[index].uploadAborted = true;
      }
      return updated;
    });
    
    if (!imageToRemove.isNew && imageToRemove.publicId) {
      setImagesToDelete(prev => [...prev, imageToRemove.publicId]);
    }
    
    if (imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    
    const updatedImages = [...productImages];
    updatedImages[index] = { 
      id: null,
      file: null, 
      preview: null, 
      error: '', 
      url: null, 
      publicId: null, 
      uploading: false,
      isNew: false,
      uploadAborted: false,
      uploadBatchId: null,
      isPrimary: false
    };
    setProductImages(updatedImages);
    
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].value = '';
    }
    
    toast.success(`Image removed from slot ${index + 1}`);
  };

  const handleVideoFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (videoUpload.preview?.startsWith('blob:')) {
      URL.revokeObjectURL(videoUpload.preview);
    }

    if (!allowedVideoTypes.includes(file.type)) {
      setVideoUpload({ ...videoUpload, error: 'Invalid format. Allowed: MP4, WebM, OGG, MOV' });
      toast.error('Invalid video format');
      return;
    }

    if (file.size > maxVideoSize) {
      setVideoUpload({ ...videoUpload, error: `File too large. Max: 100MB` });
      toast.error('Video too large. Max 100MB');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setVideoUpload({
      file: file,
      preview: previewUrl,
      uploading: true,
      error: '',
      url: null,
      publicId: null,
      isNew: true
    });

    try {
      const { url, publicId } = await uploadVideoToCloudinary(file);
      setVideoUpload({
        file: file,
        preview: previewUrl,
        uploading: false,
        error: '',
        url: url,
        publicId: publicId,
        isNew: true
      });
      setFormData(prev => ({ ...prev, videoUrl: url, videoPublicId: publicId, videoType: 'upload' }));
      toast.success('Video uploaded successfully');
    } catch (error) {
      setVideoUpload({
        ...videoUpload,
        error: 'Failed to upload video',
        uploading: false,
        preview: null,
        file: null,
        isNew: false
      });
      toast.error('Failed to upload video');
    }
  };

  const handleYoutubeUrlChange = (url) => {
    setYoutubeUrl(url);
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      setFormData(prev => ({ ...prev, videoUrl: embedUrl, videoType: 'youtube' }));
      if (videoUpload.preview?.startsWith('blob:')) {
        URL.revokeObjectURL(videoUpload.preview);
      }
      setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null, isNew: false });
      toast.success('YouTube link added successfully');
    } else if (url === '') {
      setFormData(prev => ({ ...prev, videoUrl: '', videoType: 'upload' }));
    }
  };

  const removeVideo = () => {
    if (videoUpload.url && !videoUpload.isNew && videoUpload.publicId) {
      setImagesToDelete(prev => [...prev, videoUpload.publicId]);
    }
    
    if (videoUpload.preview?.startsWith('blob:')) {
      URL.revokeObjectURL(videoUpload.preview);
    }
    setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null, isNew: false });
    setYoutubeUrl('');
    setFormData(prev => ({ ...prev, videoUrl: '', videoPublicId: '', videoType: 'upload' }));
    if (videoInputRef.current) videoInputRef.current.value = '';
    toast.success('Video removed');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : parseFloat(value);
    setFormData(prev => ({ ...prev, [name]: numValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleTagToggle = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handlePromotionSelect = (value) => {
    setFormData(prev => ({ ...prev, promotion: prev.promotion === value ? '' : value }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const addAdditionalInfo = () => {
    if (additionalInfoInput.fieldName.trim() && additionalInfoInput.fieldValue.trim()) {
      setFormData(prev => ({
        ...prev,
        additionalInfo: [
          ...prev.additionalInfo,
          { fieldName: additionalInfoInput.fieldName.trim(), fieldValue: additionalInfoInput.fieldValue.trim() }
        ]
      }));
      setAdditionalInfoInput({ fieldName: '', fieldValue: '' });
      toast.success('Additional info added');
    } else {
      toast.error('Please fill both field name and value');
    }
  };

  const removeAdditionalInfo = (index) => {
    const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
    toast.success('Item removed');
  };

  const addKeyword = () => {
    if (!keywordInput.trim()) return;
    
    const keywordsToAdd = keywordInput
      .split(',')
      .map(k => k.trim())
      .filter(k => k !== '');
    
    setFormData(prev => ({
      ...prev,
      metaSettings: {
        ...prev.metaSettings,
        metaKeywords: [...(prev.metaSettings.metaKeywords || []), ...keywordsToAdd]
      }
    }));
    setKeywordInput('');
  };

  const removeKeyword = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      metaSettings: {
        ...prev.metaSettings,
        metaKeywords: prev.metaSettings.metaKeywords.filter((_, index) => index !== indexToRemove)
      }
    }));
  };

  const handleMetaChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      metaSettings: { ...prev.metaSettings, [field]: value }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
    if (!formData.shortDescription || formData.shortDescription === '<p></p>') newErrors.shortDescription = 'Short description is required';
    if (!formData.fullDescription || formData.fullDescription === '<p></p>') newErrors.fullDescription = 'Full description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (formData.stockQuantity < 0) newErrors.stockQuantity = 'Stock quantity cannot be negative';
    if (formData.regularPrice <= 0) newErrors.regularPrice = 'Regular price must be greater than 0';
    if (formData.discountPrice > formData.regularPrice) newErrors.discountPrice = 'Discount price cannot exceed regular price';
    if (!formData.deliveryInfo || formData.deliveryInfo === '<p></p>') newErrors.deliveryInfo = 'Delivery information is required';
    if (formData.metaSettings.metaTitle?.length > 70) newErrors.metaTitle = 'Meta title should not exceed 70 characters';
    if (formData.metaSettings.metaDescription?.length > 160) newErrors.metaDescription = 'Meta description should not exceed 160 characters';

    const hasImages = productImages.some(img => img.url !== null);
    if (!hasImages) newErrors.images = 'At least one product image is required';

    if (formData.barcode) {
      if (!/^[0-9]{8,13}$/.test(formData.barcode)) {
        newErrors.barcode = 'Barcode must be 8-13 digits only';
      }
      if (barcodeValidation && barcodeValidation.isValid === false && !barcodeValidation.isOwnBarcode) {
        newErrors.barcode = barcodeValidation.message;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const hasChanges = () => {
    if (!originalProduct) return false;
    
    if (formData.productName !== originalProduct.productName) return true;
    if (formData.shortDescription !== originalProduct.shortDescription) return true;
    if (formData.fullDescription !== originalProduct.fullDescription) return true;
    if (formData.category !== (originalProduct.category?._id || originalProduct.category)) return true;
    if (formData.subcategory !== (originalProduct.subcategory || '')) return true;
    if (formData.childSubcategory !== (originalProduct.childSubcategory || '')) return true;
    if (formData.brand !== originalProduct.brand) return true;
    if (formData.ageGroup !== originalProduct.ageGroup) return true;
    if (Number(formData.stockQuantity) !== Number(originalProduct.stockQuantity)) return true;
    if (Number(formData.regularPrice) !== Number(originalProduct.regularPrice)) return true;
    if (Number(formData.discountPrice) !== Number(originalProduct.discountPrice)) return true;
    if (formData.deliveryInfo !== originalProduct.deliveryInfo) return true;
    if (formData.codAvailable !== originalProduct.codAvailable) return true;
    if (JSON.stringify(formData.tags) !== JSON.stringify(originalProduct.tags || [])) return true;
    if (formData.promotion !== originalProduct.promotion) return true;
    if (formData.isFeatured !== originalProduct.isFeatured) return true;
    if (Number(formData.rating) !== Number(originalProduct.rating)) return true;
    if (JSON.stringify(formData.additionalInfo) !== JSON.stringify(originalProduct.additionalInfo || [])) return true;
    if (JSON.stringify(formData.metaSettings) !== JSON.stringify(originalProduct.metaSettings || {})) return true;
    if (formData.barcode !== originalBarcode) return true;
    
    const currentImageUrls = productImages
      .filter(img => img.url !== null && !img.uploading && !img.uploadAborted && !img.isNew)
      .map(img => img.url);
    const originalImageUrls = (originalProduct.images || []).map(img => img.url);
    if (JSON.stringify(currentImageUrls) !== JSON.stringify(originalImageUrls)) return true;
    
    const hasNewImages = productImages.some(img => img.isNew && img.url !== null);
    if (hasNewImages) return true;
    
    if (formData.videoUrl !== (originalProduct.videoUrl || '')) return true;
    if (imagesToDelete.length > 0) return true;
    
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploading = productImages.some(img => img.uploading) || videoUpload.uploading;
    if (uploading) {
      toast.error('Please wait for all uploads to complete');
      return;
    }

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    if (!hasChanges()) {
      toast.info('No changes to save');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const imageUrls = productImages.filter(img => img.url !== null && !img.uploading && !img.uploadAborted).map(img => img.url);
      
      const finalVideoUrl = videoUpload.url || (youtubeUrl ? `https://www.youtube.com/embed/${getYouTubeVideoId(youtubeUrl)}` : formData.videoUrl);
      
      const payload = {
        productName: formData.productName,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        category: formData.category,
        subcategory: formData.subcategory,
        childSubcategory: formData.childSubcategory,
        brand: formData.brand,
        ageGroup: formData.ageGroup,
        stockQuantity: Number(formData.stockQuantity),
        regularPrice: Number(formData.regularPrice),
        discountPrice: Number(formData.discountPrice),
        deliveryInfo: formData.deliveryInfo,
        codAvailable: formData.codAvailable,
        tags: formData.tags,
        promotion: formData.promotion,
        isFeatured: formData.isFeatured,
        rating: Number(formData.rating),
        additionalInfo: formData.additionalInfo,
        videoUrl: finalVideoUrl,
        videoPublicId: videoUpload.publicId || formData.videoPublicId,
        videoType: formData.videoType,
        barcode: formData.barcode || undefined,
        metaSettings: {
          metaTitle: formData.metaSettings.metaTitle,
          metaDescription: formData.metaSettings.metaDescription,
          metaKeywords: formData.metaSettings.metaKeywords || []
        },
        images: imageUrls,
        imagesToDelete: imagesToDelete
      };

      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Product updated successfully!');
        router.push('/moderator/all-products');
      } else {
        toast.error(data.error || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const discountPercentage = formData.regularPrice && formData.discountPrice 
    ? Math.round(((formData.regularPrice - formData.discountPrice) / formData.regularPrice) * 100)
    : 0;

  const getVideoPreview = () => {
    if (videoUpload.url) {
      return (
        <div className="relative">
          <video src={videoUpload.url} className="w-full rounded-lg" controls />
          <button
            type="button"
            onClick={removeVideo}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    } else if (youtubeUrl && getYouTubeVideoId(youtubeUrl)) {
      const videoId = getYouTubeVideoId(youtubeUrl);
      return (
        <div className="relative">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="w-full rounded-lg aspect-video"
            allowFullScreen
          />
          <button
            type="button"
            onClick={removeVideo}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    } else if (formData.videoUrl && formData.videoType === 'youtube') {
      const videoId = getYouTubeVideoId(formData.videoUrl);
      if (videoId) {
        return (
          <div className="relative">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              className="w-full rounded-lg aspect-video"
              allowFullScreen
            />
            <button
              type="button"
              onClick={removeVideo}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      }
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#4A8A90] mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <MantineProvider>
      <div className="min-h-screen" style={{ backgroundColor: '#FFF9F0' }}>
        {/* Header */}
        <div className="bg-white border-b shadow-sm sticky top-0 z-10" style={{ borderBottomColor: '#FFB6C1' }}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <NextLink href="/moderator/all-products" className="p-2 hover:bg-pink-50 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" style={{ color: '#4A8A90' }} />
                </NextLink>
                <div>
                  <div className="flex items-center gap-2">
                    <Gift className="w-6 h-6" style={{ color: '#4A8A90' }} />
                    <h1 className="text-2xl font-bold" style={{ color: '#2D3A5C', fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                      Edit Toy Product
                    </h1>
                    <span className="px-2 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#D4EDEE', color: '#4A8A90' }}>
                      Moderator
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Update product information for your toy collection</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {!hasChanges() && originalProduct && (
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    No pending changes
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                      <Package className="w-5 h-5" style={{ color: '#4A8A90' }} />
                      Basic Information
                    </h2>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
                          errors.productName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Magical Unicorn Plush Toy, STEM Robot Kit"
                      />
                      {errors.productName && <p className="text-xs text-red-600 mt-1">{errors.productName}</p>}
                    </div>

                    {/* Barcode Field with Generate and Scan */}
                    <BarcodeInput
                      value={formData.barcode}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, barcode: e.target.value }));
                        setErrors(prev => ({ ...prev, barcode: null }));
                      }}
                      onValidate={handleBarcodeValidation}
                      error={errors.barcode}
                      onGenerate={generateUniqueBarcode}
                      isGenerating={isGeneratingBarcode}
                      productId={productId}
                      originalBarcode={originalBarcode}
                    />

                    {/* Short Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Short Description <span className="text-red-500">*</span>
                      </label>
                      {isMounted && shortDescEditor && (
                        <div className={`border rounded-lg overflow-hidden ${errors.shortDescription ? 'border-red-500' : 'border-gray-300'}`}>
                          <RichTextEditor editor={shortDescEditor}>
                            <RichTextEditor.Toolbar>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignRight />
                              </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content />
                          </RichTextEditor>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Brief description shown in product listings</p>
                    </div>

                    {/* Full Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Description <span className="text-red-500">*</span>
                      </label>
                      {isMounted && fullDescEditor && (
                        <div className={`border rounded-lg overflow-hidden ${errors.fullDescription ? 'border-red-500' : 'border-gray-300'}`}>
                          <RichTextEditor editor={fullDescEditor}>
                            <RichTextEditor.Toolbar>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1 />
                                <RichTextEditor.H2 />
                                <RichTextEditor.H3 />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignRight />
                              </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content />
                          </RichTextEditor>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Categories Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                      <Layers className="w-5 h-5" style={{ color: '#4A8A90' }} />
                      Categories & Classification
                    </h2>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
                            errors.category ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select Category</option>
                          {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                          ))}
                        </select>
                        {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subcategory <span className="text-gray-400 text-xs">(Optional)</span>
                        </label>
                        <select
                          name="subcategory"
                          value={formData.subcategory}
                          onChange={handleChange}
                          disabled={!formData.category || subcategories.length === 0}
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed border-gray-300"
                        >
                          <option value="">Select Subcategory</option>
                          {subcategories.map(sub => (
                            <option key={sub._id} value={sub._id}>{sub.name}</option>
                          ))}
                        </select>
                      </div>

                      {childSubcategories.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Child Subcategory <span className="text-gray-400 text-xs">(Optional)</span>
                          </label>
                          <select
                            name="childSubcategory"
                            value={formData.childSubcategory}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition border-gray-300"
                          >
                            <option value="">Select Child Subcategory</option>
                            {childSubcategories.map(child => (
                              <option key={child._id} value={child._id}>{child.name}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Brand <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="brand"
                          value={formData.brand}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
                            errors.brand ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="e.g., LEGO, Mattel, Hasbro"
                        />
                        {errors.brand && <p className="text-xs text-red-600 mt-1">{errors.brand}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Age Group <span className="text-gray-400 text-xs">(Optional)</span>
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, ageGroup: '' }))}
                            className={`p-2 rounded-lg border-2 transition-all text-center ${
                              !formData.ageGroup
                                ? 'border-[#4A8A90] bg-[#D4EDEE]'
                                : 'border-gray-200 hover:border-[#FFB6C1]'
                            }`}
                          >
                            <span className="text-lg">🎈</span>
                            <p className="text-[10px] font-medium mt-1">All Kids</p>
                          </button>
                          {AGE_GROUPS.map(age => (
                            <button
                              key={age.value}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, ageGroup: age.value }))}
                              className={`p-2 rounded-lg border-2 transition-all text-center ${
                                formData.ageGroup === age.value
                                  ? 'border-[#4A8A90] bg-[#D4EDEE]'
                                  : 'border-gray-200 hover:border-[#FFB6C1]'
                              }`}
                            >
                              <span className="text-lg">{age.icon}</span>
                              <p className="text-[10px] font-medium mt-1">{age.label}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                      <DollarSign className="w-5 h-5" style={{ color: '#4A8A90' }} />
                      Pricing & Inventory
                    </h2>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SKU Code</label>
                        <input
                          type="text"
                          value={originalProduct?.skuCode || 'Auto-generated'}
                          disabled
                          className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg font-mono text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">SKU is auto-generated and cannot be changed</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stock Quantity <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="stockQuantity"
                          value={formData.stockQuantity}
                          onChange={handleNumberChange}
                          onWheel={(e) => e.target.blur()}
                          min="0"
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
                            errors.stockQuantity ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Regular Price (৳) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="regularPrice"
                          value={formData.regularPrice || ''}
                          onChange={handleNumberChange}
                          onWheel={(e) => e.target.blur()}
                          min="0"
                          step="1"
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
                            errors.regularPrice ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price (৳)</label>
                        <div className="relative">
                          <input
                            type="number"
                            name="discountPrice"
                            value={formData.discountPrice || ''}
                            onChange={handleNumberChange}
                            onWheel={(e) => e.target.blur()}
                            min="0"
                            step="1"
                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
                              errors.discountPrice ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="0"
                          />
                          {discountPercentage > 0 && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <span className="text-xs font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
                                {discountPercentage}% OFF
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Details <span className="text-red-500">*</span>
                      </label>
                      {isMounted && deliveryInfoEditor && (
                        <div className={`border rounded-lg overflow-hidden ${errors.deliveryInfo ? 'border-red-500' : 'border-gray-300'}`}>
                          <RichTextEditor editor={deliveryInfoEditor}>
                            <RichTextEditor.Toolbar>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignRight />
                              </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content />
                          </RichTextEditor>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Include shipping information, delivery time, and other delivery-related details
                      </p>
                      {errors.deliveryInfo && <p className="text-xs text-red-600 mt-1">{errors.deliveryInfo}</p>}
                    </div>

                    <div className="mt-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.codAvailable}
                          onChange={(e) => setFormData(prev => ({ ...prev, codAvailable: e.target.checked }))}
                          className="w-5 h-5 rounded border-gray-300 text-[#4A8A90] focus:ring-[#4A8A90]"
                          style={{ accentColor: '#4A8A90' }}
                        />
                        <div>
                          <span className="text-sm font-medium text-gray-700">Cash on Delivery Available</span>
                          <p className="text-xs text-gray-500">Enable COD payment option for this product</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}>
                      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                        <Info className="w-5 h-5" style={{ color: '#4A8A90' }} />
                        Additional Information
                      </h2>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showAdditionalInfo ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  {showAdditionalInfo && (
                    <div className="p-5">
                      <div className="space-y-4">
                        {formData.additionalInfo.map((info, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#FFF9F0', border: '1px solid #D4EDEE' }}>
                            <div className="flex-1 grid grid-cols-2 gap-3">
                              <span className="text-sm font-medium" style={{ color: '#4A8A90' }}>{info.fieldName}:</span>
                              <span className="text-sm text-gray-600">{info.fieldValue}</span>
                            </div>
                            <button type="button" onClick={() => removeAdditionalInfo(index)} className="text-gray-400 hover:text-red-500">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <div className="flex gap-3">
                          <input
                            type="text"
                            placeholder="e.g., Material"
                            value={additionalInfoInput.fieldName}
                            onChange={(e) => setAdditionalInfoInput({ ...additionalInfoInput, fieldName: e.target.value })}
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
                          />
                          <input
                            type="text"
                            placeholder="e.g., Premium Cotton"
                            value={additionalInfoInput.fieldValue}
                            onChange={(e) => setAdditionalInfoInput({ ...additionalInfoInput, fieldValue: e.target.value })}
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
                          />
                          <button
                            type="button"
                            onClick={addAdditionalInfo}
                            className="px-4 py-2 text-white rounded-lg transition-colors"
                            style={{ backgroundColor: '#4A8A90' }}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Meta Settings for SEO */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowMeta(!showMeta)}>
                      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                        <Hash className="w-5 h-5" style={{ color: '#4A8A90' }} />
                        SEO & Meta Settings
                      </h2>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showMeta ? 'rotate-180' : ''}`} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Optimize your product for search engines</p>
                  </div>
                  
                  {showMeta && (
                    <div className="p-5">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Meta Title
                            <span className="text-xs text-gray-400 ml-2">(70 characters max)</span>
                          </label>
                          <input
                            type="text"
                            value={formData.metaSettings.metaTitle}
                            onChange={(e) => handleMetaChange('metaTitle', e.target.value)}
                            maxLength="70"
                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
                              errors.metaTitle ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g., Buy Educational STEM Toys for Kids | Toy Store Bangladesh"
                          />
                          <div className="flex justify-end mt-1">
                            <span className={`text-xs ${formData.metaSettings.metaTitle?.length > 70 ? 'text-red-500' : 'text-gray-400'}`}>
                              {formData.metaSettings.metaTitle?.length || 0}/70
                            </span>
                          </div>
                          {errors.metaTitle && <p className="text-xs text-red-600 mt-1">{errors.metaTitle}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Meta Description
                            <span className="text-xs text-gray-400 ml-2">(160 characters max)</span>
                          </label>
                          <textarea
                            value={formData.metaSettings.metaDescription}
                            onChange={(e) => handleMetaChange('metaDescription', e.target.value)}
                            maxLength="160"
                            rows="3"
                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition resize-none ${
                              errors.metaDescription ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Write a compelling description that appears in search engine results..."
                          />
                          <div className="flex justify-end mt-1">
                            <span className={`text-xs ${formData.metaSettings.metaDescription?.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                              {formData.metaSettings.metaDescription?.length || 0}/160
                            </span>
                          </div>
                          {errors.metaDescription && <p className="text-xs text-red-600 mt-1">{errors.metaDescription}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Meta Keywords
                            <span className="text-xs text-gray-400 ml-2">(Comma separated)</span>
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={keywordInput}
                              onChange={(e) => setKeywordInput(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addKeyword();
                                }
                              }}
                              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition"
                              placeholder="e.g., educational toys, STEM kit, learning games"
                            />
                            <button
                              type="button"
                              onClick={addKeyword}
                              className="px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2"
                              style={{ backgroundColor: '#4A8A90' }}
                            >
                              <Plus className="w-4 h-4" />
                              Add
                            </button>
                          </div>
                          
                          {formData.metaSettings.metaKeywords && formData.metaSettings.metaKeywords.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {formData.metaSettings.metaKeywords.map((keyword, index) => (
                                <div
                                  key={index}
                                  className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full"
                                  style={{ backgroundColor: '#D4EDEE', color: '#4A8A90' }}
                                >
                                  <span>{keyword}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeKeyword(index)}
                                    className="hover:text-red-500 transition-colors"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                          <p className="text-xs text-gray-500 mt-2">
                            Keywords help search engines understand your product. Add relevant terms separated by commas.
                          </p>
                        </div>

                        {(formData.metaSettings.metaTitle || formData.metaSettings.metaDescription) && (
                          <div className="mt-4 p-3 rounded-lg border border-gray-200 bg-gray-50">
                            <p className="text-xs font-medium text-gray-500 mb-2">Search Engine Preview:</p>
                            <div className="space-y-1">
                              {formData.metaSettings.metaTitle && (
                                <p className="text-base font-medium text-blue-700 line-clamp-1">
                                  {formData.metaSettings.metaTitle}
                                </p>
                              )}
                              {formData.metaSettings.metaTitle && (
                                <p className="text-xs text-green-700">
                                  https://yourstore.com/product/{formData.productName?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'product-slug'}
                                </p>
                              )}
                              {formData.metaSettings.metaDescription && (
                                <p className="text-xs text-gray-600 line-clamp-2">
                                  {formData.metaSettings.metaDescription}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Product Images Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                      <ImageIcon className="w-5 h-5" style={{ color: '#4A8A90' }} />
                      Product Images <span className="text-red-500">*</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Upload up to 6 images (JPG, PNG, WebP, max 5MB each) • Drag to reorder</p>
                  </div>
                  
                  <div className="p-5">
                    {errors.images && (
                      <p className="text-xs text-red-600 mb-4 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.images}
                      </p>
                    )}
                    
                    <div className="mb-4">
                      <input
                        type="file"
                        id="multiple-images"
                        className="hidden"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        multiple
                        onChange={handleMultipleImageSelect}
                        ref={el => {
                          if (el) fileInputRefs.current['multiple'] = el;
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRefs.current['multiple']?.click()}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed transition-colors"
                        style={{ backgroundColor: '#D4EDEE', color: '#4A8A90', borderColor: '#4A8A90' }}
                      >
                        <Upload className="w-5 h-5" />
                        <span>Select Multiple Images (Up to 6)</span>
                      </button>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        You can select multiple images at once. Images will be uploaded automatically.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {productImages.map((img, index) => (
                        <div
                          key={index}
                          draggable={img.preview !== null && !img.uploading}
                          onDragStart={() => handleDragStart(index)}
                          onDragOver={(e) => handleDragOverWithFeedback(e, index)}
                          onDragLeave={handleDragLeave}
                          onDrop={() => handleDropWithFeedback(index)}
                          onDragEnd={handleDragEnd}
                          className={`transition-all duration-200 ${
                            draggedIndex === index ? 'opacity-50 scale-95' : ''
                          } ${
                            dragOverIndex === index && draggedIndex !== index && draggedIndex !== null 
                              ? 'ring-2 ring-[#4A8A90] ring-offset-2 rounded-lg' 
                              : ''
                          }`}
                        >
                          {img.preview ? (
                            <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 h-40 hover:border-[#4A8A90] transition-colors cursor-grab active:cursor-grabbing bg-gray-100">
                              <div className="absolute top-1 left-1 bg-black/50 rounded px-1.5 py-0.5 z-10">
                                <GripVertical className="w-3 h-3 text-white" />
                              </div>
                              
                              <img 
                                src={img.preview} 
                                alt={`Product ${index + 1}`} 
                                className="w-full h-full object-contain bg-gray-100"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/150?text=Error';
                                }}
                              />
                              
                              {img.uploading && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                                </div>
                              )}
                              
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-20"
                                title="Remove image"
                              >
                                <X className="w-3 h-3" />
                              </button>
                              
                              {index === 0 && img.url && !img.uploading && (
                                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-green-500 text-white text-[10px] rounded z-10">
                                  Primary
                                </span>
                              )}
                            </div>
                          ) : (
                            <div 
                              className={`border-2 border-dashed rounded-lg p-4 text-center h-40 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                                img.error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-[#4A8A90] hover:bg-[#D4EDEE]'
                              }`}
                              onClick={() => fileInputRefs.current[index]?.click()}
                            >
                              <input 
                                type="file" 
                                ref={el => fileInputRefs.current[index] = el}
                                className="hidden" 
                                accept="image/jpeg,image/jpg,image/png,image/webp" 
                                onChange={(e) => handleImageChange(e, index)} 
                              />
                              <ImageIcon className={`w-8 h-8 mx-auto mb-2 ${img.error ? 'text-red-400' : 'text-gray-400'}`} />
                              <p className={`text-xs ${img.error ? 'text-red-600' : 'text-gray-600'}`}>
                                Slot {index + 1}
                              </p>
                              <p className="text-[10px] text-gray-400 mt-1">Click to upload</p>
                              {img.error && (
                                <p className="text-xs text-red-600 mt-1">{img.error}</p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {productImages.some(img => img.uploading) && (
                      <div className="mt-4 p-2 rounded-lg" style={{ backgroundColor: '#D4EDEE' }}>
                        <p className="text-xs" style={{ color: '#4A8A90' }}>
                          Uploading: {productImages.filter(img => img.uploading && !img.uploadAborted).length} image(s) remaining...
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-4 text-xs text-gray-500 text-center">
                      {productImages.filter(img => img.url !== null && !img.uploading && !img.uploadAborted).length} of 6 images uploaded
                    </div>
                    
                    {imagesToDelete.length > 0 && (
                      <div className="mt-2 text-xs text-red-500 text-center">
                        {imagesToDelete.length} image(s) marked for deletion
                      </div>
                    )}
                  </div>
                </div>

                {/* Video Upload Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                      <Video className="w-5 h-5" style={{ color: '#4A8A90' }} />
                      Product Video <span className="text-gray-400 text-xs">(Optional)</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Upload a video or add a YouTube link to showcase your toy</p>
                  </div>
                  <div className="p-5">
                    <div className="flex gap-2 mb-4">
                      <button
                        type="button"
                        onClick={() => setVideoType('upload')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                          videoType === 'upload'
                            ? 'text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        style={videoType === 'upload' ? { backgroundColor: '#4A8A90' } : {}}
                      >
                        <Upload className="w-4 h-4 inline mr-1" />
                        Upload Video
                      </button>
                      <button
                        type="button"
                        onClick={() => setVideoType('youtube')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                          videoType === 'youtube'
                            ? 'text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        style={videoType === 'youtube' ? { backgroundColor: '#4A8A90' } : {}}
                      >
                        <Youtube className="w-4 h-4 inline mr-1" />
                        YouTube Link
                      </button>
                    </div>

                    {getVideoPreview()}

                    {videoType === 'upload' && !videoUpload.url && !videoUpload.preview && !formData.videoUrl && (
                      <div
                        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-[#4A8A90] transition-colors"
                        onClick={() => videoInputRef.current?.click()}
                      >
                        <input
                          type="file"
                          ref={videoInputRef}
                          className="hidden"
                          accept="video/*"
                          onChange={handleVideoFileChange}
                        />
                        <Video className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                        <p className="text-sm text-gray-500">Click or drag to upload video</p>
                        <p className="text-xs text-gray-400 mt-1">MP4, WebM, MOV (Max 100MB)</p>
                      </div>
                    )}

                    {videoType === 'youtube' && !formData.videoUrl && !youtubeUrl && (
                      <div className="space-y-3">
                        <div className="relative">
                          <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                          <input
                            type="text"
                            value={youtubeUrl}
                            onChange={(e) => handleYoutubeUrlChange(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          Paste any YouTube video URL. The video will be embedded on your product page.
                        </p>
                      </div>
                    )}

                    {videoUpload.error && (
                      <p className="text-xs text-red-500 mt-2">{videoUpload.error}</p>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                      <Star className="w-5 h-5" style={{ color: '#4A8A90' }} />
                      Product Rating
                    </h2>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          onMouseEnter={() => setRatingHover(star)}
                          onMouseLeave={() => setRatingHover(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star 
                            className={`w-8 h-8 ${
                              (ratingHover || formData.rating) >= star
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        {formData.rating > 0 ? `${formData.rating} out of 5 stars` : 'No rating yet'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">Set the initial product rating (1-5 stars)</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                      <Tag className="w-5 h-5" style={{ color: '#4A8A90' }} />
                      Product Tags
                    </h2>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                      {AVAILABLE_TAGS.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleTagToggle(tag)}
                          className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                            formData.tags.includes(tag)
                              ? 'text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          style={formData.tags.includes(tag) ? { backgroundColor: '#4A8A90' } : {}}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: '#D4EDEE' }}>
                        <p className="text-xs font-medium mb-2" style={{ color: '#4A8A90' }}>Selected Tags:</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full" style={{ backgroundColor: '#4A8A90', color: 'white' }}>
                              {tag}
                              <button type="button" onClick={() => handleTagToggle(tag)} className="hover:opacity-70">
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Promotion */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                      <Sparkles className="w-5 h-5" style={{ color: '#4A8A90' }} />
                      Promotions
                    </h2>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-2">
                      {PROMOTION_OPTIONS.map(promo => (
                        <button
                          key={promo.value}
                          type="button"
                          onClick={() => handlePromotionSelect(promo.value)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                            formData.promotion === promo.value
                              ? 'border-[#FFB6C1] bg-pink-50'
                              : 'border-gray-200 hover:border-[#D4EDEE]'
                          }`}
                        >
                          <span className="text-base">{promo.icon}</span>
                          <span className="text-xs font-medium">{promo.label}</span>
                        </button>
                      ))}
                    </div>
                    <label className="flex items-center gap-3 mt-4 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        className="w-4 h-4"
                        style={{ accentColor: '#4A8A90' }}
                      />
                      <span className="text-sm text-gray-700">Feature this product on homepage</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="mt-8 flex justify-end gap-3">
              <NextLink href="/moderator/all-products">
                <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </NextLink>
             
              <button
                type="submit"
                disabled={isSubmitting || !hasChanges()}
                className="flex items-center gap-2 px-6 py-2.5 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                style={{ backgroundColor: '#4A8A90' }}
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSubmitting ? 'Updating...' : 'Update Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MantineProvider>
  );
}