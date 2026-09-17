import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronRight, Sun, Moon, VerandahLogo } from '../common/Icons';
import { BUSINESS_INFO, isOpenNow } from '../../data/businessData';

export default function Navbar({ onOpenWizard, currentPage = 'home', onNavigate, darkMode, onToggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const open = isOpenNow();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (target === 'services') {
      if (onNavigate) onNavigate('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Tasting Menu', target: 'services' },
    { name: 'Devon Heritage', target: '#about' },
    { name: 'The Experience', target: '#amenities' },
    { name: 'Hours & Location', target: '#location' },
    { name: 'Accolades', target: '#reviews' },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0d1e16]/95 backdrop-blur-md shadow-lg border-b border-[#284d3b]/80' 
          : 'bg-[#0d1e16] border-b border-[#1d382b]'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        {/* Logo & Brand */}
        <a 
          href="#top" 
          onClick={(e) => handleNavClick(e, '#top')}
          className="flex items-center space-x-3.5 group cursor-pointer"
          aria-label="The Steak House on The Verandah - Back to Top"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#142a20] border-2 border-[#c5a059] p-1.5 shadow-md flex items-center justify-center transition group-hover:scale-105">
            <VerandahLogo className="w-8 h-8 text-[#c5a059]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-lg sm:text-xl font-bold tracking-tight text-[#f7f4ec] group-hover:text-[#c5a059] transition">
              The Steak House
            </span>
            <span className="text-xs tracking-widest uppercase text-[#c5a059] font-medium -mt-1">
              On The Verandah · Devon House
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleNavClick(e, link.target)}
              className="text-sm font-medium tracking-wide text-[#ded7c8] hover:text-[#c5a059] transition cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Desktop Right CTAs */}
        <div className="hidden lg:flex items-center space-x-5">
          {/* Service Status Badge */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#142a20] border border-[#284d3b]">
            <span className={`w-2.5 h-2.5 rounded-full ${open ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-xs text-[#ded7c8] font-medium">
              {open ? 'Verandah Open' : 'Opens 11:30 AM'}
            </span>
          </div>

          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="flex items-center space-x-2 text-sm text-[#f7f4ec] hover:text-[#c5a059] transition font-semibold"
            aria-label={`Call reservations ${BUSINESS_INFO.phone}`}
          >
            <Phone className="w-4 h-4 text-[#c5a059]" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>

          <button
            onClick={() => onOpenWizard()}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#c5a059] to-[#9d7a36] text-[#0a1711] font-bold text-sm tracking-wide shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition cursor-pointer"
            aria-label="Reserve a Verandah Table"
          >
            Reserve Table
          </button>
        </div>

        {/* Mobile Hamburger & Action */}
        <div className="flex lg:hidden items-center space-x-3">
          <button
            onClick={() => onOpenWizard()}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#9d7a36] text-[#0a1711] text-xs font-bold active:scale-95 shadow-sm"
            aria-label="Reserve Table"
          >
            Reserve
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-[#f7f4ec] hover:bg-[#142a20] border border-[#284d3b]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#c5a059]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-[#0d1e16] border-b border-[#284d3b] px-5 pt-3 pb-6 space-y-2 shadow-2xl" aria-label="Mobile Navigation">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleNavClick(e, link.target)}
              className="w-full text-left px-3.5 py-3 rounded-xl text-base font-medium text-[#f7f4ec] hover:bg-[#142a20] hover:text-[#c5a059] transition"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-4 border-t border-[#1d382b] space-y-3">
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl border border-[#284d3b] text-[#f7f4ec] font-bold text-base bg-[#142a20]"
              aria-label={`Call ${BUSINESS_INFO.phone}`}
            >
              <Phone className="w-5 h-5 text-[#c5a059]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenWizard(); }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#9d7a36] text-[#0a1711] font-bold text-base shadow-md"
              aria-label="Reserve a Verandah Table Now"
            >
              Reserve a Verandah Table
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
