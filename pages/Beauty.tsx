import React from 'react';
import { MOCK_PRODUCTS, MOCK_ARTICLES } from '../constants';
import { Category } from '../types';
import { Star, Droplets, Sun, Sparkles } from 'lucide-react';

export const Beauty: React.FC = () => {
  const beautyArticles = MOCK_ARTICLES.filter(a => a.category === Category.BEAUTY);

  return (
    <div className="min-h-screen pt-20 bg-rose-50/30">
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
             <div className="absolute top-0 right-0 w-2/3 h-full bg-luxe-rose/20 rounded-l-full blur-[100px]"></div>
             <div className="absolute bottom-0 left-0 w-2/3 h-full bg-luxe-gold/10 rounded-r-full blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-luxe-rose-dark uppercase tracking-widest font-bold text-xs">
                    <Sparkles size={16} />
                    <span>The Beauty Lab</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-serif text-luxe-black leading-tight">
                    Radiance <br/>
                    <span className="italic text-luxe-rose-dark">Reimagined</span>.
                </h1>
                <p className="text-slate-600 max-w-md text-lg">
                    Clean formulas, scientific breakthroughs, and the art of self-care. Dive into our curated selection of beauty essentials.
                </p>
                <div className="flex gap-4 pt-4">
                    <button className="px-8 py-3 bg-luxe-black text-white rounded-full hover:bg-luxe-rose-dark transition-colors">Shop Skincare</button>
                    <button className="px-8 py-3 bg-white border border-gray-200 text-luxe-black rounded-full hover:border-luxe-black transition-colors">Read Reviews</button>
                </div>
            </div>
            <div className="relative">
                <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-full transform scale-90 translate-y-4"></div>
                <img 
                    src="https://picsum.photos/seed/beauty_hero/800/800" 
                    className="relative z-10 rounded-full w-[400px] h-[400px] md:w-[500px] md:h-[500px] object-cover mx-auto shadow-2xl ring-8 ring-white/50"
                />
                {/* Floating Product Cards */}
                <div className="absolute top-10 left-0 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-float">
                    <div className="bg-rose-100 p-2 rounded-full"><Droplets size={20} className="text-rose-500"/></div>
                    <div>
                        <p className="font-bold text-sm">Hydration Boost</p>
                        <p className="text-[10px] text-gray-500">+120% Moisture</p>
                    </div>
                </div>
                 <div className="absolute bottom-10 right-0 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-float" style={{animationDelay: '1.5s'}}>
                    <div className="bg-amber-100 p-2 rounded-full"><Sun size={20} className="text-amber-500"/></div>
                    <div>
                        <p className="font-bold text-sm">SPF Protection</p>
                        <p className="text-[10px] text-gray-500">UVA / UVB Shield</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Editor's Picks (Product Slider style) */}
      <section className="py-20 container mx-auto px-6">
         <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Curated Essentials</h2>
            <div className="w-16 h-1 bg-luxe-rose mx-auto"></div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group border border-rose-50">
                    <div className="relative aspect-square mb-6 overflow-hidden rounded-xl bg-gray-50">
                        <img src={product.imageUrl} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"/>
                        <button className="absolute bottom-3 right-3 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">+</button>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{product.brand}</p>
                        <h3 className="font-serif text-lg mb-2 text-luxe-black">{product.name}</h3>
                        <p className="text-luxe-rose-dark font-bold">{product.currency}{product.price}</p>
                    </div>
                </div>
            ))}
         </div>
      </section>

      {/* Beauty Journal */}
      <section className="bg-white py-24">
         <div className="container mx-auto px-6">
            <div className="flex items-center gap-4 mb-12">
                 <h2 className="text-4xl font-serif">The Journal</h2>
                 <div className="flex-grow h-[1px] bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {beautyArticles.map((article, idx) => (
                    <article key={article.id} className={`flex flex-col md:flex-row gap-8 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-full md:w-1/2 overflow-hidden rounded-lg shadow-md">
                            <img src={article.imageUrl} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"/>
                        </div>
                        <div className="w-full md:w-1/2 space-y-4">
                            <span className="text-xs font-bold text-luxe-rose-dark border border-luxe-rose-dark px-2 py-1 rounded-full uppercase">{article.category}</span>
                            <h3 className="text-2xl font-serif leading-tight hover:text-luxe-gold cursor-pointer transition-colors">{article.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{article.excerpt}</p>
                            <a href="#" className="text-xs font-bold uppercase border-b border-black pb-1 inline-block hover:text-luxe-rose-dark hover:border-luxe-rose-dark transition-colors">Read Technique</a>
                        </div>
                    </article>
                ))}
            </div>
         </div>
      </section>

    </div>
  );
};