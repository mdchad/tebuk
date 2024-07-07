"use client";
import {AnimatePresence, motion} from "framer-motion";
import {ChevronFirst, ChevronsRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {getSpecificVerse, getSurah} from "@/app/store";
import {useQuery} from "@tanstack/react-query";
import {Separator} from "@/components/ui/separator";
import {chapter} from "@/lib/chapters";
import WordFadeIn from "@/components/magicui/word-fade-in";

function getUnicodeCharacter(n: number) {
  const baseHex = 'FC00';
  const baseDecimal = parseInt(baseHex, 16);
  const targetDecimal = baseDecimal + (n - 1);
  const targetHex = targetDecimal.toString(16).toUpperCase();
  const unicodeCharacter = String.fromCodePoint(parseInt(targetHex, 16));
  return unicodeCharacter;
}

const Verse = ({ data: verse }: any) => {
  const [verseKey, setVerseKey] = useState("")
  const [lastAyah, setLastAyah] = useState(false)
  const { data } = useQuery({
    queryKey: ["nextVerse", verseKey],
    queryFn: () => getSpecificVerse(verseKey),
    staleTime: 1000 * 60 * 24,
    enabled: !!verseKey
  });

  useEffect(() => {
    if (data) {
      window.scrollTo({ behavior: "smooth", top: document.body.scrollHeight })
    }
  }, [data])

  useEffect(() => {
    if (verse) {
      let a = chapter.find((chap: any) => chap.id === verse.verse.chapter_id)
      if (a) {
        if (a?.verses_count === verse.verse.verse_number) {
          setLastAyah(true)
        }
      }
    }
  }, [verse, setLastAyah])

  function getNextVerse() {
    if (verse.verse) {
      let nextVerseKey = `${verse.verse.chapter_id}:${verse.verse.verse_number + 1}`
      setVerseKey(nextVerseKey)
    }
  }

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const text = verse.verse.text_imlaei;
  const numCharacters = text.length;
  const staggerDuration = 0.003; // duration between stagger animations
  const initialDelay = 0.001; // initial delay before stagger starts

// The total duration before the last letter starts animating
  const totalAnimationTime = initialDelay + staggerDuration * numCharacters;

  const container = {
    hidden: { opacity: 0.7 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDuration, delayChildren: initialDelay * i },
    }),
  };

  const continuationVariants = {
    initial: { y: 10, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { delay: totalAnimationTime }
    },
    exit: { x: 100, opacity: 0 }
};

  return (
    <>
    {/* <motion.div*/}
    {/*  initial="hidden"*/}
    {/*  animate="visible"*/}
    {/*  variants={container}*/}
    {/*>*/}
      <WordFadeIn words={verse.verse.qpc_uthmani_hafs} delay={0.08} lang="ar" dir="rtl" className="font-arabicV1 text-4xl leading-loose"/>
    {/*    {verse.verse.words.sort((a,b) => a.position - b.position).map((text: any, index: number) => {*/}
    {/*      return (*/}
    {/*        <>*/}
    {/*          <motion.span*/}
    {/*            className="text-4xl"*/}
    {/*            key={index}*/}
    {/*            variants={child}>*/}
    {/*            {text.text_uthmani}*/}
    {/*          </motion.span>*/}
    {/*          <span>&nbsp;</span>*/}
    {/*        </>*/}
    {/*      )*/}
    {/*    })}*/}
    {/*    {verse.verse.qpc_uthmani_hafs}*/}
        {/*{verse.verse.code_v1}*/}
        {/*<span>{getUnicodeCharacter(verse.verse.verse_number)}</span>*/}
      <AnimatePresence>
      {
        !lastAyah ? (
          !verseKey && (
            <>
              <motion.p
                className="ml-2 mt-12 font-mono text-sm"
                variants={continuationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                Continue the ayah
              </motion.p>
              <motion.p
                className="ml-2 mb-2 font-mono text-sm text-gray-400"
                variants={continuationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                or
              </motion.p>
            </>
          )
        ) : <p className="ml-2 mt-12 font-mono text-sm">This is the last ayah of the surah</p>
      }
      </AnimatePresence>
      <AnimatePresence>
      {
        !lastAyah ? (
            <motion.div
              key={verseKey}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              exit={{ x: 100, opacity: 0 }}
            >
              { !verseKey && (
                <Button className="mr-2 gap-2 border-[#5afac5] bg-[#5afac5]/20 hover:bg-[#5afac5]/60" size="sm" variant="outline" onClick={getNextVerse}>
                  <ChevronsRight size={18} />
                  <span className="font-mono text-xs">Peek the next ayah</span>
                </Button>
              )}
            </motion.div>
        ) : null
      }
      </AnimatePresence>
      {/*<motion.div*/}
      {/*  className="py-6"*/}
      {/*  key={data?.verse?.id}*/}
      {/*  initial={{ y: 10, opacity: 0 }}*/}
      {/*  animate={{ y: 0, opacity: 1 }}*/}
      {/*  transition={{ duration: 0.5 }}*/}
      {/*>*/}
      <div>
        { data?.verse && (
          <div className="flex flex-col space-y-6">
            <Separator />
            <WordFadeIn lang="ar" dir="rtl" delay={0.08} className="font-arabicV1 text-4xl leading-loose" words={data.verse.qpc_uthmani_hafs}/>
          </div>
        )}
      </div>
      {/*</motion.div>*/}
    {/*</motion.div>*/}
  </>
);};

export default Verse;