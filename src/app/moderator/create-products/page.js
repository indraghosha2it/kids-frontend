
// 'use client';

// import { useState, useEffect, useRef, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
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

// // Cloudinary upload function for images
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
// //       throw new Error(data.error?.message || 'Upload failed');
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
//       throw new Error(data.error?.message || 'Upload failed');
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
// //       throw new Error(data.error?.message || 'Upload failed');
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
//       throw new Error(data.error?.message || 'Upload failed');
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

// // Restore Draft Modal Component
// const RestoreDraftModal = ({ isOpen, onConfirm, onCancel, draftData }) => {
//   if (!isOpen) return null;
  
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
//         <div className="flex items-center gap-3 text-amber-600 mb-4">
//           <AlertCircle className="w-6 h-6" />
//           <h3 className="text-lg font-semibold">Unsaved Draft Found</h3>
//         </div>
        
//         <p className="text-sm text-gray-600 mb-2">
//           You have unsaved draft data from your last session.
//         </p>
//         <p className="text-xs text-gray-500 mb-4">
//           Would you like to restore it? If you choose not to restore, the draft will be discarded.
//         </p>
        
//         {draftData && (
//           <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs">
//             <p className="font-medium text-gray-700 mb-1">Draft preview:</p>
//             {draftData.productName && (
//               <p className="text-gray-600">Product: {draftData.productName}</p>
//             )}
//             {draftData.brand && (
//               <p className="text-gray-600">Brand: {draftData.brand}</p>
//             )}
//             {draftData.ageGroup && (
//               <p className="text-gray-600">Age: {draftData.ageGroup} years</p>
//             )}
//             <p className="text-gray-500 mt-1">
//               Last saved: {new Date().toLocaleString()}
//             </p>
//           </div>
//         )}
        
//         <div className="flex items-center justify-end gap-3 mt-4">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//           >
//             Discard Draft
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
//             style={{ backgroundColor: '#4A8A90' }}
//           >
//             Restore Draft
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Save to localStorage key
// const DRAFT_KEY = 'toy_product_draft_moderator';

// export default function ModeratorCreateToyProduct() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSavingDraft, setIsSavingDraft] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [childSubcategories, setChildSubcategories] = useState([]);
//   const [isMounted, setIsMounted] = useState(false);
//   const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
//   const [showMeta, setShowMeta] = useState(false);
//   const [generatedSku, setGeneratedSku] = useState('');
//   const [lastSaved, setLastSaved] = useState(null);
  
//   // Restore modal state
//   const [showRestoreModal, setShowRestoreModal] = useState(false);
//   const [pendingDraft, setPendingDraft] = useState(null);
  
//   // Video upload type: 'upload' or 'youtube'
//   const [videoType, setVideoType] = useState('upload');
//   const [youtubeUrl, setYoutubeUrl] = useState('');
  
//   // Drag and drop state
//   const [draggedIndex, setDraggedIndex] = useState(null);
//   const [dragOverIndex, setDragOverIndex] = useState(null);

//   const fileInputRefs = useRef([]);
//   const videoInputRef = useRef(null);
//   const autoSaveTimerRef = useRef(null);
//   const hasChangesRef = useRef(false);

//   const [formData, setFormData] = useState({
//     productName: '',
//     shortDescription: '',
//     fullDescription: '',
//     category: '',
//     subcategory: '',
//     childSubcategory: '',
//     brand: '',
//     ageGroup: '',
//     stockQuantity: '',
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
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null }
//   ]);

//   // Video upload state
//   const [videoUpload, setVideoUpload] = useState({
//     file: null,
//     preview: null,
//     uploading: false,
//     error: '',
//     url: null,
//     publicId: null
//   });

//   const [keywordInput, setKeywordInput] = useState('');
//   const [isEditorReady, setIsEditorReady] = useState(false);
//   const [isInstructionEditorReady, setIsInstructionEditorReady] = useState(false);
//   const [isDeliveryEditorReady, setIsDeliveryEditorReady] = useState(false);

//   const [additionalInfoInput, setAdditionalInfoInput] = useState({ fieldName: '', fieldValue: '' });
//   const [ratingHover, setRatingHover] = useState(0);

//   const [errors, setErrors] = useState({});

//   const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
//   const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
//   const maxFileSize = 5 * 1024 * 1024;
//   const maxVideoSize = 100 * 1024 * 1024;

//   // Editor setup
//   const shortDescEditor = useEditor({
//     extensions: [
//       StarterKit,
//       TiptapLink.configure({ openOnClick: false }),
//       TextAlign.configure({ types: ['heading', 'paragraph'] }),
//     ],
//     content: formData.shortDescription,
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
//     content: formData.fullDescription,
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
//     content: formData.deliveryInfo,
//     onUpdate: ({ editor }) => {
//       setFormData(prev => ({ ...prev, deliveryInfo: editor.getHTML() }));
//     },
//     onReady: () => {
//       setIsDeliveryEditorReady(true);
//     },
//     immediatelyRender: false,
//   });

//   // Load draft from localStorage on mount
// // Load draft from localStorage on mount
// useEffect(() => {
//   const loadDraft = () => {
//     try {
//       const savedDraft = localStorage.getItem(DRAFT_KEY);
      
//       if (savedDraft) {
//         const draft = JSON.parse(savedDraft);
        
//         // Check if draft has any meaningful data
//         const hasData = (draft.formData?.productName && draft.formData.productName.trim() !== '') || 
//                        (draft.formData?.shortDescription && draft.formData.shortDescription !== '<p></p>') ||
//                        (draft.formData?.fullDescription && draft.formData.fullDescription !== '<p></p>') ||
//                        (draft.formData?.deliveryInfo && draft.formData.deliveryInfo !== '<p></p>') ||
//                        (draft.productImages && draft.productImages.some(img => img.url)) ||
//                        (draft.videoUpload?.url);
        
//         if (!hasData) {
//           // No actual data, clean up and clear flag
//           console.log('No meaningful data in draft');
//           localStorage.removeItem(DRAFT_KEY);
//           sessionStorage.removeItem('draft_discarded_moderator');
//           return;
//         }
        
//         // Check if draft was discarded in this session
//         const draftDiscarded = sessionStorage.getItem('draft_discarded_moderator');
//         if (draftDiscarded === 'true') {
//           console.log('Draft was discarded in this session, checking if this is a NEW draft...');
//           // Check if this draft is different from the discarded one
//           // For now, clear the flag after 5 seconds (enough time to reload)
//           // Better: compare timestamps
//           const discardedTime = sessionStorage.getItem('draft_discarded_time');
//           const draftTime = new Date(draft.lastSaved).getTime();
          
//           if (discardedTime && draftTime > parseInt(discardedTime)) {
//             // This is a newer draft, so show the modal
//             console.log('This is a newer draft, showing modal');
//             sessionStorage.removeItem('draft_discarded_moderator');
//             sessionStorage.removeItem('draft_discarded_time');
//           } else {
//             console.log('Skipping modal due to discard flag');
//             return;
//           }
//         }
        
//         console.log('Found draft with data, showing restore modal');
        
//         if (draft.formData) {
//           setFormData(draft.formData);
//           setVideoType(draft.formData.videoType || 'upload');
//           setYoutubeUrl(draft.formData.videoUrl || '');
//         }
//         if (draft.productImages) {
//           const restoredImages = productImages.map((img, idx) => {
//             const savedImg = draft.productImages[idx];
//             if (savedImg && savedImg.url) {
//               return {
//                 ...img,
//                 url: savedImg.url,
//                 publicId: savedImg.publicId,
//                 preview: savedImg.url,
//                 uploading: false,
//                 uploadAborted: false
//               };
//             }
//             return img;
//           });
//           setProductImages(restoredImages);
//         }
//         if (draft.videoUpload) {
//           setVideoUpload(draft.videoUpload);
//         }
//         if (draft.lastSaved) {
//           setLastSaved(new Date(draft.lastSaved));
//         }
        
//         setPendingDraft(draft);
//         setShowRestoreModal(true);
//       } else {
//         // No draft found, clear the discard flag
//         console.log('No draft found, clearing discard flag');
//         sessionStorage.removeItem('draft_discarded_moderator');
//         sessionStorage.removeItem('draft_discarded_time');
//       }
//     } catch (error) {
//       console.error('Error loading draft:', error);
//     }
//   };
//   loadDraft();
// }, []);

// const handleRestoreDraft = () => {
//   if (pendingDraft) {
//     try {
//       // Restore form data
//       if (pendingDraft.formData) {
//         const restoredData = {
//           ...pendingDraft.formData,
//           // Ensure arrays are properly restored
//           tags: Array.isArray(pendingDraft.formData.tags) ? pendingDraft.formData.tags : [],
//           additionalInfo: Array.isArray(pendingDraft.formData.additionalInfo) ? pendingDraft.formData.additionalInfo : [],
//           codAvailable: pendingDraft.formData.codAvailable || false,
//           deliveryInfo: pendingDraft.formData.deliveryInfo || '',
//           metaSettings: pendingDraft.formData.metaSettings || {
//             metaTitle: '',
//             metaDescription: '',
//             metaKeywords: []
//           }
//         };
        
//         setFormData(restoredData);
        
//         // Restore editor content after a short delay to ensure editors are ready
//         setTimeout(() => {
//           if (shortDescEditor && pendingDraft.formData.shortDescription) {
//             shortDescEditor.commands.setContent(pendingDraft.formData.shortDescription);
//           }
//           if (fullDescEditor && pendingDraft.formData.fullDescription) {
//             fullDescEditor.commands.setContent(pendingDraft.formData.fullDescription);
//           }
//           if (deliveryInfoEditor && pendingDraft.formData.deliveryInfo) {
//             deliveryInfoEditor.commands.setContent(pendingDraft.formData.deliveryInfo);
//           }
//         }, 200);
        
//         // Restore video type and URL
//         setVideoType(pendingDraft.formData.videoType || 'upload');
//         setYoutubeUrl(pendingDraft.formData.videoUrl || '');
//       }
      
//       // Restore product images
//       if (pendingDraft.productImages && pendingDraft.productImages.length > 0) {
//         const restoredImages = productImages.map((img, idx) => {
//           const savedImg = pendingDraft.productImages[idx];
//           if (savedImg && savedImg.url) {
//             return {
//               ...img,
//               url: savedImg.url,
//               publicId: savedImg.publicId,
//               preview: savedImg.url,
//               uploading: false,
//               uploadAborted: false
//             };
//           }
//           return img;
//         });
//         setProductImages(restoredImages);
//       }
      
//       // Restore video upload
//       if (pendingDraft.videoUpload) {
//         setVideoUpload(pendingDraft.videoUpload);
//       }
      
//       toast.success('Draft restored successfully');
      
//       // Force a re-save after restoration
//       setTimeout(() => {
//         saveToLocalStorage();
//       }, 500);
      
//     } catch (error) {
//       console.error('Error restoring draft:', error);
//       toast.error('Failed to restore draft');
//     }
//   }
//   setShowRestoreModal(false);
//   setPendingDraft(null);
// };

// const handleDiscardDraft = () => {
//   // Remove draft from localStorage
//   localStorage.removeItem(DRAFT_KEY);
  
//   // Set session flag with timestamp
//   sessionStorage.setItem('draft_discarded_moderator', 'true');
//   sessionStorage.setItem('draft_discarded_time', Date.now().toString());
  
//   // Clear the pending draft data
//   setPendingDraft(null);
  
//   // Close the modal
//   setShowRestoreModal(false);
  
//   // Reset form data
//   setFormData({
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
  
//   // Reset product images
//   setProductImages([
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null }
//   ]);
  
//   // Reset video upload
//   setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
//   setYoutubeUrl('');
//   setLastSaved(null);
//   setKeywordInput('');
//   setAdditionalInfoInput({ fieldName: '', fieldValue: '' });
//   setRatingHover(0);
  
//   // Clear editor contents
//   setTimeout(() => {
//     if (shortDescEditor && !shortDescEditor.isDestroyed) {
//       shortDescEditor.commands.setContent('');
//     }
//     if (fullDescEditor && !fullDescEditor.isDestroyed) {
//       fullDescEditor.commands.setContent('');
//     }
//     if (deliveryInfoEditor && !deliveryInfoEditor.isDestroyed) {
//       deliveryInfoEditor.commands.setContent('');
//     }
//   }, 100);
  
//   toast.success('Draft discarded');
// };

// const saveToLocalStorage = useCallback(() => {
//   try {
//     let currentShortDesc = formData.shortDescription;
//     let currentFullDesc = formData.fullDescription;
//     let currentDeliveryInfo = formData.deliveryInfo;
    
