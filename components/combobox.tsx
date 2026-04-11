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
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { chapter as chapters } from '../lib/chapters'
import { useMediaQuery } from "@/hooks/use-media-query"

function SurahList({ value, onSelect }: { value: number, onSelect: (id: number) => void }) {
  return (
    <Command>
      <CommandInput placeholder="Search surah..." />
      <CommandList className="max-h-[40vh] overflow-y-auto">
        <CommandEmpty>No surah found.</CommandEmpty>
        <CommandGroup>
          {chapters.map((chapter: any) => (
            <CommandItem
              key={chapter.id}
              value={chapter.id}
              onSelect={() => onSelect(chapter.id)}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === chapter.id ? "opacity-100" : "opacity-0"
                )}
              />
              {chapter.name_simple}
              <span dir="rtl" className="ml-auto font-surah text-lg">
                {chapter.id.toString().padStart(3, '0')}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export function Combobox({ setValue, value }: any) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  function handleSelect(id: number) {
    setValue(id === value ? "" : id)
    setOpen(false)
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (next && triggerRef.current) {
      triggerRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }

  const triggerLabel = value
    ? chapters.find((c: any) => c.id === value)?.name_simple
    : "Select surah..."

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[150px] justify-between"
          >
            {triggerLabel}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <SurahList value={value} onSelect={handleSelect} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between"
        >
          {triggerLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 pb-4">
          <SurahList value={value} onSelect={handleSelect} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
