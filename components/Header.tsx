import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRitual } from '../contexts/RitualContext';

export const Header: React.FC = () => {
  const { mode, setMode } = useRitual();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed w-full z-50 transition-all duration-300 py-4 bg-ink shadow-lg">
      <img
        src="/images/Chili_Oil_Abstract.gif"
        alt=""
        fetchPriority="low"
        loading="lazy"
        className="absolute top-0 left-0 h-full w-auto pointer-events-none z-0 opacity-95 mix-blend-screen"
      />
      <img
        src="/images/Chili_Oil_Abstract.gif"
        alt=""
        fetchPriority="low"
        loading="lazy"
        className="absolute top-0 right-0 h-full w-auto scale-x-[-1] pointer-events-none z-0 opacity-95 mix-blend-screen"
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-12 xl:px-24 flex justify-between items-center relative z-10 w-full min-h-[4rem] md:min-h-[6rem] lg:min-h-[8rem]">
        <motion.img
          src="/images/logo_main.png.webp"
          alt="Chili Jungle"
          fetchPriority="high"
          className="h-16 md:h-24 lg:h-32 w-auto object-contain cursor-pointer drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] ml-12 lg:ml-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{
            y: { duration: 0.8, ease: "easeOut" },
            opacity: { duration: 0.8 },
            scale: { duration: 0.2 }
          }}
        />
        <div className="flex items-center gap-1 sm:gap-2 bg-white/10 p-1 rounded-lg z-20 mr-12 lg:mr-24">
          {(['luxe', 'classic', 'tropical'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-2 sm:px-3 py-1.5 rounded text-[10px] sm:text-[13px] font-display uppercase tracking-tighter transition-all ${mode === m ? 'bg-white text-black shadow-sm scale-105' : 'text-white/60 hover:text-white'}`}
            >
              {m === 'classic' ? 'Clásico' : m === 'tropical' ? 'Tropical' : 'Luxe'}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};