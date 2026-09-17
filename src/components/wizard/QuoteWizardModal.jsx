import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Users,
  Utensils,
  Wine,
  Sparkles,
  CheckCircle2,
  Phone,
  ArrowRight,
  ArrowLeft,
  MapPin,
  VerandahLogo
} from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';
import { SEATING_AREAS, DINING_OCCASIONS } from '../../data/makesData';

const TIME_SLOTS = [
  '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
  '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
];

const CULINARY_HIGHLIGHTS = [
  { id: 'ribeye', label: '16oz USDA Prime Ribeye ($17,000 JMD)', desc: 'Sizzling skillet · Classic, Chimichurri or Country Style' },
  { id: 'filet', label: 'Grass Fed 8oz Filet ($9,000 JMD)', desc: 'Tenderloin grilled to liking with clarified butter' },
  { id: 'marrow', label: 'Scotch Bonnet "Meat Butter" Marrow ($3,000 JMD)', desc: 'Canoe-cut broiled marrow with breadfruit tostones' },
  { id: 'crab', label: 'Stuffed Local Crab Backs ($4,700 JMD)', desc: 'Norma Shirley heritage classic with Solomon Gundy aioli' },
  { id: 'lobster', label: 'Lobster in Callaloo Thermidor ($8,600 JMD)', desc: 'Fresh local lobster, callaloo béchamel & croissant gratin' },
  { id: 'brew', label: 'Steakhouse Brew & Rum Cellar Flight ($1,500 JMD)', desc: 'Jamaican red rum, mezcal, passion fruit & vintage pours' },
];

