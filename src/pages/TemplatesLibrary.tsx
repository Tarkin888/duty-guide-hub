import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, Download, Eye, FileSpreadsheet, FileText, Presentation, File, X, ChevronDown, Filter, Star, Clock, TrendingUp } from "lucide-react";
import { 
  templates, 
  Template, 
  TemplateCategory, 
  FileType, 
  Complexity,
  categoryLabels, 
  fileTypeLabels, 
  fileTypeColors,
  complexityLabels,
  complexityColors,
  userRoles,
} from "@/data/templatesData";
import { toast } from "@/hooks/use-toast";

const fileTypeIcons: Record<FileType, React.ReactNode> = {
  xlsx: <FileSpreadsheet className="h-5 w-5" />,
  docx: <FileText className="h-5 w-5" />,
  pptx: <Presentation className="h-5 w-5" />,
  pdf: <File className="h-5 w-5" />,
};

export default function TemplatesLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<TemplateCategory[]>([]);
  const [selectedFileTypes, setSelectedFileTypes] = useState<FileType[]>([]);
  const [selectedComplexity, setSelectedComplexity] = useState<Complexity | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          template.name.toLowerCase().includes(query) ||
          template.description.toLowerCase().includes(query) ||
          template.keywords.some(k => k.toLowerCase().includes(query)) ||
          template.moduleReference.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(template.category)) {
        return false;
      }

      // File type filter
      if (selectedFileTypes.length > 0 && !selectedFileTypes.includes(template.fileType)) {
        return false;
      }

      // Complexity filter
      if (selectedComplexity && template.complexity !== selectedComplexity) {
        return false;
      }

      // Role filter
      if (selectedRoles.length > 0 && !template.targetUsers.some(u => selectedRoles.includes(u))) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategories, selectedFileTypes, selectedComplexity, selectedRoles]);

  const handleDownload = (template: Template) => {
    toast({
      title: "Download Started",
      description: `Downloading ${template.name}...`,
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedFileTypes([]);
    setSelectedComplexity(null);
    setSelectedRoles([]);
    setSearchQuery("");
  };

  const activeFiltersCount = selectedCategories.length + selectedFileTypes.length + selectedRoles.length + (selectedComplexity ? 1 : 0);

  const topDownloaded = useMemo(() => 
    [...templates].sort((a, b) => b.downloadCount - a.downloadCount).slice(0, 5),
  []);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Consumer Duty Templates Library</h1>
          <p className="text-primary-foreground/80 text-lg mb-6">
            Professional-grade templates for complete implementation - downloadable, customizable, audit-ready
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="bg-primary-foreground/10 rounded-lg px-4 py-2">
              <span className="text-2xl font-bold">{templates.length}</span>
              <span className="ml-2 text-primary-foreground/80">Templates</span>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg px-4 py-2">
              <span className="text-2xl font-bold">{Object.keys(categoryLabels).length}</span>
              <span className="ml-2 text-primary-foreground/80">Categories</span>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg px-4 py-2 flex gap-2 items-center">
              <Badge variant="secondary" className="bg-success/20 text-success">Excel</Badge>
              <Badge variant="secondary" className="bg-info/20 text-info">Word</Badge>
              <Badge variant="secondary" className="bg-warning/20 text-warning">PowerPoint</Badge>
              <Badge variant="secondary" className="bg-destructive/20 text-destructive">PDF</Badge>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search templates by name, purpose, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg bg-background text-foreground"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedCategories.map(cat => (
              <Badge key={cat} variant="secondary" className="gap-1">
                {categoryLabels[cat]}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategories(prev => prev.filter(c => c !== cat))} />
              </Badge>
            ))}
            {selectedFileTypes.map(ft => (
              <Badge key={ft} variant="secondary" className="gap-1">
                {fileTypeLabels[ft]}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedFileTypes(prev => prev.filter(f => f !== ft))} />
              </Badge>
            ))}
            {selectedComplexity && (
              <Badge variant="secondary" className="gap-1">
                {complexityLabels[selectedComplexity]}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedComplexity(null)} />
              </Badge>
            )}
            {selectedRoles.map(role => (
              <Badge key={role} variant="secondary" className="gap-1">
                {role}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedRoles(prev => prev.filter(r => r !== role))} />
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={clearFilters}>Clear All</Button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-64 shrink-0 hidden lg:block">
            <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between mb-4">
                  <span className="flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold mb-3">Category</h3>
                    <div className="space-y-2">
                      {Object.entries(categoryLabels).map(([key, label]) => (
                        <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Checkbox 
                            checked={selectedCategories.includes(key as TemplateCategory)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCategories(prev => [...prev, key as TemplateCategory]);
                              } else {
                                setSelectedCategories(prev => prev.filter(c => c !== key));
                              }
                            }}
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* File Types */}
                  <div>
                    <h3 className="font-semibold mb-3">File Type</h3>
                    <div className="space-y-2">
                      {Object.entries(fileTypeLabels).map(([key, label]) => (
                        <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Checkbox 
                            checked={selectedFileTypes.includes(key as FileType)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedFileTypes(prev => [...prev, key as FileType]);
                              } else {
                                setSelectedFileTypes(prev => prev.filter(f => f !== key));
                              }
                            }}
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Complexity */}
                  <div>
                    <h3 className="font-semibold mb-3">Complexity</h3>
                    <div className="space-y-2">
                      {Object.entries(complexityLabels).map(([key, label]) => (
                        <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Checkbox 
                            checked={selectedComplexity === key}
                            onCheckedChange={(checked) => {
                              setSelectedComplexity(checked ? key as Complexity : null);
                            }}
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* User Roles */}
                  <div>
                    <h3 className="font-semibold mb-3">Target Users</h3>
                    <div className="space-y-2">
                      {userRoles.map(role => (
                        <label key={role} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Checkbox 
                            checked={selectedRoles.includes(role)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedRoles(prev => [...prev, role]);
                              } else {
                                setSelectedRoles(prev => prev.filter(r => r !== role));
                              }
                            }}
                          />
                          {role}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Top Downloaded */}
            <div className="mt-8">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Most Popular
              </h3>
              <div className="space-y-2">
                {topDownloaded.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t)}
                    className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
                  >
                    <div className="font-medium truncate">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.downloadCount.toLocaleString()} downloads</div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {filteredTemplates.length} of {templates.length} templates
              </p>
            </div>

            {/* Template Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredTemplates.map(template => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${fileTypeColors[template.fileType]}`}>
                          {fileTypeIcons[template.fileType]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base line-clamp-2">{template.name}</CardTitle>
                        </div>
                      </div>
                      <button 
                        onClick={() => toggleFavorite(template.id)}
                        className="p-1 hover:bg-muted rounded"
                      >
                        <Star className={`h-4 w-4 ${favorites.includes(template.id) ? 'fill-warning text-warning' : 'text-muted-foreground'}`} />
                      </button>
                    </div>
                    <CardDescription className="line-clamp-2 mt-2">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <Badge variant="outline" className={fileTypeColors[template.fileType]}>
                        {fileTypeLabels[template.fileType]}
                      </Badge>
                      <Badge variant="outline" className={complexityColors[template.complexity]}>
                        {complexityLabels[template.complexity]}
                      </Badge>
                      <Badge variant="outline">{template.moduleReference}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>{template.fileSize} KB</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {template.lastUpdated}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" onClick={() => handleDownload(template)}>
                        <Download className="h-4 w-4 mr-1" /> Download
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setSelectedTemplate(template)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No templates match your filters</p>
                <Button variant="outline" onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Template Detail Modal */}
      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${selectedTemplate ? fileTypeColors[selectedTemplate.fileType] : ''}`}>
                {selectedTemplate && fileTypeIcons[selectedTemplate.fileType]}
              </div>
              <DialogTitle className="text-xl">{selectedTemplate?.name}</DialogTitle>
            </div>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            {selectedTemplate && (
              <div className="space-y-6 pr-4">
                <p className="text-muted-foreground">{selectedTemplate.fullDescription}</p>

                <div>
                  <h4 className="font-semibold mb-2">What's Included</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {selectedTemplate.whatIncluded.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">How to Use</h4>
                  <p className="text-sm text-muted-foreground">{selectedTemplate.howToUse}</p>
                </div>

                {selectedTemplate.prerequisites.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Prerequisites</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.prerequisites.map(pre => (
                        <Badge key={pre} variant="outline">{pre}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">File Type:</span>
                    <span className="ml-2 font-medium">{fileTypeLabels[selectedTemplate.fileType]}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <span className="ml-2 font-medium">{selectedTemplate.fileSize} KB</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Complexity:</span>
                    <span className="ml-2 font-medium">{complexityLabels[selectedTemplate.complexity]}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Module:</span>
                    <span className="ml-2 font-medium">{selectedTemplate.moduleReference}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Target Users:</span>
                    <span className="ml-2 font-medium">{selectedTemplate.targetUsers.join(', ')}</span>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1" onClick={() => selectedTemplate && handleDownload(selectedTemplate)}>
              <Download className="h-4 w-4 mr-2" /> Download Template
            </Button>
            <Button variant="outline" onClick={() => toggleFavorite(selectedTemplate?.id || '')}>
              <Star className={`h-4 w-4 mr-2 ${selectedTemplate && favorites.includes(selectedTemplate.id) ? 'fill-warning text-warning' : ''}`} />
              {selectedTemplate && favorites.includes(selectedTemplate.id) ? 'Favorited' : 'Add to Favorites'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
