"use client";

import { useState, useMemo, useEffect } from "react";
import { mockProducts } from "@/data/mockProducts";
import { ProductCard } from "@/components/products/ProductCard";
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
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-secondary/10 py-16 px-6 md:px-12 text-center border-b border-secondary/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 font-heading">
            Professional <span className="text-accent italic font-light">Inventory</span>
          </h1>
          <p className="text-foreground/50 max-w-2xl mx-auto">
            Advanced dermatology tools and clinical supplies for modern skincare professionals.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-10">
            <div>
              <h3 className="text-primary font-bold uppercase tracking-widest text-xs mb-6 border-l-4 border-accent pl-4">Categories</h3>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-sm transition-colors ${
                        selectedCategory === cat
                          ? "text-accent font-bold"
                          : "text-foreground/60 hover:text-primary"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-primary font-bold uppercase tracking-widest text-xs mb-6 border-l-4 border-accent pl-4">Price Range</h3>
              <div className="space-y-4">
                <input type="range" className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary" />
                <div className="flex justify-between text-xs text-foreground/40 font-medium">
                  <span>$0</span>
                  <span>$5000+</span>
                </div>
              </div>
            </div>

            <div className="bg-primary p-6 rounded-3xl text-white">
              <h4 className="font-bold mb-2">Need Help?</h4>
              <p className="text-xs text-white/70 leading-relaxed mb-4">
                Speak with our technology experts to find the right tool for your clinic.
              </p>
              <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10 hover:text-white">
                Contact Us
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-grow">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-6 mb-12 pb-6 border-b border-secondary/10">
              <div className="flex items-center gap-4 flex-grow max-w-md relative">
                <Search size={18} className="absolute left-3 text-foreground/30" />
                <input
                  type="text"
                  placeholder="Search devices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-secondary/10 border-none rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 group cursor-pointer lg:hidden" onClick={() => setIsFilterOpen(true)}>
                   <Filter size={18} className="text-primary" />
                   <span className="text-xs font-bold uppercase tracking-widest text-primary">Filters</span>
                </div>
                
                <div className="flex items-center gap-2 relative group">
                  <span className="text-xs text-foreground/40 hidden sm:inline">Sort by:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-transparent pr-8 pl-2 py-1 text-sm font-bold text-primary outline-none cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-0 text-primary pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Results Info */}
            <p className="text-xs text-foreground/40 font-medium mb-8">
              Showing <span className="text-primary font-bold">{filteredProducts.length}</span> results
              {selectedCategory !== "All" && <> in <span className="text-accent font-bold uppercase">{selectedCategory}</span></>}
            </p>

            {/* Grid */}
            {isLoading ? (
              <div className="py-24 flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-accent" size={48} />
                <p className="text-xs font-bold uppercase tracking-widest text-primary/40">Synchronizing Inventory...</p>
              </div>
            ) : error ? (
              <div className="py-24 flex flex-col items-center justify-center gap-4">
                <AlertCircle className="text-red-500" size={48} />
                <p className="text-sm font-bold text-red-600">{error}</p>
                <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Retry Connection</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id || product._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="py-24 text-center">
                <Search size={48} className="mx-auto text-secondary mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-primary mb-2">No products found</h3>
                <p className="text-foreground/40 text-sm">Try adjusting your search or category filters.</p>
                <button 
                  onClick={() => {setSelectedCategory("All"); setSearchQuery("");}}
                  className="mt-6 text-accent font-bold uppercase tracking-widest text-xs hover:underline"
                >
                  Clear all filters
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
