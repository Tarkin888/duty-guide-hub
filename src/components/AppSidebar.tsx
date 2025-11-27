import { Home, ClipboardCheck, Map, AlertTriangle, Shield, FileText, Target, ListChecks, DollarSign, MessageSquare, HeadphonesIcon, Users, Link2, Database, GraduationCap, RefreshCw, Settings, BarChart3, TestTube, PresentationIcon, TrendingUp, FolderOpen, BookOpen, Scale } from "lucide-react";
import { NavLink } from "@/components/NavLink";
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

const navigationItems = [
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

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        {!isCollapsed && (
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-sidebar-foreground">Consumer Duty</h2>
            <p className="text-xs text-sidebar-foreground/70">Implementation Playbook</p>
          </div>
        )}
        {isCollapsed && (
          <div className="flex items-center justify-center">
            <Shield className="h-6 w-6 text-sidebar-primary" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navigationItems.map((item, index) => {
            if (item.group && item.items) {
              return (
                <Collapsible key={index} defaultOpen>
                  <SidebarGroup>
                    <CollapsibleTrigger asChild>
                      <SidebarGroupLabel className="cursor-pointer hover:bg-sidebar-accent text-sidebar-foreground">
                        {!isCollapsed && (
                          <>
                            <span className="flex-1">{item.title}</span>
                            <ChevronDown className="h-4 w-4 transition-transform ui-expanded:rotate-180" />
                          </>
                        )}
                      </SidebarGroupLabel>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {item.items.map((subItem) => (
                            <SidebarMenuItem key={subItem.url}>
                              <SidebarMenuButton asChild>
                                <NavLink
                                  to={subItem.url}
                                  className="flex items-center gap-3 hover:bg-sidebar-accent text-sidebar-foreground"
                                  activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                                >
                                  <subItem.icon className="h-4 w-4 shrink-0" />
                                  {!isCollapsed && <span>{subItem.title}</span>}
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              );
            }

            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.url}
                    className="flex items-center gap-3 hover:bg-sidebar-accent text-sidebar-foreground"
                    activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        {!isCollapsed && (
          <div className="text-xs text-sidebar-foreground/60">
            <p>Version 1.0.0</p>
            <p className="mt-1">© 2025 Consumer Duty Playbook</p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
