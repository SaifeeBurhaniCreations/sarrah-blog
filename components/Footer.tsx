import React from 'react';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-luxe-black text-white py-20 border-t-4 border-luxe-gold">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="space-y-6">
          <h2 className="text-3xl font-serif font-bold">Lumière.</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            A digital destination for the fashion-forward. We curate the latest in beauty, style, and culture for the modern aesthete.
          </p>
          <div className="flex space-x-4">
             <Instagram size={20} className="hover:text-luxe-gold cursor-pointer transition-colors" />
             <Twitter size={20} className="hover:text-luxe-gold cursor-pointer transition-colors" />
             <Facebook size={20} className="hover:text-luxe-gold cursor-pointer transition-colors" />
             <Youtube size={20} className="hover:text-luxe-gold cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
           <h4 className="text-luxe-gold text-xs font-bold uppercase tracking-widest mb-6">Explore</h4>
           <ul className="space-y-4 text-sm text-gray-400">
             <li className="hover:text-white cursor-pointer transition-colors">Editorials</li>
             <li className="hover:text-white cursor-pointer transition-colors">Runway Reports</li>
             <li className="hover:text-white cursor-pointer transition-colors">Beauty Lab</li>
             <li className="hover:text-white cursor-pointer transition-colors">Designers</li>
           </ul>
        </div>

        <div>
           <h4 className="text-luxe-gold text-xs font-bold uppercase tracking-widest mb-6">Company</h4>
           <ul className="space-y-4 text-sm text-gray-400">
             <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
             <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
             <li className="hover:text-white cursor-pointer transition-colors">Press</li>
             <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
           </ul>
        </div>

        <div>
           <h4 className="text-luxe-gold text-xs font-bold uppercase tracking-widest mb-6">Newsletter</h4>
           <p className="text-gray-400 text-sm mb-4">Join our list for exclusive content and VIP access.</p>
           <div className="flex border-b border-gray-600 pb-2 focus-within:border-luxe-gold transition-colors">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-transparent border-none outline-none text-white w-full placeholder-gray-600 text-sm"
              />
              <button className="text-xs uppercase font-bold tracking-wider hover:text-luxe-gold">Subscribe</button>
           </div>
        </div>

      </div>
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-gray-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>&copy; 2024 Lumière & Vogue. All rights reserved.</p>
        <div className="space-x-6 mt-4 md:mt-0">
          <span className="cursor-pointer hover:text-white">Privacy Policy</span>
          <span className="cursor-pointer hover:text-white">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};