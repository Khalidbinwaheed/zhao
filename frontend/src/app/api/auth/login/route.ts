import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();
  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      token,
      user: { id: user._id, name: user.name, email, role: user.role },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
