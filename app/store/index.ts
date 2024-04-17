import {QueryClient} from "@tanstack/react-query";
import { cache } from "react";

export const getQueryClient = cache(() => new QueryClient());


export const getData = async (page) => {
  const dataList = await fetch(`https://api.quran.com/api/v4/verses/random?fields=text_imlaei,chapter_id&chapter_number=${page}`).then(
    (res) => res.json()
  );

  return { ...dataList };
};

export const getSurah = async (page = 1) => {
  const dataList = await fetch('https://api.quran.com/api/v4/chapters').then(
    (res) => res.json()
  );

  return { ...dataList };
};