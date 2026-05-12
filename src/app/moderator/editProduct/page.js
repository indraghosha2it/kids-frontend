


// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
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
//   Shield,
//   FolderTree,
//   GripVertical,
//   Scale,
//   Wrench,
//   Leaf
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
//   '#6B4F3A', '#4A7C59', '#C6A43B', '#4A90E2', '#50C878', '#9B59B6', '#E74C3C', '#F39C12', '#1ABC9C'
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

// // Helper function to get unit label
// const getUnitLabel = (orderUnit) => {
//   switch(orderUnit) {
//     case 'kg': return 'kg';
//     case 'ton': return 'MT';
//     default: return 'pc';
//   }
// };

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

// export default function ModeratorEditProduct() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get('id');
  
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [childSubcategories, setChildSubcategories] = useState([]);
//   const [selectedCategoryDetails, setSelectedCategoryDetails] = useState(null);
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [currentColorIndex, setCurrentColorIndex] = useState(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [originalProduct, setOriginalProduct] = useState(null);
//   const [keywordInput, setKeywordInput] = useState('');
//   const [showChildSubcategory, setShowChildSubcategory] = useState(false);
//   const [showTags, setShowTags] = useState(false);
//   const [showMeta, setShowMeta] = useState(false);
//   const [orderUnit, setOrderUnit] = useState('piece');

//   // Drag and drop states
//   const [draggedImageIndex, setDraggedImageIndex] = useState(null);
//   const [dragOverImageIndex, setDragOverImageIndex] = useState(null);
//   const [allImages, setAllImages] = useState([]); // Combined array for drag-drop display
//   const [uploadingImages, setUploadingImages] = useState([]); // Track uploading images
  
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
//       { code: '#4A7C59' }
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

//   const [existingImages, setExistingImages] = useState([]);
//   const [newImages, setNewImages] = useState([]);
//   const [imagesToDelete, setImagesToDelete] = useState([]);

//   const fileInputRefs = useRef({});
//   const [errors, setErrors] = useState({});

//   const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//   const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
//   const maxFileSize = 5 * 1024 * 1024;

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!productId) {
//       toast.error('No product ID provided');
//       router.push('/moderator/all-products');
//     }
//   }, [productId, router]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
//         setShowColorPicker(false);
//         setCurrentColorIndex(null);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

// // Combine existing and new images for unified display - FIXED to maintain order
// useEffect(() => {
//   // Create a combined array that maintains the order between existing and new images
//   const combined = [];
  
//   // Add existing images
//   existingImages.forEach((img, idx) => {
//     combined.push({
//       id: img.publicId,
//       url: img.url,
//       type: 'existing',
//       isPrimary: img.isPrimary,
//       originalData: img,
//       uploading: false
//     });
//   });
  
//   // Add uploaded new images
//   newImages.filter(img => img.url).forEach((img) => {
//     combined.push({
//       id: img.id,
//       url: img.url,
//       preview: img.preview,
//       type: 'new',
//       isPrimary: false,
//       originalData: img,
//       uploading: false
//     });
//   });
  
//   // Add uploading new images at the end
//   newImages.filter(img => img.uploading).forEach((img) => {
//     combined.push({
//       id: img.id,
//       preview: img.preview,
//       type: 'new',
//       isPrimary: false,
//       originalData: img,
//       uploading: true
//     });
//   });
  
//   setAllImages(combined);
// }, [existingImages, newImages]);

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
//     if (productId) {
//       fetchCategories();
//       fetchProduct();
//     }
//   }, [productId]);

//   useEffect(() => {
//     if (formData.category) {
//       fetchSubcategories(formData.category);
//       fetchCategoryDetails(formData.category);
//     } else {
//       setSubcategories([]);
//       setSelectedCategoryDetails(null);
//       setChildSubcategories([]);
//       setShowChildSubcategory(false);
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
//     if (editor && formData.description !== editor.getHTML()) {
//       editor.commands.setContent(formData.description);
//     }
//   }, [formData.description, editor]);

//   useEffect(() => {
//     if (instructionEditor && formData.instruction !== instructionEditor.getHTML()) {
//       instructionEditor.commands.setContent(formData.instruction);
//     }
//   }, [formData.instruction, instructionEditor]);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (user.role !== 'moderator' && user.role !== 'admin') {
//       router.push('/login');
//     }
//   }, [router]);

//   const fetchCategories = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/categories', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) setCategories(data.data);
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
//       if (data.success) setSubcategories(data.data.subcategories);
//       else setSubcategories([]);
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
//       if (data.success) setSelectedCategoryDetails(data.data);
//     } catch (error) {
//       console.error('Error fetching category details:', error);
//     }
//   };

// const fetchProduct = async () => {
//   setIsLoading(true);
//   try {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
//     const data = await response.json();
//     if (data.success) {
//       const product = data.data;
//       setOriginalProduct(product);
//       setOrderUnit(product.orderUnit || 'piece');
      
//       setFormData({
//         productName: product.productName || '',
//         description: product.description || '',
//         instruction: product.instruction || '',
//         category: product.category?._id || product.category || '',
//         subcategory: product.subcategory || '',
//         childSubcategory: product.childSubcategory || '',
//         targetedCustomer: product.targetedCustomer || 'unisex',
//         fabric: product.fabric || '',
//         weightPerUnit: product.weightPerUnit || '',
//         orderUnit: product.orderUnit || 'piece',
//         moq: product.moq || 100,
//         pricePerUnit: product.pricePerUnit || 0,
//         quantityBasedPricing: product.quantityBasedPricing || [{ range: '100-299', price: 0 }],
//         // Only load sizes if order unit is 'piece', otherwise empty array
//         sizes: (product.orderUnit === 'piece' && product.sizes) ? product.sizes : [],
//         colors: product.colors || [{ code: '#6B4F3A' }, { code: '#F5E6D3' }, { code: '#4A7C59' }],
//         additionalInfo: product.additionalInfo || [],
//         customizationOptions: product.customizationOptions || [],
//         isFeatured: product.isFeatured || false,
//         tags: product.tags || [],
//         metaSettings: product.metaSettings || { metaTitle: '', metaDescription: '', metaKeywords: [] }
//       });

//       if (product.category?._id || product.category) {
//         const categoryId = product.category?._id || product.category;
//         await fetchSubcategories(categoryId);
//         if (product.subcategory) await fetchChildSubcategories(categoryId, product.subcategory);
//       }

//       setExistingImages(product.images || []);
//     } else {
//       toast.error('Failed to fetch product details');
//       router.push('/moderator/all-products');
//     }
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     toast.error('Failed to fetch product details');
//     router.push('/moderator/all-products');
//   } finally {
//     setIsLoading(false);
//   }
// };

//   const validateImageFile = (file) => {
//     if (!allowedFileTypes.includes(file.type)) {
//       const fileExtension = file.name.split('.').pop().toLowerCase();
//       return { valid: false, message: `Invalid format: .${fileExtension}. Allowed: ${allowedExtensions.join(', ')}` };
//     }
//     if (file.size > maxFileSize) {
//       const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
//       return { valid: false, message: `File too large: ${fileSizeMB}MB. Max: 5MB` };
//     }
//     return { valid: true };
//   };

//   // Move image in unified array - handle both existing and new images
// // Replace the moveImage, handleDragStart, handleDrop functions with these:

// // Move image in unified array - FIXED to maintain correct order between existing and new images
// const moveImage = (fromIndex, toIndex) => {
//   const updatedImages = [...allImages];
//   const [movedImage] = updatedImages.splice(fromIndex, 1);
//   updatedImages.splice(toIndex, 0, movedImage);
//   setAllImages(updatedImages);
  
//   // IMPORTANT: Separate back into existing and new images while preserving order
//   const reorderedExisting = [];
//   const reorderedNew = [];
  
//   updatedImages.forEach(img => {
//     if (img.type === 'existing' && !img.uploading) {
//       reorderedExisting.push(img.originalData);
//     } else if (img.type === 'new' && !img.uploading && img.url) {
//       reorderedNew.push(img.originalData);
//     }
//   });
  
//   // Only update if the order actually changed
//   const existingChanged = JSON.stringify(reorderedExisting.map(i => i.url)) !== JSON.stringify(existingImages.map(i => i.url));
//   const newChanged = JSON.stringify(reorderedNew.map(i => i.url)) !== JSON.stringify(newImages.filter(i => i.url).map(i => i.url));
  
//   if (existingChanged) {
//     setExistingImages(reorderedExisting);
//   }
//   if (newChanged) {
//     setNewImages(reorderedNew);
//   }
// };

// const handleDragStart = (index) => {
//   // Prevent dragging uploading images
//   if (allImages[index]?.uploading) return;
//   setDraggedImageIndex(index);
// };

// const handleDragOver = (event) => {
//   event.preventDefault();
// };

// const handleDragOverWithFeedback = (event, index) => {
//   event.preventDefault();
//   // Prevent dropping on uploading images
//   if (allImages[index]?.uploading) return;
//   setDragOverImageIndex(index);
// };

// const handleDragLeave = () => {
//   setDragOverImageIndex(null);
// };

// const handleDrop = (dropIndex) => {
//   // Prevent dropping on uploading images
//   if (allImages[dropIndex]?.uploading) {
//     setDragOverImageIndex(null);
//     setDraggedImageIndex(null);
//     return;
//   }
//   if (draggedImageIndex === null || draggedImageIndex === dropIndex) {
//     setDragOverImageIndex(null);
//     setDraggedImageIndex(null);
//     return;
//   }
//   moveImage(draggedImageIndex, dropIndex);
//   setDraggedImageIndex(null);
//   setDragOverImageIndex(null);
// };

// const handleDragEnd = () => {
//   setDraggedImageIndex(null);
//   setDragOverImageIndex(null);
// };

// const handleNewImageChange = async (e, slotId) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const validation = validateImageFile(file);
//   if (!validation.valid) {
//     toast.error(validation.message);
//     return;
//   }

//   const currentImagesCount = allImages.filter(img => !img.uploading).length;
//   if (currentImagesCount >= 6) {
//     toast.error('Maximum 6 images allowed');
//     return;
//   }

//   const imageId = Date.now() + Math.random();
//   const previewUrl = URL.createObjectURL(file);
  
//   const newImageObj = {
//     id: imageId,
//     slotId: slotId,
//     file: file,
//     preview: previewUrl,
//     uploading: true,
//     url: null,
//     publicId: null
//   };
  
//   // Add to newImages with uploading state
//   setNewImages(prev => [...prev, newImageObj]);
  
//   toast.loading(`Uploading image...`, { id: `upload-${imageId}` });

//   try {
//     const { url, publicId } = await uploadToCloudinary(file);
//     // Update to mark as complete - preserve the position in array
//     setNewImages(prev => {
//       const index = prev.findIndex(img => img.id === imageId);
//       if (index !== -1) {
//         const updated = [...prev];
//         updated[index] = { ...updated[index], url, publicId, uploading: false };
//         return updated;
//       }
//       return prev;
//     });
//     toast.success(`Image uploaded successfully`, { id: `upload-${imageId}`, duration: 2000 });
//   } catch (error) {
//     console.error('Upload error:', error);
//     setNewImages(prev => prev.filter(img => img.id !== imageId));
//     toast.error(`Failed to upload image`, { id: `upload-${imageId}`, duration: 3000 });
//   }
// };

//   const removeNewImage = (imageId) => {
//     const imageToRemove = newImages.find(img => img.id === imageId);
//     if (imageToRemove && imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) {
//       URL.revokeObjectURL(imageToRemove.preview);
//     }
//     setNewImages(prev => prev.filter(img => img.id !== imageId));
//   };

//   const removeExistingImage = (imageId) => {
//     setImagesToDelete(prev => [...prev, imageId]);
//     setExistingImages(prev => prev.filter(img => img.publicId !== imageId));
//     toast.info('Image marked for deletion');
//   };

// const handleMultipleImageSelect = async (e) => {
//   const files = Array.from(e.target.files);
//   if (files.length === 0) return;
  
//   const currentImagesCount = allImages.filter(img => !img.uploading).length;
//   const availableSlots = 6 - currentImagesCount;
  
//   if (files.length > availableSlots) {
//     toast.error(`You can only upload ${availableSlots} more image(s). Maximum 6 images total.`);
//     return;
//   }
  
//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     const validation = validateImageFile(file);
//     if (!validation.valid) {
//       toast.error(`Image ${i + 1}: ${validation.message}`);
//       continue;
//     }
    
//     const imageId = Date.now() + Math.random() + i;
//     const previewUrl = URL.createObjectURL(file);
    
//     const newImageObj = {
//       id: imageId,
//       slotId: `multi-${imageId}`,
//       file: file,
//       preview: previewUrl,
//       uploading: true,
//       url: null,
//       publicId: null
//     };
    
//     setNewImages(prev => [...prev, newImageObj]);
    
//     toast.loading(`Uploading image ${i + 1}...`, { id: `upload-${imageId}` });
    
//     try {
//       const { url, publicId } = await uploadToCloudinary(file);
//       setNewImages(prev => {
//         const index = prev.findIndex(img => img.id === imageId);
//         if (index !== -1) {
//           const updated = [...prev];
//           updated[index] = { ...updated[index], url, publicId, uploading: false };
//           return updated;
//         }
//         return prev;
//       });
//       toast.success(`Image ${i + 1} uploaded`, { id: `upload-${imageId}`, duration: 1500 });
//     } catch (error) {
//       console.error('Upload error:', error);
//       setNewImages(prev => prev.filter(img => img.id !== imageId));
//       toast.error(`Failed to upload image ${i + 1}`, { id: `upload-${imageId}`, duration: 2000 });
//     }
//   }
  
//   if (fileInputRefs.current['multiple']) {
//     fileInputRefs.current['multiple'].value = '';
//   }
// };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };

//  const handleOrderUnitChange = (unit) => {
//   setOrderUnit(unit);
  
//   // Clear sizes when unit is not 'piece'
//   const updatedSizes = unit !== 'piece' ? [] : formData.sizes;
  
//   setFormData(prev => ({ 
//     ...prev, 
//     orderUnit: unit,
//     moq: unit === 'ton' ? 1 : 100,
//     pricePerUnit: 0,
//     sizes: updatedSizes  // Clear sizes for kg/ton
//   }));
// };

//   const handlePricingChange = (index, field, value) => {
//     const updatedPricing = [...formData.quantityBasedPricing];
//     if (field === 'price') {
//       if (value === '') updatedPricing[index] = { ...updatedPricing[index], [field]: '' };
//       else {
//         const numValue = parseFloat(value);
//         if (!isNaN(numValue)) updatedPricing[index] = { ...updatedPricing[index], [field]: numValue };
//       }
//     } else updatedPricing[index] = { ...updatedPricing[index], [field]: value };
//     setFormData(prev => ({ ...prev, quantityBasedPricing: updatedPricing }));
//   };

//   const addPricingRow = () => {
//     let newRange = '5000+';
//     if (orderUnit === 'ton') newRange = '50+';
//     else if (orderUnit === 'kg') newRange = '5000+';
//     setFormData(prev => ({ ...prev, quantityBasedPricing: [...prev.quantityBasedPricing, { range: newRange, price: 0 }] }));
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

//   const addSize = () => setFormData(prev => ({ ...prev, sizes: [...prev.sizes, ''] }));
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

//   const addColor = () => setFormData(prev => ({ ...prev, colors: [...prev.colors, { code: '#6B4F3A' }] }));
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
//   };

//   const addAdditionalInfo = () => setFormData(prev => ({ ...prev, additionalInfo: [...prev.additionalInfo, { fieldName: '', fieldValue: '' }] }));
//   const removeAdditionalInfo = (index) => {
//     const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
//     setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
//   };

//   const handleCustomizationChange = (index, field, value) => {
//     const updatedOptions = [...formData.customizationOptions];
//     updatedOptions[index] = { ...updatedOptions[index], [field]: value };
//     setFormData(prev => ({ ...prev, customizationOptions: updatedOptions }));
//   };

//   const addCustomizationOption = () => setFormData(prev => ({ ...prev, customizationOptions: [...prev.customizationOptions, { title: '', value: '' }] }));
//   const removeCustomizationOption = (index) => {
//     const updatedOptions = formData.customizationOptions.filter((_, i) => i !== index);
//     setFormData(prev => ({ ...prev, customizationOptions: updatedOptions }));
//   };

//   const handleTagToggle = (tag) => setFormData(prev => ({ ...prev, tags: prev.tags.includes(tag) ? [] : [tag] }));

//   const handleMetaChange = (field, value) => setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, [field]: value } }));

//   const addKeyword = () => {
//     if (!keywordInput.trim()) return;
//     const keywordsToAdd = keywordInput.split(',').map(k => k.trim()).filter(k => k !== '');
//     setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, metaKeywords: [...(prev.metaSettings.metaKeywords || []), ...keywordsToAdd] } }));
//     setKeywordInput('');
//   };

//   const handleKeywordKeyDown = (e) => {
//     if (e.key === 'Enter' || e.key === ',') {
//       e.preventDefault();
//       addKeyword();
//     }
//   };

//   const handleKeywordBlur = () => { if (keywordInput.trim()) addKeyword(); };
//   const removeKeyword = (indexToRemove) => setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, metaKeywords: prev.metaSettings.metaKeywords.filter((_, index) => index !== indexToRemove) } }));

//   const validateAdditionalInfo = () => {
//     let isValid = true;
//     const newErrors = {};
//     formData.additionalInfo.forEach((info, index) => {
//       if (!info.fieldName.trim()) { newErrors[`additionalInfo_${index}_fieldName`] = 'Field name is required'; isValid = false; }
//       if (!info.fieldValue.trim()) { newErrors[`additionalInfo_${index}_fieldValue`] = 'Field value is required'; isValid = false; }
//     });
//     setErrors(prev => ({ ...prev, ...newErrors }));
//     return isValid;
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
//     if (!formData.category) newErrors.category = 'Category is required';
//     if (!formData.targetedCustomer) newErrors.targetedCustomer = 'Targeted customer is required';
//     if (!formData.fabric.trim()) newErrors.fabric = 'Fabric details are required';
//     if (formData.moq < 1) newErrors.moq = 'MOQ must be at least 1';
//     if (formData.pricePerUnit < 0) newErrors.pricePerUnit = 'Price must be 0 or greater';
//     const hasImages = existingImages.length > 0 || newImages.some(img => img.url);
//     if (!hasImages) newErrors.images = 'At least one product image is required';
//     if (formData.colors.length === 0) newErrors.colors = 'At least one color is required';
//     if (formData.metaSettings.metaTitle && formData.metaSettings.metaTitle.length > 70) newErrors.metaTitle = 'Meta title should not exceed 70 characters';
//     if (formData.metaSettings.metaDescription && formData.metaSettings.metaDescription.length > 160) newErrors.metaDescription = 'Meta description should not exceed 160 characters';
//     setErrors(newErrors);
//     const isAdditionalInfoValid = validateAdditionalInfo();
//     return Object.keys(newErrors).length === 0 && isAdditionalInfoValid;
//   };

//   const hasChanges = () => {
//     if (!originalProduct) return false;
//     if (formData.productName !== originalProduct.productName) return true;
//     if (formData.description !== originalProduct.description) return true;
//     if (formData.instruction !== originalProduct.instruction) return true;
//     if (formData.category !== (originalProduct.category?._id || originalProduct.category)) return true;
//     if (formData.subcategory !== (originalProduct.subcategory || '')) return true;
//     if (formData.childSubcategory !== (originalProduct.childSubcategory || '')) return true;
//     if (formData.targetedCustomer !== originalProduct.targetedCustomer) return true;
//     if (formData.fabric !== originalProduct.fabric) return true;
//     if (formData.weightPerUnit !== (originalProduct.weightPerUnit || '')) return true;
//     if (formData.orderUnit !== (originalProduct.orderUnit || 'piece')) return true;
//     if (formData.moq !== originalProduct.moq) return true;
//     if (formData.pricePerUnit !== originalProduct.pricePerUnit) return true;
//     if (JSON.stringify(formData.quantityBasedPricing) !== JSON.stringify(originalProduct.quantityBasedPricing)) return true;
//     if (JSON.stringify(formData.sizes) !== JSON.stringify(originalProduct.sizes)) return true;
//     if (JSON.stringify(formData.colors) !== JSON.stringify(originalProduct.colors)) return true;
//     if (JSON.stringify(formData.additionalInfo) !== JSON.stringify(originalProduct.additionalInfo || [])) return true;
//     if (JSON.stringify(formData.customizationOptions) !== JSON.stringify(originalProduct.customizationOptions || [])) return true;
//     if (formData.isFeatured !== originalProduct.isFeatured) return true;
//     if (JSON.stringify(formData.tags) !== JSON.stringify(originalProduct.tags || [])) return true;
//     if (JSON.stringify(formData.metaSettings) !== JSON.stringify(originalProduct.metaSettings || {})) return true;
//     if (imagesToDelete.length > 0) return true;
//     if (newImages.some(img => img.url)) return true;
//      // Check if image order has changed using allImages
//   const currentImageOrder = allImages.filter(img => !img.uploading && img.url).map(img => img.url);
//   const originalImageOrder = originalProduct.images?.map(img => img.url) || [];
//   if (JSON.stringify(currentImageOrder) !== JSON.stringify(originalImageOrder)) return true;
//     return false;
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!hasChanges()) {
//     toast.info('No changes to save');
//     router.push('/moderator/all-products');
//     return;
//   }
//   const uploading = newImages.some(img => img.uploading === true);
//   if (uploading) {
//     toast.error('Please wait for all images to finish uploading');
//     return;
//   }
//   const hasEmptyPrice = formData.quantityBasedPricing.some(tier => tier.price === '');
//   if (hasEmptyPrice) {
//     toast.error('Please fill in all price fields in Quantity Based Pricing');
//     return;
//   }
//   if (!validateForm()) {
//     toast.error('Please fix the errors in the form');
//     return;
//   }
//   setIsSubmitting(true);
//   try {
//     const token = localStorage.getItem('token');
    
//     // FIX: Use allImages for the correct order instead of separate arrays
//     const allImageUrls = allImages
//       .filter(img => !img.uploading && img.url)
//       .map(img => img.url);
    
//     const processedPricing = formData.quantityBasedPricing.map(tier => ({ ...tier, price: tier.price === '' ? 0 : parseFloat(tier.price) }));
//     const processedAdditionalInfo = formData.additionalInfo.filter(info => info.fieldName.trim() !== '' && info.fieldValue.trim() !== '');
//     const processedCustomizationOptions = formData.customizationOptions.filter(option => option.title.trim() !== '' && option.value.trim() !== '');
    
//     // Only include sizes if order unit is 'piece', otherwise send empty array
//     const filteredSizes = orderUnit === 'piece' 
//       ? formData.sizes.filter(s => s.trim() !== '')
//       : [];
    
//     const payload = {
//       productName: formData.productName,
//       description: formData.description,
//       instruction: formData.instruction || '',
//       category: formData.category,
//       subcategory: formData.subcategory || '',
//       childSubcategory: formData.childSubcategory || '',
//       targetedCustomer: formData.targetedCustomer,
//       fabric: formData.fabric,
//       weightPerUnit: formData.weightPerUnit || '',
//       orderUnit: orderUnit,
//       moq: formData.moq,
//       pricePerUnit: formData.pricePerUnit,
//       quantityBasedPricing: processedPricing,
//       sizes: filteredSizes, // This will be empty array for kg/ton
//       colors: formData.colors,
//       additionalInfo: processedAdditionalInfo,
//       customizationOptions: processedCustomizationOptions,
//       images: allImageUrls, // ← USE allImages ORDER
//       isFeatured: formData.isFeatured,
//       tags: formData.tags,
//       metaSettings: formData.metaSettings,
//       imagesToDelete: imagesToDelete
//     };
    
//     const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
//       method: 'PUT',
//       headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload)
//     });
//     const data = await response.json();
//     if (data.success) {
//       toast.success('Product updated successfully!');
//       router.push('/moderator/all-products');
//     } else toast.error(data.error || 'Failed to update product');
//   } catch (error) {
//     console.error('Error updating product:', error);
//     toast.error('Network error. Please try again.');
//   } finally {
//     setIsSubmitting(false);
//   }
// };

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

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-[#4A7C59] mx-auto mb-4" />
//           <p className="text-gray-600">Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <MantineProvider>
//       <div className="min-h-screen bg-[#FAF7F2]">
//         {/* Header */}
//         <div className="bg-white border-b border-[#E8D5C0] sticky top-0 z-10 shadow-sm">
//           <div className="px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <NextLink href="/moderator/all-products" className="p-2 hover:bg-[#F5E6D3] rounded-lg transition-colors">
//                   <ArrowLeft className="w-5 h-5 text-[#6B4F3A]" />
//                 </NextLink>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <h1 className="text-2xl font-bold text-[#2C2420] font-serif">Edit Product</h1>
//                     <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
//                       <Shield className="w-3 h-3" />
//                       Moderator
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-1">Update product information</p>
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
//               <div className="lg:col-span-2">
//                 <div className="bg-white rounded-xl shadow-sm border border-[#E8D5C0]">
//                   <div className="p-5 border-b border-[#E8D5C0]">
//                     <h2 className="text-lg font-semibold text-[#2C2420] flex items-center gap-2 font-serif">
//                       <Package className="w-5 h-5 text-[#4A7C59]" />
//                       Basic Details
//                     </h2>
//                   </div>
//                   <div className="p-5 space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
//                       <input type="text" name="productName" value={formData.productName} onChange={handleChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition ${errors.productName ? 'border-red-500' : 'border-gray-300'}`} placeholder="e.g., Premium Jute Fiber, Jute Shopping Bag" />
//                       {errors.productName && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.productName}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                       {isMounted && editor && (
//                         <div className="border border-gray-300 rounded-lg overflow-hidden">
//                           <RichTextEditor editor={editor}>
//                             <RichTextEditor.Toolbar>
//                               <RichTextEditor.ControlsGroup><RichTextEditor.Bold /><RichTextEditor.Italic /><RichTextEditor.Underline /><RichTextEditor.Strikethrough /></RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup><RichTextEditor.H1 /><RichTextEditor.H2 /><RichTextEditor.H3 /><RichTextEditor.H4 /></RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup><RichTextEditor.BulletList /><RichTextEditor.OrderedList /></RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup><RichTextEditor.AlignLeft /><RichTextEditor.AlignCenter /><RichTextEditor.AlignRight /></RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup><RichTextEditor.Link /><RichTextEditor.Unlink /></RichTextEditor.ControlsGroup>
//                             </RichTextEditor.Toolbar>
//                             <RichTextEditor.Content />
//                           </RichTextEditor>
//                         </div>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Packaging / Care Instructions</label>
//                       {isMounted && instructionEditor && (
//                         <div className="border border-gray-300 rounded-lg overflow-hidden">
//                           <RichTextEditor editor={instructionEditor}>
//                             <RichTextEditor.Toolbar>
//                               <RichTextEditor.ControlsGroup><RichTextEditor.Bold /><RichTextEditor.Italic /><RichTextEditor.Underline /><RichTextEditor.Strikethrough /></RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup><RichTextEditor.H1 /><RichTextEditor.H2 /><RichTextEditor.H3 /><RichTextEditor.H4 /></RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup><RichTextEditor.BulletList /><RichTextEditor.OrderedList /></RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup><RichTextEditor.AlignLeft /><RichTextEditor.AlignCenter /><RichTextEditor.AlignRight /></RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup><RichTextEditor.Link /><RichTextEditor.Unlink /></RichTextEditor.ControlsGroup>
//                             </RichTextEditor.Toolbar>
//                             <RichTextEditor.Content />
//                           </RichTextEditor>
//                         </div>
//                       )}
//                       <p className="text-xs text-gray-500 mt-1">Add care instructions, washing guidelines, or any special notes for customers</p>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
//                         <select name="category" value={formData.category} onChange={handleChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition ${errors.category ? 'border-red-500' : 'border-gray-300'}`}>
//                           <option value="">Choose Category</option>
//                           {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//                         </select>
//                         {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1"><div className="flex items-center gap-1"><FolderTree className="w-4 h-4" />Subcategory <span className="text-gray-400 text-xs font-normal">(Optional)</span></div></label>
//                         <select name="subcategory" value={formData.subcategory} onChange={(e) => { handleChange(e); setFormData(prev => ({ ...prev, childSubcategory: '' })); }} disabled={!formData.category || subcategories.length === 0} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed border-gray-300">
//                           <option value="">-- Select Subcategory (Optional) --</option>
//                           {subcategories.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
//                         </select>
//                       </div>

//                       {showChildSubcategory && (
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1"><div className="flex items-center gap-1"><FolderTree className="w-4 h-4" />Child Subcategory <span className="text-gray-400 text-xs font-normal">(Optional)</span></div></label>
//                           <select name="childSubcategory" value={formData.childSubcategory} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition border-gray-300">
//                             <option value="">-- Select Child Subcategory (Optional) --</option>
//                             {childSubcategories.map(child => <option key={child._id} value={child._id}>{child.name}</option>)}
//                           </select>
//                         </div>
//                       )}

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1"><div className="flex items-center gap-1"><Users className="w-4 h-4" />Target Customer <span className="text-red-500">*</span></div></label>
//                         <div className="relative">
//                           <select name="targetedCustomer" value={formData.targetedCustomer} onChange={handleChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition appearance-none ${errors.targetedCustomer ? 'border-red-500' : 'border-gray-300'}`}>
//                             {TARGETED_CUSTOMERS.map(customer => <option key={customer.value} value={customer.value}>{customer.icon} {customer.label}</option>)}
//                           </select>
//                           <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"><span className="text-lg">{getSelectedCustomerIcon()}</span></div>
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Fabric (Material) <span className="text-red-500">*</span></label>
//                         <input type="text" name="fabric" value={formData.fabric} onChange={handleChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition ${errors.fabric ? 'border-red-500' : 'border-gray-300'}`} placeholder="e.g., 100% Natural Jute" />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1"><div className="flex items-center gap-1"><Scale className="w-4 h-4" />Weight Per Unit <span className="text-gray-400 text-xs font-normal">(Optional)</span></div></label>
//                         <div className="flex items-center gap-2">
//                           <input type="number" name="weightPerUnit" value={formData.weightPerUnit} onChange={handleChange} step="0.01" min="0" className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition" placeholder="e.g., 0.5" />
//                           <span className="text-sm text-gray-500">kg/unit</span>
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1">Specify weight per piece/unit (helps with shipping calculations)</p>
//                       </div>
//                     </div>

//                     {selectedCategoryDetails && (
//                       <div className="mt-2 p-3 rounded-lg border" style={{ backgroundColor: '#F5E6D3', borderColor: '#6B4F3A' }}>
//                         <div className="flex items-center gap-2">
//                           <Package className="w-4 h-4" style={{ color: '#6B4F3A' }} />
//                           <div>
//                             <p className="text-sm font-medium text-gray-900">Selected Category: {selectedCategoryDetails.name}</p>
//                             {formData.subcategory && subcategories.find(s => s._id === formData.subcategory) && <p className="text-xs text-gray-600 mt-1"><span className="font-medium">Subcategory:</span> {subcategories.find(s => s._id === formData.subcategory)?.name}</p>}
//                             {formData.childSubcategory && childSubcategories.find(c => c._id === formData.childSubcategory) && <p className="text-xs text-gray-600 mt-1"><span className="font-medium">Child Subcategory:</span> {childSubcategories.find(c => c._id === formData.childSubcategory)?.name}</p>}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Product Images Card */}
//               <div className="lg:col-span-1">
//                 <div className="bg-white rounded-xl shadow-sm border border-[#E8D5C0]">
//                   <div className="p-5 border-b border-[#E8D5C0]">
//                     <h2 className="text-lg font-semibold text-[#2C2420] flex items-center gap-2 font-serif">
//                       <ImageIcon className="w-5 h-5 text-[#4A7C59]" />
//                       Product Images <span className="text-red-500">*</span>
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">Existing: {existingImages.length} • New: {newImages.filter(img => img.url).length} • Total: {existingImages.length + newImages.filter(img => img.url).length} • Max 6 images total</p>
//                   </div>
//                   <div className="p-5">
//                     {errors.images && <p className="text-xs text-red-600 mb-4 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.images}</p>}
                    
//                     <div className="mb-4">
//                       <input type="file" id="multiple-images" className="hidden" accept="image/jpeg,image/jpg,image/png,image/webp" multiple onChange={handleMultipleImageSelect} ref={el => { if (el) fileInputRefs.current['multiple'] = el; }} />
//                       <button type="button" onClick={() => fileInputRefs.current['multiple']?.click()} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#F5E6D3] text-[#6B4F3A] font-medium rounded-lg border-2 border-dashed border-[#6B4F3A] hover:bg-[#E8D5C0] transition-colors">
//                         <Upload className="w-5 h-5" /><span>Select Multiple Images (Up to 6)</span>
//                       </button>
//                       <p className="text-xs text-gray-500 mt-2 text-center">You can select multiple images at once. Images will be uploaded automatically.</p>
//                     </div>

//                     {/* Unified Images Grid with Drag and Drop */}
//                     {allImages.length > 0 && (
//                       <div className="mb-4">
//                         <h3 className="text-xs font-medium text-gray-500 mb-2">Product Images (Drag to reorder)</h3>
//                         <div className="grid grid-cols-2 gap-3">
//                           {allImages.map((image, index) => (
//                             <div
//                               key={image.id}
//                               draggable={!image.uploading}
//                               onDragStart={() => handleDragStart(index)}
//                               onDragOver={handleDragOver}
//                               onDragOverCapture={(e) => handleDragOverWithFeedback(e, index)}
//                               onDragLeave={handleDragLeave}
//                               onDrop={() => handleDrop(index)}
//                               onDragEnd={handleDragEnd}
//                               className={`relative rounded-lg overflow-hidden transition-all duration-200 h-24 ${
//                                 draggedImageIndex === index ? 'opacity-50 scale-95' : 'border border-gray-200'
//                               } ${
//                                 dragOverImageIndex === index && draggedImageIndex !== index && draggedImageIndex !== null && !image.uploading
//                                   ? 'ring-2 ring-[#4A7C59] ring-offset-2' 
//                                   : ''
//                               }`}
//                             >
//                               {/* Drag handle - only for non-uploading images */}
//                               {!image.uploading && (
//                                 <div className="absolute top-1 left-1 bg-black/50 rounded px-1.5 py-0.5 z-10 cursor-grab active:cursor-grabbing">
//                                   <GripVertical className="w-3 h-3 text-white" />
//                                 </div>
//                               )}
                              
//                               <img 
//                                 src={image.type === 'existing' ? image.url : (image.preview || image.url)} 
//                                 alt="Product" 
//                                 className="w-full h-full object-cover"
//                               />
                              
//                               {/* Uploading Overlay */}
//                               {image.uploading && (
//                                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
//                                   <div className="text-center">
//                                     <Loader2 className="w-6 h-6 text-white animate-spin mx-auto mb-1" />
//                                     <span className="text-white text-[10px]">Uploading...</span>
//                                   </div>
//                                 </div>
//                               )}
                              
//                               {/* Remove Button */}
//                               <button
//                                 type="button"
//                                 onClick={() => {
//                                   if (image.type === 'existing') {
//                                     removeExistingImage(image.id);
//                                   } else {
//                                     removeNewImage(image.id);
//                                   }
//                                 }}
//                                 disabled={image.uploading}
//                                 className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10 disabled:opacity-50"
//                                 title="Remove Image"
//                               >
//                                 <X className="w-3 h-3" />
//                               </button>
                              
//                               {image.type === 'existing' && image.isPrimary && !image.uploading && (
//                                 <span className="absolute bottom-1 left-1 px-1 py-0.5 bg-[#4A7C59] text-white text-xs rounded z-10">
//                                   Primary
//                                 </span>
//                               )}
                              
//                               {image.type === 'new' && !image.uploading && image.url && (
//                                 <span className="absolute bottom-1 left-1 px-1 py-0.5 bg-green-500 text-white text-xs rounded z-10">
//                                   New
//                                 </span>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* Add More Images Slots - Only show if less than 6 images uploaded */}
//                     {allImages.filter(img => !img.uploading).length < 6 && (
//                       <div className="mt-4">
//                         <h3 className="text-xs font-medium text-gray-500 mb-2">Add More Images</h3>
//                         <div className="grid grid-cols-2 gap-3">
//                           {Array.from({ length: Math.max(0, 6 - allImages.filter(img => !img.uploading).length) }).map((_, idx) => {
//                             const slotId = `slot-${Date.now()}-${idx}-${Math.random()}`;
//                             return (
//                               <div key={slotId}>
//                                 <input type="file" id={`image-upload-${slotId}`} className="hidden" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={(e) => handleNewImageChange(e, slotId)} ref={el => { if (el) fileInputRefs.current[slotId] = el; }} />
//                                 <button type="button" onClick={() => fileInputRefs.current[slotId]?.click()} className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 text-center transition-colors cursor-pointer h-24 flex flex-col items-center justify-center hover:border-[#4A7C59] hover:bg-[#F5E6D3]">
//                                   <Upload className="w-5 h-5 text-gray-400 mb-1" /><p className="text-xs text-gray-600">Upload Image</p><p className="text-xs text-gray-400">Slot {idx + 1}</p>
//                                 </button>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )}
                    
//                     <div className="mt-4 text-xs text-gray-500 text-center">{allImages.filter(img => !img.uploading).length} of 6 images total</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Sizes and Colors */}
//           {/* Sizes and Colors */}
// <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//   {/* Sizes - Only show for 'piece' unit */}
//   {orderUnit === 'piece' ? (
//     <div className="bg-white rounded-xl shadow-sm border border-[#E8D5C0]">
//       <div className="p-5 border-b border-[#E8D5C0]">
//         <h2 className="text-lg font-semibold text-[#2C2420] flex items-center gap-2 font-serif">
//           <Ruler className="w-5 h-5 text-[#4A7C59]" />
//           Sizes <span className="text-gray-400 text-sm font-normal">(Optional)</span>
//         </h2>
//         <p className="text-xs text-gray-500 mt-1">Add sizes if applicable for this product</p>
//       </div>
//       <div className="p-5">
//         <div className="space-y-2">
//           {formData.sizes.map((size, index) => (
//             <div key={index} className="flex items-center gap-2">
//               <input
//                 type="text"
//                 value={size}
//                 onChange={(e) => handleSizeChange(index, e.target.value)}
//                 placeholder={`Size ${index + 1}`}
//                 className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition"
//               />
//               {formData.sizes.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeSize(index)}
//                   className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addSize}
//             className="w-full flex items-center justify-center gap-1 px-3 py-2 mt-2 text-xs font-medium border border-dashed rounded-lg transition-colors"
//             style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}
//           >
//             <Plus className="w-3.5 h-3.5" />
//             Add Size
//           </button>
//           <p className="text-xs text-gray-400 text-center mt-2">
//             Add custom sizes for this product
//           </p>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 text-center">
//       <Ruler className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//       <p className="text-sm text-gray-500">Sizes are not available for {orderUnit === 'kg' ? 'KG' : 'Metric Ton'} based products</p>
//       <p className="text-xs text-gray-400 mt-1">Please select "Pieces / Units" to add size options</p>
//     </div>
//   )}

//   {/* Colors - Always show */}
//   <div className="bg-white rounded-xl shadow-sm border border-[#E8D5C0]">
//     <div className="p-5 border-b border-[#E8D5C0]">
//       <h2 className="text-lg font-semibold text-[#2C2420] flex items-center gap-2 font-serif">
//         <Palette className="w-5 h-5 text-[#4A7C59]" />
//         Colors <span className="text-red-500">*</span>
//       </h2>
//     </div>
//     <div className="p-5">
//       {errors.colors && (
//         <p className="text-xs text-red-600 mb-3 flex items-center gap-1">
//           <AlertCircle className="w-3 h-3" />
//           {errors.colors}
//         </p>
//       )}
//       <div className="space-y-3">
//         {formData.colors.map((color, index) => (
//           <div key={index} className="relative">
//             <div className="flex items-center gap-2 w-full">
//               <div 
//                 className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 p-1 cursor-pointer hover:border-[#4A7C59] transition-colors"
//                 onClick={(e) => openColorPicker(index, e)}
//               >
//                 <div 
//                   className="w-10 h-10 rounded-lg border-2 border-gray-200 flex-shrink-0"
//                   style={{ backgroundColor: color.code }}
//                 />
//                 <div className="flex-1 font-mono text-sm text-gray-600">
//                   {color.code}
//                 </div>
//                 <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
//               </div>
//               {formData.colors.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeColor(index)}
//                   className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg flex-shrink-0"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//             {showColorPicker && currentColorIndex === index && (
//               <div ref={colorPickerRef} className="absolute right-0 mt-2 z-50">
//                 <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3">
//                   <SketchPicker
//                     color={color.code}
//                     onChange={(color) => handleColorChange(index, 'code', color.hex)}
//                     presetColors={PREDEFINED_COLORS}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addColor}
//           className="w-full flex items-center justify-center gap-1 px-3 py-2 mt-2 text-xs font-medium border border-dashed rounded-lg transition-colors"
//           style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}
//         >
//           <Plus className="w-3.5 h-3.5" />
//           Add Color
//         </button>
//       </div>
//     </div>
//   </div>
// </div>

//             {/* Order Unit Selection */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-[#E8D5C0]">
//                 <div className="p-5 border-b border-[#E8D5C0]">
//                   <h2 className="text-lg font-semibold text-[#2C2420] flex items-center gap-2 font-serif"><Package className="w-5 h-5 text-[#4A7C59]" />Selling Unit</h2>
//                   <p className="text-xs text-gray-500 mt-1">Select how this product is measured and sold</p>
//                 </div>
//                 <div className="p-5">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {ORDER_UNITS.map(unit => (
//                       <button key={unit.value} type="button" onClick={() => handleOrderUnitChange(unit.value)} className={`p-4 rounded-lg border-2 transition-all text-left ${orderUnit === unit.value ? 'border-[#4A7C59] bg-[#F5E6D3]' : 'border-gray-200 hover:border-[#4A7C59]'}`}>
//                         <div className="flex items-center gap-3"><span className="text-2xl">{unit.icon}</span><div><p className="font-medium text-gray-900">{unit.label}</p><p className="text-xs text-gray-500">{unit.description}</p></div></div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Pricing Section */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-[#E8D5C0]">
//                 <div className="p-5 border-b border-[#E8D5C0]">
//                   <h2 className="text-lg font-semibold text-[#2C2420] flex items-center gap-2 font-serif"><DollarSign className="w-5 h-5 text-[#4A7C59]" />Pricing & MOQ</h2>
//                 </div>
//                 <div className="p-5 space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order Quantity (MOQ) <span className="text-red-500">*</span></label>
//                       <div className="flex items-center gap-2">
//                         <input type="number" name="moq" value={formData.moq} onChange={handleChange} onWheel={(e) => e.target.blur()} min="1" className="flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition" />
//                         <span className="text-sm text-gray-500">{getCurrentUnitLabel()}</span>
//                       </div>
//                       {errors.moq && <p className="text-xs text-red-600 mt-1">{errors.moq}</p>}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">{getPricePerLabel()} ($) <span className="text-red-500">*</span></label>
//                       <div className="flex items-center gap-2">
//                         <input type="number" name="pricePerUnit" value={formData.pricePerUnit} onChange={handleChange} onWheel={(e) => e.target.blur()} min="0" step="0.01" className="flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition" />
//                         <span className="text-sm text-gray-500">$</span>
//                       </div>
//                       {errors.pricePerUnit && <p className="text-xs text-red-600 mt-1">{errors.pricePerUnit}</p>}
//                     </div>
//                   </div>

//                   <div>
//                     <div className="flex items-center justify-between mb-4">
//                       <label className="block text-sm font-medium text-gray-700">Bulk Pricing (Quantity in {getCurrentUnitLabel()}):</label>
//                       <button type="button" onClick={addPricingRow} className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border" style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}><PlusCircle className="w-3.5 h-3.5" />Add Tier</button>
//                     </div>
//                     <div className="space-y-4">
//                       {formData.quantityBasedPricing.map((tier, index) => (
//                         <div key={index} className="flex items-start gap-3">
//                           <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1.5">Quantity Range ({getCurrentUnitLabel()})</label><input type="text" value={tier.range} onChange={(e) => handlePricingChange(index, 'range', e.target.value)} placeholder={orderUnit === 'ton' ? "e.g., 1-4 MT" : orderUnit === 'kg' ? "e.g., 100-499 kg" : "e.g., 100-299 pcs"} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition" /></div>
//                           <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1.5">Price Per {orderUnit === 'ton' ? 'MT ($)' : orderUnit === 'kg' ? 'KG ($)' : 'Unit ($)'}</label><input type="number" value={tier.price} onChange={(e) => handlePricingChange(index, 'price', e.target.value)} onWheel={(e) => e.target.blur()} placeholder="0.00" min="0" step="0.01" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition" /></div>
//                           {formData.quantityBasedPricing.length > 1 && <div className="flex items-end h-[62px]"><button type="button" onClick={() => removePricingRow(index)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><MinusCircle className="w-5 h-5" /></button></div>}
//                         </div>
//                       ))}
//                     </div>
//                     <p className="text-xs text-gray-500 mt-2">{orderUnit === 'ton' ? 'Set pricing tiers based on order quantity in Metric Tons (1 MT = 1000 kg)' : orderUnit === 'kg' ? 'Set pricing tiers based on order weight in kilograms' : 'Set pricing tiers based on order quantity in pieces'}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Customization Options */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-[#E8D5C0]">
//                 <div className="p-5 border-b border-[#E8D5C0]">
//                   <h2 className="text-lg font-semibold text-[#2C2420] flex items-center gap-2 font-serif"><Wrench className="w-5 h-5 text-[#4A7C59]" />Customization Options</h2>
//                   <p className="text-xs text-gray-500 mt-1">Add customization options available for this product (e.g., Logo Printing, Handle Type, Color Options, etc.)</p>
//                 </div>
//                 <div className="p-5">
//                   <div className="space-y-4">
//                     {formData.customizationOptions.map((option, index) => (
//                       <div key={index} className="flex items-start gap-3 p-4 rounded-lg border" style={{ backgroundColor: '#FAF7F2', borderColor: '#F5E6D3' }}>
//                         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
//                           <div><label className="block text-xs font-medium text-gray-600 mb-1.5"><Type className="w-3 h-3 inline mr-1" />Customization Title</label><input type="text" value={option.title} onChange={(e) => handleCustomizationChange(index, 'title', e.target.value)} placeholder="e.g., Logo Printing, Handle Type, Material Finish" className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition" /></div>
//                           <div><label className="block text-xs font-medium text-gray-600 mb-1.5"><Hash className="w-3 h-3 inline mr-1" />Options / Details</label><input type="text" value={option.value} onChange={(e) => handleCustomizationChange(index, 'value', e.target.value)} placeholder="e.g., Custom logo available, Cotton handle, Matte finish" className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition" /></div>
//                         </div>
//                         <button type="button" onClick={() => removeCustomizationOption(index)} className="mt-6 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
//                       </div>
//                     ))}
//                     <button type="button" onClick={addCustomizationOption} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-2 border-dashed rounded-lg transition-colors" style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}><PlusCircle className="w-4 h-4" />Add Customization Option</button>
//                     <p className="text-xs text-gray-400 text-center mt-2">Add as many customization options as needed. Leave empty if not applicable.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Additional Information */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-[#E8D5C0]">
//                 <div className="p-5 border-b border-[#E8D5C0]">
//                   <h2 className="text-lg font-semibold text-[#2C2420] flex items-center gap-2 font-serif"><Info className="w-5 h-5 text-[#4A7C59]" />Additional Information</h2>
//                   <p className="text-xs text-gray-500 mt-1">Add custom fields for extra product details (e.g., GSM, tensile strength, etc.)</p>
//                 </div>
//                 <div className="p-5">
//                   <div className="space-y-4">
//                     {formData.additionalInfo.map((info, index) => (
//                       <div key={index} className="flex items-start gap-3 p-4 rounded-lg border" style={{ backgroundColor: '#FAF7F2', borderColor: '#F5E6D3' }}>
//                         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
//                           <div><label className="block text-xs font-medium text-gray-600 mb-1.5"><Type className="w-3 h-3 inline mr-1" />Field Name</label><input type="text" value={info.fieldName} onChange={(e) => handleAdditionalInfoChange(index, 'fieldName', e.target.value)} placeholder="e.g., GSM, Tensile Strength" className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition" /></div>
//                           <div><label className="block text-xs font-medium text-gray-600 mb-1.5"><Hash className="w-3 h-3 inline mr-1" />Field Value</label><input type="text" value={info.fieldValue} onChange={(e) => handleAdditionalInfoChange(index, 'fieldValue', e.target.value)} placeholder="e.g., 200 GSM, 50 kg" className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition" /></div>
//                         </div>
//                         <button type="button" onClick={() => removeAdditionalInfo(index)} className="mt-6 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
//                       </div>
//                     ))}
//                     <button type="button" onClick={addAdditionalInfo} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-2 border-dashed rounded-lg transition-colors" style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}><PlusCircle className="w-4 h-4" />Add Additional Information</button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Product Promotion */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-[#E8D5C0]">
//                 <div className="p-5 border-b border-[#E8D5C0]">
//                   <h2 className="text-lg font-semibold text-[#2C2420] flex items-center gap-2 font-serif"><Star className="w-5 h-5 text-[#4A7C59]" />Product Promotion</h2>
//                 </div>
//                 <div className="p-5">
//                   <div className="mb-4">
//                     <label className="flex items-center gap-3 cursor-pointer">
//                       <input type="checkbox" checked={formData.isFeatured} onChange={(e) => { setFormData({ ...formData, isFeatured: e.target.checked }); setShowTags(e.target.checked); }} className="w-5 h-5 rounded" style={{ accentColor: '#4A7C59' }} />
//                       <div><span className="text-sm font-medium text-gray-700">Mark as Featured Product</span><p className="text-xs text-gray-500">Featured products will appear in special sections</p></div>
//                     </label>
//                   </div>
//                   <div className="mt-4">
//                     <div className="flex items-center justify-between cursor-pointer py-2" onClick={() => setShowTags(!showTags)}>
//                       <div className="flex items-center gap-2"><Tag className="w-4 h-4 text-[#4A7C59]" /><h3 className="text-sm font-medium text-gray-700">Product Tags/Labels</h3></div>
//                       <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showTags ? 'rotate-180' : ''}`} />
//                     </div>
//                     {showTags && (
//                       <div className="mt-3">
//                         <p className="text-xs text-gray-500 mb-2">Select one tag (optional)</p>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                           {AVAILABLE_TAGS.map(tag => (
//                             <label key={tag} className="flex items-center gap-2 cursor-pointer"><input type="radio" name="productTag" checked={formData.tags.includes(tag)} onChange={() => handleTagToggle(tag)} className="w-4 h-4" style={{ accentColor: '#4A7C59' }} /><span className="text-sm text-gray-600">{tag}</span></label>
//                           ))}
//                         </div>
//                         {formData.tags.length > 0 && (
//                           <div className="mt-4 flex flex-wrap gap-2">
//                             {formData.tags.map(tag => (
//                               <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#F5E6D3', color: '#6B4F3A' }}>{tag}<button type="button" onClick={() => handleTagToggle(tag)} className="ml-1.5 hover:opacity-70"><X className="w-3 h-3" /></button></span>
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
//               <div className="bg-white rounded-xl shadow-sm border border-[#E8D5C0]">
//                 <div className="p-5 border-b border-[#E8D5C0]">
//                   <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowMeta(!showMeta)}>
//                     <h2 className="text-lg font-semibold text-[#2C2420] flex items-center gap-2 font-serif"><Search className="w-5 h-5 text-[#4A7C59]" />Meta Settings (SEO)</h2>
//                     <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showMeta ? 'rotate-180' : ''}`} />
//                   </div>
//                 </div>
//                 {showMeta && (
//                   <div className="p-5">
//                     <div className="space-y-4">
//                       <div><label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label><input type="text" value={formData.metaSettings.metaTitle} onChange={(e) => handleMetaChange('metaTitle', e.target.value)} maxLength="70" placeholder="Enter meta title (max 70 characters)" className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition" /><div className="flex justify-between mt-1"><p className="text-xs text-gray-500">Appears in search engine results</p><span className="text-xs text-gray-500">{formData.metaSettings.metaTitle?.length || 0}/70</span></div></div>
//                       <div><label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label><textarea value={formData.metaSettings.metaDescription} onChange={(e) => handleMetaChange('metaDescription', e.target.value)} maxLength="160" placeholder="Enter meta description (max 160 characters)" rows="3" className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition resize-none" /><div className="flex justify-between mt-1"><p className="text-xs text-gray-500">Brief description for search results</p><span className="text-xs text-gray-500">{formData.metaSettings.metaDescription?.length || 0}/160</span></div></div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
//                         {formData.metaSettings.metaKeywords?.length > 0 && (
//                           <div className="flex flex-wrap gap-2 mb-3 p-3 rounded-lg border" style={{ backgroundColor: '#FAF7F2', borderColor: '#F5E6D3' }}>
//                             {formData.metaSettings.metaKeywords.map((keyword, index) => (
//                               <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#F5E6D3', color: '#6B4F3A' }}>{keyword}<button type="button" onClick={() => removeKeyword(index)} className="ml-1.5 hover:opacity-70"><X className="w-3 h-3" /></button></span>
//                             ))}
//                           </div>
//                         )}
//                         <div className="relative">
//                           <input type="text" value={keywordInput} onChange={(e) => setKeywordInput(e.target.value)} onKeyDown={handleKeywordKeyDown} onBlur={handleKeywordBlur} placeholder="Type a keyword and press Enter or comma to add" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition pr-20" />
//                           {keywordInput.trim() && <button type="button" onClick={addKeyword} className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-white text-xs font-medium rounded transition-colors" style={{ backgroundColor: '#6B4F3A' }}>Add</button>}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="mt-6 flex justify-end gap-3">
//               <NextLink href="/moderator/all-products" className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm">Cancel</NextLink>
//               <button type="submit" disabled={isSubmitting || !hasChanges()} className="flex items-center gap-2 px-6 py-3 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm" style={{ backgroundColor: '#4A7C59' }}>
//                 {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Updating Product...</span></> : <><Save className="w-4 h-4" /><span>Update Product</span></>}
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

// Cloudinary upload function
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
      throw new Error('Upload failed');
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
      throw new Error('Upload failed');
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

  // Sync editor content
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

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      console.log('Product data:', data);
      
      if (data.success) {
        const product = data.data.product;
        
        setOriginalProduct(product);
        
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
          metaSettings: product.metaSettings || {
            metaTitle: '',
            metaDescription: '',
            metaKeywords: []
          }
        });

        // Set video data
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

        // Set product images
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
        
        // Fetch subcategories for the selected category
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

  // Drag and drop functions for image reordering
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
    
    // If it's an existing image (not new), mark for deletion
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
    if (!formData.ageGroup) newErrors.ageGroup = 'Age group is required';
    if (formData.stockQuantity < 0) newErrors.stockQuantity = 'Stock quantity cannot be negative';
    if (formData.regularPrice <= 0) newErrors.regularPrice = 'Regular price must be greater than 0';
    if (formData.discountPrice > formData.regularPrice) newErrors.discountPrice = 'Discount price cannot exceed regular price';
    if (!formData.deliveryInfo || formData.deliveryInfo === '<p></p>') newErrors.deliveryInfo = 'Delivery information is required';
    if (formData.metaSettings.metaTitle?.length > 70) newErrors.metaTitle = 'Meta title should not exceed 70 characters';
    if (formData.metaSettings.metaDescription?.length > 160) newErrors.metaDescription = 'Meta description should not exceed 160 characters';

    const hasImages = productImages.some(img => img.url !== null);
    if (!hasImages) newErrors.images = 'At least one product image is required';

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

        {/* Main Content - Same JSX as Admin Edit Page */}
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
                      {errors.deliveryInfo && <p className="text-xs text-red-600 mt-1">{errors.deliveryInfo}</p>}
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
                        {/* Meta Title */}
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

                        {/* Meta Description */}
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

                        {/* Meta Keywords */}
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
                          
                          {/* Display Keywords */}
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

                        {/* SEO Preview */}
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