import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, BookOpen, Scale, Lightbulb, AlertTriangle, Link2, ChevronDown, ChevronUp, ArrowUp, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  glossaryTerms, 
  categoryLabels, 
  categoryColors, 
  getAlphabetIndex,
  GlossaryTerm 
} from '@/data/glossaryData';

const Glossary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const letterRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const alphabetIndex = useMemo(() => getAlphabetIndex(), []);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Filter terms based on search, category, and letter
  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch = searchQuery === '' || 
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.plainEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.officialDefinition.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
      
      const matchesLetter = !selectedLetter || 
        term.term.toUpperCase().startsWith(selectedLetter);

      return matchesSearch && matchesCategory && matchesLetter;
    });
  }, [searchQuery, selectedCategory, selectedLetter]);

  // Group terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach(term => {
      const letter = term.term[0].toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTerm = (termId: string) => {
    setExpandedTerms(prev => {
      const newSet = new Set(prev);
      if (newSet.has(termId)) {
        newSet.delete(termId);
      } else {
        newSet.add(termId);
      }
      return newSet;
    });
  };

  const scrollToLetter = (letter: string) => {
    setSelectedLetter(letter === selectedLetter ? null : letter);
    const element = letterRefs.current[letter];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTerm = (termId: string) => {
    setExpandedTerms(prev => new Set([...prev, termId]));
    setTimeout(() => {
      const element = document.getElementById(`term-${termId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-2', 'ring-accent');
        setTimeout(() => {
          element.classList.remove('ring-2', 'ring-accent');
        }, 2000);
      }
    }, 100);
  };

  const highlightSearchText = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded">{part}</mark>
      ) : part
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLetter(null);
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedLetter;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 md:h-10 md:w-10" />
            <h1 className="text-2xl md:text-4xl font-bold">Consumer Duty Glossary</h1>
          </div>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-2">
            Essential terminology for FCA Consumer Duty implementation
          </p>
          <p className="text-sm md:text-base text-primary-foreground/70">
            Comprehensive definitions of key Consumer Duty terms with regulatory references, 
            practical examples, and related concepts. All definitions current as of November 2025.
          </p>
        </div>
      </div>

      {/* Search and Filters - Sticky */}
      <div className="sticky top-14 z-20 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search terms, definitions, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Filters Row */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Category Filter */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="md:hidden"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <div className={`${showMobileFilters ? 'flex' : 'hidden'} md:flex items-center gap-3 w-full md:w-auto`}>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-[220px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="regulatory">Regulatory Framework</SelectItem>
                    <SelectItem value="governance">Governance & Accountability</SelectItem>
                    <SelectItem value="implementation">Implementation</SelectItem>
                    <SelectItem value="customer">Customer Focus</SelectItem>
                    <SelectItem value="distribution">Distribution</SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground">
              Displaying <span className="font-semibold text-foreground">{filteredTerms.length}</span> of {glossaryTerms.length} terms
            </p>
          </div>

          {/* Alphabet Navigation */}
          <div className="flex flex-wrap gap-1 mt-4">
            {alphabet.map(letter => {
              const count = alphabetIndex[letter];
              const isActive = selectedLetter === letter;
              const hasTerms = count > 0;
              
              return (
                <Button
                  key={letter}
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className={`w-8 h-8 p-0 text-sm font-medium ${
                    !hasTerms ? 'text-muted-foreground/40 cursor-not-allowed' : ''
                  } ${isActive ? 'bg-primary text-primary-foreground' : ''}`}
                  onClick={() => hasTerms && scrollToLetter(letter)}
                  disabled={!hasTerms}
                >
                  {letter}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {filteredTerms.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No terms found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.keys(groupedTerms).sort().map(letter => (
              <div 
                key={letter} 
                ref={el => letterRefs.current[letter] = el}
                className="scroll-mt-48"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl font-bold text-primary">{letter}</span>
                  <div className="h-px flex-1 bg-border" />
                  <Badge variant="secondary">{groupedTerms[letter].length} terms</Badge>
                </div>
                
                <div className="space-y-3">
                  {groupedTerms[letter].map(term => (
                    <TermCard
                      key={term.id}
                      term={term}
                      isExpanded={expandedTerms.has(term.id)}
                      onToggle={() => toggleTerm(term.id)}
                      onRelatedTermClick={scrollToTerm}
                      highlightText={highlightSearchText}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-30"
          size="icon"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

interface TermCardProps {
  term: GlossaryTerm;
  isExpanded: boolean;
  onToggle: () => void;
  onRelatedTermClick: (termId: string) => void;
  highlightText: (text: string) => React.ReactNode;
}

const TermCard = ({ term, isExpanded, onToggle, onRelatedTermClick, highlightText }: TermCardProps) => {
  const relatedTerms = term.relatedTerms
    .map(id => glossaryTerms.find(t => t.id === id))
    .filter(Boolean) as GlossaryTerm[];

  return (
    <Card 
      id={`term-${term.id}`}
      className="transition-all duration-300 hover:shadow-md"
    >
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <div className="p-4 md:p-6 cursor-pointer">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    {highlightText(term.term)}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className={categoryColors[term.category]}
                  >
                    {categoryLabels[term.category]}
                  </Badge>
                  {term.fcaReference && (
                    <Badge variant="secondary" className="text-xs">
                      {term.fcaReference}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground line-clamp-2">
                  {highlightText(term.plainEnglish)}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0">
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-4 pb-4 md:px-6 md:pb-6 pt-0">
            <Tabs defaultValue="definition" className="w-full">
              <TabsList className="w-full justify-start mb-4 flex-wrap h-auto gap-1">
                <TabsTrigger value="definition" className="text-sm">
                  <Scale className="h-4 w-4 mr-2" />
                  Definition
                </TabsTrigger>
                <TabsTrigger value="practice" className="text-sm">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  In Practice
                </TabsTrigger>
                <TabsTrigger value="related" className="text-sm">
                  <Link2 className="h-4 w-4 mr-2" />
                  Related Terms
                </TabsTrigger>
              </TabsList>

              <TabsContent value="definition" className="space-y-4">
                {/* Official Definition */}
                <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <Scale className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-primary mb-1">
                        Official FCA Definition
                        {term.fcaReference && (
                          <span className="text-muted-foreground font-normal ml-2">
                            ({term.fcaReference})
                          </span>
                        )}
                      </p>
                      <p className="text-foreground">{term.officialDefinition}</p>
                    </div>
                  </div>
                </div>

                {/* Plain English */}
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">
                    Plain English Explanation
                  </h4>
                  <p className="text-foreground">{term.plainEnglish}</p>
                </div>

                {/* Why It Matters */}
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">
                    Why It Matters
                  </h4>
                  <p className="text-foreground">{term.whyItMatters}</p>
                </div>
              </TabsContent>

              <TabsContent value="practice" className="space-y-4">
                {/* Practical Example */}
                <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-accent-foreground mb-1">
                        Practical Example
                      </p>
                      <p className="text-foreground">{term.practicalExample}</p>
                    </div>
                  </div>
                </div>

                {/* Common Misconceptions */}
                {term.commonMisconceptions && (
                  <div className="bg-destructive/5 border-l-4 border-destructive p-4 rounded-r-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-destructive mb-1">
                          Common Misconceptions
                        </p>
                        <p className="text-foreground">{term.commonMisconceptions}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* What It Looks Like */}
                {term.whatItLooksLike && term.whatItLooksLike.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">
                      What It Looks Like
                    </h4>
                    <ul className="space-y-2">
                      {term.whatItLooksLike.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="related" className="space-y-4">
                {relatedTerms.length > 0 ? (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {relatedTerms.map(related => (
                      <button
                        key={related.id}
                        onClick={() => onRelatedTermClick(related.id)}
                        className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-left group"
                      >
                        <Link2 className="h-4 w-4 text-muted-foreground group-hover:text-primary mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground group-hover:text-primary truncate">
                            {related.term}
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {related.plainEnglish}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No related terms available.
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default Glossary;
