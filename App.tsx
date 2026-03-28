import React, { useState, useEffect } from 'react';
import { RitualProvider } from './contexts/RitualContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { ProductShowcase } from './components/ProductShowcase';
import { ChefJungleAI } from './components/ChefJungleAI';
import { RaizDelFuego } from './components/RaizDelFuego';
import { Recipes } from './components/Recipes';
import { Origin } from './components/Origin';
import { JungleStudio } from './components/JungleStudio';
import { Footer } from './components/Footer';
import { B2BModal } from './components/B2BModal';
import { DirectOrderModal } from './components/DirectOrderModal';

interface FinalCTAProps {
  onOpenB2B: () => void;
  onOpenOrder: () => void;
}

const FinalCTA = ({ onOpenB2B, onOpenOrder }: FinalCTAProps) => {
  return (
    <section className="py-20 bg-black text-white text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-display uppercase mb-8 text-cream tracking-tight">
          Lleva la Jungla<br />A Tu Mesa
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={onOpenOrder} className="px-8 py-4 bg-flame text-white font-bold uppercase tracking-widest hover:bg-chili transition-colors rounded-full shadow-lg">
            Ordenar Ahora
          </button>
          <button onClick={onOpenB2B} className="px-8 py-4 border border-cream text-cream font-bold uppercase tracking-widest hover:bg-cream hover:text-jungle transition-colors rounded-full shadow-md">
            Vender (B2B)
          </button>
        </div>
      </div>
    </section>
  )
}

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [b2bOpen, setB2bOpen] = useState(false);
  
  // Direct Order Modal State
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderProduct, setOrderProduct] = useState<'classic' | 'tropical' | null>(null);
  const [orderSource, setOrderSource] = useState<string>('direct');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenOrder = (product?: 'classic' | 'tropical', source?: string) => {
    setOrderProduct(product || null);
    setOrderSource(source || 'direct');
    setOrderOpen(true);
  };

  return (
    <RitualProvider>
      <div className="min-h-screen font-sans transition-colors duration-500 relative bg-off-white selection:bg-orange-500 selection:text-white">
        <div
          className="fixed inset-0 pointer-events-none z-[60] opacity-[0.04] mix-blend-overlay"
          style={{ filter: 'url(#noiseFilter)' }}
        ></div>

        <Header scrolled={scrolled} />
        <main>
          <Hero />
          <Marquee />
          <ProductShowcase onOpenOrder={handleOpenOrder} />
          <ChefJungleAI />
          <RaizDelFuego />
          <Recipes onOpenOrder={handleOpenOrder} />
          <Origin />
          <JungleStudio />
          <FinalCTA onOpenB2B={() => setB2bOpen(true)} onOpenOrder={() => handleOpenOrder(undefined, 'final_cta')} />
        </main>
        <Footer onOpenB2B={() => setB2bOpen(true)} />
        
        {/* Modals */}
        <B2BModal isOpen={b2bOpen} onClose={() => setB2bOpen(false)} />
        <DirectOrderModal 
          isOpen={orderOpen} 
          onClose={() => setOrderOpen(false)} 
          initialProduct={orderProduct} 
          source={orderSource}
        />
      </div>
    </RitualProvider>
  );
};

export default App;