import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Category, Article } from '../types';
import { FileUploadService } from '../services/fileUploadService';
import { PenTool, Layout, Image as ImageIcon, Sparkles, Upload, CheckCircle, AlertCircle, Eye, X, Save, FileText, Activity, Users, FileBarChart, TrendingUp } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useBlog } from '../context/BlogContext';
import { RichTextEditor } from '../components/RichTextEditor';
import { useToast } from '../context/ToastContext';

// Define Validation Schema
const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title is too long"),
  category: z.nativeEnum(Category),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(300, "Excerpt is too long"),
  content: z.string().min(20, "Content must be substantial"),
  imageUrl: z.string().url("Featured image is required"),
  author: z.string().min(2, "Author name required")
});

type ArticleFormData = z.infer<typeof articleSchema>;

export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'dashboard'>('dashboard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  const { addArticle, articles } = useBlog();
  const { addToast } = useToast();

  // Real-time Analytics State
  const [metrics, setMetrics] = useState({
      activeVisitors: 124,
      subscribers: 45200,
      activeArticles: 84
  });

  // Simulate Real-time updates
  useEffect(() => {
    // Visitor Fluctuation Loop
    const visitorInterval = setInterval(() => {
        setMetrics(prev => ({
            ...prev,
            activeVisitors: Math.max(80, prev.activeVisitors + Math.floor(Math.random() * 7) - 3)
        }));
    }, 2000);

    // Subscriber Growth Loop (slower)
    const subscriberInterval = setInterval(() => {
        if (Math.random() > 0.7) {
             setMetrics(prev => ({
                ...prev,
                subscribers: prev.subscribers + 1
             }));
        }
    }, 5000);

    // Sync active articles count
    setMetrics(prev => ({ ...prev, activeArticles: articles.length }));

    return () => {
        clearInterval(visitorInterval);
        clearInterval(subscriberInterval);
    };
  }, [articles.length]);

  const { 
    register, 
    handleSubmit, 
    setValue, 
    getValues,
    watch, 
    reset,
    control,
    formState: { errors, isSubmitting } 
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      category: Category.FASHION,
      excerpt: '',
      content: '',
      imageUrl: '', 
      author: 'Burhani Editor'
    }
  });

  // Check for drafts on mount and tab change
  useEffect(() => {
      const draft = localStorage.getItem('article_draft');
      setHasDraft(!!draft);
  }, [activeTab]);

  // Watch values for preview or logic
  const watchedValues = watch();
  const watchedImageUrl = watchedValues.imageUrl;
  const watchedTitle = watchedValues.title;
  const watchedCategory = watchedValues.category;

  // Handle Save Draft
  const handleSaveDraft = () => {
      const currentValues = getValues();
      localStorage.setItem('article_draft', JSON.stringify(currentValues));
      setHasDraft(true);
      addToast("Draft saved locally", "info");
  };

  // Handle Load Draft
  const handleLoadDraft = () => {
      const draft = localStorage.getItem('article_draft');
      if (draft) {
          try {
              const parsed = JSON.parse(draft);
              reset(parsed);
              addToast("Draft loaded successfully", "success");
          } catch (e) {
              console.error("Failed to parse draft", e);
              addToast("Draft file corrupted", "error");
          }
      }
  };

  // Handle File Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await FileUploadService.uploadImage(file);
      setValue('imageUrl', url, { shouldValidate: true });
      addToast("Image uploaded successfully", "success");
    } catch (error) {
      console.error("Upload failed", error);
      addToast("Failed to upload image", "error");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle AI Generation
  const handleGenerateAI = async () => {
    if (!watchedTitle) {
      addToast("Please enter a title to generate a post.", "error");
      return;
    }

    try {
      setIsGenerating(true);
      addToast("Dreaming up your story with AI...", "info");
      
      const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : undefined;

      // Check for API Key
      if (!apiKey) {
          // Fallback simulation for demo if no key present
          setTimeout(() => {
              setValue("excerpt", "Generated by AI (Simulation): A stunning exploration of silk textures that redefine modern luxury, capturing the essence of fluidity and grace in every stitch.", { shouldValidate: true });
              // Simple HTML content for editor
              setValue("content", `
                <h2>The Fabric of Dreams</h2>
                <p>Start with a bold statement about fabric. In the world of high fashion, material is the medium through which the soul speaks. This season, we see a return to organic silks.</p> 
                <p>Discuss the history of silk in the 1920s and how it mirrors today's post-pandemic resurgence of glamour.</p> 
                <div class="removable-component relative group my-8 pl-6 border-l-4 border-luxe-gold" contenteditable="false">
                     <button class="remove-component-btn absolute -top-4 -right-4 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-sm" title="Remove Quote"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                     <blockquote contenteditable="true" class="italic text-xl text-luxe-charcoal font-serif focus:outline-none">"Fashion is architecture: it is a matter of proportions." - Coco Chanel</blockquote>
                </div>
                <h2>Modern Applications</h2>
                <p>Transition to modern sustainable silk alternatives. The new era of luxury is conscientious, driven by values as much as aesthetics.</p>
              `, { shouldValidate: true });
              setIsGenerating(false);
              addToast("Generated content (Simulation Mode)", "success");
          }, 2000);
          return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const model = "gemini-2.5-flash";
      const prompt = `Act as a senior fashion editor for Vogue. Write a full, engaging blog post about "${watchedTitle}" in the category "${watchedCategory}". 
      
      Requirements:
      1. Write a captivating excerpt (max 50 words).
      2. Write the full article body (approx 400 words) using HTML tags.
      3. Use <h2> for subheadings.
      4. Use <p> for paragraphs.
      5. Include one <blockquote> wrapped in a div with class="removable-component relative group my-8 pl-6 border-l-4 border-luxe-gold".
      6. The tone should be luxurious, sophisticated, and editorial.
      
      Return valid JSON with keys: "excerpt" and "content".`;
      
      const response = await ai.models.generateContent({
          model: model,
          contents: prompt,
          config: {
              responseMimeType: "application/json"
          }
      });

      const json = JSON.parse(response.text);
      
      setValue("excerpt", json.excerpt, { shouldValidate: true });
      setValue("content", json.content, { shouldValidate: true });
      addToast("AI Generation Complete!", "success");

    } catch (error) {
      console.error("AI Generation failed", error);
      addToast("Failed to generate content. Check API Key.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Submit
  const onSubmit = async (data: ArticleFormData) => {
    try {
      const newArticle: Article = {
          ...data,
          id: Math.random().toString(36).substr(2, 9),
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      
      // Add to global store
      addArticle(newArticle);
      
      // Clear draft on successful publish
      localStorage.removeItem('article_draft');
      setHasDraft(false);

      addToast("Article published successfully!", "success");
      reset(); // Clear form
      setActiveTab('dashboard'); // Go back to dashboard
    } catch (error) {
      console.error("Submission failed", error);
      addToast("Failed to publish article", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-serif text-luxe-black">Burhani <span className="text-luxe-gold">Editor</span></h1>
                <p className="text-slate-500 text-sm">Manage content and curate the platform.</p>
            </div>
            <div className="flex gap-4">
                <button 
                    onClick={() => setActiveTab('dashboard')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${activeTab === 'dashboard' ? 'bg-luxe-black text-white' : 'bg-white text-slate-600 hover:bg-gray-100'}`}
                >
                    <Layout size={18} /> Dashboard
                </button>
                <button 
                    onClick={() => setActiveTab('create')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${activeTab === 'create' ? 'bg-luxe-black text-white' : 'bg-white text-slate-600 hover:bg-gray-100'}`}
                >
                    <PenTool size={18} /> New Article
                </button>
            </div>
        </div>

        {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
                {/* Live Visitors */}
                <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-lg relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-slate-500 uppercase tracking-widest text-xs font-bold">Live Visitors</h3>
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-5xl font-serif text-luxe-black">{metrics.activeVisitors}</p>
                        <TrendingUp size={16} className="text-green-500 mb-1" />
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Currently browsing the site</p>
                    <Activity className="absolute -bottom-4 -right-4 text-gray-50 opacity-20 group-hover:opacity-40 transition-opacity" size={100} />
                </div>

                {/* Active Articles */}
                <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-lg relative overflow-hidden group">
                     <div className="flex justify-between items-start mb-4">
                        <h3 className="text-slate-500 uppercase tracking-widest text-xs font-bold">Published Stories</h3>
                        <FileBarChart size={16} className="text-slate-300" />
                    </div>
                    <p className="text-5xl font-serif text-luxe-black">{metrics.activeArticles}</p>
                    <span className="text-slate-400 text-xs mt-2 block">Available to public</span>
                </div>

                {/* Subscribers */}
                <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-lg relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-slate-500 uppercase tracking-widest text-xs font-bold">Total Subscribers</h3>
                        <Users size={16} className="text-slate-300" />
                    </div>
                    <p className="text-5xl font-serif text-luxe-black">{(metrics.subscribers / 1000).toFixed(1)}k</p>
                    <span className="text-green-500 text-xs font-semibold mt-2 block">+12 today</span>
                </div>
            </div>
        )}

        {activeTab === 'create' && (
            <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 rounded-lg max-w-4xl mx-auto animate-fade-in relative">
                
                {/* Draft Notification / Loader */}
                {hasDraft && (
                    <div className="absolute top-8 right-12 flex items-center gap-2">
                        <span className="text-xs text-slate-400 italic">Draft available</span>
                        <Button variant="outline" onClick={handleLoadDraft} className="flex py-1 px-3 text-xs h-auto">
                            <FileText size={14} className="mr-1" /> Load Draft
                        </Button>
                    </div>
                )}

                <h2 className="text-2xl font-serif mb-8 text-center">Compose New Story</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* Title */}
                    <div>
                        <label className="block text-xs uppercase font-bold text-slate-500 tracking-widest mb-2">Headline</label>
                        <input 
                            {...register("title")}
                            type="text" 
                            className="w-full border-b-2 border-gray-200 py-3 text-xl font-serif focus:outline-none focus:border-luxe-gold transition-colors bg-transparent placeholder-gray-300"
                            placeholder="Enter an elegant headline..."
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.title.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Category */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-slate-500 tracking-widest mb-2">Category</label>
                            <div className="relative">
                                <select 
                                    {...register("category")}
                                    className="w-full border-b-2 border-gray-200 py-3 text-sm focus:outline-none focus:border-luxe-gold bg-transparent appearance-none"
                                >
                                    {Object.values(Category).map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Author */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-slate-500 tracking-widest mb-2">Author</label>
                            <input 
                                {...register("author")}
                                type="text"
                                className="w-full border-b-2 border-gray-200 py-3 text-sm focus:outline-none focus:border-luxe-gold bg-transparent placeholder-gray-300"
                            />
                            {errors.author && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.author.message}</p>}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                         <label className="block text-xs uppercase font-bold text-slate-500 tracking-widest mb-2">Cover Image</label>
                         
                         {/* Hidden Inputs */}
                         <input type="hidden" {...register("imageUrl")} />
                         <input 
                            type="file" 
                            accept="image/*" 
                            id="file-upload" 
                            className="hidden" 
                            onChange={handleFileChange} 
                         />

                         <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-luxe-gold transition-colors relative bg-gray-50/50">
                            {watchedImageUrl ? (
                                <div className="relative w-full h-64 group">
                                    <img src={watchedImageUrl} alt="Preview" className="w-full h-full object-cover rounded-md" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                                        <label htmlFor="file-upload" className="cursor-pointer bg-white text-luxe-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-luxe-gold transition-colors">
                                            Change Image
                                        </label>
                                    </div>
                                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                                        <CheckCircle size={16} />
                                    </div>
                                </div>
                            ) : (
                                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2 py-8">
                                    {isUploading ? (
                                        <div className="w-8 h-8 border-2 border-luxe-gold border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <Upload size={32} className="text-slate-300" />
                                            <span className="text-sm text-slate-500 font-serif">Click to upload editorial cover</span>
                                        </>
                                    )}
                                </label>
                            )}
                         </div>
                         {errors.imageUrl && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.imageUrl.message}</p>}
                    </div>

                    {/* Excerpt */}
                    <div className="relative">
                        <div className="flex justify-between items-end mb-2">
                             <label className="block text-xs uppercase font-bold text-slate-500 tracking-widest">Excerpt</label>
                             <button 
                                type="button" 
                                onClick={handleGenerateAI}
                                disabled={isGenerating || !watchedTitle}
                                className="text-xs flex items-center gap-1 text-luxe-gold hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                             >
                                <Sparkles size={12} /> {isGenerating ? 'Dreaming...' : 'Generate with AI'}
                             </button>
                        </div>
                        <textarea 
                            {...register("excerpt")}
                            rows={3}
                            className="w-full bg-gray-50 border border-gray-200 p-4 rounded text-sm leading-relaxed focus:outline-none focus:border-luxe-gold placeholder-gray-400"
                            placeholder="A brief, captivating summary..."
                        />
                        {errors.excerpt && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.excerpt.message}</p>}
                    </div>

                    {/* Rich Text Content Editor */}
                    <div>
                        <label className="block text-xs uppercase font-bold text-slate-500 tracking-widest mb-2">Full Story</label>
                        <Controller 
                            name="content"
                            control={control}
                            render={({ field }) => (
                                <RichTextEditor 
                                    value={field.value} 
                                    onChange={field.onChange} 
                                    placeholder="Write your story here... Use the toolbar for formatting."
                                />
                            )}
                        />
                        {errors.content && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.content.message}</p>}
                    </div>

                    <div className="flex justify-between pt-6 border-t border-gray-100">
                        <Button type="button" variant="outline" onClick={handleSaveDraft} className="flex border-gray-300 text-gray-500 hover:text-luxe-black hover:border-luxe-black">
                            <Save size={18} className="mr-2" /> Save Draft
                        </Button>

                        <div className="flex gap-4">
                            <Button type="button" className="flex" variant="outline" onClick={() => setShowPreview(true)}>
                                <Eye size={18} className="mr-2" /> Preview
                            </Button>
                            <Button type="submit" variant="primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Publishing...' : 'Publish Editorial'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        )}
      </div>

      {/* Full Screen Preview Modal */}
      {showPreview && (
          <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-fade-in">
              <div className="fixed top-6 right-6 z-[110]">
                  <button 
                      onClick={() => setShowPreview(false)}
                      className="bg-black text-white px-6 py-3 rounded-full shadow-xl hover:bg-luxe-gold transition-colors flex items-center gap-2 font-bold uppercase text-xs tracking-widest"
                  >
                      <X size={18} /> Close Preview
                  </button>
              </div>
              
              <div className="min-h-screen bg-white relative">
                 {/* Hero Image - Fix: Use absolute positioning instead of fixed to avoid z-index stacking issues in modal */}
                 <div className="h-[60vh] md:h-[80vh] w-full relative overflow-hidden">
                     {watchedValues.imageUrl ? (
                          <img src={watchedValues.imageUrl} className="w-full h-full object-cover absolute top-0 left-0" style={{ zIndex: 0 }} />
                     ) : (
                          <div className="w-full h-full bg-gray-200 absolute top-0 left-0 flex items-center justify-center text-gray-400 font-serif italic text-2xl">No Image Selected</div>
                     )}
                     <div className="absolute inset-0 bg-black/40" style={{ zIndex: 1 }}></div>
                     
                     <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 bg-gradient-to-t from-black/80 to-transparent" style={{ zIndex: 2 }}>
                         <div className="container mx-auto">
                              <div className="mb-4">
                                  <span className="bg-luxe-gold text-luxe-black px-3 py-1 text-xs font-bold uppercase tracking-widest">{watchedValues.category}</span>
                              </div>
                              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight mb-6 max-w-4xl drop-shadow-lg">
                                  {watchedValues.title || "Untitled Article"}
                              </h1>
                              <div className="flex items-center gap-6 text-white/80 text-sm font-sans tracking-wide">
                                  <span>By {watchedValues.author}</span>
                                  <span className="w-1 h-1 bg-white rounded-full"></span>
                                  <span>{new Date().toLocaleDateString()}</span>
                              </div>
                         </div>
                     </div>
                 </div>

                 {/* Content Body */}
                 <div className="relative bg-white pt-16 pb-24 px-6 md:px-0 -mt-10 rounded-t-[3rem] z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
                     <div className="container mx-auto max-w-3xl">
                          <p className="text-2xl font-serif italic text-slate-700 leading-relaxed mb-10 border-l-4 border-luxe-gold pl-6">
                              {watchedValues.excerpt || "No excerpt provided."}
                          </p>

                          <div 
                            className="prose prose-lg prose-slate font-serif max-w-none first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-luxe-black whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ __html: watchedValues.content }}
                          >
                          </div>
                     </div>
                 </div>
              </div>
          </div>
      )}
    </div>
  );
};