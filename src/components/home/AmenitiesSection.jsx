import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { no: '01', title: 'Historic Verandah Terrace', body: 'Al-fresco dining immersed in tropical breezes overlooking manicured Devon House heritage gardens.' },
  { no: '02', title: 'Himalayan Salt Dry-Aging', body: 'Custom salt-brick chamber aging reserve cuts 28–35 days for peerless tenderness and depth.' },
  { no: '03', title: 'Sommelier Rum Bar',         body: 'Rare vintage estate rums, pimento wood cocktails, and hand-selected global wine pairings.' },
  { no: '04', title: 'Private Gazebo & VIP',      body: 'Intimate secluded tables for romantic evenings, milestone anniversaries, and executive dinners.' },
];

export default function AmenitiesSection({ onOpenWizard, darkMode }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.feat-item'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.1,
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

  const bg  = darkMode ? 'bg-[#111]'      : 'bg-white';
  const txt = darkMode ? 'text-[#f7f4ec]' : 'text-black';
  const sub = darkMode ? 'text-white/50'  : 'text-black/50';
  const acc = darkMode ? 'text-[#c5a059]' : 'text-[#b8955a]';
  const bdr = darkMode ? 'border-white/8' : 'border-black/8';

  return (
    <section
      id="amenities"
      ref={sectionRef}
      className={`py-24 sm:py-32 transition-colors duration-300 ${bg}`}
      aria-labelledby="amenities-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Image */}
          <div className="feat-item relative overflow-hidden rounded-2xl" style={{ opacity: 0 }}>
            <img
              src="/images/verandah-garden.jpg"
              alt="Tropical garden ambiance at The Steak House Verandah"
              loading="lazy"
              className="w-full h-[420px] sm:h-[520px] object-cover object-center"
            />
            <div className={`absolute bottom-6 left-6 right-6 px-5 py-4 rounded-xl backdrop-blur-md ${
              darkMode ? 'bg-black/70 border border-white/10' : 'bg-white/85 border border-black/8'
            }`}>
              <p className={`text-[9px] tracking-[0.25em] uppercase font-bold mb-1 ${acc}`}>Live Performance</p>
              <p className={`text-xs font-medium ${txt}`}>Live acoustic sets every Friday & Saturday evening</p>
            </div>
          </div>

          {/* Right: Feature list */}
          <div>
            <div className="feat-item mb-10" style={{ opacity: 0 }}>
              <p className={`micro-label mb-2 ${acc}`}>The Experience</p>
              <h2
                id="amenities-heading"
                className={`font-serif font-bold leading-tight ${txt}`}
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                The Verandah<br />Dining Experience
              </h2>
            </div>

            <div className={`border-t ${bdr}`}>
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className={`feat-item py-5 border-b flex gap-5 ${bdr}`}
                  style={{ opacity: 0 }}
                >
                  <span className={`font-serif text-3xl font-bold leading-none opacity-25 flex-shrink-0 w-9 ${acc}`}>
                    {f.no}
                  </span>
                  <div>
                    <h3 className={`font-semibold text-sm tracking-wide mb-1 ${txt}`}>{f.title}</h3>
                    <p className={`text-xs leading-relaxed ${sub}`}>{f.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="feat-item mt-8" style={{ opacity: 0 }}>
              <button
                onClick={() => onOpenWizard()}
                className="btn-pill-gold"
              >
                Reserve a Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
