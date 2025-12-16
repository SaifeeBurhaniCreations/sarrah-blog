import React from 'react';
import { Category } from '../types';
import { Zap, Calendar, MapPin, ArrowUpRight, Globe, Layers, Archive, FileQuestion, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const TRENDS = [
    { id: 1, title: "Liquid Metal", desc: "High-shine fabrics taking over evening wear.", color: "bg-gray-300", image: "https://picsum.photos/seed/trend1/400/500" },
    { id: 2, title: "Cherry Red", desc: "The dominant hue of the season.", color: "bg-red-800", image: "https://picsum.photos/seed/trend2/400/500" },
    { id: 3, title: "Sheer Layering", desc: "Transparency meets structural integrity.", color: "bg-orange-100", image: "https://picsum.photos/seed/trend3/400/500" },
    { id: 4, title: "Neo-Gothic", desc: "Dark romance with lace and leather.", color: "bg-black", image: "https://picsum.photos/seed/trend4/400/500" }
];

const CALENDAR = [
    { city: "New York", date: "Feb 09 - Feb 14", location: "Spring Studios", status: "Completed" },
    { city: "London", date: "Feb 16 - Feb 20", location: "180 Strand", status: "Live Now" },
    { city: "Milan", date: "Feb 20 - Feb 26", location: "Via Bergognone", status: "Upcoming" },
    { city: "Paris", date: "Feb 26 - Mar 05", location: "Grand Palais", status: "Upcoming" },
];

export const Fashion: React.FC = () => {
  const { articles } = useBlog();
  const { addToast } = useToast();
  const fashionArticles = articles.filter(a => a.category === Category.FASHION || a.category === Category.RUNWAY);
  
  const featured = fashionArticles[0]; // Used for logic if needed later
  const editorialGrid = fashionArticles.slice(1, 4);
  const remainingArticles = fashionArticles.slice(4);

  const handleSyncCalendar = () => {
      addToast("Fashion Week dates added to your local calendar.", "success");
  };

  const EmptyState = ({ title, message }: { title: string, message: string }) => (
      <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 text-luxe-gold">
              <FileQuestion size={24} />
          </div>
          <h3 className="font-serif text-2xl text-luxe-black mb-2">{title}</h3>
          <p className="text-slate-500 max-w-sm leading-relaxed">{message}</p>
      </div>
  );

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Editorial Header */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-luxe-charcoal text-white">
          <div className="absolute inset-0 opacity-40">
              <img src="https://picsum.photos/seed/fashion_header_new/1920/1080" className="w-full h-full object-cover grayscale" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          
          <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pb-20">
              <div className="lg:col-span-8">
                  <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-[10px] tracking-[0.3em] uppercase mb-6 backdrop-blur-md animate-fade-in">
                    The Industry Report
                  </span>
                  <h1 className="text-7xl md:text-9xl font-serif font-bold tracking-tighter mb-6 leading-[0.85] animate-slide-in-right">
                    STATE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxe-gold to-white italic">OF</span> FASHION
                  </h1>
              </div>
              <div className="lg:col-span-4 border-l border-white/20 pl-8 hidden lg:block animate-fade-in-up">
                  <p className="text-gray-300 font-serif text-xl leading-relaxed italic mb-6">
                    "From the atelier to the street, we track the cultural shifts defining the modern silhouette."
                  </p>
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-luxe-gold">
                      <span>Vol. 24</span>
                      <div className="w-8 h-[1px] bg-luxe-gold"></div>
                      <span>Autumn / Winter</span>
                  </div>
              </div>
          </div>
      </header>

      {/* Section 1: The Curated Edit (Relevant Posts) */}
      <section className="py-24 container mx-auto px-6">
          <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-6">
              <div>
                  <h2 className="text-4xl font-serif text-luxe-black">The Curated Edit</h2>
                  <p className="text-slate-500 mt-2">Latest analysis from our editors.</p>
              </div>
              <Link to="/editorials" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-luxe-gold transition-colors">
                  View Archive <ArrowUpRight size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </Link>
          </div>

          {editorialGrid.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {editorialGrid.map((article) => (
                      <Link to={`/articles/${article.id}`} key={article.id} className="group cursor-pointer block">
                          <div className="relative overflow-hidden mb-6 aspect-[3/4] rounded-sm bg-gray-100">
                              <img 
                                src={article.imageUrl} 
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                              />
                              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-luxe-black">
                                  {article.category}
                              </div>
                          </div>
                          <div className="border-l-2 border-transparent group-hover:border-luxe-gold pl-0 group-hover:pl-4 transition-all duration-300">
                              <h3 className="text-2xl font-serif leading-tight mb-2 group-hover:text-luxe-gold transition-colors">
                                  {article.title}
                              </h3>
                              <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">
                                  By {article.author} • {article.date}
                              </p>
                              <p className="text-sm text-slate-600 line-clamp-2">
                                  {article.excerpt}
                              </p>
                          </div>
                      </Link>
                  ))}
              </div>
          ) : (
              <EmptyState 
                  title="Editors are Typing..." 
                  message="We are currently curating the next wave of reports. Check back shortly for fresh insights." 
              />
          )}
      </section>

      {/* Section 2: Trend Radar (Micro Trends) */}
      <section className="bg-luxe-cream py-24 overflow-hidden">
          <div className="container mx-auto px-6 mb-12">
             <div className="flex items-center gap-3 mb-4 text-luxe-gold">
                 <Zap size={20} />
                 <span className="text-xs font-bold uppercase tracking-[0.2em]">Trend Watch</span>
             </div>
             <h2 className="text-5xl font-serif text-luxe-black">Micro-Trends <span className="italic text-slate-400">Rising</span></h2>
          </div>

          {TRENDS.length > 0 ? (
              <div className="w-full overflow-x-auto pb-12 no-scrollbar pl-6 md:pl-[calc((100vw-1280px)/2)]">
                  <div className="flex gap-8 w-max pr-6">
                      {TRENDS.map((trend) => (
                          <div key={trend.id} className="w-[300px] md:w-[400px] flex-shrink-0 group perspective-1000">
                              <div className="relative bg-white p-4 shadow-sm group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-1 border border-gray-100">
                                  <div className="h-64 overflow-hidden mb-6 relative">
                                      <img src={trend.image} className="w-full h-full object-cover mix-blend-multiply" />
                                      <div className={`absolute bottom-0 right-0 w-12 h-12 ${trend.color} shadow-lg`}></div>
                                  </div>
                                  <h4 className="text-2xl font-serif mb-2">{trend.title}</h4>
                                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{trend.desc}</p>
                                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-luxe-black transition-colors">
                                      <Layers size={12} /> Explore Trend
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          ) : (
             <div className="container mx-auto px-6">
                 <EmptyState title="Trend Radar Offline" message="Recalibrating our sensors to detect the latest movements in fashion." />
             </div>
          )}
      </section>

      {/* Section 3: Industry Calendar */}
      <section className="py-24 bg-luxe-black text-white relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          
          <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                  <h2 className="text-4xl md:text-6xl font-serif mb-8">Global Runway <br/> <span className="text-luxe-gold italic">Calendar</span></h2>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-12">
                      Stay ahead of the schedule. Key dates for the upcoming fashion weeks in the big four capitals.
                  </p>
                  <Button 
                    variant="primary" 
                    className="bg-white text-black hover:bg-luxe-gold hover:text-black border-none flex items-center gap-2"
                    onClick={handleSyncCalendar}
                  >
                      <Calendar size={18} /> Sync to Calendar
                  </Button>
              </div>

              <div className="space-y-6">
                  {CALENDAR.map((event, i) => (
                      <div key={i} className="group border-b border-gray-800 pb-6 hover:border-luxe-gold transition-colors flex items-start justify-between">
                          <div>
                              <div className="flex items-center gap-3 mb-2">
                                  <Globe size={16} className="text-luxe-gold" />
                                  <h3 className="text-2xl font-serif group-hover:translate-x-2 transition-transform duration-300">{event.city}</h3>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest">
                                  <MapPin size={12} /> {event.location}
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-xl font-mono text-gray-300 mb-1">{event.date}</p>
                              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-sm ${
                                  event.status === 'Live Now' ? 'bg-red-600 text-white animate-pulse' : 
                                  event.status === 'Completed' ? 'bg-gray-800 text-gray-500' : 'bg-luxe-gold text-black'
                              }`}>
                                  {event.status}
                              </span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Section 4: Deep Dive / Archive - IMPROVED UI */}
      <section className="py-24 container mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 block">The Archive</span>
                <h2 className="text-4xl font-serif">In-Depth Reporting</h2>
              </div>
              <div className="hidden md:flex gap-2">
                  <div className="w-3 h-3 bg-luxe-gold rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
              </div>
          </div>
          
          {remainingArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                  {remainingArticles.map((article, idx) => (
                      <Link to={`/articles/${article.id}`} key={article.id} className={`group block ${idx % 2 !== 0 ? 'md:mt-20' : ''}`}>
                          {/* Editorial Card Layout */}
                          <div className="flex flex-col gap-6">
                               <div className="relative overflow-hidden aspect-[16/9] md:aspect-[4/3]">
                                   {/* Decorative Number */}
                                   <div className="absolute top-0 right-0 bg-white px-4 py-2 font-serif text-4xl text-gray-100 z-10 border-b border-l border-gray-50">
                                       {String(idx + 1).padStart(2, '0')}
                                   </div>
                                   
                                   <img src={article.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                                   
                                   <div className="absolute bottom-4 left-4">
                                       <span className="bg-luxe-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                                           {article.category}
                                       </span>
                                   </div>
                               </div>

                               <div className="pr-4">
                                   <div className="flex items-center gap-3 mb-3 border-b border-gray-100 pb-3">
                                       <span className="text-xs font-bold text-luxe-gold uppercase tracking-widest">Report</span>
                                       <span className="text-xs text-slate-400">{article.date}</span>
                                   </div>
                                   <h3 className="text-3xl font-serif mb-4 leading-tight group-hover:text-luxe-gold transition-colors">
                                       {article.title}
                                   </h3>
                                   <p className="text-slate-600 leading-relaxed font-light text-sm mb-6">
                                       {article.excerpt}
                                   </p>
                                   <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-luxe-black group-hover:translate-x-2 transition-transform">
                                       Read Full Story <ArrowUpRight size={14} />
                                   </span>
                               </div>
                          </div>
                      </Link>
                  ))}
              </div>
          ) : (
              <EmptyState 
                title="Archive Empty" 
                message="Our archives are currently being digitized. Please check back later for historical reports." 
              />
          )}
      </section>
    </div>
  );
};