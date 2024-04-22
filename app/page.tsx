import {dehydrate} from "@tanstack/query-core";
import Hydrate from "@/app/Hydrate";
import {getRandomVerse, getQueryClient, getSurah} from "@/app/store";
import Container from "@/app/components/Container";

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
        <p className="font-raleway font-bold text-5xl">tebuk.</p>
      </header>
      <main className="flex w-full flex-col items-center p-8 lg:p-24">
        <Hydrate state={dehydratedState}>
          <Container />
        </Hydrate>
      </main>
    </>
  );
}
