

// 'use client';

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronLeft, ChevronRight, Quote, Star, Eye, CheckCircle, Image as ImageIcon, Video, X, Sparkles, Award, Heart, Shield, Truck, CreditCard } from 'lucide-react';
// import ReviewModal from './ReviewModal';
// import { toast } from 'sonner';

// export default function Testimonials() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
//   const [isAllReviewsModalOpen, setIsAllReviewsModalOpen] = useState(false);
//   const [featuredReviews, setFeaturedReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
//   const [hoveredCard, setHoveredCard] = useState(null);

//   // Fetch featured and approved reviews
//   useEffect(() => {
//     fetchFeaturedReviews();
//   }, []);

//   const fetchFeaturedReviews = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/featured?limit=9`);
//       const data = await response.json();
      
//       if (data.success) {
//         setFeaturedReviews(data.data || []);
//       } else {
//         console.error('Failed to fetch featured reviews:', data.error);
//         setFeaturedReviews([]);
//       }
//     } catch (error) {
//       console.error('Error fetching featured reviews:', error);
//       setFeaturedReviews([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fixed single image (keeping the original)
//   const fixedImage = 'https://i.ibb.co.com/MWF9N8y/Gemini-Generated-Image-x69sikx69sikx69s-1-removebg-preview.png';

//   // Get 3 testimonials to display (current + next 2)
//   const getVisibleTestimonials = () => {
//     if (featuredReviews.length === 0) return [];
//     const result = [];
//     for (let i = 0; i < 3; i++) {
//       result.push(featuredReviews[(currentIndex + i) % featuredReviews.length]);
//     }
//     return result;
//   };

//   const visibleTestimonials = getVisibleTestimonials();

//   const handlePrev = () => {
//     if (featuredReviews.length === 0) return;
//     setCurrentIndex((prev) => (prev - 1 + featuredReviews.length) % featuredReviews.length);
//   };

//   const handleNext = () => {
//     if (featuredReviews.length === 0) return;
//     setCurrentIndex((prev) => (prev + 1) % featuredReviews.length);
//   };

//   // Render stars with animation
//   const renderStars = (rating) => {
//     return (
//       <div className="flex gap-0.5">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <motion.div
//             key={star}
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: star * 0.1 }}
//           >
//             <Star
//               className={`w-4 h-4 ${
//                 star <= rating 
//                   ? 'fill-[#FFD93D] text-[#FFD93D] drop-shadow-sm' 
//                   : 'text-gray-200'
//               } transition-colors`}
//             />
//           </motion.div>
//         ))}
//       </div>
//     );
//   };

//   // Truncate text
//   const truncateText = (text, maxLength) => {
//     if (!text) return '';
//     return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
//   };

//   // Get random pastel color for avatar
//   const getAvatarColor = (name) => {
//     const colors = [
//       'from-pink-400 to-rose-400',
//       'from-purple-400 to-indigo-400',
//       'from-blue-400 to-cyan-400',
//       'from-green-400 to-emerald-400',
//       'from-yellow-400 to-orange-400',
//       'from-red-400 to-pink-400',
//       'from-teal-400 to-green-400',
//     ];
//     const index = name?.length % colors.length || 0;
//     return colors[index];
//   };

//   // Detail View Modal
//   const DetailViewModal = () => (
//     <AnimatePresence>
//       {isDetailModalOpen && selectedReview && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen px-4 py-8">
//             <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDetailModalOpen(false)} />
            
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 20 }}
//               className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
//             >
//               <div className="sticky top-0 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl">
//                 <div className="flex items-center gap-2">
//                   <Sparkles className="w-5 h-5 text-white animate-pulse" />
//                   <h2 className="text-xl font-bold text-white">Review Details</h2>
//                 </div>
//                 <button
//                   onClick={() => setIsDetailModalOpen(false)}
//                   className="p-2 hover:bg-white/20 rounded-full transition-colors"
//                 >
//                   <X className="w-5 h-5 text-white" />
//                 </button>
//               </div>
              
