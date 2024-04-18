"use client";

import { useQuery } from "@tanstack/react-query";
import {getData} from "@/app/store";
import {useState} from "react";
import Verse from "@/app/components/Verse";
import {Combobox} from "@/components/combobox";
import {Settings} from "@/app/components/Settings";
import {Button} from "@/components/ui/button";
import {Sparkles} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ISettings {
  chapter: number
  page: number
  juz: number
}

const Container = () => {
  const [settings, setSettings] = useState<ISettings>({ chapter: 0, page: 0, juz: 0 })

  const { data, refetch, fetchStatus } = useQuery<any>({
    queryKey: ["data", settings.chapter, settings.page, settings.juz],
    queryFn: () => getData(settings),
    enabled: Boolean(settings.chapter) || Boolean(settings.page) || Boolean(settings.juz),
    staleTime: Infinity
  });

  function findTruthyKey(obj: ISettings) {
    for (const [key, value] of Object.entries(obj)) {
      if (value) {
        return key;
      }
    }
    return 'not selected yet'; // Return null if no truthy values are found
  }

  return (
    <div className="flex flex-col w-full h-full lg:w-1/2 items-center space-y-4">
      <div className="flex items-center gap-4 border-b pb-4">
        <div>
          <p className="text-sm font-bold">Mode:</p>
          <p className="text-sm text-gray-600 capitalize">{findTruthyKey(settings)}</p>
        </div>
        <Settings setSettings={setSettings}/>
        {/*<Combobox setNum={setNum}/>*/}
        <Button size="sm" disabled={!data} onClick={() => refetch()}><Sparkles size={20} color={'white'}/></Button>
      </div>
      <AnimatePresence>
        <motion.div
          key={data?.verse?.id}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          // exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          { data && fetchStatus === 'idle' && <Verse data={data}/>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Container;