
// // smooth


// 'use client';

// import Link from 'next/link';
// import { useState, useEffect, useRef } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { 
//   ChevronDown, 
//   LogOut, 
//   Settings, 
//   User, 
//   LayoutDashboard, 
//   ShoppingCart,
//   Search,
//   X,
//   Gift,
//   Flame,
//   Home,
//   Info,
//   Phone,
//   Menu,
//   UserCircle,
//   Heart,
//   Headphones,
//   Grid3x3,
// } from 'lucide-react';
// import { toast } from 'sonner';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [user, setUser] = useState(null);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [authLoading, setAuthLoading] = useState(true);
//   const [scrolled, setScrolled] = useState(false);
//   const [profileImageError, setProfileImageError] = useState(false);
//   const [hideTopNavbar, setHideTopNavbar] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [categoriesLoading, setCategoriesLoading] = useState(true);
//   const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
//   const lastScrollY = useRef(0);
//   const ticking = useRef(false);

//   const searchRef = useRef(null);
//   const categoriesRef = useRef(null);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Fetch categories for dropdown
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setCategoriesLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/categories');
//       const data = await response.json();
      
//       if (data.success) {
//         setCategories(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setCategories([
//         { _id: '1', name: 'Educational Toys', slug: 'educational-toys' },
//         { _id: '2', name: 'Baby Toys', slug: 'baby-toys' },
//         { _id: '3', name: 'RC Cars', slug: 'rc-cars' },
//         { _id: '4', name: 'Soft Toys', slug: 'soft-toys' },
//         { _id: '5', name: 'STEM Kits', slug: 'stem-kits' },
//         { _id: '6', name: 'Puzzles', slug: 'puzzles' },
//         { _id: '7', name: 'Art Supplies', slug: 'art-supplies' },
//         { _id: '8', name: 'Outdoor Toys', slug: 'outdoor-toys' },
//         { _id: '9', name: 'Board Games', slug: 'board-games' },
//         { _id: '10', name: 'Action Figures', slug: 'action-figures' },
//         { _id: '11', name: 'Dolls', slug: 'dolls' },
//         { _id: '12', name: 'Musical Toys', slug: 'musical-toys' },
//       ]);
//     } finally {
//       setCategoriesLoading(false);
//     }
//   };

//   // Close categories dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
//         setCategoriesDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Optimized scroll handler with requestAnimationFrame for smooth performance
//   useEffect(() => {
//     const handleScroll = () => {
//       if (!ticking.current) {
//         requestAnimationFrame(() => {
//           const currentScrollY = window.scrollY;
//           setScrolled(currentScrollY > 20);
          
//           const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
          
