
import React from 'react';
import { useRitual } from '../contexts/RitualContext';

export const Marquee: React.FC = () => {
  const { mode, theme } = useRitual();

  const getMarqueeContent = () => {
    if (mode === 'luxe') return "LATE NIGHT VIBES • COCKTAIL HOUR • ELEVATE THE MOMENT • LUXURY HEAT • ";
    if (mode === 'tropical') return "FRESH INGREDIENTS • PURA VIDA • TAMARINDO • SURF & SPICE • MADE IN PARADISE • ";
    return "STREET FOOD CULTURE • PIZZA NIGHT • ORIGINAL RECIPE • FLAVOR BOMB • SPICE FROM PARADISE • ";
  };

  const text = getMarqueeContent();
  // Repeat text enough times to fill screen smoothly
  const content = Array(8).fill(text).join("");

  const getStyles = () => {
    if (mode === 'luxe') return "bg-mango text-ink border-y border-mango";
    if (mode === 'tropical') return "bg-jungle text-cream border-y border-jungle";
    return "bg-chili text-cream border-y border-chili";
  };

  return (
    <div className={`relative overflow-hidden py-3 ${getStyles()} transition-colors duration-500 z-20`}>
      <div className="absolute inset-0 opacity-10 bg-white mix-blend-overlay"></div>
      <div className="animate-scroll whitespace-nowrap flex">
        <span className="text-sm font-display font-bold uppercase tracking-[0.3em] mx-4">
          {content}
        </span>
        <span className="text-sm font-display font-bold uppercase tracking-[0.3em] mx-4">
          {content}
        </span>
      </div>
    </div>
  );
};
