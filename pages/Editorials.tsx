import React, { useState } from 'react';
import { MOCK_ARTICLES } from '../constants';
import { Category } from '../types';
import { Button } from '../components/ui/Button';

export const Editorials: React.FC = () => {
  const [filter, setFilter] = useState<Category | 'All'>('All');

  const filteredArticles = filter === 'All' 
    ? MOCK_ARTICLES 
    : MOCK_ARTICLES.filter(a => a.category === filter);

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="bg-luxe-cream py-20 px-6 text-center border-b border-gray-100">
          <h1 className="text-5xl md:text-7xl font-serif text-luxe-black mb-6">The Journal</h1>
          <p className="max-w-2xl mx-auto text-slate-600 text-lg leading-relaxed">
              In-depth stories, interviews, and reports from the world of high fashion and beauty.
          </p>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[80px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 overflow-x-auto">
          <div className="container mx-auto px-6 flex justify-center gap-2 md:gap-4 min-w-max">
             <button 
                onClick={() => setFilter('All')}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === 'All' ? 'bg-luxe-black text-white' : 'bg-transparent text-gray-500 hover:text-black'}`}
             >
                All Stories
             </button>
             {Object.values(Category).map(cat => (
                 <button 
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === cat ? 'bg-luxe-black text-white' : 'bg-transparent text-gray-500 hover:text-black'}`}
                 >
                    {cat}
                 </button>
             ))}
          </div>
      </div>

      <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {filteredArticles.map((article) => (
                  <article key={article.id} className="group cursor-pointer flex flex-col h-full">
                      <div className="relative overflow-hidden mb-6 aspect-[4/3]">
                          <img 
                            src={article.imageUrl} 
                            alt={article.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-4 left-4">
                              <span className="bg-white text-luxe-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                                  {article.category}
                              </span>
                          </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                          <div className="flex items-center gap-3 text-xs text-gray-400 uppercase tracking-widest mb-3">
                              <span>{article.date}</span>
                              <span className="w-1 h-1 bg-luxe-gold rounded-full"></span>
                              <span>{article.author}</span>
                          </div>
                          <h2 className="text-2xl font-serif text-luxe-black mb-3 leading-tight group-hover:text-luxe-gold transition-colors">
                              {article.title}
                          </h2>
                          <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                              {article.excerpt}
                          </p>
                          <div className="mt-auto">
                             <span className="text-xs font-bold uppercase border-b border-black pb-1 group-hover:text-luxe-gold group-hover:border-luxe-gold transition-colors">Read Article</span>
                          </div>
                      </div>
                  </article>
              ))}
          </div>
          
          <div className="mt-20 text-center">
              <Button variant="outline">Load More Stories</Button>
          </div>
      </div>
    </div>
  );
};