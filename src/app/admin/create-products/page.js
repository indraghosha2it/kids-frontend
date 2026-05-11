
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
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
//   Palette,
//   Ruler,
//   MinusCircle,
//   PlusCircle,
//   ChevronDown,
//   Users,
//   Info,
//   Hash,
//   Type,
//   Star,
//   Search,
//   Tag,
//   FolderTree,
//   GripVertical,
//   Scale,
//   Wrench
// } from 'lucide-react';
// import NextLink from 'next/link';
// import { toast } from 'sonner';
// import { SketchPicker } from 'react-color';
// import { MantineProvider } from '@mantine/core';
// import { RichTextEditor } from '@mantine/tiptap';
// import { useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import TextAlign from '@tiptap/extension-text-align';
// import Link from '@tiptap/extension-link';

// import '@mantine/tiptap/styles.css';
// import '@mantine/core/styles.css';

// // Predefined colors for quick selection
// const PREDEFINED_COLORS = [
//   '#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FF00FF', '#00FFFF',
//   '#000000', '#FFFFFF', '#808080', '#800000', '#808000', '#008000',
//   '#800080', '#008080', '#000080', '#FFA500', '#FFC0CB', '#A52A2A',
//   '#6B4F3A', '#4A90E2', '#50C878', '#9B59B6', '#E74C3C', '#F39C12', '#1ABC9C'
// ];

// // Targeted customer options
// const TARGETED_CUSTOMERS = [
//   { value: 'ladies', label: 'Ladies', icon: '👩' },
//   { value: 'gents', label: 'Gents', icon: '👨' },
//   { value: 'kids', label: 'Kids', icon: '🧒' },
//   { value: 'unisex', label: 'Unisex', icon: '👤' }
// ];

// // Available tags
// const AVAILABLE_TAGS = [
//   'Best Seller',
//   'New Arrival',
//   'Top Deal',
//   'Eco-Friendly',
//   'Hot Export Item',
//   'Customizable',
//   'Premium Quality',
//   'Trending'
// ];

// // Order unit options
// const ORDER_UNITS = [
//   { value: 'piece', label: 'Pieces / Units', icon: '📦', description: 'Sell by individual pieces/units', unitLabel: 'pieces' },
//   { value: 'kg', label: 'Kilogram (KG)', icon: '⚖️', description: 'Sell by weight in kilograms', unitLabel: 'kg' },
//   { value: 'ton', label: 'Metric Ton (MT)', icon: '🏗️', description: 'Sell by metric ton (1000 kg)', unitLabel: 'metric tons' }
// ];

// // Cloudinary upload function
// const uploadToCloudinary = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', 'jute-products');
//   formData.append('folder', 'jute-products');
  
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
//       throw new Error('Upload failed');
//     }
//   } catch (error) {
//     console.error('Cloudinary upload error:', error);
//     throw error;
//   }
// };

// export default function AdminCreateProduct() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [childSubcategories, setChildSubcategories] = useState([]);
//   const [selectedCategoryDetails, setSelectedCategoryDetails] = useState(null);
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [currentColorIndex, setCurrentColorIndex] = useState(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [keywordInput, setKeywordInput] = useState('');
//   const [showChildSubcategory, setShowChildSubcategory] = useState(false);
//   const [showTags, setShowTags] = useState(false);
//   const [showMeta, setShowMeta] = useState(false);
//   const [orderUnit, setOrderUnit] = useState('piece');

//   const [draggedIndex, setDraggedIndex] = useState(null);
//   const [dragOverIndex, setDragOverIndex] = useState(null);
//   const colorPickerRef = useRef(null);
  
//   const [formData, setFormData] = useState({
//     productName: '',
//     description: '',
//     instruction: '', 
//     category: '',
//     subcategory: '',
//     childSubcategory: '',
//     targetedCustomer: 'unisex',
//     fabric: '',
//     weightPerUnit: '',
//     orderUnit: 'piece',
//     moq: 100,
//     pricePerUnit: 0,
//     quantityBasedPricing: [
//       { range: '100-299', price: 0 }
//     ],
//     sizes: ['S', 'M', 'L', 'XL', 'XXL'],
//     colors: [
//       { code: '#6B4F3A' },
//       { code: '#F5E6D3' },
//       { code: '#3A7D44' }
//     ],
//     additionalInfo: [],
//     customizationOptions: [],
//     isFeatured: false,
//     tags: [],
//     metaSettings: {
//       metaTitle: '',
//       metaDescription: '',
//       metaKeywords: []
//     }
//   });

//   // Image state - 6 slots with upload tracking
//   const [productImages, setProductImages] = useState([
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null }
//   ]);

//   const fileInputRefs = useRef([]);
//   const [errors, setErrors] = useState({});

