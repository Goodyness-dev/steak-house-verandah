import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection({ onOpenWizard, darkMode }) {
  const sectionRef = useRef(null);
  const textRef    = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current?.querySelectorAll('.cta-word'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: 480 }}
      aria-label="Reserve a Table at The Steak House"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src="/images/dish-filet-mignon.jpg"
          alt="Fine dining at Devon House verandah"
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Content (Gilded Grill layout: centered, all-caps) */}
      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center h-full min-h-[480px] text-center px-6 py-20"
      >
        {['Indulge in an', 'Unforgettable', 'Culinary Experience'].map((line, i) => (
          <div key={i} className="overflow-hidden">
            <span
              className="cta-word inline-block text-white font-serif font-bold uppercase leading-tight"
              style={{
                fontSize: 'clamp(1.8rem, 5.5vw, 5rem)',
                letterSpacing: '0.05em',
                display: 'block',
                opacity: 0,
              }}
            >
              {line}
            </span>
          </div>
        ))}

        <p className="cta-word text-white/70 mt-4 text-sm sm:text-base tracking-[0.1em] font-medium" style={{ opacity: 0 }}>
          Reserve Your Table Today!
        </p>

        <button
          onClick={() => onOpenWizard()}
          className="cta-word mt-8 px-10 py-3.5 rounded-full border-2 border-white text-white text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
          style={{ opacity: 0 }}
        >
          Reserve Now
        </button>
      </div>
    </section>
  );
}
