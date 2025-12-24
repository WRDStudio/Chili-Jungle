import React from 'react';
import { useRitual } from '../contexts/RitualContext';

export const Marquee: React.FC = () => {
  const { mode } = useRitual();
  const text = mode === 'luxe' ? "ELEVATE THE MOMENT • LUXURY HEAT • " : "STREET FOOD • PIZZA NIGHT • ORIGINAL RECIPE • ";
  return (
    <div className="bg-chili text-cream py-3 overflow-hidden whitespace-nowrap flex uppercase font-display font-bold tracking-[0.3em] text-xs">
      <div className="animate-scroll flex">
        {Array(20).fill(text).map((t, i) => <span key={i} className="mx-4">{t}</span>)}
      </div>
    </div>
  );
};