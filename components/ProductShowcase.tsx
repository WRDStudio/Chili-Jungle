
import React from 'react';
import { useRitual } from '../contexts/RitualContext';
import { Flame, QrCode } from 'lucide-react';
import { Logo } from './Logo';

export const ProductShowcase: React.FC = () => {
  const { mode } = useRitual();

  // Dynamic overlay to simulate environmental lighting based on Ritual
  const getRitualOverlay = () => {
     if (mode === 'luxe') return 'bg-black/40 mix-blend-multiply'; // Night/Bar Vibe (Dims the label)
     if (mode === 'tropical') return 'bg-yellow-200/20 mix-blend-overlay'; // Bright Sunlight Vibe
     if (mode === 'classic') return 'bg-orange-500/20 mix-blend-soft-light'; // Warm Street Light Vibe
     return '';
  };

  return (
    <section id="products" className={`py-24 transition-colors duration-700 ${mode === 'luxe' ? 'bg-neutral-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
           <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">The Lineup</span>
           <h2 className={`text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter mt-2 ${mode === 'luxe' ? 'text-cream' : 'text-ink'}`}>Nuestras Salsas</h2>
        </div>

        <div className="space-y-20">
          
          {/* --- TROPICAL PRODUCT (White Label) --- */}
          <div className="relative w-full rounded-3xl shadow-2xl overflow-hidden border border-gray-200 group transition-all duration-500 hover:shadow-jungle/20">
             {/* Digital Label Background - Cream */}
             <div className="absolute inset-0 bg-[#FFF5E1]"></div>
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper.png')]"></div>
             
             {/* Ritual Atmosphere Overlay */}
             <div className={`absolute inset-0 z-0 transition-all duration-1000 pointer-events-none ${getRitualOverlay()}`}></div>
             
             <div className="relative z-10 grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-jungle/10">
                
                {/* LEFT: Ingredients & Origin */}
                <div className="p-8 flex flex-col justify-center text-jungle order-2 lg:order-1">
                   <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-chili mb-2">Ingredientes:</h4>
                   <p className="font-display text-xs leading-relaxed mb-6 uppercase tracking-wide font-bold opacity-90">
                     Aceite vegetal, especias aromatizantes, ajo, chile, jengibre, cilantro, cebollín y sal.
                   </p>
                   
                   <div className="mb-6">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-chili mb-1">Nivel de Picante:</h4>
                      <div className="flex gap-1">
                        {/* 4 Flames Filled */}
                        {[1,2,3,4].map(i => <Flame key={i} size={20} className="fill-chili stroke-chili stroke-2" />)}
                        {[5].map(i => <Flame key={i} size={20} className="fill-transparent stroke-chili/30 stroke-2" />)}
                      </div>
                   </div>

                   <div className="text-[10px] font-bold uppercase tracking-wider opacity-80 leading-tight">
                     <p>Hecho a mano, sin aditivos en</p>
                     <p className="text-chili font-black text-sm">Tamarindo, Costa Rica.</p>
                   </div>
                   <p className="text-[10px] mt-4 uppercase opacity-60 tracking-wide">Agitar antes de usar.<br/>Mantener en lugar fresco.</p>
                </div>

                {/* CENTER: Product Image */}
                <div className="p-8 flex items-center justify-center py-12 bg-[#FFF5E1]/50 relative overflow-hidden order-1 lg:order-2">
                   {/* Logo watermark behind bottle */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-10 scale-150">
                     <Logo variant="simple" />
                   </div>
                   
                   <div className="w-auto h-[400px] transform transition-transform hover:scale-105 duration-500 z-10 drop-shadow-xl">
                      <img 
                        src="/images/bottle-tropical.png" 
                        alt="Chili Jungle Tropical Bottle" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback to Logo if image is missing
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.classList.remove('drop-shadow-xl');
                          const logoDiv = document.createElement('div');
                          // We can't easily mount a react component here in vanilla JS callback, 
                          // so we just rely on the background logo or text if image fails.
                        }}
                      />
                      {/* Fallback display if image fails to load (simulated by hiding image and showing logo below via CSS if needed, but for now relying on empty state showing background) */}
                      <div className="absolute inset-0 flex items-center justify-center -z-10">
                         <Logo variant="full" className="w-48" />
                      </div>
                   </div>
                </div>

                {/* RIGHT: Description & QR */}
                <div className="p-8 flex flex-col justify-center text-jungle order-3">
                   <div className="mb-2 text-xs font-bold uppercase tracking-widest text-chili">Tropical Mix</div>
                   <p className="font-display font-bold text-xl uppercase leading-tight mb-4 text-jungle tracking-tight">
                     Una mezcla salvaje de chili oil, ajo, jengibre, especias y fuego tropical.
                   </p>
                   <p className="font-serif text-sm italic mb-8 opacity-80 leading-relaxed text-jungle/80">
                     Perfecto para noodles, tacos, carnes, arroz o lo que se te ocurra.
                   </p>

                   <div className="flex items-center gap-4 mt-auto">
                      <div className="bg-white p-2 rounded-lg border border-jungle/10">
                        <QrCode size={48} className="text-jungle" />
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider leading-tight opacity-80">
                        Escaneá el código para<br/>recetas, música y más!
                      </div>
                   </div>
                </div>

             </div>
          </div>


          {/* --- CLASSIC PRODUCT (Red/Orange Gradient Label) --- */}
          <div className="relative w-full rounded-3xl shadow-2xl overflow-hidden border border-orange-900/20 group transition-all duration-500 hover:shadow-chili/30">
             {/* Digital Label Background - Gradient representing the logo colors */}
             <div className="absolute inset-0 bg-gradient-to-br from-[#FFB347] via-[#E5812A] to-[#C7432A]"></div>
             <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

             {/* Ritual Atmosphere Overlay */}
             <div className={`absolute inset-0 z-0 transition-all duration-1000 pointer-events-none ${getRitualOverlay()}`}></div>
             
             <div className="relative z-10 grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/20 text-cream">
                
                {/* LEFT: Ingredients & Origin */}
                <div className="p-8 flex flex-col justify-center order-2 lg:order-1">
                   <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-2">Ingredientes:</h4>
                   <p className="font-display text-xs leading-relaxed mb-6 uppercase tracking-wide font-bold text-white/90">
                     Aceite vegetal, especias aromatizantes, ajo, chile, jengibre y sal.
                   </p>
                   
                   <div className="mb-6">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-1">Nivel de Picante:</h4>
                      <div className="flex gap-1">
                        {/* 4 Flames Filled */}
                        {[1,2,3,4].map(i => <Flame key={i} size={20} className="fill-white stroke-white stroke-2" />)}
                        {[5].map(i => <Flame key={i} size={20} className="fill-transparent stroke-white/40 stroke-2" />)}
                      </div>
                   </div>

                   <div className="text-[10px] font-bold uppercase tracking-wider opacity-90 leading-tight">
                     <p>Hecho a mano, sin aditivos en</p>
                     <p className="text-white font-black text-sm">Tamarindo, Costa Rica.</p>
                   </div>
                   <p className="text-[10px] mt-4 uppercase opacity-70 tracking-wide">Agitar antes de usar.<br/>Mantener en lugar fresco.</p>
                </div>

                {/* CENTER: Product Image */}
                <div className="p-8 flex items-center justify-center py-12 relative overflow-hidden order-1 lg:order-2">
                   {/* Subtle sunburst behind bottle */}
                   <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl scale-75"></div>
                   {/* Watermark Logo */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-10 scale-150 mix-blend-overlay">
                     <Logo variant="simple" lightMode={true} />
                   </div>
                   
                   <div className="w-auto h-[400px] transform transition-transform hover:scale-105 duration-500 drop-shadow-2xl z-10">
                      <img 
                        src="/images/bottle-classic.png" 
                        alt="Chili Jungle Classic Bottle" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                           e.currentTarget.style.display = 'none';
                        }}
                      />
                      {/* Fallback */}
                      <div className="absolute inset-0 flex items-center justify-center -z-10">
                         <Logo variant="full" lightMode={true} className="w-48" />
                      </div>
                   </div>
                </div>

                {/* RIGHT: Description & QR */}
                <div className="p-8 flex flex-col justify-center order-3">
                   <div className="mb-2 text-xs font-bold uppercase tracking-widest text-white">Original Recipe</div>
                   <p className="font-display font-bold text-xl uppercase leading-tight mb-4 text-white drop-shadow-sm tracking-tight">
                     La receta original. Chili oil, ajo, jengibre y un golpe de calor.
                   </p>
                   <p className="font-serif text-sm italic mb-8 text-white/90 leading-relaxed">
                     Perfecto para pizza, huevos, parrilla o lo que se te ocurra.
                   </p>

                   <div className="flex items-center gap-4 mt-auto">
                      <div className="bg-white p-2 rounded-lg shadow-lg">
                        <QrCode size={48} className="text-ink" />
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider leading-tight opacity-90">
                        Escaneá el código para<br/>recetas, música y más!
                      </div>
                   </div>
                </div>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
