
// 'use client';

// import { useState, useEffect, useCallback, useRef } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   ShoppingCart,
//   Trash2,
//   Plus,
//   Minus,
//   ArrowLeft,
//   CreditCard,
//   Truck,
//   ShieldCheck,
//   RefreshCw,
//   AlertCircle,
//   Loader2,
//   ChevronRight,
//   Heart,
//   Gift
// } from 'lucide-react';
// import { toast } from 'sonner';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import WhatsAppButton from '../components/layout/WhatsAppButton';

// const TOY_COLORS = {
//   primary: '#4A8A90',
//   secondary: '#FFB6C1',
//   accent: '#FFD93D',
//   lightBg: '#FFF9F0',
//   border: '#FFE0E6'
// };

// export default function CartPage() {
//   const router = useRouter();
//   const [cart, setCart] = useState({ items: [], totalItems: 0, subtotal: 0 });
//   const [loading, setLoading] = useState(true);
//   const [updatingItems, setUpdatingItems] = useState({});
//   const [isClearing, setIsClearing] = useState(false);
//   const fetchInProgress = useRef(false);
//   const lastCartState = useRef(null);

//   // Fetch cart function with deduplication
//   const fetchCart = useCallback(async (silent = false) => {
//     // Prevent multiple simultaneous fetches
//     if (fetchInProgress.current) {
//       console.log('Fetch already in progress, skipping');
//       return;
//     }
    
//     fetchInProgress.current = true;
//     if (!silent) setLoading(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       console.log('Fetching cart - Token exists:', !!token);
//       console.log('Fetching cart - SessionId:', sessionId);
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch('http://localhost:5000/api/cart', { headers });
//       const data = await response.json();
      
//       console.log('Cart response:', data);
      
//       if (data.success) {
//         // Only update if the new cart is different
//         const newCart = data.data;
//         const newCartStr = JSON.stringify(newCart);
//         const oldCartStr = JSON.stringify(cart);
        
//         if (newCartStr !== oldCartStr) {
//           console.log('Updating cart with new data');
//           setCart(newCart);
//           lastCartState.current = newCart;
//         } else {
//           console.log('Cart data unchanged, skipping update');
//         }
//       } else {
//         setCart({ items: [], totalItems: 0, subtotal: 0 });
//       }
//     } catch (error) {
//       console.error('Fetch cart error:', error);
//       if (!silent) toast.error('Failed to load cart');
//     } finally {
//       fetchInProgress.current = false;
//       if (!silent) setLoading(false);
//     }
//   }, [cart]);

//   // Fetch cart on mount
//   useEffect(() => {
//     fetchCart();
//   }, []);

//   // Refresh cart when page gets focus or cart updates - with debounce
//   useEffect(() => {
//     let debounceTimer;
    
//     const handleFocus = () => {
//       clearTimeout(debounceTimer);
//       debounceTimer = setTimeout(() => {
//         fetchCart(true);
//       }, 500);
//     };
    
//     const handleCartUpdate = () => {
//       clearTimeout(debounceTimer);
//       debounceTimer = setTimeout(() => {
//         fetchCart(true);
//       }, 300);
//     };
    
//     window.addEventListener('focus', handleFocus);
//     window.addEventListener('cart-update', handleCartUpdate);
    
//     return () => {
//       window.removeEventListener('focus', handleFocus);
//       window.removeEventListener('cart-update', handleCartUpdate);
//       clearTimeout(debounceTimer);
//     };
//   }, [fetchCart]);

//   // Add this useEffect to your CartPage component
// useEffect(() => {
//   // Listen for auth changes (login/logout)
//   const handleAuthChange = () => {
//     fetchCart();
//   };
  
//   window.addEventListener('auth-change', handleAuthChange);
  
//   return () => {
//     window.removeEventListener('auth-change', handleAuthChange);
//   };
// }, [fetchCart]);

// const updateQuantity = async (itemId, newQuantity) => {
//   if (newQuantity < 1) {
//     removeItem(itemId);
//     return;
//   }
  
