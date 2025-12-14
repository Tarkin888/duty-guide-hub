import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ModulePage from "./pages/ModulePage";
import CDF1ReadinessAssessment from "./pages/modules/CD-F1-ReadinessAssessment";
import CDF2RequirementsMapping from "./pages/modules/CD-F2-RequirementsMapping";
import CDF3RiskAssessment from "./pages/modules/CD-F3-RiskAssessment";
import CDI1ProductsServices from "./pages/modules/CD-I1-ProductsServices";
import CDI2PriceValue from "./pages/modules/CD-I2-PriceValue";
import CDI3ConsumerUnderstanding from "./pages/modules/CD-I3-ConsumerUnderstanding";
import CDI4ConsumerSupport from "./pages/modules/CD-I4-ConsumerSupport";
import CDI5VulnerableCustomers from "./pages/modules/CD-I5-VulnerableCustomers";
import CDI7ADataEvidenceManagementPart1 from "./pages/modules/CD-I7A-DataEvidenceManagementPart1";
import CDI7BDataEvidenceManagementPart2 from "./pages/modules/CD-I7B-DataEvidenceManagementPart2";
import CDP1GovernanceFramework from "./pages/modules/CD-P1-GovernanceFramework";
import CDP1GovernanceFrameworkPart2 from "./pages/modules/CD-P1-GovernanceFrameworkPart2";
import CDP2PolicyFrameworkPart1 from "./pages/modules/CD-P2-PolicyFrameworkPart1";
import CDP2PolicyFrameworkPart2 from "./pages/modules/CD-P2-PolicyFrameworkPart2";
import CDP3ImplementationRoadmapPart1 from "./pages/modules/CD-P3-ImplementationRoadmapPart1";
import CDP3ImplementationRoadmapPart2 from "./pages/modules/CD-P3-ImplementationRoadmapPart2";
import { ClipboardCheck, Map, AlertTriangle, Shield, FileText, Target, ListChecks, DollarSign, MessageSquare, HeadphonesIcon, Users, Link2, Database, GraduationCap, RefreshCw, Settings, BarChart3, TestTube, PresentationIcon, TrendingUp, FolderOpen, BookOpen, Scale } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-14 border-b border-border flex items-center px-4 bg-background sticky top-0 z-10">
                <SidebarTrigger />
              </header>
              <main className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  
                  {/* Foundation Modules */}
                  <Route path="/foundation/readiness" element={<CDF1ReadinessAssessment />} />
                  <Route path="/foundation/requirements" element={<CDF2RequirementsMapping />} />
                  <Route path="/foundation/risk-impact" element={<CDF3RiskAssessment />} />

                  {/* Governance & Planning */}
                  <Route path="/governance/framework" element={<CDP1GovernanceFramework />} />
                  <Route path="/governance/framework-part2" element={<CDP1GovernanceFrameworkPart2 />} />
                  <Route path="/governance/policy" element={<CDP2PolicyFrameworkPart1 />} />
                  <Route path="/governance/policy-part2" element={<CDP2PolicyFrameworkPart2 />} />
                  <Route path="/governance/policy-old" element={
                    <ModulePage 
                      title="Policy Development" 
                      description="Develop and implement Consumer Duty policies"
                      icon={FileText}
                      moduleId="policy-development"
                      category="Governance & Planning"
                    />
                  } />
                  <Route path="/governance/roadmap" element={<CDP3ImplementationRoadmapPart1 />} />

                  {/* Four Outcomes */}
                  <Route path="/outcomes/products-services" element={<CDI1ProductsServices />} />
                  <Route path="/outcomes/price-value" element={<CDI2PriceValue />} />
                  <Route path="/outcomes/consumer-understanding" element={<CDI3ConsumerUnderstanding />} />
          <Route path="/outcomes/consumer-support" element={<CDI4ConsumerSupport />} />
          <Route path="/cross-cutting/vulnerable-customers" element={<CDI5VulnerableCustomers />} />

                  {/* Cross-Cutting */}
                  <Route path="/cross-cutting/vulnerable-customers" element={
                    <ModulePage 
                      title="Vulnerable Customers" 
                      description="Identify and support vulnerable customer groups"
                      icon={Users}
                      moduleId="vulnerable-customers"
                      category="Cross-Cutting"
                    />
                  } />
                  <Route path="/cross-cutting/distribution-chain" element={
                    <ModulePage 
                      title="Distribution Chain" 
                      description="Manage Consumer Duty across your distribution chain"
                      icon={Link2}
                      moduleId="distribution-chain"
                      category="Cross-Cutting"
                    />
                  } />
                  <Route path="/cross-cutting/data-evidence" element={
                    <ModulePage 
                      title="Data & Evidence" 
                      description="Collect and analyze data to evidence good customer outcomes"
                      icon={Database}
                      moduleId="data-evidence"
                      category="Cross-Cutting"
                    />
                  } />

                  {/* Enablement */}
                  <Route path="/enablement/training" element={
                    <ModulePage 
                      title="Training" 
                      description="Develop training programs for Consumer Duty implementation"
                      icon={GraduationCap}
                      moduleId="training"
                      category="Enablement"
                    />
                  } />
                  <Route path="/enablement/change-management" element={
                    <ModulePage 
                      title="Change Management" 
                      description="Manage organizational change for Consumer Duty"
                      icon={RefreshCw}
                      moduleId="change-management"
                      category="Enablement"
                    />
                  } />
                  <Route path="/enablement/technology" element={
                    <ModulePage 
                      title="Technology" 
                      description="Leverage technology to support Consumer Duty compliance"
                      icon={Settings}
                      moduleId="technology"
                      category="Enablement"
                    />
                  } />

                  {/* Monitoring & Assurance */}
                  <Route path="/monitoring/mi-monitoring" element={
                    <ModulePage 
                      title="MI & Monitoring" 
                      description="Establish management information and monitoring frameworks"
                      icon={BarChart3}
                      moduleId="mi-monitoring"
                      category="Monitoring & Assurance"
                    />
                  } />
                  <Route path="/monitoring/testing-assurance" element={
                    <ModulePage 
                      title="Testing & Assurance" 
                      description="Test and assure Consumer Duty implementation"
                      icon={TestTube}
                      moduleId="testing-assurance"
                      category="Monitoring & Assurance"
                    />
                  } />
                  <Route path="/monitoring/board-reporting" element={
                    <ModulePage 
                      title="Board Reporting" 
                      description="Report Consumer Duty outcomes to the board"
                      icon={PresentationIcon}
                      moduleId="board-reporting"
                      category="Monitoring & Assurance"
                    />
                  } />
                  <Route path="/monitoring/continuous-improvement" element={
                    <ModulePage 
                      title="Continuous Improvement" 
                      description="Drive continuous improvement in customer outcomes"
                      icon={TrendingUp}
                      moduleId="continuous-improvement"
                      category="Monitoring & Assurance"
                    />
                  } />

                  {/* Resources */}
                  <Route path="/resources/templates" element={
                    <ModulePage 
                      title="Templates Library" 
                      description="Access downloadable templates and tools"
                      icon={FolderOpen}
                      moduleId="templates"
                      category="Resources"
                    />
                  } />
                  <Route path="/resources/glossary" element={
                    <ModulePage 
                      title="Glossary" 
                      description="Consumer Duty terminology and definitions"
                      icon={BookOpen}
                      moduleId="glossary"
                      category="Resources"
                    />
                  } />
                  <Route path="/resources/regulatory" element={
                    <ModulePage 
                      title="Regulatory References" 
                      description="Key regulatory guidance and requirements"
                      icon={Scale}
                      moduleId="regulatory"
                      category="Resources"
                    />
                  } />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