//               <div className="p-6 space-y-5">
//                 {/* Customer Info */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarColor(selectedReview.userName)} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
//                       {selectedReview.userName?.charAt(0).toUpperCase() || 'U'}
//                     </div>
//                     <div>
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <p className="font-bold text-gray-900">{selectedReview.userName}</p>
//                         {selectedReview.isVerifiedPurchase && (
//                           <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
//                             <CheckCircle className="w-3 h-3" />
//                             Verified Purchase
//                           </span>
//                         )}
//                       </div>
//                       <p className="text-sm text-gray-500">
//                         {new Date(selectedReview.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="bg-yellow-50 px-3 py-1 rounded-full">
//                     {renderStars(selectedReview.rating)}
//                   </div>
//                 </div>
                
//                 {/* Product Info */}
//                 {selectedReview.productName && (
//                   <div className="bg-gradient-to-r from-[#4A8A90]/10 to-[#FFB6C1]/10 rounded-xl p-4 border border-[#FFD93D]/30">
//                     <p className="text-xs text-[#4A8A90] font-semibold mb-1">🎁 Product</p>
//                     <p className="font-medium text-gray-800">{selectedReview.productName}</p>
//                   </div>
//                 )}
                
//                 {/* Title */}
//                 {selectedReview.title && (
//                   <div>
//                     <h3 className="font-bold text-gray-800 text-lg">{selectedReview.title}</h3>
//                   </div>
//                 )}
                
//                 {/* Comment */}
//                 <div className="bg-gray-50 rounded-xl p-4">
//                   <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedReview.comment}</p>
//                 </div>
                
//                 {/* Images */}
//                 {selectedReview.images && selectedReview.images.length > 0 && (
//                   <div>
//                     <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                       <ImageIcon className="w-4 h-4 text-[#4A8A90]" />
//                       📸 Attached Images ({selectedReview.images.length})
//                     </p>
//                     <div className="grid grid-cols-3 gap-2">
//                       {selectedReview.images.map((img, idx) => (
//                         <motion.img
//                           key={idx}
//                           src={img.url}
//                           alt={`Review image ${idx + 1}`}
//                           className="w-full h-32 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity shadow-md"
//                           onClick={() => window.open(img.url, '_blank')}
//                           whileHover={{ scale: 1.02 }}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Video */}
//                 {selectedReview.video?.url && (
//                   <div>
//                     <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                       <Video className="w-4 h-4 text-[#4A8A90]" />
//                       🎥 Attached Video
//                     </p>
//                     <video
//                       src={selectedReview.video.url}
//                       controls
//                       className="w-full rounded-xl shadow-md"
//                     />
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       )}
//     </AnimatePresence>
//   );

//   if (loading) {
//     return (
//       <section className="w-full bg-gradient-to-br from-[#F0F7F7] via-white to-[#FEF9F9] py-16 md:py-24">
//         <div className="max-w-7xl mx-auto px-4 md:px-8">
//           <div className="text-center">
//             <div className="inline-flex items-center gap-2 bg-[#4A8A90]/10 rounded-full px-4 py-1.5 mb-4">
//               <span className="text-lg">⭐</span>
//               <span className="text-[#4A8A90] font-semibold text-sm md:text-base">Trusted by Parents Worldwide</span>
//             </div>
//             <div className="flex justify-center py-12">
//               <div className="w-12 h-12 border-4 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <>
//       <section className="w-full bg-gradient-to-br from-[#F0F7F7] via-white to-[#FEF9F9] py-16 md:py-24 relative overflow-hidden">
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute top-10 left-10 w-32 h-32 bg-[#FFB6C1]/10 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#4A8A90]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
//           {/* Header with Animation */}
//          <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <div className="inline-flex items-center gap-2 mb-3">
//               <Heart className="w-5 h-5 text-[#FFB6C1] fill-[#FFB6C1]" />
//               <span className="text-xs font-medium text-[#4A8A90] tracking-wide uppercase" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>
//                 Happy Parents Share
//               </span>
//               <Heart className="w-5 h-5 text-[#FFB6C1] fill-[#FFB6C1]" />
//             </div>
            
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D3A5C] mb-3" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//               What Our{' '}
//               <span className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] bg-clip-text text-transparent">
//                 Customers Say
//               </span>
//             </h2>
            
