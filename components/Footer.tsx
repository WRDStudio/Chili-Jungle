import React from 'react';
import { Instagram, Mail } from 'lucide-react';
import { useRitual } from '../contexts/RitualContext';

export const Footer: React.FC = () => {
  const { mode } = useRitual();

  const getFooterStyles = () => {
    if (mode === 'luxe') return 'bg-neutral-950 text-gray-400 border-t border-white/10';
    if (mode === 'tropical') return 'bg-tropical-cream text-jungle-900 border-t border-tropical-mango/20';
    return 'bg-jungle-900 text-brand-100';
  };

  return (
    <footer id="footer" className={`py-16 px-4 transition-colors duration-500 ${getFooterStyles()}`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        
        {/* Brand */}
        <div>
          <div className="mb-6">
             <img 
              src="https://i.ibb.co/wzy1d0L/logo-nobg.png" 
              alt="Chili Jungle Logo" 
              className="h-20 w-auto opacity-90"
            />
          </div>
          <p className="font-serif text-sm italic opacity-80 mb-6 max-w-xs">
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
           <h4 className="text-xs font-bold uppercase tracking-widest mb-6 opacity-50 border-b border-current inline-block pb-1">Menu</h4>
           <ul className="space-y-3 text-sm font-bold uppercase tracking-wider">
             <li><a href="#products" className="hover:opacity-70 transition-opacity">Productos</a></li>
             <li><a href="#rituals" className="hover:opacity-70 transition-opacity">Rituales</a></li>
             <li><a href="#studio" className="hover:opacity-70 transition-opacity">Jungle Studio</a></li>
             <li><a href="#origin" className="hover:opacity-70 transition-opacity">Origen</a></li>
           </ul>
        </div>

        {/* Legal / Credits */}
        <div className="pt-4">
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6 opacity-50 border-b border-current inline-block pb-1">Studio Info</h4>
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