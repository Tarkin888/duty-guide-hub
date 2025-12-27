import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SidebarSearchProps {
  value: string;
  onChange: (value: string) => void;
  isCollapsed: boolean;
}

export function SidebarSearch({ value, onChange, isCollapsed }: SidebarSearchProps) {
  if (isCollapsed) {
    return null;
  }

  return (
    <div className="px-3 py-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search modules..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "pl-8 pr-8 h-9 bg-sidebar-accent/50 border-sidebar-border text-sm",
            "placeholder:text-muted-foreground/70 focus-visible:ring-1 focus-visible:ring-primary"
          )}
          aria-label="Search modules by code, title, or keywords"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-sm hover:bg-sidebar-accent transition-colors"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>
    </div>
  );
}

// Hook for managing search state with session storage
export function useSidebarSearch() {
  const [search, setSearch] = useState(() => {
    try {
      return sessionStorage.getItem("consumer-duty-sidebar-search") || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem("consumer-duty-sidebar-search", search);
    } catch {
      // Ignore storage errors
    }
  }, [search]);

  return { search, setSearch };
}

// Keywords for each module to improve search
const moduleKeywords: Record<string, string[]> = {
  "cd-f1-readiness": ["CD-F1", "gap", "assessment", "baseline", "maturity"],
  "cd-f2-requirements": ["CD-F2", "mapping", "FCA", "regulations", "obligations"],
  "cd-f3-risk-assessment": ["CD-F3", "risk", "impact", "priority", "harm"],
  "cd-p1-governance-framework": ["CD-P1", "governance", "accountability", "board", "SMF"],
  "cd-p2-policy-framework": ["CD-P2", "policy", "procedures", "documentation"],
  "cd-p3-implementation-roadmap": ["CD-P3", "roadmap", "timeline", "milestones", "plan"],
  "cd-i1-products-services": ["CD-I1", "products", "services", "design", "target market"],
  "cd-i2-price-value": ["CD-I2", "price", "value", "fair", "assessment"],
  "cd-i3-consumer-understanding": ["CD-I3", "understanding", "communications", "clarity"],
  "cd-i4-consumer-support": ["CD-I4", "support", "service", "customer", "channels"],
  "cd-i5-vulnerable-customers": ["CD-I5", "vulnerable", "vulnerability", "characteristics"],
  "cd-i6-distribution-chain": ["CD-I6", "distribution", "chain", "third party", "manufacturers"],
  "cd-i7-data-evidence": ["CD-I7", "data", "evidence", "MI", "metrics"],
  "cd-t1-training": ["CD-T1", "training", "competence", "learning", "skills"],
  "cd-t2-communications-change": ["CD-T2", "communications", "change", "culture"],
  "cd-t3-technology-requirements": ["CD-T3", "technology", "systems", "IT", "digital"],
  "cd-m1-mi-framework": ["CD-M1", "MI", "monitoring", "KPI", "metrics", "framework"],
  "cd-m2-testing-assurance": ["CD-M2", "testing", "assurance", "audit", "review"],
  "cd-m3-board-reporting": ["CD-M3", "board", "reporting", "attestation", "SMF"],
  "cd-m4-continuous-improvement": ["CD-M4", "continuous", "improvement", "PDCA", "lessons"],
};

interface NavigationItem {
  title: string;
  url: string;
  moduleId?: string;
}

export function matchesSearch(item: NavigationItem, searchTerm: string): boolean {
  if (!searchTerm.trim()) return true;
  
  const term = searchTerm.toLowerCase().trim();
  const title = item.title.toLowerCase();
  
  // Check title
  if (title.includes(term)) return true;
  
  // Check module ID / code
  if (item.moduleId) {
    const moduleCode = item.moduleId.toLowerCase().replace(/-/g, "");
    const searchTermClean = term.replace(/-/g, "").replace(/\s/g, "");
    if (moduleCode.includes(searchTermClean)) return true;
    
    // Check keywords
    const keywords = moduleKeywords[item.moduleId];
    if (keywords) {
      return keywords.some(kw => kw.toLowerCase().includes(term));
    }
  }
  
  return false;
}

// Component to highlight matching text
interface HighlightTextProps {
  text: string;
  highlight: string;
  className?: string;
}

export function HighlightText({ text, highlight, className }: HighlightTextProps) {
  if (!highlight.trim()) {
    return <span className={className}>{text}</span>;
  }

  const regex = new RegExp(`(${escapeRegExp(highlight)})`, "gi");
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-primary/30 text-foreground rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
