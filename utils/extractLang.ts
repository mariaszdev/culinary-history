export function extractLang(
  field: Record<string, string[]> | undefined,
  preferredLangs: string[] = ["de", "en"],
): string | null {
  if (!field) return null;
  for (const lang of preferredLangs) {
    if (Array.isArray(field[lang])) return field[lang].join(", ");
  }
  const first = Object.values(field).find((val) => Array.isArray(val));
  return first ? (first as string[]).join(", ") : null;
}
