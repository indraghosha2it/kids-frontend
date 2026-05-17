

// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Star, 
//   X, 
//   Loader2, 
//   AlertCircle, 
//   CheckCircle,
//   ArrowRight,
//   Award,
//   Shield,
//   Heart,
//   Mail,
//   Lock,
//   User,
//   Building,
//   Phone,
//   MapPin,
//   Eye,
//   EyeOff,
//   Search,
//   ChevronDown,
//   Leaf,
//   Sparkles
// } from 'lucide-react';
// import { toast } from 'sonner';
// import OTPVerification from '../auth/OTPVerification';
// import ForgotPassword from '../auth/ForgotPassword';
// import ResetOTPVerification from '../auth/ResetOTPVerification';
// import ModalResetPassword from '../auth/ModalResetPassword';
// import GoogleLoginButtonPopUp from '../GoogleLoginButtonPopUp';

// // Jute Craftify Theme Colors
// const JUTE_COLORS = {
//   primary: '#6B4F3A',
//   secondary: '#F5E6D3',
//   accent: '#3A7D44',
//   gold: '#C6A43B',
//   text: '#2C2420',
//   textLight: '#8B7355',
//   border: '#E5D5C0',
//   lightBg: '#FAF7F2',
//   white: '#FFFFFF'
// };

// export default function ReviewModal({ isOpen, onClose, onReviewSubmitted }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(false);
//   const [activeTab, setActiveTab] = useState('login');
//   const [authStep, setAuthStep] = useState('form');
//   const [registeredEmail, setRegisteredEmail] = useState('');
//   const [forgotEmail, setForgotEmail] = useState('');
//   const [resetOTP, setResetOTP] = useState('');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const dropdownRef = useRef(null);
  
//   const [formData, setFormData] = useState({
//     rating: 0,
//     title: '',
//     comment: '',
//     productId: '',
//     productName: '',
//     anonymous: false
//   });
  
//   const [errors, setErrors] = useState({});
//   const [hoveredRating, setHoveredRating] = useState(0);

//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   });

