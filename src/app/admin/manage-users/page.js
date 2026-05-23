// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion'; 
// import { 
//   Search, 
//   Plus, 
//   Edit2, 
//   Trash2, 
//   Shield, 
//   UserCog,
//   Mail,
//   Phone,
//   MoreVertical,
//   ChevronLeft,
//   ChevronRight,
//   RefreshCw,
//   AlertTriangle,
//   X,
//   CheckCircle,
//   UserX,
//   Save
// } from 'lucide-react';

// export default function ManageUsers() {
//   const router = useRouter();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedRole, setSelectedRole] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null, userName: '', userRole: '' });
//   const [editModal, setEditModal] = useState({ isOpen: false, user: null });
//   const [editFormData, setEditFormData] = useState({
//     contactPerson: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     role: ''
//   });

//   const usersPerPage = 10;

//   // Get current user on mount - FIXED
//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     const token = localStorage.getItem('token');
    
//     if (userData && token) {
//       try {
//         const parsed = JSON.parse(userData);
//         // Normalize the user object to have consistent ID field
//         setCurrentUser({
//           ...parsed,
//           id: parsed.id || parsed._id || parsed.userId
//         });
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//       }
//     }
//   }, []);

//   // Fetch users on component mount
//   useEffect(() => {
//     fetchUsers();
//   }, [currentPage, selectedRole, searchTerm]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       // Build query params
//       const params = new URLSearchParams({
//         page: currentPage,
//         limit: usersPerPage,
//         role: selectedRole !== 'all' ? selectedRole : '',
//         search: searchTerm
//       });

//       const response = await fetch(`https://kids-backend.vercel.app/api/admin/users?${params}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUsers(data.users);
//         setTotalPages(data.totalPages);
//       } else {
//         toast.error('Failed to fetch users', {
//           description: data.error || 'Something went wrong'
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle delete user
//   const handleDelete = async () => {
//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch(`https://kids-backend.vercel.app/api/admin/users/${deleteModal.userId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('User Deleted', {
//           description: `${deleteModal.userName} has been removed successfully`,
//           icon: <CheckCircle className="w-4 h-4" />
//         });
//         fetchUsers(); // Refresh the list
//         setDeleteModal({ isOpen: false, userId: null, userName: '', userRole: '' });
//       } else {
//         toast.error('Delete Failed', {
//           description: data.error || 'Something went wrong'
//         });
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server'
//       });
//     }
//   };

//   // Handle edit user
//   const handleEdit = (user) => {
//     setEditFormData({
//       contactPerson: user.contactPerson,
//       email: user.email,
//       phone: user.phone,
//       whatsapp: user.whatsapp || '',
//       role: user.role
//     });
//     setEditModal({ isOpen: true, user });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch(`https://kids-backend.vercel.app/api/admin/users/${editModal.user._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(editFormData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('User Updated', {
//           description: `${editFormData.contactPerson}'s information has been updated`,
//           icon: <CheckCircle className="w-4 h-4" />
//         });
//         setEditModal({ isOpen: false, user: null });
//         fetchUsers(); // Refresh the list
//       } else {
//         toast.error('Update Failed', {
//           description: data.error || 'Something went wrong'
//         });
//       }
//     } catch (error) {
//       console.error('Error updating user:', error);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server'
//       });
//     }
//   };

//   // Check if user is current admin - FIXED
//   const isCurrentUser = (userId) => {
//     if (!currentUser || !userId) return false;
    
//     // Check against both possible ID fields
//     return (
//       currentUser.id === userId || 
//       currentUser._id === userId || 
//       currentUser.userId === userId
//     );
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'Never';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Get role badge color
//   const getRoleBadge = (role) => {
//     switch(role) {
//       case 'admin':
//         return 'bg-purple-100 text-purple-800 border-purple-200';
//       case 'moderator':
//         return 'bg-blue-100 text-blue-800 border-blue-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
//       <div className="container mx-auto px-4 max-w-7xl pt-6 pb-8">
//         {/* Header */}
//         <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//               <UserCog className="w-6 h-6" style={{ color: '#84654C' }} />
//               Manage Users
//             </h1>
//             <p className="text-sm text-gray-600 mt-1">
//               View and manage all admin and moderator accounts
//             </p>
//           </div>
          