//             <p className="text-sm md:text-base text-[#6B7280] max-w-2xl mx-auto" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>
//               Join thousands of happy parents who trust us for quality toys
//             </p>
//           </motion.div>

//           {/* Action Buttons */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.2 }}
//             className="flex justify-center gap-4 mb-10"
//           >
//             <button
//               onClick={() => setIsReviewModalOpen(true)}
//               className="group px-6 py-2.5 bg-gradient-to-r from-[#4A8A90] to-[#5A9AA0] text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
//             >
//               <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
//               Write a Review
//             </button>
//             <button
//               onClick={() => setIsAllReviewsModalOpen(true)}
//               className="group px-6 py-2.5 bg-white border-2 border-[#4A8A90] text-[#4A8A90] font-semibold rounded-full shadow-md hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
//             >
//               <Award className="w-4 h-4" />
//               All Reviews
//             </button>
//           </motion.div>

//           {/* Main Row: Fixed Image + 3 Cards - KEEPING THE ORIGINAL LAYOUT */}
//           <div className="flex flex-col lg:flex-row items-stretch -ml-20">
//             {/* Left: Fixed Main Image with Baby */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5 }}
//               className="flex-shrink-0 lg:w-72 xl:w-80 flex items-center"
//             >
//               <div className="relative w-full">
//                 <div className="absolute -top-4 -left-4 w-24 h-16 bg-[#FFB6C1]/20 rounded-full blur-2xl"></div>
//                 <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#4A8A90]/20 rounded-full blur-2xl"></div>
//                 <img
//                   src={fixedImage}
//                   alt="Happy child with toy"
//                   className="w-full h-auto max-h-64 md:max-h-[348px] object-contain drop-shadow-2xl relative z-10 mx-auto"
//                 />
//               </div>
//             </motion.div>

//             {/* Right: 3 Testimonial Cards in a Row */}
//             <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 -ml-[42px]">
//               {visibleTestimonials.map((review, index) => (
//                 <motion.div
//                   key={`card-${review._id}-${currentIndex}`}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   whileHover={{ y: -8 }}
//                   onHoverStart={() => setHoveredCard(review._id)}
//                   onHoverEnd={() => setHoveredCard(null)}
//                   className="group relative"
//                 >
//                   {/* Animated Border Gradient */}
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  
//                   <div className="relative bg-white rounded-t-4xl rounded-br-4xl  p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
//                     {/* Decorative Elements */}
//                     <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
//                       <Quote className="w-10 h-10 text-[#4A8A90]" />
//                     </div>

//                     {/* Quote Icon */}
//                     <div className="mb-3">
//                       <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center shadow-md">
//                         <Quote className="w-4 h-4 text-white" />
//                       </div>
//                     </div>

//                     {/* Rating with Animation */}
//                     <div className="mb-3 relative z-10">
//                       {renderStars(review.rating)}
//                     </div>

//                     {/* Product Name Badge */}
//                     {review.productName && (
//                       <div className="mb-2">
//                         <span className="text-xs font-semibold text-[#4A8A90] bg-[#4A8A90]/10 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
//                           <span>🎁</span> {truncateText(review.productName, 35)}
//                         </span>
//                       </div>
//                     )}

//                     {/* Review Title */}
//                     {review.title && (
//                       <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">
//                         {review.title}
//                       </h3>
//                     )}

//                     {/* Review Comment (2 lines) */}
//                     <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
//                       "{review.comment}"
//                     </p>

//                     {/* Media Preview with Actual Thumbnails */}
//                     {review.images && review.images.length > 0 && (
//                       <div className="mb-3">
//                         <div className="flex gap-1.5">
//                           {review.images.slice(0, 3).map((img, idx) => (
//                             <motion.img
//                               key={idx}
//                               src={img.url}
//                               alt={`Review pic ${idx + 1}`}
//                               className="w-10 h-10 rounded-lg object-cover cursor-pointer hover:scale-110 transition-transform shadow-sm"
//                               onClick={() => {
//                                 setSelectedReview(review);
//                                 setIsDetailModalOpen(true);
//                               }}
//                               whileHover={{ scale: 1.1 }}
//                             />
//                           ))}
//                           {review.images.length > 3 && (
//                             <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500">
//                               +{review.images.length - 3}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {/* Video Badge */}
//                     {review.video?.url && (
//                       <div className="mb-3">
//                         <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5 w-fit">
//                           <Video className="w-3 h-3 text-[#4A8A90]" />
//                           <span>Has video review</span>
//                         </div>
//                       </div>
//                     )}

