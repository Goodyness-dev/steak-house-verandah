import React from 'react';
import { MapPin, Clock, Phone, ExternalLink, Navigation, Mail } from '../common/Icons';
import { BUSINESS_INFO, isOpenNow } from '../../data/businessData';

export default function LocationHoursSection({ onOpenWizard, darkMode }) {
  const open = isOpenNow();
  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const currentDayName = dayNames[new Date().getDay()];

  const bg  = darkMode ? 'bg-[#0c0c0c]' : 'bg-[#ece5d6]';
  const txt = darkMode ? 'text-[#f7f4ec]' : 'text-black';
  const sub = darkMode ? 'text-white/50'  : 'text-black/50';
  const acc = darkMode ? 'text-[#c5a059]' : 'text-[#b8955a]';
  const cardBg = darkMode ? 'bg-white/3 border-white/6' : 'bg-white/60 border-black/8';
  const bdr = darkMode ? 'border-white/8' : 'border-black/8';

  return (
    <section
      id="location"
      className={`py-24 sm:py-32 transition-colors duration-300 ${bg}`}
      aria-labelledby="location-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className={`micro-label mb-3 ${acc}`}>Devon House Estate, Kingston 10</p>
          <h2
            id="location-heading"
            className={`font-serif font-bold ${txt}`}
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            Hours &amp; Location
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Hours + Contact */}
          <div className={`rounded-2xl border p-8 sm:p-10 flex flex-col justify-between ${cardBg}`}>
            {/* Open/Closed badge */}
            <div className={`flex items-center gap-2.5 mb-8 pb-6 border-b ${bdr}`}>
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${open ? 'bg-emerald-500 animate-pulse-slow' : 'bg-amber-400'}`} />
              <span className={`text-xs font-semibold tracking-widest uppercase ${open ? (darkMode ? 'text-emerald-400' : 'text-emerald-600') : (darkMode ? 'text-amber-300' : 'text-amber-600')}`}>
                {open ? 'Open Now' : 'Currently Closed'}
              </span>
              <span className={`text-xs ml-auto ${sub}`}>Today: {currentDayName}</span>
            </div>

            {/* Hours table */}
            <div className="space-y-0 mb-8">
              <p className={`micro-label mb-4 ${acc}`}>Dining Hours</p>
              {BUSINESS_INFO.hours.map((h) => {
                const isToday = h.day.toLowerCase() === currentDayName.toLowerCase();
                return (
                  <div
                    key={h.day}
                    className={`py-3 border-b flex justify-between items-center text-sm ${bdr} ${
                      isToday ? (darkMode ? 'text-[#c5a059]' : 'text-[#b8955a] font-semibold') : ''
                    }`}
                  >
                    <span className={isToday ? 'font-bold' : (darkMode ? 'text-white/70' : 'text-black/70')}>
                      {h.day}
                    </span>
                    <span className={h.open === 'Closed' ? (darkMode ? 'text-amber-300/70' : 'text-amber-600') : (darkMode ? 'text-white/60' : 'text-black/60')}>
                      {h.open === 'Closed' ? 'Closed' : `${h.open} – ${h.close}`}
                      {h.note && <span className={`block text-[10px] ${sub}`}>{h.note}</span>}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Contact */}
            <div className={`space-y-3 pt-6 border-t ${bdr}`}>
              <a href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g,'')}`} className={`flex items-center gap-3 text-sm transition-colors ${darkMode ? 'text-white/60 hover:text-[#c5a059]' : 'text-black/60 hover:text-black'}`}>
                <Phone className="w-4 h-4 flex-shrink-0" />
                {BUSINESS_INFO.phone}
              </a>
              <a href={`tel:${BUSINESS_INFO.secondaryPhone.replace(/[^0-9]/g,'')}`} className={`flex items-center gap-3 text-sm transition-colors ${darkMode ? 'text-white/60 hover:text-[#c5a059]' : 'text-black/60 hover:text-black'}`}>
                <Phone className="w-4 h-4 flex-shrink-0" />
                {BUSINESS_INFO.secondaryPhone}
              </a>
              <a href={`mailto:${BUSINESS_INFO.email}`} className={`flex items-center gap-3 text-sm transition-colors ${darkMode ? 'text-white/60 hover:text-[#c5a059]' : 'text-black/60 hover:text-black'}`}>
                <Mail className="w-4 h-4 flex-shrink-0" />
                {BUSINESS_INFO.email}
              </a>
              <a
                href={BUSINESS_INFO.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 text-sm transition-colors ${darkMode ? 'text-white/60 hover:text-[#c5a059]' : 'text-black/60 hover:text-black'}`}
              >
                <Navigation className="w-4 h-4 flex-shrink-0" />
                26 Hope Road, Kingston 10
                <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
              </a>
            </div>
          </div>

          {/* Map embed */}
          <div className={`rounded-2xl border overflow-hidden ${cardBg}`}>
            <div className={`px-5 py-3 border-b flex items-center justify-between ${bdr}`}>
              <span className={`text-[11px] font-semibold tracking-wider uppercase ${sub}`}>
                Devon House · 26 Hope Road, Kingston 10
              </span>
              <a
                href={BUSINESS_INFO.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 transition-colors ${acc}`}
              >
                Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <iframe
              title="Steak House on The Verandah Map"
              src="https://maps.google.com/maps?q=18.0148763,-76.7898652&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
