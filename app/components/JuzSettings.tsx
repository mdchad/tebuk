import {DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {TabsContent} from "@/components/ui/tabs";
import * as React from "react";
import {getSurah} from "@/app/store";
import {useQuery} from "@tanstack/react-query";
import {Minus, Plus } from "lucide-react"

export function JuzSettings({ setSettings }: any) {
  const [value, setValue] = React.useState(1)

  function onSubmit() {
    setSettings({ juz: value, chapter: 0, page: 0 })
  }

  return (
    <TabsContent value="juz">
      <DrawerHeader>
        <DrawerTitle>Review by Juz</DrawerTitle>
        <DrawerDescription>Set your juz to review.</DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pb-0">
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => setValue((prevValue) => prevValue - 1)}
            disabled={value <= 1}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="text-4xl font-bold tracking-tighter">
              {value}
            </div>
            {/*<div className="text-2xl font-arabic text-muted-foreground">*/}
            {/*  {chapters.find(chapter => chapter.id === value)?.name_arabic}*/}
            {/*</div>*/}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => setValue((prevValue) => prevValue + 1)}
            disabled={value >= 30}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
        <div className="mt-3 h-[120px]">
        </div>
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button onClick={onSubmit}>Submit</Button>
        </DrawerClose>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </TabsContent>
  )
}