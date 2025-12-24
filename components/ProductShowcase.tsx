import React, { useState } from 'react';
import { useRitual } from '../contexts/RitualContext';
import { Flame, QrCode, ImageOff, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { Logo } from './Logo';

export const ProductShowcase: React.FC = () => {
  const { mode } = useRitual();
  
  // Track current attempt index for each image key
  const [pathAttempts, setPathAttempts] = useState<Record<string, number>>({
    tropical: 0,
    tropicalView: 0,
    classic: 0,
    classicView: 0
  });

  // Track final failure state
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({
    tropical: false,
    tropicalView: false,
    classic: false,
    classicView: false
  });

  const [productViews, setProductViews] = useState({
    tropical: 'front' as 'front' | 'view',
    classic: 'front' as 'front' | 'view'
  });

  const getPaths = (filename: string) => [
    `/images/${filename}`,
    `images/${filename}`,
    `/public/images/${filename}`,
    `public/images/${filename}`
  ];

  const handleImgError = (key: string, filename: string) => {
    const availablePaths = getPaths(filename);
    const currentAttempt = pathAttempts[key];

    if (currentAttempt < availablePaths.length - 1) {
      setPathAttempts(prev => ({ ...prev, [key]: currentAttempt + 1 }));
    } else {
      setImgErrors(prev => ({ ...prev, [key]: true }));
    }
  };

  const getImagePath = (key: string, filename: string) => {
    const availablePaths = getPaths(filename);
    return availablePaths[pathAttempts[key]] || availablePaths[0];
  };

  const toggleView = (product: 'tropical' | 'classic') => {
    setProductViews(prev => ({
      ...prev,
      [product]: prev[product] === 'front' ? 'view' : 'front'
    }));
  };

  const resetError = (key: string) => {
    setImgErrors(prev => ({ ...prev, [key]: false }));
    setPathAttempts(prev => ({ ...prev, [key]: 0 }));
  };

  const getLoadingError = (key: string, fileName: string) => (
    <div className="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-red-300 rounded-xl bg-red-50 h-full w-full mx-auto z-50 relative">
      <ImageOff className="w-8 h-8 text-red-400 mb-3" />
      <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-2">IMAGE NOT FOUND</p>
      <div className="text-[8px] font-mono text-gray-500 mb-4 text-left w-full bg-white/50 p-2 rounded border border-red-100">
        Tried paths:<br/>
        {getPaths(fileName).map((p, i) => (
          <div key={i} className={i === pathAttempts[key] ? "text-red-600 font-bold" : ""}>• {p}</div>
        ))}
      </div>
      <button 
        onClick={() => resetError(key)}
        className="flex items-center gap-2 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all"
      >
        <RefreshCw size={10} /> Retry Load
      </button>
    </div>
  );

  return (
    <section id="products" className={`py-24 transition-colors duration-700 ${mode === 'luxe' ? 'bg-neutral-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">The Lineup</span>
           <h2 className={`text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter mt-2 ${mode === 'luxe' ? 'text-cream' : 'text-ink'}`}>Nuestras Salsas</h2>
        </div>

        <div className="space-y-20">
          {/* TROPICAL PRODUCT */}
          <div className="relative w-full rounded-3xl shadow-2xl overflow-hidden border border-gray-200 group transition-all duration-500 hover:shadow-jungle/20">
             <div className="absolute inset-0 bg-[#FFF5E1]"></div>
             <div className="relative z-10 grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-jungle/10">
                <div className="p-8 flex flex-col justify-center text-jungle order-2 lg:order-1">
                   <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-chili mb-2">Ingredientes:</h4>
                   <p className="font-display text-xs leading-relaxed mb-6 uppercase tracking-wide font-bold opacity-90">
                     Aceite vegetal, especias aromatizantes, ajo, chile, jengibre, cilantro, cebollín y sal.
                   </p>
                   <div className="mb-6">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-chili mb-1">Nivel de Picante:</h4>
                      <div className="flex gap-1">
                        {[1,2,3,4].map(i => <Flame key={i} size={20} className="fill-chili stroke-chili" />)}
                      </div>
                   </div>
                </div>

                <div className="p-8 flex flex-col items-center justify-center py-12 bg-[#FFF5E1]/50 relative min-h-[400px] order-1 lg:order-2">
                   <div className="relative z-10 w-full h-[320px] lg:h-[380px] flex items-center justify-center">
                      {productViews.tropical === 'front' ? (
                        imgErrors.tropical ? getLoadingError('tropical', 'bottle-tropical.png') : (
                          <img 
                            src={getImagePath('tropical', 'bottle-tropical.png')}
                            alt="Tropical Jar" 
                            className="h-full object-contain mx-auto transition-transform duration-500 hover:scale-105"
                            onError={() => handleImgError('tropical', 'bottle-tropical.png')}
                          />
                        )
                      ) : (
                        imgErrors.tropicalView ? getLoadingError('tropicalView', 'bottle-tropical-view.png') : (
                          <img 
                            src={getImagePath('tropicalView', 'bottle-tropical-view.png')}
                            alt="Tropical Views" 
                            className="w-full h-full object-contain mx-auto"
                            onError={() => handleImgError('tropicalView', 'bottle-tropical-view.png')}
                          />
                        )
                      )}
                   </div>
                   <button onClick={() => toggleView('tropical')} className="absolute bottom-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-sm border border-jungle/10 text-jungle hover:bg-white transition-all">
                     {productViews.tropical === 'front' ? <Eye size={16} /> : <EyeOff size={16} />}
                     <span className="text-[10px] font-bold uppercase tracking-widest">
                       {productViews.tropical === 'front' ? 'Ver Etiqueta' : 'Ver Botella'}
                     </span>
                   </button>
                </div>

                <div className="p-8 flex flex-col justify-center text-jungle order-3">
                   <p className="font-display font-bold text-xl uppercase mb-4 tracking-tight">Tropical Mix: Una mezcla salvaje.</p>
                   <p className="font-serif text-sm italic opacity-80 mb-8">Perfecto para ceviches, tacos y bowls.</p>
                   <div className="flex items-center gap-4 mt-auto">
                      <QrCode size={40} className="opacity-50" />
                      <div className="text-[9px] font-bold uppercase tracking-widest opacity-60">Scan for recipes</div>
                   </div>
                </div>
             </div>
          </div>

          {/* CLASSIC PRODUCT */}
          <div className="relative w-full rounded-3xl shadow-2xl overflow-hidden border border-orange-900/20 group transition-all duration-500 hover:shadow-chili/30">
             <div className="absolute inset-0 bg-gradient-to-br from-[#FFB347] via-[#E5812A] to-[#C7432A]"></div>
             <div className="relative z-10 grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/20 text-cream">
                <div className="p-8 flex flex-col justify-center order-2 lg:order-1">
                   <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Ingredientes:</h4>
                   <p className="font-display text-xs leading-relaxed mb-6 uppercase tracking-wide font-bold opacity-90">
                     Aceite vegetal, especias aromatizantes, ajo, chile, jengibre y sal.
                   </p>
                </div>

                <div className="p-8 flex flex-col items-center justify-center py-12 relative min-h-[400px] order-1 lg:order-2">
                   <div className="relative z-10 w-full h-[320px] lg:h-[380px] flex items-center justify-center">
                      {productViews.classic === 'front' ? (
                        imgErrors.classic ? getLoadingError('classic', 'bottle-classic.png') : (
                          <img 
                            src={getImagePath('classic', 'bottle-classic.png')}
                            alt="Classic Jar" 
                            className="h-full object-contain mx-auto transition-transform duration-500 hover:scale-105"
                            onError={() => handleImgError('classic', 'bottle-classic.png')}
                          />
                        )
                      ) : (
                        imgErrors.classicView ? getLoadingError('classicView', 'bottle-classic-view.png') : (
                          <img 
                            src={getImagePath('classicView', 'bottle-classic-view.png')}
                            alt="Classic Views" 
                            className="w-full h-full object-contain mx-auto"
                            onError={() => handleImgError('classicView', 'bottle-classic-view.png')}
                          />
                        )
                      )}
                   </div>
                   <button onClick={() => toggleView('classic')} className="absolute bottom-6 z-20 flex items-center gap-2 px-4 py-2 bg-black/40 rounded-full shadow-lg border border-white/20 text-cream hover:bg-black/60 transition-all">
                     {productViews.classic === 'front' ? <Eye size={16} /> : <EyeOff size={16} />}
                     <span className="text-[10px] font-bold uppercase tracking-widest">
                       {productViews.classic === 'front' ? 'Ver Etiqueta' : 'Ver Botella'}
                     </span>
                   </button>
                </div>

                <div className="p-8 flex flex-col justify-center order-3">
                   <p className="font-display font-bold text-xl uppercase mb-4 tracking-tight">Classic Rojo: La receta original.</p>
                   <p className="font-serif text-sm italic opacity-80 mb-8">Pizza, huevos y carnes.</p>
                   <div className="flex items-center gap-4 mt-auto">
                      <QrCode size={40} className="opacity-50" />
                      <div className="text-[9px] font-bold uppercase tracking-widest opacity-60">Scan for vibes</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};