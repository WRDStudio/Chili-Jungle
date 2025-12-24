import React from 'react';

export const Origin: React.FC = () => {
  return (
    <section id="origin" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <img src="https://picsum.photos/seed/tamarindo/800/600" className="rounded-3xl shadow-2xl" />
        <div>
          <h2 className="text-5xl font-display font-bold uppercase mb-6">Nacimos en Tamarindo</h2>
          <p className="font-serif text-lg leading-relaxed opacity-80 mb-6">Hecho a mano en pequeños lotes, sin conservantes ni aditivos.</p>
          <button className="px-8 py-3 border-2 border-black font-bold uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-colors">Ver Historia</button>
        </div>
      </div>
    </section>
  );
};