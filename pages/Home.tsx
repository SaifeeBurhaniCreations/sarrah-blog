import React, { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { ArticleGrid } from '../components/ArticleGrid';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { BrandTicker } from '../components/BrandTicker';
import { ProductService } from '../services/productService';
import { Product } from '../types';
import { useBlog } from '../context/BlogContext';

export const Home: React.FC = () => {
  const { articles } = useBlog();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedProducts = await ProductService.getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to load content", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxe-cream">
        <div className="animate-pulse flex flex-col items-center">
           <div className="h-16 w-16 border-4 border-luxe-gold border-t-transparent rounded-full animate-spin mb-6"></div>
           <span className="font-serif text-2xl text-luxe-black tracking-[0.3em] uppercase">Burhani</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-luxe-cream">
      <Hero />
      
      {/* Visual Connector: Brand Ticker */}
      <BrandTicker />

      {/* Intro Quote */}
      <section className="py-32 bg-luxe-charcoal text-white relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
         <div className="container mx-auto px-6 text-center relative z-10">
            <p className="font-serif text-3xl md:text-5xl leading-relaxed max-w-4xl mx-auto">
               "We believe in the power of beauty to transform, and fashion to express the inexpressible."
            </p>
         </div>
      </section>

      <ArticleGrid articles={articles} />
      
      {/* Visual Breaker */}
      <div className="h-24 bg-gradient-to-b from-white to-luxe-cream w-full"></div>

      <FeaturedProducts products={products} />
      
      {/* Newsletter / Membership Section */}
      <section className="py-32 relative bg-luxe-black text-white overflow-hidden">
         {/* Background Image */}
         <div className="absolute inset-0 opacity-40">
             <img src="https://picsum.photos/seed/fashion_dark/1920/1080" className="w-full h-full object-cover grayscale" />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
         
         <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
             <div className="w-20 h-20 border border-white/30 rounded-full flex items-center justify-center mb-8 backdrop-blur-md">
                 <span className="font-serif text-3xl italic">B</span>
             </div>
             <h3 className="font-serif text-5xl md:text-7xl mb-6">The Inner Circle</h3>
             <p className="text-gray-300 max-w-xl mb-10 text-lg leading-relaxed">
                 Unlock exclusive access to runway reports, beauty drops, and members-only editorials.
             </p>
             <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
                 <input 
                    type="email" 
                    placeholder="Your Email Address" 
                    className="flex-grow bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-luxe-gold transition-colors"
                 />
                 <button className="px-8 py-4 bg-luxe-gold text-luxe-charcoal font-bold uppercase tracking-widest hover:bg-white transition-colors">
                     Join
                 </button>
             </div>
         </div>
      </section>
    </main>
  );
};