import { Hero } from "@/components/home/Hero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { ProductCategories } from "@/components/home/ProductCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <TrustBadges />
      <ProductCategories />
      <FeaturedProducts />
      
      {/* Call to Action Section */}
      <section className="bg-primary text-white py-24 px-6 md:px-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 font-heading">Ready to Upgrade Your Clinic?</h2>
          <p className="text-white/70 text-lg max-w-2xl mb-12">
            Join thousands of professionals who trust Zhao Beauty Tech for their dermatology and skincare device needs.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-accent text-white px-10 py-4 rounded-full font-bold hover:bg-accent/90 transition-all shadow-lg active:scale-95">
              Contact Sales
            </button>
            <button className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all active:scale-95">
              Download Catalog
            </button>
          </div>
        </div>
        
        {/* Abstract background graphics */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </section>
    </div>
  );
}
