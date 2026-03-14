"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-secondary/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-20">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-semibold text-xs tracking-wider uppercase">
            <Sparkles size={14} />
            The Future of Dermatology
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-primary leading-[1.1] font-heading">
            Professional <br />
            <span className="text-accent italic font-light">Beauty Tech</span> <br />
            for Modern Skincare
          </h1>

          <p className="text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed">
            Advanced dermatology-inspired devices for skin rejuvenation and precision treatments. 
            Empower your practice with medical-grade technology.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="gap-2 group">
              Shop Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Explore Technology
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-8 border-t border-secondary/30">
            <div>
              <p className="text-2xl font-bold text-primary">5000+</p>
              <p className="text-xs text-foreground/50 uppercase tracking-widest">Global Clients</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">15+</p>
              <p className="text-xs text-foreground/50 uppercase tracking-widest">Patented Tools</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">99%</p>
              <p className="text-xs text-foreground/50 uppercase tracking-widest">Satisfaction</p>
            </div>
          </div>
        </motion.div>

        {/* Visual Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative aspect-square md:aspect-[4/3] lg:aspect-square"
        >
          {/* Decorative element */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/50 group">
             <Image
              src="/images/hero.png"
              alt="Premium Beauty Technology"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
          </div>
          
          {/* Interactive floating badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg border border-secondary/20 flex items-center gap-4 max-w-xs"
          >
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
              <Sparkles size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-primary">Certified Quality</p>
              <p className="text-[10px] text-foreground/60 leading-tight">ISO-13485 Medical Standards Certified Device</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decorative */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -translate-y-1/2 rotate-12 -z-10" />
    </section>
  );
};
