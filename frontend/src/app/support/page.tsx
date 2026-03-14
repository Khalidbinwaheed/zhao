"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, Mail, Phone, MapPin, 
  ChevronDown, HelpCircle, ShieldCheck, 
  Truck, CreditCard, ArrowRight, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const FAQs = [
  {
    q: "How do I calibrate my Microneedling device?",
    a: "Every Zhao microneedling device comes with a calibration kit. Ensure the needle length is set to zero before power-on, and follow the clinical adjustment guide included in your digital manual."
  },
  {
    q: "What is the clinical warranty period?",
    a: "All professional-grade devices are covered by a 24-month comprehensive clinical warranty, covering both hardware performance and internal electronic stability."
  },
  {
    q: "Do you offer on-site clinical training?",
    a: "Yes, for clinics purchasing a suite of 5 or more devices, we provide complimentary on-site training. For individual purchases, we offer certified webinars."
  },
  {
    q: "How long does clinical shipping take?",
    a: "We prioritize medical shipments. Standard clinical delivery is 3-5 business days globally, with temperature-controlled options for sensitive serum kits."
  }
];

export default function SupportPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({ name: "", email: "", clinic: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", clinic: "", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pb-24 px-6 md:px-12 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 -skew-x-12 translate-x-1/4 hidden lg:block" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-4">Precision Assistance</p>
            <h1 className="text-4xl md:text-7xl font-bold font-heading mb-6 md:mb-8 tracking-tighter leading-tight">
              Clinical <span className="italic font-light text-accent sm:text-white">Support</span> Center
            </h1>
            <p className="text-white/60 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
              Dedicated technical assistance for medical professionals. From device calibration to clinical training, our experts are here to ensure your practice excels.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact & Form */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-primary font-heading mb-8">Direct Assistance</h2>
              <div className="space-y-4 md:space-y-6">
                {[
                  { icon: Phone, label: "Clinical Hot-line", value: "+1 (888) ZHAO-TECH" },
                  { icon: Mail, label: "Clinical Inquiries", value: "support@zhaobeauty.com" },
                  { icon: MapPin, label: "Global Headquarters", value: "88 Precision Way, Singapore, 138622" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 border border-secondary/10 rounded-[2rem] hover:shadow-xl hover:shadow-primary/5 transition-all group">
                     <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                       <item.icon size={20} className="md:w-6 md:h-6" />
                     </div>
                   <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-1">{item.label}</p>
                     <p className="text-base md:text-lg font-bold text-primary">{item.value}</p>
                   </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-8 md:p-10 rounded-[2.5rem] border border-secondary/10">
               <h3 className="text-xl font-bold text-primary mb-6">Device Standards</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: ShieldCheck, text: "ISO 13485 Certified" },
                    { icon: ShieldCheck, text: "Clinical Grade" },
                    { icon: Truck, text: "Secure Shipping" },
                    { icon: CreditCard, text: "Payment Security" }
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-bold text-foreground/60">
                      <s.icon className="text-accent" size={16} /> {s.text}
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="relative">
             <div className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl shadow-primary/10 border border-secondary/20">
                <h3 className="text-2xl font-bold text-primary mb-2">Technical Inquiry</h3>
                <p className="text-foreground/40 text-sm font-medium mb-8">Send our technical team a detailed inquiry.</p>

                {isSuccess ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-20 text-center space-y-4">
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShieldCheck size={40} />
                    </div>
                    <h4 className="text-2xl font-bold text-primary">Inquiry Received</h4>
                    <p className="text-foreground/40 text-sm">Our clinical specialists will respond within 24 hours.</p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline" size="sm">Send Another</Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-4">Full Name</label>
                           <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" placeholder="Dr. Julian Vasile" className="w-full px-6 py-4 bg-secondary/5 border border-secondary/10 rounded-2xl outline-none focus:ring-2 focus:ring-accent transition-all text-sm" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-4">Clinic Name</label>
                           <input required value={formData.clinic} onChange={(e) => setFormData({...formData, clinic: e.target.value})} type="text" placeholder="Clinic / Hospital" className="w-full px-6 py-4 bg-secondary/5 border border-secondary/10 rounded-2xl outline-none focus:ring-2 focus:ring-accent transition-all text-sm" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-4">Work Email</label>
                        <input required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" placeholder="julian@clinic.io" className="w-full px-6 py-4 bg-secondary/5 border border-secondary/10 rounded-2xl outline-none focus:ring-2 focus:ring-accent transition-all text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-4">Technical Details</label>
                        <textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={4} placeholder="Describe the device technical issue or clinical requirement..." className="w-full px-6 py-4 bg-secondary/5 border border-secondary/10 rounded-2xl outline-none focus:ring-2 focus:ring-accent transition-all resize-none text-sm" />
                    </div>
                    <Button type="submit" disabled={isSubmitting} size="lg" className="w-full h-14 md:h-16 uppercase font-black text-xs md:text-sm gap-2">
                       {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <>Submit Inquiry <ArrowRight size={18} /></>}
                    </Button>
                  </form>
                )}
             </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 px-6 md:px-12 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <h2 className="text-4xl font-bold text-primary font-heading tracking-tight">Clinical Knowledge Base</h2>
             <p className="text-foreground/40 font-medium text-sm md:text-base">Frequently asked questions regarding technical device management.</p>
          </div>

          <div className="space-y-4">
            {FAQs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-secondary/10 rounded-3xl overflow-hidden shadow-sm">
                <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left group">
                  <span className="text-base md:text-lg font-bold text-primary group-hover:text-accent transition-colors">{faq.q}</span>
                  <ChevronDown className={cn("text-primary/30 transition-transform duration-300 shrink-0 ml-4", activeFaq === idx && "rotate-180")} size={20} />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-6 md:px-8 pb-6 md:pb-8 text-sm md:text-base text-foreground/60 leading-relaxed font-medium">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
