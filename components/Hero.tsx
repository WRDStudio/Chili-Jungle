import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useRitual } from '../contexts/RitualContext';

export const Hero: React.FC = () => {
  const { mode, theme } = useRitual();

  // Dynamic backgrounds based on the prompt description
  const getBackground = () => {
    if (mode === 'luxe') {
      return (
        <>
          <div className="absolute inset-0 bg-neutral-950"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-transparent to-neutral-950"></div>
          {/* Gold Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxe-gold rounded-full blur-[150px] opacity-10 animate-pulse"></div>
        </>
      );
    }
    if (mode === 'tropical') {
      return (
        <>
          <div className="absolute inset-0 bg-tropical-cream"></div>
          <img src="https://picsum.photos/seed/palm/1920/1080" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay grayscale" />
          <div className="absolute inset-0 bg-gradient-to-br from-tropical-cream via-transparent to-tropical-mango/10"></div>
        </>
      );
    }
    // Classic - Uses Jungle Green/Red vibes
    return (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-jungle-900 via-brand-900 to-orange-900"></div>
        <img src="https://picsum.photos/seed/chili/1920/1080" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/60"></div>
      </>
    );
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
           <div className={`inline-flex items-center px-3 py-1 mb-6 border ${theme.border} rounded-full backdrop-blur-sm`}>
             <span className={`text-xs font-bold uppercase tracking-[0.2em] ${theme.accent}`}>
               {theme.name} Ritual
             </span>
           </div>

           <h1 className={`text-6xl md:text-8xl font-display font-bold leading-none mb-6 drop-shadow-lg ${theme.text}`}>
             SPICE FROM <br />
             <span className={mode === 'luxe' ? 'text-luxe-gold' : mode === 'tropical' ? 'text-tropical-mango' : 'text-white'}>
               PARADISE
             </span>
           </h1>

           <p className={`text-xl font-serif italic mb-10 max-w-lg ${theme.text} opacity-90`}>
             Una salsa. Tres rituales. Elige el tuyo.
           </p>

           <div className="flex flex-wrap gap-4">
             <a href="#products" className={`px-8 py-4 rounded font-bold uppercase tracking-wider transition-all transform hover:-translate-y-1 shadow-lg flex items-center gap-3 ${theme.button} ${theme.buttonText}`}>
               Ver Productos <ArrowRight size={18} />
             </a>
             <a href="#rituals" className={`px-8 py-4 rounded font-bold uppercase tracking-wider transition-all border hover:bg-white/10 flex items-center gap-3 ${theme.border} ${theme.text}`}>
               Ver Rituales <Play size={18} fill="currentColor" />
             </a>
           </div>
        </div>

        {/* Right: Visual Loop (Simulated) */}
        <div className="hidden lg:flex justify-center relative">
           {/* Circle Background behind bottle */}
           <div className={`absolute w-96 h-96 rounded-full blur-3xl opacity-30 
              ${mode === 'luxe' ? 'bg-luxe-gold' : mode === 'tropical' ? 'bg-tropical-teal' : 'bg-orange-500'}
           `}></div>
           
           {/* Bottle Image Placeholder - Dynamic based on ritual */}
           <div className={`relative w-72 h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-105 border-4 ${theme.border}`}>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 p-4">
                 {/* Simulate bottle branding since we don't have bottle pics yet */}
                 <img src="https://i.ibb.co/wzy1d0L/logo-nobg.png" alt="Label" className="w-48 opacity-90 drop-shadow-xl mb-4" />
              </div>
              <img 
                src={
                  mode === 'luxe' ? "https://picsum.photos/seed/luxurybottle/600/900" :
                  mode === 'tropical' ? "https://picsum.photos/seed/cocktailbeach/600/900" :
                  "https://picsum.photos/seed/pizzaspice/600/900"
                }
                alt="Chili Jungle Bottle"
                className="w-full h-full object-cover -z-10"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <p className="text-white font-display font-bold text-2xl uppercase">{theme.name}</p>
              </div>
           </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce ${theme.text} opacity-50`}>
        <span className="text-[10px] uppercase tracking-[0.3em]">Explore The Jungle</span>
      </div>
    </section>
  );
};