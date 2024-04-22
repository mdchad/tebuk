"use client";

import { useQuery } from "@tanstack/react-query";
import {getRandomVerse} from "@/app/store";
import {useState} from "react";
import Verse from "@/app/components/Verse";
import {Combobox} from "@/components/combobox";
import {Settings} from "@/app/components/Settings";
import {Button} from "@/components/ui/button";
import {Eye, EyeOff, Shuffle} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {getRandomInt} from "@/lib/utils";
import {Skeleton} from "@/app/components/Skeleton";
import {chapter} from "@/lib/chapters";

interface ISettings {
  chapter: number
  page: number
  juz: number
  rangeValue: {
    value: number[]
    mode: string
  }
}

const mapping: any = {
  chapter: 'surah',
  page: 'page',
  juz: 'juz'
}

const Container = () => {
  const [settings, setSettings] = useState<ISettings>({ chapter: 0, page: 0, juz: 0, rangeValue: { mode: '', value: [0, 0]} })
  const [revealSurah, setRevealSurah] = useState<boolean>(false)
  const [revealPage, setRevealPage] = useState<boolean>(false)

  function setValue() {
    if (!settings.rangeValue.mode) {
      refetch()
    } else {
      let randomNumber = getRandomInt(settings.rangeValue.value[0], settings.rangeValue.value[1])
      setSettings((prev) => ({ ...prev, [settings.rangeValue.mode]: randomNumber }))
    }

  }

  const { data, refetch, fetchStatus, isLoading } = useQuery<any>({
    queryKey: ["data", settings.chapter, settings.page, settings.juz],
    queryFn: () => getRandomVerse(settings),
    enabled: Boolean(settings.chapter) || Boolean(settings.page) || Boolean(settings.juz),
    staleTime: Infinity
  });

  function findTruthyKey(obj: ISettings) {
    for (const [key, value] of Object.entries(obj)) {
      if (value) {
        return mapping[key];
      }
    }
    return 'not selected yet'; // Return null if no truthy values are found
  }

  const BottomBar = ({ data }: any) => {
    return (
      <div className="fixed bottom-0 left-0 w-full border-t border-t-gray-200 bg-white p-4 flex justify-between">
        { !!settings?.juz ? (
          <div className="flex gap-1 justify-center items-center">
            <p className="font-mono text-sm">Surah:
              {
                revealSurah ?
                  <span> {chapter.find(c => c.id === data?.verse.chapter_id)?.name_simple}</span>:
                  <span> ● ● ● ●</span>
              }
            </p>
            <Button size="sm" variant="ghost" onClick={() => setRevealSurah(!revealSurah)}>
              { revealSurah ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </Button>
            <p className="font-mono text-sm">Page:
              {
                revealPage ?
                  <span> {data?.verse.page_number}</span>:
                  <span> ● ● </span>
              }
            </p>
            <Button size="sm" variant="ghost" onClick={() => setRevealPage(!revealPage)}>
              { revealPage ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </Button>
          </div>
        ) : <div></div>}
        <Button size="sm" disabled={!data} onClick={() => setValue()}><Shuffle size={20} color={'white'}/></Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full lg:w-1/2 items-center space-y-4 pb-8">
      <div className="flex flex-col items-center gap-4 border-b pb-4">
        <p className="text-sm font-sans text-gray-500">Choose your mode</p>
        {/*<div>*/}
        {/*  <p className="text-sm text-gray-600 capitalize">{findTruthyKey(settings)}</p>*/}
        {/*</div>*/}
        <Settings setSettings={setSettings}/>
      </div>
      { isLoading ? (
        <div>
          {Array(3).fill(1).map((_, i) => <Skeleton key={`skeleton_${i}`} id={`skeleton_${i}`} />)}
        </div>
      ) : null}
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
      <BottomBar data={data}/>
    </div>
  );
};

export default Container;