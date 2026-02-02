import { prisma } from "@/lib/prisma";

export async function optimizedQueries() {
  // Select only needed fields
  const vendors = await prisma.vendor.findMany({
    select: {
      vendor_id: true,
      full_name: true,
      phone_number: true,
    },
  });

  // Pagination
  const requests = await prisma.licenseRequest.findMany({
    skip: 0,
    take: 10,
    orderBy: { created_at: "desc" },
  });

  // Batch insert
  await prisma.notification.createMany({
    data: [
      { user_id: 1, message: "Test 1", type: "SYSTEM" },
      { user_id: 1, message: "Test 2", type: "SYSTEM" },
    ],
  });

  console.log(vendors, requests);
}
