import React, { useState } from 'react';
import { X, Plus, Utensils, Loader2, Check } from '../common/Icons';
import { quotesApi } from '../../services/api';
import { SEATING_AREAS } from '../../data/makesData';

export default function NewOrderModal({ isOpen, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    seatingArea: 'Devon House Grand Verandah',
    guests: '2 Guests',
    date: new Date().toISOString().split('T')[0],
    time: '7:30 PM',
    details: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please fill in guest name and contact phone.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const payload = {
        ...formData,
        id: `RES-MANUAL-${Date.now().toString().slice(-4)}`,
        vehicleYear: formData.guests,
        serviceCategory: formData.seatingArea,
        customerName: formData.name,
        customerPhone: formData.phone,
        status: 'pending'
      };
      const res = await quotesApi.submitPublicQuote(payload);
      if (onCreated) onCreated(res.quote || payload);
      onClose();
    } catch (err) {
      setError(err.data?.error || err.message || 'Failed to create reservation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-[#142a20] border-2 border-[#c5a059]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-auto text-[#ded7c8]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#183327] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white">Manual Table Reservation</h2>
              <p className="text-[10px] text-[#c5a059] uppercase tracking-wider">Host Stand & Phone Walk-In</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#ded7c8]/60 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#c5a059] font-bold mb-1">Guest Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Lord / Lady / Full Name"
                className="w-full bg-[#0d1e16] border border-[#c5a059]/30 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#c5a059]"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#c5a059] font-bold mb-1">Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (876) ..."
                className="w-full bg-[#0d1e16] border border-[#c5a059]/30 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#c5a059]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#c5a059] font-bold mb-1">Party Size</label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full bg-[#0d1e16] border border-[#c5a059]/30 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#c5a059]"
              >
                <option value="1 Guest">1 Guest</option>
                <option value="2 Guests">2 Guests (Intimate)</option>
                <option value="4 Guests">4 Guests</option>
                <option value="6 Guests">6 Guests</option>
                <option value="8+ VIP Party">8+ VIP Party</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#c5a059] font-bold mb-1">Seating Ambience</label>
              <select
                value={formData.seatingArea}
                onChange={(e) => setFormData({ ...formData, seatingArea: e.target.value })}
                className="w-full bg-[#0d1e16] border border-[#c5a059]/30 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#c5a059]"
              >
                {(SEATING_AREAS || []).map((area) => (
                  <option key={area.id} value={area.name}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#c5a059] font-bold mb-1">Reservation Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-[#0d1e16] border border-[#c5a059]/30 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#c5a059]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#c5a059] font-bold mb-1">Seating Time</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="7:00 PM / 8:30 PM"
                className="w-full bg-[#0d1e16] border border-[#c5a059]/30 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#c5a059] font-bold mb-1">Special Occasion & Culinary Preferences</label>
            <textarea
              rows={2}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Anniversary, Tomahawk pre-cut, vintage Bordeaux, outdoor terrace table..."
              className="w-full bg-[#0d1e16] border border-[#c5a059]/30 rounded-xl p-3 text-sm text-white outline-none focus:border-[#c5a059]"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t border-[#c5a059]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-[#ded7c8]/60 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#d8b46e] text-[#0d1e16] text-xs font-bold uppercase tracking-wider transition flex items-center space-x-1.5 shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              <span>Save Table Reservation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
