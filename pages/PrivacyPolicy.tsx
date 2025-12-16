import React from 'react';
import { Shield, Mail, CheckCircle, Lock, Eye } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      {/* Header */}
      <div className="bg-luxe-cream py-20 mb-16 border-b border-luxe-gold/10">
         <div className="container mx-auto px-6 max-w-4xl text-center">
             <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-8 text-luxe-gold">
                 <Shield size={32} strokeWidth={1.5} />
             </div>
             <h1 className="text-4xl md:text-6xl font-serif text-luxe-black mb-6">Privacy Policy</h1>
             <p className="text-slate-500 font-sans tracking-widest uppercase text-xs font-bold">Last Updated: October 12, 2024</p>
         </div>
      </div>

      <div className="container mx-auto px-6 max-w-3xl">
         <div className="space-y-16">
            
            <section className="group relative pl-8 md:pl-0">
                <div className="absolute left-0 top-0 text-luxe-gold/20 font-serif text-6xl -translate-x-4 -translate-y-4 font-bold select-none md:-translate-x-12">01</div>
                <div className="relative">
                    <h3 className="text-2xl font-serif text-luxe-black mb-6">Introduction</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        Welcome to Burhani Creations ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This policy describes how we collect, use, and share your information when you visit our website. By using our services, you consent to the practices described in this policy.
                    </p>
                </div>
            </section>

            <div className="w-full h-[1px] bg-gray-100"></div>

            <section className="group relative pl-8 md:pl-0">
                <div className="absolute left-0 top-0 text-luxe-gold/20 font-serif text-6xl -translate-x-4 -translate-y-4 font-bold select-none md:-translate-x-12">02</div>
                <div className="relative">
                    <h3 className="text-2xl font-serif text-luxe-black mb-6">Information We Collect</h3>
                    <p className="text-slate-600 leading-relaxed mb-8">
                        We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise contact us.
                    </p>
                    
                    <div className="bg-luxe-cream/50 p-8 rounded-xl border border-luxe-gold/10">
                         <h4 className="font-bold text-xs uppercase tracking-widest mb-6 text-luxe-charcoal flex items-center gap-2">
                            <Lock size={14} /> Data Categories
                         </h4>
                         <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                             {[
                                 "Name & Contact Details",
                                 "Account Credentials",
                                 "Payment Information",
                                 "Purchase History",
                                 "Device & Usage Data",
                                 "Location Data"
                             ].map((item, i) => (
                                 <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                                     <div className="w-1.5 h-1.5 bg-luxe-gold rounded-full"></div> 
                                     {item}
                                 </li>
                             ))}
                         </ul>
                    </div>
                </div>
            </section>

            <div className="w-full h-[1px] bg-gray-100"></div>

            <section className="group relative pl-8 md:pl-0">
                <div className="absolute left-0 top-0 text-luxe-gold/20 font-serif text-6xl -translate-x-4 -translate-y-4 font-bold select-none md:-translate-x-12">03</div>
                <div className="relative">
                    <h3 className="text-2xl font-serif text-luxe-black mb-6">How We Use Your Information</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests.
                    </p>
                    <ul className="space-y-4">
                        {[
                            "To provide and manage the services you request.",
                            "To communicate with you regarding updates, offers, and security alerts.",
                            "To improve our website functionality and user experience.",
                            "To enforce our terms, conditions, and policies."
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-4 text-slate-600">
                                <CheckCircle size={20} className="text-luxe-gold shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

             <div className="w-full h-[1px] bg-gray-100"></div>

            <section className="group relative pl-8 md:pl-0">
                 <div className="absolute left-0 top-0 text-luxe-gold/20 font-serif text-6xl -translate-x-4 -translate-y-4 font-bold select-none md:-translate-x-12">04</div>
                 <div className="relative">
                    <h3 className="text-2xl font-serif text-luxe-black mb-6">Contact Us</h3>
                    <p className="text-slate-600 leading-relaxed mb-8">
                        If you have questions or comments about this policy, you may email us at privacy@burhanicreations.com or by post to:
                    </p>
                    <div className="flex flex-col md:flex-row gap-6">
                        <a href="mailto:privacy@burhanicreations.com" className="flex items-center gap-3 px-6 py-4 bg-luxe-black text-white rounded-lg hover:bg-luxe-gold hover:text-luxe-black transition-colors w-max">
                            <Mail size={18} /> 
                            <span className="text-sm font-bold uppercase tracking-widest">Email Privacy Team</span>
                        </a>
                    </div>
                 </div>
            </section>

         </div>
      </div>
    </div>
  );
};