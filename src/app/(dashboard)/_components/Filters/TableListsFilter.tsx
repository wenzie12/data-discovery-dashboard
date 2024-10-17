"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";

import { useQueryState, parseAsString } from "nuqs";
import { useDebounce } from "@/hooks/useDebounce";

type TCompanyListFilterProps = {
  onChange: (filter: { searchTerm?: string }) => void;
};

// rename to TableSearchTextFilter
export default function TableListFilter({
  onChange,
}: TCompanyListFilterProps) {
  const [searchTerm, setSearchTerm] = useQueryState("search", parseAsString.withDefault(""));
;
  const debouncedSearch = useDebounce(searchTerm, 200)

  useEffect(() => {
    onChange({ searchTerm: debouncedSearch })
  }, [debouncedSearch, onChange])

  return (
    <Input
      type="text"
      placeholder="Search companies..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="max-w-sm"
    />
  );
}

