"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem, CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getSurah} from "@/app/store";
import {useQuery} from "@tanstack/react-query";

export function Combobox({ setValue, value }: any) {
  const { data: { chapters } } = useQuery({
    queryKey: ["surah"],
    queryFn: () => getSurah(),
    staleTime: Infinity
  });

  const [open, setOpen] = React.useState(false)

  if (chapters.length) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[150px] justify-between"
          >
            {value
              ? chapters.find((framework: any) => framework.id === value)?.name_simple
              : "Select surah..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search surah..." />
            <CommandList>
              <CommandEmpty>No surah found.</CommandEmpty>
              <CommandGroup>
                {chapters.map((framework: any) => (
                  <CommandItem
                    key={framework.id}
                    value={framework.id}
                    onSelect={() => {
                      setValue(framework.id === value ? "" : framework.id)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.name_simple}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
}
