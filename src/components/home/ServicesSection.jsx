import React, { useState } from 'react';
import { SERVICES, SERVICE_CATEGORIES } from '../../data/servicesData';
import { ArrowRight, Utensils, Sparkles, Star, Wine, Flame, ChevronRight } from '../common/Icons';

export default function ServicesSection({ onOpenWizard, onViewAllServices }) {
  const [activeCategory, setActiveCategory] = useState('All Offerings');

  const filteredServices = activeCategory === 'All Offerings'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  return (
    <section id="menu" className="py-20 sm:py-28 bg-[#0a1711] text-[#f7f4ec] transition-colors" aria-labelledby="menu-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="font-cursive-accent text-2xl sm:text-3xl text-[#c5a059] italic block mb-2">
            The Verandah Degustation
          </span>
          <h2 id="menu-heading" className="font-serif-luxury text-3xl sm:text-5xl font-bold tracking-tight text-[#f7f4ec]">
            Artisanal Chophouse Menu
          </h2>
          <p className="text-[#ded7c8] mt-4 text-base sm:text-lg leading-relaxed font-light">
            Every dish is an homage to Caribbean terroir, prepared with open-flame pimento wood charcoal, Himalayan salt-brick aging, and fresh Jamaican spices.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-16">
          {SERVICE_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#c5a059] to-[#9d7a36] text-[#0a1711] shadow-md scale-105'
                    : 'bg-[#142a20] text-[#ded7c8] hover:text-[#f7f4ec] hover:bg-[#1a372a] border border-[#284d3b]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TEMPLATE SECTION 2 MIRROR: Side-by-Side Plate & Parchment Menu Dossier */}
        {/* ========================================================================= */}
        <div className="card-thick p-6 sm:p-10 lg:p-12 mb-16 border border-[#284d3b] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Top-Down Ceramic Plate */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-sm w-full">
                <div className="rounded-full p-2.5 bg-gradient-to-br from-[#284d3b] to-[#142a20] shadow-2xl border border-[#c5a059]/40">
                  <img
                    src="/images/dish-fusion.jpg"
                    alt="Artisanal Caribbean Terroir Course"
                    loading="lazy"
                    className="w-full aspect-square object-cover rounded-full shadow-2xl transition duration-500 group-hover:scale-102"
                  />
                </div>
                <div className="absolute -bottom-2 -left-2 px-3.5 py-1.5 rounded-xl bg-[#0d1e16]/95 border border-[#c5a059]/50 shadow-md">
                  <span className="text-xs font-semibold text-[#c5a059]">Fresh Farm Greens & Terroir</span>
                </div>
              </div>
            </div>

            {/* Right: Elegant Menu Dossier matching template layout */}
            <div className="lg:col-span-7 space-y-6">
              <div className="border-b border-[#284d3b] pb-4">
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold">Chef's Signature Highlights</span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f7f4ec] font-bold mt-1">
                  Verandah Tasting Selections
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-4 rounded-2xl bg-[#0d1e16] border border-[#284d3b]/80 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-[#f7f4ec]">28-Day Dry-Aged Ribeye</h4>
                    <span className="text-xs text-[#c5a059] font-semibold">Market Cut</span>
                  </div>
                  <p className="text-xs text-[#a3b8ad] leading-relaxed">
                    Pimento charcoal seared with scotch bonnet herb butter & grilled plantain.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0d1e16] border border-[#284d3b]/80 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-[#f7f4ec]">Scotch Bonnet Bone Marrow</h4>
                    <span className="text-xs text-[#c5a059] font-semibold">Appetizer</span>
                  </div>
                  <p className="text-xs text-[#a3b8ad] leading-relaxed">
                    Canoe-cut roasted beef bone marrow, toasted brioche & escovitch relish.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0d1e16] border border-[#284d3b]/80 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-[#f7f4ec]">Pumpkin Shrimp Bisque</h4>
                    <span className="text-xs text-[#c5a059] font-semibold">First Course</span>
                  </div>
                  <p className="text-xs text-[#a3b8ad] leading-relaxed">
                    Roasted Jamaican pumpkin, jumbo shrimp, coconut milk, and pimento essence.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0d1e16] border border-[#284d3b]/80 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-[#f7f4ec]">Devon Rum Old Fashioned</h4>
                    <span className="text-xs text-[#c5a059] font-semibold">Libation</span>
                  </div>
                  <p className="text-xs text-[#a3b8ad] leading-relaxed">
                    12-Year Appleton Estate rum stirred with house-made pimento allspice bitters.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => onOpenWizard()}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#9d7a36] text-[#0a1711] font-bold text-sm tracking-wide shadow-md hover:brightness-110 active:scale-95 transition cursor-pointer"
                >
                  Reserve a Tasting Table
                </button>
                <span className="text-xs text-[#a3b8ad]">
                  Dietary requirements & halal preparations catered with advance notice.
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* TEMPLATE SECTION 3 MIRROR: Two Ceramic Plates (Pasta & Purée) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Plate 1: Handmade Pasta */}
          <div className="card-thick-hover p-6 sm:p-8 flex flex-col items-center text-center group cursor-pointer" onClick={() => onOpenWizard()}>
            <div className="relative max-w-[280px] sm:max-w-[320px] w-full mb-6">
              <div className="rounded-full p-2 bg-gradient-to-b from-[#284d3b] to-[#142a20] shadow-xl border border-[#c5a059]/30">
                <img
                  src="/images/dish-pasta.jpg"
                  alt="Smoked Herring & Hand-Rolled Fettuccine"
                  loading="lazy"
                  className="w-full aspect-square object-cover rounded-full shadow-lg group-hover:scale-104 transition duration-500"
                />
              </div>
            </div>
            <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-1">Artisan Pasta Special</span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#f7f4ec] mb-2">
              Smoked Herring & Hand-Rolled Fettuccine
            </h3>
            <p className="text-sm text-[#ded7c8] leading-relaxed max-w-sm mb-4 font-light">
              Blistered sweet cherry tomatoes, extra virgin olive oil, garlic, and fresh basil over hand-cranked semolina ribbons.
            </p>
            <div className="mt-auto flex items-center space-x-2 text-[#c5a059] text-sm font-semibold group-hover:translate-x-1 transition">
              <span>Reserve This Course</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Plate 2: Fine Purée & Seafood */}
          <div className="card-thick-hover p-6 sm:p-8 flex flex-col items-center text-center group cursor-pointer" onClick={() => onOpenWizard()}>
            <div className="relative max-w-[280px] sm:max-w-[320px] w-full mb-6">
              <div className="rounded-full p-2 bg-gradient-to-b from-[#284d3b] to-[#142a20] shadow-xl border border-[#c5a059]/30">
                <img
                  src="/images/dish-puree.jpg"
                  alt="Pan-Seared Delicacy on Velvety Puree"
                  loading="lazy"
                  className="w-full aspect-square object-cover rounded-full shadow-lg group-hover:scale-104 transition duration-500"
                />
              </div>
            </div>
            <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-1">Chef's Ocean Course</span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#f7f4ec] mb-2">
              Pan-Seared Sea Delicacy & Puree
            </h3>
            <p className="text-sm text-[#ded7c8] leading-relaxed max-w-sm mb-4 font-light">
              Golden seared catches set atop velvety roasted sweet potato & pumpkin coulis with lemongrass emulsion.
            </p>
            <div className="mt-auto flex items-center space-x-2 text-[#c5a059] text-sm font-semibold group-hover:translate-x-1 transition">
              <span>Reserve This Course</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Full Filtered Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredServices.map((service) => (
            <article
              key={service.id}
              className="card-thick-hover overflow-hidden flex flex-col cursor-pointer group"
              onClick={() => onOpenWizard(service.category, service.title)}
            >
              {/* Card Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={service.image || '/images/hero-steak.jpg'}
                  alt={`${service.title} at The Steak House on The Verandah`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142a20] via-transparent to-black/30" />
                
                <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[#0d1e16]/90 backdrop-blur-sm border border-[#c5a059]/50 text-[#c5a059] text-xs font-bold shadow-md">
                  {service.priceGuide}
                </div>

                <div className="absolute bottom-3 left-4">
                  <span className="text-[11px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-md bg-[#142a20]/90 border border-[#284d3b] text-[#ded7c8]">
                    {service.subType}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#f7f4ec] group-hover:text-[#c5a059] transition">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#ded7c8] leading-relaxed mt-2 font-light">
                    {service.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#284d3b]/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#a3b8ad]">{service.category}</span>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-[#c5a059] group-hover:translate-x-1 transition">
                    <span>Reserve Dish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
