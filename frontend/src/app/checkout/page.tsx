"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { Check, ChevronRight, CreditCard, Truck, User, ArrowLeft, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const steps = ["Shipping", "Payment", "Review"];

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  if (cart.length === 0 && currentStep < 2) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-primary">Your cart is empty</h2>
        <Link href="/products">
          <Button className="mt-4">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 0, s - 1));

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-16 gap-4">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep >= i ? "bg-primary text-white" : "bg-white text-foreground/30 border-2 border-secondary/20"
                }`}>
                  {currentStep > i ? <Check size={18} /> : i + 1}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                  currentStep >= i ? "text-primary" : "text-foreground/30"
                }`}>{step}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-12 h-[2px] mb-6 transition-all duration-300 ${
                  currentStep > i ? "bg-primary" : "bg-secondary/20"
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-secondary/20 space-y-8"
                >
                  <h2 className="text-2xl font-bold text-primary font-heading">Shipping Information</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary/40 uppercase tracking-widest">First Name</label>
                      <input type="text" className="w-full px-4 py-3 bg-secondary/5 border border-secondary/20 rounded-xl outline-none focus:ring-2 focus:ring-accent" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary/40 uppercase tracking-widest">Last Name</label>
                      <input type="text" className="w-full px-4 py-3 bg-secondary/5 border border-secondary/20 rounded-xl outline-none focus:ring-2 focus:ring-accent" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-primary/40 uppercase tracking-widest">Address Line</label>
                    <input type="text" className="w-full px-4 py-3 bg-secondary/5 border border-secondary/20 rounded-xl outline-none focus:ring-2 focus:ring-accent" placeholder="123 Clinical St." />
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary/40 uppercase tracking-widest">City</label>
                      <input type="text" className="w-full px-4 py-3 bg-secondary/5 border border-secondary/20 rounded-xl outline-none focus:ring-2 focus:ring-accent" placeholder="Lahore" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary/40 uppercase tracking-widest">Zip Code</label>
                      <input type="text" className="w-full px-4 py-3 bg-secondary/5 border border-secondary/20 rounded-xl outline-none focus:ring-2 focus:ring-accent" placeholder="54000" />
                    </div>
                  </div>
                  <Button size="lg" className="w-full h-16 uppercase font-black" onClick={nextStep}>Continue to Payment</Button>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-secondary/20 space-y-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <button onClick={prevStep} className="p-2 text-foreground/40 hover:text-primary transition-colors">
                      <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-2xl font-bold text-primary font-heading">Payment Method</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <button className="flex items-center justify-between p-6 rounded-2xl border-2 border-primary bg-primary/5">
                      <div className="flex items-center gap-4 text-left">
                        <CreditCard className="text-primary" />
                        <div>
                          <p className="font-bold text-primary">Stripe / Online</p>
                          <p className="text-xs text-foreground/40 font-medium tracking-wide">Secure encrypted payment</p>
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                        <div className="w-3 h-3 bg-primary rounded-full transition-all" />
                      </div>
                    </button>
                    <button className="flex items-center justify-between p-6 rounded-2xl border-2 border-secondary/20 hover:border-primary transition-all">
                      <div className="flex items-center gap-4 text-left">
                        <Truck className="text-foreground/40" />
                        <div>
                          <p className="font-bold text-foreground/40">Cash on Delivery</p>
                          <p className="text-xs text-foreground/40 font-medium tracking-wide">Available for local clinics only</p>
                        </div>
                      </div>
                    </button>
                  </div>
                  
                  <div className="space-y-8 pt-4">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-primary/40 uppercase tracking-widest">Card Details (Placeholder)</label>
                       <div className="w-full px-4 py-8 bg-secondary/5 border-2 border-dashed border-secondary/30 rounded-xl flex items-center justify-center text-foreground/30 text-xs italic">
                         Stripe Elements integration would go here.
                       </div>
                    </div>
                    <Button size="lg" className="w-full h-16 uppercase font-black" onClick={nextStep}>Review Your Order</Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-secondary/20 space-y-8"
                >
                   <div className="flex items-center gap-4 mb-4">
                    <button onClick={prevStep} className="p-2 text-foreground/40 hover:text-primary transition-colors">
                      <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-2xl font-bold text-primary font-heading">Review Order</h2>
                  </div>

                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm border-b border-secondary/10 pb-4 last:border-0 last:pb-0">
                         <div className="flex items-center gap-4">
                            <span className="font-bold text-primary">{item.quantity}x</span>
                            <span className="font-medium text-foreground/60">{item.name}</span>
                         </div>
                         <span className="font-bold text-primary">${item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-primary/5 p-6 rounded-2xl">
                    <div className="flex items-center gap-4 text-primary text-sm font-bold opacity-70">
                       <ShieldCheck size={18} />
                       Your order is protected by our professional clinical guarantee.
                    </div>
                  </div>

                  <Button size="lg" className="w-full h-16 uppercase font-black" onClick={() => {
                    clearCart();
                    router.push("/checkout/success");
                  }}>Place Order & Pay</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-secondary/20">
              <h3 className="text-lg font-bold text-primary mb-6 border-b border-secondary/10 pb-4">Order Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-foreground/40">Subtotal</span>
                  <span className="font-bold text-primary">${totalPrice}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-foreground/40">Shipping</span>
                  <span className="text-accent font-bold">FREE</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-foreground/40">Tax (Clinical)</span>
                  <span className="font-bold text-primary">$0.00</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t-2 border-dashed border-secondary/10">
                <span className="font-heading font-black text-primary uppercase tracking-widest text-xs">Total</span>
                <span className="text-3xl font-black text-primary font-heading">${totalPrice}</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 opacity-30 grayscale pointer-events-none">
               <div className="flex gap-4">
                  <div className="w-12 h-8 bg-white border rounded" />
                  <div className="w-12 h-8 bg-white border rounded" />
                  <div className="w-12 h-8 bg-white border rounded" />
               </div>
               <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Secure Clinical Checkout</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
