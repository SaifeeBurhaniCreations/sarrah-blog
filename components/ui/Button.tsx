import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const baseStyle = "px-8 py-3 transition-all duration-300 ease-out font-sans tracking-wide text-sm uppercase font-semibold flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-luxe-black text-white hover:bg-luxe-gold hover:text-black hover:shadow-lg border border-transparent",
    outline: "bg-transparent text-luxe-black border border-luxe-black hover:bg-luxe-black hover:text-white",
    text: "bg-transparent text-luxe-black hover:text-luxe-gold underline-offset-4 hover:underline padding-0",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};