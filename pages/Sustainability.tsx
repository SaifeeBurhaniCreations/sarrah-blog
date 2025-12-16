import React from 'react';
import { Leaf, Recycle, Heart, Droplets } from 'lucide-react';

export const Sustainability: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 bg-stone-50 text-luxe-charcoal">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/seed/nature_fashion/1920/1080" 
            alt="Sustainable Fashion" 
            className="w-full h-full object-cover grayscale opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-stone-100/40 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-center px-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 border border-luxe-black/30 rounded-full px-4 py-1 mb-6">
             <Leaf size={14} className="text-green-700" />
             <span className="text-xs font-bold uppercase tracking-widest text-luxe-black">Conscious Luxury</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 text-luxe-black">The Future is <br/><span className="italic text-green-800">Slow</span></h1>
          <p className="max-w-xl mx-auto text-lg leading-relaxed font-serif">
            We are redefining the standard of luxury by committing to ethical sourcing, circular design, and the preservation of artisan craftsmanship.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-white p-8 border border-stone-200 hover:border-green-800 transition-colors group">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6 text-green-800 group-hover:scale-110 transition-transform">
                      <Recycle size={24} />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">Circular Economy</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                      Our "Second Life" initiative ensures that pre-loved pieces find new homes, reducing textile waste and extending the narrative of every garment.
                  </p>
              </div>
              <div className="bg-white p-8 border border-stone-200 hover:border-green-800 transition-colors group">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6 text-green-800 group-hover:scale-110 transition-transform">
                      <Heart size={24} />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">Ethical Sourcing</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                      We partner exclusively with suppliers who uphold the highest standards of labor rights and fair wages. Luxury means dignity for the maker.
                  </p>
              </div>
              <div className="bg-white p-8 border border-stone-200 hover:border-green-800 transition-colors group">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6 text-green-800 group-hover:scale-110 transition-transform">
                      <Droplets size={24} />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">Material Innovation</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                      Investing in lab-grown diamonds, mushroom leathers, and organic silks to minimize our environmental footprint without compromising on beauty.
                  </p>
              </div>
          </div>
      </section>

      {/* Quote */}
      <section className="py-24 bg-luxe-black text-white text-center px-6">
          <div className="max-w-4xl mx-auto">
              <p className="text-3xl md:text-5xl font-serif italic leading-tight mb-8">
                  "True elegance is knowing that what you wear has not cost the earth its future."
              </p>
              <div className="w-20 h-[1px] bg-luxe-gold mx-auto"></div>
          </div>
      </section>
    </div>
  );
};