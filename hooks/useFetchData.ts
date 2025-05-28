import { useEffect, useState } from "react";
import { fetchEuropeanaRecords } from "@/api/europeana";
import { kitchenItems } from "@/config/kitchenItems";

export function useFetchData(selected: string) {
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    if (selected === "Home") return;

    const fetchData = async () => {
      const terms = kitchenItems
        .find((i) => i.label === selected)
        ?.terms.join(" OR ");
      const query = terms || selected;
      const results = await fetchEuropeanaRecords(query);
      setRecords(results);
    };

    fetchData();
  }, [selected]);

  return records;
}
