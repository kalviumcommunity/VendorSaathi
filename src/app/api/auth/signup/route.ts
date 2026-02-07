import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import {
  signupSchema,
  parseBody,
  formatZodError,
} from "@/lib/schemas/userSchema";
import { Role } from "@prisma/client";

// Placeholder values for Vendor until they complete profile (dob, phone, aadhaar, pan, address)
const VENDOR_PLACEHOLDER_DOB = new Date("1970-01-01");
const VENDOR_PLACEHOLDER_STRING = "";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = parseBody(signupSchema, body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, ...formatZodError(parsed.error) },
        { status: 400 }
      );
    }

    const { fullName, email, password, role } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password_hash,
        full_name: fullName,
        role,
      },
    });

    if (role === Role.VENDOR) {
      await prisma.vendor.create({
        data: {
          user_id: newUser.user_id,
          full_name: fullName,
          dob: VENDOR_PLACEHOLDER_DOB,
          phone_number: VENDOR_PLACEHOLDER_STRING,
          aadhaar_number: VENDOR_PLACEHOLDER_STRING,
          pan_number: VENDOR_PLACEHOLDER_STRING,
          address: VENDOR_PLACEHOLDER_STRING,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Signup successful",
      user: {
        user_id: newUser.user_id,
        email: newUser.email,
        full_name: newUser.full_name,
        role: newUser.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Signup failed", error },
      { status: 500 }
    );
  }
}
