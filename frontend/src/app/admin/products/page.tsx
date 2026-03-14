"use client";

import { useState } from "react";
import { mockProducts } from "@/data/mockProducts";
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, ArrowUpDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await api.get("/products");
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-secondary/10">
        <div>
          <h2 className="text-3xl font-bold text-primary font-heading">Product <span className="text-accent italic font-light">Inventory</span></h2>
          <p className="text-foreground/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Manage Clinical Equipment Catalog</p>
        </div>
        <div className="flex gap-4">
           <div className="relative">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/20" />
             <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-10 pr-4 py-3 bg-white border border-secondary/20 rounded-xl text-xs outline-none focus:ring-2 focus:ring-accent min-w-[240px]"
             />
           </div>
           <Button onClick={() => setIsAddModalOpen(true)} className="gap-2 h-12 uppercase font-black text-[10px] tracking-widest">
             <Plus size={18} /> Add New Device
           </Button>
        </div>
      </header>

      {/* Product Table */}
      <div className="bg-white rounded-[2.5rem] border border-secondary/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em]">
                <th className="py-6 pl-8">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    Product Details <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-6">Category</th>
                <th className="py-6">Price</th>
                <th className="py-6">Stock Level</th>
                <th className="py-6">Performance</th>
                <th className="py-6 pr-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm border-t border-secondary/10 relative">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="animate-spin text-accent" size={32} />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Querying Database...</p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id || product._id} className="group hover:bg-slate-50 transition-colors border-b border-secondary/5 last:border-0 font-medium">
                    <td className="py-6 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-primary/40 text-[8px] font-black uppercase">TECH</div>
                        <div>
                          <p className="font-bold text-primary truncate max-w-[200px]">{product.name}</p>
                          <p className="text-[10px] text-foreground/30 uppercase tracking-widest font-black">ID: {product.id || product._id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6">
                      <span className="px-3 py-1 bg-secondary/10 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest border border-secondary/10">{product.category}</span>
                    </td>
                    <td className="py-6 font-black text-primary">${product.price}</td>
                    <td className="py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-1.5 bg-secondary/20 rounded-full overflow-hidden">
                          <div className="h-full bg-accent transition-all" style={{ width: '85%' }} />
                        </div>
                        <span className="text-[10px] font-bold text-foreground/40">{product.stock} PCS</span>
                      </div>
                    </td>
                    <td className="py-6">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-primary">{product.rating}</span>
                        <span className="text-[10px] text-foreground/30 font-bold ml-1">({product.reviews})</span>
                      </div>
                    </td>
                    <td className="py-6 pr-8 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-2 bg-white border border-secondary/20 rounded-lg text-foreground/30 hover:text-primary transition-all shadow-sm">
                           <Edit size={16} />
                         </button>
                         <button className="p-2 bg-white border border-secondary/20 rounded-lg text-foreground/30 hover:text-red-500 transition-all shadow-sm">
                           <Trash2 size={16} />
                         </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Placeholder for Pagination */}
      <div className="flex items-center justify-between px-8">
         <p className="text-xs text-foreground/30 font-bold uppercase tracking-widest">Page 1 of 12</p>
         <div className="flex gap-2">
            <button className="p-2 bg-white border border-secondary/20 rounded-lg text-foreground/20 hover:text-primary transition-all shadow-sm"><ChevronRight size={20} className="rotate-180" /></button>
            <button className="p-2 bg-white border border-secondary/20 rounded-lg text-foreground/20 hover:text-primary transition-all shadow-sm"><ChevronRight size={20} /></button>
         </div>
      </div>

      {/* Mock Add Product Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-primary/20 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-10 border-b border-secondary/10 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-primary font-heading">Add New Clinical <span className="text-accent italic font-light">Device</span></h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-foreground/20 hover:text-primary transition-colors text-3xl font-light">×</button>
              </div>
              <div className="p-10 overflow-y-auto space-y-8">
                 <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-4">Device Name</label>
                     <input type="text" className="w-full px-6 py-4 bg-secondary/5 border border-secondary/10 rounded-2xl outline-none focus:ring-2 focus:ring-accent" placeholder="e.g. Lumina Pro v2" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-4">Category</label>
                     <select className="w-full px-6 py-4 bg-secondary/5 border border-secondary/10 rounded-2xl outline-none focus:ring-2 focus:ring-accent appearance-none bg-no-repeat bg-[right_1.5rem_center] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9InJnYigxNSwgNzYsIDEyOSkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNiA5bDYgNiA2LTYiLz48L3N2Zz4=')]">
                        <option>Microneedling Devices</option>
                        <option>LED Therapy</option>
                        <option>Serum Infusion</option>
                        <option>Sapphire Blades</option>
                     </select>
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-4">Market Price ($)</label>
                      <input type="number" className="w-full px-6 py-4 bg-secondary/5 border border-secondary/10 rounded-2xl outline-none focus:ring-2 focus:ring-accent" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-4">Initial Stock</label>
                      <input type="number" className="w-full px-6 py-4 bg-secondary/5 border border-secondary/10 rounded-2xl outline-none focus:ring-2 focus:ring-accent" placeholder="0" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-4">Technical Description</label>
                    <textarea rows={4} className="w-full px-6 py-4 bg-secondary/5 border border-secondary/10 rounded-2xl outline-none focus:ring-2 focus:ring-accent" placeholder="Enter clinical specifications..."></textarea>
                 </div>
              </div>
              <div className="p-10 bg-slate-50 flex gap-4">
                 <Button variant="ghost" className="flex-grow uppercase font-black text-[10px] tracking-widest" onClick={() => setIsAddModalOpen(false)}>Discard</Button>
                 <Button className="flex-grow h-14 uppercase font-black text-[10px] tracking-widest shadow-xl shadow-primary/20">Initialize Product</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Star = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
