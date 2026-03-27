import React from 'react';
import { useRitual } from '../contexts/RitualContext';
import { Music2 } from 'lucide-react';

import { themes } from '../contexts/RitualContext';

export const JungleStudio: React.FC = () => {
  // Container is always neutral (ink/cream)
  return (
    <section id="studio" className="py-24 px-4 bg-ink text-cream border-t border-white/10 scroll-mt-20 md:scroll-mt-28 lg:scroll-mt-36">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-12 mb-12">
        <h2 className="text-6xl font-display uppercase tracking-tighter">Jungle Studio</h2>
        <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl opacity-70">Salsas que suenan bien.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {(['luxe', 'classic', 'tropical'] as const).map((mode, i) => {
          const theme = themes[mode];
          return (
            <div key={mode} className={`p-8 border rounded-2xl flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer overflow-hidden relative ${theme.bg} ${theme.border}`}>
              {/* For gradient backgrounds, we need a refined text color application if the theme uses cream or ink explicitly */}
              <div className="relative z-10 flex items-center gap-4 w-full">
                <Music2 className={mode === 'classic' ? 'text-cream' : theme.accent} />
                <div>
                  <h4 className={`font-display font-bold uppercase ${theme.text}`}>Playlist #00{i + 1}</h4>
                  <p className={`text-xs opacity-70 uppercase ${theme.text}`}>{theme.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};