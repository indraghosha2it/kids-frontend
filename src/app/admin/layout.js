


// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { 
//   LayoutDashboard, 
//   FileText, 
//   Users, 
//   UserPlus,
//   Settings, 
//   LogOut,
//   Menu,
//   ChevronDown,
//   Package,
//   MessageSquare,
//   Home,
//   ChevronRight,
//   UserCog,
//   FolderPlus,
//   Newspaper,
//   Star,
//   Heart,
//   Sparkles,
//   Gift,
//   ShoppingBag,
//   Rocket,
//   Award,
//   Bell,
//   Ticket
// } from 'lucide-react';

// export default function AdminLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Helper function to normalize pathname (remove trailing slash)
//   const normalizePath = (path) => {
//     if (path && path !== '/' && path.endsWith('/')) {
//       return path.slice(0, -1);
//     }
//     return path;
//   };

//   // Helper function to check if a route is active
//   const isActive = (href) => {
//     const currentPath = normalizePath(pathname);
    
//     if (href === '/admin/dashboard') {
//       if (currentPath === '/admin/dashboard') return true;
//       return false;
//     }
    
//     if (href === '/admin/all-products') {
//       const matches = [
//         '/admin/all-products',
//         '/admin/editProduct',
//         '/admin/viewProduct',
//         '/admin/product'
//       ].some(route => currentPath === route);
//       const startsWith = currentPath.startsWith('/admin/products/');
//       if (matches || startsWith) return true;
//       return false;
//     }
    
//     if (href === '/admin/create-products') {
//       const matches = ['/admin/create-products', '/admin/createProduct'].some(route => currentPath === route);
//       if (matches) return true;
//       return false;
//     }
    
//     if (href === '/admin/create-categories') {
//       const matches = ['/admin/create-categories', '/admin/createCategory'].some(route => currentPath === route);
//       if (matches) return true;
//       return false;
//     }

//       if (href === '/admin/coupon') {
//       const matches = ['/admin/coupon', '/admin/coupon'].some(route => currentPath === route);
//       if (matches) return true;
//       return false;
//     }
    
//     if (href === '/admin/create-users') {
//       const matches = ['/admin/create-users', '/admin/createUser'].some(route => currentPath === route);
//       if (matches) return true;
//       return false;
//     }
    
//     if (href === '/admin/manage-users') {
//       if (currentPath === '/admin/manage-users' || 
//           currentPath === '/admin/editUser' ||
//           currentPath.startsWith('/admin/manage-users/')) return true;
//       return false;
//     }
    
//     if (href === '/admin/all-customers') {
//       if (currentPath === '/admin/all-customers' || 
//           currentPath === '/admin/customer' ||
//           currentPath.startsWith('/admin/all-customers/')) return true;
//       return false;
//     }
    
//     if (href === '/admin/create-blog') {
//       if (currentPath === '/admin/create-blog') return true;
//       return false;
//     }
    
//     if (href === '/admin/all-blogs') {
//       if (currentPath === '/admin/all-blogs' || 
//           currentPath === '/admin/editBlog' ||
//           currentPath.startsWith('/admin/all-blogs/')) return true;
//       return false;
//     }
    
//     if (href === '/admin/manage-reviews') {
//       if (currentPath === '/admin/manage-reviews' || 
//           currentPath.startsWith('/admin/manage-reviews/')) return true;
//       return false;
//     }
    
//     if (href === '/admin/orders') {
//       if (currentPath === '/admin/orders' || 
//           currentPath.startsWith('/admin/orders/')) return true;
//       return false;
//     }
    
//     if (href === '/admin/settings') {
//       if (currentPath === '/admin/settings' || 
//           currentPath.startsWith('/admin/settings/')) return true;
//       return false;
//     }
    
//     return false;
//   };

