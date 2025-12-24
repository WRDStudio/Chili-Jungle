import React, { useState } from 'react';
import { useRitual } from '../contexts/RitualContext';
import { Flame, QrCode, ImageOff, RefreshCw, Eye, EyeOff } from 'lucide-react';

export const ProductShowcase: React.FC = () => {
  const { mode } = useRitual();
  const [pathAttempts, setPathAttempts] = useState<Record<string, number>>({ tropical: 0, tropicalView: 0, classic: 0, classicView: 0 });
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [views, setViews] = useState<Record<string, 'front' | 'view'>>({ tropical: 'front', classic: 'front' });

  const getPaths = (file: string) => [`/images/${file}`, `images/${file}`, `/public/images/${file}`];

  const handleImgError = (key: string, file: string) => {
    const attempts = pathAttempts[key] || 0;
    const paths = getPaths(file);
    if (attempts < paths.length - 1) setPathAttempts(prev => ({ ...prev, [key]: attempts + 1 }));
    else setImgErrors(prev => ({ ...prev, [key]: true }));
  };

  const getPath = (key: string, file: string) => getPaths(file)[pathAttempts[key] || 0];

  return (
    <section id="products" className={`py-24 ${mode === 'luxe' ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-5xl font-display font-bold uppercase text-center mb-16 ${mode === 'luxe' ? 'text-cream' : 'text-ink'}`}>Nuestras Salsas</h2>
        <div className="grid gap-12">
          {['tropical', 'classic'].map((prod) => (
            <div key={prod} className="relative bg-neutral-100 rounded-3xl overflow-hidden grid lg:grid-cols-2">
               <div className="p-12 flex flex-col justify-center">
                  <h3 className="text-4xl font-display font-bold uppercase mb-4">{prod === 'tropical' ? 'Tropical Mix' : 'Classic Rojo'}</h3>
                  <p className="font-serif italic text-lg opacity-70 mb-8">La esencia pura de la jungla en un frasco.</p>
                  <div className="flex gap-2 mb-8">
                    {[1, 2, 3, 4].map(i => <Flame key={i} size={20} className="text-chili fill-chili" />)}
                  </div>
                  <div className="mt-auto flex items-center gap-4">
                     <QrCode size={40} className="opacity-30" />
                     <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Scan for recipes</span>
                  </div>
               </div>
               <div className="bg-neutral-200/50 p-12 flex flex-col items-center justify-center min-h-[400px] relative">
                  {imgErrors[prod] ? <div className="text-red-500 text-xs font-mono">Image Not Found</div> : (
                    <img 
                      src={getPath(prod, `bottle-${prod}${views[prod] === 'view' ? '-view' : ''}.png`)} 
                      className="h-80 object-contain drop-shadow-xl" 
                      onError={() => handleImgError(prod, `bottle-${prod}${views[prod] === 'view' ? '-view' : ''}.png`)} 
                    />
                  )}
                  <button 
                    onClick={() => setViews(v => ({ ...v, [prod]: v[prod] === 'front' ? 'view' : 'front' }))}
                    className="absolute bottom-6 flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full text-[10px] font-bold uppercase tracking-widest border border-black/10"
                  >
                    {views[prod] === 'front' ? <Eye size={14} /> : <EyeOff size={14} />}
                    {views[prod] === 'front' ? 'Ver Etiqueta' : 'Ver Botella'}
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};