//   const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//   const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
//   const maxFileSize = 5 * 1024 * 1024;

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
//         setShowColorPicker(false);
//         setCurrentColorIndex(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Update pricing range labels when order unit changes
//   useEffect(() => {
//     if (orderUnit === 'kg') {
//       setFormData(prev => ({
//         ...prev,
//         quantityBasedPricing: [
//           { range: '100-499', price: 0 }
//         ]
//       }));
//     } else if (orderUnit === 'ton') {
//       setFormData(prev => ({
//         ...prev,
//         quantityBasedPricing: [
//           { range: '1-4', price: 0 }
//         ]
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         quantityBasedPricing: [
//           { range: '100-299', price: 0 }
//         ]
//       }));
//     }
//   }, [orderUnit]);

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         bulletList: { keepMarks: true, keepAttributes: false },
//         orderedList: { keepMarks: true, keepAttributes: false },
//       }),
//       Link.configure({
//         openOnClick: false,
//         HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
//       }),
//       TextAlign.configure({ types: ['heading', 'paragraph'] }),
//     ],
//     content: formData.description,
//     onUpdate: ({ editor }) => {
//       setFormData(prev => ({ ...prev, description: editor.getHTML() }));
//     },
//     immediatelyRender: false,
//     editable: true,
//   });

//   const instructionEditor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         bulletList: { keepMarks: true, keepAttributes: false },
//         orderedList: { keepMarks: true, keepAttributes: false },
//       }),
//       Link.configure({
//         openOnClick: false,
//         HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
//       }),
//       TextAlign.configure({ types: ['heading', 'paragraph'] }),
//     ],
//     content: formData.instruction,
//     onUpdate: ({ editor }) => {
//       setFormData(prev => ({ ...prev, instruction: editor.getHTML() }));
//     },
//     immediatelyRender: false,
//     editable: true,
//   });

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (formData.category) {
//       fetchSubcategories(formData.category);
//       fetchCategoryDetails(formData.category);
//     } else {
//       setSubcategories([]);
//       setSelectedCategoryDetails(null);
//       setChildSubcategories([]);
//       setShowChildSubcategory(false);
//       setFormData(prev => ({ ...prev, subcategory: '', childSubcategory: '' }));
//     }
//   }, [formData.category]);

//   useEffect(() => {
//     if (formData.category && formData.subcategory) {
//       fetchChildSubcategories(formData.category, formData.subcategory);
//     } else {
//       setChildSubcategories([]);
//       setShowChildSubcategory(false);
//       setFormData(prev => ({ ...prev, childSubcategory: '' }));
//     }
//   }, [formData.subcategory]);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (user.role !== 'admin' && user.role !== 'moderator') {
//       router.push('/login');
//     }
//   }, [router]);

//   const fetchCategories = async () => {
//     setIsLoading(true);
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
//     } finally {
//       setIsLoading(false);
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
//         setShowChildSubcategory(data.data.children.length > 0);
//       } else {
//         setChildSubcategories([]);
//         setShowChildSubcategory(false);
//       }
//     } catch (error) {
//       console.error('Error fetching child subcategories:', error);
//       setChildSubcategories([]);
//       setShowChildSubcategory(false);
//     }
//   };

//   const fetchCategoryDetails = async (categoryId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         setSelectedCategoryDetails(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching category details:', error);
//     }
//   };

//   const validateImageFile = (file) => {
//     if (!allowedFileTypes.includes(file.type)) {
//       const fileExtension = file.name.split('.').pop().toLowerCase();
//       return {
//         valid: false,
//         message: `Invalid format: .${fileExtension}. Allowed: ${allowedExtensions.join(', ')}`
//       };
//     }

//     if (file.size > maxFileSize) {
//       const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
//       return {
//         valid: false,
//         message: `File too large: ${fileSizeMB}MB. Max: 5MB`
//       };
//     }

//     return { valid: true };
//   };

//   const handleImageChange = async (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Clear any existing image in this slot first
//     if (productImages[index].preview && productImages[index].preview.startsWith('blob:')) {
//       URL.revokeObjectURL(productImages[index].preview);
//     }

//     const validation = validateImageFile(file);
//     if (!validation.valid) {
//       const updatedImages = [...productImages];
//       updatedImages[index] = { ...updatedImages[index], error: validation.message };
//       setProductImages(updatedImages);
//       return;
//     }

//     const previewUrl = URL.createObjectURL(file);
    
//     const updatedImages = [...productImages];
//     updatedImages[index] = {
//       file: file,
//       preview: previewUrl,
//       error: '',
//       uploading: true,
//       url: null,
//       publicId: null,
//       uploadAborted: false,
//       uploadBatchId: null
//     };
//     setProductImages(updatedImages);

//     try {
//       const { url, publicId } = await uploadToCloudinary(file);
      
//       setProductImages(prevImages => {
//         const updated = [...prevImages];
//         if (updated[index] && updated[index].uploading === true && !updated[index].uploadAborted) {
//           updated[index] = {
//             ...updated[index],
//             url: url,
//             publicId: publicId,
//             uploading: false,
//             uploadAborted: false
//           };
//         }
//         return updated;
//       });
      
//       toast.success(`Image ${index + 1} uploaded successfully`);
//     } catch (error) {
//       console.error('Upload error:', error);
//       setProductImages(prevImages => {
//         const updated = [...prevImages];
//         if (updated[index] && updated[index].uploading === true && !updated[index].uploadAborted) {
//           updated[index] = {
//             ...updated[index],
//             error: 'Failed to upload image to Cloudinary',
//             uploading: false,
//             uploadAborted: false,
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
    
//     const currentImages = [...productImages];
//     const currentImagesCount = currentImages.filter(img => img.url !== null || img.uploading).length;
//     const availableSlots = 6 - currentImagesCount;
    
//     if (files.length > availableSlots) {
//       toast.error(`You can only upload ${availableSlots} more image(s). Maximum 6 images total.`);
//       if (fileInputRefs.current['multiple']) {
//         fileInputRefs.current['multiple'].value = '';
//       }
//       return;
//     }
    
//     const validFiles = [];
//     const invalidFiles = [];
    
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const validation = validateImageFile(file);
//       if (validation.valid) {
//         validFiles.push({ file, originalIndex: i });
//       } else {
//         invalidFiles.push({ index: i + 1, message: validation.message });
//         toast.error(`Image ${i + 1}: ${validation.message}`);
//       }
//     }
    
//     if (validFiles.length === 0) {
//       toast.error('No valid images to upload');
//       if (fileInputRefs.current['multiple']) {
//         fileInputRefs.current['multiple'].value = '';
//       }
//       return;
//     }
    
//     const emptySlots = [];
//     for (let i = 0; i < currentImages.length; i++) {
//       if (!currentImages[i].url && !currentImages[i].uploading && !currentImages[i].preview) {
//         emptySlots.push(i);
//       }
//     }
    
//     if (validFiles.length > emptySlots.length) {
//       toast.error(`Only ${emptySlots.length} slots available. Please remove some images first.`);
//       if (fileInputRefs.current['multiple']) {
//         fileInputRefs.current['multiple'].value = '';
//       }
//       return;
//     }
    
//     const batchId = Date.now();
//     const updatedImages = [...currentImages];
//     const uploadPromises = [];
    
//     for (let i = 0; i < validFiles.length; i++) {
//       const { file } = validFiles[i];
//       const slotIndex = emptySlots[i];
//       const previewUrl = URL.createObjectURL(file);
      
//       updatedImages[slotIndex] = {
//         file: file,
//         preview: previewUrl,
//         error: '',
//         uploading: true,
//         url: null,
//         publicId: null,
//         uploadAborted: false,
//         uploadBatchId: batchId
//       };
      
//       const uploadPromise = (async () => {
//         try {
//           const { url, publicId } = await uploadToCloudinary(file);
          
//           setProductImages(prevImages => {
//             const newImages = [...prevImages];
//             if (newImages[slotIndex] && 
//                 newImages[slotIndex].uploading === true && 
//                 !newImages[slotIndex].uploadAborted &&
//                 newImages[slotIndex].uploadBatchId === batchId) {
//               newImages[slotIndex] = {
//                 ...newImages[slotIndex],
//                 url: url,
//                 publicId: publicId,
//                 uploading: false,
//                 uploadAborted: false
//               };
//             } else if (newImages[slotIndex] && newImages[slotIndex].uploadAborted) {
//               if (newImages[slotIndex].preview && newImages[slotIndex].preview.startsWith('blob:')) {
//                 URL.revokeObjectURL(newImages[slotIndex].preview);
//               }
//             }
//             return newImages;
//           });
          
//           return { success: true, slotIndex };
//         } catch (error) {
//           console.error('Upload error:', error);
//           setProductImages(prevImages => {
//             const newImages = [...prevImages];
//             if (newImages[slotIndex] && 
//                 newImages[slotIndex].uploading === true && 
//                 !newImages[slotIndex].uploadAborted &&
//                 newImages[slotIndex].uploadBatchId === batchId) {
//               newImages[slotIndex] = {
//                 ...newImages[slotIndex],
//                 error: 'Failed to upload image',
//                 uploading: false,
//                 uploadAborted: false,
//                 preview: null,
//                 file: null
//               };
//             }
//             return newImages;
//           });
//           return { success: false, slotIndex, error };
//         }
//       })();
      
//       uploadPromises.push(uploadPromise);
//     }
    
//     setProductImages(updatedImages);
    
//     const results = await Promise.all(uploadPromises);
//     const successfulUploads = results.filter(r => r.success).length;
//     const failedUploads = results.filter(r => !r.success).length;
    
//     if (successfulUploads > 0) {
//       toast.success(`${successfulUploads} image(s) uploaded successfully`);
//     }
//     if (failedUploads > 0) {
//       toast.error(`${failedUploads} image(s) failed to upload`);
//     }
    
//     // Clear the file input
//     if (fileInputRefs.current['multiple']) {
//       fileInputRefs.current['multiple'].value = '';
//     }
//   };

//   const removeImage = (index) => {
//     const imageToRemove = productImages[index];
    
//     // Revoke object URL if it exists (to prevent memory leaks)
//     if (imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) {
//       URL.revokeObjectURL(imageToRemove.preview);
//     }
    
//     // Reset the image slot completely
//     const updatedImages = [...productImages];
//     updatedImages[index] = { 
//       file: null, 
//       preview: null, 
//       error: '', 
//       url: null, 
//       publicId: null, 
//       uploading: false,
//       uploadAborted: true,
//       uploadBatchId: null
//     };
    
//     setProductImages(updatedImages);
    
//     // Clear the file input value for this slot if it exists
//     if (fileInputRefs.current[index]) {
//       fileInputRefs.current[index].value = '';
//     }
    
//     toast.success(`Image removed from slot ${index + 1}`);
//   };

//   const moveImage = (fromIndex, toIndex) => {
//     const updatedImages = [...productImages];
//     const [movedImage] = updatedImages.splice(fromIndex, 1);
//     updatedImages.splice(toIndex, 0, movedImage);
//     setProductImages(updatedImages);
//   };

//   const handleDragStart = (index) => {
//     setDraggedIndex(index);
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
//     moveImage(draggedIndex, dropIndex);
//     setDraggedIndex(null);
//     setDragOverIndex(null);
//   };

//   const handleDragEnd = () => {
//     setDraggedIndex(null);
//     setDragOverIndex(null);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }
//   };

//   const handleOrderUnitChange = (unit) => {
//     setOrderUnit(unit);
//     const updatedSizes = unit !== 'piece' ? [] : formData.sizes;
    
//     setFormData(prev => ({ 
//       ...prev, 
//       orderUnit: unit,
//       moq: unit === 'ton' ? 1 : 100,
//       pricePerUnit: 0,
//       sizes: updatedSizes
//     }));
//   };

//   const handlePricingChange = (index, field, value) => {
//     const updatedPricing = [...formData.quantityBasedPricing];
    
//     if (field === 'price') {
//       if (value === '') {
//         updatedPricing[index] = { ...updatedPricing[index], [field]: '' };
//       } else {
//         const numValue = parseFloat(value);
//         if (!isNaN(numValue)) {
//           updatedPricing[index] = { ...updatedPricing[index], [field]: numValue };
//         }
//       }
//     } else {
//       updatedPricing[index] = { ...updatedPricing[index], [field]: value };
//     }
    
//     setFormData(prev => ({ ...prev, quantityBasedPricing: updatedPricing }));
//   };

//   const addPricingRow = () => {
//     let newRange = '5000+';
//     if (orderUnit === 'ton') {
//       newRange = '50+';
//     } else if (orderUnit === 'kg') {
//       newRange = '5000+';
//     } else {
//       newRange = '5000+';
//     }
//     setFormData(prev => ({
//       ...prev,
//       quantityBasedPricing: [
//         ...prev.quantityBasedPricing,
//         { range: newRange, price: 0 }
//       ]
//     }));
//   };

//   const removePricingRow = (index) => {
//     if (formData.quantityBasedPricing.length > 1) {
//       const updatedPricing = formData.quantityBasedPricing.filter((_, i) => i !== index);
//       setFormData(prev => ({ ...prev, quantityBasedPricing: updatedPricing }));
//     }
//   };

//   const handleSizeChange = (index, value) => {
//     const updatedSizes = [...formData.sizes];
//     updatedSizes[index] = value;
//     setFormData(prev => ({ ...prev, sizes: updatedSizes }));
//   };

//   const addSize = () => {
//     setFormData(prev => ({
//       ...prev,
//       sizes: [...prev.sizes, '']
//     }));
//   };

//   const removeSize = (index) => {
//     if (formData.sizes.length > 1) {
//       const updatedSizes = formData.sizes.filter((_, i) => i !== index);
//       setFormData(prev => ({ ...prev, sizes: updatedSizes }));
//     }
//   };

//   const handleColorChange = (index, field, value) => {
//     const updatedColors = [...formData.colors];
//     updatedColors[index] = { ...updatedColors[index], [field]: value };
//     setFormData(prev => ({ ...prev, colors: updatedColors }));
//   };

//   const openColorPicker = (index, event) => {
//     event.stopPropagation();
//     setCurrentColorIndex(index);
//     setShowColorPicker(true);
//   };

//   const addColor = () => {
//     setFormData(prev => ({
//       ...prev,
//       colors: [...prev.colors, { code: '#6B4F3A' }]
//     }));
//   };

//   const removeColor = (index) => {
//     if (formData.colors.length > 1) {
//       const updatedColors = formData.colors.filter((_, i) => i !== index);
//       setFormData(prev => ({ ...prev, colors: updatedColors }));
//     }
//   };

//   const handleAdditionalInfoChange = (index, field, value) => {
//     const updatedInfo = [...formData.additionalInfo];
//     updatedInfo[index] = { ...updatedInfo[index], [field]: value };
//     setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
    
//     if (errors[`additionalInfo_${index}_${field}`]) {
//       setErrors(prev => ({ ...prev, [`additionalInfo_${index}_${field}`]: null }));
//     }
//   };

//   const addAdditionalInfo = () => {
//     setFormData(prev => ({
//       ...prev,
//       additionalInfo: [
//         ...prev.additionalInfo,
//         { fieldName: '', fieldValue: '' }
//       ]
//     }));
//   };

//   const removeAdditionalInfo = (index) => {
//     const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
//     setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
//   };

//   const handleCustomizationChange = (index, field, value) => {
//     const updatedOptions = [...formData.customizationOptions];
//     updatedOptions[index] = { ...updatedOptions[index], [field]: value };
//     setFormData(prev => ({ ...prev, customizationOptions: updatedOptions }));
//   };

//   const addCustomizationOption = () => {
//     setFormData(prev => ({
//       ...prev,
//       customizationOptions: [
//         ...prev.customizationOptions,
//         { title: '', value: '' }
//       ]
//     }));
//   };

//   const removeCustomizationOption = (index) => {
//     const updatedOptions = formData.customizationOptions.filter((_, i) => i !== index);
//     setFormData(prev => ({ ...prev, customizationOptions: updatedOptions }));
//   };

//   const handleTagToggle = (tag) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.includes(tag) ? [] : [tag]
//     }));
//   };

//   const handleMetaChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       metaSettings: {
//         ...prev.metaSettings,
//         [field]: value
//       }
//     }));
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

//   const handleKeywordKeyDown = (e) => {
//     if (e.key === 'Enter' || e.key === ',') {
//       e.preventDefault();
//       addKeyword();
//     }
//   };

//   const handleKeywordBlur = () => {
//     if (keywordInput.trim()) {
//       addKeyword();
//     }
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

//   const validateAdditionalInfo = () => {
//     let isValid = true;
//     const newErrors = {};

//     formData.additionalInfo.forEach((info, index) => {
//       if (!info.fieldName.trim()) {
//         newErrors[`additionalInfo_${index}_fieldName`] = 'Field name is required';
//         isValid = false;
//       }
//       if (!info.fieldValue.trim()) {
//         newErrors[`additionalInfo_${index}_fieldValue`] = 'Field value is required';
//         isValid = false;
//       }
//     });

//     setErrors(prev => ({ ...prev, ...newErrors }));
//     return isValid;
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.productName.trim()) {
//       newErrors.productName = 'Product name is required';
//     }

//     if (!formData.category) {
//       newErrors.category = 'Category is required';
//     }

//     if (!formData.targetedCustomer) {
//       newErrors.targetedCustomer = 'Targeted customer is required';
//     }

//     if (!formData.fabric.trim()) {
//       newErrors.fabric = 'Fabric details are required';
//     }

//     if (formData.moq < 1) {
//       newErrors.moq = 'MOQ must be at least 1';
//     }

//     if (formData.pricePerUnit < 0) {
//       newErrors.pricePerUnit = 'Price must be 0 or greater';
//     }

//     const hasImages = productImages.some(img => img.url !== null && !img.uploadAborted);
//     if (!hasImages) {
//       newErrors.images = 'At least one product image is required';
//     }

//     if (formData.colors.length === 0) {
//       newErrors.colors = 'At least one color is required';
//     }

//     if (formData.metaSettings.metaTitle && formData.metaSettings.metaTitle.length > 70) {
//       newErrors.metaTitle = 'Meta title should not exceed 70 characters';
//     }

//     if (formData.metaSettings.metaDescription && formData.metaSettings.metaDescription.length > 160) {
//       newErrors.metaDescription = 'Meta description should not exceed 160 characters';
//     }

//     setErrors(newErrors);
//     const isAdditionalInfoValid = validateAdditionalInfo();
    
//     return Object.keys(newErrors).length === 0 && isAdditionalInfoValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const uploading = productImages.some(img => img.uploading === true);
//     if (uploading) {
//       toast.error('Please wait for all images to finish uploading');
//       return;
//     }

//     const hasEmptyPrice = formData.quantityBasedPricing.some(tier => tier.price === '');
//     if (hasEmptyPrice) {
//       toast.error('Please fill in all price fields in Quantity Based Pricing');
//       return;
//     }

//     if (!validateForm()) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem('token');
      
//       // Only include images that have a URL and are not aborted and not uploading
//       const imageUrls = productImages
//         .filter(img => img.url !== null && !img.uploadAborted && !img.uploading)
//         .map(img => img.url);
      
//       const processedPricing = formData.quantityBasedPricing.map(tier => ({
//         ...tier,
//         price: tier.price === '' ? 0 : parseFloat(tier.price)
//       }));

//       const processedAdditionalInfo = formData.additionalInfo.filter(
//         info => info.fieldName.trim() !== '' && info.fieldValue.trim() !== ''
//       );

//       const processedCustomizationOptions = formData.customizationOptions.filter(
//         option => option.title.trim() !== '' && option.value.trim() !== ''
//       );

//       const filteredSizes = orderUnit === 'piece' 
//         ? formData.sizes.filter(s => s.trim() !== '')
//         : [];

//       const payload = {
//         productName: formData.productName,
//         description: formData.description,
//         instruction: formData.instruction || '',
//         category: formData.category,
//         subcategory: formData.subcategory || '',
//         childSubcategory: formData.childSubcategory || '',
//         targetedCustomer: formData.targetedCustomer,
//         fabric: formData.fabric,
//         weightPerUnit: formData.weightPerUnit || '',
//         orderUnit: orderUnit,
//         moq: formData.moq,
//         pricePerUnit: formData.pricePerUnit === 0 ? '' : formData.pricePerUnit,
//         quantityBasedPricing: processedPricing,
//         sizes: filteredSizes,
//         colors: formData.colors,
//         additionalInfo: processedAdditionalInfo,
//         customizationOptions: processedCustomizationOptions,
//         images: imageUrls,
//         isFeatured: formData.isFeatured,
//         tags: formData.tags,
//         metaSettings: formData.metaSettings
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
//         toast.success('Product created successfully!');
//         router.push('/admin/all-products');
//       } else {
//         toast.error(data.error || 'Failed to create product');
//       }
//     } catch (error) {
//       console.error('Error creating product:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getSelectedCustomerIcon = () => {
//     const customer = TARGETED_CUSTOMERS.find(c => c.value === formData.targetedCustomer);
//     return customer ? customer.icon : '👤';
//   };

//   const getCurrentUnitLabel = () => {
//     const unit = ORDER_UNITS.find(u => u.value === orderUnit);
//     return unit?.unitLabel || 'pieces';
//   };

//   const getPricePerLabel = () => {
//     if (orderUnit === 'piece') return 'Per Piece';
//     if (orderUnit === 'kg') return 'Per KG';
//     return 'Per Metric Ton';
//   };

//   return (
//     <MantineProvider>
//       <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
//         {/* Header */}
//         <div className="bg-white border-b shadow-sm sticky top-0 z-10" style={{ borderBottomColor: '#6B4F3A' }}>
//           <div className="px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <NextLink href="/admin/all-products" className="p-2 hover:bg-[#F5E6D3] rounded-lg transition-colors">
//                   <ArrowLeft className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                 </NextLink>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <h1 className="text-2xl font-bold" style={{ color: '#2A2A2A', fontFamily: 'Playfair Display, serif' }}>Create New Product</h1>
//                     <span className="px-2 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#F5E6D3', color: '#6B4F3A' }}>
//                       Admin
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-1">Add a new jute product to your catalog</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="p-6">
//           <form onSubmit={handleSubmit}>
//             {/* Row 1: Basic Details and Product Images */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//               {/* Basic Details Card */}
//               <div className="lg:col-span-2">
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                       <Package className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                       Basic Details
//                     </h2>
//                   </div>
                  
//                   <div className="p-5 space-y-4">
//                     {/* Product Name */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Product Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="productName"
//                         value={formData.productName}
//                         onChange={handleChange}
//                         className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition ${
//                           errors.productName ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="e.g., Premium Jute Fiber, Jute Shopping Bag"
//                       />
//                       {errors.productName && (
//                         <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                           <AlertCircle className="w-3 h-3" />
//                           {errors.productName}
//                         </p>
//                       )}
//                     </div>

//                     {/* Description */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Description
//                       </label>
//                       {isMounted && editor && (
//                         <div className="border border-gray-300 rounded-lg overflow-hidden">
//                           <RichTextEditor editor={editor}>
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
//                                 <RichTextEditor.H4 />
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
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.Link />
//                                 <RichTextEditor.Unlink />
//                               </RichTextEditor.ControlsGroup>
//                             </RichTextEditor.Toolbar>
//                             <RichTextEditor.Content />
//                           </RichTextEditor>
//                         </div>
//                       )}
//                     </div>

//                     {/* Instruction Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Packaging / Care Instructions
//                       </label>
//                       {isMounted && instructionEditor && (
//                         <div className="border border-gray-300 rounded-lg overflow-hidden">
//                           <RichTextEditor editor={instructionEditor}>
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
//                                 <RichTextEditor.H4 />
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
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.Link />
//                                 <RichTextEditor.Unlink />
//                               </RichTextEditor.ControlsGroup>
//                             </RichTextEditor.Toolbar>
//                             <RichTextEditor.Content />
//                           </RichTextEditor>
//                         </div>
//                       )}
//                       <p className="text-xs text-gray-500 mt-1">
//                         Add care instructions, washing guidelines, or any special notes for customers
//                       </p>
//                     </div>

//                     {/* Category, Subcategory, etc. */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {/* Category */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Category <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                           name="category"
//                           value={formData.category}
//                           onChange={handleChange}
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition ${
//                             errors.category ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                         >
//                           <option value="">Choose Category</option>
//                           {categories.map(cat => (
//                             <option key={cat._id} value={cat._id}>{cat.name}</option>
//                           ))}
//                         </select>
//                         {errors.category && (
//                           <p className="text-xs text-red-600 mt-1">{errors.category}</p>
//                         )}
//                       </div>

//                       {/* Subcategory */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           <div className="flex items-center gap-1">
//                             <FolderTree className="w-4 h-4" />
//                             Subcategory <span className="text-gray-400 text-xs font-normal">(Optional)</span>
//                           </div>
//                         </label>
//                         <select
//                           name="subcategory"
//                           value={formData.subcategory}
//                           onChange={(e) => {
//                             handleChange(e);
//                             setFormData(prev => ({ ...prev, childSubcategory: '' }));
//                           }}
//                           disabled={!formData.category || subcategories.length === 0}
//                           className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed border-gray-300"
//                         >
//                           <option value="">-- Select Subcategory (Optional) --</option>
//                           {subcategories.map(sub => (
//                             <option key={sub._id} value={sub._id}>{sub.name}</option>
//                           ))}
//                         </select>
//                       </div>

//                       {/* Child Subcategory */}
//                       {showChildSubcategory && (
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             <div className="flex items-center gap-1">
//                               <FolderTree className="w-4 h-4" />
//                               Child Subcategory <span className="text-gray-400 text-xs font-normal">(Optional)</span>
//                             </div>
//                           </label>
//                           <select
//                             name="childSubcategory"
//                             value={formData.childSubcategory}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition border-gray-300"
//                           >
//                             <option value="">-- Select Child Subcategory (Optional) --</option>
//                             {childSubcategories.map(child => (
//                               <option key={child._id} value={child._id}>{child.name}</option>
//                             ))}
//                           </select>
//                         </div>
//                       )}

//                       {/* Targeted Customer */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           <div className="flex items-center gap-1">
//                             <Users className="w-4 h-4" />
//                             Target Customer <span className="text-red-500">*</span>
//                           </div>
//                         </label>
//                         <div className="relative">
//                           <select
//                             name="targetedCustomer"
//                             value={formData.targetedCustomer}
//                             onChange={handleChange}
//                             className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition appearance-none ${
//                               errors.targetedCustomer ? 'border-red-500' : 'border-gray-300'
//                             }`}
//                           >
//                             {TARGETED_CUSTOMERS.map(customer => (
//                               <option key={customer.value} value={customer.value}>
//                                 {customer.icon} {customer.label}
//                               </option>
//                             ))}
//                           </select>
//                           <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
//                             <span className="text-lg">{getSelectedCustomerIcon()}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Fabric */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Fabric (Material) <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           name="fabric"
//                           value={formData.fabric}
//                           onChange={handleChange}
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition ${
//                             errors.fabric ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="e.g., 100% Natural Jute"
//                         />
//                       </div>

//                       {/* Weight Per Unit */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           <div className="flex items-center gap-1">
//                             <Scale className="w-4 h-4" />
//                             Weight Per Unit <span className="text-gray-400 text-xs font-normal">(Optional)</span>
//                           </div>
//                         </label>
//                         <div className="flex items-center gap-2">
//                           <input
//                             type="number"
//                             name="weightPerUnit"
//                             value={formData.weightPerUnit}
//                             onChange={handleChange}
//                             onWheel={(e) => e.target.blur()}
//                             step="0.01"
//                             min="0"
//                             className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                             placeholder="e.g., 0.5"
//                           />
//                           <span className="text-sm text-gray-500">kg/unit</span>
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1">
//                           Specify weight per piece/unit (helps with shipping calculations)
//                         </p>
//                       </div>
//                     </div>

//                     {/* Category Info Display */}
//                     {selectedCategoryDetails && (
//                       <div className="mt-2 p-3 rounded-lg border" style={{ backgroundColor: '#F5E6D3', borderColor: '#6B4F3A' }}>
//                         <div className="flex items-center gap-2">
//                           <Package className="w-4 h-4" style={{ color: '#6B4F3A' }} />
//                           <div>
//                             <p className="text-sm font-medium text-gray-900">
//                               Selected Category: {selectedCategoryDetails.name}
//                             </p>
//                             {formData.subcategory && subcategories.find(s => s._id === formData.subcategory) && (
//                               <p className="text-xs text-gray-600 mt-1">
//                                 <span className="font-medium">Subcategory:</span> {subcategories.find(s => s._id === formData.subcategory)?.name}
//                               </p>
//                             )}
//                             {formData.childSubcategory && childSubcategories.find(c => c._id === formData.childSubcategory) && (
//                               <p className="text-xs text-gray-600 mt-1">
//                                 <span className="font-medium">Child Subcategory:</span> {childSubcategories.find(c => c._id === formData.childSubcategory)?.name}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Product Images Card */}
//               <div className="lg:col-span-1">
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                       <ImageIcon className="w-5 h-5" style={{ color: '#6B4F3A' }} />
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
                    
//                     {/* Multiple Image Upload Button */}
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
//                         style={{ backgroundColor: '#F5E6D3', color: '#6B4F3A', borderColor: '#6B4F3A' }}
//                       >
//                         <Upload className="w-5 h-5" />
//                         <span>Select Multiple Images (Up to 6)</span>
//                       </button>
//                       <p className="text-xs text-gray-500 mt-2 text-center">
//                         You can select multiple images at once. Images will be uploaded automatically.
//                       </p>
//                     </div>

//                     {/* Image Preview Grid with Drag and Drop */}
//                     <div className="grid grid-cols-2 gap-4">
//                       {productImages.map((img, index) => (
//                         <div
//                           key={index}
//                           draggable={img.preview !== null && !img.uploading}
//                           onDragStart={() => img.preview && !img.uploading && handleDragStart(index)}
//                           onDragOver={(e) => img.preview && !img.uploading && handleDragOverWithFeedback(e, index)}
//                           onDragLeave={handleDragLeave}
//                           onDrop={() => img.preview && !img.uploading && handleDropWithFeedback(index)}
//                           onDragEnd={handleDragEnd}
//                           className={`transition-all duration-200 ${
//                             draggedIndex === index ? 'opacity-50 scale-95' : ''
//                           } ${
//                             dragOverIndex === index && draggedIndex !== index && draggedIndex !== null 
//                               ? 'ring-2 ring-[#6B4F3A] ring-offset-2 rounded-lg' 
//                               : ''
//                           }`}
//                         >
//                           {img.preview ? (
//                             <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 h-40 hover:border-[#6B4F3A] transition-colors cursor-grab active:cursor-grabbing">
//                               <div className="absolute top-1 left-1 bg-black/50 rounded px-1.5 py-0.5 z-10">
//                                 <GripVertical className="w-3 h-3 text-white" />
//                               </div>
                              
//                               <img 
//                                 src={img.preview} 
//                                 alt={`Product ${index + 1}`} 
//                                 className="w-full h-full object-contain bg-gray-100"
//                                 onError={(e) => {
//                                   console.error('Image failed to load');
//                                   e.target.src = 'https://via.placeholder.com/150?text=Error';
//                                 }}
//                               />
                              
//                               {/* Uploading Overlay */}
//                               {img.uploading && (
//                                 <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
//                                   <Loader2 className="w-6 h-6 text-white animate-spin" />
//                                 </div>
//                               )}
                              
//                               {/* Remove Button */}
//                               <button
//                                 type="button"
//                                 onClick={() => removeImage(index)}
//                                 className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-20"
//                                 disabled={false}
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
//                               className={`border-2 border-dashed rounded-lg p-4 text-center h-40 flex flex-col items-center justify-center cursor-pointer ${
//                                 img.error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-[#6B4F3A] hover:bg-[#F5E6D3]'
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
                    
//                     {/* Upload Progress Summary */}
//                     {productImages.some(img => img.uploading) && (
//                       <div className="mt-4 p-2 rounded-lg" style={{ backgroundColor: '#F5E6D3' }}>
//                         <p className="text-xs" style={{ color: '#6B4F3A' }}>
//                           Uploading: {productImages.filter(img => img.uploading).length} image(s) remaining...
//                         </p>
//                       </div>
//                     )}
                    
//                     {/* Image Count Info */}
//                     <div className="mt-4 text-xs text-gray-500 text-center">
//                       {productImages.filter(img => img.url !== null && !img.uploading && !img.uploadAborted).length} of 6 images uploaded
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Sizes and Colors */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//               {/* Sizes - Only show for 'piece' unit */}
//               {orderUnit === 'piece' ? (
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                       <Ruler className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                       Sizes <span className="text-gray-400 text-sm font-normal">(Optional)</span>
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">Sizes available only for piece-based products</p>
//                   </div>
//                   <div className="p-5">
//                     <div className="space-y-2">
//                       {formData.sizes.map((size, index) => (
//                         <div key={index} className="flex items-center gap-2">
//                           <input
//                             type="text"
//                             value={size}
//                             onChange={(e) => handleSizeChange(index, e.target.value)}
//                             placeholder={`Size ${index + 1}`}
//                             className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                           />
//                           {formData.sizes.length > 1 && (
//                             <button
//                               type="button"
//                               onClick={() => removeSize(index)}
//                               className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           )}
//                         </div>
//                       ))}
//                       <button
//                         type="button"
//                         onClick={addSize}
//                         className="w-full flex items-center justify-center gap-1 px-3 py-2 mt-2 text-xs font-medium border border-dashed rounded-lg transition-colors"
//                         style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}
//                       >
//                         <Plus className="w-3.5 h-3.5" />
//                         Add Size
//                       </button>
//                       <p className="text-xs text-gray-400 text-center mt-2">
//                         Add custom sizes for this product
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 text-center">
//                   <Ruler className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//                   <p className="text-sm text-gray-500">Sizes are not available for {orderUnit === 'kg' ? 'KG' : 'Metric Ton'} based products</p>
//                   <p className="text-xs text-gray-400 mt-1">Please select "Pieces / Units" to add size options</p>
//                 </div>
//               )}

//               {/* Colors - Always show */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                     <Palette className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                     Colors <span className="text-red-500">*</span>
//                   </h2>
//                   {orderUnit !== 'piece' && (
//                     <p className="text-xs text-gray-500 mt-1">Colors configuration for weight-based products (kg/ton)</p>
//                   )}
//                 </div>
//                 <div className="p-5">
//                   {errors.colors && (
//                     <p className="text-xs text-red-600 mb-3 flex items-center gap-1">
//                       <AlertCircle className="w-3 h-3" />
//                       {errors.colors}
//                     </p>
//                   )}
//                   <div className="space-y-3">
//                     {formData.colors.map((color, index) => (
//                       <div key={index} className="relative">
//                         <div className="flex items-center gap-2 w-full">
//                           <div 
//                             className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 p-1 cursor-pointer hover:border-[#6B4F3A] transition-colors"
//                             onClick={(e) => openColorPicker(index, e)}
//                           >
//                             <div 
//                               className="w-10 h-10 rounded-lg border-2 border-gray-200 flex-shrink-0"
//                               style={{ backgroundColor: color.code }}
//                             />
//                             <div className="flex-1 font-mono text-sm text-gray-600">
//                               {color.code}
//                             </div>
//                             <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
//                           </div>
//                           {formData.colors.length > 1 && (
//                             <button
//                               type="button"
//                               onClick={() => removeColor(index)}
//                               className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           )}
//                         </div>
//                         {showColorPicker && currentColorIndex === index && (
//                           <div ref={colorPickerRef} className="absolute right-0 mt-2 z-50">
//                             <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3">
//                               <SketchPicker
//                                 color={color.code}
//                                 onChange={(color) => handleColorChange(index, 'code', color.hex)}
//                                 presetColors={PREDEFINED_COLORS}
//                               />
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={addColor}
//                       className="w-full flex items-center justify-center gap-1 px-3 py-2 mt-2 text-xs font-medium border border-dashed rounded-lg transition-colors"
//                       style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}
//                     >
//                       <Plus className="w-3.5 h-3.5" />
//                       Add Color
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Order Unit Selection */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                     <Package className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                     Selling Unit
//                   </h2>
//                   <p className="text-xs text-gray-500 mt-1">Select how this product is measured and sold</p>
//                 </div>
//                 <div className="p-5">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {ORDER_UNITS.map(unit => (
//                       <button
//                         key={unit.value}
//                         type="button"
//                         onClick={() => handleOrderUnitChange(unit.value)}
//                         className={`p-4 rounded-lg border-2 transition-all text-left ${
//                           orderUnit === unit.value 
//                             ? 'border-[#6B4F3A] bg-[#F5E6D3]' 
//                             : 'border-gray-200 hover:border-[#6B4F3A]'
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <span className="text-2xl">{unit.icon}</span>
//                           <div>
//                             <p className="font-medium text-gray-900">{unit.label}</p>
//                             <p className="text-xs text-gray-500">{unit.description}</p>
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Pricing Section */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                     <DollarSign className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                     Pricing & MOQ
//                   </h2>
//                 </div>
//                 <div className="p-5 space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Minimum Order Quantity (MOQ) <span className="text-red-500">*</span>
//                       </label>
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="number"
//                           name="moq"
//                           value={formData.moq}
//                           onChange={handleChange}
//                           onWheel={(e) => e.target.blur()}
//                           min="1"
//                           className="flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                         />
//                         <span className="text-sm text-gray-500">
//                           {getCurrentUnitLabel()}
//                         </span>
//                       </div>
//                       {errors.moq && <p className="text-xs text-red-600 mt-1">{errors.moq}</p>}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         {getPricePerLabel()} ($) <span className="text-red-500">*</span>
//                       </label>
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="number"
//                           name="pricePerUnit"
//                           value={formData.pricePerUnit === 0 ? '' : formData.pricePerUnit}
//                           onChange={handleChange}
//                           onWheel={(e) => e.target.blur()}
//                           min="0"
//                           step="0.01"
//                           placeholder="0.00"
//                           className="flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                         />
//                         <span className="text-sm text-gray-500">$</span>
//                       </div>
//                       {errors.pricePerUnit && <p className="text-xs text-red-600 mt-1">{errors.pricePerUnit}</p>}
//                     </div>
//                   </div>

//                   <div>
//                     <div className="flex items-center justify-between mb-4">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Bulk Pricing (Quantity in {getCurrentUnitLabel()}):
//                       </label>
//                       <button
//                         type="button"
//                         onClick={addPricingRow}
//                         className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border"
//                         style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}
//                       >
//                         <PlusCircle className="w-3.5 h-3.5" />
//                         Add Tier
//                       </button>
//                     </div>
//                     <div className="space-y-4">
//                       {formData.quantityBasedPricing.map((tier, index) => (
//                         <div key={index} className="flex items-start gap-3">
//                           <div className="w-1/2">
//                             <label className="block text-xs font-medium text-gray-600 mb-1.5">
//                               Quantity Range ({getCurrentUnitLabel()})
//                             </label>
//                             <input
//                               type="text"
//                               value={tier.range}
//                               onChange={(e) => handlePricingChange(index, 'range', e.target.value)}
//                               placeholder={
//                                 orderUnit === 'ton' ? "e.g., 1-4 MT" : 
//                                 orderUnit === 'kg' ? "e.g., 100-499 kg" : 
//                                 "e.g., 100-299 pcs"
//                               }
//                               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                             />
//                           </div>
//                           <div className="w-1/2">
//                             <label className="block text-xs font-medium text-gray-600 mb-1.5">
//                               Price Per {orderUnit === 'ton' ? 'MT ($)' : orderUnit === 'kg' ? 'KG ($)' : 'Unit ($)'}
//                             </label>
//                             <input
//                               type="number"
//                               value={tier.price === 0 ? '' : tier.price}
//                               onChange={(e) => handlePricingChange(index, 'price', e.target.value)}
//                               onWheel={(e) => e.target.blur()}
//                               placeholder="0.00"
//                               min="0"
//                               step="0.01"
//                               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                             />
//                           </div>
//                           {formData.quantityBasedPricing.length > 1 && (
//                             <div className="flex items-end h-[62px]">
//                               <button
//                                 type="button"
//                                 onClick={() => removePricingRow(index)}
//                                 className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                               >
//                                 <MinusCircle className="w-5 h-5" />
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                     <p className="text-xs text-gray-500 mt-2">
//                       {orderUnit === 'ton' 
//                         ? 'Set pricing tiers based on order quantity in Metric Tons (1 MT = 1000 kg)' 
//                         : orderUnit === 'kg'
//                         ? 'Set pricing tiers based on order weight in kilograms'
//                         : 'Set pricing tiers based on order quantity in pieces'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Customization Options */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                     <Wrench className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                     Customization Options
//                   </h2>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Add customization options available for this product (e.g., Logo Printing, Handle Type, Color Options, etc.)
//                   </p>
//                 </div>
//                 <div className="p-5">
//                   <div className="space-y-4">
//                     {formData.customizationOptions.map((option, index) => (
//                       <div key={index} className="flex items-start gap-3 p-4 rounded-lg border" style={{ backgroundColor: '#FAF7F2', borderColor: '#F5E6D3' }}>
//                         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
//                           <div>
//                             <label className="block text-xs font-medium text-gray-600 mb-1.5">
//                               <Type className="w-3 h-3 inline mr-1" />
//                               Customization Title
//                             </label>
//                             <input
//                               type="text"
//                               value={option.title}
//                               onChange={(e) => handleCustomizationChange(index, 'title', e.target.value)}
//                               placeholder="e.g., Logo Printing, Handle Type, Material Finish"
//                               className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-600 mb-1.5">
//                               <Hash className="w-3 h-3 inline mr-1" />
//                               Options / Details
//                             </label>
//                             <input
//                               type="text"
//                               value={option.value}
//                               onChange={(e) => handleCustomizationChange(index, 'value', e.target.value)}
//                               placeholder="e.g., Custom logo available, Cotton handle, Matte finish"
//                               className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                             />
//                           </div>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => removeCustomizationOption(index)}
//                           className="mt-6 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={addCustomizationOption}
//                       className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-2 border-dashed rounded-lg transition-colors"
//                       style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}
//                     >
//                       <PlusCircle className="w-4 h-4" />
//                       Add Customization Option
//                     </button>
//                     <p className="text-xs text-gray-400 text-center mt-2">
//                       Add as many customization options as needed. Leave empty if not applicable.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Additional Information */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                     <Info className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                     Additional Information
//                   </h2>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Add custom fields for extra product details (e.g., GSM, tensile strength, etc.)
//                   </p>
//                 </div>
//                 <div className="p-5">
//                   <div className="space-y-4">
//                     {formData.additionalInfo.map((info, index) => (
//                       <div key={index} className="flex items-start gap-3 p-4 rounded-lg border" style={{ backgroundColor: '#FAF7F2', borderColor: '#F5E6D3' }}>
//                         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
//                           <div>
//                             <label className="block text-xs font-medium text-gray-600 mb-1.5">
//                               <Type className="w-3 h-3 inline mr-1" />
//                               Field Name
//                             </label>
//                             <input
//                               type="text"
//                               value={info.fieldName}
//                               onChange={(e) => handleAdditionalInfoChange(index, 'fieldName', e.target.value)}
//                               placeholder="e.g., GSM, Tensile Strength"
//                               className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-600 mb-1.5">
//                               <Hash className="w-3 h-3 inline mr-1" />
//                               Field Value
//                             </label>
//                             <input
//                               type="text"
//                               value={info.fieldValue}
//                               onChange={(e) => handleAdditionalInfoChange(index, 'fieldValue', e.target.value)}
//                               placeholder="e.g., 200 GSM, 50 kg"
//                               className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                             />
//                           </div>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => removeAdditionalInfo(index)}
//                           className="mt-6 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={addAdditionalInfo}
//                       className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-2 border-dashed rounded-lg transition-colors"
//                       style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}
//                     >
//                       <PlusCircle className="w-4 h-4" />
//                       Add Additional Information
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Product Promotion */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                     <Star className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                     Product Promotion
//                   </h2>
//                 </div>
//                 <div className="p-5">
//                   <div className="mb-4">
//                     <label className="flex items-center gap-3 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={formData.isFeatured}
//                         onChange={(e) => {
//                           setFormData({ ...formData, isFeatured: e.target.checked });
//                           setShowTags(e.target.checked);
//                         }}
//                         className="w-5 h-5 rounded"
//                         style={{ accentColor: '#6B4F3A' }}
//                       />
//                       <div>
//                         <span className="text-sm font-medium text-gray-700">Mark as Featured Product</span>
//                         <p className="text-xs text-gray-500">Featured products will appear in special sections</p>
//                       </div>
//                     </label>
//                   </div>

//                   <div className="mt-4">
//                     <div 
//                       className="flex items-center justify-between cursor-pointer py-2"
//                       onClick={() => setShowTags(!showTags)}
//                     >
//                       <div className="flex items-center gap-2">
//                         <Tag className="w-4 h-4" style={{ color: '#6B4F3A' }} />
//                         <h3 className="text-sm font-medium text-gray-700">Product Tags/Labels</h3>
//                       </div>
//                       <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showTags ? 'rotate-180' : ''}`} />
//                     </div>
//                     {showTags && (
//                       <div className="mt-3">
//                         <p className="text-xs text-gray-500 mb-2">Select one tag (optional)</p>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                           {AVAILABLE_TAGS.map(tag => (
//                             <label key={tag} className="flex items-center gap-2 cursor-pointer">
//                               <input
//                                 type="radio"
//                                 name="productTag"
//                                 checked={formData.tags.includes(tag)}
//                                 onChange={() => handleTagToggle(tag)}
//                                 className="w-4 h-4"
//                                 style={{ accentColor: '#6B4F3A' }}
//                               />
//                               <span className="text-sm text-gray-600">{tag}</span>
//                             </label>
//                           ))}
//                         </div>
//                         {formData.tags.length > 0 && (
//                           <div className="mt-4 flex flex-wrap gap-2">
//                             {formData.tags.map(tag => (
//                               <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#F5E6D3', color: '#6B4F3A' }}>
//                                 {tag}
//                                 <button
//                                   type="button"
//                                   onClick={() => handleTagToggle(tag)}
//                                   className="ml-1.5 hover:opacity-70"
//                                 >
//                                   <X className="w-3 h-3" />
//                                 </button>
//                               </span>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Meta Settings */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <div 
//                     className="flex items-center justify-between cursor-pointer"
//                     onClick={() => setShowMeta(!showMeta)}
//                   >
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                       <Search className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                       Meta Settings (SEO)
//                     </h2>
//                     <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showMeta ? 'rotate-180' : ''}`} />
//                   </div>
//                 </div>
//                 {showMeta && (
//                   <div className="p-5">
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
//                         <input
//                           type="text"
//                           value={formData.metaSettings.metaTitle}
//                           onChange={(e) => handleMetaChange('metaTitle', e.target.value)}
//                           maxLength="70"
//                           placeholder="Enter meta title (max 70 characters)"
//                           className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                         />
//                         <div className="flex justify-between mt-1">
//                           <p className="text-xs text-gray-500">Appears in search engine results</p>
//                           <span className="text-xs text-gray-500">{formData.metaSettings.metaTitle?.length || 0}/70</span>
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
//                         <textarea
//                           value={formData.metaSettings.metaDescription}
//                           onChange={(e) => handleMetaChange('metaDescription', e.target.value)}
//                           maxLength="160"
//                           placeholder="Enter meta description (max 160 characters)"
//                           rows="3"
//                           className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition resize-none"
//                         />
//                         <div className="flex justify-between mt-1">
//                           <p className="text-xs text-gray-500">Brief description for search results</p>
//                           <span className="text-xs text-gray-500">{formData.metaSettings.metaDescription?.length || 0}/160</span>
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
//                         {formData.metaSettings.metaKeywords?.length > 0 && (
//                           <div className="flex flex-wrap gap-2 mb-3 p-3 rounded-lg border" style={{ backgroundColor: '#FAF7F2', borderColor: '#F5E6D3' }}>
//                             {formData.metaSettings.metaKeywords.map((keyword, index) => (
//                               <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#F5E6D3', color: '#6B4F3A' }}>
//                                 {keyword}
//                                 <button type="button" onClick={() => removeKeyword(index)} className="ml-1.5 hover:opacity-70">
//                                   <X className="w-3 h-3" />
//                                 </button>
//                               </span>
//                             ))}
//                           </div>
//                         )}
//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={keywordInput}
//                             onChange={(e) => setKeywordInput(e.target.value)}
//                             onKeyDown={handleKeywordKeyDown}
//                             onBlur={handleKeywordBlur}
//                             placeholder="Type a keyword and press Enter or comma to add"
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition pr-20"
//                           />
//                           {keywordInput.trim() && (
//                             <button
//                               type="button"
//                               onClick={addKeyword}
//                               className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-white text-xs font-medium rounded transition-colors"
//                               style={{ backgroundColor: '#6B4F3A' }}
//                             >
//                               Add
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="mt-6 flex justify-end">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="flex items-center gap-2 px-6 py-3 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//                 style={{ backgroundColor: '#6B4F3A' }}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     <span>Creating Product...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-4 h-4" />
//                     <span>Create Product</span>
//                   </>
//                 )}
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
  Link as LinkIcon
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
  { value: 'featured', label: 'Featured Product', icon: '⭐', color: '#FFD93D' },
  { value: 'trending', label: 'Trending Now', icon: '🔥', color: '#FF8C42' },
  { value: 'clearance', label: 'Clearance Sale', icon: '💨', color: '#4ECDC4' },
  { value: 'holiday-special', label: 'Holiday Special', icon: '🎄', color: '#2ECC71' },
  { value: 'bundle-deal', label: 'Bundle Deal', icon: '🎁', color: '#9B59B6' },
  { value: 'limited-stock', label: 'Limited Stock', icon: '⚠️', color: '#E74C3C' }
];

// Cloudinary upload function for images
const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
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

// Upload video to Cloudinary
const uploadVideoToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'toys-products');
  formData.append('resource_type', 'video');
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
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
    console.error('Cloudinary video upload error:', error);
    throw error;
  }
};

