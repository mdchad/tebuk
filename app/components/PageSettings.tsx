import {DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {TabsContent} from "@/components/ui/tabs";
import * as React from "react";
import {Minus, Plus, XIcon} from "lucide-react"
import {getRandomInt} from "@/lib/utils";
import {AnimatePresence, motion} from "framer-motion";

export function PageSettings({ setSettings }: any) {
  const [value, setValue] = React.useState(1)
  const [error, setError] = React.useState(false)
  const [secondValue, setSecondValue] = React.useState(0)
  const [range, setRange] = React.useState(false)

  function onSubmit() {
    if (secondValue) {
      let randomGenerator = getRandomInt(value, secondValue)
      setSettings(() => ({ page: randomGenerator, chapter: 0, juz: 0, rangeValue: { mode: 'page', value: [value, secondValue] }}))
    } else {
      setSettings((prev: any) => ({ page: value, chapter: 0, juz: 0, rangeValue: { mode: '', value: [0, 0]} }))
    }
  }

  function validateFirstValue(e: any) {
    setValue(parseInt(e.target.value))
    if (parseInt(e.target.value) > 0 && parseInt(e.target.value) < 604) {
      setError(false)
    } else {
      setError(true)
    }
  }

  function validateSecondValue(e: any) {
    setSecondValue(parseInt(e.target.value))
    if (parseInt(e.target.value) > value && parseInt(e.target.value) < 604) {
      setError(false)
    } else {
      setError(true)
    }
  }

  function addRange() {
    setRange(true)
    setSecondValue(value + 1)
  }

  function removeRange() {
    setRange(false)
    setSecondValue(0)
  }

  return (
    <TabsContent value="page">
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
            <input className="border-b text-3xl lg:text-4xl text-center font-bold tracking-tighter w-28" type="number" inputMode="numeric" min={1} max={604} onChange={(e: any) => validateFirstValue(e)} value={value}/>
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
          { range ? <p className="text-center text-xs font-mono">to</p> :<Button variant="secondary" size="sm" onClick={addRange}>Add range</Button> }
        </div>
        <AnimatePresence>
          <motion.div
            key={range ? 1 : 0}
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {range && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => setSecondValue((prevValue) => prevValue - 1)}
                    disabled={secondValue <= value || secondValue === value + 1}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="flex-1 items-center text-center">
                    <input className="border-b text-3xl lg:text-4xl text-center font-bold tracking-tighter w-28" type="number" inputMode="numeric" min={1} max={604} onChange={(e: any) => validateSecondValue(e)} value={secondValue}/>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => setSecondValue((prevValue) => prevValue + 1)}
                    disabled={secondValue >= 604}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
                <Button className="rounded-xl text-red-400 hover:text-red-600 hover:bg-white self-end p-0 text-xs" variant="ghost" size="sm" onClick={removeRange}><XIcon size="16"/>Remove</Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex flex-col justify-center gap-2 mt-4">
        <Button size="sm" disabled={error || range && value > secondValue} onClick={onSubmit}>Submit</Button>
        { error && <p className="text-center text-xs text-red-400">Juz can only be between 1 and 30</p>}
      </div>
    </TabsContent>
  )
}