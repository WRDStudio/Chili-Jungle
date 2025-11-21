
import React, { useState, useRef, MouseEvent } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useRitual } from '../contexts/RitualContext';
import { Logo } from './Logo';

export const Hero: React.FC = () => {
  const { mode, theme } = useRitual();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation based on mouse position (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 }); // Reset on leave
  };

  // Dynamic backgrounds based on the prompt description
  const getBackground = () => {
    if (mode === 'luxe') {
      return (
        <>
          <div className="absolute inset-0 bg-ink"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-transparent to-ink"></div>
          {/* Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mango rounded-full blur-[150px] opacity-10 animate-pulse"></div>
        </>
      );
    }
    if (mode === 'tropical') {
      return (
        <>
          <div className="absolute inset-0 bg-cream"></div>
          <img src="/images/hero-tropical.jpg" onError={(e) => e.currentTarget.src = "https://picsum.photos/seed/palm/1920/1080"} className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay grayscale" />
          <div className="absolute inset-0 bg-gradient-to-br from-cream via-transparent to-mango/20"></div>
        </>
      );
    }
    // Classic - Uses Chili/Flame gradient
    return (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-chili via-flame to-jungle"></div>
        <img src="/images/hero-classic.jpg" onError={(e) => e.currentTarget.src = "https://picsum.photos/seed/chili/1920/1080"} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-ink/10 to-ink/50"></div>
      </>
    );
  };

  // Determine text color separately from theme because Hero backgrounds are specific
  const getHeroTextColor = () => {
    if (mode === 'luxe') return 'text-cream';
    if (mode === 'classic') return 'text-cream'; 
    return 'text-jungle'; 
  };

  const heroTextColor = getHeroTextColor();
  const highlightColor = mode === 'luxe' ? 'text-mango' : mode === 'classic' ? 'text-mango' : 'text-flame';

  // Image selection logic
  const getBottleImage = () => {
    // Fallbacks included in case files aren't uploaded yet
    if (mode === 'luxe') return "/images/hero-luxe.jpg"; 
    if (mode === 'tropical') return "/images/hero-tropical.jpg";
    return "/images/hero-classic.jpg";
  }

  // Fallback function for images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (mode === 'luxe') target.src = "https://picsum.photos/seed/luxurybottle/600/900";
    else if (mode === 'tropical') target.src = "https://picsum.photos/seed/cocktailbeach/600/900";
    else target.src = "https://picsum.photos/seed/pizzaspice/600/900";
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center transition-all duration-700">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 transition-opacity duration-700">
        {getBackground()}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text Content */}
        <div className="text-left pt-20 lg:pt-0">
           <div className={`inline-flex items-center px-3 py-1 mb-6 border rounded-full backdrop-blur-sm ${mode === 'tropical' ? 'border-jungle/20' : 'border-cream/30'}`}>
             <span className={`text-xs font-bold uppercase tracking-[0.25em] ${mode === 'tropical' ? 'text-jungle' : 'text-cream'}`}>
               {theme.name} Ritual
             </span>
           </div>

           <h1 className={`text-7xl md:text-9xl font-display font-bold leading-[0.85] mb-6 drop-shadow-lg tracking-tighter ${heroTextColor}`}>
             SPICE FROM <br />
             <span className={highlightColor}>
               PARADISE
             </span>
           </h1>

           <p className={`text-xl md:text-2xl font-serif italic mb-10 max-w-lg ${heroTextColor} opacity-90 leading-relaxed`}>
             Una salsa. Tres rituales. Elige el tuyo.
           </p>

           <div className="flex flex-wrap gap-4">
             <a href="#products" className={`px-8 py-4 rounded font-bold uppercase text-sm tracking-[0.15em] transition-all transform hover:-translate-y-1 shadow-lg flex items-center gap-3 ${theme.button} ${theme.buttonText}`}>
               Ver Productos <ArrowRight size={18} />
             </a>
             <a href="#rituals" className={`px-8 py-4 rounded font-bold uppercase text-sm tracking-[0.15em] transition-all border hover:bg-white/10 flex items-center gap-3 ${mode === 'tropical' ? 'border-jungle text-jungle' : 'border-cream text-cream'}`}>
               Ver Rituales <Play size={18} fill="currentColor" />
             </a>
           </div>
        </div>

        {/* Right: Visual Loop (Simulated) - Now with 3D Tilt */}
        <div 
          className="hidden lg:flex justify-center relative perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={containerRef}
        >
           {/* Circle Background behind bottle */}
           <div className={`absolute w-96 h-96 rounded-full blur-3xl opacity-30 transition-all duration-700
              ${mode === 'luxe' ? 'bg-mango' : mode === 'tropical' ? 'bg-jungle' : 'bg-flame'}
           `}
           style={{
             transform: `translate(${rotate.x * -2}px, ${rotate.y * -2}px)`
           }}
           ></div>
           
           {/* Bottle Image Container with Tilt */}
           <div 
             className={`relative w-72 h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-100 ease-out border-4 ${mode === 'tropical' ? 'border-jungle' : 'border-cream/20'}`}
             style={{
               transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
               transformStyle: 'preserve-3d'
             }}
           >
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/10 p-4 z-20 translate-z-10">
                 {/* We show the Logo here only if image fails or as an overlay if needed. 
                     But typically hero image is the bottle itself. 
                     If using a real photo, we don't need the SVG logo on top unless it's part of the design.
                     I'll keep it subtle or remove if it blocks the real label. 
                     Let's keep it but make it very subtle if using real image.
                 */}
                 <Logo lightMode={mode !== 'tropical'} className="w-64 drop-shadow-2xl opacity-0" /> 
              </div>
              <img 
                src={getBottleImage()}
                onError={handleImageError}
                alt="Chili Jungle Bottle"
                className="w-full h-full object-cover absolute inset-0 -z-10"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent z-20 translate-z-20">
                <p className="text-cream font-display font-bold text-3xl uppercase tracking-tight">{theme.name}</p>
              </div>
           </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce ${heroTextColor} opacity-50`}>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Explore The Jungle</span>
      </div>
    </section>
  );
};