//                     {/* Author Info */}
//                     <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
//                       <div className="flex items-center gap-2">
//                         <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(review.userName)} flex items-center justify-center text-white font-bold text-xs shadow-md`}>
//                           {review.userName?.charAt(0).toUpperCase() || 'U'}
//                         </div>
//                         <div>
//                           <div className="flex items-center gap-1">
//                             <p className="font-bold text-gray-800 text-xs">{truncateText(review.userName, 15)}</p>
//                             {review.isVerifiedPurchase && (
//                               <CheckCircle className="w-3 h-3 text-green-500" />
//                             )}
//                           </div>
//                           <p className="text-[9px] text-gray-400">
//                             {new Date(review.createdAt).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </div>
                      
//                       {/* View Details Button */}
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => {
//                           setSelectedReview(review);
//                           setIsDetailModalOpen(true);
//                         }}
//                         className="p-1.5 text-gray-400 hover:text-[#4A8A90] hover:bg-[#4A8A90]/10 rounded-full transition-all"
//                         title="View full review"
//                       >
//                         <Eye className="w-3.5 h-3.5" />
//                       </motion.button>
//                     </div>

//                     {/* Hover Effect Gradient */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#4A8A90]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity pointer-events-none"></div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Controls */}
//           {featuredReviews.length > 3 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="flex items-center justify-center gap-4 mt-12"
//             >
//               <button
//                 onClick={handlePrev}
//                 className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#4A8A90] hover:bg-[#F0F7F7] transition-all duration-300 shadow-sm hover:shadow-lg group"
//                 aria-label="Previous testimonial"
//               >
//                 <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-[#4A8A90] group-hover:scale-110 transition-transform" />
//               </button>

//               {/* Dots Navigation */}
//               <div className="flex gap-2">
//                 {Array.from({ length: Math.ceil(featuredReviews.length / 3) }).map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentIndex(index * 3)}
//                     className={`h-2 rounded-full transition-all duration-500 ${
//                       Math.floor(currentIndex / 3) === index
//                         ? 'bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] w-8'
//                         : 'bg-gray-300 w-2 hover:bg-[#4A8A90] hover:w-4'
//                     }`}
//                     aria-label={`Go to testimonial set ${index + 1}`}
//                   />
//                 ))}
//               </div>

//               <button
//                 onClick={handleNext}
//                 className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#4A8A90] hover:bg-[#F0F7F7] transition-all duration-300 shadow-sm hover:shadow-lg group"
//                 aria-label="Next testimonial"
//               >
//                 <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#4A8A90] group-hover:scale-110 transition-transform" />
//               </button>
//             </motion.div>
//           )}

//           {/* Trust Badge with Icons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-gray-200"
//           >
//             {[
//               { icon: <Trophy className="w-5 h-5" />, text: 'Award Winning Toys', color: 'text-yellow-500' },
//               { icon: <Shield className="w-5 h-5" />, text: '100% Safe Materials', color: 'text-green-500' },
//               { icon: <Truck className="w-5 h-5" />, text: 'Free Shipping Worldwide', color: 'text-blue-500' },
//               { icon: <CreditCard className="w-5 h-5" />, text: 'Secure Payment', color: 'text-purple-500' },
//             ].map((item, idx) => (
//               <motion.div
//                 key={idx}
//                 whileHover={{ scale: 1.05 }}
//                 className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
//               >
//                 <span className={`text-xl ${item.color}`}>{item.icon}</span>
//                 <span className="text-sm text-gray-600">{item.text}</span>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Write a Review Modal */}
//       <ReviewModal
//         isOpen={isReviewModalOpen}
//         onClose={() => setIsReviewModalOpen(false)}
//         onReviewSubmitted={() => {
//           fetchFeaturedReviews();
//           console.log('Review submitted successfully');
//         }}
//         productId={null}
//         productName={null}
//       />

//       {/* All Reviews Modal */}
//       <ReviewModal
//         isOpen={isAllReviewsModalOpen}
//         onClose={() => setIsAllReviewsModalOpen(false)}
//         onReviewSubmitted={() => {}}
//         productId={null}
//         productName={null}
//         viewAllMode={true}
//       />

//       {/* Detail View Modal */}
//       <DetailViewModal />
//     </>
//   );
// }

// // Trophy icon component
// const Trophy = ({ className }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//   </svg>
// );

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, Eye, CheckCircle, Image as ImageIcon, Video, X, Sparkles, Award, Heart, Shield, Truck, CreditCard } from 'lucide-react';
import ReviewModal from './ReviewModal';
import { toast } from 'sonner';

