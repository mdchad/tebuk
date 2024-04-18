"use client";
import { motion } from "framer-motion";

function getUnicodeCharacter(n: number) {
  const baseHex = 'FC00';
  const baseDecimal = parseInt(baseHex, 16);
  const targetDecimal = baseDecimal + (n - 1);
  const targetHex = targetDecimal.toString(16).toUpperCase();
  const unicodeCharacter = String.fromCodePoint(parseInt(targetHex, 16));
  return unicodeCharacter;
}

const Verse = ({ data }: any) => {
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

  const text = data.verse.text_imlaei;
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <p lang="ar" dir="rtl" className="font-arabic text-3xl leading-loose">
        {data.verse.text_imlaei.split('').map((text: string, index: number) => {
          return (
            <motion.span
              key={index}
              variants={child}>
              {text}
            </motion.span>
          )
        })}
        <span>{getUnicodeCharacter(data.verse.verse_number)}</span>
      </p>
      <motion.p
        className="mt-8 font-mono text-sm"
        variants={continuationVariants}
        initial="initial"
        animate="animate"
      >
        Continue the verse
      </motion.p>
    </motion.div>
  );
};

export default Verse;