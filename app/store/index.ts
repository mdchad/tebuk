import {QueryClient} from "@tanstack/react-query";
import { cache } from "react";

export const getQueryClient = cache(() => new QueryClient());


export const getData = async (page: number) => {
  const dataList = await fetch(`https://api.quran.com/api/v4/verses/random?fields=text_imlaei,chapter_id&chapter_number=${page}`).then(
    (res) => res.json()
  );

  return { ...dataList };
};

export const getSurah = async () => {
  const dataList = await fetch('https://api.quran.com/api/v4/chapters').then(
    (res) => res.json()
  );

  return { ...dataList };
};