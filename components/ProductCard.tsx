import React from 'react';
import { Product } from '../types';
import { Flame, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-xl shadow-gray-200 overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
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
               className={i < product.heatLevel ? "text-brand-600 fill-brand-600" : "text-gray-300"} 
             />
           ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {product.tags.map(tag => (
            <span key={tag} className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button className="flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-brand-600 transition-colors font-medium text-sm">
            <ShoppingCart size={16} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};