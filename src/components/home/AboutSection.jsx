import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS_INFO } from '../../data/businessData';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    no: '01',
    title: 'Himalayan Salt Dry-Aging',
    body: 'In-house controlled curing chambers where USDA Prime cuts develop a deep, concentrated umami over 21–45 days.',
  },
  {
    no: '02',
    title: 'Pimento Charcoal Grilling',
    body: 'Authentic Jamaican pimento wood coals impart a smoky, aromatic char unique to the Caribbean tradition.',
  },
  {
    no: '03',
    title: 'Historic Open Verandah',
    body: 'Al-fresco dining on the sweeping verandah of George Stiebel\'s 1881 colonial estate — a Kingston landmark.',
  },
];

export default function AboutSection({ onOpenWizard, darkMode }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.about-fade'),
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
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

  const bg  = darkMode ? 'bg-[#111]'         : 'bg-white';
  const txt = darkMode ? 'text-[#f7f4ec]'    : 'text-black';
  const sub = darkMode ? 'text-white/50'     : 'text-black/50';
  const acc = darkMode ? 'text-[#c5a059]'    : 'text-[#b8955a]';
  const bdr = darkMode ? 'border-white/8'    : 'border-black/8';

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-24 sm:py-32 transition-colors duration-300 ${bg}`}
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Image */}
          <div className="about-fade relative overflow-hidden rounded-2xl" style={{ opacity: 0 }}>
            <img
              src="/images/verandah-terrace.jpg"
              alt="Historic Devon House Verandah"
              loading="lazy"
              className="w-full h-[480px] object-cover object-center"
            />
            {/* Heritage badge */}
            <div className={`absolute bottom-6 left-6 px-5 py-3 rounded-xl backdrop-blur-md ${
              darkMode ? 'bg-black/70 border border-white/10' : 'bg-white/85 border border-black/10'
            }`}>
              <p className={`font-serif text-3xl font-bold ${acc}`}>1881</p>
              <p className={`text-[10px] tracking-[0.2em] uppercase font-semibold mt-0.5 ${sub}`}>
                Devon House Established
              </p>
            </div>
          </div>

          {/* Right: Story */}
          <div className="space-y-8">
            <div className="about-fade" style={{ opacity: 0 }}>
              <p className={`micro-label mb-2 ${acc}`}>Our Heritage</p>
              <h2
                id="about-heading"
                className={`font-serif font-bold leading-tight ${txt}`}
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                A Chophouse Born<br />Within Jamaican History
              </h2>
            </div>

            <p className={`about-fade text-sm sm:text-base leading-relaxed font-light ${sub}`} style={{ opacity: 0 }}>
              Devon House was constructed in 1881 by George Stiebel, Jamaica's first Black millionaire. 
              Today, The Steak House on The Verandah pays tribute to this enduring landmark — uniting 
              USDA Prime dry-aged cuts with the bold spice traditions of the West Indies.
            </p>

            {/* Three pillars (editorial numbered, Gilded Grill aesthetic) */}
            <div className={`space-y-0 border-t ${bdr}`}>
              {PILLARS.map((p, i) => (
                <div
                  key={i}
                  className={`about-fade py-5 border-b flex gap-5 items-start ${bdr}`}
                  style={{ opacity: 0 }}
                >
                  <span className={`font-serif text-4xl font-bold leading-none ${acc} opacity-30 flex-shrink-0 w-10`}>
                    {p.no}
                  </span>
                  <div>
                    <h3 className={`font-semibold text-sm tracking-wide mb-1 ${txt}`}>{p.title}</h3>
                    <p className={`text-xs leading-relaxed ${sub}`}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-fade" style={{ opacity: 0 }}>
              <button
                onClick={() => onOpenWizard()}
                className={`btn-pill ${darkMode ? 'border-white/30 text-white hover:bg-white hover:text-black' : ''}`}
              >
                Reserve Your Experience
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