//     if (shortDescEditor && !shortDescEditor.isDestroyed) {
//       const editorContent = shortDescEditor.getHTML();
//       if (editorContent && editorContent !== '<p></p>') {
//         currentShortDesc = editorContent;
//       }
//     }
//     if (fullDescEditor && !fullDescEditor.isDestroyed) {
//       const editorContent = fullDescEditor.getHTML();
//       if (editorContent && editorContent !== '<p></p>') {
//         currentFullDesc = editorContent;
//       }
//     }
//     if (deliveryInfoEditor && !deliveryInfoEditor.isDestroyed) {
//       const editorContent = deliveryInfoEditor.getHTML();
//       if (editorContent && editorContent !== '<p></p>') {
//         currentDeliveryInfo = editorContent;
//       }
//     }
    
//     const draft = {
//       formData: {
//         ...formData,
//         shortDescription: currentShortDesc,
//         fullDescription: currentFullDesc,
//         deliveryInfo: currentDeliveryInfo,
//         videoType,
//         videoUrl: youtubeUrl
//       },
//       productImages: productImages.map(img => ({
//         ...img,
//         preview: img.url || null,
//         file: null,
//         uploading: false
//       })),
//       videoUpload: {
//         ...videoUpload,
//         preview: videoUpload.url || null,
//         file: null,
//         uploading: false
//       },
//       lastSaved: new Date().toISOString()
//     };
//     localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
//     setLastSaved(new Date());
//     console.log('Draft saved at:', new Date().toLocaleTimeString()); // Debug log
//   } catch (error) {
//     console.error('Error saving draft:', error);
//   }
// }, [formData, productImages, videoUpload, youtubeUrl, videoType, shortDescEditor, fullDescEditor, deliveryInfoEditor]);

//   // Auto-save on form changes
// // Auto-save on form changes
// // Auto-save effect - REPLACE your existing auto-save useEffect with this
// useEffect(() => {
//   if (!hasChangesRef.current) return;
  
//   if (autoSaveTimerRef.current) {
//     clearTimeout(autoSaveTimerRef.current);
//   }
  
//   autoSaveTimerRef.current = setTimeout(() => {
//     const hasContent = formData.productName || 
//                       formData.shortDescription || 
//                       formData.fullDescription ||
//                       formData.deliveryInfo ||
//                       productImages.some(img => img.url);
//     if (hasContent) {
//       console.log('Auto-saving changes...');
//       saveToLocalStorage();
//       hasChangesRef.current = false;
//     }
//   }, 3000);
  
//   return () => {
//     if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
//   };
// }, [formData.productName, formData.shortDescription, formData.fullDescription, formData.deliveryInfo, productImages, saveToLocalStorage]);

//   useEffect(() => {
//     setIsMounted(true);
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (formData.category) {
//       fetchSubcategories(formData.category);
//     } else {
//       setSubcategories([]);
//       setFormData(prev => ({ ...prev, subcategory: '', childSubcategory: '' }));
//       setChildSubcategories([]);
//     }
//   }, [formData.category]);

//   useEffect(() => {
//     if (formData.category && formData.subcategory) {
//       fetchChildSubcategories(formData.category, formData.subcategory);
//     } else {
//       setChildSubcategories([]);
//       setFormData(prev => ({ ...prev, childSubcategory: '' }));
//     }
//   }, [formData.subcategory]);

//   // Sync editor content
//   useEffect(() => {
//     if (shortDescEditor && isEditorReady && formData.shortDescription) {
//       const currentContent = shortDescEditor.getHTML();
//       if (currentContent !== formData.shortDescription && formData.shortDescription !== '<p></p>') {
//         shortDescEditor.commands.setContent(formData.shortDescription);
//       }
//     }
//   }, [shortDescEditor, isEditorReady, formData.shortDescription]);

//   useEffect(() => {
//     if (fullDescEditor && isInstructionEditorReady && formData.fullDescription) {
//       const currentContent = fullDescEditor.getHTML();
//       if (currentContent !== formData.fullDescription && formData.fullDescription !== '<p></p>') {
//         fullDescEditor.commands.setContent(formData.fullDescription);
//       }
//     }
//   }, [fullDescEditor, isInstructionEditorReady, formData.fullDescription]);

//  // After your useEffect for shortDescEditor and fullDescEditor, add this SINGLE effect:

// // Sync delivery info editor content when formData changes
// useEffect(() => {
//   if (deliveryInfoEditor && isDeliveryEditorReady && formData.deliveryInfo) {
//     const currentContent = deliveryInfoEditor.getHTML();
//     if (currentContent !== formData.deliveryInfo && formData.deliveryInfo !== '<p></p>') {
//       deliveryInfoEditor.commands.setContent(formData.deliveryInfo);
//     }
//   }
// }, [deliveryInfoEditor, isDeliveryEditorReady, formData.deliveryInfo]);

// // ADD THIS NEW useEffect - Mark that changes have occurred
// // Mark that changes have occurred - SIMPLIFIED VERSION
// useEffect(() => {
//   // Set hasChanges to true whenever any important field changes
//   hasChangesRef.current = true;
//   console.log('Changes detected, hasChangesRef set to true');
// }, [formData.productName, formData.shortDescription, formData.fullDescription, formData.deliveryInfo, productImages]);

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
    
//     const updatedImages = [...productImages];
//     updatedImages[index] = {
//       file: file,
//       preview: previewUrl,
//       error: '',
//       uploading: true,
//       url: null,
//       publicId: null,
//       uploadAborted: false,
//       uploadBatchId: batchId
//     };
//     setProductImages(updatedImages);
//     saveToLocalStorage();

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
//       saveToLocalStorage();
//     } catch (error) {
//       setProductImages(prevImages => {
//         const updated = [...prevImages];
//         if (updated[index] && updated[index].uploadBatchId === batchId) {
//           updated[index] = {
//             ...updated[index],
//             error: 'Failed to upload image',
//             uploading: false,
//             preview: null,
//             file: null
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
//     const uploadPromises = [];
    
//     for (let i = 0; i < files.length && i < emptySlots.length; i++) {
//       const file = files[i];
//       const slotIndex = emptySlots[i];
      
//       const validation = validateImageFile(file);
//       if (!validation.valid) {
//         toast.error(`Image ${i + 1}: ${validation.message}`);
//         continue;
//       }
      
//       const previewUrl = URL.createObjectURL(file);
      
//       setProductImages(prevImages => {
//         const updated = [...prevImages];
//         updated[slotIndex] = {
//           file: file,
//           preview: previewUrl,
//           error: '',
//           uploading: true,
//           url: null,
//           publicId: null,
//           uploadAborted: false,
//           uploadBatchId: batchId
//         };
//         return updated;
//       });
//       saveToLocalStorage();
      
//       const uploadPromise = (async () => {
//         try {
//           const { url, publicId } = await uploadToCloudinary(file);
//           setProductImages(prevImages => {
//             const updated = [...prevImages];
//             if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId && !updated[slotIndex].uploadAborted) {
//               updated[slotIndex] = {
//                 ...updated[slotIndex],
//                 url: url,
//                 publicId: publicId,
//                 uploading: false
//               };
//             }
//             return updated;
//           });
//           return { success: true, slotIndex };
//         } catch (error) {
//           setProductImages(prevImages => {
//             const updated = [...prevImages];
//             if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId) {
//               updated[slotIndex] = {
//                 ...updated[slotIndex],
//                 error: 'Failed to upload image',
//                 uploading: false,
//                 preview: null,
//                 file: null
//               };
//             }
//             return updated;
//           });
//           return { success: false, slotIndex };
//         }
//       })();
      
//       uploadPromises.push(uploadPromise);
//     }
    
//     const results = await Promise.all(uploadPromises);
//     const successfulUploads = results.filter(r => r && r.success).length;
//     const failedUploads = results.filter(r => r && !r.success).length;
    
//     if (successfulUploads > 0) {
//       toast.success(`${successfulUploads} image(s) uploaded successfully`);
//       saveToLocalStorage();
//     }
//     if (failedUploads > 0) {
//       toast.error(`${failedUploads} image(s) failed to upload`);
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
//     saveToLocalStorage();
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
    
//     if (imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) {
//       URL.revokeObjectURL(imageToRemove.preview);
//     }
    
//     const updatedImages = [...productImages];
//     updatedImages[index] = { 
//       file: null, 
//       preview: null, 
//       error: '', 
//       url: null, 
//       publicId: null, 
//       uploading: false,
//       uploadAborted: false,
//       uploadBatchId: null
//     };
//     setProductImages(updatedImages);
    
//     if (fileInputRefs.current[index]) {
//       fileInputRefs.current[index].value = '';
//     }
    
//     toast.success(`Image removed from slot ${index + 1}`);
//     saveToLocalStorage();
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
//       publicId: null
//     });
//     saveToLocalStorage();

//     try {
//       const { url, publicId } = await uploadVideoToCloudinary(file);
//       setVideoUpload({
//         file: file,
//         preview: previewUrl,
//         uploading: false,
//         error: '',
//         url: url,
//         publicId: publicId
//       });
//       setFormData(prev => ({ ...prev, videoUrl: url, videoPublicId: publicId, videoType: 'upload' }));
//       toast.success('Video uploaded successfully');
//       saveToLocalStorage();
//     } catch (error) {
//       setVideoUpload({
//         ...videoUpload,
//         error: 'Failed to upload video',
//         uploading: false,
//         preview: null,
//         file: null
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
//       setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
//       toast.success('YouTube link added successfully');
//     } else if (url === '') {
//       setFormData(prev => ({ ...prev, videoUrl: '', videoType: 'upload' }));
//     }
//     saveToLocalStorage();
//   };

//   const removeVideo = () => {
//     if (videoUpload.preview?.startsWith('blob:')) {
//       URL.revokeObjectURL(videoUpload.preview);
//     }
//     setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
//     setYoutubeUrl('');
//     setFormData(prev => ({ ...prev, videoUrl: '', videoPublicId: '', videoType: 'upload' }));
//     if (videoInputRef.current) videoInputRef.current.value = '';
//     toast.success('Video removed');
//     saveToLocalStorage();
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };

//   // const handleNumberChange = (e) => {
//   //   const { name, value } = e.target;
//   //   const numValue = value === '' ? 0 : parseFloat(value);
//   //   setFormData(prev => ({ ...prev, [name]: numValue }));
//   //   if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   // };

//   const handleNumberChange = (e) => {
//   const { name, value } = e.target;
//   // Allow empty string for stockQuantity
//   if (name === 'stockQuantity' && value === '') {
//     setFormData(prev => ({ ...prev, [name]: '' }));
//   } else {
//     const numValue = value === '' ? 0 : parseFloat(value);
//     setFormData(prev => ({ ...prev, [name]: numValue }));
//   }
//   if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
// };
//   const handleTagToggle = (tag) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.includes(tag) 
//         ? prev.tags.filter(t => t !== tag)
//         : [...prev.tags, tag]
//     }));
//     saveToLocalStorage();
//   };

//   const handlePromotionSelect = (value) => {
//     setFormData(prev => ({ ...prev, promotion: prev.promotion === value ? '' : value }));
//     saveToLocalStorage();
//   };

//   const handleRatingChange = (rating) => {
//     setFormData(prev => ({ ...prev, rating }));
//     saveToLocalStorage();
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
//       saveToLocalStorage();
//       toast.success('Additional info added');
//     } else {
//       toast.error('Please fill both field name and value');
//     }
//   };

//   const removeAdditionalInfo = (index) => {
//     const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
//     setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
//     saveToLocalStorage();
//   };

//   const clearDraft = () => {
//     if (confirm('Are you sure you want to clear the draft? All unsaved data will be lost.')) {
//        localStorage.removeItem(DRAFT_KEY);
//     sessionStorage.removeItem('draft_discarded_moderator'); // Clear the flag
//     sessionStorage.removeItem('draft_discarded_time');
//       setFormData({
//         productName: '',
//         shortDescription: '',
//         fullDescription: '',
//         category: '',
//         subcategory: '',
//         childSubcategory: '',
//         brand: '',
//         ageGroup: '',
//         stockQuantity: 0,
//         regularPrice: 0,
//         discountPrice: 0,
//         deliveryInfo: '',
//         codAvailable: false,
//         tags: [],
//         promotion: '',
//         isFeatured: false,
//         rating: 0,
//         additionalInfo: [],
//         videoUrl: '',
//         videoPublicId: '',
//         videoType: 'upload',
//         metaSettings: {
//           metaTitle: '',
//           metaDescription: '',
//           metaKeywords: []
//         }
//       });
//       setProductImages([
//         { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//         { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//         { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//         { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//         { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//         { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null }
//       ]);
//       setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
//       setYoutubeUrl('');
//       setLastSaved(null);
//       toast.success('Draft cleared');
//     }
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
//     saveToLocalStorage();
//   };

