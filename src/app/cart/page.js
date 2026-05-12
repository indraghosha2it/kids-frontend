'use client';

import { useState, useEffect } from 'react';
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
  Gift
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
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState({});
  const [sessionId, setSessionId] = useState(null);

  // Get session ID on mount
  useEffect(() => {
    const storedSessionId = localStorage.getItem('cartSessionId');
    setSessionId(storedSessionId);
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch('http://localhost:5000/api/cart', { headers });
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }
    
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    
    try {
      const token = localStorage.getItem('token');
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
      }
    } catch (error) {
      console.error('Update quantity error:', error);
      toast.error('Failed to update quantity');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const removeItem = async (itemId) => {
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    
    try {
      const token = localStorage.getItem('token');
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
      }
    } catch (error) {
      console.error('Remove item error:', error);
      toast.error('Failed to remove item');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const clearCart = async () => {
    if (!confirm('Are you sure you want to clear your cart?')) return;
    
    try {
      const token = localStorage.getItem('token');
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
        setCart({ items: [], totalItems: 0, subtotal: 0 });
        window.dispatchEvent(new Event('cart-update'));
        toast.success('Cart cleared');
      }
    } catch (error) {
      console.error('Clear cart error:', error);
      toast.error('Failed to clear cart');
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
            </div>
            <Link href="/products" className="flex items-center gap-2 text-[#4A8A90] hover:text-[#FFB6C1] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {!hasItems ? (
            // Empty Cart
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
                {cart.items.map((item, index) => {
                  const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
                  const totalPrice = price * item.quantity;
                  
                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
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
                          
                          {/* Stock Status */}
                          {item.stockQuantity <= 10 && item.stockQuantity > 0 && (
                            <p className="text-xs text-orange-500 mt-1">
                              Only {item.stockQuantity} left in stock
                            </p>
                          )}
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center border border-[#FFE0E6] rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                disabled={updatingItems[item._id]}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-10 text-center text-sm">
                                {updatingItems[item._id] ? (
                                  <Loader2 className="w-3 h-3 animate-spin mx-auto" />
                                ) : (
                                  item.quantity
                                )}
                              </span>
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                disabled={updatingItems[item._id] || item.quantity >= item.stockQuantity}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item._id)}
                              disabled={updatingItems[item._id]}
                              className="text-red-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Item Total */}
                        <div className="text-right">
                          <p className="font-bold text-[#4A8A90]">
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
                
                {/* Clear Cart Button */}
                <button
                  onClick={clearCart}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors text-sm mt-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Cart
                </button>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-6 sticky top-24 shadow-md">
                  <h2 className="text-lg font-bold text-[#2D3A5C] mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 border-b border-[#FFE0E6] pb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({cart.totalItems} items)</span>
                      <span className="font-medium">৳{cart.subtotal?.toFixed(2) || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">৳0.00</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4 pb-4 border-b border-[#FFE0E6]">
                    <span className="text-lg font-bold text-[#2D3A5C]">Total</span>
                    <span className="text-xl font-bold text-[#4A8A90]">
                      ৳{cart.subtotal?.toFixed(2) || 0}
                    </span>
                  </div>
                  
                  {/* Delivery Info */}
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
                  
                  {/* Checkout Button */}
                  <button
                    onClick={proceedToCheckout}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white font-bold rounded-full hover:from-[#3A7A80] hover:to-[#5B9399] transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <CreditCard className="w-4 h-4" />
                    Proceed to Checkout
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  
                  {/* COD Info */}
                  <div className="mt-4 p-3 bg-[#FFF9F0] rounded-lg border border-[#FFE0E6]">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💰</span>
                      <div>
                        <p className="text-xs font-medium text-gray-700">Cash on Delivery Available</p>
                        <p className="text-xs text-gray-500">Pay when you receive your toys</p>
                      </div>
                    </div>
                  </div>
                </div>
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