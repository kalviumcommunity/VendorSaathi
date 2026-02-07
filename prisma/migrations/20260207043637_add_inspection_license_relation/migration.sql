-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_license_id_fkey" FOREIGN KEY ("license_id") REFERENCES "License"("license_id") ON DELETE RESTRICT ON UPDATE CASCADE;
