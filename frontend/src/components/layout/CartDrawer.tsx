"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-secondary/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-primary" size={24} />
                <h2 className="text-xl font-bold text-primary font-heading">Your Cart ({totalItems})</h2>
              </div>
              <button onClick={onClose} className="p-2 text-foreground/40 hover:text-primary transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                    <ShoppingBag size={40} />
                  </div>
                  <h3 className="text-lg font-bold text-primary">Your cart is empty</h3>
                  <p className="text-foreground/40 text-sm max-w-[200px]">Looks like you haven't added any professional gear yet.</p>
                  <Button onClick={onClose} variant="outline" size="sm">Start Shopping</Button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 bg-secondary/10 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2">
                       <div className="w-full h-full bg-white rounded-lg flex items-center justify-center border border-secondary/20">
                         <span className="text-[10px] font-black text-secondary/30 uppercase">Tech</span>
                       </div>
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-sm font-bold text-primary truncate mb-1">{item.name}</h4>
                      <div className="text-xs text-foreground/40 mb-3">{item.category}</div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-secondary/5 rounded-lg px-2 py-1">
                          <button 
                            onPointerDown={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-primary/60 hover:text-accent"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                          <button 
                            onPointerDown={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-primary/60 hover:text-accent"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-sm font-black text-primary">${item.price * item.quantity}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-foreground/20 hover:text-red-500 transition-all self-start"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-secondary/10 bg-slate-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Subtotal</span>
                  <span className="text-2xl font-black text-primary font-heading">${totalPrice}</span>
                </div>
                <div className="space-y-3">
                  <Link href="/checkout" onClick={onClose} className="block w-full">
                    <Button className="w-full h-14 text-sm font-black uppercase tracking-widest gap-2">
                      Proceed to Checkout <ArrowRight size={18} />
                    </Button>
                  </Link>
                  <p className="text-[10px] text-center text-foreground/40 leading-tight">
                    Shipping and professional clinical fees calculated at next step.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
