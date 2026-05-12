


// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   Search, 
//   X, 
//   Filter,
//   Loader2,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   ChevronUp,
//   Tag,
//   Users,
//   DollarSign,
//   Edit,
//   Trash2,
//   Plus,
//   RefreshCw,
//   Eye,
//   CheckCircle,
//   XCircle,
//   Package,
//   AlertCircle,
//   ArrowLeft,
//   Star,
//   Sparkles,
//   TrendingUp,
//   Award,
//   Flame,
//   Palette,
//   Ruler,
//   Layers,
//   FolderTree,
//   Leaf
// } from 'lucide-react';
// import { toast } from 'sonner';

// // Helper function to get unit label
// const getUnitLabel = (orderUnit) => {
//   switch(orderUnit) {
//     case 'kg': return 'kg';
//     case 'ton': return 'MT';
//     default: return 'pc';
//   }
// };

// // Helper function to format MOQ display
// const formatMOQ = (moq, orderUnit) => {
//   if (orderUnit === 'ton') {
//     return `${moq} MT`;
//   } else if (orderUnit === 'kg') {
//     return `${moq} kg`;
//   }
//   return `${moq} pcs`;
// };

// // Filter Bar Component
// const FilterBar = ({ 
//   filters, 
//   handleFilterChange,
//   handleChildSubcategoryChange, 
//   categories,
//   subcategories,
//   childSubcategories, 
//   selectedCategory,
//   selectedSubcategory,
//   showChildSubcategory, 
//   minPriceInput,
//   maxPriceInput,
//   setMinPriceInput,
//   setMaxPriceInput,
//   applyPriceRange,
//   clearPriceRange,
//   getActiveFilterCount,
//   clearFilters
// }) => (
//   <div className="bg-white rounded-xl shadow-sm border border-[#E8D5C0] p-3 sm:p-4 mb-4 sm:mb-6">
//     <div className="flex items-center justify-between mb-2 sm:mb-3">
//       <h3 className="text-xs sm:text-sm font-semibold text-[#2C2420] flex items-center gap-1.5 sm:gap-2 font-serif">
//         <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4A7C59]" />
//         Filters
//       </h3>
//       {getActiveFilterCount() > 0 && (
//         <button
//           onClick={clearFilters}
//           className="text-[10px] sm:text-xs text-[#4A7C59] hover:text-[#3A6B4E] font-medium"
//         >
//           Clear All ({getActiveFilterCount()})
//         </button>
//       )}
//     </div>
  
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2 sm:gap-3 mb-3">
//       {/* Category Filter */}
//       <div>
//         <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Category</label>
//         <select
//           value={filters.category}
//           onChange={(e) => handleFilterChange('category', e.target.value)}
//           className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none bg-white"
//         >
//           <option value="">All Categories</option>
//           {categories.map(cat => (
//             <option key={cat._id} value={cat._id}>{cat.name}</option>
//           ))}
//         </select>
//       </div>

//       {/* Subcategory Filter */}
//       {selectedCategory && subcategories.length > 0 && (
//         <div>
//           <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Subcategory</label>
//           <select
//             value={filters.subcategory}
//             onChange={(e) => handleFilterChange('subcategory', e.target.value)}
//             className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none bg-white"
//           >
//             <option value="">All Subcategories</option>
//             {subcategories.map(sub => (
//               <option key={sub._id} value={sub._id}>{sub.name}</option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Child Subcategory Filter */}
//       {showChildSubcategory && selectedSubcategory && childSubcategories.length > 0 && (
//         <div>
//           <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Child Subcategory</label>
//           <select
//             value={filters.childSubcategory}
//             onChange={(e) => handleChildSubcategoryChange(e.target.value)}
//             className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none bg-white"
//           >
//             <option value="">All Child Subcategories</option>
//             {childSubcategories.map(child => (
//               <option key={child._id} value={child._id}>{child.name}</option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Target Audience Filter */}
//       <div>
//         <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Target Audience</label>
//         <select
//           value={filters.targetedCustomer}
//           onChange={(e) => handleFilterChange('targetedCustomer', e.target.value)}
//           className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none bg-white"
//         >
//           <option value="">All</option>
//           <option value="ladies">Ladies</option>
//           <option value="gents">Gents</option>
//           <option value="kids">Kids</option>
//           <option value="unisex">Unisex</option>
//         </select>
//       </div>

//       {/* Status Filter */}
//       <div>
//         <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Status</label>
//         <select
//           value={filters.status}
//           onChange={(e) => handleFilterChange('status', e.target.value)}
//           className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none bg-white"
//         >
//           <option value="all">All</option>
//           <option value="active">Active Only</option>
//           <option value="inactive">Inactive Only</option>
//         </select>
//       </div>

//       {/* Featured Filter */}
//       <div>
//         <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Featured</label>
//         <select
//           value={filters.isFeatured}
//           onChange={(e) => handleFilterChange('isFeatured', e.target.value)}
//           className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none bg-white"
//         >
//           <option value="">All Products</option>
//           <option value="featured">Featured Only</option>
//         </select>
//       </div>

//       {/* Sort */}
//       <div>
//         <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Sort By</label>
//         <select
//           value={filters.sortBy}
//           onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//           className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none bg-white"
//         >
//           <option value="newest">Newest First</option>
//           <option value="price_low">Price: Low to High</option>
//           <option value="price_high">Price: High to Low</option>
//           <option value="name_asc">Name: A to Z</option>
//           <option value="featured">Featured First</option>
//         </select>
//       </div>
//     </div>
    
//     <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
//       {/* Min Price Input */}
//       <div>
//         <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Min Price ($)</label>
//         <input
//           type="text"
//           inputMode="decimal"
//           value={minPriceInput}
//           onChange={(e) => {
//             const value = e.target.value;
//             if (value === '' || /^\d*\.?\d*$/.test(value)) {
//               setMinPriceInput(value);
//             }
//           }}
//           placeholder="0.00"
//           className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none"
//         />
//       </div>

//       {/* Max Price Input */}
//       <div>
//         <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Max Price ($)</label>
//         <input
//           type="text"
//           inputMode="decimal"
//           value={maxPriceInput}
//           onChange={(e) => {
//             const value = e.target.value;
//             if (value === '' || /^\d*\.?\d*$/.test(value)) {
//               setMaxPriceInput(value);
//             }
//           }}
//           placeholder="Any"
//           className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none"
//         />
//       </div>

