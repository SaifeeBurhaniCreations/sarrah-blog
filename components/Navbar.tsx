import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { setIsCartOpen, setIsSearchOpen, cartItems } = useShop();
  const { isAuthenticated } = useAuth();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter Nav Items
  const visibleNavItems = NAV_ITEMS.filter(item => {
    if (item.path === '/admin') return isAuthenticated;
    return true;
  });

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${isScrolled 
        ? 'bg-white/90 backdrop-blur-xl py-3 shadow-sm border-b border-luxe-gold/20' 
        : 'bg-transparent py-6 border-b border-transparent'}`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-luxe-black hover:text-luxe-gold transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
           {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
        </button>

        {/* Logo */}
        <Link to="/" className="group relative z-50">
           <Logo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-10 items-center">
          {visibleNavItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 relative py-2 group
              ${location.pathname === item.path ? 'text-luxe-gold' : 'text-luxe-charcoal hover:text-luxe-gold'}`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 h-[1px] bg-luxe-gold transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-6 text-luxe-black">
          {!isAuthenticated && location.pathname !== '/login' && (
             <Link to="/login" className="hover:text-luxe-gold transition-colors hidden md:block">
                <User size={22} strokeWidth={1.5} />
             </Link>
          )}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="hover:text-luxe-gold transition-colors transform hover:scale-110 duration-300"
          >
            <Search size={22} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="hover:text-luxe-gold transition-colors relative transform hover:scale-110 duration-300"
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-luxe-black text-luxe-gold text-[9px] font-bold flex items-center justify-center rounded-full border border-white">
                    {cartCount}
                </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`fixed inset-0 bg-white/95 backdrop-blur-3xl z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-700 cubic-bezier(0.77, 0, 0.175, 1) md:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
         {/* Decorative circle in mobile menu */}
         <div className="absolute top-20 right-20 w-64 h-64 bg-luxe-rose/20 rounded-full blur-3xl"></div>
         
         <Link to="/" onClick={() => setIsMenuOpen(false)} className="mb-8">
            <Logo />
         </Link>

         {visibleNavItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-serif text-luxe-black hover:text-luxe-gold transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 w-0 h-1 bg-luxe-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          {!isAuthenticated && (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-xl uppercase tracking-widest font-bold text-slate-500 mt-8">
                  Login
              </Link>
          )}
      </div>
    </header>
  );
};