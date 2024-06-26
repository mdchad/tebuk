import * as React from "react"
import {SlidersHorizontal} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {Tabs} from "@radix-ui/react-tabs";
import {TabsList, TabsTrigger} from "@/components/ui/tabs";
import {SurahSettings} from "@/app/components/SurahSettings";
import {PageSettings} from "@/app/components/PageSettings";
import {JuzSettings} from "@/app/components/JuzSettings";

export function Settings({ setSettings }: any) {
  return (
    <div className="rounded-xl border px-8 pb-6 mx-auto w-80 max-w-sm">
      <Tabs defaultValue="surah" className="mt-3">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="surah">Surah</TabsTrigger>
          <TabsTrigger value="page">Page</TabsTrigger>
          <TabsTrigger value="juz">Juz</TabsTrigger>
          {/*<TabsTrigger value="translation">Translation</TabsTrigger>*/}
        </TabsList>
        <SurahSettings setSettings={setSettings}/>
        <PageSettings setSettings={setSettings}/>
        <JuzSettings setSettings={setSettings}/>
      </Tabs>
    </div>
  )
}
