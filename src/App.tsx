import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { UserMenu } from "@/components/UserMenu";
import { StorageErrorBoundary } from "@/components/StorageErrorBoundary";
import { ChatbotButton } from "@/components/ChatbotButton";
import Auth from "./pages/Auth";
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
import CDI6DistributionChain from "./pages/modules/CD-I6-DistributionChain";
import CDI7ADataEvidenceManagementPart1 from "./pages/modules/CD-I7A-DataEvidenceManagementPart1";
import CDI7BDataEvidenceManagementPart2 from "./pages/modules/CD-I7B-DataEvidenceManagementPart2";
import CDT1TrainingProgrammePart1 from "./pages/modules/CD-T1-TrainingProgrammePart1";
import CDT1TrainingProgrammePart2 from "./pages/modules/CD-T1-TrainingProgrammePart2";
import CDT2CommunicationsChangePart1 from "./pages/modules/CD-T2-CommunicationsChangePart1";
import CDT2CommunicationsChangePart2 from "./pages/modules/CD-T2-CommunicationsChangePart2";
import CDT3ATechnologyRequirementsPart1 from "./pages/modules/CD-T3A-TechnologyRequirementsPart1";
import CDT3BTechnologyRequirementsPart2 from "./pages/modules/CD-T3B-TechnologyRequirementsPart2";
import CDM1MIFramework from "./pages/modules/CD-M1-MIFramework";
import CDM2ATestingAssurancePart1 from "./pages/modules/CD-M2A-TestingAssurancePart1";
import CDM3BoardReportingPart1 from "./pages/modules/CD-M3-BoardReportingPart1";
import CDM3BoardReportingPart2 from "./pages/modules/CD-M3-BoardReportingPart2";
import CDP1GovernanceFramework from "./pages/modules/CD-P1-GovernanceFramework";
import CDP1GovernanceFrameworkPart2 from "./pages/modules/CD-P1-GovernanceFrameworkPart2";
import CDP2PolicyFrameworkPart1 from "./pages/modules/CD-P2-PolicyFrameworkPart1";
import CDP2PolicyFrameworkPart2 from "./pages/modules/CD-P2-PolicyFrameworkPart2";
import CDP3ImplementationRoadmapPart1 from "./pages/modules/CD-P3-ImplementationRoadmapPart1";
import CDM4ContinuousImprovementPart1 from "./pages/modules/CD-M4-ContinuousImprovementPart1";
import CDM4ContinuousImprovementPart2 from "./pages/modules/CD-M4-ContinuousImprovementPart2";
import TemplatesLibrary from "./pages/TemplatesLibrary";
import Glossary from "./pages/Glossary";
import RegulatoryReferences from "./pages/RegulatoryReferences";
import MaturityAssessment from "./pages/MaturityAssessment";
import RegulatoryUpdates from "./pages/RegulatoryUpdates";
import OC3FairValueAssessment from "./pages/modules/OC-3-FairValueAssessment";
import OC4OutcomesTesting from "./pages/modules/OC-4-OutcomesTesting";
import SiteHealth from "./pages/SiteHealth";
import SettingsPage from "./pages/Settings";
import { FileText } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <StorageErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public auth route */}
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected routes */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <SidebarProvider>
                      <div className="min-h-screen flex w-full">
                        <AppSidebar />
                        <div className="flex-1 flex flex-col min-w-0">
                          {/* Mobile header with hamburger menu */}
                          <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-background sticky top-0 z-20 md:hidden">
                            <div className="flex items-center">
                              <SidebarTrigger 
                                aria-label="Open navigation menu"
                                className="h-10 w-10 hover:bg-accent"
                              />
                              <span className="ml-3 font-semibold text-foreground">Consumer Duty Compliance Hub</span>
                            </div>
                            <UserMenu />
                          </header>
                          {/* Desktop header with user menu */}
                          <header className="hidden md:flex h-14 border-b border-border items-center justify-end px-6 bg-background sticky top-0 z-20">
                            <UserMenu />
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

                              {/* Cross-Cutting */}
                              <Route path="/cross-cutting/vulnerable-customers" element={<CDI5VulnerableCustomers />} />
                              <Route path="/cross-cutting/distribution-chain" element={<CDI6DistributionChain />} />
                              <Route path="/cross-cutting/data-evidence" element={<CDI7ADataEvidenceManagementPart1 />} />
                              <Route path="/cross-cutting/data-evidence-part1" element={<CDI7ADataEvidenceManagementPart1 />} />
                              <Route path="/cross-cutting/data-evidence-part2" element={<CDI7BDataEvidenceManagementPart2 />} />

                              {/* Enablement */}
                              <Route path="/enablement/training" element={<CDT1TrainingProgrammePart1 />} />
                              <Route path="/enablement/training-part1" element={<CDT1TrainingProgrammePart1 />} />
                              <Route path="/enablement/training-part2" element={<CDT1TrainingProgrammePart2 />} />
                              <Route path="/enablement/communications" element={<CDT2CommunicationsChangePart1 />} />
                              <Route path="/enablement/communications-part1" element={<CDT2CommunicationsChangePart1 />} />
                              <Route path="/enablement/communications-part2" element={<CDT2CommunicationsChangePart2 />} />
                              <Route path="/enablement/change-management" element={<CDT2CommunicationsChangePart1 />} />
                              <Route path="/enablement/technology" element={<CDT3ATechnologyRequirementsPart1 />} />
                              <Route path="/enablement/technology-part1" element={<CDT3ATechnologyRequirementsPart1 />} />
                              <Route path="/enablement/technology-part2" element={<CDT3BTechnologyRequirementsPart2 />} />

                              {/* Ongoing Compliance */}
                              <Route path="/ongoing/fair-value" element={<OC3FairValueAssessment />} />
                              <Route path="/ongoing/outcomes-testing" element={<OC4OutcomesTesting />} />
                              <Route path="/ongoing/mi-monitoring" element={<CDM1MIFramework />} />
                              <Route path="/ongoing/board-attestation" element={<CDM3BoardReportingPart1 />} />

                              {/* Monitoring & Assurance */}
                              <Route path="/monitoring/mi-monitoring" element={<CDM1MIFramework />} />
                              <Route path="/modules/cd-m1-mi-framework" element={<CDM1MIFramework />} />
                              <Route path="/monitoring/testing-assurance" element={<CDM2ATestingAssurancePart1 />} />
                              <Route path="/monitoring/testing-assurance-part1" element={<CDM2ATestingAssurancePart1 />} />
                              <Route path="/modules/cd-m2a-testing-assurance-part1" element={<CDM2ATestingAssurancePart1 />} />
                              <Route path="/monitoring/board-reporting" element={<CDM3BoardReportingPart1 />} />
                              <Route path="/monitoring/board-reporting-part1" element={<CDM3BoardReportingPart1 />} />
                              <Route path="/monitoring/board-reporting-part2" element={<CDM3BoardReportingPart2 />} />
                              <Route path="/monitoring/continuous-improvement" element={<CDM4ContinuousImprovementPart1 />} />
                              <Route path="/monitoring/continuous-improvement-part1" element={<CDM4ContinuousImprovementPart1 />} />
                              <Route path="/monitoring/continuous-improvement-part2" element={<CDM4ContinuousImprovementPart2 />} />

                              {/* Resources */}
                              <Route path="/resources/templates" element={<TemplatesLibrary />} />
                              <Route path="/resources/glossary" element={<Glossary />} />
                              <Route path="/resources/regulatory-references" element={<RegulatoryReferences />} />
                              <Route path="/resources/regulatory" element={<RegulatoryReferences />} />

                              {/* Tools */}
                              <Route path="/maturity-assessment" element={<MaturityAssessment />} />
                              <Route path="/regulatory-updates" element={<RegulatoryUpdates />} />
                              <Route path="/consumer-duty-primer" element={<ConsumerDutyPrimer />} />

                              <Route path="/admin/site-health" element={<SiteHealth />} />
                              <Route path="/settings" element={<SettingsPage />} />

                              <Route path="*" element={<NotFound />} />
                            </Routes>
                          </main>
                          <ChatbotButton />
                        </div>
                      </div>
                    </SidebarProvider>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </StorageErrorBoundary>
);

export default App;
