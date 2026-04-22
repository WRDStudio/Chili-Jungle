import React, { useState, useRef, MouseEvent } from 'react';
import { ArrowRight, ImageOff, RefreshCw } from 'lucide-react';
import { useRitual } from '../contexts/RitualContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Hero: React.FC = () => {
  const { mode, theme, cycleMode } = useRitual();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filenames = {
    luxe: "hero-image2.png",
    tropical: "bottle-tropical.png",
    classic: "bottle-classic.png"
  };

  const filename = filenames[mode as keyof typeof filenames];
  const paths = [
    `/images/${filename}`,
    `images/${filename}`,
    `/public/images/${filename}`,
    `public/images/${filename}`
  ];

  const currentPath = paths[attemptCount] || paths[0];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  const getBackground = () => {
    if (mode === 'luxe') return (
      <motion.div
        key="luxe-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-ink"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mango rounded-full blur-[150px] opacity-10 animate-pulse"></div>
      </motion.div>
    );
    // For Classic and Tropical, use the theme gradient/solid bg directly
    return (
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`absolute inset-0 ${theme.bg}`}
      />
    );
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center transition-all duration-700 pt-32">
      <AnimatePresence mode="popLayout">
        <div className="absolute inset-0 z-0">{getBackground()}</div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full">
        <motion.div
          className="lg:col-span-6 text-left flex flex-col justify-center relative z-20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className={`uppercase tracking-[0.25em] text-sm md:text-base font-bold mb-4 ${theme.text} opacity-80`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Descubre La Jungla
          </motion.div>
          
          <motion.h1
            className={`flex flex-col items-start justify-center font-display leading-[0.9] mb-6 md:mb-8 ${theme.text}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-8xl tracking-tighter uppercase whitespace-normal sm:whitespace-nowrap break-words w-full">SPICE FROM</span>
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-8xl text-mango tracking-tighter uppercase break-words w-full">PARADISE</span>
          </motion.h1>

          <motion.div
            className="mb-8 md:mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className={`text-xl sm:text-2xl md:text-3xl font-display uppercase tracking-wider leading-snug ${theme.text}`}>
              Una Salsa.<br/>
              <span className="text-mango">Tres Rituales.</span><br/>
              Elige el tuyo.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full lg:w-max"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.a
              href="#products"
              className={`inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 lg:px-8 py-4 rounded font-bold uppercase tracking-widest ${theme.button} ${theme.buttonText} text-sm lg:text-base`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Productos <ArrowRight size={18} />
            </motion.a>
            <motion.button
              type="button"
              onClick={cycleMode}
              className={`inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 lg:px-8 py-4 rounded font-bold uppercase tracking-widest border-2 border-current ${theme.text} opacity-90 hover:opacity-100 hover:bg-white/5 transition-colors text-sm lg:text-base`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Descubrir Rituales
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="flex lg:col-span-6 justify-center lg:justify-end items-center perspective-1000 mt-12 lg:mt-0" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} ref={containerRef}>
          <motion.div
            className="relative w-56 h-[400px] sm:w-72 sm:h-[500px] lg:w-80 lg:h-[550px] xl:w-[450px] xl:h-[700px] pointer-events-none"
            style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`, transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          >
            {/* Spotlight Effect */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-white/20 blur-[80px] rounded-full -z-10 transition-opacity duration-500 ${mode === 'luxe' ? 'opacity-10' : 'opacity-40'}`} />

            <AnimatePresence mode="wait">
              {imgError ? (
                <div className="w-full h-full border-2 border-dashed border-white/20 flex flex-col items-center justify-center p-6 text-white text-center">
                  <ImageOff className="mb-2 opacity-50" />
                  <p className="text-[10px] uppercase tracking-widest mb-4">Image Not Found</p>
                  <button onClick={() => { setImgError(false); setAttemptCount(0); }} className="text-[10px] uppercase font-bold bg-white/10 px-4 py-2 rounded-full"><RefreshCw size={12} className="inline mr-1" /> Retry</button>
                </div>
              ) : (
                <motion.img
                  key={mode} // Key update triggers animation
                  src={currentPath}
                  alt="Bottle"
                  fetchPriority="high"
                  className={`w-full h-full object-contain transition-all duration-700 ${mode === 'luxe' ? 'drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] brightness-95' : mode === 'classic' ? 'drop-shadow-[0_25px_50px_rgba(199,67,42,0.4)] brightness-100' : 'drop-shadow-[0_25px_50px_rgba(0,100,0,0.2)] brightness-105'}`}
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  animate={{ opacity: 1, scale: mode === 'tropical' ? 1.05 : mode === 'classic' ? 1.02 : 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.5 }}
                  onError={() => attemptCount < paths.length - 1 ? setAttemptCount(c => c + 1) : setImgError(true)}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};