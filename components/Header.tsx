import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useRitual } from '../contexts/RitualContext';
import { RitualMode } from '../types';

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
    if (mode === 'luxe') return 'bg-neutral-950/95 backdrop-blur-md border-b border-luxe-gold/20';
    if (mode === 'tropical') return 'bg-tropical-cream/95 backdrop-blur-md border-b border-tropical-mango/20';
    return 'bg-white/95 backdrop-blur-md border-b border-gray-200';
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${getHeaderBg()} py-3`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Left: Official Logo */}
          <div className="flex flex-col cursor-pointer group">
            {/* Logo Image */}
            <img 
              src="https://i.ibb.co/wzy1d0L/logo-nobg.png" 
              alt="Chili Jungle Logo" 
              className={`h-14 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-sm`}
            />
          </div>

          {/* Center: Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-sm font-bold uppercase tracking-wider transition-colors hover:opacity-70 ${theme.text} pt-2`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Ritual Switcher (Faders) */}
          <div className="hidden md:flex items-center gap-4">
            <span className={`text-[10px] uppercase tracking-widest font-bold opacity-70 ${theme.text}`}>Choose Your Ritual</span>
            <div className={`flex rounded-lg p-1 gap-1 backdrop-blur-sm border ${mode === 'luxe' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'}`}>
              {(['luxe', 'classic', 'tropical'] as RitualMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`
                    relative px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300
                    ${mode === m ? 'shadow-sm scale-105' : 'hover:bg-black/5 opacity-60 hover:opacity-100'}
                    ${m === 'luxe' && mode === m ? 'bg-neutral-900 text-luxe-gold border border-luxe-gold/50' : ''}
                    ${m === 'classic' && mode === m ? 'bg-red-600 text-white' : ''}
                    ${m === 'tropical' && mode === m ? 'bg-tropical-cream text-jungle-900 border border-tropical-mango' : ''}
                    ${mode !== m ? theme.text : ''}
                  `}
                >
                  {m}
                  {/* Active Indicator Dot */}
                  {mode === m && (
                    <span className={`absolute -top-1 -right-1 flex h-2 w-2`}>
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${m === 'luxe' ? 'bg-luxe-gold' : m === 'classic' ? 'bg-white' : 'bg-tropical-mango'}`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${m === 'luxe' ? 'bg-luxe-gold' : m === 'classic' ? 'bg-white' : 'bg-tropical-mango'}`}></span>
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
              className={`p-2 ${theme.text}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 w-full ${mode === 'luxe' ? 'bg-neutral-900 border-b border-neutral-800' : 'bg-white border-b border-gray-100'} py-6 px-4 flex flex-col space-y-6 animate-fade-in shadow-xl`}>
          <div className="grid grid-cols-3 gap-2 mb-4">
             {(['luxe', 'classic', 'tropical'] as RitualMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`py-2 text-xs font-bold uppercase border rounded ${mode === m ? 'bg-gray-200 text-black' : 'text-gray-500 border-gray-200'}`}
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
              className={`text-lg font-display font-bold uppercase tracking-widest ${theme.text}`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};