import { createListing } from "@/lib/prisma/listings";
import { NextResponse } from "next/server";

export async function GET() {
  const count = 50;

  const emails = ["marmig0404@gmail.com", "deha8426@kettering.edu"];

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

  const days = [1, 2, 3, 4, 5, 6];

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

  let new_listings = [];

  for (let i = 0; i < count; i++) {
    console.log(i);
    const l = await createListing(
      emails[Math.floor(Math.random() * emails.length)],
      title_words[Math.floor(Math.random() * title_words.length)] +
        " " +
        title_words[Math.floor(Math.random() * title_words.length)],
      descriptions[Math.floor(Math.random() * descriptions.length)],
      prices[Math.floor(Math.random() * prices.length)],
      imageURLs[Math.floor(Math.random() * imageURLs.length)],
      new Date(
        Date.now() +
          days[Math.floor(Math.random() * days.length)] * 1000 * 60 * 60 * 24,
      ),
    );
    new_listings.push(l);
  }

  return NextResponse.json({ new_listings });
}
