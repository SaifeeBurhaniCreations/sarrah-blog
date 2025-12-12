import React from 'react';
import { BRANDS } from '../constants';

export const BrandTicker: React.FC = () => {
  return (
    <div className="bg-luxe-black py-10 overflow-hidden border-y border-luxe-gold/30 relative z-20 group">
       <div className="absolute inset-0 bg-gradient-to-r from-luxe-black via-transparent to-luxe-black z-10 pointer-events-none"></div>
       
       <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused]">
          {/* We duplicate the list to create a seamless loop. 
              The CSS animation moves the whole strip -50% to the left. 
              The list needs to be long enough to cover the screen plus the scroll distance. 
          */}
          {[...Array(4)].map((_, i) => (
             <div key={i} className="flex gap-20 mx-10">
                {BRANDS.map((brand, index) => (
                    <div 
                      key={`${i}-${index}`} 
                      className="flex items-center gap-20 cursor-pointer transition-all duration-300"
                    >
                        <span className="text-3xl md:text-4xl font-serif text-gray-500 font-bold tracking-[0.15em] hover:text-luxe-gold hover:scale-110 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300">
                            {brand}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-luxe-gold/30"></span>
                    </div>
                ))}
             </div>
          ))}
       </div>
    </div>
  );
};