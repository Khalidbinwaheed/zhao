"use client";

import { useState } from "react";
import { mockProducts } from "@/data/mockProducts";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Star, ShieldCheck, Truck, RefreshCw, ShoppingCart, Minus, Plus, ChevronRight, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const { addToCart } = useCart();
  const params = useParams();
  const router = useRouter();
  const product = mockProducts.find((p) => p.id === params.id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-primary">Product not found</h2>
        <Button className="mt-4" onClick={() => router.push("/products")}>Back to Shop</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center gap-2 text-xs text-foreground/40 font-medium uppercase tracking-widest">
        <button onClick={() => router.push("/")} className="hover:text-primary transition-colors">Home</button>
        <ChevronRight size={12} />
        <button onClick={() => router.push("/products")} className="hover:text-primary transition-colors">Products</button>
        <ChevronRight size={12} />
        <span className="text-primary font-bold">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square bg-secondary/10 rounded-[2rem] overflow-hidden border border-secondary/20 shadow-inner group"
            >
              <div className="absolute inset-0 flex items-center justify-center p-12 group-hover:scale-105 transition-transform duration-700">
                <div className="w-full h-full bg-secondary/5 rounded-3xl flex items-center justify-center relative">
                   <div className="text-secondary/20 font-black text-8xl uppercase rotate-[-15deg] select-none">
                     {product.category.split(' ')[0]}
                   </div>
                </div>
              </div>
              <div className="absolute top-6 right-6 flex flex-col gap-3">
                <button className="bg-white/80 backdrop-blur-md p-3 rounded-full text-foreground/40 hover:text-accent hover:bg-white transition-all shadow-sm">
                  <Heart size={20} />
                </button>
                <button className="bg-white/80 backdrop-blur-md p-3 rounded-full text-foreground/40 hover:text-primary hover:bg-white transition-all shadow-sm">
                  <Share2 size={20} />
                </button>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`aspect-square rounded-2xl bg-secondary/10 border-2 transition-all cursor-pointer hover:border-accent ${i === 0 ? "border-accent shadow-md" : "border-transparent opacity-60"}`} />
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4">{product.category}</div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 font-heading leading-tight">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex bg-yellow-400/10 px-3 py-1.5 rounded-full items-center gap-1.5">
                   <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-yellow-400/30"} />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-yellow-600">{product.rating}</span>
                </div>
                <span className="text-sm text-foreground/40 font-medium">({product.reviews} professional reviews)</span>
              </div>

              <div className="text-4xl font-black text-primary font-heading mb-8">
                ${product.price}
                <span className="text-sm font-medium text-foreground/30 ml-3 uppercase tracking-widest">Excl. Tax</span>
              </div>

              <p className="text-foreground/60 leading-relaxed text-lg mb-10 border-l-4 border-secondary/30 pl-6 italic">
                The pinnacle of medical beauty technology. Engineered for precision, safety, and unparalleled clinical results. 
                Our flagship {product.category.toLowerCase()} is the gold standard for modern dermatology.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <div className="flex items-center bg-secondary/10 px-4 rounded-full border border-secondary/20">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-primary hover:text-accent transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-bold text-primary">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-primary hover:text-accent transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <Button 
                onClick={() => addToCart(product, quantity)}
                size="lg" 
                className="flex-grow gap-2 h-16 text-lg uppercase font-black tracking-widest"
              >
                <ShoppingCart size={20} /> Add to Cart
              </Button>
            </div>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-10 border-y border-secondary/10 mb-12">
              <div className="flex flex-col items-center text-center">
                 <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-3">
                   <ShieldCheck size={20} />
                 </div>
                 <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest leading-tight">3-Year Medical Warranty</h4>
              </div>
              <div className="flex flex-col items-center text-center">
                 <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-3">
                   <Truck size={20} />
                 </div>
                 <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest leading-tight">Express Clinical Shipping</h4>
              </div>
              <div className="flex flex-col items-center text-center">
                 <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-3">
                   <RefreshCw size={20} />
                 </div>
                 <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest leading-tight">Professional Certification</h4>
              </div>
            </div>

            {/* Tabs */}
            <div className="space-y-8">
              <div className="flex gap-10 border-b border-secondary/10">
                {["description", "specifications", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
                      activeTab === tab ? "text-primary" : "text-foreground/30"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[150px]">
                <AnimatePresence mode="wait">
                  {activeTab === "description" && (
                    <motion.div
                      key="desc"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-foreground/60 leading-relaxed space-y-4"
                    >
                      <p>
                        Our {product.name} is meticulously crafted utilizing aerospace-grade materials and proprietary sensor technology. 
                        Designed for high-volume clinical use, it offers unmatched reliability and precise control over skin depth and power delivery.
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Ergonomic medical-grade housing</li>
                        <li>High-torque digital motor system</li>
                        <li>Sterile-ready easy-clean surfaces</li>
                        <li>Intelligent pressure-sensitive safety shutdown</li>
                      </ul>
                    </motion.div>
                  )}
                  {activeTab === "specifications" && (
                    <motion.div
                      key="specs"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-2 gap-y-4 text-sm"
                    >
                      <div className="font-bold text-primary">Dimensions</div>
                      <div className="text-foreground/60">240mm x 45mm x 45mm</div>
                      <div className="font-bold text-primary">Weight</div>
                      <div className="text-foreground/60">120g (Handpiece)</div>
                      <div className="font-bold text-primary">Voltage</div>
                      <div className="text-foreground/60">110V - 240V Global</div>
                      <div className="font-bold text-primary">Material</div>
                      <div className="text-foreground/60">Surgical Grade Aluminum</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <FeaturedProducts />
    </div>
  );
}
