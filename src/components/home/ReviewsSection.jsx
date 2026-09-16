import React from 'react';
import { Star, Quote, ArrowRight } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

export default function ReviewsSection({ onOpenWizard }) {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#0a1711] text-[#f7f4ec] transition-colors" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="font-cursive-accent text-2xl sm:text-3xl text-[#c5a059] italic block mb-1">
            Guest Accolades & Endorsements
          </span>
          <h2 id="reviews-heading" className="font-serif-luxury text-3xl sm:text-5xl font-bold tracking-tight text-[#f7f4ec]">
            An Unforgettable Evening
          </h2>
          <div className="flex items-center justify-center space-x-2.5 mt-3 sm:mt-4">
            <div className="flex text-[#c5a059]" aria-label="5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#c5a059]" />
              ))}
            </div>
            <span className="text-[#ded7c8] text-sm sm:text-base font-semibold">
              4.9 Star Rating · Kingston's Benchmark Fine Dining Chophouse
            </span>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {BUSINESS_INFO.reviews.map((rev, idx) => (
            <article
              key={idx}
              className="card-thick-hover p-6 sm:p-8 flex flex-col justify-between border border-[#284d3b]"
            >
              <div>
                {/* Stars + Source */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex text-[#c5a059]" aria-label={`${rev.rating} stars`}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#c5a059]" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#c5a059] bg-[#0d1e16] border border-[#284d3b] px-3 py-1 rounded-full">
                    {rev.source}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-[#ded7c8] text-sm sm:text-base leading-relaxed mb-6 italic font-light">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-[#284d3b]/80 flex justify-between items-center">
                <div>
                  <h3 className="font-serif-luxury font-bold text-[#f7f4ec] text-base">{rev.author}</h3>
                  <span className="text-xs text-[#a3b8ad]">{rev.location}</span>
                </div>
                <span className="text-xs text-[#a3b8ad]">{rev.date}</span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 sm:mt-16 text-center">
          <button
            onClick={() => onOpenWizard()}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#c5a059] to-[#9d7a36] text-[#0a1711] font-bold text-base tracking-wide shadow-lg hover:brightness-110 active:scale-95 transition cursor-pointer"
            aria-label="Reserve your table today"
          >
            Reserve Your Verandah Table Today
          </button>
        </div>

      </div>
    </section>
  );
}
