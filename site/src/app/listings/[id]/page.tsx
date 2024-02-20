import CountDown from "@/components/ui/CountDown";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { getListingById } from "@/lib/prisma/listings";
import Image from "next/image";

export default async function ListingsPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const listing = await getListingById(params.id);

  return (
    <div className="w-[900px]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <AspectRatio ratio={1}>
            <Image
              src={
                listing?.image ?? "https://source.unsplash.com/random/400x400"
              }
              alt="Image"
              className="rounded-md object-cover"
              width={400}
              height={400}
            />
          </AspectRatio>
        </ResizablePanel>
        <div></div>
        <ResizablePanel>
          <div style={{ fontSize: "25px" }}>{listing?.title}</div>
          <div style={{ marginBottom: "10px" }}>{listing?.description} </div>
          <div style={{ marginTop: "10px", marginBottom: "20px" }}>
            {"Status: " + listing?.status}
          </div>
          <div
            style={{
              marginBottom: "10px",
              marginTop: "145px",
              fontSize: "20px",
            }}
          >
            {"Time To Bid"}
          </div>
          <div style={{ marginBottom: "10px", fontSize: "20px" }}>
            {listing?.expires && (
              <CountDown endTime={new Date(listing?.expires)} />
            )}
          </div>
          <div style={{ marginBottom: "10px", fontSize: "25px" }}>
            {"$" + listing?.price}{" "}
          </div>
          <Button>Place Bid</Button> <Button>Add to Watchlist</Button>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
