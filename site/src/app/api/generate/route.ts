import { createListing } from "@/lib/prisma/listings";
import { NextResponse } from "next/server";

export async function GET() {
  const emails = ["marmig0404@gmail.com", "deha8426@kettering.edu"];

  const title_words = ["demo", "test", "SWAG", "biddr", "listing"];

  const descriptions = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non lorem pellentesque, dignissim enim sit amet, feugiat enim.",
    "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi.",
    "Proin sed massa quis sem maximus consequat. Sed elementum bibendum enim, a placerat turpis elementum in.",
    "Etiam vitae lorem at libero vulputate congue. Maecenas in ipsum suscipit, convallis ligula id, laoreet ligula.",
    "Nulla facilisi. Donec congue neque sed elit dignissim, id elementum nunc ornare.",
  ];

  const prices = [0, 20, 49, 60, 29, 100];

  const days = [1, 2, 3, 4, 5, 6];

  const imageURL = "https://source.unsplash.com/random/400x400";

  const count = 50;

  let new_listings = [];

  for (const _ of new Array(count)) {
    const l = await createListing(
      emails[Math.floor(Math.random() * emails.length)],
      title_words[Math.floor(Math.random() * title_words.length)],
      descriptions[Math.floor(Math.random() * descriptions.length)],
      prices[Math.floor(Math.random() * prices.length)],
      imageURL,
      new Date(
        Date.now() + days[Math.floor(Math.random() * days.length)] * 100000000,
      ),
    );
    new_listings.push(l);
  }

  return NextResponse.json({ new_listings });
}
