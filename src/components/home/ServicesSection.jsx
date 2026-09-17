import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES, MENU_DISCLAIMER } from '../../data/servicesData';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { id: 'all',        label: 'All' },
  { id: 'Starters',   label: 'Starters' },
  { id: 'Mains',      label: 'Mains' },
  { id: 'Drinks',     label: 'Beverages' },
  { id: 'Desserts',   label: 'Dessert' },
];

/* Four items shown — split between the "daily dish" hero photo on left and price list on right */
const FEATURED_IDS = ['usda-ribeye', 'bone-marrow-meat-butter', 'stuffed-crab-backs', 'steakhouse-brew'];

export default function ServicesSection({ onOpenWizard, onViewAllServices, darkMode }) {
  const [activeTab, setActiveTab] = useState('all');
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const ruleRef    = useRef(null);
  const menuRef    = useRef(null);

  /* Pull featured dishes */
  const featured = FEATURED_IDS.map(id => SERVICES.find(s => s.id === id)).filter(Boolean);

  /* Category-filtered list for the price list side */
  const filtered = activeTab === 'all'
    ? featured
    : featured.filter(s => s.category === activeTab);

  const dailyDish = featured[0]; // Hero "DAILY DISH" photo

  /* GSAP: section heading draw-in line + menu items fade-in on scroll */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      /* Draw-in line under MENU heading */
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(ruleRef.current, {
            width: '6rem',
            duration: 1,
            ease: 'power2.out',
          });
          gsap.fromTo(
            headingRef.current,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );
        },
      });

      /* Menu items fade-in on scroll */
      gsap.fromTo(
        menuRef.current?.querySelectorAll('.menu-row') || [],
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: menuRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className={`py-24 sm:py-32 transition-colors duration-300 ${
        darkMode ? 'bg-[#0c0c0c]' : 'bg-[#f5f0e8]'
      }`}
      aria-labelledby="menu-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* ── MENU heading (Gilded Grill centered style) ── */}
        <div
          ref={headingRef}
          className="text-center mb-12 sm:mb-16 opacity-0"
        >
          <p className={`micro-label mb-3 ${darkMode ? 'text-[#c5a059]' : 'text-[#b8955a]'}`}>
            Devon House Estate Chophouse
          </p>
          <h2
            id="menu-heading"
            className={`font-serif font-bold tracking-[0.12em] uppercase ${darkMode ? 'text-[#f7f4ec]' : 'text-black'}`}
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Menu
          </h2>
          {/* Draw-in rule */}
          <div
            ref={ruleRef}
            className="h-px mx-auto mt-3"
            style={{
              width: 0,
              background: 'linear-gradient(to right, transparent, var(--gold), transparent)',
            }}
          />
          <p className={`text-[10px] mt-4 tracking-widest uppercase font-medium ${darkMode ? 'text-[#c5a059]/60' : 'text-[#b8955a]/70'}`}>
            {MENU_DISCLAIMER}
          </p>
        </div>

        {/* ── Category Tab Filter ── */}
        <div className="flex items-center justify-center gap-2 sm:gap-6 mb-14 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase pb-1 transition-all duration-200 cursor-pointer ${
                activeTab === cat.id
                  ? darkMode
                    ? 'text-[#c5a059] border-b border-[#c5a059]'
                    : 'text-black border-b border-black'
                  : darkMode
                    ? 'text-white/40 hover:text-white/70'
                    : 'text-black/40 hover:text-black/70'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Main two-column layout (Gilded Grill DNA) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">

          {/* LEFT: Daily Dish editorial photo */}
          <div className="relative group overflow-hidden rounded-2xl">
            {dailyDish && (
              <>
                <img
                  src={dailyDish.image}
                  alt={dailyDish.title}
                  loading="lazy"
                  className="w-full h-[480px] sm:h-[560px] lg:h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* Overlay label (Gilded Grill style) */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#d4af37] mb-1.5">
                    Daily Dish
                  </p>
                  <h3 className="font-serif text-white text-xl sm:text-2xl font-bold leading-tight">
                    {dailyDish.title}
                  </h3>
                  <p className="text-white/70 text-sm mt-2 leading-relaxed line-clamp-2">
                    {dailyDish.description}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* RIGHT: Dotted price list (Gilded Grill DNA) */}
          <div ref={menuRef} className="flex flex-col justify-center py-4">
            <div className="space-y-0">
              {(filtered.length ? filtered : featured).map((item, idx) => (
                <div
                  key={item.id}
                  className={`menu-row group cursor-pointer py-6 border-b transition-all duration-200 ${
                    idx === 0 ? (darkMode ? 'border-t border-white/8' : 'border-t border-black/8') : ''
                  } ${darkMode ? 'border-white/8 hover:bg-white/3' : 'border-black/8 hover:bg-black/3'}`}
                  onClick={() => onOpenWizard(item.category, item.title)}
                  style={{ opacity: 0 }} /* GSAP will animate in */
                >
                  {/* Item name + dotted line + price */}
                  <div className="flex items-baseline gap-2">
                    <span className={`font-serif text-base sm:text-lg font-semibold flex-shrink-0 transition-colors ${
                      darkMode ? 'text-[#f7f4ec] group-hover:text-[#c5a059]' : 'text-black'
                    }`}>
                      {item.title}
                    </span>
                    {/* Dotted line fill */}
                    <span
                      className="flex-1 h-px"
                      style={{
                        backgroundImage: `repeating-linear-gradient(to right, ${darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.18)'} 0px, ${darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.18)'} 3px, transparent 3px, transparent 8px)`,
                        backgroundSize: '8px 1px',
                        position: 'relative',
                        top: '-3px',
                      }}
                    />
                    <span className={`font-semibold text-sm flex-shrink-0 ${darkMode ? 'text-[#c5a059]' : 'text-[#b8955a]'}`}>
                      {item.price}
                    </span>
                  </div>
                  {/* Description */}
                  <p className={`text-xs mt-1.5 leading-relaxed line-clamp-2 ${darkMode ? 'text-white/45' : 'text-black/50'}`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* See All pill button */}
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <button
                onClick={onViewAllServices}
                className={`btn-pill ${
                  darkMode ? 'border-white/30 text-white hover:bg-white hover:text-black' : ''
                }`}
              >
                See All Menus
              </button>
              <button
                onClick={() => onOpenWizard()}
                className="btn-pill-gold"
              >
                Reserve Now
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
