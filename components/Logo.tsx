import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'light';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '' }) => {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-luxe-black';
  const accentColor = 'text-luxe-gold';

  if (variant === 'icon') {
    return (
      <div className={`font-serif font-bold text-2xl tracking-tighter border-2 border-luxe-gold p-1 w-10 h-10 flex items-center justify-center ${textColor} ${className}`}>
        B<span className="text-luxe-gold">.</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col select-none ${className}`}>
      <h1 className={`font-serif text-2xl md:text-3xl font-bold tracking-tight leading-none ${textColor} flex items-center gap-1`}>
        BURHANI
        <span className={`text-4xl leading-none ${accentColor}`}>.</span>
      </h1>
      <span className={`text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-sans font-semibold ${isLight ? 'text-gray-400' : 'text-slate-500'} ml-1`}>
        Creations
      </span>
    </div>
  );
};