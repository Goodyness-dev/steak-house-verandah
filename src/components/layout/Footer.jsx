import React from 'react';
import { Phone, MapPin, Mail, ChevronRight, VerandahLogo } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Footer({ onOpenWizard, onNavigate, darkMode }) {
  const handleLink = (e, target) => {
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

  const bg  = darkMode ? 'bg-[#0a0a0a]'  : 'bg-[#0d0d0d]';
  const txt = '#f7f4ec';
  const sub = 'rgba(255,255,255,0.45)';
  const acc = darkMode ? '#c5a059' : '#b8955a';
  const bdr = 'rgba(255,255,255,0.06)';

  const links = [
    { label: 'Tasting Menu',        target: 'services' },
    { label: 'Devon Heritage',      target: '#about' },
    { label: 'The Experience',      target: '#amenities' },
    { label: 'Hours & Location',    target: '#location' },
    { label: 'Guest Accolades',     target: '#reviews' },
  ];

  return (
    <footer className={`${bg} pb-16 sm:pb-0`} style={{ borderTop: `1px solid ${bdr}` }} role="contentinfo">
      
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ border: `1px solid rgba(197,160,89,0.4)`, background: 'rgba(255,255,255,0.04)' }}>
              <VerandahLogo className="w-5 h-5" style={{ color: acc }} />
            </div>
            <div>
              <span className="font-serif font-bold text-sm uppercase tracking-widest block" style={{ color: txt }}>
                The Steak House
              </span>
              <span className="text-[10px] tracking-[0.22em] uppercase font-medium block -mt-0.5" style={{ color: acc }}>
                On The Verandah
              </span>
            </div>
          </div>
          <p className="text-sm leading-relaxed font-light max-w-sm" style={{ color: sub }}>
            Located at the historic 1881 Devon House estate in Kingston, Jamaica — prime dry-aged steaks, Caribbean fusion, and al-fresco colonial terrace dining.
          </p>
          <div>
            <button
              onClick={() => onOpenWizard()}
              className="px-6 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase cursor-pointer transition-all hover:opacity-80"
              style={{ border: `1.5px solid ${acc}`, color: acc, background: 'transparent' }}
            >
              Reserve a Table
            </button>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase mb-5" style={{ color: acc }}>
            Explore
          </h4>
          <ul className="space-y-3">
            {links.map(l => (
              <li key={l.label}>
                <button
                  onClick={(e) => handleLink(e, l.target)}
                  className="text-xs font-medium transition-colors cursor-pointer hover:opacity-100"
                  style={{ color: sub }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase mb-5" style={{ color: acc }}>
            Visit Us
          </h4>
          <address className="not-italic space-y-3 text-xs" style={{ color: sub }}>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: acc }} />
              <span>Devon House, 26 Hope Road<br />Kingston 10, Jamaica, W.I.</span>
            </div>
            <a href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g,'')}`} className="flex items-center gap-2.5 hover:opacity-100 transition-opacity">
              <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: acc }} />
              {BUSINESS_INFO.phone}
            </a>
            <a href={`mailto:${BUSINESS_INFO.email}`} className="flex items-center gap-2.5 hover:opacity-100 transition-opacity">
              <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: acc }} />
              {BUSINESS_INFO.email}
            </a>
            <div className="text-[10px] leading-relaxed pt-1">
              Tue–Sun: 11:30 AM – 10:00 PM<br />
              <span style={{ color: 'rgba(255,166,100,0.6)' }}>Mon: Closed</span>
            </div>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-5 py-5" style={{ borderTop: `1px solid ${bdr}` }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
          <span>© {new Date().getFullYear()} The Steak House on The Verandah. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span>Devon House · Kingston, Jamaica</span>
            <button
              onClick={() => onNavigate('admin')}
              className="hover:opacity-70 transition-opacity underline underline-offset-2 cursor-pointer"
            >
              Maître D' Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
