import {dehydrate} from "@tanstack/query-core";
import Hydrate from "@/app/Hydrate";
import {getData, getQueryClient, getSurah} from "@/app/store";
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
        <p className="font-raleway font-bold text-4xl">tebuk.</p>
      </header>
      <main className="flex min-h-screen w-full flex-col items-center p-8 lg:p-24">
        <Hydrate state={dehydratedState}>
          <Container />
        </Hydrate>
      </main>
    </>
  );
}
