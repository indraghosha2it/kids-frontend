// app/contact/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Headphones,
  Gift,
  Smile,
  Truck,
  Shield,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// FAQ Accordion Component
function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
      initial={false}
    >
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-[#2D3A5C] text-sm md:text-base">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[#4A8A90]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#4A8A90]" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-5 pb-4"
          >
            <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Fixed floating emojis with deterministic positions (no Math.random)
const floatingEmojis = [
  { emoji: '🎈', left: '5%', top: '15%', delay: 0, duration: 6 },
  { emoji: '🧸', left: '85%', top: '20%', delay: 0.5, duration: 7 },
  { emoji: '🎪', left: '10%', top: '70%', delay: 1, duration: 5.5 },
  { emoji: '🎨', left: '90%', top: '65%', delay: 1.5, duration: 8 },
  { emoji: '🚀', left: '15%', top: '40%', delay: 2, duration: 6.5 },
  { emoji: '⭐', left: '80%', top: '35%', delay: 2.5, duration: 7.5 },
  { emoji: '🎮', left: '45%', top: '80%', delay: 3, duration: 5 },
  { emoji: '🎵', left: '70%', top: '85%', delay: 0.8, duration: 6 },
  { emoji: '📚', left: '30%', top: '25%', delay: 1.2, duration: 7 },
  { emoji: '🎯', left: '60%', top: '50%', delay: 1.8, duration: 5.5 },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('🎉 Message Sent!', {
          description: data.message || 'We\'ll get back to you within 24 hours. Thank you!',
          duration: 5000,
        });
        
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        toast.error('Failed to send message', {
          description: data.error || 'Please try again later.',
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Connection Error', {
        description: 'Unable to send message. Please check your connection and try again!',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+880 1234 567890', '+880 1987 654321'],
      gradient: 'from-[#4A8A90] to-[#6CB4B8]'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@toymart.com', 'support@toymart.com'],
      gradient: 'from-[#FFB6C1] to-[#FF85A1]'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['House 123, Road 45', 'Gulshan, Dhaka-1212'],
      gradient: 'from-[#FFD93D] to-[#FFB347]'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 9AM - 8PM', 'Sat: 10AM - 6PM', 'Sun: Closed'],
      gradient: 'from-[#9B59B6] to-[#C39BD3]'
    },
  ];

  const faqs = [
    {
      question: 'How long does delivery take?',
      answer: 'We deliver within 2-4 business days in Dhaka, and 3-7 business days for other cities across Bangladesh.'
    },
    {
      question: 'Do you offer cash on delivery?',
      answer: 'Yes! We offer Cash on Delivery (COD) for all orders across Bangladesh with no additional charges.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 7-day return policy for defective or damaged products. Contact our support team for assistance and we\'ll guide you through the process.'
    },
    {
      question: 'Are your toys safe for children?',
      answer: 'Absolutely! All our toys undergo rigorous safety testing and meet international safety standards (ASTM, EN71).'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently we ship only within Bangladesh. We\'re working on expanding our shipping capabilities soon!'
    },
  ];

  // Don't render animated elements until mounted on client
  if (!mounted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE]">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="w-16 h-16 mx-auto bg-[#4A8A90]/20 rounded-full animate-pulse"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE]">
        {/* Hero Section */}
        <section className="relative pt-16 pb-10 md:pt-20 md:pb-14 overflow-hidden">
          {/* Floating Emojis */}
          <div className="absolute inset-0 pointer-events-none">
            {floatingEmojis.map((item, i) => (
              <motion.div
                key={i}
                className="absolute text-xl md:text-2xl"
                style={{ left: item.left, top: item.top }}
                animate={{ 
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                }}
                transition={{ 
                  duration: item.duration,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {item.emoji}
              </motion.div>
            ))}
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 mb-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                <Headphones className="w-3.5 h-3.5 text-[#4A8A90]" />
                <span className="text-xs font-medium text-[#4A8A90]">WE'RE HERE TO HELP</span>
                <MessageCircle className="w-3.5 h-3.5 text-[#FFB6C1]" />
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D3A5C] mb-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                Let's Talk! 🎈
              </h1>
              
              <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>
                Have questions about our toys? Need help with an order? 
                Our friendly team is here to help!
              </p>
            </motion.div>
          </div>
          
          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 40" fill="white" preserveAspectRatio="none" className="w-full">
              <path d="M0,32L80,37.3C160,43,320,53,480,48C640,43,800,21,960,16C1120,11,1280,21,1360,26.7L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"/>
            </svg>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`bg-gradient-to-br ${info.gradient} rounded-xl p-4 text-white shadow-md hover:shadow-lg transition-all`}
                >
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3">
                    <info.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-base mb-2">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-white/90 text-xs mb-0.5">{detail}</p>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE] rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-5">
                  <MessageCircle className="w-5 h-5 text-[#4A8A90]" />
                  <h2 className="text-xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                    Send us a Message
                  </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Name 🧸</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#4A8A90] focus:ring-2 focus:ring-[#4A8A90]/20 transition-all bg-white text-sm"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address 📧</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#4A8A90] focus:ring-2 focus:ring-[#4A8A90]/20 transition-all bg-white text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number 📞</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#4A8A90] focus:ring-2 focus:ring-[#4A8A90]/20 transition-all bg-white text-sm"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Subject 🎁</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#4A8A90] focus:ring-2 focus:ring-[#4A8A90]/20 transition-all bg-white text-sm"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Message 💬</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#4A8A90] focus:ring-2 focus:ring-[#4A8A90]/20 transition-all bg-white resize-none text-sm"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] text-white py-2.5 rounded-lg font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                  
                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2 text-green-600 bg-green-50 p-2 rounded-lg"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">Message sent successfully!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
              
              {/* Map & Quick Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-5"
              >
                {/* Map */}
                <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902137430518!2d90.391149!3d23.750812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b3a1f3d8b9%3A0x8b5e3b2f1e5d4c3a!2sGulshan%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                  ></iframe>
                </div>
                
                {/* Social Media Links */}
                <div className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] rounded-2xl p-5 text-white">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Smile className="w-4 h-4" /> Follow the Fun!
                  </h3>
                  <div className="flex gap-3 justify-start">
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href="#"
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                    >
                      <Facebook className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href="#"
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                    >
                      <Instagram className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href="#"
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                    >
                      <Youtube className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href="#"
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                    >
                      <Twitter className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
                
                {/* Quick Features */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Truck, label: 'Fast Delivery', color: 'bg-[#D4EDEE]' },
                    { icon: Shield, label: 'Safe Toys', color: 'bg-[#FFF0F3]' },
                    { icon: Gift, label: 'Gift Wrap', color: 'bg-[#FFE8D6]' },
                  ].map((feature, i) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -3 }}
                      className={`${feature.color} rounded-xl p-3 text-center`}
                    >
                      <feature.icon className="w-5 h-5 text-[#4A8A90] mx-auto mb-1" />
                      <p className="text-xs font-semibold text-gray-700">{feature.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE]">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="text-xl">🤔</span>
                <span className="text-xs font-medium text-[#4A8A90] tracking-wide uppercase">FAQ</span>
                <span className="text-xl">💡</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                Got Questions? We've Got Answers!
              </h2>
            </motion.div>
            
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onToggle={() => toggleFAQ(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Support CTA */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] rounded-2xl p-6 text-white"
            >
              <Headphones className="w-12 h-12 mx-auto mb-3 text-white/80" />
              <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                Need Immediate Help?
              </h3>
              <p className="text-white/90 text-sm mb-4">
                Our customer support team is available 24/7 to assist you!
              </p>
              <Link href="tel:+8801234567890">
                <button className="bg-white text-[#4A8A90] px-5 py-2 rounded-full font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 mx-auto text-sm">
                  <Phone className="w-4 h-4" /> Call Now: +880 1234 567890
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}