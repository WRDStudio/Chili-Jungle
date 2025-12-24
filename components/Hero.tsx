import React, { useState, useRef, MouseEvent } from 'react';
import { ArrowRight, ImageOff, RefreshCw } from 'lucide-react';
import { useRitual } from '../contexts/RitualContext';

export const Hero: React.FC = () => {
  const { mode, theme } = useRitual();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filenames = {
    luxe: "bottle-classic.png",
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
      <>
        <div className="absolute inset-0 bg-ink"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mango rounded-full blur-[150px] opacity-10 animate-pulse"></div>
      </>
    );
    if (mode === 'tropical') return <div className="absolute inset-0 bg-cream"></div>;
    return <div className="absolute inset-0 bg-gradient-to-br from-chili via-flame to-jungle opacity-20"></div>;
  };

  const heroTextColor = (mode === 'luxe' || mode === 'classic') ? 'text-cream' : 'text-jungle';

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center transition-all duration-700">
      <div className="absolute inset-0 z-0">{getBackground()}</div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-left">
           <h1 className={`text-7xl md:text-9xl font-display font-bold leading-none mb-6 ${heroTextColor}`}>
             SPICE FROM <br /> <span className="text-mango">PARADISE</span>
           </h1>
           <p className={`text-xl mb-10 ${heroTextColor} opacity-90 italic`}>Una salsa. Tres rituales. Elige el tuyo.</p>
           <a href="#products" className={`inline-flex items-center gap-3 px-8 py-4 rounded font-bold uppercase tracking-widest ${theme.button} ${theme.buttonText}`}>
             Ver Productos <ArrowRight size={18} />
           </a>
        </div>
        <div className="hidden lg:flex justify-center perspective-1000" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} ref={containerRef}>
           <div className="relative w-72 h-[500px]" style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`, transformStyle: 'preserve-3d' }}>
              {imgError ? (
                 <div className="w-full h-full border-2 border-dashed border-white/20 flex flex-col items-center justify-center p-6 text-white text-center">
                    <ImageOff className="mb-2 opacity-50" />
                    <p className="text-[10px] uppercase tracking-widest mb-4">Image Not Found</p>
                    <button onClick={() => {setImgError(false); setAttemptCount(0);}} className="text-[10px] uppercase font-bold bg-white/10 px-4 py-2 rounded-full"><RefreshCw size={12} className="inline mr-1" /> Retry</button>
                 </div>
              ) : (
                <img src={currentPath} alt="Bottle" className="w-full h-full object-contain drop-shadow-2xl" onError={() => attemptCount < paths.length - 1 ? setAttemptCount(c => c + 1) : setImgError(true)} />
              )}
           </div>
        </div>
      </div>
    </section>
  );
};