//   useEffect(() => {
//     document.body.style.margin = '0';
//     document.body.style.padding = '0';
    
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (!token || !userData) {
//       logout();
//       return;
//     }

//     try {
//       const parsedUser = JSON.parse(userData);
      
//       if (parsedUser.role !== 'admin') {
//         logout();
//         return;
//       }

//       setUser(parsedUser);
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       logout();
//     } finally {
//       setIsLoading(false);
//     }
//   }, [router]);

//   const navigation = [
//     { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, color: '#4A8A90' },
//     { name: 'All Orders', href: '/admin/orders', icon: MessageSquare, color: '#4A8A90' },
//     { name: 'Create Products', href: '/admin/create-products', icon: Gift, color: '#4A8A90' },
//     { name: 'All Products', href: '/admin/all-products', icon: ShoppingBag, color: '#4A8A90' },
//     { name: 'Create Category', href: '/admin/create-categories', icon: FolderPlus, color: '#4A8A90' },
//     { name: 'Create Coupon', href: '/admin/coupon', icon: Ticket, color: '#4A8A90' },

//     { name: 'Manage Certifications', href: '/admin/certifications', icon: Award, color: '#4A8A90' },
//     { name: 'Create Users', href: '/admin/create-users', icon: UserPlus, color: '#4A8A90' },
//     { name: 'Manage Users', href: '/admin/manage-users', icon: UserCog, color: '#4A8A90' },
//     { name: 'Create & Manage Customers', href: '/admin/all-customers', icon: Users, color: '#4A8A90' },
//     { name: 'Create Blog', href: '/admin/create-blog', icon: Newspaper, color: '#4A8A90' },
//     { name: 'Manage Blogs', href: '/admin/all-blogs', icon: Newspaper, color: '#4A8A90' },
//     { name: 'Manage Reviews', href: '/admin/manage-reviews', icon: Star, color: '#4A8A90' },
//     { name: 'Settings', href: '/admin/settings', icon: Settings, color: '#4A8A90' }
//   ];

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     router.push('/login');
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A8A90]/10 via-[#FFB6C1]/10 to-[#D4EDEE]/20">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-20 h-20 border-4 border-[#FFB6C1] border-t-[#4A8A90] border-r-[#D4EDEE] rounded-full animate-spin mx-auto mb-4"></div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <span className="text-3xl">🧸</span>
//             </div>
//           </div>
//           <p className="text-[#4A8A90] font-comic mt-3">Loading Toy Store Dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Fredoka+One&family=Poppins:wght@300;400;500;600;700&display=swap');
        
//         html, body {
//           margin: 0 !important;
//           padding: 0 !important;
//           overflow: hidden !important;
//           height: 100%;
//         }
        
//         * {
//           box-sizing: border-box;
//         }
        
//         h1, h2, h3, h4, h5, h6, .heading-font {
//           font-family: 'Fredoka One', 'Comic Neue', cursive;
//         }
        
//         .font-comic {
//           font-family: 'Comic Neue', cursive;
//         }
        
//         .gradient-bg {
//           background: linear-gradient(135deg, #4A8A90 0%, #FFB6C1 50%, #D4EDEE 100%);
//         }
//       `}</style>
      
//       <div className="min-h-screen bg-gradient-to-br from-[#4A8A90]/5 via-[#FFB6C1]/5 to-[#D4EDEE]/10" style={{ margin: 0, padding: 0, height: '100vh', overflow: 'hidden' }}>
//         {/* Mobile sidebar backdrop */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Sidebar - Matching Hero Banner Colors */}
//         <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-out lg:translate-x-0 overflow-y-auto ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         }`} style={{ 
//           background: 'linear-gradient(180deg, #FFFFFF 0%, #FEF9F9 100%)',
//           borderRight: '3px solid #FFB6C1'
//         }}>
          
//           {/* Sidebar header with matching gradient */}
//           <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #4A8A90 0%, #FFB6C1 100%)' }}>
//             <div className="absolute inset-0 opacity-20">
//               <div className="absolute top-2 left-2 text-2xl">🧸</div>
//               <div className="absolute bottom-2 right-2 text-3xl">🎈</div>
//               <div className="absolute top-10 right-10 text-xl">🎪</div>
//               <div className="absolute bottom-10 left-10 text-2xl">🎨</div>
//             </div>
//             <div className="h-20 flex items-center justify-center px-6 relative">
//               <Link href="/" className="group">
//                 <div className="rounded-2xl p-2 transition-all duration-300">
//                   <img 
//                     src="https://i.ibb.co.com/DPz8BcQm/favicon-ico.png"
//                     alt="ToyMart Logo"
//                     className="w-36 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
//                   />
//                 </div>
//               </Link>
//             </div>
//           </div>

//           {/* User info - Colorful card */}
//           {user && (
//             <div className="mx-4 mt-4 mb-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-[#D4EDEE] shadow-sm">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center text-white font-bold text-base shadow-md">
//                   {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-gray-800 font-semibold text-sm truncate font-comic">
//                     {user.contactPerson || 'Admin User'}
//                   </p>
//                   <p className="text-gray-500 text-xs truncate mt-0.5">
//                     {user.email}
//                   </p>
//                   <div className="flex items-center gap-1.5 mt-1">
//                     <span className="w-1.5 h-1.5 rounded-full bg-[#4A8A90]"></span>
//                     <span className="text-xs font-medium text-gray-500 font-comic">
//                       Admin
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation - With new colors */}
//           <nav className="px-3 py-3 h-[calc(100vh-13rem)] overflow-y-auto pb-24 custom-scroll">
//             <div className="flex items-center gap-2 mb-4 px-3">
//               <Sparkles className="w-4 h-4 text-[#FFB6C1]" />
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider font-comic">TOY STATION MENU</p>
//               <Sparkles className="w-4 h-4 text-[#4A8A90]" />
//             </div>
//             <div className="space-y-1">
//               {navigation.map((item) => {
//                 const active = isActive(item.href);
//                 const Icon = item.icon;
//                 return (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
//                       active
//                         ? 'text-white shadow-lg'
//                         : 'text-gray-700 hover:bg-[#D4EDEE] hover:translate-x-1'
//                     }`}
//                     style={active ? { background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}CC 100%)` } : {}}
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
//                         active ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-[#D4EDEE]'
//                       }`}>
//                         <Icon className={`w-4 h-4 ${active ? 'text-white' : ''}`} style={!active ? { color: item.color } : {}} />
//                       </div>
//                       <span className="font-comic font-semibold">{item.name}</span>
//                     </div>
//                     {active && (
//                       <div className="flex items-center gap-1">
//                         <span className="text-white text-xs">⭐</span>
//                         <ChevronRight className="w-4 h-4 text-white" />
//                       </div>
//                     )}
//                   </Link>
//                 );
//               })}
//             </div>
//           </nav>

//           {/* Logout button */}
//           <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-[#D4EDEE] bg-white/95 backdrop-blur-sm">
//             <button
//               onClick={logout}
//               className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-600 w-full transition-all group"
//             >
//               <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-all">
//                 <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
//               </div>
//               <span className="font-comic">Logout</span>
//               <span className="ml-auto text-lg group-hover:animate-bounce">👋</span>
//             </button>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="lg:ml-72 h-screen flex flex-col">
//           {/* Top header - Matching hero banner colors */}
//           <header className="flex-shrink-0 sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-[#FFB6C1]" style={{ margin: 0 }}>
//             <div className="px-4 sm:px-6 lg:px-8" style={{ margin: 0 }}>
//               <div className="flex items-center justify-between h-20" style={{ margin: 0 }}>
                
