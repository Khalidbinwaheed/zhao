"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  User as UserIcon, Package, MapPin, Settings, LogOut, 
  ChevronRight, Clock, ShieldCheck, CreditCard, 
  ExternalLink, Search
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";

const mockOrders = [
  { id: "ZBO-19385", date: "Mar 12, 2026", status: "Processing", total: 1250, items: 2 },
  { id: "ZBO-18241", date: "Feb 28, 2026", status: "Delivered", total: 850, items: 1 },
  { id: "ZBO-17102", date: "Jan 15, 2026", status: "Delivered", total: 2100, items: 3 },
];

export default function AccountPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) return null; // Or redirect

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2 font-heading tracking-tight">Clinical <span className="text-accent italic font-light">Dashboard</span></h1>
            <p className="text-foreground/40 text-sm font-medium">Welcome back, <span className="text-primary font-bold">{user.name}</span></p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white px-5 py-3 rounded-2xl border border-secondary/20 shadow-sm flex items-center gap-3">
               <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold">
                 {user.name.split(' ').map(n => n[0]).join('')}
               </div>
               <div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 leading-none mb-1">Account Role</p>
                 <p className="text-xs font-bold text-primary leading-none uppercase">{user.role} Specialist</p>
               </div>
             </div>
             <button 
              onClick={logout}
              className="bg-white p-3 rounded-2xl border border-secondary/20 text-foreground/40 hover:text-red-500 transition-colors shadow-sm"
             >
                <LogOut size={20} />
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Nav */}
          <aside className="lg:col-span-1 space-y-2">
            {[
              { id: "overview", icon: UserIcon, label: "Profile Overview" },
              { id: "orders", icon: Package, label: "Order History" },
              { id: "addresses", icon: MapPin, label: "Saved Addresses" },
              { id: "billing", icon: CreditCard, label: "Billing & Invoices" },
              { id: "settings", icon: Settings, label: "Account Settings" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all ${
                  activeTab === item.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" 
                  : "hover:bg-white text-foreground/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <item.icon size={20} className={activeTab === item.id ? "text-accent" : ""} />
                  <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                </div>
                {activeTab === item.id && <ChevronRight size={16} />}
              </button>
            ))}
            
            <div className="pt-8 px-4">
               <div className="bg-accent/10 p-6 rounded-[2rem] border border-accent/20 relative overflow-hidden">
                  <ShieldCheck className="absolute -right-4 -bottom-4 text-accent/10 w-24 h-24" />
                  <h4 className="text-sm font-bold text-primary mb-2 relative z-10">Premium Member</h4>
                  <p className="text-[10px] text-primary/60 mb-4 relative z-10">You have access to 15% clinical discounts on all renewals.</p>
                  <Button size="sm" variant="outline" className="w-full bg-white/50 border-accent/30 text-accent text-[8px] tracking-widest hover:bg-accent hover:text-white relative z-10 uppercase">View Perks</Button>
               </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-secondary/20 min-h-[600px] p-8 md:p-12">
              {activeTab === "overview" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary"><Package size={20} /></div>
                      <h3 className="text-2xl font-black text-primary font-heading">12</h3>
                      <p className="text-xs font-bold uppercase tracking-widest text-foreground/30">Total Orders</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent"><Clock size={20} /></div>
                      <h3 className="text-2xl font-black text-primary font-heading">#ZBO-193</h3>
                      <p className="text-xs font-bold uppercase tracking-widest text-foreground/30">Ongoing Order</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
                      <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center text-green-600"><ShieldCheck size={20} /></div>
                      <h3 className="text-2xl font-black text-primary font-heading">Active</h3>
                      <p className="text-xs font-bold uppercase tracking-widest text-foreground/30">Account Status</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                     <div className="flex items-center justify-between border-b border-secondary/10 pb-4">
                        <h3 className="text-xl font-bold text-primary font-heading">Recent Clinical Orders</h3>
                        <button onClick={() => setActiveTab("orders")} className="text-xs font-bold text-accent uppercase tracking-widest hover:underline">View All</button>
                     </div>
                     <div className="space-y-4">
                        {mockOrders.slice(0, 2).map((order) => (
                           <div key={order.id} className="group flex items-center justify-between p-6 rounded-2xl border border-secondary/10 hover:border-primary transition-all">
                              <div className="flex items-center gap-6">
                                 <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors"><Package size={20} /></div>
                                 <div className="space-y-1">
                                    <p className="font-bold text-primary">{order.id}</p>
                                    <p className="text-xs text-foreground/40">{order.date} • {order.items} Items</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-8">
                                 <div className="text-right">
                                    <p className="font-bold text-primary">${order.total}</p>
                                    <p className={`text-[10px] uppercase font-bold tracking-widest ${order.status === 'Delivered' ? 'text-green-500' : 'text-accent'}`}>{order.status}</p>
                                 </div>
                                 <button className="p-2 text-foreground/20 hover:text-primary transition-colors"><ExternalLink size={18} /></button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "orders" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold text-primary font-heading">Clinical Order History</h2>
                    <div className="relative max-w-xs w-full">
                       <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/20" />
                       <input type="text" placeholder="Search orders..." className="w-full pl-10 pr-4 py-3 bg-secondary/5 border-none rounded-xl text-xs outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="p-8 rounded-[2rem] border border-secondary/10 space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-secondary/10 pb-6">
                           <div className="flex items-center gap-4">
                              <span className="bg-primary/5 text-primary text-xs font-black px-4 py-2 rounded-full">{order.id}</span>
                              <span className="text-xs font-medium text-foreground/40">{order.date}</span>
                           </div>
                           <div className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                             order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-accent/10 text-accent'
                           }`}>
                             {order.status}
                           </div>
                        </div>
                        <div className="flex items-center justify-between">
                           <div className="flex -space-x-3">
                              {[...Array(order.items)].map((_, i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-foreground/20 uppercase overflow-hidden relative">
                                  <div className="absolute inset-0 bg-secondary/10" />
                                  <span className="relative">Tech</span>
                                </div>
                              ))}
                              {order.items > 3 && <div className="w-10 h-10 rounded-full bg-secondary/20 border-2 border-white flex items-center justify-center text-[10px] font-bold text-primary">+{order.items - 3}</div>}
                           </div>
                           <div className="text-right">
                              <p className="text-xs text-foreground/30 font-bold uppercase tracking-widest mb-1">Total Paid</p>
                              <p className="text-2xl font-black text-primary font-heading">${order.total}</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <Button size="sm" variant="outline" className="flex-grow text-[10px] uppercase font-bold tracking-widest">Order Details</Button>
                           <Button size="sm" variant="ghost" className="flex-grow text-[10px] uppercase font-bold tracking-widest">Reorder</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "addresses" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 text-center py-12">
                   <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-primary/30 mx-auto mb-6"><MapPin size={40} /></div>
                   <h2 className="text-2xl font-bold text-primary font-heading">Clinical Addresses</h2>
                   <p className="text-foreground/40 text-sm max-w-md mx-auto">Manage your primary delivery locations for hospital and clinic equipment delivery.</p>
                   <Button size="lg" variant="outline" className="mt-8 gap-2">Add New Location <Plus size={18} /></Button>
                </motion.div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

const Plus = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
);
