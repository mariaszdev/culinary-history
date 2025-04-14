"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";

interface FacetDropdownProps {
  label: string;
  values: { value: string; count: number }[];
  onChange?: (value: string) => void;
  selectedValue?: string;
  showHasValueOptions?: boolean;
}

const CLEAR_VALUE = "__CLEAR__";

export default function FacetDropdown({
  label,
  values,
  onChange,
  selectedValue,
  showHasValueOptions = false,
}: FacetDropdownProps) {
  return (
    <div className="mb-2 w-74">
      <label className="text-sm font-semibold text-slate-700 block">
        {label}
      </label>

      <Select
        value={selectedValue || ""}
        onValueChange={(value) =>
          onChange?.(value === CLEAR_VALUE ? "" : value)
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`— ${label} wählen —`} />
        </SelectTrigger>

        <SelectContent className="w-full">
          <SelectGroup>
            <SelectItem value={CLEAR_VALUE}>— Filter zurücksetzen —</SelectItem>

            {showHasValueOptions && (
              <>
                <SelectItem value="__WITH__">
                  mit {label.toLowerCase()}
                </SelectItem>
                <SelectItem value="__NONE__">
                  ohne {label.toLowerCase()}
                </SelectItem>
              </>
            )}

            {values.map(({ value, count }) => (
              <SelectItem key={value} value={value} disabled={count === 0}>
                {value} ({count})
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