//   const removeKeyword = (indexToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       metaSettings: {
//         ...prev.metaSettings,
//         metaKeywords: prev.metaSettings.metaKeywords.filter((_, index) => index !== indexToRemove)
//       }
//     }));
//     saveToLocalStorage();
//   };

//   const handleMetaChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       metaSettings: { ...prev.metaSettings, [field]: value }
//     }));
//     saveToLocalStorage();
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
//     if (!formData.shortDescription || formData.shortDescription === '<p></p>') newErrors.shortDescription = 'Short description is required';
//     if (!formData.fullDescription || formData.fullDescription === '<p></p>') newErrors.fullDescription = 'Full description is required';
//     if (!formData.category) newErrors.category = 'Category is required';
//     if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
//     // if (!formData.ageGroup) newErrors.ageGroup = 'Age group is required';
//     // if (formData.stockQuantity < 0) newErrors.stockQuantity = 'Stock quantity cannot be negative';
//     // Only validate if stockQuantity has a value (not empty)
// if (formData.stockQuantity !== '' && formData.stockQuantity < 0) {
//   newErrors.stockQuantity = 'Stock quantity cannot be negative';
// }
// // Optional: Add validation for required field
// if (formData.stockQuantity === '') {
//   newErrors.stockQuantity = 'Stock quantity is required';
// }
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

// const handleSaveDraft = () => {
//   setIsSavingDraft(true);
  
//   // Clear the discard flag since we're saving a new draft
//   sessionStorage.removeItem('draft_discarded_moderator');
//   sessionStorage.removeItem('draft_discarded_time');
  
//   saveToLocalStorage();
//   setTimeout(() => {
//     setIsSavingDraft(false);
//     toast.success('Draft saved successfully!');
//   }, 500);
// };

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

//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem('token');
//       const imageUrls = productImages.filter(img => img.url).map(img => img.url);
      
//       const finalVideoUrl = videoUpload.url || (youtubeUrl ? `https://www.youtube.com/embed/${getYouTubeVideoId(youtubeUrl)}` : '');
      
//       const payload = {
//         productName: formData.productName,
//         shortDescription: formData.shortDescription,
//         fullDescription: formData.fullDescription,
//         category: formData.category,
//         subcategory: formData.subcategory,
//         childSubcategory: formData.childSubcategory,
//         brand: formData.brand,
//         ageGroup: formData.ageGroup,
//         stockQuantity: formData.stockQuantity === '' ? 0 : Number(formData.stockQuantity),
//         // stockQuantity: Number(formData.stockQuantity),
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
//         videoPublicId: videoUpload.publicId || '',
//         videoType: formData.videoType,
//         metaSettings: {
//           metaTitle: formData.metaSettings.metaTitle,
//           metaDescription: formData.metaSettings.metaDescription,
//           metaKeywords: formData.metaSettings.metaKeywords || []
//         },
//         images: imageUrls
//       };

//       const response = await fetch('http://localhost:5000/api/products', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });

//       const data = await response.json();

//       if (data.success) {
//         const generatedSku = data.data.skuCode;
//         toast.success(`✅ Product created successfully! SKU: ${generatedSku}`);
//         localStorage.removeItem(DRAFT_KEY);
//           sessionStorage.removeItem('draft_discarded_moderator'); // Clear the flag
//   sessionStorage.removeItem('draft_discarded_time');
//         router.push('/moderator/all-products');
//       } else {
//         const errorMessage = data.error || 'Failed to create product';
//         toast.error(errorMessage);
        
//         if (errorMessage.includes('already exists')) {
//           setErrors(prev => ({ ...prev, productName: errorMessage }));
//           document.querySelector('input[name="productName"]')?.scrollIntoView({ 
//             behavior: 'smooth', 
//             block: 'center' 
//           });
//         }
//       }
//     } catch (error) {
//       console.error('Error creating product:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
// const handleManualSave = () => {
//   console.log('Manual save triggered');
//   saveToLocalStorage();
//   toast.success('Draft saved manually');
// };
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
//     }
//     return null;
//   };

//   return (
//     <MantineProvider>
//       <div className="min-h-screen" style={{ backgroundColor: '#FFF9F0' }}>
//         {/* Restore Draft Modal */}
//         <RestoreDraftModal 
//           isOpen={showRestoreModal}
//           onConfirm={handleRestoreDraft}
//           onCancel={handleDiscardDraft}
//           draftData={pendingDraft?.formData}
//         />
        
//         {/* Header */}
//         <div className="bg-white border-b shadow-sm sticky top-0 z-10" style={{ borderBottomColor: '#FFB6C1' }}>
//           <div className="px-2 py-2">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <NextLink href="/moderator/all-products" className="p-2 hover:bg-pink-50 rounded-lg transition-colors">
//                   <ArrowLeft className="w-5 h-5" style={{ color: '#4A8A90' }} />
//                 </NextLink>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <Gift className="w-6 h-6" style={{ color: '#4A8A90' }} />
//                     <h1 className="text-xl font-bold" style={{ color: '#2D3A5C', fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                       Create New Toy Product
//                     </h1>
//                     <span className="px-2 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#D4EDEE', color: '#4A8A90' }}>
//                       Moderator
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-1">Add a magical new toy to your collection</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 {lastSaved && (
//                   <span className="text-xs text-gray-400 flex items-center gap-1">
//                     <Clock className="w-3 h-3" />
//                     Last saved: {lastSaved.toLocaleTimeString()}
//                   </span>
//                 )}
//                 <button
//                   type="button"
//                   onClick={clearDraft}
//                   className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
//                 >
//                   Clear Draft
//                 </button>
//               <button
//   type="button"
//   onClick={handleSaveDraft}
//   disabled={isSavingDraft}
//   className="px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-2"
//   style={{ backgroundColor: '#D4EDEE', color: '#4A8A90' }}
// >
//   {isSavingDraft ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//   Save Draft
// </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
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
//     {/* Add "Not Specified" / "All Kids" option */}
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
//                         <div className="flex items-center gap-2">
//                           <input
//                             type="text"
//                             value={formData.skuCode || 'Will be auto-generated'}
//                             disabled
//                             className="flex-1 px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg font-mono text-gray-500 cursor-not-allowed"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => toast.info('SKU will be automatically generated when product is created')}
//                             className="px-3 py-2 text-sm rounded-lg transition-colors cursor-help"
//                             style={{ backgroundColor: '#D4EDEE', color: '#4A8A90' }}
//                           >
//                             Auto
//                           </button>
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1">
//                           SKU will be automatically generated by the system
//                         </p>
//                       </div>

//                       <div>
//                         {/* <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Stock Quantity <span className="text-red-500">*</span>
//                         </label> */}
//                         <div>
//   <label className="block text-sm font-medium text-gray-700 mb-1">
//     Stock Quantity <span className="text-red-500">*</span>
//   </label>
//   <input
//     type="number"
//     name="stockQuantity"
//     value={formData.stockQuantity}
//     onChange={handleNumberChange}
//     onWheel={(e) => e.target.blur()}
//     min="0"
//     placeholder="0"
//     className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
//       errors.stockQuantity ? 'border-red-500' : 'border-gray-300'
//     }`}
//   />
// </div>
                       
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
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition"
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
//                             className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition resize-none"
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
                              
//                               <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-xs rounded z-10">
//                                 {index + 1}
//                               </span>
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

//                     {videoType === 'upload' && !videoUpload.url && !videoUpload.preview && (
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

//                     {videoType === 'youtube' && !formData.videoUrl && (
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
//                 disabled={isSubmitting}
//                 className="flex items-center gap-2 px-6 py-2.5 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
//                 style={{ backgroundColor: '#4A8A90' }}
//               >
//                 {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                 {isSubmitting ? 'Creating...' : 'Create Product'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </MantineProvider>
//   );
// }




// 2 barcode 

// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
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
//   Link as LinkIcon,
//   Barcode,
//   Scan,
//   CheckCircle,
//   XCircle
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
//   { value: '', label: 'Not Specified', icon: '📦' }, 
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

// // Barcode Input Component with Generate and Scan
// const BarcodeInput = ({ value, onChange, onValidate, disabled = false, error = '', onGenerate, isGenerating = false }) => {
//   const [isValidating, setIsValidating] = useState(false);
//   const [validationResult, setValidationResult] = useState(null);
//   const [isScannerMode, setIsScannerMode] = useState(false);
//   const [scannedValue, setScannedValue] = useState('');
//   const inputRef = useRef(null);
//   const scanTimeoutRef = useRef(null);

//   const validateBarcode = async (barcodeValue) => {
//     if (!barcodeValue || barcodeValue.length < 8) {
//       setValidationResult(null);
//       return;
//     }

//     setIsValidating(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/barcodes/validate/${barcodeValue}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setValidationResult(data.data);
//         if (onValidate) onValidate(data.data);
//       }
//     } catch (error) {
//       console.error('Validation error:', error);
//       setValidationResult({ isValid: false, message: 'Network error' });
//     } finally {
//       setIsValidating(false);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (value) {
//         validateBarcode(value);
//       } else {
//         setValidationResult(null);
//       }
//     }, 500);
    
//     return () => clearTimeout(timer);
//   }, [value]);

//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (!isScannerMode) return;
      
//       if (e.key === 'Enter') {
//         if (scannedValue) {
//           let cleanBarcode = scannedValue.replace(/[^0-9]/g, '');
//           if (cleanBarcode.length > 13) {
//             cleanBarcode = cleanBarcode.slice(0, 13);
//           }
//           onChange({ target: { name: 'barcode', value: cleanBarcode } });
//           setScannedValue('');
//           setIsScannerMode(false);
//           if (inputRef.current) {
//             inputRef.current.focus();
//           }
//         }
//       } else {
//         if (/[0-9]/.test(e.key)) {
//           setScannedValue(prev => prev + e.key);
//         }
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [isScannerMode, scannedValue, onChange]);

//   const startScannerMode = () => {
//     setIsScannerMode(true);
//     setScannedValue('');
//     toast.info('Scan barcode now...');
    
//     scanTimeoutRef.current = setTimeout(() => {
//       if (isScannerMode) {
//         setIsScannerMode(false);
//         toast.info('Scanner mode timeout');
//       }
//     }, 10000);
//   };

//   const cancelScannerMode = () => {
//     setIsScannerMode(false);
//     setScannedValue('');
//     if (scanTimeoutRef.current) {
//       clearTimeout(scanTimeoutRef.current);
//     }
//   };

//   const getValidationIcon = () => {
//     if (isValidating) return <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;
//     if (!validationResult) return <Barcode className="w-4 h-4 text-gray-400" />;
//     if (validationResult.isValid && (validationResult.status === 'available' || validationResult.status === 'new')) {
//       return <CheckCircle className="w-4 h-4 text-green-500" />;
//     }
//     return <XCircle className="w-4 h-4 text-red-500" />;
//   };

//   const getValidationMessage = () => {
//     if (!validationResult) return null;
//     if (validationResult.isValid) {
//       if (validationResult.status === 'new') {
//         return <span className="text-green-600 text-xs">✓ New barcode - will be auto-generated</span>;
//       }
//       if (validationResult.status === 'available') {
//         return <span className="text-green-600 text-xs">✓ Barcode available for assignment</span>;
//       }
//     }
//     return <span className="text-red-600 text-xs">{validationResult.message}</span>;
//   };

//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">
//         Barcode <span className="text-gray-400 text-xs">(Optional - 8-13 digits)</span>
//       </label>
      
//       <div className="flex gap-2">
//         <div className="relative flex-1">
//           <div className="absolute left-3 top-1/2 -translate-y-1/2">
//             {getValidationIcon()}
//           </div>
          
//           <input
//             ref={inputRef}
//             type="text"
//             name="barcode"
//             value={value || ''}
//             onChange={onChange}
//             disabled={disabled || isScannerMode}
//             placeholder="Enter barcode number, scan, or generate"
//             className={`w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
//               error ? 'border-red-500' : validationResult?.isValid === false ? 'border-red-500' : 'border-gray-300'
//             }`}
//             maxLength="13"
//           />
//         </div>
        
//         {/* Scan Button */}
//         <button
//           type="button"
//           onClick={startScannerMode}
//           disabled={isScannerMode}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
//         >
//           {isScannerMode ? (
//             <Loader2 className="w-4 h-4 animate-spin" />
//           ) : (
//             <Scan className="w-4 h-4" />
//           )}
//           Scan
//         </button>
        