//       {/* Apply Price Button */}
//       <div className="flex items-end">
//         <button
//           onClick={applyPriceRange}
//           disabled={!minPriceInput && !maxPriceInput}
//           className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-[#83644B] text-white text-[10px] sm:text-xs font-medium rounded-lg hover:bg-[#3A6B4E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Apply Price
//         </button>
//       </div>
//     </div>

//     {/* Show applied price range */}
//     {(filters.minPrice || filters.maxPrice) && (
//       <div className="mt-2 sm:mt-3 flex items-center justify-between bg-[#F5E6D3] p-1.5 sm:p-2 rounded-lg">
//         <span className="text-[9px] sm:text-xs text-gray-700">
//           Price: ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
//         </span>
//         <button onClick={clearPriceRange} className="text-gray-400 hover:text-gray-600">
//           <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//         </button>
//       </div>
//     )}
//   </div>
// );

// export default function AdminAllProducts() {
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeImageIndex, setActiveImageIndex] = useState({});
  
//   // Filter states
//   const [filters, setFilters] = useState({
//     search: '',
//     category: '',
//     subcategory: '',
//     childSubcategory: '',
//     targetedCustomer: '',
//     minPrice: '',
//     maxPrice: '',
//     status: 'all',
//     isFeatured: '',
//     sortBy: 'newest'
//   });

//   // Price range input states
//   const [minPriceInput, setMinPriceInput] = useState('');
//   const [maxPriceInput, setMaxPriceInput] = useState('');

//   // Available filter options
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [childSubcategories, setChildSubcategories] = useState([]);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [showChildSubcategory, setShowChildSubcategory] = useState(false);
  
//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalProducts, setTotalProducts] = useState(0);

//   // Delete confirmation modal
//   const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: '' });

