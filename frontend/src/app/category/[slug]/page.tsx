"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { api } from "@/lib/api";
import { Loader2, AlertCircle, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setIsLoading(true);
      try {
        const data = await api.get("/products");
        // In a real API, we'd filter on the backend, but here we filter the results
        const filtered = data.filter((p: any) => 
          p.category.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase() ||
          p.category.toLowerCase().includes(slug.toLowerCase().replace('-', ' '))
        );
        setProducts(filtered);
      } catch (err: any) {
        setError(err.message || "Failed to load category products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [slug]);

  const sortedProducts = useMemo(() => {
    let result = [...products];
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [products, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      {/* Category Header */}
      <section className="relative py-24 px-6 md:px-12 bg-slate-50 overflow-hidden pt-32">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <p className="text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-4">Precision Selection</p>
            <h1 className="text-5xl md:text-7xl font-bold text-primary font-heading mb-6 tracking-tight">
              {categoryName}
            </h1>
            <p className="text-foreground/40 text-lg font-medium leading-relaxed">
              Explore our professional range of {categoryName.toLowerCase()} solutions, engineered for maximum clinical efficacy and patient satisfaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toolbar & Grid */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-secondary/10">
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-black uppercase tracking-widest text-primary/40">{products.length} INSTRUMENTS FOUND</span>
            </div>

            <div className="flex items-center gap-4">
               <div className="relative group">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-secondary/20 rounded-xl px-6 py-3 pr-12 text-xs font-bold text-primary outline-none focus:ring-2 focus:ring-accent transition-all cursor-pointer"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" size={16} />
               </div>
               <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                  <SlidersHorizontal size={14} /> Filter Results
               </Button>
            </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-accent" size={48} />
            <p className="text-xs font-bold uppercase tracking-widest text-primary/40">Loading Precision Tools...</p>
          </div>
        ) : error ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4">
            <AlertCircle className="text-red-500" size={48} />
            <p className="text-sm font-bold text-red-600">{error}</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Retry</Button>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-lg font-medium text-foreground/40 mb-4">No instruments found in this category.</p>
            <Button variant="primary" onClick={() => window.location.href='/products'}>Back to Catalog</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {sortedProducts.map((product) => (
                <motion.div
                  key={product._id || product.id}
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
      </section>
    </div>
  );
}
