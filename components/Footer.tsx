
import React from 'react';
import { Instagram, Mail } from 'lucide-react';
import { useRitual } from '../contexts/RitualContext';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { mode } = useRitual();

  const getFooterStyles = () => {
    if (mode === 'luxe') return 'bg-ink text-gray-400 border-t border-mango/10';
    if (mode === 'tropical') return 'bg-cream text-jungle border-t border-mango/20';
    return 'bg-jungle text-cream'; // Classic default footer
  };

  return (
    <footer id="footer" className={`py-16 px-4 transition-colors duration-500 ${getFooterStyles()}`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        
        {/* Brand */}
        <div>
          <div className="mb-6 w-48">
            <Logo variant="full" lightMode={mode !== 'tropical'} />
          </div>
          <p className="font-serif text-sm italic opacity-80 mb-6 max-w-xs leading-relaxed">
            Spice from Paradise. Handcrafted in Tamarindo, Costa Rica.
            <br/><br/>
            Una salsa, tres rituales.
          </p>
          <div className="flex gap-4">
            <Instagram size={24} className="hover:text-white cursor-pointer transition-colors" />
            <Mail size={24} className="hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="pt-4">
           <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 opacity-50 border-b border-current inline-block pb-1">Menu</h4>
           <ul className="space-y-3 text-xs font-bold uppercase tracking-[0.15em]">
             <li><a href="#products" className="hover:opacity-70 transition-opacity">Productos</a></li>
             <li><a href="#rituals" className="hover:opacity-70 transition-opacity">Rituales</a></li>
             <li><a href="#studio" className="hover:opacity-70 transition-opacity">Jungle Studio</a></li>
             <li><a href="#origin" className="hover:opacity-70 transition-opacity">Origen</a></li>
           </ul>
        </div>

        {/* Legal / Credits */}
        <div className="pt-4">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 opacity-50 border-b border-current inline-block pb-1">Studio Info</h4>
           <ul className="space-y-3 text-xs font-mono opacity-70">
             <li>Become a Distributor</li>
             <li>Shipping Policy</li>
             <li>Privacy Policy</li>
             <li className="pt-8 border-t border-current/20">© {new Date().getFullYear()} Chili Jungle Studio.</li>
           </ul>
        </div>

      </div>
    </footer>
  );
};
