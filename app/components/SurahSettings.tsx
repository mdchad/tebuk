import {DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {TabsContent} from "@/components/ui/tabs";
import * as React from "react";
import {Combobox} from "@/components/combobox";
import {useEffect} from "react";


export function SurahSettings({ setSettings }: any) {
  const [value, setValue] = React.useState(1)
  const [submitted, setSubmitted] = React.useState(false)

  useEffect(() => {
    if (submitted) {
      setSubmitted(false)
    }
  }, [value])

  function onSubmit() {
    setSubmitted(true)
    setSettings({ chapter: value, juz: 0, page: 0, rangeValue: { mode: '', value: [0, 0]} })
  }

  return (
    <TabsContent value="surah">
      {/*<DrawerHeader>*/}
      {/*  <DrawerTitle>Review by Surah</DrawerTitle>*/}
      {/*  <DrawerDescription>Set your surah to review.</DrawerDescription>*/}
      {/*</DrawerHeader>*/}
      <div className="p-4 pb-0">
        <div className="flex items-center justify-center space-x-2">
          <Combobox setValue={setValue} value={value}/>
          {/*<Button*/}
          {/*  variant="outline"*/}
          {/*  size="icon"*/}
          {/*  className="h-8 w-8 shrink-0 rounded-full"*/}
          {/*  onClick={() => setValue((prevValue) => prevValue - 1)}*/}
          {/*  disabled={value <= 1}*/}
          {/*>*/}
          {/*  <Minus className="h-4 w-4" />*/}
          {/*  <span className="sr-only">Decrease</span>*/}
          {/*</Button>*/}
          {/*<div className="flex-1 text-center">*/}
          {/*  <div className="text-4xl font-bold tracking-tighter">*/}
          {/*    {chapters.find((chapter: any) => chapter.id === value)?.name_simple}*/}
          {/*  </div>*/}
          {/*  <div className="text-2xl font-arabic text-muted-foreground">*/}
          {/*    {chapters.find((chapter: any) => chapter.id === value)?.name_arabic}*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<Button*/}
          {/*  variant="outline"*/}
          {/*  size="icon"*/}
          {/*  className="h-8 w-8 shrink-0 rounded-full"*/}
          {/*  onClick={() => setValue((prevValue) => prevValue + 1)}*/}
          {/*  disabled={value >= 114}*/}
          {/*>*/}
          {/*  <Plus className="h-4 w-4" />*/}
          {/*  <span className="sr-only">Increase</span>*/}
          {/*</Button>*/}
        </div>
      </div>
      {/*<DrawerFooter>*/}
      {/*  <DrawerClose asChild>*/}
      <div className="flex justify-center gap-2 mt-4">
        <Button size="sm" disabled={submitted} onClick={onSubmit}>Start</Button>
      </div>
      {/*  </DrawerClose>*/}
      {/*  <DrawerClose asChild>*/}
      {/*    <Button variant="outline">Cancel</Button>*/}
      {/*  </DrawerClose>*/}
      {/*</DrawerFooter>*/}
    </TabsContent>
  )
}