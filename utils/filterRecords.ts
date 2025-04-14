import { ExtractedRecordInfo } from "./extractRecordInfo";

interface Filters {
  timePeriod?: string;
  organization?: string;
  rightsLabel?: string;
}

export function filterRecords(
  records: ExtractedRecordInfo[],
  filters: Filters,
): ExtractedRecordInfo[] {
  return records.filter((record) => {
    const matchesTimePeriod =
      !filters.timePeriod ||
      (filters.timePeriod === "__NONE__"
        ? record.timePeriods?.length === 0
        : filters.timePeriod === "__WITH__"
          ? record.timePeriods?.length > 0
          : record.timePeriods?.includes(filters.timePeriod));

    const matchesOrganization =
      !filters.organization ||
      (filters.organization === "__NONE__"
        ? !record.organization
        : record.organization === filters.organization);

    const matchesRightsLabel =
      !filters.rightsLabel || record.rightsLabel === filters.rightsLabel;

    return matchesTimePeriod && matchesOrganization && matchesRightsLabel;
  });
}
