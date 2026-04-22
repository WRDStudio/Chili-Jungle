import React from 'react';
import { useRitual } from '../contexts/RitualContext';
import { Flame } from 'lucide-react';

interface ProductShowcaseProps {
  onOpenOrder: (product: 'classic' | 'tropical', source?: string) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onOpenOrder }) => {
  const { theme } = useRitual();

  const products = [
    {
      id: 'classic',
      name: 'Clásico',
      hook: 'Prueba el fuego.',
      img: '/images/bottle-classic.webp',
      desc: 'Una mezcla salvaje de chili oil, ajo, jengibre y fuego.',
      ingredients: 'Aceite vegetal, especias, ajo, chile, jengibre y sal.',
      heat: 4,
      bg: 'bg-gradient-to-br from-[#E5812A] to-[#C7432A]',
      text: 'text-cream',
    },
    {
      id: 'tropical',
      name: 'Tropical',
      hook: 'Lleva el sabor a otro nivel.',
      img: '/images/bottle-tropical.webp',
      desc: 'Una mezcla salvaje de chili oil, ajo, jengibre, cilantro, cebollín y fuego tropical.',
      ingredients: 'Aceite vegetal, especias, ajo, chile, jengibre, cilantro, cebollín y sal.',
      heat: 3,
      bg: 'bg-[#FDF6E3] border border-[#1F4E33]/10',
      text: 'text-[#1F4E33]',
    }
  ];

  return (
    <section id="products" className={`py-24 ${theme.bg} transition-colors duration-700 scroll-mt-20 md:scroll-mt-28 lg:scroll-mt-36`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-4xl md:text-5xl font-display uppercase text-center mb-16 tracking-tighter ${theme.text}`}>Nuestras Salsas</h2>
        
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {products.map((prod) => (
            <div 
              key={prod.id} 
              className={`rounded-3xl overflow-hidden shadow-2xl ${prod.bg} p-8 md:p-12 transition-transform hover:scale-[1.02] flex flex-col`}
            >
              {/* Header: Name & Heat */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start mb-6 gap-4">
                 <div>
                   <h3 className={`text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-tighter ${prod.text}`}>
                     {prod.name}
                   </h3>
                   <p className={`font-serif font-bold italic tracking-wide mt-3 text-lg sm:text-xl opacity-90 ${prod.text}`}>
                     {prod.hook}
                   </p>
                 </div>
                 <div className="flex gap-1 mt-2 sm:mt-0" title={`Nivel de Picante: ${prod.heat}/5`}>
                   {[1, 2, 3, 4, 5].map(i => (
                     <Flame 
                       key={i} 
                       size={24} 
                       className={`${prod.text} ${i <= prod.heat ? 'fill-current' : 'opacity-30'} drop-shadow-sm w-5 h-5 sm:w-6 sm:h-6`} 
                       strokeWidth={2.5} 
                     />
                   ))}
                 </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8 flex-grow">
                 {/* Product Image */}
                 <div className="relative flex justify-center items-center h-[300px] md:h-[400px] order-1 sm:order-2">
                   <img src={prod.img} alt={prod.name} className="w-full h-full object-contain drop-shadow-2xl" />
                 </div>

                 {/* Information */}
                 <div className="flex flex-col gap-6 justify-center order-2 sm:order-1">
                   <p className={`font-serif italic text-lg md:text-xl opacity-90 ${prod.text}`}>
                     "{prod.desc}"
                   </p>
                   
                   <div>
                     <span className={`block text-xs font-bold uppercase tracking-widest opacity-60 mb-2 ${prod.text}`}>
                       Ingredientes
                     </span>
                     <p className={`text-sm md:text-base font-medium leading-snug ${prod.text}`}>
                       {prod.ingredients}
                     </p>
                   </div>
                   
                   <div className="mt-auto pt-6 flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                     <button
                       onClick={() => onOpenOrder(prod.id as 'classic' | 'tropical', `product_showcase_${prod.id === 'classic' ? 'clasico' : 'tropical'}`)}
                       className={`w-full sm:w-auto text-center px-6 py-3 md:py-4 rounded-xl font-bold uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-lg ${prod.id === 'classic' ? 'bg-[#C7432A] text-white hover:bg-black' : 'bg-[#1F4E33] text-white hover:bg-mango'}`}
                     >
                       Ordenar Ahora
                     </button>
                     <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full border overflow-hidden ${prod.id === 'classic' ? 'border-cream/30' : 'border-[#1F4E33]/20'} flex-shrink-0`} title="Hecho en Costa Rica">
                       <img src="/images/costa_rica_flag_round.svg" className="absolute inset-0 w-full h-full object-cover scale-[1.05]" alt="Hecho en Costa Rica" /> 
                     </div>
                   </div>
                 </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};