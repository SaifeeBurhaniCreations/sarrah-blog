import React from 'react';
import { Scale, FileText, AlertTriangle, UserCheck } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      {/* Header */}
      <div className="bg-luxe-cream py-20 mb-16 border-b border-luxe-gold/10">
         <div className="container mx-auto px-6 max-w-4xl text-center">
             <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-8 text-luxe-gold">
                 <Scale size={32} strokeWidth={1.5} />
             </div>
             <h1 className="text-4xl md:text-6xl font-serif text-luxe-black mb-6">Terms & Conditions</h1>
             <p className="text-slate-500 font-sans tracking-widest uppercase text-xs font-bold">Last Updated: October 12, 2024</p>
         </div>
      </div>

      <div className="container mx-auto px-6 max-w-3xl">
         <div className="space-y-16">

          <section className="group relative pl-8 md:pl-0">
             <div className="absolute left-0 top-0 text-luxe-gold/20 font-serif text-6xl -translate-x-4 -translate-y-4 font-bold select-none md:-translate-x-12">01</div>
             <div className="relative">
                 <h3 className="text-2xl font-serif text-luxe-black mb-6 flex items-center gap-3">
                    Acceptance of Terms
                 </h3>
                 <p className="text-slate-600 leading-relaxed text-lg border-l-2 border-luxe-gold pl-6 py-1">
                    By accessing and using Burhani Creates, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                 </p>
             </div>
          </section>

          <div className="w-full h-[1px] bg-gray-100"></div>

          <section className="group relative pl-8 md:pl-0">
             <div className="absolute left-0 top-0 text-luxe-gold/20 font-serif text-6xl -translate-x-4 -translate-y-4 font-bold select-none md:-translate-x-12">02</div>
             <div className="relative">
                 <h3 className="text-2xl font-serif text-luxe-black mb-6 flex items-center gap-3">
                    Intellectual Property
                 </h3>
                 <p className="text-slate-600 leading-relaxed mb-6">
                    All content published and made available on our site is the property of Burhani Creates and the site's creators. This includes, but is not limited to:
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                    {['Images & Photography', 'Editorial Content', 'Logos & Branding', 'Downloadable Files'].map((item, i) => (
                        <div key={i} className="bg-gray-50 p-4 rounded text-sm text-slate-700 font-semibold border border-gray-100 flex items-center gap-2">
                            <FileText size={14} className="text-luxe-gold"/> {item}
                        </div>
                    ))}
                 </div>
             </div>
          </section>

          <div className="w-full h-[1px] bg-gray-100"></div>

          <section className="group relative pl-8 md:pl-0">
             <div className="absolute left-0 top-0 text-luxe-gold/20 font-serif text-6xl -translate-x-4 -translate-y-4 font-bold select-none md:-translate-x-12">03</div>
             <div className="relative">
                 <h3 className="text-2xl font-serif text-luxe-black mb-6 flex items-center gap-3">
                    User Accounts
                 </h3>
                 <p className="text-slate-600 leading-relaxed mb-6">
                    When you create an account on our site, you agree to the following responsibilities:
                 </p>
                 <div className="bg-luxe-cream/40 p-6 rounded-lg space-y-4 border border-luxe-gold/10">
                    <div className="flex gap-4">
                        <div className="mt-1 bg-white p-1 rounded-full shadow-sm text-luxe-gold">
                            <UserCheck size={16} />
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            You are solely responsible for your account and the security and privacy of your account, including passwords or sensitive information attached to that account.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="mt-1 bg-white p-1 rounded-full shadow-sm text-luxe-gold">
                             <AlertTriangle size={16} />
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                             All personal information you provide to us through your account is up to date, accurate, and truthful.
                        </p>
                    </div>
                 </div>
             </div>
          </section>

          <div className="w-full h-[1px] bg-gray-100"></div>

          <section className="group relative pl-8 md:pl-0">
             <div className="absolute left-0 top-0 text-luxe-gold/20 font-serif text-6xl -translate-x-4 -translate-y-4 font-bold select-none md:-translate-x-12">04</div>
             <div className="relative">
                 <h3 className="text-2xl font-serif text-luxe-black mb-6">Limitation of Liability</h3>
                 <p className="text-slate-600 leading-relaxed">
                    Burhani Creates and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any actions, claims, losses, damages, liabilities and expenses including legal fees from your use of the site.
                 </p>
             </div>
          </section>

          <div className="w-full h-[1px] bg-gray-100"></div>

          <section className="group relative pl-8 md:pl-0">
             <div className="absolute left-0 top-0 text-luxe-gold/20 font-serif text-6xl -translate-x-4 -translate-y-4 font-bold select-none md:-translate-x-12">05</div>
             <div className="relative">
                 <h3 className="text-2xl font-serif text-luxe-black mb-6">Changes to Terms</h3>
                 <p className="text-slate-600 leading-relaxed">
                    We reserve the right to modify these terms at any time. Your continued use of the site will signify your acceptance of any adjustment to these terms.
                 </p>
             </div>
          </section>

         </div>
      </div>
    </div>
  );
};