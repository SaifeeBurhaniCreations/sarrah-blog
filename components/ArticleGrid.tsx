import React from 'react';
import { Article } from '../types';
import { ArrowUpRight, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithSkeleton } from './ui/ImageWithSkeleton';

interface ArticleGridProps {
  articles: Article[];
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  return (
    <section className="py-24 relative bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-luxe-rose/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luxe-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-100 pb-8">
          <div>
              <span className="text-luxe-gold font-bold text-xs tracking-[0.3em] uppercase mb-2 block">Journal</span>
              <h2 className="text-5xl md:text-6xl font-serif text-luxe-black">
                Latest <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-luxe-gold to-amber-600">Editorials</span>
              </h2>
          </div>
          <Link to="/editorials" className="group flex items-center gap-3 px-6 py-3 border border-luxe-black rounded-full hover:bg-luxe-black hover:text-white transition-all duration-300 mt-6 md:mt-0">
            <span className="text-sm uppercase tracking-widest font-bold">View Archive</span>
            <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {articles.map((article, index) => {
             const isLarge = index % 3 === 0;
             const colSpan = isLarge ? 'md:col-span-8' : 'md:col-span-4';
             const heightClass = isLarge ? 'h-[500px] md:h-[600px]' : 'h-[450px]'; 
             
             return (
                <Link 
                  to={`/articles/${article.id}`}
                  key={article.id} 
                  className={`${colSpan} group cursor-pointer perspective-1000 block`}
                >
                  <div className={`relative w-full ${heightClass} transform transition-all duration-500 ease-out group-hover:-translate-y-2`}>
                    
                    {/* Decorative Offset Border for "Filled" Look */}
                    <div className="absolute top-4 left-4 w-full h-full border-2 border-luxe-gold/20 rounded-xl -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                    
                    {/* Main Card */}
                    <div className="relative h-full w-full overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-500 bg-gray-100">
                        <ImageWithSkeleton 
                          src={article.imageUrl} 
                          alt={article.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                          containerClassName="w-full h-full"
                        />
                        
                        {/* Gradient Overlay for Text Visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                        
                        {/* Category Tag */}
                        <div className="absolute top-6 left-6">
                            <span className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider rounded-sm">
                                {article.category}
                            </span>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex items-center gap-4 text-white/70 text-xs uppercase tracking-wide mb-3">
                                <span className="flex items-center gap-1"><Clock size={12} /> {article.date}</span>
                                <span className="w-1 h-1 bg-luxe-gold rounded-full"></span>
                                <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>
                            </div>
                            
                            <h3 className="text-3xl font-serif text-white leading-tight mb-3 group-hover:text-luxe-gold-light transition-colors">
                              {article.title}
                            </h3>
                            
                            <div className={`overflow-hidden transition-all duration-500 ${isLarge ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100'}`}>
                                <p className="text-gray-200 text-sm leading-relaxed border-l-2 border-luxe-gold pl-3">
                                    {article.excerpt}
                                </p>
                            </div>
                        </div>
                    </div>
                  </div>
                </Link>
             );
          })}
        </div>
      </div>
    </section>
  );
};