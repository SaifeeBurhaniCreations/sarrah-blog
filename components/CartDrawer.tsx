import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Button } from './ui/Button';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, cartTotal } = useShop();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
          <h2 className="text-2xl font-serif text-luxe-black flex items-center gap-2">
            Your Bag <span className="text-sm font-sans text-gray-400 font-normal">({cartItems.length} items)</span>
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform duration-300">
            <X size={24} className="text-luxe-charcoal" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
              <ShoppingBag size={48} strokeWidth={1} />
              <p>Your shopping bag is empty.</p>
              <Button variant="outline" onClick={() => setIsCartOpen(false)}>Continue Shopping</Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-24 h-32 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-lg text-luxe-black leading-tight">{item.name}</h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{item.brand}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-gray-200 rounded-full px-2 py-1 gap-3">
                      <button className="text-gray-500 hover:text-black"><Minus size={12} /></button>
                      <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                      <button className="text-gray-500 hover:text-black"><Plus size={12} /></button>
                    </div>
                    <p className="font-semibold text-luxe-gold">{item.currency}{item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-luxe-cream">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500 uppercase tracking-widest">Subtotal</span>
              <span className="text-xl font-serif text-luxe-black font-bold">${cartTotal}</span>
            </div>
            <p className="text-xs text-gray-400 mb-6 text-center">Shipping & taxes calculated at checkout.</p>
            <Button variant="primary" className="w-full">Checkout</Button>
          </div>
        )}
      </div>
    </>
  );
};