import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

const products: Product[] = [
  {
    id: 'tropical',
    name: 'Chili Jungle Tropical',
    description: 'Una mezcla salvaje de chili oil, ajo, jengibre, especias y fuego tropical. Perfecto para noodles, tacos, carnes, arroz o lo que se te ocurra.',
    price: 15.00,
    heatLevel: 4, 
    imageUrl: '/images/bottle-tropical.webp',
    tags: ['Cilantro', 'Cebollín', 'Fresco'],
    mode: 'tropical',
    ingredients: 'Aceite vegetal, especias aromatizantes, ajo, chile, jengibre, cilantro, cebollín y sal.'
  },
  {
    id: 'classic',
    name: 'Chili Jungle Clásico',
    description: 'La receta original. Una mezcla salvaje de chili oil, ajo, jengibre, especias y fuego tropical. Perfecto para noodles, tacos, carnes, arroz o lo que se te ocurra.',
    price: 15.00,
    heatLevel: 4, 
    imageUrl: '/images/bottle-classic.webp', 
    tags: ['Original', 'Fuego', 'Intenso'],
    mode: 'classic',
    ingredients: 'Aceite vegetal, especias aromatizantes, ajo, chile, jengibre y sal.'
  }
];

interface ProductListProps {
  onOpenOrder?: (product: 'classic' | 'tropical', source?: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ onOpenOrder }) => {
  return (
    <section id="shop" className="hidden py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-600 font-bold tracking-[0.3em] uppercase text-xs mb-3">La Colección</h2>
          <h3 className="text-5xl font-display font-bold tracking-tight text-gray-900 mb-6">Elige tu Nivel</h3>
          <p className="text-gray-600 font-serif text-lg leading-relaxed">
            Hecho a mano, sin aditivos en Tamarindo, Costa Rica. Agitar antes de usar, mantener en lugar fresco.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onOpenOrder={() => onOpenOrder && onOpenOrder(product.id as 'classic' | 'tropical', `product_list_${product.id}`)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};