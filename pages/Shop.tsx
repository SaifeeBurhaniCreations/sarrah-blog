import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Button } from '../components/ui/Button';
import { useShop } from '../context/ShopContext';
import { ShoppingCart, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Shop: React.FC = () => {
  const { addToCart } = useShop();
  const [activeBrand, setActiveBrand] = useState('All');

  const brands = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.brand)))];
  const filteredProducts = activeBrand === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.brand === activeBrand);

  return (
    <div className="min-h-screen pt-24 bg-white">
      <div className="bg-luxe-cream py-16 px-6 mb-12 border-b border-luxe-gold/10">
        <div className="container mx-auto">
            <h1 className="text-5xl font-serif text-luxe-black mb-4">The Boutique</h1>
            <p className="text-slate-600 max-w-xl">Curated luxury items selected for the discerning individual.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 pb-24">
         {/* Sidebar / Filters */}
         <aside className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 sticky top-24">
                <div className="flex items-center gap-2 mb-6 text-luxe-black">
                    <Filter size={18} />
                    <h3 className="font-bold uppercase tracking-widest text-xs">Filter By Brand</h3>
                </div>
                <ul className="space-y-3">
                    {brands.map(brand => (
                        <li key={brand}>
                            <button 
                                onClick={() => setActiveBrand(brand)}
                                className={`text-sm transition-colors ${activeBrand === brand ? 'text-luxe-gold font-bold pl-2 border-l-2 border-luxe-gold' : 'text-slate-500 hover:text-black'}`}
                            >
                                {brand}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
         </aside>

         {/* Grid */}
         <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
                <div key={product.id} className="group flex flex-col">
                    <div className="relative overflow-hidden mb-4 bg-gray-50 aspect-[4/5] rounded-lg">
                         <Link to={`/products/${product.id}`}>
                            <img 
                                src={product.imageUrl} 
                                alt={product.name}
                                className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                            />
                         </Link>
                         <button 
                            onClick={() => addToCart(product)}
                            className="absolute bottom-4 right-4 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-luxe-black hover:bg-luxe-gold hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 duration-300"
                         >
                            <ShoppingCart size={18} />
                         </button>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{product.brand}</span>
                        <Link to={`/products/${product.id}`}>
                            <h3 className="font-serif text-xl mt-1 mb-2 hover:text-luxe-gold transition-colors">{product.name}</h3>
                        </Link>
                        <span className="font-bold text-luxe-charcoal">{product.currency}{product.price}</span>
                    </div>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
};