'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PackagePlus,
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  MessageSquare,
  Home,
  ChevronRight,
  Image,
  Eye,
  FileEdit,
  ClipboardList,
  HelpCircle,
  FolderPlus,
  Newspaper,
  Edit,
  Star,
  Sparkles,
  Gift,
  Rocket,
  Award
} from 'lucide-react';

export default function ModeratorLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Helper function to normalize pathname (remove trailing slash)
  const normalizePath = (path) => {
    if (path && path !== '/' && path.endsWith('/')) {
      return path.slice(0, -1);
    }
    return path;
  };

  // Helper function to check if a route is active
  const isActive = (href) => {
    const currentPath = normalizePath(pathname);
    
    // Dashboard
    if (href === '/moderator/dashboard') {
      return currentPath === '/moderator/dashboard';
    }
    
    // Create Categories
    if (href === '/moderator/create-categories') {
      return currentPath === '/moderator/create-categories' || 
             currentPath === '/moderator/createCategory' ||
             currentPath.startsWith('/moderator/create-categories/');
    }
    
    // Create Products
    if (href === '/moderator/create-products') {
      return currentPath === '/moderator/create-products' || 
             currentPath === '/moderator/createProduct' ||
             currentPath.startsWith('/moderator/create-products/');
    }
    
    // All Products
    if (href === '/moderator/all-products') {
      return currentPath === '/moderator/all-products' || 
             currentPath === '/moderator/editProduct' ||
             currentPath === '/moderator/viewProduct' ||
             currentPath.startsWith('/moderator/all-products/') ||
             currentPath.startsWith('/moderator/products/');
    }
    
    // Inquiries
    if (href === '/moderator/orders') {
      return currentPath === '/moderator/orders' || 
             currentPath.startsWith('/moderator/orders/');
    }

    // Popup Settings
    if (href === '/moderator/popup-settings') {
      return currentPath === '/moderator/popup-settings' || 
             currentPath.startsWith('/moderator/popup-settings/');
    }

    // Promotional Popup
    if (href === '/moderator/promotional-settings') {
      return currentPath === '/moderator/promotional-settings' || 
             currentPath.startsWith('/moderator/promotional-settings/');
    }
    
    // Create Blog
    if (href === '/moderator/create-blog') {
      return currentPath === '/moderator/create-blog';
    }
    
    // Manage Blogs
    if (href === '/moderator/manage-blogs') {
      return currentPath === '/moderator/manage-blogs' || 
             currentPath === '/moderator/editBlog' ||
             currentPath.startsWith('/moderator/manage-blogs/') ||
             currentPath.startsWith('/moderator/allBlogs/');
    }
    
    // Manage Certifications
    if (href === '/moderator/certifications') {
      return currentPath === '/moderator/certifications' || 
             currentPath.startsWith('/moderator/certifications/');
    }
    
    // Manage Reviews
    if (href === '/moderator/manage-reviews') {
      return currentPath === '/moderator/manage-reviews' || 
             currentPath.startsWith('/moderator/manage-reviews/');
    }
    
    // Settings
    if (href === '/moderator/settings') {
      return currentPath === '/moderator/settings' || 
             currentPath.startsWith('/moderator/settings/');
    }
    
    return false;
  };

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      logout();
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      
      if (parsedUser.role !== 'moderator') {
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

  const navigation = [
    { name: 'Dashboard', href: '/moderator/dashboard', icon: LayoutDashboard, color: '#4F9DFF' },
    { name: 'Create Categories', href: '/moderator/create-categories', icon: FolderPlus, color: '#6EE7B7' },
    { name: 'Create Products', href: '/moderator/create-products', icon: PackagePlus, color: '#FF85A1' },
    { name: 'All Products', href: '/moderator/all-products', icon: Image, color: '#4F9DFF' },
    { name: 'All Orders', href: '/moderator/orders', icon: MessageSquare, color: '#FF7B54' },
    { name: 'Popup Settings', href: '/moderator/popup-settings', icon: Star, color: '#FFD93D' },
    { name: 'Promotional Popup', href: '/moderator/promotional-settings', icon: Rocket, color: '#FF7B54' },
    { name: 'Create Blog', href: '/moderator/create-blog', icon: Newspaper, color: '#6EE7B7' },
    { name: 'Manage Blogs', href: '/moderator/manage-blogs', icon: Edit, color: '#4F9DFF' },
    { name: 'Manage Certifications', href: '/moderator/certifications', icon: Award, color: '#FFD93D' },
    { name: 'Manage Reviews', href: '/moderator/manage-reviews', icon: Star, color: '#FF85A1' },
    { name: 'Settings', href: '/moderator/settings', icon: Settings, color: '#FF7B54' }
  ];

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4F9DFF]/20 via-[#FF7B54]/10 to-[#FFD93D]/20">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#FFD93D] border-t-[#4F9DFF] border-r-[#FF7B54] rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl">🎈</span>
            </div>
          </div>
          <p className="text-gray-600 font-comic mt-3">Loading Moderator Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Fredoka+One&family=Poppins:wght@300;400;500;600;700&display=swap');
        
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          height: 100%;
        }
        
        * {
          box-sizing: border-box;
        }
        
        h1, h2, h3, h4, h5, h6, .heading-font {
          font-family: 'Fredoka One', 'Comic Neue', cursive;
        }
        
        .font-comic {
          font-family: 'Comic Neue', cursive;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-[#4F9DFF]/5 via-[#FF7B54]/5 to-[#FFD93D]/10" style={{ margin: 0, padding: 0, height: '100vh', overflow: 'hidden' }}>
        
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Colorful Toy Store Theme */}
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-out lg:translate-x-0 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`} style={{ 
          background: 'linear-gradient(180deg, #FFFAF0 0%, #FFFFFF 100%)',
          borderRight: '3px solid #FFD93D'
        }}>
          
          {/* Sidebar header with colorful gradient */}
          <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #4F9DFF 0%, #FF7B54 50%, #FFD93D 100%)' }}>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-2 left-2 text-2xl">🎈</div>
              <div className="absolute bottom-2 right-2 text-3xl">🎪</div>
              <div className="absolute top-10 right-10 text-xl">🎨</div>
              <div className="absolute bottom-10 left-10 text-2xl">🧸</div>
            </div>
            <div className="h-20 flex items-center justify-center px-6 relative">
              <Link href="/" className="group">
                <div className="rounded-2xl p-2 transition-all duration-300">
                  <img 
                    src="https://i.ibb.co.com/DPz8BcQm/favicon-ico.png"
                    alt="ToyMart Logo"
                    className="w-36 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* User info - Simple clean card */}
          {user && (
            <div className="mx-4 mt-4 mb-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#4F9DFF] to-[#FF7B54] flex items-center justify-center text-white font-bold text-base shadow-md">
                  {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-semibold text-sm truncate font-comic">
                    {user.contactPerson || 'Moderator'}
                  </p>
                  <p className="text-gray-500 text-xs truncate mt-0.5">
                    {user.email}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7B54]"></span>
                    <span className="text-xs font-medium text-gray-500 font-comic">
                      Moderator
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation - Colorful with fun icons */}
          <nav className="px-3 py-3 h-[calc(100vh-13rem)] overflow-y-auto pb-24 custom-scroll">
            <div className="flex items-center gap-2 mb-4 px-3">
              <Sparkles className="w-4 h-4 text-[#FFD93D]" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider font-comic">MODERATOR MENU</p>
              <Sparkles className="w-4 h-4 text-[#FF7B54]" />
            </div>
            <div className="space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                      active
                        ? 'text-white shadow-lg'
                        : 'text-gray-700 hover:bg-[#FFD93D]/20 hover:translate-x-1'
                    }`}
                    style={active ? { background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}CC 100%)` } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        active ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-[#FFD93D]/30'
                      }`}>
                        <Icon className={`w-4 h-4 ${active ? 'text-white' : `text-[${item.color}]`}`} style={!active ? { color: item.color } : {}} />
                      </div>
                      <span className="font-comic font-semibold">{item.name}</span>
                    </div>
                    {active && (
                      <div className="flex items-center gap-1">
                        <span className="text-white text-xs">⭐</span>
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Logout button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-[#FFD93D]/30 bg-white/95 backdrop-blur-sm">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-600 w-full transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-all">
                <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
              </div>
              <span className="font-comic">Logout</span>
              <span className="ml-auto text-lg group-hover:animate-bounce">👋</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:ml-72 h-screen flex flex-col">
          {/* Top header - Colorful toy store theme */}
          <header className="flex-shrink-0 sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-[#FFD93D]" style={{ margin: 0 }}>
            <div className="px-4 sm:px-6 lg:px-8" style={{ margin: 0 }}>
              <div className="flex items-center justify-between h-20" style={{ margin: 0 }}>
                
                {/* Left section */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden w-10 h-10 rounded-full bg-gradient-to-r from-[#4F9DFF] to-[#FF7B54] flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  
                  {/* Welcome Message */}
                  {user && (
                    <div className="hidden sm:block">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🎉</span>
                        <span className="text-xl font-bold text-gray-800 font-comic">Welcome back,</span>
                        <span className="text-xl font-bold bg-gradient-to-r from-[#4F9DFF] to-[#FF7B54] bg-clip-text text-transparent" style={{ fontFamily: "'Fredoka One', cursive" }}>
                          {user.contactPerson || 'Moderator'}!
                        </span>
                        <span className="text-xl animate-wave">👋</span>
                      </div>
                      <p className="text-xs text-gray-500 font-comic ml-8 mt-0.5">
                        Manage toys and keep the magic alive 🎈
                      </p>
                    </div>
                  )}
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3">
                  <Link 
                    href="/" 
                    className="relative group w-10 h-10 rounded-full bg-gradient-to-r from-[#FFD93D] to-[#FF7B54] flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all"
                    title="Go to Toy Store"
                  >
                    <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </Link>

                  {/* User Dropdown */}
                  {user && (
                    <div className="relative">
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-full hover:bg-[#FFD93D]/20 transition-all border-2 border-transparent hover:border-[#FFD93D]"
                      >
                        <div className="text-right hidden md:block">
                          <p className="text-sm font-bold text-gray-800 font-comic">{user.contactPerson || 'Moderator'}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md" style={{ background: 'linear-gradient(135deg, #4F9DFF 0%, #FF7B54 100%)' }}>
                          {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu */}
                      {userMenuOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40"
                            onClick={() => setUserMenuOpen(false)}
                          />
                          <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border-2 border-[#FFD93D] overflow-hidden z-50">
                            <div className="p-4" style={{ background: 'linear-gradient(135deg, #4F9DFF 0%, #FF7B54 100%)' }}>
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-white/30 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl">
                                  {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-white font-bold font-comic">{user.contactPerson || 'Moderator'}</p>
                                  <p className="text-white/80 text-xs">{user.email}</p>
                                  <span className="inline-block mt-1 px-2 py-0.5 bg-white/20 rounded-full text-white text-xs font-comic">
                                    🎪 Toy Master 🎪
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-2">
                              <Link
                                href="/moderator/settings"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-[#FFD93D]/20 transition-all font-comic"
                                onClick={() => setUserMenuOpen(false)}
                              >
                                <Settings className="w-4 h-4 text-[#4F9DFF]" />
                                <span>Settings</span>
                                <span className="ml-auto text-sm">⚙️</span>
                              </Link>
                              
                              <button
                                onClick={() => {
                                  setUserMenuOpen(false);
                                  logout();
                                }}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all w-full text-left font-comic mt-1"
                              >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                                <span className="ml-auto text-sm">👋</span>
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Page content with decorative background */}
          <main className="relative flex-1 overflow-y-auto" style={{ margin: 0, padding: 0 }}>
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float">🎈</div>
              <div className="absolute bottom-20 right-10 text-8xl opacity-10 animate-float-delayed">🧸</div>
              <div className="absolute top-1/2 left-1/4 text-5xl opacity-5 animate-float-slow">🎪</div>
              <div className="absolute bottom-1/3 right-1/4 text-7xl opacity-5 animate-float-slow">🎨</div>
            </div>
            <div className="relative z-10">
              {children}
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #FFD93D/20;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #4F9DFF, #FF7B54);
          border-radius: 10px;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-10deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-10deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>
    </>
  );
}