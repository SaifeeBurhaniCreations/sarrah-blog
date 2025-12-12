import React, { useEffect, useRef, useState } from 'react';
import { 
  Bold, Italic, List, Heading1, Heading2, Quote, 
  AlignLeft, AlignCenter, Minus, Image as ImageIcon,
  LayoutGrid, Maximize, Frame, ShoppingBag, Plus, X, Trash2, Film,
  Undo, Redo
} from 'lucide-react';
import { FileUploadService } from '../services/fileUploadService';
import { Button } from './ui/Button';
import { useToast } from '../context/ToastContext';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface ProductItem {
  id: string;
  title: string;
  price: string;
  image: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isUpdatingRef = useRef(false);
  const { addToast } = useToast();
  
  // Editor State
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({});
  const [insertType, setInsertType] = useState<'image' | 'gallery' | 'polaroid' | 'image-carousel' | null>(null);

  // Product Carousel Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const [currentProduct, setCurrentProduct] = useState({ title: '', price: '' });
  const [isUploadingProduct, setIsUploadingProduct] = useState(false);
  const productFileInputRef = useRef<HTMLInputElement>(null);

  // --- Synchronization & Formats ---

  useEffect(() => {
    if (contentRef.current && !isUpdatingRef.current) {
        if (contentRef.current.innerHTML !== value) {
            contentRef.current.innerHTML = value;
        }
    }
  }, [value]);

  const checkFormats = () => {
    if (!document) return;
    try {
        setActiveFormats({
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            insertUnorderedList: document.queryCommandState('insertUnorderedList'),
            justifyLeft: document.queryCommandState('justifyLeft'),
            justifyCenter: document.queryCommandState('justifyCenter'),
            formatBlockH2: document.queryCommandValue('formatBlock') === 'h2',
            formatBlockH3: document.queryCommandValue('formatBlock') === 'h3',
            formatBlockQuote: document.queryCommandValue('formatBlock') === 'blockquote',
        });
    } catch (e) {
        // Ignore errors if selection invalid
    }
  };

  const handleInput = () => {
    if (contentRef.current) {
      isUpdatingRef.current = true;
      onChange(contentRef.current.innerHTML);
      isUpdatingRef.current = false;
      checkFormats();
    }
  };

  // Global listener for removals inside the editor content
  const handleEditorClick = (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if clicked element is a remove button or inside one
      const removeBtn = target.closest('.remove-component-btn');
      
      if (removeBtn) {
          e.preventDefault();
          e.stopPropagation();
          const component = removeBtn.closest('.removable-component');
          if (component) {
              component.remove();
              handleInput();
              addToast('Element removed', 'success');
          }
      } else {
          checkFormats();
      }
  };

  const execCommand = (command: string, value: string | undefined = undefined) => {
    if (command === 'formatBlock' && value === 'BLOCKQUOTE') {
        // Custom Blockquote Insertion to make it removable
        const quoteHtml = `
        <div class="removable-component relative group my-8 pl-6 border-l-4 border-luxe-gold" contenteditable="false">
             <button class="remove-component-btn absolute -top-4 -right-4 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-sm" title="Remove Quote"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
             <blockquote contenteditable="true" class="italic text-xl text-luxe-charcoal font-serif focus:outline-none">Type your quote here...</blockquote>
        </div>
        <p><br/></p>`;
        document.execCommand('insertHTML', false, quoteHtml);
    } else if (command === 'insertHorizontalRule') {
         // Custom Divider
         const dividerHtml = `
         <div class="removable-component relative group my-8" contenteditable="false">
             <button class="remove-component-btn absolute -top-4 right-1/2 translate-x-1/2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-sm" title="Remove Divider"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
             <hr class="border-t border-gray-200" />
         </div>
         <p><br/></p>`;
         document.execCommand('insertHTML', false, dividerHtml);
    } else {
        document.execCommand(command, false, value);
    }
    contentRef.current?.focus();
    handleInput();
    checkFormats();
  };

  // --- Image & Gallery Handling ---

  const triggerImageUpload = (type: 'image' | 'gallery' | 'polaroid' | 'image-carousel') => {
      setInsertType(type);
      setTimeout(() => {
          if (fileInputRef.current) {
              fileInputRef.current.value = '';
              fileInputRef.current.click();
          }
      }, 0);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      contentRef.current?.focus(); 

      try {
        const uploads = await Promise.all(
            Array.from(files).map(file => FileUploadService.uploadImage(file))
        );

        let htmlToInsert = '';
        
        // Helper to generate remove button
        const removeButton = `
            <button class="remove-component-btn absolute top-2 right-2 z-50 bg-white text-red-500 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50" title="Remove Component">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        `;

        if (insertType === 'image') {
            htmlToInsert = `
            <p><br/></p>
            <div class="removable-component my-8 group relative w-full block clear-both" contenteditable="false">
                ${removeButton}
                <img src="${uploads[0]}" class="w-full h-auto rounded-lg shadow-lg block" alt="Editorial Image" />
                <p class="text-center text-xs text-gray-400 mt-2 italic" contenteditable="true">Figure: Full Width Display</p>
            </div>
            <p><br/></p>`;
        } 
        else if (insertType === 'polaroid') {
            htmlToInsert = `
            <div class="removable-component float-right ml-6 mb-4 p-3 bg-white shadow-[0_10px_30px_-5px_rgba(0,0,0,0.15)] rotate-2 border border-gray-100 max-w-xs rounded-sm transition-transform hover:rotate-0 z-10 relative group" contenteditable="false">
                ${removeButton}
                <img src="${uploads[0]}" class="w-full h-auto mb-3" />
                <p class="font-serif italic text-center text-sm text-gray-500" contenteditable="true">Featured Look</p>
            </div>`;
        }
        else if (insertType === 'gallery') {
            const imagesHtml = uploads.map(url => 
                `<div class="aspect-[3/4] overflow-hidden rounded-md cursor-pointer group/item relative">
                    <img src="${url}" class="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110" />
                </div>`
            ).join('');
            htmlToInsert = `
            <p><br/></p>
            <div class="removable-component my-10 w-full block clear-both relative group" contenteditable="false">
                ${removeButton}
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">${imagesHtml}</div>
                <p class="text-center text-xs text-gray-400 mt-2 italic">Gallery: ${uploads.length} Images</p>
            </div>
            <p><br/></p>`;
        }
        else if (insertType === 'image-carousel') {
             const imagesHtml = uploads.map(url => 
                `<div class="min-w-[300px] h-[400px] snap-center rounded-lg overflow-hidden flex-shrink-0">
                    <img src="${url}" class="w-full h-full object-cover" />
                 </div>`
             ).join('');
             htmlToInsert = `
             <p><br/></p>
             <div class="removable-component my-12 relative group w-full block clear-both" contenteditable="false">
                 ${removeButton}
                 <div class="absolute -left-4 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                 <div class="absolute -right-4 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                 <div class="flex overflow-x-auto gap-4 py-4 px-1 snap-x snap-mandatory no-scrollbar">
                    ${imagesHtml}
                 </div>
                 <p class="text-center text-xs text-gray-400 mt-1 uppercase tracking-widest">Swipe to View</p>
             </div>
             <p><br/></p>`;
        }

        document.execCommand('insertHTML', false, htmlToInsert);
        handleInput();
        addToast("Media inserted successfully", "success");

      } catch (error) {
          console.error("Editor upload failed", error);
          addToast("Failed to upload image(s)", "error");
      } finally {
          setInsertType(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
      }
  };

  // --- Product Carousel Logic ---

  const handleAddProduct = async () => {
      const file = productFileInputRef.current?.files?.[0];
      if (!file || !currentProduct.title || !currentProduct.price) {
          addToast("Please fill in all fields and select an image.", "error");
          return;
      }
      
      setIsUploadingProduct(true);
      try {
          const imageUrl = await FileUploadService.uploadImage(file);
          const newItem: ProductItem = {
              id: Math.random().toString(36).substr(2, 9),
              title: currentProduct.title,
              price: currentProduct.price,
              image: imageUrl
          };
          setProductItems([...productItems, newItem]);
          setCurrentProduct({ title: '', price: '' });
          if (productFileInputRef.current) productFileInputRef.current.value = '';
      } catch (err) {
          console.error(err);
      } finally {
          setIsUploadingProduct(false);
      }
  };

  const removeProductItem = (id: string) => {
      setProductItems(productItems.filter(p => p.id !== id));
  };

  const insertProductCarousel = () => {
      if (productItems.length === 0) return;

      const itemsHtml = productItems.map(item => `
        <div class="min-w-[280px] max-w-[300px] snap-center group/card perspective-1000 pl-4 h-full flex flex-col">
             <div class="relative bg-white rounded-2xl p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 hover:shadow-[0_20px_50px_-10px_rgba(212,175,55,0.2)] border border-gray-100 flex-1 flex flex-col">
                 
                 <div class="absolute top-4 left-4 z-[30] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-sm shadow-sm border border-gray-100">
                     <span class="text-[10px] font-bold uppercase tracking-widest text-luxe-black whitespace-nowrap">Editor's Pick</span>
                 </div>

                 <div class="aspect-[4/5] bg-gray-50 rounded-xl mb-4 overflow-hidden relative flex-shrink-0 w-full">
                      <img src="${item.image}" class="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 hover:scale-110" />
                      
                      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] opacity-0 hover:opacity-100 translate-y-4 hover:translate-y-0 transition-all duration-300">
                          <button class="w-full py-3 bg-luxe-black text-white text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-luxe-gold hover:text-black transition-colors rounded-sm">
                              Add to Bag
                          </button>
                      </div>
                 </div>
                 
                 <div class="text-center px-2 flex-grow flex flex-col justify-end">
                     <h4 class="font-serif text-lg text-luxe-black mb-1 truncate w-full hover:text-luxe-gold transition-colors" title="${item.title}">${item.title}</h4>
                     
                     <div class="flex justify-center gap-1 my-2">
                        <span class="text-amber-400 text-xs">★</span>
                        <span class="text-amber-400 text-xs">★</span>
                        <span class="text-amber-400 text-xs">★</span>
                        <span class="text-amber-400 text-xs">★</span>
                        <span class="text-amber-400 text-xs">★</span>
                     </div>

                     <p class="font-bold text-lg text-luxe-charcoal">$${item.price}</p>
                 </div>
             </div>
        </div>
      `).join('');

      const carouselHtml = `
      <p><br/></p>
      <div class="removable-component my-16 py-10 bg-gradient-to-b from-white via-luxe-cream/50 to-white border-y border-luxe-gold/10 relative w-full block clear-both group" contenteditable="false">
          <button class="remove-component-btn absolute top-2 right-2 z-50 bg-white text-red-500 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50" title="Remove Product Carousel">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div class="container mx-auto px-4 mb-8 text-center">
             <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-luxe-gold block mb-2">Shop The Story</span>
             <h3 class="font-serif text-3xl text-luxe-black">Curated Collection</h3>
          </div>
          <div class="flex overflow-x-auto pb-10 pt-4 px-4 gap-4 snap-x snap-mandatory no-scrollbar relative z-10 items-stretch">
              ${itemsHtml}
          </div>
      </div>
      <p><br/></p>`;

      contentRef.current?.focus();
      document.execCommand('insertHTML', false, carouselHtml);
      handleInput();
      
      setProductItems([]);
      setIsProductModalOpen(false);
      addToast("Product carousel inserted", "success");
  };

  const ToolbarButton = ({ icon: Icon, command, arg, label, isActive, onClick }: any) => (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
        else execCommand(command, arg);
      }}
      className={`p-2 rounded transition-all duration-200 flex items-center justify-center relative group
        ${isActive 
            ? 'bg-luxe-black text-white shadow-inner' 
            : 'text-slate-500 hover:text-luxe-gold hover:bg-gray-100'
        }`}
      title={label}
    >
      <Icon size={18} />
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none font-sans">
          {label}
      </span>
    </button>
  );

  return (
    <div className="border border-gray-200 rounded-lg bg-white focus-within:border-luxe-gold focus-within:ring-1 focus-within:ring-luxe-gold transition-all shadow-sm relative z-0">
      
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-100 bg-gray-50/80 backdrop-blur-sm sticky top-0 z-40 rounded-t-lg">
        <ToolbarButton icon={Undo} command="undo" label="Undo" />
        <ToolbarButton icon={Redo} command="redo" label="Redo" />
        <div className="w-[1px] h-5 bg-gray-300 mx-1"></div>
        
        <ToolbarButton icon={Heading1} command="formatBlock" arg="H2" label="Heading Large" isActive={activeFormats.formatBlockH2} />
        <ToolbarButton icon={Heading2} command="formatBlock" arg="H3" label="Heading Medium" isActive={activeFormats.formatBlockH3} />
        <div className="w-[1px] h-5 bg-gray-300 mx-1"></div>
        <ToolbarButton icon={Bold} command="bold" label="Bold" isActive={activeFormats.bold} />
        <ToolbarButton icon={Italic} command="italic" label="Italic" isActive={activeFormats.italic} />
        <ToolbarButton icon={Quote} command="formatBlock" arg="BLOCKQUOTE" label="Quote" isActive={activeFormats.formatBlockQuote} />
        <div className="w-[1px] h-5 bg-gray-300 mx-1"></div>
        <ToolbarButton icon={AlignLeft} command="justifyLeft" label="Align Left" isActive={activeFormats.justifyLeft} />
        <ToolbarButton icon={AlignCenter} command="justifyCenter" label="Align Center" isActive={activeFormats.justifyCenter} />
        <ToolbarButton icon={List} command="insertUnorderedList" label="Bullet List" isActive={activeFormats.insertUnorderedList} />
        <ToolbarButton icon={Minus} command="insertHorizontalRule" label="Divider" />
        
        <div className="w-[1px] h-5 bg-gray-300 mx-1"></div>
        
        {/* Media Tools */}
        <ToolbarButton icon={Maximize} onClick={() => triggerImageUpload('image')} label="Large Image" />
        <ToolbarButton icon={Frame} onClick={() => triggerImageUpload('polaroid')} label="Polaroid Style" />
        <ToolbarButton icon={LayoutGrid} onClick={() => triggerImageUpload('gallery')} label="Image Gallery" />
        <ToolbarButton icon={Film} onClick={() => triggerImageUpload('image-carousel')} label="Image Carousel" />
        <ToolbarButton icon={ShoppingBag} onClick={() => setIsProductModalOpen(true)} label="Product Carousel" isActive={isProductModalOpen} />

        {/* Hidden File Input for basic images */}
        <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            multiple={insertType === 'gallery' || insertType === 'image-carousel'}
            onChange={handleFileUpload}
        />
      </div>
      
      {/* Editor Content Area */}
      <div
        ref={contentRef}
        contentEditable
        onInput={handleInput}
        onKeyUp={checkFormats}
        onMouseUp={checkFormats}
        onClick={handleEditorClick}
        className="min-h-[500px] p-8 focus:outline-none prose prose-slate max-w-none 
          prose-headings:font-serif prose-headings:font-normal prose-headings:text-luxe-black
          prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-6
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:uppercase prose-h3:tracking-wide
          prose-p:leading-relaxed prose-p:text-slate-600 prose-p:mb-6
          prose-blockquote:border-l-4 prose-blockquote:border-luxe-gold prose-blockquote:italic prose-blockquote:pl-6 prose-blockquote:my-10 prose-blockquote:text-xl prose-blockquote:text-luxe-charcoal
          prose-img:rounded-lg prose-img:shadow-md
          selection:bg-luxe-gold/20 selection:text-black"
        data-placeholder={placeholder}
      ></div>
      
      {!value && (
         <div className="absolute top-[110px] left-8 text-gray-300 pointer-events-none font-serif italic text-lg select-none">
            {placeholder}
         </div>
      )}

      {/* --- Product Carousel Modal --- */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
               <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                  <h3 className="font-serif text-2xl">Insert Product Carousel</h3>
                  <button onClick={() => setIsProductModalOpen(false)} className="text-gray-400 hover:text-black"><X size={24} /></button>
               </div>
               
               <div className="p-6 overflow-y-auto flex-1">
                   {/* Add New Product Form */}
                   <div className="bg-luxe-cream/50 p-4 rounded-lg border border-luxe-gold/10 mb-6">
                       <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-luxe-gold">Add New Item</h4>
                       <div className="flex gap-4 items-end">
                           <div className="w-20 h-20 bg-white border border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-luxe-gold relative overflow-hidden shrink-0">
                               <input type="file" ref={productFileInputRef} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                               <Plus size={20} className="text-gray-400" />
                           </div>
                           <div className="flex-1 space-y-2">
                               <input 
                                  type="text" 
                                  placeholder="Product Title" 
                                  className="w-full text-sm p-2 border border-gray-200 rounded focus:border-luxe-gold focus:outline-none"
                                  value={currentProduct.title}
                                  onChange={e => setCurrentProduct({...currentProduct, title: e.target.value})}
                               />
                               <input 
                                  type="number" 
                                  placeholder="Price ($)" 
                                  className="w-full text-sm p-2 border border-gray-200 rounded focus:border-luxe-gold focus:outline-none"
                                  value={currentProduct.price}
                                  onChange={e => setCurrentProduct({...currentProduct, price: e.target.value})}
                               />
                           </div>
                           <Button variant="primary" onClick={handleAddProduct} disabled={isUploadingProduct} className="py-2 px-4 text-xs">
                               {isUploadingProduct ? '...' : 'Add'}
                           </Button>
                       </div>
                   </div>

                   {/* List of Added Items */}
                   <div className="space-y-2">
                       {productItems.length === 0 ? (
                           <p className="text-center text-gray-400 text-sm py-8 italic">No products added yet.</p>
                       ) : (
                           productItems.map((item, idx) => (
                               <div key={item.id} className="flex items-center gap-4 p-2 bg-white border border-gray-100 rounded shadow-sm">
                                   <span className="text-gray-300 font-bold w-6 text-center">{idx + 1}</span>
                                   <img src={item.image} className="w-10 h-10 object-cover rounded" />
                                   <div className="flex-1">
                                       <p className="text-sm font-bold">{item.title}</p>
                                       <p className="text-xs text-luxe-gold">${item.price}</p>
                                   </div>
                                   <button onClick={() => removeProductItem(item.id)} className="text-gray-400 hover:text-red-500 p-2"><Trash2 size={16}/></button>
                               </div>
                           ))
                       )}
                   </div>
               </div>

               <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-4">
                   <Button variant="outline" onClick={() => setIsProductModalOpen(false)}>Cancel</Button>
                   <Button variant="primary" onClick={insertProductCarousel} disabled={productItems.length === 0}>
                       Insert Carousel ({productItems.length})
                   </Button>
               </div>
           </div>
        </div>
      )}
    </div>
  );
};