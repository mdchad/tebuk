import Link from "next/link";
import data from "../../data/QPC-V1.json"

export default async function Home() {
  return (
    <main className="px-4 sm:px-6 lg:px-20 mb-20 py-4 sm:py-6 lg:py-16 bg-gray-100">
      {/*<input onChange={(e) => setSearch(e.target.value)} value={search} />*/}
      {/*<button onClick={handleSubmit}>Submit</button>*/}
      <div>
        <p className="font-first text-[100px]">{data["1:1:1"].text}{data["1:1:2"].text}{data["1:1:3"].text}{data["1:1:4"].text}{data["1:1:5"].text}</p>
        <p className="font-first">{data["1:2:1"].text}{data["1:2:2"].text}{data["1:2:3"].text}{data["1:2:4"].text}{data["1:2:5"].text}</p>
        <p className="font-first">{data["1:3:1"].text}{data["1:3:2"].text}{data["1:3:3"].text}</p>
        <p className="font-first">{data["1:4:1"].text}{data["1:4:2"].text}{data["1:4:3"].text}{data["1:4:4"].text}</p>
      </div>
    </main>
  );
}
