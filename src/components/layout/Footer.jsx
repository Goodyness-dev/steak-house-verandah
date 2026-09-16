import React from 'react';
import { Phone, MapPin, ChevronRight, Utensils, Mail, Clock } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Footer({ onOpenWizard, onNavigate }) {
  const handleLinkClick = (e, target) => {
    e.preventDefault();
    if (target === 'services') {
      if (onNavigate) onNavigate('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (onNavigate) onNavigate('home');
    setTimeout(() => {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-[#08130e] text-[#a3b8ad] text-sm sm:text-base pb-16 sm:pb-0 border-t border-[#1d382b]" role="contentinfo">
      {/* Pre-footer Reserve Bar */}
      <div className="bg-gradient-to-r from-[#142a20] via-[#1a372a] to-[#142a20] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#284d3b]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="font-cursive-accent text-xl text-[#c5a059] italic block mb-1">
              Table & Private Gazebo Reservations
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#f7f4ec] tracking-tight">
              An Evening of Distinction on Devon House Verandah
            </h3>
            <p className="text-[#ded7c8] mt-1 text-sm sm:text-base font-light">
              Reserve your terrace table, anniversary celebration, or cellar tasting in advance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto shrink-0">
            <button
              onClick={() => onOpenWizard()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#c5a059] to-[#9d7a36] text-[#0a1711] font-bold text-sm sm:text-base hover:brightness-110 active:scale-95 transition shadow-lg text-center cursor-pointer"
              aria-label="Reserve a Verandah Table"
            >
              Reserve a Verandah Table
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#0d1e16] hover:bg-[#142a20] text-[#f7f4ec] font-bold text-sm sm:text-base transition border border-[#284d3b] hover:border-[#c5a059] flex items-center justify-center space-x-2.5 active:scale-95 text-center cursor-pointer"
              aria-label={`Call reservations ${BUSINESS_INFO.phone}`}
            >
              <Phone className="w-4 h-4 text-[#c5a059]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#142a20] border border-[#c5a059] flex items-center justify-center">
              <Utensils className="w-5 h-5 text-[#c5a059]" />
            </div>
            <div>
              <span className="font-serif-luxury font-bold text-white text-base block">
                The Steak House
              </span>
              <span className="text-xs text-[#c5a059] uppercase tracking-widest block">
                On The Verandah
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#a3b8ad] leading-relaxed font-light">
            Located at the historic 1881 Devon House estate in Kingston, Jamaica. Offering prime dry-aged chophouse cuts, Caribbean fusion cuisine, and colonial terrace ambiance.
          </p>
          <div className="pt-1">
            <span className="text-xs text-[#c5a059] font-medium block">Executive Chef Brian & Culinary Guild</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif-luxury text-[#f7f4ec] font-bold text-sm uppercase tracking-wider mb-4">The Verandah</h4>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            <li>
              <button 
                onClick={(e) => handleLinkClick(e, 'services')} 
                className="hover:text-[#c5a059] transition cursor-pointer"
              >
                Degustation & Tasting Menu
              </button>
            </li>
            <li>
              <button 
                onClick={(e) => handleLinkClick(e, '#about')} 
                className="hover:text-[#c5a059] transition cursor-pointer"
              >
                Devon House Heritage (1881)
              </button>
            </li>
            <li>
              <button 
                onClick={(e) => handleLinkClick(e, '#amenities')} 
                className="hover:text-[#c5a059] transition cursor-pointer"
              >
                Terrace & Private Gazebo
              </button>
            </li>
            <li>
              <button 
                onClick={(e) => handleLinkClick(e, '#location')} 
                className="hover:text-[#c5a059] transition cursor-pointer"
              >
                Hours & Driving Directions
              </button>
            </li>
            <li>
              <button 
                onClick={(e) => handleLinkClick(e, '#reviews')} 
                className="hover:text-[#c5a059] transition cursor-pointer"
              >
                Guest Accolades & Press
              </button>
            </li>
          </ul>
        </div>

        {/* Dining Hours */}
        <div>
          <h4 className="font-serif-luxury text-[#f7f4ec] font-bold text-sm uppercase tracking-wider mb-4">Operating Hours</h4>
          <ul className="space-y-2 text-xs sm:text-sm text-[#ded7c8]">
            <li className="flex justify-between">
              <span>Tuesday – Sunday</span>
              <span className="font-semibold text-[#f7f4ec]">11:30 AM – 10:00 PM</span>
            </li>
            <li className="flex justify-between text-amber-300/80">
              <span>Monday</span>
              <span className="font-semibold">Closed (Private Events)</span>
            </li>
            <li className="pt-2 text-xs text-[#a3b8ad]">
              Lunch Service: 11:30 AM – 3:00 PM<br />
              Dinner Service: 5:00 PM – 10:00 PM
            </li>
          </ul>
        </div>

        {/* Contact & Address */}
        <div>
          <h4 className="font-serif-luxury text-[#f7f4ec] font-bold text-sm uppercase tracking-wider mb-4">Devon House Location</h4>
          <address className="not-italic space-y-3 text-xs sm:text-sm">
            <div className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-[#ded7c8]">
                Devon House, 26 Hope Road<br />
                Kingston 10, Jamaica, W.I.
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-[#c5a059] shrink-0" aria-hidden="true" />
              <a 
                href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`} 
                className="text-[#f7f4ec] hover:text-[#c5a059] font-semibold transition"
              >
                {BUSINESS_INFO.phone}
              </a>
            </div>
            <div className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-[#c5a059] shrink-0" aria-hidden="true" />
              <a 
                href={`mailto:${BUSINESS_INFO.email}`} 
                className="text-[#ded7c8] hover:text-[#c5a059] transition"
              >
                {BUSINESS_INFO.email}
              </a>
            </div>
            <a
              href={BUSINESS_INFO.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#c5a059] hover:text-[#e2c585] font-semibold pt-1"
            >
              <span>View On Google Maps</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </a>
          </address>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1d382b] py-6 px-4 text-center text-xs text-[#a3b8ad]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} {BUSINESS_INFO.legalName}. All rights reserved.</span>
          <div className="flex items-center space-x-4">
            <span>Devon House, Kingston, Jamaica</span>
            <span>•</span>
            <button
              onClick={() => onNavigate('admin')}
              className="text-[#a3b8ad] hover:text-[#c5a059] transition underline underline-offset-2 cursor-pointer"
            >
              Maitre D' & Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