//                 {/* Left section */}
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setSidebarOpen(true)}
//                     className="lg:hidden w-10 h-10 rounded-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all"
//                   >
//                     <Menu className="w-5 h-5" />
//                   </button>
                  
//                   {/* Welcome Message */}
//                   {user && (
//                     <div className="hidden sm:block">
//                       <div className="flex items-center gap-2">
//                         <span className="text-2xl">🎉</span>
//                         <span className="text-xl font-bold text-gray-800 font-comic">Welcome back, Admin</span>
//                         <span className="text-xl font-bold bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] bg-clip-text text-transparent" style={{ fontFamily: "'Fredoka One', cursive" }}>
//                           {user.contactPerson || 'Admin'}!
//                         </span>
//                         <span className="text-xl animate-wave">👋</span>
//                       </div>
//                       <p className="text-xs text-gray-500 font-comic ml-8 mt-0.5">
//                         Manage your toy store with joy 🧸
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Right section */}
//                 <div className="flex items-center gap-3">
//                   <Link 
//                     href="/" 
//                     className="relative group w-10 h-10 rounded-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all"
//                     title="Go to Toy Store"
//                   >
//                     <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                   </Link>

//                   {/* User Dropdown */}
//                   {user && (
//                     <div className="relative">
//                       <button
//                         onClick={() => setUserMenuOpen(!userMenuOpen)}
//                         className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-full hover:bg-[#D4EDEE] transition-all border-2 border-transparent hover:border-[#FFB6C1]"
//                       >
//                         <div className="text-right hidden md:block">
//                           <p className="text-sm font-bold text-gray-800 font-comic">{user.contactPerson || 'Admin'}</p>
//                           <p className="text-xs text-gray-500">{user.email}</p>
//                         </div>
//                         <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md" style={{ background: 'linear-gradient(135deg, #4A8A90 0%, #FFB6C1 100%)' }}>
//                           {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                         </div>
//                         <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
//                       </button>

//                       {/* Dropdown Menu */}
//                       {userMenuOpen && (
//                         <>
//                           <div 
//                             className="fixed inset-0 z-40"
//                             onClick={() => setUserMenuOpen(false)}
//                           />
//                           <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border-2 border-[#FFB6C1] overflow-hidden z-50">
//                             <div className="p-4" style={{ background: 'linear-gradient(135deg, #4A8A90 0%, #FFB6C1 100%)' }}>
//                               <div className="flex items-center gap-3">
//                                 <div className="w-12 h-12 rounded-xl bg-white/30 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl">
//                                   {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                                 </div>
//                                 <div>
//                                   <p className="text-white font-bold font-comic">{user.contactPerson || 'Admin'}</p>
//                                   <p className="text-white/80 text-xs">{user.email}</p>
//                                   <span className="inline-block mt-1 px-2 py-0.5 bg-white/20 rounded-full text-white text-xs font-comic">
//                                     ⭐ Admin ⭐
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
                            
//                             <div className="p-2">
//                               <Link
//                                 href="/admin/settings"
//                                 className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-[#D4EDEE] transition-all font-comic"
//                                 onClick={() => setUserMenuOpen(false)}
//                               >
//                                 <Settings className="w-4 h-4 text-[#4A8A90]" />
//                                 <span>Settings</span>
//                                 <span className="ml-auto text-sm">⚙️</span>
//                               </Link>
                              
//                               <button
//                                 onClick={() => {
//                                   setUserMenuOpen(false);
//                                   logout();
//                                 }}
//                                 className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all w-full text-left font-comic mt-1"
//                               >
//                                 <LogOut className="w-4 h-4" />
//                                 <span>Logout</span>
//                                 <span className="ml-auto text-sm">👋</span>
//                               </button>
//                             </div>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* Page content with decorative background */}
//           <main className="relative flex-1 overflow-y-auto" style={{ margin: 0, padding: 0 }}>
//             <div className="absolute inset-0 pointer-events-none overflow-hidden">
//               <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float">🧸</div>
//               <div className="absolute bottom-20 right-10 text-8xl opacity-10 animate-float-delayed">🎈</div>
//               <div className="absolute top-1/2 left-1/4 text-5xl opacity-5 animate-float-slow">🎪</div>
//               <div className="absolute bottom-1/3 right-1/4 text-7xl opacity-5 animate-float-slow">🎨</div>
//             </div>
//             <div className="relative z-10">
//               {children}
//             </div>
//           </main>
//         </div>
//       </div>

//       <style jsx>{`
//         .custom-scroll::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scroll::-webkit-scrollbar-track {
//           background: #D4EDEE;
//           border-radius: 10px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb {
//           background: linear-gradient(135deg, #4A8A90, #FFB6C1);
//           border-radius: 10px;
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(10deg); }
//         }
//         @keyframes float-delayed {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-15px) rotate(-10deg); }
//         }
//         @keyframes float-slow {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-10px) rotate(5deg); }
//         }
//         @keyframes wave {
//           0%, 100% { transform: rotate(0deg); }
//           25% { transform: rotate(20deg); }
//           75% { transform: rotate(-10deg); }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//         .animate-float-delayed {
//           animation: float-delayed 8s ease-in-out infinite;
//         }
//         .animate-float-slow {
//           animation: float-slow 10s ease-in-out infinite;
//         }
//         .animate-wave {
//           animation: wave 1s ease-in-out infinite;
//           display: inline-block;
//         }
//       `}</style>
//     </>
//   );
// }



