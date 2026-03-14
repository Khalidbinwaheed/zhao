"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User as UserIcon, Search, Menu, X, LogOut, LayoutDashboard, HelpCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop All", href: "/products" },
  { name: "Microneedling", href: "/category/microneedling" },
  { name: "LED Therapy", href: "/category/led-therapy" },
  { name: "Support", href: "/support" },
];

import { CartDrawer } from "@/components/layout/CartDrawer";
import { SearchBox } from "@/components/layout/SearchBox";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export const Header = () => {
  const { isCartOpen, setIsCartOpen, totalItems } = useCart();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-4",
        isScrolled
          ? "glass-effect shadow-lg shadow-primary/5 py-3"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-primary hover:bg-primary/5 rounded-xl transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Center: Logo */}
        <div className="flex items-center gap-2 group cursor-pointer transition-transform active:scale-95">
          <Logo className="md:flex-shrink-0" />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-[11px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-primary transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 text-primary/70 hover:text-primary hover:bg-primary/5 rounded-full transition-all"
            >
              <Search size={18} />
            </button>
            <SearchBox isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          </div>

            {/* User Profile */}
            <div className="relative">
              <button 
                onClick={() => user ? setIsUserMenuOpen(!isUserMenuOpen) : null}
                className="p-1 text-primary hover:scale-105 transition-transform"
              >
                {user ? (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-primary-light text-white text-[11px] font-bold flex items-center justify-center uppercase border-2 border-white shadow-md">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                ) : (
                  <Link href="/login" className="p-2 rounded-full hover:bg-primary/5 flex items-center justify-center">
                    <UserIcon size={20} strokeWidth={2} />
                  </Link>
                )}
              </button>

              <AnimatePresence>
                {isUserMenuOpen && user && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-64 bg-white rounded-[2rem] shadow-2xl border border-secondary/20 p-3 z-50 overflow-hidden"
                  >
                    <div className="p-5 border-b border-secondary/10 bg-slate-50/50 rounded-t-[1.5rem]">
                      <p className="text-sm font-bold text-primary truncate">{user.name}</p>
                      <p className="text-[10px] text-primary/40 font-bold uppercase tracking-widest truncate">{user.email}</p>
                    </div>
                    <div className="py-3 space-y-1">
                       <Link 
                        href="/account" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-4 px-5 py-3 text-xs font-bold text-primary/60 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all"
                       >
                         <UserIcon size={16} /> Profile Settings
                       </Link>
                       {user.role === 'admin' && (
                         <Link 
                          href="/admin" 
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-4 px-5 py-3 text-xs font-bold text-accent hover:bg-accent/5 rounded-2xl transition-all"
                         >
                           <LayoutDashboard size={16} /> Admin Panel
                         </Link>
                       )}
                       <div className="h-px bg-secondary/10 mx-4 my-2" />
                       <button 
                        onClick={() => { logout(); setIsUserMenuOpen(false); }}
                        className="w-full flex items-center gap-4 px-5 py-3 text-xs font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                       >
                         <LogOut size={16} /> Logout
                       </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-2.5 text-primary/70 hover:text-primary hover:bg-primary/5 rounded-full transition-all relative"
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-accent text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-primary/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white p-8 flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-12">
                <Logo />
                <button
                  className="p-2 text-primary hover:bg-primary/5 rounded-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X size={28} />
                </button>
              </div>
              
              <ul className="flex flex-col gap-8 mb-auto">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-2xl font-bold text-primary flex items-center justify-between group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                      <ArrowRight size={20} className="text-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="pt-8 border-t border-secondary/10 mt-12">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/30 mb-6">Support & Assistance</p>
                <Link 
                  href="/support" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 text-primary/60 font-bold"
                >
                  <HelpCircle size={20} /> Clinical Help Center
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

  );
};
