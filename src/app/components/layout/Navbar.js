
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
//       // Fallback categories if API fails
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

//   // Handle scroll effect for navbars
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       setScrolled(currentScrollY > 20);
      
//       if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
//         setHideTopNavbar(true);
//       } else {
//         setHideTopNavbar(false);
//       }
//       lastScrollY.current = currentScrollY;
//     };
    
//     window.addEventListener('scroll', handleScroll);
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


// // Add this useEffect after your existing useEffects
// useEffect(() => {
//   // Refetch cart when user changes (login/logout)
//   if (!authLoading) {
//     fetchCartCount();
//   }
// }, [user, authLoading]);
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
// // ========== REPLACE YOUR EXISTING fetchCartCount WITH THIS ==========
// const fetchCartCount = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     const headers = {};
    
//     console.log('=== FETCH CART COUNT DEBUG ===');
//     console.log('Token exists:', !!token);
    
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//       console.log('Fetching cart for logged-in user');
//     } else {
//       const sessionId = localStorage.getItem('cartSessionId');
//       if (sessionId) {
//         headers['x-session-id'] = sessionId;
//         console.log('Fetching cart for guest with sessionId:', sessionId);
//       }
//     }
    
//     const response = await fetch('http://localhost:5000/api/cart', { headers });
    
//     if (response.ok) {
//       const data = await response.json();
//       console.log('Cart count response:', data.data?.totalItems);
//       setCartCount(data.data?.totalItems || 0);
//     } else {
//       setCartCount(0);
//     }
//   } catch (error) {
//     console.error('Fetch cart count error:', error);
//     setCartCount(0);
//   }
// };

//   // Fetch wishlist count
//   const fetchWishlistCount = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setWishlistCount(0);
//       return;
//     }
    
//     try {
//       const response = await fetch('http://localhost:5000/api/wishlist', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setWishlistCount(data.data?.items?.length || 0);
//       } else {
//         setWishlistCount(0);
//       }
//     } catch (error) {
//       setWishlistCount(0);
//     }
//   };

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
//   const handleCartUpdate = () => {
//     fetchCartCount();
//   };
  
//   // Extra listener for cart updates (redundant but safe)
//   window.addEventListener('cart-update', handleCartUpdate);
  
//   return () => {
//     window.removeEventListener('cart-update', handleCartUpdate);
//   };
// }, []);

//   // Navigation items for bottom navbar - Categories dropdown will be after Toys
// // Update navItems to include Categories
// const navItems = [
//   { name: 'Home', href: '/', icon: Home },
//   { name: 'Toys', href: '/products', icon: Gift, highlight: true },
//   { name: 'Categories', href: '#', icon: Grid3x3, hasDropdown: true }, // Add this
//   { name: 'Flash Sale', href: '/flash-sale', icon: Flame, badge: 'HOT' },
//   { name: 'About', href: '/about', icon: Info },
//   { name: 'Contact', href: '/contact', icon: Phone },
// ];

//   const isActive = (path) => {
//     if (path === '/') return pathname === '/';
//     return pathname.startsWith(path);
//   };

//   // Fixed Search functionality - Shows products when typing
//   const performSearch = async (query) => {
//     if (!query.trim()) {
//       setSearchResults([]);
//       setShowResults(false);
//       return;
//     }
    
//     setSearchLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
//       const data = await response.json();
      
//       if (data.success && data.data && data.data.length > 0) {
//         setSearchResults(data.data);
//         setShowResults(true);
//       } else {
//         setSearchResults([]);
//         setShowResults(false);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setSearchResults([]);
//       setShowResults(false);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   // Debounced search
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

//   const handleResultClick = (result) => {
//     const productId = result._id || result.id || result.productId;
//     if (productId) {
//       router.push(`/product/${productId}`);
//     } else {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//     }
//     setSearchOpen(false);
//     setSearchQuery('');
//     setShowResults(false);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     setCartCount(0);
//     setWishlistCount(0);
//     setUserMenuOpen(false);
//       window.dispatchEvent(new Event('cart-update'));
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

