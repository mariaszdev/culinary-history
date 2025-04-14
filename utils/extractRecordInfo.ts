import { extractLang } from "./extractLang";
import { getLicenseLabel } from "./getLicenseLabel";

export interface ExtractedRecordInfo {
  originalData: any;
  year?: string;
  timePeriods?: string[];
  organization?: string;
  title?: string;
  description?: string;
  subject?: string;
  type?: string;
  country?: string;
  issued?: string;
  rightsUrl?: string;
  rightsLabel?: string;
  rightsTitle?: string;
  rightsIcons?: string;
  sourceLink?: string;
  jsonUrl?: string;
  image?: string;
}

// Utility: extract usable labels from a timespan
function extractTimespanLabels(timespan: any): string[] {
  const labels: string[] = [];

  const prefLabel = timespan?.prefLabel;
  const skosNotation = timespan?.skosNotation;

  // Add preferred label (try German, then English, then any fallback)
  if (prefLabel?.de?.length) labels.push(...prefLabel.de);
  // else if (prefLabel?.en?.length) labels.push(...prefLabel.en);
  else if (prefLabel) labels.push(...Object.values(prefLabel).flat());

  // Add skosNotation (like "1500/1550")
  if (skosNotation?.def?.length) labels.push(...skosNotation.def);

  return labels;
}

export function extractRecordInfo(record: any): ExtractedRecordInfo {
  const proxy = record?.object?.proxies?.find((p: any) => !p.europeanaProxy);
  const aggregation = record?.object?.europeanaAggregation;
  const rightsUrl = record?.object?.aggregations?.[0]?.edmRights?.def?.[0];
  const {
    label: rightsLabel,
    title: rightsTitle,
    icons: rightsIcons,
  } = getLicenseLabel(rightsUrl);

  const sourceLink = record?.object?.aggregations?.[0]?.edmIsShownAt;
  const jsonUrl = `https://api.europeana.eu/record/v2${record?.object?.about}.json?wskey=${process.env.NEXT_PUBLIC_EUROPEANA_API_KEY}`;

  const rawImage =
    record?.object?.aggregations?.[0]?.edmObject || aggregation?.edmPreview;

  const image =
    typeof rawImage === "string" && rawImage.startsWith("http")
      ? rawImage
      : "/placeholder.jpg";

  const timePeriods = Array.from(
    new Set(
      (record?.object?.timespans || [])
        .flatMap(extractTimespanLabels)
        .filter(Boolean),
    ),
  );

  return {
    originalData: record,
    year: proxy?.year?.def?.[0],
    timePeriods,
    organization: extractLang(record?.object?.organizations?.[0]?.prefLabel),
    title: extractLang(proxy?.dcTitle),
    description: extractLang(proxy?.dcDescription),
    subject: extractLang(proxy?.dcSubject),
    type: extractLang(proxy?.dcType),
    country: aggregation?.edmCountry?.def?.[0],
    issued: proxy?.dctermsIssued?.def?.[0],
    rightsUrl,
    rightsLabel,
    rightsTitle,
    rightsIcons,
    sourceLink,
    jsonUrl,
    image,
  };
}
