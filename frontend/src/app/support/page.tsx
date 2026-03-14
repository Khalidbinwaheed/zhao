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

const SupportPage = () => {
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
      <section className="pt-40 pb-20 md:pb-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-clinical-gradient/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <p className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-6">Expert Technical Network</p>
            <h1 className="text-5xl md:text-8xl font-black text-primary leading-[0.9] tracking-tight font-heading mb-10">
              Clinical <br />
              <span className="text-gradient">Support</span> Hub.
            </h1>
            <p className="text-primary/50 text-base md:text-xl font-medium leading-relaxed max-w-2xl">
              Precision assistance for dermatology professionals. From device calibration to advanced clinical protocols, our engineers ensure your technology never stops advancing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="pb-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Direct Assistance Sidebar */}
            <div className="lg:col-span-5 space-y-16">
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/30 mb-8 ml-2">Direct Clinical Support</h2>
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: "Live Hotline", value: "+1 (888) ZHAO-TECH" },
                    { icon: Mail, label: "Tech Inquiry", value: "support@zhaobeauty.com" },
                    { icon: MapPin, label: "Clinical HQ", value: "88 Precision Way, SG" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 p-6 glass-effect rounded-[2.5rem] hover:shadow-2xl hover:shadow-primary/5 transition-all group border border-primary/5">
                       <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform shrink-0">
                         <item.icon size={22} strokeWidth={2.5} />
                       </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-primary/30 mb-1">{item.label}</p>
                      <p className="text-base font-bold text-primary">{item.value}</p>
                    </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary p-12 rounded-[3.5rem] relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-3xl -translate-y-1/2 translate-x-1/2" />
                 <h3 className="text-2xl font-black text-white mb-8 leading-tight">ISO-13485 <br />Medical Standards</h3>
                 <div className="space-y-5">
                    {[
                      { icon: ShieldCheck, text: "Clinical Certification" },
                      { icon: Truck, text: "Medical Grade Logistics" },
                      { icon: CreditCard, text: "Encrypted Transactions" }
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/60">
                        <s.icon className="text-accent" size={18} /> {s.text}
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* Technical Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-16 rounded-[4rem] shadow-2xl shadow-primary/5 border border-primary/5 relative">
                 <h3 className="text-3xl font-black text-primary mb-3">Technical Inquiry</h3>
                 <p className="text-primary/40 font-medium text-sm mb-12">Escalate your clinical request to our senior engineering team.</p>

                 {isSuccess ? (
                   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-24 text-center space-y-6">
                     <div className="w-24 h-24 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                       <ShieldCheck size={48} strokeWidth={2.5} />
                     </div>
                     <h4 className="text-3xl font-black text-primary">Request Verified</h4>
                     <p className="text-primary/40 font-medium text-sm max-w-xs mx-auto">Triage complete. A clinical specialist will contact your facility within 12 standard business hours.</p>
                     <Button onClick={() => setIsSuccess(false)} variant="outline" className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-[10px]">Send New Request</Button>
                   </motion.div>
                 ) : (
                   <form onSubmit={handleSubmit} className="space-y-10">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em] ml-6">Practitioner Name</label>
                           <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" placeholder="Dr. Julian Vasile" className="w-full h-16 px-8 bg-primary/5 border-none rounded-2xl text-primary font-bold placeholder:text-primary/20 outline-none focus:ring-2 focus:ring-accent transition-all text-sm" />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em] ml-6">Medical Facility</label>
                           <input required value={formData.clinic} onChange={(e) => setFormData({...formData, clinic: e.target.value})} type="text" placeholder="Clinical Institution" className="w-full h-16 px-8 bg-primary/5 border-none rounded-2xl text-primary font-bold placeholder:text-primary/20 outline-none focus:ring-2 focus:ring-accent transition-all text-sm" />
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em] ml-6">Clinical Email</label>
                        <input required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" placeholder="julian@clinic.io" className="w-full h-16 px-8 bg-primary/5 border-none rounded-2xl text-primary font-bold placeholder:text-primary/20 outline-none focus:ring-2 focus:ring-accent transition-all text-sm" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em] ml-6">Technical Specification</label>
                        <textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={5} placeholder="Describe the device technical anomaly or clinical integration requirement..." className="w-full p-8 bg-primary/5 border-none rounded-[2rem] text-primary font-bold placeholder:text-primary/20 outline-none focus:ring-2 focus:ring-accent transition-all resize-none text-sm" />
                     </div>
                     <Button type="submit" disabled={isSubmitting} className="w-full h-20 bg-primary text-white font-black uppercase tracking-[0.3em] text-xs rounded-3xl group shadow-2xl shadow-primary/20 active:scale-[0.98] transition-all">
                        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <>Submit Clinical Triage <ArrowRight size={20} className="ml-4 group-hover:translate-x-3 transition-transform" /></>}
                     </Button>
                   </form>
                 )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-32 px-6 md:px-12 bg-gray-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 space-y-6">
             <h2 className="text-5xl font-black text-primary font-heading tracking-tight">Technical Repository</h2>
             <p className="text-primary/40 font-bold uppercase tracking-widest text-[10px] max-w-md mx-auto">Verified responses regarding system calibration and technical protocol management.</p>
          </div>

          <div className="space-y-4">
            {FAQs.map((faq, idx) => (
              <div key={idx} className="glass-effect rounded-[2rem] overflow-hidden border border-primary/5">
                <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full px-10 py-8 flex items-center justify-between text-left group">
                  <span className="text-base md:text-lg font-black text-primary group-hover:text-accent transition-colors">{faq.q}</span>
                  <div className={cn("w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center transition-all", activeFaq === idx && "bg-primary text-white rotate-180")}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-10 pb-10 text-primary/50 text-sm md:text-base font-medium leading-relaxed">
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
};

export default SupportPage;


