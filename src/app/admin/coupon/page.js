'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { 
  Plus, 
  X, 
  Save, 
  ArrowLeft,
  Ticket,
  Percent,
  DollarSign,
  Truck,
  Calendar,
  Users,
  ShoppingBag,
  AlertCircle,
  Loader2,
  Hash,
  Palette,
  Type,
  Clock,
  Infinity,
  Gift,
  Tag,
  Eye,
  CheckCircle,
  Minus,
  Copy,
  RefreshCw,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

// Coupon Types
const DISCOUNT_TYPES = [
  { value: 'percentage', label: 'Discount %', icon: Percent, color: '#4A8A90', description: 'Apply percentage discount (e.g., 20% off)' },
  { value: 'fixed', label: 'Fixed Amount', icon: DollarSign, color: '#FFB6C1', description: 'Apply fixed amount discount (e.g., ৳500 off)' },
  { value: 'free_shipping', label: 'Free Shipping', icon: Truck, color: '#FFD93D', description: 'Free shipping on the order' }
];

// Color Themes
const COLOR_THEMES = [
  { name: 'Kids Play', primary: '#4A8A90', secondary: '#D4EDEE', accent: '#FFB6C1', text: '#2D3A5C', bg: '#FFF9F0' },
  { name: 'Fun Rainbow', primary: '#FF6B6B', secondary: '#FFE0E0', accent: '#4ECDC4', text: '#2D3436', bg: '#FFFFFF' },
  { name: 'Toy Box', primary: '#F7B731', secondary: '#FFF3E0', accent: '#5C6BC0', text: '#37474F', bg: '#FAFAFA' },
  { name: 'Magic World', primary: '#9B59B6', secondary: '#F3E5F5', accent: '#FFB6C1', text: '#4A148C', bg: '#FCF8FF' },
  { name: 'Ocean Adventure', primary: '#1ABC9C', secondary: '#E0F7FA', accent: '#3498DB', text: '#0D3B3B', bg: '#F0FDF4' },
  { name: 'Space Explorer', primary: '#2C3E50', secondary: '#E8ECF1', accent: '#E67E22', text: '#1A252F', bg: '#F8F9FA' }
];

