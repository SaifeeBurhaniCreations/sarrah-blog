import React from 'react';
import { MOCK_ARTICLES } from '../constants';
import { Category } from '../types';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Fashion: React.FC = () => {
  const fashionArticles = MOCK_ARTICLES.filter(a => a.category === Category.FASHION || a.category === Category.RUNWAY);
  const featured = fashionArticles[0];
  const gridItems = fashionArticles.slice(1);

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Editorial Header */}
      <header className="relative py-24 px-6 overflow-hidden bg-luxe-charcoal text-white">
          <div className="absolute inset-0 opacity-30">
              <img src="https://picsum.photos/seed/fashion_header/1600/600" className="w-full h-full object-cover grayscale" />
          </div>
          <div className="relative z-10 container mx-auto text-center">
              <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-[10px] tracking-[0.3em] uppercase mb-4 backdrop-blur-md">The Collection</span>
              <h1 className="text-6xl md:text-9xl font-serif font-bold tracking-tighter mb-6 mix-blend-overlay">RUNWAY</h1>
              <p className="max-w-2xl mx-auto text-gray-300 font-serif italic text-2xl">"Style is a way to say who you are without having to speak."</p>
          </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        
        {/* Featured Story */}
        {featured && (
            <section className="mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative group perspective-1000">
                         <div className="absolute -inset-4 border-2 border-luxe-black rounded-lg transform translate-x-2 translate-y-2 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500"></div>
                         <img 
                            src={featured.imageUrl} 
                            alt={featured.title} 
                            className="w-full h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl relative z-10"
                         />
                         <div className="absolute bottom-8 left-8 z-20 bg-white p-6 shadow-xl max-w-xs transform group-hover:-translate-y-2 transition-transform">
                             <span className="text-xs font-bold uppercase tracking-widest text-luxe-gold mb-2 block">Cover Story</span>
                             <p className="font-serif text-2xl leading-tight">{featured.title}</p>
                         </div>
                    </div>
                    <div className="space-y-8 pl-0 lg:pl-12">
                        <h2 className="text-5xl font-serif leading-none">
                            The <br/> Architecture <br/> <span className="text-luxe-gold italic">of</span> Style
                        </h2>
                        <div className="w-24 h-1 bg-luxe-black"></div>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            {featured.excerpt} This season, we explore the structural boundaries of modern couture. From rigid corsetry reimagined for the 21st century to fluid drapes that defy gravity, fashion is claiming its space in the physical world.
                        </p>
                        <div className="flex gap-4 items-center">
                            <span className="text-xs font-bold uppercase tracking-widest">Read Full Story</span>
                            <div className="w-12 h-[1px] bg-black"></div>
                        </div>
                    </div>
                </div>
            </section>
        )}

        {/* Magazine Grid */}
        <section className="relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-luxe-gold/10 rounded-full blur-3xl -z-10"></div>
            <div className="flex justify-between items-end mb-12 border-b border-black pb-4">
                <h3 className="text-4xl font-serif">Trending Reports</h3>
                <span className="text-xs font-bold uppercase">Fall / Winter 2024</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Column 1: Vertical List */}
                <div className="space-y-12 md:col-span-1">
                    {gridItems.map((article) => (
                        <div key={article.id} className="group cursor-pointer">
                            <div className="overflow-hidden mb-4 relative">
                                <img src={article.imageUrl} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"/>
                                <div className="absolute top-2 right-2 bg-white text-xs font-bold px-2 py-1 uppercase">{article.category}</div>
                            </div>
                            <h4 className="text-xl font-serif mb-2 group-hover:text-luxe-gold transition-colors">{article.title}</h4>
                            <p className="text-xs text-slate-500 uppercase tracking-widest">{article.date} • {article.author}</p>
                        </div>
                    ))}
                </div>

                {/* Column 2 & 3: Big visual blocks */}
                <div className="md:col-span-2 grid grid-cols-2 gap-4 bg-luxe-cream p-8">
                     <div className="col-span-2 mb-4 text-center">
                        <span className="text-luxe-gold text-4xl mb-2 block"><Zap size={40} className="mx-auto" /></span>
                        <h4 className="text-3xl font-serif italic">"Fashion Fades, Style is Eternal"</h4>
                     </div>
                     <div className="bg-white p-6 shadow-sm hover:shadow-lg transition-shadow">
                        <span className="text-4xl font-serif text-gray-200 font-bold -mb-4 block">01</span>
                        <h5 className="font-bold uppercase tracking-wide mb-2">Color Theory</h5>
                        <p className="text-sm text-slate-600">Why red is dominating the visual landscape this year.</p>
                     </div>
                     <div className="bg-luxe-black text-white p-6 shadow-sm hover:shadow-lg transition-shadow">
                        <span className="text-4xl font-serif text-gray-700 font-bold -mb-4 block">02</span>
                        <h5 className="font-bold uppercase tracking-wide mb-2">Silhouette</h5>
                        <p className="text-sm text-gray-400">The return of the power shoulder and what it means.</p>
                     </div>
                     <div className="col-span-2 mt-8 text-center">
                        <Button variant="outline">Load More Reports</Button>
                     </div>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
};