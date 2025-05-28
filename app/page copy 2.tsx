"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import RecordCard from "@/components/RecordCard";
import { kitchenItems } from "@/config/kitchenItems";

const API_KEY = process.env.NEXT_PUBLIC_EUROPEANA_API_KEY;

export default function HomePage() {
  const [selected, setSelected] = useState(kitchenItems[0].label);
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    const terms = kitchenItems
      .find((i) => i.label === selected)
      ?.terms.join(" OR ");
    const fetchRecords = async () => {
      const res = await fetch(
        `https://api.europeana.eu/record/v2/search.json?query=${encodeURIComponent(
          terms || selected,
        )}&rows=12&media=true&wskey=${API_KEY}`,
      );
      const data = await res.json();
      const recordItems = await Promise.all(
        (data.items || []).map(async (item: any) => {
          const recordRes = await fetch(
            `https://api.europeana.eu/record/v2${item.id}.json?wskey=${API_KEY}`,
          );
          return await recordRes.json();
        }),
      );
      setRecords(recordItems);
    };

    fetchRecords();
  }, [selected]);

  return (
    <main className="min-h-screen flex bg-gray-100">
      <Sidebar
        items={kitchenItems}
        selected={selected}
        onSelect={setSelected}
      />
      <section className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {records.map((item, idx) => (
          <RecordCard key={idx} data={{ object: item }} />
        ))}
      </section>
    </main>
  );
}
