import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

const products: Product[] = [
  {
    id: '1',
    name: 'Original Szechuan',
    description: 'The classic that started it all. A balanced blend of numbing Szechuan peppercorns, star anise, and roasted chili flakes.',
    price: 14.99,
    heatLevel: 3,
    imageUrl: 'https://picsum.photos/seed/chilioil1/600/600',
    tags: ['Best Seller', 'Classic'],
    mode: 'classic'
  },
  {
    id: '2',
    name: 'Garlic Crunch Reserve',
    description: 'For the garlic lovers. We doubled the fried garlic content and added shallots for an insane crunch that enhances any dish.',
    price: 16.99,
    heatLevel: 2,
    imageUrl: 'https://picsum.photos/seed/garliccrisp/600/600',
    tags: ['Extra Crunchy', 'Savory'],
    mode: 'luxe'
  },
  {
    id: '3',
    name: 'Ghost Pepper Inferno',
    description: 'Not for the faint of heart. Infused with smoked Ghost Peppers for a deep, lingering burn that builds with every bite.',
    price: 18.99,
    heatLevel: 5,
    imageUrl: 'https://picsum.photos/seed/ghostpepper/600/600',
    tags: ['Extremely Hot', 'Smoky'],
    mode: 'all'
  }
];

export const ProductList: React.FC = () => {
  return (
    <section id="shop" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-3">The Collection</h2>
          <h3 className="text-4xl font-serif font-bold text-gray-900 mb-6">Select Your Heat</h3>
          <p className="text-gray-600 text-lg">
            Every jar is handmade in small batches using premium non-GMO oil and authentic spices sourced directly from Sichuan province.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};