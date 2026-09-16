import React from 'react';
import { MapPin, Clock, Navigation, Phone, ExternalLink, Mail, Utensils } from '../common/Icons';
import { BUSINESS_INFO, isOpenNow } from '../../data/businessData';

export default function LocationHoursSection({ onOpenWizard }) {
  const open = isOpenNow();
  const currentDayIndex = new Date().getDay();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = dayNames[currentDayIndex];

  return (
    <section id="location" className="py-20 sm:py-28 bg-[#0d1e16] text-[#f7f4ec] transition-colors" aria-labelledby="location-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="font-cursive-accent text-2xl sm:text-3xl text-[#c5a059] italic block mb-1">
            Devon House Estate, Kingston 10
          </span>
          <h2 id="location-heading" className="font-serif-luxury text-3xl sm:text-5xl font-bold tracking-tight text-[#f7f4ec]">
            Hours & Directions
          </h2>
          <p className="text-[#ded7c8] mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed font-light">
            Dine on the historic terrace of Devon House at 26 Hope Road. Reserved estate parking & valet available for all dining patrons.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Hours & Contact Card */}
          <div className="lg:col-span-5 card-thick p-6 sm:p-8 space-y-6 flex flex-col justify-between border border-[#284d3b]">
            <div>
              {/* Open/Closed Status */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0a1711] border border-[#284d3b] mb-6">
                <div className="flex items-center space-x-3.5">
                  <span className={`w-3.5 h-3.5 rounded-full ${open ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} aria-hidden="true" />
                  <div>
                    <span className={`font-bold text-base sm:text-lg block ${open ? 'text-emerald-300' : 'text-amber-300'}`}>
                      {open ? 'Verandah Open for Service' : 'Closed for Pre-Service Prep'}
                    </span>
                    <span className="text-xs text-[#a3b8ad]">Today is {currentDayName}</span>
                  </div>
                </div>
                <Clock className="w-6 h-6 text-[#c5a059]" aria-hidden="true" />
              </div>

              {/* Hours Table */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#c5a059] uppercase tracking-wider mb-3">
                  Dining Hours
                </h3>
                <div className="divide-y divide-[#284d3b]/60 text-sm">
                  {BUSINESS_INFO.hours.map((h) => {
                    const isToday = h.day.toLowerCase() === currentDayName.toLowerCase();
                    return (
                      <div
                        key={h.day}
                        className={`py-2.5 px-3 flex justify-between items-center rounded-xl transition ${
                          isToday 
                            ? 'bg-[#1a372a] font-semibold text-[#f7f4ec] border border-[#c5a059]/40' 
                            : 'text-[#ded7c8]'
                        }`}
                      >
                        <span className={isToday ? 'text-[#c5a059] font-bold' : ''}>
                          {h.day}
                        </span>
                        <div className="text-right">
                          <span className={h.open === 'Closed' ? 'text-amber-300/80 font-medium' : 'text-[#f7f4ec]'}>
                            {h.open === 'Closed' ? 'Closed (Private Events)' : `${h.open} – ${h.close}`}
                          </span>
                          {h.note && (
                            <span className="block text-[11px] text-[#a3b8ad] font-normal">{h.note}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact Links */}
              <div className="pt-6 border-t border-[#284d3b] space-y-3">
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center space-x-3 text-sm text-[#ded7c8] hover:text-[#c5a059] transition"
                >
                  <Phone className="w-4 h-4 text-[#c5a059]" />
                  <span>Main Reservations: {BUSINESS_INFO.phone}</span>
                </a>
                <a
                  href={`tel:${BUSINESS_INFO.secondaryPhone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center space-x-3 text-sm text-[#ded7c8] hover:text-[#c5a059] transition"
                >
                  <Phone className="w-4 h-4 text-[#c5a059]" />
                  <span>Cellar & Events: {BUSINESS_INFO.secondaryPhone}</span>
                </a>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center space-x-3 text-sm text-[#ded7c8] hover:text-[#c5a059] transition"
                >
                  <Mail className="w-4 h-4 text-[#c5a059]" />
                  <span>{BUSINESS_INFO.email}</span>
                </a>
              </div>
            </div>

            {/* Directions Link */}
            <a
              href={BUSINESS_INFO.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-2xl bg-[#0a1711] hover:bg-[#142a20] text-[#f7f4ec] font-bold text-sm border border-[#284d3b] hover:border-[#c5a059] transition flex items-center justify-center space-x-2 shadow-sm active:scale-95"
            >
              <Navigation className="w-4 h-4 text-[#c5a059]" />
              <span>Get Directions to Devon House</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#a3b8ad]" />
            </a>
          </div>

          {/* Interactive Google Map */}
          <div className="lg:col-span-7 card-thick overflow-hidden border border-[#284d3b] flex flex-col">
            <div className="px-5 py-4 border-b border-[#284d3b] flex items-center justify-between bg-[#0a1711]">
              <span className="font-serif-luxury text-sm sm:text-base text-[#f7f4ec] font-bold">
                📍 Devon House, 26 Hope Road, Kingston 10, Jamaica
              </span>
              <a
                href={BUSINESS_INFO.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c5a059] hover:text-[#e2c585] font-bold text-xs sm:text-sm flex items-center space-x-1"
                aria-label="Open location in Google Maps"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="w-full flex-1 min-h-[340px] sm:min-h-[420px]">
              <iframe
                title="The Steak House on The Verandah at Devon House Map"
                src="https://maps.google.com/maps?q=18.0148763,-76.7898652&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[340px] sm:min-h-[420px]"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
