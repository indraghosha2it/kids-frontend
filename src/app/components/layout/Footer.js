'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTruck,
  FaShieldAlt,
  FaGift,
  FaYoutube,
  FaPinterest
} from 'react-icons/fa';
import { HiOutlineBadgeCheck } from 'react-icons/hi';

export default function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const companyInfo = {
    name: "ToyMart",
    tagline: "Bringing Joy to Every Child's Smile",
    address: "Dhaka, Bangladesh",
    phone: "+880 1234 567890",
    email: "hello@toymart.com",
    whatsapp: "8801234567890",
    hours: "Mon-Sat: 9AM - 8PM | Sun: Closed",
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      pinterest: "https://pinterest.com",
      youtube: "https://youtube.com",
    }
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Toys', href: '/products' },
    { name: 'Blog', href: '/blog' },
    { name: 'Flash Sale', href: '/flash-sale' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const supportLinks = [
   
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    
  ];

  const openGmail = (email) => {
    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
  };

  return (
    <footer className="relative text-white overflow-hidden" style={{ backgroundColor: '#1E6675' }}>
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#00D3F2] via-white to-[#00D3F2]"></div>
      
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#00D3F2] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFB6C1] rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-5 lg:py-4 relative z-10">
        
        {/* Main Grid - 4 Columns Layout */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-6 flex flex-col space-y-5 lg:space-y-0">
          
          {/* Column 1: Company Info */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            <div className="flex flex-col items-center lg:items-start gap-1 mb-2">
              <div className="relative mb-1">
                <img 
                  src="https://i.ibb.co.com/DPz8BcQm/favicon-ico.png"
                  alt="ToyMart"
                  className="h-10 w-auto relative z-10"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-[#00D3F2] to-white bg-clip-text text-transparent">
                  {companyInfo.name}
                </h2>
                <p className="text-[10px] text-white/60">Est. 2026 · Bangladesh</p>
              </div>
            </div>
            
            <p className="text-white/70 text-[10px] mb-2 leading-relaxed max-w-xs">
              {companyInfo.tagline}
            </p>

            {/* Verified Badges */}
            <div className="flex flex-wrap gap-1.5 mb-2 justify-center lg:justify-start">
              <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1 border border-white/20">
                <HiOutlineBadgeCheck className="text-[#00D3F2] text-[10px]" />
                <span className="text-[9px] font-medium text-white/80">Verified</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1 border border-white/20">
                <FaShieldAlt className="text-[#00D3F2] text-[10px]" />
                <span className="text-[9px] font-medium text-white/80">Safe Toys</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-white mb-2 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-6 h-0.5 bg-gradient-to-r from-[#00D3F2] to-transparent"></span>
            </h3>
            <ul className="space-y-1.5 mt-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-white/60 hover:text-[#00D3F2] transition-colors duration-200 text-[10px] flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#00D3F2] transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support + Connect With Us (Combined - No gap between) */}
          <div>
            {/* Support Links */}
            <div>
              <h3 className="text-xs font-semibold text-white mb-2 relative inline-block">
                Support
                <span className="absolute -bottom-1 left-0 w-6 h-0.5 bg-gradient-to-r from-[#00D3F2] to-transparent"></span>
              </h3>
              <ul className="space-y-1.5 mt-2">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-white/60 hover:text-[#00D3F2] transition-colors duration-200 text-[10px] flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#00D3F2] transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect With Us - Immediately after Support (no gap) */}
            <div className="mt-3">
              <h3 className="text-xs font-semibold text-white mb-2 relative inline-block">
                Connect With Us
                <span className="absolute -bottom-1 left-0 w-6 h-0.5 bg-gradient-to-r from-[#00D3F2] to-transparent"></span>
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[
                  { icon: <FaFacebookF />, href: companyInfo.social.facebook, label: 'Facebook' },
                  { icon: <FaInstagram />, href: companyInfo.social.instagram, label: 'Instagram' },
                  { icon: <FaTwitter />, href: companyInfo.social.twitter, label: 'Twitter' },
                  { icon: <FaPinterest />, href: companyInfo.social.pinterest, label: 'Pinterest' },
                  { icon: <FaYoutube />, href: companyInfo.social.youtube, label: 'YouTube' },
                  { icon: <FaWhatsapp />, href: `https://wa.me/${companyInfo.whatsapp}?text=Hi%20ToyMart%2C%20I'm%20interested%20in%20your%20toys`, label: 'WhatsApp', target: '_blank', rel: 'noopener noreferrer' },
                  { icon: <FaEnvelope />, onClick: () => openGmail(companyInfo.email), isButton: true, label: 'Gmail' },
                ].map((social, index) => (
                  social.isButton ? (
                    <motion.button
                      key={index}
                      onClick={social.onClick}
                      className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#00D3F2]/20 transition-all duration-300 group"
                      whileHover={{ y: -1 }}
                      title={social.label}
                    >
                      <span className="text-white/70 group-hover:text-[#00D3F2] transition-colors text-[10px]">
                        {social.icon}
                      </span>
                    </motion.button>
                  ) : (
                    <motion.a
                      key={index}
                      href={social.href}
                      target={social.target || "_blank"}
                      rel={social.rel || "noopener noreferrer"}
                      className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#00D3F2]/20 transition-all duration-300 group"
                      whileHover={{ y: -1 }}
                      title={social.label}
                    >
                      <span className="text-white/70 group-hover:text-[#00D3F2] transition-colors text-[10px]">
                        {social.icon}
                      </span>
                    </motion.a>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-xs font-semibold text-white mb-2 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-6 h-0.5 bg-gradient-to-r from-[#00D3F2] to-transparent"></span>
            </h3>
            
            <div className="space-y-1.5 mt-2">
              <motion.a 
                href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-white/70 hover:text-[#00D3F2] transition-colors group text-[10px]"
                whileHover={{ x: 2 }}
              >
                <div className="w-4 h-4 rounded-lg bg-[#00D3F2]/20 flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-[#00D3F2] text-[8px]" />
                </div>
                <span className="text-[10px] leading-tight">{companyInfo.address}</span>
              </motion.a>
              
              <motion.a 
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2 text-white/70 hover:text-[#00D3F2] transition-colors group text-[10px]"
                whileHover={{ x: 2 }}
              >
                <div className="w-4 h-4 rounded-lg bg-[#00D3F2]/20 flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-[#00D3F2] text-[8px]" />
                </div>
                <span className="text-[10px]">{companyInfo.phone}</span>
              </motion.a>
              
              <motion.button 
                onClick={() => openGmail(companyInfo.email)}
                className="flex items-center gap-2 text-white/70 hover:text-[#00D3F2] transition-colors group w-full text-left text-[10px]"
                whileHover={{ x: 2 }}
              >
                <div className="w-4 h-4 rounded-lg bg-[#00D3F2]/20 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-[#00D3F2] text-[8px]" />
                </div>
                <span className="text-[10px]">{companyInfo.email}</span>
              </motion.button>
              
              <div className="flex items-start gap-2 text-white/70 text-[10px]">
                <div className="w-4 h-4 rounded-lg bg-[#00D3F2]/20 flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-[#00D3F2] text-[8px]" />
                </div>
                <span className="text-[10px] leading-tight">{companyInfo.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-3 mt-3 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
            <p className="text-white/40 text-[9px]">
              © {currentYear} <span className="text-white/60 font-medium">ToyMart</span>. All rights reserved.
            </p>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <FaTruck className="text-[#00D3F2] text-[8px]" />
                <span className="text-white/50 text-[8px]">Free Shipping ৳1500+</span>
              </div>
              <div className="w-px h-2 bg-white/20"></div>
              <div className="flex items-center gap-1">
                <FaShieldAlt className="text-[#00D3F2] text-[8px]" />
                <span className="text-white/50 text-[8px]">Safe & Non-Toxic</span>
              </div>
              <div className="w-px h-2 bg-white/20"></div>
              <div className="flex items-center gap-1">
                <FaGift className="text-[#00D3F2] text-[8px]" />
                <span className="text-white/50 text-[8px]">Gift Wrap</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-1.5">
              <span className="text-white/40 text-[8px]">Payments:</span>
              <div className="flex gap-1">
                {['bKash', 'Nagad', 'Visa', 'MC'].map((method) => (
                  <div 
                    key={method}
                    className="px-1 py-0.5 bg-white/10 rounded text-[8px] font-medium text-white/60 border border-white/20"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-[#00D3F2] py-1">
        <div className="container mx-auto px-4">
          <p className="text-white text-center text-[9px] font-medium">
            🎁 Bringing Joy to Every Child's Smile! 🎈
          </p>
        </div>
      </div>
    </footer>
  );
}