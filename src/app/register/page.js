



'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone, 
  MapPin, 
  Globe, 
  CheckCircle, 
  Sparkles,
  Star,
  Gift,
  Puzzle,
  Rocket,
  Heart
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import GoogleLoginButton from '../components/GoogleLoginButton';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({

    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: '',
    address: '',
    city: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // OTP Modal States
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [registrationData, setRegistrationData] = useState(null);
  const timerRef = useRef(null);

  // Helper function to format seconds as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('🔐 Passwords do not match!');
      setIsSubmitting(false);
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error('📝 Please agree to the terms and conditions');
      setIsSubmitting(false);
      return;
    }

    const loadingToast = toast.loading('🎈 Creating your toy account...');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          country: formData.country,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          password: formData.password,
          role: 'customer'
        }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        toast.error(data.error || 'Registration failed');
        setIsSubmitting(false);
        return;
      }

      toast.success('🎉 Account created!', {
        description: 'Please enter the OTP sent to your email.',
        duration: 4000,
      });

      setOtpEmail(formData.email);
      setRegistrationData(data);
      setShowOtpModal(true);
      setOtp('');
      setIsSubmitting(false);
      startCountdown();

    } catch (error) {
      console.error('Registration error:', error);
      toast.dismiss(loadingToast);
      toast.error('Connection Error', {
        description: 'Unable to connect to server. Please try again!',
      });
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    const verifyingToast = toast.loading('Verifying OTP...');

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: otpEmail,
          otp: otp
        }),
      });

      const data = await response.json();
      toast.dismiss(verifyingToast);

      if (!response.ok) {
        toast.error(data.error || 'Invalid OTP');
        setIsVerifying(false);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast.success('✨ Email verified successfully!', {
        description: 'Welcome to ToyMart! Ready for toy adventures!',
      });

      setShowOtpModal(false);
      
      // After email verification, redirect to customer dashboard
    // In handleVerifyOTP - after successful email verification
// For manual sign up, user already filled all details, so go directly to dashboard
setTimeout(() => {
  window.location.href = '/customer/dashboard';
}, 1500);

    } catch (error) {
      console.error('OTP verification error:', error);
      toast.dismiss(verifyingToast);
      toast.error('Verification failed', {
        description: 'Please try again',
      });
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendDisabled) return;

    const resendToast = toast.loading('Resending OTP...');

    try {
      const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: otpEmail
        }),
      });

      const data = await response.json();
      toast.dismiss(resendToast);

      if (!response.ok) {
        toast.error(data.error || 'Failed to resend OTP');
        return;
      }

      toast.success('OTP resent! 📧', {
        description: 'Check your email for the new code.',
      });

      startCountdown();

    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.dismiss(resendToast);
      toast.error('Failed to resend OTP');
    }
  };

  const startCountdown = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setResendDisabled(true);
    setCountdown(600);
    
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Google Sign Up Success Handler - Redirect to customer dashboard (not settings)
// Google Sign Up Success Handler - Let GoogleLoginButton handle redirects
const handleGoogleSuccess = (data) => {
  console.log('Google sign up success:', data);
  
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    // Show appropriate toast based on profile completion status
    if (data.requiresAdditionalInfo) {
      toast.success('🎉 Google Sign Up Successful!', {
        description: 'Please complete your profile to continue.',
        duration: 4000,
      });
      // The GoogleLoginButton will handle redirect to /customer/settings
    } else {
      toast.success('🎉 Google Sign Up Successful!', {
        description: `Welcome to ToyMart, ${data.user.contactPerson || data.user.companyName || 'Toy Lover'}!`,
        duration: 4000,
      });
      // The GoogleLoginButton will handle redirect to appropriate dashboard
    }
  }
};

