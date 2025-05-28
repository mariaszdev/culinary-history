const API_KEY = process.env.NEXT_PUBLIC_EUROPEANA_API_KEY;

export async function fetchEuropeanaRecords(query: string) {
  const searchUrl = `https://api.europeana.eu/record/v2/search.json?query=${encodeURIComponent(
    query,
  )}&rows=30&media=true&profile=rich&wskey=${API_KEY}`;

  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();

  const recordResults = await Promise.all(
    (searchData.items || []).map(async (item: any) => {
      const recordUrl = `https://api.europeana.eu/record/v2${item.id}.json?wskey=${API_KEY}`;
      const res = await fetch(recordUrl);
      return res.ok ? res.json() : null;
    }),
  );

  return recordResults.filter((record) => {
    const rights = record?.object?.aggregations?.[0]?.edmRights?.def?.[0];
    return rights && !rights.includes("InC");
  });
}
