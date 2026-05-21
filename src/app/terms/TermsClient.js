// app/terms/page.js
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Shield, 
  FileText, 
  CreditCard, 
  Truck, 
  RefreshCw, 
  AlertCircle,
  CheckCircle,
  Package,
  DollarSign,
  Clock,
  UserCheck,
  ShoppingBag
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function TermsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sections = [
    {
      icon: ShoppingBag,
      title: '1. General Terms',
      content: `By accessing and placing an order with ToyMart, you confirm that you are in agreement with and bound by the terms and conditions contained below. These terms apply to the entire website and any email or other type of communication between you and ToyMart.`,
    },
    {
      icon: UserCheck,
      title: '2. Eligibility',
      content: `To use our services, you must be at least 18 years of age or have parental/guardian consent. By using ToyMart, you represent and warrant that you meet these requirements. You agree to provide accurate, current, and complete information during registration and purchase.`,
    },
    {
      icon: DollarSign,
      title: '3. Pricing & Payment',
      content: `All prices are listed in Bangladeshi Taka (BDT) and include VAT unless otherwise stated. We reserve the right to modify prices at any time without prior notice. Payments can be made via:
      • Cash on Delivery (COD)
      • bKash
      • Nagad
      • Credit/Debit Cards
      • Bank Transfer`,
    },
    {
      icon: Package,
      title: '4. Order Acceptance',
      content: `All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for reasons including but not limited to: product availability, errors in pricing, or suspected fraudulent activity. If your order is cancelled, you will be notified immediately.`,
    },
    {
      icon: Truck,
      title: '5. Shipping & Delivery',
      content: `We deliver to all major cities in Bangladesh. Delivery times typically range from 2-7 business days depending on your location. While we strive to meet all delivery timelines, we are not liable for delays caused by circumstances beyond our control (weather, traffic, political unrest, etc.).`,
    },
    {
      icon: RefreshCw,
      title: '6. Returns & Refunds',
      content: `We offer a 7-day return policy for defective or damaged products. To be eligible for a return:
      • Product must be unused and in original packaging
      • Proof of purchase is required
      • Return shipping costs are borne by the customer unless the product is defective
      
      Refunds will be processed within 7-10 business days after product inspection.`,
    },
    {
      icon: Shield,
      title: '7. Product Safety',
      content: `All toys sold on ToyMart comply with international safety standards (ASTM, EN71). However, adult supervision is recommended for children under 3 years. We are not liable for misuse of products or injuries resulting from improper use.`,
    },
    {
      icon: CreditCard,
      title: '8. Warranty',
      content: `Most products come with a 30-day manufacturer warranty against manufacturing defects. This warranty does not cover damage caused by:
      • Normal wear and tear
      • Accidental damage
      • Improper use or modification
      • Water damage or exposure to extreme conditions`,
    },
    {
      icon: Clock,
      title: '9. Account Responsibility',
      content: `You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.`,
    },
    {
      icon: AlertCircle,
      title: '10. Limitation of Liability',
      content: `ToyMart shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our products or services. Our total liability shall not exceed the amount paid for the product in question.`,
    },
  ];

  const floatingElements = [
    { emoji: '📜', left: '3%', top: '10%', delay: 0, duration: 8 },
    { emoji: '⚖️', left: '92%', top: '20%', delay: 1, duration: 10 },
    { emoji: '🔒', left: '8%', top: '60%', delay: 2, duration: 9 },
    { emoji: '✅', left: '88%', top: '70%', delay: 0.5, duration: 11 },
    { emoji: '📋', left: '20%', top: '80%', delay: 1.5, duration: 7 },
    { emoji: '🛡️', left: '80%', top: '45%', delay: 2.5, duration: 12 },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE]">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 mx-auto bg-[#4A8A90]/20 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-28 md:pb-16 overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingElements.map((item, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl md:text-3xl opacity-30"
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

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-4 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <FileText className="w-4 h-4 text-[#4A8A90]" />
              <span className="text-xs font-medium text-[#4A8A90]">LEGAL DOCUMENT</span>
              <Shield className="w-4 h-4 text-[#FFB6C1]" />
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D3A5C] mb-4" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
              Terms & Conditions 📜
            </h1>
            
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Please read these terms carefully before using our website or making a purchase.
              By using ToyMart, you agree to be bound by these terms.
            </p>
            
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>Last Updated: January 1, 2024</span>
            </div>
          </motion.div>
        </div>
        
        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="white" preserveAspectRatio="none" className="w-full">
            <path d="M0,32L80,37.3C160,43,320,53,480,48C640,43,800,21,960,16C1120,11,1280,21,1360,26.7L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"/>
          </svg>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Last Updated Banner */}
          <div className="bg-[#D4EDEE] rounded-xl p-4 mb-8 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#4A8A90] flex-shrink-0" />
            <p className="text-sm text-gray-700">
              These terms and conditions constitute a legally binding agreement between you and ToyMart. 
              If you do not agree with any part of these terms, please do not use our website.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE] rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#4A8A90] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <section.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg md:text-xl font-bold text-[#2D3A5C] mb-3">
                      {section.title}
                    </h2>
                    <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] rounded-xl p-6 text-white text-center"
          >
            <h3 className="text-lg font-bold mb-2">Questions About Our Terms?</h3>
            <p className="text-sm text-white/90 mb-3">
              If you have any questions regarding our terms and conditions, please contact us.
            </p>
            <Link href="/contact">
              <button className="bg-white text-[#4A8A90] px-5 py-2 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-all">
                Contact Us
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