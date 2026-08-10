import { Home, ClipboardCheck, Map, AlertTriangle, Shield, FileText, Target, ListChecks, DollarSign, MessageSquare, HeadphonesIcon, Users, Link2, Database, GraduationCap, RefreshCw, Settings, BarChart3, TestTube, PresentationIcon, TrendingUp, FolderOpen, BookOpen, Scale, ChevronLeft, ChevronRight, X, LucideIcon, Activity, Building2, Layers, Compass, MonitorCheck, CalendarClock } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarFilter, useSidebarFilter, FilterOption } from "@/components/SidebarFilter";
import { SidebarSearch, useSidebarSearch, matchesSearch, HighlightText } from "@/components/SidebarSearch";
import { useModulesMap, normalizeModuleId } from "@/stores/progressStore";
import { useState, useEffect } from "react";

interface NavigationItem {
  title: string;
  url: string;
  icon: LucideIcon;
  moduleId?: string; // Maps to storage key for status lookup
  parts?: number; // Number of parts for multi-part modules
  partUrls?: string[]; // Additional routes belonging to this module (e.g. Part 2)
}

interface NavigationGroup {
  title: string;
  group: true;
  icon: LucideIcon; // Icon for collapsed state
  moduleGroup?: boolean; // Playbook module category (session-only expand state)
  items: NavigationItem[];
}

type NavigationEntry = NavigationItem | NavigationGroup;

