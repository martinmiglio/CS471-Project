import prisma from "./client";

export async function getListingById(id: string, includeEmail?: boolean) {
  return await prisma.listing.findUnique({
    where: { id },
    include: {
      user: {
        select: { name: true, image: true, email: includeEmail },
      },
      bids: {
        include: {
          user: {
            select: { name: true, image: true, id: true },
          },
        },
        orderBy: {
          price: "desc",
        },
      },
    },
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
    include: {
      user: {
        select: { name: true, image: true },
      },
      bids: {
        include: {
          user: {
            select: { name: true },
          },
        },
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
