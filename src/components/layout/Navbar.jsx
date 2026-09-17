import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Phone, Menu, X, VerandahLogo } from '../common/Icons';
import { BUSINESS_INFO, isOpenNow } from '../../data/businessData';

/* ── Sun icon (inline, no lucide) ── */
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function Navbar({ onOpenWizard, currentPage = 'home', onNavigate, darkMode, onToggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const open = isOpenNow();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* GSAP: magnetic nav link effect */
  useEffect(() => {
    if (!navRef.current) return;
    const links = navRef.current.querySelectorAll('.mag-link');
    const handlers = [];
    links.forEach(link => {
      const onMove = (e) => {
        const rect = link.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.25;
        const dy = (e.clientY - cy) * 0.25;
        gsap.to(link, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
      };
      const onLeave = () => gsap.to(link, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
      link.addEventListener('mousemove', onMove);
      link.addEventListener('mouseleave', onLeave);
      handlers.push({ link, onMove, onLeave });
    });
    return () => handlers.forEach(({ link, onMove, onLeave }) => {
      link.removeEventListener('mousemove', onMove);
      link.removeEventListener('mouseleave', onLeave);
    });
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (target === 'services') {
      if (onNavigate) onNavigate('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (target === 'admin') {
      if (onNavigate) onNavigate('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return;
    }
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Menu',      target: 'services' },
    { name: 'Heritage',  target: '#about' },
    { name: 'Location',  target: '#location' },
    { name: 'Reviews',   target: '#reviews' },
    { name: 'Portal',    target: 'admin' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? darkMode
            ? 'bg-black/95 backdrop-blur-md border-b border-white/5 shadow-2xl'
            : 'bg-[#f5f0e8]/97 backdrop-blur-md border-b border-black/8 shadow-sm'
          : darkMode
            ? 'bg-black border-b border-white/5'
            : 'bg-[#f5f0e8] border-b border-black/6'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between" ref={navRef}>

        {/* Brand */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, '#top')}
          className="flex items-center gap-3 group cursor-pointer"
          aria-label="The Steak House on The Verandah"
        >
          <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors duration-300 ${
            darkMode ? 'border-[#c5a059]/50 bg-white/5' : 'border-black/20 bg-black/5'
          }`}>
            <VerandahLogo className={`w-5 h-5 ${darkMode ? 'text-[#c5a059]' : 'text-black'}`} />
          </div>
          <div className="flex flex-col leading-none">
            <span className={`font-serif text-[13px] font-bold tracking-widest uppercase transition-colors duration-300 ${
              darkMode ? 'text-[#f7f4ec]' : 'text-black'
            }`}>
              The Steak House
            </span>
            <span className={`text-[9px] tracking-[0.22em] uppercase font-medium mt-0.5 transition-colors duration-300 ${
              darkMode ? 'text-[#c5a059]' : 'text-[#b8955a]'
            }`}>
              on the verandah
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleNavClick(e, link.target)}
              className={`mag-link text-[11px] font-semibold tracking-[0.2em] uppercase cursor-pointer transition-colors duration-200 ${
                darkMode
                  ? 'text-[#ded7c8]/80 hover:text-[#c5a059]'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Live status dot */}
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${open ? 'bg-emerald-500 animate-pulse-slow' : 'bg-amber-400'}`} />
            <span className={`text-[10px] tracking-widest uppercase font-medium ${
              darkMode ? 'text-white/40' : 'text-black/40'
            }`}>
              {open ? 'Open Now' : 'Closed'}
            </span>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-full transition-colors duration-200 cursor-pointer ${
              darkMode
                ? 'text-[#c5a059] hover:bg-white/10'
                : 'text-black/60 hover:bg-black/8'
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Phone */}
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
            className={`flex items-center gap-1.5 text-[11px] font-semibold tracking-wide transition-colors ${
              darkMode ? 'text-[#f7f4ec]/70 hover:text-[#c5a059]' : 'text-black/60 hover:text-black'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>

          {/* Reserve CTA */}
          <button
            onClick={() => onOpenWizard()}
            className={`px-5 py-2.5 text-[11px] font-bold tracking-[0.15em] uppercase rounded-full border transition-all duration-200 cursor-pointer ${
              darkMode
                ? 'border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black'
                : 'border-black text-black hover:bg-black hover:text-[#f5f0e8]'
            }`}
          >
            Reserve Table
          </button>
        </div>

        {/* Mobile row */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-full cursor-pointer ${darkMode ? 'text-[#c5a059]' : 'text-black/60'}`}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => onOpenWizard()}
            className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded-full border cursor-pointer ${
              darkMode ? 'border-[#c5a059] text-[#c5a059]' : 'border-black text-black'
            }`}
          >
            Reserve
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 cursor-pointer ${darkMode ? 'text-[#f7f4ec]' : 'text-black'}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          className={`lg:hidden px-5 py-6 border-t space-y-1 ${
            darkMode ? 'bg-black border-white/5' : 'bg-[#f5f0e8] border-black/6'
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleNavClick(e, link.target)}
              className={`w-full text-left py-3 text-sm font-semibold tracking-widest uppercase cursor-pointer transition-colors ${
                darkMode ? 'text-[#f7f4ec]/80 hover:text-[#c5a059]' : 'text-black/70 hover:text-black'
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className="pt-4 border-t border-current/10">
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className={`flex items-center gap-2 py-3 text-sm font-semibold ${
                darkMode ? 'text-[#c5a059]' : 'text-black'
              }`}
            >
              <Phone className="w-4 h-4" />
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
