"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const CategoryPage = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await api.get('/products');
        // Filter by category slug
        const filtered = data.filter((p: any) => 
          p.category.toLowerCase().replace(/\s+/g, '-') === slug
        );
        setProducts(filtered);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProducts();
  }, [slug]);

  const categoryName = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : "";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary/10 border-t-accent rounded-full animate-spin" />
          <p className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">Loading Clinical Data</p>
        </div>
      </div>
    );
  }

  const sortedProducts = [...products];
  if (sortBy === "price-low") sortedProducts.sort((a, b) => a.price - b.price);
  if (sortBy === "price-high") sortedProducts.sort((a, b) => b.price - a.price);

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      {/* Category Header */}
      <section className="px-6 md:px-12 mb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-primary/5"
          >
            <div>
              <p className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-4">Precision Selection</p>
              <h1 className="text-5xl md:text-7xl font-black text-primary leading-tight tracking-tight font-heading">
                {categoryName}
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-black uppercase tracking-widest text-primary/30">Sort By</span>
               <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-primary/5 border-none rounded-xl px-6 py-3 text-xs font-bold text-primary focus:ring-2 focus:ring-accent outline-none cursor-pointer"
               >
                 <option value="featured">Featured First</option>
                 <option value="price-low">Value Optimized</option>
                 <option value="price-high">Premium Performance</option>
               </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-primary/5 rounded-[3rem] border-2 border-dashed border-primary/10">
              <p className="text-primary/40 font-bold mb-4 uppercase tracking-widest text-xs">No instruments matching this category.</p>
              <Link href="/products">
                <Button variant="outline" className="rounded-2xl px-10 h-14 font-black uppercase text-[10px] tracking-widest">Return to Catalog</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
