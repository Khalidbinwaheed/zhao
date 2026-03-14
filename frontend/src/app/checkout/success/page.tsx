"use client";

import { CheckCircle, ArrowRight, Package, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-xl border border-secondary/10 text-center space-y-8"
      >
        <div className="relative mx-auto w-24 h-24">
           <motion.div
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
             className="relative z-10 w-full h-full bg-accent rounded-full flex items-center justify-center text-white"
           >
             <CheckCircle size={48} />
           </motion.div>
           <motion.div
             animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute inset-0 bg-accent rounded-full blur-xl"
           />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-primary mb-3 font-heading">Clinical Order Confirmed</h2>
          <p className="text-foreground/40 text-sm leading-relaxed">
            Your professional skincare equipment order has been processed. We've sent a detailed confirmation to your email.
          </p>
        </div>

        <div className="bg-secondary/5 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-primary/40">
            <span>Order ID</span>
            <span className="text-primary font-black">#ZBO-19385-TECH</span>
          </div>
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-primary/40">
            <span>Status</span>
            <span className="text-accent">Processing</span>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <Link href="/products" className="block w-full">
            <Button className="w-full h-14 uppercase font-black text-sm gap-2">
              Back to Showroom <ArrowRight size={18} />
            </Button>
          </Link>
          <button className="flex items-center justify-center gap-2 text-xs font-bold text-primary/40 hover:text-primary transition-colors uppercase tracking-widest w-full">
            <Download size={14} /> Download Clinical Invoice
          </button>
        </div>

        <div className="pt-8 flex justify-center gap-4 opacity-30">
           <Package size={20} />
           <p className="text-[10px] font-bold uppercase tracking-widest text-primary self-center">Clinical Grade Logistics</p>
        </div>
      </motion.div>
    </div>
  );
}
