"use client";

import { useQuery } from "@tanstack/react-query";
import {getData} from "@/app/store";
import {useState} from "react";
import Ayah from "@/app/components/Ayah";
import Main from "@/app/components/Main";
import {Combobox} from "@/components/combobox";
import {Settings} from "@/app/components/Settings";

const Container = () => {
  const [num, setNum] = useState<number>(0)

  const { data, refetch } = useQuery<any>({
    queryKey: ["data", num],
    queryFn: () => getData(num),
    staleTime: 1000 * 60,
    enabled: Boolean(num)
  });

  return (
    <div className="flex flex-col w-full h-full lg:w-1/2 items-center space-y-4">
      <Combobox setNum={setNum}/>
      { data && <Main refetch={refetch} /> }
      <div className="p-8 rounded-xl text-right line">
        { data && <Ayah data={data}/> }
      </div>
      {/*<Settings />*/}
    </div>
  );
};

export default Container;