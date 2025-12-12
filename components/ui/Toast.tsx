import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { ToastType } from '../../context/ToastContext';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const styles = {
    success: 'bg-luxe-black text-white border-l-4 border-luxe-gold',
    error: 'bg-red-50 text-red-800 border-l-4 border-red-500',
    info: 'bg-white text-luxe-charcoal border-l-4 border-blue-400 shadow-xl'
  };

  const icons = {
    success: <CheckCircle size={18} className="text-luxe-gold" />,
    error: <AlertCircle size={18} className="text-red-500" />,
    info: <Info size={18} className="text-blue-400" />
  };

  return (
    <div className={`flex items-center gap-3 px-6 py-4 rounded shadow-2xl min-w-[300px] animate-fade-in-up transition-all ${styles[type]}`}>
      {icons[type]}
      <p className="flex-grow text-sm font-medium">{message}</p>
      <button onClick={onClose} className="hover:opacity-70 transition-opacity">
        <X size={16} />
      </button>
    </div>
  );
};