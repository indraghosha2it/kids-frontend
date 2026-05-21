// app/privacy/page.js
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Lock, 
  Eye, 
  Database, 
  Mail, 
  Cookie, 
  UserCheck,
  Share2,
  Shield,
  Trash2,
  Globe,
  Smartphone,
  CreditCard
} from 'lucide-react';

export default function PrivacyPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sections = [
    {
      icon: Database,
      title: '1. Information We Collect',
      content: `We collect the following types of information:
      
      • Personal Information: Name, email address, phone number, shipping address, billing address
      • Account Information: Username, password, order history
      • Payment Information: Credit/debit card details, bKash/Nagad numbers (processed securely via payment gateways)
      • Device Information: IP address, browser type, device type
      • Usage Data: Pages visited, time spent, products viewed, search queries`,
    },
    {
      icon: Lock,
      title: '2. How We Use Your Information',
      content: `We use your information to:
      
      • Process and fulfill your orders
      • Communicate with you about your orders and account
      • Improve our website and product recommendations
      • Send marketing communications (with your consent)
      • Prevent fraud and ensure security
      • Comply with legal obligations`,
    },
    {
      icon: Cookie,
      title: '3. Cookies & Tracking Technologies',
      content: `We use cookies and similar tracking technologies to:
      
      • Remember your preferences and cart items
      • Analyze website traffic and usage
      • Personalize your shopping experience
      • Provide targeted advertisements
      
      You can control cookie settings through your browser preferences. Disabling cookies may affect website functionality.`,
    },
    {
      icon: Share2,
      title: '4. Information Sharing',
      content: `We do not sell your personal information. We may share your information with:
      
      • Delivery partners to ship your orders
      • Payment processors to handle transactions
      • Service providers who assist our operations
      • Law enforcement when required by law
      
      All third parties are contractually obligated to protect your data.`,
    },
    {
      icon: Shield,
      title: '5. Data Security',
      content: `We implement industry-standard security measures to protect your information:
      
      • SSL encryption for all data transmissions
      • Secure servers with firewalls
      • Regular security audits
      • Limited employee access to personal data
      
      While we strive for complete security, no method of transmission is 100% secure.`,
    },
    {
      icon: UserCheck,
      title: '6. Your Rights',
      content: `You have the right to:
      
      • Access your personal data
      • Correct inaccurate information
      • Request deletion of your data
      • Opt-out of marketing communications
      • Data portability
      
      To exercise these rights, contact our support team.`,
    },
    {
      icon: Trash2,
      title: '7. Data Retention',
      content: `We retain your personal information for as long as necessary to:
      
      • Fulfill the purposes outlined in this policy
      • Comply with legal obligations
      • Resolve disputes
      • Enforce our agreements
      
      Inactive accounts may be deleted after 2 years of inactivity.`,
    },
    {
      icon: Globe,
      title: '8. Children\'s Privacy',
      content: `ToyMart is committed to protecting children's privacy:
      
      • We do not knowingly collect information from children under 13
      • Parental consent is required for children's accounts
      • Parents can review or delete their child's information
      • All toys are marketed to parents and guardians`,
    },
    {
      icon: Smartphone,
      title: '9. Mobile App & Device Permissions',
      content: `When using our mobile services, we may request:
      
      • Camera access (for product scanning)
      • Location access (for delivery estimates)
      • Storage access (for saving product images)
      
      These permissions are optional and can be revoked anytime.`,
    },
    {
      icon: CreditCard,
      title: '10. Payment Information Security',
      content: `Your payment information is secure:
      
      • We use PCI-compliant payment gateways
      • No credit card details are stored on our servers
      • bKash/Nagad transactions are encrypted
      • COD orders require no online payment`,
    },
  ];

  const floatingElements = [
    { emoji: '🔐', left: '3%', top: '15%', delay: 0, duration: 8 },
    { emoji: '🛡️', left: '92%', top: '25%', delay: 1, duration: 10 },
    { emoji: '👁️', left: '10%', top: '65%', delay: 2, duration: 9 },
    { emoji: '🍪', left: '85%', top: '75%', delay: 0.5, duration: 11 },
    { emoji: '📧', left: '25%', top: '85%', delay: 1.5, duration: 7 },
    { emoji: '🔒', left: '75%', top: '40%', delay: 2.5, duration: 12 },
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
              <Lock className="w-4 h-4 text-[#4A8A90]" />
              <span className="text-xs font-medium text-[#4A8A90]">PRIVACY POLICY</span>
              <Eye className="w-4 h-4 text-[#FFB6C1]" />
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D3A5C] mb-4" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
              Privacy Policy 🔒
            </h1>
            
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Your privacy matters to us. Learn how we collect, use, and protect your personal information
              when you shop at ToyMart.
            </p>
            
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-gray-500">
              <Lock className="w-3 h-3" />
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

      {/* Privacy Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Privacy Banner */}
          <div className="bg-[#D4EDEE] rounded-xl p-4 mb-8 flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#4A8A90] flex-shrink-0" />
            <p className="text-sm text-gray-700">
              We are committed to protecting your privacy. This policy explains how we handle your personal information.
              By using ToyMart, you consent to our privacy practices.
            </p>
          </div>

          {/* Privacy Sections */}
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

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] rounded-xl p-6 text-white text-center"
          >
            <h3 className="text-lg font-bold mb-2">Questions About Privacy?</h3>
            <p className="text-sm text-white/90 mb-3">
              If you have questions about our privacy practices or want to exercise your data rights, contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <button className="bg-white text-[#4A8A90] px-5 py-2 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-all">
                  Contact Us
                </button>
              </Link>
              <Link href="mailto:privacy@toymart.com">
                <button className="border-2 border-white text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-white hover:text-[#4A8A90] transition-all">
                  Email Privacy Team
                </button>
              </Link>
            </div>
          </motion.div>

          {/* GDPR/CCPA Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 text-center text-xs text-gray-400"
          >
            <p>
              ToyMart complies with applicable data protection laws including GDPR (for EU customers) 
              and CCPA (for California residents). For more information about your specific rights, 
              please contact our Data Protection Officer.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}