//   // Check admin access
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (user.role !== 'admin' && user.role !== 'moderator') {
//       toast.error('Unauthorized access');
//       router.push('/login');
//     }
//   }, [router]);

//   // Fetch subcategories when category changes
//   useEffect(() => {
//     if (filters.category) {
//       const categoryId = filters.category;
//       setSelectedCategory(categoryId);
//       fetchSubcategories(categoryId);
//     } else {
//       setSubcategories([]);
//       setSelectedCategory(null);
//       if (filters.subcategory) {
//         setFilters(prev => ({ ...prev, subcategory: '' }));
//       }
//     }
//   }, [filters.category]);

//   // Fetch child subcategories when subcategory is selected
//   useEffect(() => {
//     if (filters.category && filters.subcategory) {
//       setSelectedSubcategory(filters.subcategory);
//       fetchChildSubcategories(filters.category, filters.subcategory);
//     } else {
//       setChildSubcategories([]);
//       setSelectedSubcategory(null);
//       setShowChildSubcategory(false);
//       if (filters.childSubcategory) {
//         setFilters(prev => ({ ...prev, childSubcategory: '' }));
//       }
//     }
//   }, [filters.subcategory, filters.category]);

//   // Helper functions
//   const capitalizeFirst = (str) => {
//     if (!str) return '';
//     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
//   };

//   const getFirstPricingTier = (pricingTiers) => {
//     if (!pricingTiers || pricingTiers.length === 0) return null;
//     return pricingTiers[0];
//   };

//   const formatPrice = (price) => {
//     return price?.toFixed(2) || '0.00';
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Get tag color based on tag name
//   const getTagColor = (tag) => {
//     if (tag.includes('Top')) return 'bg-amber-100 text-amber-800 border-amber-200';
//     if (tag.includes('New')) return 'bg-blue-100 text-blue-800 border-blue-200';
//     if (tag.includes('Best')) return 'bg-purple-100 text-purple-800 border-purple-200';
//     if (tag.includes('Summer')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//     if (tag.includes('Winter')) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
//     if (tag.includes('Limited')) return 'bg-red-100 text-red-800 border-red-200';
//     if (tag.includes('Trending')) return 'bg-pink-100 text-pink-800 border-pink-200';
//     return 'bg-gray-100 text-gray-800 border-gray-200';
//   };

//   const getTagIcon = (tag) => {
//     if (tag === 'Top Ranking') return <TrendingUp className="w-2.5 h-2.5 mr-0.5" />;
//     if (tag === 'Best Seller') return <Award className="w-2.5 h-2.5 mr-0.5" />;
//     if (tag === 'New Arrival') return <Sparkles className="w-2.5 h-2.5 mr-0.5" />;
//     if (tag === 'Trending') return <Flame className="w-2.5 h-2.5 mr-0.5" />;
//     return <Tag className="w-2.5 h-2.5 mr-0.5" />;
//   };

//   // Fetch categories on mount
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Fetch products when filters change
//   useEffect(() => {
//     fetchProducts();
//   }, [filters, currentPage]);

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

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const queryParams = new URLSearchParams();
//       queryParams.append('page', currentPage);
//       queryParams.append('limit', 10);
      
//       if (filters.search) queryParams.append('search', filters.search);
//       if (filters.category) queryParams.append('category', filters.category);
//       if (filters.subcategory) queryParams.append('subcategory', filters.subcategory);
//       if (filters.childSubcategory) queryParams.append('childSubcategory', filters.childSubcategory);
//       if (filters.targetedCustomer) queryParams.append('targetedCustomer', filters.targetedCustomer);
//       if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
//       if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      
//       if (filters.isFeatured === 'featured') {
//         queryParams.append('isFeatured', 'true');
//       }
      
//       queryParams.append('includeInactive', 'true');
      
//       if (filters.status === 'active') {
//         queryParams.append('isActive', 'true');
//       } else if (filters.status === 'inactive') {
//         queryParams.append('isActive', 'false');
//       }
      
//       let sortParam = '-createdAt';
//       switch (filters.sortBy) {
//         case 'price_low': sortParam = 'price_asc'; break;
//         case 'price_high': sortParam = 'price_desc'; break;
//         case 'name_asc': sortParam = 'name_asc'; break;
//         case 'featured': sortParam = 'featured'; break;
//         default: sortParam = 'newest';
//       }
//       queryParams.append('sort', sortParam);

//       const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         setProducts(data.data || []);
//         setTotalPages(data.pagination?.pages || 1);
//         setTotalProducts(data.pagination?.total || 0);
        
//         const initialActiveIndex = {};
//         (data.data || []).forEach(product => {
//           if (product._id) initialActiveIndex[product._id] = 0;
//         });
//         setActiveImageIndex(initialActiveIndex);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       toast.error('Failed to fetch products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (name, value) => {
//     setFilters(prev => ({ ...prev, [name]: value }));
//     setCurrentPage(1);
//   };

//   const handleChildSubcategoryChange = (value) => {
//     setFilters(prev => ({ ...prev, childSubcategory: value }));
//     setCurrentPage(1);
//   };

//   const applyPriceRange = () => {
//     setFilters(prev => ({
//       ...prev,
//       minPrice: minPriceInput || '',
//       maxPrice: maxPriceInput || ''
//     }));
//     setCurrentPage(1);
//   };

//   const clearPriceRange = () => {
//     setMinPriceInput('');
//     setMaxPriceInput('');
//     setFilters(prev => ({ ...prev, minPrice: '', maxPrice: '' }));
//     setCurrentPage(1);
//   };

//   const clearFilters = () => {
//     setFilters({
//       search: '',
//       category: '',
//       subcategory: '',
//       childSubcategory: '',
//       targetedCustomer: '',
//       minPrice: '',
//       maxPrice: '',
//       status: 'all',
//       isFeatured: '',
//       sortBy: 'newest'
//     });
//     setMinPriceInput('');
//     setMaxPriceInput('');
//     setCurrentPage(1);
//   };

//   const handleImageHover = (productId, imageIndex) => {
//     setActiveImageIndex(prev => ({ ...prev, [productId]: imageIndex }));
//   };

//   const handleImageLeave = (productId) => {
//     setActiveImageIndex(prev => ({ ...prev, [productId]: 0 }));
//   };

//   const handleEdit = (productId) => {
//     router.push(`/admin/editProduct?id=${productId}`);
//   };

//   const handleView = (productId) => {
//     router.push(`/admin/productDetails?id=${productId}`);
//   };

//   const handleDeleteClick = (id, name) => {
//     setDeleteModal({ show: true, id, name });
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/products/${deleteModal.id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success('Product deleted successfully');
//         fetchProducts();
//       } else {
//         toast.error(data.error || 'Failed to delete product');
//       }
//     } catch (error) {
//       console.error('Error deleting product:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setDeleteModal({ show: false, id: null, name: '' });
//     }
//   };

//   const handleToggleStatus = async (productId, currentStatus) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/products/${productId}/toggle`, {
//         method: 'PUT',
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success(`Product ${currentStatus ? 'deactivated' : 'activated'} successfully`);
//         fetchProducts();
//       } else {
//         toast.error(data.error || 'Failed to toggle product status');
//       }
//     } catch (error) {
//       console.error('Error toggling product status:', error);
//       toast.error('Network error. Please try again.');
//     }
//   };

//   const getActiveFilterCount = () => {
//     let count = 0;
//     if (filters.category) count++;
//     if (filters.subcategory) count++;
//     if (filters.childSubcategory) count++;
//     if (filters.targetedCustomer) count++;
//     if (filters.minPrice || filters.maxPrice) count++;
//     if (filters.status !== 'all') count++;
//     if (filters.isFeatured) count++;
//     return count;
//   };

//   // Compact Product List Component
//   const CompactProductList = ({ product }) => {
//     const productImages = product.images || [];
//     const activeIndex = activeImageIndex[product._id] || 0;
//     const firstTier = getFirstPricingTier(product.quantityBasedPricing);
//     const hasTags = product.tags && product.tags.length > 0;
//     const unitLabel = getUnitLabel(product.orderUnit);

//     return (
//       <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border ${
//         product.isActive ? 'border-[#E8D5C0]' : 'border-red-200 bg-red-50/30'
//       }`}>
//         <div className="p-3">
//           {/* First Row: Image and Product Details */}
//           <div className="flex gap-3">
//             {/* Left Column - Image */}
//             <div 
//               className="relative w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-[#FAF7F2] to-[#F5E6D3] flex-shrink-0 cursor-pointer"
//               onMouseEnter={() => productImages.length > 1 && handleImageHover(product._id, (activeIndex + 1) % productImages.length)}
//               onMouseLeave={() => handleImageLeave(product._id)}
//               onClick={() => handleView(product._id)}
//             >
//               <img
//                 src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100'}
//                 alt={product.productName}
//                 className="w-full h-full object-cover"
//               />
//               {productImages.length > 1 && (
//                 <div className="absolute bottom-0 right-0 bg-black/50 text-white text-[8px] px-1 rounded-tl">
//                   {activeIndex + 1}/{productImages.length}
//                 </div>
//               )}
//               {/* Eco Badge */}
//               <div className="absolute top-0 left-0 bg-[#4A7C59]/80 backdrop-blur-sm px-1 py-0.5 rounded-br">
//                 <Leaf className="w-2.5 h-2.5 text-white" />
//               </div>
//             </div>

//             {/* Right Column - Product Details */}
//             <div className="flex-1 min-w-0">
//               <div className="flex flex-wrap items-center gap-1 mb-1">
//                 <h3 className="text-sm font-semibold text-[#2C2420] truncate font-serif" title={product.productName}>
//                   {product.productName}
//                 </h3>
                
//                 <span className={`flex-shrink-0 text-[8px] px-1.5 py-0.5 rounded-full ${
//                   product.isActive ? 'bg-[#4A7C59]/20 text-[#4A7C59]' : 'bg-red-100 text-red-700'
//                 }`}>
//                   {product.isActive ? 'Active' : 'Inactive'}
//                 </span>

//                 {product.isFeatured && (
//                   <span className="flex-shrink-0 text-[8px] px-1.5 py-0.5 bg-[#C6A43B]/20 text-[#C6A43B] rounded-full flex items-center gap-0.5">
//                     <Star className="w-2.5 h-2.5" />
//                     Featured
//                   </span>
//                 )}
//               </div>

//               {/* Tags */}
//               {hasTags && (
//                 <div className="flex flex-wrap gap-1 mb-2">
//                   {product.tags.slice(0, 2).map((tag, idx) => (
//                     <span
//                       key={idx}
//                       className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-medium ${getTagColor(tag)}`}
//                     >
//                       {getTagIcon(tag)}
//                       {tag}
//                     </span>
//                   ))}
//                   {product.tags.length > 2 && (
//                     <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-medium bg-gray-100 text-gray-600">
//                       +{product.tags.length - 2}
//                     </span>
//                   )}
//                 </div>
//               )}

//               {/* Subcategory Display */}
//               {product.subcategoryName && (
//                 <div className="flex items-center gap-1 mb-1">
//                   <FolderTree className="w-2.5 h-2.5 text-gray-400" />
//                   <span className="text-[9px] text-gray-500">Sub: {product.subcategoryName}</span>
//                 </div>
//               )}

//               {/* Price & Unit */}
//               <div className="flex items-center gap-1 mb-1">
//                 <DollarSign className="w-3 h-3 text-[#4A7C59]" />
//                 <span className="font-medium text-[#4A7C59] text-xs">${formatPrice(product.pricePerUnit)}</span>
//                 <span className="text-gray-400 text-[10px]">/{unitLabel}</span>
//                 {firstTier && (
//                   <span className="text-[#C6A43B] text-[9px] ml-1">
//                     • {firstTier.range} {unitLabel}: ${formatPrice(firstTier.price)}
//                   </span>
//                 )}
//               </div>

//               {/* Category & MOQ */}
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center gap-0.5">
//                   <Tag className="w-2.5 h-2.5 text-gray-400" />
//                   <span className="text-[10px] text-gray-600 truncate">{product.category?.name || 'N/A'}</span>
//                 </div>
//                 <div className="w-px h-3 bg-gray-200" />
//                 <div className="flex items-center gap-0.5">
//                   <Package className="w-2.5 h-2.5 text-gray-400" />
//                   <span className="text-[10px] text-gray-600">MOQ: {formatMOQ(product.moq, product.orderUnit)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Second Row: Colors and Action Buttons */}
//           <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E8D5C0]">
//             {/* Left Side - Colors */}
//             <div className="flex items-center gap-2">
//               {product.colors && product.colors.length > 0 && (
//                 <div className="flex items-center gap-1">
//                   <Palette className="w-3 h-3 text-gray-400" />
//                   <div className="flex gap-0.5">
//                     {product.colors.slice(0, 4).map((color, idx) => (
//                       <div
//                         key={idx}
//                         className="w-2.5 h-2.5 rounded-full border border-gray-200 shadow-sm"
//                         style={{ backgroundColor: color.code }}
//                         title={color.name}
//                       />
//                     ))}
//                     {product.colors.length > 4 && (
//                       <span className="text-[8px] text-gray-500">+{product.colors.length - 4}</span>
//                     )}
//                   </div>
//                 </div>
//               )}
//               {product.sizes && product.sizes.length > 0 && (
//                 <div className="flex items-center gap-0.5">
//                   <Ruler className="w-3 h-3 text-gray-400" />
//                   <span className="text-[9px] text-gray-500">{product.sizes.slice(0, 3).join(', ')}{product.sizes.length > 3 && ` +${product.sizes.length - 3}`}</span>
//                 </div>
//               )}
//             </div>

//             {/* Right Side - Action Buttons */}
//             <div className="flex items-center gap-1.5 flex-shrink-0">
//               <button
//                 onClick={() => handleView(product._id)}
//                 className="p-1.5 bg-[#4A7C59] text-white rounded hover:bg-[#3A6B4E] transition-colors"
//                 title="View Details"
//               >
//                 <Eye className="w-3.5 h-3.5" />
//               </button>
//               <button
//                 onClick={() => handleEdit(product._id)}
//                 className="p-1.5 bg-[#C6A43B] text-white rounded hover:bg-[#B8962E] transition-colors"
//                 title="Edit"
//               >
//                 <Edit className="w-3.5 h-3.5" />
//               </button>
//               <button
//                 onClick={() => handleToggleStatus(product._id, product.isActive)}
//                 className={`p-1.5 rounded transition-colors ${
//                   product.isActive 
//                     ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
//                     : 'bg-green-100 text-green-700 hover:bg-green-200'
//                 }`}
//                 title={product.isActive ? 'Deactivate' : 'Activate'}
//               >
//                 {product.isActive ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
//               </button>
//               <button
//                 onClick={() => handleDeleteClick(product._id, product.productName)}
//                 className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
//                 title="Delete"
//               >
//                 <Trash2 className="w-3.5 h-3.5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#FAF7F2]">
//       {/* Header */}
//       <div className="bg-white border-b border-[#E8D5C0] sticky top-0 z-10 shadow-sm">
//         <div className="px-3 sm:px-6 py-3 sm:py-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
//             {/* Left Side - Title Section */}
//             <div className="flex items-center gap-2 sm:gap-4">
//               <Link href="/admin/dashboard" className="p-1.5 sm:p-2 hover:bg-[#F5E6D3] rounded-lg transition-colors">
//                 <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B4F3A]" />
//               </Link>
//               <div>
//                 <div className="flex flex-wrap items-center gap-1 sm:gap-2">
//                   <h1 className="text-lg sm:text-2xl font-bold text-[#2C2420] font-serif">All Products</h1>
//                   <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#F5E6D3] text-[#6B4F3A] text-[9px] sm:text-xs font-medium rounded-full">Admin</span>
//                 </div>
//                 <p className="text-[10px] sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
//                   Manage your jute product catalog • {totalProducts} total products
//                 </p>
//               </div>
//             </div>

//             {/* Right Side - Action Buttons (Desktop) */}
//             <div className="hidden sm:flex items-center gap-1.5 sm:gap-3">
//               <button
//                 onClick={fetchProducts}
//                 className="p-1.5 sm:p-2 text-gray-600 hover:bg-[#F5E6D3] rounded-lg transition-colors"
//                 title="Refresh"
//               >
//                 <RefreshCw className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
//               </button>
//               <Link
//                 href="/admin/create-products"
//                 className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 bg-[#83644B] text-white rounded-lg hover:bg-[#3A6B4E] transition-colors text-[10px] sm:text-sm"
//               >
//                 <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
//                 <span>Add Product</span>
//               </Link>
//             </div>
//           </div>

//           {/* Action Buttons - Mobile Only */}
//           <div className="flex sm:hidden items-center justify-end gap-2 mt-3 pt-2 border-t border-[#E8D5C0]">
//             <button
//               onClick={fetchProducts}
//               className="p-2 text-gray-600 hover:bg-[#F5E6D3] rounded-lg transition-colors"
//               title="Refresh"
//             >
//               <RefreshCw className="w-4 h-4" />
//             </button>
//             <Link
//               href="/admin/create-products"
//               className="flex items-center gap-1.5 px-3 py-1.5 bg-[#83644B] text-white rounded-lg hover:bg-[#3A6B4E] transition-colors text-xs"
//             >
//               <Plus className="w-3.5 h-3.5" />
//               <span>Add Product</span>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-3 sm:p-6">
//         {/* Search Bar */}
//         <div className="mb-3 sm:mb-4">
//           <div className="relative">
//             <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search products by name..."
//               value={filters.search}
//               onChange={(e) => handleFilterChange('search', e.target.value)}
//               className="w-full pl-8 sm:pl-9 pr-8 sm:pr-9 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition bg-white"
//             />
//             {filters.search && (
//               <button
//                 onClick={() => handleFilterChange('search', '')}
//                 className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Filter Bar */}
//         <FilterBar 
//           filters={filters}
//           handleFilterChange={handleFilterChange}
//           categories={categories}
//           subcategories={subcategories}
//           childSubcategories={childSubcategories}
//           selectedCategory={selectedCategory}
//           selectedSubcategory={selectedSubcategory}
//           showChildSubcategory={showChildSubcategory}
//           handleChildSubcategoryChange={handleChildSubcategoryChange}
//           minPriceInput={minPriceInput}
//           maxPriceInput={maxPriceInput}
//           setMinPriceInput={setMinPriceInput}
//           setMaxPriceInput={setMaxPriceInput}
//           applyPriceRange={applyPriceRange}
//           clearPriceRange={clearPriceRange}
//           getActiveFilterCount={getActiveFilterCount}
//           clearFilters={clearFilters}
//         />

//         {/* Results Count */}
//         <div className="mb-3 sm:mb-4 flex items-center justify-between">
//           <p className="text-[10px] sm:text-sm text-gray-600">
//             Showing <span className="font-semibold text-[#2C2420]">{products.length}</span> of{' '}
//             <span className="font-semibold text-[#2C2420]">{totalProducts}</span> products
//           </p>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="flex justify-center items-center py-10 sm:py-20">
//             <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-[#4A7C59]" />
//           </div>
//         )}

//         {/* Products Display */}
//         {!loading && (
//           <>
//             {products.length === 0 ? (
//               <div className="text-center py-10 sm:py-20 bg-white rounded-lg border border-[#E8D5C0]">
//                 <Package className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
//                 <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">No products found matching your criteria</p>
//                 <button
//                   onClick={clearFilters}
//                   className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#4A7C59] text-white text-[10px] sm:text-sm rounded-lg hover:bg-[#3A6B4E] transition-colors"
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <div className="space-y-2">
//                   {products.map(product => (
//                     <CompactProductList key={product._id} product={product} />
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="flex justify-center items-center gap-1 sm:gap-2 mt-4 sm:mt-8">
//                     <button
//                       onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                       disabled={currentPage === 1}
//                       className="p-1 sm:p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white"
//                     >
//                       <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
//                     </button>
                    
//                     {[...Array(totalPages)].map((_, i) => {
//                       const pageNum = i + 1;
//                       if (
//                         pageNum === 1 ||
//                         pageNum === totalPages ||
//                         (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
//                       ) {
//                         return (
//                           <button
//                             key={i}
//                             onClick={() => setCurrentPage(pageNum)}
//                             className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-sm font-medium transition-colors ${
//                               currentPage === pageNum
//                                 ? 'bg-[#4A7C59] text-white'
//                                 : 'bg-white border border-gray-300 hover:bg-gray-50'
//                             }`}
//                           >
//                             {pageNum}
//                           </button>
//                         );
//                       } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
//                         return <span key={i} className="text-gray-400 text-[10px] sm:text-sm">...</span>;
//                       }
//                       return null;
//                     })}
                    
//                     <button
//                       onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                       disabled={currentPage === totalPages}
//                       className="p-1 sm:p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white"
//                     >
//                       <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </>
//         )}
//       </div>

//       {/* Delete Confirmation Modal */}
//       {deleteModal.show && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
//             <div className="p-4 sm:p-6">
//               <div className="flex items-center gap-2 sm:gap-3 text-red-600 mb-3 sm:mb-4">
//                 <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
//                 <h3 className="text-base sm:text-lg font-semibold text-[#2C2420] font-serif">Delete Product</h3>
//               </div>
              
//               <p className="text-xs sm:text-sm text-gray-600 mb-2">
//                 Are you sure you want to delete <span className="font-semibold text-[#2C2420]">"{deleteModal.name}"</span>?
//               </p>
//               <p className="text-[10px] sm:text-xs text-gray-500 mb-4 sm:mb-6">
//                 This action cannot be undone. The product and its images will be permanently removed.
//               </p>

//               <div className="flex items-center justify-end gap-2 sm:gap-3">
//                 <button
//                   onClick={() => setDeleteModal({ show: false, id: null, name: '' })}
//                   className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteConfirm}
//                   className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
//                 >
//                   Delete Product
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  X, 
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Tag,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  Package,
  AlertCircle,
  ArrowLeft,
  Star,
  Sparkles,
  TrendingUp,
  Award,
  Flame,
  Palette,
  Ruler,
  Layers,
  FolderTree,
  Gift,
  Clock,
  Zap,
  Truck,
  Heart
} from 'lucide-react';
import { toast } from 'sonner';

// Age group options
const AGE_GROUPS = [
  { value: '0-2', label: '0-2 years', icon: '👶', color: 'bg-pink-100 text-pink-600' },
  { value: '3-5', label: '3-5 years', icon: '🧒', color: 'bg-blue-100 text-blue-600' },
  { value: '6-10', label: '6-10 years', icon: '👧', color: 'bg-green-100 text-green-600' },
  { value: '11-14', label: '11-14 years', icon: '🧑', color: 'bg-purple-100 text-purple-600' }
];

// Helper function to calculate discount percentage
const calculateDiscount = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

const formatPrice = (price) => {
  return price?.toFixed(2) || '0';
};

// Get tag style based on tag name
const getTagStyle = (tag) => {
  const styles = {
    'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white',
    'New Arrival': 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white',
    'Limited Edition': 'bg-gradient-to-r from-purple-500 to-pink-600 text-white',
    'Eco-Friendly': 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
    'Educational': 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white',
    'STEM Toy': 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white',
    'Montessori': 'bg-gradient-to-r from-teal-500 to-green-600 text-white',
    'Creative Play': 'bg-gradient-to-r from-pink-500 to-rose-600 text-white',
    'Outdoor Fun': 'bg-gradient-to-r from-orange-500 to-red-600 text-white',
    'Non-Toxic': 'bg-gradient-to-r from-emerald-500 to-green-600 text-white',
    'Award Winner': 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white',
    'Trending': 'bg-gradient-to-r from-rose-500 to-red-600 text-white'
  };
  return styles[tag] || 'bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white';
};

// Helper function to get age group style
const getAgeGroupStyle = (ageGroup) => {
  const age = AGE_GROUPS.find(a => a.value === ageGroup);
  return age?.color || 'bg-gray-100 text-gray-600';
};

// Filter Bar Component
const FilterBar = ({ 
  filters, 
  handleFilterChange,
  handleChildSubcategoryChange, 
  categories,
  subcategories,
  childSubcategories, 
  selectedCategory,
  selectedSubcategory,
  showChildSubcategory, 
  minPriceInput,
  maxPriceInput,
  setMinPriceInput,
  setMaxPriceInput,
  applyPriceRange,
  clearPriceRange,
  getActiveFilterCount,
  clearFilters
}) => (
  <div className="bg-white rounded-xl shadow-sm border-2 border-[#FFE0E6] p-3 sm:p-4 mb-4 sm:mb-6">
    <div className="flex items-center justify-between mb-2 sm:mb-3">
      <h3 className="text-xs sm:text-sm font-bold text-[#2D3A5C] flex items-center gap-1.5 sm:gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
        <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4A8A90]" />
        Filters
      </h3>
      {getActiveFilterCount() > 0 && (
        <button
          onClick={clearFilters}
          className="text-[10px] sm:text-xs text-[#4A8A90] hover:text-[#FFB6C1] font-medium"
        >
          Clear All ({getActiveFilterCount()})
        </button>
      )}
    </div>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 sm:gap-3 mb-3">
      {/* Search Input */}
      <div className="lg:col-span-2">
        <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Search</label>
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none bg-white"
        />
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Category</label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none bg-white"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Subcategory Filter */}
      {selectedCategory && subcategories.length > 0 && (
        <div>
          <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Subcategory</label>
          <select
            value={filters.subcategory}
            onChange={(e) => handleFilterChange('subcategory', e.target.value)}
            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none bg-white"
          >
            <option value="">All Subcategories</option>
            {subcategories.map(sub => (
              <option key={sub._id} value={sub._id}>{sub.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Age Group Filter */}
      <div>
        <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Age Group</label>
        <select
          value={filters.ageGroup}
          onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none bg-white"
        >
          <option value="">All Ages</option>
          {AGE_GROUPS.map(age => (
            <option key={age.value} value={age.value}>{age.icon} {age.label}</option>
          ))}
        </select>
      </div>

      {/* Featured Filter */}
      <div>
        <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Featured</label>
        <select
          value={filters.isFeatured}
          onChange={(e) => handleFilterChange('isFeatured', e.target.value)}
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none bg-white"
        >
          <option value="">All Products</option>
          <option value="featured">Featured Only</option>
        </select>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Status</label>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none bg-white"
        >
          <option value="all">All</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
        </select>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none bg-white"
        >
          <option value="newest">Newest First</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="name_asc">Name: A to Z</option>
          <option value="rating_desc">Rating: High to Low</option>
        </select>
      </div>
    </div>
    
    {/* Price Range Row */}
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-3 mt-2">
      <div>
        <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Min Price (৳)</label>
        <input
          type="text"
          inputMode="decimal"
          value={minPriceInput}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || /^\d*\.?\d*$/.test(value)) {
              setMinPriceInput(value);
            }
          }}
          placeholder="0"
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
        />
      </div>
      <div>
        <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Max Price (৳)</label>
        <input
          type="text"
          inputMode="decimal"
          value={maxPriceInput}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || /^\d*\.?\d*$/.test(value)) {
              setMaxPriceInput(value);
            }
          }}
          placeholder="Any"
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
        />
      </div>
      <div className="flex items-end">
        <button
          onClick={applyPriceRange}
          disabled={!minPriceInput && !maxPriceInput}
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-[#4A8A90] text-white text-[10px] sm:text-xs font-medium rounded-lg hover:bg-[#3A7A80] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Apply Price
        </button>
      </div>
      {(filters.minPrice || filters.maxPrice) && (
        <div className="flex items-center justify-between bg-[#FFF9F0] p-1.5 sm:p-2 rounded-lg border border-[#FFE0E6] col-span-4">
          <span className="text-[9px] sm:text-xs text-[#4A8A90] font-medium">
            Price: ৳{filters.minPrice || '0'} - ৳{filters.maxPrice || '∞'}
          </span>
          <button onClick={clearPriceRange} className="text-gray-400 hover:text-gray-600">
            <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </button>
        </div>
      )}
    </div>
  </div>
);

