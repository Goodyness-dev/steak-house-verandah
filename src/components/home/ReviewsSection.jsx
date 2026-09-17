import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

gsap.registerPlugin(ScrollTrigger);

export default function ReviewsSection({ onOpenWizard, darkMode }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.review-card'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const bg     = darkMode ? 'bg-[#0c0c0c]' : 'bg-[#ece5d6]';
  const txt    = darkMode ? 'text-[#f7f4ec]' : 'text-black';
  const sub    = darkMode ? 'text-white/50' : 'text-black/50';
  const acc    = darkMode ? 'text-[#c5a059]' : 'text-[#b8955a]';
  const cardBg = darkMode ? 'bg-white/3 border-white/6' : 'bg-white/70 border-black/8';
  const bdr    = darkMode ? 'border-white/8' : 'border-black/8';

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className={`py-24 sm:py-32 transition-colors duration-300 ${bg}`}
      aria-labelledby="reviews-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-14 sm:mb-20">
          <p className={`micro-label mb-3 ${acc}`}>Guest Accolades</p>
          <h2
            id="reviews-heading"
            className={`font-serif font-bold ${txt}`}
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            An Unforgettable Evening
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
              ))}
            </div>
            <span className={`text-sm font-semibold ${sub}`}>
              4.9 · Kingston's Benchmark Chophouse
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BUSINESS_INFO.reviews.map((rev, idx) => (
            <article
              key={idx}
              className={`review-card rounded-2xl p-7 sm:p-9 border flex flex-col justify-between ${cardBg}`}
              style={{ opacity: 0 }}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                    ))}
                  </div>
                  <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${acc}`}>
                    {rev.source}
                  </span>
                </div>
                <p className={`text-sm sm:text-base leading-relaxed italic font-light ${sub}`}>
                  "{rev.comment}"
                </p>
              </div>
              <div className={`mt-6 pt-5 border-t ${bdr} flex items-center justify-between`}>
                <div>
                  <p className={`font-semibold text-sm ${txt}`}>{rev.author}</p>
                  <p className={`text-xs mt-0.5 ${sub}`}>{rev.location}</p>
                </div>
                <span className={`text-[10px] ${sub}`}>{rev.date}</span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onOpenWizard()}
            className="btn-pill-gold"
          >
            Reserve Your Table Today
          </button>
        </div>

      </div>
    </section>
  );
}
