import {QueryClient} from "@tanstack/react-query";
import { cache } from "react";

export const getQueryClient = cache(() => new QueryClient());


export const getRandomVerse = async ({ chapter, page, juz }: any) => {
  const dataList = await fetch(`https://api.quran.com/api/v4/verses/random?${new URLSearchParams({
    fields: ['text_imlaei', 'text_uthmani', 'qpc_uthmani_hafs', 'chapter_id', 'v1_page'].toString(),
    ...(chapter ? { chapter_number: chapter.toString() } : {} ),
    ...(page ? { page_number: page.toString() } : {} ),
    ...(juz ? { juz_number: juz.toString() } : {} ),
    words: true.toString(),
    word_fields: ['text_uthmani, position'].toString(),
    translations: [39].toString(),
  })}`).then(
    (res) => res.json()
  );

  return { ...dataList };
};

export const getSpecificVerse = async (verse_key: any) => {
  const dataList = await fetch(`https://api.quran.com/api/v4/verses/by_key/${verse_key}?${new URLSearchParams({
    fields: ['text_imlaei', 'text_uthmani', 'qpc_uthmani_hafs', 'chapter_id'].toString(),
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