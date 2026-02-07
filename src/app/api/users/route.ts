import { NextResponse } from "next/server";
import { getAuth, getAuthWithRole } from "@/lib/auth";

/**
 * GET /api/users – returns current user from JWT (any authenticated user).
 * For role-restricted endpoints, use getAuthWithRole(req, ["ADMIN"]) in other routes.
 */
export async function GET(req: Request) {
  const auth = getAuth(req);

  if (!auth.success) {
    return NextResponse.json(
      { success: false, message: auth.message },
      { status: auth.status }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Protected data",
    user: auth.payload,
  });
}