//         {/* Generate Button */}
//         <button
//           type="button"
//           onClick={onGenerate}
//           disabled={isGenerating}
//           className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
//         >
//           {isGenerating ? (
//             <Loader2 className="w-4 h-4 animate-spin" />
//           ) : (
//             <Sparkles className="w-4 h-4" />
//           )}
//           Generate
//         </button>
//       </div>
      
//       {isScannerMode && (
//         <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Scan className="w-4 h-4 text-blue-500 animate-pulse" />
//               <span className="text-sm text-blue-700">Scanner mode active - Scan barcode now</span>
//             </div>
//             <button
//               type="button"
//               onClick={cancelScannerMode}
//               className="text-xs text-red-600 hover:text-red-700"
//             >
//               Cancel
//             </button>
//           </div>
//           <p className="text-xs text-blue-600 mt-1">
//             Scanning: {scannedValue || 'waiting for barcode...'}
//           </p>
//         </div>
//       )}
      
//       {getValidationMessage()}
      
//       {error && !validationResult?.isValid === false && (
//         <p className="text-xs text-red-600 flex items-center gap-1">
//           <AlertCircle className="w-3 h-3" />
//           {error}
//         </p>
//       )}
      
//       <p className="text-xs text-gray-500">
//         You can either:
//         <br />• Click <strong>Generate</strong> to create a unique barcode
//         <br />• Click <strong>Scan</strong> and scan a barcode using your USB scanner
//         <br />• Enter a barcode manually
//         <br />• Leave empty - no barcode will be assigned
//       </p>
//     </div>
//   );
// };

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
        
//         let quality = 0.4;
        
//         if (file.size > 5 * 1024 * 1024) {
//           quality = 0.25;
//         } else if (file.size > 2 * 1024 * 1024) {
//           quality = 0.3;
//         } else if (file.size > 1 * 1024 * 1024) {
//           quality = 0.35;
//         } else if (file.size > 500 * 1024) {
//           quality = 0.45;
//         } else {
//           quality = 0.55;
//         }
        
//         canvas.toBlob(
//           (blob) => {
//             const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
//               type: 'image/jpeg',
//               lastModified: Date.now(),
//             });
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

// const uploadToCloudinary = async (file) => {
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
//       return {
//         url: data.secure_url,
//         publicId: data.public_id,
//       };
//     } else {
//       throw new Error(data.error?.message || 'Upload failed');
//     }
//   } catch (error) {
//     console.error('Cloudinary upload error:', error);
//     throw error;
//   }
// };

// const uploadVideoToCloudinary = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', 'toys-products');
  
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
//       throw new Error(data.error?.message || 'Upload failed');
//     }
//   } catch (error) {
//     console.error('Cloudinary video upload error:', error);
//     toast.error('Failed to upload video');
//     throw error;
//   }
// };

// const getYouTubeVideoId = (url) => {
//   const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

// // Restore Draft Modal Component
// const RestoreDraftModal = ({ isOpen, onConfirm, onCancel, draftData }) => {
//   if (!isOpen) return null;
  
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
//         <div className="flex items-center gap-3 text-amber-600 mb-4">
//           <AlertCircle className="w-6 h-6" />
//           <h3 className="text-lg font-semibold">Unsaved Draft Found</h3>
//         </div>
        
//         <p className="text-sm text-gray-600 mb-2">
//           You have unsaved draft data from your last session.
//         </p>
//         <p className="text-xs text-gray-500 mb-4">
//           Would you like to restore it? If you choose not to restore, the draft will be discarded.
//         </p>
        
//         {draftData && (
//           <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs">
//             <p className="font-medium text-gray-700 mb-1">Draft preview:</p>
//             {draftData.productName && (
//               <p className="text-gray-600">Product: {draftData.productName}</p>
//             )}
//             {draftData.brand && (
//               <p className="text-gray-600">Brand: {draftData.brand}</p>
//             )}
//             {draftData.ageGroup && (
//               <p className="text-gray-600">Age: {draftData.ageGroup} years</p>
//             )}
//             <p className="text-gray-500 mt-1">
//               Last saved: {new Date().toLocaleString()}
//             </p>
//           </div>
//         )}
        
//         <div className="flex items-center justify-end gap-3 mt-4">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//           >
//             Discard Draft
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
//             style={{ backgroundColor: '#4A8A90' }}
//           >
//             Restore Draft
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DRAFT_KEY = 'toy_product_draft_moderator';

// export default function ModeratorCreateToyProduct() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSavingDraft, setIsSavingDraft] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [childSubcategories, setChildSubcategories] = useState([]);
//   const [isMounted, setIsMounted] = useState(false);
//   const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
//   const [showMeta, setShowMeta] = useState(false);
//   const [generatedSku, setGeneratedSku] = useState('');
//   const [lastSaved, setLastSaved] = useState(null);
//   const [barcodeValidation, setBarcodeValidation] = useState(null);
//   const [isGeneratingBarcode, setIsGeneratingBarcode] = useState(false);
  
//   // Restore modal state
//   const [showRestoreModal, setShowRestoreModal] = useState(false);
//   const [pendingDraft, setPendingDraft] = useState(null);
  
//   // Video upload type: 'upload' or 'youtube'
//   const [videoType, setVideoType] = useState('upload');
//   const [youtubeUrl, setYoutubeUrl] = useState('');
  
//   // Drag and drop state
//   const [draggedIndex, setDraggedIndex] = useState(null);
//   const [dragOverIndex, setDragOverIndex] = useState(null);

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
//     stockQuantity: '',
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
//     barcode: '',
//     metaSettings: {
//       metaTitle: '',
//       metaDescription: '',
//       metaKeywords: []
//     }
//   });

//   // Product Images State (up to 6 images)
//   const [productImages, setProductImages] = useState([
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null }
//   ]);

//   // Video upload state
//   const [videoUpload, setVideoUpload] = useState({
//     file: null,
//     preview: null,
//     uploading: false,
//     error: '',
//     url: null,
//     publicId: null
//   });

//   const [keywordInput, setKeywordInput] = useState('');
//   const [isEditorReady, setIsEditorReady] = useState(false);
//   const [isInstructionEditorReady, setIsInstructionEditorReady] = useState(false);
//   const [isDeliveryEditorReady, setIsDeliveryEditorReady] = useState(false);
//   const [additionalInfoInput, setAdditionalInfoInput] = useState({ fieldName: '', fieldValue: '' });
//   const [ratingHover, setRatingHover] = useState(0);
//   const [errors, setErrors] = useState({});

//   const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
//   const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
//   const maxFileSize = 5 * 1024 * 1024;
//   const maxVideoSize = 100 * 1024 * 1024;

//   // Editor setup
//   const shortDescEditor = useEditor({
//     extensions: [
//       StarterKit,
//       TiptapLink.configure({ openOnClick: false }),
//       TextAlign.configure({ types: ['heading', 'paragraph'] }),
//     ],
//     content: formData.shortDescription,
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
//     content: formData.fullDescription,
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
//     content: formData.deliveryInfo,
//     onUpdate: ({ editor }) => {
//       setFormData(prev => ({ ...prev, deliveryInfo: editor.getHTML() }));
//     },
//     onReady: () => {
//       setIsDeliveryEditorReady(true);
//     },
//     immediatelyRender: false,
//   });

//   // Load draft from localStorage on mount
//   useEffect(() => {
//     const loadDraft = () => {
//       try {
//         const savedDraft = localStorage.getItem(DRAFT_KEY);
//         if (savedDraft) {
//           const draft = JSON.parse(savedDraft);
          
//           const hasData = (draft.formData?.productName && draft.formData.productName.trim() !== '') || 
//                          (draft.formData?.shortDescription && draft.formData.shortDescription !== '<p></p>') ||
//                          (draft.formData?.fullDescription && draft.formData.fullDescription !== '<p></p>') ||
//                          (draft.productImages && draft.productImages.some(img => img.url)) ||
//                          (draft.videoUpload?.url);
          
//           if (!hasData) {
//             localStorage.removeItem(DRAFT_KEY);
//             sessionStorage.removeItem('draft_discarded_moderator');
//             return;
//           }
          
//           const draftDiscarded = sessionStorage.getItem('draft_discarded_moderator');
//           if (draftDiscarded === 'true') {
//             sessionStorage.removeItem('draft_discarded_moderator');
//             return;
//           }
          
//           if (draft.formData) {
//             setFormData(draft.formData);
//             setVideoType(draft.formData.videoType || 'upload');
//             setYoutubeUrl(draft.formData.videoUrl || '');
//           }
//           if (draft.productImages) {
//             const restoredImages = productImages.map((img, idx) => {
//               const savedImg = draft.productImages[idx];
//               if (savedImg && savedImg.url) {
//                 return {
//                   ...img,
//                   url: savedImg.url,
//                   publicId: savedImg.publicId,
//                   preview: savedImg.url,
//                   uploading: false,
//                   uploadAborted: false
//                 };
//               }
//               return img;
//             });
//             setProductImages(restoredImages);
//           }
//           if (draft.videoUpload) {
//             setVideoUpload(draft.videoUpload);
//           }
//           if (draft.lastSaved) {
//             setLastSaved(new Date(draft.lastSaved));
//           }
          
//           setPendingDraft(draft);
//           setShowRestoreModal(true);
//         }
//       } catch (error) {
//         console.error('Error loading draft:', error);
//       }
//     };
//     loadDraft();
//   }, []);

//   // Handle restore draft confirmation
//   const handleRestoreDraft = () => {
//     if (pendingDraft) {
//       try {
//         if (pendingDraft.formData) {
//           const restoredData = {
//             ...pendingDraft.formData,
//             tags: Array.isArray(pendingDraft.formData.tags) ? pendingDraft.formData.tags : [],
//             additionalInfo: Array.isArray(pendingDraft.formData.additionalInfo) ? pendingDraft.formData.additionalInfo : [],
//             codAvailable: pendingDraft.formData.codAvailable || false,
//             barcode: pendingDraft.formData.barcode || '',
//             metaSettings: pendingDraft.formData.metaSettings || {
//               metaTitle: '',
//               metaDescription: '',
//               metaKeywords: []
//             }
//           };
          
//           setFormData(restoredData);
          
//           setTimeout(() => {
//             if (shortDescEditor && pendingDraft.formData.shortDescription) {
//               shortDescEditor.commands.setContent(pendingDraft.formData.shortDescription);
//             }
//             if (fullDescEditor && pendingDraft.formData.fullDescription) {
//               fullDescEditor.commands.setContent(pendingDraft.formData.fullDescription);
//             }
//             if (deliveryInfoEditor && pendingDraft.formData.deliveryInfo) {
//               deliveryInfoEditor.commands.setContent(pendingDraft.formData.deliveryInfo);
//             }
//           }, 200);
          
//           setVideoType(pendingDraft.formData.videoType || 'upload');
//           setYoutubeUrl(pendingDraft.formData.videoUrl || '');
//         }
        
//         if (pendingDraft.productImages && pendingDraft.productImages.length > 0) {
//           const restoredImages = productImages.map((img, idx) => {
//             const savedImg = pendingDraft.productImages[idx];
//             if (savedImg && savedImg.url) {
//               return {
//                 ...img,
//                 url: savedImg.url,
//                 publicId: savedImg.publicId,
//                 preview: savedImg.url,
//                 uploading: false,
//                 uploadAborted: false
//               };
//             }
//             return img;
//           });
//           setProductImages(restoredImages);
//         }
        
//         if (pendingDraft.videoUpload) {
//           setVideoUpload(pendingDraft.videoUpload);
//         }
        
//         toast.success('Draft restored successfully');
        
//         setTimeout(() => {
//           saveToLocalStorage();
//         }, 500);
        
//       } catch (error) {
//         console.error('Error restoring draft:', error);
//         toast.error('Failed to restore draft');
//       }
//     }
//     setShowRestoreModal(false);
//     setPendingDraft(null);
//   };

//   const handleDiscardDraft = () => {
//     localStorage.removeItem(DRAFT_KEY);
//     sessionStorage.setItem('draft_discarded_moderator', 'true');
//     setPendingDraft(null);
//     setShowRestoreModal(false);
    
//     setFormData({
//       productName: '',
//       shortDescription: '',
//       fullDescription: '',
//       category: '',
//       subcategory: '',
//       childSubcategory: '',
//       brand: '',
//       ageGroup: '',
//       stockQuantity: '',
//       regularPrice: 0,
//       discountPrice: 0,
//       deliveryInfo: '',
//       codAvailable: false,
//       tags: [],
//       promotion: '',
//       isFeatured: false,
//       rating: 0,
//       additionalInfo: [],
//       videoUrl: '',
//       videoPublicId: '',
//       videoType: 'upload',
//       barcode: '',
//       metaSettings: {
//         metaTitle: '',
//         metaDescription: '',
//         metaKeywords: []
//       }
//     });
    
