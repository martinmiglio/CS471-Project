import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function PlaceBidButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Place Bid</Button>
      </PopoverTrigger>
      <PopoverContent side = "bottom" align = "start"><div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Bid Submission</h4>
            <p className="text-sm text-muted-foreground">
              Enter an amount to bid.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Amount</Label>
              <Input
                defaultValue="$0.00"
                className="col-span-2 h-8"
              />
            </div>
            <Button> Submit Bid</Button>
          </div>
        </div></PopoverContent>
    </Popover>
  );
}
