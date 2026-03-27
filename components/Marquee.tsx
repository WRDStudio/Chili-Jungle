import React from 'react';
import { useRitual } from '../contexts/RitualContext';

export const Marquee: React.FC = () => {
  const { mode } = useRitual();
  const common = "SPICE FROM PARADISE • RAÍZ DEL FUEGO • ";
  let text = "";

  if (mode === 'tropical') {
    text = `BEACH • FRIENDS • TROPICAL HEAT • FRESHNESS • ${common}`;
  } else if (mode === 'luxe') {
    text = `ELEVATE THE MOMENT • LUXURY HEAT • ${common}`;
  } else {
    text = `STREET FOOD • PIZZA NIGHT • ORIGINAL RECIPE • ${common}`;
  }
  return (
    <div className="bg-chili text-cream py-4 overflow-hidden whitespace-nowrap flex uppercase font-display font-bold tracking-[0.2em] text-base border-y border-flame/30">
      <div className="animate-scroll flex w-max" style={{ animationDuration: '300s' }}>
        {Array(50).fill(text).map((t, i) => <span key={i} className="mx-4">{t}</span>)}
      </div>
    </div>
  );
};