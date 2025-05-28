"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import RecordCard from "@/components/RecordCard";
import HomeIntro from "@/components/HomeIntro";
import { kitchenItems } from "@/config/kitchenItems";
import { useFetchData } from "@/hooks/useFetchData";

export default function HomePage() {
  const [selected, setSelected] = useState("Home");
  const records = useFetchData(selected);

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
