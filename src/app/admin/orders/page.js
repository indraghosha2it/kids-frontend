




// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast } from 'sonner';

// import { 
//   FaBox,
//   FaSearch,
//   FaFilter,
//   FaEye,
//   FaEdit,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaTruck,
//   FaClock,
//   FaMoneyBillWave,
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaDownload,
//   FaPrint,
//   FaChevronLeft,
//   FaChevronRight,
//   FaSpinner,
//   FaShippingFast,
//   FaBoxOpen,
//   FaCheckDouble,
//   FaBan,
//   FaUndo,
//   FaFileInvoice,
//   FaExclamationTriangle,
//   FaTrash,
//   FaSave,
//   FaTimes,
//   FaCreditCard,
//   FaMobileAlt
// } from 'react-icons/fa';

// const ORDER_STATUSES = [
//   { value: 'placed', label: 'Placed', color: 'bg-blue-100 text-blue-800', icon: FaClock, nextStatuses: ['confirmed', 'cancelled'] },
//   { value: 'confirmed', label: 'Confirmed', color: 'bg-cyan-100 text-cyan-800', icon: FaCheckCircle, nextStatuses: ['processing', 'cancelled'] },
//   { value: 'processing', label: 'Processing', color: 'bg-purple-100 text-purple-800', icon: FaSpinner, nextStatuses: ['shipped', 'cancelled'] },
//   { value: 'shipped', label: 'Shipped', color: 'bg-indigo-100 text-indigo-800', icon: FaShippingFast, nextStatuses: ['delivered', 'cancelled'] },
//   { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800', icon: FaCheckDouble, nextStatuses: [] },
//   { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: FaBan, nextStatuses: [] },
// ];

// const PAYMENT_STATUSES = [
//   { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
//   { value: 'paid', label: 'Paid', color: 'bg-green-100 text-green-800' },
//   { value: 'failed', label: 'Failed', color: 'bg-red-100 text-red-800' },
//   { value: 'refunded', label: 'Refunded', color: 'bg-orange-100 text-orange-800' }
// ];

