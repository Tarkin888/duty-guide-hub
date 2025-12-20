import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Download, 
  BookOpen, 
  FileText, 
  AlertTriangle,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Calendar,
  Users,
  Tag,
  CheckCircle2,
  XCircle,
  Quote,
  Lightbulb,
  Scale,
  Gavel,
  Building2,
  GraduationCap,
  MessageSquare,
  Mail,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  regulatoryReferences, 
  referenceTypeConfig, 
  RegulatoryReference, 
  ReferenceType,
  OutcomeCategory,
  getReferencesCount 
} from "@/data/regulatoryReferencesData";

const RegulatoryReferences = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [outcomeFilter, setOutcomeFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [savedReferences, setSavedReferences] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('savedReferences');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const stats = getReferencesCount();

  const toggleExpanded = (id: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSaved = (id: string) => {
    setSavedReferences(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem('savedReferences', JSON.stringify([...next]));
      return next;
    });
  };

  const filteredReferences = useMemo(() => {
    let results = [...regulatoryReferences];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(ref =>
        ref.title.toLowerCase().includes(query) ||
        ref.fullTitle.toLowerCase().includes(query) ||
        ref.reference.toLowerCase().includes(query) ||
        ref.summary.toLowerCase().includes(query) ||
        ref.keywords.some(k => k.toLowerCase().includes(query)) ||
        ref.keyTopics.some(t => t.toLowerCase().includes(query))
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      results = results.filter(ref => ref.type === typeFilter);
    }

    // Outcome filter
    if (outcomeFilter !== "all") {
      results = results.filter(ref => ref.outcomes.includes(outcomeFilter as OutcomeCategory));
    }

    // Date filter
    if (dateFilter !== "all") {
      const currentYear = new Date().getFullYear();
      switch (dateFilter) {
        case "6months":
          results = results.filter(ref => ref.publishedYear >= currentYear);
          break;
        case "1year":
          results = results.filter(ref => ref.publishedYear >= currentYear - 1);
          break;
        case "2024":
          results = results.filter(ref => ref.publishedYear === 2024);
          break;
        case "2023":
          results = results.filter(ref => ref.publishedYear === 2023);
          break;
        case "2022-earlier":
          results = results.filter(ref => ref.publishedYear <= 2022);
          break;
      }
    }

    // Sort
    switch (sortBy) {
      case "recent":
        results.sort((a, b) => b.publishedYear - a.publishedYear);
        break;
      case "title":
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "reference":
        results.sort((a, b) => a.reference.localeCompare(b.reference));
        break;
    }

    return results;
  }, [searchQuery, typeFilter, outcomeFilter, dateFilter, sortBy]);

  const getTypeIcon = (type: ReferenceType) => {
    switch (type) {
      case 'handbook': return <BookOpen className="h-4 w-4" />;
      case 'policy-statement': return <FileText className="h-4 w-4" />;
      case 'finalised-guidance': return <Scale className="h-4 w-4" />;
      case 'multi-firm-review': return <Target className="h-4 w-4" />;
      case 'speech': return <MessageSquare className="h-4 w-4" />;
      case 'dear-ceo': return <Mail className="h-4 w-4" />;
      case 'enforcement': return <Gavel className="h-4 w-4" />;
      case 'industry-guidance': return <Building2 className="h-4 w-4" />;
      case 'academic': return <GraduationCap className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const renderReferenceCard = (ref: RegulatoryReference) => {
    const isExpanded = expandedCards.has(ref.id);
    const isSaved = savedReferences.has(ref.id);
    const typeConfig = referenceTypeConfig[ref.type];
    const isEnforcement = ref.type === 'enforcement';

    return (
      <Card 
        key={ref.id} 
        className={`transition-all duration-200 hover:shadow-md ${
          isEnforcement ? 'border-l-4 border-l-red-500' : ''
        }`}
      >
        <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(ref.id)}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge className={`${typeConfig.bgColor} ${typeConfig.color} text-xs`}>
                    {getTypeIcon(ref.type)}
                    <span className="ml-1">{typeConfig.label}</span>
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {ref.reference}
                  </Badge>
                  {ref.status.includes('Current') && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Current
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg mb-1">{ref.title}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">
                  {ref.summary}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaved(ref.id);
                  }}
                  className={isSaved ? "text-primary" : "text-muted-foreground"}
                >
                  {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                </Button>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {ref.published}
              </span>
              {ref.speaker && (
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {ref.speaker}
                </span>
              )}
              {ref.penalty && (
                <span className="flex items-center gap-1 text-red-600 font-medium">
                  <AlertTriangle className="h-3 w-3" />
                  {ref.penalty}
                </span>
              )}
            </div>
          </CardHeader>

          <CollapsibleContent>
            <CardContent className="pt-0">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="related">Related</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Full Title
                    </h4>
                    <p className="text-sm text-muted-foreground">{ref.fullTitle}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Tag className="h-4 w-4 text-primary" />
                      Key Topics
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {ref.keyTopics.map((topic, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {ref.notableQuotes && ref.notableQuotes.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <Quote className="h-4 w-4 text-primary" />
                        Notable Quotes
                      </h4>
                      <div className="space-y-2">
                        {ref.notableQuotes.map((quote, idx) => (
                          <blockquote key={idx} className="border-l-2 border-primary pl-3 text-sm italic text-muted-foreground">
                            "{quote}"
                          </blockquote>
                        ))}
                      </div>
                    </div>
                  )}

                  {ref.implications && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-1 flex items-center gap-2 text-amber-800">
                        <Lightbulb className="h-4 w-4" />
                        Implications
                      </h4>
                      <p className="text-sm text-amber-700">{ref.implications}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  {ref.criticalSections && ref.criticalSections.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Critical Sections</h4>
                      <ul className="space-y-1">
                        {ref.criticalSections.map((section, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>
                              <strong>{section.title}</strong>
                              {section.description && `: ${section.description}`}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {ref.keyFindings && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-green-800">
                          <CheckCircle2 className="h-4 w-4" />
                          Good Practice
                        </h4>
                        <ul className="space-y-1">
                          {ref.keyFindings.good.map((item, idx) => (
                            <li key={idx} className="text-xs text-green-700">• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-red-800">
                          <XCircle className="h-4 w-4" />
                          Areas for Improvement
                        </h4>
                        <ul className="space-y-1">
                          {ref.keyFindings.improvement.map((item, idx) => (
                            <li key={idx} className="text-xs text-red-700">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {ref.rootCauses && ref.rootCauses.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-red-800">
                        <AlertTriangle className="h-4 w-4" />
                        Root Causes
                      </h4>
                      <ul className="space-y-1">
                        {ref.rootCauses.map((cause, idx) => (
                          <li key={idx} className="text-xs text-red-700">• {cause}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {ref.lessons && ref.lessons.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-blue-800">
                        <Lightbulb className="h-4 w-4" />
                        Lessons Learned
                      </h4>
                      <ul className="space-y-1">
                        {ref.lessons.map((lesson, idx) => (
                          <li key={idx} className="text-xs text-blue-700">• {lesson}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Relevant For
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {ref.relevantFor.map((role, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="related" className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Related Modules</h4>
                    <div className="flex flex-wrap gap-1">
                      {ref.relatedModules.map((module, idx) => (
                        <Link key={idx} to={`/modules/${module.toLowerCase()}`}>
                          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                            {module}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Outcomes Covered</h4>
                    <div className="flex flex-wrap gap-1">
                      {ref.outcomes.map((outcome, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs capitalize">
                          {outcome.replace(/-/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                {ref.externalUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={ref.externalUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View on FCA
                    </a>
                  </Button>
                )}
                {ref.pdfUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={ref.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-1" />
                      Download PDF
                    </a>
                  </Button>
                )}
                <Button
                  variant={isSaved ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSaved(ref.id)}
                >
                  {isSaved ? <BookmarkCheck className="h-4 w-4 mr-1" /> : <Bookmark className="h-4 w-4 mr-1" />}
                  {isSaved ? "Saved" : "Add to Library"}
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    );
  };

  // Group references by type for sections
  const primarySources = filteredReferences.filter(r => 
    ['handbook', 'policy-statement', 'finalised-guidance'].includes(r.type) && 
    ['fg22-5', 'ps22-9', 'prin-2a', 'fg21-1'].includes(r.id)
  );
  const multiFilmReviews = filteredReferences.filter(r => r.type === 'multi-firm-review');
  const speeches = filteredReferences.filter(r => r.type === 'speech');
  const dearCeoLetters = filteredReferences.filter(r => r.type === 'dear-ceo');
  const enforcementActions = filteredReferences.filter(r => r.type === 'enforcement');
  const industryGuidance = filteredReferences.filter(r => r.type === 'industry-guidance');
  const academicResources = filteredReferences.filter(r => r.type === 'academic');
  const otherPolicySources = filteredReferences.filter(r => 
    ['handbook', 'policy-statement', 'finalised-guidance'].includes(r.type) && 
    !['fg22-5', 'ps22-9', 'prin-2a', 'fg21-1'].includes(r.id)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 text-primary-foreground/80">
            <Link to="/" className="hover:text-primary-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/resources" className="hover:text-primary-foreground">Resources</Link>
            <span className="mx-2">/</span>
            <span>Regulatory References</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Regulatory References Library</h1>
          <p className="text-lg text-primary-foreground/90 max-w-3xl">
            Complete collection of FCA sources, guidance, and enforcement materials for Consumer Duty implementation
          </p>
          <p className="text-sm text-primary-foreground/70 mt-2">Last updated: December 2025</p>
        </div>
      </header>

      {/* Stats */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">{stats.total}+</div>
              <div className="text-sm text-muted-foreground">Total References</div>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">{stats.handbook + 7}+</div>
              <div className="text-sm text-muted-foreground">FCA Handbook Sections</div>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">{stats.multiFilmReviews}</div>
              <div className="text-sm text-muted-foreground">Multi-firm Reviews</div>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">{stats.enforcement}</div>
              <div className="text-sm text-muted-foreground">Enforcement Actions</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b py-4 mt-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search references by title, reference number, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="handbook">FCA Handbook</SelectItem>
                  <SelectItem value="policy-statement">Policy Statements</SelectItem>
                  <SelectItem value="finalised-guidance">Finalised Guidance</SelectItem>
                  <SelectItem value="multi-firm-review">Multi-firm Reviews</SelectItem>
                  <SelectItem value="speech">Speeches</SelectItem>
                  <SelectItem value="dear-ceo">Dear CEO Letters</SelectItem>
                  <SelectItem value="enforcement">Enforcement Actions</SelectItem>
                  <SelectItem value="industry-guidance">Industry Guidance</SelectItem>
                  <SelectItem value="academic">Academic Research</SelectItem>
                </SelectContent>
              </Select>

              <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Outcome" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Outcomes</SelectItem>
                  <SelectItem value="products-services">Products & Services</SelectItem>
                  <SelectItem value="price-value">Price & Value</SelectItem>
                  <SelectItem value="consumer-understanding">Consumer Understanding</SelectItem>
                  <SelectItem value="consumer-support">Consumer Support</SelectItem>
                  <SelectItem value="cross-cutting">Cross-Cutting</SelectItem>
                  <SelectItem value="vulnerable-customers">Vulnerable Customers</SelectItem>
                  <SelectItem value="governance">Governance</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="6months">Last 6 months</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022-earlier">2022 and earlier</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                  <SelectItem value="reference">Reference Number</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Showing {filteredReferences.length} of {regulatoryReferences.length} references
            {savedReferences.size > 0 && (
              <span className="ml-4">
                <BookmarkCheck className="h-4 w-4 inline mr-1" />
                {savedReferences.size} saved to library
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {/* If searching, show flat results */}
        {searchQuery || typeFilter !== "all" || outcomeFilter !== "all" || dateFilter !== "all" ? (
          <div className="space-y-4">
            {filteredReferences.map(renderReferenceCard)}
            {filteredReferences.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No references match your search criteria.</p>
                <Button variant="outline" className="mt-4" onClick={() => {
                  setSearchQuery("");
                  setTypeFilter("all");
                  setOutcomeFilter("all");
                  setDateFilter("all");
                }}>
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            {/* Primary Sources */}
            {primarySources.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Scale className="h-6 w-6 text-primary" />
                  Primary Consumer Duty Sources
                </h2>
                <p className="text-muted-foreground mb-4">Essential FCA guidance and rules that form the foundation of Consumer Duty</p>
                <div className="space-y-4">
                  {primarySources.map(renderReferenceCard)}
                </div>
              </section>
            )}

            {/* Other Policy Sources */}
            {otherPolicySources.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  Additional Policy & Guidance
                </h2>
                <div className="space-y-4">
                  {otherPolicySources.map(renderReferenceCard)}
                </div>
              </section>
            )}

            {/* Multi-firm Reviews */}
            {multiFilmReviews.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Target className="h-6 w-6 text-primary" />
                  Supervisory Feedback & Reviews
                </h2>
                <p className="text-muted-foreground mb-4">FCA findings from sector-wide reviews highlighting good practice and areas for improvement</p>
                <div className="space-y-4">
                  {multiFilmReviews.map(renderReferenceCard)}
                </div>
              </section>
            )}

            {/* Speeches */}
            {speeches.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  FCA Speeches & Publications
                </h2>
                <p className="text-muted-foreground mb-4">Key speeches from FCA leadership on Consumer Duty expectations</p>
                <div className="space-y-4">
                  {speeches.map(renderReferenceCard)}
                </div>
              </section>
            )}

            {/* Dear CEO Letters */}
            {dearCeoLetters.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  Dear CEO Letters
                </h2>
                <p className="text-muted-foreground mb-4">Direct communications to firm leadership on regulatory expectations</p>
                <div className="space-y-4">
                  {dearCeoLetters.map(renderReferenceCard)}
                </div>
              </section>
            )}

            {/* Enforcement Actions */}
            {enforcementActions.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Gavel className="h-6 w-6 text-red-600" />
                  Enforcement Actions
                </h2>
                <p className="text-muted-foreground mb-4">Regulatory enforcement cases with lessons learned for compliance</p>
                <div className="space-y-4">
                  {enforcementActions.map(renderReferenceCard)}
                </div>
              </section>
            )}

            {/* Industry Guidance */}
            {industryGuidance.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Building2 className="h-6 w-6 text-primary" />
                  Industry Guidance & Resources
                </h2>
                <p className="text-muted-foreground mb-4">Sector-specific guidance from trade bodies (supplementary to FCA requirements)</p>
                <div className="space-y-4">
                  {industryGuidance.map(renderReferenceCard)}
                </div>
              </section>
            )}

            {/* Academic Resources */}
            {academicResources.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  Academic & Research Resources
                </h2>
                <p className="text-muted-foreground mb-4">Research papers and academic analysis on Consumer Duty topics</p>
                <div className="space-y-4">
                  {academicResources.map(renderReferenceCard)}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default RegulatoryReferences;