// Map URLs to module IDs for status lookup
const navigationItems: (NavigationEntry | { title: string; url: string; icon: LucideIcon; group: null })[] = [
  { title: "Dashboard", url: "/", icon: Home, group: null },
  {
    title: "Ongoing Compliance",
    group: true,
    icon: RefreshCw,
    items: [
      { title: "Ongoing Monitoring & MI Framework", url: "/ongoing/mi-monitoring", icon: BarChart3 },
      { title: "Evidence Management", url: "/cross-cutting/data-evidence", icon: Database },
      { title: "Testing & Assurance", url: "/monitoring/testing-assurance", icon: TestTube },
      { title: "Annual Fair Value Assessment", url: "/ongoing/fair-value", icon: Scale },
      { title: "Outcomes Testing & Consumer Understanding", url: "/ongoing/outcomes-testing", icon: MessageSquare },
      { title: "Annual Board Attestation & Reporting", url: "/ongoing/board-attestation", icon: PresentationIcon },
      { title: "Continuous Improvement", url: "/monitoring/continuous-improvement", icon: TrendingUp },
      { title: "Maturity Assessment", url: "/maturity-assessment", icon: Compass },
    ],
  },
  {
    title: "Foundation & Assessment",
    group: true,
    moduleGroup: true,
    icon: Building2,
    items: [
      { title: "Readiness Assessment", url: "/foundation/readiness", icon: ClipboardCheck, moduleId: "cd-f1-readiness" },
      { title: "Requirements Mapping", url: "/foundation/requirements", icon: Map, moduleId: "cd-f2-requirements" },
      { title: "Risk & Impact", url: "/foundation/risk-impact", icon: AlertTriangle, moduleId: "cd-f3-risk-assessment" },
    ],
  },
  {
    title: "Governance & Planning",
    group: true,
    moduleGroup: true,
    icon: Shield,
    items: [
      { title: "Governance Framework", url: "/governance/framework", icon: Shield, moduleId: "cd-p1-governance-framework", parts: 2, partUrls: ["/governance/framework-part2"] },
      { title: "Policy Development", url: "/governance/policy", icon: FileText, moduleId: "cd-p2-policy-framework", parts: 2, partUrls: ["/governance/policy-part2"] },
      { title: "Implementation Roadmap", url: "/governance/roadmap", icon: Target, moduleId: "cd-p3-implementation-roadmap" },
    ],
  },
  {
    title: "Four Outcomes",
    group: true,
    moduleGroup: true,
    icon: Compass,
    items: [
      { title: "Products & Services", url: "/outcomes/products-services", icon: ListChecks, moduleId: "cd-i1-products-services" },
      { title: "Price & Value", url: "/outcomes/price-value", icon: DollarSign, moduleId: "cd-i2-price-value" },
      { title: "Consumer Understanding", url: "/outcomes/consumer-understanding", icon: MessageSquare, moduleId: "cd-i3-consumer-understanding" },
      { title: "Consumer Support", url: "/outcomes/consumer-support", icon: HeadphonesIcon, moduleId: "cd-i4-consumer-support" },
    ],
  },
  {
    title: "Cross-Cutting",
    group: true,
    moduleGroup: true,
    icon: Layers,
    items: [
      { title: "Vulnerable Customers", url: "/cross-cutting/vulnerable-customers", icon: Users, moduleId: "cd-i5-vulnerable-customers" },
      { title: "Distribution Chain", url: "/cross-cutting/distribution-chain", icon: Link2, moduleId: "cd-i6-distribution-chain" },
      { title: "Data & Evidence", url: "/cross-cutting/data-evidence", icon: Database, moduleId: "cd-i7-data-evidence", parts: 2, partUrls: ["/cross-cutting/data-evidence-part2"] },
    ],
  },
  {
    title: "Enablement",
    group: true,
    moduleGroup: true,
    icon: GraduationCap,
    items: [
      { title: "Training", url: "/enablement/training", icon: GraduationCap, moduleId: "cd-t1-training", parts: 2, partUrls: ["/enablement/training-part2"] },
      { title: "Change Management", url: "/enablement/change-management", icon: RefreshCw, moduleId: "cd-t2-communications-change", parts: 2, partUrls: ["/enablement/communications-part2"] },
      { title: "Technology", url: "/enablement/technology", icon: Settings, moduleId: "cd-t3-technology-requirements", parts: 2, partUrls: ["/enablement/technology-part2"] },
    ],
  },
  {
    title: "Monitoring & Assurance",
    group: true,
    moduleGroup: true,
    icon: MonitorCheck,
    items: [
      { title: "MI & Monitoring", url: "/monitoring/mi-monitoring", icon: BarChart3, moduleId: "cd-m1-mi-framework" },
      { title: "Testing & Assurance", url: "/monitoring/testing-assurance", icon: TestTube, moduleId: "cd-m2-testing-assurance" },
      { title: "Board Reporting", url: "/monitoring/board-reporting", icon: PresentationIcon, moduleId: "cd-m3-board-reporting", parts: 2, partUrls: ["/monitoring/board-reporting-part2"] },
      { title: "Continuous Improvement", url: "/monitoring/continuous-improvement", icon: TrendingUp, moduleId: "cd-m4-continuous-improvement", parts: 2, partUrls: ["/monitoring/continuous-improvement-part2"] },
    ],
  },
  {
    title: "Resources",
    group: true,
    icon: FolderOpen,
    items: [
      { title: "Templates Library", url: "/resources/templates", icon: FolderOpen },
      { title: "Regulatory Updates", url: "/regulatory-updates", icon: CalendarClock },
      { title: "Consumer Duty Primer", url: "/consumer-duty-primer", icon: Compass },
      { title: "Glossary", url: "/resources/glossary", icon: BookOpen },
      { title: "Regulatory References", url: "/resources/regulatory", icon: Scale },
    ],
  },
  {
    title: "Admin",
    group: true,
    icon: Activity,
    items: [
      { title: "Site Health", url: "/admin/site-health", icon: Activity },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];


interface NavItemProps {
  item: NavigationItem;
  isCollapsed: boolean;
  isMobile: boolean;
  isActive: boolean;
  searchTerm?: string;
  isTopLevel?: boolean;
}

function NavItemWithTooltip({ item, isCollapsed, isMobile, isActive, searchTerm = "", isTopLevel = false }: NavItemProps) {
  const baseClasses = cn(
    "flex items-center gap-2 pl-2 pr-3 py-2 rounded-md min-h-[44px] transition-colors duration-200 w-full group/navitem",
    "text-sidebar-foreground/[0.88] hover:bg-sidebar-foreground/[0.04] hover:text-sidebar-foreground",
    isTopLevel && "text-[15px] font-semibold text-sidebar-foreground",
    !isTopLevel && "text-sm font-medium leading-[1.3]",
    isActive && "bg-sidebar-foreground/[0.08] text-sidebar-foreground font-medium relative",
    isActive && "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-sidebar-primary before:rounded-l-md",
    isCollapsed && !isMobile && "justify-center px-2"
  );

  const content = (
    <NavLink
      to={item.url}
      className={baseClasses}
      aria-current={isActive ? "page" : undefined}
      aria-label={isCollapsed && !isMobile ? item.title : undefined}
    >
      <span className={cn("flex w-6 shrink-0 items-center justify-center", isCollapsed && !isMobile && "w-auto")}>
        <item.icon
          className={cn(
            "h-[18px] w-[18px] shrink-0 transition-colors",
            isActive ? "text-sidebar-primary" : "text-sidebar-foreground/55 group-hover/navitem:text-sidebar-primary"
          )}
        />
      </span>
      {(!isCollapsed || isMobile) && (
        <>
          <HighlightText
            text={item.title}
            highlight={searchTerm}
            className="transition-opacity duration-300 text-balance"
          />
          {item.parts === 2 && (
            <span
              className="ml-auto shrink-0 rounded-full border border-sidebar-primary/40 px-1.5 py-0.5 text-[11px] font-medium text-sidebar-primary"
              aria-label="This module has two parts"
            >
              2 pt
            </span>
          )}
        </>
      )}

    </NavLink>
  );

  // Show tooltip only when collapsed on desktop
  if (isCollapsed && !isMobile) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium"
          sideOffset={8}
        >
          <div className="flex items-center gap-2">
            <span>{item.title}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}


export function AppSidebar() {
  const { state, isMobile, openMobile, setOpenMobile, toggleSidebar } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";
  const { filter, setFilter } = useSidebarFilter();
  const { search, setSearch } = useSidebarSearch();
  // Single source of truth for module status
  const modules = useModulesMap();

  const isActiveRoute = (url: string) => {
    if (url === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(url);
  };

  // An item is active if the current route matches its own url or any of its parts
  const isItemActive = (item: NavigationItem) =>
    isActiveRoute(item.url) || (item.partUrls ?? []).some(isActiveRoute);

  // Session-only expand state for playbook module categories:
  // on load, only the category containing the active module is expanded.
  const [openModuleGroups, setOpenModuleGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navigationItems.forEach((entry) => {
      if ('group' in entry && entry.group && 'items' in entry && (entry as NavigationGroup).moduleGroup) {
        const group = entry as NavigationGroup;
        initial[group.title] = group.items.some(
          (i) => i.url !== "/" && (location.pathname.startsWith(i.url) || (i.partUrls ?? []).some((u) => location.pathname.startsWith(u)))
        );
      }
    });
    return initial;
  });


  // Check if any item in a group is active
  const isGroupActive = (items: NavigationItem[]) => {
    return items.some(item => isItemActive(item));
  };


  // Get module status from progress data
  const getModuleStatus = (moduleId?: string): "not-started" | "in-progress" | "completed" => {
    if (!moduleId) return "not-started";
    const status = modules[normalizeModuleId(moduleId)]?.status || "not-started";
    return status === "complete" ? "completed" : status;
  };

  // Check if item matches filter
  const matchesFilter = (item: NavigationItem): boolean => {
    if (filter === "all") return true;
    if (!item.moduleId) return true; // Resources always show
    const status = getModuleStatus(item.moduleId);
    return status === filter;
  };

  // Get filtered items for a group (filter + search)
  const getFilteredItems = (items: NavigationItem[]): NavigationItem[] => {
    return items.filter(item => matchesFilter(item) && matchesSearch(item, search));
  };

  // Check if group has any matching items
  const groupHasMatchingItems = (items: NavigationItem[]): boolean => {
    return getFilteredItems(items).length > 0;
  };

  return (
    <Sidebar 
      className={cn(
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )} 
      collapsible="icon"
    >
      {/* Mobile close button */}
      {isMobile && openMobile && (
        <button
          onClick={() => setOpenMobile(false)}
          className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-md hover:bg-sidebar-accent transition-colors"
          aria-label="Close navigation"
        >
          <X className="h-6 w-6 text-sidebar-foreground" />
        </button>
      )}

      <SidebarHeader className="border-b border-sidebar-border px-3 py-3">
        {!isCollapsed && !isMobile && (
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5 transition-opacity duration-300">
              <h2 className="text-base font-bold text-sidebar-foreground">Consumer Duty</h2>
              <p className="text-xs text-sidebar-foreground/70">Implementation Playbook</p>
            </div>
          </div>
        )}
        {isCollapsed && !isMobile && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center py-1">
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-primary text-primary-foreground">
              Consumer Duty Playbook
            </TooltipContent>
          </Tooltip>
        )}
        {isMobile && (
          <div className="flex flex-col gap-1 pr-12">
            <h2 className="text-lg font-bold text-sidebar-foreground">Consumer Duty</h2>
            <p className="text-xs text-sidebar-foreground/70">Implementation Playbook</p>
          </div>
        )}
      </SidebarHeader>

      {/* Search */}
      <SidebarSearch value={search} onChange={setSearch} isCollapsed={isCollapsed} />

      {/* Filter Control */}
      <SidebarFilter value={filter} onChange={setFilter} isCollapsed={isCollapsed} />

      <SidebarContent aria-label="Main navigation">
        <SidebarMenu>
          {navigationItems.map((item, index) => {
            if ('group' in item && item.group && 'items' in item) {
              const filteredItems = getFilteredItems(item.items);
              const groupIsActive = isGroupActive(item.items);
              const GroupIcon = item.icon;
              
              // Hide group if no items match filter
              if (!groupHasMatchingItems(item.items)) {
                return null;
              }

              // When collapsed, show group icon with tooltip that expands to show items
              if (isCollapsed && !isMobile) {
                return (
                  <SidebarGroup key={index} className="py-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            "group/groupicon flex items-center justify-center w-full p-2 rounded-md cursor-pointer transition-colors duration-200",
                            "min-h-[44px] hover:bg-sidebar-foreground/[0.04]",
                            groupIsActive && "bg-sidebar-foreground/[0.08] relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-sidebar-primary before:rounded-l-md"
                          )}
                        >
                          <GroupIcon className={cn(
                            "h-[18px] w-[18px] shrink-0 opacity-100 transition-colors",
                            groupIsActive
                              ? "text-sidebar-primary"
                              : "text-sidebar-foreground/55 group-hover/groupicon:text-sidebar-primary"
                          )} />
                        </div>

                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        sideOffset={12}
                        className="p-0 bg-sidebar text-sidebar-foreground border border-sidebar-border shadow-xl"
                        style={{ backgroundColor: "hsl(var(--sidebar-background))", opacity: 1 }}
                      >
                        <div className="min-w-[200px]">
                          <div className="px-3 py-2 border-b border-sidebar-border">
                            <span className="font-medium text-sm text-sidebar-foreground">{item.title}</span>
                          </div>
                          <div className="py-1">
                            {filteredItems.map((subItem) => {
                              const isActive = isActiveRoute(subItem.url);
                              return (
                                <NavLink
                                  key={subItem.url}
                                  to={subItem.url}
                                  className={cn(
                                    "flex items-center gap-3 px-3 py-2 text-sm transition-colors",
                                    "hover:bg-sidebar-accent text-sidebar-foreground",
                                    isActive && "bg-primary text-primary-foreground font-medium"
                                  )}
                                >
                                  <subItem.icon className="h-4 w-4" />
                                  <span>{subItem.title}</span>
                                </NavLink>
                              );
                            })}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </SidebarGroup>
                );
              }
              
              const isModuleGroup = Boolean((item as NavigationGroup).moduleGroup);
              const groupOpen = isModuleGroup
                ? (search.trim().length > 0 ? true : (openModuleGroups[item.title] ?? false))
                : undefined;

              return (
                <Collapsible
                  key={index}
                  {...(isModuleGroup
                    ? {
                        open: groupOpen,
                        onOpenChange: (open: boolean) =>
                          setOpenModuleGroups((prev) => ({ ...prev, [item.title]: open })),
                      }
                    : { defaultOpen: groupIsActive || !isCollapsed })}
                >
                  <SidebarGroup className="py-0">
                    {index > 1 && (
                      <div className="-mx-2 mt-1.5 border-t border-sidebar-foreground/[0.08]" aria-hidden="true" />
                    )}
                    <CollapsibleTrigger asChild>
                      <SidebarGroupLabel className="cursor-pointer -mx-2 w-auto h-auto rounded-none bg-sidebar-foreground/[0.04] px-3 py-1.5 text-[13px] font-bold uppercase tracking-[0.06em] text-sidebar-primary hover:bg-sidebar-foreground/[0.08] transition-colors duration-200">
                        <GroupIcon className="h-[18px] w-[18px] mr-2 shrink-0 text-sidebar-primary" />
                        <span className="flex-1 text-left">{item.title}</span>
                        <ChevronDown className={cn(
                          "h-4 w-4 shrink-0 text-sidebar-primary transition-transform duration-200 ui-expanded:rotate-180",
                          isModuleGroup && groupOpen && "rotate-180"
                        )} />
                      </SidebarGroupLabel>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="transition-all duration-300">
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {filteredItems.map((subItem) => {
                            const isActive = isItemActive(subItem);

                            return (
                              <SidebarMenuItem key={subItem.url}>
                                <SidebarMenuButton asChild tooltip={isCollapsed && !isMobile ? subItem.title : undefined}>
                                  <NavItemWithTooltip
                                    item={subItem}
                                    isCollapsed={isCollapsed}
                                    isMobile={isMobile}
                                    isActive={isActive}
                                    searchTerm={search}
                                  />
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            );
                          })}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              );
            }

            if ('url' in item && 'icon' in item) {
              const isActive = isActiveRoute(item.url);
              return (
                <SidebarMenuItem key={item.url} className="px-2 py-1">
                  <SidebarMenuButton asChild>
                    <NavItemWithTooltip
                      item={item}
                      isCollapsed={isCollapsed}
                      isMobile={isMobile}
                      isActive={isActive}
                      searchTerm={search}
                      isTopLevel
                    />
                  </SidebarMenuButton>
                </SidebarMenuItem>

              );
            }

            return null;
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        {/* Toggle button */}
        {!isMobile && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className={cn(
                  "w-full flex items-center gap-2 text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 min-h-[44px]",
                  isCollapsed ? "justify-center" : "justify-start px-3"
                )}
                aria-label={isCollapsed ? "Expand sidebar navigation" : "Collapse sidebar navigation"}
                aria-expanded={!isCollapsed}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-5 w-5 transition-transform duration-300" />
                ) : (
                  <>
                    <ChevronLeft className="h-5 w-5 transition-transform duration-300" />
                    <span className="text-sm">Collapse</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="bg-primary text-primary-foreground">
                Expand sidebar
              </TooltipContent>
            )}
          </Tooltip>
        )}

        {/* Version info - only show when expanded */}
        {!isCollapsed && !isMobile && (
          <div className="text-xs text-sidebar-foreground/60 px-3 pt-2 transition-opacity duration-300">
            <p>Version 1.0.0</p>
            <p className="mt-1">© 2025 Consumer Duty Playbook</p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
