import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();
  try {
    const { name, email, password, clinicName } = await req.json();

    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      clinicName,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      token,
      user: { id: user._id, name, email, role: user.role },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
