"use client";

import { Button } from "./ui/button";
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function WatchListButton({
  listingId,
}: Readonly<{ listingId: string }>) {
  const { toast } = useToast();
  const router = useRouter();

  const addToWatchList = async (id: string) => {
    const res = await fetch("/api/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listingId: id }),
    });
    if (res.ok) {
      toast({
        title: "Listing added to watchlist",
        description: `This listing has been added to your watchlist`,
        action: (
          <ToastAction
            altText="See watchlist"
            onClick={() => router.push("/watchlist")}
          >
            See watchlist
          </ToastAction>
        ),
      });
      return;
    }
    toast({
      title: "Error",
      description: "There was an error adding this listing to your watchlist",
      variant: "destructive",
    });
  };

  return (
    <Button variant="secondary" onClick={() => addToWatchList(listingId)}>
      Add to Watchlist
    </Button>
  );
}
