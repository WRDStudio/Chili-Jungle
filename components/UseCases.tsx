import React from 'react';
import { useRitual } from '../contexts/RitualContext';

export const UseCases: React.FC = () => {
  const { theme } = useRitual();
  return (
    <section className={`py-24 px-4 ${theme.bg}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-64 bg-neutral-200 rounded-2xl overflow-hidden relative group">
            <img src={`https://picsum.photos/seed/${i + 10}/400/400`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ))}
      </div>
    </section>
  );
};