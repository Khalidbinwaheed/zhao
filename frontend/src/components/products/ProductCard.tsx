"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Eye, Plus, Minus } from "lucide-react"; // Added Plus, Minus
import { Product } from "@/data/mockProducts";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { useCart } from "@/context/CartContext";
import { useState } from "react"; // Added useState

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1); // Added quantity state

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group bg-white rounded-3xl border border-secondary/20 overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/5] bg-secondary/5 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-accent text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">New</span>
          )}
          {product.isBestSeller && (
            <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Best Seller</span>
          )}
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 translate-y-12 group-hover:translate-y-0 transition-transform duration-300 z-10 px-4">
          <Button 
            onClick={() => addToCart(product, quantity)}
            variant="primary" 
            size="sm" 
            className="w-full gap-2 text-[10px] uppercase font-bold tracking-widest"
          >
            <ShoppingCart size={14} /> Add to Cart
          </Button>
          <button className="bg-white/90 backdrop-blur-md p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-all shadow-md">
            <Eye size={18} />
          </button>
        </div>

        {/* Placeholder for images */}
        <div className="w-full h-full flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-110">
          <div className="w-full h-full bg-secondary/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
             <div className="text-secondary/30 font-black text-6xl uppercase rotate-[-30deg] select-none">
               Tech
             </div>
             {/* Actual Image would go here */}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-[10px] text-accent font-bold uppercase tracking-widest mb-2">{product.category}</div>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-primary font-bold text-lg mb-3 line-clamp-1 hover:text-accent transition-colors font-heading">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-secondary fill-secondary/20"} 
              />
            ))}
          </div>
          <span className="text-xs text-foreground/40 font-medium">({product.reviews})</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-black text-primary font-heading">
            ${product.price}
          </span>
          <button className="text-primary/40 hover:text-accent transition-colors">
             <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