//   // Split categories into two columns
//   const midPoint = Math.ceil(categories.length / 2);
//   const firstColumnCategories = categories.slice(0, midPoint);
//   const secondColumnCategories = categories.slice(midPoint);

//   return (
//     <>
//       {/* ========== TOP NAVBAR - SCROLLS AWAY ========== */}
//       <div className={`fixed top-0 z-50 w-full transition-all duration-500 transform ${
//         hideTopNavbar ? '-translate-y-full' : 'translate-y-0'
//       } ${scrolled ? 'bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] shadow-md' : 'bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1]'}`}>
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

//               {/* Search Results Dropdown */}
//               {showResults && searchResults.length > 0 && (
//                 <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-80 overflow-y-auto z-50">
//                   {searchResults.map((result) => (
//                     <button
//                       key={result._id || result.id}
//                       onClick={() => handleResultClick(result)}
//                       className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0"
//                     >
//                       {(result.images || result.image) && (
//                         <img 
//                           src={result.images?.[0] || result.image} 
//                           alt={result.name || result.title} 
//                           className="w-10 h-10 rounded-lg object-cover"
//                         />
//                       )}
//                       <div className="flex-1">
//                         <p className="font-medium text-gray-800 text-sm">{result.name || result.title}</p>
//                         {result.price && (
//                           <p className="text-xs text-[#FFB6C1] font-semibold">BDT {result.price}</p>
//                         )}
//                       </div>
//                     </button>
//                   ))}
//                   <button
//                     onClick={handleSearchSubmit}
//                     className="w-full px-4 py-2 text-center text-sm text-[#4A8A90] hover:bg-gray-50 font-medium border-t border-gray-100"
//                   >
//                     View all results for "{searchQuery}"
//                   </button>
//                 </div>
//               )}

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
//               <Link href="/wishlist" className="relative p-1 rounded-full bg-white/20 hover:bg-white/30 transition-all group">
//                 <Heart className="w-4 h-4 text-[#4A8A90] group-hover:scale-110 transition-transform" />
//                 {wishlistCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-[#FFB6C1] text-[#4A8A90] text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
//                     {wishlistCount > 9 ? '9+' : wishlistCount}
//                   </span>
//                 )}
//               </Link>

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

//       {/* ========== BOTTOM NAVBAR - MOVES UP WHEN TOP NAVBAR HIDES ========== */}
//       <div className={`fixed z-40 w-full transition-all duration-500 bg-white shadow-md ${
//         hideTopNavbar ? 'top-0' : 'top-10 lg:top-12'
//       } ${scrolled ? 'shadow-lg' : ''}`}>
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
//           {/* Desktop Navigation */}
// <div className="hidden lg:flex items-center gap-1">
//   {/* Home */}
//   <Link
//     href="/"
//     className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${
//       pathname === '/'
//         ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
//         : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
//     }`}
//     style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
//   >
//     <div className="flex items-center gap-2 text-sm">
//       <Home className="w-4 h-4" />
//       <span>Home</span>
//     </div>
//   </Link>

//   {/* Toys */}
//   <Link
//     href="/products"
//     className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${
//       isActive('/products')
//         ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
//         : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
//     }`}
//     style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
//   >
//     <div className="flex items-center gap-2 text-sm">
//       <Gift className="w-4 h-4" />
//       <span>Toys</span>
//     </div>
//   </Link>

//   {/* Categories Dropdown */}
//   <div className="relative" ref={categoriesRef}>
//     <button
//       onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
//       className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 flex items-center gap-2 ${
//         categoriesDropdownOpen
//           ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
//           : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
//       }`}
//       style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
//     >
//       <Grid3x3 className="w-4 h-4" />
//       <span>Categories</span>
//       <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
//     </button>

