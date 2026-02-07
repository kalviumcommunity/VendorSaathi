import { NextResponse } from "next/server";
import { getAuthWithRole, authResponse } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/admin/vendors – list vendors (ADMIN only).
 */
export async function GET(req: Request) {
  const auth = getAuthWithRole(req, "ADMIN");
  if (!auth.success) return authResponse(auth);

  const vendors = await prisma.vendor.findMany({
    include: { user: { select: { email: true, role: true, is_active: true } } },
  });

  return NextResponse.json({ success: true, vendors });
}
