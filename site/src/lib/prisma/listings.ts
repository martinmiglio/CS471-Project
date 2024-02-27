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
      images: true,
    },
  });
}

export const ACTIVE = ["active", "all"] as const;
export const ORDER_BY = ["createdAt", "expires", "price", "bids"] as const;
export const ORDER = ["asc", "desc"] as const;

export type ListingsQuery = {
  page: number;
  pageSize: number;
  active?: (typeof ACTIVE)[number];
  orderBy?: (typeof ORDER_BY)[number];
  order?: (typeof ORDER)[number];
};

export async function getAllListings(query: ListingsQuery) {
  const queryDefaults: Partial<ListingsQuery> = {
    active: "active",
    order: "desc",
    orderBy: "bids",
  };
  const { page, pageSize, active, orderBy, order } = {
    ...queryDefaults,
    ...query,
  };

  const orderByQuery =
    orderBy === "bids"
      ? {
          bids: { _count: order },
        }
      : {
          [orderBy ?? "createdAt"]: order,
        };

  console.log(JSON.stringify({ orderByQuery }, null, 2));

  return await prisma.listing.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      expires: active !== "all" ? { gt: new Date() } : undefined,
    },
    orderBy: [orderByQuery],
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
      images: true,
    },
  });
}

export async function createListing(
  userEmail: string,
  title: string,
  description: string,
  price: number,
  images: string[],
  expiresAt: Date,
) {
  return await prisma.listing.create({
    data: {
      title,
      description,
      price,
      expires: expiresAt,
      user: {
        connect: {
          email: userEmail,
        },
      },
      images: {
        create: images.map((image) => ({ url: image })),
      },
    },
  });
}
