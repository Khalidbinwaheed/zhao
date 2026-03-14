"use client";

import { useState } from "react";
import Link from "next/link";
import { User as UserIcon, Lock, ArrowRight, Github, Chrome, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const data = await api.post("/users/login", formData);
      login(data.user, data.token);
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 translate-x-1/4 -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10 space-y-4">
          <Logo className="justify-center" />
          <h1 className="text-3xl font-bold text-primary font-heading">Professional Login</h1>
          <p className="text-foreground/40 text-sm">Access your clinical account and order history.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-secondary/20 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl text-center">
              {error}
            </div>
          )}
          <div className="space-y-4">
             <div className="space-y-2">
               <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-4">Email Address</label>
               <div className="relative">
                 <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                 <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@clinic.com"
                  className="w-full pl-12 pr-4 py-4 bg-secondary/5 border border-secondary/10 rounded-2xl outline-none focus:ring-2 focus:ring-accent transition-all"
                 />
               </div>
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-4">Password</label>
               <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                 <input 
                  type="password" 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-secondary/5 border border-secondary/10 rounded-2xl outline-none focus:ring-2 focus:ring-accent transition-all"
                 />
                 <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-accent uppercase tracking-widest">Forgot?</button>
               </div>
             </div>
          </div>

          <Button type="submit" disabled={isLoading} size="lg" className="w-full h-16 uppercase font-black text-sm gap-2">
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>Sign In to Dashboard <ArrowRight size={18} /></>}
          </Button>

          <div className="relative py-4">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-secondary/20" /></div>
             <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest text-foreground/20 bg-white px-4">Or continue with</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button type="button" className="flex items-center justify-center gap-3 py-3 border border-secondary/20 rounded-xl hover:bg-secondary/5 transition-colors">
                <Chrome size={18} className="text-primary" />
                <span className="text-xs font-bold text-primary">Google</span>
             </button>
             <button type="button" className="flex items-center justify-center gap-3 py-3 border border-secondary/20 rounded-xl hover:bg-secondary/5 transition-colors">
                <Github size={18} className="text-primary" />
                <span className="text-xs font-bold text-primary">GitHub</span>
             </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-foreground/40 font-medium">
          New to Zhao Beauty? <Link href="/register" className="text-accent font-bold hover:underline">Create a clinical account</Link>
        </p>
      </motion.div>
    </div>
  );
}