// 2 with gap

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { 
//   LayoutDashboard, 
//   FileText, 
//   Users, 
//   UserPlus,
//   Settings, 
//   LogOut,
//   Menu,
//   ChevronDown,
//   Package,
//   MessageSquare,
//   Home,
//   ChevronRight,
//   UserCog,
//   FolderPlus,
//   Newspaper,
//   Star,
//   Heart,
//   Sparkles,
//   Gift,
//   ShoppingBag,
//   Rocket,
//   Award,
//   Bell,
//   Ticket
// } from 'lucide-react';

// export default function AdminLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Helper function to normalize pathname (remove trailing slash)
//   const normalizePath = (path) => {
//     if (path && path !== '/' && path.endsWith('/')) {
//       return path.slice(0, -1);
//     }
//     return path;
//   };

//   // Helper function to check if a route is active
//   const isActive = (href) => {
//     const currentPath = normalizePath(pathname);
    
//     if (href === '/admin/dashboard') {
//       if (currentPath === '/admin/dashboard') return true;
//       return false;
//     }
    
//     if (href === '/admin/all-products') {
//       const matches = [
//         '/admin/all-products',
//         '/admin/editProduct',
//         '/admin/viewProduct',
//         '/admin/product'
//       ].some(route => currentPath === route);
//       const startsWith = currentPath.startsWith('/admin/products/');
//       if (matches || startsWith) return true;
//       return false;
//     }
    
//     if (href === '/admin/create-products') {
//       const matches = ['/admin/create-products', '/admin/createProduct'].some(route => currentPath === route);
//       if (matches) return true;
//       return false;
//     }
    
//     if (href === '/admin/create-categories') {
//       const matches = ['/admin/create-categories', '/admin/createCategory'].some(route => currentPath === route);
//       if (matches) return true;
//       return false;
//     }

//     if (href === '/admin/coupon') {
//       const matches = ['/admin/coupon', '/admin/coupon'].some(route => currentPath === route);
//       if (matches) return true;
//       return false;
//     }
    
//     if (href === '/admin/create-users') {
//       const matches = ['/admin/create-users', '/admin/createUser'].some(route => currentPath === route);
//       if (matches) return true;
//       return false;
//     }
    
//     if (href === '/admin/manage-users') {
//       if (currentPath === '/admin/manage-users' || 
//           currentPath === '/admin/editUser' ||
//           currentPath.startsWith('/admin/manage-users/')) return true;
//       return false;
//     }
    
//     if (href === '/admin/all-customers') {
//       if (currentPath === '/admin/all-customers' || 
//           currentPath === '/admin/customer' ||
//           currentPath.startsWith('/admin/all-customers/')) return true;
//       return false;
//     }
    
//     if (href === '/admin/create-blog') {
//       if (currentPath === '/admin/create-blog') return true;
//       return false;
//     }
    
//     if (href === '/admin/all-blogs') {
//       if (currentPath === '/admin/all-blogs' || 
//           currentPath === '/admin/editBlog' ||
//           currentPath.startsWith('/admin/all-blogs/')) return true;
//       return false;
//     }
    
//     if (href === '/admin/manage-reviews') {
//       if (currentPath === '/admin/manage-reviews' || 
//           currentPath.startsWith('/admin/manage-reviews/')) return true;
//       return false;
//     }
    
//     if (href === '/admin/orders') {
//       if (currentPath === '/admin/orders' || 
//           currentPath.startsWith('/admin/orders/')) return true;
//       return false;
//     }
    
//     if (href === '/admin/settings') {
//       if (currentPath === '/admin/settings' || 
//           currentPath.startsWith('/admin/settings/')) return true;
//       return false;
//     }
    
//     return false;
//   };

//   useEffect(() => {
//     document.body.style.margin = '0';
//     document.body.style.padding = '0';
//     document.body.style.overflow = 'auto';
    
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (!token || !userData) {
//       logout();
//       return;
//     }

//     try {
//       const parsedUser = JSON.parse(userData);
      
//       if (parsedUser.role !== 'admin') {
//         logout();
//         return;
//       }

//       setUser(parsedUser);
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       logout();
//     } finally {
//       setIsLoading(false);
//     }
//   }, [router]);

//   const navigation = [
//     { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, color: '#4A8A90' },
//     { name: 'All Orders', href: '/admin/orders', icon: MessageSquare, color: '#4A8A90' },
//     { name: 'Create Products', href: '/admin/create-products', icon: Gift, color: '#4A8A90' },
//     { name: 'All Products', href: '/admin/all-products', icon: ShoppingBag, color: '#4A8A90' },
//     { name: 'Create Category', href: '/admin/create-categories', icon: FolderPlus, color: '#4A8A90' },
//     { name: 'Create Coupon', href: '/admin/coupon', icon: Ticket, color: '#4A8A90' },
//     { name: 'Manage Certifications', href: '/admin/certifications', icon: Award, color: '#4A8A90' },
//     { name: 'Create Users', href: '/admin/create-users', icon: UserPlus, color: '#4A8A90' },
//     { name: 'Manage Users', href: '/admin/manage-users', icon: UserCog, color: '#4A8A90' },
//     { name: 'Create & Manage Customers', href: '/admin/all-customers', icon: Users, color: '#4A8A90' },
//     { name: 'Create Blog', href: '/admin/create-blog', icon: Newspaper, color: '#4A8A90' },
//     { name: 'Manage Blogs', href: '/admin/all-blogs', icon: Newspaper, color: '#4A8A90' },
//     { name: 'Manage Reviews', href: '/admin/manage-reviews', icon: Star, color: '#4A8A90' },
//     { name: 'Settings', href: '/admin/settings', icon: Settings, color: '#4A8A90' }
//   ];

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     router.push('/login');
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A8A90]/10 via-[#FFB6C1]/10 to-[#D4EDEE]/20">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-20 h-20 border-4 border-[#FFB6C1] border-t-[#4A8A90] border-r-[#D4EDEE] rounded-full animate-spin mx-auto mb-4"></div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <span className="text-3xl">🧸</span>
//             </div>
//           </div>
//           <p className="text-[#4A8A90] font-comic mt-3">Loading Toy Store Dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Fredoka+One&family=Poppins:wght@300;400;500;600;700&display=swap');
        
//         html, body {
//           margin: 0 !important;
//           padding: 0 !important;
//           overflow: auto !important;
//           height: auto !important;
//           min-height: 100vh;
//         }
        
//         * {
//           box-sizing: border-box;
//         }
        
//         h1, h2, h3, h4, h5, h6, .heading-font {
//           font-family: 'Fredoka One', 'Comic Neue', cursive;
//         }
        
//         .font-comic {
//           font-family: 'Comic Neue', cursive;
//         }
        
//         .gradient-bg {
//           background: linear-gradient(135deg, #4A8A90 0%, #FFB6C1 50%, #D4EDEE 100%);
//         }
//       `}</style>
      
//       <div className="min-h-screen bg-gradient-to-br from-[#4A8A90]/5 via-[#FFB6C1]/5 to-[#D4EDEE]/10">
//         {/* Mobile sidebar backdrop */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Sidebar - Matching Hero Banner Colors */}
//         <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-out lg:translate-x-0 overflow-y-auto ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         }`} style={{ 
//           background: 'linear-gradient(180deg, #FFFFFF 0%, #FEF9F9 100%)',
//           borderRight: '3px solid #FFB6C1'
//         }}>
          
//           {/* Sidebar header with matching gradient */}
//           <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #4A8A90 0%, #FFB6C1 100%)' }}>
//             <div className="absolute inset-0 opacity-20">
//               <div className="absolute top-2 left-2 text-2xl">🧸</div>
//               <div className="absolute bottom-2 right-2 text-3xl">🎈</div>
//               <div className="absolute top-10 right-10 text-xl">🎪</div>
//               <div className="absolute bottom-10 left-10 text-2xl">🎨</div>
//             </div>
//             <div className="h-20 flex items-center justify-center px-6 relative">
//               <Link href="/" className="group">
//                 <div className="rounded-2xl p-2 transition-all duration-300">
//                   <img 
//                     src="https://i.ibb.co.com/DPz8BcQm/favicon-ico.png"
//                     alt="ToyMart Logo"
//                     className="w-36 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
//                   />
//                 </div>
//               </Link>
//             </div>
//           </div>

//           {/* User info - Colorful card */}
//           {user && (
//             <div className="mx-4 mt-4 mb-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-[#D4EDEE] shadow-sm">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center text-white font-bold text-base shadow-md">
//                   {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-gray-800 font-semibold text-sm truncate font-comic">
//                     {user.contactPerson || 'Admin User'}
//                   </p>
//                   <p className="text-gray-500 text-xs truncate mt-0.5">
//                     {user.email}
//                   </p>
//                   <div className="flex items-center gap-1.5 mt-1">
//                     <span className="w-1.5 h-1.5 rounded-full bg-[#4A8A90]"></span>
//                     <span className="text-xs font-medium text-gray-500 font-comic">
//                       Admin
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation - With new colors */}
//           <nav className="px-3 py-3 pb-32">
//             <div className="flex items-center gap-2 mb-4 px-3">
//               <Sparkles className="w-4 h-4 text-[#FFB6C1]" />
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider font-comic">TOY STATION MENU</p>
//               <Sparkles className="w-4 h-4 text-[#4A8A90]" />
//             </div>
//             <div className="space-y-1">
//               {navigation.map((item) => {
//                 const active = isActive(item.href);
//                 const Icon = item.icon;
//                 return (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
//                       active
//                         ? 'text-white shadow-lg'
//                         : 'text-gray-700 hover:bg-[#D4EDEE] hover:translate-x-1'
//                     }`}
//                     style={active ? { background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}CC 100%)` } : {}}
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
//                         active ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-[#D4EDEE]'
//                       }`}>
//                         <Icon className={`w-4 h-4 ${active ? 'text-white' : ''}`} style={!active ? { color: item.color } : {}} />
//                       </div>
//                       <span className="font-comic font-semibold">{item.name}</span>
//                     </div>
//                     {active && (
//                       <div className="flex items-center gap-1">
//                         <span className="text-white text-xs">⭐</span>
//                         <ChevronRight className="w-4 h-4 text-white" />
//                       </div>
//                     )}
//                   </Link>
//                 );
//               })}
//             </div>
//           </nav>

//           {/* Logout button */}
//           <div className="fixed bottom-0 left-0 w-72 p-4 border-t-2 border-[#D4EDEE] bg-white/95 backdrop-blur-sm">
//             <button
//               onClick={logout}
//               className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-600 w-full transition-all group"
//             >
//               <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-all">
//                 <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
//               </div>
//               <span className="font-comic">Logout</span>
//               <span className="ml-auto text-lg group-hover:animate-bounce">👋</span>
//             </button>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="lg:ml-72 min-h-screen">
//           {/* Top header */}
//           <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-[#FFB6C1]">
//             <div className="px-4 sm:px-6 lg:px-8">
//               <div className="flex items-center justify-between h-20">
                
//                 {/* Left section */}
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setSidebarOpen(true)}
//                     className="lg:hidden w-10 h-10 rounded-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all"
//                   >
//                     <Menu className="w-5 h-5" />
//                   </button>
                  
