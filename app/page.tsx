"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import RecordCard from "@/components/RecordCard";
import HomeIntro from "@/components/HomeIntro";
import { kitchenItems } from "@/config/kitchenItems";
import { whitelistedInstitutions } from "@/config/whitelistedInstitutions";
import { extractLang } from "@/utils/extractLang"; // make sure you have this

const API_KEY = process.env.NEXT_PUBLIC_EUROPEANA_API_KEY;

export default function HomePage() {
  const [selected, setSelected] = useState("Home");
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    if (selected === "Home") return;

    const fetchData = async () => {
      const terms = kitchenItems
        .find((i) => i.label === selected)
        ?.terms.join(" OR ");
      const searchUrl = `https://api.europeana.eu/record/v2/search.json?query=${encodeURIComponent(
        terms || selected,
      )}&rows=12&media=true&profile=rich&wskey=${API_KEY}`;

      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json();

      const recordResults = await Promise.all(
        (searchData.items || []).map(async (item: any) => {
          const recordUrl = `https://api.europeana.eu/record/v2${item.id}.json?wskey=${API_KEY}`;
          const res = await fetch(recordUrl);
          return res.ok ? res.json() : null;
        }),
      );

      setRecords(recordResults.filter(Boolean));
    };

    fetchData();
  }, [selected]);

  return (
    <main className="min-h-screen flex bg-gray-100">
      <Sidebar
        items={kitchenItems}
        selected={selected}
        onSelect={setSelected}
      />
      <section className="flex-1 p-6">
        {selected === "Home" ? (
          <HomeIntro />
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">
              Gefundene Objekte für:{" "}
              <span className="text-pink-800">{selected}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {records.map((record, idx) => (
                <RecordCard key={idx} data={record} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
