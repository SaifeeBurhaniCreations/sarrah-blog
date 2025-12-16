import React from 'react';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-luxe-black text-white py-20 border-t-4 border-luxe-gold">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="space-y-6">
          <Logo variant="light" />
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs mt-4">
            A digital destination for the fashion-forward. We curate the latest in beauty, style, and culture for the modern aesthete.
          </p>
          <div className="flex space-x-4 pt-4">
             <Instagram size={20} className="hover:text-luxe-gold cursor-pointer transition-colors" />
             <Twitter size={20} className="hover:text-luxe-gold cursor-pointer transition-colors" />
             <Facebook size={20} className="hover:text-luxe-gold cursor-pointer transition-colors" />
             <Youtube size={20} className="hover:text-luxe-gold cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
           <h4 className="text-luxe-gold text-xs font-bold uppercase tracking-widest mb-6">Explore</h4>
           <ul className="space-y-4 text-sm text-gray-400">
             <li className="hover:text-white cursor-pointer transition-colors"><Link to="/editorials">Editorials</Link></li>
             <li className="hover:text-white cursor-pointer transition-colors"><Link to="/fashion">Runway Reports</Link></li>
             <li className="hover:text-white cursor-pointer transition-colors"><Link to="/beauty">Beauty Lab</Link></li>
             <li className="hover:text-white cursor-pointer transition-colors"><Link to="/shop">Shop Collection</Link></li>
           </ul>
        </div>

        <div>
           <h4 className="text-luxe-gold text-xs font-bold uppercase tracking-widest mb-6">Company</h4>
           <ul className="space-y-4 text-sm text-gray-400">
             <li className="hover:text-white cursor-pointer transition-colors"><Link to="/about">About Us</Link></li>
             <li className="hover:text-white cursor-pointer transition-colors"><Link to="/careers">Careers</Link></li>
             <li className="hover:text-white cursor-pointer transition-colors"><Link to="/sustainability">Sustainability</Link></li>
             <li className="hover:text-white cursor-pointer transition-colors"><Link to="/contact">Contact</Link></li>
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
        <p>&copy; 2024 Burhani Creates. All rights reserved.</p>
        <div className="space-x-6 mt-4 md:mt-0">
          <Link to="/privacy-policy" className="cursor-pointer hover:text-white">Privacy Policy</Link>
          <Link to="/terms-conditions" className="cursor-pointer hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};