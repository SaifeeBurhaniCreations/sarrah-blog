import React from 'react';
import { Button } from '../components/ui/Button';
import { Briefcase, ArrowRight, Ghost } from 'lucide-react';

// Mock Data - can be empty to test empty state
const OPENINGS = [
    { id: 1, title: "Senior Fashion Editor", dept: "Editorial", location: "New York", type: "Full Time" },
    { id: 2, title: "Art Director", dept: "Creative", location: "Paris", type: "Full Time" },
    { id: 3, title: "Frontend Engineer", dept: "Digital", location: "Remote", type: "Contract" }
];

// const OPENINGS: any[] = []; // Uncomment to test empty state

export const Careers: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 bg-white">
        {/* Header */}
        <section className="bg-luxe-cream py-24 px-6 border-b border-luxe-gold/10">
            <div className="container mx-auto max-w-4xl text-center">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-luxe-gold mb-4 block">Join the Atelier</span>
                <h1 className="text-5xl md:text-7xl font-serif text-luxe-black mb-8">Crafting the <br/> Extraordinary</h1>
                <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                    We are always looking for visionaries, storytellers, and innovators to help us shape the future of digital luxury.
                </p>
            </div>
        </section>

        {/* Listings */}
        <section className="py-24 container mx-auto px-6 max-w-5xl">
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-serif">Open Positions</h2>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{OPENINGS.length} Roles Available</span>
            </div>

            {OPENINGS.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {OPENINGS.map((job) => (
                        <div key={job.id} className="group flex flex-col md:flex-row items-center justify-between p-8 border border-gray-100 bg-white hover:border-luxe-gold/50 hover:shadow-lg transition-all duration-300 rounded-sm">
                            <div className="text-center md:text-left mb-4 md:mb-0">
                                <h3 className="text-xl font-serif font-bold text-luxe-black mb-2 group-hover:text-luxe-gold transition-colors">{job.title}</h3>
                                <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-slate-500 justify-center md:justify-start">
                                    <span className="flex items-center gap-1"><Briefcase size={12}/> {job.dept}</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span>{job.location}</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span>{job.type}</span>
                                </div>
                            </div>
                            <Button variant="outline" className="group-hover:bg-luxe-black group-hover:text-white group-hover:border-luxe-black">
                                Apply Now <ArrowRight size={14} className="ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 rounded-xl p-16 text-center border-2 border-dashed border-gray-200">
                     <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-slate-300">
                         <Ghost size={24} />
                     </div>
                     <h3 className="text-2xl font-serif text-luxe-black mb-2">No Open Roles</h3>
                     <p className="text-slate-500 mb-8 max-w-md mx-auto">
                         Our team is currently fully staffed, but we are always interested in meeting exceptional talent.
                     </p>
                     <Button variant="primary">Send General Application</Button>
                </div>
            )}
        </section>
    </div>
  );
};