export default function QuoteWizardModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    guests: '2 Guests',
    seatingArea: 'Devon House Grand Verandah',
    occasion: 'Romantic Dinner',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '7:00 PM',
    selectedDishes: ['tomahawk'],
    winePairing: true,
    fullName: '',
    phone: '',
    email: '',
    dietaryNotes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [resId, setResId] = useState('');

  if (!isOpen) return null;

  const handleDishToggle = (id) => {
    setFormData((prev) => ({
      ...prev,
      selectedDishes: prev.selectedDishes.includes(id)
        ? prev.selectedDishes.filter((item) => item !== id)
        : [...prev.selectedDishes, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedId = `VRN-${Math.floor(1000 + Math.random() * 9000)}`;
    setResId(generatedId);

    // Persist to local storage mock inbox
    try {
      const existing = JSON.parse(localStorage.getItem('verandah_reservations') || '[]');
      const newRes = {
        id: generatedId,
        createdAt: new Date().toISOString(),
        status: 'Confirmed',
        ...formData,
      };
      localStorage.setItem('verandah_reservations', JSON.stringify([newRes, ...existing]));
    } catch (err) {
      console.error('Reservation storage error:', err);
    }

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#0d1e16] border-2 border-[#c5a059]/40 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(197,160,89,0.15)] text-[#ded7c8] overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#c5a059]/20 bg-[#142a20]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#183327] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] p-1.5">
              <VerandahLogo className="w-6 h-6 text-[#c5a059]" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold tracking-wide text-white">
                Verandah Table Concierge
              </h2>
              <p className="text-xs text-[#c5a059] tracking-wider uppercase">
                Historic Devon House · Kingston, Jamaica
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#ded7c8]/70 hover:text-[#c5a059] hover:bg-[#183327] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8">
          {!submitted ? (
            <>
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#c5a059]/15">
                {[
                  { n: 1, title: 'Seating' },
                  { n: 2, title: 'Date & Time' },
                  { n: 3, title: 'Contact' },
                ].map((s) => (
                  <div key={s.n} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        step === s.n
                          ? 'bg-[#c5a059] text-[#0d1e16]'
                          : step > s.n
                          ? 'bg-[#183327] text-[#c5a059] border border-[#c5a059]'
                          : 'bg-[#142a20] text-[#ded7c8]/40 border border-[#c5a059]/20'
                      }`}
                    >
                      {step > s.n ? '✓' : s.n}
                    </div>
                    <span
                      className={`text-xs font-medium hidden sm:inline ${
                        step === s.n ? 'text-white' : 'text-[#ded7c8]/50'
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 1: Party Size, Seating & Occasion */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-2">
                      Party Size
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {['1 Guest', '2 Guests', '4 Guests', '6+ Guests'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setFormData({ ...formData, guests: g })}
                          className={`py-3 rounded-xl border text-sm font-medium transition text-center ${
                            formData.guests === g
                              ? 'border-[#c5a059] bg-[#183327] text-white shadow-sm'
                              : 'border-[#c5a059]/20 bg-[#142a20]/40 text-[#ded7c8]/70 hover:border-[#c5a059]/50'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-2">
                      Preferred Ambience & Seating
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {(SEATING_AREAS || []).map((area) => (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, seatingArea: area.name })}
                          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                            formData.seatingArea === area.name
                              ? 'border-[#c5a059] bg-[#183327] text-white'
                              : 'border-[#c5a059]/20 bg-[#142a20]/40 text-[#ded7c8]/70 hover:border-[#c5a059]/50'
                          }`}
                        >
                          <span className="font-serif font-bold text-sm text-white mb-1">
                            {area.name}
                          </span>
                          <span className="text-xs text-[#ded7c8]/60">
                            {area.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-2">
                      Dining Occasion
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {(DINING_OCCASIONS || []).map((occ) => (
                        <button
                          key={occ}
                          type="button"
                          onClick={() => setFormData({ ...formData, occasion: occ })}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition truncate ${
                            formData.occasion === occ
                              ? 'border-[#c5a059] bg-[#183327] text-white'
                              : 'border-[#c5a059]/20 bg-[#142a20]/30 text-[#ded7c8]/60 hover:border-[#c5a059]/40'
                          }`}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Date, Time & Cuts Interest */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-2">
                        Reservation Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#142a20] border border-[#c5a059]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-2">
                        Seating Time
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-[#142a20] border border-[#c5a059]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a059]"
                      >
                        {TIME_SLOTS.map((t) => (
                          <option key={t} value={t} className="bg-[#0d1e16] text-white">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-2">
                      Priority Cut or Culinary Pairing (Optional)
                    </label>
                    <p className="text-xs text-[#ded7c8]/60 mb-3">
                      Select cuts you would like dry-aged or reserved in cellar for your table:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {CULINARY_HIGHLIGHTS.map((item) => {
                        const active = formData.selectedDishes.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleDishToggle(item.id)}
                            className={`p-3 rounded-xl border text-left transition flex items-start justify-between ${
                              active
                                ? 'border-[#c5a059] bg-[#183327] text-white'
                                : 'border-[#c5a059]/20 bg-[#142a20]/30 text-[#ded7c8]/60 hover:border-[#c5a059]/40'
                            }`}
                          >
                            <div>
                              <p className="text-xs font-bold text-white">{item.label}</p>
                              <p className="text-[11px] text-[#ded7c8]/50">{item.desc}</p>
                            </div>
                            <span className={`text-xs ml-2 ${active ? 'text-[#c5a059]' : 'opacity-20'}`}>
                              ✦
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#142a20]/60 border border-[#c5a059]/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Wine className="w-5 h-5 text-[#c5a059]" />
                      <div>
                        <p className="text-xs font-bold text-white">Reserve Sommelier Consultation</p>
                        <p className="text-[11px] text-[#ded7c8]/60">Pre-chill vintage Bordeaux or Jamaican rum pairing</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.winePairing}
                      onChange={(e) => setFormData({ ...formData, winePairing: e.target.checked })}
                      className="w-5 h-5 accent-[#c5a059] rounded cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Contact & Special Requests */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-1.5">
                      Primary Guest Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sir Marcus Sterling"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#142a20] border border-[#c5a059]/30 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-1.5">
                        Phone (WhatsApp / Mobile) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (876) ..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#142a20] border border-[#c5a059]/30 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="guest@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#142a20] border border-[#c5a059]/30 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-1.5">
                      Dietary Restrictions or Special Celebration Notes
                    </label>
                    <textarea
                      rows="2"
                      placeholder="Allergies, table anniversary flowers, champagne greeting, or specific verandah placement..."
                      value={formData.dietaryNotes}
                      onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                      className="w-full bg-[#142a20] border border-[#c5a059]/30 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-[#183327]/60 border border-[#c5a059]/30 text-xs space-y-1">
                    <p className="font-bold text-[#c5a059] uppercase tracking-wider mb-1">
                      Reservation Overview:
                    </p>
                    <p className="text-white">
                      <span className="text-[#ded7c8]/60">Table for:</span> {formData.guests} · {formData.seatingArea}
                    </p>
                    <p className="text-white">
                      <span className="text-[#ded7c8]/60">Scheduled:</span> {formData.date} at {formData.time} ({formData.occasion})
                    </p>
                  </div>
                </form>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-[#c5a059]/15">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#c5a059]/30 text-xs font-semibold uppercase tracking-wider text-[#ded7c8] hover:bg-[#142a20] transition"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#c5a059] text-[#0d1e16] text-xs font-bold uppercase tracking-wider hover:bg-[#d8b46e] shadow-lg transition"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-7 py-3 rounded-xl bg-[#c5a059] text-[#0d1e16] text-xs font-bold uppercase tracking-widest hover:bg-[#d8b46e] shadow-[0_0_20px_rgba(197,160,89,0.4)] transition"
                  >
                    Confirm Verandah Table
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Confirmation State */
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#183327] border-2 border-[#c5a059] flex items-center justify-center text-[#c5a059] mx-auto shadow-[0_0_25px_rgba(197,160,89,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-white">
                  Table Reservation Confirmed
                </h3>
                <p className="text-xs text-[#c5a059] uppercase tracking-widest font-semibold">
                  Reservation Reference: {resId}
                </p>
                <p className="text-sm text-[#ded7c8]/80 max-w-md mx-auto">
                  Thank you, <span className="text-white font-medium">{formData.fullName || 'Valued Guest'}</span>. Your table at <span className="text-[#c5a059]">The Steak House on The Verandah</span> has been reserved for <span className="text-white font-medium">{formData.guests}</span> on <span className="text-white font-medium">{formData.date}</span> at <span className="text-white font-medium">{formData.time}</span>.
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#142a20] border border-[#c5a059]/20 text-left text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-white font-medium">
                  <MapPin className="w-4 h-4 text-[#c5a059]" />
                  <span>Devon House · 26 Hope Road, Kingston 10, Jamaica</span>
                </div>
                <div className="flex items-center gap-2 text-[#ded7c8]/70">
                  <Phone className="w-4 h-4 text-[#c5a059]" />
                  <span>Direct Line: {BUSINESS_INFO.phone}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="px-6 py-2.5 rounded-xl border border-[#c5a059]/40 text-xs font-bold uppercase tracking-wider text-[#c5a059] hover:bg-[#183327] transition text-center"
                >
                  Call Host Stand
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#c5a059] text-[#0d1e16] text-xs font-bold uppercase tracking-wider hover:bg-[#d8b46e] transition"
                >
                  Return to Estate Menu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