//           <Link
//             href="/admin/create-users"
//             className="inline-flex items-center gap-2 px-4 py-2 bg-[#84654C] text-white rounded-lg hover:bg-[#d68b55] transition-colors shadow-sm"
//           >
//             <Plus className="w-4 h-4" />
//             <span>Create New User</span>
//           </Link>
//         </div>

//         {/* Filters and Search */}
//         <div className="mb-6 flex flex-col sm:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by name or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#84654C] focus:border-[#84654C]"
//             />
//           </div>
          
//           <select
//             value={selectedRole}
//             onChange={(e) => setSelectedRole(e.target.value)}
//             className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#84654C] focus:border-[#84654C] bg-white"
//           >
//             <option value="all">All Roles</option>
//             <option value="admin">Admin Only</option>
//             <option value="moderator">Moderator Only</option>
//           </select>

//           <button
//             onClick={fetchUsers}
//             className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
//           >
//             <RefreshCw className="w-4 h-4" />
//             <span>Refresh</span>
//           </button>
//         </div>

//         {/* Users Table */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     User
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Contact
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Role
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Last Login
//                   </th>
//                   <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-12 text-center">
//                       <div className="flex justify-center items-center gap-2">
//                         <RefreshCw className="w-5 h-5 animate-spin" style={{ color: '#84654C' }} />
//                         <span className="text-gray-500">Loading users...</span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : users.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-12 text-center">
//                       <div className="text-gray-500">
//                         <UserCog className="w-12 h-12 mx-auto mb-3 text-gray-300" />
//                         <p className="text-lg font-medium">No users found</p>
//                         <p className="text-sm mt-1">Try adjusting your search or filters</p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   users.map((user) => {
//                     const currentUserAccount = isCurrentUser(user._id);
                    
//                     return (
//                       <tr key={user._id} className={`hover:bg-gray-50 transition-colors ${currentUserAccount ? 'bg-orange-50/30' : ''}`}>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#84654C] to-[#f5b485] flex items-center justify-center text-white font-semibold relative">
//                               {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                               {currentUserAccount && (
//                                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
//                               )}
//                             </div>
//                             <div>
//                               <div className="font-medium text-gray-900 flex items-center gap-2">
//                                 {user.contactPerson}
//                                 {currentUserAccount && (
//                                   <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200">
//                                     You
//                                   </span>
//                                 )}
//                               </div>
//                               <div className="text-xs text-gray-500">
//                                 ID: {user._id.slice(-8)}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="space-y-1">
//                             <div className="flex items-center gap-1.5 text-sm text-gray-600">
//                               <Mail className="w-3.5 h-3.5" />
//                               <span className="truncate max-w-[150px]">{user.email}</span>
//                             </div>
//                             <div className="flex items-center gap-1.5 text-sm text-gray-600">
//                               <Phone className="w-3.5 h-3.5" />
//                               <span>{user.phone}</span>
//                             </div>
//                             {user.whatsapp && (
//                               <div className="flex items-center gap-1.5 text-xs text-green-600">
//                                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
//                                 <span>WhatsApp: {user.whatsapp}</span>
//                               </div>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadge(user.role)}`}>
//                             {user.role === 'admin' ? <Shield className="w-3 h-3" /> : <UserCog className="w-3 h-3" />}
//                             {user.role === 'admin' ? 'Admin' : 'Moderator'}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           {user.isActive ? (
//                             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
//                               <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
//                               Active
//                             </span>
//                           ) : (
//                             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
//                               <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
//                               Inactive
//                             </span>
//                           )}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-600">
//                           {formatDate(user.lastLogin)}
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                           <div className="flex items-center justify-end gap-2">
//                             <button
//                               onClick={() => handleEdit(user)}
//                               className="p-2 text-gray-600 hover:text-[#84654C] hover:bg-orange-50 rounded-lg transition-colors"
//                               title="Edit user"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                             </button>
                            
