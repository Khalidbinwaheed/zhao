export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "DermaPro Microneedling Pen v2",
    category: "Microneedling Devices",
    price: 850,
    rating: 4.8,
    reviews: 124,
    image: "/images/product-1.png",
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Lumina-X LED Mask (Professional)",
    category: "LED Therapy",
    price: 1200,
    rating: 4.9,
    reviews: 86,
    image: "/images/product-2.png",
    isNew: true,
  },
  {
    id: "3",
    name: "AquaFlow Serum Infusion System",
    category: "Serum Infusion",
    price: 1500,
    rating: 4.7,
    reviews: 52,
    image: "/images/product-3.png",
  },
  {
    id: "4",
    name: "Precision Sapphire Hair Blade (Set of 10)",
    category: "Hair Transplant Tools",
    price: 450,
    rating: 5.0,
    reviews: 31,
    image: "/images/product-4.png",
    isBestSeller: true,
  },
  {
    id: "5",
    name: "Revive+ Cryo-Derm Device",
    category: "Professional Skincare",
    price: 2100,
    rating: 4.6,
    reviews: 18,
    image: "/images/product-5.png",
    isNew: true,
  },
  {
    id: "6",
    name: "GlowNano Mini Infusion Tool",
    category: "Serum Infusion",
    price: 299,
    rating: 4.5,
    reviews: 210,
    image: "/images/product-6.png",
  }
];
