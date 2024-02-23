import prisma from "@/lib/prisma/client";

prisma.listing
  .deleteMany()
  .then((res) =>
    console.info(`Deleted listings: ${JSON.stringify(res, null, 2)}`),
  );
