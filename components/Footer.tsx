import React from 'react';
import { useRitual } from '../contexts/RitualContext';

interface FooterProps {
  onOpenB2B?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenB2B }) => {
  const { theme, cycleMode } = useRitual();
  // Footer always green (Jungle) as requested
  const styles = 'bg-jungle text-white border-t border-white/10';

  return (
    <footer className={`py-4 md:py-6 px-4 ${styles}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        {/* Left: Brand */}
        <div className="flex items-center gap-4">
          <img src="/images/logo_vector.svg" alt="Chili Jungle Guarantee" className="w-12 md:w-16 object-contain drop-shadow-xl" />
          <p className="hidden md:block font-serif italic text-white/90 text-sm md:text-base tracking-wide">
            Handcrafted in Tamarindo, Costa Rica.
          </p>
        </div>

        {/* Right: Horizontal Nav & Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <ul className="flex gap-6 text-sm font-bold tracking-wider uppercase text-white">
            <li><a href="#products" className="hover:text-amber-200 transition-colors">Productos</a></li>
            <li><button type="button" onClick={cycleMode} className="hover:text-amber-200 transition-colors uppercase">Rituales</button></li>
            <li><a href="#origin" className="hover:text-amber-200 transition-colors">Origen</a></li>
            {onOpenB2B && (
              <li><button onClick={onOpenB2B} className="hover:text-amber-200 transition-colors">B2B</button></li>
            )}
          </ul>

          <div className="text-sm font-bold tracking-wider uppercase opacity-80 flex items-center gap-2">
            <span>© {new Date().getFullYear()} Chili Jungle.</span>
            <span className="hidden md:inline">|</span>
            <span>Spicy Lovers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};