//     {/* Categories Dropdown Menu - 2 Column Layout */}
//     {categoriesDropdownOpen && (
//       <>
//         <div 
//           className="fixed inset-0 z-40"
//           onClick={() => setCategoriesDropdownOpen(false)}
//         />
//         <div className="absolute top-full left-0 mt-2 w-[500px] bg-white rounded-xl shadow-2xl border border-[#D4EDEE] overflow-hidden z-50">
//           <div className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] px-5 py-3">
//             <p className="text-white font-bold text-sm font-comic flex items-center gap-2">
//               <Grid3x3 className="w-4 h-4" />
//               All Categories 🎈
//             </p>
//           </div>
          
//           {categoriesLoading ? (
//             <div className="px-5 py-8 text-center">
//               <div className="w-8 h-8 border-3 border-[#4A8A90] border-t-transparent rounded-full animate-spin mx-auto"></div>
//               <p className="text-xs text-gray-500 mt-3">Loading categories...</p>
//             </div>
//           ) : categories.length > 0 ? (
//             <div className="grid grid-cols-2 gap-1 p-4 max-h-[400px] overflow-y-auto">
//               {categories.map((category) => (
//                 <Link
//                   key={category._id}
//                   href={`/products?category=${category._id}`}
//                   onClick={() => setCategoriesDropdownOpen(false)}
//                   className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-[#D4EDEE] transition-all group mx-1"
//                 >
//                   <span className="font-medium flex items-center gap-2">
//                     <span className="text-base">🎁</span>
//                     {category.name}
//                   </span>
//                   <span className="text-[#FFB6C1] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
//                     →
//                   </span>
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <div className="px-5 py-8 text-center text-gray-500 text-sm">
//               No categories found
//             </div>
//           )}
          
//           <div className="border-t border-[#D4EDEE] p-3 bg-gray-50">
//             <Link
//               href="/products"
//               onClick={() => setCategoriesDropdownOpen(false)}
//               className="flex items-center justify-center gap-2 text-sm text-[#4A8A90] hover:text-[#FFB6C1] font-medium transition-colors"
//             >
//               <span>View All Products</span>
//               <span>→</span>
//             </Link>
//           </div>
//         </div>
//       </>
//     )}
//   </div>

//   {/* Flash Sale */}
//   <Link
//     href="/flash-sale"
//     className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${
//       isActive('/flash-sale')
//         ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
//         : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
//     }`}
//     style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
//   >
//     <div className="flex items-center gap-2 text-sm">
//       <Flame className="w-4 h-4" />
//       <span>Flash Sale</span>
//       <span className="absolute -top-2 -right-2 bg-[#FFB6C1] text-white text-xs font-black px-1.5 py-0.5 rounded-full animate-bounce">
//         HOT
//       </span>
//     </div>
//   </Link>

//   {/* About */}
//   <Link
//     href="/about"
//     className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${
//       isActive('/about')
//         ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
//         : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
//     }`}
//     style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
//   >
//     <div className="flex items-center gap-2 text-sm">
//       <Info className="w-4 h-4" />
//       <span>About</span>
//     </div>
//   </Link>

