import React, { useState, useRef, MouseEvent, useEffect } from 'react';
import { ArrowRight, Play, ImageOff, RefreshCw } from 'lucide-react';
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
  
  // Possible paths to check in order of likelihood
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

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const getBackground = () => {
    if (mode === 'luxe') {
      return (
        <>
          <div className="absolute inset-0 bg-ink"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-transparent to-ink"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mango rounded-full blur-[150px] opacity-10 animate-pulse"></div>
        </>
      );
    }
    if (mode === 'tropical') {
      return (
        <>
          <div className="absolute inset-0 bg-cream"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-cream via-transparent to-mango/20"></div>
        </>
      );
    }
    return (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-chili via-flame to-jungle"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-ink/10 to-ink/50"></div>
      </>
    );
  };

  const heroTextColor = (mode === 'luxe' || mode === 'classic') ? 'text-cream' : 'text-jungle';
  const highlightColor = mode === 'luxe' ? 'text-mango' : mode === 'classic' ? 'text-mango' : 'text-flame';

  const retryImage = () => {
    setImgError(false);
    setAttemptCount(0);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center transition-all duration-700">
      <div className="absolute inset-0 z-0 transition-opacity duration-700">
        {getBackground()}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-left pt-20 lg:pt-0">
           <div className={`inline-flex items-center px-3 py-1 mb-6 border rounded-full backdrop-blur-sm ${mode === 'tropical' ? 'border-jungle/20' : 'border-cream/30'}`}>
             <span className={`text-xs font-bold uppercase tracking-[0.25em] ${mode === 'tropical' ? 'text-jungle' : 'text-cream'}`}>
               {theme.name} Ritual
             </span>
           </div>

           <h1 className={`text-7xl md:text-9xl font-display font-bold leading-[0.85] mb-6 drop-shadow-lg tracking-tighter ${heroTextColor}`}>
             SPICE FROM <br />
             <span className={highlightColor}>PARADISE</span>
           </h1>

           <p className={`text-xl md:text-2xl font-serif italic mb-10 max-w-lg ${heroTextColor} opacity-90 leading-relaxed`}>
             Una salsa. Tres rituales. Elige el tuyo.
           </p>

           <div className="flex flex-wrap gap-4">
             <a href="#products" className={`px-8 py-4 rounded font-bold uppercase text-sm tracking-[0.15em] transition-all transform hover:-translate-y-1 shadow-lg flex items-center gap-3 ${theme.button} ${theme.buttonText}`}>
               Ver Productos <ArrowRight size={18} />
             </a>
           </div>
        </div>

        <div 
          className="hidden lg:flex justify-center relative perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={containerRef}
        >
           <div className={`absolute w-96 h-96 rounded-full blur-3xl opacity-30 transition-all duration-700
              ${mode === 'luxe' ? 'bg-mango' : mode === 'tropical' ? 'bg-jungle' : 'bg-flame'}
           `}
           style={{ transform: `translate(${rotate.x * -2}px, ${rotate.y * -2}px)` }}></div>
           
           <div 
             className="relative w-72 h-[500px] transition-all duration-100 ease-out"
             style={{
               transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
               transformStyle: 'preserve-3d'
             }}
           >
              {imgError ? (
                 <div className="w-full h-full border-2 border-dashed border-white/30 bg-black/20 rounded-xl flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm">
                    <ImageOff className="text-white/50 w-10 h-10 mb-3" />
                    <p className="text-white font-bold text-xs uppercase tracking-widest mb-4">Image Not Found</p>
                    <div className="text-[9px] text-white/40 mb-4 font-mono text-left w-full bg-black/20 p-2 rounded">
                      Checked:<br/>
                      {paths.map((p, i) => (
                        <div key={i} className={i === paths.length - 1 ? "text-chili" : ""}>• {p}</div>
                      ))}
                    </div>
                    <button 
                      onClick={retryImage}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider text-white transition-all"
                    >
                      <RefreshCw size={12} /> Retry Loading
                    </button>
                 </div>
              ) : (
                <img 
                  src={currentPath}
                  alt="Chili Jungle Bottle"
                  className="w-full h-full object-contain absolute inset-0 z-10 drop-shadow-2xl"
                  onError={() => {
                    if (attemptCount < paths.length - 1) {
                      setAttemptCount(prev => prev + 1);
                    } else {
                      setImgError(true);
                    }
                  }}
                />
              )}
           </div>
        </div>
      </div>
    </section>
  );
};