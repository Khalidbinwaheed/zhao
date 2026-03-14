import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
