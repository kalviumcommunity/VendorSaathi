import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import {
  loginSchema,
  parseBody,
  formatZodError,
} from "@/lib/schemas/userSchema";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = parseBody(loginSchema, body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, ...formatZodError(parsed.error) },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid)
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Login failed", error },
      { status: 500 }
    );
  }
}
