import prisma from "./client";

export const getWatchList = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      watchedListings: {
        include: {
          user: {
            select: { name: true, image: true },
          },
          images: true,
          bids: true,
        },
      },
    },
  });
  return user?.watchedListings ?? [];
};

export const addToWatchList = async (email: string, listingId: string) => {
  return await prisma.user.update({
    where: { email },
    data: {
      watchedListings: {
        connect: { id: listingId },
      },
    },
  });
};

export const removeFromWatchList = async (email: string, listingId: string) => {
  return await prisma.user.update({
    where: { email },
    data: {
      watchedListings: {
        disconnect: { id: listingId },
      },
    },
  });
};
