import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useRitual } from '../contexts/RitualContext';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const { mode, setMode } = useRitual();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 py-4 ${scrolled ? 'bg-cream/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Logo className="w-32" lightMode={!scrolled && mode !== 'tropical'} />
        <div className="flex items-center gap-2 bg-black/5 p-1 rounded-lg">
          {(['luxe', 'classic', 'tropical'] as const).map(m => (
            <button 
              key={m} 
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${mode === m ? 'bg-white shadow-sm scale-105' : 'opacity-50'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};