//           if (scrollDifference > 3) {
//             if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
//               setHideTopNavbar(true);
//             } else if (currentScrollY < lastScrollY.current || currentScrollY <= 50) {
//               setHideTopNavbar(false);
//             }
//           }
//           lastScrollY.current = currentScrollY;
//           ticking.current = false;
//         });
//         ticking.current = true;
//       }
//     };
    
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close search on click outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowResults(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (!authLoading) {
//       fetchCartCount();
//     }
//   }, [user, authLoading]);
  
//   // Check user state
//   const checkUserState = () => {
//     if (typeof window !== 'undefined') {
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           setUser(parsedUser);
//           setProfileImageError(false);
//         } catch (error) {
//           console.error('Error parsing user data:', error);
//           setUser(null);
//         }
//       } else {
//         setUser(null);
//       }
//       setAuthLoading(false);
//     }
//   };

//   // Fetch cart count
//   const fetchCartCount = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else {
//         const sessionId = localStorage.getItem('cartSessionId');
//         if (sessionId) {
//           headers['x-session-id'] = sessionId;
//         }
//       }
      
//       const response = await fetch('http://localhost:5000/api/cart', { headers });
      
//       if (response.ok) {
//         const data = await response.json();
//         setCartCount(data.data?.totalItems || 0);
//       } else {
//         setCartCount(0);
//       }
//     } catch (error) {
//       console.error('Fetch cart count error:', error);
//       setCartCount(0);
//     }
//   };

//   // Fetch wishlist count
//  // Fetch wishlist count - Updated to support guests
// const fetchWishlistCount = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     const wishlistSessionId = localStorage.getItem('wishlistSessionId');
//     const headers = {};
    
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     } else if (wishlistSessionId) {
//       headers['x-session-id'] = wishlistSessionId;
//     } else {
//       // No token and no sessionId, set count to 0
//       setWishlistCount(0);
//       return;
//     }
    
//     const response = await fetch('http://localhost:5000/api/wishlist', { headers });
    
//     if (response.ok) {
//       const data = await response.json();
//       setWishlistCount(data.data?.totalItems || 0);
//     } else {
//       setWishlistCount(0);
//     }
//   } catch (error) {
//     console.error('Fetch wishlist count error:', error);
//     setWishlistCount(0);
//   }
// };

//   useEffect(() => {
//     checkUserState();
//     fetchCartCount();
//     fetchWishlistCount();

//     const handleAuthChange = () => {
//       checkUserState();
//       fetchCartCount();
//       fetchWishlistCount();
//     };

//     window.addEventListener('auth-change', handleAuthChange);
//     window.addEventListener('focus', handleAuthChange);
//     window.addEventListener('cart-update', fetchCartCount);
//     window.addEventListener('wishlist-update', fetchWishlistCount);

//     return () => {
//       window.removeEventListener('auth-change', handleAuthChange);
//       window.removeEventListener('focus', handleAuthChange);
//       window.removeEventListener('cart-update', fetchCartCount);
//       window.removeEventListener('wishlist-update', fetchWishlistCount);
//     };
//   }, []);

//   useEffect(() => {
//     fetchCartCount();
//     fetchWishlistCount();
//   }, [pathname]);

//   useEffect(() => {
//     const handleCartUpdate = () => {
//       fetchCartCount();
//       fetchWishlistCount();
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
    
//     return () => {
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, []);

//   // Add this useEffect after your cart update useEffect
// useEffect(() => {
//   const handleWishlistUpdate = () => {
//     fetchWishlistCount();
//   };
  
//   window.addEventListener('wishlist-update', handleWishlistUpdate);
  
//   return () => {
//     window.removeEventListener('wishlist-update', handleWishlistUpdate);
//   };
// }, []);

//   const navItems = [
//     { name: 'Home', href: '/', icon: Home },
//     { name: 'Toys', href: '/products', icon: Gift, highlight: true },
//     { name: 'Categories', href: '#', icon: Grid3x3, hasDropdown: true },
//     { name: 'Flash Sale', href: '/flash-sale', icon: Flame, badge: 'HOT' },
//     { name: 'About', href: '/about', icon: Info },
//     { name: 'Contact', href: '/contact', icon: Phone },
//   ];

//   const isActive = (path) => {
//     if (path === '/') return pathname === '/';
//     return pathname.startsWith(path);
//   };

// // Update the performSearch function
// const performSearch = async (query) => {
//   if (!query.trim()) {
//     setSearchResults([]);
//     setShowResults(false);
//     return;
//   }
  
//   setSearchLoading(true);
//   try {
//     // Use the products endpoint with search parameter
//     const response = await fetch(`http://localhost:5000/api/products?search=${encodeURIComponent(query)}&limit=5`);
//     const data = await response.json();
    
//     console.log('Search response:', data); // Debug log to see the structure
    
//     if (data.success && data.data && data.data.length > 0) {
//       setSearchResults(data.data);
//       setShowResults(true);
//     } else {
//       setSearchResults([]);
//       setShowResults(false);
//     }
//   } catch (error) {
//     console.error('Search error:', error);
//     setSearchResults([]);
//     setShowResults(false);
//   } finally {
//     setSearchLoading(false);
//   }
// };

// // Update the handleResultClick function


//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchQuery) {
//         performSearch(searchQuery);
//       } else {
//         setSearchResults([]);
//         setShowResults(false);
//       }
//     }, 300);
//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchOpen(false);
//       setSearchQuery('');
//       setShowResults(false);
//     }
//   };

// //  const handleResultClick = (result) => {
// //   const productId = result._id;
// //   if (productId) {
// //     router.push(`/product/${productId}`);
// //   } else {
// //     router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
// //   }
// //   setSearchOpen(false);
// //   setSearchQuery('');
// //   setShowResults(false);
// // };


// const handleResultClick = (result) => {
//   const productId = result._id;
//   if (productId) {
//     // Change this line - use query parameter instead of path parameter
//     router.push(`/productDetails?id=${productId}`);
//   } else {
//     router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//   }
//   setSearchOpen(false);
//   setSearchQuery('');
//   setShowResults(false);
// };
//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     setCartCount(0);
//     setWishlistCount(0);
//     setUserMenuOpen(false);
//     window.dispatchEvent(new Event('cart-update'));
//       window.dispatchEvent(new Event('wishlist-update'));
//     window.dispatchEvent(new Event('auth-change'));
//     toast.success('🎉 Logged out successfully! See you soon!');
//     router.push('/');
//   };

//   const getDashboardLink = () => {
//     if (!user) return '/';
//     switch (user.role) {
//       case 'admin': return '/admin/dashboard';
//       case 'moderator': return '/moderator/dashboard';
//       default: return '/customer/dashboard';
//     }
//   };

//   const getDisplayName = () => {
//     if (!user) return '';
//     return user.companyName || user.contactPerson || user.email?.split('@')[0] || 'Toy Lover';
//   };

//   const getInitials = () => {
//     if (!user) return '🎈';
//     const name = getDisplayName();
//     return name.charAt(0).toUpperCase();
//   };

//   const getProfilePicture = () => {
//     return user?.profilePicture || user?.photoURL || null;
//   };

//   // Get bottom navbar top position based on screen size and state
//   const getBottomNavbarTop = () => {
//     if (hideTopNavbar) return '0px';
//     // Check screen width
//     if (typeof window !== 'undefined') {
//       return window.innerWidth >= 1024 ? '48px' : '40px';
//     }
//     return '40px';
//   };

//   if (authLoading) {
//     return (
//       <div className="fixed top-0 z-50 w-full">
//         <div className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] py-2">
//           <div className="container mx-auto px-4">
//             <div className="flex items-center justify-between">
//               <div className="w-32 h-6 bg-white/20 rounded animate-pulse"></div>
//               <div className="flex gap-4">
//                 <div className="w-20 h-6 bg-white/20 rounded animate-pulse"></div>
//                 <div className="w-20 h-6 bg-white/20 rounded animate-pulse"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white shadow-md py-3">
//           <div className="container mx-auto px-4">
//             <div className="flex items-center justify-between">
//               <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
//               <div className="flex gap-4">
//                 <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
//                 <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
//                 <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* ========== TOP NAVBAR - SCROLLS AWAY ========== */}
//       <div 
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out ${
//           hideTopNavbar ? '-translate-y-full' : 'translate-y-0'
//         } ${scrolled ? 'bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] shadow-md' : 'bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1]'}`}
//         style={{ 
//           transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
//           willChange: 'transform'
//         }}
//       >
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="flex items-center justify-between h-10 lg:h-12">
            
//             {/* Customer Support */}
//             <div className="hidden md:flex items-center gap-2 text-white">
//               <Headphones className="w-4 h-4" />
//               <span className="text-xs font-medium">Support: +880 1234 567890</span>
//             </div>

//             {/* Search Bar - Desktop with Results */}
//             <div className="hidden lg:block flex-1 max-w-md mx-4 relative" ref={searchRef}>
//               <form onSubmit={handleSearchSubmit} className="relative">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="🔍 Search for toys..."
//                   className="w-full px-4 py-1.5 pr-8 text-sm text-gray-700 bg-white/90 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFB6C1]"
//                   style={{ fontFamily: "'Comic Neue', 'Poppins', sans-serif" }}
//                 />
//                 {searchLoading ? (
//                   <div className="absolute right-3 top-1/2 -translate-y-1/2">
//                     <div className="w-3.5 h-3.5 border-2 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
//                   </div>
//                 ) : (
//                   <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
//                     <Search className="w-3.5 h-3.5 text-gray-400" />
//                   </button>
//                 )}
//               </form>

//            {/* Search Results Dropdown */}
// {showResults && searchResults.length > 0 && (
//   <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-80 overflow-y-auto z-50">
//     {searchResults.map((product) => (
//       <button
//         key={product._id}
//         onClick={() => handleResultClick(product)}
//         className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0"
//       >
//         {/* Get the first image from the images array */}
//         {product.images && product.images.length > 0 ? (
//           <img 
//             src={product.images[0]?.url || product.images[0]} 
//             alt={product.productName || product.name} 
//             className="w-12 h-12 rounded-lg object-cover bg-gray-100"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = 'https://via.placeholder.com/48?text=No+Image';
//             }}
//           />
//         ) : (
//           <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
//             <Gift className="w-6 h-6 text-gray-400" />
//           </div>
//         )}
//         <div className="flex-1">
//           <p className="font-medium text-gray-800 text-sm line-clamp-1">
//             {product.productName || product.name || product.title}
//           </p>
//           {/* Show price with discount if available */}
//           <div className="flex items-center gap-2 mt-1">
//             {product.discountPrice && product.discountPrice < product.regularPrice ? (
//               <>
//                 <span className="text-xs font-bold text-[#4A8A90]">
//                   ৳{product.discountPrice}
//                 </span>
//                 <span className="text-[10px] text-gray-400 line-through">
//                   ৳{product.regularPrice}
//                 </span>
//                 <span className="text-[9px] font-semibold text-red-500 bg-red-100 px-1 rounded">
//                   {Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)}% OFF
//                 </span>
//               </>
//             ) : (
//               <span className="text-xs font-bold text-[#4A8A90]">
//                 ৳{product.regularPrice || product.price}
//               </span>
//             )}
//           </div>
//           {/* Show age group if available */}
//           {product.ageGroup && (
//             <p className="text-[9px] text-gray-400 mt-1">
//               Ages {product.ageGroup}
//             </p>
//           )}
//         </div>
//       </button>
//     ))}
//     <button
//       onClick={handleSearchSubmit}
//       className="w-full px-4 py-2 text-center text-sm text-[#4A8A90] hover:bg-gray-50 font-medium border-t border-gray-100"
//     >
//       View all results for "{searchQuery}"
//     </button>
//   </div>
// )}

//               {/* No Results Message */}
//               {showResults && searchResults.length === 0 && searchQuery && !searchLoading && (
//                 <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-4 text-center z-50">
//                   <p className="text-gray-500 text-sm">No products found for "{searchQuery}"</p>
//                 </div>
//               )}
//             </div>

//             {/* Right Icons */}
//             <div className="flex items-center gap-3 lg:gap-4">
              
//               {/* Mobile Search Button */}
//               <button
//                 onClick={() => setSearchOpen(!searchOpen)}
//                 className="lg:hidden p-1 rounded-full bg-white/20 hover:bg-white/30 transition-all"
//               >
//                 <Search className="w-4 h-4 text-white" />
//               </button>

//               {/* Wishlist */}
//               {/* <Link href="/wishlist" className="relative p-1 rounded-full bg-white/20 hover:bg-white/30 transition-all group">
//                 <Heart className="w-4 h-4 text-[#4A8A90] group-hover:scale-110 transition-transform" />
//                 {wishlistCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-[#FFB6C1] text-[#4A8A90] text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
//                     {wishlistCount > 9 ? '9+' : wishlistCount}
//                   </span>
//                 )}
//               </Link> */}

//               <Link href="/wishlist" className="relative p-1 rounded-full bg-white/20 hover:bg-white/30 transition-all group">
//   <Heart className="w-4 h-4 text-[#4A8A90] group-hover:scale-110 transition-transform" />
//   {wishlistCount > 0 && (
//     <span className="absolute -top-1 -right-1 bg-[#FFB6C1] text-[#4A8A90] text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
//       {wishlistCount > 9 ? '9+' : wishlistCount}
//     </span>
//   )}
// </Link>

//               {/* Cart */}
//               <Link href="/cart" className="relative p-1 rounded-full bg-white/20 hover:bg-white/30 transition-all group">
//                 <ShoppingCart className="w-4 h-4 text-[#4A8A90] group-hover:scale-110 transition-transform" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-[#FFB6C1] text-[#4A8A90] text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
//                     {cartCount > 9 ? '9+' : cartCount}
//                   </span>
//                 )}
//               </Link>

//               {/* User Menu / Auth Buttons */}
//               {user ? (
//                 <div className="relative">
//                   <button
//                     onClick={() => setUserMenuOpen(!userMenuOpen)}
//                     className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-all"
//                   >
//                     {getProfilePicture() && !profileImageError ? (
//                       <img 
//                         src={getProfilePicture()} 
//                         alt={getDisplayName()}
//                         className="w-6 h-6 rounded-full object-cover border border-[#FFB6C1]"
//                         onError={() => setProfileImageError(true)}
//                       />
//                     ) : (
//                       <div className="w-6 h-6 rounded-full bg-[#FFB6C1] flex items-center justify-center text-[#4A8A90] font-black text-xs">
//                         {getInitials()}
//                       </div>
//                     )}
//                     <span className="hidden md:inline text-white font-bold text-xs max-w-[80px] truncate">
//                       {getDisplayName()}
//                     </span>
//                     <ChevronDown className={`w-3 h-3 text-white transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
//                   </button>

//                   {/* User Dropdown */}
//                   {userMenuOpen && (
//                     <>
//                       <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
//                       <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl overflow-hidden z-50">
//                         <div className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] px-3 py-2">
//                           <div className="flex items-center gap-2">
//                             {getProfilePicture() && !profileImageError ? (
//                               <img src={getProfilePicture()} alt={getDisplayName()} className="w-8 h-8 rounded-full object-cover border border-white" />
//                             ) : (
//                               <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
//                                 {getInitials()}
//                               </div>
//                             )}
//                             <div>
//                               <p className="text-white font-bold text-xs truncate">{getDisplayName()}</p>
//                               <p className="text-white/70 text-[10px] truncate">{user.email}</p>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="p-1">
//                           <Link href={getDashboardLink()} className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 text-sm" onClick={() => setUserMenuOpen(false)}>
//                             <LayoutDashboard className="w-3.5 h-3.5 text-[#4A8A90]" />
//                             <span>Dashboard</span>
//                           </Link>
//                           <button onClick={() => { setUserMenuOpen(false); logout(); }} className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 w-full text-sm">
//                             <LogOut className="w-3.5 h-3.5" />
//                             <span>Logout</span>
//                           </button>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <Link href="/login" className="px-2 py-1 rounded-full font-bold text-[#4A8A90] hover:text-white transition-all text-xs">
//                     Sign In
//                   </Link>
//                   <Link href="/register" className="px-3 py-1 rounded-full font-bold bg-white text-[#4A8A90] shadow-md hover:shadow-lg transition-all text-xs">
//                     Register
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ========== BOTTOM NAVBAR - STACKS BELOW TOP NAVBAR ========== */}
//       <div 
//         className={`fixed left-0 right-0 z-40 transition-all duration-400 ease-out bg-white shadow-md ${
//           scrolled ? 'shadow-lg' : ''
//         }`}
//         style={{ 
//           top: getBottomNavbarTop(),
//           transition: 'top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
//           willChange: 'top'
//         }}
//       >
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="flex items-center justify-between h-14 lg:h-16">
            
//             {/* Logo */}
//             <Link href="/" className="group flex items-center">
//               <div className="relative w-12 h-12 lg:w-28 lg:h-14 overflow-hidden transition-all duration-300 group-hover:scale-105">
//                 <img 
//                   src="https://i.ibb.co.com/DPz8BcQm/favicon-ico.png"
//                   alt="ToyMart Logo"
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center gap-1">
//               {/* Home */}
//               <Link
//                 href="/"
//                 className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${
//                   pathname === '/'
//                     ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
//                     : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
//                 }`}
//                 style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
//               >
//                 <div className="flex items-center gap-2 text-sm">
//                   <Home className="w-4 h-4" />
//                   <span>Home</span>
//                 </div>
//               </Link>

//               {/* Toys */}
//               <Link
//                 href="/products"
//                 className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${
//                   isActive('/products')
//                     ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
//                     : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
//                 }`}
//                 style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
//               >
//                 <div className="flex items-center gap-2 text-sm">
//                   <Gift className="w-4 h-4" />
//                   <span>Toys</span>
//                 </div>
//               </Link>

//               {/* Categories Dropdown */}
//               <div className="relative" ref={categoriesRef}>
//                 <button
//                   onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
//                   className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 flex items-center gap-2 ${
//                     categoriesDropdownOpen
//                       ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
//                       : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
//                   }`}
//                   style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
//                 >
//                   <Grid3x3 className="w-4 h-4" />
//                   <span>Categories</span>
//                   <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
//                 </button>

//                 {/* Categories Dropdown Menu - 2 Column Layout */}
//              {/* Categories Dropdown Menu - Single Column with Scroll */}
// {categoriesDropdownOpen && (
//   <>
//     <div 
//       className="fixed inset-0 z-40"
//       onClick={() => setCategoriesDropdownOpen(false)}
//     />
//     <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-[#D4EDEE] overflow-hidden z-50">
//       <div className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] px-5 py-3">
//         <p className="text-white font-bold text-sm font-comic flex items-center gap-2">
//           <Grid3x3 className="w-4 h-4" />
//           All Categories 🎈
//         </p>
//       </div>
      
//       {categoriesLoading ? (
//         <div className="px-5 py-8 text-center">
//           <div className="w-8 h-8 border-3 border-[#4A8A90] border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="text-xs text-gray-500 mt-3">Loading categories...</p>
//         </div>
//       ) : categories.length > 0 ? (
//         // Single column with max height and scroll if more than 8 items
//         <div className="max-h-80 overflow-y-auto py-2">
//           {categories.map((category) => (
//             <Link
//               key={category._id}
//               href={`/products?category=${category._id}`}
//               onClick={() => setCategoriesDropdownOpen(false)}
//               className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-[#D4EDEE] transition-all group"
//             >
//               <span className="font-medium truncate flex-1">
//                 {category.name}
//               </span>
//               <span className="text-[#FFB6C1] text-xs opacity-0 group-hover:opacity-100 transition-opacity ml-2">
//                 →
//               </span>
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <div className="px-5 py-8 text-center text-gray-500 text-sm">
//           No categories found
//         </div>
//       )}
      
//       <div className="border-t border-[#D4EDEE] p-3 bg-gray-50">
//         <Link
//           href="/products"
//           onClick={() => setCategoriesDropdownOpen(false)}
//           className="flex items-center justify-center gap-2 text-sm text-[#4A8A90] hover:text-[#FFB6C1] font-medium transition-colors"
//         >
//           <span>View All Products</span>
//           <span>→</span>
//         </Link>
//       </div>
//     </div>
//   </>
// )}
//               </div>

//               {/* Flash Sale */}
//               <Link
//                 href="/flash-sale"
//                 className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${
//                   isActive('/flash-sale')
//                     ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
//                     : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
//                 }`}
//                 style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
//               >
//                 <div className="flex items-center gap-2 text-sm">
//                   <Flame className="w-4 h-4" />
//                   <span>Flash Sale</span>
//                   <span className="absolute -top-2 -right-2 bg-[#FFB6C1] text-white text-xs font-black px-1.5 py-0.5 rounded-full animate-bounce">
//                     HOT
//                   </span>
//                 </div>
//               </Link>

//               {/* About */}
//               <Link
//                 href="/about"
//                 className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${
//                   isActive('/about')
//                     ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
//                     : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
//                 }`}
//                 style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
//               >
//                 <div className="flex items-center gap-2 text-sm">
//                   <Info className="w-4 h-4" />
//                   <span>About</span>
//                 </div>
//               </Link>

//               {/* Contact */}
//               <Link
//                 href="/contact"
//                 className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${
//                   isActive('/contact')
//                     ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
//                     : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
//                 }`}
//                 style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
//               >
//                 <div className="flex items-center gap-2 text-sm">
//                   <Phone className="w-4 h-4" />
//                   <span>Contact</span>
//                 </div>
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all"
//             >
//               <Menu className="w-5 h-5 text-[#4A8A90]" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Search Overlay (Mobile) */}
//       {searchOpen && (
//         <div className={`fixed left-0 right-0 z-50 bg-white shadow-xl p-3 animate-slideDown ${
//           hideTopNavbar ? 'top-0' : 'top-10 lg:top-12'
//         }`} ref={searchRef}>
//           <div className="container mx-auto px-4">
//             <form onSubmit={handleSearchSubmit} className="relative">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="🔍 Search for toys..."
//                 className="w-full px-4 py-2 pr-20 text-gray-700 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:border-[#4A8A90]"
//                 autoFocus
//               />
//               <button type="button" onClick={() => setSearchOpen(false)} className="absolute right-12 top-1/2 -translate-y-1/2 text-xs text-gray-500">
//                 Cancel
//               </button>
//               <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
//                 <Search className="w-4 h-4 text-gray-400" />
//               </button>
//             </form>

//             {/* Mobile Search Results */}
//        {/* Mobile Search Results */}
// {showResults && searchResults.length > 0 && (
//   <div className="mt-3 bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto">
//     {searchResults.slice(0, 5).map((product) => (
//       <button
//         key={product._id}
//         onClick={() => handleResultClick(product)}
//         className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
//       >
//         {product.images && product.images.length > 0 ? (
//           <img 
//             src={product.images[0]?.url || product.images[0]} 
//             alt={product.productName} 
//             className="w-10 h-10 rounded object-cover bg-gray-100"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = 'https://via.placeholder.com/40?text=No+Image';
//             }}
//           />
//         ) : (
//           <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
//             <Gift className="w-5 h-5 text-gray-400" />
//           </div>
//         )}
//         <div className="flex-1">
//           <p className="text-sm font-medium text-gray-800 line-clamp-1">
//             {product.productName || product.name}
//           </p>
//           <p className="text-xs font-semibold text-[#4A8A90]">
//             ৳{product.discountPrice || product.regularPrice || product.price}
//           </p>
//         </div>
//       </button>
//     ))}
//   </div>
// )}
//           </div>
//         </div>
//       )}

//       {/* Mobile Sidebar Menu */}
//       <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
//         <div className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />
        
//         <div className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//           <div className="p-5">
//             <div className="flex items-center justify-between mb-6">
//               <div className="w-14 h-14">
//                 <img src="https://i.ibb.co.com/DPz8BcQm/favicon-ico.png" alt="ToyMart Logo" className="w-full h-full object-contain" />
//               </div>
//               <button onClick={() => setIsMenuOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
//                 <X className="w-4 h-4" />
//               </button>
//             </div>

//             {user && (
//               <div className="mb-5 p-3 bg-gradient-to-r from-[#4A8A90]/10 to-[#FFB6C1]/10 rounded-xl">
//                 <div className="flex items-center gap-3">
//                   {getProfilePicture() && !profileImageError ? (
//                     <img src={getProfilePicture()} alt={getDisplayName()} className="w-12 h-12 rounded-full object-cover border-2 border-[#4A8A90]" />
//                   ) : (
//                     <div className="w-12 h-12 rounded-full bg-[#4A8A90] flex items-center justify-center text-white text-xl font-bold">
//                       {getInitials()}
//                     </div>
//                   )}
//                   <div>
//                     <p className="font-bold text-gray-800 text-sm">{getDisplayName()}</p>
//                     <p className="text-gray-500 text-xs">{user.email}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Mobile Categories Section */}
//          {/* Mobile Categories Section */}
// <div className="mb-4">
//   <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3 flex items-center gap-2">
//     <Grid3x3 className="w-3 h-3" /> CATEGORIES
//   </p>
//   {/* Single column with scroll for mobile */}
//   <div className="max-h-64 overflow-y-auto">
//     {categories.map((category) => (
//       <Link
//         key={category._id}
//         href={`/products?category=${category._id}`}
//         onClick={() => setIsMenuOpen(false)}
//         className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-[#D4EDEE] transition-all text-sm"
//       >
//         <span className="truncate">{category.name}</span>
//       </Link>
//     ))}
//   </div>
// </div>

//             <div className="my-3 h-px bg-gray-200"></div>

//             <div className="space-y-1">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   onClick={() => setIsMenuOpen(false)}
//                   className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-all ${
//                     isActive(item.href) ? 'bg-[#4A8A90] text-white' : 'text-gray-700 hover:bg-gray-100'
//                   }`}
//                 >
//                   <item.icon className="w-4 h-4" />
//                   <span className="text-sm">{item.name}</span>
//                   {item.badge && <span className="ml-auto bg-[#FFB6C1] text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</span>}
//                 </Link>
//               ))}
//             </div>

//             <div className="my-5 h-px bg-gray-200"></div>

//             {!user ? (
//               <div className="space-y-2">
//                 <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl font-bold border-2 border-[#4A8A90] text-[#4A8A90] hover:bg-[#4A8A90] hover:text-white transition-all">
//                   <User className="w-4 h-4" /> Sign In
//                 </Link>
//                 <Link href="/register" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl font-bold bg-[#4A8A90] text-white shadow-md">
//                   <UserCircle className="w-4 h-4" /> Register
//                 </Link>
//               </div>
//             ) : (
//               <button onClick={() => { setIsMenuOpen(false); logout(); }} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl font-bold bg-red-500 text-white">
//                 <LogOut className="w-4 h-4" /> Logout
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Dynamic Spacer - Prevents content from being hidden behind fixed navbar */}
//       <div className="h-24 lg:h-28"></div>