//   {/* Contact */}
//   <Link
//     href="/contact"
//     className={`relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${
//       isActive('/contact')
//         ? 'text-[#4A8A90] bg-[#D4EDEE] shadow-sm'
//         : 'text-[#4A8A90] hover:text-[#FFB6C1] hover:bg-[#D4EDEE]/50'
//     }`}
//     style={{ fontFamily: "'Comic Neue', 'Fredoka One', 'Poppins', cursive" }}
//   >
//     <div className="flex items-center gap-2 text-sm">
//       <Phone className="w-4 h-4" />
//       <span>Contact</span>
//     </div>
//   </Link>
// </div>

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
//             {showResults && searchResults.length > 0 && (
//               <div className="mt-3 bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto">
//                 {searchResults.slice(0, 5).map((result) => (
//                   <button
//                     key={result._id || result.id}
//                     onClick={() => handleResultClick(result)}
//                     className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
//                   >
//                     {(result.images || result.image) && (
//                       <img src={result.images?.[0] || result.image} alt={result.name} className="w-8 h-8 rounded object-cover" />
//                     )}
//                     <div>
//                       <p className="text-sm font-medium text-gray-800">{result.name || result.title}</p>
//                       {result.price && <p className="text-xs text-[#FFB6C1]">BDT {result.price}</p>}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             )}
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
//             <div className="mb-4">
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3 flex items-center gap-2">
//                 <Grid3x3 className="w-3 h-3" /> CATEGORIES
//               </p>
//               <div className="grid grid-cols-2 gap-1">
//                 {categories.slice(0, 8).map((category) => (
//                   <Link
//                     key={category._id}
//                     href={`/products?category=${category._id}`}
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-[#D4EDEE] transition-all text-sm"
//                   >
//                     <span className="text-base">🎁</span>
//                     <span className="truncate">{category.name}</span>
//                   </Link>
//                 ))}
//               </div>
//             </div>

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

//       {/* Dynamic Spacer */}
//       <div className={`transition-all duration-500 ${hideTopNavbar ? 'h-14 lg:h-16' : 'h-24 lg:h-28'}`}></div>

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
          
//           // Add a small threshold to prevent micro-jittering
//           const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
          
//           if (scrollDifference > 5) { // Only update if scrolled more than 5px
//             if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
//               setHideTopNavbar(true);
//             } else if (currentScrollY < lastScrollY.current || currentScrollY <= 80) {
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
//   const fetchWishlistCount = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setWishlistCount(0);
//       return;
//     }
    
//     try {
//       const response = await fetch('http://localhost:5000/api/wishlist', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setWishlistCount(data.data?.items?.length || 0);
//       } else {
//         setWishlistCount(0);
//       }
//     } catch (error) {
//       setWishlistCount(0);
//     }
//   };

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
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
    
//     return () => {
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, []);

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

//   // Fixed Search functionality - Shows products when typing
//   const performSearch = async (query) => {
//     if (!query.trim()) {
//       setSearchResults([]);
//       setShowResults(false);
//       return;
//     }
    
//     setSearchLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
//       const data = await response.json();
      
//       if (data.success && data.data && data.data.length > 0) {
//         setSearchResults(data.data);
//         setShowResults(true);
//       } else {
//         setSearchResults([]);
//         setShowResults(false);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setSearchResults([]);
//       setShowResults(false);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   // Debounced search
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

//   const handleResultClick = (result) => {
//     const productId = result._id || result.id || result.productId;
//     if (productId) {
//       router.push(`/product/${productId}`);
//     } else {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//     }
//     setSearchOpen(false);
//     setSearchQuery('');
//     setShowResults(false);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     setCartCount(0);
//     setWishlistCount(0);
//     setUserMenuOpen(false);
//     window.dispatchEvent(new Event('cart-update'));
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

//   // Add CSS transition smoothness
//   useEffect(() => {
//     const style = document.createElement('style');
//     style.textContent = `
//       .navbar-top, .navbar-bottom {
//         will-change: transform;
//         transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
//       }
//       .navbar-bottom {
//         transition: top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
//       }
//     `;
//     document.head.appendChild(style);
//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

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
//         className={`navbar-top fixed top-0 z-50 w-full transition-all duration-500 transform ${
//           hideTopNavbar ? '-translate-y-full' : 'translate-y-0'
//         } ${scrolled ? 'bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] shadow-md' : 'bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1]'}`}
//         style={{ transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
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

