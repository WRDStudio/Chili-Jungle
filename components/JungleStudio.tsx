import React from 'react';
import { Music2 } from 'lucide-react';

export const JungleStudio: React.FC = () => {
  return (
    <section id="studio" className="py-24 bg-ink text-cream px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-12 mb-12">
        <h2 className="text-6xl font-display font-bold uppercase tracking-tighter">Jungle Studio</h2>
        <p className="font-serif italic text-lg opacity-70">Salsas que suenan bien.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[1,2,3].map(i => (
          <div key={i} className="p-8 border border-white/10 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer">
            <Music2 className="text-mango" />
            <div>
              <h4 className="font-display font-bold uppercase">Playlist #00{i}</h4>
              <p className="text-xs opacity-50 uppercase">Vibras de Jungla</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};