//     setProductImages([
//       { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//       { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//       { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//       { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//       { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//       { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null }
//     ]);
    
//     setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
//     setYoutubeUrl('');
//     setLastSaved(null);
    
//     toast.success('Draft discarded');
//   };

//   const saveToLocalStorage = () => {
//     try {
//       let currentShortDesc = formData.shortDescription;
//       let currentFullDesc = formData.fullDescription;
      
//       if (shortDescEditor && !shortDescEditor.isDestroyed) {
//         const editorContent = shortDescEditor.getHTML();
//         if (editorContent && editorContent !== '<p></p>') {
//           currentShortDesc = editorContent;
//         }
//       }
//       if (fullDescEditor && !fullDescEditor.isDestroyed) {
//         const editorContent = fullDescEditor.getHTML();
//         if (editorContent && editorContent !== '<p></p>') {
//           currentFullDesc = editorContent;
//         }
//       }
      
//       const draft = {
//         formData: {
//           ...formData,
//           shortDescription: currentShortDesc,
//           fullDescription: currentFullDesc,
//           videoType,
//           videoUrl: youtubeUrl
//         },
//         productImages: productImages.map(img => ({
//           ...img,
//           preview: img.url || null,
//           file: null,
//           uploading: false
//         })),
//         videoUpload: {
//           ...videoUpload,
//           preview: videoUpload.url || null,
//           file: null,
//           uploading: false
//         },
//         lastSaved: new Date().toISOString()
//       };
//       localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
//       setLastSaved(new Date());
//     } catch (error) {
//       console.error('Error saving draft:', error);
//     }
//   };

//   // Auto-save on form changes
//   useEffect(() => {
//     if (autoSaveTimerRef.current) {
//       clearTimeout(autoSaveTimerRef.current);
//     }
//     autoSaveTimerRef.current = setTimeout(() => {
//       if (formData.productName || formData.shortDescription || productImages.some(img => img.url)) {
//         saveToLocalStorage();
//       }
//     }, 3000);
//     return () => {
//       if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
//     };
//   }, [formData, productImages, videoUpload, youtubeUrl, videoType]);

//   useEffect(() => {
//     setIsMounted(true);
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (formData.category) {
//       fetchSubcategories(formData.category);
//     } else {
//       setSubcategories([]);
//       setFormData(prev => ({ ...prev, subcategory: '', childSubcategory: '' }));
//       setChildSubcategories([]);
//     }
//   }, [formData.category]);

//   useEffect(() => {
//     if (formData.category && formData.subcategory) {
//       fetchChildSubcategories(formData.category, formData.subcategory);
//     } else {
//       setChildSubcategories([]);
//       setFormData(prev => ({ ...prev, childSubcategory: '' }));
//     }
//   }, [formData.subcategory]);

//   useEffect(() => {
//     if (shortDescEditor && isEditorReady && formData.shortDescription) {
//       const currentContent = shortDescEditor.getHTML();
//       if (currentContent !== formData.shortDescription && formData.shortDescription !== '<p></p>') {
//         shortDescEditor.commands.setContent(formData.shortDescription);
//       }
//     }
//   }, [shortDescEditor, isEditorReady, formData.shortDescription]);

//   useEffect(() => {
//     if (fullDescEditor && isInstructionEditorReady && formData.fullDescription) {
//       const currentContent = fullDescEditor.getHTML();
//       if (currentContent !== formData.fullDescription && formData.fullDescription !== '<p></p>') {
//         fullDescEditor.commands.setContent(formData.fullDescription);
//       }
//     }
//   }, [fullDescEditor, isInstructionEditorReady, formData.fullDescription]);

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

//   // Generate unique barcode
//   const generateUniqueBarcode = async () => {
//     setIsGeneratingBarcode(true);
//     const toastId = toast.loading('Generating unique barcode...');
    
//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch('http://localhost:5000/api/barcodes/generate-single', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setFormData(prev => ({ ...prev, barcode: data.data.barcodeNumber }));
//         setBarcodeValidation({ isValid: true, status: 'available', message: 'New barcode generated and available' });
//         setErrors(prev => ({ ...prev, barcode: null }));
//         toast.success(`Barcode ${data.data.barcodeNumber} generated!`, { id: toastId });
//       } else {
//         toast.error(data.error || 'Failed to generate barcode', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Error generating barcode:', error);
//       toast.error('Failed to generate barcode', { id: toastId });
//     } finally {
//       setIsGeneratingBarcode(false);
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
    
//     const updatedImages = [...productImages];
//     updatedImages[index] = {
//       file: file,
//       preview: previewUrl,
//       error: '',
//       uploading: true,
//       url: null,
//       publicId: null,
//       uploadAborted: false,
//       uploadBatchId: batchId
//     };
//     setProductImages(updatedImages);
//     saveToLocalStorage();

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
//       saveToLocalStorage();
//     } catch (error) {
//       setProductImages(prevImages => {
//         const updated = [...prevImages];
//         if (updated[index] && updated[index].uploadBatchId === batchId) {
//           updated[index] = {
//             ...updated[index],
//             error: 'Failed to upload image',
//             uploading: false,
//             preview: null,
//             file: null
//           };
//         }
//         return updated;
//       });
//       toast.error(`Failed to upload image ${index + 1}`);
//     }
//   };

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
//     const uploadPromises = [];
    
//     for (let i = 0; i < files.length && i < emptySlots.length; i++) {
//       const file = files[i];
//       const slotIndex = emptySlots[i];
      
//       const validation = validateImageFile(file);
//       if (!validation.valid) {
//         toast.error(`Image ${i + 1}: ${validation.message}`);
//         continue;
//       }
      
//       const previewUrl = URL.createObjectURL(file);
      
//       setProductImages(prevImages => {
//         const updated = [...prevImages];
//         updated[slotIndex] = {
//           file: file,
//           preview: previewUrl,
//           error: '',
//           uploading: true,
//           url: null,
//           publicId: null,
//           uploadAborted: false,
//           uploadBatchId: batchId
//         };
//         return updated;
//       });
//       saveToLocalStorage();
      
//       const uploadPromise = (async () => {
//         try {
//           const { url, publicId } = await uploadToCloudinary(file);
//           setProductImages(prevImages => {
//             const updated = [...prevImages];
//             if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId && !updated[slotIndex].uploadAborted) {
//               updated[slotIndex] = {
//                 ...updated[slotIndex],
//                 url: url,
//                 publicId: publicId,
//                 uploading: false
//               };
//             }
//             return updated;
//           });
//           return { success: true, slotIndex };
//         } catch (error) {
//           setProductImages(prevImages => {
//             const updated = [...prevImages];
//             if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId) {
//               updated[slotIndex] = {
//                 ...updated[slotIndex],
//                 error: 'Failed to upload image',
//                 uploading: false,
//                 preview: null,
//                 file: null
//               };
//             }
//             return updated;
//           });
//           return { success: false, slotIndex };
//         }
//       })();
      
//       uploadPromises.push(uploadPromise);
//     }
    
//     const results = await Promise.all(uploadPromises);
//     const successfulUploads = results.filter(r => r && r.success).length;
//     const failedUploads = results.filter(r => r && !r.success).length;
    
//     if (successfulUploads > 0) {
//       toast.success(`${successfulUploads} image(s) uploaded successfully`);
//       saveToLocalStorage();
//     }
//     if (failedUploads > 0) {
//       toast.error(`${failedUploads} image(s) failed to upload`);
//     }
    
//     if (fileInputRefs.current['multiple']) {
//       fileInputRefs.current['multiple'].value = '';
//     }
//   };

//   const moveImage = (fromIndex, toIndex) => {
//     const updatedImages = [...productImages];
//     const [movedImage] = updatedImages.splice(fromIndex, 1);
//     updatedImages.splice(toIndex, 0, movedImage);
//     setProductImages(updatedImages);
//     saveToLocalStorage();
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
    
//     if (imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) {
//       URL.revokeObjectURL(imageToRemove.preview);
//     }
    
//     const updatedImages = [...productImages];
//     updatedImages[index] = { 
//       file: null, 
//       preview: null, 
//       error: '', 
//       url: null, 
//       publicId: null, 
//       uploading: false,
//       uploadAborted: false,
//       uploadBatchId: null
//     };
//     setProductImages(updatedImages);
    
//     if (fileInputRefs.current[index]) {
//       fileInputRefs.current[index].value = '';
//     }
    
//     toast.success(`Image removed from slot ${index + 1}`);
//     saveToLocalStorage();
//   };

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
//       publicId: null
//     });
//     saveToLocalStorage();

//     try {
//       const { url, publicId } = await uploadVideoToCloudinary(file);
//       setVideoUpload({
//         file: file,
//         preview: previewUrl,
//         uploading: false,
//         error: '',
//         url: url,
//         publicId: publicId
//       });
//       setFormData(prev => ({ ...prev, videoUrl: url, videoPublicId: publicId, videoType: 'upload' }));
//       toast.success('Video uploaded successfully');
//       saveToLocalStorage();
//     } catch (error) {
//       setVideoUpload({
//         ...videoUpload,
//         error: 'Failed to upload video',
//         uploading: false,
//         preview: null,
//         file: null
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
//       setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
//       toast.success('YouTube link added successfully');
//     } else if (url === '') {
//       setFormData(prev => ({ ...prev, videoUrl: '', videoType: 'upload' }));
//     }
//     saveToLocalStorage();
//   };

//   const removeVideo = () => {
//     if (videoUpload.preview?.startsWith('blob:')) {
//       URL.revokeObjectURL(videoUpload.preview);
//     }
//     setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
//     setYoutubeUrl('');
//     setFormData(prev => ({ ...prev, videoUrl: '', videoPublicId: '', videoType: 'upload' }));
//     if (videoInputRef.current) videoInputRef.current.value = '';
//     toast.success('Video removed');
//     saveToLocalStorage();
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };

//   const handleNumberChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'stockQuantity' && value === '') {
//       setFormData(prev => ({ ...prev, [name]: '' }));
//     } else {
//       const numValue = value === '' ? 0 : parseFloat(value);
//       setFormData(prev => ({ ...prev, [name]: numValue }));
//     }
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };

//   const handleTagToggle = (tag) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.includes(tag) 
//         ? prev.tags.filter(t => t !== tag)
//         : [...prev.tags, tag]
//     }));
//     saveToLocalStorage();
//   };

//   const handlePromotionSelect = (value) => {
//     setFormData(prev => ({ ...prev, promotion: prev.promotion === value ? '' : value }));
//     saveToLocalStorage();
//   };

//   const handleRatingChange = (rating) => {
//     setFormData(prev => ({ ...prev, rating }));
//     saveToLocalStorage();
//   };

//   const addAdditionalInfo = () => {
//     if (additionalInfoInput.fieldName.trim() && additionalInfoInput.fieldValue.trim()) {
//       const newInfo = { 
//         fieldName: additionalInfoInput.fieldName.trim(), 
//         fieldValue: additionalInfoInput.fieldValue.trim() 
//       };
      
//       setFormData(prev => ({
//         ...prev,
//         additionalInfo: [...prev.additionalInfo, newInfo]
//       }));
      
//       setAdditionalInfoInput({ fieldName: '', fieldValue: '' });
//       saveToLocalStorage();
//       toast.success('Additional info added');
//     } else {
//       toast.error('Please fill both field name and value');
//     }
//   };

//   const removeAdditionalInfo = (index) => {
//     const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
//     setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
//     saveToLocalStorage();
//   };

//   const clearDraft = () => {
//     if (confirm('Are you sure you want to clear the draft? All unsaved data will be lost.')) {
//       localStorage.removeItem(DRAFT_KEY);
//       setFormData({
//         productName: '',
//         shortDescription: '',
//         fullDescription: '',
//         category: '',
//         subcategory: '',
//         childSubcategory: '',
//         brand: '',
//         ageGroup: '',
//         stockQuantity: '',
//         regularPrice: 0,
//         discountPrice: 0,
//         deliveryInfo: '',
//         codAvailable: false,
//         tags: [],
//         promotion: '',
//         isFeatured: false,
//         rating: 0,
//         additionalInfo: [],
//         videoUrl: '',
//         videoPublicId: '',
//         videoType: 'upload',
//         barcode: '',
//         metaSettings: {
//           metaTitle: '',
//           metaDescription: '',
//           metaKeywords: []
//         }
//       });
//       setProductImages([
//         { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//         { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//         { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//         { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//         { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//         { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null }
//       ]);
//       setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
//       setYoutubeUrl('');
//       setLastSaved(null);
//       toast.success('Draft cleared');
//     }
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
//     saveToLocalStorage();
//   };

