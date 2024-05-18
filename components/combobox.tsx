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
import { chapter as chapters } from '../lib/chapters'

export function Combobox({ setValue, value }: any) {
  const [open, setOpen] = React.useState(false)

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
                {chapters.map((chapter: any) => (
                  <CommandItem
                    key={chapter.id}
                    value={chapter.id}
                    onSelect={() => {
                      setValue(chapter.id === value ? "" : chapter.id)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === chapter.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {chapter.name_simple}
                    <span dir="rtl" className="ml-auto font-surah text-lg">{chapter.id.toString().padStart(3, '0')}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
}
