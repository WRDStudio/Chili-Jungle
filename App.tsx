import React from 'react';
import { RitualProvider } from './contexts/RitualContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { RitualCards } from './components/RitualCards';
import { ProductShowcase } from './components/ProductShowcase';
import { UseCases } from './components/UseCases';
import { Origin } from './components/Origin';
import { JungleStudio } from './components/JungleStudio';
import { ChefJungleAI } from './components/ChefJungleAI';
import { Footer } from './components/Footer';

const FinalCTA = () => {
  return (
    <section className="py-20 bg-black text-white text-center px-4 relative overflow-hidden">
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
       <div className="relative z-10 max-w-3xl mx-auto">
         <h2 className="text-5xl md:text-7xl font-display font-bold uppercase mb-8">
           Lleva la Jungla<br/>A Tu Mesa
         </h2>
         <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:order@chilijungle.com" className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Ordenar Ahora
            </a>
            <a href="#" className="px-8 py-4 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              Vender (B2B)
            </a>
         </div>
       </div>
    </section>
  )
}

const App: React.FC = () => {
  return (
    <RitualProvider>
      <div className="min-h-screen font-sans transition-colors duration-500 relative">
        <div 
          className="fixed inset-0 pointer-events-none z-[60] opacity-[0.04] mix-blend-overlay"
          style={{ filter: 'url(#noiseFilter)' }}
        ></div>

        <Header />
        <main>
          <Hero />
          <Marquee />
          <RitualCards />
          <ProductShowcase />
          <UseCases />
          <Origin />
          <JungleStudio />
          <ChefJungleAI />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </RitualProvider>
  );
};

export default App;