//                   {/* Welcome Message */}
//                   {user && (
//                     <div className="hidden sm:block">
//                       <div className="flex items-center gap-2">
//                         <span className="text-2xl">🎉</span>
//                         <span className="text-xl font-bold text-gray-800 font-comic">Welcome back, Admin</span>
//                         <span className="text-xl font-bold bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] bg-clip-text text-transparent" style={{ fontFamily: "'Fredoka One', cursive" }}>
//                           {user.contactPerson || 'Admin'}!
//                         </span>
//                         <span className="text-xl animate-wave">👋</span>
//                       </div>
//                       <p className="text-xs text-gray-500 font-comic ml-8 mt-0.5">
//                         Manage your toy store with joy 🧸
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Right section */}
//                 <div className="flex items-center gap-3">
//                   <Link 
//                     href="/" 
//                     className="relative group w-10 h-10 rounded-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all"
//                     title="Go to Toy Store"
//                   >
//                     <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                   </Link>

//                   {/* User Dropdown */}
//                   {user && (
//                     <div className="relative">
//                       <button
//                         onClick={() => setUserMenuOpen(!userMenuOpen)}
//                         className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-full hover:bg-[#D4EDEE] transition-all border-2 border-transparent hover:border-[#FFB6C1]"
//                       >
//                         <div className="text-right hidden md:block">
//                           <p className="text-sm font-bold text-gray-800 font-comic">{user.contactPerson || 'Admin'}</p>
//                           <p className="text-xs text-gray-500">{user.email}</p>
//                         </div>
//                         <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md" style={{ background: 'linear-gradient(135deg, #4A8A90 0%, #FFB6C1 100%)' }}>
//                           {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                         </div>
//                         <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
//                       </button>

