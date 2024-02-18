"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image"
import { getListingById } from "@/lib/prisma/listings";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CountDown from "@/components/ui/CountDown";

export default function ListingsPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const id = params.id;

  const [listing, setListing] = useState<null | Awaited<
    ReturnType<typeof getListingById>
  >>(null);

  useEffect(() => {
    const query = new URLSearchParams({ id });
    fetch(`/api/listings?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data.listing);
      });
  }, [id]);
  if(!listing){
    return(<div>LOADING</div>)
  }

  return (
    <div>
      <pre>
        <div className="w-[900px]">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
              <AspectRatio ratio={1 / 1}>
                <Image src= {listing?.image??"https://source.unsplash.com/random/400x400"} alt="Image" className="rounded-md object-cover" width = {400} height = {400}/>
              </AspectRatio>
            </ResizablePanel> 
            <div></div>
            <ResizablePanel ><div style ={{fontSize: '25px'}}>{listing?.title}</div>
              <div style={{ marginBottom: '10px' }}>{listing?.description} </div>             
              <div style={{ marginTop: '10px', marginBottom: '20px' }}>{"Status: " + listing?.status}</div>

              <div style={{ marginBottom: '10px', marginTop: '145px',fontSize: '20px'  }}>{"Time To Bid"}</div> 

              <div style={{ marginBottom: '10px',fontSize: '20px'  }}> 
                {listing?.expires && <CountDown endTime = {new Date(listing?.expires)}/>}
              </div>
              <div style = {{marginBottom: '10px', fontSize: '25px'}}>{"$" + listing?.price} </div>
              <Button>Place Bid</Button>  <Button>Add to Watchlist</Button>        


            </ResizablePanel>
          </ResizablePanelGroup>    
        </div>
      </pre>
    </div>
  );
}
