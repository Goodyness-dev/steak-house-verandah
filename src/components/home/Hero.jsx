import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const THUMBNAIL_DISHES = [
  { src: '/images/dish-bone-marrow.jpg', label: '"Meat Butter"', sub: 'Scotch Bonnet Bone Marrow' },
  { src: '/images/dish-lamb-rack.jpg',   label: 'Lamb Rack',    sub: 'Chimichurri Drizzle' },
];

export default function Hero({ onOpenWizard, darkMode }) {
  const sectionRef    = useRef(null);
  const imageRef      = useRef(null);
  const eyebrowRef    = useRef(null);
  const titleRef      = useRef(null);
  const cursiveRef    = useRef(null);
  const thumbsRef     = useRef(null);
  const ctaRef        = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      /* — Hero text reveal: clip-path slide up — */
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo(
        titleRef.current.querySelectorAll('.hero-word'),
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.08 },
        '-=0.3'
      )
      .fromTo(
        cursiveRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        thumbsRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.15 },
        '-=0.3'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );

      /* — Parallax hero image on scroll — */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          if (imageRef.current) {
            gsap.set(imageRef.current, { y: self.progress * 80 });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: 'calc(100vh - 72px)', minHeight: 520, maxHeight: 920 }}
      aria-label="The Steak House on The Verandah – Cinematic Hero"
    >
      {/* ── Full-bleed background photo with parallax ── */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src="/images/dish-tbone-skillet.jpg"
          alt="USDA T-Bone sizzling on cast iron at Devon House Verandah"
          fetchPriority="high"
          className="w-full h-[115%] object-cover object-center -translate-y-0"
          style={{ willChange: 'transform' }}
        />
        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/75" />
      </div>

      {/* ── Stars badge (top-center, Gilded Grill style) ── */}
      <div
        ref={eyebrowRef}
        className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 opacity-0"
      >
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#d4af37">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
        </div>
        <span className="text-white/70 text-[9px] tracking-[0.35em] uppercase font-bold">
          The World Famous
        </span>
      </div>

      {/* ── Central title block ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <div ref={titleRef} className="text-center overflow-hidden">
          {/* Main title – each word individually animated */}
          <h1 className="font-serif text-white font-bold leading-none select-none">
            {['THE', 'STEAK HOUSE'].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <span
                  className="hero-word inline-block"
                  style={{
                    fontSize: 'clamp(3rem, 9vw, 8.5rem)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {word}
                </span>
              </div>
            ))}
            <div className="overflow-hidden mt-1">
              <span
                className="hero-word inline-block text-[#d4af37]"
                style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 2rem)',
                  letterSpacing: '0.35em',
                  fontWeight: 400,
                }}
              >
                ON THE VERANDAH
              </span>
            </div>
          </h1>

          {/* Cursive signature overlay (Gilded Grill DNA) */}
          <p
            ref={cursiveRef}
            className="font-cursive text-[#d4af37]/80 mt-4 opacity-0"
            style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)', fontStyle: 'italic' }}
          >
            Devon House Estate · Kingston, Jamaica
          </p>
        </div>

        {/* CTA buttons */}
        <div
          ref={ctaRef}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 opacity-0"
        >
          <button
            onClick={() => onOpenWizard()}
            className="px-8 py-3.5 rounded-full bg-white text-black text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#f5f0e8] transition-all duration-200 shadow-lg cursor-pointer"
          >
            Reserve Your Table
          </button>
          <a
            href="#menu"
            className="px-8 py-3.5 rounded-full border border-white/70 text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-200 cursor-pointer"
          >
            View Our Menu
          </a>
        </div>
      </div>

      {/* ── Thumbnail dish cards – bottom-right (Gilded Grill signature) ── */}
      <div
        ref={thumbsRef}
        className="absolute bottom-6 right-4 sm:right-8 z-10 flex gap-3 opacity-0"
      >
        {THUMBNAIL_DISHES.map((dish, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl backdrop-blur-md cursor-pointer hover:scale-105 transition-transform duration-200"
            style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)' }}
            onClick={() => onOpenWizard()}
          >
            <img
              src={dish.src}
              alt={dish.label}
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
            />
            <div>
              <p className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider leading-none">
                {dish.label}
              </p>
              <p className="text-[9px] text-white/60 mt-0.5 leading-tight max-w-[100px]">
                {dish.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div
          className="w-px h-12 relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        >
          <div
            className="absolute top-0 left-0 w-full bg-[#d4af37]"
            style={{
              height: '40%',
              animation: 'scrollIndicator 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollIndicator {
          0%   { transform: translateY(-100%); opacity: 0; }
          30%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translateY(300%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
