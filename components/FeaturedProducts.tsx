import React from 'react';
import { Product } from '../types';
import { Button } from './ui/Button';
import { ShoppingCart, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { ImageWithSkeleton } from './ui/ImageWithSkeleton';

interface FeaturedProductsProps {
  products: Product[];
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const { addToCart } = useShop();

  return (
    <section className="py-24 bg-luxe-cream relative overflow-hidden">
      
      {/* Decorative Strip */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-luxe-gold via-luxe-rose to-luxe-gold"></div>

      {/* Header */}
      <div className="container mx-auto px-6 mb-16 flex flex-col md:flex-row items-center justify-between">
         <div className="max-w-xl">
             <span className="text-luxe-gold tracking-[0.2em] text-xs font-bold uppercase mb-2 block">Curated Collection</span>
             <h2 className="text-4xl md:text-5xl font-serif text-luxe-black">Objects of <span className="italic text-luxe-gold">Desire</span></h2>
         </div>
         <div className="hidden md:block">
            <Link to="/shop">
                <Button variant="outline">View All Products</Button>
            </Link>
         </div>
      </div>

      {/* Carousel Area */}
      <div className="relative w-full">
        {/* Soft fading sides */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-luxe-cream to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-luxe-cream to-transparent z-10 pointer-events-none"></div>

        <div className="flex overflow-x-auto pb-20 pt-10 px-6 md:px-20 gap-8 md:gap-12 snap-x snap-mandatory no-scrollbar">
            {products.map((product) => (
            <div key={product.id} className="min-w-[280px] md:min-w-[340px] snap-center group perspective-1000">
                <div className="relative bg-white rounded-2xl p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 transform group-hover:-translate-y-4 group-hover:rotate-1 group-hover:shadow-[0_20px_50px_-10px_rgba(212,175,55,0.2)] border border-gray-100">
                    
                    {/* Brand Badge */}
                    <div className="absolute top-6 left-6 z-20 bg-luxe-black/5 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-luxe-black">
                        {product.brand}
                    </div>

                    {/* Like Button */}
                    <button className="absolute top-6 right-6 z-20 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                        <Star size={14} fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    {/* Image Area */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-50 mb-6">
                        <Link to={`/products/${product.id}`}>
                            <ImageWithSkeleton 
                                src={product.imageUrl} 
                                alt={product.name}
                                className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                                containerClassName="w-full h-full"
                            />
                        </Link>
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-luxe-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                             <Button 
                                variant="primary" 
                                className="w-full py-3 text-xs flex items-center justify-center gap-2 shadow-lg"
                                onClick={() => addToCart(product)}
                             >
                                <ShoppingCart size={14} /> Add to Bag
                             </Button>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="text-center px-2 pb-2">
                        <Link to={`/products/${product.id}`}>
                            <h3 className="font-serif text-2xl text-luxe-black mb-2 group-hover:text-luxe-gold transition-colors cursor-pointer">{product.name}</h3>
                        </Link>
                        <div className="flex items-center justify-center gap-3">
                            <span className="font-sans font-bold text-lg text-luxe-charcoal">{product.currency}{product.price}</span>
                            {/* Fake rating for decoration */}
                            <div className="flex text-luxe-gold text-[10px]">
                                {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
      </div>
    </section>
  );
};