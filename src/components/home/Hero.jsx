import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const THUMBNAIL_DISHES = [
  { src: '/images/dish-bone-marrow.jpg', label: '"Meat Butter"', sub: 'Scotch Bonnet Bone Marrow' },
  { src: '/images/dish-lamb-rack.jpg',   label: 'Lamb Rack',    sub: 'Chimichurri Drizzle' },
];

const SunIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function Hero({ onOpenWizard, darkMode = true, onToggleDarkMode }) {
  const sectionRef    = useRef(null);
  const mediaRef      = useRef(null);
  const videoRef      = useRef(null);
  const eyebrowRef    = useRef(null);
  const titleRef      = useRef(null);
  const cursiveRef    = useRef(null);
  const thumbsRef     = useRef(null);
  const ctaRef        = useRef(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError]   = useState(false);

  useEffect(() => {
    // Attempt playback when mounted
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be deferred or blocked; poster fallback remains active
        setVideoError(false);
      });
    }
  }, []);

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

      /* — Parallax hero background on scroll — */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          if (mediaRef.current) {
            gsap.set(mediaRef.current, { y: self.progress * 90 });
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
      style={{ height: 'calc(100vh - 72px)', minHeight: 540, maxHeight: 960 }}
      aria-label="The Steak House on The Verandah – Cinematic Hero"
    >
      {/* ── Background Media Container with Parallax ── */}
      <div ref={mediaRef} className="absolute inset-0 overflow-hidden" style={{ willChange: 'transform' }}>
        
        {/* Poster Image Fallback (immediately rendered for slow networks or before video loads) */}
        <img
          src="/images/dish-tbone-skillet.jpg"
          alt="USDA Prime Chophouse at Devon House Verandah"
          fetchPriority="high"
          className={`absolute inset-0 w-full h-[120%] object-cover object-center transition-opacity duration-1000 ${
            videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Embedded HTML5 Hero Video */}
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/images/dish-tbone-skillet.jpg"
            onCanPlay={() => setVideoLoaded(true)}
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-[120%] object-cover object-center transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src="/make_a_video_out_of_this.mp4" type="video/mp4" />
          </video>
        )}

        {/* Cinematic Gradient Overlays (Calibrated for Light & Dark mode contrast) */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${
            darkMode 
              ? 'bg-gradient-to-b from-black/40 via-black/55 to-black/85' 
              : 'bg-gradient-to-b from-black/30 via-black/45 to-black/75'
          }`} 
        />
      </div>

      {/* ── Top Header Controls: Stars badge & Quick Theme Toggle ── */}
      <div
        ref={eyebrowRef}
        className="absolute top-7 left-0 right-0 px-6 flex items-center justify-between z-20 opacity-0"
      >
        <div className="hidden sm:block w-24" /> {/* Spacer */}

        {/* Central Stars badge */}
        <div className="flex flex-col items-center gap-1.5 mx-auto">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#d4af37">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span className="text-white/80 text-[9px] tracking-[0.35em] uppercase font-bold">
            The World Famous
          </span>
        </div>

        {/* Quick Dark/Light Mode Switcher on Hero */}
        {onToggleDarkMode && (
          <button
            onClick={onToggleDarkMode}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 bg-black/40 text-white/80 hover:text-white hover:border-white/40 transition cursor-pointer text-[10px] font-bold tracking-widest uppercase"
            title={`Switch to ${darkMode ? 'Light' : 'Dark'} Mode`}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
            <span className="hidden sm:inline">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        )}
      </div>

      {/* ── Central Title Block ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <div ref={titleRef} className="text-center overflow-hidden">
          {/* Main title – each word individually animated via GSAP */}
          <h1 className="font-serif text-white font-bold leading-none select-none">
            {['THE', 'STEAK HOUSE'].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <span
                  className="hero-word inline-block"
                  style={{
                    fontSize: 'clamp(2.8rem, 8.5vw, 8rem)',
                    letterSpacing: '0.04em',
                    textShadow: '0 4px 20px rgba(0,0,0,0.6)',
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
                  fontSize: 'clamp(1.1rem, 2.4vw, 2rem)',
                  letterSpacing: '0.35em',
                  fontWeight: 400,
                  textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                }}
              >
                ON THE VERANDAH
              </span>
            </div>
          </h1>

          {/* Cursive signature overlay */}
          <p
            ref={cursiveRef}
            className="font-cursive text-[#d4af37]/90 mt-3 sm:mt-4 opacity-0 drop-shadow-md"
            style={{ fontSize: 'clamp(1.3rem, 3.2vw, 2.6rem)', fontStyle: 'italic' }}
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
            className="px-8 py-3.5 rounded-full bg-white text-black text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#f5f0e8] hover:scale-102 transition-all duration-200 shadow-xl cursor-pointer"
          >
            Reserve Your Table
          </button>
          <a
            href="#menu"
            className="px-8 py-3.5 rounded-full border border-white/70 text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white/10 hover:border-white transition-all duration-200 backdrop-blur-xs cursor-pointer"
          >
            View Our Menu
          </a>
        </div>
      </div>

      {/* ── Thumbnail Dish Cards – bottom-right (Gilded Grill trademark) ── */}
      <div
        ref={thumbsRef}
        className="absolute bottom-6 right-4 sm:right-8 z-10 hidden sm:flex gap-3 opacity-0"
      >
        {THUMBNAIL_DISHES.map((dish, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl backdrop-blur-md cursor-pointer hover:scale-105 transition-transform duration-200"
            style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.18)' }}
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
              <p className="text-[9px] text-white/70 mt-0.5 leading-tight max-w-[105px]">
                {dish.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Animated Scroll Down Line ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div
          className="w-px h-11 relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.2)' }}
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