//   setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
  
//   // Store current cart for rollback
//   const previousCart = { ...cart };
  
//   // Optimistically update the UI
//   setCart(prevCart => {
//     const updatedItems = prevCart.items.map(item => {
//       if (item._id === itemId) {
//         return { ...item, quantity: newQuantity };
//       }
//       return item;
//     });
    
//     // totalItems should remain the SAME (number of unique products)
//     // Only subtotal changes when quantity changes
//     const newTotalItems = updatedItems.length; // This is the key fix - use length not sum of quantities
//     const newSubtotal = updatedItems.reduce((sum, item) => {
//       const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
//       return sum + (price * item.quantity);
//     }, 0);
    
//     return {
//       ...prevCart,
//       items: updatedItems,
//       totalItems: newTotalItems,
//       subtotal: newSubtotal
//     };
//   });
  
//   try {
//     const token = localStorage.getItem('token');
//     const sessionId = localStorage.getItem('cartSessionId');
//     const headers = {
//       'Content-Type': 'application/json'
//     };
    
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     } else if (sessionId) {
//       headers['x-session-id'] = sessionId;
//     }
    
//     const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
//       method: 'PUT',
//       headers,
//       body: JSON.stringify({ quantity: newQuantity })
//     });
    
//     const data = await response.json();
    
//     if (data.success) {
//       setCart(data.data);
//       window.dispatchEvent(new Event('cart-update'));
//       toast.success('Cart updated');
//     } else {
//       // Revert on error
//       setCart(previousCart);
//       toast.error(data.error || 'Failed to update quantity');
//     }
//   } catch (error) {
//     console.error('Update quantity error:', error);
//     setCart(previousCart);
//     toast.error('Failed to update quantity');
//   } finally {
//     setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
//   }
// };

// const removeItem = async (itemId) => {
//   setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
  
//   // Store current cart for rollback
//   const previousCart = { ...cart };
  
//   // Optimistically update UI
//   setCart(prevCart => {
//     const updatedItems = prevCart.items.filter(item => item._id !== itemId);
//     // totalItems should be the number of items after removal (length of updatedItems)
//     const newTotalItems = updatedItems.length;
//     const newSubtotal = updatedItems.reduce((sum, item) => {
//       const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
//       return sum + (price * item.quantity);
//     }, 0);
    
//     return {
//       ...prevCart,
//       items: updatedItems,
//       totalItems: newTotalItems,
//       subtotal: newSubtotal
//     };
//   });
  
//   try {
//     const token = localStorage.getItem('token');
//     const sessionId = localStorage.getItem('cartSessionId');
//     const headers = {};
    
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     } else if (sessionId) {
//       headers['x-session-id'] = sessionId;
//     }
    
//     const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
//       method: 'DELETE',
//       headers
//     });
    
//     const data = await response.json();
    
//     if (data.success) {
//       setCart(data.data);
//       window.dispatchEvent(new Event('cart-update'));
//       toast.success('Item removed from cart');
//     } else {
//       // Revert on error
//       setCart(previousCart);
//       toast.error(data.error || 'Failed to remove item');
//     }
//   } catch (error) {
//     console.error('Remove item error:', error);
//     setCart(previousCart);
//     toast.error('Failed to remove item');
//   } finally {
//     setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
//   }
// };

//   const clearCart = async () => {
//     if (!confirm('Are you sure you want to clear your cart?')) return;
    
//     setIsClearing(true);
    
//     // Store current cart for rollback
//     const previousCart = { ...cart };
    
//     // Optimistically clear UI
//     setCart({ items: [], totalItems: 0, subtotal: 0 });
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'DELETE',
//         headers
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success('Cart cleared');
//       } else {
//         // Revert on error
//         setCart(previousCart);
//         toast.error(data.error || 'Failed to clear cart');
//       }
//     } catch (error) {
//       console.error('Clear cart error:', error);
//       setCart(previousCart);
//       toast.error('Failed to clear cart');
//     } finally {
//       setIsClearing(false);
//     }
//   };

//   const proceedToCheckout = () => {
//     if (!cart?.items?.length) {
//       toast.error('Your cart is empty');
//       return;
//     }
//     router.push('/checkout');
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-[#FFF9F0] pt-24">
//           <div className="container mx-auto px-4 max-w-6xl">
//             <div className="flex items-center justify-center py-20">
//               <Loader2 className="w-8 h-8 text-[#4A8A90] animate-spin" />
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const hasItems = cart?.items?.length > 0;

//   return (
//     <>
//       <Navbar />
      
//       <div className="min-h-screen bg-[#FFF9F0] pt-10 pb-12">
//         <div className="container mx-auto px-4 max-w-6xl">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-3">
//               <ShoppingCart className="w-7 h-7 text-[#4A8A90]" />
//               <h1 className="text-2xl md:text-3xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                 My Toy Cart
//               </h1>
//               {hasItems && (
//                 <span className="bg-[#4A8A90] text-white text-sm font-bold px-3 py-1 rounded-full">
//                   {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'}
//                 </span>
//               )}
//             </div>
//             <Link href="/products" className="flex items-center gap-2 text-[#4A8A90] hover:text-[#FFB6C1] transition-colors">
//               <ArrowLeft className="w-4 h-4" />
//               <span>Continue Shopping</span>
//             </Link>
//           </div>

//           {!hasItems ? (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-2xl border-2 border-[#FFE0E6] p-12 text-center shadow-md"
//             >
//               <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#D4EDEE] to-[#FFE0E6] rounded-full flex items-center justify-center">
//                 <ShoppingCart className="w-16 h-16 text-[#4A8A90]" />
//               </div>
//               <h2 className="text-2xl font-bold text-[#2D3A5C] mb-2">Your Cart is Empty!</h2>
//               <p className="text-gray-500 mb-6">Looks like you haven't added any toys to your cart yet.</p>
//               <Link
//                 href="/products"
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white font-bold rounded-full hover:from-[#3A7A80] hover:to-[#5B9399] transition-all shadow-md"
//               >
//                 <Gift className="w-4 h-4" />
//                 Start Shopping
//               </Link>
//             </motion.div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Cart Items */}
//               <div className="lg:col-span-2 space-y-4">
//                 <AnimatePresence>
//                   {cart.items.map((item, index) => {
//                     const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
//                     const totalPrice = price * item.quantity;
                    
//                     return (
//                       <motion.div
//                         key={item._id}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, x: 20 }}
//                         transition={{ delay: index * 0.05 }}
//                         className="bg-white rounded-xl border border-[#FFE0E6] p-4 hover:shadow-md transition-shadow"
//                       >
//                         <div className="flex gap-4">
//                           <Link href={`/productDetails?id=${item.productId}`} className="flex-shrink-0">
//                             <div className="w-24 h-24 bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6] rounded-lg overflow-hidden">
//                               <img
//                                 src={item.image || 'https://via.placeholder.com/100'}
//                                 alt={item.productName}
//                                 className="w-full h-full object-contain p-2"
//                                 onError={(e) => {
//                                   e.target.src = 'https://via.placeholder.com/100?text=Toy';
//                                 }}
//                               />
//                             </div>
//                           </Link>
                          
//                           <div className="flex-1">
//                             <Link href={`/productDetails?id=${item.productId}`}>
//                               <h3 className="font-bold text-[#2D3A5C] hover:text-[#4A8A90] transition-colors line-clamp-2">
//                                 {item.productName}
//                               </h3>
//                             </Link>
                            
//                             <div className="flex items-center gap-2 mt-1">
//                               <span className="text-lg font-bold text-[#4A8A90]">
//                                 ৳{price.toFixed(2)}
//                               </span>
//                               {item.discountPrice > 0 && (
//                                 <span className="text-xs text-gray-400 line-through">
//                                   ৳{item.regularPrice.toFixed(2)}
//                                 </span>
//                               )}
//                             </div>
                            
//                             {item.stockQuantity <= 10 && item.stockQuantity > 0 && (
//                               <p className="text-xs text-orange-500 mt-1">
//                                 Only {item.stockQuantity} left in stock
//                               </p>
//                             )}
                            
//                             <div className="flex items-center gap-3 mt-3">
//                               <div className="flex items-center border border-[#FFE0E6] rounded-lg overflow-hidden">
//                                 <button
//                                   onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                                   disabled={updatingItems[item._id]}
//                                   className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 transition-colors"
//                                 >
//                                   <Minus className="w-3 h-3" />
//                                 </button>
//                                 <span className="w-10 text-center text-sm font-medium">
//                                   {updatingItems[item._id] ? (
//                                     <Loader2 className="w-3 h-3 animate-spin mx-auto" />
//                                   ) : (
//                                     item.quantity
//                                   )}
//                                 </span>
//                                 <button
//                                   onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                                   disabled={updatingItems[item._id] || item.quantity >= item.stockQuantity}
//                                   className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 transition-colors"
//                                 >
//                                   <Plus className="w-3 h-3" />
//                                 </button>
//                               </div>
                              
//                               <button
//                                 onClick={() => removeItem(item._id)}
//                                 disabled={updatingItems[item._id]}
//                                 className="text-red-400 hover:text-red-600 transition-colors"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>
                          
//                           <div className="text-right">
//                             <p className="font-bold text-[#4A8A90] text-lg">
//                               ৳{totalPrice.toFixed(2)}
//                             </p>
//                             <p className="text-xs text-gray-400 mt-1">
//                               ৳{price.toFixed(2)} each
//                             </p>
//                           </div>
//                         </div>
//                       </motion.div>
//                     );
//                   })}
//                 </AnimatePresence>
                
//                 <button
//                   onClick={clearCart}
//                   disabled={isClearing}
//                   className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors text-sm mt-2 disabled:opacity-50"
//                 >
//                   {isClearing ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <Trash2 className="w-4 h-4" />
//                   )}
//                   Clear Cart
//                 </button>
//               </div>
              
//               {/* Order Summary */}
//               <div className="lg:col-span-1">
//                 <motion.div 
//                   key={`${cart.totalItems}-${Date.now()}`}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="bg-white rounded-xl border-2 border-[#FFE0E6] p-6 sticky top-24 shadow-md"
//                 >
//                   <h2 className="text-lg font-bold text-[#2D3A5C] mb-4">Order Summary</h2>
                  
//                   <div className="space-y-3 border-b border-[#FFE0E6] pb-4">
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600">Subtotal</span>
//                       <div className="text-right">
//                         <span className="font-medium">৳{(cart.subtotal || 0).toFixed(2)}</span>
//                         <p className="text-xs text-gray-400">({cart.totalItems || 0} {cart.totalItems === 1 ? 'item' : 'items'})</p>
//                       </div>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Shipping</span>
//                       <span className="text-green-600 font-medium">Free</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Tax</span>
//                       <span className="font-medium">৳0.00</span>
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-between items-center mt-4 pb-4 border-b border-[#FFE0E6]">
//                     <span className="text-lg font-bold text-[#2D3A5C]">Total</span>
//                     <div className="text-right">
//                       <span className="text-2xl font-bold text-[#4A8A90]">
//                         ৳{(cart.subtotal || 0).toFixed(2)}
//                       </span>
//                       <p className="text-xs text-gray-400">Including all taxes</p>
//                     </div>
//                   </div>
                  
//                   <div className="mt-4 space-y-2 text-sm">
//                     <div className="flex items-center gap-2 text-green-600">
//                       <Truck className="w-4 h-4" />
//                       <span>Free delivery on all orders</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-500">
//                       <ShieldCheck className="w-4 h-4" />
//                       <span>Safe & Secure Shopping</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-500">
//                       <RefreshCw className="w-4 h-4" />
//                       <span>7-Day Return Policy</span>
//                     </div>
//                   </div>
                  
//                   <button
//                     onClick={proceedToCheckout}
//                     className="w-full mt-6 py-3 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white font-bold rounded-full hover:from-[#3A7A80] hover:to-[#5B9399] transition-all flex items-center justify-center gap-2 shadow-md"
//                   >
//                     <CreditCard className="w-4 h-4" />
//                     Proceed to Checkout
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
                  
//                   <div className="mt-4 p-3 bg-[#FFF9F0] rounded-lg border border-[#FFE0E6]">
//                     <div className="flex items-center gap-2">
//                       <span className="text-xl">💰</span>
//                       <div>
//                         <p className="text-xs font-medium text-gray-700">Cash on Delivery Available</p>
//                         <p className="text-xs text-gray-500">Pay when you receive your toys</p>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
      
//       <Footer />
//       <WhatsAppButton />
//     </>
//   );
// }


'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  Loader2,
  ChevronRight,
  Heart,
  Gift,
  Package
} from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/layout/WhatsAppButton';

const TOY_COLORS = {
  primary: '#4A8A90',
  secondary: '#FFB6C1',
  accent: '#FFD93D',
  lightBg: '#FFF9F0',
  border: '#FFE0E6'
};

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState({ items: [], totalItems: 0, subtotal: 0 });
  const [loading, setLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState({});
  const [isClearing, setIsClearing] = useState(false);
  const fetchInProgress = useRef(false);
  const lastCartState = useRef(null);

  // Fetch cart function with deduplication
  const fetchCart = useCallback(async (silent = false) => {
    if (fetchInProgress.current) {
      console.log('Fetch already in progress, skipping');
      return;
    }
    
    fetchInProgress.current = true;
    if (!silent) setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      
      console.log('Fetching cart - Token exists:', !!token);
      console.log('Fetching cart - SessionId:', sessionId);
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch('http://localhost:5000/api/cart', { headers });
      const data = await response.json();
      
      console.log('Cart response:', data);
      
      if (data.success) {
        const newCart = data.data;
        const newCartStr = JSON.stringify(newCart);
        const oldCartStr = JSON.stringify(cart);
        
        if (newCartStr !== oldCartStr) {
          console.log('Updating cart with new data');
          setCart(newCart);
          lastCartState.current = newCart;
        } else {
          console.log('Cart data unchanged, skipping update');
        }
      } else {
        setCart({ items: [], totalItems: 0, subtotal: 0 });
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
      if (!silent) toast.error('Failed to load cart');
    } finally {
      fetchInProgress.current = false;
      if (!silent) setLoading(false);
    }
  }, [cart]);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Refresh cart when page gets focus or cart updates - with debounce
  useEffect(() => {
    let debounceTimer;
    
    const handleFocus = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        fetchCart(true);
      }, 500);
    };
    
    const handleCartUpdate = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        fetchCart(true);
      }, 300);
    };
    
    window.addEventListener('focus', handleFocus);
    window.addEventListener('cart-update', handleCartUpdate);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('cart-update', handleCartUpdate);
      clearTimeout(debounceTimer);
    };
  }, [fetchCart]);

  // Listen for auth changes (login/logout)
  useEffect(() => {
    const handleAuthChange = () => {
      fetchCart();
    };
    
    window.addEventListener('auth-change', handleAuthChange);
    
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, [fetchCart]);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }
    
    // Find the item to check stock limit
    const currentItem = cart.items.find(item => item._id === itemId);
    if (currentItem && newQuantity > currentItem.stockQuantity) {
      toast.error(`Only ${currentItem.stockQuantity} items available in stock`);
      return;
    }
    
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    
    // Store current cart for rollback
    const previousCart = { ...cart };
    
    // Optimistically update the UI
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item => {
        if (item._id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      
      const newTotalItems = updatedItems.length;
      const newSubtotal = updatedItems.reduce((sum, item) => {
        const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
        return sum + (price * item.quantity);
      }, 0);
      
      return {
        ...prevCart,
        items: updatedItems,
        totalItems: newTotalItems,
        subtotal: newSubtotal
      };
    });
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ quantity: newQuantity })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        window.dispatchEvent(new Event('cart-update'));
        toast.success('Cart updated');
      } else {
        setCart(previousCart);
        toast.error(data.error || 'Failed to update quantity');
      }
    } catch (error) {
      console.error('Update quantity error:', error);
      setCart(previousCart);
      toast.error('Failed to update quantity');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const removeItem = async (itemId) => {
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    
    const previousCart = { ...cart };
    
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item._id !== itemId);
      const newTotalItems = updatedItems.length;
      const newSubtotal = updatedItems.reduce((sum, item) => {
        const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
        return sum + (price * item.quantity);
      }, 0);
      
      return {
        ...prevCart,
        items: updatedItems,
        totalItems: newTotalItems,
        subtotal: newSubtotal
      };
    });
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: 'DELETE',
        headers
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        window.dispatchEvent(new Event('cart-update'));
        toast.success('Item removed from cart');
      } else {
        setCart(previousCart);
        toast.error(data.error || 'Failed to remove item');
      }
    } catch (error) {
      console.error('Remove item error:', error);
      setCart(previousCart);
      toast.error('Failed to remove item');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const clearCart = async () => {
    if (!confirm('Are you sure you want to clear your cart?')) return;
    
    setIsClearing(true);
    const previousCart = { ...cart };
    setCart({ items: [], totalItems: 0, subtotal: 0 });
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'DELETE',
        headers
      });
      
      const data = await response.json();
      
      if (data.success) {
        window.dispatchEvent(new Event('cart-update'));
        toast.success('Cart cleared');
      } else {
        setCart(previousCart);
        toast.error(data.error || 'Failed to clear cart');
      }
    } catch (error) {
      console.error('Clear cart error:', error);
      setCart(previousCart);
      toast.error('Failed to clear cart');
    } finally {
      setIsClearing(false);
    }
  };

  const proceedToCheckout = () => {
    if (!cart?.items?.length) {
      toast.error('Your cart is empty');
      return;
    }
    router.push('/checkout');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#FFF9F0] pt-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-[#4A8A90] animate-spin" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const hasItems = cart?.items?.length > 0;

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-[#FFF9F0] pt-10 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-7 h-7 text-[#4A8A90]" />
              <h1 className="text-2xl md:text-3xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                My Toy Cart
              </h1>
              {hasItems && (
                <span className="bg-[#4A8A90] text-white text-sm font-bold px-3 py-1 rounded-full">
                  {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'}
                </span>
              )}
            </div>
            <Link href="/products" className="flex items-center gap-2 text-[#4A8A90] hover:text-[#FFB6C1] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {!hasItems ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border-2 border-[#FFE0E6] p-12 text-center shadow-md"
            >
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#D4EDEE] to-[#FFE0E6] rounded-full flex items-center justify-center">
                <ShoppingCart className="w-16 h-16 text-[#4A8A90]" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D3A5C] mb-2">Your Cart is Empty!</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any toys to your cart yet.</p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white font-bold rounded-full hover:from-[#3A7A80] hover:to-[#5B9399] transition-all shadow-md"
              >
                <Gift className="w-4 h-4" />
                Start Shopping
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {cart.items.map((item, index) => {
                    const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
                    const totalPrice = price * item.quantity;
                    const isLowStock = item.stockQuantity <= 10;
                    const isOutOfStock = item.stockQuantity === 0;
                    
                    return (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-xl border border-[#FFE0E6] p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <Link href={`/productDetails?id=${item.productId}`} className="flex-shrink-0">
                            <div className="w-24 h-24 bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6] rounded-lg overflow-hidden">
                              <img
                                src={item.image || 'https://via.placeholder.com/100'}
                                alt={item.productName}
                                className="w-full h-full object-contain p-2"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/100?text=Toy';
                                }}
                              />
                            </div>
                          </Link>
                          
                          {/* Product Info */}
                          <div className="flex-1">
                            <Link href={`/productDetails?id=${item.productId}`}>
                              <h3 className="font-bold text-[#2D3A5C] hover:text-[#4A8A90] transition-colors line-clamp-2">
                                {item.productName}
                              </h3>
                            </Link>
                            
                            {/* Price */}
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-lg font-bold text-[#4A8A90]">
                                ৳{price.toFixed(2)}
                              </span>
                              {item.discountPrice > 0 && (
                                <span className="text-xs text-gray-400 line-through">
                                  ৳{item.regularPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            
                            {/* Stock Status with Icon */}
                            <div className="flex items-center gap-2 mt-2">
                              <Package className="w-3.5 h-3.5 text-gray-400" />
                              {isOutOfStock ? (
                                <span className="text-xs text-red-500 font-medium">
                                  Out of Stock
                                </span>
                              ) : isLowStock ? (
                                <span className="text-xs text-orange-500 font-medium">
                                  Only {item.stockQuantity} left in stock
                                </span>
                              ) : (
                                <span className="text-xs text-green-600">
                                  In Stock ({item.stockQuantity} available)
                                </span>
                              )}
                            </div>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 mt-3">
                              <div className="flex items-center border border-[#FFE0E6] rounded-lg overflow-hidden">
                                <button
                                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                  disabled={updatingItems[item._id] || item.quantity <= 1}
                                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-10 text-center text-sm font-medium">
                                  {updatingItems[item._id] ? (
                                    <Loader2 className="w-3 h-3 animate-spin mx-auto" />
                                  ) : (
                                    item.quantity
                                  )}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                  disabled={updatingItems[item._id] || item.quantity >= item.stockQuantity}
                                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              
                              <button
                                onClick={() => removeItem(item._id)}
                                disabled={updatingItems[item._id]}
                                className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Item Total */}
                          <div className="text-right">
                            <p className="font-bold text-[#4A8A90] text-lg">
                              ৳{totalPrice.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              ৳{price.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                
                {/* Clear Cart Button */}
                <button
                  onClick={clearCart}
                  disabled={isClearing}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors text-sm mt-2 disabled:opacity-50"
                >
                  {isClearing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  Clear Cart
                </button>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div 
                  key={`${cart.totalItems}-${Date.now()}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl border-2 border-[#FFE0E6] p-6 sticky top-24 shadow-md"
                >
                  <h2 className="text-lg font-bold text-[#2D3A5C] mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 border-b border-[#FFE0E6] pb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal</span>
                      <div className="text-right">
                        <span className="font-medium">৳{(cart.subtotal || 0).toFixed(2)}</span>
                        <p className="text-xs text-gray-400">({cart.totalItems || 0} {cart.totalItems === 1 ? 'item' : 'items'})</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">৳0.00</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 pb-4 border-b border-[#FFE0E6]">
                    <span className="text-lg font-bold text-[#2D3A5C]">Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#4A8A90]">
                        ৳{(cart.subtotal || 0).toFixed(2)}
                      </span>
                      <p className="text-xs text-gray-400">Including all taxes</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-green-600">
                      <Truck className="w-4 h-4" />
                      <span>Free delivery on all orders</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Safe & Secure Shopping</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <RefreshCw className="w-4 h-4" />
                      <span>7-Day Return Policy</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={proceedToCheckout}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white font-bold rounded-full hover:from-[#3A7A80] hover:to-[#5B9399] transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <CreditCard className="w-4 h-4" />
                    Proceed to Checkout
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  
                  <div className="mt-4 p-3 bg-[#FFF9F0] rounded-lg border border-[#FFE0E6]">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💰</span>
                      <div>
                        <p className="text-xs font-medium text-gray-700">Cash on Delivery Available</p>
                        <p className="text-xs text-gray-500">Pay when you receive your toys</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
      <WhatsAppButton />
    </>
  );
}