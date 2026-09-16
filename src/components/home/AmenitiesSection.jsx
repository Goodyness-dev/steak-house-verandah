import React from 'react';
import { 
  Wine, 
  Flame, 
  Sparkles, 
  Sun,
  CheckCircle,
  Car,
  Music,
  Users
} from '../common/Icons';

const LUXURY_AMENITIES = [
  {
    num: 1,
    title: "Historic Verandah Terrace",
    description: "Al-fresco dining immersed in tropical breezes overlooking manicured Devon House heritage gardens.",
    icon: Sun,
  },
  {
    num: 2,
    title: "In-House Himalayan Dry-Aging",
    description: "Custom salt-brick chamber carefully aging reserve cuts 28 to 35 days for peerless tenderness.",
    icon: Flame,
  },
  {
    num: 3,
    title: "Sommelier Cellar & Rum Bar",
    description: "Rare vintage estate rums, craft pimento wood cocktails, and hand-selected global wine pairings.",
    icon: Wine,
  },
  {
    num: 4,
    title: "Private Gazebo & VIP Seclusion",
    description: "Intimate secluded tables for romantic date nights, milestone anniversaries, and executive dinners.",
    icon: Sparkles,
  },
];

export default function AmenitiesSection({ onOpenWizard }) {
  return (
    <section id="amenities" className="py-20 sm:py-28 bg-[#0a1711] text-[#f7f4ec] transition-colors" aria-labelledby="amenities-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Estate Dining Visual */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-thick overflow-hidden p-2 border border-[#284d3b]">
              <img
                src="/images/verandah-garden.jpg"
                alt="Tropical garden ambiance at The Steak House on The Verandah at Devon House"
                loading="lazy"
                decoding="async"
                width="640"
                height="420"
                className="w-full h-72 sm:h-96 object-cover rounded-2xl"
              />
            </div>
            <div className="p-4 rounded-2xl bg-[#142a20] border border-[#284d3b] flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-[#0d1e16] border border-[#c5a059] flex items-center justify-center shrink-0">
                <Car className="w-6 h-6 text-[#c5a059]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#f7f4ec]">Devon House Valet & Secure Parking</h4>
                <p className="text-xs text-[#a3b8ad] mt-0.5">Complimentary estate parking & attendant service at 26 Hope Road.</p>
              </div>
            </div>
          </div>

          {/* Right: Amenities Features Grid */}
          <div className="lg:col-span-7">
            <span className="font-cursive-accent text-2xl sm:text-3xl text-[#c5a059] italic block mb-1">
              Curated Comfort & Ambiance
            </span>
            <h2 id="amenities-heading" className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7f4ec] tracking-tight mb-4">
              The Verandah Dining Experience
            </h2>
            <p className="text-[#ded7c8] text-base sm:text-lg mb-8 font-light">
              From our Himalayan salt dry-aging room to the open-air colonial terrace, every nuance is designed for refined indulgence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {LUXURY_AMENITIES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={feature.num} 
                    className="card-thick-hover p-6 border border-[#284d3b] flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#0d1e16] border border-[#284d3b] group-hover:border-[#c5a059] flex items-center justify-center mb-4 transition">
                        <Icon className="w-6 h-6 text-[#c5a059]" />
                      </div>
                      <h3 className="font-serif-luxury text-lg font-bold text-[#f7f4ec] group-hover:text-[#c5a059] transition">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#ded7c8] mt-2 leading-relaxed font-light">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenWizard()}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#c5a059] to-[#9d7a36] text-[#0a1711] font-bold text-sm sm:text-base tracking-wide shadow-md hover:brightness-110 active:scale-95 transition cursor-pointer"
              >
                Reserve a Table
              </button>
              <div className="flex items-center space-x-2 text-xs text-[#a3b8ad]">
                <Music className="w-4 h-4 text-[#c5a059]" />
                <span>Live acoustic sets on Friday & Saturday evenings</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
