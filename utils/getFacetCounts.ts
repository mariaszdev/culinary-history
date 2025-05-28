export interface FacetCount {
  value: string;
  count: number;
}

export function getFacetCounts(
  values: (string | undefined | string[])[],
): FacetCount[] {
  const counts = new Map<string, number>();

  values.flat().forEach((v) => {
    if (!v) return;
    if (Array.isArray(v)) {
      v.forEach((item) => {
        if (item) counts.set(item, (counts.get(item) || 0) + 1);
      });
    } else {
      counts.set(v, (counts.get(v) || 0) + 1);
    }
  });

  return Array.from(counts.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([value, count]) => ({ value, count }));
}
