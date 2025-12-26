import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export type FilterOption = "all" | "completed" | "in-progress" | "not-started";

interface SidebarFilterProps {
  value: FilterOption;
  onChange: (value: FilterOption) => void;
  isCollapsed: boolean;
}

const FILTER_STORAGE_KEY = "consumer-duty-sidebar-filter";

export function useSidebarFilter() {
  const [filter, setFilter] = useState<FilterOption>(() => {
    try {
      const stored = sessionStorage.getItem(FILTER_STORAGE_KEY);
      return (stored as FilterOption) || "all";
    } catch {
      return "all";
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(FILTER_STORAGE_KEY, filter);
    } catch (e) {
      console.error("Error saving filter to sessionStorage:", e);
    }
  }, [filter]);

  return { filter, setFilter };
}

export function SidebarFilter({ value, onChange, isCollapsed }: SidebarFilterProps) {
  if (isCollapsed) {
    return null;
  }

  const options: { value: FilterOption; label: string; shortLabel: string }[] = [
    { value: "all", label: "Show All", shortLabel: "All" },
    { value: "completed", label: "Complete", shortLabel: "Done" },
    { value: "in-progress", label: "In Progress", shortLabel: "Active" },
    { value: "not-started", label: "Not Started", shortLabel: "Todo" },
  ];

  return (
    <div className="px-3 py-2 border-b border-sidebar-border">
      <div className="flex items-center gap-1.5 mb-2">
        <Filter className="h-3.5 w-3.5 text-sidebar-foreground/60" />
        <span className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wide">Filter</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "px-2 py-1 text-xs rounded-md transition-all duration-200",
              "border border-transparent",
              value === option.value
                ? "bg-primary text-primary-foreground font-medium"
                : "bg-sidebar-accent/50 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            {option.shortLabel}
          </button>
        ))}
      </div>
    </div>
  );
}
