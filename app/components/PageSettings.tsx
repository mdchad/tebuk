import {DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {TabsContent} from "@/components/ui/tabs";
import * as React from "react";
import {Minus, Plus } from "lucide-react"
import {getRandomInt} from "@/lib/utils";
import {AnimatePresence, motion} from "framer-motion";

export function PageSettings({ setSettings }: any) {
  const [value, setValue] = React.useState(1)
  const [secondValue, setSecondValue] = React.useState(0)
  const [range, setRange] = React.useState(false)

  function onSubmit() {
    if (secondValue) {
      let randomGenerator = getRandomInt(value, secondValue)
      setSettings(() => ({ page: randomGenerator, chapter: 0, juz: 0, rangeValue: { mode: 'page', value: [value, secondValue] }}))
    } else {
      setSettings((prev: any) => ({ ...prev, page: value, chapter: 0, juz: 0 }))
    }
  }

  return (
    <TabsContent value="page">
      <DrawerHeader>
        <DrawerTitle>Review by Page</DrawerTitle>
        <DrawerDescription>Set your page to review.</DrawerDescription>
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
          <div className="flex-1 items-center text-center">
            <input className="text-4xl text-center font-bold tracking-tighter w-40" type="number" onChange={(e: any) => setValue(parseInt(e.target.value))} value={value}/>
            {/*<div className="text-2xl font-arabic text-muted-foreground">*/}
            {/*  {chapters.find(chapter => chapter.id === value)?.name_arabic}*/}
            {/*</div>*/}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => setValue((prevValue) => prevValue + 1)}
            disabled={value >= 604}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
        <div className="flex items-center justify-center my-6">
          { range ? <p className="text-center text-xs font-mono">to</p> :<Button variant="secondary" size="sm" onClick={() => setRange(true)}>Add range</Button> }
        </div>
        <AnimatePresence>
          <motion.div
            key={range ? 1 : 0}
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            // exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {range && (
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => setSecondValue((prevValue) => prevValue - 1)}
                  disabled={value <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 items-center text-center">
                  <input className="text-4xl text-center font-bold tracking-tighter w-40" type="number" onChange={(e: any) => setSecondValue(parseInt(e.target.value))} value={secondValue}/>
                  {/*<div className="text-2xl font-arabic text-muted-foreground">*/}
                  {/*  {chapters.find(chapter => chapter.id === value)?.name_arabic}*/}
                  {/*</div>*/}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => setSecondValue((prevValue) => prevValue + 1)}
                  disabled={value >= 604}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="mt-3 h-[80px]">
        </div>
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button disabled={range && value > secondValue} onClick={onSubmit}>Submit</Button>
        </DrawerClose>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </TabsContent>
  )
}