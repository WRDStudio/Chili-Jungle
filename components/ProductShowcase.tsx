import React from 'react';
import { useRitual } from '../contexts/RitualContext';
import { Flame, Droplets } from 'lucide-react';

export const ProductShowcase: React.FC = () => {
  const { theme, mode } = useRitual();

  return (
    <section id="products" className={`py-24 ${mode === 'luxe' ? 'bg-neutral-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* CLASICO CARD */}
          <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100 group hover:shadow-2xl transition-all">
             <div className="aspect-[4/3] bg-red-50 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-transparent"></div>
                <img src="https://picsum.photos/seed/redbottle/800/800" alt="Clásico" className="h-3/4 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500" />
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase rounded">Etiqueta Roja</div>
             </div>
             <div className="p-8">
                <h3 className="text-3xl font-display font-bold text-gray-900 mb-2">Chili Jungle Clásico</h3>
                <p className="text-gray-500 font-serif italic mb-4">"Calor clásico, sabor redondo."</p>
                
                <div className="flex items-center gap-1 mb-6">
                  {[1,2,3,4].map(i => <Flame key={i} size={16} className="fill-red-500 text-red-500" />)}
                  <Flame size={16} className="text-gray-300" />
                  <span className="text-xs font-bold text-gray-400 ml-2 uppercase">Heat 4/5</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                   {['Pizza', 'Huevos', 'Arroces', 'Carnes'].map(tag => (
                     <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded">{tag}</span>
                   ))}
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-gray-900 text-white py-3 font-bold uppercase text-sm tracking-wider hover:bg-red-600 transition-colors">
                    Ver Ficha
                  </button>
                  <button className="flex-1 border border-gray-200 text-gray-900 py-3 font-bold uppercase text-sm tracking-wider hover:bg-gray-50 transition-colors">
                    Shop
                  </button>
                </div>
             </div>
          </div>

          {/* TROPICAL CARD */}
          <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100 group hover:shadow-2xl transition-all">
             <div className="aspect-[4/3] bg-tropical-cream relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-bl from-tropical-mango/20 to-transparent"></div>
                <img src="https://picsum.photos/seed/whitebottle/800/800" alt="Tropical" className="h-3/4 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500" />
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-tropical-teal text-white px-3 py-1 text-xs font-bold uppercase rounded">Etiqueta Blanca</div>
             </div>
             <div className="p-8">
                <h3 className="text-3xl font-display font-bold text-gray-900 mb-2">Chili Jungle Tropical</h3>
                <p className="text-gray-500 font-serif italic mb-4">"Brillo tropical, balance perfecto."</p>
                
                <div className="flex items-center gap-1 mb-6">
                  {[1,2,3,4].map(i => <Flame key={i} size={16} className="fill-tropical-mango text-tropical-mango" />)}
                  <Flame size={16} className="text-gray-300" />
                  <span className="text-xs font-bold text-gray-400 ml-2 uppercase">Heat 4/5</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                   {['Ceviche', 'Ensaladas', 'Bowls', 'Pescado'].map(tag => (
                     <span key={tag} className="px-2 py-1 bg-tropical-cream text-tropical-teal text-xs font-bold uppercase rounded">{tag}</span>
                   ))}
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-gray-900 text-white py-3 font-bold uppercase text-sm tracking-wider hover:bg-tropical-teal transition-colors">
                    Ver Ficha
                  </button>
                  <button className="flex-1 border border-gray-200 text-gray-900 py-3 font-bold uppercase text-sm tracking-wider hover:bg-gray-50 transition-colors">
                    Shop
                  </button>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};