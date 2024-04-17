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
import {getData, getSurah} from "@/app/store";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";

export function Combobox({ setNum }) {
  const { data: { chapters } } = useQuery({
    queryKey: ["surah"],
    queryFn: () => getSurah(),
    staleTime: 1000 * 60
  });

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  console.log(chapters)

  useEffect(() => {
    if (value) {
      setNum(value)
    }
  }, [value])

  if (chapters.length) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? chapters.find((framework) => framework.id === value)?.name_simple
              : "Select framework..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {chapters.map((framework) => (
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
