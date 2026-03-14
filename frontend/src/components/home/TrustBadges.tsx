import { ShieldCheck, Truck, Clock, Award } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    title: "Medical Grade",
    desc: "Certified skincare technology",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    desc: "Worldwide express delivery",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Expert guidance anytime",
  },
  {
    icon: Award,
    title: "Premium Quality",
    desc: "Dermatology inspired precision",
  },
];

export const TrustBadges = () => {
  return (
    <div className="bg-white py-12 px-6 md:px-12 border-b border-secondary/20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {badges.map((badge, i) => (
          <div key={i} className="flex items-center gap-4 group hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <badge.icon size={24} />
            </div>
            <div>
              <h4 className="font-bold text-primary text-sm uppercase tracking-wider">{badge.title}</h4>
              <p className="text-xs text-foreground/50">{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
