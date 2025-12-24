import React from 'react';
import { useRitual } from '../contexts/RitualContext';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { mode } = useRitual();
  const styles = mode === 'luxe' ? 'bg-black text-white border-t border-white/10' : 'bg-jungle text-white';
  
  return (
    <footer className={`py-16 px-4 ${styles}`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <Logo lightMode className="w-40 mb-6" />
          <p className="font-serif italic text-sm opacity-80">Spice from Paradise. Handcrafted in Tamarindo, Costa Rica.</p>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest mb-6 opacity-50">Explore</h4>
          <ul className="space-y-3 text-xs uppercase font-bold tracking-widest">
            <li><a href="#products">Productos</a></li>
            <li><a href="#rituals">Rituales</a></li>
            <li><a href="#origin">Origen</a></li>
          </ul>
        </div>
        <div className="text-xs font-mono opacity-50">
          <p>© {new Date().getFullYear()} Chili Jungle Studio.</p>
          <p>Handcrafted by Spice Lovers.</p>
        </div>
      </div>
    </footer>
  );
};