//   const removeKeyword = (indexToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       metaSettings: {
//         ...prev.metaSettings,
//         metaKeywords: prev.metaSettings.metaKeywords.filter((_, index) => index !== indexToRemove)
//       }
//     }));
//     saveToLocalStorage();
//   };

//   const handleMetaChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       metaSettings: { ...prev.metaSettings, [field]: value }
//     }));
//     saveToLocalStorage();
//   };

//   const handleBarcodeValidation = (result) => {
//     setBarcodeValidation(result);
//     if (result && !result.isValid) {
//       setErrors(prev => ({ ...prev, barcode: result.message }));
//     } else {
//       setErrors(prev => ({ ...prev, barcode: null }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
//     if (!formData.shortDescription || formData.shortDescription === '<p></p>') newErrors.shortDescription = 'Short description is required';
//     if (!formData.fullDescription || formData.fullDescription === '<p></p>') newErrors.fullDescription = 'Full description is required';
//     if (!formData.category) newErrors.category = 'Category is required';
//     if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
//     if (formData.stockQuantity !== '' && formData.stockQuantity < 0) {
//       newErrors.stockQuantity = 'Stock quantity cannot be negative';
//     }
//     if (formData.stockQuantity === '') {
//       newErrors.stockQuantity = 'Stock quantity is required';
//     }
//     if (formData.regularPrice <= 0) newErrors.regularPrice = 'Regular price must be greater than 0';
//     if (formData.discountPrice > formData.regularPrice) newErrors.discountPrice = 'Discount price cannot exceed regular price';
//     if (!formData.deliveryInfo.trim()) newErrors.deliveryInfo = 'Delivery information is required';

//     const hasImages = productImages.some(img => img.url !== null);
//     if (!hasImages) newErrors.images = 'At least one product image is required';

//     // Barcode validation
//     if (formData.barcode) {
//       if (!/^[0-9]{8,13}$/.test(formData.barcode)) {
//         newErrors.barcode = 'Barcode must be 8-13 digits only';
//       }
//       if (barcodeValidation && barcodeValidation.isValid === false) {
//         newErrors.barcode = barcodeValidation.message;
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSaveDraft = () => {
//     setIsSavingDraft(true);
//     saveToLocalStorage();
//     setTimeout(() => {
//       setIsSavingDraft(false);
//       toast.success('Draft saved successfully!');
//     }, 500);
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

//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem('token');
//       const imageUrls = productImages.filter(img => img.url).map(img => img.url);
      
//       const finalVideoUrl = videoUpload.url || (youtubeUrl ? `https://www.youtube.com/embed/${getYouTubeVideoId(youtubeUrl)}` : '');
      
//       const payload = {
//         productName: formData.productName,
//         shortDescription: formData.shortDescription,
//         fullDescription: formData.fullDescription,
//         category: formData.category,
//         subcategory: formData.subcategory,
//         childSubcategory: formData.childSubcategory,
//         brand: formData.brand,
//         ageGroup: formData.ageGroup,
//         stockQuantity: formData.stockQuantity === '' ? 0 : Number(formData.stockQuantity),
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
//         videoPublicId: videoUpload.publicId || '',
//         videoType: formData.videoType,
//         barcode: formData.barcode || undefined,
//         metaSettings: {
//           metaTitle: formData.metaSettings.metaTitle,
//           metaDescription: formData.metaSettings.metaDescription,
//           metaKeywords: formData.metaSettings.metaKeywords || []
//         },
//         images: imageUrls
//       };

//       const response = await fetch('http://localhost:5000/api/products', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });

//       const data = await response.json();

//       if (data.success) {
//         const generatedSku = data.data.skuCode;
//         toast.success(`✅ Product created successfully! SKU: ${generatedSku}`);
//         if (formData.barcode) {
//           toast.success(`📦 Barcode: ${formData.barcode} assigned to product`);
//         }
//         localStorage.removeItem(DRAFT_KEY);
//         router.push('/moderator/all-products');
//       } else {
//         const errorMessage = data.error || 'Failed to create product';
//         toast.error(errorMessage);
        
//         if (errorMessage.includes('already exists')) {
//           setErrors(prev => ({ ...prev, productName: errorMessage }));
//           document.querySelector('input[name="productName"]')?.scrollIntoView({ 
//             behavior: 'smooth', 
//             block: 'center' 
//           });
//         }
        
//         if (errorMessage.includes('barcode')) {
//           setErrors(prev => ({ ...prev, barcode: errorMessage }));
//         }
//       }
//     } catch (error) {
//       console.error('Error creating product:', error);
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
//     }
//     return null;
//   };

//   return (
//     <MantineProvider>
//       <div className="min-h-screen" style={{ backgroundColor: '#FFF9F0' }}>
//         {/* Restore Draft Modal */}
//         <RestoreDraftModal 
//           isOpen={showRestoreModal}
//           onConfirm={handleRestoreDraft}
//           onCancel={handleDiscardDraft}
//           draftData={pendingDraft?.formData}
//         />
        
//         {/* Header */}
//         <div className="bg-white border-b shadow-sm sticky top-0 z-10" style={{ borderBottomColor: '#FFB6C1' }}>
//           <div className="px-2 py-2">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <NextLink href="/moderator/all-products" className="p-2 hover:bg-pink-50 rounded-lg transition-colors">
//                   <ArrowLeft className="w-5 h-5" style={{ color: '#4A8A90' }} />
//                 </NextLink>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <Gift className="w-6 h-6" style={{ color: '#4A8A90' }} />
//                     <h1 className="text-xl font-bold" style={{ color: '#2D3A5C', fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                       Create New Toy Product
//                     </h1>
//                     <span className="px-2 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#D4EDEE', color: '#4A8A90' }}>
//                       Moderator
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-1">Add a magical new toy to your collection</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 {lastSaved && (
//                   <span className="text-xs text-gray-400 flex items-center gap-1">
//                     <Clock className="w-3 h-3" />
//                     Last saved: {lastSaved.toLocaleTimeString()}
//                   </span>
//                 )}
//                 <button
//                   type="button"
//                   onClick={clearDraft}
//                   className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
//                 >
//                   Clear Draft
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleSaveDraft}
//                   disabled={isSavingDraft}
//                   className="px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-2"
//                   style={{ backgroundColor: '#D4EDEE', color: '#4A8A90' }}
//                 >
//                   {isSavingDraft ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                   Save Draft
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
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

//                     {/* Barcode Field with Generate and Scan */}
//                     <BarcodeInput
//                       value={formData.barcode}
//                       onChange={(e) => {
//                         setFormData(prev => ({ ...prev, barcode: e.target.value }));
//                         setErrors(prev => ({ ...prev, barcode: null }));
//                       }}
//                       onValidate={handleBarcodeValidation}
//                       error={errors.barcode}
//                       onGenerate={generateUniqueBarcode}
//                       isGenerating={isGeneratingBarcode}
//                     />

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

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Age Group <span className="text-gray-400 text-xs">(Optional)</span>
//                         </label>
//                         <div className="grid grid-cols-5 gap-2">
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
//                       </div>
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
//                           placeholder="0"
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
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition"
//                             placeholder="e.g., Buy Educational STEM Toys for Kids | Toy Store Bangladesh"
//                           />
//                           <div className="flex justify-end mt-1">
//                             <span className={`text-xs ${formData.metaSettings.metaTitle?.length > 70 ? 'text-red-500' : 'text-gray-400'}`}>
//                               {formData.metaSettings.metaTitle?.length || 0}/70
//                             </span>
//                           </div>
//                         </div>

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
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition resize-none"
//                             placeholder="Write a compelling description that appears in search engine results..."
//                           />
//                           <div className="flex justify-end mt-1">
//                             <span className={`text-xs ${formData.metaSettings.metaDescription?.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
//                               {formData.metaSettings.metaDescription?.length || 0}/160
//                             </span>
//                           </div>
//                         </div>

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

//               {/* Right Column - Keep all your existing right column content */}
//               <div className="space-y-6">
//                 {/* Product Images Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                       <ImageIcon className="w-5 h-5" style={{ color: '#4A8A90' }} />
//                       Product Images <span className="text-red-500">*</span>
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">Upload up to 6 images (JPG, PNG, WebP, max 5MB each)</p>
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
                              
//                               <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-xs rounded z-10">
//                                 {index + 1}
//                               </span>
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

//                     {videoType === 'upload' && !videoUpload.url && !videoUpload.preview && (
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