//                             {/* Delete button - completely disabled for current user */}
//                             {currentUserAccount ? (
//                               <button
//                                 disabled
//                                 className="p-2 text-gray-300 cursor-not-allowed rounded-lg"
//                                 title="You cannot delete your own account"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             ) : (
//                               <button
//                                 onClick={() => setDeleteModal({ 
//                                   isOpen: true, 
//                                   userId: user._id, 
//                                   userName: user.contactPerson,
//                                   userRole: user.role
//                                 })}
//                                 className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                                 title="Delete user"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             )}
                            
                        
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {!loading && users.length > 0 && (
//             <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
//               <p className="text-sm text-gray-600">
//                 Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
//               </p>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors bg-white"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//                 <span className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium">
//                   {currentPage}
//                 </span>
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors bg-white"
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Professional Delete Confirmation Modal - Reduced Height */}
//         {deleteModal.isOpen && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
//             >
//               {/* Modal Header - Compact */}
//               <div className="px-5 py-3 bg-red-50 border-b border-red-100 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
//                     <AlertTriangle className="w-4 h-4 text-red-600" />
//                   </div>
//                   <h3 className="text-base font-semibold text-gray-900">Delete User Account</h3>
//                 </div>
//                 <button
//                   onClick={() => setDeleteModal({ isOpen: false, userId: null, userName: '', userRole: '' })}
//                   className="text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Modal Content - Compact */}
//               <div className="p-5">
//                 <p className="text-sm text-gray-600 mb-3">
//                   Are you sure you want to delete this user account? This action cannot be undone.
//                 </p>
                
//                 {/* User Info Card - Compact */}
//                 <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                   <div className="flex items-center gap-2">
//                     <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#84654C] to-[#f5b485] flex items-center justify-center text-white font-semibold text-base flex-shrink-0">
//                       {deleteModal.userName?.charAt(0)}
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900 text-sm">{deleteModal.userName}</p>
//                       <div className="flex items-center gap-2 mt-0.5">
//                         <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
//                           deleteModal.userRole === 'admin' 
//                             ? 'bg-purple-100 text-purple-800 border-purple-200' 
//                             : 'bg-blue-100 text-blue-800 border-blue-200'
//                         }`}>
//                           {deleteModal.userRole === 'admin' ? <Shield className="w-3 h-3" /> : <UserCog className="w-3 h-3" />}
//                           {deleteModal.userRole === 'admin' ? 'Admin' : 'Moderator'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Warning Message - Compact */}
//                 <div className="mb-4 p-2 bg-amber-50 rounded-lg border border-amber-200">
//                   <p className="text-xs text-amber-800 flex items-start gap-1.5">
//                     <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
//                     <span>
//                       <strong>Warning:</strong> This action is permanent and cannot be reversed.
//                     </span>
//                   </p>
//                 </div>

//                 {/* Modal Actions - Compact */}
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setDeleteModal({ isOpen: false, userId: null, userName: '', userRole: '' })}
//                     className="flex-1 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleDelete}
//                     className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium shadow-sm flex items-center justify-center gap-1.5"
//                   >
//                     <UserX className="w-3.5 h-3.5" />
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}