// Extract YouTube video ID from URL
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

// Save to localStorage key
const DRAFT_KEY = 'toy_product_draft';

export default function AdminCreateToyProduct() {
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
  const [generatedSku, setGeneratedSku] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  
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
    stockQuantity: 0,

    regularPrice: 0,
    discountPrice: 0,
    deliveryInfo: '',
    tags: [],
    promotion: '',
    isFeatured: false,
    rating: 0,
    additionalInfo: [],
    videoUrl: '',
    videoPublicId: '',
    videoType: 'upload',
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
  // Add these state variables near your other useState declarations
const [isEditorReady, setIsEditorReady] = useState(false);
const [isInstructionEditorReady, setIsInstructionEditorReady] = useState(false);
  const [additionalInfoInput, setAdditionalInfoInput] = useState({ fieldName: '', fieldValue: '' });
  const [ratingHover, setRatingHover] = useState(0);

  const [errors, setErrors] = useState({});

  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
  const maxFileSize = 5 * 1024 * 1024;
  const maxVideoSize = 100 * 1024 * 1024; // 100MB

  // Editor setup
// Editor setup with onReady callback
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

  // Load draft from localStorage on mount
useEffect(() => {
  const loadDraft = () => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        
        // Check if the user has already chosen to discard drafts in this session
        const draftDiscarded = sessionStorage.getItem('draft_discarded');
        if (draftDiscarded === 'true') {
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
        
        // Show restore modal if there's meaningful data
        const hasData = draft.formData?.productName || 
                       draft.productImages?.some(img => img.url) ||
                       draft.videoUpload?.url;
        if (hasData) {
          setPendingDraft(draft);
          setShowRestoreModal(true);
        }
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
      // Restore form data
      if (pendingDraft.formData) {
        const restoredData = {
          ...pendingDraft.formData,
          // Ensure arrays are properly restored
          quantityBasedPricing: pendingDraft.formData.quantityBasedPricing && pendingDraft.formData.quantityBasedPricing.length > 0 
            ? pendingDraft.formData.quantityBasedPricing 
            : [{ range: '100-299', price: '' }],
          sizes: pendingDraft.formData.sizes && pendingDraft.formData.sizes.length > 0 
            ? pendingDraft.formData.sizes 
            : ['S', 'M', 'L', 'XL', 'XXL'],
          colors: pendingDraft.formData.colors && pendingDraft.formData.colors.length > 0 
            ? pendingDraft.formData.colors 
            : [{ code: '#FF0000' }, { code: '#0000FF' }, { code: '#000000' }],
          tags: Array.isArray(pendingDraft.formData.tags) ? pendingDraft.formData.tags : [],
          additionalInfo: Array.isArray(pendingDraft.formData.additionalInfo) ? pendingDraft.formData.additionalInfo : [],
          metaSettings: pendingDraft.formData.metaSettings || {
            metaTitle: '',
            metaDescription: '',
            metaKeywords: []
          }
        };
        
        setFormData(restoredData);
        
        // Restore editor content after a short delay to ensure editors are ready
        setTimeout(() => {
          if (shortDescEditor && pendingDraft.formData.shortDescription) {
            shortDescEditor.commands.setContent(pendingDraft.formData.shortDescription);
          }
          if (fullDescEditor && pendingDraft.formData.fullDescription) {
            fullDescEditor.commands.setContent(pendingDraft.formData.fullDescription);
          }
        }, 200);
        
        // Restore video type and URL
        setVideoType(pendingDraft.formData.videoType || 'upload');
        setYoutubeUrl(pendingDraft.formData.videoUrl || '');
      }
      
      // Restore product images
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
      
      // Restore video upload
      if (pendingDraft.videoUpload) {
        setVideoUpload(pendingDraft.videoUpload);
      }
      
      toast.success('Draft restored successfully');
      
      // Force a re-save after restoration
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
  // Remove draft from localStorage
  localStorage.removeItem(DRAFT_KEY);
  
  // Set session flag to prevent showing modal again for this session
  sessionStorage.setItem('draft_discarded', 'true');
  
  // Clear the pending draft data
  setPendingDraft(null);
  
  // Close the modal
  setShowRestoreModal(false);
  
  // Reset form data
  setFormData({
    productName: '',
    shortDescription: '',
    fullDescription: '',
    category: '',
    subcategory: '',
    childSubcategory: '',
    brand: '',
    ageGroup: '',
    stockQuantity: 0,
    skuCode: generatedSku,
    regularPrice: 0,
    discountPrice: 0,
    deliveryInfo: '',
    tags: [],
    promotion: '',
    isFeatured: false,
    rating: 0,
    additionalInfo: [],
    videoUrl: '',
    videoPublicId: '',
    videoType: 'upload',
    metaSettings: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: []
    }
  });
  
  // Clear product images
  setProductImages([
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null }
  ]);
  
  // Clear video upload
  setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
  setYoutubeUrl('');
  setLastSaved(null);
  
  // Show success message
  toast.success('Draft discarded');
};

 const saveToLocalStorage = () => {
  try {
    // Get current content directly from editors
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

  // Sync short description editor content when formData changes
useEffect(() => {
  if (shortDescEditor && isEditorReady && formData.shortDescription) {
    const currentContent = shortDescEditor.getHTML();
    if (currentContent !== formData.shortDescription && formData.shortDescription !== '<p></p>') {
      shortDescEditor.commands.setContent(formData.shortDescription);
    }
  }
}, [shortDescEditor, isEditorReady, formData.shortDescription]);

// Sync full description editor content when formData changes
useEffect(() => {
  if (fullDescEditor && isInstructionEditorReady && formData.fullDescription) {
    const currentContent = fullDescEditor.getHTML();
    if (currentContent !== formData.fullDescription && formData.fullDescription !== '<p></p>') {
      fullDescEditor.commands.setContent(formData.fullDescription);
    }
  }
}, [fullDescEditor, isInstructionEditorReady, formData.fullDescription]);

  const generateSKU = () => {
    const prefix = 'TOY';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const sku = `${prefix}-${timestamp}-${random}`;
    setGeneratedSku(sku);
    setFormData(prev => ({ ...prev, skuCode: sku }));
  };

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

  const validateImageFile = (file) => {
    if (!allowedImageTypes.includes(file.type)) {
      return { valid: false, message: `Invalid format. Allowed: JPG, PNG, WebP, GIF` };
    }
    if (file.size > maxFileSize) {
      return { valid: false, message: `File too large. Max: 5MB` };
    }
    return { valid: true };
  };

  // Single image upload
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

  // Multiple image upload
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

  // Drag and drop functions for image reordering
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

  const addImageSlot = () => {
    if (productImages.length < 6) {
      setProductImages([...productImages, { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null }]);
      saveToLocalStorage();
    }
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

  // Video upload handlers
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
  console.log('=== ADDING ADDITIONAL INFO ===');
  console.log('Current additionalInfoInput:', additionalInfoInput);
  
  if (additionalInfoInput.fieldName.trim() && additionalInfoInput.fieldValue.trim()) {
    const newInfo = { 
      fieldName: additionalInfoInput.fieldName.trim(), 
      fieldValue: additionalInfoInput.fieldValue.trim() 
    };
    
    console.log('New info to add:', newInfo);
    console.log('Current additionalInfo array:', formData.additionalInfo);
    
    setFormData(prev => {
      const updated = {
        ...prev,
        additionalInfo: [...prev.additionalInfo, newInfo]
      };
      console.log('Updated formData:', updated.additionalInfo);
      return updated;
    });
    
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
        stockQuantity: 0,
       
        regularPrice: 0,
        discountPrice: 0,
        deliveryInfo: '',
        tags: [],
        promotion: '',
        isFeatured: false,
        rating: 0,
        additionalInfo: [],
        videoUrl: '',
        videoPublicId: '',
        videoType: 'upload',
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
    if (!formData.shortDescription || formData.shortDescription === '<p></p>') newErrors.shortDescription = 'Short description is required';
    if (!formData.fullDescription || formData.fullDescription === '<p></p>') newErrors.fullDescription = 'Full description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.ageGroup) newErrors.ageGroup = 'Age group is required';
    if (formData.stockQuantity < 0) newErrors.stockQuantity = 'Stock quantity cannot be negative';
    if (formData.regularPrice <= 0) newErrors.regularPrice = 'Regular price must be greater than 0';
    if (formData.discountPrice > formData.regularPrice) newErrors.discountPrice = 'Discount price cannot exceed regular price';
    if (!formData.deliveryInfo.trim()) newErrors.deliveryInfo = 'Delivery information is required';

    const hasImages = productImages.some(img => img.url !== null);
    if (!hasImages) newErrors.images = 'At least one product image is required';

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
    
    // Create payload WITHOUT skuCode (let backend generate it)
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
      tags: formData.tags,
      promotion: formData.promotion,
      isFeatured: formData.isFeatured,
      rating: Number(formData.rating),
      additionalInfo: formData.additionalInfo,
      videoUrl: finalVideoUrl,
      videoPublicId: videoUpload.publicId || '',
      videoType: formData.videoType,
      metaSettings: {
        metaTitle: formData.metaSettings.metaTitle,
        metaDescription: formData.metaSettings.metaDescription,
        metaKeywords: formData.metaSettings.metaKeywords || []
      },
      images: imageUrls
    };
    console.log('Additional Info being sent:', payload.additionalInfo);
console.log('Full payload:', payload);

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
      // Show the generated SKU from backend
      const generatedSku = data.data.skuCode;
      toast.success(`Product created successfully! SKU: ${generatedSku}`);
      
      localStorage.removeItem(DRAFT_KEY);
      router.push('/admin/all-products');
    } else {
      toast.error(data.error || 'Failed to create product');
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
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <NextLink href="/admin/all-products" className="p-2 hover:bg-pink-50 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" style={{ color: '#4A8A90' }} />
                </NextLink>
                <div>
                  <div className="flex items-center gap-2">
                    <Gift className="w-6 h-6" style={{ color: '#4A8A90' }} />
                    <h1 className="text-2xl font-bold" style={{ color: '#2D3A5C', fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                      Create New Toy Product
                    </h1>
                    <span className="px-2 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#D4EDEE', color: '#4A8A90' }}>
                      Kids Toys
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
                {/* Basic Information Card - Same as before */}
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

                {/* Categories Card - Same as before */}
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
                          Age Group <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-4 gap-2">
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
                        {errors.ageGroup && <p className="text-xs text-red-600 mt-1">{errors.ageGroup}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Card - Same as before */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                      <DollarSign className="w-5 h-5" style={{ color: '#4A8A90' }} />
                      Pricing & Inventory
                    </h2>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* SKU Code Field - Read-only, will be filled by backend after creation */}
{/* <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">SKU Code</label>
  <div className="flex items-center gap-2">
    <input
      type="text"
      name="skuCode"
      value={formData.skuCode || 'Will be auto-generated'}
      disabled
      className="flex-1 px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg font-mono text-gray-500 cursor-not-allowed"
    />
    <button
      type="button"
      onClick={() => toast.info('SKU will be automatically generated when product is created')}
      className="px-3 py-2 text-sm rounded-lg transition-colors cursor-help"
      style={{ backgroundColor: '#D4EDEE', color: '#4A8A90' }}
    >
      Auto
    </button>
  </div>
  <p className="text-xs text-gray-500 mt-1">
    SKU will be automatically generated by the system in format: TOY-XXXXX-XXX
  </p>
</div> */}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stock Quantity <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="stockQuantity"
                          value={formData.stockQuantity}
                          onChange={handleNumberChange}
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
                        Delivery Information <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="deliveryInfo"
                        value={formData.deliveryInfo}
                        onChange={handleChange}
                        rows="2"
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition resize-none ${
                          errors.deliveryInfo ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Free shipping on orders over ৳2000, Delivery within 3-5 business days"
                      />
                      {errors.deliveryInfo && <p className="text-xs text-red-600 mt-1">{errors.deliveryInfo}</p>}
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

                {/* Video Upload Card - NEW */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                      <Video className="w-5 h-5" style={{ color: '#4A8A90' }} />
                      Product Video <span className="text-gray-400 text-xs">(Optional)</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Upload a video or add a YouTube link to showcase your toy</p>
                  </div>
                  <div className="p-5">
                    {/* Video Type Toggle */}
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

                    {/* Video Preview */}
                    {getVideoPreview()}

                    {/* Upload Section */}
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

                    {/* YouTube URL Input */}
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
              <NextLink href="/admin/all-products">
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