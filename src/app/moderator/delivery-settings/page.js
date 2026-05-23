'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FaTruck, FaSave, FaSpinner, FaMapMarkerAlt, FaEye, FaLock, FaUserShield } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function ModeratorDeliverySettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    insideDhaka: '',
    outsideDhaka: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    checkUserPermission();
    fetchSettings();
  }, []);

  const checkUserPermission = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      toast.error('Please login to access this page');
      router.push('/login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Check if user is moderator or admin
      if (parsedUser.role === 'admin') {
        setCanEdit(true);
      } else if (parsedUser.role === 'moderator') {
        // Moderators can only view, not edit
        setCanEdit(false);
      } else {
        // Regular users cannot access
        toast.error('Access denied. Moderator privileges required.');
        router.push('/');
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/login');
    }
  };

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://kids-backend.vercel.app/api/delivery/settings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setSettings({
          insideDhaka: result.data.insideDhaka,
          outsideDhaka: result.data.outsideDhaka
        });
      } else {
        toast.error('Failed to load delivery settings');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!canEdit) {
      toast.error('You do not have permission to edit delivery settings');
      return;
    }
    
    // Validate that both fields have values
    if (!settings.insideDhaka && !settings.outsideDhaka) {
      toast.error('Please enter delivery charges');
      return;
    }
    
    setSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://kids-backend.vercel.app/api/delivery/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          insideDhaka: settings.insideDhaka || 0,
          outsideDhaka: settings.outsideDhaka || 0
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success('Delivery settings updated successfully');
      } else {
        toast.error(result.error || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    if (!canEdit) return;
    
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value === '' ? '' : parseInt(value)
    }));
  };

  const handleBlur = (e) => {
    if (!canEdit) return;
    
    const { name, value } = e.target;
    if (value === '' || value === null) {
      setSettings(prev => ({
        ...prev,
        [name]: 0
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header with Role Badge */}
        <div className="flex items-center justify-between mb-6 pt-2 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <FaTruck className="w-8 h-8 text-[#4A8A90]" />
            <h1 className="text-2xl font-bold text-gray-800">Delivery Charge Settings</h1>
          </div>
          
          {/* Role Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
            <FaUserShield className="w-4 h-4 text-[#4A8A90]" />
            <span className="text-sm font-medium text-gray-700">
              Role: {user?.role === 'admin' ? 'Administrator' : 'Moderator'}
            </span>
            {!canEdit && (
              <span className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full ml-2">
                <FaEye className="w-3 h-3" />
                View Only
              </span>
            )}
            {canEdit && (
              <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full ml-2">
                <FaSave className="w-3 h-3" />
                Full Access
              </span>
            )}
          </div>
        </div>

        {/* Permission Notice for Moderators */}
        {!canEdit && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FaLock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-blue-800">View Only Mode</h3>
                <p className="text-sm text-blue-700 mt-1">
                  As a moderator, you can view delivery settings but cannot modify them. 
                  Contact an administrator if you need to update these settings.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white text-lg font-semibold">Configure Shipping Costs</h2>
                <p className="text-white/80 text-sm mt-1">Set delivery charges for different zones</p>
              </div>
              {!canEdit && (
                <div className="bg-white/20 rounded-full px-3 py-1">
                  <span className="text-white text-xs font-medium">Read Only</span>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Inside Dhaka */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaMapMarkerAlt className="w-4 h-4 text-green-600" />
                Inside Dhaka City
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">৳</span>
                <input
                  type="number"
                  name="insideDhaka"
                  value={settings.insideDhaka === 0 ? '' : settings.insideDhaka}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step="10"
                  placeholder="Enter delivery charge for Dhaka"
                  disabled={!canEdit}
                  className={`w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent ${
                    !canEdit ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                />
              </div>
              <p className="text-xs text-gray-500">Delivery charge for addresses within Dhaka city</p>
            </div>

            {/* Outside Dhaka */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaTruck className="w-4 h-4 text-orange-600" />
                Outside Dhaka (Other Districts)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">৳</span>
                <input
                  type="number"
                  name="outsideDhaka"
                  value={settings.outsideDhaka === 0 ? '' : settings.outsideDhaka}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step="10"
                  placeholder="Enter delivery charge for outside Dhaka"
                  disabled={!canEdit}
                  className={`w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent ${
                    !canEdit ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                />
              </div>
              <p className="text-xs text-gray-500">Delivery charge for addresses outside Dhaka city</p>
            </div>

            {/* Preview Section */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Current Settings Preview</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Inside Dhaka:</span>
                  <span className="font-semibold text-green-600">৳{settings.insideDhaka || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Outside Dhaka:</span>
                  <span className="font-semibold text-orange-600">৳{settings.outsideDhaka || 0}</span>
                </div>
              </div>
            </div>

            {/* Last Updated Info */}
            <div className="text-xs text-gray-400 text-center">
              Settings are applied to all new orders automatically
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={saving || !canEdit}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  canEdit 
                    ? 'bg-[#4A8A90] text-white hover:bg-[#3A7A80]' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                } disabled:opacity-50`}
              >
                {saving ? (
                  <>
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    {canEdit ? (
                      <>
                        <FaSave className="w-4 h-4" />
                        Save Settings
                      </>
                    ) : (
                      <>
                        <FaEye className="w-4 h-4" />
                        View Only - No Edit Permission
                      </>
                    )}
                  </>
                )}
              </button>
            </div>

            {/* Admin Contact Info for Moderators */}
            {!canEdit && (
              <div className="text-center text-xs text-gray-400 pt-2">
                Need to update delivery charges? Contact an administrator.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}