import React from 'react';
import { Button } from './ui/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-luxe-cream perspective-1000">
      
      {/* Dynamic Background Gradients/Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-luxe-rose/30 rounded-full blur-[100px] animate-float"></div>
         <div className="absolute top-[20%] right-[0%] w-[40%] h-[60%] bg-amber-100/40 rounded-full blur-[100px] animate-float" style={{animationDelay: '1s'}}></div>
         <div className="absolute bottom-[0%] left-[20%] w-[60%] h-[40%] bg-luxe-gold/10 rounded-full blur-[80px] animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
        
        {/* Left: Text Content */}
        <div className="order-2 lg:order-1 lg:col-span-5 space-y-8 animate-fade-in-up relative">
          
          {/* Decorative vertical line */}
          <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-luxe-gold to-transparent hidden lg:block"></div>

          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-luxe-gold/30 bg-white/40 backdrop-blur-sm">
             <span className="w-2 h-2 rounded-full bg-luxe-gold animate-pulse"></span>
             <span className="text-luxe-charcoal tracking-widest text-xs font-bold uppercase">
                Autumn / Winter Collection
             </span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl xl:text-8xl leading-[1.05] text-luxe-black drop-shadow-sm">
            The Art <br />
            <span className="italic font-light text-luxe-gold/90 relative inline-block pr-4">
              of
              {/* Decorative circle behind 'of' */}
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-luxe-rose/20 rounded-full blur-xl -z-10"></span>
            </span> 
            Modern <br />
            Elegance
          </h1>

          <p className="text-slate-600 font-sans text-lg leading-relaxed border-l-4 border-luxe-gold pl-6 glass-panel p-4 rounded-r-lg shadow-sm max-w-md">
            Discover the stories behind the season's most compelling trends. 
            Where luxury meets avant-garde creativity in a symphony of style.
          </p>

          <div className="pt-6 flex flex-wrap gap-5">
            <Button variant="primary" className="shadow-xl shadow-luxe-gold/20 hover:shadow-luxe-gold/40 hover:-translate-y-1">
              Read Editorial
            </Button>
            <Button variant="outline" className="backdrop-blur-sm bg-white/30">
              Shop Collection
            </Button>
          </div>

          {/* Stat/Social Proof */}
          <div className="flex items-center gap-6 pt-4 text-xs font-bold uppercase tracking-widest text-slate-400">
             <div>
                <span className="block text-2xl font-serif text-luxe-black">1.2M+</span>
                Readers
             </div>
             <div className="w-[1px] h-8 bg-slate-300"></div>
             <div>
                <span className="block text-2xl font-serif text-luxe-black">85+</span>
                Brands
             </div>
          </div>
        </div>

        {/* Right: 3D Visual Content */}
        <div className="order-1 lg:order-2 lg:col-span-7 relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center perspective-1000">
            
            {/* Background Shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-luxe-gold/5 to-luxe-rose/5 rounded-[3rem] transform -rotate-6 scale-90 border border-white/50 backdrop-blur-sm z-0"></div>

            {/* Back Image (Offset) */}
            <div className="absolute right-[5%] top-[10%] w-[65%] h-[75%] rounded-t-[100px] rounded-b-2xl overflow-hidden shadow-2xl opacity-80 transform rotate-6 translate-x-12 translate-y-12 z-10 transition-transform duration-1000 hover:rotate-2">
                 <img 
                    src="https://picsum.photos/seed/fashion_bg_2/800/1000" 
                    alt="Background Texture" 
                    className="w-full h-full object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-luxe-gold/10 mix-blend-multiply"></div>
            </div>

            {/* Main Hero Image (3D Tilt) */}
            <div className="relative w-[70%] h-[85%] z-20 transition-all duration-700 ease-out transform hover:scale-[1.02] group">
                {/* Frame */}
                <div className="absolute -inset-4 border border-luxe-gold/30 rounded-t-[120px] rounded-b-3xl z-30 pointer-events-none"></div>
                
                <div className="w-full h-full rounded-t-[110px] rounded-b-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] bg-white relative">
                   <img 
                        src="https://picsum.photos/seed/fashion_hero_9/1000/1200" 
                        alt="Fashion Model" 
                        className="w-full h-full object-cover"
                    />
                    
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-50 z-20 pointer-events-none"></div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="font-serif text-3xl italic">"Fashion is armor."</p>
                    </div>
                </div>

                {/* Floating "New" Badge */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl animate-float z-40">
                    <div className="w-20 h-20 border border-luxe-gold border-dashed rounded-full flex items-center justify-center animate-spin-slow">
                        <div className="w-full h-full absolute flex items-center justify-center">
                             <svg viewBox="0 0 100 100" className="w-16 h-16 fill-luxe-black">
                                <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                                <text fontSize="13" fontWeight="bold">
                                    <textPath href="#curve" startOffset="0%" textLength="230">
                                        • NEW COLLECTION • LUXE •
                                    </textPath>
                                </text>
                             </svg>
                        </div>
                    </div>
                    <span className="absolute font-serif text-2xl font-bold text-luxe-gold">24</span>
                </div>
            </div>

            {/* Floating Card Detail (Bottom Left) */}
            <div className="absolute bottom-[10%] left-[-5%] z-30 glass-card p-5 rounded-xl max-w-xs hidden lg:block animate-fade-in delay-500 hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-luxe-gold to-amber-200 text-white flex items-center justify-center font-serif font-bold text-2xl rounded-full shadow-lg">
                        01
                    </div>
                    <div>
                        <h4 className="font-serif font-bold text-lg text-luxe-black">Trend Alert</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed font-semibold uppercase tracking-wide">
                            Velvet & Gold
                        </p>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </section>
  );
};