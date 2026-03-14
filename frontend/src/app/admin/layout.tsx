"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Package, ShoppingCart, Users, 
  BarChart3, Settings, Bell, Search, LogOut, 
  Menu, ChevronLeft, Sparkles 
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Bell, label: "Notifications", href: "/admin/notifications" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-primary text-white flex flex-col relative z-20 shadow-2xl"
      >
        <div className="p-6 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {isSidebarOpen ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Link href="/admin">
                  <span className="text-xl font-bold tracking-tight text-white font-heading">
                    ZHAO<span className="text-accent italic font-light ml-0.5">ADMIN</span>
                  </span>
                </Link>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <span className="text-xl font-bold text-accent">Z</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={16} className={isSidebarOpen ? "" : "rotate-180"} />
          </button>
        </div>

        <nav className="flex-grow mt-8 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                pathname === item.href 
                ? "bg-white text-primary shadow-lg shadow-black/10" 
                : "hover:bg-white/10 text-white/60"
              }`}
            >
              <item.icon size={20} className={pathname === item.href ? "text-accent" : ""} />
              {isSidebarOpen && <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${isSidebarOpen ? "" : "hidden"}`}>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Cloud Usage</p>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-accent" />
            </div>
          </div>
          <button className="w-full flex items-center gap-4 px-4 py-4 mt-4 text-white/40 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-bold uppercase tracking-widest">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0 h-full overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-secondary/20 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-grow max-w-sm">
            <Search size={18} className="text-foreground/20" />
            <input 
              type="text" 
              placeholder="Search administration..." 
              className="w-full bg-secondary/5 border-none rounded-xl py-2 px-4 text-xs outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 pr-6 border-r border-secondary/20">
               <div className="text-right">
                  <p className="text-xs font-bold text-primary leading-none uppercase tracking-widest mb-1">Super Admin</p>
                  <p className="text-[10px] text-foreground/40 font-medium">Zhao Tech HQ</p>
               </div>
               <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-primary font-bold border border-secondary/20">
                 AD
               </div>
            </div>
            <button className="relative p-2 text-foreground/30 hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        {/* Content Overflow */}
        <main className="flex-grow overflow-y-auto p-8 relative">
           <AnimatePresence mode="wait">
             <motion.div
               key={pathname}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.2 }}
             >
               {children}
             </motion.div>
           </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