//         {/* Professional Edit User Modal - Reduced Height */}
//         {editModal.isOpen && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
//             >
//               {/* Modal Header - Compact */}
//               <div className="px-5 py-3 bg-gradient-to-r from-[#84654C] to-[#f5b485] flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
//                     <Edit2 className="w-4 h-4 text-white" />
//                   </div>
//                   <h3 className="text-base font-semibold text-white">Update User Information</h3>
//                 </div>
//                 <button
//                   onClick={() => setEditModal({ isOpen: false, user: null })}
//                   className="text-white/80 hover:text-white transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Modal Content - Compact */}
//               <div className="p-5">
//                 <form onSubmit={handleEditSubmit}>
//                   <div className="space-y-3">
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         Full Name <span className="text-[#84654C]">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="contactPerson"
//                         value={editFormData.contactPerson}
//                         onChange={handleEditChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#84654C] focus:border-[#84654C] transition-all"
//                         placeholder="Enter full name"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         Email Address <span className="text-[#84654C]">*</span>
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={editFormData.email}
//                         onChange={handleEditChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#84654C] focus:border-[#84654C] transition-all"
//                         placeholder="user@example.com"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         Phone Number <span className="text-[#84654C]">*</span>
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={editFormData.phone}
//                         onChange={handleEditChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#84654C] focus:border-[#84654C] transition-all"
//                         placeholder="+1 (555) 000-0000"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         WhatsApp <span className="text-gray-400 text-xs">(Optional)</span>
//                       </label>
//                       <input
//                         type="tel"
//                         name="whatsapp"
//                         value={editFormData.whatsapp}
//                         onChange={handleEditChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#84654C] focus:border-[#84654C] transition-all"
//                         placeholder="+1 (555) 000-0000"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         User Role <span className="text-[#84654C]">*</span>
//                       </label>
//                       <select
//                         name="role"
//                         value={editFormData.role}
//                         onChange={handleEditChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#84654C] focus:border-[#84654C] transition-all bg-white"
//                       >
//                         <option value="admin">Admin - Full System Access</option>
//                         <option value="moderator">Moderator - Limited Management Access</option>
//                       </select>
//                     </div>
//                   </div>

//                   {/* Form Actions - Compact */}
//                   <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
//                     <button
//                       type="button"
//                       onClick={() => setEditModal({ isOpen: false, user: null })}
//                       className="flex-1 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="flex-1 px-3 py-2 bg-[#84654C] text-white rounded-lg hover:bg-[#d68b55] transition-colors text-sm font-medium shadow-sm flex items-center justify-center gap-1.5"
//                     >
//                       <Save className="w-3.5 h-3.5" />
//                       Save
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// app/admin/manage-users/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Shield, 
  UserCog,
  Mail,
  Phone,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  X,
  CheckCircle,
  UserX,
  Save,
  Users,
  Sparkles,
  Gift,
  Calendar,
  MoreVertical
} from 'lucide-react';