const handleGoogleError = (error) => {
  console.error('Google sign up error:', error);
  toast.error('Google Sign Up Failed', {
    description: error || 'Unable to sign up with Google. Please try again.',
  });
};

 

  // Floating elements background
  const floatingElements = [
    { icon: '🎈', x: '5%', y: '10%', delay: 0, duration: 8 },
    { icon: '🧸', x: '85%', y: '15%', delay: 1, duration: 10 },
    { icon: '🎨', x: '10%', y: '75%', delay: 2, duration: 9 },
    { icon: '🚀', x: '90%', y: '70%', delay: 0.5, duration: 11 },
    { icon: '🎮', x: '15%', y: '45%', delay: 1.5, duration: 7 },
    { icon: '🎪', x: '80%', y: '40%', delay: 2.5, duration: 12 },
    { icon: '⭐', x: '45%', y: '85%', delay: 3, duration: 6 },
    { icon: '🎵', x: '70%', y: '90%', delay: 0.8, duration: 9 },
    { icon: '📚', x: '30%', y: '20%', delay: 1.8, duration: 8 },
    { icon: '🎯', x: '60%', y: '55%', delay: 2.2, duration: 10 },
  ];

  const benefits = [
    { icon: Gift, title: 'Toy Deals', desc: 'Exclusive discounts on toys', color: '#4F9DFF' },
    { icon: Rocket, title: 'Fast Delivery', desc: 'Quick shipping to your door', color: '#FF7B54' },
    { icon: Heart, title: 'Safe Toys', desc: 'Certified child-safe products', color: '#FFD93D' },
    { icon: Star, title: 'Happy Kids', desc: '5,000+ satisfied families', color: '#6EE7B7' },
  ];

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-[#4F9DFF]/10 via-[#FF7B54]/5 to-[#FFD93D]/10 overflow-hidden relative">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="toys" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="3" fill="#4F9DFF" opacity="0.5" />
              <circle cx="30" cy="30" r="2" fill="#FF7B54" opacity="0.5" />
              <circle cx="50" cy="15" r="2.5" fill="#FFD93D" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#toys)" />
        </svg>
      </div>

      {/* Floating Emojis */}
      {floatingElements.map((item, idx) => (
        <motion.div
          key={idx}
          className="absolute hidden lg:block text-3xl pointer-events-none"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 10, -10, 5, 0],
            rotate: [0, 15, -15, 10, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center py-12">
        <div className="max-w-5xl w-full mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-center mb-6"
          >
           
           
            
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4F9DFF] via-[#FF7B54] to-[#FFD93D] bg-clip-text text-transparent mb-1" 
                style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
              Join ToyMart
            </h1>
            
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-3 h-3 text-[#FFD93D] animate-pulse" />
              <p className="text-gray-600 text-sm" style={{ fontFamily: "'Comic Neue', cursive" }}>
                Create your toy account and start the fun!
              </p>
              <Sparkles className="w-3 h-3 text-[#FFD93D] animate-pulse" />
            </div>
            
            <div className="inline-block bg-gradient-to-r from-[#FFD93D] to-[#FF7B54] rounded-full px-3 py-1 shadow-md">
              <p className="text-white text-xs font-bold" style={{ fontFamily: "'Comic Neue', cursive" }}>
                🎁 Join the toy adventure today! 🎈
              </p>
            </div>
          </motion.div>

          {/* Benefits Cards Row - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
          >
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-2 text-center shadow-md border border-[#FFD93D]/30"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#4F9DFF]/20 to-[#FF7B54]/20 flex items-center justify-center mx-auto mb-1">
                    <Icon className="w-4 h-4 text-[#FF7B54]" />
                  </div>
                  <p className="font-bold text-xs text-gray-700">{benefit.title}</p>
                  <p className="text-[10px] text-gray-500">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl p-5 border-2 border-[#FFD93D]/40"
          >
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-3">
              
               

                {/* Contact Person */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1" style={{ fontFamily: "'Comic Neue', cursive" }}>
                    👤 Contact Person
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-[#4F9DFF] focus:ring-2 focus:ring-[#4F9DFF]/20 transition-all bg-gray-50 focus:bg-white"
                    placeholder="Your full name"
                    style={{ fontFamily: "'Comic Neue', sans-serif" }}
                  />
                </div>
                  {/* Email */}
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray-700 mb-1" style={{ fontFamily: "'Comic Neue', cursive" }}>
                    📧 Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-[#4F9DFF] focus:ring-2 focus:ring-[#4F9DFF]/20 transition-all bg-gray-50 focus:bg-white"
                    placeholder="your@email.com"
                    style={{ fontFamily: "'Comic Neue', sans-serif" }}
                  />
                </div>


              

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1" style={{ fontFamily: "'Comic Neue', cursive" }}>
                    📞 Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-[#4F9DFF] focus:ring-2 focus:ring-[#4F9DFF]/20 transition-all bg-gray-50 focus:bg-white"
                    placeholder="+1 234 567 8900"
                    style={{ fontFamily: "'Comic Neue', sans-serif" }}
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1" style={{ fontFamily: "'Comic Neue', cursive" }}>
                    💬 WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-[#4F9DFF] focus:ring-2 focus:ring-[#4F9DFF]/20 transition-all bg-gray-50 focus:bg-white"
                    placeholder="+1 234 567 8900"
                    style={{ fontFamily: "'Comic Neue', sans-serif" }}
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1" style={{ fontFamily: "'Comic Neue', cursive" }}>
                    🌍 Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-[#4F9DFF] focus:ring-2 focus:ring-[#4F9DFF]/20 transition-all bg-gray-50 focus:bg-white"
                    placeholder="Bangladesh"
                    style={{ fontFamily: "'Comic Neue', sans-serif" }}
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1" style={{ fontFamily: "'Comic Neue', cursive" }}>
                    🏙️ City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-[#4F9DFF] focus:ring-2 focus:ring-[#4F9DFF]/20 transition-all bg-gray-50 focus:bg-white"
                    placeholder="Dhaka"
                    style={{ fontFamily: "'Comic Neue', sans-serif" }}
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray-700 mb-1" style={{ fontFamily: "'Comic Neue', cursive" }}>
                    📍 Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-[#4F9DFF] focus:ring-2 focus:ring-[#4F9DFF]/20 transition-all bg-gray-50 focus:bg-white"
                    placeholder="Your street address"
                    style={{ fontFamily: "'Comic Neue', sans-serif" }}
                  />
                </div>

                {/* Zip Code */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1" style={{ fontFamily: "'Comic Neue', cursive" }}>
                    📮 Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-[#4F9DFF] focus:ring-2 focus:ring-[#4F9DFF]/20 transition-all bg-gray-50 focus:bg-white"
                    placeholder="10001"
                    style={{ fontFamily: "'Comic Neue', sans-serif" }}
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1" style={{ fontFamily: "'Comic Neue', cursive" }}>
                    🔒 Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength="8"
                      className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-[#4F9DFF] focus:ring-2 focus:ring-[#4F9DFF]/20 transition-all bg-gray-50 focus:bg-white"
                      placeholder="Min. 8 characters"
                      style={{ fontFamily: "'Comic Neue', sans-serif" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                      ) : (
                        <Eye className="w-3.5 h-3.5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1" style={{ fontFamily: "'Comic Neue', cursive" }}>
                    🔒 Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength="8"
                      className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-[#4F9DFF] focus:ring-2 focus:ring-[#4F9DFF]/20 transition-all bg-gray-50 focus:bg-white"
                      placeholder="Re-enter password"
                      style={{ fontFamily: "'Comic Neue', sans-serif" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                      ) : (
                        <Eye className="w-3.5 h-3.5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-[#4F9DFF] focus:ring-[#4F9DFF] w-3.5 h-3.5"
                    />
                    <span className="text-xs text-gray-600" style={{ fontFamily: "'Comic Neue', cursive" }}>
                      I agree to the{' '}
                      <Link href="/terms" className="text-[#FF7B54] hover:underline font-semibold">
                        Terms
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-[#FF7B54] hover:underline font-semibold">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting || !formData.agreeToTerms}
                className="w-full mt-5 bg-gradient-to-r from-[#4F9DFF] to-[#FF7B54] text-white py-2.5 rounded-xl font-bold text-base hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    🚀 Create Toy Account
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-dashed border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white text-gray-500 text-xs" style={{ fontFamily: "'Comic Neue', cursive" }}>
                    or sign up with
                  </span>
                </div>
              </div>

              {/* Google Sign Up Button */}
              <div className="w-full">
                <GoogleLoginButton 
                  mode="signup"
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                />
              </div>

              {/* Login Link */}
              <div className="text-center mt-4">
                <p className="text-xs text-gray-600" style={{ fontFamily: "'Comic Neue', cursive" }}>
                  Already have an account?{' '}
                  <Link href="/login" className="font-bold text-[#FF7B54] hover:text-[#4F9DFF] transition-colors">
                    Sign In 🎈
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>

          {/* Fun Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-5 bg-gradient-to-r from-[#FFD93D] to-[#FF7B54] rounded-2xl p-2 text-center shadow-lg"
          >
            <p className="text-white font-bold text-xs flex items-center justify-center gap-1" style={{ fontFamily: "'Comic Neue', cursive" }}>
              <Sparkles className="w-3 h-3" />
              🎉 Join 5,000+ happy families! Get 10% OFF on first order 🎉
              <Sparkles className="w-3 h-3" />
            </p>
          </motion.div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ 
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
            }}
            onClick={() => !isVerifying && setShowOtpModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-[#4F9DFF] to-[#FF7B54] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1" style={{ fontFamily: "'Fredoka One', cursive" }}>
                  Verify Your Email 📧
                </h3>
                <p className="text-xs text-gray-500" style={{ fontFamily: "'Comic Neue', cursive" }}>
                  We've sent a verification code to <br />
                  <span className="font-bold text-[#FF7B54]">{otpEmail}</span>
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-700 mb-2 text-center" style={{ fontFamily: "'Comic Neue', cursive" }}>
                  Enter 6-Digit Code
                </label>
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full px-4 py-2 text-center text-xl tracking-wider border-2 border-gray-200 rounded-lg focus:border-[#4F9DFF] focus:ring-2 focus:ring-[#4F9DFF]/20 transition-all font-mono"
                  autoFocus
                  disabled={isVerifying}
                />
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={isVerifying || otp.length !== 6}
                className="w-full bg-gradient-to-r from-[#4F9DFF] to-[#FF7B54] text-white py-2.5 rounded-xl font-bold hover:shadow-xl transition-all duration-300 disabled:opacity-50 text-sm"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                {isVerifying ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  'Verify & Continue 🚀'
                )}
              </button>

              <div className="mt-3 text-center">
                <button
                  onClick={handleResendOTP}
                  disabled={resendDisabled}
                  className="text-xs text-[#FF7B54] hover:text-[#4F9DFF] transition-colors disabled:opacity-50 font-semibold"
                >
                  {resendDisabled ? `Resend OTP in ${formatTime(countdown)}` : 'Resend OTP 📧'}
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <button
                  onClick={() => {
                    if (timerRef.current) {
                      clearInterval(timerRef.current);
                      timerRef.current = null;
                    }
                    setShowOtpModal(false);
                  }}
                  disabled={isVerifying}
                  className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Fredoka+One&display=swap');
      `}</style>
    </div>
    </>
  );
}