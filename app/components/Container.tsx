"use client";

import { useQuery } from "@tanstack/react-query";
import {getRandomVerse} from "@/app/store";
import {useState} from "react";
import Verse from "@/app/components/Verse";
import {Settings} from "@/app/components/Settings";
import {Button} from "@/components/ui/button";
import {ArrowDown, ChevronsDown, CornerRightDown, Eye, EyeOff, Shuffle, TrendingDown} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {getRandomInt} from "@/lib/utils";
import {Skeleton} from "@/app/components/Skeleton";
import {chapter} from "@/lib/chapters";
const Arrow = () => (
  <svg width="50" height="120" viewBox="0 0 106 212" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M89.5523 0.499048C87.5651 0.982422 84.0069 2.94278 81.2677 4.99712C78.5689 7.05146 71.3854 14.1947 67.6392 18.5853C59.8112 27.7426 55.0848 39.0884 53.2319 52.9989C52.5202 58.316 52.5202 68.5743 53.2319 74.4822C53.7824 78.9802 55.3131 87.0634 56.1993 89.8965L56.6826 91.4943L53.581 94.7839C38.0726 111.474 28.3916 132.111 24.0815 157.623C23.1685 163.168 22.0943 172.057 21.5706 178.448L21.3155 181.55L19.3283 178.287C15.7701 172.513 12.2925 168.217 8.66717 165.155C0.839139 158.468 -1.2421 159.516 1.92671 168.512C5.99514 179.979 15.1928 195.755 22.43 203.61C24.6723 206.054 28.8884 209.344 31.2919 210.552C33.937 211.922 34.9441 211.076 37.7503 205.074C38.6365 203.154 42.0873 196.924 45.4038 191.217C48.7338 185.511 51.4729 180.596 51.4729 180.261C51.4729 178.757 48.5995 174.943 44.7862 171.291C41.7919 168.458 39.6302 167.022 38.3277 167.022H37.3475L37.5758 165.128C38.5829 156.454 43.6717 141.564 48.9217 131.883C53.2856 123.827 57.9851 117.315 65.2492 109.164L66.6859 107.54L68.6059 109.299C75.1852 115.368 84.45 118.389 91.0696 116.67C95.5945 115.462 98.4411 112.884 101.006 107.58C102.805 103.901 103.248 102.236 103.288 99.47C103.315 93.5084 95.5005 83.8945 87.2563 79.7187C83.8055 77.9598 81.6437 77.5301 78.4883 77.9867C74.4199 78.5775 70.6335 80.3632 65.0209 84.3779C63.6245 85.385 62.416 86.204 62.3489 86.1369C61.9595 85.7072 61.2344 76.1606 61.2344 70.9509C61.2344 63.8479 61.5567 60.1018 62.698 54.3953C64.8463 43.7342 69.0222 35.1006 76.0312 26.8833C87.6725 13.2279 98.1994 6.67551 103.839 9.57576C104.591 9.93829 105.275 10.1263 105.369 10.0054C106.054 8.89099 100.576 2.9025 97.3535 1.2644C95.4334 0.284225 91.7812 -0.0782881 89.5255 0.485649L89.5523 0.499048ZM89.418 92.9712C89.324 93.4949 88.5721 95.2136 87.7933 96.8785C84.4097 103.981 78.5957 107.378 71.9493 106.13C70.7811 105.902 69.6667 105.606 69.4384 105.472C68.9148 105.15 74.9839 99.9265 78.9851 97.2276C82.8253 94.6496 87.7799 92.1791 89.2166 92.1119C89.4717 92.0851 89.5389 92.367 89.418 92.9578V92.9712Z" fill="#323232"/>
  </svg>

);

interface ISettings {
  chapter: number
  page: number
  juz: number
  rangeValue: {
    value: number[]
    mode: string
  }
}

const Container = () => {
  const [settings, setSettings] = useState<ISettings>({ chapter: 0, page: 0, juz: 0, rangeValue: { mode: '', value: [0, 0]} })
  const [revealSurah, setRevealSurah] = useState<boolean>(false)
  const [revealPage, setRevealPage] = useState<boolean>(false)
  const [clickedShuffle, setClickedShuffle] = useState<boolean>(false)

  function setSettingsValue(value: any) {
    setRevealSurah(false)
    setRevealPage(false)

    setSettings(value)
  }

  function setShuffle() {
    window.scrollTo({ behavior: "smooth", top: 0 })
    setRevealSurah(false)
    setRevealPage(false)
    setClickedShuffle(true)
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

  const HintBar = () => {
    return (
      <div className="fixed bottom-20 right-0">
        <div className="w-1/6 md:w-1/12 flex flex-col items-center">
          <p className="font-mono text-black text-[10px]">Shuffle</p>
          <p className="font-mono text-black text-[10px]">ayah</p>
          <div className="flex items-end">
            <motion.div
              animate={{
                y: ["5px", "0rem", "5px"],
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                repeat: Infinity
              }}
            >
              <Arrow />
            </motion.div>
          </div>
        </div>
      </div>
    );
  };

  const BottomBar = ({ data }: any) => {
    return (
      <div className="bg-white fixed bottom-0 left-0 w-full border-t border-t-gray-200 p-4 flex justify-between">
        { !!settings?.chapter || !!settings?.page || !!settings?.juz? (
          <div className="flex gap-1 justify-center items-center">
            <p className="font-mono text-xs lg:text-sm">Surah:
              {
                revealSurah ?
                  <span> {chapter.find(c => c.id === data?.verse.chapter_id)?.name_simple}</span> :
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
            <p className="font-mono text-xs lg:text-sm">Page:
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
        <div>
          <Button size="sm" className="shadow-xl bg-[#5afac5] hover:bg-[#5afac5]/70" disabled={!data} onClick={() => setShuffle()}><Shuffle size={20} color={'black'}/></Button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full lg:w-1/2 items-center space-y-4 pb-16 lg:pb-8">
      <div className="flex flex-col items-center gap-1 lg:gap-2 border-b pb-4">
        <p className="text-sm font-sans text-gray-500">Choose your mode</p>
        <motion.div
          animate={{
            y: ["5px", "0rem", "5px"],
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            repeat: Infinity
          }}
        >
          <ChevronsDown size={16} color={'#6B7280'}/>
        </motion.div>
        <Settings setSettings={setSettingsValue}/>
      </div>
      { isLoading ? (
        <div>
          {Array(3).fill(1).map((_, i) => <Skeleton key={`skeleton_${i}`} id={`skeleton_${i}`} />)}
        </div>
      ) : null}
      <AnimatePresence>
        <motion.div
          className="w-full min-h-screen"
          key={data?.verse?.id}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          // exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          { data && fetchStatus === 'idle' && <Verse data={data}/>}
        </motion.div>
      </AnimatePresence>
      { !clickedShuffle && <HintBar /> }
      <BottomBar data={data}/>
    </div>
  );
};

export default Container;