// const EditOrderModal = ({ isOpen, onClose, order, onUpdate }) => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     zone: '',
//     area: '',
//     trackingNumber: '',
//     deliveryNote: ''
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (order) {
//       setFormData({
//         fullName: order.customerInfo?.fullName || '',
//         email: order.customerInfo?.email || '',
//         phone: order.customerInfo?.phone || '',
//         address: order.customerInfo?.address || '',
//         city: order.customerInfo?.city || '',
//         zone: order.customerInfo?.zone || '',
//         area: order.customerInfo?.area || '',
//         trackingNumber: order.trackingNumber || '',
//         deliveryNote: order.deliveryNote || ''
//       });
//     }
//   }, [order]);

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`https://kids-backend.vercel.app/api/orders/${order._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           customerInfo: {
//             fullName: formData.fullName,
//             email: formData.email,
//             phone: formData.phone,
//             address: formData.address,
//             city: formData.city,
//             zone: formData.zone,
//             area: formData.area
//           },
//           trackingNumber: formData.trackingNumber,
//           deliveryNote: formData.deliveryNote
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Order updated successfully');
//         onUpdate();
//         onClose();
//       } else {
//         toast.error(data.error || 'Failed to update order');
//       }
//     } catch (error) {
//       console.error('Update order error:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
//       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden">
//         <div className="p-4 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white sticky top-0">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaEdit className="w-5 h-5" />
//               <h2 className="text-lg font-bold">Edit Order</h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
//         </div>

//         <div className="p-5 max-h-[60vh] overflow-y-auto">
//           <div className="space-y-3">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
//                 <input
//                   type="text"
//                   value={formData.fullName}
//                   onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                   className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90]"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90]"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Phone *</label>
//                 <input
//                   type="tel"
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                   className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90]"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
//                 <input
//                   type="text"
//                   value={formData.city}
//                   onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//                   className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90]"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Address *</label>
//                 <textarea
//                   value={formData.address}
//                   onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                   rows="2"
//                   className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90]"
//                 />
//               </div>
          
//               <div className="md:col-span-2">
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Note</label>
//                 <textarea
//                   value={formData.deliveryNote}
//                   onChange={(e) => setFormData({ ...formData, deliveryNote: e.target.value })}
//                   rows="2"
//                   className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90]"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
//           <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
//             Cancel
//           </button>
//           <button onClick={handleSubmit} disabled={loading} className="flex-1 px-3 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] disabled:opacity-50 flex items-center justify-center gap-2 text-sm">
//             {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaSave className="w-3 h-3" />}
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DeleteConfirmModal = ({ isOpen, onClose, order, onDelete }) => {
//   const [loading, setLoading] = useState(false);

//   const handleDelete = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`https://kids-backend.vercel.app/api/orders/${order._id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Order deleted successfully');
//         onDelete();
//         onClose();
//       } else {
//         toast.error(data.error || 'Failed to delete order');
//       }
//     } catch (error) {
//       console.error('Delete order error:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
//         <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white">
//           <div className="flex items-center gap-2">
//             <FaExclamationTriangle className="w-5 h-5" />
//             <h2 className="text-lg font-bold">Delete Order</h2>
//           </div>
//         </div>

//         <div className="p-5 text-center">
//           <p className="text-gray-700 text-sm mb-2">Are you sure you want to delete this order?</p>
//           <p className="text-xs text-gray-500">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
//           <p className="text-xs text-red-500 mt-3">⚠️ This action cannot be undone!</p>
//         </div>

//         <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
//           <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
//             Cancel
//           </button>
//           <button onClick={handleDelete} disabled={loading} className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2 text-sm">
//             {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaTrash className="w-3 h-3" />}
//             Delete Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // const StatusUpdateModal = ({ isOpen, onClose, order, onUpdate }) => {
// //   const [selectedStatus, setSelectedStatus] = useState('');
// //   const [trackingNumber, setTrackingNumber] = useState('');
// //   const [deliveryNote, setDeliveryNote] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     if (order) {
// //       setSelectedStatus(order.orderStatus);
// //       setTrackingNumber(order.trackingNumber || '');
// //       setDeliveryNote(order.deliveryNote || '');
// //     }
// //   }, [order]);

// //   const currentStatusInfo = ORDER_STATUSES.find(s => s.value === selectedStatus);
// //   const availableNextStatuses = currentStatusInfo?.nextStatuses || [];

// //   const handleSubmit = async () => {
// //     if (!selectedStatus) {
// //       toast.error('Please select a status');
// //       return;
// //     }

// //     if (selectedStatus === order.orderStatus) {
// //       toast.error('Please select a different status');
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await fetch(`https://kids-backend.vercel.app/api/orders/${order._id}/status`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: JSON.stringify({
// //           orderStatus: selectedStatus,
// //           trackingNumber,
// //           deliveryNote
// //         })
// //       });

// //       const data = await response.json();
// //       if (data.success) {
// //         toast.success(`Order status updated to ${selectedStatus}`);
        
// //         if (selectedStatus === 'delivered' && order.paymentStatus !== 'paid') {
// //           await fetch(`https://kids-backend.vercel.app/api/orders/${order._id}/payment`, {
// //             method: 'PUT',
// //             headers: {
// //               'Content-Type': 'application/json',
// //               'Authorization': `Bearer ${token}`
// //             },
// //             body: JSON.stringify({ paymentStatus: 'paid' })
// //           });
// //           toast.success('Payment status automatically updated to Paid');
// //         }
        
// //         onUpdate();
// //         onClose();
// //       } else {
// //         toast.error(data.error || 'Failed to update status');
// //       }
// //     } catch (error) {
// //       console.error('Status update error:', error);
// //       toast.error('Network error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
// //       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
// //         <div className="p-4 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-2">
// //               <FaEdit className="w-5 h-5" />
// //               <h2 className="text-lg font-bold">Update Order Status</h2>
// //             </div>
// //             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
// //               <FaTimes className="w-4 h-4" />
// //             </button>
// //           </div>
// //           <p className="text-xs text-white/80 mt-1">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
// //         </div>

// //         <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
// //           <div>
// //             <label className="block text-xs font-medium text-gray-700 mb-1">Current Status</label>
// //             <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${currentStatusInfo?.color || 'bg-gray-100'}`}>
// //               {currentStatusInfo?.icon && <currentStatusInfo.icon className="w-3 h-3" />}
// //               <span>{currentStatusInfo?.label || selectedStatus}</span>
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block text-xs font-medium text-gray-700 mb-1">Change Status To</label>
// //             <select
// //               value={selectedStatus}
// //               onChange={(e) => setSelectedStatus(e.target.value)}
// //               className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
// //             >
// //               <option value={order.orderStatus}>Current: {currentStatusInfo?.label}</option>
// //               {availableNextStatuses.map(statusValue => {
// //                 const statusInfo = ORDER_STATUSES.find(s => s.value === statusValue);
// //                 return (
// //                   <option key={statusValue} value={statusValue}>
// //                     → {statusInfo?.label}
// //                   </option>
// //                 );
// //               })}
// //             </select>
// //             {availableNextStatuses.length === 0 && (
// //               <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
// //                 <FaExclamationTriangle className="w-3 h-3" />
// //                 This order is final and cannot be changed further
// //               </p>
// //             )}
// //           </div>

// //           {/* <div>
// //             <label className="block text-xs font-medium text-gray-700 mb-1">Tracking Number (Optional)</label>
// //             <input
// //               type="text"
// //               value={trackingNumber}
// //               onChange={(e) => setTrackingNumber(e.target.value)}
// //               placeholder="Enter tracking number"
// //               className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
// //             />
// //           </div> */}

// //           <div>
// //             <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Note (Optional)</label>
// //             <textarea
// //               value={deliveryNote}
// //               onChange={(e) => setDeliveryNote(e.target.value)}
// //               rows="2"
// //               placeholder="Add any delivery notes or special instructions"
// //               className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
// //             />
// //           </div>

// //           {selectedStatus === 'delivered' && order.paymentStatus !== 'paid' && (
// //             <div className="bg-green-50 border border-green-200 rounded-lg p-2">
// //               <p className="text-xs text-green-700 flex items-center gap-2">
// //                 <FaCheckCircle className="w-3 h-3" />
// //                 Payment status will be automatically updated to "Paid"
// //               </p>
// //             </div>
// //           )}
// //         </div>

// //         <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
// //           <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
// //             Cancel
// //           </button>
// //           <button
// //             onClick={handleSubmit}
// //             disabled={loading || selectedStatus === order.orderStatus}
// //             className="flex-1 px-3 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
// //           >
// //             {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaCheckCircle className="w-3 h-3" />}
// //             Update Status
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


// const StatusUpdateModal = ({ isOpen, onClose, order, onUpdate }) => {
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [trackingNumber, setTrackingNumber] = useState('');
//   const [deliveryNote, setDeliveryNote] = useState('');
//   const [cancellationReason, setCancellationReason] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (order) {
//       setSelectedStatus(order.orderStatus);
//       setTrackingNumber(order.trackingNumber || '');
//       setDeliveryNote(order.deliveryNote || '');
//       setCancellationReason(order.cancellationReason || '');
//     }
//   }, [order]);

//   const currentStatusInfo = ORDER_STATUSES.find(s => s.value === selectedStatus);
//   const availableNextStatuses = currentStatusInfo?.nextStatuses || [];
//   const isCancelling = selectedStatus === 'cancelled';

//   const handleSubmit = async () => {
//     if (!selectedStatus) {
//       toast.error('Please select a status');
//       return;
//     }

//     if (selectedStatus === order.orderStatus) {
//       toast.error('Please select a different status');
//       return;
//     }

//     // If cancelling, require cancellation reason
//     if (isCancelling && !cancellationReason.trim()) {
//       toast.error('Please provide a cancellation reason');
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`https://kids-backend.vercel.app/api/orders/${order._id}/status`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           orderStatus: selectedStatus,
//           trackingNumber,
//           deliveryNote,
//           cancellationReason: isCancelling ? cancellationReason : undefined
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success(`Order status updated to ${selectedStatus}`);
        
//         if (selectedStatus === 'delivered' && order.paymentStatus !== 'paid') {
//           await fetch(`https://kids-backend.vercel.app/api/orders/${order._id}/payment`, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({ paymentStatus: 'paid' })
//           });
//           toast.success('Payment status automatically updated to Paid');
//         }
        
//         onUpdate();
//         onClose();
//       } else {
//         toast.error(data.error || 'Failed to update status');
//       }
//     } catch (error) {
//       console.error('Status update error:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
//         <div className="p-4 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaEdit className="w-5 h-5" />
//               <h2 className="text-lg font-bold">Update Order Status</h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
//         </div>

//         <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Current Status</label>
//             <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${currentStatusInfo?.color || 'bg-gray-100'}`}>
//               {currentStatusInfo?.icon && <currentStatusInfo.icon className="w-3 h-3" />}
//               <span>{currentStatusInfo?.label || selectedStatus}</span>
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Change Status To</label>
//             <select
//               value={selectedStatus}
//               onChange={(e) => {
//                 setSelectedStatus(e.target.value);
//                 if (e.target.value !== 'cancelled') {
//                   setCancellationReason('');
//                 }
//               }}
//               className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
//             >
//               <option value={order.orderStatus}>Current: {currentStatusInfo?.label}</option>
//               {availableNextStatuses.map(statusValue => {
//                 const statusInfo = ORDER_STATUSES.find(s => s.value === statusValue);
//                 return (
//                   <option key={statusValue} value={statusValue}>
//                     → {statusInfo?.label}
//                   </option>
//                 );
//               })}
//             </select>
//             {availableNextStatuses.length === 0 && (
//               <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
//                 <FaExclamationTriangle className="w-3 h-3" />
//                 This order is final and cannot be changed further
//               </p>
//             )}
//           </div>

//           {/* Cancellation Reason - Only shows when cancelling */}
//           {isCancelling && (
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">
//                 Cancellation Reason <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={cancellationReason}
//                 onChange={(e) => setCancellationReason(e.target.value)}
//                 rows="3"
//                 placeholder="Please provide a reason for cancellation..."
//                 className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
//                 required
//               />
//               <p className="text-xs text-gray-500 mt-1">This reason will be saved with the order</p>
//             </div>
//           )}

//           {/* Delivery Note - Shows for all statuses */}
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Note (Optional)</label>
//             <textarea
//               value={deliveryNote}
//               onChange={(e) => setDeliveryNote(e.target.value)}
//               rows="2"
//               placeholder="Add any delivery notes or special instructions"
//               className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
//             />
//           </div>

//           {selectedStatus === 'delivered' && order.paymentStatus !== 'paid' && (
//             <div className="bg-green-50 border border-green-200 rounded-lg p-2">
//               <p className="text-xs text-green-700 flex items-center gap-2">
//                 <FaCheckCircle className="w-3 h-3" />
//                 Payment status will be automatically updated to "Paid"
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
//           <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading || selectedStatus === order.orderStatus}
//             className="flex-1 px-3 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
//           >
//             {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaCheckCircle className="w-3 h-3" />}
//             Update Status
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// const PaymentStatusModal = ({ isOpen, onClose, order, onUpdate }) => {
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (order) {
//       setSelectedStatus(order.paymentStatus);
//     }
//   }, [order]);

//   const handleSubmit = async () => {
//     if (!selectedStatus) {
//       toast.error('Please select a payment status');
//       return;
//     }

//     if (selectedStatus === order.paymentStatus) {
//       toast.error('Please select a different status');
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`https://kids-backend.vercel.app/api/orders/${order._id}/payment`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ paymentStatus: selectedStatus })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success(`Payment status updated to ${selectedStatus}`);
//         onUpdate();
//         onClose();
//       } else {
//         toast.error(data.error || 'Failed to update payment status');
//       }
//     } catch (error) {
//       console.error('Payment status update error:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const currentPaymentInfo = PAYMENT_STATUSES.find(p => p.value === order?.paymentStatus);
  
//   // Get available payment status options based on current status
//   const getAvailableStatuses = () => {
//     const currentStatus = order?.paymentStatus;
    
//     switch (currentStatus) {
//       case 'pending':
//         // Pending → Can change to Paid or Failed
//         return PAYMENT_STATUSES.filter(status => 
//           status.value === 'paid' || status.value === 'failed'
//         );
//       case 'failed':
//         // Failed → Can change to Paid only
//         return PAYMENT_STATUSES.filter(status => 
//           status.value === 'paid'
//         );
//       case 'paid':
//         // Paid → Can change to Refunded only
//         return PAYMENT_STATUSES.filter(status => 
//           status.value === 'refunded'
//         );
//       case 'refunded':
//         // Refunded → No changes allowed
//         return [];
//       default:
//         return [];
//     }
//   };

//   const availableStatuses = getAvailableStatuses();
//   const canChange = availableStatuses.length > 0;

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
//         <div className="p-4 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaMoneyBillWave className="w-5 h-5" />
//               <h2 className="text-lg font-bold">Update Payment Status</h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
//         </div>

//         <div className="p-4 space-y-3">
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Current Payment Status</label>
//             <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${currentPaymentInfo?.color || 'bg-gray-100'}`}>
//               <FaMoneyBillWave className="w-3 h-3" />
//               <span>{currentPaymentInfo?.label || order?.paymentStatus}</span>
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Change Payment Status To</label>
//             {canChange ? (
//               <select
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//                 className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
//               >
//                 {availableStatuses.map(status => (
//                   <option key={status.value} value={status.value}>
//                     {status.label}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <div className="px-3 py-1.5 text-sm bg-gray-100 text-gray-500 rounded-lg">
//                 No further changes allowed
//               </div>
//             )}
            
//             {/* Status flow information */}
//             {order?.paymentStatus === 'pending' && (
//               <p className="text-xs text-blue-600 mt-1">
//                 → Can change to: Paid or Failed
//               </p>
//             )}
//             {order?.paymentStatus === 'failed' && (
//               <p className="text-xs text-blue-600 mt-1">
//                 → Can change to: Paid
//               </p>
//             )}
//             {order?.paymentStatus === 'paid' && (
//               <p className="text-xs text-blue-600 mt-1">
//                 → Can change to: Refunded
//               </p>
//             )}
//             {order?.paymentStatus === 'refunded' && (
//               <p className="text-xs text-gray-500 mt-1">
//                 → This order has been refunded. No further changes allowed.
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
//           <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading || !canChange || selectedStatus === order?.paymentStatus}
//             className="flex-1 px-3 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
//           >
//             {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaSave className="w-3 h-3" />}
//             Update Payment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const OrderDetailsModal = ({ isOpen, onClose, order, onStatusUpdate, onPaymentUpdate }) => {
//   if (!isOpen || !order) return null;

//   const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
//   const paymentInfo = PAYMENT_STATUSES.find(p => p.value === order.paymentStatus);
//   const canChangeStatus = statusInfo?.nextStatuses?.length > 0;
//   const isCancelled = order.orderStatus === 'cancelled';
//   const isDelivered = order.orderStatus === 'delivered';

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
//       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden">
//         <div className="p-4 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white sticky top-0">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaFileInvoice className="w-5 h-5" />
//               <h2 className="text-lg font-bold">Order Details</h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
//         </div>

//         <div className="p-5 max-h-[60vh] overflow-y-auto">
//           {/* Order Status Badges with Update Buttons */}
//           <div className="flex flex-wrap gap-2 mb-5">
//             <button
//               onClick={() => {
//                 onClose();
//                 canChangeStatus && onStatusUpdate();
//               }}
//               className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs transition-all ${statusInfo?.color || 'bg-gray-100 text-gray-800'} ${canChangeStatus ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
//               title={canChangeStatus ? 'Click to update status' : 'Status cannot be changed'}
//             >
//               {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
//               <span className="font-medium">Order: {statusInfo?.label || order.orderStatus}</span>
//               {canChangeStatus && <FaEdit className="w-2.5 h-2.5 ml-1" />}
//             </button>
//             <button
//               onClick={() => {
//                 onClose();
//                 onPaymentUpdate();
//               }}
//               className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs transition-all ${paymentInfo?.color || 'bg-gray-100 text-gray-800'} cursor-pointer hover:opacity-80`}
//               title="Click to update payment status"
//             >
//               <FaMoneyBillWave className="w-3 h-3" />
//               <span className="font-medium">Payment: {paymentInfo?.label || order.paymentStatus}</span>
//               <FaEdit className="w-2.5 h-2.5 ml-1" />
//             </button>
//             {order.paymentMethod === 'cod' && (
//               <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
//                 <FaMoneyBillWave className="w-3 h-3" />
//                 <span>Cash on Delivery</span>
//               </div>
//             )}
//           </div>

//           {/* Delivery Date Message - Show when order is delivered */}
//           {isDelivered && order.deliveredAt && (
//             <div className="mb-5 bg-green-50 border-l-4 border-green-500 rounded-lg p-3">
//               <div className="flex items-start gap-2">
//                 <FaCheckDouble className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-green-700">Order Delivered</h4>
//                   <p className="text-xs text-green-600 mt-1">
//                     <span className="font-medium">Delivered on:</span> {new Date(order.deliveredAt).toLocaleDateString('en-BD', {
//                       day: '2-digit',
//                       month: 'long',
//                       year: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit'
//                     })}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Cancellation Message - Show when order is cancelled */}
//           {isCancelled && order.cancellationReason && (
//             <div className="mb-5 bg-red-50 border-l-4 border-red-500 rounded-lg p-3">
//               <div className="flex items-start gap-2">
//                 <FaExclamationTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-red-700">Order Cancelled</h4>
//                   <p className="text-xs text-red-600 mt-1">
//                     <span className="font-medium">Reason:</span> {order.cancellationReason}
//                   </p>
//                   {order.cancelledAt && (
//                     <p className="text-xs text-red-500 mt-1">
//                       <span className="font-medium">Cancelled on:</span> {new Date(order.cancelledAt).toLocaleDateString('en-BD', {
//                         day: '2-digit',
//                         month: 'short',
//                         year: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Order Info Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//             <div className="bg-gray-50 rounded-lg p-3">
//               <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
//                 <FaUser className="w-3.5 h-3.5 text-[#4A8A90]" />
//                 Customer Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-gray-500">Name:</span> {order.customerInfo?.fullName}</p>
//                 <p><span className="text-gray-500">Email:</span> {order.customerInfo?.email}</p>
//                 <p><span className="text-gray-500">Phone:</span> {order.customerInfo?.phone}</p>
//                 {order.customerInfo?.whatsapp && (
//                   <p><span className="text-gray-500">WhatsApp:</span> {order.customerInfo.whatsapp}</p>
//                 )}
//               </div>
//             </div>

//             <div className="bg-gray-50 rounded-lg p-3">
//               <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
//                 <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#4A8A90]" />
//                 Delivery Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-gray-500">Address:</span> {order.customerInfo?.address}</p>
//                 <p><span className="text-gray-500">City:</span> {order.customerInfo?.city}</p>
//                 <p><span className="text-gray-500">Upazila/Thana:</span> {order.customerInfo?.zone}</p>
//                 {order.customerInfo?.area && <p><span className="text-gray-500">Area:</span> {order.customerInfo.area}</p>}
//                 {order.trackingNumber && (
//                   <p><span className="text-gray-500">Tracking:</span> <span className="font-mono">{order.trackingNumber}</span></p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Order Items Table */}
//           <div className="mb-5">
//             <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
//               <FaBox className="w-3.5 h-3.5 text-[#4A8A90]" />
//               Order Items
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-xs">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-2 py-1.5 text-left">Product</th>
//                     <th className="px-2 py-1.5 text-center">Qty</th>
//                     <th className="px-2 py-1.5 text-right">Price</th>
//                     <th className="px-2 py-1.5 text-right">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {order.items?.map((item, idx) => (
//                     <tr key={idx} className="border-t border-gray-100">
//                       <td className="px-2 py-2">
//                         <div className="flex items-center gap-2">
//                           <img 
//                             src={item.image || 'https://via.placeholder.com/30'} 
//                             alt={item.productName}
//                             className="w-7 h-7 rounded object-cover"
//                             onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Toy'; }}
//                           />
//                           <div>
//                             <p className="font-medium text-xs">{item.productName}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-2 py-2 text-center">{item.quantity}</td>
//                       <td className="px-2 py-2 text-right">৳{(item.discountPrice || item.regularPrice).toFixed(2)}</td>
//                       <td className="px-2 py-2 text-right font-medium">৳{((item.discountPrice || item.regularPrice) * item.quantity).toFixed(2)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//                 <tfoot className="border-t border-gray-200">
//                   <tr>
//                     <td colSpan="3" className="px-2 py-1 text-right font-medium">Subtotal:</td>
//                     <td className="px-2 py-1 text-right">৳{order.subtotal?.toFixed(2)}</td>
//                   </tr>
//                   <tr>
//                     <td colSpan="3" className="px-2 py-1 text-right font-medium">Shipping:</td>
//                     <td className="px-2 py-1 text-right">৳{order.shippingCost?.toFixed(2)}</td>
//                   </tr>
//                   {order.discount > 0 && (
//                     <tr>
//                       <td colSpan="3" className="px-2 py-1 text-right font-medium text-green-600">Discount:</td>
//                       <td className="px-2 py-1 text-right text-green-600">- ৳{order.discount.toFixed(2)}</td>
//                     </tr>
//                   )}
//                   <tr className="text-sm font-bold">
//                     <td colSpan="3" className="px-2 py-1 text-right">Total:</td>
//                     <td className="px-2 py-1 text-right text-[#4A8A90]">৳{order.total?.toFixed(2)}</td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>

//           {/* Additional Info */}
//           {(order.couponCode || order.deliveryNote) && (
//             <div className="bg-gray-50 rounded-lg p-3">
//               <h3 className="font-semibold text-gray-900 text-sm mb-1.5">Additional Information</h3>
//               {order.couponCode && (
//                 <p className="text-xs"><span className="text-gray-500">Coupon Applied:</span> {order.couponCode}</p>
//               )}
//               {order.deliveryNote && (
//                 <p className="text-xs"><span className="text-gray-500">Delivery Note:</span> {order.deliveryNote}</p>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-2">
//           <button
//             onClick={() => window.print()}
//             className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5 text-sm"
//           >
//             <FaPrint className="w-3 h-3" />
//             Print
//           </button>
//           <button onClick={onClose} className="px-3 py-1.5 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition-colors text-sm">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function AdminOrdersPage() {
//   const router = useRouter();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [paymentFilter, setPaymentFilter] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [stats, setStats] = useState(null);
//   const [sortBy, setSortBy] = useState('-createdAt');

//   // Debounce search to avoid too many API calls
// useEffect(() => {
//   const timer = setTimeout(() => {
//     if (searchTerm !== undefined) {
//       fetchOrders();
//     }
//   }, 500); // Wait 500ms after user stops typing

//   return () => clearTimeout(timer);
// }, [searchTerm, statusFilter, paymentFilter, sortBy, currentPage]);

// const fetchOrders = useCallback(async () => {
//   setLoading(true);
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login');
//       return;
//     }

//     const queryParams = new URLSearchParams({
//       page: currentPage,
//       limit: 20,
//       sort: sortBy  // Make sure sortBy is included
//     });
//     if (searchTerm) queryParams.append('search', searchTerm);
//     if (statusFilter) queryParams.append('orderStatus', statusFilter);
//     if (paymentFilter) queryParams.append('paymentStatus', paymentFilter);

//     console.log('Fetching orders with sort:', sortBy); // Debug log

//     const response = await fetch(`https://kids-backend.vercel.app/api/orders/admin/all?${queryParams}`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });

//     const data = await response.json();
//     if (data.success) {
//       setOrders(data.data);
//       setTotalPages(data.pagination.pages);
//       setTotalOrders(data.pagination.total);
//     } else {
//       toast.error(data.error || 'Failed to fetch orders');
//     }
//   } catch (error) {
//     console.error('Fetch orders error:', error);
//     toast.error('Network error');
//   } finally {
//     setLoading(false);
//   }
// }, [currentPage, searchTerm, statusFilter, paymentFilter, sortBy, router]); // Make sure sortBy is in dependencies

//   const fetchStats = useCallback(async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('https://kids-backend.vercel.app/api/orders/admin/stats', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setStats(data.data);
//       }
//     } catch (error) {
//       console.error('Fetch stats error:', error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchOrders();
//     fetchStats();
//   }, [fetchOrders, fetchStats]);

//   const handleStatusUpdate = () => {
//     fetchOrders();
//     fetchStats();
//   };

//   const handlePaymentUpdate = () => {
//     fetchOrders();
//     fetchStats();
//   };

//   const handleEditOrder = () => {
//     fetchOrders();
//     fetchStats();
//   };

//   const handleDeleteOrder = () => {
//     fetchOrders();
//     fetchStats();
//   };

//   // Add a clear search function
// const clearSearch = () => {
//   setSearchTerm('');
//   setCurrentPage(1); // Reset to first page when clearing search
// };

// // Update the search input JSX:
// <div className="flex-1 relative">
//   <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//   <input
//     type="text"
//     placeholder="Search by Order ID, Customer Name, Email or Phone..."
//     value={searchTerm}
//     onChange={(e) => {
//       setSearchTerm(e.target.value);
//       setCurrentPage(1); // Reset to first page when searching
//     }}
//     className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
//   />
//   {searchTerm && (
//     <button
//       onClick={clearSearch}
//       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//     >
//       <FaTimes className="w-4 h-4" />
//     </button>
//   )}
// </div>

//  const getStatusBadge = (status) => {
//   const statusInfo = ORDER_STATUSES.find(s => s.value === status);
//   if (!statusInfo) return <span className="px-1.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>;
//   return (
//     <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs ${statusInfo.color}`}>
//       <statusInfo.icon className="w-2.5 h-2.5" />
//       {statusInfo.label}
//     </span>
//   );
// };

// const getPaymentBadge = (status) => {
//   const paymentInfo = PAYMENT_STATUSES.find(p => p.value === status);
//   return (
//     <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs ${paymentInfo?.color || 'bg-gray-100 text-gray-800'}`}>
//       <FaMoneyBillWave className="w-2.5 h-2.5" />
//       {paymentInfo?.label || status}
//     </span>
//   );
// };
// const getPaymentMethodBadge = (method) => {
//   const methods = {
//     'cod': { label: 'COD', color: 'bg-orange-100 text-orange-800', icon: FaMoneyBillWave },
//     'online': { label: 'Online', color: 'bg-blue-100 text-blue-800', icon: FaCreditCard },
//     'bkash': { label: 'bKash', color: 'bg-pink-100 text-pink-800', icon: FaMobileAlt },
//     'nagad': { label: 'Nagad', color: 'bg-purple-100 text-purple-800', icon: FaMobileAlt }
//   };
  
//   const info = methods[method] || { label: method || 'Unknown', color: 'bg-gray-100 text-gray-800', icon: FaMoneyBillWave };
//   const Icon = info.icon;
  
//   return (
//     <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs ${info.color}`}>
//       <Icon className="w-2.5 h-2.5" />
//       {info.label}
//     </span>
//   );
// };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-BD', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const exportToCSV = () => {
//     const headers = ['Order ID', 'Customer', 'Phone', 'Total', 'Status', 'Payment', 'Date'];
//     const rows = orders.map(order => [
//       order.orderNumber || order._id.slice(-8).toUpperCase(),
//       order.customerInfo?.fullName,
//       order.customerInfo?.phone,
//       order.total,
//       order.orderStatus,
//       order.paymentStatus,
//       formatDate(order.createdAt)
//     ]);
    
//     const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//     toast.success('CSV exported successfully');
//   };

//   const StatCard = ({ title, value, icon, color }) => (
//     <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-4 shadow-md">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-gray-500">{title}</p>
//           <p className="text-2xl font-bold text-[#2D3A5C]">{value?.toLocaleString() || 0}</p>
//         </div>
//         <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <div className="min-h-screen bg-[#FFF9F0] pb-12 pt-6">
//         <div className="container mx-auto px-4 max-w-7xl">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//             <div className="flex items-center gap-3">
//               <FaBox className="w-7 h-7 text-[#4A8A90]" />
//               <h1 className="text-2xl md:text-3xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                 Order Management
//               </h1>
//             </div>
//             <button
//               onClick={exportToCSV}
//               className="flex items-center gap-2 px-4 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition-colors"
//             >
//               <FaDownload className="w-4 h-4" />
//               Export CSV
//             </button>
//           </div>

//           {/* Stats Cards */}
//           {stats && (
//             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
//               <StatCard title="Total Orders" value={stats.totalOrders} icon={<FaBox className="w-5 h-5 text-blue-500" />} color="bg-blue-100" />
//               <StatCard title="Pending" value={stats.pendingOrders} icon={<FaClock className="w-5 h-5 text-yellow-500" />} color="bg-yellow-100" />
//               <StatCard title="Processing" value={stats.processingOrders} icon={<FaSpinner className="w-5 h-5 text-purple-500" />} color="bg-purple-100" />
//               <StatCard title="Completed" value={stats.completedOrders} icon={<FaCheckCircle className="w-5 h-5 text-green-500" />} color="bg-green-100" />
//               <StatCard title="Cancelled" value={stats.cancelledOrders} icon={<FaTimesCircle className="w-5 h-5 text-red-500" />} color="bg-red-100" />
//               <StatCard title="Today" value={stats.todayOrders} icon={<FaCalendarAlt className="w-5 h-5 text-cyan-500" />} color="bg-cyan-100" />
//               <StatCard title="Revenue" value={stats.totalRevenue} icon={<FaMoneyBillWave className="w-5 h-5 text-emerald-500" />} color="bg-emerald-100" />
//             </div>
//           )}

//       {/* Filters */}
// <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-4 mb-6 shadow-md">
//   <div className="flex flex-col md:flex-row gap-4">
//     <div className="flex-1 relative">
//       <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//       <input
//         type="text"
//         placeholder="Search by Order ID, Customer Name, Email or Phone..."
//         value={searchTerm}
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           setCurrentPage(1);
//         }}
//         className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
//       />
//       {searchTerm && (
//         <button
//           onClick={() => {
//             setSearchTerm('');
//             setCurrentPage(1);
//           }}
//           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//         >
//           <FaTimes className="w-4 h-4" />
//         </button>
//       )}
//     </div>
//     <select
//       value={statusFilter}
//       onChange={(e) => {
//         setStatusFilter(e.target.value);
//         setCurrentPage(1);
//       }}
//       className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
//     >
//       <option value="">All Statuses</option>
//       {ORDER_STATUSES.map(status => (
//         <option key={status.value} value={status.value}>{status.label}</option>
//       ))}
//     </select>
//     <select
//       value={paymentFilter}
//       onChange={(e) => {
//         setPaymentFilter(e.target.value);
//         setCurrentPage(1);
//       }}
//       className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
//     >
//       <option value="">All Payments</option>
//       {PAYMENT_STATUSES.map(status => (
//         <option key={status.value} value={status.value}>{status.label}</option>
//       ))}
//     </select>
//    <select
//   value={sortBy}
//   onChange={(e) => {
//     setSortBy(e.target.value);
//     setCurrentPage(1);
//   }}
//   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
// >
//   <option value="-createdAt">Newest First</option>
//   <option value="createdAt_asc">Oldest First</option>
//   <option value="-total">Highest Total</option>
//   <option value="total_asc">Lowest Total</option>
// </select>
//   </div>
// </div>

//         {/* Orders Table - No scrollbar */}
// <div className="bg-white rounded-xl border-2 border-[#FFE0E6] shadow-md overflow-hidden">
//   <div className="w-full overflow-x-visible">
//     <table className="w-full min-w-[800px] lg:min-w-full">
//       <thead className="bg-gray-50 border-b-2 border-[#FFE0E6]">
//         <tr>
//           <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700">Order ID</th>
//           <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700">Customer</th>
//           <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700">Phone</th>
//           <th className="px-2 py-2 text-right text-xs font-semibold text-gray-700">Total</th>
//           <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700">Status</th>
//           <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700">Payment Status</th>
//           <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700">Payment Method</th>
//           <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700">Date</th>
//           <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {loading ? (
//           <tr>
//             <td colSpan="9" className="px-4 py-8 text-center">
//               <div className="flex justify-center">
//                 <div className="w-6 h-6 border-3 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
//               </div>
//             </td>
//           </tr>
//         ) : orders.length === 0 ? (
//           <tr>
//             <td colSpan="9" className="px-4 py-8 text-center text-gray-500 text-sm">
//               No orders found
//             </td>
//           </tr>
//         ) : (
//           orders.map((order) => (
//             <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//               <td className="px-2 py-2 text-xs font-mono">
//                 {order.orderNumber || order._id.slice(-8).toUpperCase()}
//               </td>
//               <td className="px-2 py-2 text-xs">
//                 <div className="font-medium truncate max-w-[150px]">{order.customerInfo?.fullName}</div>
//                 <div className="text-gray-500 text-xs truncate max-w-[150px]">{order.customerInfo?.email}</div>
//               </td>
//               <td className="px-2 py-2 text-xs">{order.customerInfo?.phone}</td>
//               <td className="px-2 py-2 text-xs text-right font-bold text-[#4A8A90]">
//                 ৳{order.total?.toFixed(2)}
//               </td>
//               <td className="px-2 py-2 text-center">
//                 <button
//                   onClick={() => {
//                     setSelectedOrder(order);
//                     setShowStatusModal(true);
//                   }}
//                   className="hover:opacity-80 transition-opacity"
//                 >
//                   {getStatusBadge(order.orderStatus)}
//                 </button>
//               </td>
//               <td className="px-2 py-2 text-center">
//                 <button
//                   onClick={() => {
//                     setSelectedOrder(order);
//                     setShowPaymentModal(true);
//                   }}
//                   className="hover:opacity-80 transition-opacity"
//                 >
//                   {getPaymentBadge(order.paymentStatus)}
//                 </button>
//               </td>
//               <td className="px-2 py-2 text-center">
//                 {getPaymentMethodBadge(order.paymentMethod)}
//               </td>
//               <td className="px-2 py-2 text-xs text-gray-500 whitespace-nowrap">
// {order.orderStatus === 'delivered' && order.deliveredAt ? (
//     <div className="flex flex-col gap-0.5">
//       <div className="text-gray-600">
//         <span className="text-gray-400 text-[10px]">Ordered:</span>{' '}
//         {new Date(order.createdAt).toLocaleDateString('en-BD', {
//           day: '2-digit',
//           month: 'short',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit'
//         })}
//       </div>
//       <div className="text-green-600 font-medium">
//         <span className="text-green-500 text-[10px]">Delivered:</span>{' '}
//         {new Date(order.deliveredAt).toLocaleDateString('en-BD', {
//           day: '2-digit',
//           month: 'short',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit'
//         })}
//       </div>
//     </div>
//   ) : order.orderStatus === 'cancelled' && order.cancelledAt ? (
//     <div className="flex flex-col gap-0.5">
//       <div className="text-gray-600">
//         <span className="text-gray-400 text-[10px]">Ordered:</span>{' '}
//         {new Date(order.createdAt).toLocaleDateString('en-BD', {
//           day: '2-digit',
//           month: 'short',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit'
//         })}
//       </div>
//       <div className="text-red-600 font-medium">
//         <span className="text-red-500 text-[10px]">Cancelled:</span>{' '}
//         {new Date(order.cancelledAt).toLocaleDateString('en-BD', {
//           day: '2-digit',
//           month: 'short',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit'
//         })}
//       </div>
//     </div>
//   ) : (
//     <div className="text-gray-600">
//       <span className="text-gray-400 text-[10px]">Placed:</span>{' '}
//       {new Date(order.createdAt).toLocaleDateString('en-BD', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       })}
//     </div>
//   )}
// </td>
//               <td className="px-2 py-2 text-center">
//                 <div className="flex items-center justify-center gap-1">
//                   <button
//                     onClick={() => {
//                       setSelectedOrder(order);
//                       setShowDetailsModal(true);
//                     }}
//                     className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
//                     title="View Details"
//                   >
//                     <FaEye className="w-3.5 h-3.5" />
//                   </button>
//                   <button
//                     onClick={() => {
//                       setSelectedOrder(order);
//                       setShowEditModal(true);
//                     }}
//                     className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
//                     title="Edit Order"
//                   >
//                     <FaEdit className="w-3.5 h-3.5" />
//                   </button>
//                   <button
//                     onClick={() => {
//                       setSelectedOrder(order);
//                       setShowDeleteModal(true);
//                     }}
//                     className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
//                     title="Delete Order"
//                   >
//                     <FaTrash className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   </div>

//   {/* Pagination */}
//   {totalPages > 1 && (
//     <div className="px-3 py-2 border-t border-gray-200 flex items-center justify-between">
//       <p className="text-xs text-gray-500">
//         Showing {orders.length} of {totalOrders} orders
//       </p>
//       <div className="flex gap-1">
//         <button
//           onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//           disabled={currentPage === 1}
//           className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
//         >
//           <FaChevronLeft className="w-3 h-3" />
//         </button>
//         <span className="px-2 py-1 text-xs">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//           disabled={currentPage === totalPages}
//           className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
//         >
//           <FaChevronRight className="w-3 h-3" />
//         </button>
//       </div>
//     </div>
//   )}
// </div>
//         </div>
//       </div>

//       {/* Modals - All with high z-index to appear above layout */}
//       <StatusUpdateModal
//         isOpen={showStatusModal}
//         onClose={() => setShowStatusModal(false)}
//         order={selectedOrder}
//         onUpdate={handleStatusUpdate}
//       />

//       <PaymentStatusModal
//         isOpen={showPaymentModal}
//         onClose={() => setShowPaymentModal(false)}
//         order={selectedOrder}
//         onUpdate={handlePaymentUpdate}
//       />

//       <OrderDetailsModal
//         isOpen={showDetailsModal}
//         onClose={() => setShowDetailsModal(false)}
//         order={selectedOrder}
//         onStatusUpdate={() => {
//           setShowDetailsModal(false);
//           setShowStatusModal(true);
//         }}
//         onPaymentUpdate={() => {
//           setShowDetailsModal(false);
//           setShowPaymentModal(true);
//         }}
//       />

//       <EditOrderModal
//         isOpen={showEditModal}
//         onClose={() => setShowEditModal(false)}
//         order={selectedOrder}
//         onUpdate={handleEditOrder}
//       />

//       <DeleteConfirmModal
//         isOpen={showDeleteModal}
//         onClose={() => setShowDeleteModal(false)}
//         order={selectedOrder}
//         onDelete={handleDeleteOrder}
//       />
//     </>
//   );l
// }


'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { 
  FaBox,
  FaSearch,
  FaEye,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaMoneyBillWave,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDownload,
  FaPrint,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaShippingFast,
  FaCheckDouble,
  FaBan,
  FaUndo,
  FaFileInvoice,
  FaExclamationTriangle,
  FaTrash,
  FaSave,
  FaTimes,
  FaCreditCard,
  FaMobileAlt
} from 'react-icons/fa';

const ORDER_STATUSES = [
  { value: 'placed', label: 'Placed', color: 'bg-blue-100 text-blue-800', icon: FaClock, nextStatuses: ['confirmed', 'cancelled'] },
  { value: 'confirmed', label: 'Confirmed', color: 'bg-cyan-100 text-cyan-800', icon: FaCheckCircle, nextStatuses: ['processing', 'cancelled'] },
  { value: 'processing', label: 'Processing', color: 'bg-purple-100 text-purple-800', icon: FaSpinner, nextStatuses: ['shipped', 'cancelled'] },
  { value: 'shipped', label: 'Shipped', color: 'bg-indigo-100 text-indigo-800', icon: FaShippingFast, nextStatuses: ['delivered', 'cancelled'] },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800', icon: FaCheckDouble, nextStatuses: [] },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: FaBan, nextStatuses: [] },
];

const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'paid', label: 'Paid', color: 'bg-green-100 text-green-800' },
  { value: 'failed', label: 'Failed', color: 'bg-red-100 text-red-800' },
  { value: 'refunded', label: 'Refunded', color: 'bg-orange-100 text-orange-800' }
];

