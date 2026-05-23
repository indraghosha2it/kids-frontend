'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FaTruck, FaSave, FaSpinner, FaMapMarkerAlt } from 'react-icons/fa';

export default function DeliverySettingsPage() {
  const [settings, setSettings] = useState({
    insideDhaka: '',
    outsideDhaka: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://kids-backend.vercel.app/api/delivery/settings');
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
    const { name, value } = e.target;
    // Allow empty string, only convert to number if value is not empty
    setSettings(prev => ({
      ...prev,
      [name]: value === '' ? '' : parseInt(value)
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // If field is empty, set to 0
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
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pt-2">
          <FaTruck className="w-8 h-8 text-[#4A8A90]" />
          <h1 className="text-2xl font-bold text-gray-800">Delivery Charge Settings</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9]">
            <h2 className="text-white text-lg font-semibold">Configure Shipping Costs</h2>
            <p className="text-white/80 text-sm mt-1">Set delivery charges for different zones</p>
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
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
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
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500">Delivery charge for addresses outside Dhaka city</p>
            </div>

            {/* Preview Section */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Preview</h3>
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

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="w-4 h-4" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}