"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

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
        ).slice(0, 4);
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
          ref={containerRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="absolute top-full right-0 mt-4 w-[90vw] md:w-[450px] bg-white rounded-3xl shadow-2xl border border-secondary/10 overflow-hidden z-[100]"
        >
          {/* Search Input Area */}
          <div className="p-4 border-b border-secondary/5 flex items-center gap-3">
             <Search size={18} className="text-primary/30" />
             <input 
              ref={inputRef}
              type="text"
              placeholder="Search instruments..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow bg-transparent outline-none text-sm font-bold text-primary placeholder:text-foreground/20"
             />
             {isLoading ? (
               <Loader2 className="animate-spin text-accent" size={16} />
             ) : (
               <button onClick={onClose} className="p-1 hover:bg-secondary/5 rounded-lg transition-colors">
                  <X size={16} className="text-primary/30" />
               </button>
             )}
          </div>

          {/* Results Area */}
          <div className="max-height-[400px] overflow-auto py-2">
             {results.length > 0 ? (
               <div className="p-2 space-y-1">
                 {results.map((product) => (
                   <Link 
                     key={product._id || product.id}
                     href={`/products`}
                     onClick={onClose}
                     className="flex items-center gap-4 p-3 hover:bg-secondary/5 rounded-2xl transition-all group"
                   >
                     <div className="w-10 h-10 bg-secondary/5 rounded-xl flex items-center justify-center text-[6px] font-black text-primary/20">TECH</div>
                     <div className="flex-grow">
                        <h4 className="text-xs font-bold text-primary group-hover:text-accent transition-colors">{product.name}</h4>
                        <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">{product.category}</p>
                     </div>
                     <ArrowRight size={14} className="text-primary/10 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                   </Link>
                 ))}
                 <Link 
                  href="/products" 
                  onClick={onClose}
                  className="flex items-center justify-center p-3 text-[10px] font-black uppercase tracking-widest text-accent hover:bg-accent/5 rounded-xl transition-all mt-2"
                 >
                    View All Results
                 </Link>
               </div>
             ) : query.length >= 2 && !isLoading ? (
               <div className="p-10 text-center space-y-2">
                  <p className="text-xs font-bold text-primary/40 uppercase tracking-widest">No matching tools</p>
                  <p className="text-[10px] font-medium text-foreground/20">Try searching for 'Dermapen' or 'LED'</p>
               </div>
             ) : (
               <div className="p-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/20 mb-4">Quick Suggestions</p>
                  <div className="flex flex-wrap gap-2">
                     {["Microneedling", "LED Therapy", "Dermapen", "Serum"].map(tag => (
                       <button 
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-4 py-2 bg-secondary/5 border border-secondary/10 rounded-xl text-[10px] font-bold text-primary/60 hover:bg-accent hover:text-white hover:border-accent transition-all"
                       >
                         {tag}
                       </button>
                     ))}
                  </div>
               </div>
             )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
