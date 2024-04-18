import {QueryClient} from "@tanstack/react-query";
import { cache } from "react";

export const getQueryClient = cache(() => new QueryClient());


export const getData = async (page: number) => {
  const dataList = await fetch(`https://api.quran.com/api/v4/verses/random?${new URLSearchParams({
    fields: ['text_imlaei', 'text_uthmani', 'chapter_id'].toString(),
    chapter_number: page.toString(),
    words: true.toString(),
    word_fields: ['text_imlaei, position'].toString()
  })}`).then(
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