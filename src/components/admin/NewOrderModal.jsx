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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 my-auto text-[#f7f4ec]"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <h2 className="text-lg font-serif font-bold text-white">Manual Table Reservation</h2>
            <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#c5a059] mt-0.5">Host Stand · Phone Walk-In</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/8 transition cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl text-red-300 text-xs" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase font-bold text-[#c5a059] mb-1.5">Guest Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name"
                className="w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none transition"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                onFocus={e => e.target.style.borderColor = 'rgba(197,160,89,0.6)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase font-bold text-[#c5a059] mb-1.5">Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (876) ..."
                className="w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none transition"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                onFocus={e => e.target.style.borderColor = 'rgba(197,160,89,0.6)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase font-bold text-[#c5a059] mb-1.5">Party Size</label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full rounded-xl px-3 py-2.5 text-sm text-white outline-none transition"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', colorScheme: 'dark' }}
              >
                <option value="1 Guest">1 Guest</option>
                <option value="2 Guests">2 Guests (Intimate)</option>
                <option value="4 Guests">4 Guests</option>
                <option value="6 Guests">6 Guests</option>
                <option value="8+ VIP Party">8+ VIP Party</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase font-bold text-[#c5a059] mb-1.5">Seating Area</label>
              <select
                value={formData.seatingArea}
                onChange={(e) => setFormData({ ...formData, seatingArea: e.target.value })}
                className="w-full rounded-xl px-3 py-2.5 text-sm text-white outline-none transition"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', colorScheme: 'dark' }}
              >
                {(SEATING_AREAS || []).map((area) => (
                  <option key={area.id} value={area.name}>{area.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase font-bold text-[#c5a059] mb-1.5">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full rounded-xl px-3 py-2.5 text-sm text-white outline-none transition"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', colorScheme: 'dark' }}
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase font-bold text-[#c5a059] mb-1.5">Time</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="7:00 PM"
                className="w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none transition"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                onFocus={e => e.target.style.borderColor = 'rgba(197,160,89,0.6)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase font-bold text-[#c5a059] mb-1.5">Special Notes</label>
            <textarea
              rows={2}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Anniversary, vintage Bordeaux, terrace preference..."
              className="w-full rounded-xl p-3 text-sm text-white placeholder-white/25 outline-none transition resize-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
              onFocus={e => e.target.style.borderColor = 'rgba(197,160,89,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white/70 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition flex items-center gap-2 shadow-lg hover:opacity-90 active:scale-95 cursor-pointer disabled:opacity-50"
              style={{ background: '#c5a059', color: '#0c0c0c' }}
            >
              {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              <span>Save Reservation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
