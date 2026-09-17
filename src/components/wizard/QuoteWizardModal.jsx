import React, { useState } from 'react';
import {
  X,
  Calendar,
  Users,
  Wine,
  CheckCircle2,
  Phone,
  ArrowRight,
  ArrowLeft,
  MapPin,
  VerandahLogo,
} from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';
import { SEATING_AREAS, DINING_OCCASIONS } from '../../data/makesData';

/* ── Constants ── */
const TIME_SLOTS = [
  '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
  '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM',
];

const CULINARY_HIGHLIGHTS = [
  { id: 'ribeye',  label: '16oz USDA Prime Ribeye ($17,000 JMD)',             desc: 'Sizzling skillet · Classic, Chimichurri or Country Style' },
  { id: 'filet',   label: 'Grass Fed 8oz Filet ($9,000 JMD)',                  desc: 'Tenderloin grilled to liking with clarified butter' },
  { id: 'marrow',  label: 'Scotch Bonnet "Meat Butter" Marrow ($3,000 JMD)',   desc: 'Canoe-cut broiled marrow with breadfruit tostones' },
  { id: 'crab',    label: 'Stuffed Local Crab Backs ($4,700 JMD)',              desc: 'Norma Shirley heritage classic with Solomon Gundy aioli' },
  { id: 'lobster', label: 'Lobster in Callaloo Thermidor ($8,600 JMD)',         desc: 'Fresh local lobster, callaloo béchamel & croissant gratin' },
  { id: 'brew',    label: 'Steakhouse Brew & Rum Cellar Flight ($1,500 JMD)',   desc: 'Jamaican red rum, mezcal, passion fruit & vintage pours' },
];

/* ── Shared style tokens (modal is ALWAYS dark) ── */
const GOLD   = '#c5a059';
const INPUT  = 'bg-white/4 border border-white/10 rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-[#c5a059]/60 transition';
const LABEL  = 'block text-[10px] tracking-[0.2em] uppercase font-bold text-[#c5a059] mb-2';
const PILL_INACTIVE = 'border border-white/12 bg-white/4 text-white/60 hover:border-white/30 hover:text-white/90';
const PILL_ACTIVE   = 'border border-[#c5a059] bg-white/6 text-white';

