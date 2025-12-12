import React from 'react';
import { Button } from '../components/ui/Button';
import { Mail, MapPin, Phone } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
       <div className="container mx-auto px-6 max-w-6xl">
           <div className="text-center mb-16">
               <h1 className="text-4xl md:text-6xl font-serif text-luxe-black mb-4">Get in Touch</h1>
               <p className="text-slate-500">We'd love to hear from you.</p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-luxe-cream p-8 md:p-12 rounded-xl shadow-sm border border-luxe-gold/10">
               {/* Contact Info */}
               <div className="space-y-8">
                   <h3 className="text-2xl font-serif">Contact Information</h3>
                   <div className="space-y-6">
                       <div className="flex items-start gap-4">
                           <div className="p-3 bg-white rounded-full shadow-sm text-luxe-gold">
                               <MapPin size={20} />
                           </div>
                           <div>
                               <p className="font-bold text-luxe-black">Headquarters</p>
                               <p className="text-slate-500 text-sm">123 Fashion Avenue, Suite 400<br/>New York, NY 10012</p>
                           </div>
                       </div>
                       <div className="flex items-start gap-4">
                           <div className="p-3 bg-white rounded-full shadow-sm text-luxe-gold">
                               <Mail size={20} />
                           </div>
                           <div>
                               <p className="font-bold text-luxe-black">Email Us</p>
                               <p className="text-slate-500 text-sm">editorial@lumierevogue.com<br/>press@lumierevogue.com</p>
                           </div>
                       </div>
                       <div className="flex items-start gap-4">
                           <div className="p-3 bg-white rounded-full shadow-sm text-luxe-gold">
                               <Phone size={20} />
                           </div>
                           <div>
                               <p className="font-bold text-luxe-black">Call Us</p>
                               <p className="text-slate-500 text-sm">+1 (555) 019-2834</p>
                           </div>
                       </div>
                   </div>
               </div>

               {/* Form */}
               <form className="space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                       <div>
                           <label className="block text-xs uppercase font-bold text-slate-500 mb-2">First Name</label>
                           <input type="text" className="w-full bg-white border border-gray-200 p-3 rounded focus:outline-none focus:border-luxe-gold" />
                       </div>
                       <div>
                           <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Last Name</label>
                           <input type="text" className="w-full bg-white border border-gray-200 p-3 rounded focus:outline-none focus:border-luxe-gold" />
                       </div>
                   </div>
                   <div>
                       <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Email Address</label>
                       <input type="email" className="w-full bg-white border border-gray-200 p-3 rounded focus:outline-none focus:border-luxe-gold" />
                   </div>
                   <div>
                       <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Message</label>
                       <textarea rows={4} className="w-full bg-white border border-gray-200 p-3 rounded focus:outline-none focus:border-luxe-gold"></textarea>
                   </div>
                   <Button variant="primary" className="w-full">Send Message</Button>
               </form>
           </div>
       </div>
    </div>
  );
};