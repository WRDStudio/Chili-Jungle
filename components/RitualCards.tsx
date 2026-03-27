import React from 'react';
import { useRitual } from '../contexts/RitualContext';

export const RitualCards: React.FC = () => {
  const { mode, setMode, theme } = useRitual();
  const cards = [
    { id: 'luxe', title: 'Luxe', desc: 'Fine dining vibes.' },
    { id: 'classic', title: 'Clásico', desc: 'Pizza & street food.' },
    { id: 'tropical', title: 'Tropical', desc: 'Beach & surf fresh.' }
  ];

  return (
    <section className={`py-24 px-4 ${theme.bg}`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => setMode(card.id as any)}
            className={`p-8 rounded-3xl border-2 transition-all cursor-pointer ${mode === card.id ? `bg-white/10 shadow-xl scale-105 ${theme.border}` : `border-transparent ${theme.text} opacity-60`}`}
          >
            <h3 className={`text-3xl font-display font-bold uppercase mb-2 ${theme.text}`}>{card.title}</h3>
            <p className={`font-serif italic opacity-70 ${theme.text}`}>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};