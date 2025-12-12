import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="relative h-[60vh] overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0 z-0">
             <img src="https://picsum.photos/seed/about_hero/1920/1080" className="w-full h-full object-cover grayscale opacity-50" alt="About Us" />
         </div>
         <div className="absolute inset-0 bg-luxe-cream/80 backdrop-blur-sm z-10"></div>
         
         <div className="relative z-20 text-center px-6 animate-fade-in-up">
             <span className="text-xs font-bold uppercase tracking-[0.3em] text-luxe-gold mb-4 block">Est. 2024</span>
             <h1 className="text-5xl md:text-7xl font-serif text-luxe-black mb-6">Lumière & Vogue</h1>
             <p className="max-w-2xl mx-auto text-slate-600 text-xl font-serif italic">
                Where editorial depth meets digital sophistication.
             </p>
         </div>
      </div>

      <div className="container mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                  <h2 className="text-3xl font-serif mb-6">Our Mission</h2>
                  <div className="w-12 h-1 bg-luxe-gold mb-8"></div>
                  <p className="text-slate-600 leading-relaxed mb-6">
                      In an era of fleeting trends, we stand for permanence. We believe that true luxury is not about price, but about the story, the craft, and the feeling it evokes. 
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                      Lumière & Vogue serves as a sanctuary for the aesthete—a curated space where fashion, beauty, and culture intersect. From the ateliers of Paris to the streets of Tokyo, we bring you the narratives that shape our visual world.
                  </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <img src="https://picsum.photos/seed/team1/400/500" className="rounded-lg shadow-lg mt-8" alt="Team" />
                  <img src="https://picsum.photos/seed/team2/400/500" className="rounded-lg shadow-lg" alt="Office" />
              </div>
          </div>
      </div>
    </div>
  );
};