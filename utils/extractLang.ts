export function extractLang(
  field: Record<string, string[]> | undefined,
  preferredLangs: string[] = ["de", "en"],
): string | null {
  if (!field) return null;

  for (const lang of preferredLangs) {
    if (Array.isArray(field[lang])) {
      const unique = [...new Set(field[lang])];
      return unique.join(", ");
    }
  }

  const first = Object.values(field).find((val) => Array.isArray(val));
  if (first) {
    const unique = [...new Set(first)];
    return unique.join(", ");
  }

  return null;
}
