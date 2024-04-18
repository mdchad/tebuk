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

const Container = () => {
  const [num, setNum] = useState<number>(0)

  const { data, refetch, fetchStatus } = useQuery<any>({
    queryKey: ["data", num],
    queryFn: () => getData(num),
    enabled: Boolean(num),
    staleTime: Infinity
  });

  // const containerVariants = {
  //   visible: {
  //     transition: {
  //       delayChildren: index * 0.25,
  //       staggerChildren: 0.05,
  //     }
  //   },
  //   hidden: { }
  // };

  return (
    <div className="flex flex-col w-full h-full lg:w-1/2 items-center space-y-4">
      <div className="flex items-center gap-4 border-b pb-4">
        <Combobox setNum={setNum}/>
        <Settings />
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