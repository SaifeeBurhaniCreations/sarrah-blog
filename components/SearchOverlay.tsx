import React, { useState, useEffect, useRef } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { MOCK_ARTICLES, MOCK_PRODUCTS } from '../constants';
import { Link } from 'react-router-dom';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Simple filtering
  const filteredArticles = MOCK_ARTICLES.filter(a => a.title.toLowerCase().includes(query.toLowerCase())).slice(0, 3);
  const filteredProducts = MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3);
  
  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-xl z-[80] animate-fade-in flex flex-col">
      <div className="container mx-auto px-6 pt-12">
        <div className="flex justify-end mb-8">
           <button onClick={() => setIsSearchOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-luxe-gold hover:text-white transition-colors">
              <X size={24} />
           </button>
        </div>
        
        <div className="relative max-w-4xl mx-auto mb-16">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={32} />
            <input 
              ref={inputRef}
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, brands, products..." 
              className="w-full text-4xl md:text-6xl font-serif border-b-2 border-gray-200 py-4 pl-12 focus:outline-none focus:border-luxe-black bg-transparent placeholder-gray-300"
            />
        </div>

        {query && (
            <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in-up">
                
                {/* Articles Results */}
                <div>
                   <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Editorials</h3>
                   {filteredArticles.length > 0 ? (
                       <div className="space-y-6">
                           {filteredArticles.map(article => (
                               <Link to="/" key={article.id} onClick={() => setIsSearchOpen(false)} className="flex gap-4 group cursor-pointer">
                                   <div className="w-20 h-20 overflow-hidden rounded">
                                       <img src={article.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                   </div>
                                   <div>
                                       <h4 className="font-serif text-xl group-hover:text-luxe-gold transition-colors">{article.title}</h4>
                                       <p className="text-xs text-gray-500 mt-1">{article.date}</p>
                                   </div>
                               </Link>
                           ))}
                       </div>
                   ) : <p className="text-gray-400 italic">No stories found.</p>}
                </div>

                {/* Products Results */}
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Collection</h3>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                             {filteredProducts.map(product => (
                                 <div key={product.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-white">
                                     <img src={product.imageUrl} className="w-16 h-16 object-cover rounded mix-blend-multiply" />
                                     <div className="flex-1">
                                         <p className="text-[10px] font-bold uppercase text-slate-400">{product.brand}</p>
                                         <h4 className="font-serif text-lg">{product.name}</h4>
                                     </div>
                                     <span className="font-bold text-luxe-gold">{product.currency}{product.price}</span>
                                 </div>
                             ))}
                        </div>
                    ) : <p className="text-gray-400 italic">No products found.</p>}
                </div>
            </div>
        )}

        {!query && (
            <div className="text-center text-gray-400 mt-12">
                <p className="text-sm uppercase tracking-widest mb-4">Trending Now</p>
                <div className="flex flex-wrap justify-center gap-4">
                    {['Summer Skincare', 'Paris Fashion Week', 'Sustainable Denim', 'Gold Jewellery', 'Dior'].map(tag => (
                        <button key={tag} onClick={() => setQuery(tag)} className="px-6 py-2 border border-gray-200 rounded-full hover:border-luxe-black hover:text-black transition-colors text-lg font-serif">
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};