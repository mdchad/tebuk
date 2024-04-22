"use client";

import { useQuery } from "@tanstack/react-query";
import {getRandomVerse} from "@/app/store";
import {useState} from "react";
import Verse from "@/app/components/Verse";
import {Combobox} from "@/components/combobox";
import {Settings} from "@/app/components/Settings";
import {Button} from "@/components/ui/button";
import {Shuffle} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {getRandomInt} from "@/lib/utils";

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

  const SkeletonLoadingComponent = ({ key, id }: any ) => {
    return (
      <motion.div
        key={id}
        initial={{ opacity: 0.5, backgroundPositionX: '-100%' }} // Initial opacity and background position
        animate={{ opacity: 1, backgroundPositionX: '200%' }} // Animation to full opacity and shimmer effect
        exit={{ opacity: 0.5 }} // When component unmounts, return to partial opacity
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }} // Animation duration and loop
        style={{
          width: '300px', // Set your desired width
          height: '30px', // Set your desired height
          backgroundColor: '#E0E0E0', // Set your desired background color
          borderRadius: '4px', // Set your desired border radius
          marginBottom: '10px', // Set your desired margin bottom
          background: 'linear-gradient(to right, #E0E0E0 0%, #F0F0F0 50%, #E0E0E0 100%)', // Shimmer effect gradient
          backgroundSize: '200% 100%', // Shimmer effect width
        }}
      />
    );
  };

  const BottomBar = () => {
    return (
      <div className="fixed bottom-0 left-0 w-full border-t border-t-gray-200 bg-white p-4 flex justify-end">
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
        {/*<Combobox setNum={setNum}/>*/}
        {/*<Button size="sm" disabled={!data} onClick={() => setValue()}><Shuffle size={20} color={'white'}/></Button>*/}
      </div>
      { isLoading ? (
        <div>
          {Array(3).fill(1).map((_, i) => <SkeletonLoadingComponent key={`skeleton_${i}`} id={`skeleton_${i}`} />)}
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
      <BottomBar />
    </div>
  );
};

export default Container;