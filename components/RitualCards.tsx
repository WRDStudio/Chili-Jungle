import React from 'react';
import { useRitual } from '../contexts/RitualContext';
import { RitualMode } from '../types';

export const RitualCards: React.FC = () => {
  const { mode, setMode, theme } = useRitual();

  const cards: { id: RitualMode; title: string; desc: string; image: string; styles: string }[] = [
    {
      id: 'luxe',
      title: 'Luxe',
      desc: 'Late night, bar, fine dining.',
      image: 'https://picsum.photos/seed/darkfood/400/600',
      styles: 'bg-neutral-900 border-luxe-gold/50 text-luxe-gold'
    },
    {
      id: 'classic',
      title: 'Clásico',
      desc: 'Pizza, huevos, parrilla.',
      image: 'https://picsum.photos/seed/pizza/400/600',
      styles: 'bg-red-600 border-white/20 text-white'
    },
    {
      id: 'tropical',
      title: 'Tropical',
      desc: 'Ceviche, ensaladas, bowls.',
      image: 'https://picsum.photos/seed/ceviche/400/600',
      styles: 'bg-tropical-cream border-tropical-teal/20 text-tropical-teal'
    }
  ];

  return (
    <section id="rituals" className={`py-20 px-4 transition-colors duration-500 ${mode === 'luxe' ? 'bg-neutral-900' : mode === 'classic' ? 'bg-white' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
           <h2 className={`text-sm font-bold uppercase tracking-[0.3em] mb-2 ${theme.accent}`}>The Vibe Check</h2>
           <h3 className={`text-4xl md:text-5xl font-display font-bold uppercase ${theme.text}`}>Los Rituales</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div 
              key={card.id}
              onClick={() => setMode(card.id)}
              className={`
                group relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-500 hover:-translate-y-2
                ${card.styles}
                ${mode === card.id ? 'ring-4 ring-offset-4 ring-current opacity-100' : 'opacity-60 hover:opacity-100 grayscale hover:grayscale-0'}
              `}
            >
              {/* Micro Image */}
              <div className="h-48 w-full overflow-hidden">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              
              <div className="p-6 text-center">
                <h4 className="text-3xl font-display font-bold uppercase mb-2">{card.title}</h4>
                <p className="font-serif italic opacity-80 text-sm">{card.desc}</p>
                
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-xs font-bold uppercase tracking-widest border-b border-current pb-1">Activate Ritual</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};