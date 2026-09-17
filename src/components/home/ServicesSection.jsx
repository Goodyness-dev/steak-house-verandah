import React, { useState } from 'react';
import { SERVICES, SERVICE_CATEGORIES, MENU_DISCLAIMER } from '../../data/servicesData';
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#142a20] border border-[#c5a059]/40 text-xs uppercase tracking-widest text-[#c5a059] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Devon House Al-Fresco Estate Chophouse</span>
          </div>
          <h2 id="menu-heading" className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#f7f4ec]">
            Authentic Verandah Repertoire
          </h2>
          <p className="text-[#ded7c8] mt-4 text-base sm:text-lg leading-relaxed font-light">
            Savor prime steaks prepared Classic, Chimichurri, or Jamaican Country Style (scotch bonnet & pimento), paired with the famous "Meat Butter" bone marrow, local stuffed crab backs, and island fuzion pastas.
          </p>
          <p className="text-xs text-[#c5a059] font-medium mt-2">
            {MENU_DISCLAIMER}
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
                    ? 'bg-gradient-to-r from-[#c5a059] to-[#9d7a36] text-[#0a1711] shadow-md scale-105 font-bold'
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
        <div className="card-thick p-6 sm:p-10 lg:p-12 mb-16 border border-[#284d3b] relative overflow-hidden bg-[#142a20]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Real Broiled Bone Marrow Dish (Meat Butter) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-sm w-full">
                <div className="rounded-full p-2.5 bg-gradient-to-br from-[#284d3b] to-[#142a20] shadow-2xl border-2 border-[#c5a059]/60">
                  <img
                    src="/images/dish-bone-marrow.jpg"
                    alt="Scotch Bonnet Bone Marrow Meat Butter"
                    loading="lazy"
                    className="w-full aspect-square object-cover rounded-full shadow-2xl transition duration-500 group-hover:scale-102"
                  />
                </div>
                <div className="absolute -bottom-2 -left-2 px-3.5 py-1.5 rounded-xl bg-[#0d1e16]/95 border border-[#c5a059] shadow-lg">
                  <span className="text-xs font-bold text-[#c5a059]">"Meat Butter" & Tostones · $3,000 JMD</span>
                </div>
              </div>
            </div>

            {/* Right: Elegant Menu Dossier matching template layout */}
            <div className="lg:col-span-7 space-y-6">
              <div className="border-b border-[#284d3b] pb-4">
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold">Chef's Signature Highlights</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#f7f4ec] font-bold mt-1">
                  Verandah Estate Tasting Selections
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-4 rounded-2xl bg-[#0d1e16] border border-[#284d3b]/80 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-[#f7f4ec]">16oz USDA Ribeye</h4>
                    <span className="text-xs text-[#c5a059] font-bold">$17,000 JMD</span>
                  </div>
                  <p className="text-xs text-[#a3b8ad] leading-relaxed">
                    Sizzling cast iron skillet; Classic, Chimichurri, or Jamaican Country Style with scotch bonnet herbs.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0d1e16] border border-[#284d3b]/80 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-[#f7f4ec]">Scotch Bonnet Bone Marrow</h4>
                    <span className="text-xs text-[#c5a059] font-bold">$3,000 JMD</span>
                  </div>
                  <p className="text-xs text-[#a3b8ad] leading-relaxed">
                    Known as "Meat Butter": canoe-cut broiled beef bone marrow with breadfruit tostones.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0d1e16] border border-[#284d3b]/80 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-[#f7f4ec]">Stuffed Local Crab Backs</h4>
                    <span className="text-xs text-[#c5a059] font-bold">$4,700 JMD</span>
                  </div>
                  <p className="text-xs text-[#a3b8ad] leading-relaxed">
                    Historic Norma Shirley heritage recipe with Solomon Gundy aioli & coco chips.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0d1e16] border border-[#284d3b]/80 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-[#f7f4ec]">Steakhouse Brew Cocktail</h4>
                    <span className="text-xs text-[#c5a059] font-bold">$1,500 JMD</span>
                  </div>
                  <p className="text-xs text-[#a3b8ad] leading-relaxed">
                    Jamaican red rum, smoky mezcal, passion fruit nectar, fresh orange & lime.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => onOpenWizard()}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#9d7a36] text-[#0a1711] font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition cursor-pointer"
                >
                  Reserve Table & Tasting
                </button>
                <button
                  onClick={onViewAllServices}
                  className="text-xs text-[#c5a059] hover:underline font-bold flex items-center gap-1"
                >
                  <span>View All Dinner, Lunch & Bar Menus</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* TEMPLATE SECTION 3 MIRROR: Two Ceramic Plates (Pasta & Lobster Thermidor) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Plate 1: Handmade Fuzion Pasta */}
          <div className="card-thick-hover p-6 sm:p-8 flex flex-col items-center text-center group cursor-pointer bg-[#142a20]" onClick={() => onOpenWizard()}>
            <div className="relative max-w-[280px] sm:max-w-[320px] w-full mb-6">
              <div className="rounded-full p-2 bg-gradient-to-b from-[#284d3b] to-[#142a20] shadow-xl border-2 border-[#c5a059]/40">
                <img
                  src="/images/dish-pasta.jpg"
                  alt="Jamaican Fuzion Pasta with Coconut Scotch Bonnet Cream"
                  loading="lazy"
                  className="w-full aspect-square object-cover rounded-full shadow-lg group-hover:scale-104 transition duration-500"
                />
              </div>
            </div>
            <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-1">Jamaican Fuzion Pasta · From $3,500 JMD</span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f7f4ec] mb-2">
              Coconut Scotch Bonnet & Solomon Gundy Creams
            </h3>
            <p className="text-sm text-[#ded7c8] leading-relaxed max-w-sm mb-4 font-light">
              Tossed in sweet and spicy coconut scotch bonnet cream, callaloo cream, or smoked herring Solomon Gundy with choice of salmon, shrimp, jerked sausage or tenderloin steak.
            </p>
            <div className="mt-auto flex items-center space-x-2 text-[#c5a059] text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition">
              <span>Reserve This Course</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Plate 2: Lobster in Callaloo Thermidor */}
          <div className="card-thick-hover p-6 sm:p-8 flex flex-col items-center text-center group cursor-pointer bg-[#142a20]" onClick={() => onOpenWizard()}>
            <div className="relative max-w-[280px] sm:max-w-[320px] w-full mb-6">
              <div className="rounded-full p-2 bg-gradient-to-b from-[#284d3b] to-[#142a20] shadow-xl border-2 border-[#c5a059]/40">
                <img
                  src="/images/dish-crab-lobster.jpg"
                  alt="Lobster in Callaloo Thermidor & Stuffed Crab"
                  loading="lazy"
                  className="w-full aspect-square object-cover rounded-full shadow-lg group-hover:scale-104 transition duration-500"
                />
              </div>
            </div>
            <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-1">Ocean Speciality · $8,600 JMD</span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f7f4ec] mb-2">
              Lobster in Callaloo Thermidor & Stuffed Crab
            </h3>
            <p className="text-sm text-[#ded7c8] leading-relaxed max-w-sm mb-4 font-light">
              Fresh caught Caribbean rock lobster cooked in rich callaloo béchamel with golden croissant gratin, served in roasted shell with seasoned mashed potatoes.
            </p>
            <div className="mt-auto flex items-center space-x-2 text-[#c5a059] text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition">
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
              className="card-thick-hover bg-[#142a20] border-2 border-[#284d3b] rounded-3xl overflow-hidden flex flex-col cursor-pointer group"
              onClick={() => onOpenWizard(service.category, service.title)}
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0d1e16]/90 border border-[#c5a059]/40 text-xs font-bold text-[#c5a059]">
                  {service.price}
                </div>
                {service.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#c5a059] text-[#0d1e16] text-[10px] font-bold uppercase tracking-wider">
                    Signature
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#c5a059] font-bold block mb-1">
                    {service.subType || service.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#c5a059] transition">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#ded7c8]/80 leading-relaxed mt-2.5">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#284d3b] flex items-center justify-between text-xs">
                  <span className="text-[#ded7c8]/60">Estate Fine Dining</span>
                  <span className="text-[#c5a059] font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                    Reserve Table →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-14 text-center">
          <button
            onClick={onViewAllServices}
            className="px-8 py-3.5 rounded-2xl bg-[#142a20] hover:bg-[#183327] border-2 border-[#c5a059]/50 hover:border-[#c5a059] text-[#c5a059] hover:text-white text-xs font-bold uppercase tracking-widest shadow-lg transition active:scale-95 cursor-pointer"
          >
            Explore Complete Verandah Repertoire (Dinner, Lunch & Cocktails)
          </button>
        </div>

      </div>
    </section>
  );
}