export default function Testimonials() {
   const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isAllReviewsModalOpen, setIsAllReviewsModalOpen] = useState(false);
  const [featuredReviews, setFeaturedReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isCardHovering, setIsCardHovering] = useState(false);
  const intervalRef = useRef(null);

  // Fetch featured and approved reviews
  useEffect(() => {
    fetchFeaturedReviews();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only start auto-scroll if:
    // 1. Not hovering on any card
    // 2. There are reviews
    // 3. More than 3 reviews (enough to scroll)
    if (!isCardHovering && featuredReviews.length > 3) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredReviews.length);
      }, 5000); // 5 seconds
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isCardHovering, featuredReviews.length]);

  // Reset auto-scroll when manually changing index
  const handleManualPrev = () => {
    if (featuredReviews.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + featuredReviews.length) % featuredReviews.length);
    // Pause auto-scroll briefly after manual click
    setIsCardHovering(true);
    setTimeout(() => setIsCardHovering(false), 3000);
  };

  const handleManualNext = () => {
    if (featuredReviews.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % featuredReviews.length);
    // Pause auto-scroll briefly after manual click
    setIsCardHovering(true);
    setTimeout(() => setIsCardHovering(false), 3000);
  };

  const fetchFeaturedReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/featured?limit=9`);
      const data = await response.json();
      
      if (data.success) {
        setFeaturedReviews(data.data || []);
      } else {
        console.error('Failed to fetch featured reviews:', data.error);
        setFeaturedReviews([]);
      }
    } catch (error) {
      console.error('Error fetching featured reviews:', error);
      setFeaturedReviews([]);
    } finally {
      setLoading(false);
    }
  };

  // Fixed single image
  const fixedImage = 'https://i.ibb.co.com/MWF9N8y/Gemini-Generated-Image-x69sikx69sikx69s-1-removebg-preview.png';

  // Get 3 testimonials to display
  const getVisibleTestimonials = () => {
    if (featuredReviews.length === 0) return [];
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % featuredReviews.length;
      result.push(featuredReviews[index]);
    }
    return result;
  };

  const visibleTestimonials = getVisibleTestimonials();

  // Render stars
  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'fill-[#FFD93D] text-[#FFD93D] drop-shadow-sm' 
                : 'text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  // Truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Get avatar color
  const getAvatarColor = (name) => {
    const colors = [
      'from-pink-400 to-rose-400',
      'from-purple-400 to-indigo-400',
      'from-blue-400 to-cyan-400',
      'from-green-400 to-emerald-400',
      'from-yellow-400 to-orange-400',
      'from-red-400 to-pink-400',
      'from-teal-400 to-green-400',
    ];
    const index = name?.length % colors.length || 0;
    return colors[index];
  };

  // Detail View Modal
  const DetailViewModal = () => (
    <AnimatePresence>
      {isDetailModalOpen && selectedReview && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDetailModalOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  <h2 className="text-xl font-bold text-white">Review Details</h2>
                </div>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <div className="p-6 space-y-5">
                {/* Customer Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarColor(selectedReview.userName)} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                      {selectedReview.userName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-gray-900">{selectedReview.userName}</p>
                        {selectedReview.isVerifiedPurchase && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3" />
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(selectedReview.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="bg-yellow-50 px-3 py-1 rounded-full">
                    {renderStars(selectedReview.rating)}
                  </div>
                </div>
                
                {/* Product Info */}
                {selectedReview.productName && (
                  <div className="bg-gradient-to-r from-[#4A8A90]/10 to-[#FFB6C1]/10 rounded-xl p-4 border border-[#FFD93D]/30">
                    <p className="text-xs text-[#4A8A90] font-semibold mb-1">🎁 Product</p>
                    <p className="font-medium text-gray-800">{selectedReview.productName}</p>
                  </div>
                )}
                
                {/* Title */}
                {selectedReview.title && (
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{selectedReview.title}</h3>
                  </div>
                )}
                
                {/* Comment */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedReview.comment}</p>
                </div>
                
                {/* Images */}
                {selectedReview.images && selectedReview.images.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#4A8A90]" />
                      📸 Attached Images ({selectedReview.images.length})
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedReview.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img.url}
                          alt={`Review image ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity shadow-md"
                          onClick={() => window.open(img.url, '_blank')}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Video */}
                {selectedReview.video?.url && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Video className="w-4 h-4 text-[#4A8A90]" />
                      🎥 Attached Video
                    </p>
                    <video
                      src={selectedReview.video.url}
                      controls
                      className="w-full rounded-xl shadow-md"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  if (loading) {
    return (
      <section className="w-full bg-gradient-to-br from-[#F0F7F7] via-white to-[#FEF9F9] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#4A8A90]/10 rounded-full px-4 py-1.5 mb-4">
              <span className="text-lg">⭐</span>
              <span className="text-[#4A8A90] font-semibold text-sm md:text-base">Trusted by Parents Worldwide</span>
            </div>
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-full bg-gradient-to-br from-[#F0F7F7] via-white to-[#FEF9F9] py-16 md:py-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#FFB6C1]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#4A8A90]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-[#FFB6C1] fill-[#FFB6C1]" />
              <span className="text-xs font-medium text-[#4A8A90] tracking-wide uppercase" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>
                Happy Parents Share
              </span>
              <Heart className="w-5 h-5 text-[#FFB6C1] fill-[#FFB6C1]" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D3A5C] mb-3" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
              What Our{' '}
              <span className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] bg-clip-text text-transparent">
                Customers Say
              </span>
            </h2>
            
            <p className="text-sm md:text-base text-[#6B7280] max-w-2xl mx-auto" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>
              Join thousands of happy parents who trust us for quality toys
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-4 mb-10"
          >
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="group px-6 py-2.5 bg-gradient-to-r from-[#4A8A90] to-[#5A9AA0] text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Write a Review
            </button>
           <button
  onClick={() => router.push('/reviews')}
  className="group px-6 py-2.5 bg-white border-2 border-[#4A8A90] text-[#4A8A90] font-semibold rounded-full shadow-md hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
>
  <Award className="w-4 h-4" />
  All Reviews
</button>
          </motion.div>

          {/* Main Row: Fixed Image + 3 Cards */}
          <div className="flex flex-col lg:flex-row items-stretch -ml-20">
            {/* Left: Fixed Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 lg:w-72 xl:w-80 flex items-center"
            >
              <div className="relative w-full">
                <div className="absolute -top-4 -left-4 w-24 h-16 bg-[#FFB6C1]/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#4A8A90]/20 rounded-full blur-2xl"></div>
                <img
                  src={fixedImage}
                  alt="Happy child with toy"
                  className="w-full h-auto max-h-64 md:max-h-[348px] object-contain drop-shadow-2xl relative z-10 mx-auto"
                />
              </div>
            </motion.div>

            {/* Right: 3 Testimonial Cards */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 -ml-[42px]">
              {visibleTestimonials.map((review, index) => (
                <motion.div
                  key={`card-${review._id}-${currentIndex}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onHoverStart={() => {
                    setHoveredCard(review._id);
                    setIsCardHovering(true);
                  }}
                  onHoverEnd={() => {
                    setHoveredCard(null);
                    setIsCardHovering(false);
                  }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  
                  <div className="relative bg-white rounded-t-4xl rounded-br-4xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                    {/* Quote Icon */}
                    <div className="mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center shadow-md">
                        <Quote className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="mb-3 relative z-10">
                      {renderStars(review.rating)}
                    </div>

                    {/* Product Name Badge */}
                    {review.productName && (
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-[#4A8A90] bg-[#4A8A90]/10 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          🎁 {truncateText(review.productName, 35)}
                        </span>
                      </div>
                    )}

                    {/* Review Title */}
                    {review.title && (
                      <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">
                        {review.title}
                      </h3>
                    )}

                    {/* Review Comment */}
                    <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
                      "{review.comment}"
                    </p>

                    {/* Images Preview */}
                    {review.images && review.images.length > 0 && (
                      <div className="mb-3">
                        <div className="flex gap-1.5">
                          {review.images.slice(0, 3).map((img, idx) => (
                            <img
                              key={idx}
                              src={img.url}
                              alt={`Review pic ${idx + 1}`}
                              className="w-10 h-10 rounded-lg object-cover cursor-pointer hover:scale-110 transition-transform shadow-sm"
                              onClick={() => {
                                setSelectedReview(review);
                                setIsDetailModalOpen(true);
                              }}
                            />
                          ))}
                          {review.images.length > 3 && (
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500">
                              +{review.images.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Video Badge */}
                    {review.video?.url && (
                      <div className="mb-3">
                        <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5 w-fit">
                          <Video className="w-3 h-3 text-[#4A8A90]" />
                          <span>Has video review</span>
                        </div>
                      </div>
                    )}

                    {/* Author Info */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(review.userName)} flex items-center justify-center text-white font-bold text-xs shadow-md`}>
                          {review.userName?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="font-bold text-gray-800 text-xs">{truncateText(review.userName, 15)}</p>
                            {review.isVerifiedPurchase && (
                              <CheckCircle className="w-3 h-3 text-green-500" />
                            )}
                          </div>
                          <p className="text-[9px] text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          setSelectedReview(review);
                          setIsDetailModalOpen(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-[#4A8A90] hover:bg-[#4A8A90]/10 rounded-full transition-all"
                        title="View full review"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          {featuredReviews.length > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 mt-12"
            >
              <button
                onClick={handleManualPrev}
                className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#4A8A90] hover:bg-[#F0F7F7] transition-all duration-300 shadow-sm hover:shadow-lg group"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-[#4A8A90] group-hover:scale-110 transition-transform" />
              </button>

              {/* Dots Navigation */}
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(featuredReviews.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index * 3);
                      setIsCardHovering(true);
                      setTimeout(() => setIsCardHovering(false), 3000);
                    }}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      Math.floor(currentIndex / 3) === index
                        ? 'bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] w-8'
                        : 'bg-gray-300 w-2 hover:bg-[#4A8A90] hover:w-4'
                    }`}
                    aria-label={`Go to testimonial set ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleManualNext}
                className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#4A8A90] hover:bg-[#F0F7F7] transition-all duration-300 shadow-sm hover:shadow-lg group"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#4A8A90] group-hover:scale-110 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-gray-200"
          >
            {[
              { icon: <Trophy className="w-5 h-5" />, text: 'Award Winning Toys', color: 'text-yellow-500' },
              { icon: <Shield className="w-5 h-5" />, text: '100% Safe Materials', color: 'text-green-500' },
              { icon: <Truck className="w-5 h-5" />, text: 'Free Shipping Worldwide', color: 'text-blue-500' },
              { icon: <CreditCard className="w-5 h-5" />, text: 'Secure Payment', color: 'text-purple-500' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
              >
                <span className={`text-xl ${item.color}`}>{item.icon}</span>
                <span className="text-sm text-gray-600">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewSubmitted={() => {
          fetchFeaturedReviews();
        }}
        productId={null}
        productName={null}
      />

      <ReviewModal
        isOpen={isAllReviewsModalOpen}
        onClose={() => setIsAllReviewsModalOpen(false)}
        onReviewSubmitted={() => {}}
        productId={null}
        productName={null}
        viewAllMode={true}
      />

      <DetailViewModal />
    </>
  );
}

// Trophy icon component
const Trophy = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);