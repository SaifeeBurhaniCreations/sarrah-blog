import React, { useEffect, useRef, useState } from 'react';
import { 
  Bold, Italic, List, Heading1, Heading2, Quote, 
  AlignLeft, AlignCenter, Minus, Image as ImageIcon,
  LayoutGrid, Maximize, Frame
} from 'lucide-react';
import { FileUploadService } from '../services/fileUploadService';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isUpdatingRef = useRef(false);
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({});
  const [insertType, setInsertType] = useState<'image' | 'gallery' | 'polaroid' | null>(null);

  // Sync initial value or external updates
  useEffect(() => {
    if (contentRef.current && !isUpdatingRef.current) {
        if (contentRef.current.innerHTML !== value) {
            contentRef.current.innerHTML = value;
        }
    }
  }, [value]);

  const checkFormats = () => {
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
  };

  const handleInput = () => {
    if (contentRef.current) {
      isUpdatingRef.current = true;
      onChange(contentRef.current.innerHTML);
      isUpdatingRef.current = false;
      checkFormats();
    }
  };

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    contentRef.current?.focus();
    handleInput();
  };

  // Image Handling
  const triggerImageUpload = (type: 'image' | 'gallery' | 'polaroid') => {
      setInsertType(type);
      fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      // Restore focus to editor so insertion happens at cursor
      contentRef.current?.focus();

      try {
        // Upload all selected files
        const uploads = await Promise.all(
            Array.from(files).map(file => FileUploadService.uploadImage(file))
        );

        let htmlToInsert = '';

        if (insertType === 'image') {
            // Large Hero Image
            htmlToInsert = `<div class="my-8"><img src="${uploads[0]}" class="w-full h-auto rounded-lg shadow-lg" alt="Editorial Image" /><p class="text-center text-xs text-gray-400 mt-2 italic">Figure: Editorial Showcase</p></div><br/>`;
        } else if (insertType === 'gallery') {
            // Grid Gallery (Responsive)
            const imagesHtml = uploads.map(url => 
                `<div class="aspect-[3/4] overflow-hidden rounded-md"><img src="${url}" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>`
            ).join('');
            htmlToInsert = `<div class="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">${imagesHtml}</div><br/>`;
        } else if (insertType === 'polaroid') {
            // Artistic "Polaroid" style float
            htmlToInsert = `<div class="float-right ml-6 mb-4 p-3 bg-white shadow-[0_10px_30px_-5px_rgba(0,0,0,0.15)] rotate-2 border border-gray-100 max-w-xs rounded-sm">
                <img src="${uploads[0]}" class="w-full h-auto mb-3" />
                <p class="font-handwriting text-center text-sm text-gray-500">Featured Look</p>
            </div>`;
        }

        document.execCommand('insertHTML', false, htmlToInsert);
        handleInput();

      } catch (error) {
          console.error("Editor upload failed", error);
      } finally {
          setInsertType(null);
          if (fileInputRef.current) fileInputRef.current.value = ''; // Reset input
      }
  };

  const ToolbarButton = ({ icon: Icon, command, arg, label, isActive }: any) => (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        execCommand(command, arg);
      }}
      className={`p-2 rounded transition-all duration-200 flex items-center justify-center
        ${isActive 
            ? 'bg-luxe-black text-white shadow-inner' 
            : 'text-slate-500 hover:text-luxe-gold hover:bg-gray-100'
        }`}
      title={label}
    >
      <Icon size={18} />
    </button>
  );

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white focus-within:border-luxe-gold focus-within:ring-1 focus-within:ring-luxe-gold transition-all shadow-sm">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-100 bg-gray-50/80 backdrop-blur-sm sticky top-0 z-10">
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
        
        {/* Image Tools */}
        <button type="button" onClick={() => triggerImageUpload('image')} className="p-2 text-slate-500 hover:text-luxe-gold hover:bg-gray-100 rounded" title="Large Image">
            <Maximize size={18} />
        </button>
        <button type="button" onClick={() => triggerImageUpload('polaroid')} className="p-2 text-slate-500 hover:text-luxe-gold hover:bg-gray-100 rounded" title="Polaroid Style">
            <Frame size={18} />
        </button>
        <button type="button" onClick={() => triggerImageUpload('gallery')} className="p-2 text-slate-500 hover:text-luxe-gold hover:bg-gray-100 rounded" title="Image Gallery">
            <LayoutGrid size={18} />
        </button>

        {/* Hidden File Input */}
        <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            multiple={insertType === 'gallery'}
            onChange={handleFileUpload}
        />
      </div>
      
      <div
        ref={contentRef}
        contentEditable
        onInput={handleInput}
        onKeyUp={checkFormats}
        onMouseUp={checkFormats}
        className="min-h-[400px] p-8 focus:outline-none prose prose-slate max-w-none 
          prose-headings:font-serif prose-headings:font-normal prose-headings:text-luxe-black
          prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:uppercase prose-h3:tracking-wide
          prose-p:leading-relaxed prose-p:text-slate-600 prose-p:mb-4
          prose-blockquote:border-l-4 prose-blockquote:border-luxe-gold prose-blockquote:italic prose-blockquote:pl-6 prose-blockquote:my-8 prose-blockquote:text-xl prose-blockquote:text-luxe-charcoal
          prose-img:rounded-lg prose-img:shadow-md
          selection:bg-luxe-gold/20 selection:text-black"
        data-placeholder={placeholder}
      ></div>
      
      {/* Visual Placeholder Overlay */}
      {!value && (
         <div className="absolute top-[100px] left-8 text-gray-300 pointer-events-none font-serif italic text-lg select-none">
            {placeholder}
         </div>
      )}
    </div>
  );
};