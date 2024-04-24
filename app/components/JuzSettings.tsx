import {DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {TabsContent} from "@/components/ui/tabs";
import * as React from "react";
import {Minus, Plus } from "lucide-react"
import {getRandomInt} from "@/lib/utils";
import {AnimatePresence, motion} from "framer-motion";

export function JuzSettings({ setSettings }: any) {
  const [value, setValue] = React.useState(1)
  const [secondValue, setSecondValue] = React.useState(0)
  const [range, setRange] = React.useState(false)

  function onSubmit() {
    if (secondValue) {
      let randomGenerator = getRandomInt(value, secondValue)
      setSettings(() => ({ juz: randomGenerator, chapter: 0, page: 0, rangeValue: { mode: 'juz', value: [value, secondValue] }}))
    } else {
      setSettings((prev: any) => ({ juz: value, chapter: 0, page: 0, rangeValue: { mode: '', value: [0, 0]} }))
    }
  }

  function addRange() {
    setRange(true)
    setSecondValue(value + 1)
  }

  return (
    <TabsContent value="juz">
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
            <input className="border-b text-3xl lg:text-4xl text-center font-bold tracking-tighter w-28" type="number" onChange={(e: any) => setValue(parseInt(e.target.value))} value={value} />
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
        <div className="flex items-center justify-center my-6">
          { range ? <p className="text-center text-xs font-mono">to</p> :<Button variant="secondary" size="sm" onClick={addRange}>Add range</Button> }
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
                  disabled={secondValue <= value}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 items-center text-center">
                  <input className="text-4xl text-center font-bold tracking-tighter w-40" type="number" onChange={(e: any) => setSecondValue(parseInt(e.target.value))} value={secondValue}/>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => setSecondValue((prevValue) => prevValue + 1)}
                  disabled={value >= 30}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <Button size="sm" disabled={range && value > secondValue } onClick={onSubmit}>Submit</Button>
      </div>
    </TabsContent>
  )
}