//                     {videoType === 'youtube' && !formData.videoUrl && (
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
//                 disabled={isSubmitting}
//                 className="flex items-center gap-2 px-6 py-2.5 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
//                 style={{ backgroundColor: '#4A8A90' }}
//               >
//                 {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                 {isSubmitting ? 'Creating...' : 'Create Product'}
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
import { useRouter } from 'next/navigation';
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
  { value: '', label: 'Not Specified', icon: '📦' }, 
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
const BarcodeInput = ({ value, onChange, onValidate, disabled = false, error = '', onGenerate, isGenerating = false }) => {
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
      const response = await fetch(`http://localhost:5000/api/barcodes/validate/${barcodeValue}`);
      const data = await response.json();
      
      if (data.success) {
        setValidationResult(data.data);
        if (onValidate) onValidate(data.data);
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
  }, [value]);

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
    if (validationResult.isValid && (validationResult.status === 'available' || validationResult.status === 'new')) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const getValidationMessage = () => {
    if (!validationResult) return null;
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
              error ? 'border-red-500' : validationResult?.isValid === false ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength="13"
          />
        </div>
        
        {/* Scan Button */}
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
        
        {/* Generate Button */}
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
      
      {error && !validationResult?.isValid === false && (
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

// SKU Input Component - WITHOUT Generate Button
const SkuInput = ({ value, onChange, error = '' }) => {
  const [isValidating, setIsValidating] = useState(false);
  const [isUnique, setIsUnique] = useState(null);
  const validateTimeoutRef = useRef(null);

  const validateSku = async (skuValue) => {
    if (!skuValue || skuValue.length < 3) {
      setIsUnique(null);
      return;
    }

    setIsValidating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/validate-sku/${skuValue}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setIsUnique(data.data.isUnique);
        if (!data.data.isUnique && onChange) {
          // Pass error to parent
          const event = { target: { name: 'skuCode', value: skuValue, validationError: data.data.message } };
          onChange(event);
        }
      }
    } catch (error) {
      console.error('SKU validation error:', error);
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    if (validateTimeoutRef.current) {
      clearTimeout(validateTimeoutRef.current);
    }
    validateTimeoutRef.current = setTimeout(() => {
      if (value) {
        validateSku(value);
      } else {
        setIsUnique(null);
      }
    }, 500);
    
    return () => clearTimeout(validateTimeoutRef.current);
  }, [value]);

  const getValidationIcon = () => {
    if (isValidating) return <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;
    if (!value) return <Hash className="w-4 h-4 text-gray-400" />;
    if (isUnique === true) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (isUnique === false) return <XCircle className="w-4 h-4 text-red-500" />;
    return <Hash className="w-4 h-4 text-gray-400" />;
  };

  const getValidationMessage = () => {
    if (!value) return null;
    if (isValidating) return <span className="text-gray-500 text-xs">Checking availability...</span>;
    if (isUnique === true) return <span className="text-green-600 text-xs">✓ SKU is available</span>;
    if (isUnique === false) return <span className="text-red-600 text-xs">✗ SKU already exists</span>;
    return null;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        SKU Code <span className="text-gray-400 text-xs">(Optional - Auto-generated if empty)</span>
      </label>
      
      <div className="relative flex-1">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {getValidationIcon()}
        </div>
        
        <input
          type="text"
          name="skuCode"
          value={value || ''}
          onChange={(e) => {
            onChange(e);
          }}
          placeholder="Leave empty for auto-generation"
          className={`w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
            error ? 'border-red-500' : (isUnique === false ? 'border-red-500' : 'border-gray-300')
          }`}
        />
      </div>
      
      {getValidationMessage()}
      
      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
      
      <p className="text-xs text-gray-500">
        • Leave empty for auto-generation<br />
        • Must be unique across all products<br />
        • Format: letters, numbers, and hyphens only (4-20 characters)
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
      toast.success('Video uploaded and compressed successfully!');
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

// Restore Draft Modal Component
const RestoreDraftModal = ({ isOpen, onConfirm, onCancel, draftData }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center gap-3 text-amber-600 mb-4">
          <AlertCircle className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Unsaved Draft Found</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">
          You have unsaved draft data from your last session.
        </p>
        <p className="text-xs text-gray-500 mb-4">
          Would you like to restore it? If you choose not to restore, the draft will be discarded.
        </p>
        
        {draftData && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs">
            <p className="font-medium text-gray-700 mb-1">Draft preview:</p>
            {draftData.productName && (
              <p className="text-gray-600">Product: {draftData.productName}</p>
            )}
            {draftData.brand && (
              <p className="text-gray-600">Brand: {draftData.brand}</p>
            )}
            {draftData.ageGroup && (
              <p className="text-gray-600">Age: {draftData.ageGroup} years</p>
            )}
            <p className="text-gray-500 mt-1">
              Last saved: {new Date().toLocaleString()}
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Discard Draft
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
            style={{ backgroundColor: '#4A8A90' }}
          >
            Restore Draft
          </button>
        </div>
      </div>
    </div>
  );
};

const DRAFT_KEY = 'toy_product_draft_moderator';

export default function ModeratorCreateToyProduct() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [childSubcategories, setChildSubcategories] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [barcodeValidation, setBarcodeValidation] = useState(null);
  const [isGeneratingBarcode, setIsGeneratingBarcode] = useState(false);
  const [isGeneratingSku, setIsGeneratingSku] = useState(false);
  
  // Restore modal state
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [pendingDraft, setPendingDraft] = useState(null);
  
  // Video upload type: 'upload' or 'youtube'
  const [videoType, setVideoType] = useState('upload');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  
  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

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
    stockQuantity: '',
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
    skuCode: '',  // <-- ADD SKU FIELD
    metaSettings: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: []
    }
  });

  // Product Images State (up to 6 images)
  const [productImages, setProductImages] = useState([
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null }
  ]);

  // Video upload state
  const [videoUpload, setVideoUpload] = useState({
    file: null,
    preview: null,
    uploading: false,
    error: '',
    url: null,
    publicId: null
  });

  const [keywordInput, setKeywordInput] = useState('');
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isInstructionEditorReady, setIsInstructionEditorReady] = useState(false);
  const [isDeliveryEditorReady, setIsDeliveryEditorReady] = useState(false);
  const [additionalInfoInput, setAdditionalInfoInput] = useState({ fieldName: '', fieldValue: '' });
  const [ratingHover, setRatingHover] = useState(0);
  const [errors, setErrors] = useState({});
  const [initialSkuLoaded, setInitialSkuLoaded] = useState(false);

  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
  const maxFileSize = 5 * 1024 * 1024;
  const maxVideoSize = 100 * 1024 * 1024;

  // Editor setup
  const shortDescEditor = useEditor({
    extensions: [
      StarterKit,
      TiptapLink.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: formData.shortDescription,
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
    content: formData.fullDescription,
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
    content: formData.deliveryInfo,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, deliveryInfo: editor.getHTML() }));
    },
    onReady: () => {
      setIsDeliveryEditorReady(true);
    },
    immediatelyRender: false,
  });

  // Load draft from localStorage on mount
  useEffect(() => {
    const loadDraft = () => {
      try {
        const savedDraft = localStorage.getItem(DRAFT_KEY);
        if (savedDraft) {
          const draft = JSON.parse(savedDraft);
          
          const hasData = (draft.formData?.productName && draft.formData.productName.trim() !== '') || 
                         (draft.formData?.shortDescription && draft.formData.shortDescription !== '<p></p>') ||
                         (draft.formData?.fullDescription && draft.formData.fullDescription !== '<p></p>') ||
                         (draft.productImages && draft.productImages.some(img => img.url)) ||
                         (draft.videoUpload?.url);
          
          if (!hasData) {
            localStorage.removeItem(DRAFT_KEY);
            sessionStorage.removeItem('draft_discarded_moderator');
            return;
          }
          
          const draftDiscarded = sessionStorage.getItem('draft_discarded_moderator');
          if (draftDiscarded === 'true') {
            sessionStorage.removeItem('draft_discarded_moderator');
            return;
          }
          
          if (draft.formData) {
            setFormData(draft.formData);
            setVideoType(draft.formData.videoType || 'upload');
            setYoutubeUrl(draft.formData.videoUrl || '');
          }
          if (draft.productImages) {
            const restoredImages = productImages.map((img, idx) => {
              const savedImg = draft.productImages[idx];
              if (savedImg && savedImg.url) {
                return {
                  ...img,
                  url: savedImg.url,
                  publicId: savedImg.publicId,
                  preview: savedImg.url,
                  uploading: false,
                  uploadAborted: false
                };
              }
              return img;
            });
            setProductImages(restoredImages);
          }
          if (draft.videoUpload) {
            setVideoUpload(draft.videoUpload);
          }
          if (draft.lastSaved) {
            setLastSaved(new Date(draft.lastSaved));
          }
          
          setPendingDraft(draft);
          setShowRestoreModal(true);
        }
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    };
    loadDraft();
  }, []);

  // Handle restore draft confirmation
  const handleRestoreDraft = () => {
    if (pendingDraft) {
      try {
        if (pendingDraft.formData) {
          const restoredData = {
            ...pendingDraft.formData,
            tags: Array.isArray(pendingDraft.formData.tags) ? pendingDraft.formData.tags : [],
            additionalInfo: Array.isArray(pendingDraft.formData.additionalInfo) ? pendingDraft.formData.additionalInfo : [],
            codAvailable: pendingDraft.formData.codAvailable || false,
            barcode: pendingDraft.formData.barcode || '',
            skuCode: pendingDraft.formData.skuCode || '',  // <-- ADD SKU TO RESTORE
            metaSettings: pendingDraft.formData.metaSettings || {
              metaTitle: '',
              metaDescription: '',
              metaKeywords: []
            }
          };
          
          setFormData(restoredData);
          
          setTimeout(() => {
            if (shortDescEditor && pendingDraft.formData.shortDescription) {
              shortDescEditor.commands.setContent(pendingDraft.formData.shortDescription);
            }
            if (fullDescEditor && pendingDraft.formData.fullDescription) {
              fullDescEditor.commands.setContent(pendingDraft.formData.fullDescription);
            }
            if (deliveryInfoEditor && pendingDraft.formData.deliveryInfo) {
              deliveryInfoEditor.commands.setContent(pendingDraft.formData.deliveryInfo);
            }
          }, 200);
          
          setVideoType(pendingDraft.formData.videoType || 'upload');
          setYoutubeUrl(pendingDraft.formData.videoUrl || '');
        }
        
        if (pendingDraft.productImages && pendingDraft.productImages.length > 0) {
          const restoredImages = productImages.map((img, idx) => {
            const savedImg = pendingDraft.productImages[idx];
            if (savedImg && savedImg.url) {
              return {
                ...img,
                url: savedImg.url,
                publicId: savedImg.publicId,
                preview: savedImg.url,
                uploading: false,
                uploadAborted: false
              };
            }
            return img;
          });
          setProductImages(restoredImages);
        }
        
        if (pendingDraft.videoUpload) {
          setVideoUpload(pendingDraft.videoUpload);
        }
        
        toast.success('Draft restored successfully');
        
        setTimeout(() => {
          saveToLocalStorage();
        }, 500);
        
      } catch (error) {
        console.error('Error restoring draft:', error);
        toast.error('Failed to restore draft');
      }
    }
    setShowRestoreModal(false);
    setPendingDraft(null);
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    sessionStorage.setItem('draft_discarded_moderator', 'true');
    setPendingDraft(null);
    setShowRestoreModal(false);
    
    setFormData({
      productName: '',
      shortDescription: '',
      fullDescription: '',
      category: '',
      subcategory: '',
      childSubcategory: '',
      brand: '',
      ageGroup: '',
      stockQuantity: '',
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
      skuCode: '',  // <-- ADD SKU TO CLEAR
      metaSettings: {
        metaTitle: '',
        metaDescription: '',
        metaKeywords: []
      }
    });
    
    setProductImages([
      { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
      { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
      { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
      { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
      { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
      { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null }
    ]);
    
    setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
    setYoutubeUrl('');
    setLastSaved(null);
    
    toast.success('Draft discarded');
  };

  const saveToLocalStorage = () => {
    try {
      let currentShortDesc = formData.shortDescription;
      let currentFullDesc = formData.fullDescription;
      
      if (shortDescEditor && !shortDescEditor.isDestroyed) {
        const editorContent = shortDescEditor.getHTML();
        if (editorContent && editorContent !== '<p></p>') {
          currentShortDesc = editorContent;
        }
      }
      if (fullDescEditor && !fullDescEditor.isDestroyed) {
        const editorContent = fullDescEditor.getHTML();
        if (editorContent && editorContent !== '<p></p>') {
          currentFullDesc = editorContent;
        }
      }
      
      const draft = {
        formData: {
          ...formData,
          shortDescription: currentShortDesc,
          fullDescription: currentFullDesc,
          videoType,
          videoUrl: youtubeUrl
        },
        productImages: productImages.map(img => ({
          ...img,
          preview: img.url || null,
          file: null,
          uploading: false
        })),
        videoUpload: {
          ...videoUpload,
          preview: videoUpload.url || null,
          file: null,
          uploading: false
        },
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  // Auto-save on form changes
  useEffect(() => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    autoSaveTimerRef.current = setTimeout(() => {
      if (formData.productName || formData.shortDescription || productImages.some(img => img.url)) {
        saveToLocalStorage();
      }
    }, 3000);
    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, [formData, productImages, videoUpload, youtubeUrl, videoType]);

  useEffect(() => {
    setIsMounted(true);
    fetchCategories();
  }, []);
  
  // Separate effect for initial SKU generation (only once)
  useEffect(() => {
    const loadInitialSku = async () => {
      if (!initialSkuLoaded && !formData.skuCode && !pendingDraft) {
        await generateUniqueSku();
        setInitialSkuLoaded(true);
      }
    };
    loadInitialSku();
  }, [initialSkuLoaded, formData.skuCode, pendingDraft]);

  useEffect(() => {
    if (formData.category) {
      fetchSubcategories(formData.category);
    } else {
      setSubcategories([]);
      setFormData(prev => ({ ...prev, subcategory: '', childSubcategory: '' }));
      setChildSubcategories([]);
    }
  }, [formData.category]);

  useEffect(() => {
    if (formData.category && formData.subcategory) {
      fetchChildSubcategories(formData.category, formData.subcategory);
    } else {
      setChildSubcategories([]);
      setFormData(prev => ({ ...prev, childSubcategory: '' }));
    }
  }, [formData.subcategory]);

  useEffect(() => {
    if (shortDescEditor && isEditorReady && formData.shortDescription) {
      const currentContent = shortDescEditor.getHTML();
      if (currentContent !== formData.shortDescription && formData.shortDescription !== '<p></p>') {
        shortDescEditor.commands.setContent(formData.shortDescription);
      }
    }
  }, [shortDescEditor, isEditorReady, formData.shortDescription]);

  useEffect(() => {
    if (fullDescEditor && isInstructionEditorReady && formData.fullDescription) {
      const currentContent = fullDescEditor.getHTML();
      if (currentContent !== formData.fullDescription && formData.fullDescription !== '<p></p>') {
        fullDescEditor.commands.setContent(formData.fullDescription);
      }
    }
  }, [fullDescEditor, isInstructionEditorReady, formData.fullDescription]);

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

  // Generate unique barcode
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

  // Generate unique SKU
  const generateUniqueSku = async () => {
    setIsGeneratingSku(true);
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/products/generate-sku', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormData(prev => ({ ...prev, skuCode: data.data.skuCode }));
        setErrors(prev => ({ ...prev, skuCode: null }));
      } else {
        console.error('Failed to generate SKU:', data.error);
      }
    } catch (error) {
      console.error('Error generating SKU:', error);
    } finally {
      setIsGeneratingSku(false);
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
    
    const updatedImages = [...productImages];
    updatedImages[index] = {
      file: file,
      preview: previewUrl,
      error: '',
      uploading: true,
      url: null,
      publicId: null,
      uploadAborted: false,
      uploadBatchId: batchId
    };
    setProductImages(updatedImages);
    saveToLocalStorage();

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
      saveToLocalStorage();
    } catch (error) {
      setProductImages(prevImages => {
        const updated = [...prevImages];
        if (updated[index] && updated[index].uploadBatchId === batchId) {
          updated[index] = {
            ...updated[index],
            error: 'Failed to upload image',
            uploading: false,
            preview: null,
            file: null
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
    const uploadPromises = [];
    
    for (let i = 0; i < files.length && i < emptySlots.length; i++) {
      const file = files[i];
      const slotIndex = emptySlots[i];
      
      const validation = validateImageFile(file);
      if (!validation.valid) {
        toast.error(`Image ${i + 1}: ${validation.message}`);
        continue;
      }
      
      const previewUrl = URL.createObjectURL(file);
      
      setProductImages(prevImages => {
        const updated = [...prevImages];
        updated[slotIndex] = {
          file: file,
          preview: previewUrl,
          error: '',
          uploading: true,
          url: null,
          publicId: null,
          uploadAborted: false,
          uploadBatchId: batchId
        };
        return updated;
      });
      saveToLocalStorage();
      
      const uploadPromise = (async () => {
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
          return { success: true, slotIndex };
        } catch (error) {
          setProductImages(prevImages => {
            const updated = [...prevImages];
            if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId) {
              updated[slotIndex] = {
                ...updated[slotIndex],
                error: 'Failed to upload image',
                uploading: false,
                preview: null,
                file: null
              };
            }
            return updated;
          });
          return { success: false, slotIndex };
        }
      })();
      
      uploadPromises.push(uploadPromise);
    }
    
    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter(r => r && r.success).length;
    const failedUploads = results.filter(r => r && !r.success).length;
    
    if (successfulUploads > 0) {
      toast.success(`${successfulUploads} image(s) uploaded successfully`);
      saveToLocalStorage();
    }
    if (failedUploads > 0) {
      toast.error(`${failedUploads} image(s) failed to upload`);
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
    saveToLocalStorage();
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
    
    if (imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    
    const updatedImages = [...productImages];
    updatedImages[index] = { 
      file: null, 
      preview: null, 
      error: '', 
      url: null, 
      publicId: null, 
      uploading: false,
      uploadAborted: false,
      uploadBatchId: null
    };
    setProductImages(updatedImages);
    
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].value = '';
    }
    
    toast.success(`Image removed from slot ${index + 1}`);
    saveToLocalStorage();
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
      publicId: null
    });
    saveToLocalStorage();

    try {
      const { url, publicId } = await uploadVideoToCloudinary(file);
      setVideoUpload({
        file: file,
        preview: previewUrl,
        uploading: false,
        error: '',
        url: url,
        publicId: publicId
      });
      setFormData(prev => ({ ...prev, videoUrl: url, videoPublicId: publicId, videoType: 'upload' }));
      toast.success('Video uploaded successfully');
      saveToLocalStorage();
    } catch (error) {
      setVideoUpload({
        ...videoUpload,
        error: 'Failed to upload video',
        uploading: false,
        preview: null,
        file: null
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
      setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
      toast.success('YouTube link added successfully');
    } else if (url === '') {
      setFormData(prev => ({ ...prev, videoUrl: '', videoType: 'upload' }));
    }
    saveToLocalStorage();
  };

  const removeVideo = () => {
    if (videoUpload.preview?.startsWith('blob:')) {
      URL.revokeObjectURL(videoUpload.preview);
    }
    setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
    setYoutubeUrl('');
    setFormData(prev => ({ ...prev, videoUrl: '', videoPublicId: '', videoType: 'upload' }));
    if (videoInputRef.current) videoInputRef.current.value = '';
    toast.success('Video removed');
    saveToLocalStorage();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (name === 'stockQuantity' && value === '') {
      setFormData(prev => ({ ...prev, [name]: '' }));
    } else {
      const numValue = value === '' ? 0 : parseFloat(value);
      setFormData(prev => ({ ...prev, [name]: numValue }));
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleTagToggle = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
    saveToLocalStorage();
  };

  const handlePromotionSelect = (value) => {
    setFormData(prev => ({ ...prev, promotion: prev.promotion === value ? '' : value }));
    saveToLocalStorage();
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
    saveToLocalStorage();
  };

  const addAdditionalInfo = () => {
    if (additionalInfoInput.fieldName.trim() && additionalInfoInput.fieldValue.trim()) {
      const newInfo = { 
        fieldName: additionalInfoInput.fieldName.trim(), 
        fieldValue: additionalInfoInput.fieldValue.trim() 
      };
      
      setFormData(prev => ({
        ...prev,
        additionalInfo: [...prev.additionalInfo, newInfo]
      }));
      
      setAdditionalInfoInput({ fieldName: '', fieldValue: '' });
      saveToLocalStorage();
      toast.success('Additional info added');
    } else {
      toast.error('Please fill both field name and value');
    }
  };

  const removeAdditionalInfo = (index) => {
    const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
    saveToLocalStorage();
  };

  const clearDraft = () => {
    if (confirm('Are you sure you want to clear the draft? All unsaved data will be lost.')) {
      localStorage.removeItem(DRAFT_KEY);
      setFormData({
        productName: '',
        shortDescription: '',
        fullDescription: '',
        category: '',
        subcategory: '',
        childSubcategory: '',
        brand: '',
        ageGroup: '',
        stockQuantity: '',
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
        skuCode: '',
        metaSettings: {
          metaTitle: '',
          metaDescription: '',
          metaKeywords: []
        }
      });
      setProductImages([
        { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
        { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
        { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
        { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
        { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
        { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null }
      ]);
      setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
      setYoutubeUrl('');
      setLastSaved(null);
      toast.success('Draft cleared');
    }
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
    saveToLocalStorage();
  };

  const removeKeyword = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      metaSettings: {
        ...prev.metaSettings,
        metaKeywords: prev.metaSettings.metaKeywords.filter((_, index) => index !== indexToRemove)
      }
    }));
    saveToLocalStorage();
  };

  const handleMetaChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      metaSettings: { ...prev.metaSettings, [field]: value }
    }));
    saveToLocalStorage();
  };

  const handleBarcodeValidation = (result) => {
    setBarcodeValidation(result);
    if (result && !result.isValid) {
      setErrors(prev => ({ ...prev, barcode: result.message }));
    } else {
      setErrors(prev => ({ ...prev, barcode: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
    if (!formData.shortDescription || formData.shortDescription === '<p></p>') newErrors.shortDescription = 'Short description is required';
    if (!formData.fullDescription || formData.fullDescription === '<p></p>') newErrors.fullDescription = 'Full description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (formData.stockQuantity !== '' && formData.stockQuantity < 0) {
      newErrors.stockQuantity = 'Stock quantity cannot be negative';
    }
    if (formData.stockQuantity === '') {
      newErrors.stockQuantity = 'Stock quantity is required';
    }
    if (formData.regularPrice <= 0) newErrors.regularPrice = 'Regular price must be greater than 0';
    if (formData.discountPrice > formData.regularPrice) newErrors.discountPrice = 'Discount price cannot exceed regular price';
    if (!formData.deliveryInfo.trim()) newErrors.deliveryInfo = 'Delivery information is required';

    const hasImages = productImages.some(img => img.url !== null);
    if (!hasImages) newErrors.images = 'At least one product image is required';

    // Barcode validation
    if (formData.barcode) {
      if (!/^[0-9]{8,13}$/.test(formData.barcode)) {
        newErrors.barcode = 'Barcode must be 8-13 digits only';
      }
      if (barcodeValidation && barcodeValidation.isValid === false) {
        newErrors.barcode = barcodeValidation.message;
      }
    }

    // SKU validation
    if (formData.skuCode) {
      if (!/^[A-Z0-9\-]{4,20}$/i.test(formData.skuCode)) {
        newErrors.skuCode = 'SKU must be 4-20 characters (letters, numbers, hyphens only)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = () => {
    setIsSavingDraft(true);
    saveToLocalStorage();
    setTimeout(() => {
      setIsSavingDraft(false);
      toast.success('Draft saved successfully!');
    }, 500);
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

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const imageUrls = productImages.filter(img => img.url).map(img => img.url);
      
      const finalVideoUrl = videoUpload.url || (youtubeUrl ? `https://www.youtube.com/embed/${getYouTubeVideoId(youtubeUrl)}` : '');
      
      const payload = {
        productName: formData.productName,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        category: formData.category,
        subcategory: formData.subcategory,
        childSubcategory: formData.childSubcategory,
        brand: formData.brand,
        ageGroup: formData.ageGroup,
        stockQuantity: formData.stockQuantity === '' ? 0 : Number(formData.stockQuantity),
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
        videoPublicId: videoUpload.publicId || '',
        videoType: formData.videoType,
        barcode: formData.barcode || undefined,
        skuCode: formData.skuCode || undefined,
        metaSettings: {
          metaTitle: formData.metaSettings.metaTitle,
          metaDescription: formData.metaSettings.metaDescription,
          metaKeywords: formData.metaSettings.metaKeywords || []
        },
        images: imageUrls
      };

      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        const generatedSku = data.data.skuCode;
        toast.success(`✅ Product created successfully! SKU: ${generatedSku}`);
        if (formData.barcode) {
          toast.success(`📦 Barcode: ${formData.barcode} assigned to product`);
        }
        localStorage.removeItem(DRAFT_KEY);
        router.push('/moderator/all-products');
      } else {
        const errorMessage = data.error || 'Failed to create product';
        toast.error(errorMessage);
        
        if (errorMessage.includes('already exists')) {
          setErrors(prev => ({ ...prev, productName: errorMessage }));
          document.querySelector('input[name="productName"]')?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
        
        if (errorMessage.includes('barcode')) {
          setErrors(prev => ({ ...prev, barcode: errorMessage }));
        }
        
        if (errorMessage.includes('SKU') || errorMessage.includes('sku')) {
          setErrors(prev => ({ ...prev, skuCode: errorMessage }));
        }
      }
    } catch (error) {
      console.error('Error creating product:', error);
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
    }
    return null;
  };

  return (
    <MantineProvider>
      <div className="min-h-screen" style={{ backgroundColor: '#FFF9F0' }}>
        {/* Restore Draft Modal */}
        <RestoreDraftModal 
          isOpen={showRestoreModal}
          onConfirm={handleRestoreDraft}
          onCancel={handleDiscardDraft}
          draftData={pendingDraft?.formData}
        />
        
        {/* Header */}
        <div className="bg-white border-b shadow-sm sticky top-0 z-10" style={{ borderBottomColor: '#FFB6C1' }}>
          <div className="px-2 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <NextLink href="/moderator/all-products" className="p-2 hover:bg-pink-50 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" style={{ color: '#4A8A90' }} />
                </NextLink>
                <div>
                  <div className="flex items-center gap-2">
                    <Gift className="w-6 h-6" style={{ color: '#4A8A90' }} />
                    <h1 className="text-xl font-bold" style={{ color: '#2D3A5C', fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                      Create New Toy Product
                    </h1>
                    <span className="px-2 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#D4EDEE', color: '#4A8A90' }}>
                      Moderator
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Add a magical new toy to your collection</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {lastSaved && (
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Last saved: {lastSaved.toLocaleTimeString()}
                  </span>
                )}
                <button
                  type="button"
                  onClick={clearDraft}
                  className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Clear Draft
                </button>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={isSavingDraft}
                  className="px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-2"
                  style={{ backgroundColor: '#D4EDEE', color: '#4A8A90' }}
                >
                  {isSavingDraft ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Draft
                </button>
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

                    {/* SKU Code Field */}
                    <SkuInput
                      value={formData.skuCode}
                      onChange={handleChange}
                      error={errors.skuCode}
                    />

                    {/* Barcode Field */}
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
                        <div className="grid grid-cols-5 gap-2">
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
                          placeholder="0"
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

                    {/* Delivery Details - Rich Text Editor */}
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
                    </div>

                    {/* Cash on Delivery Checkbox */}
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
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition"
                            placeholder="e.g., Buy Educational STEM Toys for Kids | Toy Store Bangladesh"
                          />
                          <div className="flex justify-end mt-1">
                            <span className={`text-xs ${formData.metaSettings.metaTitle?.length > 70 ? 'text-red-500' : 'text-gray-400'}`}>
                              {formData.metaSettings.metaTitle?.length || 0}/70
                            </span>
                          </div>
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
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition resize-none"
                            placeholder="Write a compelling description that appears in search engine results..."
                          />
                          <div className="flex justify-end mt-1">
                            <span className={`text-xs ${formData.metaSettings.metaDescription?.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                              {formData.metaSettings.metaDescription?.length || 0}/160
                            </span>
                          </div>
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

              {/* Right Column - Keep all existing right column content */}
              <div className="space-y-6">
                {/* Product Images Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                      <ImageIcon className="w-5 h-5" style={{ color: '#4A8A90' }} />
                      Product Images <span className="text-red-500">*</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Upload up to 6 images (JPG, PNG, WebP, max 5MB each)</p>
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
                              
                              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-xs rounded z-10">
                                {index + 1}
                              </span>
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

                    {videoType === 'upload' && !videoUpload.url && !videoUpload.preview && (
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

                    {videoType === 'youtube' && !formData.videoUrl && (
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
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                style={{ backgroundColor: '#4A8A90' }}
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSubmitting ? 'Creating...' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MantineProvider>
  );
}