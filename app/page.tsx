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
