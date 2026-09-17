import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SERVICES,
  SERVICE_CATEGORIES,
  MENU_DISCLAIMER,
} from '../../data/servicesData';
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Search,
  CheckCircle2,
  Utensils,
  VerandahLogo,
} from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

gsap.registerPlugin(ScrollTrigger);

export default function AllServicesPage({ onOpenWizard, onBackToHome, darkMode }) {
  const [selectedCategory, setSelectedCategory] = useState('All Offerings');
  const [searchQuery, setSearchQuery] = useState('');
  const ruleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /* ── GSAP animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Draw-in gold rule */
      if (ruleRef.current) {
        gsap.fromTo(
          ruleRef.current,
          { width: '0%' },
          {
            width: '100%',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ruleRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }

        /* Stagger card fade-in */
        if (gridRef.current) {
          const cards = gridRef.current.querySelectorAll('.menu-card');
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.07,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      });
    return () => ctx.revert();
  }, []);

  /* Re-trigger card animations when filter changes */
  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.menu-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [selectedCategory, searchQuery]);

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory =
      selectedCategory === 'All Offerings' || service.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      service.title.toLowerCase().includes(q) ||
      service.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  /* ── Adaptive token shorthands ── */
  const bg       = darkMode ? 'bg-[#0c0c0c]'         : 'bg-[#f5f0e8]';
  const textInk  = darkMode ? 'text-[#f7f4ec]'        : 'text-[#0d0d0d]';
  const textMid  = darkMode ? 'text-white/50'          : 'text-black/50';
  const borderLine = darkMode ? 'border-white/8'      : 'border-black/10';
  const cardBg   = darkMode ? 'bg-[#111]'             : 'bg-white';
  const inputBg  = darkMode
    ? 'bg-white/4 border-white/10 text-white placeholder-white/25 focus:border-[#c5a059]/60'
    : 'bg-black/4 border-black/12 text-[#0d0d0d] placeholder-black/30 focus:border-[#b8955a]/60';

  const goldTxt  = darkMode ? 'text-[#c5a059]' : 'text-[#b8955a]';
  const goldVal  = darkMode ? '#c5a059' : '#b8955a';

  return (
    <div className={`min-h-screen ${bg} ${textInk} pb-28 sm:pb-20 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16">

        {/* ── Top Bar ── */}
        <div className={`flex items-center justify-between pb-5 mb-10 border-b ${borderLine}`}>
          <button
            onClick={onBackToHome}
            className="btn-pill flex items-center gap-2 !py-2 !px-5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Verandah</span>
          </button>

          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className={`hidden sm:flex items-center gap-2 text-sm font-semibold ${goldTxt} transition hover:opacity-80`}
          >
            <Phone className="w-4 h-4" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>
        </div>

        {/* ── Page Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          {/* Micro-label */}
          <p className={`micro-label ${goldTxt} mb-4 flex items-center justify-center gap-2`}>
            <VerandahLogo className="w-4 h-4" />
            <span>Official Devon House Menus · Jamaican Dollars (JMD)</span>
          </p>

          <h1
            className={`font-serif text-4xl sm:text-6xl font-bold tracking-tight ${textInk} uppercase`}
          >
            The Verandah Repertoire
          </h1>

          <p
            className={`mt-4 text-sm sm:text-base font-cursive ${textMid} italic leading-relaxed max-w-xl mx-auto`}
          >
            From the sizzling 16 oz USDA Ribeye and broiled "Meat Butter" bone marrow to
            our heritage stuffed crab backs, rum cellar flights, and world-famous Devon
            House desserts.
          </p>

          {/* Gold draw-in rule */}
          <div
            ref={ruleRef}
            className="h-px mt-6 mb-5 mx-auto"
            style={{
              width: '0%',
              background: `linear-gradient(to right, transparent, ${goldVal}, transparent)`,
            }}
          />

          {/* Disclaimer */}
          <p className={`micro-label ${textMid} max-w-md mx-auto leading-relaxed normal-case font-normal`}>
            {MENU_DISCLAIMER}
          </p>
        </div>

        {/* ── Filter Bar & Search ── */}
        <div
          className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-12 pb-6 border-b ${borderLine}`}
        >
          {/* Category tabs */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {SERVICE_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-[10px] tracking-[0.22em] uppercase font-semibold pb-1 border-b-2 transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    active
                      ? darkMode
                        ? 'border-[#c5a059] text-[#c5a059]'
                        : 'border-[#b8955a] text-[#b8955a]'
                      : `border-transparent ${textMid} hover:${textInk}`
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${goldTxt} opacity-60`} />
            <input
              type="text"
              placeholder="Search ribeye, marrow, rum…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-full border text-sm focus:outline-none transition ${inputBg}`}
            />
          </div>
        </div>

        {/* ── Services Grid ── */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`menu-card card-thick-hover ${cardBg} rounded-2xl overflow-hidden flex flex-col will-animate`}
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {service.popular && (
                  <div
                    className="absolute top-3 right-3 micro-label px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: goldVal }}
                  >
                    Signature
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category micro-label */}
                  <p className={`micro-label ${goldTxt} mb-1`}>
                    {service.subType || service.category}
                  </p>

                  {/* Dish name */}
                  <h2 className={`font-serif text-xl font-bold ${textInk} leading-snug`}>
                    {service.title}
                  </h2>

                  <p className={`text-xs ${textMid} leading-relaxed mt-2.5`}>
                    {service.description}
                  </p>

                  {/* Features */}
                  {service.features && (
                    <div className={`mt-4 pt-3 border-t ${borderLine} space-y-1.5`}>
                      {service.features.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${goldTxt} shrink-0`} />
                          <span className={textMid}>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer: price + CTA */}
                <div className={`mt-6 pt-4 border-t ${borderLine} flex items-center justify-between`}>
                  <span className={`text-sm font-bold ${goldTxt}`}>{service.price}</span>
                  <button
                    onClick={() => onOpenWizard(service.category, service.title)}
                    className="btn-pill-gold flex items-center gap-2 !py-2 !px-4 !text-[10px] cursor-pointer"
                  >
                    <span>Reserve Table</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Empty State ── */}
        {filteredServices.length === 0 && (
          <div
            className={`text-center py-20 rounded-2xl border ${borderLine} ${darkMode ? 'bg-white/3' : 'bg-black/3'} p-10 mt-4`}
          >
            <Utensils className={`w-10 h-10 ${goldTxt} mx-auto mb-4 opacity-40`} />
            <h3 className={`font-serif text-xl font-bold ${textInk} mb-2`}>
              No selections match your search
            </h3>
            <p className={`text-sm ${textMid} mb-7`}>
              Try adjusting your search or reset the filters to view all offerings.
            </p>
            <button
              onClick={() => { setSelectedCategory('All Offerings'); setSearchQuery(''); }}
              className="btn-pill-gold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom spacer */}
        <div className="h-12" />
      </div>
    </div>
  );
}
