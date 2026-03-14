import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();
  try {
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const product = new Product(body);
    const newProduct = await product.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
