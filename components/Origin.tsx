
import React from 'react';
import { useRitual } from '../contexts/RitualContext';

export const Origin: React.FC = () => {
  const { theme } = useRitual();

  return (
    <section id="origin" className="bg-neutral-100">
      <div className="grid lg:grid-cols-2">
        
        {/* Left: Vibe Collage */}
        <div className="relative h-[600px] lg:h-auto overflow-hidden">
           <img src="https://picsum.photos/seed/tamarindo/800/1000" className="absolute inset-0 w-full h-full object-cover" />
           <div className="absolute inset-0 bg-black/20"></div>
           <div className="absolute bottom-10 left-10 text-white">
             <p className="font-display font-bold text-6xl uppercase opacity-50 tracking-tighter">Est. 2023</p>
           </div>
        </div>

        {/* Right: Story */}
        <div className={`flex flex-col justify-center p-12 lg:p-24 ${theme.bg === 'bg-neutral-950' ? 'bg-neutral-900' : 'bg-white'}`}>
          <span className={`text-xs font-bold uppercase tracking-[0.3em] mb-6 ${theme.accent}`}>
            Origen
          </span>
          <h2 className={`text-5xl md:text-7xl font-display font-bold uppercase mb-8 leading-[0.9] tracking-tighter ${theme.text}`}>
            Nacimos en <br/> Tamarindo.
          </h2>
          <div className={`space-y-6 font-serif text-lg leading-relaxed ${theme.text} opacity-80`}>
            <p>
              En la cocina, al ritmo de la música y el mar. No somos una fábrica. Somos un estudio de sabores.
            </p>
            <p>
              Lotes pequeños. Ingredientes 100% naturales. Técnica precisa. Cada frasco lleva el alma de la jungla y la energía del trópico.
            </p>
          </div>

          <button className={`mt-12 self-start px-8 py-3 border-2 font-bold uppercase text-xs tracking-[0.2em] hover:bg-current hover:text-white transition-colors ${theme.border} ${theme.text}`}>
            Leer Historia Completa
          </button>
        </div>

      </div>
    </section>
  );
};