export default function QuoteWizardModal({ isOpen, onClose }) {
  const [step, setStep]       = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [resId, setResId]     = useState('');
  const [formData, setFormData] = useState({
    guests:        '2 Guests',
    seatingArea:   'Historic Devon Verandah',
    occasion:      'Romantic Dinner / Date Night',
    date:          new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time:          '7:00 PM',
    selectedDishes: [],
    winePairing:   true,
    fullName:      '',
    phone:         '',
    email:         '',
    dietaryNotes:  '',
  });

  if (!isOpen) return null;

  /* ── Handlers ── */
  const set = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const handleDishToggle = (id) => {
    setFormData(prev => ({
      ...prev,
      selectedDishes: prev.selectedDishes.includes(id)
        ? prev.selectedDishes.filter(i => i !== id)
        : [...prev.selectedDishes, id],
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const id = `VRN-${Math.floor(1000 + Math.random() * 9000)}`;
    setResId(id);
    try {
      const existing = JSON.parse(localStorage.getItem('verandah_reservations') || '[]');
      localStorage.setItem(
        'verandah_reservations',
        JSON.stringify([{ id, createdAt: new Date().toISOString(), status: 'Confirmed', ...formData }, ...existing])
      );
    } catch (err) {
      console.error('Reservation storage error:', err);
    }
    setSubmitted(true);
  };

  /* ── Step labels ── */
  const STEPS = [
    { n: 1, label: 'Seating' },
    { n: 2, label: 'Date & Time' },
    { n: 3, label: 'Contact' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#0c0c0c] border border-white/8 rounded-2xl shadow-2xl text-[#f7f4ec] overflow-hidden">

        {/* ── Modal Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#c5a059] p-1.5">
              <VerandahLogo className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-base font-bold tracking-wide text-white">
                Verandah Table Concierge
              </h2>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#c5a059] font-bold mt-0.5">
                Historic Devon House · Kingston, Jamaica
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/6 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="p-6 md:p-8">
          {!submitted ? (
            <>
              {/* Step progress: 01 · 02 · 03 */}
              <div className="flex items-center gap-4 mb-8">
                {STEPS.map((s, idx) => {
                  const done    = step > s.n;
                  const current = step === s.n;
                  return (
                    <React.Fragment key={s.n}>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-sm font-bold transition-colors ${
                            current ? 'text-[#c5a059]'
                            : done   ? 'text-white/50'
                            :          'text-white/20'
                          }`}
                        >
                          {String(s.n).padStart(2, '0')}
                        </span>
                        <span
                          className={`text-[10px] tracking-[0.15em] uppercase font-semibold hidden sm:inline transition-colors ${
                            current ? 'text-white'
                            : done   ? 'text-white/40'
                            :          'text-white/20'
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                      {idx < STEPS.length - 1 && (
                        <span className="text-white/15 text-xs">·</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* ─── STEP 1: Seating ─── */}
              {step === 1 && (
                <div className="space-y-6">
                  {/* Party size */}
                  <div>
                    <label className={LABEL}>
                      <Users className="w-3 h-3 inline mr-1.5 opacity-70" />
                      Party Size
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {['1 Guest', '2 Guests', '4 Guests', '6+ Guests'].map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => set('guests', g)}
                          className={`py-2.5 rounded-full border text-xs font-semibold tracking-wide transition text-center cursor-pointer ${
                            formData.guests === g ? PILL_ACTIVE : PILL_INACTIVE
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Seating area */}
                  <div>
                    <label className={LABEL}>
                      <MapPin className="w-3 h-3 inline mr-1.5 opacity-70" />
                      Preferred Ambience &amp; Seating
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {(SEATING_AREAS || []).map((area, idx) => {
                        const name = typeof area === 'string' ? area : (area.name || `Seating ${idx + 1}`);
                        const desc = typeof area === 'object' && area.description ? area.description : 'Devon House historic dining setting';
                        const id   = typeof area === 'object' && area.id ? area.id : `seat-${idx}`;
                        const active = formData.seatingArea === name;
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => set('seatingArea', name)}
                            className={`p-4 rounded-xl border text-left transition flex flex-col cursor-pointer ${
                              active ? `${PILL_ACTIVE} ring-1 ring-[#c5a059]/40` : PILL_INACTIVE
                            }`}
                          >
                            <span className="font-serif font-bold text-sm text-white mb-1 leading-snug">{name}</span>
                            <span className="text-xs text-white/45 leading-relaxed">{desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Occasion pills */}
                  <div>
                    <label className={LABEL}>Dining Occasion</label>
                    <div className="flex flex-wrap gap-2">
                      {(DINING_OCCASIONS || []).map(occ => (
                        <button
                          key={occ}
                          type="button"
                          onClick={() => set('occasion', occ)}
                          className={`py-2 px-3.5 rounded-full border text-xs font-medium transition cursor-pointer ${
                            formData.occasion === occ ? PILL_ACTIVE : PILL_INACTIVE
                          }`}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 2: Date / Time / Dishes ─── */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL}>
                        <Calendar className="w-3 h-3 inline mr-1.5 opacity-70" />
                        Reservation Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={e => set('date', e.target.value)}
                        className={`w-full px-4 py-3 text-sm ${INPUT}`}
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                    <div>
                      <label className={LABEL}>Seating Time</label>
                      <select
                        value={formData.time}
                        onChange={e => set('time', e.target.value)}
                        className={`w-full px-4 py-3 text-sm ${INPUT}`}
                        style={{ colorScheme: 'dark' }}
                      >
                        {TIME_SLOTS.map(t => (
                          <option key={t} value={t} className="bg-[#0c0c0c] text-white">{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Culinary highlights */}
                  <div>
                    <label className={LABEL}>Priority Cut or Culinary Pairing (Optional)</label>
                    <p className="text-xs text-white/40 mb-3">
                      Select cuts you'd like dry-aged or reserved in cellar for your table:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {CULINARY_HIGHLIGHTS.map(item => {
                        const active = formData.selectedDishes.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleDishToggle(item.id)}
                            className={`p-3 rounded-xl border text-left transition flex items-start justify-between cursor-pointer ${
                              active ? PILL_ACTIVE : PILL_INACTIVE
                            }`}
                          >
                            <div className="flex-1 min-w-0 mr-2">
                              <p className="text-xs font-bold text-white leading-snug">{item.label}</p>
                              <p className="text-[11px] text-white/40 mt-0.5 leading-snug">{item.desc}</p>
                            </div>
                            <span
                              className={`text-xs transition-opacity mt-0.5 ${active ? 'text-[#c5a059]' : 'opacity-15'}`}
                            >✦</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Wine / sommelier toggle */}
                  <div className="p-4 rounded-xl border border-white/8 bg-white/3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Wine className="w-4 h-4 text-[#c5a059] shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-white">Reserve Sommelier Consultation</p>
                        <p className="text-[11px] text-white/40 mt-0.5">Pre-chill vintage Bordeaux or Jamaican rum pairing</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.winePairing}
                      onChange={e => set('winePairing', e.target.checked)}
                      className="w-5 h-5 rounded cursor-pointer accent-[#c5a059]"
                    />
                  </div>
                </div>
              )}

              {/* ─── STEP 3: Contact ─── */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={LABEL}>Primary Guest Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sir Marcus Sterling"
                      value={formData.fullName}
                      onChange={e => set('fullName', e.target.value)}
                      className={`w-full px-4 py-3 text-sm ${INPUT}`}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL}>
                        <Phone className="w-3 h-3 inline mr-1.5 opacity-70" />
                        Phone (WhatsApp / Mobile) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (876) …"
                        value={formData.phone}
                        onChange={e => set('phone', e.target.value)}
                        className={`w-full px-4 py-3 text-sm ${INPUT}`}
                      />
                    </div>
                    <div>
                      <label className={LABEL}>Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="guest@domain.com"
                        value={formData.email}
                        onChange={e => set('email', e.target.value)}
                        className={`w-full px-4 py-3 text-sm ${INPUT}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={LABEL}>Dietary Restrictions or Celebration Notes</label>
                    <textarea
                      rows="2"
                      placeholder="Allergies, anniversary flowers, champagne greeting, or verandah placement…"
                      value={formData.dietaryNotes}
                      onChange={e => set('dietaryNotes', e.target.value)}
                      className={`w-full px-4 py-3 text-sm resize-none ${INPUT}`}
                    />
                  </div>

                  {/* Summary box */}
                  <div className="p-4 rounded-xl border border-white/8 bg-white/3 text-xs space-y-1.5">
                    <p className="micro-label text-[#c5a059] mb-2">Reservation Overview</p>
                    <p className="text-white/80">
                      <span className="text-white/40">Table for:</span>{' '}
                      {formData.guests} · {formData.seatingArea}
                    </p>
                    <p className="text-white/80">
                      <span className="text-white/40">Scheduled:</span>{' '}
                      {formData.date} at {formData.time}
                      {formData.occasion && ` · ${formData.occasion}`}
                    </p>
                  </div>
                </form>
              )}

              {/* ── Navigation ── */}
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/6">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(s => s - 1)}
                    className="btn-pill flex items-center gap-2 !py-2 !px-5 !border-white/15 !text-white/60 hover:!text-white hover:!bg-white/6 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(s => s + 1)}
                    className="btn-pill-gold flex items-center gap-2 !py-2.5 !px-6 cursor-pointer"
                  >
                    Continue <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn-pill-gold flex items-center gap-2 !py-2.5 !px-6 cursor-pointer"
                    style={{ boxShadow: `0 0 20px rgba(197,160,89,0.35)` }}
                  >
                    Confirm Verandah Table
                  </button>
                )}
              </div>
            </>
          ) : (
            /* ── Confirmation Screen ── */
            <div className="py-8 text-center space-y-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-[#c5a059] mx-auto border border-white/10"
                style={{ background: 'rgba(197,160,89,0.08)', boxShadow: '0 0 30px rgba(197,160,89,0.2)' }}
              >
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-white">Table Reservation Confirmed</h3>
                <p className="micro-label text-[#c5a059]">Reservation Reference: {resId}</p>
                <p className="text-sm text-white/60 max-w-sm mx-auto leading-relaxed mt-2">
                  Thank you,{' '}
                  <span className="text-white font-medium">{formData.fullName || 'Valued Guest'}</span>.
                  Your table at{' '}
                  <span className="text-[#c5a059]">The Steak House on The Verandah</span>{' '}
                  is reserved for{' '}
                  <span className="text-white font-medium">{formData.guests}</span> on{' '}
                  <span className="text-white font-medium">{formData.date}</span> at{' '}
                  <span className="text-white font-medium">{formData.time}</span>.
                </p>
              </div>

              {/* Details card */}
              <div className="max-w-sm mx-auto p-4 rounded-xl border border-white/8 bg-white/3 text-left text-xs space-y-2">
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                  <span>Devon House · 26 Hope Road, Kingston 10, Jamaica</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Phone className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                  <span>Direct Line: {BUSINESS_INFO.phone}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="btn-pill flex items-center justify-center gap-2 !border-white/15 !text-white/60 hover:!text-white hover:!bg-white/6 !py-2.5 !px-6"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Host Stand
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-pill-gold !py-2.5 !px-6 cursor-pointer"
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
