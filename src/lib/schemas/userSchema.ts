import { z } from "zod";

// Role enum aligned with Prisma Role
export const roleSchema = z.enum(["ADMIN", "VENDOR"]);
export type RoleInput = z.infer<typeof roleSchema>;

// Password rules: min length, optional strength
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password too long");

// ----- Login -----
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
export type LoginInput = z.infer<typeof loginSchema>;

// ----- Signup (Create Account: Full Name, Email, Password, Confirm Password, Role) -----
export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name too long"),
    email: z.string().email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: roleSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type SignupInput = z.infer<typeof signupSchema>;

// ----- JWT payload (after verification) -----
export const jwtPayloadSchema = z.object({
  user_id: z.number(),
  email: z.string().email(),
  role: roleSchema,
  iat: z.number().optional(),
  exp: z.number().optional(),
});
export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

// ----- Optional: user profile (no password) -----
export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address"),
});
export type UserInput = z.infer<typeof userSchema>;

// ----- Helpers -----
/** Parse JSON body with a Zod schema; returns { success, data, error } */
export function parseBody<T>(
  schema: z.ZodType<T>,
  body: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(body);
  if (result.success) return { success: true, data: result.data };
  return { success: false, error: result.error };
}

/** Format Zod errors for API response */
export function formatZodError(error: z.ZodError): {
  message: string;
  issues: { path: string[]; message: string }[];
} {
  return {
    message: "Validation failed",
    issues: error.issues.map((issue) => ({
      path: issue.path.map(String),
      message: issue.message,
    })),
  };
}