export default function AdminCreateCoupon() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  
  // Form State - Initialize with empty strings, not null
  const [formData, setFormData] = useState({
    // Display Settings
    title: '',
    subtitle: '',
    spendThreshold: '',
    highlightText: '',
    colorTheme: COLOR_THEMES[0],
    description: '',
    
    // Coupon Settings
    couponCode: '',
    discountType: 'percentage',
    discountValue: '',
    minimumOrderAmount: '',
    maxTotalUses: '',
    maxUsesPerUser: '1',
    expiresAt: '',
    
    // Additional Settings
    isActive: true,
    showOnHomepage: false,
    isFirstPurchaseOnly: false,
    applicableCategories: [],
    applicableProducts: [],
    excludedProducts: [],
    stackable: false,
    autoApply: false
  });
  
  const [couponCodeError, setCouponCodeError] = useState('');
  const [isCheckingCode, setIsCheckingCode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  // Load categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

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

  // Generate random coupon code
  const generateCouponCode = () => {
    const prefixes = ['KIDS', 'TOY', 'PLAY', 'FUN', 'GIFT', 'MAGIC', 'HAPPY', 'SMILE'];
    const suffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const code = `${prefixes[Math.floor(Math.random() * prefixes.length)]}${suffix}`;
    setFormData(prev => ({ ...prev, couponCode: code }));
    setGeneratedCode(code);
    setCouponCodeError('');
  };
  
  // Check coupon code uniqueness
  const checkCouponCode = async (code) => {
    if (!code || code.length < 3) return;
    
    setIsCheckingCode(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/coupons/check-code?code=${encodeURIComponent(code)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.exists) {
        setCouponCodeError('This coupon code already exists. Please use a different code.');
      } else {
        setCouponCodeError('');
      }
    } catch (error) {
      console.error('Error checking coupon code:', error);
    } finally {
      setIsCheckingCode(false);
    }
  };
  
  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };
  
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    // Allow empty string for optional number fields
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };
  
  const handleDiscountTypeChange = (type) => {
    setFormData(prev => ({ ...prev, discountType: type, discountValue: '' }));
  };
  
  const handleColorThemeChange = (theme) => {
    setFormData(prev => ({ ...prev, colorTheme: theme }));
  };
  
  // Toggle category selection
  const toggleCategory = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      applicableCategories: prev.applicableCategories.includes(categoryId)
        ? prev.applicableCategories.filter(id => id !== categoryId)
        : [...prev.applicableCategories, categoryId]
    }));
  };
  
  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Coupon title is required';
    }
    
    if (!formData.highlightText.trim()) {
      newErrors.highlightText = 'Highlight text is required';
    }
    
    if (!formData.couponCode.trim()) {
      newErrors.couponCode = 'Coupon code is required';
    } else if (formData.couponCode.length < 3) {
      newErrors.couponCode = 'Coupon code must be at least 3 characters';
    } else if (couponCodeError) {
      newErrors.couponCode = couponCodeError;
    }
    
    if (formData.discountType !== 'free_shipping') {
      if (!formData.discountValue || parseFloat(formData.discountValue) <= 0) {
        newErrors.discountValue = 'Discount value is required and must be greater than 0';
      }
      
      if (formData.discountType === 'percentage' && parseFloat(formData.discountValue) > 100) {
        newErrors.discountValue = 'Percentage discount cannot exceed 100%';
      }
    }
    
    if (formData.expiresAt) {
      const expiryDate = new Date(formData.expiresAt);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (expiryDate < today) {
        newErrors.expiresAt = 'Expiry date cannot be in the past';
      }
    }
    
    if (formData.maxUsesPerUser && parseFloat(formData.maxUsesPerUser) < 1) {
      newErrors.maxUsesPerUser = 'Max uses per user must be at least 1';
    }
    
    if (formData.maxTotalUses && parseFloat(formData.maxTotalUses) < 1) {
      newErrors.maxTotalUses = 'Max total uses must be at least 1';
    }
    
    if (formData.minimumOrderAmount && parseFloat(formData.minimumOrderAmount) < 0) {
      newErrors.minimumOrderAmount = 'Minimum order amount cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      
      const payload = {
        title: formData.title,
        subtitle: formData.subtitle,
        spendThreshold: formData.spendThreshold,
        highlightText: formData.highlightText,
        colorTheme: {
          primary: formData.colorTheme.primary,
          secondary: formData.colorTheme.secondary,
          accent: formData.colorTheme.accent,
          text: formData.colorTheme.text,
          bg: formData.colorTheme.bg
        },
        description: formData.description,
        couponCode: formData.couponCode.toUpperCase(),
        discountType: formData.discountType,
        discountValue: formData.discountType !== 'free_shipping' ? parseFloat(formData.discountValue) : 0,
        minimumOrderAmount: formData.minimumOrderAmount ? parseFloat(formData.minimumOrderAmount) : 0,
        maxTotalUses: formData.maxTotalUses ? parseFloat(formData.maxTotalUses) : null,
        maxUsesPerUser: formData.maxUsesPerUser ? parseFloat(formData.maxUsesPerUser) : 1,
        expiresAt: formData.expiresAt || null,
        isActive: formData.isActive,
        showOnHomepage: formData.showOnHomepage,
        isFirstPurchaseOnly: formData.isFirstPurchaseOnly,
        applicableCategories: formData.applicableCategories,
        stackable: formData.stackable,
        autoApply: formData.autoApply
      };
      
      const response = await fetch('http://localhost:5000/api/coupons', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Coupon "${formData.couponCode}" created successfully!`);
        router.push('/admin/coupons');
      } else {
        toast.error(data.error || 'Failed to create coupon');
      }
    } catch (error) {
      console.error('Error creating coupon:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Get discount type icon
  const getDiscountIcon = () => {
    const discountType = DISCOUNT_TYPES.find(d => d.value === formData.discountType);
    if (discountType) {
      const Icon = discountType.icon;
      return <Icon className="w-4 h-4" />;
    }
    return <Percent className="w-4 h-4" />;
  };
  
  // Get discount display text
  const getDiscountDisplay = () => {
    if (formData.discountType === 'percentage' && formData.discountValue) {
      return `${formData.discountValue}% OFF`;
    } else if (formData.discountType === 'fixed' && formData.discountValue) {
      return `৳${formData.discountValue} OFF`;
    } else if (formData.discountType === 'free_shipping') {
      return 'FREE SHIPPING';
    }
    return '';
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <NextLink href="/admin/coupons" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </NextLink>
              <div>
                <div className="flex items-center gap-2">
                  <Ticket className="w-6 h-6 text-teal-600" />
                  <h1 className="text-xl font-bold text-gray-800">
                    Create New Coupon
                  </h1>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-700">
                    Promotions
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Create exciting offers and discounts for your customers</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <Eye className="w-4 h-4" />
              {previewMode ? 'Hide Preview' : 'Show Preview'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Form Fields */}
            <div className="lg:col-span-2 space-y-6">
              {/* Display Settings Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                    <Palette className="w-5 h-5 text-teal-600" />
                    Display Settings
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Configure how your coupon appears to customers</p>
                </div>
                
                <div className="p-5 space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Summer Sale Extravaganza"
                    />
                    {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
                  </div>
                  
                  {/* Subtitle / Badge */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subtitle / Badge <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                      placeholder="e.g., Limited Time Offer"
                    />
                  </div>
                  
                  {/* Spend Threshold Display Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Spend Threshold Display Text <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="spendThreshold"
                      value={formData.spendThreshold}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                      placeholder="e.g., Spend ৳2000 or more"
                    />
                  </div>
                  
                  {/* Highlight Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Highlight Text <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="highlightText"
                      value={formData.highlightText}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-lg font-bold border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition ${
                        errors.highlightText ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., UP TO 50% OFF"
                    />
                    {errors.highlightText && <p className="text-xs text-red-600 mt-1">{errors.highlightText}</p>}
                  </div>
                  
                  {/* Color Theme */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color Theme
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {COLOR_THEMES.map((theme, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleColorThemeChange(theme)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.colorTheme.name === theme.name
                              ? 'border-teal-500 shadow-md'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{ backgroundColor: theme.bg }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primary }} />
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.secondary }} />
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.accent }} />
                          </div>
                          <p className="text-xs font-medium" style={{ color: theme.text }}>{theme.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none"
                      placeholder="Describe the coupon terms and conditions..."
                    />
                  </div>
                </div>
              </div>
              
              {/* Coupon Functional Settings Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                    <Settings className="w-5 h-5 text-teal-600" />
                    Coupon Functional Settings
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Configure how the coupon works</p>
                </div>
                
                <div className="p-5 space-y-4">
                  {/* Coupon Code */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Coupon Code <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="couponCode"
                          value={formData.couponCode}
                          onChange={(e) => {
                            const value = e.target.value.toUpperCase();
                            setFormData(prev => ({ ...prev, couponCode: value }));
                            checkCouponCode(value);
                          }}
                          className={`w-full pl-9 pr-3 py-2 text-sm font-mono border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition ${
                            errors.couponCode || couponCodeError ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="SUMMER2024"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={generateCouponCode}
                        className="px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Generate
                      </button>
                    </div>
                    {(errors.couponCode || couponCodeError) && (
                      <p className="text-xs text-red-600 mt-1">{errors.couponCode || couponCodeError}</p>
                    )}
                    {isCheckingCode && <p className="text-xs text-gray-500 mt-1">Checking availability...</p>}
                    <p className="text-xs text-gray-500 mt-1">Use only letters and numbers. 3-20 characters.</p>
                  </div>
                  
                  {/* Discount Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {DISCOUNT_TYPES.map(type => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => handleDiscountTypeChange(type.value)}
                            className={`p-3 rounded-lg border-2 text-center transition-all ${
                              formData.discountType === type.value
                                ? 'border-teal-500 shadow-md'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            style={formData.discountType === type.value ? { backgroundColor: `${type.color}10` } : {}}
                          >
                            <Icon className={`w-5 h-5 mx-auto mb-1`} style={{ color: type.color }} />
                            <p className="text-xs font-medium" style={{ color: type.color }}>{type.label}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Discount Value */}
                  {formData.discountType !== 'free_shipping' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {formData.discountType === 'percentage' ? 'Discount Percentage (%)' : 'Discount Amount (৳)'}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        {formData.discountType === 'percentage' ? (
                          <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        ) : (
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        )}
                        <input
                          type="number"
                          name="discountValue"
                          value={formData.discountValue}
                          onChange={handleNumberChange}
                          onWheel={(e) => e.target.blur()}
                          min="0"
                          step={formData.discountType === 'percentage' ? '1' : '10'}
                          className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition ${
                            errors.discountValue ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder={formData.discountType === 'percentage' ? 'e.g., 25' : 'e.g., 500'}
                        />
                      </div>
                      {errors.discountValue && <p className="text-xs text-red-600 mt-1">{errors.discountValue}</p>}
                    </div>
                  )}
                  
                  {/* Minimum Order Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Order Amount (৳)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        name="minimumOrderAmount"
                        value={formData.minimumOrderAmount}
                        onChange={handleNumberChange}
                        onWheel={(e) => e.target.blur()}
                        min="0"
                        step="100"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                        placeholder="e.g., 1000"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Leave empty for no minimum requirement</p>
                  </div>
                  
                  {/* Usage Limits - Two Column */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Total Uses
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          name="maxTotalUses"
                          value={formData.maxTotalUses}
                          onChange={handleNumberChange}
                          onWheel={(e) => e.target.blur()}
                          min="1"
                          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                          placeholder="Unlimited"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Leave empty for unlimited</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Uses Per User
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          name="maxUsesPerUser"
                          value={formData.maxUsesPerUser}
                          onChange={handleNumberChange}
                          onWheel={(e) => e.target.blur()}
                          min="1"
                          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                        />
                      </div>
                      {errors.maxUsesPerUser && <p className="text-xs text-red-600 mt-1">{errors.maxUsesPerUser}</p>}
                    </div>
                  </div>
                  
                  {/* Expiry Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expires At
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="datetime-local"
                        name="expiresAt"
                        value={formData.expiresAt}
                        onChange={handleChange}
                        className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition ${
                          errors.expiresAt ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.expiresAt && <p className="text-xs text-red-600 mt-1">{errors.expiresAt}</p>}
                    <p className="text-xs text-gray-500 mt-1">Leave empty for no expiry date</p>
                  </div>
                  
                  {/* Checkbox Options */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 focus:ring-teal-500"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Active</span>
                        <p className="text-xs text-gray-500">Coupon is available for customers to use</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="showOnHomepage"
                        checked={formData.showOnHomepage}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 focus:ring-teal-500"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Show on Homepage</span>
                        <p className="text-xs text-gray-500">Display this coupon in the homepage promotions section</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isFirstPurchaseOnly"
                        checked={formData.isFirstPurchaseOnly}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 focus:ring-teal-500"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">First Purchase Only</span>
                        <p className="text-xs text-gray-500">Applicable only for customers making their first purchase</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="stackable"
                        checked={formData.stackable}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 focus:ring-teal-500"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Stackable</span>
                        <p className="text-xs text-gray-500">Can be combined with other coupons</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="autoApply"
                        checked={formData.autoApply}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 focus:ring-teal-500"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Auto Apply</span>
                        <p className="text-xs text-gray-500">Automatically apply to eligible carts without code entry</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Preview & Summary */}
            <div className="space-y-6">
              {/* Live Preview Card */}
              {previewMode && (
                <div className="sticky top-24">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-teal-600" />
                        <h3 className="text-sm font-semibold text-gray-700">Live Preview</h3>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      {/* Coupon Card Preview */}
                      <div 
                        className="rounded-xl overflow-hidden border shadow-sm"
                        style={{ 
                          backgroundColor: formData.colorTheme.bg,
                          borderColor: formData.colorTheme.secondary
                        }}
                      >
                        {/* Highlight Bar */}
                        <div 
                          className="py-3 text-center"
                          style={{ backgroundColor: formData.colorTheme.primary }}
                        >
                          <p 
                            className="text-lg font-bold text-white"
                          >
                            {formData.highlightText || 'YOUR HIGHLIGHT'}
                          </p>
                        </div>
                        
                        <div className="p-4">
                          {/* Title */}
                          <div className="text-center mb-3">
                            <h3 
                              className="text-base font-bold"
                              style={{ color: formData.colorTheme.text }}
                            >
                              {formData.title || 'Coupon Title'}
                            </h3>
                            {formData.subtitle && (
                              <div className="inline-block px-2 py-0.5 rounded-full text-xs mt-1 bg-gray-100 text-gray-600">
                                {formData.subtitle}
                              </div>
                            )}
                          </div>
                          
                          {/* Discount Display */}
                          {getDiscountDisplay() && (
                            <div 
                              className="text-center py-3 rounded-lg mb-3"
                              style={{ backgroundColor: formData.colorTheme.secondary }}
                            >
                              <div className="flex items-center justify-center gap-2">
                                {getDiscountIcon()}
                                <span 
                                  className="text-xl font-bold"
                                  style={{ color: formData.colorTheme.primary }}
                                >
                                  {getDiscountDisplay()}
                                </span>
                              </div>
                            </div>
                          )}
                          
                          {/* Spend Threshold */}
                          {formData.spendThreshold && (
                            <p className="text-xs text-center text-gray-600 mb-2">
                              💰 {formData.spendThreshold}
                            </p>
                          )}
                          
                          {/* Minimum Order Amount */}
                          {formData.minimumOrderAmount && parseFloat(formData.minimumOrderAmount) > 0 && (
                            <p className="text-xs text-center text-gray-500 mb-2">
                              Min. Order: ৳{formData.minimumOrderAmount}
                            </p>
                          )}
                          
                          {/* Coupon Code */}
                          {formData.couponCode && (
                            <div className="mt-3">
                              <div 
                                className="flex items-center justify-between p-2 rounded-lg"
                                style={{ backgroundColor: formData.colorTheme.secondary }}
                              >
                                <code 
                                  className="text-sm font-mono font-bold"
                                  style={{ color: formData.colorTheme.primary }}
                                >
                                  {formData.couponCode}
                                </code>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(formData.couponCode);
                                    toast.success('Code copied!');
                                  }}
                                  className="p-1 rounded hover:opacity-70"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          )}
                          
                          {/* Expiry */}
                          {formData.expiresAt && (
                            <p className="text-xs text-center text-gray-400 mt-3">
                              Expires: {new Date(formData.expiresAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Summary Card - Always Visible */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                    <Ticket className="w-4 h-4 text-teal-600" />
                    Coupon Summary
                  </h3>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                    <span className="text-gray-500">Title:</span>
                    <span className="font-medium text-gray-700">{formData.title || 'Not set'}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                    <span className="text-gray-500">Code:</span>
                    <span className="font-mono font-bold text-teal-600">
                      {formData.couponCode || 'Not generated'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                    <span className="text-gray-500">Discount:</span>
                    <span className="font-medium text-green-600">
                      {formData.discountType === 'percentage' && formData.discountValue && `${formData.discountValue}% OFF`}
                      {formData.discountType === 'fixed' && formData.discountValue && `৳${formData.discountValue} OFF`}
                      {formData.discountType === 'free_shipping' && 'Free Shipping'}
                      {!formData.discountValue && formData.discountType !== 'free_shipping' && 'Not set'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                    <span className="text-gray-500">Min. Order:</span>
                    <span className="font-medium">
                      {formData.minimumOrderAmount && parseFloat(formData.minimumOrderAmount) > 0 ? `৳${formData.minimumOrderAmount}` : 'No minimum'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                    <span className="text-gray-500">Per User:</span>
                    <span className="font-medium">{formData.maxUsesPerUser || 1} time(s)</span>
                  </div>
                  
                  <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                    <span className="text-gray-500">Total Uses:</span>
                    <span className="font-medium">{formData.maxTotalUses || 'Unlimited'}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status:</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      formData.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {formData.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Quick Tips */}
              <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-4 border border-pink-100">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-4 h-4 text-pink-500" />
                  <h4 className="text-sm font-semibold text-gray-700">Quick Tips</h4>
                </div>
                <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                  <li>Use clear, memorable coupon codes</li>
                  <li>Set realistic discount percentages (5-30% is common)</li>
                  <li>Consider minimum order amounts to protect margins</li>
                  <li>Limit per-user usage to prevent abuse</li>
                  <li>Display coupons on homepage for better visibility</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Submit Buttons */}
          <div className="mt-8 flex justify-end gap-3">
            <NextLink href="/admin/coupons">
              <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </NextLink>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSubmitting ? 'Creating...' : 'Create Coupon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}