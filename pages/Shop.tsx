import React, { useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Button } from '../components/ui/Button';
import { useShop } from '../context/ShopContext';
import { ShoppingCart, Filter, X, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCategory } from '../types';

export const Shop: React.FC = () => {
  const { addToCart } = useShop();
  
  // Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Filter States
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  
  // Expanded Sections State
  const [expandedSections, setExpandedSections] = useState({
      brand: true,
      category: true,
      price: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
      setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Derived Data
  const allBrands = Array.from(new Set(MOCK_PRODUCTS.map(p => p.brand))).sort();
  const allCategories = Array.from(new Set(MOCK_PRODUCTS.map(p => p.category))).sort();
  const maxPrice = Math.max(...MOCK_PRODUCTS.map(p => p.price));

  // Toggle Filters
  const toggleBrand = (brand: string) => {
      setSelectedBrands(prev => 
          prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
      );
  };

  const toggleCategory = (cat: ProductCategory) => {
      setSelectedCategories(prev => 
          prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
      );
  };

  // Filtering Logic
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return brandMatch && categoryMatch && priceMatch;
  });

  // Handle Price Change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPriceRange([0, parseInt(e.target.value)]);
  };

  return (
    <div className="min-h-screen pt-24 bg-white">
      {/* Header */}
      <div className="bg-luxe-cream py-16 px-6 border-b border-luxe-gold/10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-end">
            <div>
                <h1 className="text-5xl font-serif text-luxe-black mb-4">The Boutique</h1>
                <p className="text-slate-600 max-w-xl">Curated luxury items selected for the discerning individual.</p>
            </div>
            <button 
                className="md:hidden flex items-center gap-2 mt-6 px-4 py-2 bg-luxe-black text-white text-xs uppercase font-bold tracking-widest rounded-full"
                onClick={() => setIsSidebarOpen(true)}
            >
                <Filter size={14} /> Filter Collection
            </button>
        </div>
      </div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-12 py-12">
         
         {/* Sidebar (Desktop: Sticky, Mobile: Fixed Overlay) */}
         <aside className={`
            fixed inset-y-0 left-0 w-80 bg-white z-[60] p-8 shadow-2xl transform transition-transform duration-300 ease-out
            md:relative md:transform-none md:w-64 md:shadow-none md:p-0 md:bg-transparent md:z-0
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
         `}>
            <div className="flex justify-between items-center md:hidden mb-8">
                <span className="font-serif text-2xl">Filters</span>
                <button onClick={() => setIsSidebarOpen(false)}><X size={24}/></button>
            </div>

            <div className="space-y-8 sticky top-28">
                {/* Brand Filter */}
                <div className="border-b border-gray-100 pb-6">
                    <button onClick={() => toggleSection('brand')} className="flex items-center justify-between w-full mb-4 group">
                        <span className="text-xs font-bold uppercase tracking-widest text-luxe-black">Brands</span>
                        {expandedSections.brand ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    
                    {expandedSections.brand && (
                        <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
                            {allBrands.map(brand => (
                                <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-luxe-gold border-luxe-gold' : 'group-hover:border-luxe-gold'}`}>
                                        {selectedBrands.includes(brand) && <Check size={10} className="text-white" />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} />
                                    <span className={`text-sm ${selectedBrands.includes(brand) ? 'text-luxe-black font-semibold' : 'text-slate-500'}`}>{brand}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Category Filter */}
                <div className="border-b border-gray-100 pb-6">
                    <button onClick={() => toggleSection('category')} className="flex items-center justify-between w-full mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-luxe-black">Categories</span>
                        {expandedSections.category ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    
                    {expandedSections.category && (
                        <div className="space-y-2">
                            {allCategories.map(cat => (
                                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                     <div className={`w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center transition-colors ${selectedCategories.includes(cat as ProductCategory) ? 'bg-luxe-gold border-luxe-gold' : 'group-hover:border-luxe-gold'}`}>
                                        {selectedCategories.includes(cat as ProductCategory) && <Check size={10} className="text-white" />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={selectedCategories.includes(cat as ProductCategory)} onChange={() => toggleCategory(cat as ProductCategory)} />
                                    <span className={`text-sm ${selectedCategories.includes(cat as ProductCategory) ? 'text-luxe-black font-semibold' : 'text-slate-500'}`}>{cat}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Price Filter */}
                <div className="border-b border-gray-100 pb-6">
                    <button onClick={() => toggleSection('price')} className="flex items-center justify-between w-full mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-luxe-black">Price Range</span>
                        {expandedSections.price ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    
                    {expandedSections.price && (
                        <div>
                            <div className="flex justify-between text-xs text-slate-500 mb-2">
                                <span>$0</span>
                                <span>${priceRange[1]}</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="1000" 
                                step="10"
                                value={priceRange[1]} 
                                onChange={handlePriceChange}
                                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-luxe-gold"
                            />
                            <div className="text-right text-xs text-slate-400 mt-1">Max: $1000+</div>
                        </div>
                    )}
                </div>

                {/* Reset Button */}
                {(selectedBrands.length > 0 || selectedCategories.length > 0 || priceRange[1] < 1000) && (
                    <button 
                        onClick={() => {
                            setSelectedBrands([]);
                            setSelectedCategories([]);
                            setPriceRange([0, 1000]);
                        }}
                        className="text-xs uppercase font-bold tracking-widest text-red-400 hover:text-red-600 border-b border-red-200 hover:border-red-400 pb-1"
                    >
                        Reset All Filters
                    </button>
                )}
            </div>
         </aside>

         {/* Overlay for mobile sidebar */}
         {isSidebarOpen && (
             <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
         )}

         {/* Product Grid */}
         <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
                <p className="text-sm text-slate-500">Showing <span className="font-bold text-luxe-black">{filteredProducts.length}</span> results</p>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="group flex flex-col">
                            <div className="relative overflow-hidden mb-4 bg-gray-50 aspect-[4/5] rounded-lg">
                                <Link to={`/products/${product.id}`}>
                                    <img 
                                        src={product.imageUrl} 
                                        alt={product.name}
                                        className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                                    />
                                </Link>
                                <button 
                                    onClick={() => addToCart(product)}
                                    className="absolute bottom-4 right-4 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-luxe-black hover:bg-luxe-gold hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 duration-300"
                                >
                                    <ShoppingCart size={18} />
                                </button>
                                <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-slate-500 rounded-sm">
                                    {product.category}
                                </span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{product.brand}</span>
                                <Link to={`/products/${product.id}`}>
                                    <h3 className="font-serif text-xl mt-1 mb-2 hover:text-luxe-gold transition-colors">{product.name}</h3>
                                </Link>
                                <span className="font-bold text-luxe-charcoal">{product.currency}{product.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    <p className="font-serif text-xl text-slate-400">No treasures found matching your criteria.</p>
                    <button 
                        onClick={() => {
                            setSelectedBrands([]);
                            setSelectedCategories([]);
                            setPriceRange([0, 1000]);
                        }}
                        className="mt-4 text-sm font-bold text-luxe-gold hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
         </div>
      </div>
    </div>
  );
};