
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useRitual } from '../contexts/RitualContext';
import { RitualMode } from '../types';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const { mode, setMode, theme } = useRitual();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Productos', href: '#products' },
    { name: 'Rituales', href: '#rituals' },
    { name: 'Origen', href: '#origin' },
    { name: 'Jungle Studio', href: '#studio' },
    { name: 'Contacto', href: '#footer' },
  ];

  // Styles based on current mode for the header background
  const getHeaderBg = () => {
    if (!isScrolled) return 'bg-transparent';
    if (mode === 'luxe') return 'bg-ink/95 backdrop-blur-md border-b border-mango/20';
    if (mode === 'tropical') return 'bg-cream/95 backdrop-blur-md border-b border-mango/20';
    return 'bg-cream/95 backdrop-blur-md border-b border-chili/20'; // Classic
  };

  // Text color calculation for nav links
  const getNavTextColor = () => {
    if (!isScrolled && mode !== 'tropical') return 'text-cream'; // Transparent header on dark backgrounds
    if (mode === 'luxe') return 'text-cream';
    return 'text-jungle'; // Use Jungle color for text on cream backgrounds
  };

  const navTextColor = getNavTextColor();

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${getHeaderBg()} py-3`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Left: Official Logo */}
          <div className="flex flex-col cursor-pointer group w-32 md:w-40">
             <Logo 
               variant="simple" 
               lightMode={!isScrolled && mode !== 'tropical' || mode === 'luxe'} 
               className="transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
             />
          </div>

          {/* Center: Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-xs font-bold uppercase tracking-[0.15em] transition-colors hover:opacity-70 ${navTextColor} pt-2`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Ritual Switcher (Faders) */}
          <div className="hidden md:flex items-center gap-4">
            <span className={`text-[10px] uppercase tracking-[0.2em] font-bold opacity-70 ${navTextColor}`}>Choose Your Ritual</span>
            <div className={`flex rounded-lg p-1 gap-1 backdrop-blur-sm border ${mode === 'luxe' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'}`}>
              {(['luxe', 'classic', 'tropical'] as RitualMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`
                    relative px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-300
                    ${mode === m ? 'shadow-sm scale-105' : 'hover:bg-black/5 opacity-60 hover:opacity-100'}
                    ${m === 'luxe' && mode === m ? 'bg-ink text-mango border border-mango/50' : ''}
                    ${m === 'classic' && mode === m ? 'bg-chili text-cream' : ''}
                    ${m === 'tropical' && mode === m ? 'bg-cream text-jungle border border-jungle/20' : ''}
                    ${mode !== m ? navTextColor : ''}
                  `}
                >
                  {m}
                  {/* Active Indicator Dot */}
                  {mode === m && (
                    <span className={`absolute -top-1 -right-1 flex h-2 w-2`}>
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${m === 'luxe' ? 'bg-mango' : m === 'classic' ? 'bg-flame' : 'bg-jungle'}`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${m === 'luxe' ? 'bg-mango' : m === 'classic' ? 'bg-flame' : 'bg-jungle'}`}></span>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 ${navTextColor}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 w-full ${mode === 'luxe' ? 'bg-ink border-b border-mango/20' : 'bg-cream border-b border-chili/20'} py-6 px-4 flex flex-col space-y-6 animate-fade-in shadow-xl`}>
          <div className="grid grid-cols-3 gap-2 mb-4">
             {(['luxe', 'classic', 'tropical'] as RitualMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`py-2 text-xs font-bold uppercase border rounded tracking-wider ${mode === m ? 'bg-black/10' : 'border-black/10'}`}
                >
                  {m}
                </button>
             ))}
          </div>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-xl font-display font-bold uppercase tracking-widest ${theme.text}`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
