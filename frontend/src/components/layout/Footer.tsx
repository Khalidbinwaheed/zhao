import Link from "next/link";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export const Footer = () => {
  return (
    <footer className="bg-secondary/20 border-t border-secondary/30 pt-16 pb-8 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Info */}
        <div className="space-y-6">
          <Logo />
          <p className="text-foreground/70 text-sm leading-relaxed">
            Advanced dermatology-inspired devices for skin rejuvenation and precision treatments. 
            Empowering professionals with state-of-the-art beauty technology.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
              <Instagram size={18} />
            </Link>
            <Link href="#" className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
              <Facebook size={18} />
            </Link>
            <Link href="#" className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
              <Twitter size={18} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-primary font-bold mb-6 font-heading">Shop</h3>
          <ul className="space-y-4">
            <li><Link href="/category/microneedling" className="text-sm text-foreground/70 hover:text-accent transition-colors">Microneedling Devices</Link></li>
            <li><Link href="/category/led-therapy" className="text-sm text-foreground/70 hover:text-accent transition-colors">LED Light Therapy</Link></li>
            <li><Link href="/category/serum-infusion" className="text-sm text-foreground/70 hover:text-accent transition-colors">Serum Infusion Tools</Link></li>
            <li><Link href="/category/hair-transplant" className="text-sm text-foreground/70 hover:text-accent transition-colors">Sapphire Blades</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-primary font-bold mb-6 font-heading">Company</h3>
          <ul className="space-y-4">
            <li><Link href="/about" className="text-sm text-foreground/70 hover:text-accent transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="text-sm text-foreground/70 hover:text-accent transition-colors">Contact</Link></li>
            <li><Link href="/terms" className="text-sm text-foreground/70 hover:text-accent transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="text-sm text-foreground/70 hover:text-accent transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-primary font-bold mb-6 font-heading">Keep in Touch</h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm text-foreground/70">
              <Phone size={18} className="text-accent flex-shrink-0" />
              <span>+92 311 9604749</span>
            </li>
            <li className="flex gap-3 text-sm text-foreground/70">
              <Mail size={18} className="text-accent flex-shrink-0" />
              <span>sales@zhaobeauty.tech</span>
            </li>
            <li className="flex gap-3 text-sm text-foreground/70">
              <MapPin size={18} className="text-accent flex-shrink-0" />
              <span>Industrial Area, Lahore, Pakistan</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-secondary/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-foreground/50">
          © {new Date().getFullYear()} Zhao Beauty Tech. All rights reserved.
        </p>
        <div className="flex gap-6">
          {/* Payment icons would go here */}
          <div className="w-10 h-6 bg-white/50 rounded flex items-center justify-center text-[8px] font-bold text-foreground/30 uppercase">Visa</div>
          <div className="w-10 h-6 bg-white/50 rounded flex items-center justify-center text-[8px] font-bold text-foreground/30 uppercase">MC</div>
          <div className="w-10 h-6 bg-white/50 rounded flex items-center justify-center text-[8px] font-bold text-foreground/30 uppercase">Stripe</div>
        </div>
      </div>
    </footer>
  );
};