//   const [registerData, setRegisterData] = useState({
//     companyName: '',
//     contactPerson: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     country: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     password: '',
//     confirmPassword: '',
//     agreeToTerms: false
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const benefits = [
//     { icon: <Award className="w-3.5 h-3.5" />, text: 'Help others make informed decisions' },
//     { icon: <Heart className="w-3.5 h-3.5" />, text: 'Share your experience with the community' },
//     { icon: <Shield className="w-3.5 h-3.5" />, text: 'Verified reviews only' },
//     { icon: <Star className="w-3.5 h-3.5" />, text: 'Earn reviewer badges' },
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (searchTerm.trim() === '') {
//       setFilteredProducts(products);
//     } else {
//       const filtered = products.filter(product =>
//         product.productName.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredProducts(filtered);
//     }
//   }, [searchTerm, products]);

//   useEffect(() => {
//     if (isOpen) {
//       checkAuth();
//       checkUserRole();
//       setAuthStep('form');
//       setActiveTab('login');
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     if (isAuthenticated && isOpen) {
//       fetchProducts();
//     }
//   }, [isAuthenticated, isOpen]);

//   const checkAuth = () => {
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (token && userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setIsAuthenticated(true);
//         setUser(parsedUser);
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         setIsAuthenticated(false);
//         setUser(null);
//       }
//     } else {
//       setIsAuthenticated(false);
//       setUser(null);
//     }
//   };

//   const checkUserRole = () => {
//     const userData = localStorage.getItem('user');
//     if (userData) {
//       try {
//         const user = JSON.parse(userData);
//         setUserRole(user.role);
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//       }
//     }
//   };

//   const fetchProducts = async () => {
//     setLoadingProducts(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/products?limit=100&includeInactive=false', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         setProducts(data.data || []);
//         setFilteredProducts(data.data || []);
//       } else {
//         setProducts([]);
//         setFilteredProducts([]);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setProducts([]);
//       setFilteredProducts([]);
//     } finally {
//       setLoadingProducts(false);
//     }
//   };

//   const handleLoginChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setLoginData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleRegisterChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setRegisterData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: loginData.email,
//           password: loginData.password
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         if (data.requiresVerification) {
//           setRegisteredEmail(loginData.email);
//           setAuthStep('otp');
//           toast.info('Please verify your email first', {
//             description: 'We\'ve sent a verification code to your email.'
//           });
//           setLoading(false);
//           return;
//         }
        
//         toast.error(data.error || 'Login failed');
//         setLoading(false);
//         return;
//       }

//       if (loginData.rememberMe) {
//         localStorage.setItem('rememberedEmail', loginData.email);
//       } else {
//         localStorage.removeItem('rememberedEmail');
//       }

//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
      
//       setIsAuthenticated(true);
//       setUser(data.user);
//       setUserRole(data.user.role);
      
//       setLoginData({
//         email: '',
//         password: '',
//         rememberMe: false
//       });
      
//       toast.success('Welcome back!', {
//         description: `Successfully signed in as ${data.user.contactPerson || data.user.companyName}`,
//       });
      
//       window.dispatchEvent(new Event('auth-change'));
//       setAuthStep('form');
      
//     } catch (error) {
//       console.error('Login error:', error);
//       toast.error('Connection error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (registerData.password !== registerData.confirmPassword) {
//       toast.error('Passwords do not match');
//       setLoading(false);
//       return;
//     }

//     if (registerData.password.length < 8) {
//       toast.error('Password must be at least 8 characters');
//       setLoading(false);
//       return;
//     }

//     if (!registerData.agreeToTerms) {
//       toast.error('Please agree to the terms');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           companyName: registerData.companyName,
//           contactPerson: registerData.contactPerson,
//           email: registerData.email,
//           phone: registerData.phone,
//           whatsapp: registerData.whatsapp || '',
//           country: registerData.country,
//           address: registerData.address,
//           city: registerData.city,
//           zipCode: registerData.zipCode,
//           password: registerData.password,
//           role: 'customer'
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         toast.error(data.error || 'Registration failed');
//         setLoading(false);
//         return;
//       }

//       toast.success('OTP Sent!', {
//         description: 'Please check your email for verification code.',
//       });
      
//       setRegisteredEmail(registerData.email);
//       setAuthStep('otp');
      
//     } catch (error) {
//       console.error('Registration error:', error);
//       toast.error('Connection error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSuccess = (data) => {
//     const { token, user } = data;
    
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(user));
    
//     setIsAuthenticated(true);
//     setUser(user);
//     setUserRole(user.role);
    
//     toast.success('Google sign in successful!', {
//       description: `Welcome ${user.contactPerson || user.companyName}!`,
//     });
    
//     window.dispatchEvent(new Event('auth-change'));
//     setAuthStep('form');
//     setActiveTab('login');
//   };

//   const handleGoogleError = (error) => {
//     toast.error(error);
//   };

//   const handleVerificationSuccess = (user, token) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(user));
    
//     setIsAuthenticated(true);
//     setUser(user);
//     setUserRole(user.role);
    
//     toast.success('Email Verified!', {
//       description: `Welcome to Jute Craftify, ${user.companyName || user.contactPerson || 'User'}!`,
//     });
    
//     window.dispatchEvent(new Event('auth-change'));
//     setAuthStep('form');
//     setActiveTab('login');
    
//     setRegisterData({
//       companyName: '',
//       contactPerson: '',
//       email: '',
//       phone: '',
//       whatsapp: '',
//       country: '',
//       address: '',
//       city: '',
//       zipCode: '',
//       password: '',
//       confirmPassword: '',
//       agreeToTerms: false
//     });
//   };

//   const handleForgotPassword = () => {
//     setAuthStep('forgot');
//   };

//   const handleForgotBack = () => {
//     setAuthStep('form');
//     setActiveTab('login');
//   };

//   const handleForgotOTPSent = (email) => {
//     setForgotEmail(email);
//     setAuthStep('reset-otp');
//   };

//   const handleResetOTPVerified = (otp) => {
//     setResetOTP(otp);
//     setAuthStep('new-password');
//   };

//   const handleResetBack = () => {
//     if (authStep === 'reset-otp') {
//       setAuthStep('forgot');
//     } else if (authStep === 'new-password') {
//       setAuthStep('reset-otp');
//     }
//   };

//   const handleResetSuccess = () => {
//     toast.success('Password Reset Successful!', {
//       description: 'You can now login with your new password.',
//     });
    
//     setAuthStep('form');
//     setActiveTab('login');
//     setForgotEmail('');
//     setResetOTP('');
    
//     if (forgotEmail) {
//       setLoginData(prev => ({
//         ...prev,
//         email: forgotEmail
//       }));
//     }
//   };

//   const validateReviewForm = () => {
//     const newErrors = {};
    
//     if (formData.rating === 0) {
//       newErrors.rating = 'Please select a rating';
//     }
    
//     if (!formData.comment.trim()) {
//       newErrors.comment = 'Please write your review';
//     } else if (formData.comment.length < 10) {
//       newErrors.comment = 'Review must be at least 10 characters';
//     } else if (formData.comment.length > 500) {
//       newErrors.comment = 'Review must be less than 500 characters';
//     }
    
//     if (formData.title && formData.title.length > 100) {
//       newErrors.title = 'Title must be less than 100 characters';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateReviewForm()) return;
    
//     setLoading(true);
    
//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch('http://localhost:5000/api/reviews', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           rating: formData.rating,
//           title: formData.title || undefined,
//           comment: formData.comment,
//           productId: formData.productId || undefined,
//           isAnonymous: formData.anonymous
//         })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Thank you for your review!', {
//           description: 'It will be published after moderation.',
//         });
        
//         setFormData({
//           rating: 0,
//           title: '',
//           comment: '',
//           productId: '',
//           productName: '',
//           anonymous: false
//         });
//         setSearchTerm('');
        
//         onReviewSubmitted?.();
//         onClose();
//       } else {
//         setErrors({ submit: data.error || 'Failed to submit review' });
//       }
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       setErrors({ submit: 'Failed to submit review. Please try again.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReviewChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }
//   };

//   const handleRatingClick = (rating) => {
//     setFormData(prev => ({ ...prev, rating }));
//     if (errors.rating) {
//       setErrors(prev => ({ ...prev, rating: null }));
//     }
//   };

//   const handleProductSelect = (product) => {
//     setFormData(prev => ({
//       ...prev,
//       productId: product._id,
//       productName: product.productName
//     }));
//     setIsDropdownOpen(false);
//     setSearchTerm('');
//   };

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm"
//           />

//           <div className="flex min-h-full items-center justify-center p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 20 }}
//               transition={{ type: "spring", duration: 0.5 }}
//               className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden"
//             >
//               <button
//                 onClick={onClose}
//                 className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors z-20 bg-white/80 backdrop-blur-sm"
//               >
//                 <X className="w-4 h-4 text-gray-600" />
//               </button>

//               <div className="flex flex-col md:flex-row">
//                 {/* Left Side - Jute Craftify Branding - Reduced Height */}
//                 <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-[#6B4F3A] to-[#8B6B51] p-5 text-white relative overflow-hidden">
//                   <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-24 translate-x-24"></div>
//                   <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
                  
//                   <div className="relative z-10">
//                     <div className="flex items-center justify-center gap-2 mb-3">
//                       <div className="relative w-40 h-12 overflow-hidden">
//                         <img 
//                           src="https://i.ibb.co.com/YBG2DF6f/Chat-GPT-Image-Feb-26-2026-09-57-28-AM-removebg-preview.png"
//                           alt="Jute Craftify Logo"
//                           className="w-full h-full object-contain"
//                         />
//                       </div>
//                     </div>

//                     <div className="text-center mb-3">
//                       <div className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-2.5 py-0.5 mb-2">
//                         <Leaf className="w-3 h-3 text-[#C6A43B]" />
//                         <span className="text-[10px] font-medium">Premium Jute Products</span>
//                       </div>
//                       <h3 className="text-lg font-bold mb-1 font-serif">
//                         {isAuthenticated ? 'Share Your Experience' : 'Join Our Community'}
//                       </h3>
//                       <p className="text-white/75 text-[11px]">
//                         {isAuthenticated 
//                           ? 'Your feedback helps us improve and helps other buyers.'
//                           : 'Sign in to share your experience and help other wholesale buyers.'}
//                       </p>
//                     </div>

//                     <div className="space-y-2">
//                       {benefits.map((benefit, index) => (
//                         <motion.div
//                           key={index}
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
//                         >
//                           <div className="p-1 bg-[#C6A43B]/20 rounded-lg text-[#C6A43B]">
//                             {benefit.icon}
//                           </div>
//                           <span className="text-[11px]">{benefit.text}</span>
//                         </motion.div>
//                       ))}
//                     </div>

//                     <div className="mt-3 pt-2 border-t border-white/20">
//                       <div className="grid grid-cols-2 gap-2 text-center">
//                         <div>
//                           <p className="text-xl font-bold text-[#C6A43B]">500+</p>
//                           <p className="text-[9px] text-white/70">Verified Reviews</p>
//                         </div>
//                         <div>
//                           <p className="text-xl font-bold text-[#C6A43B]">4.8</p>
//                           <p className="text-[9px] text-white/70">Average Rating</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Side - Forms - Reduced Height */}
//                 <div className="md:w-3/5 p-5 max-h-[520px] overflow-y-auto custom-scrollbar" style={{ backgroundColor: JUTE_COLORS.white }}>
//                   {!isAuthenticated ? (
//                     <>
//                       {authStep === 'form' && (
//                         <>
//                           <div className="flex gap-4 mb-4">
//                             <button
//                               onClick={() => setActiveTab('login')}
//                               className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-all ${
//                                 activeTab === 'login'
//                                   ? 'border-[#C6A43B] text-[#6B4F3A]'
//                                   : 'border-transparent text-gray-400 hover:text-gray-600'
//                               }`}
//                             >
//                               Sign In
//                             </button>
//                             <button
//                               onClick={() => setActiveTab('register')}
//                               className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-all ${
//                                 activeTab === 'register'
//                                   ? 'border-[#C6A43B] text-[#6B4F3A]'
//                                   : 'border-transparent text-gray-400 hover:text-gray-600'
//                               }`}
//                             >
//                               Create Account
//                             </button>
//                           </div>

//                           {activeTab === 'login' ? (
//                             <form onSubmit={handleLogin} className="space-y-3">
//                               <div>
//                                 <label className="block text-xs font-medium text-gray-700 mb-1">
//                                   Email Address
//                                 </label>
//                                 <div className="relative">
//                                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                                   <input
//                                     type="email"
//                                     name="email"
//                                     value={loginData.email}
//                                     onChange={handleLoginChange}
//                                     required
//                                     className="w-full pl-9 pr-3 py-2 text-sm border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white transition-all"
//                                     placeholder="your@company.com"
//                                   />
//                                 </div>
//                               </div>

//                               <div>
//                                 <label className="block text-xs font-medium text-gray-700 mb-1">
//                                   Password
//                                 </label>
//                                 <div className="relative">
//                                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                                   <input
//                                     type={showPassword ? "text" : "password"}
//                                     name="password"
//                                     value={loginData.password}
//                                     onChange={handleLoginChange}
//                                     required
//                                     className="w-full pl-9 pr-10 py-2 text-sm border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white transition-all"
//                                     placeholder="••••••••"
//                                   />
//                                   <button
//                                     type="button"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                                   >
//                                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                                   </button>
//                                 </div>
//                               </div>

//                               <div className="flex items-center justify-between">
//                                 <button
//                                   type="button"
//                                   onClick={handleForgotPassword}
//                                   className="text-[11px] text-[#6B4F3A] hover:underline font-medium"
//                                 >
//                                   Forgot password?
//                                 </button>
//                               </div>

//                               <button
//                                 type="submit"
//                                 disabled={loading}
//                                 className="w-full py-2.5 px-3 bg-gradient-to-r from-[#6B4F3A] to-[#8B6B51] text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group text-sm"
//                               >
//                                 {loading ? (
//                                   <>
//                                     <Loader2 className="w-4 h-4 animate-spin" />
//                                     Signing in...
//                                   </>
//                                 ) : (
//                                   <>
//                                     Sign In
//                                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                                   </>
//                                 )}
//                               </button>

//                               <div className="relative my-3">
//                                 <div className="absolute inset-0 flex items-center">
//                                   <div className="w-full border-t border-gray-200" />
//                                 </div>
//                                 <div className="relative flex justify-center text-[10px]">
//                                   <span className="px-2 bg-white text-gray-500">Or continue with</span>
//                                 </div>
//                               </div>
//                               <GoogleLoginButtonPopUp
//                                 mode="login"
//                                 onSuccess={handleGoogleSuccess}
//                                 onError={handleGoogleError}
//                               />
//                             </form>
//                           ) : (
//          <form onSubmit={handleRegister} className="space-y-3 overflow-y-visible">
//                               <div className="grid grid-cols-2 gap-2">
//                                 <div className="col-span-2 md:col-span-1">
//                                   <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
//                                     Company Name <span className="text-[#6B4F3A]">*</span>
//                                   </label>
//                                   <div className="relative">
//                                     <Building className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                                     <input
//                                       type="text"
//                                       name="companyName"
//                                       value={registerData.companyName}
//                                       onChange={handleRegisterChange}
//                                       required
//                                       className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
//                                       placeholder="Company name"
//                                     />
//                                   </div>
//                                 </div>

//                                 <div className="col-span-2 md:col-span-1">
//                                   <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
//                                     Contact Person <span className="text-[#6B4F3A]">*</span>
//                                   </label>
//                                   <div className="relative">
//                                     <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                                     <input
//                                       type="text"
//                                       name="contactPerson"
//                                       value={registerData.contactPerson}
//                                       onChange={handleRegisterChange}
//                                       required
//                                       className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
//                                       placeholder="Full name"
//                                     />
//                                   </div>
//                                 </div>

//                                 <div className="col-span-2">
//                                   <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
//                                     Email Address <span className="text-[#6B4F3A]">*</span>
//                                   </label>
//                                   <div className="relative">
//                                     <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                                     <input
//                                       type="email"
//                                       name="email"
//                                       value={registerData.email}
//                                       onChange={handleRegisterChange}
//                                       required
//                                       className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
//                                       placeholder="your@company.com"
//                                     />
//                                   </div>
//                                 </div>

//                                 <div className="col-span-2 md:col-span-1">
//                                   <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
//                                     Phone <span className="text-[#6B4F3A]">*</span>
//                                   </label>
//                                   <div className="relative">
//                                     <Phone className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                                     <input
//                                       type="tel"
//                                       name="phone"
//                                       value={registerData.phone}
//                                       onChange={handleRegisterChange}
//                                       required
//                                       className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
//                                       placeholder="+1 234 567 8900"
//                                     />
//                                   </div>
//                                 </div>

//                                 <div className="col-span-2 md:col-span-1">
//                                   <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
//                                     WhatsApp <span className="text-[#6B4F3A]">*</span>
//                                   </label>
//                                   <div className="relative">
//                                     <Phone className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                                     <input
//                                       type="tel"
//                                       name="whatsapp"
//                                       value={registerData.whatsapp}
//                                       onChange={handleRegisterChange}
//                                       required
//                                       className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
//                                       placeholder="+1 234 567 8900"
//                                     />
//                                   </div>
//                                 </div>

//                                 <div className="col-span-2 md:col-span-1">
//                                   <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
//                                     Country <span className="text-[#6B4F3A]">*</span>
//                                   </label>
//                                   <div className="relative">
//                                     <MapPin className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                                     <input
//                                       type="text"
//                                       name="country"
//                                       value={registerData.country}
//                                       onChange={handleRegisterChange}
//                                       required
//                                       className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
//                                       placeholder="Country"
//                                     />
//                                   </div>
//                                 </div>

//                                 <div className="col-span-2 md:col-span-1">
//                                   <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
//                                     City <span className="text-[#6B4F3A]">*</span>
//                                   </label>
//                                   <input
//                                     type="text"
//                                     name="city"
//                                     value={registerData.city}
//                                     onChange={handleRegisterChange}
//                                     required
//                                     className="w-full px-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
//                                     placeholder="City"
//                                   />
//                                 </div>

//                                 <div className="col-span-1">
//                                   <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
//                                     Address <span className="text-[#6B4F3A]">*</span>
//                                   </label>
//                                   <input
//                                     type="text"
//                                     name="address"
//                                     value={registerData.address}
//                                     onChange={handleRegisterChange}
//                                     required
//                                     className="w-full px-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
//                                     placeholder="Street address"
//                                   />
//                                 </div>

//                                 <div className="col-span-2 md:col-span-1">
//                                   <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
//                                     ZIP Code <span className="text-[#6B4F3A]">*</span>
//                                   </label>
//                                   <input
//                                     type="text"
//                                     name="zipCode"
//                                     value={registerData.zipCode}
//                                     onChange={handleRegisterChange}
//                                     required
//                                     className="w-full px-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
//                                     placeholder="ZIP code"
//                                   />
//                                 </div>

//                                 <div className="col-span-2 md:col-span-1">
//                                   <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
//                                     Password <span className="text-[#6B4F3A]">*</span>
//                                   </label>
//                                   <div className="relative">
//                                     <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                                     <input
//                                       type={showPassword ? "text" : "password"}
//                                       name="password"
//                                       value={registerData.password}
//                                       onChange={handleRegisterChange}
//                                       required
//                                       className="w-full pl-8 pr-8 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
//                                       placeholder="Min. 8 characters"
//                                     />
//                                     <button
//                                       type="button"
//                                       onClick={() => setShowPassword(!showPassword)}
//                                       className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                                     >
//                                       {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
//                                     </button>
//                                   </div>
//                                 </div>

//                                 <div className="col-span-2 md:col-span-1">
//                                   <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
//                                     Confirm Password <span className="text-[#6B4F3A]">*</span>
//                                   </label>
//                                   <div className="relative">
//                                     <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                                     <input
//                                       type={showConfirmPassword ? "text" : "password"}
//                                       name="confirmPassword"
//                                       value={registerData.confirmPassword}
//                                       onChange={handleRegisterChange}
//                                       required
//                                       className="w-full pl-8 pr-8 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
//                                       placeholder="Re-enter password"
//                                     />
//                                     <button
//                                       type="button"
//                                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                       className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                                     >
//                                       {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
//                                     </button>
//                                   </div>
//                                 </div>
//                               </div>

//                               <div className="flex items-start">
//                                 <input
//                                   type="checkbox"
//                                   name="agreeToTerms"
//                                   id="agreeToTerms"
//                                   checked={registerData.agreeToTerms}
//                                   onChange={handleRegisterChange}
//                                   required
//                                   className="mt-0.5 rounded border-gray-300 text-[#6B4F3A] focus:ring-[#C6A43B] cursor-pointer w-3 h-3"
//                                 />
//                                 <label htmlFor="agreeToTerms" className="ml-1.5 text-[10px] text-gray-600">
//                                   I agree to the <span className="text-[#6B4F3A] hover:underline">Terms</span> & <span className="text-[#6B4F3A] hover:underline">Privacy</span>
//                                 </label>
//                               </div>

//                               <button
//                                 type="submit"
//                                 disabled={loading || !registerData.agreeToTerms}
//                                 className="w-full py-2 px-3 bg-gradient-to-r from-[#6B4F3A] to-[#8B6B51] text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group text-sm"
//                               >
//                                 {loading ? (
//                                   <>
//                                     <Loader2 className="w-4 h-4 animate-spin" />
//                                     Creating...
//                                   </>
//                                 ) : (
//                                   <>
//                                     Create Account
//                                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                                   </>
//                                 )}
//                               </button>

//                               <div className="relative my-3">
//                                 <div className="absolute inset-0 flex items-center">
//                                   <div className="w-full border-t border-gray-200" />
//                                 </div>
//                                 <div className="relative flex justify-center text-[10px]">
//                                   <span className="px-2 bg-white text-gray-500">Or sign up with</span>
//                                 </div>
//                               </div>
//                               <GoogleLoginButtonPopUp 
//                                 mode="signup"
//                                 onSuccess={handleGoogleSuccess}
//                                 onError={handleGoogleError}
//                               />
//                             </form>
//                           )}
//                         </>
//                       )}

//                       {authStep === 'otp' && (
//                         <div className="py-2">
//                           <div className="text-center mb-3">
//                             <div className="w-14 h-14 bg-[#F5E6D3] rounded-full flex items-center justify-center mx-auto mb-2">
//                               <Mail className="w-6 h-6 text-[#6B4F3A]" />
//                             </div>
//                             <p className="text-xs text-gray-600">
//                               We've sent a 6-digit code to<br />
//                               <span className="font-semibold text-[#6B4F3A]">{registeredEmail}</span>
//                             </p>
//                           </div>
//                           <OTPVerification 
//                             email={registeredEmail}
//                             onBack={() => setAuthStep('form')}
//                             onSuccess={handleVerificationSuccess}
//                           />
//                         </div>
//                       )}

//                       {authStep === 'forgot' && (
//                         <ForgotPassword 
//                           onOTPSent={handleForgotOTPSent} 
//                           onBack={handleForgotBack} 
//                         />
//                       )}

//                       {authStep === 'reset-otp' && (
//                         <ResetOTPVerification 
//                           email={forgotEmail}
//                           onBack={handleResetBack}
//                           onSuccess={handleResetOTPVerified}
//                         />
//                       )}

//                       {authStep === 'new-password' && (
//                         <ModalResetPassword 
//                           email={forgotEmail}
//                           otp={resetOTP}
//                           onBack={handleResetBack}
//                           onSuccess={handleResetSuccess}
//                         />
//                       )}
//                     </>
//                   ) : (
//                     userRole === 'admin' || userRole === 'moderator' ? (
//                       <div className="text-center py-6">
//                         <div className="w-14 h-14 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-3">
//                           <Shield className="w-6 h-6 text-gray-400" />
//                         </div>
//                         <h3 className="text-base font-semibold text-gray-900 mb-1 font-serif">
//                           Review Access Restricted
//                         </h3>
//                         <p className="text-xs text-gray-600 mb-2">
//                           {userRole === 'admin' ? 'Admins' : 'Moderators'} cannot write product reviews.
//                         </p>
//                         <p className="text-[10px] text-gray-500">
//                           This feature is available for wholesale customers only.
//                         </p>
//                       </div>
//                     ) : (
//                       <form onSubmit={handleReviewSubmit} className="space-y-3">
//                         <div className="text-center mb-2">
//                           <div className="inline-flex items-center gap-1.5 bg-[#F5E6D3] rounded-full px-2.5 py-0.5 mb-2">
//                             <Star className="w-3 h-3 text-[#C6A43B] fill-[#C6A43B]" />
//                             <span className="text-[10px] font-medium text-[#6B4F3A]">Share Your Experience</span>
//                           </div>
//                           <h3 className="text-base font-semibold text-gray-900 font-serif">Write a Review</h3>
//                         </div>

//                         <div>
//                           <label className="block text-xs font-medium text-gray-700 mb-1">
//                             Your Rating <span className="text-[#6B4F3A]">*</span>
//                           </label>
//                           <div className="flex gap-1.5 justify-center">
//                             {[1, 2, 3, 4, 5].map((rating) => (
//                               <motion.button
//                                 key={rating}
//                                 type="button"
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={() => handleRatingClick(rating)}
//                                 onMouseEnter={() => setHoveredRating(rating)}
//                                 onMouseLeave={() => setHoveredRating(0)}
//                                 className="p-1 rounded-lg transition-all"
//                               >
//                                 <Star
//                                   className={`w-6 h-6 transition-all ${
//                                     rating <= (hoveredRating || formData.rating)
//                                       ? 'fill-[#C6A43B] text-[#C6A43B] scale-110'
//                                       : 'text-gray-300 hover:text-gray-400'
//                                   }`}
//                                 />
//                               </motion.button>
//                             ))}
//                           </div>
//                           {errors.rating && (
//                             <p className="text-red-500 text-[10px] mt-1 flex items-center justify-center gap-1">
//                               <AlertCircle className="w-3 h-3" />
//                               {errors.rating}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-xs font-medium text-gray-700 mb-1">
//                             Select Product <span className="text-gray-400 text-[10px]">(Optional)</span>
//                           </label>
                          
//                           {loadingProducts ? (
//                             <div className="flex items-center justify-center gap-2 p-2 bg-[#FAF7F2] rounded-lg">
//                               <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C6A43B]" />
//                               <span className="text-[10px] text-gray-500">Loading products...</span>
//                             </div>
//                           ) : (
//                             <div className="relative" ref={dropdownRef}>
//                               <div
//                                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                                 className="w-full px-3 py-2 text-sm border border-[#E5D5C0] rounded-lg bg-[#FAF7F2] cursor-pointer flex items-center justify-between hover:border-[#C6A43B] transition-colors"
//                               >
//                                 <span className={`text-xs ${formData.productName ? 'text-gray-900' : 'text-gray-400'}`}>
//                                   {formData.productName || 'Search and select a product...'}
//                                 </span>
//                                 <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
//                               </div>

//                               {isDropdownOpen && (
//                                 <div className="absolute z-10 w-full mt-1 bg-white border border-[#E5D5C0] rounded-lg shadow-lg max-h-48 overflow-hidden">
//                                   <div className="p-1.5 border-b border-[#E5D5C0] bg-[#FAF7F2]">
//                                     <div className="relative">
//                                       <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                                       <input
//                                         type="text"
//                                         value={searchTerm}
//                                         onChange={(e) => setSearchTerm(e.target.value)}
//                                         placeholder="Search products..."
//                                         className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-md focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent outline-none bg-white"
//                                         autoFocus
//                                       />
//                                     </div>
//                                   </div>

//                                   <div className="overflow-y-auto max-h-36">
//                                     {filteredProducts.length > 0 ? (
//                                       filteredProducts.map((product) => (
//                                         <div
//                                           key={product._id}
//                                           onClick={() => handleProductSelect(product)}
//                                           className="px-3 py-1.5 hover:bg-[#F5E6D3] cursor-pointer transition-colors border-b border-[#E5D5C0] last:border-0"
//                                         >
//                                           <p className="text-xs text-gray-700">{product.productName}</p>
//                                         </div>
//                                       ))
//                                     ) : (
//                                       <div className="px-3 py-4 text-center">
//                                         <p className="text-xs text-gray-400">No products found</p>
//                                       </div>
//                                     )}
//                                   </div>
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-xs font-medium text-gray-700 mb-1">
//                             Review Title <span className="text-gray-400 text-[10px]">(Optional)</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="title"
//                             value={formData.title}
//                             onChange={handleReviewChange}
//                             placeholder="Summarize your experience"
//                             maxLength="100"
//                             className="w-full px-3 py-2 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white transition-all"
//                           />
//                           <p className="text-[9px] text-gray-400 mt-0.5 text-right">
//                             {formData.title.length}/100
//                           </p>
//                         </div>

//                         <div>
//                           <label className="block text-xs font-medium text-gray-700 mb-1">
//                             Your Review <span className="text-[#6B4F3A]">*</span>
//                           </label>
//                           <textarea
//                             name="comment"
//                             value={formData.comment}
//                             onChange={handleReviewChange}
//                             placeholder="Share details about your experience..."
//                             rows="3"
//                             maxLength="500"
//                             className="w-full px-3 py-2 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white transition-all resize-none"
//                           />
//                           <p className="text-[9px] text-gray-400 mt-0.5 text-right">
//                             {formData.comment.length}/500
//                           </p>
//                         </div>

//                         <label className="flex items-center cursor-pointer p-2 bg-[#FAF7F2] rounded-lg hover:bg-[#F5E6D3] transition-colors">
//                           <input
//                             type="checkbox"
//                             name="anonymous"
//                             checked={formData.anonymous}
//                             onChange={handleReviewChange}
//                             className="rounded border-gray-300 text-[#6B4F3A] focus:ring-[#C6A43B] cursor-pointer w-3 h-3"
//                           />
//                           <span className="ml-2 text-[10px] text-gray-600">
//                             Post as anonymous (your name won't be displayed)
//                           </span>
//                         </label>

//                         {errors.submit && (
//                           <div className="bg-red-50 border border-red-200 rounded-lg p-2">
//                             <p className="text-red-600 text-[10px] flex items-center gap-1">
//                               <AlertCircle className="w-3 h-3" />
//                               {errors.submit}
//                             </p>
//                           </div>
//                         )}

//                         <div className="flex gap-2 pt-2">
//                           <button
//                             type="button"
//                             onClick={onClose}
//                             className="flex-1 py-2 px-3 border-2 border-[#E5D5C0] text-gray-700 font-semibold rounded-lg hover:bg-[#FAF7F2] transition-all text-xs"
//                           >
//                             Cancel
//                           </button>
//                           <button
//                             type="submit"
//                             disabled={loading}
//                             className="flex-1 py-2 px-3 bg-gradient-to-r from-[#6B4F3A] to-[#8B6B51] text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 group text-xs"
//                           >
//                             {loading ? (
//                               <>
//                                 <Loader2 className="w-3.5 h-3.5 animate-spin" />
//                                 Submitting...
//                               </>
//                             ) : (
//                               <>
//                                 Submit Review
//                                 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
//                               </>
//                             )}
//                           </button>
//                         </div>

//                         <p className="text-[9px] text-gray-400 text-center mt-2">
//                           Your review will be published after moderation to ensure quality
//                         </p>
//                       </form>
//                     )
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, AlertCircle, CheckCircle } from 'lucide-react';

export default function ReviewModal({ isOpen, onClose, onReviewSubmitted }) {
  const [formData, setFormData] = useState({
    reviewerName: '',
    email: '',
    rating: 0,
    productId: '',
    title: '',
    comment: ''
  });
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Fetch user data if logged in
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:5000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log('User data response:', data); // Debug log
            
            // Handle different response structures
            let userInfo = null;
            if (data.success && data.data) {
              userInfo = data.data;
            } else if (data.user) {
              userInfo = data.user;
            } else if (data.data) {
              userInfo = data.data;
            } else {
              userInfo = data;
            }
            
            if (userInfo) {
              setIsLoggedIn(true);
              setUserData(userInfo);
              
              // Safely get the name from user info
              const userName = userInfo.contactPerson || 
                              userInfo.companyName || 
                              (userInfo.email ? userInfo.email.split('@')[0] : '') || 
                              'User';
              
              const userEmail = userInfo.email || '';
              
              setFormData(prev => ({
                ...prev,
                reviewerName: userName,
                email: userEmail
              }));
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    if (isOpen) {
      fetchUserData();
      fetchProducts();
    }
  }, [isOpen]);

  // Fetch products for dropdown
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products?limit=100');
      const data = await response.json();
      if (data.success) {
        setProducts(data.data || []);
      } else if (Array.isArray(data)) {
        setProducts(data);
      } else if (data.products) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validation
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

    try {
      const token = localStorage.getItem('token');
      
      // Prepare request body according to backend expectations
      const requestBody = {
        rating: formData.rating,
        title: formData.title.trim() || '',
        comment: formData.comment.trim(),
        isAnonymous: false
      };

      // Add productId if selected
      if (formData.productId) {
        requestBody.productId = formData.productId;
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
        setSuccess('Your review has been submitted successfully and will be published after moderation!');
        setTimeout(() => {
          onReviewSubmitted?.();
          onClose();
          resetForm();
        }, 2000);
      } else {
        setError(data.error || data.message || 'Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      reviewerName: userData?.contactPerson || userData?.companyName || '',
      email: userData?.email || '',
      rating: 0,
      productId: '',
      title: '',
      comment: ''
    });
    setError('');
    setSuccess('');
    setHoveredRating(0);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 font-serif">Give Feedback</h2>
                  <p className="text-sm text-gray-500 mt-1">Share your experience with us</p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Form Body */}
              <div className="p-6">
                {/* Success Message */}
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
                  {/* Reviewer Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="reviewerName"
                      value={formData.reviewerName}
                      onChange={handleChange}
                      disabled={isLoggedIn}
                      className={`w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition-all ${
                        isLoggedIn ? 'bg-gray-50 text-gray-500' : ''
                      }`}
                      placeholder="Enter your full name"
                      required
                    />
                    {isLoggedIn && (
                      <p className="text-xs text-gray-400 mt-1">Auto-filled from your account</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoggedIn}
                      className={`w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition-all ${
                        isLoggedIn ? 'bg-gray-50 text-gray-500' : ''
                      }`}
                      placeholder="your@email.com"
                      required
                    />
                    {isLoggedIn && (
                      <p className="text-xs text-gray-400 mt-1">Auto-filled from your account</p>
                    )}
                  </div>

                  {/* Rating Stars */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                                ? 'fill-[#C6A43B] text-[#C6A43B]'
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

                  {/* Select Product (Optional) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Product (Optional)
                    </label>
                    <select
                      name="productId"
                      value={formData.productId}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">-- Select a product (optional) --</option>
                      {products.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.productName}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-400 mt-1">If your review is about a specific product</p>
                  </div>

                  {/* Review Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Review Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition-all"
                      placeholder="e.g., Great quality product!"
                      maxLength={100}
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      {formData.title.length}/100 characters
                    </p>
                  </div>

                  {/* Your Review */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Review *
                    </label>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Share your experience with our products and services..."
                      minLength={10}
                      maxLength={500}
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Minimum 10 characters • {formData.comment.length}/500 characters
                    </p>
                  </div>

                  {/* Note */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-xs text-blue-700">
                      📝 <strong>Note:</strong> Your review will be reviewed by our team before being published. 
                      This helps us maintain quality and authenticity. Thank you for your understanding!
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#4A7C59] to-[#5D9B6B] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </div>
                      ) : (
                        'Submit Review'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}