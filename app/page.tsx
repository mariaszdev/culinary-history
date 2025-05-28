"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import RecordCard from "@/components/RecordCard";
import HomeIntro from "@/components/HomeIntro";
import { kitchenItems } from "@/config/kitchenItems";
import { useFetchData } from "@/hooks/useFetchData";
import FacetDropdown from "@/components/FacetDropdown";
import { extractRecordInfo } from "@/utils/extractRecordInfo";
import { filterRecords } from "@/utils/filterRecords";

// Count helper
function getFacetCounts(values: (string | undefined | string[])[]) {
  const counts = new Map<string, number>();
  values.flat().forEach((v) => {
    if (!v) return;
    counts.set(v, (counts.get(v) || 0) + 1);
  });
  return Array.from(counts.entries())
    .sort()
    .map(([value, count]) => ({ value, count }));
}

// Merge helper: enrich all values with filtered counts
function mergeOptionsWithCounts(
  all: { value: string; count: number }[],
  filteredCounts: Map<string, number>,
) {
  return all.map((opt) => ({
    value: opt.value,
    count: filteredCounts.get(opt.value) ?? 0,
  }));
}

export default function HomePage() {
  const [selected, setSelected] = useState("Home");

  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("");
  const [selectedOrganization, setSelectedOrganization] = useState<string>("");
  const [selectedRightsLabel, setSelectedRightsLabel] = useState<string>("");

  const records = useFetchData(selected);
  const recordInfos = records.map(extractRecordInfo);

  const filteredRecordInfos = filterRecords(recordInfos, {
    timePeriod: selectedTimePeriod,
    organization: selectedOrganization,
    rightsLabel: selectedRightsLabel,
  });

  // ALL dropdown options (complete set)
  const allTimePeriodOptions = getFacetCounts(
    recordInfos.map((r) => r.timePeriods),
  );
  const allOrganizationOptions = getFacetCounts(
    recordInfos.map((r) => r.organization),
  );
  const allRightsLabelOptions = getFacetCounts(
    recordInfos.map((r) => r.rightsLabel),
  );

  // FILTERED counts based on current selections
  const filteredTimePeriodCounts = getFacetCounts(
    filterRecords(recordInfos, {
      organization: selectedOrganization,
      rightsLabel: selectedRightsLabel,
    }).map((r) => r.timePeriods),
  );
  const filteredOrganizationCounts = getFacetCounts(
    filterRecords(recordInfos, {
      timePeriod: selectedTimePeriod,
      rightsLabel: selectedRightsLabel,
    }).map((r) => r.organization),
  );
  const filteredRightsLabelCounts = getFacetCounts(
    filterRecords(recordInfos, {
      timePeriod: selectedTimePeriod,
      organization: selectedOrganization,
    }).map((r) => r.rightsLabel),
  );

  const timePeriodOptions = mergeOptionsWithCounts(
    allTimePeriodOptions,
    new Map(filteredTimePeriodCounts.map((c) => [c.value, c.count])),
  );
  const organizationOptions = mergeOptionsWithCounts(
    allOrganizationOptions,
    new Map(filteredOrganizationCounts.map((c) => [c.value, c.count])),
  );
  const rightsLabelOptions = mergeOptionsWithCounts(
    allRightsLabelOptions,
    new Map(filteredRightsLabelCounts.map((c) => [c.value, c.count])),
  );
  const hasActiveFilters =
    selectedTimePeriod || selectedOrganization || selectedRightsLabel;

  return (
    <main className="min-h-screen flex bg-gray-100">
      <Sidebar
        items={kitchenItems}
        selected={selected}
        onSelect={setSelected}
      />
      <section className="flex-1 p-6">
        {selected === "Home" ? (
          <HomeIntro />
        ) : (
          <>
            {/* Heading and Filters */}
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <h2 className="text-5xl font-bold">
                <span className="text-pink-800">{selected}</span>
              </h2>

              <div className="flex flex-wrap items-start gap-4 ml-auto">
                <FacetDropdown
                  label="Zeitperiode"
                  values={timePeriodOptions}
                  selectedValue={selectedTimePeriod}
                  onChange={setSelectedTimePeriod}
                />
                <FacetDropdown
                  label="Lizenz"
                  values={rightsLabelOptions}
                  selectedValue={selectedRightsLabel}
                  onChange={setSelectedRightsLabel}
                />
                <FacetDropdown
                  label="Institution"
                  values={organizationOptions}
                  selectedValue={selectedOrganization}
                  onChange={setSelectedOrganization}
                />
                <div className="mb-4 pt-[1.25rem]">
                  <button
                    onClick={() => {
                      setSelectedTimePeriod("");
                      setSelectedOrganization("");
                      setSelectedRightsLabel("");
                    }}
                    className="text-sm px-4 py-2 rounded font-semibold transition-colors duration-150
        text-gray-700 bg-gray-200 hover:bg-gray-300
        disabled:bg-gray-100 disabled:text-gray-400"
                    disabled={!hasActiveFilters}
                  >
                    ↺ Filter zurücksetzen
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecordInfos.map((info, idx) => (
                <RecordCard key={idx} data={info.originalData} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