//                       {/* Dropdown Menu */}
//                       {userMenuOpen && (
//                         <>
//                           <div 
//                             className="fixed inset-0 z-40"
//                             onClick={() => setUserMenuOpen(false)}
//                           />
//                           <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border-2 border-[#FFB6C1] overflow-hidden z-50">
//                             <div className="p-4" style={{ background: 'linear-gradient(135deg, #4A8A90 0%, #FFB6C1 100%)' }}>
//                               <div className="flex items-center gap-3">
//                                 <div className="w-12 h-12 rounded-xl bg-white/30 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl">
//                                   {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                                 </div>
//                                 <div>
//                                   <p className="text-white font-bold font-comic">{user.contactPerson || 'Admin'}</p>
//                                   <p className="text-white/80 text-xs">{user.email}</p>
//                                   <span className="inline-block mt-1 px-2 py-0.5 bg-white/20 rounded-full text-white text-xs font-comic">
//                                     ⭐ Admin ⭐
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
                            
//                             <div className="p-2">
//                               <Link
//                                 href="/admin/settings"
//                                 className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-[#D4EDEE] transition-all font-comic"
//                                 onClick={() => setUserMenuOpen(false)}
//                               >
//                                 <Settings className="w-4 h-4 text-[#4A8A90]" />
//                                 <span>Settings</span>
//                                 <span className="ml-auto text-sm">⚙️</span>
//                               </Link>
                              