//               {/* Search Results Dropdown */}
//               {showResults && searchResults.length > 0 && (
//                 <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-80 overflow-y-auto z-50">
//                   {searchResults.map((result) => (
//                     <button
//                       key={result._id || result.id}
//                       onClick={() => handleResultClick(result)}
//                       className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0"
//                     >
//                       {(result.images || result.image) && (
//                         <img 
//                           src={result.images?.[0] || result.image} 
//                           alt={result.name || result.title} 
//                           className="w-10 h-10 rounded-lg object-cover"
//                         />
//                       )}
//                       <div className="flex-1">
//                         <p className="font-medium text-gray-800 text-sm">{result.name || result.title}</p>
//                         {result.price && (
//                           <p className="text-xs text-[#FFB6C1] font-semibold">BDT {result.price}</p>
//                         )}
//                       </div>
//                     </button>
//                   ))}
//                   <button
//                     onClick={handleSearchSubmit}
//                     className="w-full px-4 py-2 text-center text-sm text-[#4A8A90] hover:bg-gray-50 font-medium border-t border-gray-100"
//                   >
//                     View all results for "{searchQuery}"
//                   </button>
//                 </div>
//               )}

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
//               <Link href="/wishlist" className="relative p-1 rounded-full bg-white/20 hover:bg-white/30 transition-all group">
//                 <Heart className="w-4 h-4 text-[#4A8A90] group-hover:scale-110 transition-transform" />
//                 {wishlistCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-[#FFB6C1] text-[#4A8A90] text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
//                     {wishlistCount > 9 ? '9+' : wishlistCount}
//                   </span>
//                 )}
//               </Link>

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

//       {/* ========== BOTTOM NAVBAR - MOVES UP WHEN TOP NAVBAR HIDES ========== */}
//       <div 
//         className={`navbar-bottom fixed z-40 w-full transition-all duration-500 bg-white shadow-md ${
//           hideTopNavbar ? 'top-0' : 'top-10 lg:top-12'
//         } ${scrolled ? 'shadow-lg' : ''}`}
//         style={{ transition: 'top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
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
//                 {categoriesDropdownOpen && (
//                   <>
//                     <div 
//                       className="fixed inset-0 z-40"
//                       onClick={() => setCategoriesDropdownOpen(false)}
//                     />
//                     <div className="absolute top-full left-0 mt-2 w-[500px] bg-white rounded-xl shadow-2xl border border-[#D4EDEE] overflow-hidden z-50">
//                       <div className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] px-5 py-3">
//                         <p className="text-white font-bold text-sm font-comic flex items-center gap-2">
//                           <Grid3x3 className="w-4 h-4" />
//                           All Categories 🎈
//                         </p>
//                       </div>
                      
//                       {categoriesLoading ? (
//                         <div className="px-5 py-8 text-center">
//                           <div className="w-8 h-8 border-3 border-[#4A8A90] border-t-transparent rounded-full animate-spin mx-auto"></div>
//                           <p className="text-xs text-gray-500 mt-3">Loading categories...</p>
//                         </div>
//                       ) : categories.length > 0 ? (
//                         <div className="grid grid-cols-2 gap-1 p-4 max-h-[400px] overflow-y-auto">
//                           {categories.map((category) => (
//                             <Link
//                               key={category._id}
//                               href={`/products?category=${category._id}`}
//                               onClick={() => setCategoriesDropdownOpen(false)}
//                               className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-[#D4EDEE] transition-all group mx-1"
//                             >
//                               <span className="font-medium flex items-center gap-2">
//                                 <span className="text-base">🎁</span>
//                                 {category.name}
//                               </span>
//                               <span className="text-[#FFB6C1] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
//                                 →
//                               </span>
//                             </Link>
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="px-5 py-8 text-center text-gray-500 text-sm">
//                           No categories found
//                         </div>
//                       )}
                      
