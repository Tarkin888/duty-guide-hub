import { Home, ClipboardCheck, Map, AlertTriangle, Shield, FileText, Target, ListChecks, DollarSign, MessageSquare, HeadphonesIcon, Users, Link2, Database, GraduationCap, RefreshCw, Settings, BarChart3, TestTube, PresentationIcon, TrendingUp, FolderOpen, BookOpen, Scale, ChevronLeft, ChevronRight, X, LucideIcon } from "lucide-react";
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

interface NavigationItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface NavigationGroup {
  title: string;
  group: true;
  items: NavigationItem[];
}

type NavigationEntry = NavigationItem | NavigationGroup;

const navigationItems: (NavigationEntry | { title: string; url: string; icon: LucideIcon; group: null })[] = [
  { title: "Dashboard", url: "/", icon: Home, group: null },
  {
    title: "Foundation Modules",
    group: true,
    items: [
      { title: "Readiness Assessment", url: "/foundation/readiness", icon: ClipboardCheck },
      { title: "Requirements Mapping", url: "/foundation/requirements", icon: Map },
      { title: "Risk & Impact", url: "/foundation/risk-impact", icon: AlertTriangle },
    ],
  },
  {
    title: "Governance & Planning",
    group: true,
    items: [
      { title: "Governance Framework", url: "/governance/framework", icon: Shield },
      { title: "Policy Development", url: "/governance/policy", icon: FileText },
      { title: "Implementation Roadmap", url: "/governance/roadmap", icon: Target },
    ],
  },
  {
    title: "Four Outcomes Implementation",
    group: true,
    items: [
      { title: "Products & Services", url: "/outcomes/products-services", icon: ListChecks },
      { title: "Price & Value", url: "/outcomes/price-value", icon: DollarSign },
      { title: "Consumer Understanding", url: "/outcomes/consumer-understanding", icon: MessageSquare },
      { title: "Consumer Support", url: "/outcomes/consumer-support", icon: HeadphonesIcon },
    ],
  },
  {
    title: "Cross-Cutting Modules",
    group: true,
    items: [
      { title: "Vulnerable Customers", url: "/cross-cutting/vulnerable-customers", icon: Users },
      { title: "Distribution Chain", url: "/cross-cutting/distribution-chain", icon: Link2 },
      { title: "Data & Evidence", url: "/cross-cutting/data-evidence", icon: Database },
    ],
  },
  {
    title: "Enablement",
    group: true,
    items: [
      { title: "Training", url: "/enablement/training", icon: GraduationCap },
      { title: "Change Management", url: "/enablement/change-management", icon: RefreshCw },
      { title: "Technology", url: "/enablement/technology", icon: Settings },
    ],
  },
  {
    title: "Monitoring & Assurance",
    group: true,
    items: [
      { title: "MI & Monitoring", url: "/monitoring/mi-monitoring", icon: BarChart3 },
      { title: "Testing & Assurance", url: "/monitoring/testing-assurance", icon: TestTube },
      { title: "Board Reporting", url: "/monitoring/board-reporting", icon: PresentationIcon },
      { title: "Continuous Improvement", url: "/monitoring/continuous-improvement", icon: TrendingUp },
    ],
  },
  {
    title: "Resources",
    group: true,
    items: [
      { title: "Templates Library", url: "/resources/templates", icon: FolderOpen },
      { title: "Glossary", url: "/resources/glossary", icon: BookOpen },
      { title: "Regulatory References", url: "/resources/regulatory", icon: Scale },
    ],
  },
];

interface NavItemProps {
  item: NavigationItem;
  isCollapsed: boolean;
  isMobile: boolean;
  isActive: boolean;
}

function NavItemWithTooltip({ item, isCollapsed, isMobile, isActive }: NavItemProps) {
  const baseClasses = cn(
    "flex items-center gap-3 px-3 py-2 rounded-md min-h-[44px] transition-all duration-200 w-full",
    "hover:bg-sidebar-accent text-sidebar-foreground",
    isActive && "bg-primary text-primary-foreground font-medium relative",
    isActive && "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-accent before:rounded-l-md",
    isCollapsed && !isMobile && "justify-center px-2"
  );

  const content = (
    <NavLink
      to={item.url}
      className={baseClasses}
      aria-current={isActive ? "page" : undefined}
      aria-label={isCollapsed && !isMobile ? item.title : undefined}
    >
      <item.icon className="h-5 w-5 shrink-0" />
      {(!isCollapsed || isMobile) && (
        <span className="transition-opacity duration-300">{item.title}</span>
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

  const isActiveRoute = (url: string) => {
    if (url === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(url);
  };

  // Check if any item in a group is active
  const isGroupActive = (items: NavigationItem[]) => {
    return items.some(item => isActiveRoute(item.url));
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

      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        {!isCollapsed && (
          <div className="flex flex-col gap-1 transition-opacity duration-300">
            <h2 className="text-lg font-bold text-sidebar-foreground">Consumer Duty</h2>
            <p className="text-xs text-sidebar-foreground/70">Implementation Playbook</p>
          </div>
        )}
        {isCollapsed && !isMobile && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center">
                <Shield className="h-6 w-6 text-sidebar-primary" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-primary text-primary-foreground">
              Consumer Duty Playbook
            </TooltipContent>
          </Tooltip>
        )}
        {isMobile && (
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-sidebar-foreground">Consumer Duty</h2>
            <p className="text-xs text-sidebar-foreground/70">Implementation Playbook</p>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent aria-label="Main navigation">
        <SidebarMenu>
          {navigationItems.map((item, index) => {
            if ('group' in item && item.group && 'items' in item) {
              const groupIsActive = isGroupActive(item.items);
              
              return (
                <Collapsible key={index} defaultOpen={groupIsActive || !isCollapsed}>
                  <SidebarGroup>
                    {!isCollapsed && (
                      <CollapsibleTrigger asChild>
                        <SidebarGroupLabel className="cursor-pointer hover:bg-sidebar-accent text-sidebar-foreground transition-colors duration-200">
                          <span className="flex-1">{item.title}</span>
                          <ChevronDown className="h-4 w-4 transition-transform duration-200 ui-expanded:rotate-180" />
                        </SidebarGroupLabel>
                      </CollapsibleTrigger>
                    )}
                    <CollapsibleContent className={cn(
                      "transition-all duration-300",
                      isCollapsed && "!block"
                    )}>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {item.items.map((subItem) => {
                            const isActive = isActiveRoute(subItem.url);
                            return (
                              <SidebarMenuItem key={subItem.url}>
                                <SidebarMenuButton asChild tooltip={isCollapsed && !isMobile ? subItem.title : undefined}>
                                  <NavItemWithTooltip
                                    item={subItem}
                                    isCollapsed={isCollapsed}
                                    isMobile={isMobile}
                                    isActive={isActive}
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
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavItemWithTooltip
                      item={item}
                      isCollapsed={isCollapsed}
                      isMobile={isMobile}
                      isActive={isActive}
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
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className={cn(
              "w-full flex items-center gap-2 text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 min-h-[44px]",
              isCollapsed ? "justify-center" : "justify-start px-3"
            )}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!isCollapsed}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 transition-transform duration-300" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 transition-transform duration-300" />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </Button>
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