// Product List Component
const ProductList = ({ product, onEdit, onView, onDelete, onToggleStatus }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const productImages = product.images || [];
  const hasMultipleImages = productImages.length > 1;
  const discountPercent = calculateDiscount(product.regularPrice, product.discountPrice);
  const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
  const primaryTag = product.tags?.[0];
  const tagStyle = primaryTag ? getTagStyle(primaryTag) : '';

  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-2 ${
      product.isActive ? 'border-[#FFE0E6]' : 'border-red-200 bg-red-50/30'
    } overflow-hidden`}>
      <div className="p-3 sm:p-4">
        {/* First Row: Image and Product Details */}
        <div className="flex gap-3 sm:gap-4">
          {/* Left Column - Image */}
          <div 
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6] flex-shrink-0 cursor-pointer"
            onMouseEnter={() => hasMultipleImages && setActiveImageIndex((activeImageIndex + 1) % productImages.length)}
            onClick={() => onView(product._id)}
          >
            <img
              src={productImages[activeImageIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/100?text=Toy'}
              alt={product.productName}
              className="w-full h-full object-contain p-1 transition-all duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/100?text=Toy';
              }}
            />
            {hasMultipleImages && (
              <div className="absolute bottom-0 right-0 bg-black/50 text-white text-[8px] px-1 rounded-tl">
                {activeImageIndex + 1}/{productImages.length}
              </div>
            )}
            
            {/* Discount Badge on Image */}
            {discountPercent > 0 && (
              <div className="absolute top-0 left-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br shadow-lg flex items-center gap-0.5">
                <Zap className="w-2 h-2" />
                {discountPercent}%
              </div>
            )}
          </div>

          {/* Right Column - Product Details */}
      <div className="flex-1 min-w-0">
  {/* Top Row: Name, Status, Featured */}
  <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
    <h3 className="text-sm sm:text-base font-bold text-[#2D3A5C] truncate hover:text-[#4A8A90] transition-colors max-w-[200px] sm:max-w-[300px]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }} title={product.productName}>
      {product.productName}
    </h3>
    
    <span className={`flex-shrink-0 text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
      product.isActive ? 'bg-[#4A8A90]/20 text-[#4A8A90]' : 'bg-red-100 text-red-700'
    }`}>
      {product.isActive ? 'Active' : 'Inactive'}
    </span>

    {product.isFeatured && (
      <span className="flex-shrink-0 text-[9px] px-1.5 py-0.5 bg-[#FFD93D]/20 text-[#C6A43B] rounded-full flex items-center gap-0.5 font-medium">
        <Star className="w-2.5 h-2.5 fill-[#C6A43B]" />
        Featured
      </span>
    )}
  </div>

  {/* Second Row: Tags, Age Group, Category, Subcategory - All in ONE ROW */}
  <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
    {/* Tag */}
    {primaryTag && (
      <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-semibold ${tagStyle}`}>
        <Sparkles className="w-2 h-2" />
        {primaryTag}
      </span>
    )}
    
    {/* Age Group */}
    {product.ageGroup && (
      <div className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium ${getAgeGroupStyle(product.ageGroup)}`}>
        <Users className="w-2.5 h-2.5" />
        Ages {product.ageGroup}
      </div>
    )}
    
    {/* Category */}
    {product.category?.name && (
      <div className="flex items-center gap-0.5 text-gray-500 text-[9px]">
        <Package className="w-2.5 h-2.5" />
        <span className="truncate max-w-[80px] sm:max-w-[120px]">{product.category.name}</span>
      </div>
    )}
    
    {/* Subcategory */}
    {product.subcategoryName && (
      <div className="flex items-center gap-0.5 text-gray-400 text-[9px]">
        <FolderTree className="w-2.5 h-2.5" />
        <span className="truncate max-w-[80px] sm:max-w-[120px]">{product.subcategoryName}</span>
      </div>
    )}
  </div>

  {/* Price Row */}
  <div className="flex items-baseline gap-2 mb-1.5">
    <span className="text-base sm:text-lg font-bold text-[#4A8A90]">
      ৳{formatPrice(currentPrice)}
    </span>
    {discountPercent > 0 && (
      <>
        <span className="text-[9px] sm:text-[10px] text-gray-400 line-through">
          ৳{formatPrice(product.regularPrice)}
        </span>
        <span className="text-[8px] sm:text-[9px] font-semibold text-red-500 bg-red-100 px-1 py-0.5 rounded-full">
          Save {discountPercent}%
        </span>
      </>
    )}
  </div>

  {/* Third Row: Rating, Stock, COD, SKU - All in ONE ROW */}
  <div className="flex flex-wrap items-center gap-2">
    {/* Rating */}
    {product.rating > 0 && (
      <div className="flex items-center gap-1">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-2.5 h-2.5 ${
                star <= Math.floor(product.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : star - 0.5 <= product.rating
                  ? 'fill-yellow-400 text-yellow-400 opacity-50'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-[8px] text-gray-500">({product.rating})</span>
      </div>
    )}
    
    {/* Stock Status */}
    {product.stockQuantity > 0 ? (
      <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px]">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
        In Stock ({product.stockQuantity})
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px]">
        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
        Out of Stock
      </span>
    )}
    
    {/* COD Available */}
    {product.codAvailable && (
      <span className="inline-flex items-center gap-1 text-[#4A8A90] bg-[#D4EDEE] px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px]">
        <Truck className="w-2.5 h-2.5" />
        COD Available
      </span>
    )}
    
    {/* SKU Code */}
    {product.skuCode && (
      <span className="text-gray-400 text-[8px] sm:text-[9px]">SKU: {product.skuCode}</span>
    )}
  </div>
</div>
        </div>

        {/* Second Row: Action Buttons */}
        <div className="flex items-center justify-end gap-1.5 mt-3 pt-2 border-t border-[#FFE0E6]">
          <button
            onClick={() => onView(product._id)}
            className="p-1.5 bg-[#4A8A90] text-white text-[10px] sm:text-xs font-medium rounded-lg hover:bg-[#3A7A80] transition-colors flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
       
          </button>
          <button
            onClick={() => onEdit(product._id)}
            className="p-1.5 bg-[#C6A43B] text-white text-[10px] sm:text-xs font-medium rounded-lg hover:bg-[#B8962E] transition-colors flex items-center gap-1"
          >
            <Edit className="w-3.5 h-3.5" />
         
          </button>
          <button
            onClick={() => onToggleStatus(product._id, product.isActive)}
            className={`p-1.5 rounded-lg transition-colors ${
              product.isActive 
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
            title={product.isActive ? 'Deactivate' : 'Activate'}
          >
            {product.isActive ? <XCircle className="w-3.5 h-3.5" />  : <CheckCircle className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => onDelete(product._id, product.productName)}
            className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdminAllProducts() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    subcategory: '',
    childSubcategory: '',
    ageGroup: '',
    minPrice: '',
    maxPrice: '',
    status: 'all',
    isFeatured: '',
    sortBy: 'newest'
  });

  // Price range input states
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');

  // Available filter options
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [childSubcategories, setChildSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [showChildSubcategory, setShowChildSubcategory] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Delete confirmation modal
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: '' });

  // Check admin access
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'admin' && user.role !== 'moderator') {
      toast.error('Unauthorized access');
      router.push('/login');
    }
  }, [router]);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (filters.category) {
      const categoryId = filters.category;
      setSelectedCategory(categoryId);
      fetchSubcategories(categoryId);
    } else {
      setSubcategories([]);
      setSelectedCategory(null);
      if (filters.subcategory) {
        setFilters(prev => ({ ...prev, subcategory: '' }));
      }
    }
  }, [filters.category]);

  // Fetch child subcategories when subcategory is selected
  useEffect(() => {
    if (filters.category && filters.subcategory) {
      setSelectedSubcategory(filters.subcategory);
      fetchChildSubcategories(filters.category, filters.subcategory);
    } else {
      setChildSubcategories([]);
      setSelectedSubcategory(null);
      setShowChildSubcategory(false);
      if (filters.childSubcategory) {
        setFilters(prev => ({ ...prev, childSubcategory: '' }));
      }
    }
  }, [filters.subcategory, filters.category]);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [filters, currentPage]);

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
        setShowChildSubcategory(data.data.children.length > 0);
      } else {
        setChildSubcategories([]);
        setShowChildSubcategory(false);
      }
    } catch (error) {
      console.error('Error fetching child subcategories:', error);
      setChildSubcategories([]);
      setShowChildSubcategory(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage);
      queryParams.append('limit', 10);
      
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.subcategory) queryParams.append('subcategory', filters.subcategory);
      if (filters.childSubcategory) queryParams.append('childSubcategory', filters.childSubcategory);
      if (filters.ageGroup) queryParams.append('ageGroup', filters.ageGroup);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      
      if (filters.isFeatured === 'featured') {
        queryParams.append('isFeatured', 'true');
      }
      
      queryParams.append('includeInactive', 'true');
      
      if (filters.status === 'active') {
        queryParams.append('isActive', 'true');
      } else if (filters.status === 'inactive') {
        queryParams.append('isActive', 'false');
      }
      
      let sortParam = '-createdAt';
      switch (filters.sortBy) {
        case 'price_low': sortParam = 'price_asc'; break;
        case 'price_high': sortParam = 'price_desc'; break;
        case 'name_asc': sortParam = 'name_asc'; break;
        case 'rating_desc': sortParam = 'rating_desc'; break;
        default: sortParam = 'newest';
      }
      queryParams.append('sort', sortParam);

      const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalProducts(data.pagination?.total || 0);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleChildSubcategoryChange = (value) => {
    setFilters(prev => ({ ...prev, childSubcategory: value }));
    setCurrentPage(1);
  };

  const applyPriceRange = () => {
    setFilters(prev => ({
      ...prev,
      minPrice: minPriceInput || '',
      maxPrice: maxPriceInput || ''
    }));
    setCurrentPage(1);
  };

  const clearPriceRange = () => {
    setMinPriceInput('');
    setMaxPriceInput('');
    setFilters(prev => ({ ...prev, minPrice: '', maxPrice: '' }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      subcategory: '',
      childSubcategory: '',
      ageGroup: '',
      minPrice: '',
      maxPrice: '',
      status: 'all',
      isFeatured: '',
      sortBy: 'newest'
    });
    setMinPriceInput('');
    setMaxPriceInput('');
    setCurrentPage(1);
  };

  const handleEdit = (productId) => {
    router.push(`/admin/editProduct?id=${productId}`);
  };

  const handleView = (productId) => {
    router.push(`/admin/productDetails?id=${productId}`);
  };

  const handleDeleteClick = (id, name) => {
    setDeleteModal({ show: true, id, name });
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${deleteModal.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Product deleted successfully');
        fetchProducts();
      } else {
        toast.error(data.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setDeleteModal({ show: false, id: null, name: '' });
    }
  };

  const handleToggleStatus = async (productId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${productId}/toggle`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Product ${currentStatus ? 'deactivated' : 'activated'} successfully`);
        fetchProducts();
      } else {
        toast.error(data.error || 'Failed to toggle product status');
      }
    } catch (error) {
      console.error('Error toggling product status:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category) count++;
    if (filters.subcategory) count++;
    if (filters.childSubcategory) count++;
    if (filters.ageGroup) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.status !== 'all') count++;
    if (filters.isFeatured) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      {/* Header */}
      <div className="bg-white border-b-2 border-[#FFE0E6] sticky top-0 z-10 shadow-sm">
        <div className="px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            {/* Left Side - Title Section */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/admin/dashboard" className="p-1.5 sm:p-2 hover:bg-pink-50 rounded-lg transition-colors">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A8A90]" />
              </Link>
              <div>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                  <h1 className="text-lg sm:text-2xl font-bold text-[#2D3A5C] flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                    <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A8A90]" />
                    All Products
                  </h1>
                  <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#D4EDEE] text-[#4A8A90] text-[9px] sm:text-xs font-medium rounded-full">Admin</span>
                </div>
                <p className="text-[10px] sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                  Manage your toy product catalog • {totalProducts} total products
                </p>
              </div>
            </div>

            {/* Right Side - Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <button
                onClick={() => fetchProducts()}
                className="p-1.5 sm:p-2 text-gray-600 hover:bg-pink-50 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </button>
              <Link
                href="/admin/create-products"
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition-colors text-[10px] sm:text-sm font-medium shadow-md"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Add Product</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3 sm:p-6">
        {/* Filter Bar */}
        <FilterBar 
          filters={filters}
          handleFilterChange={handleFilterChange}
          categories={categories}
          subcategories={subcategories}
          childSubcategories={childSubcategories}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          showChildSubcategory={showChildSubcategory}
          handleChildSubcategoryChange={handleChildSubcategoryChange}
          minPriceInput={minPriceInput}
          maxPriceInput={maxPriceInput}
          setMinPriceInput={setMinPriceInput}
          setMaxPriceInput={setMaxPriceInput}
          applyPriceRange={applyPriceRange}
          clearPriceRange={clearPriceRange}
          getActiveFilterCount={getActiveFilterCount}
          clearFilters={clearFilters}
        />

        {/* Results Count */}
        <div className="mb-3 sm:mb-4 flex items-center justify-between">
          <p className="text-[10px] sm:text-sm text-gray-500">
            Showing <span className="font-semibold text-[#2D3A5C]">{products.length}</span> of{' '}
            <span className="font-semibold text-[#2D3A5C]">{totalProducts}</span> products
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-10 sm:py-20">
            <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-[#4A8A90]" />
          </div>
        )}

        {/* Products Display */}
        {!loading && (
          <>
            {products.length === 0 ? (
              <div className="text-center py-10 sm:py-20 bg-white rounded-xl border-2 border-[#FFE0E6] shadow-sm">
                <Gift className="w-12 h-12 sm:w-16 sm:h-16 text-[#FFB6C1] mx-auto mb-3 sm:mb-4" />
                <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">No products found matching your criteria</p>
                <button
                  onClick={clearFilters}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#4A8A90] text-white text-[10px] sm:text-sm rounded-lg hover:bg-[#3A7A80] transition-colors shadow-md"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3 sm:space-y-4">
                  {products.map(product => (
                    <ProductList 
                      key={product._id} 
                      product={product}
                      onEdit={handleEdit}
                      onView={handleView}
                      onDelete={handleDeleteClick}
                      onToggleStatus={handleToggleStatus}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-1 sm:gap-2 mt-6 sm:mt-8">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-1.5 sm:p-2 border-2 border-[#FFE0E6] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-50 transition-colors bg-white shadow-sm"
                    >
                      <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-[#4A8A90]" />
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-sm font-semibold transition-all shadow-sm ${
                              currentPage === pageNum
                                ? 'bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white'
                                : 'bg-white border-2 border-[#FFE0E6] text-[#2D3A5C] hover:bg-pink-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                        return <span key={i} className="text-gray-400 text-[10px] sm:text-sm">...</span>;
                      }
                      return null;
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-1.5 sm:p-2 border-2 border-[#FFE0E6] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-50 transition-colors bg-white shadow-sm"
                    >
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#4A8A90]" />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border-2 border-[#FFE0E6]">
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 text-red-600 mb-3 sm:mb-4">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-base sm:text-lg font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>Delete Product</h3>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                Are you sure you want to delete <span className="font-semibold text-[#2D3A5C]">"{deleteModal.name}"</span>?
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500 mb-4 sm:mb-6">
                This action cannot be undone. The product and its images will be permanently removed.
              </p>

              <div className="flex items-center justify-end gap-2 sm:gap-3">
                <button
                  onClick={() => setDeleteModal({ show: false, id: null, name: '' })}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-md"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}