//                               <button
//                                 onClick={() => {
//                                   setUserMenuOpen(false);
//                                   logout();
//                                 }}
//                                 className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all w-full text-left font-comic mt-1"
//                               >
//                                 <LogOut className="w-4 h-4" />
//                                 <span>Logout</span>
//                                 <span className="ml-auto text-sm">👋</span>
//                               </button>
//                             </div>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* Page content */}
//           <main className="p-0">
//             {children}
//           </main>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(10deg); }
//         }
//         @keyframes float-delayed {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-15px) rotate(-10deg); }
//         }
//         @keyframes float-slow {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-10px) rotate(5deg); }
//         }
//         @keyframes wave {
//           0%, 100% { transform: rotate(0deg); }
//           25% { transform: rotate(20deg); }
//           75% { transform: rotate(-10deg); }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//         .animate-float-delayed {
//           animation: float-delayed 8s ease-in-out infinite;
//         }
//         .animate-float-slow {
//           animation: float-slow 10s ease-in-out infinite;
//         }
//         .animate-wave {
//           animation: wave 1s ease-in-out infinite;
//           display: inline-block;
//         }
//       `}</style>
//     </>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  MessageSquare,
  FileText,
  Package,
  FolderPlus,
  Gift,
  ShoppingBag,
  Ticket,
  Award,
  UserPlus,
  UserCog,
  Users,
  Newspaper,
  Star,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
  Home,
  ChevronRight,
  Truck,
  ScanBarcode,
  QrCode,
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Helper function to normalize pathname (remove trailing slash)
  const normalizePath = (path) => {
    // Remove trailing slash if present and not just '/'
    if (path && path !== '/' && path.endsWith('/')) {
      return path.slice(0, -1);
    }
    return path;
  };

  // Debug logging
  useEffect(() => {
    console.log('=== ADMIN LAYOUT DEBUG ===');
    console.log('Raw pathname:', pathname);
    console.log('Normalized pathname:', normalizePath(pathname));
    console.log('Current URL:', window.location.href);
    console.log('Current search:', window.location.search);
  }, [pathname]);

  // Helper function to check if a route is active
  const isActive = (href) => {
    // Get normalized current path
    const currentPath = normalizePath(pathname);
    
    console.log(`Checking active for: ${href}, current: ${currentPath}`);
    
    // Dashboard - handle both with and without trailing slash
    if (href === '/admin/dashboard') {
      if (currentPath === '/admin/dashboard') {
        console.log(`✅ Dashboard active: ${currentPath}`);
        return true;
      }
      return false;
    }
    
    // All Orders
    if (href === '/admin/orders') {
      if (currentPath === '/admin/orders' || currentPath.startsWith('/admin/orders/')) {
        return true;
      }
      return false;
    }
    
    // All Products - matches list page, edit page, and view page
    if (href === '/admin/all-products') {
      const matches = [
        '/admin/all-products',
        '/admin/editProduct',
        '/admin/viewProduct',
        '/admin/product'
      ].some(route => currentPath === route);
      
      const startsWith = currentPath.startsWith('/admin/products/');
      
      if (matches || startsWith) {
        console.log(`✅ All Products active: ${currentPath}`);
        return true;
      }
      return false;
    }
    
    // Create Products
    if (href === '/admin/create-products') {
      const matches = [
        '/admin/create-products',
        '/admin/createProduct'
      ].some(route => currentPath === route);
      
      if (matches) {
        console.log(`✅ Create Products active: ${currentPath}`);
        return true;
      }
      return false;
    }
    
    // Create Category
    if (href === '/admin/create-categories') {
      const matches = [
        '/admin/create-categories',
        '/admin/createCategory'
      ].some(route => currentPath === route);
      
      if (matches) return true;
      return false;
    }
    
    // Create Coupon
    if (href === '/admin/coupon') {
      if (currentPath === '/admin/coupon') return true;
      return false;
    } 
    if (href === '/admin/barcodes') {
      if (currentPath === '/admin/barcodes') return true;
      return false;
    } 
    
    if (href === '/admin/barcode-scanner') {
      if (currentPath === '/admin/barcode-scanner') return true;
      return false;
    }

     if (href === '/admin/delivery-settings') {
      if (currentPath === '/admin/delivery-settings') return true;
      return false;
    }
    
    // Manage Certifications
    // if (href === '/admin/certifications') {
    //   if (currentPath === '/admin/certifications') return true;
    //   return false;
    // }
    
    // Create Users
    if (href === '/admin/create-users') {
      const matches = [
        '/admin/create-users',
        '/admin/createUser'
      ].some(route => currentPath === route);
      
      if (matches) return true;
      return false;
    }
    
    // Manage Users
    if (href === '/admin/manage-users') {
      if (currentPath === '/admin/manage-users' || 
          currentPath === '/admin/editUser' ||
          currentPath.startsWith('/admin/manage-users/')) {
        return true;
      }
      return false;
    }
    
    // All Customers
    if (href === '/admin/all-customers') {
      if (currentPath === '/admin/all-customers' || 
          currentPath === '/admin/customer' ||
          currentPath.startsWith('/admin/all-customers/')) {
        return true;
      }
      return false;
    }
    
    // Create Blog
    if (href === '/admin/create-blog') {
      if (currentPath === '/admin/create-blog') return true;
      return false;
    }
    
    // Manage Blogs
    if (href === '/admin/all-blogs') {
      if (currentPath === '/admin/all-blogs' || 
          currentPath === '/admin/editBlog' ||
          currentPath.startsWith('/admin/all-blogs/')) {
        return true;
      }
      return false;
    }
    
    // Manage Reviews
    if (href === '/admin/manage-reviews') {
      if (currentPath === '/admin/manage-reviews' || 
          currentPath.startsWith('/admin/manage-reviews/')) {
        return true;
      }
      return false;
    }
    
    // Settings - matches all subpages
    if (href === '/admin/settings') {
      if (currentPath === '/admin/settings' || 
          currentPath.startsWith('/admin/settings/')) {
        return true;
      }
      return false;
    }
    
    return false;
  };

  useEffect(() => {
    // Add global style to remove any body padding/margin
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    // Check if user is admin
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      logout();
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      
      // IMMEDIATE LOGOUT if role is not admin
      if (parsedUser.role !== 'admin') {
        console.log('Unauthorized admin access attempt by:', parsedUser.role);
        logout();
        return;
      }

      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Updated navigation with new structure and color property
  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, color: '#4A8A90' },
    { name: 'All Orders', href: '/admin/orders', icon: MessageSquare, color: '#4A8A90' },
    { name: 'Create Products', href: '/admin/create-products', icon: Gift, color: '#4A8A90' },
    { name: 'All Products', href: '/admin/all-products', icon: ShoppingBag, color: '#4A8A90' },
    { name: 'All Barcodes', href: '/admin/barcodes', icon: QrCode, color: '#4A8A90' },
    { name: ' Barcodes Scan', href: '/admin/barcode-scanner', icon: ScanBarcode, color: '#4A8A90' },

    { name: 'Create Category', href: '/admin/create-categories', icon: FolderPlus, color: '#4A8A90' },
    { name: 'Create Coupon', href: '/admin/coupon', icon: Ticket, color: '#4A8A90' },
    { name: 'Delivery Settings', href: '/admin/delivery-settings', icon: Truck, color: '#4A8A90' }, 
    // { name: 'Manage Certifications', href: '/admin/certifications', icon: Award, color: '#4A8A90' },
    { name: 'Create Users', href: '/admin/create-users', icon: UserPlus, color: '#4A8A90' },
    { name: 'Manage Users', href: '/admin/manage-users', icon: UserCog, color: '#4A8A90' },
    { name: 'Create & Manage Customers', href: '/admin/all-customers', icon: Users, color: '#4A8A90' },
    { name: 'Create Blog', href: '/admin/create-blog', icon: Newspaper, color: '#4A8A90' },
    { name: 'Manage Blogs', href: '/admin/all-blogs', icon: Newspaper, color: '#4A8A90' },
    { name: 'Manage Reviews', href: '/admin/manage-reviews', icon: Star, color: '#4A8A90' },
    { name: 'Settings', href: '/admin/settings', icon: Settings, color: '#4A8A90' }
  ];

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4A8A90] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Global style to ensure no extra spacing and apply new fonts */}
      <style jsx global>{`
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden;
          font-family: 'Inter', sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        h1, h2, h3, h4, h5, h6, .heading-font {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
      
      <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2', margin: 0, padding: 0 }}>
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Sidebar header with logo - Updated to match new color scheme (Teal to Soft Pink gradient) */}
          <div className="h-20 flex items-center justify-center px-6 border-b border-gray-200 relative" style={{ background: 'linear-gradient(135deg, #4A8A90 0%, #FFB6C1 100%)' }}>
            <div className="flex items-center justify-center w-full">
              <Link href="/">
                <img 
                  src="https://i.ibb.co.com/DPz8BcQm/favicon-ico.png" 
                  alt="Jute Craftify Logo" 
                  className="h-16 w-auto object-contain drop-shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    const parent = e.target.parentElement;
                    parent.innerHTML = '<span className="text-5xl text-white drop-shadow-md">🌾</span>';
                  }}
                />
              </Link>
            </div>
          </div>

          {/* User info - In sidebar below header - Updated with new accent colors */}
          {user && (
            <div className="px-4 py-4 border-b border-gray-200" style={{ backgroundColor: '#F0F7F7' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-md" style={{ background: 'linear-gradient(135deg, #4A8A90 0%, #FFB6C1 100%)' }}>
                  {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {user.contactPerson || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-600 truncate mt-0.5">
                    {user.email}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4A8A90' }}></span>
                    <span className="text-xs font-medium" style={{ color: '#4A8A90' }}>
                      Administrator
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation - Updated active state colors */}
          <nav className="px-3 py-4 h-[calc(100vh-11rem)] overflow-y-auto pb-24 custom-scroll">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">MAIN MENU</p>
            <div className="space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                      active
                        ? 'text-white shadow-md'
                        : 'text-gray-700 hover:bg-[#F0F7F7]'
                    }`}
                    style={active ? { background: `linear-gradient(135deg, ${item.color} 0%, #FFB6C1 100%)` } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${
                        active ? 'text-white' : 'text-gray-400'
                      }`} />
                      <span>{item.name}</span>
                    </div>
                    {active && <ChevronRight className="w-4 h-4 text-white" />}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Logout button at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-600 w-full transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center">
                <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
              </div>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:ml-72 min-h-screen">
          {/* Top header - Updated colors */}
          <header className="sticky top-0 z-30 bg-white border-b shadow-sm" style={{ borderColor: '#F0F7F7', margin: 0 }}>
            <div className="px-4 sm:px-6 lg:px-8" style={{ margin: 0 }}>
              <div className="flex items-center justify-between h-20" style={{ margin: 0 }}>
                {/* Left section */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#F0F7F7]"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  
                  {/* Welcome Message - Updated with new fonts and colors */}
                  {user && (
                    <div>
                      <span className="text-2xl font-bold" style={{ color: '#2A2A2A', fontFamily: 'Playfair Display, serif' }}>Welcome back,</span>
                      <span className="text-2xl font-bold ml-2" style={{ color: '#4A8A90', fontFamily: 'Playfair Display, serif' }}>{user.contactPerson || 'Admin'}</span>
                    </div>
                  )}
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3">
                  <Link 
                    href="/" 
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#F0F7F7] transition-colors"
                    title="Go to Homepage"
                  >
                    <Home className="w-5 h-5" />
                  </Link>

                  {/* User Dropdown - Updated colors */}
                  {user && (
                    <div className="relative">
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-lg hover:bg-[#F0F7F7] transition-colors"
                      >
                        <div className="text-right hidden md:block">
                          <p className="text-sm font-medium text-gray-900">{user.contactPerson || 'Admin'}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm" style={{ background: 'linear-gradient(135deg, #4A8A90 0%, #FFB6C1 100%)' }}>
                          {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                        </div>
                        <ChevronDown className={`w-4 h-5 text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu - Updated colors */}
                      {userMenuOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40"
                            onClick={() => setUserMenuOpen(false)}
                          />
                          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border py-2 z-50" style={{ borderColor: '#F0F7F7' }}>
                            <div className="px-4 py-3 border-b" style={{ borderColor: '#F0F7F7' }}>
                              <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>{user.contactPerson || 'Admin'}</p>
                              <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-0.5 text-xs font-medium rounded-full" 
                                  style={{ 
                                    backgroundColor: '#F0F7F7',
                                    color: '#4A8A90'
                                  }}>
                                  Administrator
                                </span>
                              </div>
                            </div>
                            
                            <Link
                              href="/admin/settings"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
                              style={{ color: '#4A8A90' }}
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <Settings className="w-4 h-4" style={{ color: '#4A8A90' }} />
                              <span>Settings</span>
                            </Link>
                            
                            <button
                              onClick={() => {
                                setUserMenuOpen(false);
                                logout();
                              }}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left border-t mt-1 pt-2"
                              style={{ borderColor: '#F0F7F7' }}
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Logout</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="" style={{ margin: 0, padding: 0 }}>
            {children}
          </main>
        </div>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #F0F7F7;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #4A8A90;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}