//                       <div className="border-t border-[#D4EDEE] p-3 bg-gray-50">
//                         <Link
//                           href="/products"
//                           onClick={() => setCategoriesDropdownOpen(false)}
//                           className="flex items-center justify-center gap-2 text-sm text-[#4A8A90] hover:text-[#FFB6C1] font-medium transition-colors"
//                         >
//                           <span>View All Products</span>
//                           <span>→</span>
//                         </Link>
//                       </div>
//                     </div>
//                   </>
//                 )}
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
//             {showResults && searchResults.length > 0 && (
//               <div className="mt-3 bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto">
//                 {searchResults.slice(0, 5).map((result) => (
//                   <button
//                     key={result._id || result.id}
//                     onClick={() => handleResultClick(result)}
//                     className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
//                   >
//                     {(result.images || result.image) && (
//                       <img src={result.images?.[0] || result.image} alt={result.name} className="w-8 h-8 rounded object-cover" />
//                     )}
//                     <div>
//                       <p className="text-sm font-medium text-gray-800">{result.name || result.title}</p>
//                       {result.price && <p className="text-xs text-[#FFB6C1]">BDT {result.price}</p>}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             )}
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
//             <div className="mb-4">
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3 flex items-center gap-2">
//                 <Grid3x3 className="w-3 h-3" /> CATEGORIES
//               </p>
//               <div className="grid grid-cols-2 gap-1">
//                 {categories.slice(0, 8).map((category) => (
//                   <Link
//                     key={category._id}
//                     href={`/products?category=${category._id}`}
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-[#D4EDEE] transition-all text-sm"
//                   >
//                     <span className="text-base">🎁</span>
//                     <span className="truncate">{category.name}</span>
//                   </Link>
//                 ))}
//               </div>
//             </div>

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

//       {/* Dynamic Spacer */}
//       <div className={`transition-all duration-500 ${hideTopNavbar ? 'h-14 lg:h-16' : 'h-24 lg:h-28'}`}></div>

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



// smooth


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
 // Fetch wishlist count - Updated to support guests
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
      // No token and no sessionId, set count to 0
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

  // Add this useEffect after your cart update useEffect
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
    { name: 'Categories', href: '#', icon: Grid3x3, hasDropdown: true },
    { name: 'Flash Sale', href: '/flash-sale', icon: Flame, badge: 'HOT' },
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
      const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
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
    const productId = result._id || result.id || result.productId;
    if (productId) {
      router.push(`/product/${productId}`);
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
    // Check screen width
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

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-80 overflow-y-auto z-50">
                  {searchResults.map((result) => (
                    <button
                      key={result._id || result.id}
                      onClick={() => handleResultClick(result)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0"
                    >
                      {(result.images || result.image) && (
                        <img 
                          src={result.images?.[0] || result.image} 
                          alt={result.name || result.title} 
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{result.name || result.title}</p>
                        {result.price && (
                          <p className="text-xs text-[#FFB6C1] font-semibold">BDT {result.price}</p>
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

              {/* No Results Message */}
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
              {/* <Link href="/wishlist" className="relative p-1 rounded-full bg-white/20 hover:bg-white/30 transition-all group">
                <Heart className="w-4 h-4 text-[#4A8A90] group-hover:scale-110 transition-transform" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FFB6C1] text-[#4A8A90] text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link> */}

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

                  {/* User Dropdown */}
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
              <div className="relative w-12 h-12 lg:w-28 lg:h-14 overflow-hidden transition-all duration-300 group-hover:scale-105">
                <img 
                  src="https://i.ibb.co.com/DPz8BcQm/favicon-ico.png"
                  alt="ToyMart Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Home */}
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

              {/* Toys */}
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

              {/* Categories Dropdown */}
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

                {/* Categories Dropdown Menu - 2 Column Layout */}
                {categoriesDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setCategoriesDropdownOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-2 w-[500px] bg-white rounded-xl shadow-2xl border border-[#D4EDEE] overflow-hidden z-50">
                      <div className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] px-5 py-3">
                        <p className="text-white font-bold text-sm font-comic flex items-center gap-2">
                          <Grid3x3 className="w-4 h-4" />
                          All Categories 🎈
                        </p>
                      </div>
                      
                      {categoriesLoading ? (
                        <div className="px-5 py-8 text-center">
                          <div className="w-8 h-8 border-3 border-[#4A8A90] border-t-transparent rounded-full animate-spin mx-auto"></div>
                          <p className="text-xs text-gray-500 mt-3">Loading categories...</p>
                        </div>
                      ) : categories.length > 0 ? (
                        <div className="grid grid-cols-2 gap-1 p-4 max-h-[400px] overflow-y-auto">
                          {categories.map((category) => (
                            <Link
                              key={category._id}
                              href={`/products?category=${category._id}`}
                              onClick={() => setCategoriesDropdownOpen(false)}
                              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-[#D4EDEE] transition-all group mx-1"
                            >
                              <span className="font-medium flex items-center gap-2">
                                <span className="text-base">🎁</span>
                                {category.name}
                              </span>
                              <span className="text-[#FFB6C1] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
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
                          href="/products"
                          onClick={() => setCategoriesDropdownOpen(false)}
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

              {/* Flash Sale */}
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

              {/* About */}
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

              {/* Contact */}
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

            {/* Mobile Search Results */}
            {showResults && searchResults.length > 0 && (
              <div className="mt-3 bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto">
                {searchResults.slice(0, 5).map((result) => (
                  <button
                    key={result._id || result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
                  >
                    {(result.images || result.image) && (
                      <img src={result.images?.[0] || result.image} alt={result.name} className="w-8 h-8 rounded object-cover" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-800">{result.name || result.title}</p>
                      {result.price && <p className="text-xs text-[#FFB6C1]">BDT {result.price}</p>}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Sidebar Menu */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />
        
        <div className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-5">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14">
                <img src="https://i.ibb.co.com/DPz8BcQm/favicon-ico.png" alt="ToyMart Logo" className="w-full h-full object-contain" />
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            {user && (
              <div className="mb-5 p-3 bg-gradient-to-r from-[#4A8A90]/10 to-[#FFB6C1]/10 rounded-xl">
                <div className="flex items-center gap-3">
                  {getProfilePicture() && !profileImageError ? (
                    <img src={getProfilePicture()} alt={getDisplayName()} className="w-12 h-12 rounded-full object-cover border-2 border-[#4A8A90]" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#4A8A90] flex items-center justify-center text-white text-xl font-bold">
                      {getInitials()}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{getDisplayName()}</p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Categories Section */}
            <div className="mb-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3 flex items-center gap-2">
                <Grid3x3 className="w-3 h-3" /> CATEGORIES
              </p>
              <div className="grid grid-cols-2 gap-1">
                {categories.slice(0, 8).map((category) => (
                  <Link
                    key={category._id}
                    href={`/products?category=${category._id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-[#D4EDEE] transition-all text-sm"
                  >
                    <span className="text-base">🎁</span>
                    <span className="truncate">{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="my-3 h-px bg-gray-200"></div>

            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-all ${
                    isActive(item.href) ? 'bg-[#4A8A90] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.name}</span>
                  {item.badge && <span className="ml-auto bg-[#FFB6C1] text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</span>}
                </Link>
              ))}
            </div>

            <div className="my-5 h-px bg-gray-200"></div>

            {!user ? (
              <div className="space-y-2">
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl font-bold border-2 border-[#4A8A90] text-[#4A8A90] hover:bg-[#4A8A90] hover:text-white transition-all">
                  <User className="w-4 h-4" /> Sign In
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl font-bold bg-[#4A8A90] text-white shadow-md">
                  <UserCircle className="w-4 h-4" /> Register
                </Link>
              </div>
            ) : (
              <button onClick={() => { setIsMenuOpen(false); logout(); }} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl font-bold bg-red-500 text-white">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Spacer - Prevents content from being hidden behind fixed navbar */}
      <div className="h-24 lg:h-28"></div>

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