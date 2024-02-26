import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LISTING_DURATIONS } from "@/consts";
import { cn } from "@/lib/utils";
import { PopoverProps } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";

const durations = LISTING_DURATIONS.map((duration_in_days: number) => ({
  value: duration_in_days,
  label: `${duration_in_days} Day${duration_in_days === 1 ? "" : "s"}`,
}));

export interface ExpirationDatePickerProps extends PopoverProps {
  selected: number;
  onSelect: (value: number) => void;
}

export default function ExpirationDatePicker({
  selected,
  onSelect,
  ...props
}: Readonly<ExpirationDatePickerProps>) {
  return (
    <Popover {...props}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between",
              !selected && "text-muted-foreground",
            )}
          >
            {selected
              ? durations.find((duration) => duration.value === selected)?.label
              : "Select language"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="center">
        <Command>
          <CommandEmpty>No durations found.</CommandEmpty>
          <CommandGroup>
            {durations.map((duration) => (
              <CommandItem
                value={duration.label}
                key={duration.value}
                onSelect={(value: string) => onSelect(parseInt(value))}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    duration.value === selected ? "opacity-100" : "opacity-0",
                  )}
                />
                {duration.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
