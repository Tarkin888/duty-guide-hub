import { Link } from "react-router-dom";
import { ChevronRight, Home, Folder } from "lucide-react";
import { cn } from "@/lib/utils";

// Category definitions with display names and icons
export const MODULE_CATEGORIES_INFO = {
  foundation: {
    name: "Foundation",
    modules: ["CD-F1", "CD-F2", "CD-F3"],
    icon: "foundation",
  },
  governance: {
    name: "Governance & Planning",
    modules: ["CD-P1", "CD-P2", "CD-P3"],
    icon: "governance",
  },
  outcomes: {
    name: "Four Outcomes",
    modules: ["CD-I1", "CD-I2", "CD-I3", "CD-I4"],
    icon: "outcomes",
  },
  crossCutting: {
    name: "Cross-Cutting",
    modules: ["CD-I5", "CD-I6", "CD-I7"],
    icon: "crossCutting",
  },
  enablement: {
    name: "Enablement",
    modules: ["CD-T1", "CD-T2", "CD-T3"],
    icon: "enablement",
  },
  monitoring: {
    name: "Monitoring & Assurance",
    modules: ["CD-M1", "CD-M2", "CD-M3", "CD-M4"],
    icon: "monitoring",
  },
} as const;

// Module display names
export const MODULE_DISPLAY_NAMES: Record<string, string> = {
  "CD-F1": "Readiness Assessment",
  "CD-F2": "Requirements Mapping",
  "CD-F3": "Risk & Impact Assessment",
  "CD-P1": "Governance Framework",
  "CD-P2": "Policy Framework",
  "CD-P3": "Implementation Roadmap",
  "CD-I1": "Products & Services",
  "CD-I2": "Price & Value",
  "CD-I3": "Consumer Understanding",
  "CD-I4": "Consumer Support",
  "CD-I5": "Vulnerable Customers",
  "CD-I6": "Distribution Chain",
  "CD-I7": "Data & Evidence Management",
  "CD-T1": "Training Programme",
  "CD-T2": "Communications & Change",
  "CD-T3": "Technology Requirements",
  "CD-M1": "MI & Outcome Monitoring",
  "CD-M2": "Testing & Assurance",
  "CD-M3": "Board Reporting",
  "CD-M4": "Continuous Improvement",
};

// Get category for a module ID
export function getCategoryForModule(moduleId: string): keyof typeof MODULE_CATEGORIES_INFO | null {
  const normalizedId = moduleId.toUpperCase().split("-").slice(0, 2).join("-");
  
  for (const [categoryKey, categoryInfo] of Object.entries(MODULE_CATEGORIES_INFO)) {
    if ((categoryInfo.modules as readonly string[]).includes(normalizedId)) {
      return categoryKey as keyof typeof MODULE_CATEGORIES_INFO;
    }
  }
  return null;
}

// Get display name for a module (handles various ID formats)
export function getModuleDisplayName(moduleId: string): string {
  // Normalize the module ID (e.g., "cd-f1-readiness" -> "CD-F1")
  const normalizedId = moduleId.toUpperCase().split("-").slice(0, 2).join("-");
  return MODULE_DISPLAY_NAMES[normalizedId] || moduleId;
}

interface ModuleBreadcrumbProps {
  moduleId: string;
  moduleName?: string;
  part?: string;
  className?: string;
}

export function ModuleBreadcrumb({ 
  moduleId, 
  moduleName, 
  part,
  className 
}: ModuleBreadcrumbProps) {
  const categoryKey = getCategoryForModule(moduleId);
  const categoryInfo = categoryKey ? MODULE_CATEGORIES_INFO[categoryKey] : null;
  const displayName = moduleName || getModuleDisplayName(moduleId);
  
  // Build full module name with part if provided
  const fullModuleName = part ? `${displayName} - ${part}` : displayName;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("flex items-center text-sm", className)}
    >
      <ol className="flex items-center flex-wrap gap-1">
        {/* Dashboard link */}
        <li>
          <Link 
            to="/" 
            className="flex items-center gap-1.5 text-primary hover:text-primary/80 hover:underline transition-colors min-h-[44px] px-1"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        </li>

        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
        </li>

        {/* Category link - routes to dashboard (could be filtered in future) */}
        {categoryInfo && (
          <>
            <li>
              <Link 
                to="/" 
                className="flex items-center gap-1.5 text-primary hover:text-primary/80 hover:underline transition-colors min-h-[44px] px-1"
              >
                <Folder className="h-4 w-4" />
                <span className="hidden md:inline">{categoryInfo.name}</span>
                <span className="md:hidden">{categoryInfo.name.split(" ")[0]}</span>
              </Link>
            </li>

            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
            </li>
          </>
        )}

        {/* Current page (not clickable) */}
        <li className="flex items-center min-h-[44px] px-1">
          <span 
            className="text-muted-foreground font-medium truncate max-w-[200px] sm:max-w-[300px] md:max-w-none"
            title={fullModuleName}
          >
            {fullModuleName}
          </span>
        </li>
      </ol>
    </nav>
  );
}

export default ModuleBreadcrumb;
