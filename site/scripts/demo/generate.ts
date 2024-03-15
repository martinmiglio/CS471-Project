import { placeNewBid } from "@/lib/prisma/bids";
import { createListing, getListingById } from "@/lib/prisma/listings";
import { Listing, Bid } from "@prisma/client";

const emails = [
  "marmig0404@gmail.com",
  "deha8426@kettering.edu",
  "testing@biddr.pro",
];

const title_words = [
  "demo",
  "test",
  "CS471",
  "biddr",
  "listing",
  "RANDOM",
  "lorem",
  "ipsum",
];

const descriptions = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non lorem pellentesque, dignissim enim sit amet, feugiat enim.",
  "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi.",
  "Proin sed massa quis sem maximus consequat. Sed elementum bibendum enim, a placerat turpis elementum in.",
  "Etiam vitae lorem at libero vulputate congue. Maecenas in ipsum suscipit, convallis ligula id, laoreet ligula.",
  "Nulla facilisi. Donec congue neque sed elit dignissim, id elementum nunc ornare.",
];

const prices = [0, 20, 49, 60, 29, 100];

const days = [2, 3, 4, 5, 6, 10];

const imageURLs = [
  "https://images.unsplash.com/photo-1706071558003-dc6fef69dd53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjkyODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDgzOTkyODh8&ixlib=rb-4.0.3&q=80&w=1080",
  "https://images.unsplash.com/photo-1704555314877-de0a4b0603c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjkyODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDgzOTkyODh8&ixlib=rb-4.0.3&q=80&w=1080",
  "https://images.unsplash.com/photo-1706720097169-b4120bb97a30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjkyODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDgzOTkyODh8&ixlib=rb-4.0.3&q=80&w=1080",
  "https://images.unsplash.com/photo-1707587537231-ee2a3e0b544b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjkyODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDgzOTkyODh8&ixlib=rb-4.0.3&q=80&w=1080",
  "https://images.unsplash.com/photo-1706554596975-dd09285c0046?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjkyODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDgzOTkyODh8&ixlib=rb-4.0.3&q=80&w=1080",
  "https://images.unsplash.com/photo-1708112292874-1562bdd92f1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjkyODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDgzOTkyODh8&ixlib=rb-4.0.3&q=80&w=1080",
  "https://images.unsplash.com/photo-1706931723301-bfd56d064991?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjkyODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDgzOTkyODh8&ixlib=rb-4.0.3&q=80&w=1080",
  "https://images.unsplash.com/photo-1550937627-3bef6508f502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjkyODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDgzOTkyODh8&ixlib=rb-4.0.3&q=80&w=1080",
  "https://images.unsplash.com/photo-1683918385153-3724d9ead0f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjkyODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDgzOTkyODh8&ixlib=rb-4.0.3&q=80&w=1080",
  "https://images.unsplash.com/photo-1707057538360-47db5c9a6b2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjkyODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDgzOTkyODh8&ixlib=rb-4.0.3&q=80&w=1080",
];

async function generateListings(count: number) {
  console.info(`Generating ${count} demo listings`);

  let new_listings: ReturnType<typeof createListing>[] = [];

  for (let i = 0; i < count; i++) {
    const n_images = Math.floor(Math.random() * (imageURLs.length - 1)) + 1;
    const randomImages = imageURLs
      .toSorted(() => Math.random() - 0.5)
      .slice(0, n_images);

    new_listings.push(
      createListing(
        emails[Math.floor(Math.random() * emails.length)],
        title_words[Math.floor(Math.random() * title_words.length)] +
          " " +
          title_words[Math.floor(Math.random() * title_words.length)],
        descriptions[Math.floor(Math.random() * descriptions.length)],
        prices[Math.floor(Math.random() * prices.length)],
        randomImages,
        new Date(
          Date.now() +
            days[Math.floor(Math.random() * days.length)] * 1000 * 60 * 60,
        ),
      ),
    );
  }

  const listings = await Promise.all(new_listings);
  const { expires: latestExpiration } = listings.reduce((a, b) => {
    return new Date(a.expires) > new Date(b.expires) ? a : b;
  });

  console.table(
    listings.map((l) => ({
      id: l.id,
      title: l.title,
      user: l.userId,
      expires: l.expires,
    })),
  );
  console.info(
    `Generated ${listings.length} listings. Last listing will expire at ${latestExpiration}.`,
  );
  return listings;
}

async function generateBids(
  listings: Awaited<ReturnType<typeof createListing>>[],
  bidsPerListing: number,
) {
  console.info(
    `Generating ${bidsPerListing} demo bids for ${listings.length} listings`,
  );

  let bids: Bid[] = [];

  for (let og_listing of listings) {
    const listing = await getListingById(og_listing.id);
    if (!listing) {
      throw new Error("Listing not found");
    }
    // get list of users who will bid (everyone except the listing owner)
    const bidders = emails.filter((e) => e !== listing.userId);

    const bids_to_make: {email:string, price:number}[] = [];
    for (let i = 0; i < bidsPerListing; i++) {
      bids_to_make.push({
        email: bidders[Math.floor(Math.random() * bidders.length)],
        price: listing.price + Math.floor(Math.random() * 100),
      });
    }

    // order by price ascending
    bids_to_make.sort((a, b) => a.price - b.price);

    for (let bid of bids_to_make) {
      try {
        const res = await placeNewBid(listing.id, bid.email, bid.price);
        bids.push(res);
      } catch (e: any) {
        console.error(e);
      }
    }
  }

  console.table(
    bids.map((b) => ({
      id: b.id,
      price: b.price,
      user: b.userId,
      listing: b.listingId,
    })),
  );

  console.info(`Generated ${bids.length} bids.`);
  return bids;
}

const count = Number.parseInt(process.argv[2] ?? "50");
const bidsPerListing = Number.parseInt(process.argv[3] ?? "5");

generateListings(count).then((listings) => {
  generateBids(listings, bidsPerListing);
});
