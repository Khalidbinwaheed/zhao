"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Microneedling Devices",
    description: "Precision dermapen tools for skin texture and scarring.",
    href: "/category/microneedling",
    image: "/images/cat-microneedling.png", // Paths for later
    color: "bg-blue-50",
  },
  {
    name: "LED Therapy",
    description: "Professional light therapy for rejuvenation and acne.",
    href: "/category/led-therapy",
    image: "/images/cat-led.png",
    color: "bg-teal-50",
  },
  {
    name: "Serum Infusion",
    description: "Advanced infusion systems for deep hydration.",
    href: "/category/serum-infusion",
    image: "/images/cat-serum.png",
    color: "bg-slate-50",
  },
  {
    name: "Sapphire Blades",
    description: "Ultra-sharp blades for hair transplant procedures.",
    href: "/category/hair-transplant",
    image: "/images/cat-hair.png",
    color: "bg-gray-50",
  },
];

export const ProductCategories = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 font-heading">
            Technological <span className="text-accent italic font-light">Excellence</span>
          </h2>
          <p className="text-foreground/60 text-lg">
            Explore our curated range of professional beauty devices designed for maximum efficacy and safety.
          </p>
        </div>
        <Link href="/products" className="group flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors">
          View All Products
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link 
              href={cat.href}
              className={`group block h-full p-8 rounded-3xl border border-secondary/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${cat.color}`}
            >
              <div className="relative aspect-square w-full mb-8 overflow-hidden rounded-2xl bg-white flex items-center justify-center p-4 shadow-inner">
                {/* Fallback for now as images aren't generated yet */}
                <div className="w-full h-full bg-secondary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                   <div className="text-primary/20 font-heading font-black text-4xl uppercase select-none opacity-50">
                     {cat.name.split(' ')[0]}
                   </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 font-heading group-hover:text-accent transition-colors">{cat.name}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed mb-6">{cat.description}</p>
              <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-widest mt-auto">
                Explore <ArrowRight size={14} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
