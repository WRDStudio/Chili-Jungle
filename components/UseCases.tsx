
import React from 'react';
import { useRitual } from '../contexts/RitualContext';

export const UseCases: React.FC = () => {
  const { theme, mode, setMode } = useRitual();

  const cases = [
    {
      title: "Brunch Picante",
      desc: "Huevos, tostadas, aguacate.",
      ritual: 'tropical',
      bgClass: "bg-mango",
      textClass: "text-ink",
      img: "https://picsum.photos/seed/brunch/400/300"
    },
    {
      title: "Pizza & Vinilos",
      desc: "Kitchen-night vibe. Classic heat.",
      ritual: 'classic',
      bgClass: "bg-chili",
      textClass: "text-cream",
      img: "https://picsum.photos/seed/pizzanight/400/300"
    },
    {
      title: "Ceviche al Mar",
      desc: "Fresco, ácido, picante. Mango vibes.",
      ritual: 'tropical',
      bgClass: "bg-jungle",
      textClass: "text-cream",
      img: "https://picsum.photos/seed/ceviche2/400/300"
    },
    {
      title: "Parrilla Amigos",
      desc: "Carne, fuego, humo. Rojo intenso.",
      ritual: 'classic',
      bgClass: "bg-ink",
      textClass: "text-cream",
      img: "https://picsum.photos/seed/bbq/400/300"
    }
  ];

  return (
    <section className={`py-24 ${mode === 'luxe' ? 'bg-ink' : 'bg-cream'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-5xl md:text-6xl font-display font-bold uppercase mb-12 text-center tracking-tighter ${theme.text}`}>
          Rituales de la Jungla
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cases.map((c, i) => (
            <div 
              key={i}
              onClick={() => setMode(c.ritual as any)}
              className={`
                relative h-80 group cursor-pointer overflow-hidden rounded-2xl
                ${c.bgClass}
              `}
            >
              <img src={c.img} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className={`text-2xl font-display font-bold uppercase leading-tight tracking-tight ${c.textClass || 'text-ink'}`}>
                  {c.title}
                </h3>
                <p className={`font-serif text-sm italic mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 ${c.textClass || 'text-ink'}`}>
                  {c.desc}
                </p>
                <div className={`mt-4 h-1 w-12 bg-current opacity-50 ${c.textClass || 'text-ink'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
