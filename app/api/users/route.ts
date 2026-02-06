import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET(req: Request) {
  try {
    const auth = req.headers.get("authorization");
    const token = auth?.split(" ")[1];

    if (!token)
      return NextResponse.json(
        { success: false, message: "Token missing" },
        { status: 401 }
      );

    const decoded = jwt.verify(token, JWT_SECRET);

    return NextResponse.json({
      success: true,
      message: "Protected data",
      user: decoded,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 403 }
    );
  }
}
