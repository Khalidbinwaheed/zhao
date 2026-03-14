"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import Link from "next/link";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const searchProducts = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await api.get("/products");
        const filtered = data.filter((p: any) => 
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);
        setResults(filtered);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(searchProducts, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex flex-col"
        >
          {/* Header */}
          <div className="px-6 md:px-12 py-8 flex items-center justify-between border-b border-secondary/10">
            <div className="flex items-center gap-4 text-primary">
              <Search size={24} strokeWidth={1.5} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Precision Search</span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-primary hover:bg-secondary/5 rounded-full transition-all"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search Box */}
          <div className="flex-grow overflow-auto py-20 px-6">
            <div className="max-w-4xl mx-auto space-y-20">
              <div className="relative group">
                <input 
                  ref={inputRef}
                  type="text"
                  placeholder="Query medical tech, devices, or categories..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full text-4xl md:text-6xl font-bold text-primary placeholder:text-secondary/30 bg-transparent outline-none pb-8 border-b-2 border-primary/10 focus:border-accent transition-all font-heading"
                />
                <div className="flex items-center gap-4 mt-6">
                   {isLoading && <Loader2 className="animate-spin text-accent" size={20} />}
                   {!isLoading && query.length > 0 && results.length > 0 && <span className="text-[10px] font-black uppercase tracking-widest text-accent">{results.length} Matches Found</span>}
                   {!isLoading && query.length > 0 && results.length === 0 && <span className="text-[10px] font-black uppercase tracking-widest text-red-400 font-bold">No matching instruments</span>}
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 {results.length > 0 ? (
                   <div className="space-y-6">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/30">Top Matches</h3>
                     <div className="space-y-4">
                       {results.map((product) => (
                         <Link 
                           key={product._id || product.id}
                           href={`/products`} // In a real app, this would be /products/[id]
                           onClick={onClose}
                           className="flex items-center justify-between p-6 bg-white border border-secondary/10 rounded-[2rem] hover:shadow-2xl hover:shadow-primary/5 hover:border-accent group transition-all"
                         >
                           <div className="flex items-center gap-6">
                              <div className="w-16 h-16 bg-secondary/5 rounded-2xl flex items-center justify-center text-primary/20 text-[6px] font-black uppercase">TECH</div>
                              <div>
                                <h4 className="font-bold text-primary group-hover:text-accent transition-colors">{product.name}</h4>
                                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{product.category}</p>
                              </div>
                           </div>
                           <ArrowRight className="text-primary/20 group-hover:text-accent group-hover:translate-x-1 transition-all" size={20} />
                         </Link>
                       ))}
                     </div>
                   </div>
                 ) : query.length < 2 ? (
                   <div className="space-y-6">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/30">Trending Tech</h3>
                     <div className="flex flex-wrap gap-3">
                        {["Microneedling", "LED Therapy", "Dermapen v2", "Clinical Serum", "Sapphire Blades"].map(tag => (
                          <button 
                            key={tag}
                            onClick={() => setQuery(tag)}
                            className="px-6 py-3 bg-secondary/5 border border-secondary/10 rounded-xl text-xs font-bold text-primary/60 hover:bg-accent hover:text-white hover:border-accent transition-all"
                          >
                            {tag}
                          </button>
                        ))}
                     </div>
                   </div>
                 ) : null}

                 <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/30">Clinical Quick Links</h3>
                    <div className="space-y-2">
                       <Link href="/products" onClick={onClose} className="block py-3 text-2xl font-bold text-primary hover:text-accent transition-colors flex items-center gap-4">All Products <ArrowRight size={20} /></Link>
                       <Link href="/support" onClick={onClose} className="block py-3 text-2xl font-bold text-primary hover:text-accent transition-colors flex items-center gap-4">Technical Support <ArrowRight size={20} /></Link>
                       <Link href="/account" onClick={onClose} className="block py-3 text-2xl font-bold text-primary hover:text-accent transition-colors flex items-center gap-4">Clinical Dashboard <ArrowRight size={20} /></Link>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="p-12 border-t border-secondary/10 bg-slate-50">
             <div className="max-w-4xl mx-auto flex items-center gap-4 text-foreground/40 italic text-sm">
                <Sparkles size={16} className="text-accent" />
                <span>Search precision-engineered medical beauty technology across our global clinical network.</span>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
