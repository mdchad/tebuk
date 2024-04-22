"use client";
import {AnimatePresence, motion} from "framer-motion";
import {ChevronFirst} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {getSpecificVerse, getSurah} from "@/app/store";
import {useQuery} from "@tanstack/react-query";
import {Separator} from "@/components/ui/separator";
import {arabicV1Font} from "@/app/font";

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
  const { data } = useQuery({
    queryKey: ["nextVerse", verseKey],
    queryFn: () => getSpecificVerse(verseKey),
    staleTime: 1000 * 60,
    enabled: !!verseKey
  });

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
  };

  return (
    <>
    {/* <motion.div*/}
    {/*  initial="hidden"*/}
    {/*  animate="visible"*/}
    {/*  variants={container}*/}
    {/*>*/}
      <p lang="ar" dir="rtl" className="font-arabic text-4xl leading-loose">
        {/*{data.verse.words.sort((a,b) => a.position - b.position).map((text: any, index: number) => {*/}
        {/*  return (*/}
        {/*    <>*/}
        {/*      <motion.span*/}
        {/*        className="font-arabic"*/}
        {/*        key={index}*/}
        {/*        variants={child}>*/}
        {/*        {text.text_imlaei}*/}
        {/*      </motion.span>*/}
        {/*      <span>&nbsp;</span>*/}
        {/*    </>*/}
        {/*  )*/}
        {/*})}*/}
        {verse.verse.text_uthmani.replace(/\u{06DF}/gu, "\u{0652}")}
        {/*{verse.verse.code_v1}*/}
        <span>{getUnicodeCharacter(verse.verse.verse_number)}</span>
        <AnimatePresence>
          <motion.div
            key={verseKey}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            { !verseKey && (
              <Button className="mr-2" size="sm" variant="outline" onClick={getNextVerse}><span className="font-mono text-xs">Reveal the next ayah</span></Button>
            )}
          </motion.div>
        </AnimatePresence>
      </p>
      <motion.div
        className="py-6"
        key={data?.verse?.id}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        // exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
      { data?.verse && (
        <div className="flex flex-col space-y-6">
          <Separator />
          <p lang="ar" dir="rtl" className="font-arabic text-3xl leading-loose text-justify">
            {data.verse.text_imlaei}
            <span>{getUnicodeCharacter(data.verse.verse_number)}</span>
          </p>
        </div>
      )}
      </motion.div>
      <motion.p
        className="mt-12 mb-12 font-mono text-sm"
        variants={continuationVariants}
        initial="initial"
        animate="animate"
      >
        Continue the verse
      </motion.p>
    {/*</motion.div>*/}
  </>
);};

export default Verse;