"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-white pt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[50%] h-[70%] bg-clinical-gradient/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 -z-10" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 py-12 lg:py-0">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10 order-2 lg:order-1 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 glass-effect rounded-full text-primary font-black text-[10px] tracking-[0.25em] uppercase border border-primary/5">
            <Sparkles size={14} className="text-accent" />
            Medical Grade Precision
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-primary leading-[0.95] tracking-tight font-heading">
            Elevating <br />
            <span className="text-gradient">Skincare</span> <br />
            Technology.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-primary/50 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Discover the pinnacle of dermatology-grade beauty tools. From micro-needling precision to advanced LED therapy, we power the future of professional skincare.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-6">
            <Button size="lg" className="w-full sm:w-auto h-16 px-12 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs hover:bg-primary-light transition-all shadow-2xl shadow-primary/20 active:scale-95 group">
              Shop Collection
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Link href="/support" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full h-16 px-12 rounded-2xl border-2 border-primary/10 text-primary font-black uppercase tracking-widest text-xs hover:bg-primary/5 transition-all">
                Clinical Help
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-12 pt-12">
            <div className="group">
              <p className="text-3xl font-black text-primary group-hover:text-accent transition-colors">5K+</p>
              <p className="text-[9px] font-black text-primary/30 uppercase tracking-[0.3em]">Practitioners</p>
            </div>
            <div className="group">
              <p className="text-3xl font-black text-primary group-hover:text-accent transition-colors">24/7</p>
              <p className="text-[9px] font-black text-primary/30 uppercase tracking-[0.3em]">Support Team</p>
            </div>
            <div className="group">
              <p className="text-3xl font-black text-primary group-hover:text-accent transition-colors">ISO</p>
              <p className="text-[9px] font-black text-primary/30 uppercase tracking-[0.3em]">Certified Dev</p>
            </div>
          </div>
        </motion.div>

        {/* Visual Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative order-1 lg:order-2"
        >
          {/* Main Visual Container */}
          <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square group">
            <div className="absolute inset-4 sm:inset-8 bg-secondary rounded-[3rem] -rotate-6 transition-transform group-hover:rotate-0 duration-700 -z-10" />
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden clinical-shadow border-8 border-white group">
               <Image
                src="/images/hero.png"
                alt="Zhao Beauty Technology"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            
            {/* Interactive floating badge */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -right-6 sm:right-0 bg-white glass-effect p-6 rounded-[2rem] shadow-2xl border border-primary/5 flex items-center gap-5 max-w-[280px] z-20"
            >
              <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-accent/20">
                <Sparkles size={28} />
              </div>
              <div>
                <p className="text-sm font-black text-primary">Certified Hub</p>
                <p className="text-[10px] text-primary/40 font-bold leading-tight">Professional Medical Standards & FDA Compliance Assurance</p>
              </div>
            </motion.div>

            {/* Floating particles or accents */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>

  );
};
