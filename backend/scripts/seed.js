const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const products = [
  {
    name: "DermaPro Microneedling Pen v2",
    category: "Microneedling Devices",
    price: 850,
    rating: 4.8,
    reviews: 124,
    stock: 25,
    isBestSeller: true,
    description: "Aerospace-grade clinical microneedling device with adjustable depth."
  },
  {
    name: "Lumina-X LED Mask (Professional)",
    category: "LED Therapy",
    price: 1200,
    rating: 4.9,
    reviews: 86,
    stock: 12,
    isNewArrival: true,
    description: "Multi-spectrum LED mask for professional dermatological treatment."
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Database Seeded!");
    process.exit();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDB();
