import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/Button';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login validation
    if (email && password) {
        login();
        navigate('/admin');
    } else {
        alert("Please enter credentials");
    }
  };

  return (
    <div className="min-h-screen bg-luxe-cream flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-luxe-gold/10 animate-fade-in-up">
         <div className="flex justify-center mb-8">
             <Logo />
         </div>
         
         <div className="text-center mb-8">
             <h2 className="text-2xl font-serif text-luxe-black">Admin Access</h2>
             <p className="text-sm text-slate-500 mt-2">Enter your credentials to manage content.</p>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6">
             <div>
                 <label className="block text-xs uppercase font-bold text-slate-500 tracking-widest mb-2">Email</label>
                 <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-luxe-gold transition-colors bg-transparent"
                    placeholder="admin@burhani.com"
                 />
             </div>
             <div>
                 <label className="block text-xs uppercase font-bold text-slate-500 tracking-widest mb-2">Password</label>
                 <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-luxe-gold transition-colors bg-transparent"
                    placeholder="••••••••"
                 />
             </div>
             
             <Button variant="primary" className="w-full mt-4">Login</Button>
         </form>

         <div className="mt-6 text-center">
             <a href="/" className="text-xs text-slate-400 hover:text-luxe-gold transition-colors border-b border-transparent hover:border-luxe-gold">Return to Home</a>
         </div>
      </div>
    </div>
  );
};