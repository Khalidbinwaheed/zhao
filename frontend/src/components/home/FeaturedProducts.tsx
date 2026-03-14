"use client";

import { mockProducts } from "@/data/mockProducts";
import { ProductCard } from "@/components/products/ProductCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const FeaturedProducts = () => {
  // Just show first 4 for home
  const featured = mockProducts.slice(0, 4);

  return (
    <section className="py-24 px-6 md:px-12 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 font-heading">
              New <span className="text-accent italic font-light">Arrivals</span>
            </h2>
            <p className="text-foreground/60 text-lg">
              Discover the latest breakthroughs in clinical beauty technology, curated for professional results.
            </p>
          </div>
          <Link href="/products" className="group flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors">
            Explore All Devices
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
