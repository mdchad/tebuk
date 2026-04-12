import {dehydrate} from "@tanstack/query-core";
import Hydrate from "@/app/Hydrate";
import {getRandomVerse, getQueryClient, getSurah} from "@/app/store";
import Container from "@/app/components/Container";
import AboutDialog from "@/app/components/AboutDialog";

export default async function Home() {
  const client = getQueryClient();
  await client.prefetchQuery({
    queryKey: ["surah"],
    queryFn: () => getSurah(),
  });

  const dehydratedState = dehydrate(client, {
    shouldDehydrateQuery: () => true,
  });

  return (
    <>
      <section className="sr-only">
        <h2>What is tebuk?</h2>
        <p>
          tebuk.app is a free Quran memorization (hifz) practice tool. Tebuk is a well-known revision
          technique where a random ayah or verse is given and the participant must continue reciting from
          memory without looking at the Quran. The word &ldquo;tebuk&rdquo; comes from Malay, meaning &ldquo;to poke&rdquo;.
        </p>
        <h2>How to use tebuk.app</h2>
        <p>
          Choose a mode — by surah (chapter), page, or juz (part) — and the app will give you a random
          verse to recite from. Use the reveal buttons to check the surah name and page number after
          reciting, so you can test yourself without seeing the answer first. Shuffle anytime to get a
          new verse.
        </p>
        <h2>Who is it for?</h2>
        <p>
          tebuk.app is designed for anyone memorizing or reviewing the Quran — students in hifz programs,
          those maintaining their memorization, or anyone looking to strengthen their recall. It works on
          any device and requires no login or installation.
        </p>
      </section>
      <header className="text-center mt-4">
        <div className="inline-flex items-center gap-2">
          <h1 className="font-caveat text-7xl group">tebuk<span className="group-hover:text-[#5afac5]">.</span></h1>
          <AboutDialog />
        </div>
        {/*<p className="text-[10px] text-neutral-400">Build by <a href="https://pixelmindstudio.co" className="underline hover:decoration-[#5afac5] underline-offset-4">Pixelmind Studio</a></p>*/}
      </header>
      <main className="flex w-full flex-col items-center px-8 py-2 lg:p-24">
        <Hydrate state={dehydratedState}>
          <Container />
        </Hydrate>
      </main>
    </>
  );
}
