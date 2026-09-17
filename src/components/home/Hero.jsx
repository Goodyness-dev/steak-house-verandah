import React from 'react';
import { ArrowRight, Phone, Utensils, Sparkles, Star, Calendar, Users, MapPin } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';
import { imageManifest } from '../../data/imageManifest';

export default function Hero({ onOpenWizard }) {
  return (
    <section className="relative overflow-hidden bg-[#0d1e16] text-[#f7f4ec] pt-8 pb-16 sm:pb-24 lg:pb-32" aria-label="Culinary Excellence & Table Reservations">
      {/* Subtle organic ambient gradient & culinary spice texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#1e4030] blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full bg-[#183928] blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-[#c5a059]/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Split Grid mirroring template layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4 sm:pt-8 lg:pt-12">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 z-10">
            {/* Heritage Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-[#142a20] border border-[#284d3b] text-xs sm:text-sm font-semibold text-[#c5a059] shadow-sm">
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              <span className="tracking-wide">Devon House Estate · Kingston, Jamaica · Est. 1881</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <span className="font-cursive-accent text-2xl sm:text-3xl text-[#c5a059] italic block">
                Exceptional Chophouse & Terroir Dining
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f7f4ec] leading-[1.08]">
                The Steak House <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7f4ec] via-[#e2c585] to-[#c5a059]">
                  on The Verandah
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-xl text-[#ded7c8] max-w-2xl leading-relaxed font-light">
              Experience Jamaica’s premier chophouse nestled on the sweeping open-air verandah of historic Devon House. Hand-selected Himalayan salt dry-aged steaks, pimento charcoal grilling, and visionary Caribbean fusion.
            </p>

            {/* Culinary Director endorsement pill */}
            <div className="flex items-center space-x-4 p-3.5 rounded-2xl bg-[#142a20]/80 border border-[#284d3b] max-w-lg">
              <img 
                src="/images/chef-plating.jpg" 
                alt="Chef Brian - Executive Chef" 
                className="w-12 h-12 rounded-xl object-cover border border-[#c5a059]" 
              />
              <div>
                <p className="text-xs uppercase tracking-widest text-[#c5a059] font-semibold">Executive Curation</p>
                <p className="text-sm font-medium text-[#f7f4ec]">"Every cut is seasoned with Jamaican pimento smoke and mountain herbs."</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onOpenWizard()}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#c5a059] via-[#d4af37] to-[#9d7a36] text-[#0a1711] font-bold text-base tracking-wide flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl hover:brightness-110 active:scale-95 transition cursor-pointer"
                aria-label="Reserve a Verandah Table"
              >
                <span>Reserve a Verandah Table</span>
                <ArrowRight className="w-5 h-5 text-[#0a1711]" />
              </button>

              <a
                href="#menu"
                className="px-7 py-4 rounded-2xl bg-[#142a20] hover:bg-[#1a372a] text-[#f7f4ec] font-semibold text-base border border-[#284d3b] hover:border-[#c5a059] transition flex items-center justify-center space-x-2.5 active:scale-95 cursor-pointer"
              >
                <span>Explore Tasting Menu</span>
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-3 text-xs sm:text-sm text-[#ded7c8] pt-1">
              <div className="flex text-[#c5a059]" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#c5a059] fill-[#c5a059]" />
                ))}
              </div>
              <span className="font-medium">4.9 Star Landmark Rating · Kingston's Premier Dining Experience</span>
            </div>
          </div>

          {/* Right Column: Culinary Centerpiece Plate matching template top dish */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Ambient culinary halo */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#1b3d2b] blur-2xl opacity-60" />

            {/* Master Centerpiece Plate Container */}
            <div className="relative group max-w-md sm:max-w-lg w-full">
              <div className="relative rounded-full p-3 sm:p-4 bg-gradient-to-b from-[#284d3b] to-[#142a20] shadow-2xl border border-[#c5a059]/40">
                <img
                  src={imageManifest.hero.poster}
                  alt="Artisanal Steak & Caribbean Fusion Dish on Ceramic Plate"
                  fetchPriority="high"
                  className="w-full h-auto aspect-square object-cover rounded-full shadow-2xl transform transition duration-700 group-hover:rotate-3 group-hover:scale-102"
                />
              </div>

              {/* Floating Culinary Highlight Tag 1 */}
              <div className="absolute -top-3 sm:top-2 -left-2 sm:-left-6 px-4 py-2.5 rounded-2xl bg-[#142a20]/95 backdrop-blur-md border border-[#c5a059]/60 shadow-xl flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059] animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-[#f7f4ec]">16oz USDA Sizzling Ribeye</span>
              </div>

              {/* Floating Highlight Tag 2 */}
              <div className="absolute -bottom-4 sm:bottom-4 -right-2 sm:-right-6 px-4 py-2.5 rounded-2xl bg-[#142a20]/95 backdrop-blur-md border border-[#284d3b] shadow-xl flex items-center space-x-2.5">
                <Utensils className="w-4 h-4 text-[#c5a059]" />
                <span className="text-xs sm:text-sm font-semibold text-[#f7f4ec]">Broiled "Meat Butter" Marrow</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Table Concierge Floating Bar */}
        <div className="mt-14 sm:mt-20 relative z-20">
          <div className="card-thick p-5 sm:p-7 border border-[#284d3b]">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto flex-1">
                {/* Location item */}
                <div className="flex items-center space-x-3.5 px-4 py-3 bg-[#0d1e16] rounded-2xl border border-[#284d3b] w-full sm:w-1/2">
                  <MapPin className="w-5 h-5 text-[#c5a059] shrink-0" />
                  <div className="text-left">
                    <p className="text-[11px] uppercase tracking-wider text-[#a3b8ad] font-medium">Estate Location</p>
                    <p className="text-sm font-semibold text-[#f7f4ec] truncate">Devon House, Kingston 10</p>
                  </div>
                </div>

                {/* Seating preference item */}
                <div className="flex items-center space-x-3.5 px-4 py-3 bg-[#0d1e16] rounded-2xl border border-[#284d3b] w-full sm:w-1/2">
                  <Users className="w-5 h-5 text-[#c5a059] shrink-0" />
                  <div className="text-left">
                    <p className="text-[11px] uppercase tracking-wider text-[#a3b8ad] font-medium">Seating Setting</p>
                    <p className="text-sm font-semibold text-[#f7f4ec] truncate">Historic Verandah & Garden</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenWizard()}
                className="w-full lg:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#c5a059] to-[#9d7a36] text-[#0a1711] font-bold text-sm sm:text-base tracking-wide shadow-md hover:brightness-110 active:scale-95 transition shrink-0 cursor-pointer"
                aria-label="Check Table Availability"
              >
                Check Table Availability
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
