import { extractLang } from "@/utils/extractLang";

export default function RecordCard({ data }: { data: any }) {
  const proxy = data?.object?.proxies?.[0];
  const aggregation = data?.object?.europeanaAggregation;

  const organization = extractLang(data?.object?.organizations?.[0]?.prefLabel);
  const title = extractLang(proxy?.dcTitle);
  const description = extractLang(proxy?.dcDescription);
  const subject = extractLang(proxy?.dcSubject);
  const type = extractLang(proxy?.dcType);
  const country = aggregation?.edmCountry?.def?.[0];
  const year = proxy?.year?.def?.[0];
  const issued = proxy?.dctermsIssued?.def?.[0];

  const timePeriods = data?.object?.timespans
    ?.map((ts: any) => extractLang(ts.prefLabel))
    .filter(Boolean)
    .join(" / ");

  const sourceLink = data?.object?.aggregations?.[0]?.edmIsShownAt;
  const jsonUrl = `https://api.europeana.eu/record/v2${data?.object?.about}.json?wskey=${process.env.NEXT_PUBLIC_EUROPEANA_API_KEY}`;

  // Try to extract image
  const rawImage =
    data?.object?.aggregations?.[0]?.edmObject || aggregation?.edmPreview;

  const image =
    typeof rawImage === "string" && rawImage.startsWith("http")
      ? rawImage
      : "/placeholder.jpg";

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <div className="relative w-full h-[300px] mb-4">
        <img
          src={image}
          alt={title || "Objekt"}
          className="object-cover w-full h-full rounded"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.jpg";
          }}
        />
      </div>
      <div className="space-y-1 text-sm">
        {title && (
          <p>
            <strong>Titel:</strong> {title}
          </p>
        )}
        {description && (
          <p>
            <strong>Beschreibung:</strong> {description}
          </p>
        )}
        {subject && (
          <p>
            <strong>Thema:</strong> {subject}
          </p>
        )}
        {type && (
          <p>
            <strong>Typ:</strong> {type}
          </p>
        )}
        {country && (
          <p>
            <strong>Land:</strong> {country}
          </p>
        )}
        {organization && (
          <p>
            <strong>Institution:</strong> {organization}
          </p>
        )}
        {year && (
          <p>
            <strong>Jahr:</strong> {year}
          </p>
        )}
        {issued && (
          <p>
            <strong>Veröffentlicht:</strong> {issued}
          </p>
        )}
        {timePeriods && (
          <p>
            <strong>Zeitperiode:</strong> {timePeriods}
          </p>
        )}
        {sourceLink && (
          <a
            href={sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-700 underline block mt-2"
          >
            Quelle anzeigen
          </a>
        )}
        {data?.object?.about && (
          <a
            href={jsonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            JSON anzeigen
          </a>
        )}
      </div>
    </div>
  );
}
