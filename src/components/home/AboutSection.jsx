import React from 'react';
import { Quote, Sparkles, ArrowRight } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AboutSection({ onOpenWizard }) {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#0d1e16] text-[#f7f4ec] transition-colors" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Devon House Estate & Verandah Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="card-thick overflow-hidden p-2 border border-[#284d3b]">
              <img
                src="/images/verandah-terrace.jpg"
                alt="Historic Devon House Verandah Dining Terrace in Kingston, Jamaica"
                loading="lazy"
                decoding="async"
                width="640"
                height="460"
                className="w-full h-80 sm:h-96 lg:h-[460px] object-cover rounded-2xl"
              />
            </div>

            {/* Floating Heritage Stat Badge */}
            <div className="absolute -bottom-6 right-4 sm:right-8 bg-[#142a20]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#c5a059]/60 px-6 py-4">
              <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#c5a059]">1881</div>
              <div className="text-xs sm:text-sm text-[#ded7c8] font-medium">Historic Devon House Estate</div>
            </div>
          </div>

          {/* Right: Heritage Story & Culinary Vision */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-cursive-accent text-2xl sm:text-3xl text-[#c5a059] italic block">
              The Heritage of the Verandah
            </span>

            <h2 id="about-heading" className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7f4ec] tracking-tight leading-tight">
              A Chophouse Born Within Jamaican History
            </h2>

            {/* Chef Quote */}
            <div className="border-l-4 border-[#c5a059] pl-5 sm:pl-6 py-2 bg-[#142a20]/60 rounded-r-2xl">
              <Quote className="w-5 h-5 text-[#c5a059] mb-2" aria-hidden="true" />
              <p className="text-[#ded7c8] text-sm sm:text-base italic leading-relaxed font-light">
                "{BUSINESS_INFO.owner.quote}"
              </p>
              <div className="mt-3 text-xs sm:text-sm font-bold text-[#c5a059]">
                — {BUSINESS_INFO.owner.name}
              </div>
            </div>

            <p className="text-[#ded7c8] text-sm sm:text-base leading-relaxed font-light">
              Devon House was constructed in 1881 by George Stiebel, Jamaica's first millionaire of African descent. Today, The Steak House on The Verandah pays tribute to this enduring architectural wonder by offering a fine dining chophouse that unites classic USDA Prime dry-aging with the bold flavors of the West Indies.
            </p>

            {/* Key Milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-3.5 rounded-xl bg-[#142a20] border border-[#284d3b] space-y-1">
                <span className="text-xs font-bold text-[#c5a059]">Himalayan Salt Dry-Aging</span>
                <p className="text-xs text-[#a3b8ad]">In-house controlled curing for deep, concentrated umami perfection.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#142a20] border border-[#284d3b] space-y-1">
                <span className="text-xs font-bold text-[#c5a059]">Historic Open Verandah</span>
                <p className="text-xs text-[#a3b8ad]">Tropical garden breezes, ambient lighting, and acoustic melodies.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-3">
              <button
                onClick={() => onOpenWizard()}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#c5a059] to-[#9d7a36] text-[#0a1711] font-bold text-sm sm:text-base tracking-wide shadow-md hover:brightness-110 active:scale-95 transition flex items-center space-x-2.5 cursor-pointer"
                aria-label="Reserve your verandah table"
              >
                <span>Reserve Your Verandah Experience</span>
                <ArrowRight className="w-4 h-4 text-[#0a1711]" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
