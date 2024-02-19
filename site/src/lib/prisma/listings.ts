import prisma from "./client";

export async function getListingById(id: string) {
  return await prisma.listing.findUnique({
    where: { id },
  });
}

export async function getAllListings(query: {
  page: number;
  pageSize: number;
  active?: boolean;
  orderBy?: "createdAt" | "expires" | "price";
  orderDirection?: "asc" | "desc";
}) {
  const queryDefaults = {
    active: true,
    orderBy: "expires",
    orderDirection: "desc",
  };
  const { page, pageSize, active, orderBy, orderDirection } = {
    ...queryDefaults,
    ...query,
  };
  return await prisma.listing.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      expires: active ? { gt: new Date() } : undefined,
    },
    orderBy: {
      [orderBy]: orderDirection,
    },
  });
}

export async function createListing(
  userEmail: string,
  title: string,
  description: string,
  price: number,
  image: string,
  expiresAt: Date,
) {
  return await prisma.listing.create({
    data: {
      title,
      description,
      price,
      image,
      expires: expiresAt,
      user: {
        connect: {
          email: userEmail,
        },
      },
    },
  });
}