export default function ManageUsers() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null, userName: '', userRole: '' });
  const [editModal, setEditModal] = useState({ isOpen: false, user: null });
  const [editFormData, setEditFormData] = useState({
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    role: ''
  });

  const usersPerPage = 10;

  // Floating elements for background
  const floatingElements = [
    { icon: '🎈', left: '3%', top: '10%', delay: 0, duration: 8 },
    { icon: '🧸', left: '92%', top: '20%', delay: 1, duration: 10 },
    { icon: '🎪', left: '8%', top: '75%', delay: 2, duration: 9 },
    { icon: '🎨', left: '88%', top: '70%', delay: 0.5, duration: 11 },
    { icon: '🚀', left: '12%', top: '45%', delay: 1.5, duration: 7 },
    { icon: '⭐', left: '85%', top: '40%', delay: 2.5, duration: 12 },
    { icon: '🎮', left: '20%', top: '85%', delay: 3, duration: 6 },
    { icon: '🎵', left: '78%', top: '85%', delay: 0.8, duration: 9 },
  ];

  // Get current user on mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      try {
        const parsed = JSON.parse(userData);
        setCurrentUser({
          ...parsed,
          id: parsed.id || parsed._id || parsed.userId
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, [currentPage, selectedRole, searchTerm]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const params = new URLSearchParams({
        page: currentPage,
        limit: usersPerPage,
        role: selectedRole !== 'all' ? selectedRole : '',
        search: searchTerm
      });

      const response = await fetch(`https://kids-backend.vercel.app/api/admin/users?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
        setTotalPages(data.totalPages);
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Connection Error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`https://kids-backend.vercel.app/api/admin/users/${deleteModal.userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('User Deleted', {
          description: `${deleteModal.userName} has been removed successfully`,
        });
        fetchUsers();
        setDeleteModal({ isOpen: false, userId: null, userName: '', userRole: '' });
      } else {
        toast.error('Delete Failed', {
          description: data.error || 'Something went wrong'
        });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Connection Error');
    }
  };

  const handleEdit = (user) => {
    setEditFormData({
      contactPerson: user.contactPerson,
      email: user.email,
      phone: user.phone,
      whatsapp: user.whatsapp || '',
      role: user.role
    });
    setEditModal({ isOpen: true, user });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`https://kids-backend.vercel.app/api/admin/users/${editModal.user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editFormData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('User Updated', {
          description: `${editFormData.contactPerson}'s information has been updated`,
        });
        setEditModal({ isOpen: false, user: null });
        fetchUsers();
      } else {
        toast.error('Update Failed', {
          description: data.error || 'Something went wrong'
        });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Connection Error');
    }
  };

  const isCurrentUser = (userId) => {
    if (!currentUser || !userId) return false;
    return (
      currentUser.id === userId || 
      currentUser._id === userId || 
      currentUser.userId === userId
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  const getRoleBadge = (role) => {
    switch(role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'moderator':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin':
        return <Shield className="w-3 h-3" />;
      case 'moderator':
        return <UserCog className="w-3 h-3" />;
      default:
        return <Users className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE] p-4 md:p-6 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-xl md:text-2xl opacity-20"
            style={{ left: item.left, top: item.top }}
            animate={{ 
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 10, -10, 0],
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
      </div>

      <div className="container mx-auto px-3 md:px-4 max-w-7xl pt-4 md:pt-6 pb-8 relative z-10">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#2D3A5C] flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
              <UserCog className="w-6 h-6 md:w-7 md:h-7 text-[#4A8A90]" />
              Manage Users
            </h1>
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FFB6C1]" />
              View and manage all admin and moderator accounts
              <Sparkles className="w-3 h-3 text-[#FFB6C1]" />
            </p>
          </div>
          
          <Link
            href="/admin/create-users"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] text-white rounded-xl hover:shadow-lg transition-all shadow-md text-sm md:text-base"
          >
            <Plus className="w-4 h-4" />
            <span>Create New User</span>
            <Gift className="w-4 h-4" />
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="🔍 Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A8A90] focus:border-[#4A8A90] transition-all bg-white"
            />
          </div>
          
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A8A90] focus:border-[#4A8A90] bg-white cursor-pointer"
          >
            <option value="all">🎭 All Roles</option>
            <option value="admin">🛡️ Admin Only</option>
            <option value="moderator">🎮 Moderator Only</option>
          </select>

          <button
            onClick={fetchUsers}
            className="px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-[#D4EDEE] transition-all flex items-center gap-2 bg-white"
          >
            <RefreshCw className="w-4 h-4 text-[#4A8A90]" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Users Table - Mobile Responsive Card View */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Desktop Table View - Hidden on mobile */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#D4EDEE] to-[#FFF0F3] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#2D3A5C] uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#2D3A5C] uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#2D3A5C] uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#2D3A5C] uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-[#2D3A5C] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin text-[#4A8A90]" />
                        <span className="text-gray-500">Loading users...</span>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p className="text-lg font-medium">No users found</p>
                        <p className="text-sm mt-1">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => {
                    const currentUserAccount = isCurrentUser(user._id);
                    
                    return (
                      <tr key={user._id} className={`hover:bg-gray-50 transition-colors ${currentUserAccount ? 'bg-[#D4EDEE]/20' : ''}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center text-white font-semibold text-sm relative">
                              {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                              {currentUserAccount && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 flex items-center gap-2 text-sm">
                                {user.contactPerson}
                                {currentUserAccount && (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200">
                                    You
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-400">
                                ID: {user._id.slice(-8)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                              <Mail className="w-3.5 h-3.5 text-gray-400" />
                              <span className="truncate max-w-[150px] text-xs">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                              <Phone className="w-3.5 h-3.5 text-gray-400" />
                              <span className="text-xs">{user.phone}</span>
                            </div>
                            {user.whatsapp && (
                              <div className="flex items-center gap-1.5 text-xs text-green-600">
                                <Smartphone className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadge(user.role)}`}>
                            {getRoleIcon(user.role)}
                            {user.role === 'admin' ? 'Admin' : 'Moderator'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(user.createdAt)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(user)}
                              className="p-2 text-gray-500 hover:text-[#4A8A90] hover:bg-[#D4EDEE] rounded-lg transition-all"
                              title="Edit user"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            
                            {currentUserAccount ? (
                              <button
                                disabled
                                className="p-2 text-gray-300 cursor-not-allowed rounded-lg"
                                title="You cannot delete your own account"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => setDeleteModal({ 
                                  isOpen: true, 
                                  userId: user._id, 
                                  userName: user.contactPerson,
                                  userRole: user.role
                                })}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                title="Delete user"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-100">
            {loading ? (
              <div className="p-8 text-center">
                <RefreshCw className="w-6 h-6 animate-spin text-[#4A8A90] mx-auto" />
                <p className="text-gray-500 mt-2 text-sm">Loading users...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="p-8 text-center">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">No users found</p>
              </div>
            ) : (
              users.map((user) => {
                const currentUserAccount = isCurrentUser(user._id);
                
                return (
                  <div key={user._id} className={`p-4 ${currentUserAccount ? 'bg-[#D4EDEE]/20' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center text-white font-semibold text-base relative">
                          {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                          {currentUserAccount && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 flex items-center gap-2">
                            {user.contactPerson}
                            {currentUserAccount && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">You</span>
                            )}
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border mt-1 ${getRoleBadge(user.role)}`}>
                            {getRoleIcon(user.role)}
                            {user.role === 'admin' ? 'Admin' : 'Moderator'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 text-gray-500 hover:text-[#4A8A90] rounded-lg"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {!currentUserAccount && (
                          <button
                            onClick={() => setDeleteModal({ 
                              isOpen: true, 
                              userId: user._id, 
                              userName: user.contactPerson,
                              userRole: user.role
                            })}
                            className="p-2 text-gray-500 hover:text-red-600 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-xs break-all">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-xs">{user.phone}</span>
                      </div>
                      {user.whatsapp && (
                        <div className="flex items-center gap-2 text-green-600">
                          <Smartphone className="w-4 h-4" />
                          <span className="text-xs">WhatsApp available</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gray-400 text-xs pt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Joined {formatDate(user.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {!loading && users.length > 0 && (
            <div className="px-4 md:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50">
              <p className="text-xs text-gray-500">
                Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors bg-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium">
                  {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors bg-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModal.isOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full shadow-xl overflow-hidden"
            >
              <div className="px-5 py-4 bg-red-50 border-b border-red-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">Delete User Account</h3>
                </div>
                <button
                  onClick={() => setDeleteModal({ isOpen: false, userId: null, userName: '', userRole: '' })}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-600 mb-4">
                  Are you sure you want to delete <strong>{deleteModal.userName}</strong>'s account? This action cannot be undone.
                </p>

                <div className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-xs text-amber-800 flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>All user data will be permanently removed from the system.</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setDeleteModal({ isOpen: false, userId: null, userName: '', userRole: '' })}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <UserX className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Edit User Modal */}
        {editModal.isOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full shadow-xl overflow-hidden"
            >
              <div className="px-5 py-4 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Edit2 className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Edit User</h3>
                </div>
                <button
                  onClick={() => setEditModal({ isOpen: false, user: null })}
                  className="text-white/80 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="p-5">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      👤 Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={editFormData.contactPerson}
                      onChange={handleEditChange}
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A8A90] focus:border-[#4A8A90] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      📧 Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A8A90] focus:border-[#4A8A90] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      📞 Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleEditChange}
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A8A90] focus:border-[#4A8A90] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      💬 WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={editFormData.whatsapp}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A8A90] focus:border-[#4A8A90] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      🎭 Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="role"
                      value={editFormData.role}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A8A90] focus:border-[#4A8A90] bg-white cursor-pointer"
                    >
                      <option value="admin">🛡️ Admin - Full Access</option>
                      <option value="moderator">🎮 Moderator - Limited Access</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setEditModal({ isOpen: false, user: null })}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] text-white rounded-xl hover:shadow-md transition-all text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}