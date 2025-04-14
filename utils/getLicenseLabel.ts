import licenseData from "@/data/cc-licenses.json";

export function getLicenseLabel(url: string, lang: "en" | "de" = "de") {
  const normalizedUrl =
    url?.toLowerCase().replace("http://", "https://").replace(/\/+$/, "") ?? "";

  const entry = Object.entries(licenseData).find(([key]) => {
    const normalizedKey = key
      .toLowerCase()
      .replace("http://", "https://")
      .replace(/\/+$/, "");
    return normalizedUrl.includes(normalizedKey);
  });

  if (entry) {
    const [, data] = entry;
    return {
      label: data.label,
      title: data.title,
      icons: data.icons || [],
    };
  }

  return {
    label: "Lizenz anzeigen",
    title: "Informationen zur Lizenz dieses Werks anzeigen.",
    icons: [],
  };
}
