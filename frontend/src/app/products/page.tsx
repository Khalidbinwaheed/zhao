"use client";

import { useState, useMemo, useEffect } from "react";
import { mockProducts } from "@/data/mockProducts";
import { ProductCard } from "@/components/products/ProductCard";
import Link from "next/link";
import { Filter, SlidersHorizontal, ChevronDown, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

const categories = [
  "All",
  "Microneedling Devices",
  "LED Therapy",
  "Serum Infusion",
  "Hair Transplant Tools",
  "Professional Skincare",
];

import { api } from "@/lib/api";
import { Loader2, AlertCircle } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.get("/products");
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Page Header */}
      <div className="relative py-24 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-clinical-gradient/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 -z-10" />
        <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left">
          <p className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-6">Commercial Inventory</p>
          <h1 className="text-5xl md:text-8xl font-black text-primary leading-[0.9] tracking-tight font-heading mb-8">
            Precision <br />
            <span className="text-gradient">Instruments.</span>
          </h1>
          <p className="text-primary/40 max-w-2xl font-medium text-base md:text-lg leading-relaxed">
            Advanced dermatology-grade devices and clinical supplies engineered for modern medical practices and professional skincare results.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-16">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/30 mb-8 border-l-4 border-accent pl-6">Catalog Segments</h3>
              <ul className="space-y-4">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-sm tracking-tight transition-all uppercase font-black px-6 py-3 rounded-xl w-full text-left ${
                        selectedCategory === cat
                          ? "bg-primary text-white shadow-xl shadow-primary/20"
                          : "text-primary/40 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-effect p-10 rounded-[3rem] border border-primary/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 blur-2xl -translate-y-1/2 translate-x-1/2" />
              <h4 className="text-xl font-black text-primary mb-4 leading-tight">Clinical <br />Advisory</h4>
              <p className="text-[10px] text-primary/40 font-bold leading-relaxed mb-8">
                Consult with our medical technology engineers to calibrate the ideal equipment suite for your specific facility requirements.
              </p>
              <Link href="/support">
                <Button className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[9px] hover:bg-primary-light transition-all shadow-lg active:scale-95">
                  Consult Experts
                </Button>
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-grow">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 pb-12 border-b border-primary/5">
              <div className="flex items-center gap-4 flex-grow max-w-xl relative group">
                <Search size={20} className="absolute left-6 text-primary/20 group-focus-within:text-accent transition-colors" />
                <input
                  type="text"
                  placeholder="Scan clinical database..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-8 h-18 py-5 bg-primary/5 border-none rounded-[2rem] text-sm font-bold text-primary placeholder:text-primary/20 focus:ring-2 focus:ring-accent outline-none transition-all"
                />
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6">
                <div className="flex items-center gap-3 group cursor-pointer lg:hidden" onClick={() => setIsFilterOpen(true)}>
                   <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Filter size={18} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Filters</span>
                </div>
                
                <div className="flex items-center gap-4 relative">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/30 hidden sm:inline">Sort By</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-primary/5 border-none rounded-xl px-6 py-4 text-xs font-black uppercase tracking-widest text-primary focus:ring-2 focus:ring-accent outline-none cursor-pointer"
                  >
                    <option value="featured">Featured Hub</option>
                    <option value="price-low">Value Opt</option>
                    <option value="price-high">Peak Performance</option>
                    <option value="rating">Clinical Score</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Info */}
            <div className="flex items-center gap-4 mb-10">
               <div className="px-4 py-1.5 bg-accent/10 rounded-full border border-accent/10">
                  <p className="text-[9px] font-black text-accent uppercase tracking-[0.2em]">
                    <span className="opacity-60">Verified Results:</span> {filteredProducts.length}
                  </p>
               </div>
               {selectedCategory !== "All" && (
                 <div className="px-4 py-1.5 bg-primary/5 rounded-full border border-primary/5">
                    <p className="text-[9px] font-black text-primary/40 uppercase tracking-[0.2em]">
                      {selectedCategory}
                    </p>
                 </div>
               )}
            </div>

            {/* Grid */}
            {isLoading ? (
              <div className="py-32 flex flex-col items-center justify-center gap-6">
                <div className="w-20 h-20 border-4 border-primary/10 border-t-accent rounded-full animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/30">Syncing Medical Database...</p>
              </div>
            ) : error ? (
              <div className="py-32 text-center bg-red-50/50 rounded-[4rem] border-2 border-dashed border-red-100 px-8">
                <AlertCircle className="text-red-400 mx-auto mb-6" size={56} />
                <h4 className="text-2xl font-black text-red-900 mb-2">Network Anomaly</h4>
                <p className="text-red-600/60 font-medium text-sm mb-8 max-w-xs mx-auto">Encryption barrier or server timeout detected during inventory fetch.</p>
                <Button onClick={() => window.location.reload()} variant="outline" className="h-14 px-10 rounded-2xl border-red-200 text-red-600 hover:bg-red-50 font-black uppercase text-[10px]">Retry Secure Connection</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id || product._id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {!isLoading && filteredProducts.length === 0 && (
              <div className="py-32 text-center bg-primary/5 rounded-[4rem] border-2 border-dashed border-primary/10">
                <Search size={64} className="mx-auto text-primary/10 mb-8" />
                <h3 className="text-3xl font-black text-primary mb-4">No Instruments Found</h3>
                <p className="text-primary/40 text-sm font-medium mb-10 max-w-xs mx-auto">Our database contains no matching technology for these clinical parameters.</p>
                <button 
                  onClick={() => {setSelectedCategory("All"); setSearchQuery("");}}
                  className="h-16 px-12 bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95"
                >
                  Clear Discovery Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>


      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-secondary/10">
                <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                  <SlidersHorizontal size={20} /> Filters
                </h2>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 text-foreground/40">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-6">Categories</h3>
                  <ul className="space-y-4">
                    {categories.map((cat) => (
                      <li key={cat}>
                        <button
                          onClick={() => {setSelectedCategory(cat); setIsFilterOpen(false);}}
                          className={`flex items-center gap-3 w-full text-left p-3 rounded-xl transition-all ${
                            selectedCategory === cat
                              ? "bg-primary text-white shadow-md shadow-primary/20"
                              : "bg-secondary/5 text-foreground/60 active:bg-secondary/10"
                          }`}
                        >
                          <span className="text-sm font-medium">{cat}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-auto">
                   <Button className="w-full" onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
