import prisma from "./client";

export async function getListingById(id: string) {
  return await prisma.listing.findUnique({
    where: { id },
    include: {
      user: {
        select: { name: true },
      },
    },
  });
}

export async function getAllListings(
  page: number,
  pageSize: number,
  active = true,
) {
  return await prisma.listing.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      expires: active ? { gt: new Date() } : undefined,
    },
    include: {
      user: {
        select: { name: true },
      },
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
