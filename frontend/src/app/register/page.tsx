"use client";

import { useState } from "react";
import Link from "next/link";
import { User as UserIcon, Lock, ArrowRight, Building2, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

export default function RegisterPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", clinicName: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const data = await api.post("/users/register", formData);
      login(data.user, data.token);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-accent/5 skew-x-12 -translate-x-1/4 -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10 space-y-4">
          <Logo className="justify-center" />
          <h1 className="text-3xl font-bold text-primary font-heading">Clinical Registration</h1>
          <p className="text-foreground/40 text-sm">Join the professional beauty technology network.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-secondary/20 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl text-center">
              {error}
            </div>
          )}
          <div className="space-y-4">
             <div className="space-y-2">
               <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-4">Full Name</label>
               <div className="relative">
                 <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                 <input 
                  type="text" required placeholder="Dr. Sarah Johnson"
                  value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-secondary/5 border border-secondary/10 rounded-2xl outline-none focus:ring-2 focus:ring-accent transition-all"
                 />
               </div>
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-4">Clinic Name</label>
               <div className="relative">
                 <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                 <input 
                  type="text" required placeholder="Clinical Beauty Inc."
                  value={formData.clinicName} onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-secondary/5 border border-secondary/10 rounded-2xl outline-none focus:ring-2 focus:ring-accent transition-all"
                 />
               </div>
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-4">Email Address</label>
               <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                 <input 
                  type="email" required placeholder="sarah@clinic.com"
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-secondary/5 border border-secondary/10 rounded-2xl outline-none focus:ring-2 focus:ring-accent transition-all"
                 />
               </div>
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-4">Security Password</label>
               <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                 <input 
                  type="password" required placeholder="••••••••"
                  value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-secondary/5 border border-secondary/10 rounded-2xl outline-none focus:ring-2 focus:ring-accent transition-all"
                 />
               </div>
             </div>
          </div>

          <Button type="submit" disabled={isLoading} size="lg" className="w-full h-16 uppercase font-black text-sm gap-2">
             {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>Create Account <ArrowRight size={18} /></>}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-foreground/40 font-medium">
          Already have an account? <Link href="/login" className="text-accent font-bold hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
