import { extractLang } from "@/utils/extractLang";
import { getLicenseLabel } from "@/utils/getLicenseLabel";
import LicenseInfo from "@/components/LicenseInfo";
import ProviderInfo from "@/components/ProviderInfo";

export default function RecordCard({ data }: { data: any }) {
  const proxy = data?.object?.proxies?.find((p: any) => !p.europeanaProxy);
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

  const rightsUrl = data?.object?.aggregations?.[0]?.edmRights?.def?.[0];
  const { label: rightsLabel, description: rightsDescription } =
    getLicenseLabel(rightsUrl);

  const sourceLink = data?.object?.aggregations?.[0]?.edmIsShownAt;
  const jsonUrl = `https://api.europeana.eu/record/v2${data?.object?.about}.json?wskey=${process.env.NEXT_PUBLIC_EUROPEANA_API_KEY}`;

  const rawImage =
    data?.object?.aggregations?.[0]?.edmObject || aggregation?.edmPreview;

  const image =
    typeof rawImage === "string" && rawImage.startsWith("http")
      ? rawImage
      : "/placeholder.jpg";

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <div className="relative w-full h-[300px] mb-3">
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
      <div className="space-y-3 text-sm">
        <div>{description && <p>{description}</p>}</div>
        <div>
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
        </div>
        <div>
          {year && (
            <p>
              <strong>Jahr:</strong> {year}
            </p>
          )}
          {timePeriods && (
            <p>
              <strong>Zeitperiode:</strong> {timePeriods}
            </p>
          )}
        </div>
        <div>
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
        </div>

        {issued && (
          <p>
            <strong>Veröffentlicht:</strong> {issued}
          </p>
        )}

        {(rightsUrl || sourceLink) && (
          <div className="flex justify-between items-center">
            {rightsUrl && (
              <LicenseInfo
                url={rightsUrl}
                label={rightsLabel}
                description={rightsDescription}
              />
            )}
            {sourceLink && <ProviderInfo url={sourceLink} />}
          </div>
        )}
        {/* Full Object JSON - for debugging ------------------- */}
        {/* 
          <div>
            {data?.object?.about && (
            <a
              href={jsonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              JSON anzeigen
            </a>
          </div>
          )} */}
      </div>
    </div>
  );
}
