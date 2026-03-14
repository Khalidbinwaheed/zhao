"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User as UserIcon, Search, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Center: Logo */}
        <Logo className="md:flex-shrink-0" />

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-foreground/80 hover:text-primary transition-colors"
            >
              <Search size={20} />
            </button>
            <SearchBox isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          </div>

            {/* User Profile */}
            <div className="relative">
              <button 
                onClick={() => user ? setIsUserMenuOpen(!isUserMenuOpen) : null}
                className="p-2 text-primary hover:text-accent transition-colors relative"
              >
                {user ? (
                  <div className="w-8 h-8 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center uppercase border-2 border-white shadow-sm">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                ) : (
                  <Link href="/login">
                    <UserIcon size={24} strokeWidth={1.5} />
                  </Link>
                )}
              </button>

              <AnimatePresence>
                {isUserMenuOpen && user && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-2xl border border-secondary/10 p-2 z-50"
                  >
                    <div className="p-4 border-b border-secondary/5">
                      <p className="text-xs font-bold text-primary truncate">{user.name}</p>
                      <p className="text-[10px] text-foreground/40 truncate">{user.email}</p>
                    </div>
                    <div className="py-2">
                       <Link href="/account" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-foreground/60 hover:text-primary hover:bg-secondary/5 rounded-xl transition-all">
                         <UserIcon size={16} /> Profile Settings
                       </Link>
                       {user.role === 'admin' && (
                         <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-accent hover:bg-accent/5 rounded-xl transition-all">
                           <LayoutDashboard size={16} /> Admin Panel
                         </Link>
                       )}
                       <button 
                        onClick={() => { logout(); setIsUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
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
            className="p-2 text-foreground/80 hover:text-primary transition-colors relative"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
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
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background p-6 md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <Logo />
              <button
                className="p-2 text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            <ul className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-2xl font-medium text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