// Edit Order Modal
const EditOrderModal = ({ isOpen, onClose, order, onUpdate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zone: '',
    area: '',
    trackingNumber: '',
    deliveryNote: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setFormData({
        fullName: order.customerInfo?.fullName || '',
        email: order.customerInfo?.email || '',
        phone: order.customerInfo?.phone || '',
        address: order.customerInfo?.address || '',
        city: order.customerInfo?.city || '',
        zone: order.customerInfo?.zone || '',
        area: order.customerInfo?.area || '',
        trackingNumber: order.trackingNumber || '',
        deliveryNote: order.deliveryNote || ''
      });
    }
  }, [order]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://kids-backend.vercel.app/api/orders/${order._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          customerInfo: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            zone: formData.zone,
            area: formData.area
          },
          trackingNumber: formData.trackingNumber,
          deliveryNote: formData.deliveryNote
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Order updated successfully');
        onUpdate();
        onClose();
      } else {
        toast.error(data.error || 'Failed to update order');
      }
    } catch (error) {
      console.error('Update order error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white sticky top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaEdit className="w-5 h-5" />
              <h2 className="text-lg font-bold">Edit Order</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Address *</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows="2"
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Note</label>
                <textarea
                  value={formData.deliveryNote}
                  onChange={(e) => setFormData({ ...formData, deliveryNote: e.target.value })}
                  rows="2"
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
          <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} className="flex-1 px-3 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] disabled:opacity-50 flex items-center justify-center gap-2 text-sm">
            {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaSave className="w-3 h-3" />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Delete Confirm Modal
const DeleteConfirmModal = ({ isOpen, onClose, order, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://kids-backend.vercel.app/api/orders/${order._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Order deleted successfully');
        onDelete();
        onClose();
      } else {
        toast.error(data.error || 'Failed to delete order');
      }
    } catch (error) {
      console.error('Delete order error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="flex items-center gap-2">
            <FaExclamationTriangle className="w-5 h-5" />
            <h2 className="text-lg font-bold">Delete Order</h2>
          </div>
        </div>

        <div className="p-5 text-center">
          <p className="text-gray-700 text-sm mb-2">Are you sure you want to delete this order?</p>
          <p className="text-xs text-gray-500">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
          <p className="text-xs text-red-500 mt-3">⚠️ This action cannot be undone!</p>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
          <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
            Cancel
          </button>
          <button onClick={handleDelete} disabled={loading} className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2 text-sm">
            {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaTrash className="w-3 h-3" />}
            Delete Order
          </button>
        </div>
      </div>
    </div>
  );
};

const StatusUpdateModal = ({ isOpen, onClose, order, onUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.orderStatus);
      setTrackingNumber(order.trackingNumber || '');
      setDeliveryNote(order.deliveryNote || '');
      setCancellationReason(order.cancellationReason || '');
    }
  }, [order]);

  // Get the current status info from the order (not from selectedStatus)
  const currentStatusInfo = ORDER_STATUSES.find(s => s.value === order?.orderStatus);
  // Get the selected new status info
  const selectedStatusInfo = ORDER_STATUSES.find(s => s.value === selectedStatus);
  const availableNextStatuses = currentStatusInfo?.nextStatuses || [];
  const isCancelling = selectedStatus === 'cancelled';

  const handleSubmit = async () => {
    if (!selectedStatus) {
      toast.error('Please select a status');
      return;
    }

    if (selectedStatus === order.orderStatus) {
      toast.error('Please select a different status');
      return;
    }

    if (isCancelling && !cancellationReason.trim()) {
      toast.error('Please provide a cancellation reason');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://kids-backend.vercel.app/api/orders/${order._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderStatus: selectedStatus,
          trackingNumber,
          deliveryNote,
          cancellationReason: isCancelling ? cancellationReason : undefined
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Order status updated to ${selectedStatus}`);
        
        if (selectedStatus === 'delivered' && order.paymentStatus !== 'paid') {
          await fetch(`https://kids-backend.vercel.app/api/orders/${order._id}/payment`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ paymentStatus: 'paid' })
          });
          toast.success('Payment status automatically updated to Paid');
        }
        
        onUpdate();
        onClose();
      } else {
        toast.error(data.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Status update error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaEdit className="w-5 h-5" />
              <h2 className="text-lg font-bold">Update Order Status</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
        </div>

        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Current Status</label>
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${currentStatusInfo?.color || 'bg-gray-100'}`}>
              {currentStatusInfo?.icon && <currentStatusInfo.icon className="w-3 h-3" />}
              <span>{currentStatusInfo?.label || order?.orderStatus}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Change Status To</label>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                if (e.target.value !== 'cancelled') {
                  setCancellationReason('');
                }
              }}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
            >
              <option value={order.orderStatus}>Current: {currentStatusInfo?.label}</option>
              {availableNextStatuses.map(statusValue => {
                const statusInfo = ORDER_STATUSES.find(s => s.value === statusValue);
                return (
                  <option key={statusValue} value={statusValue}>
                    → {statusInfo?.label}
                  </option>
                );
              })}
            </select>
            {availableNextStatuses.length === 0 && (
              <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                <FaExclamationTriangle className="w-3 h-3" />
                This order is final and cannot be changed further
              </p>
            )}
          </div>

          {/* Show selected new status preview */}
          {selectedStatus !== order.orderStatus && (
            <div className="bg-blue-50 rounded-lg p-2">
              <p className="text-xs text-blue-700">
                <span className="font-medium">Will change to:</span> {selectedStatusInfo?.label}
              </p>
            </div>
          )}

          {isCancelling && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Cancellation Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                rows="3"
                placeholder="Please provide a reason for cancellation..."
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">This reason will be saved with the order</p>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Note (Optional)</label>
            <textarea
              value={deliveryNote}
              onChange={(e) => setDeliveryNote(e.target.value)}
              rows="2"
              placeholder="Add any delivery notes or special instructions"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
            />
          </div>

          {selectedStatus === 'delivered' && order.paymentStatus !== 'paid' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-2">
              <p className="text-xs text-green-700 flex items-center gap-2">
                <FaCheckCircle className="w-3 h-3" />
                Payment status will be automatically updated to "Paid"
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
          <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || selectedStatus === order.orderStatus}
            className="flex-1 px-3 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaCheckCircle className="w-3 h-3" />}
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

// Payment Status Modal
// const PaymentStatusModal = ({ isOpen, onClose, order, onUpdate }) => {
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (order) {
//       setSelectedStatus(order.paymentStatus);
//     }
//   }, [order]);

//   const handleSubmit = async () => {
//     if (!selectedStatus) {
//       toast.error('Please select a payment status');
//       return;
//     }

//     if (selectedStatus === order.paymentStatus) {
//       toast.error('Please select a different status');
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`https://kids-backend.vercel.app/api/orders/${order._id}/payment`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ paymentStatus: selectedStatus })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success(`Payment status updated to ${selectedStatus}`);
//         onUpdate();
//         onClose();
//       } else {
//         toast.error(data.error || 'Failed to update payment status');
//       }
//     } catch (error) {
//       console.error('Payment status update error:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const currentPaymentInfo = PAYMENT_STATUSES.find(p => p.value === order?.paymentStatus);
  
//   const getAvailableStatuses = () => {
//     const currentStatus = order?.paymentStatus;
    
//     switch (currentStatus) {
//       case 'pending':
//         return PAYMENT_STATUSES.filter(status => 
//           status.value === 'paid' || status.value === 'failed'
//         );
//       case 'failed':
//         return PAYMENT_STATUSES.filter(status => 
//           status.value === 'paid'
//         );
//       case 'paid':
//         return PAYMENT_STATUSES.filter(status => 
//           status.value === 'refunded'
//         );
//       case 'refunded':
//         return [];
//       default:
//         return [];
//     }
//   };

//   const availableStatuses = getAvailableStatuses();
//   const canChange = availableStatuses.length > 0;

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
//         <div className="p-4 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaMoneyBillWave className="w-5 h-5" />
//               <h2 className="text-lg font-bold">Update Payment Status</h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
//         </div>

//         <div className="p-4 space-y-3">
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Current Payment Status</label>
//             <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${currentPaymentInfo?.color || 'bg-gray-100'}`}>
//               <FaMoneyBillWave className="w-3 h-3" />
//               <span>{currentPaymentInfo?.label || order?.paymentStatus}</span>
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Change Payment Status To</label>
//             {canChange ? (
//               <select
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//                 className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
//               >
//                 {availableStatuses.map(status => (
//                   <option key={status.value} value={status.value}>
//                     {status.label}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <div className="px-3 py-1.5 text-sm bg-gray-100 text-gray-500 rounded-lg">
//                 No further changes allowed
//               </div>
//             )}
            
//             {order?.paymentStatus === 'pending' && (
//               <p className="text-xs text-blue-600 mt-1">→ Can change to: Paid or Failed</p>
//             )}
//             {order?.paymentStatus === 'failed' && (
//               <p className="text-xs text-blue-600 mt-1">→ Can change to: Paid</p>
//             )}
//             {order?.paymentStatus === 'paid' && (
//               <p className="text-xs text-blue-600 mt-1">→ Can change to: Refunded</p>
//             )}
//             {order?.paymentStatus === 'refunded' && (
//               <p className="text-xs text-gray-500 mt-1">→ This order has been refunded. No further changes allowed.</p>
//             )}
//           </div>
//         </div>

//         <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
//           <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading || !canChange || selectedStatus === order?.paymentStatus}
//             className="flex-1 px-3 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
//           >
//             {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaSave className="w-3 h-3" />}
//             Update Payment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// Payment Status Modal
const PaymentStatusModal = ({ isOpen, onClose, order, onUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.paymentStatus);
      console.log('Order in modal:', { 
        paymentStatus: order.paymentStatus, 
        orderStatus: order.orderStatus,
        paymentMethod: order.paymentMethod
      });
    }
  }, [order]);

  const handleSubmit = async () => {
    if (!selectedStatus) {
      toast.error('Please select a payment status');
      return;
    }

    if (selectedStatus === order.paymentStatus) {
      toast.error('Please select a different status');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://kids-backend.vercel.app/api/orders/${order._id}/payment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ paymentStatus: selectedStatus })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Payment status updated to ${selectedStatus}`);
        onUpdate();
        onClose();
      } else {
        toast.error(data.error || 'Failed to update payment status');
      }
    } catch (error) {
      console.error('Payment status update error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const currentPaymentInfo = PAYMENT_STATUSES.find(p => p.value === order?.paymentStatus);
  
  // Get available payment status options based on current status, order status, and payment method
  const getAvailableStatuses = () => {
    const currentStatus = order?.paymentStatus;
    const orderStatus = order?.orderStatus;
    const paymentMethod = order?.paymentMethod;
    
    console.log('Getting available statuses:', { currentStatus, orderStatus, paymentMethod });
    
    switch (currentStatus) {
      case 'pending':
        // Pending → Can change to Paid or Failed (for both COD and Online)
        return PAYMENT_STATUSES.filter(status => 
          status.value === 'paid' || status.value === 'failed'
        );
      case 'failed':
        // Failed → Can change to Paid only (for both COD and Online)
        return PAYMENT_STATUSES.filter(status => 
          status.value === 'paid'
        );
      case 'paid':
        // For paid orders - rules depend on payment method
        if (paymentMethod === 'cod') {
          // COD orders: Cannot refund after delivery
          // Only allow refund if order is cancelled (not delivered)
          if (orderStatus === 'cancelled') {
            return PAYMENT_STATUSES.filter(status => 
              status.value === 'refunded'
            );
          }
          // COD delivered orders cannot be refunded
          return [];
        } else {
          // Online payments: Can refund for cancelled or delivered orders
          // Also allow manual refund for admins
          return PAYMENT_STATUSES.filter(status => 
            status.value === 'refunded'
          );
        }
      case 'refunded':
        // Refunded → No changes allowed
        return [];
      default:
        return [];
    }
  };

  const availableStatuses = getAvailableStatuses();
  const canChange = availableStatuses.length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="w-5 h-5" />
              <h2 className="text-lg font-bold">Update Payment Status</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Current Payment Status</label>
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${currentPaymentInfo?.color || 'bg-gray-100'}`}>
              <FaMoneyBillWave className="w-3 h-3" />
              <span>{currentPaymentInfo?.label || order?.paymentStatus}</span>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              Order Status: <span className="font-medium">{order?.orderStatus}</span> | 
              Payment Method: <span className="font-medium">{order?.paymentMethod === 'cod' ? 'COD' : 'Online'}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Change Payment Status To</label>
            {canChange ? (
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
              >
                <option value={order.paymentStatus}>Current: {currentPaymentInfo?.label}</option>
                {availableStatuses.map(status => (
                  <option key={status.value} value={status.value}>
                    → {status.label}
                  </option>
                ))}
              </select>
            ) : (
              <div className="px-3 py-1.5 text-sm bg-gray-100 text-gray-500 rounded-lg">
                No further changes allowed
              </div>
            )}
            
            {/* Status flow information */}
            {order?.paymentStatus === 'pending' && (
              <p className="text-xs text-blue-600 mt-1">→ Can change to: Paid or Failed</p>
            )}
            {order?.paymentStatus === 'failed' && (
              <p className="text-xs text-blue-600 mt-1">→ Can change to: Paid</p>
            )}
            {order?.paymentStatus === 'paid' && order?.paymentMethod === 'cod' && order?.orderStatus === 'cancelled' && (
              <p className="text-xs text-blue-600 mt-1">→ COD order is cancelled. Can change to: Refunded</p>
            )}
            {order?.paymentStatus === 'paid' && order?.paymentMethod === 'cod' && order?.orderStatus === 'delivered' && (
              <p className="text-xs text-red-600 mt-1">→ COD order is delivered and paid. Cannot be refunded.</p>
            )}
            {order?.paymentStatus === 'paid' && order?.paymentMethod === 'online' && (
              <p className="text-xs text-blue-600 mt-1">→ Online payment. Can change to: Refunded</p>
            )}
            {order?.paymentStatus === 'refunded' && (
              <p className="text-xs text-gray-500 mt-1">→ This order has been refunded. No further changes allowed.</p>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
          <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !canChange || selectedStatus === order?.paymentStatus}
            className="flex-1 px-3 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaSave className="w-3 h-3" />}
            Update Payment
          </button>
        </div>
      </div>
    </div>
  );
};

// Order Details Modal
const OrderDetailsModal = ({ isOpen, onClose, order, onStatusUpdate, onPaymentUpdate }) => {
  if (!isOpen || !order) return null;

  const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
  const paymentInfo = PAYMENT_STATUSES.find(p => p.value === order.paymentStatus);
  const canChangeStatus = statusInfo?.nextStatuses?.length > 0;
  const isCancelled = order.orderStatus === 'cancelled';
  const isDelivered = order.orderStatus === 'delivered';

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white sticky top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaFileInvoice className="w-5 h-5" />
              <h2 className="text-lg font-bold">Order Details</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-5">
            <button
              onClick={() => {
                onClose();
                canChangeStatus && onStatusUpdate();
              }}
              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs transition-all ${statusInfo?.color || 'bg-gray-100 text-gray-800'} ${canChangeStatus ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
              title={canChangeStatus ? 'Click to update status' : 'Status cannot be changed'}
            >
              {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
              <span className="font-medium">Order: {statusInfo?.label || order.orderStatus}</span>
              {canChangeStatus && <FaEdit className="w-2.5 h-2.5 ml-1" />}
            </button>
            <button
              onClick={() => {
                onClose();
                onPaymentUpdate();
              }}
              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs transition-all ${paymentInfo?.color || 'bg-gray-100 text-gray-800'} cursor-pointer hover:opacity-80`}
              title="Click to update payment status"
            >
              <FaMoneyBillWave className="w-3 h-3" />
              <span className="font-medium">Payment: {paymentInfo?.label || order.paymentStatus}</span>
              <FaEdit className="w-2.5 h-2.5 ml-1" />
            </button>
            {order.paymentMethod === 'cod' && (
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                <FaMoneyBillWave className="w-3 h-3" />
                <span>Cash on Delivery</span>
              </div>
            )}
          </div>

          {isDelivered && order.deliveredAt && (
            <div className="mb-5 bg-green-50 border-l-4 border-green-500 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <FaCheckDouble className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-green-700">Order Delivered</h4>
                  <p className="text-xs text-green-600 mt-1">
                    <span className="font-medium">Delivered on:</span> {new Date(order.deliveredAt).toLocaleDateString('en-BD', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {isCancelled && order.cancellationReason && (
            <div className="mb-5 bg-red-50 border-l-4 border-red-500 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <FaExclamationTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-red-700">Order Cancelled</h4>
                  <p className="text-xs text-red-600 mt-1">
                    <span className="font-medium">Reason:</span> {order.cancellationReason}
                  </p>
                  {order.cancelledAt && (
                    <p className="text-xs text-red-500 mt-1">
                      <span className="font-medium">Cancelled on:</span> {new Date(order.cancelledAt).toLocaleDateString('en-BD', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
                <FaUser className="w-3.5 h-3.5 text-[#4A8A90]" />
                Customer Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-gray-500">Name:</span> {order.customerInfo?.fullName}</p>
                <p><span className="text-gray-500">Email:</span> {order.customerInfo?.email}</p>
                <p><span className="text-gray-500">Phone:</span> {order.customerInfo?.phone}</p>
                {order.customerInfo?.whatsapp && (
                  <p><span className="text-gray-500">WhatsApp:</span> {order.customerInfo.whatsapp}</p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#4A8A90]" />
                Delivery Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-gray-500">Address:</span> {order.customerInfo?.address}</p>
                <p><span className="text-gray-500">City:</span> {order.customerInfo?.city}</p>
                <p><span className="text-gray-500">Upazila/Thana:</span> {order.customerInfo?.zone}</p>
                {order.customerInfo?.area && <p><span className="text-gray-500">Area:</span> {order.customerInfo.area}</p>}
                {order.trackingNumber && (
                  <p><span className="text-gray-500">Tracking:</span> <span className="font-mono">{order.trackingNumber}</span></p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
              <FaBox className="w-3.5 h-3.5 text-[#4A8A90]" />
              Order Items
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-1.5 text-left">Product</th>
                    <th className="px-2 py-1.5 text-center">Qty</th>
                    <th className="px-2 py-1.5 text-right">Price</th>
                    <th className="px-2 py-1.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item, idx) => (
                    <tr key={idx} className="border-t border-gray-100">
                      <td className="px-2 py-2">
                        <div className="flex items-center gap-2">
                          <img 
                            src={item.image || 'https://via.placeholder.com/30'} 
                            alt={item.productName}
                            className="w-7 h-7 rounded object-cover"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Toy'; }}
                          />
                          <div>
                            <p className="font-medium text-xs">{item.productName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-2 text-center">{item.quantity}</td>
                      <td className="px-2 py-2 text-right">৳{(item.discountPrice || item.regularPrice).toFixed(2)}</td>
                      <td className="px-2 py-2 text-right font-medium">৳{((item.discountPrice || item.regularPrice) * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t border-gray-200">
                  <tr><td colSpan="3" className="px-2 py-1 text-right font-medium">Subtotal:</td><td className="px-2 py-1 text-right">৳{order.subtotal?.toFixed(2)}</td></tr>
                  <tr><td colSpan="3" className="px-2 py-1 text-right font-medium">Shipping:</td><td className="px-2 py-1 text-right">৳{order.shippingCost?.toFixed(2)}</td></tr>
                  {order.discount > 0 && (
                    <tr><td colSpan="3" className="px-2 py-1 text-right font-medium text-green-600">Discount:</td><td className="px-2 py-1 text-right text-green-600">- ৳{order.discount.toFixed(2)}</td></tr>
                  )}
                  <tr className="text-sm font-bold">
                    <td colSpan="3" className="px-2 py-1 text-right">Total:</td>
                    <td className="px-2 py-1 text-right text-[#4A8A90]">৳{order.total?.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {(order.couponCode || order.deliveryNote) && (
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-1.5">Additional Information</h3>
              {order.couponCode && <p className="text-xs"><span className="text-gray-500">Coupon Applied:</span> {order.couponCode}</p>}
              {order.deliveryNote && <p className="text-xs"><span className="text-gray-500">Delivery Note:</span> {order.deliveryNote}</p>}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-2">
          <button onClick={() => window.print()} className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5 text-sm">
            <FaPrint className="w-3 h-3" /> Print
          </button>
          <button onClick={onClose} className="px-3 py-1.5 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition-colors text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Admin Orders Page Component
export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [orderTypeFilter, setOrderTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [stats, setStats] = useState(null);
  const [sortBy, setSortBy] = useState('-createdAt');
  const [activeStatusTab, setActiveStatusTab] = useState('all');

  const statusTabs = [
    { value: 'all', label: 'All', count: stats?.totalOrders || 0, color: 'bg-gray-500' },
    { value: 'placed', label: 'Placed', count: stats?.placedOrders || 0, color: 'bg-blue-500' },
    { value: 'confirmed', label: 'Confirmed', count: stats?.confirmedOrders || 0, color: 'bg-cyan-500' },
    { value: 'processing', label: 'Processing', count: stats?.processingOrders || 0, color: 'bg-purple-500' },
    { value: 'shipped', label: 'Shipped', count: stats?.shippedOrders || 0, color: 'bg-indigo-500' },
    { value: 'delivered', label: 'Delivered', count: stats?.deliveredOrders || 0, color: 'bg-green-500' },
    { value: 'cancelled', label: 'Cancelled', count: stats?.cancelledOrders || 0, color: 'bg-red-500' }
  ];

const fetchOrders = useCallback(async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const queryParams = new URLSearchParams({
      page: currentPage,
      limit: 20,
      sort: sortBy
    });
    if (searchTerm) queryParams.append('search', searchTerm);
    if (activeStatusTab !== 'all') queryParams.append('orderStatus', activeStatusTab);
    if (statusFilter) queryParams.append('orderStatus', statusFilter); // Add this line
    if (paymentFilter) queryParams.append('paymentStatus', paymentFilter);
    if (orderTypeFilter) queryParams.append('paymentMethod', orderTypeFilter);

    const response = await fetch(`https://kids-backend.vercel.app/api/orders/admin/all?${queryParams}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();
    if (data.success) {
      setOrders(data.data);
      setTotalPages(data.pagination.pages);
      setTotalOrders(data.pagination.total);
    } else {
      toast.error(data.error || 'Failed to fetch orders');
    }
  } catch (error) {
    console.error('Fetch orders error:', error);
    toast.error('Network error');
  } finally {
    setLoading(false);
  }
}, [currentPage, searchTerm, activeStatusTab, statusFilter, paymentFilter, orderTypeFilter, sortBy, router]);

  const fetchStats = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://kids-backend.vercel.app/api/orders/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Fetch stats error:', error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, [fetchOrders, fetchStats]);

  const handleStatusUpdate = () => {
    fetchOrders();
    fetchStats();
  };

  const handlePaymentUpdate = () => {
    fetchOrders();
    fetchStats();
  };

  const handleEditOrder = () => {
    fetchOrders();
    fetchStats();
  };

  const handleDeleteOrder = () => {
    fetchOrders();
    fetchStats();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-BD', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportToCSV = () => {
    const headers = ['Order ID', 'Customer', 'Phone', 'Total', 'Status', 'Payment Status', 'Payment Method', 'Date'];
    const rows = orders.map(order => [
      order.orderNumber || order._id.slice(-8).toUpperCase(),
      order.customerInfo?.fullName || '',
      order.customerInfo?.phone || '',
      order.total || 0,
      ORDER_STATUSES.find(s => s.value === order.orderStatus)?.label || order.orderStatus,
      PAYMENT_STATUSES.find(p => p.value === order.paymentStatus)?.label || order.paymentStatus,
      order.paymentMethod === 'cod' ? 'COD' : order.paymentMethod === 'online' ? 'Online' : order.paymentMethod,
      formatDate(order.createdAt)
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported successfully');
  };

  const getStatusBadge = (status) => {
    const statusInfo = ORDER_STATUSES.find(s => s.value === status);
    if (!statusInfo) return <span className="px-1.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>;
    return (
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs ${statusInfo.color}`}>
        <statusInfo.icon className="w-2.5 h-2.5" />
        {statusInfo.label}
      </span>
    );
  };

  const getPaymentBadge = (status) => {
    const paymentInfo = PAYMENT_STATUSES.find(p => p.value === status);
    return (
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs ${paymentInfo?.color || 'bg-gray-100 text-gray-800'}`}>
        <FaMoneyBillWave className="w-2.5 h-2.5" />
        {paymentInfo?.label || status}
      </span>
    );
  };

  const getPaymentMethodBadge = (method) => {
    const methods = {
      'cod': { label: 'COD', color: 'bg-orange-100 text-orange-800', icon: FaMoneyBillWave },
      'online': { label: 'Online', color: 'bg-blue-100 text-blue-800', icon: FaCreditCard },
      'bkash': { label: 'bKash', color: 'bg-pink-100 text-pink-800', icon: FaMobileAlt },
      'nagad': { label: 'Nagad', color: 'bg-purple-100 text-purple-800', icon: FaMobileAlt }
    };
    
    const info = methods[method] || { label: method || 'Unknown', color: 'bg-gray-100 text-gray-800', icon: FaMoneyBillWave };
    const Icon = info.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs ${info.color}`}>
        <Icon className="w-2.5 h-2.5" />
        {info.label}
      </span>
    );
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-[#2D3A5C]">{value?.toLocaleString() || 0}</p>
        </div>
        <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-[#FFF9F0] pb-12 pt-6">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <FaBox className="w-7 h-7 text-[#4A8A90]" />
              <h1 className="text-2xl md:text-3xl font-bold text-[#2D3A5C]" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                Order Management
              </h1>
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition-colors"
            >
              <FaDownload className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
              <StatCard title="Total Orders" value={stats.totalOrders} icon={<FaBox className="w-5 h-5 text-blue-500" />} color="bg-blue-100" />
              <StatCard title="Pending Payment" value={stats.pendingOrders} icon={<FaClock className="w-5 h-5 text-yellow-500" />} color="bg-yellow-100" />
              <StatCard title="Processing" value={stats.processingOrders} icon={<FaSpinner className="w-5 h-5 text-purple-500" />} color="bg-purple-100" />
              <StatCard title="Delivered" value={stats.deliveredOrders || 0} icon={<FaCheckCircle className="w-5 h-5 text-green-500" />} color="bg-green-100" />
              <StatCard title="Cancelled" value={stats.cancelledOrders} icon={<FaTimesCircle className="w-5 h-5 text-red-500" />} color="bg-red-100" />
              <StatCard title="Today" value={stats.todayOrders} icon={<FaCalendarAlt className="w-5 h-5 text-cyan-500" />} color="bg-cyan-100" />
              <StatCard title="Revenue" value={stats.totalRevenue} icon={<FaMoneyBillWave className="w-5 h-5 text-emerald-500" />} color="bg-emerald-100" />
            </div>
          )}

       

          {/* Filters */}
          <div className="bg-white rounded-xl border-2 border-[#FFE0E6] p-4 mb-6 shadow-md">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Customer Name, Email or Phone..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setCurrentPage(1);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>
              <select
  value={statusFilter}
  onChange={(e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  }}
  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
>
  <option value="">All Order Status</option>
  {ORDER_STATUSES.map(status => (
    <option key={status.value} value={status.value}>{status.label}</option>
  ))}
</select>
              
              {/* <select
                value={orderTypeFilter}
                onChange={(e) => {
                  setOrderTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
              >
                <option value="">All Payment Types</option>
                <option value="cod">COD (Cash on Delivery)</option>
                <option value="online">Online Payment</option>
                <option value="bkash">bKash</option>
                <option value="nagad">Nagad</option>
              </select> */}
              
              <select
                value={paymentFilter}
                onChange={(e) => {
                  setPaymentFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
              >
                <option value="">All Payment Status</option>
                {PAYMENT_STATUSES.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
              >
                <option value="-createdAt">Newest First</option>
                <option value="createdAt_asc">Oldest First</option>
                <option value="-total">Highest Total</option>
                <option value="total_asc">Lowest Total</option>
              </select>
            </div>
          </div>
             {/* Status Tabs */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
              {statusTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => {
                    setActiveStatusTab(tab.value);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    activeStatusTab === tab.value
                      ? 'bg-[#4A8A90] text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${tab.color}`}></span>
                  {tab.label}
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    activeStatusTab === tab.value
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl border-2 border-[#FFE0E6] shadow-md overflow-hidden">
            <div className="w-full overflow-x-visible">
              <table className="w-full min-w-[800px] lg:min-w-full">
                <thead className="bg-gray-50 border-b-2 border-[#FFE0E6]">
                  <tr>
                    <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700">Order ID</th>
                    <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700">Customer</th>
                    <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700">Phone</th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-700">Total</th>
                    <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700">Status</th>
                    <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700">Payment Status</th>
                    <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700">Payment Method</th>
                    <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700">Date</th>
                    <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="9" className="px-4 py-8 text-center"><div className="flex justify-center"><div className="w-6 h-6 border-3 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div></div></td></tr>
                  ) : orders.length === 0 ? (
                    <tr><td colSpan="9" className="px-4 py-8 text-center text-gray-500 text-sm">No orders found</td></tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-2 py-2 text-xs font-mono">{order.orderNumber || order._id.slice(-8).toUpperCase()}</td>
                        <td className="px-2 py-2 text-xs">
                          <div className="font-medium truncate max-w-[150px]">{order.customerInfo?.fullName}</div>
                          <div className="text-gray-500 text-xs truncate max-w-[150px]">{order.customerInfo?.email}</div>
                        </td>
                        <td className="px-2 py-2 text-xs">{order.customerInfo?.phone}</td>
                        <td className="px-2 py-2 text-xs text-right font-bold text-[#4A8A90]">৳{order.total?.toFixed(2)}</td>
                        <td className="px-2 py-2 text-center">
                          <button onClick={() => { setSelectedOrder(order); setShowStatusModal(true); }} className="hover:opacity-80 transition-opacity">
                            {getStatusBadge(order.orderStatus)}
                          </button>
                        </td>
                        <td className="px-2 py-2 text-center">
                          <button onClick={() => { setSelectedOrder(order); setShowPaymentModal(true); }} className="hover:opacity-80 transition-opacity">
                            {getPaymentBadge(order.paymentStatus)}
                          </button>
                        </td>
                        <td className="px-2 py-2 text-center">{getPaymentMethodBadge(order.paymentMethod)}</td>
                        <td className="px-2 py-2 text-xs text-gray-500 whitespace-nowrap">
                          {order.orderStatus === 'delivered' && order.deliveredAt ? (
                            <div className="flex flex-col gap-0.5">
                              <div className="text-gray-600">
                                <span className="text-gray-400 text-[10px]">📦</span> {formatDate(order.createdAt)}
                              </div>
                              <div className="text-green-600 font-medium">
                                <span className="text-green-500 text-[10px]">✅</span> {new Date(order.deliveredAt).toLocaleDateString('en-BD', {
                                  day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                })}
                              </div>
                            </div>
                          ) : order.orderStatus === 'cancelled' && order.cancelledAt ? (
                            <div className="flex flex-col gap-0.5">
                              <div className="text-gray-600">
                                <span className="text-gray-400 text-[10px]">📦</span> {formatDate(order.createdAt)}
                              </div>
                              <div className="text-red-600 font-medium">
                                <span className="text-red-500 text-[10px]">❌</span> {new Date(order.cancelledAt).toLocaleDateString('en-BD', {
                                  day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                })}
                              </div>
                            </div>
                          ) : (
                            <div className="text-gray-600">
                              <span className="text-gray-400 text-[10px]">📦</span> {formatDate(order.createdAt)}
                            </div>
                          )}
                        </td>
                        <td className="px-2 py-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => { setSelectedOrder(order); setShowDetailsModal(true); }} className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Details">
                              <FaEye className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => { setSelectedOrder(order); setShowEditModal(true); }} className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors" title="Edit Order">
                              <FaEdit className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => { setSelectedOrder(order); setShowDeleteModal(true); }} className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete Order">
                              <FaTrash className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-3 py-2 border-t border-gray-200 flex items-center justify-between">
                <p className="text-xs text-gray-500">Showing {orders.length} of {totalOrders} orders</p>
                <div className="flex gap-1">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
                    <FaChevronLeft className="w-3 h-3" />
                  </button>
                  <span className="px-2 py-1 text-xs">Page {currentPage} of {totalPages}</span>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
                    <FaChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <StatusUpdateModal isOpen={showStatusModal} onClose={() => setShowStatusModal(false)} order={selectedOrder} onUpdate={handleStatusUpdate} />
      <PaymentStatusModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} order={selectedOrder} onUpdate={handlePaymentUpdate} />
      <OrderDetailsModal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} order={selectedOrder} onStatusUpdate={() => { setShowDetailsModal(false); setShowStatusModal(true); }} onPaymentUpdate={() => { setShowDetailsModal(false); setShowPaymentModal(true); }} />
      <EditOrderModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} order={selectedOrder} onUpdate={handleEditOrder} />
      <DeleteConfirmModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} order={selectedOrder} onDelete={handleDeleteOrder} />
    </>
  );
}