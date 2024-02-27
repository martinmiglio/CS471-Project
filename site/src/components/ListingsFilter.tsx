"use client";

import { type querySchema } from "@/components/ListingsList";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type filterTypes = "order" | "orderBy" | "active";

const filters: Record<
  filterTypes,
  {
    label: string;
    values: { value: string; label: string }[];
  }
> = {
  orderBy: {
    label: "Sort By",
    values: [
      { value: "bids", label: "Number of Bids" },
      { value: "createdAt", label: "Listing Date" },
      { value: "expires", label: "Expiration Date" },
      { value: "price", label: "Current Price" },
    ],
  },
  order: {
    label: "Sort Order",
    values: [
      { value: "asc", label: "Ascending" },
      { value: "desc", label: "Descending" },
    ],
  },
  active: {
    label: "Status",
    values: [
      { value: "active", label: "Active Only" },
      { value: "all", label: "All" },
    ],
  },
};

const valueMap = (arr: { value: string }[]) =>
  arr.map((filter) => filter.value) as [string, ...string[]];

const filterSchema = z.object({
  order: z.enum(valueMap(filters.order.values)),
  orderBy: z.enum(valueMap(filters.orderBy.values)),
  active: z.enum(valueMap(filters.active.values)),
});

export interface ListingFilterProps {
  query: z.infer<typeof querySchema>;
}

export default function ListingFilter({
  query,
  ...props
}: Readonly<ListingFilterProps>) {
  const [filterState, setFilterState] = useState<
    "initial" | "changed" | "applied"
  >("initial");
  const stringQuery = Object.fromEntries(
    Object.entries(query).map(([key, value]) => [key, value.toString()]),
  );

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      order: "desc",
      orderBy: "bids",
      active: "active",
      ...query,
    },
  });

  const router = useRouter();

  const applyFilter = (filters: z.infer<typeof filterSchema>) => {
    const newQuery = new URLSearchParams({
      ...stringQuery,
      ...filters,
    });

    console.log(
      JSON.stringify(
        {
          newQuery: {
            ...stringQuery,
            ...filters,
          },
        },
        null,
        2,
      ),
    );
    router.push("/?" + newQuery.toString());
  };

  const resetFilter = () => {
    form.reset();
    setFilterState("initial");
    const newQuery = new URLSearchParams({
      page: stringQuery.page,
      pageSize: stringQuery.pageSize,
    });
    router.push("/?" + newQuery.toString());
  };

  const onSubmit = (filters: z.infer<typeof filterSchema>) => {
    if (filterState === "changed") {
      applyFilter(filters);
      setFilterState("applied");
    } else if (filterState === "applied") {
      resetFilter();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full items-end space-x-1"
      >
        {Object.entries(filters).map(([key, filter]) => (
          <FormField
            control={form.control}
            name={key as filterTypes}
            key={key}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{filter.label}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-48 justify-between overflow-visible px-3"
                      >
                        <span>
                          {
                            filters[key as filterTypes].values.find(
                              (value) => value.value === field.value,
                            )?.label
                          }
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Command>
                      <CommandEmpty>No filters found.</CommandEmpty>
                      <CommandGroup>
                        {filter.values.map((value) => (
                          <CommandItem
                            value={value.value}
                            key={value.value}
                            onSelect={(value: string) => {
                              setFilterState("changed");
                              const v = filters[key as filterTypes].values.find(
                                (v) =>
                                  v.value.toLowerCase() === value.toLowerCase(),
                              )?.value;
                              return field.onChange(v);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {value.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        ))}
        <Button
          className="w-full"
          type="submit"
          disabled={filterState === "initial"}
        >
          {filterState === "applied" ? "Reset" : "Apply"}
        </Button>
      </form>
    </Form>
  );
}
