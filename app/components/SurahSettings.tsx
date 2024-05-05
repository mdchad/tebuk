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
      <div className="p-4 pb-0">
        <div className="flex items-center justify-center space-x-2">
          <Combobox setValue={setValue} value={value}/>
          <Button size="sm" disabled={submitted} onClick={onSubmit}>Start</Button>
        </div>
      </div>
    </TabsContent>
  )
}