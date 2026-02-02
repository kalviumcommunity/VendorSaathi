import { prisma } from "@/lib/prisma";

export async function approveLicense(requestId: number, adminId: number) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const request = await tx.licenseRequest.findUnique({
        where: { request_id: requestId },
      });

     throw new Error("Force rollback test");

      const license = await tx.license.create({
        data: {
          license_uid: `LIC-${Date.now()}`,
          vendor_id: request.vendor_id,
          issue_date: new Date(),
          expiry_date: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ),
          status: "ACTIVE",
          created_by: adminId,
        },
      });

      await tx.licenseRequest.update({
        where: { request_id: requestId },
        data: {
          status: "APPROVED",
          reviewed_by: adminId,
          reviewed_at: new Date(),
        },
      });

      await tx.auditLog.create({
        data: {
          admin_id: adminId,
          action: "APPROVED_LICENSE",
          entity_type: "LICENSE",
          entity_id: license.license_id,
        },
      });

      return license;
    });

    console.log("Transaction success:", result);
    return result;
  } catch (err) {
    console.error("Transaction rolled back:", err);
    throw err;
  }
}
