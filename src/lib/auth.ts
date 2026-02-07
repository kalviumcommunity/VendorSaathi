import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {
  jwtPayloadSchema,
  type JwtPayload,
  type RoleInput,
} from "@/lib/schemas/userSchema";

const JWT_SECRET = process.env.JWT_SECRET as string;

export type AuthResult =
  | { success: true; payload: JwtPayload }
  | { success: false; status: number; message: string };

/**
 * Extract and verify JWT from Authorization header (Bearer <token>).
 * Returns validated payload with role or error result for API response.
 */
export function getAuth(req: Request): AuthResult {
  const auth = req.headers.get("authorization");
  const token = auth?.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    return { success: false, status: 401, message: "Token missing" };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as unknown;
    const parsed = jwtPayloadSchema.safeParse(decoded);
    if (!parsed.success) {
      return { success: false, status: 403, message: "Invalid token payload" };
    }
    return { success: true, payload: parsed.data };
  } catch {
    return { success: false, status: 403, message: "Invalid or expired token" };
  }
}

/**
 * Require a specific role. Use after getAuth().
 * Returns the same AuthResult for easy NextResponse.json usage.
 */
export function requireRole(
  authResult: AuthResult,
  allowedRoles: RoleInput | RoleInput[]
): AuthResult {
  if (!authResult.success) return authResult;

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  if (!roles.includes(authResult.payload.role)) {
    return {
      success: false,
      status: 403,
      message: `Forbidden: requires one of [${roles.join(", ")}]`,
    };
  }
  return authResult;
}

/**
 * One-shot: get auth and require role. Use in protected API routes.
 */
export function getAuthWithRole(
  req: Request,
  allowedRoles: RoleInput | RoleInput[]
): AuthResult {
  const auth = getAuth(req);
  return requireRole(auth, allowedRoles);
}

/**
 * If auth failed, returns a NextResponse you can return immediately.
 * Use: const auth = getAuthWithRole(req, "ADMIN"); if (auth.success === false) return authResponse(auth);
 */
export function authResponse(auth: AuthResult): NextResponse {
  return NextResponse.json(
    { success: false, message: auth.message },
    { status: auth.status }
  );
}
