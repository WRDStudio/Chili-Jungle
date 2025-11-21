
import React from 'react';
import { useRitual } from '../contexts/RitualContext';
import { Disc, Play, Music2 } from 'lucide-react';

export const JungleStudio: React.FC = () => {
  const { mode } = useRitual();

  return (
    <section id="studio" className={`py-24 px-4 relative overflow-hidden ${mode === 'luxe' ? 'bg-ink text-mango' : 'bg-ink text-cream'}`}>
      
      {/* Decorative Background */}
      <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-jungle/20 via-transparent to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Disc size={24} className="animate-spin-slow" />
              <span className="text-xs font-bold uppercase tracking-[0.4em]">Jungle Studio</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-none">Sonidos de<br/>La Jungla</h2>
          </div>
          <p className="max-w-md text-right font-serif italic opacity-70 mt-6 md:mt-0 text-lg">
            "La salsa sabe mejor con el track correcto. Sets curados para cocinar, comer y el after-hour."
          </p>
        </div>

        {/* Playlist Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Cooking Heat", genre: "Afro-Funk / Soul", time: "45 min" },
            { title: "Sunset Dinner", genre: "Lo-Fi / Jazz Hop", time: "60 min" },
            { title: "Late Night Drizzle", genre: "Deep House", time: "90 min" }
          ].map((list, i) => (
            <div key={i} className="group bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-colors">
                  <Music2 size={20} />
                </div>
                <span className="text-xs font-mono opacity-50 tracking-widest">{list.time}</span>
              </div>
              <h3 className="text-2xl font-display font-bold uppercase mb-1 tracking-wide">{list.title}</h3>
              <p className="text-xs font-bold opacity-60 uppercase tracking-[0.15em]">{list.genre}</p>
              
              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity text-jungle">
                <Play size={12} fill="currentColor" /> Play Now
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="px-8 py-4 border border-white/30 rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:bg-cream hover:text-ink transition-all">
            Listen on Spotify
          </button>
        </div>

      </div>
    </section>
  );
};
