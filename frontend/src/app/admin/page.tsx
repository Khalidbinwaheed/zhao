"use client";

import { 
  TrendingUp, Users, ShoppingCart, DollarSign, 
  ArrowUpRight, ArrowDownRight, Package, Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const stats = [
  { label: "Total Revenue", value: "$45,231.89", trend: "+12.5%", isPositive: true, icon: DollarSign, color: "bg-blue-500" },
  { label: "Total Orders", value: "154", trend: "+8.2%", isPositive: true, icon: ShoppingCart, color: "bg-accent" },
  { label: "Active Customers", value: "1,240", trend: "-2.4%", isPositive: false, icon: Users, color: "bg-purple-500" },
  { label: "Avg. Order Value", value: "$293.71", trend: "+4.1%", isPositive: true, icon: TrendingUp, color: "bg-green-500" },
];

const recentOrders = [
  { id: "#ZBO-20349", customer: "Dr. Alicia Heart", product: "Lumina-X Mask", amount: "$1,200", status: "Processing" },
  { id: "#ZBO-20348", customer: "Dermatol Clinic", product: "DermaPro Pen", amount: "$850", status: "Delivered" },
  { id: "#ZBO-20347", customer: "Future Skin Pro", product: "AquaFlow System", amount: "$1,500", status: "Shipped" },
  { id: "#ZBO-20346", customer: "Dr. Mark R.", product: "Sapphire Blades", amount: "$450", status: "Delivered" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary font-heading">Dashboard <span className="text-accent italic font-light">Overview</span></h2>
          <p className="text-foreground/40 text-sm font-medium uppercase tracking-[0.2em] mt-1">Real-time Clinical Analytics</p>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-2.5 bg-white border border-secondary/20 rounded-xl text-xs font-bold uppercase tracking-widest text-primary hover:bg-slate-50 transition-all">Export Report</button>
           <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">New Product</button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-secondary/20 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-2xl ${stat.color} text-white`}>
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-black ${stat.isPositive ? "text-green-500" : "text-red-500"}`}>
                {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-primary font-heading">{stat.value}</h3>
              <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="xl:col-span-2 bg-white rounded-[2.5rem] border border-secondary/20 p-8 shadow-sm">
           <div className="flex items-center justify-between mb-8 pb-4 border-b border-secondary/10">
              <h3 className="text-xl font-bold text-primary font-heading">Recent Clinical Orders</h3>
              <button className="text-xs font-bold text-accent uppercase tracking-widest hover:underline">View All</button>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em]">
                    <th className="pb-6 pl-4">Order ID</th>
                    <th className="pb-6">Customer</th>
                    <th className="pb-6">Product</th>
                    <th className="pb-6">Amount</th>
                    <th className="pb-6">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-4 pl-4 font-bold text-primary">{order.id}</td>
                      <td className="py-4 text-foreground/60">{order.customer}</td>
                      <td className="py-4 font-medium">{order.product}</td>
                      <td className="py-4 font-black">${order.amount}</td>
                      <td className="py-4">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 
                          order.status === 'Processing' ? 'bg-accent/10 text-accent' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>

        {/* Inventory Highights */}
        <div className="bg-white rounded-[2.5rem] border border-secondary/20 p-8 shadow-sm">
           <h3 className="text-xl font-bold text-primary font-heading mb-8 border-b border-secondary/10 pb-4">Inventory <span className="text-accent">Alerts</span></h3>
           <div className="space-y-6">
              {[
                { name: "DermaPro Needles", stock: 12, level: "Low" },
                { name: "Sapphire Blades", stock: 5, level: "Critical" },
                { name: "Lumina Mask X1", stock: 8, level: "Low" }
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-secondary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm border border-secondary/10">
                      <Package size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary">{item.name}</p>
                      <p className="text-[10px] uppercase font-bold text-foreground/30 tracking-widest">{item.stock} in stock</p>
                    </div>
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                    item.level === 'Critical' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
                  }`}>
                    {item.level}
                  </span>
                </div>
              ))}
           </div>
           <Button variant="outline" size="sm" className="w-full mt-8 uppercase font-bold tracking-widest text-[10px]">Manage Stock</Button>
        </div>
      </div>
    </div>
  );
}
