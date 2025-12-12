import React, { useEffect, useRef } from 'react';
import { 
  Bold, Italic, List, Heading1, Heading2, Quote, 
  AlignLeft, AlignCenter, Minus
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isUpdatingRef = useRef(false);

  // Sync initial value or external updates to the contentEditable
  useEffect(() => {
    if (contentRef.current && !isUpdatingRef.current) {
        if (contentRef.current.innerHTML !== value) {
            contentRef.current.innerHTML = value;
        }
    }
  }, [value]);

  const handleInput = () => {
    if (contentRef.current) {
      isUpdatingRef.current = true;
      onChange(contentRef.current.innerHTML);
      isUpdatingRef.current = false;
    }
  };

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    // Force focus back to editor
    contentRef.current?.focus();
    handleInput();
  };

  const ToolbarButton = ({ icon: Icon, command, arg, label }: any) => (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        execCommand(command, arg);
      }}
      className="p-2 text-slate-500 hover:text-luxe-gold hover:bg-gray-100 rounded transition-colors"
      title={label}
    >
      <Icon size={18} />
    </button>
  );

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white focus-within:border-luxe-gold transition-colors">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-100 bg-gray-50/50">
        <ToolbarButton icon={Heading1} command="formatBlock" arg="H2" label="Heading Large" />
        <ToolbarButton icon={Heading2} command="formatBlock" arg="H3" label="Heading Medium" />
        <div className="w-[1px] h-4 bg-gray-300 mx-2"></div>
        <ToolbarButton icon={Bold} command="bold" label="Bold" />
        <ToolbarButton icon={Italic} command="italic" label="Italic" />
        <ToolbarButton icon={List} command="insertUnorderedList" label="Bullet List" />
        <ToolbarButton icon={Quote} command="formatBlock" arg="BLOCKQUOTE" label="Quote" />
        <div className="w-[1px] h-4 bg-gray-300 mx-2"></div>
        <ToolbarButton icon={AlignLeft} command="justifyLeft" label="Align Left" />
        <ToolbarButton icon={AlignCenter} command="justifyCenter" label="Align Center" />
        <ToolbarButton icon={Minus} command="insertHorizontalRule" label="Divider" />
      </div>
      
      <div
        ref={contentRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[300px] p-6 focus:outline-none prose prose-slate max-w-none prose-headings:font-serif prose-headings:font-normal prose-blockquote:border-l-4 prose-blockquote:border-luxe-gold prose-blockquote:italic prose-blockquote:pl-4 prose-p:leading-relaxed"
        data-placeholder={placeholder}
      ></div>
      
      {/* Placeholder Text Simulation */}
      {!value && (
         <div className="absolute top-[60px] left-6 text-gray-300 pointer-events-none italic">
            {placeholder}
         </div>
      )}
    </div>
  );
};