
import React from 'react';
import { Product } from '../types';
import { Flame, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-xl shadow-gray-200 overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full">
      {/* Image */}
      <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        {/* Heat Level Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 flex items-center gap-1 shadow-sm border border-gray-100">
           {Array.from({ length: 5 }).map((_, i) => (
             <Flame 
               key={i} 
               size={14} 
               className={i < product.heatLevel ? "text-chili fill-chili" : "text-gray-300"} 
             />
           ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {product.tags.map(tag => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-[0.15em] text-jungle bg-cream px-2 py-1 rounded-md border border-jungle/10">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-2xl font-display font-bold tracking-tight text-ink mb-2 group-hover:text-chili transition-colors">
          {product.name}
        </h3>
        
        <div className="mb-4 flex-grow">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">Ingredientes</p>
            <p className="text-sm font-serif text-gray-600 leading-relaxed italic">
              {product.ingredients}
            </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-lg font-bold text-ink tracking-tight">${product.price.toFixed(2)}</span>
          <button className="flex items-center justify-center gap-2 bg-ink text-cream px-4 py-2.5 rounded-lg hover:bg-chili transition-colors font-bold text-xs uppercase tracking-[0.15em]">
            <ShoppingCart size={16} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
