import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Download, 
  AlertTriangle, 
  Link2,
  BarChart3,
  Users
} from 'lucide-react';

interface ModuleInsightsProps {
  moduleCode: string;
  moduleTitle: string;
}

// Mock data - will be replaced with real analytics
const getMockInsights = (moduleCode: string) => {
  const insights: Record<string, {
    avgTimeMinutes: number;
    topTemplates: { name: string; downloads: number }[];
    blockers: { section: string; revisitRate: number }[];
    relatedModules: { code: string; title: string; viewRate: number }[];
  }> = {
    'CD-F1': {
      avgTimeMinutes: 45,
      topTemplates: [
        { name: 'Gap Analysis Template', downloads: 234 },
        { name: 'Readiness Scorecard', downloads: 189 },
        { name: 'Stakeholder Matrix', downloads: 156 }
      ],
      blockers: [
        { section: 'Current State Assessment', revisitRate: 42 },
        { section: 'Gap Prioritisation', revisitRate: 35 }
      ],
      relatedModules: [
        { code: 'CD-F2', title: 'Requirements Mapping', viewRate: 78 },
        { code: 'CD-P1', title: 'Governance Framework', viewRate: 65 }
      ]
    },
    'CD-F2': {
      avgTimeMinutes: 60,
      topTemplates: [
        { name: 'Requirements Matrix', downloads: 312 },
        { name: 'Regulatory Mapping Template', downloads: 245 }
      ],
      blockers: [
        { section: 'Cross-Cutting Requirements', revisitRate: 38 },
        { section: 'Evidence Requirements', revisitRate: 28 }
      ],
      relatedModules: [
        { code: 'CD-F1', title: 'Readiness Assessment', viewRate: 82 },
        { code: 'CD-F3', title: 'Risk Assessment', viewRate: 71 }
      ]
    },
    'CD-F3': {
      avgTimeMinutes: 55,
      topTemplates: [
        { name: 'Risk Register Template', downloads: 287 },
        { name: 'RCSA Template', downloads: 198 }
      ],
      blockers: [
        { section: 'Inherent Risk Scoring', revisitRate: 45 },
        { section: 'Control Effectiveness', revisitRate: 32 }
      ],
      relatedModules: [
        { code: 'CD-F2', title: 'Requirements Mapping', viewRate: 74 },
        { code: 'CD-P1', title: 'Governance Framework', viewRate: 68 }
      ]
    }
  };

  // Default mock data for modules not explicitly defined
  return insights[moduleCode] || {
    avgTimeMinutes: Math.floor(Math.random() * 40) + 30,
    topTemplates: [
      { name: 'Implementation Checklist', downloads: Math.floor(Math.random() * 200) + 100 },
      { name: 'Assessment Template', downloads: Math.floor(Math.random() * 150) + 80 },
      { name: 'Progress Tracker', downloads: Math.floor(Math.random() * 100) + 50 }
    ],
    blockers: [
      { section: 'Implementation Steps', revisitRate: Math.floor(Math.random() * 30) + 20 },
      { section: 'Evidence Requirements', revisitRate: Math.floor(Math.random() * 25) + 15 }
    ],
    relatedModules: [
      { code: 'CD-P1', title: 'Governance Framework', viewRate: Math.floor(Math.random() * 30) + 50 },
      { code: 'CD-M1', title: 'MI Framework', viewRate: Math.floor(Math.random() * 25) + 45 }
    ]
  };
};

export function ModuleInsights({ moduleCode, moduleTitle }: ModuleInsightsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const insights = getMockInsights(moduleCode);

  return (
    <div className="mt-8 mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card className="border-muted/50 bg-muted/20">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-base font-medium">Module Insights</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    Based on user engagement
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="pt-0 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Average Time Spent */}
                <div className="bg-background rounded-lg p-4 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Avg. Time Spent</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {insights.avgTimeMinutes} min
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Typical completion time
                  </p>
                </div>

                {/* Most Downloaded Templates */}
                <div className="bg-background rounded-lg p-4 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Download className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Top Templates</span>
                  </div>
                  <ul className="space-y-1.5">
                    {insights.topTemplates.slice(0, 3).map((template, idx) => (
                      <li key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground truncate max-w-[140px]">
                          {template.name}
                        </span>
                        <Badge variant="outline" className="text-[10px] px-1.5">
                          {template.downloads}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Common Blockers */}
                <div className="bg-background rounded-lg p-4 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium">Frequently Revisited</span>
                  </div>
                  <ul className="space-y-1.5">
                    {insights.blockers.map((blocker, idx) => (
                      <li key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground truncate max-w-[120px]">
                          {blocker.section}
                        </span>
                        <Badge variant="secondary" className="text-[10px] px-1.5">
                          {blocker.revisitRate}% revisit
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Modules */}
                <div className="bg-background rounded-lg p-4 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Link2 className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">Users Also Viewed</span>
                  </div>
                  <ul className="space-y-1.5">
                    {insights.relatedModules.map((module, idx) => {
                      // Use centralized routing - import getModulePath from routes config
                      const modulePath = (() => {
                        // Simple mapping for common module codes
                        const pathMap: Record<string, string> = {
                          'CD-F1': '/foundation/readiness',
                          'CD-F2': '/foundation/requirements',
                          'CD-F3': '/foundation/risk-impact',
                          'CD-P1': '/governance/framework',
                          'CD-P2': '/governance/policy',
                          'CD-P3': '/governance/roadmap',
                          'CD-I1': '/outcomes/products-services',
                          'CD-I2': '/outcomes/price-value',
                          'CD-I3': '/outcomes/consumer-understanding',
                          'CD-I4': '/outcomes/consumer-support',
                          'CD-I5': '/cross-cutting/vulnerable-customers',
                          'CD-I6': '/cross-cutting/distribution-chain',
                          'CD-I7': '/cross-cutting/data-evidence',
                          'CD-T1': '/enablement/training',
                          'CD-T2': '/enablement/communications',
                          'CD-T3': '/enablement/technology',
                          'CD-M1': '/monitoring/mi-monitoring',
                          'CD-M2': '/monitoring/testing-assurance',
                          'CD-M3': '/monitoring/board-reporting',
                          'CD-M4': '/monitoring/continuous-improvement',
                        };
                        return pathMap[module.code] || `/foundation/readiness`;
                      })();
                      
                      return (
                        <li key={idx} className="flex items-center justify-between text-xs">
                          <Link 
                            to={modulePath}
                            className="text-primary hover:underline truncate max-w-[120px]"
                          >
                            {module.code}
                          </Link>
                          <Badge variant="outline" className="text-[10px] px-1.5">
                            {module.viewRate}%
                          </Badge>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <p className="text-[10px] text-muted-foreground mt-4 text-center">
                Insights are based on aggregated usage patterns and may not reflect individual experiences.
              </p>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}
