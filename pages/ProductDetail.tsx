import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { Button } from '../components/ui/Button';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, Star, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const { addToCart } = useShop();

  if (!product) {
    return <div className="pt-32 text-center">Product not found.</div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      <div className="container mx-auto px-6">
        <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500 hover:text-luxe-black mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Boutique
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Gallery Side */}
            <div className="space-y-4">
                <div className="aspect-[4/5] bg-luxe-cream rounded-xl overflow-hidden relative group">
                     <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover mix-blend-multiply transition-transform duration-1000 group-hover:scale-110" />
                     <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Best Seller</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="aspect-square bg-gray-50 rounded-lg overflow-hidden cursor-pointer border border-transparent hover:border-luxe-gold transition-colors">
                             <img src={`https://picsum.photos/seed/${product.id}_${i}/200/200`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Info Side */}
            <div className="flex flex-col justify-center">
                <div className="mb-2 flex items-center gap-2">
                    <span className="text-luxe-gold text-xs font-bold uppercase tracking-widest border border-luxe-gold px-2 py-0.5 rounded-full">{product.brand}</span>
                    <div className="flex text-amber-400 text-xs">
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <span className="text-slate-400 ml-1">(42)</span>
                    </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-serif text-luxe-black mb-4 leading-tight">{product.name}</h1>
                <p className="text-2xl font-light text-slate-800 mb-8">{product.currency}{product.price}</p>
                
                <div className="prose text-slate-600 mb-8 leading-relaxed">
                    <p>{product.description || "Experience luxury redefined with this exquisite piece. Crafted with the finest materials and attention to detail."}</p>
                </div>

                <div className="space-y-4 mb-8">
                     <div className="flex items-center gap-3 text-sm text-slate-500">
                         <Truck size={18} />
                         <span>Free express shipping on orders over $200</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-500">
                         <ShieldCheck size={18} />
                         <span>Authenticity Guaranteed</span>
                     </div>
                </div>

                <div className="flex gap-4">
                    <Button variant="primary" className="flex-1 flex items-center justify-center gap-2" onClick={() => addToCart(product)}>
                        <ShoppingBag size={18} /> Add to Bag
                    </Button>
                    <button className="w-14 h-12 flex items-center justify-center border border-gray-300 rounded hover:border-red-400 hover:text-red-500 transition-colors">
                        <div className="heart-icon">♥</div>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};