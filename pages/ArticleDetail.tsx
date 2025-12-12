import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_ARTICLES } from '../constants';
import { ArrowLeft, Share2, Bookmark } from 'lucide-react';

export const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = MOCK_ARTICLES.find(a => a.id === id);

  if (!article) {
    return <div className="pt-32 text-center">Article not found.</div>;
  }

  return (
    <article className="bg-white min-h-screen">
       {/* Hero Image */}
       <div className="h-[60vh] md:h-[80vh] w-full relative overflow-hidden">
           <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover fixed top-0 left-0 -z-10" />
           <div className="absolute inset-0 bg-black/40"></div>
           
           <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
               <div className="container mx-auto">
                    <div className="mb-4">
                        <span className="bg-luxe-gold text-luxe-black px-3 py-1 text-xs font-bold uppercase tracking-widest">{article.category}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight mb-6 max-w-4xl drop-shadow-lg">
                        {article.title}
                    </h1>
                    <div className="flex items-center gap-6 text-white/80 text-sm font-sans tracking-wide">
                        <span>By {article.author}</span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span>{article.date}</span>
                    </div>
               </div>
           </div>
       </div>

       {/* Content Body - Overlapping Card Style */}
       <div className="relative bg-white pt-16 pb-24 px-6 md:px-0 -mt-10 rounded-t-[3rem] z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
           <div className="container mx-auto max-w-3xl">
                {/* Back Link */}
                <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 hover:text-luxe-black mb-12 transition-colors">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <p className="text-2xl font-serif italic text-slate-700 leading-relaxed mb-10 border-l-4 border-luxe-gold pl-6">
                    {article.excerpt}
                </p>

                <div className="prose prose-lg prose-slate font-serif max-w-none first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-luxe-black">
                     {/* Mocking rich content */}
                     <p>
                        It was a Tuesday afternoon in Paris when the concept first took shape. The air was crisp, the light hitting the Seine in that specific way that artists have tried to capture for centuries. Fashion, at its core, is not just about clothing—it is about capturing a moment, a feeling, an atmosphere.
                     </p>
                     <p>
                        In recent collections, we have seen a dramatic shift away from the minimalist utilitarianism that defined the post-pandemic era. Designers are once again embracing <strong>opulence, texture, and structural complexity</strong>.
                     </p>
                     <figure className="my-12">
                         <img src={`https://picsum.photos/seed/${article.id}_detail/1200/600`} alt="Detail shot" className="w-full rounded-lg shadow-xl" />
                         <figcaption className="text-center text-xs text-gray-500 mt-2 uppercase tracking-widest">Fig 1. Structural detail from the collection</figcaption>
                     </figure>
                     <h3>The Return of Craftsmanship</h3>
                     <p>
                        Hand-stitched embroidery, custom-loomed jacquards, and bespoke tailoring are no longer the exclusive purview of Haute Couture. Ready-to-wear lines are incorporating these elements, signaling a consumer desire for longevity and artistry over fast fashion disposability.
                     </p>
                     <p>
                         "We want pieces that tell a story," says one prominent creative director. "Clothes that you can pass down, not throw away."
                     </p>
                     <div className="bg-luxe-cream p-8 my-10 border-t border-b border-luxe-gold/20 text-center">
                         <p className="font-sans text-sm tracking-widest uppercase mb-4 text-slate-500">Key Takeaway</p>
                         <p className="text-2xl italic font-serif">"True luxury is silence in a noisy world."</p>
                     </div>
                     <p>
                         As we look towards the next season, expect to see a further blurring of the lines between art and attire. The runway is no longer just a display of merchandise; it is a gallery of kinetic sculpture.
                     </p>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between border-t border-gray-100 mt-16 pt-8">
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 text-slate-500 hover:text-luxe-black transition-colors text-sm uppercase tracking-wide">
                            <Share2 size={18} /> Share
                        </button>
                        <button className="flex items-center gap-2 text-slate-500 hover:text-luxe-black transition-colors text-sm uppercase tracking-wide">
                            <Bookmark size={18} /> Save
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-xs text-slate-400">Tags:</span>
                        <span className="text-xs font-bold text-luxe-black">#Fashion</span>
                        <span className="text-xs font-bold text-luxe-black">#Trends</span>
                    </div>
                </div>
           </div>
       </div>
    </article>
  );
};