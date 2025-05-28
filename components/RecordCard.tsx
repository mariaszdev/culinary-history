import LicenseInfo from "@/components/LicenseInfo";
import ProviderInfo from "@/components/ProviderInfo";
import { extractRecordInfo } from "@/utils/extractRecordInfo";

export default function RecordCard({ data }: { data: any }) {
  const info = extractRecordInfo(data);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <div className="relative w-full h-[300px] mb-3">
        <img
          src={info.image}
          alt={info.title || "Objekt"}
          className="object-cover w-full h-full rounded"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.jpg";
          }}
        />
      </div>
      <div className="space-y-3 text-sm">
        <div>{info.title && <p>{info.title}</p>}</div>
        <div>
          {info.subject && (
            <p>
              <strong>Thema:</strong> {info.subject}
            </p>
          )}
          {info.type && (
            <p>
              <strong>Typ:</strong> {info.type}
            </p>
          )}
        </div>
        <div>
          {info.year && (
            <p>
              <strong>Jahr:</strong> {info.year}
            </p>
          )}
          {info.timePeriods?.length > 0 && (
            <p>
              <strong>Zeitperiode:</strong> {info.timePeriods.join(", ")}
            </p>
          )}
        </div>
        <div>
          {info.country && (
            <p>
              <strong>Land:</strong> {info.country}
            </p>
          )}
          {info.organization && (
            <p>
              <strong>Institution:</strong> {info.organization}
            </p>
          )}
        </div>

        {info.issued && (
          <p>
            <strong>Veröffentlicht:</strong> {info.issued}
          </p>
        )}

        {(info.rightsUrl || info.sourceLink) && (
          <div className="flex justify-between items-center">
            {info.rightsUrl && (
              <LicenseInfo
                url={info.rightsUrl}
                label={info.rightsLabel}
                title={info.rightsTitle}
                icons={info.rightsIcons}
              />
            )}
            {info.sourceLink && <ProviderInfo url={info.sourceLink} />}
          </div>
        )}

        {/* Full Object JSON - for debugging ------------------- */}
        <div>
          {data?.object?.about && (
            <a
              href={info.jsonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              JSON anzeigen
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