//       <style jsx>{`
//         @keyframes slideDown {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-slideDown { animation: slideDown 0.3s ease-out; }
//         @keyframes bounce {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-3px); }
//         }
//         .animate-bounce { animation: bounce 0.8s ease-in-out infinite; }
//       `}</style>
//     </>
//   );
// }



'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ChevronDown, 
  LogOut, 
  Settings, 
  User, 
  LayoutDashboard, 
  ShoppingCart,
  Search,
  X,
  Gift,
  Flame,
  Home,
  Info,
  Phone,
  Menu,
  UserCircle,
  Heart,
  Headphones,
  Grid3x3,
} from 'lucide-react';
import { toast } from 'sonner';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [authLoading, setAuthLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  const [hideTopNavbar, setHideTopNavbar] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const searchRef = useRef(null);
  const categoriesRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Fetch categories for dropdown
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([
        { _id: '1', name: 'Educational Toys', slug: 'educational-toys' },
        { _id: '2', name: 'Baby Toys', slug: 'baby-toys' },
        { _id: '3', name: 'RC Cars', slug: 'rc-cars' },
        { _id: '4', name: 'Soft Toys', slug: 'soft-toys' },
        { _id: '5', name: 'STEM Kits', slug: 'stem-kits' },
        { _id: '6', name: 'Puzzles', slug: 'puzzles' },
        { _id: '7', name: 'Art Supplies', slug: 'art-supplies' },
        { _id: '8', name: 'Outdoor Toys', slug: 'outdoor-toys' },
        { _id: '9', name: 'Board Games', slug: 'board-games' },
        { _id: '10', name: 'Action Figures', slug: 'action-figures' },
        { _id: '11', name: 'Dolls', slug: 'dolls' },
        { _id: '12', name: 'Musical Toys', slug: 'musical-toys' },
      ]);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // Close categories dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setCategoriesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Optimized scroll handler with requestAnimationFrame for smooth performance
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 20);
          
          const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
          
          if (scrollDifference > 3) {
            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
              setHideTopNavbar(true);
            } else if (currentScrollY < lastScrollY.current || currentScrollY <= 50) {
              setHideTopNavbar(false);
            }
          }
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setMobileCategoriesOpen(false); // Close categories submenu when main menu closes
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!authLoading) {
      fetchCartCount();
    }
  }, [user, authLoading]);
  
  // Check user state
  const checkUserState = () => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setProfileImageError(false);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    }
  };

  // Fetch cart count
  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else {
        const sessionId = localStorage.getItem('cartSessionId');
        if (sessionId) {
          headers['x-session-id'] = sessionId;
        }
      }
      
      const response = await fetch('http://localhost:5000/api/cart', { headers });
      
      if (response.ok) {
        const data = await response.json();
        setCartCount(data.data?.totalItems || 0);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error('Fetch cart count error:', error);
      setCartCount(0);
    }
  };

  // Fetch wishlist count
  const fetchWishlistCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const wishlistSessionId = localStorage.getItem('wishlistSessionId');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (wishlistSessionId) {
        headers['x-session-id'] = wishlistSessionId;
      } else {
        setWishlistCount(0);
        return;
      }
      
      const response = await fetch('http://localhost:5000/api/wishlist', { headers });
      
      if (response.ok) {
        const data = await response.json();
        setWishlistCount(data.data?.totalItems || 0);
      } else {
        setWishlistCount(0);
      }
    } catch (error) {
      console.error('Fetch wishlist count error:', error);
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    checkUserState();
    fetchCartCount();
    fetchWishlistCount();

    const handleAuthChange = () => {
      checkUserState();
      fetchCartCount();
      fetchWishlistCount();
    };

    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('focus', handleAuthChange);
    window.addEventListener('cart-update', fetchCartCount);
    window.addEventListener('wishlist-update', fetchWishlistCount);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('focus', handleAuthChange);
      window.removeEventListener('cart-update', fetchCartCount);
      window.removeEventListener('wishlist-update', fetchWishlistCount);
    };
  }, []);

  useEffect(() => {
    fetchCartCount();
    fetchWishlistCount();
  }, [pathname]);

  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCartCount();
      fetchWishlistCount();
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cart-update', handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    const handleWishlistUpdate = () => {
      fetchWishlistCount();
    };
    
    window.addEventListener('wishlist-update', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('wishlist-update', handleWishlistUpdate);
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Toys', href: '/products', icon: Gift, highlight: true },
    { name: 'Flash Sale', href: '/flash-sale', icon: Flame, badge: 'HOT' },
   { name: 'Blog', href: '/blog', icon: Info },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    setSearchLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products?search=${encodeURIComponent(query)}&limit=5`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        setSearchResults(data.data);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowResults(false);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
      setShowResults(false);
    }
  };

  const handleResultClick = (result) => {
    const productId = result._id;
    if (productId) {
      router.push(`/productDetails?id=${productId}`);
    } else {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
    setSearchOpen(false);
    setSearchQuery('');
    setShowResults(false);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCartCount(0);
    setWishlistCount(0);
    setUserMenuOpen(false);
    window.dispatchEvent(new Event('cart-update'));
    window.dispatchEvent(new Event('wishlist-update'));
    window.dispatchEvent(new Event('auth-change'));
    toast.success('🎉 Logged out successfully! See you soon!');
    router.push('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin': return '/admin/dashboard';
      case 'moderator': return '/moderator/dashboard';
      default: return '/customer/dashboard';
    }
  };

  const getDisplayName = () => {
    if (!user) return '';
    return user.companyName || user.contactPerson || user.email?.split('@')[0] || 'Toy Lover';
  };

  const getInitials = () => {
    if (!user) return '🎈';
    const name = getDisplayName();
    return name.charAt(0).toUpperCase();
  };

  const getProfilePicture = () => {
    return user?.profilePicture || user?.photoURL || null;
  };

  // Get bottom navbar top position based on screen size and state
  const getBottomNavbarTop = () => {
    if (hideTopNavbar) return '0px';
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024 ? '48px' : '40px';
    }
    return '40px';
  };

  if (authLoading) {
    return (
      <div className="fixed top-0 z-50 w-full">
        <div className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="w-32 h-6 bg-white/20 rounded animate-pulse"></div>
              <div className="flex gap-4">
                <div className="w-20 h-6 bg-white/20 rounded animate-pulse"></div>
                <div className="w-20 h-6 bg-white/20 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex gap-4">
                <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ========== TOP NAVBAR - SCROLLS AWAY ========== */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out ${
          hideTopNavbar ? '-translate-y-full' : 'translate-y-0'
        } ${scrolled ? 'bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] shadow-md' : 'bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1]'}`}
        style={{ 
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform'
        }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-10 lg:h-12">
            
            {/* Customer Support */}
            <div className="hidden md:flex items-center gap-2 text-white">
              <Headphones className="w-4 h-4" />
              <span className="text-xs font-medium">Support: +880 1234 567890</span>
            </div>

            {/* Search Bar - Desktop with Results */}
            <div className="hidden lg:block flex-1 max-w-md mx-4 relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 Search for toys..."
                  className="w-full px-4 py-1.5 pr-8 text-sm text-gray-700 bg-white/90 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFB6C1]"
                  style={{ fontFamily: "'Comic Neue', 'Poppins', sans-serif" }}
                />
                {searchLoading ? (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-3.5 h-3.5 border-2 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Search className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                )}
              </form>

              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-80 overflow-y-auto z-50">
                  {searchResults.map((product) => (
                    <button
                      key={product._id}
                      onClick={() => handleResultClick(product)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0"
                    >
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0]?.url || product.images[0]} 
                          alt={product.productName || product.name} 
                          className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/48?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Gift className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm line-clamp-1">
                          {product.productName || product.name || product.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {product.discountPrice && product.discountPrice < product.regularPrice ? (
                            <>
                              <span className="text-xs font-bold text-[#4A8A90]">
                                ৳{product.discountPrice}
                              </span>
                              <span className="text-[10px] text-gray-400 line-through">
                                ৳{product.regularPrice}
                              </span>
                              <span className="text-[9px] font-semibold text-red-500 bg-red-100 px-1 rounded">
                                {Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)}% OFF
                              </span>
                            </>
                          ) : (
                            <span className="text-xs font-bold text-[#4A8A90]">
                              ৳{product.regularPrice || product.price}
                            </span>
                          )}
                        </div>
                        {product.ageGroup && (
                          <p className="text-[9px] text-gray-400 mt-1">
                            Ages {product.ageGroup}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full px-4 py-2 text-center text-sm text-[#4A8A90] hover:bg-gray-50 font-medium border-t border-gray-100"
                  >
                    View all results for "{searchQuery}"
                  </button>
                </div>
              )}

              {showResults && searchResults.length === 0 && searchQuery && !searchLoading && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-4 text-center z-50">
                  <p className="text-gray-500 text-sm">No products found for "{searchQuery}"</p>
                </div>
              )}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3 lg:gap-4">
              {/* Mobile Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="lg:hidden p-1 rounded-full bg-white/20 hover:bg-white/30 transition-all"
              >
                <Search className="w-4 h-4 text-white" />
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className="relative p-1 rounded-full bg-white/20 hover:bg-white/30 transition-all group">
                <Heart className="w-4 h-4 text-[#4A8A90] group-hover:scale-110 transition-transform" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FFB6C1] text-[#4A8A90] text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative p-1 rounded-full bg-white/20 hover:bg-white/30 transition-all group">
                <ShoppingCart className="w-4 h-4 text-[#4A8A90] group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FFB6C1] text-[#4A8A90] text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu / Auth Buttons */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-all"
                  >
                    {getProfilePicture() && !profileImageError ? (
                      <img 
                        src={getProfilePicture()} 
                        alt={getDisplayName()}
                        className="w-6 h-6 rounded-full object-cover border border-[#FFB6C1]"
                        onError={() => setProfileImageError(true)}
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-[#FFB6C1] flex items-center justify-center text-[#4A8A90] font-black text-xs">
                        {getInitials()}
                      </div>
                    )}
                    <span className="hidden md:inline text-white font-bold text-xs max-w-[80px] truncate">
                      {getDisplayName()}
                    </span>
                    <ChevronDown className={`w-3 h-3 text-white transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl overflow-hidden z-50">
                        <div className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] px-3 py-2">
                          <div className="flex items-center gap-2">
                            {getProfilePicture() && !profileImageError ? (
                              <img src={getProfilePicture()} alt={getDisplayName()} className="w-8 h-8 rounded-full object-cover border border-white" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
                                {getInitials()}
                              </div>
                            )}
                            <div>
                              <p className="text-white font-bold text-xs truncate">{getDisplayName()}</p>
                              <p className="text-white/70 text-[10px] truncate">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-1">
                          <Link href={getDashboardLink()} className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 text-sm" onClick={() => setUserMenuOpen(false)}>
                            <LayoutDashboard className="w-3.5 h-3.5 text-[#4A8A90]" />
                            <span>Dashboard</span>
                          </Link>
                          <button onClick={() => { setUserMenuOpen(false); logout(); }} className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 w-full text-sm">
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="px-2 py-1 rounded-full font-bold text-[#4A8A90] hover:text-white transition-all text-xs">
                    Sign In
                  </Link>
                  <Link href="/register" className="px-3 py-1 rounded-full font-bold bg-white text-[#4A8A90] shadow-md hover:shadow-lg transition-all text-xs">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========== BOTTOM NAVBAR - STACKS BELOW TOP NAVBAR ========== */}
      <div 
        className={`fixed left-0 right-0 z-40 transition-all duration-400 ease-out bg-white shadow-md ${
          scrolled ? 'shadow-lg' : ''
        }`}
        style={{ 
          top: getBottomNavbarTop(),
          transition: 'top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'top'
        }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            
            {/* Logo */}
            <Link href="/" className="group flex items-center">
              <div className="relative w-24 h-10  lg:w-32 lg:h-14 overflow-hidden transition-all duration-300 group-hover:scale-105">
                <img 
                  src="https://i.ibb.co.com/DPz8BcQm/favicon-ico.png"
                  alt="ToyMart Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${
                  pathname === '/'
                    ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
                    : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
                }`}
                style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </div>
              </Link>

              <Link
                href="/products"
                className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${
                  isActive('/products')
                    ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
                    : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
                }`}
                style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <Gift className="w-4 h-4" />
                  <span>Toys</span>
                </div>
              </Link>

              {/* Categories Dropdown - Desktop */}
              <div className="relative" ref={categoriesRef}>
                <button
                  onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                  className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 flex items-center gap-2 ${
                    categoriesDropdownOpen
                      ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
                      : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
                  }`}
                  style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
                >
                  <Grid3x3 className="w-4 h-4" />
                  <span>Categories</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {categoriesDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setCategoriesDropdownOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-[#D4EDEE] overflow-hidden z-50">
                      <div className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] px-5 py-3">
                        <p className="text-white font-bold text-sm flex items-center gap-2">
                          <Grid3x3 className="w-4 h-4" />
                          All Categories
                        </p>
                      </div>
                      
                      {categoriesLoading ? (
                        <div className="px-5 py-8 text-center">
                          <div className="w-8 h-8 border-3 border-[#4A8A90] border-t-transparent rounded-full animate-spin mx-auto"></div>
                          <p className="text-xs text-gray-500 mt-3">Loading categories...</p>
                        </div>
                      ) : categories.length > 0 ? (
                        <div className="max-h-80 overflow-y-auto py-2">
                          {categories.map((category) => (
     <Link
  key={category._id}
  href="#"
  onClick={(e) => {
    e.preventDefault();
    setCategoriesDropdownOpen(false);
    
    // Always do a hard reload with the category parameter
    window.location.href = `/products?category=${category._id}`;
  }}
  className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-[#D4EDEE] transition-all group"
>
  <span className="font-medium truncate flex-1">
    {category.name}
  </span>
  <span className="text-[#FFB6C1] text-xs opacity-0 group-hover:opacity-100 transition-opacity ml-2">
    →
  </span>
</Link>
                          ))}
                        </div>
                      ) : (
                        <div className="px-5 py-8 text-center text-gray-500 text-sm">
                          No categories found
                        </div>
                      )}
                      
                      <div className="border-t border-[#D4EDEE] p-3 bg-gray-50">
                       <Link
  href="#"
  onClick={(e) => {
    e.preventDefault();
    setCategoriesDropdownOpen(false);
    window.location.href = '/products';
  }}
  className="flex items-center justify-center gap-2 text-sm text-[#4A8A90] hover:text-[#FFB6C1] font-medium transition-colors"
>
  <span>View All Products</span>
  <span>→</span>
</Link>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <Link
                href="/flash-sale"
                className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${
                  isActive('/flash-sale')
                    ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
                    : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
                }`}
                style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <Flame className="w-4 h-4" />
                  <span>Flash Sale</span>
                  <span className="absolute -top-2 -right-2 bg-[#FFB6C1] text-white text-xs font-black px-1.5 py-0.5 rounded-full animate-bounce">
                    HOT
                  </span>
                </div>
              </Link>
              <Link
                href="/blog"
                className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${
                  isActive('/blog')
                    ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
                    : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
                }`}
                style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <span>Blog</span>
                </div>
              </Link>


              <Link
                href="/about"
                className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${
                  isActive('/about')
                    ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
                    : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
                }`}
                style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <Info className="w-4 h-4" />
                  <span>About</span>
                </div>
              </Link>

              <Link
                href="/contact"
                className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${
                  isActive('/contact')
                    ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
                    : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
                }`}
                style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>Contact</span>
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all"
            >
              <Menu className="w-5 h-5 text-[#4A8A90]" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay (Mobile) */}
      {searchOpen && (
        <div className={`fixed left-0 right-0 z-50 bg-white shadow-xl p-3 animate-slideDown ${
          hideTopNavbar ? 'top-0' : 'top-10 lg:top-12'
        }`} ref={searchRef}>
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search for toys..."
                className="w-full px-4 py-2 pr-20 text-gray-700 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:border-[#4A8A90]"
                autoFocus
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="absolute right-12 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                Cancel
              </button>
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 text-gray-400" />
              </button>
            </form>

            {showResults && searchResults.length > 0 && (
              <div className="mt-3 bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto">
                {searchResults.slice(0, 5).map((product) => (
                  <button
                    key={product._id}
                    onClick={() => handleResultClick(product)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
                  >
                    {product.images && product.images.length > 0 ? (
                      <img 
                        src={product.images[0]?.url || product.images[0]} 
                        alt={product.productName} 
                        className="w-10 h-10 rounded object-cover bg-gray-100"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/40?text=No+Image';
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
                        <Gift className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">
                        {product.productName || product.name}
                      </p>
                      <p className="text-xs font-semibold text-[#4A8A90]">
                        ৳{product.discountPrice || product.regularPrice || product.price}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Sidebar Menu - Optimized for small devices */}
      <div className={`fixed inset-0 z-50 lg:hidden ${isMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />
        
        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="w-10 h-10">
                <img src="https://i.ibb.co.com/DPz8BcQm/favicon-ico.png" alt="ToyMart Logo" className="w-full h-full object-contain" />
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto py-4">
              {/* User Info - Only show if logged in */}
              {user && (
                <div className="mb-4 mx-4 p-3 bg-gradient-to-r from-[#4A8A90]/10 to-[#FFB6C1]/10 rounded-xl">
                  <div className="flex items-center gap-3">
                    {getProfilePicture() && !profileImageError ? (
                      <img src={getProfilePicture()} alt={getDisplayName()} className="w-10 h-10 rounded-full object-cover border-2 border-[#4A8A90]" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#4A8A90] flex items-center justify-center text-white font-bold">
                        {getInitials()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 text-sm truncate">{getDisplayName()}</p>
                      <p className="text-gray-500 text-xs truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Items with Expandable Categories */}
              <div className="space-y-1 px-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-3 rounded-xl font-medium transition-all ${
                      isActive(item.href) ? 'bg-[#4A8A90] text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${isActive(item.href) ? 'bg-white text-[#4A8A90]' : 'bg-[#FFB6C1] text-white'}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}

                {/* Categories - Expandable on Mobile */}
                <div>
                  <button
                    onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                    className={`flex items-center justify-between w-full px-3 py-3 rounded-xl font-medium transition-all ${
                      mobileCategoriesOpen ? 'bg-[#D4EDEE] text-[#4A8A90]' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Grid3x3 className="w-5 h-5" />
                      <span className="text-sm">Categories</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileCategoriesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Categories Submenu */}
                  {mobileCategoriesOpen && (
                    <div className="ml-8 mt-1 space-y-1 border-l-2 border-[#D4EDEE] pl-3">
                      {categoriesLoading ? (
                        <div className="px-3 py-4 text-center">
                          <div className="w-6 h-6 border-2 border-[#4A8A90] border-t-transparent rounded-full animate-spin mx-auto"></div>
                          <p className="text-xs text-gray-500 mt-2">Loading...</p>
                        </div>
                      ) : categories.length > 0 ? (
                        <div className="max-h-48 overflow-y-auto">
                          {categories.map((category) => (
                           <Link
  key={category._id}
  href="#"
  onClick={(e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setMobileCategoriesOpen(false);
    window.location.href = `/products?category=${category._id}`;
  }}
  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-[#D4EDEE] transition-all"
>
  <span className="truncate">{category.name}</span>
  <span className="text-[#FFB6C1] text-xs">→</span>
</Link>
                          ))}
                        </div>
                      ) : (
                        <div className="px-3 py-4 text-center text-xs text-gray-500">
                          No categories found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="my-4 mx-4 h-px bg-gray-200"></div>

              {/* Auth Buttons */}
              {!user ? (
                <div className="space-y-2 px-4">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-bold border-2 border-[#4A8A90] text-[#4A8A90] hover:bg-[#4A8A90] hover:text-white transition-all"
                  >
                    <User className="w-4 h-4" />
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-bold bg-[#4A8A90] text-white shadow-md hover:bg-[#3A7A80] transition-all"
                  >
                    <UserCircle className="w-4 h-4" />
                    Register
                  </Link>
                </div>
              ) : (
                <div className="px-4">
                  <button
                    onClick={() => { setIsMenuOpen(false); logout(); }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Spacer */}
      <div className="h-16 lg:h-28"></div>

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce { animation: bounce 0.8s ease-in-out infinite; }
      `}</style>
    </>
  );
}